import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  
  const files = [
    '/images/home/About-PG-4.jpg',
    '/images/home/About-PG-2.jpg',
    '/images/home/About-PG-1.jpg',
    '/images/home/Gallery-PG-1.jpg',
    '/images/home/Gallery-PG-2.jpg',
    '/images/home/Service-PG-1.jpg',
  ];

  const html = `
    <html>
      <body style="background:#111;color:#fff;font-family:sans-serif;padding:20px;">
        ${files.map(f => `
          <div style="margin-bottom:30px;">
            <h3>${f}</h3>
            <img src="http://localhost:5173${f}" style="max-height:300px;" />
          </div>
        `).join('')}
      </body>
    </html>
  `;
  await page.setContent(html);
  await page.setViewport({ width: 1000, height: 1800 });
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/check-home-images.png', fullPage: true });
  await browser.close();
  console.log('Saved check-home-images.png');
}

main().catch(console.error);

