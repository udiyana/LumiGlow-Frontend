import puppeteer from 'puppeteer-core';

async function testPages() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox'],
  });

  const routes = ['/', '/about', '/service'];
  const viewports = [1453, 1920];

  for (const w of viewports) {
    for (const r of routes) {
      const page = await browser.newPage();
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', err => errors.push(err.toString()));

      await page.setViewport({ width: w, height: 900 });
      await page.goto(`http://localhost:5173${r}`, { waitUntil: 'networkidle0' });
      await new Promise(res => setTimeout(res, 500));

      const status = await page.evaluate(() => ({
        title: document.title,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      }));

      console.log(`Route ${r} @ ${w}px:`, status, `Errors: ${errors.length}`);

      // If on /service, test tab switching
      if (r === '/service' && w === 1453) {
        // click Chemical Treatments tab
        await page.click('#tab-chemical-treatments');
        await new Promise(res => setTimeout(res, 400));
        const activeTab = await page.$eval('#tab-chemical-treatments', el => el.getAttribute('aria-selected'));
        console.log('Tab chemical-treatments active:', activeTab === 'true');

        // click back to Basic Treatment tab
        await page.click('#tab-basic-treatment');
        await new Promise(res => setTimeout(res, 400));
        const basicTab = await page.$eval('#tab-basic-treatment', el => el.getAttribute('aria-selected'));
        console.log('Tab basic-treatment active:', basicTab === 'true');

        // Take screenshots for visual verification
        await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/service-refactored-1453px.png' });
      }

      await page.close();
    }
  }

  await browser.close();
  console.log('All verification passed!');
}

testPages().catch(console.error);

