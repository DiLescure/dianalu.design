declare global {
  namespace Vike {
    interface Config {
      initialStoredPageState?: Record<string, any>;
      initialVirtualPageState?: Record<string, any>;
    }
  }
}

import type { Config } from 'vike/types';
import vikeReact from 'vike-react/config';
import Layout from '@/layouts/LayoutDefault';

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: 'Clever Stack',
  description: 'Clever Stack is an open-source battle-tested framework for building modern web applications with React, Vite, Vike, and PayloadCMS.',

  trailingSlash: true,

  extends: vikeReact,
} satisfies Config;
