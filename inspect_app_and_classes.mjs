import fs from 'fs';
import path from 'path';

// 1. Check phive-app HTML in index.html
const html = fs.readFileSync('index.html', 'utf8');
const appIdx = html.indexOf('data-component="phive-app"');
console.log('--- PHIVE APP HTML ---');
console.log(html.slice(appIdx, appIdx + 1500));

// 2. Check if scratch folder exists in artifact dir or local
const scratchFiles = [
  'scratch/payload_home.json',
  'scratch/classes.html',
  'scratch/nuxt_data.json'
];
scratchFiles.forEach(f => {
  if (fs.existsSync(f)) {
    console.log(`Found ${f}, size: ${fs.statSync(f).size}`);
  } else {
    console.log(`Not in current dir: ${f}`);
  }
});
