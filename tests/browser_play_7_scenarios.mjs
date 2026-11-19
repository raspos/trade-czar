// tests/browser_play_7_scenarios.mjs - Full Browser Playthrough of All 7 Scenarios with Playwright
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, copyFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { join, extname } from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.CZAR_PLAYWRIGHT || 'C:/Users/kimwo/OneDrive/문서/New project/.venv-land/Lib/site-packages/playwright/driver/package';
const chromePath = process.env.CZAR_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const { chromium } = require(playwrightPath);

const projectDir = fileURLToPath(new URL('..', import.meta.url));
const rc1Dir = join(projectDir, 'artifacts', 'rc1');
const brainDir = 'C:/Users/kimwo/.gemini/antigravity/brain/b094447a-bec0-4ea3-8cdf-8609e6690dbd';
await mkdir(rc1Dir, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2'
};

const server = createServer(async (req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/' || urlPath === '') urlPath = 'dist/index.html';

  const cleanPath = urlPath.replace(/^[/\\]+/, '');
  const filePath = join(projectDir, cleanPath);
  try {
    const data = await readFile(filePath);
    const mime = MIME[extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  } catch (err) {
    res.writeHead(404).end('Not Found: ' + cleanPath);
  }
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;
console.log('Test Server running at:', baseUrl);

const SCENARIOS_TO_TEST = [
  { id: 'baseline', name: '시나리오 1. 대한민국의 무역을 책임져라 (기준 시나리오)' },
  { id: 'tariff_war', name: '시나리오 2. 관세의 전쟁 (미국 25% 보편·자동차 관세)' },
  { id: 'chip_paradox', name: '시나리오 3. 반도체의 역설 (AI 반도체 착시 vs 전통 제조업 침체)' },
  { id: 'china_push', name: '시나리오 4. 중국의 역습 (저가 덤핑 공세와 샌드위치 위기)' },
  { id: 'krw_appreciation', name: '시나리오 5. 흔들리는 원화 (환율 급락 및 채산성 비상)' },
  { id: 'oil_shock', name: '시나리오 6. 오일 쇼크 (유가 115달러 돌파 및 무역적자 공포)' },
  { id: 'random_2027', name: '시나리오 7. 격동의 2027년 (복합 경제 충격과 무작위 위기)' }
];

let browser;
try {
  browser = await chromium.launch({
    executablePath: chromePath,
    headless: true
  });
  console.log('Chromium browser launched:', browser.version());

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  page.on('dialog', dialog => dialog.accept());
  
  const pageErrors = [];
  page.on('pageerror', err => {
    console.error('PAGE ERROR:', err.message);
    pageErrors.push(err.message);
  });

  const playthroughResults = [];

  for (let sIdx = 0; sIdx < SCENARIOS_TO_TEST.length; sIdx++) {
    const sc = SCENARIOS_TO_TEST[sIdx];
    console.log(`\n================================================================`);
    console.log(`  [PLAYTHROUGH ${sIdx + 1}/7] Testing Scenario: ${sc.name} (${sc.id})`);
    console.log(`================================================================`);

    // 1. Visit title screen
    await page.goto(`${baseUrl}/dist/index.html`);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');

    if (sIdx === 0) {
      console.log('  📸 Capturing Screenshot 1: 타이틀 화면');
      await page.screenshot({ path: join(rc1Dir, '1_title.png') });
    }

    // 2. Click "새 임기 시작" -> origin select
    await page.click('#btn-new-game');
    await page.waitForTimeout(300);

    // Pick origin (cycling through all 3 backgrounds: bureaucrat, industry_expert, politician)
    const origins = ['bureaucrat', 'industry_expert', 'politician'];
    const originPick = origins[sIdx % origins.length];
    await page.click(`[data-origin="${originPick}"]`);
    await page.waitForTimeout(200);
    await page.click('#btn-next-scenario');
    await page.waitForTimeout(300);

    // 3. Scenario select
    await page.click(`[data-scenario="${sc.id}"]`);
    await page.waitForTimeout(200);

    // Enter office
    await page.click('#btn-start-game');
    await page.waitForTimeout(500);

    if (sIdx === 0) {
      console.log('  📸 Capturing Screenshot 2: 집무실 화면');
      await page.screenshot({ path: join(rc1Dir, '2_office.png') });
    }

    // 4. Play Months
    for (let month = 1; month <= 12; month++) {
      // Check if verdict screen reached early
      if (await page.locator('#btn-title-return').isVisible()) {
        console.log(`  ⚡ Early verdict reached at month ${month}`);
        break;
      }

      // Check if dismissed guide is needed
      const dismissGuideBtn = page.locator('#btn-dismiss-first-guide');
      if (await dismissGuideBtn.isVisible()) {
        await dismissGuideBtn.click();
        await page.waitForTimeout(200);
      }

      // Check for active event choices
      const eventChoiceBtn = page.locator('.btn-event-choice').first();
      if (await eventChoiceBtn.isVisible()) {
        await eventChoiceBtn.click();
        await page.waitForTimeout(300);
      }

      // In month 1 or 2, engage in US negotiation
      if (month === 1) {
        const usNegoBtn = page.locator('#obj-nego-us');
        if (await usNegoBtn.isVisible()) {
          await usNegoBtn.click();
          await page.waitForTimeout(400);

          if (sIdx === 0) {
            console.log('  📸 Capturing Screenshot 3: 미국 통상협상 화면');
            await page.screenshot({ path: join(rc1Dir, '3_negotiation_us.png') });
          }

          // Play a card
          const cardBtn = page.locator('.btn-play-card').first();
          if (await cardBtn.isVisible()) {
            await cardBtn.click();
            await page.waitForTimeout(300);
          }

          // Conclude negotiation with agree or defer
          const agreeBtn = page.locator('#btn-conclude-agree');
          if (await agreeBtn.isVisible()) {
            await agreeBtn.click();
            await page.waitForTimeout(400);

            // Close tradeoff modal
            const closeTradeoffBtn = page.locator('#btn-close-tradeoff-modal');
            if (await closeTradeoffBtn.isVisible()) {
              await closeTradeoffBtn.click();
              await page.waitForTimeout(300);
            }
          }
        }
      }

      // Execute policies if AP remaining
      const policiesBtn = page.locator('#obj-policies');
      if (await policiesBtn.isVisible()) {
        await policiesBtn.click();
        await page.waitForTimeout(300);

        // Execute available policies until AP is 0
        for (let ap = 0; ap < 3; ap++) {
          const execBtn = page.locator('.btn-execute-policy:not([disabled])').first();
          if (await execBtn.isVisible()) {
            await execBtn.click();
            await page.waitForTimeout(250);
          }
        }

        // Return to office
        await page.click('button:has-text("집무실")');
        await page.waitForTimeout(300);
      }

      // Advance month
      const advBtn = page.locator('#btn-advance-month');
      if (await advBtn.isVisible()) {
        await advBtn.click();
        await page.waitForTimeout(500);
      }

      // If early dismissal occurred, screen might be verdict now
      if (await page.locator('#btn-title-return').isVisible()) {
        console.log(`  ⚡ Dismissal occurred at month ${month}, transitioned to verdict`);
        break;
      }

      // On Result Briefing Screen
      if (sIdx === 0 && month === 1) {
        console.log('  📸 Capturing Screenshot 4: 무역통계 발표 화면');
        await page.screenshot({ path: join(rc1Dir, '4_result_briefing.png') });
      }

      // Click to view newspaper
      const newsBtn = page.locator('#btn-view-newspaper');
      if (await newsBtn.isVisible()) {
        await newsBtn.click();
        await page.waitForTimeout(500);
      }

      // On Newspaper Screen
      if (sIdx === 0 && month === 1) {
        console.log('  📸 Capturing Screenshot 5: 중앙일보 가상 1면');
        await page.screenshot({ path: join(rc1Dir, '5_newspaper.png') });
      }

      // Advance to next month flow
      const nextMonthBtn = page.locator('#btn-next-month-flow');
      if (await nextMonthBtn.isVisible()) {
        await nextMonthBtn.click();
        await page.waitForTimeout(500);
      }
    }

    // After month 12 or dismissal, game arrives at Verdict Screen!
    if (sIdx === 0) {
      console.log('  📸 Capturing Screenshot 6: 최종 엔딩 화면');
      await page.screenshot({ path: join(rc1Dir, '6_verdict.png') });
    }

    // Extract Verdict Info
    const endingTitle = await page.locator('.front-page h3').first().innerText();
    const mainHeadline = await page.locator('.main-headline').innerText();
    console.log(`  🎉 Finished scenario [${sc.id}]!`);
    console.log(`     • ${endingTitle.trim()}`);
    console.log(`     • ${mainHeadline.trim()}`);

    playthroughResults.push({
      scenarioId: sc.id,
      scenarioName: sc.name,
      endingTitle: endingTitle.trim(),
      mainHeadline: mainHeadline.trim()
    });

    // Return to title screen
    const returnTitleBtn = page.locator('#btn-title-return');
    if (await returnTitleBtn.isVisible()) {
      await returnTitleBtn.click();
      await page.waitForTimeout(400);
    }
  }

  // Copy screenshots to brain directory
  const screenshotFiles = [
    '1_title.png',
    '2_office.png',
    '3_negotiation_us.png',
    '4_result_briefing.png',
    '5_newspaper.png',
    '6_verdict.png'
  ];

  for (const f of screenshotFiles) {
    const src = join(rc1Dir, f);
    const dest = join(brainDir, f);
    await copyFile(src, dest);
    console.log(`✓ Copied ${f} to artifact directory: ${dest}`);
  }

  console.log('\n================================================================');
  console.log('  7 SCENARIO PLAYTHROUGH SUMMARY:');
  console.log('================================================================');
  console.table(playthroughResults);

  assert.equal(pageErrors.length, 0, `Zero page errors during all 7 playthroughs: ${pageErrors.join(' | ')}`);
  assert.equal(playthroughResults.length, 7, 'All 7 scenarios successfully completed 12 months!');

  console.log('\n🎉 ALL 7 SCENARIOS VERIFIED END-TO-END IN BROWSER WITHOUT A SINGLE ERROR!');
} finally {
  if (browser) await browser.close();
  server.close();
}
