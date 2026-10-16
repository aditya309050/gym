import Lenis from 'lenis';

// ==========================================================================
// 1. LENIS SMOOTH INERTIA SCROLL
// ==========================================================================
const lenis = new Lenis({
  lerp: 0.09,
  wheelMultiplier: 0.9,
  smoothWheel: true,
  touchMultiplier: 1.5,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ==========================================================================
// 2. CUSTOM INVERTED CURSOR
// ==========================================================================
const cursor = document.getElementById('custom-cursor');
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

function setupCursorHovers() {
  const interactives = document.querySelectorAll('button, a, .club-card, .mosaic-card, .class-card-item, .filter-btn, .hub-tab-btn, .day-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
  });
}
setupCursorHovers();

// ==========================================================================
// 3. AUDIO ENGINE & SOUND CONTROLLER
// ==========================================================================
const audio = document.getElementById('ambient-audio');
const soundToggle = document.getElementById('sound-toggle');
const soundLabel = document.getElementById('sound-label');
let isAudioPlaying = false;

if (soundToggle && audio) {
  audio.volume = 0.35;

  soundToggle.addEventListener('click', () => {
    if (isAudioPlaying) {
      audio.pause();
      isAudioPlaying = false;
      soundToggle.classList.remove('playing');
      soundLabel.textContent = 'Sound Off';
    } else {
      audio.play().then(() => {
        isAudioPlaying = true;
        soundToggle.classList.add('playing');
        soundLabel.textContent = 'Sound On';
      }).catch(err => {
        console.warn('Audio playback blocked or failed:', err);
      });
    }
  });
}

// ==========================================================================
// 4. HEADER SCROLL DETECTION & THEME SWITCH
// ==========================================================================
const siteHeader = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // Over clubs/facilities sections (dark background), switch header to dark mode
  if (scrollY > window.innerHeight * 0.75) {
    siteHeader?.classList.add('dark');
  } else {
    siteHeader?.classList.remove('dark');
  }
}, { passive: true });

// ==========================================================================
// 5. NAVIGATION DRAWER CONTROLS
// ==========================================================================
const burgerBtn = document.getElementById('burger-btn');
const menuDrawer = document.getElementById('menu-drawer');
const drawerLinks = document.querySelectorAll('.drawer-link');

function toggleDrawer(open) {
  const isOpen = open !== undefined ? open : !menuDrawer?.classList.contains('active');
  if (isOpen) {
    menuDrawer?.classList.add('active');
    burgerBtn?.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    menuDrawer?.classList.remove('active');
    burgerBtn?.classList.remove('open');
    document.body.style.overflow = '';
  }
}

burgerBtn?.addEventListener('click', () => toggleDrawer());

drawerLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      toggleDrawer(false);
      const targetEl = document.querySelector(href);
      if (targetEl) {
        lenis.scrollTo(targetEl, { offset: -60, duration: 1.2 });
      }
    }
  });
});

// Logo smooth scroll to top
document.getElementById('logo-btn')?.addEventListener('click', (e) => {
  e.preventDefault();
  toggleDrawer(false);
  lenis.scrollTo(0, { duration: 1.2 });
});

// ==========================================================================
// 6. CLUBS CAROUSEL & CUSTOM SCRUBBER
// ==========================================================================
const clubsTrack = document.getElementById('clubs-track');
const carouselThumb = document.getElementById('carousel-thumb');
const carouselTrackBar = document.getElementById('carousel-track-bar');

if (clubsTrack && carouselThumb) {
  clubsTrack.addEventListener('scroll', () => {
    const maxScroll = clubsTrack.scrollWidth - clubsTrack.clientWidth;
    if (maxScroll > 0) {
      const scrollPct = clubsTrack.scrollLeft / maxScroll;
      const thumbMaxLeft = 75; // 100% - 25% thumb width
      carouselThumb.style.left = `${scrollPct * thumbMaxLeft}%`;
    }
  }, { passive: true });

  if (carouselTrackBar) {
    carouselTrackBar.addEventListener('click', (e) => {
      const rect = carouselTrackBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const maxScroll = clubsTrack.scrollWidth - clubsTrack.clientWidth;
      clubsTrack.scrollTo({ left: pct * maxScroll, behavior: 'smooth' });
    });
  }
}

// Club card click open visit modal with pre-selected club
document.querySelectorAll('.club-card').forEach(card => {
  card.addEventListener('click', () => {
    const clubId = card.getAttribute('data-club-id');
    const select = document.getElementById('club-select');
    if (select && clubId) {
      select.value = clubId;
    }
    openVisitModal();
  });
});

// ==========================================================================
// 7. CLASSES SHOWCASE & STUDIO FILTERING
// ==========================================================================
const classesData = [
  {
    title: 'Les Mills BodyPump™',
    studio: 'power',
    studioName: 'Power',
    duration: '55 min',
    calories: '560 kcal',
    img: '/images/phive_asset_13.jpg',
    desc: 'The original barbell workout that strengthens and tones your entire body through the proven Rep Effect.'
  },
  {
    title: 'Vinyasa Flow Yoga',
    studio: 'flow',
    studioName: 'Flow',
    duration: '60 min',
    calories: '320 kcal',
    img: '/images/phive_asset_14.jpg',
    desc: 'Dynamic breath-synchronized movement exploring fluid mobility, core stability, and mental clarity.'
  },
  {
    title: 'Phive RPM™ Cycling',
    studio: 'ride',
    studioName: 'Ride',
    duration: '45 min',
    calories: '620 kcal',
    img: '/images/phive_asset_15.jpg',
    desc: 'High-octane indoor cycling theater combining peak cardiovascular climbing, cadence surges, and immersive sound.'
  },
  {
    title: 'Les Mills Core™',
    studio: 'power',
    studioName: 'Power',
    duration: '45 min',
    calories: '410 kcal',
    img: '/images/phive_asset_16.jpg',
    desc: 'Scientific 3D core conditioning targeting abs, glutes, and slings for athletic stability and injury defense.'
  },
  {
    title: 'Reformer Pilates Master',
    studio: 'flow',
    studioName: 'Flow',
    duration: '50 min',
    calories: '380 kcal',
    img: '/images/phive_asset_17.jpg',
    desc: 'Spring-loaded resistance training on clinical reformers to lengthen muscles, align pelvis, and articulate the spine.'
  },
  {
    title: 'Les Mills Dance™',
    studio: 'moves',
    studioName: 'Moves',
    duration: '45 min',
    calories: '490 kcal',
    img: '/images/phive_asset_18.jpg',
    desc: 'Electrifying movement patterns set to chart-topping house, hip-hop, and afro beats. Pure joy and sweat.'
  },
  {
    title: 'Hydro HIIT & Swim',
    studio: 'aqua',
    studioName: 'Aqua',
    duration: '45 min',
    calories: '440 kcal',
    img: '/images/phive_asset_19.jpg',
    desc: 'Explosive interval training in our heated 25m lanes utilizing hydrostatic water resistance without joint strain.'
  },
  {
    title: 'Phive Active Kids',
    studio: 'kids',
    studioName: 'Kids',
    duration: '45 min',
    calories: '300 kcal',
    img: '/images/phive_asset_20.jpg',
    desc: 'Fun, agility-focused youth athletic drills instilling confidence, teamwork, and healthy lifestyle habits.'
  }
];

const classesContainer = document.getElementById('classes-container');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderClasses(filter = 'all') {
  if (!classesContainer) return;
  const filtered = filter === 'all' 
    ? classesData 
    : classesData.filter(c => c.studio === filter);

  classesContainer.innerHTML = filtered.map(c => `
    <div class="class-card-item">
      <div class="class-img">
        <img src="${c.img}" alt="${c.title}" loading="lazy" />
        <span class="studio-badge ${c.studio}">${c.studioName}</span>
      </div>
      <div class="class-body">
        <h3 class="-title-6 class-title">${c.title}</h3>
        <p class="-body-1" style="color: rgba(22, 16, 3, 0.7);">${c.desc}</p>
        <div class="class-stats">
          <span>⏱ ${c.duration}</span>
          <span>🔥 ${c.calories}</span>
          <span>📍 All Clubs</span>
        </div>
        <button class="btn-round secondary open-visit-modal-btn" style="margin-top: 8px; width: 100%;">
          Try This Class
        </button>
      </div>
    </div>
  `).join('');

  setupCursorHovers();
  attachModalTriggers();
}

renderClasses('all');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter') || 'all';
    renderClasses(filter);
  });
});

// ==========================================================================
// 8. FITNESS HUB 4 PILLARS INTERACTIVE TABS
// ==========================================================================
const hubData = {
  coach: {
    title: 'Phive Coach™',
    subtitle: 'Personal Training & Performance',
    img: '/images/phive_asset_21.jpg',
    desc: 'Whatever your goal may be — maximizing athletic performance, body recomposition, recovering from previous injuries, or enhancing day-to-day vitality — you will succeed faster with dedicated 1-on-1 coaching. Our certified specialists formulate a safe, challenging, and progressively monitored workout regimen tailored strictly to your physiology.',
    benefits: [
      'Biomechanical movement assessment',
      'Custom progressive overload schedule',
      'Weekly strength and mobility testing',
      'Direct trainer accountability & app check-ins'
    ]
  },
  physio: {
    title: 'Phive Physio™',
    subtitle: 'Clinical Physiotherapy & Recovery',
    img: '/images/phive_asset_22.jpg',
    desc: 'Health and longevity require structural balance. Our in-house licensed physiotherapists work collaboratively with training staff to detect postural imbalances, treat acute or chronic musculoskeletal pain, and guide rapid, safe rehabilitation post-injury or surgery.',
    benefits: [
      'Comprehensive spinal & joint diagnosis',
      'Myofascial release & trigger point therapy',
      'Post-rehabilitation strength progression',
      'Ergonomic & functional postural correction'
    ]
  },
  nutri: {
    title: 'Phive Nutri™',
    subtitle: 'Sports & Clinical Nutrition',
    img: '/images/phive_asset_23.jpg',
    desc: 'Nutritional education is the bedrock of long-term sustainable wellness. Our registered nutritionists craft flexible, nutrient-dense nutritional protocols that complement your athletic workload, daily schedule, culinary preferences, and metabolic profile.',
    benefits: [
      'Gold-standard bioimpedance body composition scans',
      'Personalized macronutrient & micronutrient targets',
      'Nutritional timing for training & recovery',
      'Long-term behavioral eating habit evolution'
    ]
  },
  pilates: {
    title: 'Phive Pilates™',
    subtitle: 'Private Reformer & Cadillac Studio',
    img: '/images/phive_asset_24.jpg',
    desc: 'Experience pure movement mindfulness and deep postural alignment. Conducted in serene, private boutique studios equipped with authentic Reformers, Cadillacs, and Wunda Chairs to strengthen deep stabilizing musculature and cultivate graceful spinal flexibility.',
    benefits: [
      'Individualized Spring-resistance apparatus work',
      'Pelvic floor & deep transversal abdominal activation',
      'Spinal decompression and postural symmetry',
      'Low-impact rehabilitation suitable for all ages'
    ]
  }
};

const hubTabs = document.querySelectorAll('.hub-tab-btn');
const hubImg = document.getElementById('hub-img');
const hubTitle = document.getElementById('hub-title');
const hubSubtitle = document.getElementById('hub-subtitle');
const hubDesc = document.getElementById('hub-desc');
const hubBenefits = document.getElementById('hub-benefits');

hubTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    hubTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const pillar = tab.getAttribute('data-pillar');
    const data = hubData[pillar];
    if (!data) return;

    if (hubImg) hubImg.src = data.img;
    if (hubTitle) hubTitle.textContent = data.title;
    if (hubSubtitle) hubSubtitle.textContent = data.subtitle;
    if (hubDesc) hubDesc.textContent = data.desc;
    if (hubBenefits) {
      hubBenefits.innerHTML = data.benefits.map(b => `
        <div class="benefit-item">
          <span class="dot"></span>
          <span class="-body-1">${b}</span>
        </div>
      `).join('');
    }
  });
});

// ==========================================================================
// 9. TIMETABLE LIVE WEEKLY SCHEDULE
// ==========================================================================
const timetableSchedule = {
  Mon: [
    { time: '07:00', title: 'RPM™ Cycling', studio: 'Ride Studio', instructor: 'Ricardo M.', spots: '4 left' },
    { time: '08:30', title: 'Vinyasa Flow Yoga', studio: 'MindBody Studio', instructor: 'Inês S.', spots: '2 left' },
    { time: '12:30', title: 'Les Mills BodyPump™', studio: 'Power Arena', instructor: 'Tiago P.', spots: 'Full' },
    { time: '18:00', title: 'Reformer Pilates', studio: 'Pilates Studio', instructor: 'Beatriz L.', spots: '1 left' },
    { time: '19:15', title: 'Hydro HIIT', studio: 'Aquatic Zone', instructor: 'André F.', spots: '5 left' },
    { time: '20:00', title: 'Les Mills Core™', studio: 'Power Arena', instructor: 'Sofia R.', spots: '3 left' }
  ],
  Tue: [
    { time: '07:15', title: 'Les Mills Sprint™', studio: 'Ride Studio', instructor: 'Diogo C.', spots: '3 left' },
    { time: '09:00', title: 'Pilates Mat & Flow', studio: 'MindBody Studio', instructor: 'Beatriz L.', spots: '5 left' },
    { time: '13:00', title: 'Functional CrossTrain', studio: 'Turf Arena', instructor: 'Marco V.', spots: '2 left' },
    { time: '18:30', title: 'Les Mills Dance™', studio: 'Studio 1', instructor: 'Carlota P.', spots: '6 left' },
    { time: '19:45', title: 'BodyPump™ Express', studio: 'Power Arena', instructor: 'Tiago P.', spots: '4 left' }
  ],
  Wed: [
    { time: '07:00', title: 'Vinyasa Yoga Awakening', studio: 'MindBody Studio', instructor: 'Inês S.', spots: '3 left' },
    { time: '08:30', title: 'RPM™ Power Intervals', studio: 'Ride Studio', instructor: 'Ricardo M.', spots: '2 left' },
    { time: '12:30', title: 'Les Mills Core™', studio: 'Power Arena', instructor: 'Sofia R.', spots: '5 left' },
    { time: '18:15', title: 'Aqua Conditioning', studio: 'Aquatic Zone', instructor: 'André F.', spots: '4 left' },
    { time: '19:30', title: 'Reformer Pilates Pro', studio: 'Pilates Studio', instructor: 'Beatriz L.', spots: 'Full' }
  ],
  Thu: [
    { time: '07:30', title: 'BodyPump™ Heavy', studio: 'Power Arena', instructor: 'Tiago P.', spots: '3 left' },
    { time: '09:00', title: 'Restorative Mobility', studio: 'MindBody Studio', instructor: 'Inês S.', spots: '6 left' },
    { time: '13:00', title: 'Sprint™ 30', studio: 'Ride Studio', instructor: 'Diogo C.', spots: '4 left' },
    { time: '18:30', title: 'Les Mills Dance™ Party', studio: 'Studio 1', instructor: 'Carlota P.', spots: '2 left' },
    { time: '19:45', title: 'Hydro HIIT Challenge', studio: 'Aquatic Zone', instructor: 'André F.', spots: '5 left' }
  ],
  Fri: [
    { time: '07:00', title: 'RPM™ Enduro', studio: 'Ride Studio', instructor: 'Ricardo M.', spots: '4 left' },
    { time: '08:30', title: 'Reformer Pilates Flow', studio: 'Pilates Studio', instructor: 'Beatriz L.', spots: '1 left' },
    { time: '12:30', title: 'BodyPump™ Classic', studio: 'Power Arena', instructor: 'Marco V.', spots: '3 left' },
    { time: '18:00', title: 'Friday Night Dance Jam', studio: 'Studio 1', instructor: 'Carlota P.', spots: '8 left' },
    { time: '19:15', title: 'Sunset Candlelit Yoga', studio: 'MindBody Studio', instructor: 'Inês S.', spots: 'Full' }
  ],
  Sat: [
    { time: '09:00', title: 'Weekend BodyPump™', studio: 'Power Arena', instructor: 'Tiago P.', spots: '5 left' },
    { time: '10:15', title: 'RPM™ Masterclass', studio: 'Ride Studio', instructor: 'Diogo C.', spots: '3 left' },
    { time: '11:30', title: 'Pilates Reformer Open', studio: 'Pilates Studio', instructor: 'Beatriz L.', spots: '2 left' },
    { time: '15:00', title: 'Phive Active Kids', studio: 'Turf Arena', instructor: 'André F.', spots: '6 left' }
  ],
  Sun: [
    { time: '09:30', title: 'Sunday Awakening Yoga', studio: 'MindBody Studio', instructor: 'Inês S.', spots: '4 left' },
    { time: '11:00', title: 'Les Mills Core™ & Mobility', studio: 'Power Arena', instructor: 'Sofia R.', spots: '6 left' },
    { time: '12:00', title: 'Family Hydro Splash', studio: 'Aquatic Zone', instructor: 'André F.', spots: '8 left' }
  ]
};

const dayBtns = document.querySelectorAll('.day-btn');
const scheduleTableContainer = document.getElementById('schedule-table-container');

function renderSchedule(day = 'Mon') {
  if (!scheduleTableContainer) return;
  const sessions = timetableSchedule[day] || [];
  
  scheduleTableContainer.innerHTML = sessions.map(s => `
    <div class="schedule-row">
      <div class="time">${s.time}</div>
      <div class="class-name">
        <strong>${s.title}</strong>
      </div>
      <div class="studio">${s.studio}</div>
      <div class="instructor">${s.instructor}</div>
      <div>
        <button class="btn-round secondary open-visit-modal-btn" style="height: 32px; padding: 0 14px; font-size: 10px;">
          ${s.spots === 'Full' ? 'Join Waitlist' : 'Reserve Spot'}
        </button>
      </div>
    </div>
  `).join('');

  setupCursorHovers();
  attachModalTriggers();
}

renderSchedule('Mon');

dayBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    dayBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const day = btn.getAttribute('data-day') || 'Mon';
    renderSchedule(day);
  });
});

// ==========================================================================
// 10. SCHEDULE A VISIT MODAL CONTROLLER
// ==========================================================================
const scheduleModal = document.getElementById('schedule-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const visitForm = document.getElementById('visit-form');

function openVisitModal() {
  if (scheduleModal) {
    scheduleModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeVisitModal() {
  if (scheduleModal) {
    scheduleModal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function attachModalTriggers() {
  document.querySelectorAll('.open-visit-modal-btn, #header-visit-btn, #drawer-visit-btn, #hero-join-btn').forEach(btn => {
    btn.removeEventListener('click', openVisitModal);
    btn.addEventListener('click', openVisitModal);
  });
}
attachModalTriggers();

closeModalBtn?.addEventListener('click', closeVisitModal);

scheduleModal?.addEventListener('click', (e) => {
  if (e.target === scheduleModal) {
    closeVisitModal();
  }
});

visitForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const club = document.getElementById('club-select')?.value;
  const date = document.getElementById('visit-date')?.value;
  const firstName = document.getElementById('first-name')?.value;

  alert(`Congratulations, ${firstName}!\n\nYour VIP visit to Phive Club (${club.toUpperCase()}) on ${date} has been confirmed. A concierge will contact you via WhatsApp / Phone to prepare your personalized welcome pass!`);
  
  visitForm.reset();
  closeVisitModal();
});

// Set default date to tomorrow in form
const dateInput = document.getElementById('visit-date');
if (dateInput) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.value = tomorrow.toISOString().split('T')[0];
  dateInput.min = tomorrow.toISOString().split('T')[0];
}

console.log('Phive experience initialized successfully.');
