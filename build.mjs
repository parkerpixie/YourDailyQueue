import { copyFile, cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';

const coreFiles = ['index.html', 'styles.css', 'polish.css', 'app.js'];
const assetExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico']);

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const file of coreFiles) {
  await copyFile(file, `dist/${file}`);
}

for (const entry of await readdir('.')) {
  if (coreFiles.includes(entry) || entry === 'dist' || entry === 'node_modules') continue;
  const info = await stat(entry);
  if (info.isFile() && assetExtensions.has(extname(entry).toLowerCase())) {
    await copyFile(entry, join('dist', entry));
  }
}

try {
  await cp('Assets', 'dist/Assets', { recursive: true });
} catch {
  // Assets is optional. Root-level graphics are copied above.
}

console.log('Built Your Daily Queue → dist with app files and visual assets');
