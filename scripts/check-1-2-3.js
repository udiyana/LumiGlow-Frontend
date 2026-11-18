import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1749, height: 1237 });
  await page.goto('http://localhost:5173/images/service/1.png', { waitUntil: 'load' });
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/check-1-png.png' });
  
  await page.goto('http://localhost:5173/images/service/2.png', { waitUntil: 'load' });
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/check-2-png.png' });

  await page.goto('http://localhost:5173/images/service/3.png', { waitUntil: 'load' });
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/check-3-png.png' });

  await browser.close();
  console.log('Saved check-1-png, check-2-png, check-3-png');
}

main().catch(console.error);

