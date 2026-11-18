import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function testOval() {
  const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    padding: 60px;
    background: #555;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card {
    width: 1029px;
    height: 582px;
    position: relative;
    container-type: inline-size;
    background: linear-gradient(157deg, #53471a 1%, #c4a744 23%, #655728 51%, #705f25 62.5%, #b89d40 77.5%);
  }
  .white-panel {
    position: absolute; right: 0; top: 0; bottom: 0; width: 62.7%;
    background: #fff;
    border-radius: 5.35cqw 0 0 5.35cqw;
  }
  .promo-oval {
    position: absolute;
    left: 27.3%;
    top: 16.5%;
    width: 17.8%;
    height: 66.8%;
    border-radius: 9999px;
    background: #fff;
    border: 0.7cqw solid #fff;
    box-sizing: border-box;
    overflow: hidden;
    z-index: 20;
    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.18));
  }
</style>
</head>
<body>
  <div class="card">
    <div class="white-panel"></div>
    <div class="promo-oval">
      <!-- Top: Card-2.png (blonde) -->
      <div class="absolute inset-0" style="position:absolute;inset:0;clip-path:polygon(0 0, 100% 0, 100% 44%, 0 58%);transform:translateZ(0);">
        <img src="http://localhost:5173/images/service/Card-2.png" alt="" decoding="async" loading="eager"
          style="position:absolute;left:0;top:0;width:100%;height:64%;object-fit:cover;object-position:center 20%;" />
      </div>
      <!-- Bottom: Card-1.png (grey) -->
      <div class="absolute inset-0" style="position:absolute;inset:0;clip-path:polygon(0 58%, 100% 44%, 100% 100%, 0 100%);transform:translateZ(0);">
        <img src="http://localhost:5173/images/service/Card-1.png" alt="" decoding="async" loading="eager"
          style="position:absolute;left:0;bottom:0;width:100%;height:62%;object-fit:cover;object-position:center 30%;" />
      </div>
    </div>
  </div>
</body>
</html>
  `;

  fs.writeFileSync('test-diagonal-oval.html', html);
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1453, height: 800 });
  await page.goto('file:///' + path.resolve('test-diagonal-oval.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  
  const ovalEl = await page.$('.promo-oval');
  if (ovalEl) {
    await ovalEl.screenshot({ path: 'test-diagonal-oval.png' });
  }
  await page.screenshot({ path: 'test-diagonal-card.png' });
  await browser.close();
  console.log('Saved test-diagonal-oval.png and test-diagonal-card.png');
}

testOval().catch(console.error);

