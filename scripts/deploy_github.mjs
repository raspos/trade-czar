// scripts/deploy_github.mjs
import { execSync } from 'node:child_process';

// Get credentials from git credential helper
const input = "protocol=https\nhost=github.com\n\n";
const output = execSync('git credential fill', { input, encoding: 'utf8' });
const lines = output.split('\n');
let username = '';
let token = '';

for (const line of lines) {
  if (line.startsWith('username=')) username = line.slice(9).trim();
  if (line.startsWith('password=')) token = line.slice(9).trim();
}

console.log(`Detected GitHub User: ${username}`);
if (!token) {
  console.error('No token found in credential helper.');
  process.exit(1);
}

// Check auth
const userRes = await fetch('https://api.github.com/user', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'Trade-Czar-Deployer'
  }
});

if (!userRes.ok) {
  console.error(`GitHub API auth failed: ${userRes.status} ${userRes.statusText}`);
  const txt = await userRes.text();
  console.error(txt);
  process.exit(1);
}

const userData = await userRes.json();
console.log(`✓ Authenticated as: ${userData.login} (${userData.name})`);

// Check if repo trade-czar exists
const repoRes = await fetch(`https://api.github.com/repos/${username}/trade-czar`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'Trade-Czar-Deployer'
  }
});

if (repoRes.status === 404) {
  console.log(`Creating repository trade-czar for ${username}...`);
  const createRes = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'Trade-Czar-Deployer',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'trade-czar',
      description: '12번의 무역 성적표, 대한민국 산업의 운명이 결정된다. 2027년 대한민국 통상 전략 시뮬레이션 게임',
      homepage: `https://${username}.github.io/trade-czar/`,
      private: false,
      has_issues: true,
      has_projects: false,
      has_wiki: false
    })
  });

  if (!createRes.ok) {
    console.error(`Failed to create repository: ${createRes.status} ${createRes.statusText}`);
    const txt = await createRes.text();
    console.error(txt);
    process.exit(1);
  }
  const repoData = await createRes.json();
  console.log(`✓ Repository created successfully: ${repoData.html_url}`);
} else if (repoRes.ok) {
  console.log('✓ Repository already exists on GitHub.');
} else {
  console.error(`Unexpected repo status: ${repoRes.status}`);
  process.exit(1);
}
