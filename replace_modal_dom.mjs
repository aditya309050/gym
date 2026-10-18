import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

const targetStr = '<div data-component="modal-drawer" class="form-modal" data-v-3277ae6a><span class="background" data-v-3277ae6a><span class="close-hitarea" data-v-3277ae6a></span></span><div data-component="scroller" class="inner modal-scroller" data-v-3277ae6a data-v-46acd948><div class="scroller-container" data-v-46acd948><!--[--><div class="inner" data-v-3277ae6a><!----><!----></div><!--]--></div></div><button data-component="circle-btn" aria-label="Circle button" class="large close-btn" data-v-3277ae6a data-v-1744778e><div data-component="rive-asset" class="image icon" data-v-1744778e data-v-da893ca9><!----></div></button></div>';

const replacement = `
<div data-component="modal-drawer" class="form-modal" data-state="inactive">
  <div class="phive-modal-box">
    <button class="phive-modal-close close-btn" aria-label="Close Modal">&times;</button>
    <h3 class="phive-modal-title">Schedule A Visit</h3>
    <p class="phive-modal-desc">Experience our premium fitness spaces, pools, saunas, and boutique studios with a personalized tour.</p>
    <form onsubmit="event.preventDefault(); alert('Thank you! Your VIP club visit has been scheduled. Our team will contact you shortly.'); document.querySelector('[data-component=modal-drawer]').setAttribute('data-state', 'inactive');">
      <div class="phive-form-group">
        <label class="phive-form-label">Full Name</label>
        <input type="text" class="phive-form-input" placeholder="Your name" required />
      </div>
      <div class="phive-form-group">
        <label class="phive-form-label">Email Address</label>
        <input type="email" class="phive-form-input" placeholder="your.email@example.com" required />
      </div>
      <div class="phive-form-group">
        <label class="phive-form-label">Phone Number</label>
        <input type="tel" class="phive-form-input" placeholder="+351 912 345 678" required />
      </div>
      <div class="phive-form-group">
        <label class="phive-form-label">Select Club</label>
        <select class="phive-form-select" required>
          <option value="" disabled selected>Choose your Phive Club</option>
          <option value="lisbon">Lisbon — Club 5 de Outubro</option>
          <option value="porto">Porto — Club Boavista</option>
          <option value="celas">Coimbra — Club Celas</option>
          <option value="lagrimas">Coimbra — Club Quinta das Lágrimas</option>
          <option value="leiria">Leiria — Club Leiria</option>
        </select>
      </div>
      <button type="submit" class="phive-modal-submit">Schedule VIP Visit</button>
    </form>
  </div>
</div>
`;

if (html.includes(targetStr)) {
  html = html.replace(targetStr, replacement);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Successfully replaced modal-drawer DOM!');
} else {
  console.log('Target string not exact match. Finding substring...');
  const start = html.indexOf('<div data-component="modal-drawer"');
  const end = html.indexOf('</div><!--]--></div><div id="teleports">');
  console.log('Found between', start, 'and', end);
  if (start !== -1 && end !== -1) {
    html = html.slice(0, start) + replacement + html.slice(end);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully replaced modal-drawer using slice range!');
  }
}
