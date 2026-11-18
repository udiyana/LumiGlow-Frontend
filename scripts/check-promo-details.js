import puppeteer from 'puppeteer-core';
import path from 'path';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1453, height: 900 });
  await page.goto('file:///' + path.resolve('test-promo-full.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const cardBox = await page.$eval('.card-inner', el => {
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  });

  const selectors = [
    '.text-special',
    '.text-promo',
    '.white-panel',
    '.oval-frame',
    '.logo-block',
    '.text-discount',
    '.text-treatments',
    '.text-tags',
    '.text-terms',
    '.btn-book',
    '.btn-more'
  ];

  const results = {};
  for (const s of selectors) {
    results[s] = await page.$eval(s, (el, cb) => {
      const r = el.getBoundingClientRect();
      return {
        left: ((r.left - cb.left) / cb.width * 100).toFixed(2) + '%',
        right: ((r.right - cb.left) / cb.width * 100).toFixed(2) + '%',
        top: ((r.top - cb.top) / cb.height * 100).toFixed(2) + '%',
        bottom: ((r.bottom - cb.top) / cb.height * 100).toFixed(2) + '%',
        width: (r.width / cb.width * 100).toFixed(2) + '%',
        height: (r.height / cb.height * 100).toFixed(2) + '%'
      };
    }, cardBox);
  }

  console.log('Results relative to card-inner (width: ' + cardBox.width + 'px, height: ' + cardBox.height + 'px):');
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
}

main().catch(console.error);

