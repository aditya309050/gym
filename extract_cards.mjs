import fs from 'fs';

const html = fs.readFileSync('C:/Users/adity/.gemini/antigravity-ide/brain/92336355-d9da-4dca-a3ae-c975e2b28b74/scratch/classes.html', 'utf8');

// Find class-card elements
const matches = [...html.matchAll(/(<div data-component="class-card"[\s\S]*?<\/div><\/div><\/div><\/a><\/div>)/g)];
console.log('Total class cards matched:', matches.length);

for (let i = 0; i < Math.min(5, matches.length); i++) {
  console.log(`\n=== CARD ${i+1} ===`);
  console.log(matches[i][1].slice(0, 500));
}
