import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

try {
  const robotsPath = resolve(__dirname, '../dist/client/robots.txt');
  statSync(robotsPath);
  const robotsContent = readFileSync(robotsPath, 'utf-8');

  const updatedrobotsContent = robotsContent.replace(/(http|https):\/([^/])/g, '$1://$2');
  writeFileSync(robotsPath, updatedrobotsContent, 'utf-8');

  console.log('Post-build: robots.txt URLs normalized successfully.');
} catch {
  console.log('No robots.txt found, skipping post-build step.');
  process.exit(0);
}
