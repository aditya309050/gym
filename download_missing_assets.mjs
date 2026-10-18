import fs from 'fs';
import https from 'https';
import path from 'path';

const html = fs.readFileSync('index.html', 'utf8');

// Find all src="..." and srcset="..."
const srcMatches = [...html.matchAll(/(?:src|srcset)="([^"]+)"/g)].map(m => m[1]);
const urls = [];
srcMatches.forEach(str => {
  const parts = str.split(',').map(s => s.trim().split(' ')[0]);
  parts.forEach(p => {
    if (p && !p.startsWith('data:') && !p.startsWith('http://') && !p.startsWith('https://')) {
      urls.push(p);
    }
  });
});

const uniqueLocal = [...new Set(urls)];
console.log('Unique local paths in index.html:', uniqueLocal.length);

const missing = [];
uniqueLocal.forEach(p => {
  const clean = p.startsWith('/') ? p.slice(1) : p;
  const localFile = path.join('public', clean);
  if (!fs.existsSync(localFile)) {
    missing.push({ path: p, target: `https://phive.pt${p.startsWith('/') ? '' : '/'}${p}`, dest: localFile });
  }
});

console.log('Missing assets count:', missing.length);
console.log(missing);

async function downloadMissing() {
  for (const item of missing) {
    fs.mkdirSync(path.dirname(item.dest), { recursive: true });
    await new Promise((resolve) => {
      https.get(item.target, (res) => {
        if (res.statusCode === 200) {
          const file = fs.createWriteStream(item.dest);
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${item.target} -> ${item.dest} (${fs.statSync(item.dest).size}b)`);
            resolve();
          });
        } else {
          console.warn(`Failed ${item.target}: status ${res.statusCode}`);
          resolve();
        }
      }).on('error', (e) => {
        console.warn(`Error ${item.target}: ${e.message}`);
        resolve();
      });
    });
  }
}

downloadMissing();
