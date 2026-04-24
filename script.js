// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ===== TYPED EFFECT =====
const roles = ['Web Developer', 'IT Student', 'Traditional Artist', 'Digital Artist', 'Freelancer'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(type, delay);
}
type();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when skills section is visible
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.';
    formStatus.className = 'form-status error';
    return;
  }

  // Simulate sending
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

  setTimeout(() => {
    formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
    formStatus.className = 'form-status success';
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 5000);
  }, 1500);
});


// ===== ARTWORKS MANAGER =====
const artworkEditor = document.getElementById('artworkEditor');
const addArtworkBtn = document.getElementById('addArtworkBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const artworksGrid = document.getElementById('artworksGrid');
const artworkEmpty = document.getElementById('artworkEmpty');
const imageUploadArea = document.getElementById('imageUploadArea');
const imageInput = document.getElementById('aw-image');
const imagePreview = document.getElementById('aw-preview');

// Admin elements
const adminLockBtn = document.getElementById('adminLockBtn');
const adminLockIcon = document.getElementById('adminLockIcon');
const adminModal = document.getElementById('adminModal');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminPassword = document.getElementById('adminPassword');
const modalError = document.getElementById('modalError');
const modalClose = document.getElementById('modalClose');
const logoutBtn = document.getElementById('logoutBtn');

// ---- CHANGE THIS TO YOUR OWN PASSWORD ----
const ADMIN_PASSWORD = 'NeoKazaki2026';
// ------------------------------------------

let artworks = JSON.parse(localStorage.getItem('artworks')) || [];
let editingIndex = null;
let currentImageData = null;
let isAdmin = false;

// Open modal on lock icon click
adminLockBtn.addEventListener('click', () => {
  if (isAdmin) {
    logout();
    return;
  }
  adminModal.classList.add('open');
  adminPassword.value = '';
  modalError.textContent = '';
  setTimeout(() => adminPassword.focus(), 100);
});

// Close modal
modalClose.addEventListener('click', closeModal);
adminModal.addEventListener('click', (e) => { if (e.target === adminModal) closeModal(); });

// Enter key on password field
adminPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') adminLoginBtn.click(); });

// Login
adminLoginBtn.addEventListener('click', () => {
  if (adminPassword.value === ADMIN_PASSWORD) {
    isAdmin = true;
    closeModal();
    artworkEditor.classList.add('open');
    adminLockIcon.className = 'fa-solid fa-lock-open';
    adminLockBtn.classList.add('unlocked');
    adminLockBtn.title = 'Click to log out';
    document.body.classList.add('admin-mode');
    renderArtworks();
  } else {
    modalError.textContent = 'Incorrect password. Try again.';
    adminPassword.value = '';
    adminPassword.focus();
  }
});

// Logout
logoutBtn.addEventListener('click', logout);

function logout() {
  isAdmin = false;
  artworkEditor.classList.remove('open');
  adminLockIcon.className = 'fa-solid fa-lock';
  adminLockBtn.classList.remove('unlocked');
  adminLockBtn.title = 'Admin';
  document.body.classList.remove('admin-mode');
  resetForm();
  renderArtworks();
}

function closeModal() {
  adminModal.classList.remove('open');
}

// Image upload
imageUploadArea.addEventListener('click', () => imageInput.click());
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      currentImageData = event.target.result;
      imagePreview.src = currentImageData;
      imagePreview.classList.add('visible');
      imageUploadArea.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});

// Add/Update artwork
addArtworkBtn.addEventListener('click', () => {
  if (!isAdmin) return;
  const title = document.getElementById('aw-title').value.trim();
  const category = document.getElementById('aw-category').value;
  const desc = document.getElementById('aw-desc').value.trim();
  const tools = document.getElementById('aw-tools').value.trim();

  if (!title || !desc) {
    alert('Please fill in title and description');
    return;
  }

  const artwork = { title, category, desc, tools, image: currentImageData, dateAdded: new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }) };

  if (editingIndex !== null) {
    artworks[editingIndex] = artwork;
    editingIndex = null;
  } else {
    artworks.push(artwork);
  }

  localStorage.setItem('artworks', JSON.stringify(artworks));
  renderArtworks();
  resetForm();
});

// Cancel edit
cancelEditBtn.addEventListener('click', resetForm);

// Reset form
function resetForm() {
  document.getElementById('aw-title').value = '';
  document.getElementById('aw-category').value = 'digital';
  document.getElementById('aw-desc').value = '';
  document.getElementById('aw-tools').value = '';
  imageInput.value = '';
  imagePreview.src = '';
  imagePreview.classList.remove('visible');
  imageUploadArea.style.display = 'block';
  currentImageData = null;
  editingIndex = null;
  addArtworkBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Artwork';
  cancelEditBtn.style.display = 'none';
}

// Render artworks
function renderArtworks(filter = 'all') {
  artworksGrid.innerHTML = '';

  const filtered = filter === 'all' ? artworks : artworks.filter(a => a.category === filter);

  if (filtered.length === 0) {
    artworkEmpty.style.display = 'block';
    artworksGrid.appendChild(artworkEmpty);
    return;
  }

  artworkEmpty.style.display = 'none';

  filtered.forEach((artwork) => {
    const realIndex = artworks.indexOf(artwork);
    const card = document.createElement('div');
    card.className = 'artwork-card';
    card.innerHTML = `
      <div class="artwork-img">
        ${artwork.image
          ? `<img src="${artwork.image}" alt="${artwork.title}" />`
          : `<div class="artwork-img-placeholder"><i class="fa-solid fa-image"></i></div>`}
        ${isAdmin ? `
        <div class="artwork-card-actions">
          <button class="artwork-action-btn edit" onclick="editArtwork(${realIndex})"><i class="fa-solid fa-pen"></i></button>
          <button class="artwork-action-btn delete" onclick="deleteArtwork(${realIndex})"><i class="fa-solid fa-trash"></i></button>
        </div>` : ''}
      </div>
      <div class="artwork-info">
        <span class="artwork-category-badge">${artwork.category}</span>
        <h3>${artwork.title}</h3>
        <p>${artwork.desc}</p>
        ${artwork.tools ? `<div class="artwork-tools"><i class="fa-solid fa-palette"></i> ${artwork.tools}</div>` : ''}
      </div>
    `;
    card.addEventListener('click', (e) => {
      if (e.target.closest('.artwork-card-actions')) return;
      openViewModal({
        image: artwork.image,
        badge: artwork.category,
        title: artwork.title,
        desc: artwork.desc,
        meta: artwork.tools ? artwork.tools.split(',').map(t => t.trim()) : [],
        date: artwork.dateAdded || 'N/A',
        links: []
      });
    });
    artworksGrid.appendChild(card);
  });
}

// Edit artwork
window.editArtwork = (index) => {
  if (!isAdmin) return;
  const artwork = artworks[index];
  document.getElementById('aw-title').value = artwork.title;
  document.getElementById('aw-category').value = artwork.category;
  document.getElementById('aw-desc').value = artwork.desc;
  document.getElementById('aw-tools').value = artwork.tools || '';

  if (artwork.image) {
    currentImageData = artwork.image;
    imagePreview.src = artwork.image;
    imagePreview.classList.add('visible');
    imageUploadArea.style.display = 'none';
  }

  editingIndex = index;
  addArtworkBtn.innerHTML = '<i class="fa-solid fa-check"></i> Update Artwork';
  cancelEditBtn.style.display = 'inline-flex';
  artworkEditor.scrollIntoView({ behavior: 'smooth' });
};

// Delete artwork
window.deleteArtwork = (index) => {
  if (!isAdmin) return;
  if (confirm('Delete this artwork?')) {
    artworks.splice(index, 1);
    localStorage.setItem('artworks', JSON.stringify(artworks));
    renderArtworks();
  }
};

// Artwork filter
const artworkFilterBtns = document.querySelectorAll('#artworkFilters .filter-btn');
artworkFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    artworkFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderArtworks(btn.dataset.filter);
  });
});

// Initial render
renderArtworks();


// ===== PROJECTS MANAGER =====
const projectEditor = document.getElementById('projectEditor');
const projectLockBtn = document.getElementById('projectLockBtn');
const projectLockIcon = document.getElementById('projectLockIcon');
const projectModal = document.getElementById('projectModal');
const projectLoginBtn = document.getElementById('projectLoginBtn');
const projectPassword = document.getElementById('projectPassword');
const projectModalError = document.getElementById('projectModalError');
const projectModalClose = document.getElementById('projectModalClose');
const projectLogoutBtn = document.getElementById('projectLogoutBtn');
const addProjectBtn = document.getElementById('addProjectBtn');
const cancelProjectBtn = document.getElementById('cancelProjectBtn');
const projectsGrid = document.getElementById('projectsGrid');
const projectImageUploadArea = document.getElementById('projectImageUploadArea');
const projectImageInput = document.getElementById('pj-image');
const projectImagePreview = document.getElementById('pj-preview');

let isProjectAdmin = false;
let editingProjectIndex = null;
let currentProjectImageData = null;

// Load saved projects or use the hardcoded defaults
let projects = JSON.parse(localStorage.getItem('projects')) || null;

// Seed defaults if first load
if (!projects) {
  projects = [
    {
      title: 'Cashier Application',
      category: 'app',
      desc: 'A desktop cashier system built in C# that handles product listings, transactions, and receipt generation. Designed for small retail use cases with a clean and intuitive UI.',
      tech: 'C#, .NET, Windows Forms',
      github: 'https://github.com/NeoKazaki',
      demo: '',
      image: null
    },
    {
      title: 'TypePhoon Game',
      category: 'game',
      desc: 'A typing speed game where players race against a storm by typing falling words correctly. Built to improve typing accuracy and speed in a fun, interactive way.',
      tech: 'Java, Game Logic, OOP',
      github: 'https://github.com/NeoKazaki',
      demo: '',
      image: null
    },
    {
      title: 'Network Design Project',
      category: 'network',
      desc: 'A structured network topology design for a simulated office environment. Includes IP addressing, subnetting, VLAN configuration, and device placement using Cisco Packet Tracer.',
      tech: 'Networking, Cisco Packet Tracer, Subnetting',
      github: 'https://github.com/NeoKazaki',
      demo: '',
      image: null
    }
  ];
  localStorage.setItem('projects', JSON.stringify(projects));
}

// Lock icon click
projectLockBtn.addEventListener('click', () => {
  if (isProjectAdmin) { logoutProject(); return; }
  projectModal.classList.add('open');
  projectPassword.value = '';
  projectModalError.textContent = '';
  setTimeout(() => projectPassword.focus(), 100);
});

// Close modal
projectModalClose.addEventListener('click', () => projectModal.classList.remove('open'));
projectModal.addEventListener('click', (e) => { if (e.target === projectModal) projectModal.classList.remove('open'); });
projectPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') projectLoginBtn.click(); });

// Login
projectLoginBtn.addEventListener('click', () => {
  if (projectPassword.value === ADMIN_PASSWORD) {
    isProjectAdmin = true;
    projectModal.classList.remove('open');
    projectEditor.classList.add('open');
    projectLockIcon.className = 'fa-solid fa-lock-open';
    projectLockBtn.classList.add('unlocked');
    projectLockBtn.title = 'Click to log out';
    document.body.classList.add('admin-mode');
    renderProjects();
  } else {
    projectModalError.textContent = 'Incorrect password. Try again.';
    projectPassword.value = '';
    projectPassword.focus();
  }
});

// Logout
projectLogoutBtn.addEventListener('click', logoutProject);
function logoutProject() {
  isProjectAdmin = false;
  projectEditor.classList.remove('open');
  projectLockIcon.className = 'fa-solid fa-lock';
  projectLockBtn.classList.remove('unlocked');
  projectLockBtn.title = 'Admin';
  document.body.classList.remove('admin-mode');
  resetProjectForm();
  renderProjects();
}

// Image upload
projectImageUploadArea.addEventListener('click', () => projectImageInput.click());
projectImageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      currentProjectImageData = ev.target.result;
      projectImagePreview.src = currentProjectImageData;
      projectImagePreview.classList.add('visible');
      projectImageUploadArea.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});

// Add / Update project
addProjectBtn.addEventListener('click', () => {
  if (!isProjectAdmin) return;
  const title = document.getElementById('pj-title').value.trim();
  const category = document.getElementById('pj-category').value;
  const desc = document.getElementById('pj-desc').value.trim();
  const tech = document.getElementById('pj-tech').value.trim();
  const github = document.getElementById('pj-github').value.trim();
  const demo = document.getElementById('pj-demo').value.trim();

  if (!title || !desc) { alert('Please fill in title and description'); return; }

  const project = { title, category, desc, tech, github, demo, image: currentProjectImageData, dateAdded: new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }) };

  if (editingProjectIndex !== null) {
    projects[editingProjectIndex] = project;
    editingProjectIndex = null;
  } else {
    projects.push(project);
  }

  localStorage.setItem('projects', JSON.stringify(projects));
  renderProjects();
  resetProjectForm();
});

cancelProjectBtn.addEventListener('click', resetProjectForm);

function resetProjectForm() {
  document.getElementById('pj-title').value = '';
  document.getElementById('pj-category').value = 'app';
  document.getElementById('pj-desc').value = '';
  document.getElementById('pj-tech').value = '';
  document.getElementById('pj-github').value = '';
  document.getElementById('pj-demo').value = '';
  projectImageInput.value = '';
  projectImagePreview.src = '';
  projectImagePreview.classList.remove('visible');
  projectImageUploadArea.style.display = 'block';
  currentProjectImageData = null;
  editingProjectIndex = null;
  addProjectBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Project';
  cancelProjectBtn.style.display = 'none';
}

// Render projects
function renderProjects(filter = 'all') {
  projectsGrid.innerHTML = '';
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  if (filtered.length === 0) {
    projectsGrid.innerHTML = `<div class="artwork-empty"><i class="fa-solid fa-folder-open"></i><p>No projects in this category.</p></div>`;
    return;
  }

  filtered.forEach((project) => {
    const realIndex = projects.indexOf(project);
    const techTags = project.tech ? project.tech.split(',').map(t => `<span>${t.trim()}</span>`).join('') : '';
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.category = project.category;
    card.innerHTML = `
      <div class="project-img">
        ${project.image
          ? `<img src="${project.image}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;" />`
          : `<div class="project-img-placeholder"><i class="fa-solid fa-folder-open"></i></div>`}
        <div class="project-overlay">
          ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-sm">Live Demo</a>` : ''}
          ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-sm btn-outline">GitHub</a>` : ''}
        </div>
        ${isProjectAdmin ? `
        <div class="artwork-card-actions">
          <button class="artwork-action-btn edit" onclick="editProject(${realIndex})"><i class="fa-solid fa-pen"></i></button>
          <button class="artwork-action-btn delete" onclick="deleteProject(${realIndex})"><i class="fa-solid fa-trash"></i></button>
        </div>` : ''}
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <div class="project-tags">${techTags}</div>
      </div>
    `;
    card.addEventListener('click', (e) => {
      if (e.target.closest('.artwork-card-actions') || e.target.closest('.project-overlay')) return;
      const techList = project.tech ? project.tech.split(',').map(t => t.trim()) : [];
      const links = [];
      if (project.demo) links.push(`<a href="${project.demo}" target="_blank" class="btn btn-sm btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>`);
      if (project.github) links.push(`<a href="${project.github}" target="_blank" class="btn btn-sm btn-outline"><i class="fa-brands fa-github"></i> GitHub</a>`);
      openViewModal({
        image: project.image,
        badge: project.category,
        title: project.title,
        desc: project.desc,
        meta: techList,
        date: project.dateAdded || 'N/A',
        links
      });
    });
    projectsGrid.appendChild(card);
  });
}

// Edit project
window.editProject = (index) => {
  if (!isProjectAdmin) return;
  const p = projects[index];
  document.getElementById('pj-title').value = p.title;
  document.getElementById('pj-category').value = p.category;
  document.getElementById('pj-desc').value = p.desc;
  document.getElementById('pj-tech').value = p.tech || '';
  document.getElementById('pj-github').value = p.github || '';
  document.getElementById('pj-demo').value = p.demo || '';
  if (p.image) {
    currentProjectImageData = p.image;
    projectImagePreview.src = p.image;
    projectImagePreview.classList.add('visible');
    projectImageUploadArea.style.display = 'none';
  }
  editingProjectIndex = index;
  addProjectBtn.innerHTML = '<i class="fa-solid fa-check"></i> Update Project';
  cancelProjectBtn.style.display = 'inline-flex';
  projectEditor.scrollIntoView({ behavior: 'smooth' });
};

// Delete project
window.deleteProject = (index) => {
  if (!isProjectAdmin) return;
  if (confirm('Delete this project?')) {
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    renderProjects();
  }
};

// Project filter buttons
const projectFilterBtns = document.querySelectorAll('#projectFilters .filter-btn');
projectFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    projectFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

// Initial render — replaces the hardcoded HTML cards
renderProjects();


// ===== VIEW DETAIL MODAL =====
const viewModal = document.getElementById('viewModal');
const viewModalClose = document.getElementById('viewModalClose');

function openViewModal({ image, badge, title, desc, meta, date, links }) {
  document.getElementById('viewModalImg').innerHTML = image
    ? `<img src="${image}" alt="${title}" />`
    : `<div class="no-img-icon"><i class="fa-solid fa-image"></i></div>`;

  document.getElementById('viewModalBadge').textContent = badge;
  document.getElementById('viewModalTitle').textContent = title;
  document.getElementById('viewModalDesc').textContent = desc;

  document.getElementById('viewModalMeta').innerHTML = meta.length
    ? meta.map(t => `<span>${t}</span>`).join('')
    : '';

  document.getElementById('viewModalDate').innerHTML =
    `<i class="fa-regular fa-calendar"></i> Added: ${date}`;

  document.getElementById('viewModalLinks').innerHTML = links.join('');

  viewModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

viewModalClose.addEventListener('click', closeViewModal);
viewModal.addEventListener('click', (e) => { if (e.target === viewModal) closeViewModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeViewModal(); });

function closeViewModal() {
  viewModal.classList.remove('open');
  document.body.style.overflow = '';
}


// ===== ANIMATED GEOMETRIC BACKGROUND =====
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Crystal/polygon points
const points = [];
const NUM_POINTS = 12;

function initPoints() {
  points.length = 0;
  for (let i = 0; i < NUM_POINTS; i++) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    });
  }
}
initPoints();
window.addEventListener('resize', initPoints);

// Crystal shapes: groups of 3-4 points forming polygons
const shapes = [
  [0, 1, 2],
  [1, 3, 4],
  [2, 4, 5],
  [3, 5, 6, 7],
  [6, 8, 9],
  [7, 9, 10, 11],
  [8, 10, 0],
];

function getColors() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  return dark
    ? ['rgba(168,85,247,', 'rgba(99,102,241,', 'rgba(56,189,248,', 'rgba(236,72,153,']
    : ['rgba(200,150,255,', 'rgba(150,200,255,', 'rgba(255,150,200,', 'rgba(100,200,220,'];
}

let colorIndex = 0;
let frame = 0;

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move points
  points.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  const colors = getColors();
  frame++;

  shapes.forEach((shape, i) => {
    const pts = shape.map(idx => points[idx]);
    const color = colors[i % colors.length];
    const alpha = 0.18 + 0.08 * Math.sin(frame * 0.01 + i);

    // Draw polygon stroke
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let j = 1; j < pts.length; j++) ctx.lineTo(pts[j].x, pts[j].y);
    ctx.closePath();
    ctx.strokeStyle = color + alpha + ')';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Inner lines (crystal refraction effect)
    if (pts.length >= 3) {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      ctx.lineTo(pts[2].x, pts[2].y);
      ctx.strokeStyle = color + (alpha * 0.5) + ')';
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
  });

  // Faint circle (like the one in the light mode image)
  const cx = points[0].x;
  const cy = points[0].y;
  const r = 80 + 40 * Math.sin(frame * 0.008);
  const colors2 = getColors();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = colors2[2] + '0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  requestAnimationFrame(drawCanvas);
}

drawCanvas();


// ===== LIVE STAT COUNTERS =====
function updateStats() {
  const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
  const savedArtworks = JSON.parse(localStorage.getItem('artworks')) || [];

  const projectStat = document.getElementById('stat-projects');
  const artworkStat = document.getElementById('stat-artworks');

  if (projectStat) projectStat.textContent = savedProjects.length + '+';
  if (artworkStat) artworkStat.textContent = savedArtworks.length > 0 ? savedArtworks.length + '+' : '0';
}

// Run on load
updateStats();

// Patch into existing save calls so stats update live
const _origSetItem = localStorage.setItem.bind(localStorage);
localStorage.setItem = function(key, value) {
  _origSetItem(key, value);
  if (key === 'projects' || key === 'artworks') updateStats();
};


// ===== CERTIFICATE LIGHTBOX =====
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalClose = document.getElementById('certModalClose');

window.openCert = (src) => {
  certModalImg.src = src;
  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

certModalClose.addEventListener('click', () => {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
});

certModal.addEventListener('click', (e) => {
  if (e.target === certModal) {
    certModal.classList.remove('open');
    document.body.style.overflow = '';
  }
});
