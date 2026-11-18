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
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/service', { waitUntil: 'networkidle0' });
    
    // Wait a brief moment for images/fonts to settle
    await new Promise(r => setTimeout(r, 600));

    // Scroll to menu section and take screenshot
    const menuEl = await page.$('section[role="tabpanel"], section.svc-hero-gradient, section:has(#tabpanel-basic-treatment)');
    if (menuEl) {
      await menuEl.screenshot({ path: `service-menu-${vp.name}.png` });
    }

    // Scroll to special promo section and take screenshot
    const promoEl = await page.$('#special-promo');
    if (promoEl) {
      await promoEl.scrollIntoView();
      await new Promise(r => setTimeout(r, 300));
      await promoEl.screenshot({ path: `service-promo-${vp.name}.png` });
    }

    await page.screenshot({ path: `service-full-${vp.name}.png`, fullPage: false });
    await page.close();
    console.log(`Captured ${vp.name}`);
  }

  await browser.close();
  console.log('All screenshots captured!');
}

run().catch(console.error);

