import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  const names = ['1.png', '2.png', '3.png', '4.png', '5.png', '7.png', '8.png', '9.png', '10.png', '12.png', 'Menu-1.png', 'Menu-2.png', 'Menu-3.png'];

  for (const name of names) {
    await page.setContent(`<html><body style="margin:0;background:#000;"><img id="img" src="http://localhost:5173/images/service/${name}" style="width:1749px;height:1237px;display:block;"></body></html>`);
    await page.setViewport({ width: 1749, height: 1237 });
    await new Promise(r => setTimeout(r, 400));
    
    // Check left, center, right brightness and sample colors
    const info = await page.evaluate(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 1749;
      canvas.height = 1237;
      const ctx = canvas.getContext('2d');
      const img = document.getElementById('img');
      ctx.drawImage(img, 0, 0);

      // sample left strip (x: 100), center (x: 874), right strip (x: 1600)
      const getPixel = (x, y) => {
        const d = ctx.getImageData(x, y, 1, 1).data;
        return `rgb(${d[0]},${d[1]},${d[2]})`;
      };

      return {
        leftTop: getPixel(100, 200),
        center: getPixel(874, 600),
        rightTop: getPixel(1600, 200),
        rightMid: getPixel(1600, 600),
        rightBot: getPixel(1600, 1000),
      };
    });
    console.log(name, info);
  }

  await browser.close();
}

main().catch(console.error);

