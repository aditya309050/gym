import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const barContainerIdx = html.indexOf('class="bar-container"');
console.log('barContainerIdx:', barContainerIdx);
console.log(html.slice(barContainerIdx, barContainerIdx + 1500));
