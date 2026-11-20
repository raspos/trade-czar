// build-play.mjs - Bundler for standalone play.html
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const dist = new URL('./dist/', import.meta.url);
const read = (name, encoding) => readFile(new URL(name, dist), encoding);

const artwork = [
  'assets/office-trade.jpg',
  'assets/war-room.jpg',
  'assets/negotiation-us.jpg',
  'assets/negotiation-cn.jpg',
  'assets/negotiation-multi.jpg',
  'assets/press-v2.jpg',
  'assets/origins-trade.jpg',
  'assets/office-rebuild.jpg',
  'assets/joongang-logo.png',
  'assets/pretendard.woff2',
  'assets/noto-serif-kr.woff2',
  'assets/paperlogy.woff2'
];

const availableArtwork = artwork.filter(name => existsSync(new URL(name, dist)));

const [html, css, assets, ...modules] = await Promise.all([
  read('index.html', 'utf8'),
  read('style.css', 'utf8'),
  Promise.all(availableArtwork.map(name => read(name))),
  ...[
    'constants.mjs',
    'prng.mjs',
    'data.mjs',
    'scenarios.mjs',
    'origins.mjs',
    'corporations.mjs',
    'economy.mjs',
    'negotiations.mjs',
    'policies.mjs',
    'events.mjs',
    'politics.mjs',
    'press.mjs',
    'newspaper.mjs',
    'verdict.mjs',
    'storage.mjs',
    'game.mjs',
    'ui.mjs'
  ].map(name => read(name, 'utf8'))
]);

// Embed artwork into CSS
const styles = availableArtwork.reduce((source, name, i) => {
  const mime = name.endsWith('.woff2') 
    ? 'data:font/woff2' 
    : (name.endsWith('.png') ? 'data:image/png' : 'data:image/jpeg');
  const base64 = assets[i].toString('base64');
  return source.replaceAll('./' + name, `${mime};base64,${base64}`);
}, css);

// Combine modules stripping import/export
let js = modules.map(source => 
  source
    .replace(/^import .*;\r?\n/gm, '')
    .replace(/^export (const|class|function|let|var) /gm, '$1 ')
    .replace(/^export default /gm, '')
    .replace(/^export \{[^}]*\};\r?\n/gm, '')
).join('\n');

// Also replace artwork in JS (except fonts) with base64 data URIs
for (let i = 0; i < availableArtwork.length; i++) {
  const name = availableArtwork[i];
  if (name.endsWith('.woff2')) continue;
  const mime = name.endsWith('.png') ? 'data:image/png' : 'data:image/jpeg';
  const base64 = assets[i].toString('base64');
  js = js.replaceAll('./' + name, `${mime};base64,${base64}`);
}

const page = html
  .replace('<link rel="stylesheet" href="./style.css">', () => '<style>' + styles + '</style>')
  .replace('<script type="module" src="./ui.mjs"></script>', '')
  .replace('</body>', () => '<script>' + js.replaceAll('</script', '<\\/script') + '</script></body>');

await writeFile(new URL('./play.html', import.meta.url), page);
await writeFile(new URL('./index.html', import.meta.url), page);
console.log('Successfully generated standalone play.html and index.html (' + Math.round(page.length / 1024) + ' KB)');
