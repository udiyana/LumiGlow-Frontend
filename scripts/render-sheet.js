import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  
  const files = [
    '1.png', '2.png', '3.png', '4.png', '5.png', '7.png', '8.png', '9.png', '10.png', '12.png',
    'Menu-1.png', 'Menu-2.png', 'Menu-3.png'
  ];

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>
      body { background: #181818; color: #fff; font-family: sans-serif; padding: 20px; }
      .row { display: flex; flex-wrap: wrap; gap: 20px; }
      .box { width: 400px; background: #262626; padding: 10px; border-radius: 8px; border: 1px solid #444; }
      img { width: 100%; height: auto; display: block; border: 1px solid #666; }
      h3 { margin: 0 0 8px 0; color: #f5d061; }
    </style></head>
    <body>
      <h2>public/images/service Gallery</h2>
      <div class="row">
        ${files.map(f => `
          <div class="box">
            <h3>${f}</h3>
            <img src="http://localhost:5173/images/service/${f}" />
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.setViewport({ width: 1400, height: 2600 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/service-gallery-sheet.png', fullPage: true });
  await browser.close();
  console.log('Saved service-gallery-sheet.png');
}

main().catch(console.error);

