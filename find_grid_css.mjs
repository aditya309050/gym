import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('data-v-d246007c');
console.log(html.slice(idx, idx + 2000));
