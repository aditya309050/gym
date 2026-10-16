import Lenis from 'lenis';

// ==========================================================================
// 1. LENIS SMOOTH SCROLLING
// ==========================================================================
const lenis = new Lenis({
  lerp: 0.08,
  wheelMultiplier: 0.95,
  smoothWheel: true,
  touchMultiplier: 1.5,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ==========================================================================
// 2. PHIVE CUSTOM CURSOR
// ==========================================================================
const cursor = document.getElementById('phive-cursor');
let mouseX = -100, mouseY = -100;
let cursorX = -100, cursorY = -100;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  if (cursor) {
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

function initHoverElements() {
  const hoverables = document.querySelectorAll('button, a, .club, [data-component="button-round-variable"], [data-component="content-button"], [data-component="variable-label"]');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
  });
}
initHoverElements();

// ==========================================================================
// 3. SOUND CONTROLLER (Persistent Phive Ambient Audio)
// ==========================================================================
const audio = document.getElementById('ambient-audio');
const soundBtn = document.querySelector('[data-component="sound-btn"], .sound-btn');
let isAudioPlaying = false;

if (soundBtn && audio) {
  audio.volume = 0.4;

  soundBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAudioPlaying) {
      audio.pause();
      isAudioPlaying = false;
      soundBtn.removeAttribute('data-active');
      soundBtn.classList.remove('playing');
    } else {
      audio.play().then(() => {
        isAudioPlaying = true;
        soundBtn.setAttribute('data-active', 'true');
        soundBtn.classList.add('playing');
      }).catch(err => {
        console.warn('Audio play restricted:', err);
      });
    }
  });
}

// ==========================================================================
// 4. MENU GRID DRAWER (Fullscreen Navigation)
// ==========================================================================
const burgerBtn = document.querySelector('[data-component="burger"], .burger-btn');
const menuGrid = document.querySelector('[data-component="menu-grid"]');
const closeBtn = document.querySelector('.close-btn');

function openMenu() {
  if (menuGrid) {
    menuGrid.setAttribute('data-state', 'active');
    burgerBtn?.setAttribute('data-state', 'active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu() {
  if (menuGrid) {
    menuGrid.setAttribute('data-state', 'inactive');
    burgerBtn?.removeAttribute('data-state');
    document.body.style.overflow = '';
  }
}

burgerBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  const isActive = menuGrid?.getAttribute('data-state') === 'active';
  if (isActive) closeMenu();
  else openMenu();
});

closeBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  closeMenu();
});

// Menu links click navigation
document.querySelectorAll('[data-component="menu-grid"] a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// ==========================================================================
// 5. INTERACTIVE CLUBS CAROUSEL & TABS
// ==========================================================================
const clubCards = document.querySelectorAll('[data-component="clubs-cards"] .club');

clubCards.forEach((card, idx) => {
  card.addEventListener('click', () => {
    clubCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });

  card.addEventListener('mouseenter', () => {
    card.querySelector('[data-component="variable-label"]')?.setAttribute('data-hover', 'true');
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('[data-component="variable-label"]')?.removeAttribute('data-hover');
  });
});

// ==========================================================================
// 6. VARIABLE LABELS HOVER INTERPOLATION
// ==========================================================================
document.querySelectorAll('[data-component="variable-label"]').forEach(label => {
  label.addEventListener('mouseenter', () => label.setAttribute('data-hover', 'true'));
  label.addEventListener('mouseleave', () => label.removeAttribute('data-hover'));
});

// ==========================================================================
// 7. SCHEDULE A VISIT MODAL DRAWER
// ==========================================================================
const modalDrawer = document.querySelector('[data-component="modal-drawer"]');

function openVisitModal() {
  if (modalDrawer) {
    modalDrawer.setAttribute('data-state', 'active');
    document.body.style.overflow = 'hidden';
  } else {
    alert("Welcome to Phive!\n\nSchedule a VIP visit to discover our clubs in Lisbon, Porto, Coimbra, and Leiria.");
  }
}

function closeVisitModal() {
  if (modalDrawer) {
    modalDrawer.setAttribute('data-state', 'inactive');
    document.body.style.overflow = '';
  }
}

document.querySelectorAll('[aria-label="Schedule a visit"], [data-component="content-button"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openVisitModal();
  });
});

modalDrawer?.querySelector('.close-btn')?.addEventListener('click', closeVisitModal);

// ==========================================================================
// 8. AUTOPLAY VIDEOS ENSURANCE
// ==========================================================================
document.querySelectorAll('video').forEach(vid => {
  vid.muted = true;
  vid.play().catch(() => {
    // Autoplay policy bypass
    window.addEventListener('click', () => vid.play(), { once: true });
  });
});

console.log('Phive official experience initialized.');
