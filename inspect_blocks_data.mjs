import fs from 'fs';

const blocks = JSON.parse(fs.readFileSync('sanity_home_blocks.json', 'utf8'));

console.log('--- BLOCK 1: CLUBS ---');
console.log(JSON.stringify(blocks[1], null, 2).slice(0, 2000));

console.log('--- BLOCK 3: CLASSES SHOWCASE ---');
console.log(JSON.stringify(blocks[3], null, 2).slice(0, 3000));
