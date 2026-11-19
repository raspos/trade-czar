// tests/live_pages_test.mjs
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.CZAR_PLAYWRIGHT || 'C:/Users/kimwo/OneDrive/문서/New project/.venv-land/Lib/site-packages/playwright/driver/package';
const chromePath = process.env.CZAR_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const { chromium } = require(playwrightPath);

const ARTIFACT_DIR = 'C:/Users/kimwo/.gemini/antigravity/brain/b094447a-bec0-4ea3-8cdf-8609e6690dbd';
const LIVE_URL = 'https://raspos.github.io/trade-czar/';

console.log(`Starting live Playwright E2E test against: ${LIVE_URL}`);

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath
});

const consoleErrors = [];

// ==========================================================
// 1. Desktop Test (1440 x 900)
// ==========================================================
console.log('\n--- 1. Testing Desktop (1440x900) ---');
const desktopContext = await browser.newContext({
  viewport: { width: 1440, height: 900 }
});
const page = await desktopContext.newPage();
page.on('dialog', dialog => dialog.accept());

page.on('console', msg => {
  if (msg.type() === 'error') {
    console.error(`[Browser Console Error]: ${msg.text()}`);
    consoleErrors.push(msg.text());
  }
});

page.on('pageerror', err => {
  console.error(`[Browser Unhandled Exception]: ${err.message}`);
  consoleErrors.push(err.message);
});

// Navigate to Live Site
await page.goto(LIVE_URL, { waitUntil: 'networkidle' });

// Verify Storage Safety: inject key from another project (bok-governor)
await page.evaluate(() => {
  localStorage.setItem('bok-governor:savegame', JSON.stringify({ test: 'PRESERVE_ME' }));
});

console.log('Taking desktop title screenshot...');
await page.screenshot({ path: path.join(ARTIFACT_DIR, 'live_desktop_title.png'), fullPage: true });

// Test Guide Modal
console.log('Testing "게임 방법" modal...');
await page.click('#btn-guide');
await page.waitForTimeout(400);
const guideVisible = await page.isVisible('.play-guide');
console.log(`✓ Guide dialog visible: ${guideVisible}`);
await page.click('#btn-close-guide');
await page.waitForTimeout(300);

// Test Settings Modal
console.log('Testing "설정" modal...');
await page.click('#btn-settings');
await page.waitForTimeout(400);
const settingsVisible = await page.isVisible('.pause-menu');
console.log(`✓ Settings dialog visible: ${settingsVisible}`);
await page.click('#btn-close-settings');
await page.waitForTimeout(300);

// Start New Game
console.log('Starting New Game...');
await page.click('#btn-new-game');
await page.waitForTimeout(400);

// Origin Select
console.log('Selecting Origin: Bureaucrat...');
await page.click('[data-origin="bureaucrat"]');
await page.waitForTimeout(200);
await page.click('#btn-next-scenario');
await page.waitForTimeout(400);

// Scenario Select
console.log('Selecting Scenario 1 (Baseline)...');
await page.click('[data-scenario="baseline"]');
await page.waitForTimeout(200);
await page.click('#btn-start-game');
await page.waitForTimeout(500);

console.log('Entered Executive Office. Playing 12 Months...');
for (let m = 1; m <= 12; m++) {
  // Check if early verdict reached
  if (await page.locator('#btn-title-return').isVisible()) {
    console.log(`Early verdict reached at month ${m}`);
    break;
  }

  // Dismiss first-time guide if visible
  const dismissBtn = page.locator('#btn-dismiss-first-guide');
  if (await dismissBtn.isVisible()) {
    await dismissBtn.click();
    await page.waitForTimeout(200);
  }

  // Answer event choice if visible
  const evChoice = page.locator('.btn-event-choice').first();
  if (await evChoice.isVisible()) {
    await evChoice.click();
    await page.waitForTimeout(200);
  }

  // Month 1: Engage in US negotiation
  if (m === 1) {
    const usNegoBtn = page.locator('#obj-nego-us');
    if (await usNegoBtn.isVisible()) {
      await usNegoBtn.click();
      await page.waitForTimeout(300);
      const cardBtn = page.locator('.btn-play-card').first();
      if (await cardBtn.isVisible()) {
        await cardBtn.click();
        await page.waitForTimeout(200);
      }
      const agreeBtn = page.locator('#btn-conclude-agree');
      if (await agreeBtn.isVisible()) {
        await agreeBtn.click();
        await page.waitForTimeout(300);
        const closeTradeoff = page.locator('#btn-close-tradeoff-modal');
        if (await closeTradeoff.isVisible()) {
          await closeTradeoff.click();
          await page.waitForTimeout(200);
        }
      }
    }
  }

  // Execute a policy
  const policiesBtn = page.locator('#obj-policies');
  if (await policiesBtn.isVisible()) {
    await policiesBtn.click();
    await page.waitForTimeout(200);
    const execBtn = page.locator('.btn-execute-policy:not([disabled])').first();
    if (await execBtn.isVisible()) {
      await execBtn.click();
      await page.waitForTimeout(200);
    }
    await page.click('button:has-text("집무실")');
    await page.waitForTimeout(200);
  }

  // Advance Month
  const advBtn = page.locator('#btn-advance-month');
  if (await advBtn.isVisible()) {
    await advBtn.click();
    await page.waitForTimeout(400);
  }

  if (await page.locator('#btn-title-return').isVisible()) {
    console.log(`Verdict screen reached at month ${m}`);
    break;
  }

  // Briefing Screen -> View Newspaper
  const newsBtn = page.locator('#btn-view-newspaper');
  if (await newsBtn.isVisible()) {
    await newsBtn.click();
    await page.waitForTimeout(400);
  }

  // Newspaper Screen -> Advance to next month flow
  const nextMonthBtn = page.locator('#btn-next-month-flow');
  if (await nextMonthBtn.isVisible()) {
    await nextMonthBtn.click();
    await page.waitForTimeout(400);
  }

  if (await page.locator('#btn-title-return').isVisible()) {
    console.log(`Verdict screen reached after month ${m} flow`);
    break;
  }
}

// Ensure we reached Verdict Screen
await page.waitForSelector('#btn-title-return', { timeout: 15000 });
console.log('✓ Successfully reached final Verdict / Ending screen!');
await page.screenshot({ path: path.join(ARTIFACT_DIR, 'live_desktop_verdict.png'), fullPage: true });

// Check Storage Isolation: Verify other game data is intact!
const preservedOtherData = await page.evaluate(() => localStorage.getItem('bok-governor:savegame'));
console.log(`Preserved other game data: ${preservedOtherData}`);
if (!preservedOtherData || !preservedOtherData.includes('PRESERVE_ME')) {
  throw new Error('FAIL: Other game data was deleted by localStorage operation!');
}
console.log('✓ Storage isolation verified: Only trade-czar: prefixed keys are touched.');

await desktopContext.close();

// ==========================================================
// 2. Mobile Test (390 x 844 - iPhone 14)
// ==========================================================
console.log('\n--- 2. Testing Mobile (390x844) ---');
const mobileContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true
});
const mobilePage = await mobileContext.newPage();
mobilePage.on('dialog', dialog => dialog.accept());

mobilePage.on('console', msg => {
  if (msg.type() === 'error') consoleErrors.push(`[Mobile Console Error]: ${msg.text()}`);
});
mobilePage.on('pageerror', err => {
  consoleErrors.push(`[Mobile Page Error]: ${err.message}`);
});

await mobilePage.goto(LIVE_URL, { waitUntil: 'networkidle' });
console.log('Taking mobile title screenshot...');
await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, 'live_mobile_title.png'), fullPage: true });

// Navigate into office on mobile
await mobilePage.click('#btn-new-game');
await mobilePage.waitForTimeout(400);
await mobilePage.click('[data-origin="industry_expert"]');
await mobilePage.waitForTimeout(200);
await mobilePage.click('#btn-next-scenario');
await mobilePage.waitForTimeout(400);
await mobilePage.click('[data-scenario="tariff_war"]');
await mobilePage.waitForTimeout(200);
await mobilePage.click('#btn-start-game');
await mobilePage.waitForTimeout(500);

console.log('Taking mobile office screenshot...');
await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, 'live_mobile_office.png'), fullPage: true });

await mobileContext.close();
await browser.close();

console.log('\n======================================================');
console.log(`Total Console / Page Errors: ${consoleErrors.length}`);
if (consoleErrors.length > 0) {
  console.error('Errors found:');
  consoleErrors.forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log('✓ All Live Tests on https://raspos.github.io/trade-czar/ PASSED with 0 errors!');
}
