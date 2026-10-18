import fs from 'fs';

const dump = fs.readFileSync('dump.html', 'utf8');

// search for styles with 0398f266 or f731958a
const matches = [...dump.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)];
console.log('Total style tags in dump:', matches.length);

for (const m of matches) {
  const content = m[1];
  if (content.includes('0398f266') || content.includes('f731958a') || content.includes('.bar-container') || content.includes('.bar[')) {
    console.log('--- FOUND STYLE CHUNK ---');
    console.log(content.slice(0, 1500));
  }
}
