import fs from 'fs';

// Check dist assets css
const distFiles = fs.readdirSync('dist/assets');
const cssFile = distFiles.find(f => f.endsWith('.css'));
if (cssFile) {
  const content = fs.readFileSync(`dist/assets/${cssFile}`, 'utf8');
  console.log(`CSS file: ${cssFile}, length: ${content.length}`);
  console.log('Sample content:');
  console.log(content.slice(0, 500));
}
