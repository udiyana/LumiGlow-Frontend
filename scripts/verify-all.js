import puppeteer from 'puppeteer-core';

const viewports = [
  { width: 1453, height: 900, name: '1453px' },
  { width: 1920, height: 1080, name: '1920px' },
  { width: 1280, height: 800, name: '1280px' },
  { width: 768, height: 1024, name: '768px' },
  { width: 375, height: 812, name: '375px' },
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const vp of viewports) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.toString()));

    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/service', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Capture menu
    const menuEl = await page.$('#service-menu-section');
    if (menuEl) {
      await menuEl.screenshot({
        path: `C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/rev-menu-${vp.name}.png`,
      });
    }

    // Capture promo
    const promoEl = await page.$('#special-promo');
    if (promoEl) {
      await promoEl.scrollIntoView();
      await new Promise(r => setTimeout(r, 300));
      await promoEl.screenshot({
        path: `C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/rev-promo-${vp.name}.png`,
      });
    }

    const scrollCheck = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasHScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
    }));

    console.log(`Viewport ${vp.name}:`, scrollCheck, `Errors: ${errors.length}`);
    await page.close();
  }

  await browser.close();
  console.log('All verification screenshots saved!');
}

run().catch(console.error);

