import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const modalIdx = html.indexOf('data-component="modal-drawer"');
console.log('modalIdx:', modalIdx);
console.log(html.slice(modalIdx, modalIdx + 1200));
