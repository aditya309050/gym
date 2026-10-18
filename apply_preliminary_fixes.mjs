import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the artificial [data-component=grid] { display: none !important; } from style tag #60
html = html.replace(/\[data-component=grid\]\s*\{\s*display:\s*none\s*!important;\s*\}/g, '/* [data-component=grid] active */');

// 2. Remove the empty animation-container 100vh gap in phive-clubs
html = html.replace(/<div class="animation-container"[^>]*><span[^>]*><\/span><\/div>/g, '<div class="animation-container" style="display:none;"></div>');

// 3. Make sure .photos-ctas-container has reasonable height and natural flow
// In Nuxt it had height: 400vh with sticky inner. Let's make it look gorgeous.

console.log('Checked replacements 1 & 2');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved preliminary replacements to index.html');
