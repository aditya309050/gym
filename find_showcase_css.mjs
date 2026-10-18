import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const regex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  if (match[1].includes('classes-showcase') || match[1].includes('class-card')) {
    console.log('--- FOUND CLASS SHOWCASE CSS ---');
    console.log(match[1].slice(0, 1500));
  }
}
