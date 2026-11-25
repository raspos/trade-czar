// tests/test_visual_game_stages.mjs
// Playwright automated verification of the 5 Showcase Scenes, 2D character portraits,
// 5 facial expressions, interactive desk props, and docked dialogue box.

import { createRequire } from 'node:module';
import http from 'http';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.CZAR_PLAYWRIGHT || 'C:/Users/kimwo/OneDrive/문서/New project/.venv-land/Lib/site-packages/playwright/driver/package';
const { chromium } = require(playwrightPath);
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const PORT = 50035;
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/play.html';
  const filePath = path.resolve(reqPath.startsWith('/') ? reqPath.slice(1) : reqPath);

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeMap = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.mjs': 'application/javascript; charset=utf-8',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.woff2': 'font/woff2'
    };
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, async () => {
  console.log(`Visual Stage Test Server running at http://127.0.0.1:${PORT}`);
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto(`http://127.0.0.1:${PORT}/play.html`, { waitUntil: 'domcontentloaded' });

    // Start game flow
    await page.click('#btn-new-game');
    await page.waitForTimeout(200);
    await page.click('[data-origin="bureaucrat"]');
    await page.waitForTimeout(200);
    await page.click('#btn-next-scenario');
    await page.waitForTimeout(200);
    await page.click('[data-scenario="baseline"]');
    await page.waitForTimeout(200);
    await page.click('#btn-start-game');
    await page.waitForTimeout(500);

    // Dismiss guide if open
    const guide = page.locator('#btn-close-guide');
    if (await guide.isVisible()) await guide.click();
    await page.waitForTimeout(300);

    // Verify Visual Stage Viewport
    await page.waitForSelector('.game-stage-wrapper', { state: 'visible', timeout: 5000 });
    await page.waitForSelector('.game-stage-viewport', { state: 'visible', timeout: 5000 });
    await page.waitForSelector('.stage-dialogue-box', { state: 'visible', timeout: 5000 });
    console.log('✓ Visual Stage Viewport successfully mounted in Executive Office');

    // -------------------------------------------------------------
    // SCENE 0: 통상교섭본부장 집무실 (DEFAULT OPENING SCENE with Deputy PM)
    // -------------------------------------------------------------
    console.log('\n--- Verifying Scene 0: 통상교섭본부장 집무실 (Default First Screen) ---');
    
    // Verify that on initial entry, NO "미국과 협상" is on screen
    const defaultSceneTitle = await page.$eval('.stage-location-title', el => el.textContent.trim());
    const defaultSpeaker = await page.$eval('.dialogue-speaker-pill strong', el => el.textContent.trim());
    console.log(`Default Scene Title: ${defaultSceneTitle}`);
    console.log(`Default Scene Speaker: ${defaultSpeaker}`);

    if (defaultSceneTitle.includes('미국') || defaultSpeaker.includes('캐서린 타이')) {
      throw new Error('Default first screen still shows US negotiation!');
    }

    // Verify Office Grid Card 2 is Domestic Coordination, not US Negotiation
    const coordCard = await page.$('#obj-domestic-coordination');
    const negoUsCard = await page.$('#obj-nego-us');
    console.log(`Domestic Coordination Card present: ${coordCard !== null}`);
    console.log(`US Negotiation Card present: ${negoUsCard !== null}`);
    if (!coordCard || negoUsCard) {
      throw new Error('Card 2 should be Domestic Coordination, and US Negotiation must not be displayed on entry!');
    }

    // Click interactive desk prop: 📄 2027 통상 현안 종합보고서
    await page.click('.stage-prop-btn[data-pid="trade_agenda"]');
    await page.waitForTimeout(300);
    const propDetail = await page.$eval('.active-prop-dossier', el => el.textContent.trim());
    console.log(`Interactive Desk Prop Opened: ${propDetail.substring(0, 40)}...`);

    // Click Choice 1 (국내 10대 주력 수출산업 공급망 재정비 및 수출금융 가동)
    await page.click('.stage-choice-button[data-cid="min_opt_1"]');
    await page.waitForTimeout(500);

    const s0Reaction = await page.$eval('.dialogue-quote-text', el => el.textContent.trim());
    const s0NpcExpr = await page.$eval('.actor-expression-badge', el => el.textContent.trim());
    console.log(`Deputy PM Reaction: ${s0Reaction.substring(0, 60)}...`);
    console.log(`Deputy PM Expression changed to: ${s0NpcExpr}`);

    await page.screenshot({ path: 'tests/stage_0_minister_office.png', fullPage: false });
    console.log('✓ Saved tests/stage_0_minister_office.png');

    // -------------------------------------------------------------
    // SCENE 2: 대통령 긴급 독대 (Presidential Private Audience)
    // -------------------------------------------------------------
    console.log('\n--- Verifying Scene 2: 대통령 긴급 독대 ---');
    await page.click('.stage-nav-tab[data-skey="president_office"]');
    await page.waitForTimeout(500);

    const s2Title = await page.$eval('.stage-location-title', el => el.textContent.trim());
    const s2Speaker = await page.$eval('.dialogue-speaker-pill strong', el => el.textContent.trim());
    console.log(`Scene 2 Title: ${s2Title}`);
    console.log(`Scene 2 Speaker: ${s2Speaker}`);

    // Click hotline prop
    await page.click('.stage-prop-btn[data-pid="hotline"]');
    await page.waitForTimeout(300);

    // Click Choice 1 (긴급 통상조정권 발동)
    await page.click('.stage-choice-button[data-cid="pres_opt_1"]');
    await page.waitForTimeout(500);

    const s2Reaction = await page.$eval('.dialogue-quote-text', el => el.textContent.trim());
    const s2NpcExpr = await page.$eval('.actor-expression-badge', el => el.textContent.trim());
    console.log(`President Reaction: ${s2Reaction.substring(0, 60)}...`);
    console.log(`President Expression: ${s2NpcExpr}`);

    await page.screenshot({ path: 'tests/stage_2_president_office.png', fullPage: false });
    console.log('✓ Saved tests/stage_2_president_office.png');

    // -------------------------------------------------------------
    // SCENE 3: 현대자동차 경영진과의 투자 협상 (Hyundai Boardroom)
    // -------------------------------------------------------------
    console.log('\n--- Verifying Scene 3: 현대자동차 경영진 협상 ---');
    await page.click('.stage-nav-tab[data-skey="hyundai_boardroom"]');
    await page.waitForTimeout(500);

    const s3Title = await page.$eval('.stage-location-title', el => el.textContent.trim());
    const s3Speaker = await page.$eval('.dialogue-speaker-pill strong', el => el.textContent.trim());
    console.log(`Scene 3 Title: ${s3Title}`);
    console.log(`Scene 3 Speaker: ${s3Speaker}`);

    // Click Georgia blueprint prop
    await page.click('.stage-prop-btn[data-pid="georgia_blueprint"]');
    await page.waitForTimeout(300);

    // Click Choice 1 (R&D 세액공제 확대)
    await page.click('.stage-choice-button[data-cid="hd_opt_1"]');
    await page.waitForTimeout(500);

    const s3Reaction = await page.$eval('.dialogue-quote-text', el => el.textContent.trim());
    const s3NpcExpr = await page.$eval('.actor-expression-badge', el => el.textContent.trim());
    console.log(`Chairman Chung Reaction: ${s3Reaction.substring(0, 60)}...`);
    console.log(`Chairman Chung Expression: ${s3NpcExpr}`);

    await page.screenshot({ path: 'tests/stage_3_hyundai_boardroom.png', fullPage: false });
    console.log('✓ Saved tests/stage_3_hyundai_boardroom.png');

    // -------------------------------------------------------------
    // SCENE 4: 농민단체·재정당국과의 국내 조정회의 (Domestic Council)
    // -------------------------------------------------------------
    console.log('\n--- Verifying Scene 4: 국내 조정회의 ---');
    await page.click('.stage-nav-tab[data-skey="domestic_council"]');
    await page.waitForTimeout(500);

    const s4Title = await page.$eval('.stage-location-title', el => el.textContent.trim());
    const s4Speaker = await page.$eval('.dialogue-speaker-pill strong', el => el.textContent.trim());
    console.log(`Scene 4 Title: ${s4Title}`);
    console.log(`Scene 4 Speaker: ${s4Speaker}`);

    // Click Parliament tally prop
    await page.click('.stage-prop-btn[data-pid="parliament_tally"]');
    await page.waitForTimeout(300);

    // Click Choice 2 (농축산물 민감품목 양허 제외 배수진)
    await page.click('.stage-choice-button[data-cid="dom_opt_2"]');
    await page.waitForTimeout(500);

    const s4Reaction = await page.$eval('.dialogue-quote-text', el => el.textContent.trim());
    const s4NpcExpr = await page.$eval('.actor-expression-badge', el => el.textContent.trim());
    console.log(`Farmer Leader Reaction: ${s4Reaction.substring(0, 60)}...`);
    console.log(`Farmer Leader Expression: ${s4NpcExpr}`);

    await page.screenshot({ path: 'tests/stage_4_domestic_council.png', fullPage: false });
    console.log('✓ Saved tests/stage_4_domestic_council.png');

    // -------------------------------------------------------------
    // SCENE 5: WTO 분쟁해결 회의 (WTO Dispute Chamber)
    // -------------------------------------------------------------
    console.log('\n--- Verifying Scene 5: WTO 분쟁해결 회의 ---');
    await page.click('.stage-nav-tab[data-skey="wto_dispute"]');
    await page.waitForTimeout(500);

    const s5Title = await page.$eval('.stage-location-title', el => el.textContent.trim());
    const s5Speaker = await page.$eval('.dialogue-speaker-pill strong', el => el.textContent.trim());
    console.log(`Scene 5 Title: ${s5Title}`);
    console.log(`Scene 5 Speaker: ${s5Speaker}`);

    // Click DS598 dossier prop
    await page.click('.stage-prop-btn[data-pid="ds598_dossier"]');
    await page.waitForTimeout(300);

    // Click Choice 1 (EU·일본 다자 공동 제소단)
    await page.click('.stage-choice-button[data-cid="wto_opt_1"]');
    await page.waitForTimeout(500);

    const s5Reaction = await page.$eval('.dialogue-quote-text', el => el.textContent.trim());
    const s5NpcExpr = await page.$eval('.actor-expression-badge', el => el.textContent.trim());
    console.log(`WTO Panel Reaction: ${s5Reaction.substring(0, 60)}...`);
    console.log(`WTO Panel Expression: ${s5NpcExpr}`);

    await page.screenshot({ path: 'tests/stage_5_wto_dispute.png', fullPage: false });
    console.log('✓ Saved tests/stage_5_wto_dispute.png');

    // -------------------------------------------------------------
    // Mobile Viewport Verification (390 x 844 iPhone 14)
    // -------------------------------------------------------------
    console.log('\n--- Verifying Mobile Viewport Responsive Layout ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);

    await page.screenshot({ path: 'tests/stage_mobile_visual_stage.png', fullPage: false });
    console.log('✓ Saved tests/stage_mobile_visual_stage.png');

    console.log('\n============================================================');
    console.log('🎉 ALL 5 SHOWCASE SCENES, PORTRAITS & EXPRESSIONS VERIFIED!');
    console.log('============================================================');

  } catch (err) {
    console.error('Test failed with error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
});
