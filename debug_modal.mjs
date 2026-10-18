import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
    document.querySelector('.schedule-visit-btn')?.click();
  });
  await new Promise(r => setTimeout(r, 500));

  const info = await page.evaluate(() => {
    const modal = document.querySelector('[data-component="modal-drawer"]');
    const box = document.querySelector('.phive-modal-box');
    return {
      modal: {
        display: window.getComputedStyle(modal).display,
        opacity: window.getComputedStyle(modal).opacity,
        zIndex: window.getComputedStyle(modal).zIndex,
        rect: modal.getBoundingClientRect()
      },
      box: box ? {
        display: window.getComputedStyle(box).display,
        opacity: window.getComputedStyle(box).opacity,
        width: box.offsetWidth,
        height: box.offsetHeight,
        rect: box.getBoundingClientRect()
      } : 'not found'
    };
  });

  console.log('Modal inspection:', JSON.stringify(info, null, 2));

  await page.screenshot({ path: 'screenshots/debug_modal.png' });
  await browser.close();
}

main().catch(console.error);
