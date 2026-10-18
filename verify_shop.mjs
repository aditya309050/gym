import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function main() {
  console.log('Launching browser to test http://localhost:3000 ...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1600,1000']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.log('PAGE ERROR LOG:', msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push(err.toString());
    console.log('PAGE UNHANDLED ERROR:', err.toString());
  });

  const response = await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  console.log('Status code:', response.status());

  await new Promise(r => setTimeout(r, 1000));

  // 1. Check for any stray text nodes like )} or }
  const strayCheck = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    const found = [];
    while (node = walker.nextNode()) {
      const val = node.nodeValue.trim();
      if (val === ')}' || val === '}' || val.startsWith(')}') || val === '0}') {
        found.push({
          val,
          parent: node.parentElement.tagName,
          className: node.parentElement.className
        });
      }
    }
    return found;
  });
  console.log('Stray text check result (should be empty):', JSON.stringify(strayCheck));

  // 2. Take screenshot of Women section
  // First switch to WOMEN tab by clicking WOMEN button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('nav button'));
    const womenBtn = buttons.find(b => b.textContent.includes('WOMEN'));
    if (womenBtn) womenBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Check Women Vibe cards count and image load status
  const womenVibeCheck = await page.evaluate(() => {
    const section = document.querySelector('section:has(h2)');
    const cards = Array.from(document.querySelectorAll('section:has(h2) img'));
    return {
      cardCount: cards.length,
      cards: cards.map(img => ({
        alt: img.alt,
        src: img.src,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        isLoaded: img.naturalWidth > 0
      }))
    };
  });
  console.log('Women Vibe Cards Loaded:', womenVibeCheck.cardCount, 'cards');
  womenVibeCheck.cards.forEach((c, idx) => {
    console.log(`  [${idx+1}] ${c.alt} - loaded: ${c.isLoaded} (${c.naturalWidth}x${c.naturalHeight}) - ${c.src}`);
  });

  // Scroll down to What's Your Vibe section
  await page.evaluate(() => {
    const vibeHeading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes("WHAT'S YOUR VIBE"));
    if (vibeHeading) {
      vibeHeading.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/verified_women_vibe.png' });
  console.log('Saved screenshots/verified_women_vibe.png');

  // Test scrolling right in the carousel
  const scrollTest = await page.evaluate(() => {
    const track = document.querySelector('section:has(h2) .overflow-x-auto');
    if (!track) return 'no track';
    track.scrollBy({ left: 800, behavior: 'instant' });
    return { scrollLeft: track.scrollLeft, scrollWidth: track.scrollWidth, clientWidth: track.clientWidth };
  });
  console.log('Carousel scroll test:', scrollTest);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/verified_women_vibe_scrolled.png' });

  // 3. Switch to MEN tab and check Men's 8 categories and image loading
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('nav button'));
    const menBtn = buttons.find(b => b.textContent.includes('MEN'));
    if (menBtn) menBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const menVibeCheck = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('section:has(h2) img'));
    return {
      cardCount: cards.length,
      cards: cards.map(img => ({
        alt: img.alt,
        src: img.src,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        isLoaded: img.naturalWidth > 0
      }))
    };
  });
  console.log('Men Vibe Cards Loaded:', menVibeCheck.cardCount, 'cards');
  menVibeCheck.cards.forEach((c, idx) => {
    console.log(`  [${idx+1}] ${c.alt} - loaded: ${c.isLoaded} (${c.naturalWidth}x${c.naturalHeight}) - ${c.src}`);
  });

  await page.evaluate(() => {
    const vibeHeading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes("WHAT'S YOUR VIBE"));
    if (vibeHeading) {
      vibeHeading.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/verified_men_vibe.png' });
  console.log('Saved screenshots/verified_men_vibe.png');

  // Also check top of page to confirm stray )} is not in navbar/header
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'screenshots/verified_header_top.png' });
  console.log('Saved screenshots/verified_header_top.png');

  console.log('Total console error count:', errors.length);
  await browser.close();
}

main().catch(console.error);
