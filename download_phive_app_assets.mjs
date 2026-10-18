import https from 'https';
import fs from 'fs';
import path from 'path';

const urls = [
  'https://phive.pt/imgs/phive-app.jpg',
  'https://phive.pt/imgs/phive-app-tablet.jpg',
  'https://phive.pt/imgs/phive-app-mobile.jpg',
  'https://phive.pt/imgs/apps/apple-download.svg',
  'https://phive.pt/imgs/apps/google-download.svg'
];

async function checkAndDownload() {
  for (const u of urls) {
    const urlObj = new URL(u);
    const localRel = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname;
    const dest = path.join('public', localRel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    await new Promise((resolve) => {
      https.get(u, (res) => {
        console.log(`URL: ${u} -> Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Saved to ${dest} (${fs.statSync(dest).size} bytes)`);
            resolve();
          });
        } else {
          resolve();
        }
      }).on('error', (err) => {
        console.error(`Error fetching ${u}:`, err.message);
        resolve();
      });
    });
  }
}

checkAndDownload();
