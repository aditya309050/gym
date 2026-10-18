import fs from 'fs';

const html = fs.readFileSync('C:/Users/adity/.gemini/antigravity-ide/brain/92336355-d9da-4dca-a3ae-c975e2b28b74/scratch/classes.html', 'utf8');

const idx = html.indexOf('Abdominal');
console.log('Index of Abdominal:', idx);
console.log('Surrounding HTML:');
console.log(html.slice(idx - 300, idx + 800));
