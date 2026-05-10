const PHOTOS = [
    { id:1,  title: "Millington, TN Airport",                           state: "Tennessee",          tags: ["Airport", "Tennessee", "2026"],                                              src: "./images/gallery/webp/IMG_0606.webp" },
    { id:2,  title: "Mississippi River - New Orleans",                  state: "Louisiana",          tags: ["River","Mississippi River", "New Orleans", "Louisiana", "2026"],             src: "./images/gallery/webp/IMG_0580.webp" },
    { id:3,  title: "Amarillo International Airport",                   state: "Texas",              tags: ["Airport","Texas","2026"],                                                    src: "./images/gallery/webp/IMG_0535.webp" },
    { id:4,  title: "Savannah/Hilton Head International Airport",       state: "Georgia",            tags: ["Airport", "Georgia","2026"],                                                 src: "./images/gallery/webp/IMG_0427.webp" },
    { id:5,  title: "Piedmont Triad International Airport",             state: "North Carolina",     tags: ["Airport", "North Carolina", "2026", "Cessna", "Conquest"],                   src: "./images/gallery/webp/IMG_0290.webp" },
    { id:6,  title: "Saint Louis, Missouri",                            state: "Missouri",           tags: ["City", "St. Louis", "Missouri", "2026", "Cessna", "Conquest"],               src: "./images/gallery/webp/IMG_0197.webp" },
    { id:7,  title: "Houston, Texas",                                   state: "Texas",              tags: ["City", "Houston", "Texas", "2026", "Cessna", "Conquest"],                    src: "./images/gallery/webp/IMG_0047.webp" },
    { id:8,  title: "New York, New York",                               state: "New York",           tags: ["City", "New York City", "New York", "2025", "Cessna", "Conquest"],           src: "./images/gallery/webp/IMG_7568.webp" },
    { id:9,  title: "Supercell Thunderstorm",                           state: "Kansas",             tags: ["Thunderstorm", "2025", "Cessna", "Conquest"],                                src: "./images/gallery/webp/IMG_7776.webp" },
    { id:10, title: "Assumption, Illinois",                             state: "Illinois",           tags: ["City", "Assumption", "Illinois", "2025", "Cessna", "Stationair"],            src: "./images/gallery/webp/IMG_7974.webp" },
    { id:11, title: "Austin-Bergstrom International Aiport",            state: "Texas",              tags: ["Airport", "Texas", "2025", "Cessna", "Conquest"],                            src: "./images/gallery/webp/IMG_8303.webp" },
    { id:12,  title: "Charlotte, North Carolina",                       state: "North Carolina",     tags: ["City", "Charlotte", "North Carolina", "2025", "Cessna", "Conquest"],         src: "./images/gallery/webp/IMG_8469.webp" },
    { id:13, title: "Charlotte Douglas International Airport",          state: "North Carolina",     tags: ["Airport", "North Carolina", "2025", "Cessna", "Conquest"],                   src: "./images/gallery/webp/IMG_8472.webp" },
    { id:14, title: "Charlotte Douglas International Airport",          state: "North Carolina",     tags: ["Airport", "North Carolina", "2025", "Cessna", "Conquest"],                   src: "./images/gallery/webp/IMG_8473.webp" },
    { id:15, title: "USAF KC-135 Stratotanker at KGSO",                 state: "South Carolina",     tags: ["Airport", "South Carolina", "2025", "KC-135", "Stratotanker"],               src: "./images/gallery/webp/IMG_8481.webp" },
    { id:16, title: "Greenville-Spartanburg International Airport",     state: "South Carolina",     tags: ["Airport", "Souoth Carolina", "2025", "Cessna", "Conquest"],                  src: "./images/gallery/webp/IMG_8488.webp" },
    { id:17, title: "Austin, Texas",                                    state: "Texas",              tags: ["City", "Austin", "Texas", "2025", "Cessna", "Conquest"],                     src: "./images/gallery/webp/IMG_8696.webp" },
    { id:18, title: "Northwest Arkansas National Airport",              state: "Arkansas",           tags: ["Airport", "Arkansas", "2025"],                                               src: "./images/gallery/webp/IMG_8707.webp" },
    { id:19, title: "Chris flying a Cessna Caravan",                    state: "Missouri",           tags: ["Cessna", "Caravan", "2025", "Missouri"],                                     src: "./images/gallery/webp/IMG_8781.webp" },
    { id:20, title: "Orlando, Florida",                                 state: "Florida",            tags: ["City", "Orlando", "Florida", "2025"],                                        src: "./images/gallery/webp/IMG_9178.webp" },
    { id:21, title: "McKinney National Airport",                        state: "Texas",              tags: ["Airport", "Texas", "2026"],                                                  src: "./images/gallery/webp/IMG_9289.webp" },
    { id:22, title: "Kansas City, Missouri",                            state: "Missouri",           tags: ["City", "Kansas City", "Missouri", "2026", "Cessna", "Conquest"],             src: "./images/gallery/webp/IMG_9588.webp" },
    { id:23, title: "Kansas City, Missouri",                            state: "Missouri",           tags: ["City", "Kansas City", "Missouri", "2026", "Cessna", "Conquest"],             src: "./images/gallery/webp/IMG_9620.webp" },
    { id:24, title: "Kansas City, Missouri",                            state: "Missouri",           tags: ["City", "Kansas City", "Missouri", "2026", "Cessna", "Conquest"],             src: "./images/gallery/webp/IMG_9627.webp" },
];

let photos = [...PHOTOS];
let activeState = 'all';
let searchQuery = '';

// ── STATE LIST ───────────────────────────────────────────────────────────────
function getStates() {
  const map = {};
  photos.forEach(p => { map[p.state] = (map[p.state] || 0) + 1; });
  return Object.entries(map).sort((a,b) => a[0].localeCompare(b[0]));
}

function buildSidebar() {
  const list = document.getElementById('state-list');
  const states = getStates();
  list.innerHTML = '';
  states.forEach(([name, count]) => {
    const btn = document.createElement('button');
    btn.className = 'state-btn' + (activeState === name ? ' active' : '');
    btn.dataset.state = name;
    btn.innerHTML = `${name}<span class="count">${count}</span>`;
    btn.addEventListener('click', () => setActiveState(name));
    list.appendChild(btn);
  });
  // update "all" count
  document.getElementById('count-all').textContent = photos.length;
}

function setActiveState(state) {
  activeState = state;
  document.querySelectorAll('.state-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.state === state);
  });
  document.getElementById('current-label').textContent = state === 'all' ? 'All States' : state;
  document.getElementById('label-above').textContent = state === 'all' ? 'Showing all' : 'Filtered by';
  renderGallery();
}

// ── GALLERY ──────────────────────────────────────────────────────────────────
function renderGallery() {
  const gallery = document.getElementById('gallery');
  const q = searchQuery.toLowerCase();
  const filtered = photos.filter(p => {
    const stateOk = activeState === 'all' || p.state === activeState;
    const searchOk = !q || p.title.toLowerCase().includes(q) || p.state.toLowerCase().includes(q) || (p.tags||[]).some(t => t.includes(q));
    return stateOk && searchOk;
  });

  if (!filtered.length) {
    gallery.innerHTML = '<div class="empty">// NO RECORDS FOUND</div>';
    return;
  }

  gallery.innerHTML = filtered.map(p => `
    <div class="photo-card" data-id="${p.id}">
      <img src="${p.src}" alt="${p.title}" loading="lazy">
      <div class="overlay"></div>
      <div class="info">
        <div class="title">${p.title}</div>
        <div class="meta">${p.state.toUpperCase()} · ${(p.tags||[]).join(' · ')}</div>
      </div>
    </div>
  `).join('');

  gallery.querySelectorAll('.photo-card').forEach(card => {
    card.addEventListener('click', () => openLightbox(+card.dataset.id));
  });
}

// ── LIGHTBOX ─────────────────────────────────────────────────────────────────
function openLightbox(id) {
  const p = photos.find(x => x.id === id);
  if (!p) return;
  document.getElementById('lb-img').src = p.src;
  document.getElementById('lb-title').textContent = p.title;
  document.getElementById('lb-state').textContent = p.state.toUpperCase() + (p.tags.length ? ' // ' + p.tags.join(', ') : '');
  document.getElementById('lightbox').classList.add('open');
}
document.getElementById('lb-close').addEventListener('click', () => {
  document.getElementById('lightbox').classList.remove('open');
});
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox'))
    document.getElementById('lightbox').classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('lightbox').classList.remove('open');
    document.getElementById('modal').classList.remove('open');
  }
});

// ── SEARCH ───────────────────────────────────────────────────────────────────
document.getElementById('search-input').addEventListener('input', e => {
  searchQuery = e.target.value;
  renderGallery();
});

// ── INIT ──────────────────────────────────────────────────────────────────────
document.querySelector('.state-btn[data-state="all"]').addEventListener('click', () => setActiveState('all'));
buildSidebar();
renderGallery();
