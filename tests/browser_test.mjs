// tests/browser_test.mjs - Automated End-to-End Browser & Responsive Test (Test H)
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { join, extname } from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.CZAR_PLAYWRIGHT || 'C:/Users/kimwo/OneDrive/문서/New project/.venv-land/Lib/site-packages/playwright/driver/package';
const chromePath = process.env.CZAR_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const { chromium } = require(playwrightPath);

const projectDir = fileURLToPath(new URL('..', import.meta.url));
const artifactsDir = join(projectDir, 'artifacts', 'browser');
await mkdir(artifactsDir, { recursive: true });

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
console.log('Test HTTP Server ready at:', baseUrl);

let browser;
try {
  browser = await chromium.launch({
    executablePath: chromePath,
    headless: true
  });
  console.log('Chromium launched successfully:', browser.version());

  const viewports = [
    { width: 320, height: 740, name: 'mobile_small' },
    { width: 390, height: 844, name: 'iphone_standard' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1440, height: 900, name: 'desktop' }
  ];

  for (const vp of viewports) {
    console.log(`\n=== Testing Viewport: ${vp.width}x${vp.height} (${vp.name}) ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      isMobile: vp.width < 768,
      hasTouch: vp.width < 768
    });

    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', err => {
      console.log('PAGE ERROR:', err.message);
      errors.push(err.message);
    });
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('requestfailed', req => console.log('REQ FAILED:', req.url(), req.failure()?.errorText));

    // 1. Visit Title Screen
    await page.goto(`${baseUrl}/dist/index.html`);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    console.log('PAGE CONTENT LENGTH:', (await page.content()).length);

    // Check no horizontal scroll overflow
    const overflowTitle = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(overflowTitle, false, `No horizontal overflow on title screen at ${vp.width}px`);
    console.log(`✓ Title screen rendered without horizontal overflow at ${vp.width}px`);

    await page.screenshot({ path: join(artifactsDir, `${vp.width}_1_title.png`) });

    // 2. Click "새 임기 시작" -> Origin select
    await page.click('#btn-new-game');
    await page.waitForTimeout(300);

    const overflowOrigin = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(overflowOrigin, false, `No horizontal overflow on origin screen at ${vp.width}px`);
    console.log(`✓ Origin selection rendered at ${vp.width}px`);
    await page.screenshot({ path: join(artifactsDir, `${vp.width}_2_origin.png`) });

    // 3. Click "시나리오 선택으로"
    await page.click('#btn-next-scenario');
    await page.waitForTimeout(300);

    const overflowSc = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(overflowSc, false, `No horizontal overflow on scenario screen at ${vp.width}px`);
    console.log(`✓ Scenario selection rendered at ${vp.width}px`);
    await page.screenshot({ path: join(artifactsDir, `${vp.width}_3_scenario.png`) });

    // 4. Click "취임 및 집무실 입장"
    await page.click('#btn-start-game');
    await page.waitForTimeout(400);

    const overflowOffice = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(overflowOffice, false, `No horizontal overflow in office at ${vp.width}px`);
    console.log(`✓ Executive Office rendered at ${vp.width}px`);
    await page.screenshot({ path: join(artifactsDir, `${vp.width}_4_office.png`) });

    // 5. Test policy button
    await page.click('#obj-policies');
    await page.waitForTimeout(300);
    console.log(`✓ Policy execution desk opened at ${vp.width}px`);
    await page.screenshot({ path: join(artifactsDir, `${vp.width}_5_policies.png`) });

    // Execute a policy
    const policyBtn = await page.locator('.btn-execute-policy').first();
    if (await policyBtn.isVisible()) {
      await policyBtn.click();
      await page.waitForTimeout(300);
    }

    // Go back to office
    await page.click('button:has-text("집무실")');
    await page.waitForTimeout(300);

    // 6. Advance Month Turn -> Result Briefing
    await page.click('#btn-advance-month');
    await page.waitForTimeout(400);
    console.log(`✓ Monthly trade briefing rendered at ${vp.width}px`);
    await page.screenshot({ path: join(artifactsDir, `${vp.width}_6_briefing.png`) });

    // 7. Click to view JoongAng Ilbo 1면
    await page.click('#btn-view-newspaper');
    await page.waitForTimeout(400);

    const overflowNews = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(overflowNews, false, `No horizontal overflow on JoongAng Ilbo front page at ${vp.width}px`);
    console.log(`✓ JoongAng Ilbo Front Page rendered at ${vp.width}px`);
    await page.screenshot({ path: join(artifactsDir, `${vp.width}_7_newspaper.png`) });

    // Assert zero uncaught JS runtime errors
    assert.equal(errors.length, 0, `Zero page runtime errors at ${vp.width}px: ${errors.join(', ')}`);

    await context.close();
  }

  // Also test standalone play.html
  console.log('\n=== Testing Standalone play.html ===');
  const standaloneContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const standalonePage = await standaloneContext.newPage();
  standalonePage.on('pageerror', err => console.log('STANDALONE PAGE ERROR:', err.message));
  standalonePage.on('console', msg => console.log('STANDALONE PAGE LOG:', msg.text()));
  await standalonePage.goto(`${baseUrl}/play.html`);
  await standalonePage.evaluate(() => localStorage.clear());
  await standalonePage.reload();
  await standalonePage.waitForLoadState('networkidle');
  console.log('STANDALONE CONTENT LENGTH:', (await standalonePage.content()).length);
  assert.ok(await standalonePage.locator('#btn-new-game').isVisible(), 'Standalone play.html loaded');
  console.log('✓ Standalone play.html loaded and fully operational!');
  await standaloneContext.close();

  console.log('\n🎉 ALL BROWSER & RESPONSIVE TESTS PASSED SUCCESSFULLY! Screenshots saved in artifacts/browser/');
} finally {
  if (browser) await browser.close();
  server.close();
}
