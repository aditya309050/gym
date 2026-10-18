import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

// Find all <style> tags or inline style additions
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
let i = 0;
while ((match = styleRegex.exec(html)) !== null) {
  i++;
  if (match[1].includes('menu-grid') || match[1].includes('data-component="bar"') || match[1].includes('custom') || i > 55) {
    console.log(`Style tag #${i} (length: ${match[1].length}):`);
    console.log(match[1].slice(0, 500));
    console.log('---');
  }
}
