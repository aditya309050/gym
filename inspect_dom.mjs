import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

// Find children inside [data-component="page"]
const pageIndex = html.indexOf('data-component="page"');
console.log('data-component="page" found at:', pageIndex);

// Let's find all tags that have data-component="something"
const regex = /<([a-z0-9-]+)[^>]*data-component="([^"]+)"[^>]*>/g;
let match;
const sections = [];
while ((match = regex.exec(html)) !== null) {
  const comp = match[2];
  if (['home-header', 'phive-clubs', 'photo-grid', 'statistics-table', 'classes-showcase', 'phive-app', 'footer', 'menu-grid', 'modal-drawer'].includes(comp)) {
    sections.push({ comp, tag: match[1], pos: match.index });
  }
}
console.log('Main sections found:');
sections.forEach(s => console.log(`- <${s.tag} data-component="${s.comp}"> at index ${s.pos}`));
