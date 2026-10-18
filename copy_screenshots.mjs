import fs from 'fs';
import path from 'path';

const srcDir = 'c:/gym/screenshots';
const destDir = 'C:/Users/adity/.gemini/antigravity-ide/brain/92336355-d9da-4dca-a3ae-c975e2b28b74';

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir);
  files.forEach(f => {
    if (f.endsWith('.png')) {
      const src = path.join(srcDir, f);
      const dst = path.join(destDir, f);
      fs.copyFileSync(src, dst);
      console.log(`Copied ${f} to artifacts directory`);
    }
  });
}
