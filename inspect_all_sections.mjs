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
  // Wait 1 second for JS
  await new Promise(r => setTimeout(r, 1000));

  const sections = [
    'home-header',
    'phive-clubs',
    'photo-grid',
    'statistics-table',
    'classes-showcase',
    'phive-app',
    'footer',
    'menu-grid',
    'modal-drawer'
  ];

  const results = await page.evaluate((sections) => {
    return sections.map(s => {
      const el = document.querySelector(`[data-component="${s}"]`);
      if (!el) return { section: s, exists: false };
      return {
        section: s,
        exists: true,
        childrenCount: el.children.length,
        textPreview: el.innerText.replace(/\s+/g, ' ').trim().slice(0, 100),
        imgCount: el.querySelectorAll('img').length,
        videoCount: el.querySelectorAll('video').length,
        svgCount: el.querySelectorAll('svg').length,
        offsetHeight: el.offsetHeight,
        offsetWidth: el.offsetWidth,
        offsetTop: el.offsetTop
      };
    });
  }, sections);

  console.log('Sections details:');
  console.table(results);

  await browser.close();
}

main().catch(console.error);
