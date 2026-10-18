import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const idx = html.indexOf('data-component=phive-clubs][data-v-324f1cb7]');
console.log('Index:', idx);
console.log(html.slice(idx, idx + 2500));
