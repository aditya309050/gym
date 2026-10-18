import fs from 'fs';

const dump = fs.readFileSync('dump.html', 'utf8');
const idx = dump.indexOf('data-component=burger][data-v-8adf93f2]');
console.log(dump.slice(idx, idx + 1500));
