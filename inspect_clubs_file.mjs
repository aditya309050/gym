import fs from 'fs';

const clubsPath = 'C:/Users/adity/.gemini/antigravity-ide/brain/92336355-d9da-4dca-a3ae-c975e2b28b74/scratch/clubs.html';
if (fs.existsSync(clubsPath)) {
  const html = fs.readFileSync(clubsPath, 'utf8');
  console.log('clubs.html length:', html.length);
  const m = [...html.matchAll(/data-component="([^"]+)"/g)].map(x => x[1]);
  console.log('Unique components in clubs.html:', [...new Set(m)]);
} else {
  console.log('clubs.html not found');
}
