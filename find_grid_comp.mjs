import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const matches = [...html.matchAll(/<([a-z0-9-]+)[^>]*data-component="grid"[^>]*>/g)];
console.log('Matches for data-component="grid":', matches.length);
matches.forEach(m => {
  const idx = m.index;
  console.log('Context:');
  console.log(html.slice(Math.max(0, idx - 200), idx + 200));
});
