import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Refine classes-showcase CSS so it flows naturally without overlapping into phive-app
const classesShowcaseRefineCSS = `
<style id="phive-refinements">
  [data-component="classes-showcase"] {
    height: auto !important;
    min-height: 100vh !important;
    padding: 120px 0 100px 0 !important;
    margin: 0 !important;
    position: relative !important;
    overflow: hidden !important;
    background-color: var(--color-darkBrown) !important;
  }
  [data-component="classes-showcase"] .title-row {
    position: relative !important;
    height: auto !important;
    margin-bottom: 60px !important;
  }
  [data-component="classes-showcase"] .classes-cards-container {
    height: auto !important;
    top: 0 !important;
    position: relative !important;
  }
  [data-component="classes-showcase"] [data-component="grid"] {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 24px !important;
    max-width: 1400px !important;
    margin: 0 auto !important;
    padding: 0 32px !important;
  }
  @media (max-width: 1100px) {
    [data-component="classes-showcase"] [data-component="grid"] {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 650px) {
    [data-component="classes-showcase"] [data-component="grid"] {
      grid-template-columns: 1fr !important;
    }
  }
  [data-component="classes-showcase"] .class-container {
    grid-column: auto !important;
    grid-row: auto !important;
    display: flex !important;
    justify-content: center !important;
    align-items: stretch !important;
  }
  [data-component="classes-showcase"] .card {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s !important;
  }
  [data-component="classes-showcase"] .card:hover {
    transform: translateY(-8px) scale(1.02) !important;
    box-shadow: 0 16px 40px rgba(255, 224, 0, 0.2) !important;
  }

  /* 2. Menu Grid Drawer Overlay Styling */
  [data-component="menu-grid"] {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(22, 16, 3, 0.96) !important;
    backdrop-filter: blur(20px) !important;
    z-index: 99990 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    opacity: 0 !important;
    pointer-events: none !important;
    transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  [data-component="menu-grid"][data-state="active"] {
    opacity: 1 !important;
    pointer-events: auto !important;
  }
  .phive-menu-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    text-align: center;
  }
  .phive-menu-link {
    font-family: 'PPFormula', sans-serif;
    font-size: clamp(32px, 20px + 3vw, 56px);
    font-weight: 500;
    color: var(--color-yellow);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    transition: transform 0.3s, color 0.3s;
    position: relative;
  }
  .phive-menu-link:hover {
    color: var(--color-white);
    transform: scale(1.05);
  }
  .phive-menu-sublinks {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: -12px;
  }
  .phive-menu-sublink {
    font-family: 'AcidGrotesk', sans-serif;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }
  .phive-menu-sublink:hover {
    color: var(--color-yellow);
  }

  /* 3. Schedule A Visit VIP Modal */
  [data-component="modal-drawer"] {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 0, 0, 0.75) !important;
    backdrop-filter: blur(12px) !important;
    z-index: 100000 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    opacity: 0 !important;
    pointer-events: none !important;
    transition: opacity 0.35s ease !important;
  }
  [data-component="modal-drawer"][data-state="active"] {
    opacity: 1 !important;
    pointer-events: auto !important;
  }
  .phive-modal-box {
    background: var(--color-darkBrown);
    border: 1px solid var(--color-yellow);
    border-radius: 16px;
    padding: 40px;
    width: 90%;
    max-width: 520px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.8);
    position: relative;
    color: var(--color-yellow);
  }
  .phive-modal-title {
    font-family: 'PPFormula', sans-serif;
    font-size: 32px;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    margin: 0 0 8px 0;
    text-align: center;
  }
  .phive-modal-desc {
    font-family: 'AcidGrotesk', sans-serif;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    margin: 0 0 24px 0;
    line-height: 1.4;
  }
  .phive-form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
  }
  .phive-form-label {
    font-family: 'AcidGrotesk', sans-serif;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.9);
  }
  .phive-form-input, .phive-form-select {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 224, 0, 0.3);
    border-radius: 8px;
    padding: 12px 14px;
    color: #fff;
    font-family: 'AcidGrotesk', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .phive-form-input:focus, .phive-form-select:focus {
    border-color: var(--color-yellow);
  }
  .phive-modal-submit {
    width: 100%;
    background: var(--color-yellow);
    color: var(--color-darkBrown);
    border: none;
    border-radius: 9999px;
    padding: 14px;
    font-family: 'PPFormula', sans-serif;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 12px;
    transition: transform 0.2s, background-color 0.2s;
  }
  .phive-modal-submit:hover {
    transform: scale(1.02);
    background: #fff;
  }
  .phive-modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: var(--color-yellow);
    font-size: 24px;
    cursor: pointer;
    line-height: 1;
    padding: 4px;
  }
</style>
`;

html = html.replace('</head>', `${classesShowcaseRefineCSS}\n</head>`);

// Replace menu-grid inner content with luxurious menu content
const menuGridRegex = /<div data-component="menu-grid"[^>]*>[\s\S]*?<\/div><\/div><\/div><\/div>/;
const newMenuGridHTML = `
<div data-component="menu-grid" data-theme="dark" data-state="inactive">
  <button class="phive-modal-close close-btn" aria-label="Close Menu" style="position: absolute; top: 32px; right: 32px; font-size: 36px; z-index: 10;">&times;</button>
  <div class="phive-menu-content">
    <a href="/en" class="phive-menu-link">Home</a>
    <div>
      <a href="/en/clubs" class="phive-menu-link">Clubs</a>
      <div class="phive-menu-sublinks">
        <a href="/en/clubs/club-5-de-outubro" class="phive-menu-sublink">5 de Outubro</a>
        <a href="/en/clubs/club-boavista" class="phive-menu-sublink">Boavista</a>
        <a href="/en/clubs/club-coimbra-celas" class="phive-menu-sublink">Coimbra Celas</a>
        <a href="/en/clubs/club-coimbra-lagrimas" class="phive-menu-sublink">Coimbra Lágrimas</a>
        <a href="/en/clubs/club-leiria" class="phive-menu-sublink">Leiria</a>
      </div>
    </div>
    <a href="/en/classes" class="phive-menu-link">Classes</a>
    <a href="/en/fitness-hub" class="phive-menu-link">Fitness Hub</a>
    <a href="/en/timetable" class="phive-menu-link">Timetable</a>
    <a href="/en/about" class="phive-menu-link">About Phive</a>
    <div style="display: flex; gap: 16px; margin-top: 16px;">
      <a href="/pt" style="font-family: 'AcidGrotesk'; font-size: 14px; color: var(--color-yellow); text-decoration: none;">PT</a>
      <span style="color: rgba(255,255,255,0.4);">/</span>
      <a href="/en" style="font-family: 'AcidGrotesk'; font-size: 14px; color: #fff; text-decoration: none; font-weight: bold;">EN</a>
    </div>
  </div>
</div>
`;

html = html.replace(/<div data-component="menu-grid"[\s\S]*?<\/div><div data-component="modal-drawer"/, `${newMenuGridHTML}\n<div data-component="modal-drawer"`);

// Populate modal-drawer with the VIP booking form
const newModalDrawerHTML = `
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

html = html.replace(/<div data-component="modal-drawer"[\s\S]*?<\/div><div id="phive-floating-ui"/, `${newModalDrawerHTML}\n<div id="phive-floating-ui"`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully refined classes-showcase, menu-grid, and modal-drawer!');
