import fs from 'fs';

const dump = fs.readFileSync('dump.html', 'utf8');
const idx = dump.indexOf('data-component=sound-btn][data-v-7cc184bf]');
console.log(dump.slice(idx, idx + 1500));
