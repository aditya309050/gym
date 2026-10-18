import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
console.log('data-v-e9f8cd31 in styles:', html.includes('data-v-e9f8cd31'));
console.log('data-v-263cfc2d in styles:', html.includes('data-v-263cfc2d'));
console.log('ClassCard.BHAokeRg.css in index:', html.includes('ClassCard.BHAokeRg.css'));
