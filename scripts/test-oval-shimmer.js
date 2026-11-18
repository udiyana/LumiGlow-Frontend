import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function testOvalAndLogo() {
  const html = `
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@700&family=Playfair+Display:wght@700&family=Podkova:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 60px 20px;
    background: #FFF7DC;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Podkova', serif;
  }
  .promo-wrapper {
    width: 1029px;
    height: 582px;
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
  
  /* SINGLE BORDER OVAL */
  .promo-oval {
    position: absolute;
    left: 27.3%;
    top: 16.5%;
    width: 17.8%;
    height: 66.8%;
    border-radius: 9999px;
    background: #ffffff;
    border: 0.45cqw solid #ffffff;
    overflow: hidden;
    z-index: 20;
    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.18));
  }

  .oval-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 58%;
    overflow: hidden;
  }
  .oval-top img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 25%;
    transform: rotate(-3deg) scale(1.05);
    transform-origin: center;
    display: block;
  }

  .oval-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 52%;
    border-top: 2px solid #ffffff;
    overflow: hidden;
    z-index: 2;
  }
  .oval-bottom img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    transform: rotate(1.5deg) scale(1.05);
    transform-origin: center;
    display: block;
  }

  /* LOGO SHIMMER */
  .logo-icon-wrap {
    position: absolute;
    top: 6%;
    left: 72%;
    transform: translateX(-50%);
    width: 6.5cqw;
    height: 6.5cqw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo-icon-shimmer {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(110deg,#9e882a 0%,#d1ad18 30%,#d1ad18 40%,#fff4b8 50%,#d1ad18 60%,#d1ad18 70%,#9e882a 100%);
    background-size: 200% 100%;
    -webkit-mask-image: url(http://localhost:5173/images/home/Logo-Lumiglow.png);
    -webkit-mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-image: url(http://localhost:5173/images/home/Logo-Lumiglow.png);
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  }

  .logo-text-shimmer {
    position: absolute;
    top: 21%;
    left: 72%;
    transform: translate(-50%, -50%);
    width: 31cqw;
    font-family: 'Raleway', sans-serif;
    font-size: 2.85cqw;
    font-weight: 600;
    letter-spacing: 0.25em;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    line-height: 1;
    background-image: linear-gradient(110deg,#9e882a 0%,#d1ad18 30%,#d1ad18 40%,#fff4b8 50%,#d1ad18 60%,#d1ad18 70%,#9e882a 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }
  .star {
    font-size: 1.5cqw;
    margin-left: 0.5cqw;
    display: inline-block;
  }
</style>
</head>
<body>
  <div class="promo-wrapper">
    <div class="card-inner">
      <div class="white-panel"></div>

      <!-- Single Border Oval with 2 Stacked Images -->
      <div class="promo-oval">
        <div class="oval-top">
          <img src="http://localhost:5173/images/service/Card-2.png" alt="Blonde Model" loading="eager" decoding="async">
        </div>
        <div class="oval-bottom">
          <img src="http://localhost:5173/images/service/Card-1.png" alt="Grey Hair Model" loading="eager" decoding="async">
        </div>
      </div>

      <!-- Shimmering Logo -->
      <div class="logo-icon-wrap">
        <div class="logo-icon-shimmer" role="img" aria-label="LumiGlow"></div>
      </div>
      <div class="logo-text-shimmer">
        <span>LUMIGLOW</span>
        <span class="star">✦</span>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  fs.writeFileSync('test-oval-shimmer.html', html);
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1453, height: 900 });
  await page.goto('file:///' + path.resolve('test-oval-shimmer.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'test-oval-shimmer.png' });
  await browser.close();
  console.log('Saved test-oval-shimmer.png');
}

testOvalAndLogo().catch(console.error);

