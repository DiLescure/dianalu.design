// biome-ignore assist/source/organizeImports: dotenv import must remain at the top
import dotenv from 'dotenv';
import { resolve } from 'node:path';

import mdx from '@mdx-js/rollup';
import sitemap from '@qalisa/vike-plugin-sitemap';
import type { SitemapEntry } from '@qalisa/vike-plugin-sitemap/types';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import remarkGfm from 'remark-gfm';
import vike from 'vike/plugin';
import { type UserConfig, defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import type { PageContext } from 'vike/types';
import { AVAILABLE_LOCALES } from './config';

dotenv.config({ path: '../.env' });

const host = process.env.APP_HOST || '0.0.0.0';
const port = process.env.APP_PORT ? Number.parseInt(process.env.APP_PORT, 10) : 5173;
const hmrPort = process.env.APP_HMR_PORT ? Number.parseInt(process.env.APP_HMR_PORT, 10) : 24678;

const dynamicPaths = ['../../pages/docs/index/'];

type PrerenderContext = {
  prerenderContext: {
    pageContexts: Partial<PageContext>[];
  };
};

const noSitemapPaths = ['/agent-hub', '/chat'];

export default defineConfig(async () => {
  const { baseUrl } = await import('./config');

  const sitemapOverride = (entries: SitemapEntry[]): SitemapEntry[] => {
    const baseEntries = entries.filter((entry) => {
      for (const path of noSitemapPaths) {
        if (entry.loc?.startsWith(`${baseUrl}${path}`)) {
          return false;
        }
      }

      return true;
    });

    const localizedEntries: SitemapEntry[] = [];
    for (const locale of AVAILABLE_LOCALES) {
      for (const entry of baseEntries) {
        localizedEntries.push({
          ...entry,
          loc: entry.loc?.replace(`${baseUrl}/`, `${baseUrl}/${locale}/`),
        });
      }
    }

    return localizedEntries;
  };

  // Sitemap entries for dynamic pages
  const customEntries: SitemapEntry[] = [];
  for (const path of dynamicPaths) {
    const { onBeforePrerenderStart } = await import(`${path}+onBeforePrerenderStart`);
    const unlocalizedUrls = (await onBeforePrerenderStart()) as string[];
    const prerenderPageContexts: Partial<PageContext>[] = unlocalizedUrls.map((url) => ({
      urlOriginal: url,
    }));
    const { onPrerenderStart } = await import(`${path}+onPrerenderStart`);
    const prerenderContext = (await onPrerenderStart(prerenderPageContexts)) as PrerenderContext;
    const localizedUrls = prerenderContext.prerenderContext.pageContexts
      .map(({ urlOriginal }) => urlOriginal)
      .filter((url): url is string => typeof url === 'string');

    for (const loc of localizedUrls) {
      // Only push when loc has three or more slashes (avoids top-level index pages)
      if (loc.split('/').length >= 3) {
        customEntries.push({
          loc: `${baseUrl}${loc}`,
        });
      }
    }
  }

  return {
    base: '/',
    envPrefix: 'APP_',
    plugins: [
      { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm] }) },
      vike(),
      react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
      svgr(),
      tailwindcss(),
      sitemap({ baseUrl, sitemapGenerator: sitemapOverride, customEntries }),
    ],
    publicDir: 'public',
    css: {
      devSourcemap: true,
    },
    server: {
      host,
      port,
      allowedHosts: true,
      hmr: {
        path: '/hmr/',
        protocol: 'wss',
        port: hmrPort,
        clientPort: 443,
      },
      cors: {
        origin: ['*'],
      },
    },
    build: {
      target: 'es2022',
      rollupOptions: {
        treeshake: 'smallest',
      },
      sourcemap: true,
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname),
        },
      ],
    },
  } as UserConfig;
});
