import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://127.0.0.1:5173/ ...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });

  // Get info about all top-level sections
  const sections = await page.evaluate(() => {
    const list = [
      'home-header',
      'phive-clubs',
      'photo-grid',
      'statistics-table',
      'classes-showcase',
      'phive-app',
      'footer',
      'menu-grid',
      'bar',
      'modal-drawer'
    ];
    return list.map(comp => {
      const el = document.querySelector(`[data-component="${comp}"]`);
      if (!el) return { comp, found: false };
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        comp,
        found: true,
        tag: el.tagName,
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height),
        width: Math.round(rect.width),
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        zIndex: style.zIndex,
        position: style.position
      };
    });
  });

  console.log('Local page sections inspection:');
  console.table(sections);

  // Take screenshot of hero
  await page.screenshot({ path: 'screenshot_hero_check.png' });
  console.log('Saved screenshot_hero_check.png');

  await browser.close();
}

main().catch(console.error);
