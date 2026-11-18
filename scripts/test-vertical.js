import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function main() {
  const html = `
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Playfair+Display+SC:wght@700&display=swap" rel="stylesheet">
<style>
  body {
    margin: 0;
    padding: 40px;
    background: #1a1a1a;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-container {
    width: 1029px;
    aspect-ratio: 1029 / 582;
    container-type: inline-size;
    position: relative;
    filter: drop-shadow(9px 12px 5px rgba(0,0,0,0.48));
  }
  .card-inner {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(157deg, #53471a 1%, #c4a744 23%, #655728 51%, #705f25 62.5%, #b89d40 77.5%);
  }
  .white-panel {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 62.7%;
    background: #ffffff;
    border-radius: 5.35cqw 0 0 5.35cqw;
  }
  .oval-frame {
    position: absolute;
    left: 27.3%;
    top: 16.5%;
    width: 17.8%;
    height: 66.8%;
    border-radius: 9999px;
    border: 0.4cqw solid #ffffff;
    overflow: hidden;
    z-index: 20;
    background: #e5e5e5;
  }
  .oval-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .text-special {
    position: absolute;
    left: 1cqw;
    top: 94%;
    transform-origin: 0 0;
    transform: rotate(-90deg);
    font-family: 'Playfair Display SC', 'Playfair Display', serif;
    font-weight: 700;
    font-size: 12.15cqw;
    line-height: 0.82;
    color: #ffffff;
    text-shadow: 0 4px 4px rgba(0,0,0,0.25);
    white-space: nowrap;
    letter-spacing: 0.02em;
    user-select: none;
  }
  .text-promo {
    position: absolute;
    left: 12.5cqw;
    top: 70%;
    transform-origin: 0 0;
    transform: rotate(-90deg);
    font-family: 'Playfair Display SC', 'Playfair Display', serif;
    font-weight: 700;
    font-size: 9.72cqw;
    line-height: 0.82;
    color: #ffffff;
    text-shadow: 0 4px 4px rgba(0,0,0,0.25);
    white-space: nowrap;
    letter-spacing: 0.02em;
    user-select: none;
  }
</style>
</head>
<body>
  <div class="card-container">
    <div class="card-inner">
      <div class="text-special">SPECIAL</div>
      <div class="text-promo">PROMO</div>
      <div class="white-panel"></div>
      <div class="oval-frame">
        <img src="http://localhost:5173/images/promo_women.png" alt="Promo">
      </div>
    </div>
  </div>
</body>
</html>
`;
  fs.writeFileSync('test-vertical.html', html);
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1453, height: 800 });
  await page.goto('file:///' + path.resolve('test-vertical.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'test-vertical.png' });
  await browser.close();
  console.log('Saved test-vertical.png');
}

main().catch(console.error);

