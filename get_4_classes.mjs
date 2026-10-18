import fs from 'fs';

const html = fs.readFileSync('C:/Users/adity/.gemini/antigravity-ide/brain/92336355-d9da-4dca-a3ae-c975e2b28b74/scratch/classes.html', 'utf8');

const targetClasses = ['Body Pump', 'Body Combat', 'Body Balance', 'Aqua Aerobics'];

targetClasses.forEach(name => {
  const idx = html.indexOf(`>${name}</p>`);
  if (idx !== -1) {
    const cardStart = html.lastIndexOf('data-component="class-card"', idx);
    const cardEnd = html.indexOf('</li>', idx);
    console.log(`\n=================== ${name} ===================`);
    console.log(html.slice(cardStart - 5, cardEnd));
  }
});
