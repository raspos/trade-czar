// test_domestic_coordination_playthroughs.mjs - Verify Domestic Coordination Game Mechanics
import { createRequire } from 'node:module';
import http from 'http';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.CZAR_PLAYWRIGHT || 'C:/Users/kimwo/OneDrive/문서/New project/.venv-land/Lib/site-packages/playwright/driver/package';
const { chromium } = require(playwrightPath);

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const distDir = 'c:/Users/kimwo/OneDrive/바탕 화면/trade-czar';

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    let contentType = 'text/html';
    if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) contentType = 'application/javascript';
    else if (filePath.endsWith('.css')) contentType = 'text/css';
    else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
    else if (filePath.endsWith('.png')) contentType = 'image/png';
    else if (filePath.endsWith('.json')) contentType = 'application/json';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(0, async () => {
  const port = server.address().port;
  console.log(`Domestic Coordination Test server running at: http://127.0.0.1:${port}`);

  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on('dialog', d => d.accept());

    await page.goto(`http://127.0.0.1:${port}/index.html`);
    await page.waitForLoadState('networkidle');

    // 1. Start game
    await page.click('#btn-new-game');
    await page.waitForTimeout(200);
    await page.click('[data-origin="bureaucrat"]');
    await page.waitForTimeout(200);
    await page.click('#btn-next-scenario');
    await page.waitForTimeout(200);
    await page.click('[data-scenario="baseline"]');
    await page.waitForTimeout(200);
    await page.click('#btn-start-game');
    await page.waitForTimeout(400);

    // Dismiss guide if open
    const guide = page.locator('#btn-close-guide');
    if (await guide.isVisible()) await guide.click();

    console.log('✓ Successfully reached Executive Office');

    // 2. Month 1: Verify Domestic Coordination Panel is visible
    const domProposals = page.locator('.btn-domestic-proposal');
    const propCount = await domProposals.count();
    console.log(`✓ Month 1 Domestic proposals count: ${propCount} (Expected: 3)`);
    if (propCount !== 3) throw new Error(`Expected 3 proposals, got ${propCount}`);

    // Click Proposal 2 (농정·외교 균형 배분안)
    console.log('Clicking Proposal 2 (농정·외교 균형안)...');
    await domProposals.nth(1).click();
    await page.waitForTimeout(300);

    // Verify resolved banner
    const resolvedText = await page.locator('.panel:has-text("국내 조율 타결")').textContent();
    console.log('✓ Resolved Domestic Banner text snippet:', resolvedText.slice(0, 80));

    // Make Month 1 Strategic Decision (Branch B: 전략적 중립)
    console.log('Selecting Strategic Choice 2 (전략적 중립)...');
    await page.locator('.btn-campaign-choice').nth(1).click();
    await page.waitForTimeout(300);

    // Advance to Month 2
    await page.click('#btn-advance-month');
    await page.waitForTimeout(400);
    await page.click('#btn-view-newspaper');
    await page.waitForTimeout(300);
    await page.click('#btn-next-month-flow');
    await page.waitForTimeout(400);

    // 3. Month 2 (Branch B): Verify National Assembly Roll-call domestic coordination mode
    console.log('✓ Reached Month 2 (Branch B)');
    const m2Proposals = page.locator('.btn-domestic-proposal');
    const m2Count = await m2Proposals.count();
    console.log(`✓ Month 2 National Assembly options count: ${m2Count} (Expected: 3)`);
    if (m2Count !== 3) throw new Error(`Expected 3 options in Month 2, got ${m2Count}`);

    // Click Option 1 (초당적 결의안 가결)
    console.log('Voting on National Assembly Floor Option 1...');
    await m2Proposals.nth(0).click();
    await page.waitForTimeout(300);

    const m2Resolved = await page.locator('.panel:has-text("국내 조율 타결")').textContent();
    console.log('✓ Month 2 Roll-call Resolved Banner:', m2Resolved.slice(0, 80));

    // Make Strategic Choice for Month 2
    await page.locator('.btn-campaign-choice').nth(0).click();
    await page.waitForTimeout(300);

    // Advance to Month 3
    await page.click('#btn-advance-month');
    await page.waitForTimeout(400);
    await page.click('#btn-view-newspaper');
    await page.waitForTimeout(300);
    await page.click('#btn-next-month-flow');
    await page.waitForTimeout(400);

    // 4. Month 3: High-Level Treaty Climax
    console.log('✓ Reached Month 3');
    const finalChoices = await page.locator('.btn-campaign-choice').count();
    console.log(`✓ Month 3 Final Treaty choices count: ${finalChoices} (Expected: 2)`);
    if (finalChoices !== 2) throw new Error(`Expected 2 final choices, got ${finalChoices}`);

    await page.locator('.btn-campaign-choice').nth(0).click();
    await page.waitForTimeout(300);

    await page.click('#btn-advance-month');
    await page.waitForTimeout(400);
    await page.click('#btn-view-newspaper');
    await page.waitForTimeout(300);

    const finalHeadline = await page.locator('.main-headline').textContent();
    console.log('✓ Final JoongAng Ilbo Headline:', finalHeadline);

    console.log('============================================================');
    console.log('✅ DOMESTIC COORDINATION GAMEPLAY TEST FULLY PASSED!');
    console.log('============================================================');

    await page.screenshot({ path: 'tests/domestic_coordination_verified.png' });
    console.log('✓ Saved screenshot to tests/domestic_coordination_verified.png');

  } catch (err) {
    console.error('Test failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
});
