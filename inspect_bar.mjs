import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });

  const barInfo = await page.evaluate(() => {
    const el = document.querySelector('[data-component="bar"]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const parent = el.parentElement;
    const parentStyle = parent ? window.getComputedStyle(parent) : null;
    return {
      rect: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height },
      style: {
        position: style.position,
        top: style.top,
        bottom: style.bottom,
        left: style.left,
        transform: style.transform,
        zIndex: style.zIndex
      },
      parent: {
        tag: parent?.tagName,
        comp: parent?.getAttribute('data-component'),
        position: parentStyle?.position,
        top: parentStyle?.top,
        transform: parentStyle?.transform
      }
    };
  });

  console.log('Bar info:', JSON.stringify(barInfo, null, 2));

  await browser.close();
}

main().catch(console.error);
