// scripts/wait_for_pages.mjs
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

const headers = {
  'Authorization': `Bearer ${token}`,
  'Accept': 'application/vnd.github+json',
  'User-Agent': 'Trade-Czar-Deployer'
};

console.log('Polling GitHub Pages build status...');

for (let attempt = 1; attempt <= 30; attempt++) {
  try {
    const res = await fetch(`https://api.github.com/repos/${username}/trade-czar/pages/builds/latest`, { headers });
    if (res.ok) {
      const build = await res.json();
      console.log(`[Attempt ${attempt}] Build status: ${build.status}`);
      if (build.status === 'built') {
        console.log('✓ GitHub Pages build successful!');
        break;
      } else if (build.status === 'errored') {
        console.error('GitHub Pages build failed with error:', build.error);
        process.exit(1);
      }
    } else {
      console.log(`[Attempt ${attempt}] API response: ${res.status}`);
    }

    // Also check direct HTTP
    try {
      const httpRes = await fetch('https://raspos.github.io/trade-czar/', { method: 'HEAD' });
      if (httpRes.status === 200) {
        console.log('✓ Direct HTTP 200 OK received from https://raspos.github.io/trade-czar/ !');
        break;
      }
    } catch (e) {
      // ignore
    }
  } catch (err) {
    console.log(`[Attempt ${attempt}] Error: ${err.message}`);
  }

  await new Promise(r => setTimeout(r, 6000));
}
