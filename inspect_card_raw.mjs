import fs from 'fs';

const html = fs.readFileSync('C:/Users/adity/.gemini/antigravity-ide/brain/92336355-d9da-4dca-a3ae-c975e2b28b74/scratch/classes.html', 'utf8');

const idx = html.indexOf('data-component="class-card"');
console.log('Index:', idx);
console.log(html.slice(idx, idx + 1200));
