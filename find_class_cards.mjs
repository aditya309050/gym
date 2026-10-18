import fs from 'fs';

const html = fs.readFileSync('C:/Users/adity/.gemini/antigravity-ide/brain/92336355-d9da-4dca-a3ae-c975e2b28b74/scratch/classes.html', 'utf8');

// Find all class cards in classes.html
const cardMatches = [...html.matchAll(/data-component="class-card"[\s\S]*?<\/article>/g)];
console.log('Total class cards in classes.html:', cardMatches.length);
if (cardMatches.length > 0) {
  console.log('Sample class card:');
  console.log(cardMatches[0][0].slice(0, 1500));
} else {
  // search for class titles
  const titles = [...html.matchAll(/-title-[0-9][^>]*>([^<]+)</g)].map(m => m[1].trim());
  console.log('Titles found in classes.html:', [...new Set(titles)].slice(0, 20));
}
