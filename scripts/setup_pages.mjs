// scripts/setup_pages.mjs
import { execSync } from 'node:child_process';

const input = "protocol=https\nhost=github.com\n\n";
const output = execSync('git credential fill', { input, encoding: 'utf8' });
const lines = output.split('\n');
let username = '';
let token = '';

for (const line of lines) {
  if (line.startsWith('username=')) username = line.slice(9).trim();
  if (line.startsWith('password=')) token = line.slice(9).trim();
}

console.log(`Setting up GitHub Pages for ${username}/trade-czar...`);

const headers = {
  'Authorization': `Bearer ${token}`,
  'Accept': 'application/vnd.github+json',
  'User-Agent': 'Trade-Czar-Deployer'
};

// Check if Pages is already enabled
const checkRes = await fetch(`https://api.github.com/repos/${username}/trade-czar/pages`, { headers });

if (checkRes.status === 404) {
  console.log('Enabling GitHub Pages on branch main, path / ...');
  const enableRes = await fetch(`https://api.github.com/repos/${username}/trade-czar/pages`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      source: {
        branch: 'main',
        path: '/'
      }
    })
  });

  if (!enableRes.ok) {
    const errText = await enableRes.text();
    console.error(`Failed to enable Pages: ${enableRes.status} ${enableRes.statusText}`, errText);
    process.exit(1);
  }
  const pageData = await enableRes.json();
  console.log('✓ Pages enabled:', pageData.html_url || pageData.url);
} else if (checkRes.ok) {
  const pageData = await checkRes.json();
  console.log('✓ Pages already enabled:', pageData.html_url);
} else {
  console.error(`Unexpected response checking pages: ${checkRes.status}`);
  const errText = await checkRes.text();
  console.error(errText);
}
