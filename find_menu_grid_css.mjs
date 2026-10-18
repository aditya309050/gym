import fs from 'fs';

const dump = fs.readFileSync('dump.html', 'utf8');
const idx = dump.indexOf('data-component=menu-grid][data-v-0398f266]');
console.log(dump.slice(idx + 3800, idx + 6500));
