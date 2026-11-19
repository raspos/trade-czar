// scripts/generate_og_image.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.CZAR_PLAYWRIGHT || 'C:/Users/kimwo/OneDrive/문서/New project/.venv-land/Lib/site-packages/playwright/driver/package';
const chromePath = process.env.CZAR_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const { chromium } = require(playwrightPath);

const bgBuffer = readFileSync('assets/office-trade.jpg');
const bgBase64 = `data:image/jpeg;base64,${bgBuffer.toString('base64')}`;

let fontBase64 = '';
try {
  const fontBuffer = readFileSync('assets/pretendard.woff2');
  fontBase64 = `data:font/woff2;base64,${fontBuffer.toString('base64')}`;
} catch (e) {}

const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: 'Pretendard';
    src: url('${fontBase64}') format('woff2');
    font-weight: 400 900;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: #09131f url('${bgBase64}') center center / cover no-repeat;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #fff;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 80px;
  }
  .overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 75% 30%, rgba(11, 22, 38, 0.45) 0%, rgba(8, 16, 28, 0.92) 80%),
                linear-gradient(135deg, rgba(8, 16, 28, 0.96) 0%, rgba(13, 27, 46, 0.82) 55%, rgba(6, 12, 22, 0.96) 100%);
    z-index: 1;
  }
  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
  .top-bar {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .seal {
    width: 52px;
    height: 52px;
    border: 2px solid #c9a84c;
    border-radius: 8px;
    background: rgba(201, 168, 76, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-weight: 900;
    color: #e6ca65;
    box-shadow: 0 0 20px rgba(201, 168, 76, 0.3);
  }
  .org-title {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: #e6ca65;
    text-transform: uppercase;
  }
  .org-sub {
    font-size: 14px;
    color: #94a3b8;
    letter-spacing: 0.08em;
  }
  .center-group {
    margin-top: 10px;
  }
  .eng-wordmark {
    font-size: 82px;
    font-weight: 900;
    letter-spacing: 0.12em;
    line-height: 1;
    color: #ffffff;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
    margin-bottom: 12px;
  }
  .eng-wordmark span {
    color: #e6ca65;
  }
  .kor-title {
    font-size: 42px;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: #f1f5f9;
    margin-bottom: 24px;
  }
  .slogan {
    font-size: 24px;
    font-weight: 500;
    color: #cbd5e1;
    line-height: 1.5;
    border-left: 4px solid #c9a84c;
    padding-left: 18px;
    max-width: 900px;
  }
  .bottom-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 24px;
  }
  .badges {
    display: flex;
    gap: 12px;
  }
  .badge {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(201, 168, 76, 0.4);
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 15px;
    font-weight: 600;
    color: #e2e8f0;
    backdrop-filter: blur(4px);
  }
  .brand-footer {
    font-size: 15px;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.05em;
  }
</style>
</head>
<body>
  <div class="overlay"></div>
  <div class="content">
    <div class="top-bar">
      <div class="seal">通</div>
      <div>
        <div class="org-title">대 한 민 국 통 상 교 섭 본 부</div>
        <div class="org-sub">MINISTRY OF TRADE, INDUSTRY AND ENERGY · REPUBLIC OF KOREA</div>
      </div>
    </div>

    <div class="center-group">
      <div class="eng-wordmark">TRADE <span>CZAR</span></div>
      <div class="kor-title">통상교섭본부장</div>
      <div class="slogan">12번의 무역 성적표, 대한민국 산업의 운명이 결정된다.<br>2027년 대한민국 통상 전략 시뮬레이션</div>
    </div>

    <div class="bottom-bar">
      <div class="badges">
        <div class="badge">⚖️ 한미 관세 협상</div>
        <div class="badge">📊 관세청 실제 경제 데이터</div>
        <div class="badge">📰 중앙일보 가상 1면</div>
        <div class="badge">🏢 6대 기업 투자 대응</div>
      </div>
      <div class="brand-footer">© databrew. All rights reserved.</div>
    </div>
  </div>
</body>
</html>
`;

console.log('Generating 1200x630 OG image...');
const browser = await chromium.launch({ headless: true, executablePath: chromePath });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1
});

await page.setContent(htmlContent, { waitUntil: 'load' });
await page.waitForTimeout(500);

const ogPath = 'assets/og-image.png';
const distOgPath = 'dist/assets/og-image.png';
const artifactOgPath = 'C:/Users/kimwo/.gemini/antigravity/brain/b094447a-bec0-4ea3-8cdf-8609e6690dbd/og-image.png';

await page.screenshot({ path: ogPath });
await page.screenshot({ path: distOgPath });
await page.screenshot({ path: artifactOgPath });

console.log('✓ Successfully saved 1200x630 OG Image to:');
console.log('  -', ogPath);
console.log('  -', distOgPath);
console.log('  -', artifactOgPath);

await browser.close();
