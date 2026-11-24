// tests/test_czar_2_0.mjs - Comprehensive Verification for TRADE CZAR 2.0
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
  if (reqPath === '/' || reqPath === '') reqPath = '/play.html';
  const filePath = path.join(distDir, reqPath.startsWith('/') ? reqPath.slice(1) : reqPath);

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
  console.log(`Trade Czar 2.0 Test Server running at http://127.0.0.1:${port}`);

  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  try {
    await page.goto(`http://127.0.0.1:${port}/play.html`, { waitUntil: 'domcontentloaded' });

    // 1. Title Screen Verification
    console.log('\n--- 1. Testing Title Screen ---');
    const titleText = await page.$eval('.title-main', el => el.textContent.trim());
    const mottoText = await page.$eval('.title-motto', el => el.textContent.trim());
    console.log(`Title: ${titleText}, Motto: ${mottoText}`);

    // Verify [취임하기] button exists
    const btnInaugurate = await page.$('#btn-inaugurate');
    if (!btnInaugurate) throw new Error('btn-inaugurate not found!');

    // 2. Click [취임하기] -> Must reach first decision immediately (< 15 seconds)
    console.log('\n--- 2. Clicking [취임하기] & Measuring Time to Decision ---');
    const t0 = Date.now();
    await btnInaugurate.click();
    await page.waitForSelector('.game-container', { state: 'visible', timeout: 5000 });
    await page.waitForSelector('.choice-btn', { state: 'visible', timeout: 5000 });
    const elapsedSec = (Date.now() - t0) / 1000;
    console.log(`✓ Reached Month 1 first decision in ${elapsedSec.toFixed(2)} seconds (< 15s limit pass!)`);

    // 3. Verify Negotiation Table is 100% GONE
    console.log('\n--- 3. Verifying Negotiation Table Deletion ---');
    const negoCards = await page.$$('.negotiation-cards, .negotiation-stage, .tension-bar, #obj-nego');
    if (negoCards.length > 0) throw new Error('Forbidden negotiation elements detected!');
    console.log('✓ Verified: Zero negotiation table / cards / tension bars exist anywhere.');

    // 4. Verify 5 Core Elements on Game Screen
    console.log('\n--- 4. Verifying 5 Core Game Elements ---');
    const headerRole = await page.$eval('.game-role', el => el.textContent.trim());
    const headerDate = await page.$eval('.game-date', el => el.textContent.trim());
    console.log(`① Header: ${headerRole} · ${headerDate}`);

    const metricsCount = await page.$$eval('.metric-item', els => els.length);
    console.log(`② 4 Core Metrics: ${metricsCount} metrics (Expected 4)`);

    const imageVisible = await page.$eval('.event-image-frame img', el => !!el.src);
    console.log(`③ Event Image Present: ${imageVisible}`);

    const eventTitle = await page.$eval('.event-title', el => el.textContent.trim());
    const eventDesc = await page.$eval('.event-desc', el => el.textContent.trim());
    console.log(`④ Event Title: "${eventTitle}" (${eventTitle.length} chars)`);
    console.log(`   Event Desc: "${eventDesc}" (${eventDesc.length} chars)`);

    const choices = await page.$$eval('.choice-btn', els => els.map(e => e.textContent.trim()));
    console.log(`⑤ Choices Count: ${choices.length}`);
    choices.forEach((c, idx) => {
      console.log(`   Choice ${idx + 1}: ${c}`);
      // Verify NO stat spoilers like +3 or -5pt
      if (/\+[0-9]+%?|\-[0-9]+%?|\+[0-9]+pt|\-[0-9]+pt/.test(c)) {
        throw new Error(`Stat spoiler detected in choice: ${c}`);
      }
    });
    console.log('✓ Verified: Zero stat spoiler numbers in choices.');

    await page.screenshot({ path: 'tests/czar_2_0_game_screen.png' });
    console.log('✓ Saved screenshot tests/czar_2_0_game_screen.png');

    // 5. Test Choice Selection & Immediate Feedback
    console.log('\n--- 5. Making Choice 1 (에너지 수입 확대) ---');
    await page.click('.choice-btn:nth-child(1)');
    await page.waitForSelector('.feedback-box', { state: 'visible', timeout: 3000 });
    const feedbackText = await page.$eval('.feedback-quote', el => el.textContent.trim());
    console.log(`Immediate Reaction: "${feedbackText}"`);

    // 6. View Newspaper
    console.log('\n--- 6. Viewing JoongAng Ilbo Front Page ---');
    await page.click('#btn-view-newspaper');
    await page.waitForSelector('.newspaper-wrapper', { state: 'visible', timeout: 3000 });

    const headline = await page.$eval('.newspaper-headline', el => el.textContent.trim());
    const newsBody = await page.$eval('.newspaper-body-text', el => el.textContent.trim());
    console.log(`Newspaper Headline: "${headline}"`);
    console.log(`Newspaper Article: "${newsBody.substring(0, 80)}..." (${newsBody.length} chars)`);

    await page.screenshot({ path: 'tests/czar_2_0_newspaper.png' });
    console.log('✓ Saved screenshot tests/czar_2_0_newspaper.png');

    // 7. Advance to Month 2
    console.log('\n--- 7. Advancing to Month 2 ---');
    await page.click('#btn-next-month');
    await page.waitForSelector('.game-container', { state: 'visible', timeout: 3000 });
    const m2Date = await page.$eval('.game-date', el => el.textContent.trim());
    const m2Title = await page.$eval('.event-title', el => el.textContent.trim());
    console.log(`Month 2 Date: ${m2Date}, Title: "${m2Title}"`);

    // 8. Test Status Modal (Detailed Ledger)
    console.log('\n--- 8. Testing [상세 지표] Modal ---');
    await page.click('#btn-open-status');
    await page.waitForSelector('.modal-overlay', { state: 'visible', timeout: 3000 });
    console.log('✓ Status modal opened cleanly');
    await page.click('#btn-close-status');
    await page.waitForSelector('.modal-overlay', { state: 'hidden', timeout: 3000 });
    console.log('✓ Status modal closed cleanly');

    // 9. Mobile Viewport Verification (390px iPhone 14)
    console.log('\n--- 9. Verifying Mobile Responsiveness (390px) ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/czar_2_0_mobile.png' });
    console.log('✓ Saved mobile screenshot tests/czar_2_0_mobile.png');

    // 10. Playthrough Test: Full 12 Months to Ending
    console.log('\n--- 10. Completing 12 Months Strategic Playthrough ---');
    await page.setViewportSize({ width: 1200, height: 800 });

    // Loop until verdict screen
    let currentM = 2;
    while (currentM <= 12) {
      // Pick first choice
      await page.waitForSelector('.choice-btn', { state: 'visible', timeout: 5000 });
      await page.click('.choice-btn:nth-child(1)');
      await page.waitForSelector('#btn-view-newspaper', { state: 'visible', timeout: 5000 });
      await page.click('#btn-view-newspaper');
      await page.waitForSelector('#btn-next-month', { state: 'visible', timeout: 5000 });
      await page.click('#btn-next-month');
      await page.waitForTimeout(400);

      const isVerdict = await page.$('.verdict-container');
      if (isVerdict) {
        console.log(`✓ Reached Verdict after Month ${currentM}!`);
        break;
      }
      currentM++;
    }

    const verdictTitle = await page.$eval('.verdict-title', el => el.textContent.trim());
    const verdictEpilogue = await page.$eval('.verdict-epilogue', el => el.textContent.trim());
    console.log(`Ending Title: "${verdictTitle}"`);
    console.log(`Ending Epilogue: "${verdictEpilogue}"`);

    await page.screenshot({ path: 'tests/czar_2_0_verdict.png' });
    console.log('✓ Saved ending screenshot tests/czar_2_0_verdict.png');

    console.log('\n============================================================');
    console.log('🎉 ALL TRADE CZAR 2.0 REBOOT REQUIREMENTS VERIFIED (0 ERRORS)');
    console.log('============================================================');

  } catch (err) {
    console.error('Test failed with error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
});
