import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('data-component=classes-showcase][data-v-01ef0c1c]');
console.log(html.slice(idx, idx + 2500));
