import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const clubsIdx = html.indexOf('data-component="phive-clubs"');
console.log('phive-clubs index:', clubsIdx);
console.log('HTML slice:');
console.log(html.slice(clubsIdx, clubsIdx + 2000));
