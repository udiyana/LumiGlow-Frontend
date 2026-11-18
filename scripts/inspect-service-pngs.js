import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  const names = ['1.png', '2.png', '3.png', '4.png', '5.png', '7.png', '8.png', '9.png', '10.png', '12.png', 'Menu-1.png', 'Menu-2.png', 'Menu-3.png'];
  const html = `
    <html>
      <body style="background:#111;color:#fff;font-family:sans-serif;padding:20px;">
        <h1>Inspecting public/images/service</h1>
        ${names
          .map(
            name => `
          <div style="margin-bottom:40px;">
            <h2>${name}</h2>
            <img src="http://localhost:5173/images/service/${name}" style="max-width:700px;border:2px solid #555;" />
          </div>
        `
          )
          .join('')}
      </body>
    </html>
  `;
  await page.setContent(html);
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/inspect-service-pngs.png', fullPage: true });
  await browser.close();
  console.log('Saved inspect-service-pngs.png');
}

main().catch(console.error);

