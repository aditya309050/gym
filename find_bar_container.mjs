import fs from 'fs';

const dump = fs.readFileSync('dump.html', 'utf8');
const barContainerIdx = dump.indexOf('class="bar-container"');
console.log('barContainerIdx:', barContainerIdx);
console.log(dump.slice(barContainerIdx - 300, barContainerIdx + 200));
