import puppeteer from 'puppeteer-core';

const viewports = [1920, 1453, 1280, 768, 375];

async function check() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  for (const w of viewports) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.toString()));

    await page.setViewport({ width: w, height: 900 });
    await page.goto('http://localhost:5173/service', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    const scrollInfo = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    console.log(`Viewport ${w}px:`, scrollInfo, `Errors: ${errors.length}`);
    if (errors.length > 0) console.log(errors);
    await page.close();
  }

  await browser.close();
}

check().catch(console.error);

