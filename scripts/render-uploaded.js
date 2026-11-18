import puppeteer from 'puppeteer-core';
import path from 'path';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1453, height: 900 });
  const filePath = path.resolve('inspect-uploaded.html');
  await page.goto('file:///' + filePath.replace(/\\/g, '/'));
  await page.screenshot({ path: 'inspect-uploaded.png', fullPage: true });
  await browser.close();
  console.log('Saved inspect-uploaded.png');
}

main().catch(console.error);

