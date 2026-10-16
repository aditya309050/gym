import './style.css';
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

// Support programmatic URL scroll parameter for visual inspection
const params = new URLSearchParams(window.location.search);
const scrollToY = params.get('scrollTo');
if (scrollToY) {
  setTimeout(() => {
    window.scrollTo(0, parseInt(scrollToY, 10));
    lenis.scrollTo(parseInt(scrollToY, 10), { immediate: true });
  }, 150);
}

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
  const hoverables = document.querySelectorAll('button, a, .club, .card, [data-component="button-round-variable"], [data-component="content-button"], [data-component="variable-label"], .phive-pill-bar, .schedule-visit-btn');
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
const soundBtns = document.querySelectorAll('[data-component="sound-btn"], .sound-btn');
let isAudioPlaying = false;

if (audio) {
  audio.volume = 0.4;

  soundBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isAudioPlaying) {
        audio.pause();
        isAudioPlaying = false;
        soundBtns.forEach(b => {
          b.removeAttribute('data-active');
          b.classList.remove('playing');
        });
      } else {
        audio.play().then(() => {
          isAudioPlaying = true;
          soundBtns.forEach(b => {
            b.setAttribute('data-active', 'true');
            b.classList.add('playing');
          });
        }).catch(err => {
          console.warn('Audio play restricted:', err);
        });
      }
    });
  });
}

// ==========================================================================
// 4. MENU GRID DRAWER (Fullscreen Navigation)
// ==========================================================================
const burgerBtns = document.querySelectorAll('[data-component="burger"], .burger-btn');
const menuGrid = document.querySelector('[data-component="menu-grid"]');
const closeBtns = document.querySelectorAll('.close-btn, .close-hitarea');

function openMenu() {
  if (menuGrid) {
    menuGrid.setAttribute('data-state', 'active');
    menuGrid.setAttribute('data-open', 'true');
    menuGrid.style.transform = 'translateY(0)';
    menuGrid.style.pointerEvents = 'auto';
    burgerBtns.forEach(b => b.setAttribute('data-state', 'active'));
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu() {
  if (menuGrid) {
    menuGrid.setAttribute('data-state', 'inactive');
    menuGrid.removeAttribute('data-open');
    menuGrid.style.transform = 'translateY(-100%)';
    menuGrid.style.pointerEvents = 'none';
    burgerBtns.forEach(b => b.removeAttribute('data-state'));
    document.body.style.overflow = '';
  }
}

burgerBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isActive = menuGrid?.getAttribute('data-state') === 'active';
    if (isActive) closeMenu();
    else openMenu();
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeMenu();
    closeVisitModal();
  });
});

// Menu links click navigation
document.querySelectorAll('[data-component="menu-grid"] a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// ==========================================================================
// 5. SCHEDULE A VISIT MODAL DRAWER
// ==========================================================================
const modalDrawer = document.querySelector('[data-component="modal-drawer"]');

function openVisitModal() {
  if (modalDrawer) {
    modalDrawer.setAttribute('data-state', 'active');
    modalDrawer.style.visibility = 'visible';
    modalDrawer.style.opacity = '1';
    modalDrawer.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
  }
}

function closeVisitModal() {
  if (modalDrawer) {
    modalDrawer.setAttribute('data-state', 'inactive');
    modalDrawer.style.visibility = 'hidden';
    modalDrawer.style.opacity = '0';
    modalDrawer.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  }
}

document.querySelectorAll('[aria-label="Schedule a visit"], [data-component="content-button"], .schedule-visit-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openVisitModal();
  });
});

modalDrawer?.querySelector('.close-btn')?.addEventListener('click', closeVisitModal);
modalDrawer?.querySelector('.close-hitarea')?.addEventListener('click', closeVisitModal);

// ==========================================================================
// 6. VARIABLE LABELS HOVER INTERPOLATION
// ==========================================================================
document.querySelectorAll('[data-component="variable-label"]').forEach(label => {
  label.addEventListener('mouseenter', () => label.setAttribute('data-hover', 'true'));
  label.addEventListener('mouseleave', () => label.removeAttribute('data-hover'));
});

// ==========================================================================
// 7. AUTOPLAY VIDEOS ENSURANCE
// ==========================================================================
document.querySelectorAll('video').forEach(vid => {
  vid.muted = true;
  vid.play().catch(() => {
    window.addEventListener('click', () => vid.play(), { once: true });
  });
});

console.log('Phive official experience fully initialized.');
