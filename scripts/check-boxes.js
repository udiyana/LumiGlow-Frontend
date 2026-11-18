import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1453, height: 800 });
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/test-vertical.html', { waitUntil: 'networkidle0' });
  
  const cardBox = await page.$eval('.card-inner', el => {
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  });

  const boxes = await page.evaluate(cardBox => {
    const getRel = sel => {
      const el = document.querySelector(sel);
      const r = el.getBoundingClientRect();
      return {
        left: ((r.left - cardBox.left) / cardBox.width * 100).toFixed(2) + '%',
        right: ((r.right - cardBox.left) / cardBox.width * 100).toFixed(2) + '%',
        top: ((r.top - cardBox.top) / cardBox.height * 100).toFixed(2) + '%',
        bottom: ((r.bottom - cardBox.top) / cardBox.height * 100).toFixed(2) + '%',
        width: (r.width / cardBox.width * 100).toFixed(2) + '%',
        height: (r.height / cardBox.height * 100).toFixed(2) + '%'
      };
    };
    return {
      special: getRel('.text-special'),
      promo: getRel('.text-promo'),
      oval: getRel('.oval-frame'),
      white: getRel('.white-panel')
    };
  }, cardBox);

  console.log('Card Box:', cardBox);
  console.log('Relative Bounding Boxes:', JSON.stringify(boxes, null, 2));
  await browser.close();
}

main().catch(console.error);

