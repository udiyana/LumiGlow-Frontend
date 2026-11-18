import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function testShineDirection() {
  const html = `
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@700&display=swap" rel="stylesheet">
<style>
  body {
    background: #443a08;
    padding: 60px;
    display: flex;
    gap: 40px;
  }
  .word-wrap {
    width: 400px;
    height: 100px;
    border: 1px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
  }
  .shine-text {
    font-family: 'Playfair Display SC', serif;
    font-size: 70px;
    font-weight: 700;
    background-image: linear-gradient(90deg,#ffffff 0%,#ffffff 38%,#f7e3a0 46%,#e8c55a 50%,#f7e3a0 54%,#ffffff 62%,#ffffff 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 4px 4px rgba(0,0,0,0.25));
  }
  .pos-0 { background-position: 0% 0%; }
  .pos-50 { background-position: 50% 0%; }
  .pos-100 { background-position: 100% 0%; }
  .pos-minus-50 { background-position: -50% 0%; }
</style>
</head>
<body>
  <div class="word-wrap"><span class="shine-text pos-0">SPECIAL</span></div>
  <div class="word-wrap"><span class="shine-text pos-50">SPECIAL</span></div>
  <div class="word-wrap"><span class="shine-text pos-100">SPECIAL</span></div>
  <div class="word-wrap"><span class="shine-text pos-minus-50">SPECIAL</span></div>
</body>
</html>
  `;

  fs.writeFileSync('test-shine-dir.html', html);
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 600 });
  await page.goto('file:///' + path.resolve('test-shine-dir.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'test-shine-dir.png' });
  await browser.close();
  console.log('Saved test-shine-dir.png');
}

testShineDirection().catch(console.error);

