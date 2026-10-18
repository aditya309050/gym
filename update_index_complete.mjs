import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Classes Showcase: Insert the 4 authentic class cards into classes-showcase grid
const classesCardsHTML = `
  <div class="class-container" data-v-d246007c style="grid-column: 1; grid-row: 1; display: flex; justify-content: center; align-items: flex-end;">
    <div data-component="class-card" class="card" _id="3252f417-77a9-4e67-bea0-eeab14b5c3bc" color="#df1d16" data-v-e9f8cd31 style="pointer-events: visible; width: 100%; max-width: 320px; height: 420px; position: relative; border-radius: 4px; overflow: hidden; background: #211e16;">
      <a href="/en/classes/bodypump" class="inner" data-v-e9f8cd31 style="display: block; width: 100%; height: 100%; text-decoration: none; position: relative;">
        <div class="media-container" data-v-e9f8cd31 style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
          <img width="1200" height="1800" alt="Body Pump" loading="lazy" class="media image" data-v-e9f8cd31 src="https://cdn.sanity.io/images/z6ex5ahr/production/b2e099948bd06ab2ea036cfd8d93807943c643ef-1200x1800.jpg" style="width: 100%; height: 100%; object-fit: cover; opacity: 1; display: block;">
        </div>
        <div class="content-container" data-v-e9f8cd31 style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; display: flex; justify-content: space-between; align-items: center; z-index: 4; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);">
          <div class="left-col" data-v-e9f8cd31 style="display: flex; align-items: center; gap: 8px;">
            <p class="-title-6 -uppercase" data-v-e9f8cd31 style="font-family: 'PPFormula', sans-serif; font-size: 22px; font-weight: 500; color: #fff; margin: 0;">Body Pump</p>
          </div>
          <div class="right-col" data-v-e9f8cd31>
            <span class="category-tag" data-v-e9f8cd31 style="border: 1px solid rgba(255,255,255,0.6); border-radius: 20px; color: #fff; padding: 4px 12px; font-size: 11px; text-transform: uppercase; font-family: 'AcidGrotesk', sans-serif; letter-spacing: 0.05em;">Power</span>
          </div>
        </div>
      </a>
    </div>
  </div>

  <div class="class-container" data-v-d246007c style="grid-column: 4; grid-row: 2; display: flex; justify-content: center; align-items: flex-start;">
    <div data-component="class-card" class="card" _id="164c2ce2-dd72-427f-a9e9-0652017ce63e" color="#8ecf60" data-v-e9f8cd31 style="pointer-events: visible; width: 100%; max-width: 320px; height: 420px; position: relative; border-radius: 4px; overflow: hidden; background: #211e16;">
      <a href="/en/classes/bodycombat" class="inner" data-v-e9f8cd31 style="display: block; width: 100%; height: 100%; text-decoration: none; position: relative;">
        <div class="media-container" data-v-e9f8cd31 style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
          <img width="1200" height="1800" alt="Body Combat" loading="lazy" class="media image" data-v-e9f8cd31 src="https://cdn.sanity.io/images/z6ex5ahr/production/6a4929b3097a575d93d60c97052e023a29060419-1200x1800.jpg" style="width: 100%; height: 100%; object-fit: cover; opacity: 1; display: block;">
        </div>
        <div class="content-container" data-v-e9f8cd31 style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; display: flex; justify-content: space-between; align-items: center; z-index: 4; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);">
          <div class="left-col" data-v-e9f8cd31 style="display: flex; align-items: center; gap: 8px;">
            <p class="-title-6 -uppercase" data-v-e9f8cd31 style="font-family: 'PPFormula', sans-serif; font-size: 22px; font-weight: 500; color: #fff; margin: 0;">Body Combat</p>
          </div>
          <div class="right-col" data-v-e9f8cd31>
            <span class="category-tag" data-v-e9f8cd31 style="border: 1px solid rgba(255,255,255,0.6); border-radius: 20px; color: #fff; padding: 4px 12px; font-size: 11px; text-transform: uppercase; font-family: 'AcidGrotesk', sans-serif; letter-spacing: 0.05em;">Moves</span>
          </div>
        </div>
      </a>
    </div>
  </div>

  <div class="class-container" data-v-d246007c style="grid-column: 1; grid-row: 3; display: flex; justify-content: center; align-items: flex-end;">
    <div data-component="class-card" class="card" _id="2dd4afcf-78f5-425b-a8cc-719f46622a9b" color="#9db94d" data-v-e9f8cd31 style="pointer-events: visible; width: 100%; max-width: 320px; height: 420px; position: relative; border-radius: 4px; overflow: hidden; background: #211e16;">
      <a href="/en/classes/body-balance" class="inner" data-v-e9f8cd31 style="display: block; width: 100%; height: 100%; text-decoration: none; position: relative;">
        <div class="media-container" data-v-e9f8cd31 style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
          <img width="1200" height="1800" alt="Body Balance" loading="lazy" class="media image" data-v-e9f8cd31 src="https://cdn.sanity.io/images/z6ex5ahr/production/ffddf0ab0b600972e3d2ef1ba46adcd0b9ff7b2b-1200x1800.jpg" style="width: 100%; height: 100%; object-fit: cover; opacity: 1; display: block;">
        </div>
        <div class="content-container" data-v-e9f8cd31 style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; display: flex; justify-content: space-between; align-items: center; z-index: 4; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);">
          <div class="left-col" data-v-e9f8cd31 style="display: flex; align-items: center; gap: 8px;">
            <p class="-title-6 -uppercase" data-v-e9f8cd31 style="font-family: 'PPFormula', sans-serif; font-size: 22px; font-weight: 500; color: #fff; margin: 0;">Body Balance</p>
          </div>
          <div class="right-col" data-v-e9f8cd31>
            <span class="category-tag" data-v-e9f8cd31 style="border: 1px solid rgba(255,255,255,0.6); border-radius: 20px; color: #fff; padding: 4px 12px; font-size: 11px; text-transform: uppercase; font-family: 'AcidGrotesk', sans-serif; letter-spacing: 0.05em;">Flow</span>
          </div>
        </div>
      </a>
    </div>
  </div>

  <div class="class-container" data-v-d246007c style="grid-column: 4; grid-row: 4; display: flex; justify-content: center; align-items: flex-start;">
    <div data-component="class-card" class="card" _id="709474b7-36a1-4883-b5f0-6b1b044938a1" color="#66f6e1" data-v-e9f8cd31 style="pointer-events: visible; width: 100%; max-width: 320px; height: 420px; position: relative; border-radius: 4px; overflow: hidden; background: #211e16;">
      <a href="/en/classes/aqua-aerobics" class="inner" data-v-e9f8cd31 style="display: block; width: 100%; height: 100%; text-decoration: none; position: relative;">
        <div class="media-container" data-v-e9f8cd31 style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
          <img width="1200" height="1800" alt="Aqua Aerobics" loading="lazy" class="media image" data-v-e9f8cd31 src="https://cdn.sanity.io/images/z6ex5ahr/production/4c99eeaaaa0c27351da09853ec0d3f28e06f45d5-1200x1800.jpg" style="width: 100%; height: 100%; object-fit: cover; opacity: 1; display: block;">
        </div>
        <div class="content-container" data-v-e9f8cd31 style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; display: flex; justify-content: space-between; align-items: center; z-index: 4; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);">
          <div class="left-col" data-v-e9f8cd31 style="display: flex; align-items: center; gap: 8px;">
            <p class="-title-6 -uppercase" data-v-e9f8cd31 style="font-family: 'PPFormula', sans-serif; font-size: 22px; font-weight: 500; color: #fff; margin: 0;">Aqua Aerobics</p>
          </div>
          <div class="right-col" data-v-e9f8cd31>
            <span class="category-tag" data-v-e9f8cd31 style="border: 1px solid rgba(255,255,255,0.6); border-radius: 20px; color: #fff; padding: 4px 12px; font-size: 11px; text-transform: uppercase; font-family: 'AcidGrotesk', sans-serif; letter-spacing: 0.05em;">Aqua</span>
          </div>
        </div>
      </a>
    </div>
  </div>
`;

html = html.replace(
  /<div data-component="grid" data-v-01ef0c1c data-v-d246007c><!--\[--><!--\]--><\/div>/g,
  `<div data-component="grid" data-v-01ef0c1c data-v-d246007c style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; padding: 40px 24px; max-width: 1400px; margin: 0 auto; position: relative; z-index: 5;">${classesCardsHTML}</div>`
);

// 2. Phive App: Fix phone mockup and app store badges
html = html.replace(/<source srcset="\/imgs\/phive-app\.jpg"[^>]*>/g, '<source srcset="/imgs/phive-app.jpg" media="(min-width: 1024px)">');
html = html.replace(/<source srcset="\/imgs\/phive-app-tablet\.jpg"[^>]*>/g, '<source srcset="/imgs/phive-app-tablet.jpg" media="(min-width: 600px)">');
html = html.replace(/<img src="\/imgs\/phive-app-mobile\.jpg" alt="Hero image"[^>]*>/g, '<img src="/imgs/phive-app.jpg" alt="Phive App" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; opacity: 1; display: block;">');

// 3. Move the floating pill bar and the floating CTA button OUT of menu-grid to ensure they are 100% fixed at the bottom of the viewport
// Let's create an explicit #phive-floating-ui container right before </body>
const floatingUIHTML = `
<!-- PHIVE PERMANENT FLOATING UI -->
<div id="phive-floating-ui" style="pointer-events: none; position: fixed; bottom: 0; left: 0; width: 100vw; height: 100px; z-index: 99999; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 24px;">
  <!-- Signature Floating Pill Bar -->
  <div class="phive-pill-bar" style="pointer-events: auto; background-color: var(--color-yellow); border: 1px solid var(--color-darkBrown); border-radius: 9999px; height: 52px; width: 310px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.35); cursor: pointer; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
    <!-- Left: Burger Menu Button -->
    <button class="burger-btn" aria-label="Open Menu" style="width: 40px; height: 40px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; background: transparent; border: none; cursor: pointer; padding: 0;">
      <span style="display: block; width: 20px; height: 2px; background-color: var(--color-darkBrown); border-radius: 2px; transition: transform 0.3s;"></span>
      <span style="display: block; width: 20px; height: 2px; background-color: var(--color-darkBrown); border-radius: 2px; transition: opacity 0.3s;"></span>
      <span style="display: block; width: 20px; height: 2px; background-color: var(--color-darkBrown); border-radius: 2px; transition: transform 0.3s;"></span>
    </button>
    <!-- Center: PHIVE Brand Logo -->
    <a href="/en" class="logo-link" style="display: flex; align-items: center; justify-content: center; text-decoration: none;">
      <span style="font-family: 'PPFormula', sans-serif; font-size: 22px; font-weight: 800; letter-spacing: -0.04em; color: var(--color-darkBrown); text-transform: uppercase;">PHIVE</span>
    </a>
    <!-- Right: Sound Equalizer Toggle -->
    <button class="sound-btn" aria-label="Toggle Sound" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; gap: 3px; background: transparent; border: none; cursor: pointer; padding: 0;">
      <span class="eq-bar" style="display: block; width: 2.5px; height: 14px; background-color: var(--color-darkBrown); border-radius: 1px;"></span>
      <span class="eq-bar" style="display: block; width: 2.5px; height: 20px; background-color: var(--color-darkBrown); border-radius: 1px;"></span>
      <span class="eq-bar" style="display: block; width: 2.5px; height: 10px; background-color: var(--color-darkBrown); border-radius: 1px;"></span>
      <span class="eq-bar" style="display: block; width: 2.5px; height: 16px; background-color: var(--color-darkBrown); border-radius: 1px;"></span>
    </button>
  </div>

  <!-- Right: Floating Schedule A Visit CTA Button -->
  <div class="phive-floating-cta" style="pointer-events: auto; position: absolute; right: 24px; bottom: 24px;">
    <button class="schedule-visit-btn" aria-label="Schedule a visit" style="background-color: var(--color-darkBrown); color: var(--color-yellow); border: 1px solid var(--color-yellow); border-radius: 9999px; height: 52px; padding: 0 28px; font-family: 'PPFormula', sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(0,0,0,0.35); transition: background-color 0.25s, color 0.25s, transform 0.25s;">
      Schedule a visit
    </button>
  </div>
</div>
`;

// Insert the floating UI right before </body>
html = html.replace('</body>', `${floatingUIHTML}\n</body>`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with classes showcase, app images, and persistent floating UI!');
