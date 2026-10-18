import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const regex = /<([a-z0-9-]+)[^>]*data-component="bar"[^>]*>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log('Found element at:', match.index);
  console.log(html.slice(match.index, match.index + 800));
}
