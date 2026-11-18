import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function main() {
  const html = `
<!DOCTYPE html>
<html>
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
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
    width: min(92%, 1029px);
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
  }
  .oval-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
  .text-special {
    position: absolute;
    left: 1cqw;
    top: 95%;
    transform-origin: 0 0;
    transform: rotate(-90deg);
    font-family: 'Playfair Display SC', 'Playfair Display', serif;
    font-weight: 700;
    font-size: 12.15cqw;
    line-height: 0.8;
    color: #ffffff;
    text-shadow: 0 4px 4px rgba(0,0,0,0.25);
    white-space: nowrap;
    letter-spacing: -0.01em;
    user-select: none;
  }
  .text-promo {
    position: absolute;
    left: 12cqw;
    top: 72%;
    transform-origin: 0 0;
    transform: rotate(-90deg);
    font-family: 'Playfair Display SC', 'Playfair Display', serif;
    font-weight: 700;
    font-size: 9.72cqw;
    line-height: 0.8;
    color: #ffffff;
    text-shadow: 0 4px 4px rgba(0,0,0,0.25);
    white-space: nowrap;
    letter-spacing: 0.01em;
    user-select: none;
  }

  /* B3: Logo LB ikon (lebar 6.5cqw, atas 6% tinggi kartu) */
  .logo-icon-wrap {
    position: absolute;
    top: 6%;
    left: 72%;
    transform: translateX(-50%);
    width: 6.5cqw;
    display: flex;
    justify-content: center;
  }
  .logo-icon {
    width: 6.5cqw;
    height: auto;
    object-fit: contain;
  }

  /* B3: Tulisan LUMIGLOW ✦: lebar total ±31cqw, pusat vertikal ±21% */
  .logo-text {
    position: absolute;
    top: 21%;
    left: 72%;
    transform: translate(-50%, -50%);
    width: 31cqw;
    font-family: 'Raleway', sans-serif;
    color: #ad8f12;
    font-size: 2.85cqw;
    font-weight: 600;
    letter-spacing: 0.25em;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    line-height: 1;
  }
  .logo-text .star {
    font-size: 1.5cqw;
    margin-left: 0.5cqw;
    color: #ad8f12;
  }

  /* GET 20% OFF */
  .text-discount {
    position: absolute;
    top: 28.5%;
    left: 72%;
    transform: translateX(-50%);
    width: 47cqw;
    text-align: center;
    font-family: 'Podkova', serif;
    font-weight: 600;
    font-size: 7.97cqw;
    line-height: 1;
    white-space: nowrap;
    background: linear-gradient(90deg, #9e882a 0%, #d1ad18 24%, #dbd1aa 43%, #d3b330 55%, #a68f3e 70%, #caac32 85%, #dbcd91 95%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text-treatments {
    position: absolute;
    top: 44%;
    left: 72%;
    transform: translateX(-50%);
    width: 50cqw;
    text-align: center;
    font-family: 'Podkova', serif;
    font-weight: 500;
    font-size: 3.89cqw;
    line-height: 1.15;
    color: #453907;
  }

  .text-tags {
    position: absolute;
    top: 63.6%;
    left: 72%;
    transform: translateX(-50%);
    font-family: 'Podkova', serif;
    font-weight: 500;
    font-size: 1.55cqw;
    line-height: 1;
    color: #453907;
    white-space: nowrap;
  }
  .text-tags .bullet {
    font-size: 0.58cqw;
    margin: 0 0.5cqw;
    vertical-align: middle;
  }

  .text-terms {
    position: absolute;
    top: 69.4%;
    left: 72%;
    transform: translateX(-50%);
    font-family: 'Podkova', serif;
    font-weight: 500;
    font-size: 1.55cqw;
    line-height: 1;
    color: #453907;
  }

  .btn-group {
    position: absolute;
    top: 77.7%;
    left: 72%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 1.8cqw;
  }

  .btn-book {
    width: 18.5cqw;
    height: 5.7cqw;
    border-radius: 9999px;
    background: linear-gradient(90deg, #7a692d 5.5%, #bea347 39%, #dfc56e 50%, #b89d40 61.5%, #7a692e 89.5%);
    color: #ffffff;
    font-family: 'Podkova', serif;
    font-weight: 500;
    font-size: 2.33cqw;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
  .btn-more {
    width: 18.5cqw;
    height: 5.7cqw;
    border-radius: 9999px;
    background: #ffffff;
    border: 0.3cqw solid #ad8f12;
    color: #d1ad18;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.15;
    text-decoration: none;
  }
  .btn-more-title {
    font-family: 'Podkova', serif;
    font-weight: 700;
    font-size: 1.55cqw;
  }
  .btn-more-sub {
    font-family: 'Podkova', serif;
    font-weight: 500;
    font-size: 1.26cqw;
  }
</style>
</head>
<body>
  <div class="promo-wrapper">
    <div class="card-inner">
      <div class="text-special">SPECIAL</div>
      <div class="text-promo">PROMO</div>
      <div class="white-panel"></div>
      
      <!-- Oval frame: single clean white border, no background color -->
      <div class="oval-frame">
        <img src="http://localhost:5173/images/promo_women.png" alt="Special Promo">
      </div>

      <!-- B3: Logo LB ikon + LUMIGLOW ✦ -->
      <div class="logo-icon-wrap">
        <img src="http://localhost:5173/images/home/Logo-Lumiglow.png" alt="Logo" class="logo-icon">
      </div>
      <div class="logo-text">
        LUMIGLOW <span class="star">✦</span>
      </div>

      <div class="text-discount">GET 20% OFF</div>

      <div class="text-treatments">
        <div>FOR ALL HAIR &amp; BEAUTY</div>
        <div>TREATMENTS</div>
      </div>

      <div class="text-tags">
        Exclusive Treatment <span class="bullet">●</span> Hair Treatment <span class="bullet">●</span> Pedicure &amp; Medicure
      </div>

      <div class="text-terms">S&amp;K Berlaku</div>

      <div class="btn-group">
        <a href="#book" class="btn-book">BOOK NOW</a>
        <a href="#tabpanel-basic-treatment" class="btn-more">
          <span class="btn-more-title">SEE MORE</span>
          <span class="btn-more-sub">Offers &amp; Treatments</span>
        </a>
      </div>
    </div>
  </div>
</body>
</html>
`;
  fs.writeFileSync('test-logo.html', html);
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1453, height: 900 });
  await page.goto('file:///' + path.resolve('test-logo.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  
  // Measure logo bounding boxes
  const cardBox = await page.$eval('.card-inner', el => {
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  });

  const logoIcon = await page.$eval('.logo-icon-wrap', (el, cb) => {
    const r = el.getBoundingClientRect();
    return {
      left: ((r.left - cb.left) / cb.width * 100).toFixed(2) + '%',
      top: ((r.top - cb.top) / cb.height * 100).toFixed(2) + '%',
      width: (r.width / cb.width * 100).toFixed(2) + '%',
      height: (r.height / cb.height * 100).toFixed(2) + '%'
    };
  }, cardBox);

  const logoText = await page.$eval('.logo-text', (el, cb) => {
    const r = el.getBoundingClientRect();
    return {
      left: ((r.left - cb.left) / cb.width * 100).toFixed(2) + '%',
      top: ((r.top - cb.top) / cb.height * 100).toFixed(2) + '%',
      centerVertical: (((r.top + r.bottom)/2 - cb.top) / cb.height * 100).toFixed(2) + '%',
      width: (r.width / cb.width * 100).toFixed(2) + '%',
      height: (r.height / cb.height * 100).toFixed(2) + '%'
    };
  }, cardBox);

  console.log('Logo Icon:', logoIcon);
  console.log('Logo Text:', logoText);
  await page.screenshot({ path: 'test-logo.png' });
  await browser.close();
  console.log('Saved test-logo.png');
}

main().catch(console.error);

