import fs from 'fs';

const dump = fs.readFileSync('dump.html', 'utf8');

// Find where bar is located in dump.html
const barIdx = dump.indexOf('data-component="bar"');
console.log('Bar index in dump.html:', barIdx);
if (barIdx !== -1) {
  // Let's print the 500 chars before and 200 chars after
  console.log('Context before:');
  console.log(dump.slice(Math.max(0, barIdx - 400), barIdx));
  console.log('Context after:');
  console.log(dump.slice(barIdx, barIdx + 300));
}
