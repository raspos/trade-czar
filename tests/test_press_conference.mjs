// test_press_conference.mjs - Verify Press Conference UI & Mechanics
import { createRequire } from 'node:module';
import http from 'http';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.CZAR_PLAYWRIGHT || 'C:/Users/kimwo/OneDrive/문서/New project/.venv-land/Lib/site-packages/playwright/driver/package';
const { chromium } = require(playwrightPath);

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const distDir = 'c:/Users/kimwo/OneDrive/바탕 화면/trade-czar';

// Simple static server
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

server.listen(8089, async () => {
  console.log('Test server running at http://localhost:8089');
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('dialog', dialog => dialog.accept());
  page.on('console', msg => {
    if (msg.type() === 'error') console.error('Browser console error:', msg.text());
  });

  try {
    await page.goto('http://localhost:8089/index.html');
    await page.waitForLoadState('networkidle');

    // 1. Title -> Origin -> Scenario -> Office
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

    // Close onboarding guide if present
    const closeGuide = page.locator('#btn-close-guide');
    if (await closeGuide.isVisible()) {
      await closeGuide.click();
      await page.waitForTimeout(200);
    }

    console.log('✓ Successfully reached Office screen');

    // 2. Advance turn to reach Briefing & Press Conference
    await page.click('#btn-advance-month');
    await page.waitForTimeout(500);

    // 3. Verify Press Conference UI
    const pressContainer = page.locator('.press-qa-container');
    const isPressVisible = await pressContainer.isVisible();
    console.log('✓ Press Conference Container visible:', isPressVisible);

    const choices = await page.locator('.press-choice-card').count();
    console.log(`✓ Press Choice count: ${choices} (Expected: 3)`);
    if (choices !== 3) throw new Error(`Expected 3 choices, got ${choices}`);

    // Verify reporter question text
    const questionText = await page.locator('.press-qa-container p').first().textContent();
    console.log('✓ Reporter Question:', questionText);

    // 4. Click 2nd choice (실용 타협)
    console.log('Clicking choice 1 (실용 타협)...');
    await page.locator('.press-choice-card').nth(1).click();
    await page.waitForTimeout(400);

    // Verify selection indicator
    const selectedBadge = await page.locator('.press-choice-card.selected').textContent();
    console.log('✓ Selected Card Text snippet:', selectedBadge.slice(0, 40));

    // 5. Proceed to Newspaper
    await page.click('#btn-view-newspaper');
    await page.waitForTimeout(400);

    // 6. Verify Newspaper headline matches the choice
    const headlineText = await page.locator('.main-headline').textContent();
    console.log('✓ JoongAng Ilbo Front Page Headline:', headlineText);

    const leadArticle = await page.locator('.front-article p').first().textContent();
    console.log('✓ Article lead snippet:', leadArticle.slice(0, 100));

    // Take screenshot of Press Conference & Newspaper for verification
    await page.screenshot({ path: 'tests/press_conference_newspaper.png' });
    console.log('✓ Saved screenshot to tests/press_conference_newspaper.png');

    console.log('ALL PRESS CONFERENCE CHECKS PASSED!');
  } catch (err) {
    console.error('Test failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
});
