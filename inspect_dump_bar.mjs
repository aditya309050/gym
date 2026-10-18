import fs from 'fs';

const dump = fs.readFileSync('dump.html', 'utf8');
const idx = dump.indexOf('class="button-cta-container"');
console.log('button-cta-container in dump:');
console.log(dump.slice(idx, idx + 1000));

const barIdx = dump.indexOf('data-component="bar"');
console.log('bar in dump:');
console.log(dump.slice(barIdx, barIdx + 800));
