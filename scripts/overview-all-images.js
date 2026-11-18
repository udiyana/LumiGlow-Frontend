import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  
  // Let's create an overview HTML of ALL images in public/images/service/ and public/images/home/
  const serviceFiles = fs.readdirSync('public/images/service');
  const homeFiles = fs.readdirSync('public/images/home');

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>
      body { background: #222; color: #fff; font-family: sans-serif; padding: 20px; }
      .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
      .card { background: #333; padding: 10px; border-radius: 8px; }
      img { width: 100%; height: 200px; object-fit: contain; background: #111; }
      p { font-size: 14px; word-break: break-all; }
    </style></head>
    <body>
      <h2>public/images/service</h2>
      <div class="grid">
        ${serviceFiles.map(f => `
          <div class="card">
            <p>${f}</p>
            <img src="http://localhost:5173/images/service/${f}" />
          </div>
        `).join('')}
      </div>
      <h2>public/images/home</h2>
      <div class="grid">
        ${homeFiles.map(f => `
          <div class="card">
            <p>${f}</p>
            <img src="http://localhost:5173/images/home/${f}" />
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.setViewport({ width: 1400, height: 1800 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/all-images-overview.png', fullPage: true });
  await browser.close();
  console.log('Saved all-images-overview.png');
}

main().catch(console.error);

