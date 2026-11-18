import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1749, height: 1237 });

  const files = ['8.png', '9.png', '10.png', '12.png'];
  for (const f of files) {
    await page.goto('http://localhost:5173/images/service/' + f);
    await page.screenshot({ path: `C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/check-${f}.png` });
    console.log('Saved check-' + f);
  }
  await browser.close();
}

main().catch(console.error);

