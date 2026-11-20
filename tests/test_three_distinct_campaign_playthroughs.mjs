// tests/test_three_distinct_campaign_playthroughs.mjs
// Verifies 3 completely distinct branching playthroughs for the Taiwan Strait Crisis Campaign
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
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
console.log('Test server running at:', baseUrl);

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const playthroughResults = [];

async function startNewGame(page) {
  page.on('dialog', d => d.accept());
  await page.goto(baseUrl + '/play.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });

  // 1. Title Screen -> Origin Select
  const btnNewGame = page.locator('#btn-new-game');
  await btnNewGame.waitFor({ state: 'visible', timeout: 8000 });
  await btnNewGame.click();
  await page.waitForTimeout(300);

  // 2. Origin Select -> Scenario Select
  await page.locator('[data-origin="bureaucrat"]').click();
  await page.waitForTimeout(200);
  const btnNextScenario = page.locator('#btn-next-scenario');
  await btnNextScenario.waitFor({ state: 'visible', timeout: 5000 });
  await btnNextScenario.click();
  await page.waitForTimeout(200);

  // 3. Scenario Select -> Office
  await page.locator('[data-scenario="baseline"]').click();
  await page.waitForTimeout(200);
  const btnStartGame = page.locator('#btn-start-game');
  await btnStartGame.waitFor({ state: 'visible', timeout: 5000 });
  await btnStartGame.click();

  await page.waitForSelector('.campaign-situation-room', { state: 'visible', timeout: 8000 });
}

try {
  // =========================================================================
  // PLAYTHROUGH 1: BRANCH A (미국 결속 노선)
  // =========================================================================
  console.log('\n============================================================');
  console.log('▶ [PLAYTHROUGH 1] Branch A: 미국 공급망 안보 동맹 전면 결속 노선');
  console.log('============================================================');
  const context1 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page1 = await context1.newPage();
  await startNewGame(page1);

  // Month 1: Check situation room title
  const m1Title = await page1.locator('.campaign-situation-room h2').textContent();
  console.log(`[P1 M1 Title]: ${m1Title}`);

  // Inspect intel tab
  await page1.locator('.btn-intel-tab').nth(0).click();
  await page1.waitForTimeout(300);

  // Choose Choice 1: choice_m1_us_alliance
  console.log('[P1 M1] Selecting Choice 1 (미국 안보 동맹 전면 결속)...');
  await page1.locator('.btn-campaign-choice[data-cid="choice_m1_us_alliance"]').click();
  await page1.waitForTimeout(400);

  // Choose Statement 1: stmt_m1_pro_us
  await page1.locator('.btn-campaign-stmt[data-sid="stmt_m1_pro_us"]').click();
  await page1.waitForTimeout(400);

  // Advance to Month 1 Results
  await page1.locator('#btn-advance-month').click();
  await page1.waitForSelector('#btn-view-newspaper', { state: 'visible', timeout: 6000 });

  // Read Newspaper Front Page for M1
  await page1.locator('#btn-view-newspaper').click();
  await page1.waitForSelector('.main-headline', { state: 'visible', timeout: 6000 });
  const p1M1Headline = await page1.locator('.main-headline').textContent();
  console.log(`[P1 M1 Headline]: ${p1M1Headline}`);

  // Return to Office for Month 2 via newspaper flow button
  await page1.locator('#btn-next-month-flow').click();

  // Month 2: Verify Branch A loaded!
  await page1.waitForSelector('.campaign-situation-room', { state: 'visible', timeout: 6000 });
  const p1M2Title = await page1.locator('.campaign-situation-room h2').textContent();
  console.log(`[P1 M2 Title]: ${p1M2Title}`);
  if (!p1M2Title.includes('흑연 금수')) {
    throw new Error(`Expected Branch A (흑연 금수 조치) in M2, but got: ${p1M2Title}`);
  }

  // Choose Choice A1: choice_m2_a1_counter_deal
  console.log('[P1 M2] Selecting Choice A1 (텍사스 첨단 패키징 카드로 초과이익 환수 무력화)...');
  await page1.locator('.btn-campaign-choice[data-cid="choice_m2_a1_counter_deal"]').click();
  await page1.waitForTimeout(400);

  // Choose Statement
  await page1.locator('.btn-campaign-stmt[data-sid="stmt_m2_a1"]').click();
  await page1.waitForTimeout(400);

  // Advance to Month 2 Results
  await page1.locator('#btn-advance-month').click();
  await page1.waitForSelector('#btn-view-newspaper', { state: 'visible', timeout: 6000 });
  await page1.locator('#btn-view-newspaper').click();
  await page1.waitForSelector('.main-headline', { state: 'visible', timeout: 6000 });
  const p1M2Headline = await page1.locator('.main-headline').textContent();
  console.log(`[P1 M2 Headline]: ${p1M2Headline}`);

  // Return to Office for Month 3 via newspaper flow button
  await page1.locator('#btn-next-month-flow').click();

  // Month 3: Verify Branch A Climax loaded!
  await page1.waitForSelector('.campaign-situation-room', { state: 'visible', timeout: 6000 });
  const p1M3Title = await page1.locator('.campaign-situation-room h2').textContent();
  console.log(`[P1 M3 Title]: ${p1M3Title}`);
  if (!p1M3Title.includes('백악관 정상회담')) {
    throw new Error(`Expected Branch A Climax (백악관 정상회담) in M3, but got: ${p1M3Title}`);
  }

  // Choose Final Choice A1: choice_m3_a_sign_big_deal
  console.log('[P1 M3] Selecting Final Choice A1 (한·미 포괄적 통상 빅딜 서명)...');
  await page1.locator('.btn-campaign-choice[data-cid="choice_m3_a_sign_big_deal"]').click();
  await page1.waitForTimeout(400);

  // Advance to Month 3 Results
  await page1.locator('#btn-advance-month').click();
  await page1.waitForSelector('#btn-view-newspaper', { state: 'visible', timeout: 6000 });
  await page1.locator('#btn-view-newspaper').click();
  await page1.waitForSelector('.main-headline', { state: 'visible', timeout: 6000 });
  const p1M3Headline = await page1.locator('.main-headline').textContent();
  console.log(`[P1 M3 Headline]: ${p1M3Headline}`);

  playthroughResults.push({
    path: 'Branch A (미국 결속)',
    m1Title,
    m1Headline: p1M1Headline,
    m2Title: p1M2Title,
    m2Headline: p1M2Headline,
    m3Title: p1M3Title,
    m3Headline: p1M3Headline
  });
  await context1.close();

  // =========================================================================
  // PLAYTHROUGH 2: BRANCH B (전략적 자율성과 공급망 중립 선언)
  // =========================================================================
  console.log('\n============================================================');
  console.log('▶ [PLAYTHROUGH 2] Branch B: 전략적 자율성과 공급망 중립 지대 선언 노선');
  console.log('============================================================');
  const context2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page2 = await context2.newPage();
  await startNewGame(page2);

  // Month 1: Choose Choice 2: choice_m1_strategic_neutrality
  console.log('[P2 M1] Selecting Choice 2 (전략적 자율성과 공급망 중립 선언)...');
  await page2.locator('.btn-campaign-choice[data-cid="choice_m1_strategic_neutrality"]').click();
  await page2.waitForTimeout(400);

  // Choose Statement 2: stmt_m1_commercial_pragmatism
  await page2.locator('.btn-campaign-stmt[data-sid="stmt_m1_commercial_pragmatism"]').click();
  await page2.waitForTimeout(400);

  // Advance to Month 1 Results
  await page2.locator('#btn-advance-month').click();
  await page2.waitForSelector('#btn-view-newspaper', { state: 'visible', timeout: 6000 });
  await page2.locator('#btn-view-newspaper').click();
  await page2.waitForSelector('.main-headline', { state: 'visible', timeout: 6000 });
  const p2M1Headline = await page2.locator('.main-headline').textContent();
  console.log(`[P2 M1 Headline]: ${p2M1Headline}`);

  // Return to Office for Month 2 via newspaper flow button
  await page2.locator('#btn-next-month-flow').click();

  // Month 2: Verify Branch B loaded!
  await page2.waitForSelector('.campaign-situation-room', { state: 'visible', timeout: 6000 });
  const p2M2Title = await page2.locator('.campaign-situation-room h2').textContent();
  console.log(`[P2 M2 Title]: ${p2M2Title}`);
  if (!p2M2Title.includes('세컨더리 보이콧')) {
    throw new Error(`Expected Branch B (세컨더리 보이콧) in M2, but got: ${p2M2Title}`);
  }

  // Choose Choice B1: choice_m2_b1_reject_china_dumping
  console.log('[P2 M2] Selecting Choice B1 (중국 저가 덤핑 거부 & 미 의회 반도체 안보 설득)...');
  await page2.locator('.btn-campaign-choice[data-cid="choice_m2_b1_reject_china_dumping"]').click();
  await page2.waitForTimeout(400);

  // Choose Statement
  await page2.locator('.btn-campaign-stmt[data-sid="stmt_m2_b1"]').click();
  await page2.waitForTimeout(400);

  // Advance to Month 2 Results
  await page2.locator('#btn-advance-month').click();
  await page2.waitForSelector('#btn-view-newspaper', { state: 'visible', timeout: 6000 });
  await page2.locator('#btn-view-newspaper').click();
  await page2.waitForSelector('.main-headline', { state: 'visible', timeout: 6000 });
  const p2M2Headline = await page2.locator('.main-headline').textContent();
  console.log(`[P2 M2 Headline]: ${p2M2Headline}`);

  // Return to Office for Month 3 via newspaper flow button
  await page2.locator('#btn-next-month-flow').click();

  // Month 3: Verify Branch B Climax loaded!
  await page2.waitForSelector('.campaign-situation-room', { state: 'visible', timeout: 6000 });
  const p2M3Title = await page2.locator('.campaign-situation-room h2').textContent();
  console.log(`[P2 M3 Title]: ${p2M3Title}`);
  if (!p2M3Title.includes('제네바 실리콘 협정')) {
    throw new Error(`Expected Branch B Climax (제네바 실리콘 협정) in M3, but got: ${p2M3Title}`);
  }

  // Choose Final Choice B1: choice_m3_b_firm_stand
  console.log('[P2 M3] Selecting Final Choice B1 (규범 기반 다자 합의 원안 고수)...');
  await page2.locator('.btn-campaign-choice[data-cid="choice_m3_b_firm_stand"]').click();
  await page2.waitForTimeout(400);

  // Advance to Month 3 Results
  await page2.locator('#btn-advance-month').click();
  await page2.waitForSelector('#btn-view-newspaper', { state: 'visible', timeout: 6000 });
  await page2.locator('#btn-view-newspaper').click();
  await page2.waitForSelector('.main-headline', { state: 'visible', timeout: 6000 });
  const p2M3Headline = await page2.locator('.main-headline').textContent();
  console.log(`[P2 M3 Headline]: ${p2M3Headline}`);

  playthroughResults.push({
    path: 'Branch B (전략적 중립)',
    m1Title,
    m1Headline: p2M1Headline,
    m2Title: p2M2Title,
    m2Headline: p2M2Headline,
    m3Title: p2M3Title,
    m3Headline: p2M3Headline
  });
  await context2.close();

  // =========================================================================
  // PLAYTHROUGH 3: BRANCH C (용인 클러스터 국내 자립 & 신흥 다자 선회)
  // =========================================================================
  console.log('\n============================================================');
  console.log('▶ [PLAYTHROUGH 3] Branch C: 용인 메가 클러스터 국내 자립 & 신흥 다자 시장 선회');
  console.log('============================================================');
  const context3 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page3 = await context3.newPage();
  await startNewGame(page3);

  // Month 1: Choose Choice 3: choice_m1_domestic_sovereignty
  console.log('[P3 M1] Selecting Choice 3 (용인 클러스터 국내 자립 & 신흥 시장 선회)...');
  await page3.locator('.btn-campaign-choice[data-cid="choice_m1_domestic_sovereignty"]').click();
  await page3.waitForTimeout(400);

  // Choose Statement 3: stmt_m1_corporate_autonomy
  await page3.locator('.btn-campaign-stmt[data-sid="stmt_m1_corporate_autonomy"]').click();
  await page3.waitForTimeout(400);

  // Advance to Month 1 Results
  await page3.locator('#btn-advance-month').click();
  await page3.waitForSelector('#btn-view-newspaper', { state: 'visible', timeout: 6000 });
  await page3.locator('#btn-view-newspaper').click();
  await page3.waitForSelector('.main-headline', { state: 'visible', timeout: 6000 });
  const p3M1Headline = await page3.locator('.main-headline').textContent();
  console.log(`[P3 M1 Headline]: ${p3M1Headline}`);

  // Return to Office for Month 2 via newspaper flow button
  await page3.locator('#btn-next-month-flow').click();

  // Month 2: Verify Branch C loaded!
  await page3.waitForSelector('.campaign-situation-room', { state: 'visible', timeout: 6000 });
  const p3M2Title = await page3.locator('.campaign-situation-room h2').textContent();
  console.log(`[P3 M2 Title]: ${p3M2Title}`);
  if (!p3M2Title.includes('용인 송전탑')) {
    throw new Error(`Expected Branch C (용인 송전탑 전쟁) in M2, but got: ${p3M2Title}`);
  }

  // Choose Choice C1: choice_m2_c1_power_fasttrack
  console.log('[P3 M2] Selecting Choice C1 (국가전력망 직권 패스트트랙 & EU 500억 달러 빅딜)...');
  await page3.locator('.btn-campaign-choice[data-cid="choice_m2_c1_power_fasttrack"]').click();
  await page3.waitForTimeout(400);

  // Choose Statement
  await page3.locator('.btn-campaign-stmt[data-sid="stmt_m2_c1"]').click();
  await page3.waitForTimeout(400);

  // Advance to Month 2 Results
  await page3.locator('#btn-advance-month').click();
  await page3.waitForSelector('#btn-view-newspaper', { state: 'visible', timeout: 6000 });
  await page3.locator('#btn-view-newspaper').click();
  await page3.waitForSelector('.main-headline', { state: 'visible', timeout: 6000 });
  const p3M2Headline = await page3.locator('.main-headline').textContent();
  console.log(`[P3 M2 Headline]: ${p3M2Headline}`);

  // Return to Office for Month 3 via newspaper flow button
  await page3.locator('#btn-next-month-flow').click();

  // Month 3: Verify Branch C Climax loaded!
  await page3.waitForSelector('.campaign-situation-room', { state: 'visible', timeout: 6000 });
  const p3M3Title = await page3.locator('.campaign-situation-room h2').textContent();
  console.log(`[P3 M3 Title]: ${p3M3Title}`);
  if (!p3M3Title.includes('자립형 K-반도체')) {
    throw new Error(`Expected Branch C Climax (자립형 K-반도체) in M3, but got: ${p3M3Title}`);
  }

  // Choose Final Choice C1: choice_m3_c_expand_green_deal
  console.log('[P3 M3] Selecting Final Choice C1 (친환경 제철·배터리 유럽 무관세 협정)...');
  await page3.locator('.btn-campaign-choice[data-cid="choice_m3_c_expand_green_deal"]').click();
  await page3.waitForTimeout(400);

  // Advance to Month 3 Results
  await page3.locator('#btn-advance-month').click();
  await page3.waitForSelector('#btn-view-newspaper', { state: 'visible', timeout: 6000 });
  await page3.locator('#btn-view-newspaper').click();
  await page3.waitForSelector('.main-headline', { state: 'visible', timeout: 6000 });
  const p3M3Headline = await page3.locator('.main-headline').textContent();
  console.log(`[P3 M3 Headline]: ${p3M3Headline}`);

  playthroughResults.push({
    path: 'Branch C (자주 자립)',
    m1Title,
    m1Headline: p3M1Headline,
    m2Title: p3M2Title,
    m2Headline: p3M2Headline,
    m3Title: p3M3Title,
    m3Headline: p3M3Headline
  });
  await context3.close();

  // =========================================================================
  // COMPARISON AND VERIFICATION
  // =========================================================================
  console.log('\n============================================================');
  console.log('🎯 [3-PLAYTHROUGH COMPARISON MATRIX]');
  console.log('============================================================');
  console.table(playthroughResults.map(r => ({
    'Path': r.path,
    'M2 Title': r.m2Title,
    'M2 Headline': r.m2Headline.substring(0, 32) + '...',
    'M3 Title': r.m3Title,
    'M3 Headline': r.m3Headline.substring(0, 32) + '...'
  })));

  // Assert that each month 2 & 3 title and headline are completely different
  const m2Titles = new Set(playthroughResults.map(r => r.m2Title));
  const m3Titles = new Set(playthroughResults.map(r => r.m3Title));
  const m2Headlines = new Set(playthroughResults.map(r => r.m2Headline));
  const m3Headlines = new Set(playthroughResults.map(r => r.m3Headline));

  if (m2Titles.size !== 3 || m3Titles.size !== 3) {
    throw new Error('Verification failed: Titles in Month 2 or 3 are not mutually distinct!');
  }
  if (m2Headlines.size !== 3 || m3Headlines.size !== 3) {
    throw new Error('Verification failed: Headlines in Month 2 or 3 are not mutually distinct!');
  }

  console.log('\n✅ ALL 3 PLAYTHROUGHS SUCCESSFULLY VERIFIED AS COMPLETELY DISTINCT GEOPOLITICAL NARRATIVE PATHS!');
} finally {
  await browser.close();
  server.close();
}
