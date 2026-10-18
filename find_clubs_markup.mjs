import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const regex = /<([a-z0-9-]+)[^>]*data-component="phive-clubs"[^>]*>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('Found phive-clubs markup at:', m.index);
  console.log(html.slice(m.index, m.index + 2000));
}
