import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function main() {
  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  // Find exact offsets of each section
  const offsets = await page.evaluate(() => {
    const getTop = (sel) => {
      const el = document.querySelector(sel);
      return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : 0;
    };
    return {
      hero: 0,
      clubs: getTop('[data-component="phive-clubs"]'),
      photoGrid: getTop('[data-component="photo-grid"]') || 1600,
      statistics: getTop('[data-component="statistics-table"]') || 3000,
      classes: getTop('[data-component="classes-showcase"]') || 4500,
      app: getTop('[data-component="phive-app"]') || 6500,
      footer: getTop('[data-component="footer"]') || 8000
    };
  });

  console.log('Detected section offsets:', offsets);

  const sectionsToCapture = [
    { name: '1_hero_fixed', y: 0 },
    { name: '2_clubs_section', y: offsets.clubs },
    { name: '3_photo_grid_section', y: offsets.photoGrid },
    { name: '4_statistics_section', y: offsets.statistics },
    { name: '5_classes_section', y: offsets.classes + 300 },
    { name: '6_classes_cards', y: offsets.classes + 800 },
    { name: '7_app_section', y: offsets.app },
    { name: '8_footer_section', y: offsets.footer }
  ];

  for (const s of sectionsToCapture) {
    await page.evaluate((targetY) => {
      window.scrollTo(0, targetY);
    }, s.y);
    await new Promise(r => setTimeout(r, 600));
    const path = `screenshots/${s.name}.png`;
    await page.screenshot({ path });
    console.log(`Captured ${path} at scroll Y = ${s.y}`);
  }

  // Also test clicking the Burger button to see the menu drawer!
  console.log('Testing Menu Drawer...');
  await page.evaluate(() => {
    document.querySelector('.phive-pill-bar .burger-btn')?.click();
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: 'screenshots/9_menu_drawer_open.png' });
  console.log('Captured screenshots/9_menu_drawer_open.png');

  // Close menu and test VIP schedule modal!
  console.log('Testing Schedule a visit Modal...');
  await page.evaluate(() => {
    document.querySelector('.close-btn')?.click();
    setTimeout(() => {
      document.querySelector('.schedule-visit-btn')?.click();
    }, 200);
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/10_schedule_modal_open.png' });
  console.log('Captured screenshots/10_schedule_modal_open.png');

  await browser.close();
}

main().catch(console.error);
