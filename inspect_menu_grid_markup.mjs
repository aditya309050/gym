import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const menuGridIdx = html.indexOf('data-component="menu-grid"');
console.log('menu-grid starts at:', menuGridIdx);
console.log(html.slice(menuGridIdx, menuGridIdx + 2000));
