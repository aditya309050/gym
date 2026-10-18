import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Testing http://127.0.0.1:3000/ ...');
  const response = await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
  console.log('Status code:', response.status());

  await new Promise(r => setTimeout(r, 1200));

  // Check if Tailwind is loaded and functioning
  const tailwindCheck = await page.evaluate(() => {
    const testDiv = document.createElement('div');
    testDiv.className = 'bg-phive-yellow text-phive-darkBrown p-4';
    document.body.appendChild(testDiv);
    const style = window.getComputedStyle(testDiv);
    const result = {
      bgColor: style.backgroundColor,
      textColor: style.color,
      padding: style.padding
    };
    testDiv.remove();
    return result;
  });

  console.log('Tailwind test result:', tailwindCheck);

  await page.screenshot({ path: 'screenshots/port_3000_verified.png' });
  console.log('Saved screenshots/port_3000_verified.png');

  await browser.close();
}

main().catch(console.error);
