import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const regex = /<([a-z0-9-]+)[^>]*data-component="modal-drawer"[^>]*>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('Found modal DOM element at:', m.index);
  console.log(html.slice(m.index, m.index + 800));
}
