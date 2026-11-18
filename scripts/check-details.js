import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  
  for (const f of ['8.png', '9.png', '10.png', '12.png']) {
    await page.goto(`http://localhost:5173/images/service/${f}`);
    await page.setViewport({ width: 1749, height: 1237 });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: `C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/detail-${f}` });
    console.log('Saved detail-' + f);
  }
  await browser.close();
}

main().catch(console.error);

