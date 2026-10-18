import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const barIdx = html.indexOf('data-component="bar"');
console.log('Bar index:', barIdx);
console.log(html.slice(barIdx, barIdx + 1200));
