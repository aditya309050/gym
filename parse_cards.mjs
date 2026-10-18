import fs from 'fs';

const html = fs.readFileSync('C:/Users/adity/.gemini/antigravity-ide/brain/92336355-d9da-4dca-a3ae-c975e2b28b74/scratch/classes.html', 'utf8');

const regex = /data-component="class-card"[^>]*color="([^"]+)"[\s\S]*?alt="([^"]+)"[\s\S]*?src="([^"]*https:\/\/cdn\.sanity\.io[^"]*)"[\s\S]*?-title-6[^>]*>([^<]+)<\/p>[\s\S]*?label"[^>]*>([^<]+)<\/span>/g;
let m;
const cards = [];
while ((m = regex.exec(html)) !== null) {
  cards.push({ color: m[1], alt: m[2], title: m[4].trim(), category: m[5].trim() });
}
console.log('Cards found:', cards.length);
console.log(cards.slice(0, 10));
