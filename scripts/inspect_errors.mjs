// scripts/inspect_errors.mjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const playwrightPath = process.env.CZAR_PLAYWRIGHT || 'C:/Users/kimwo/OneDrive/문서/New project/.venv-land/Lib/site-packages/playwright/driver/package';
const chromePath = process.env.CZAR_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const { chromium } = require(playwrightPath);

const browser = await chromium.launch({ headless: true, executablePath: chromePath });
const page = await browser.newPage();

page.on('response', res => {
  if (res.status() >= 400) {
    console.log(`[HTTP ${res.status()}]: ${res.url()}`);
  }
});

page.on('console', msg => {
  console.log(`[CONSOLE ${msg.type()}]: ${msg.text()}`);
});

await page.goto('https://raspos.github.io/trade-czar/', { waitUntil: 'networkidle' });
await page.click('#btn-new-game');
await page.waitForTimeout(400);
await page.click('[data-origin="bureaucrat"]');
await page.waitForTimeout(300);
await page.click('#btn-next-scenario');
await page.waitForTimeout(300);
await page.click('[data-scenario="baseline"]');
await page.waitForTimeout(300);
await page.click('#btn-start-game');
await page.waitForTimeout(1000);

await browser.close();
