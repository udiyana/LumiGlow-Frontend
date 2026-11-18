import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1453, height: 900 });
  await page.goto('http://localhost:5173/service', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const menuSection = await page.evaluateHandle(() => {
    const el = document.getElementById('tabpanel-basic-treatment');
    return el ? el.closest('section') : null;
  });

  if (menuSection) {
    await menuSection.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/service-menu-full-1453px.png' });
    console.log('Saved service-menu-full-1453px.png');
  }

  // Also take a screenshot of just the top portion of the menu to inspect the left and right strips
  await page.evaluate(() => {
    const el = document.getElementById('tabpanel-basic-treatment');
    if (el) el.closest('section').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/service-menu-viewport-1453px.png',
  });
  console.log('Saved service-menu-viewport-1453px.png');

  await browser.close();
}

main().catch(console.error);

