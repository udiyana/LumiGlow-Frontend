import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1749, height: 1237 });

  const names = ['1.png', '2.png', '3.png', '4.png', '7.png', '10.png'];
  for (const name of names) {
    await page.goto(`http://localhost:5173/images/service/${name}`, { waitUntil: 'load' });
    
    // Screenshot right side of image (x: 1300 to 1749)
    await page.screenshot({
      path: `sample-right-${name}`,
      clip: { x: 1350, y: 300, width: 350, height: 500 }
    });
    // Screenshot left side of image (x: 0 to 400)
    await page.screenshot({
      path: `sample-left-${name}`,
      clip: { x: 50, y: 300, width: 350, height: 500 }
    });
    console.log('Sampled', name);
  }

  await browser.close();
}

main().catch(console.error);

