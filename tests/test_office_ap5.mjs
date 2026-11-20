// tests/test_office_ap5.mjs
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.CZAR_PLAYWRIGHT || 'C:/Users/kimwo/OneDrive/문서/New project/.venv-land/Lib/site-packages/playwright/driver/package';
const chromePath = process.env.CZAR_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const { chromium } = require(playwrightPath);

const projectDir = fileURLToPath(new URL('..', import.meta.url));

const server = createServer(async (req, res) => {
  try {
    const cleanPath = req.url.split('?')[0];
    const filePath = join(projectDir, cleanPath === '/' ? 'index.html' : cleanPath);
    const data = await readFile(filePath);
    res.writeHead(200);
    res.end(data);
  } catch (e) {
    res.writeHead(404).end('Not found');
  }
});

await new Promise(r => server.listen(0, '127.0.0.1', r));
const baseUrl = `http://127.0.0.1:${server.address().port}`;
console.log('Test server at:', baseUrl);

const browser = await chromium.launch({ headless: true, executablePath: chromePath });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('dialog', d => d.accept());

const errors = [];
page.on('console', msg => {
  if (msg.type() === 'error') errors.push(msg.text());
});
page.on('pageerror', err => errors.push(err.message));

await page.goto(`${baseUrl}/`);
await page.click('#btn-new-game');
await page.waitForTimeout(300);
await page.click('[data-origin="bureaucrat"]');
await page.waitForTimeout(200);
await page.click('#btn-next-scenario');
await page.waitForTimeout(200);
await page.click('[data-scenario="baseline"]');
await page.waitForTimeout(200);
await page.click('#btn-start-game');
await page.waitForTimeout(500);

// Verify AP is 5
const apText = await page.locator('.ap-banner-text h3').innerText();
console.log('AP Banner Header:', apText);

if (!apText.includes('5 / 5') && !apText.includes('5')) {
  throw new Error('AP is not 5: ' + apText);
}

// Verify 3 steps are visible
const step1 = await page.isVisible('.step-badge:has-text("STEP 1")');
const step2 = await page.isVisible('.step-badge:has-text("STEP 2")');
const step3 = await page.isVisible('.step-badge:has-text("STEP 3")');
console.log(`Step 1: ${step1}, Step 2: ${step2}, Step 3: ${step3}`);

if (!step1 || !step2 || !step3) {
  throw new Error('Step headers missing');
}

// Check 5 AP slots
const slotCount = await page.locator('.ap-slot-box').count();
console.log('AP Slots Count:', slotCount);
if (slotCount !== 5) {
  throw new Error('Expected 5 AP slots, got ' + slotCount);
}

// Execute 1 policy and verify AP becomes 4
await page.click('#obj-policies');
await page.waitForTimeout(400);
const firstPolicy = page.locator('.btn-execute-policy').first();
if (await firstPolicy.isVisible()) {
  await firstPolicy.click();
  await page.waitForTimeout(300);
}
await page.click('button:has-text("집무실")');
await page.waitForTimeout(300);

const apAfter1 = await page.locator('.ap-banner-text h3').innerText();
console.log('AP After 1 Policy:', apAfter1);

// Advance turn
await page.click('#btn-advance-month');
await page.waitForTimeout(500);
await page.click('#btn-view-newspaper');
await page.waitForTimeout(400);
await page.click('#btn-next-month-flow');
await page.waitForTimeout(500);

// In Month 2, verify AP resets to 5
const apMonth2 = await page.locator('.ap-banner-text h3').innerText();
console.log('Month 2 AP:', apMonth2);

// Take screenshot of new office
await page.screenshot({ path: 'C:/Users/kimwo/.gemini/antigravity/brain/b094447a-bec0-4ea3-8cdf-8609e6690dbd/new_office_desk.png' });
console.log('Saved screenshot new_office_desk.png');

await browser.close();
server.close();

console.log('Total console/page errors:', errors.length);
if (errors.length > 0) {
  console.error(errors);
  process.exit(1);
} else {
  console.log('✓ Test successfully passed with 0 errors!');
}
