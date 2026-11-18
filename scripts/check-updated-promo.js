import puppeteer from 'puppeteer-core';

async function checkPromo() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox'],
  });

  for (const w of [1453, 1920, 768, 375]) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.toString()));

    await page.setViewport({ width: w, height: 900 });
    await page.goto('http://localhost:5173/service', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const promoEl = await page.$('#special-promo');
    if (promoEl) {
      await promoEl.scrollIntoView();
      await new Promise(r => setTimeout(r, 300));
      await promoEl.screenshot({
        path: `C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/promo-updated-${w}px.png`,
      });
    }

    const scrollCheck = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasHScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }));

    console.log(`Viewport ${w}px:`, scrollCheck, `Errors: ${errors.length}`);
    await page.close();
  }

  await browser.close();
  console.log('All promo checks passed!');
}

checkPromo().catch(console.error);

