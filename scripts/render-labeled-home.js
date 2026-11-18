import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  
  const files = [
    'About-PG-1.jpg',
    'About-PG-2.jpg',
    'About-PG-3.jpg',
    'About-PG-4.jpg',
    'Gallery-PG-1.jpg',
    'Gallery-PG-2.jpg',
    'Service-PG-1.jpg',
    'Home-PG-1.jpg',
    'Home-PG-2.jpg',
    'Home-PG-3.jpg',
    'CTA-Home-PG-1.jpg'
  ];

  const html = `
    <html>
      <body style="background:#111;color:#fff;font-family:sans-serif;padding:20px;">
        ${files.map(f => `
          <div style="display:inline-block;margin:15px;vertical-align:top;width:250px;">
            <h4>${f}</h4>
            <img src="http://localhost:5173/images/home/${f}" style="width:100%;height:auto;border:2px solid #aaa;" />
          </div>
        `).join('')}
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.setViewport({ width: 1200, height: 1600 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/home-images-labeled.png', fullPage: true });
  await browser.close();
  console.log('Saved home-images-labeled.png');
}

main().catch(console.error);

