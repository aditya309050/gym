import fs from 'fs';

const dump = fs.readFileSync('dump.html', 'utf8');

const regex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let m;
while ((m = regex.exec(dump)) !== null) {
  const css = m[1];
  if (css.includes('data-component=burger') || css.includes('data-component=sound-btn') || css.includes('data-component=cta')) {
    console.log('--- FOUND BUTTON CSS ---');
    console.log(css.slice(0, 1500));
  }
}
