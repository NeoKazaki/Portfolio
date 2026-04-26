// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);
themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});
function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id'); });
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
  typedEl.textContent = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length + 1) { delay = 1800; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
  setTimeout(type, delay);
}
type();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-fill').forEach(bar => { bar.style.width = bar.dataset.width + '%'; });
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) { formStatus.textContent = 'Please fill in all fields.'; formStatus.className = 'form-status error'; return; }
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  setTimeout(() => {
    formStatus.textContent = "✓ Message sent! I'll get back to you soon.";
    formStatus.className = 'form-status success';
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 5000);
  }, 1500);
});

// ===== ADMIN =====
const ADMIN_PASSWORD = 'NeoKazaki2026';
let isAdmin = false;
let isProjectAdmin = false;

// ===== STATS =====
function updateStats() {
  const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
  const savedArtworks = JSON.parse(localStorage.getItem('artworks')) || [];
  const ps = document.getElementById('stat-projects');
  const as = document.getElementById('stat-artworks');
  if (ps) ps.textContent = savedProjects.length + '+';
  if (as) as.textContent = savedArtworks.length > 0 ? savedArtworks.length + '+' : '0';
}

// Patch localStorage to auto-update stats
const _origSetItem = localStorage.setItem.bind(localStorage);
localStorage.setItem = function(key, value) {
  _origSetItem(key, value);
  if (key === 'projects' || key === 'artworks') updateStats();
};

// ===== VIEW DETAIL MODAL =====
const viewModal = document.getElementById('viewModal');
const viewModalClose = document.getElementById('viewModalClose');
function openViewModal({ image, badge, title, desc, meta, date, links }) {
  document.getElementById('viewModalImg').innerHTML = image ? `<img src="${image}" alt="${title}" />` : `<div class="no-img-icon"><i class="fa-solid fa-image"></i></div>`;
  document.getElementById('viewModalBadge').textContent = badge;
  document.getElementById('viewModalTitle').textContent = title;
  document.getElementById('viewModalDesc').textContent = desc;
  document.getElementById('viewModalMeta').innerHTML = meta.length ? meta.map(t => `<span>${t}</span>`).join('') : '';
  document.getElementById('viewModalDate').innerHTML = `<i class="fa-regular fa-calendar"></i> Added: ${date}`;
  document.getElementById('viewModalLinks').innerHTML = links.join('');
  viewModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
viewModalClose.addEventListener('click', closeViewModal);
viewModal.addEventListener('click', (e) => { if (e.target === viewModal) closeViewModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeViewModal(); closeCertModal(); } });
function closeViewModal() { viewModal.classList.remove('open'); document.body.style.overflow = ''; }

// ===== CERTIFICATE LIGHTBOX =====
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalClose = document.getElementById('certModalClose');
window.openCert = (src) => { certModalImg.src = src; certModal.classList.add('open'); document.body.style.overflow = 'hidden'; };
certModalClose.addEventListener('click', closeCertModal);
certModal.addEventListener('click', (e) => { if (e.target === certModal) closeCertModal(); });
function closeCertModal() { certModal.classList.remove('open'); document.body.style.overflow = ''; }

// ===== CANVAS BACKGROUND =====
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
const points = [];
function initPoints() {
  points.length = 0;
  for (let i = 0; i < 12; i++) points.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 });
}
initPoints();
window.addEventListener('resize', initPoints);
const shapes = [[0,1,2],[1,3,4],[2,4,5],[3,5,6,7],[6,8,9],[7,9,10,11],[8,10,0]];
function getColors() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  return dark ? ['rgba(168,85,247,','rgba(99,102,241,','rgba(56,189,248,','rgba(236,72,153,'] : ['rgba(200,150,255,','rgba(150,200,255,','rgba(255,150,200,','rgba(100,200,220,'];
}
let frame = 0;
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > canvas.width) p.vx *= -1; if (p.y < 0 || p.y > canvas.height) p.vy *= -1; });
  const colors = getColors(); frame++;
  shapes.forEach((shape, i) => {
    const pts = shape.map(idx => points[idx]);
    const color = colors[i % colors.length];
    const alpha = 0.18 + 0.08 * Math.sin(frame * 0.01 + i);
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    for (let j = 1; j < pts.length; j++) ctx.lineTo(pts[j].x, pts[j].y);
    ctx.closePath(); ctx.strokeStyle = color + alpha + ')'; ctx.lineWidth = 1.2; ctx.stroke();
    if (pts.length >= 3) { ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); ctx.lineTo(pts[2].x, pts[2].y); ctx.strokeStyle = color + (alpha * 0.5) + ')'; ctx.lineWidth = 0.6; ctx.stroke(); }
  });
  const r = 80 + 40 * Math.sin(frame * 0.008);
  ctx.beginPath(); ctx.arc(points[0].x, points[0].y, r, 0, Math.PI * 2);
  ctx.strokeStyle = getColors()[2] + '0.12)'; ctx.lineWidth = 1; ctx.stroke();
  requestAnimationFrame(drawCanvas);
}
drawCanvas();

// ===== ARTWORKS MANAGER =====
const artworkEditor = document.getElementById('artworkEditor');
const addArtworkBtn = document.getElementById('addArtworkBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const artworksGrid = document.getElementById('artworksGrid');
const artworkEmpty = document.getElementById('artworkEmpty');
const imageUploadArea = document.getElementById('imageUploadArea');
const imageInput = document.getElementById('aw-image');
const imagePreview = document.getElementById('aw-preview');
const adminLockBtn = document.getElementById('adminLockBtn');
const adminLockIcon = document.getElementById('adminLockIcon');
const adminModal = document.getElementById('adminModal');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminPassword = document.getElementById('adminPassword');
const modalError = document.getElementById('modalError');
const modalClose = document.getElementById('modalClose');
const logoutBtn = document.getElementById('logoutBtn');

let artworks = JSON.parse(localStorage.getItem('artworks')) || [];
let editingIndex = null;
let currentImageData = null;

adminLockBtn.addEventListener('click', () => {
  if (isAdmin) { logout(); return; }
  adminModal.classList.add('open');
  adminPassword.value = ''; modalError.textContent = '';
  setTimeout(() => adminPassword.focus(), 100);
});
modalClose.addEventListener('click', () => adminModal.classList.remove('open'));
adminModal.addEventListener('click', (e) => { if (e.target === adminModal) adminModal.classList.remove('open'); });
adminPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') adminLoginBtn.click(); });

adminLoginBtn.addEventListener('click', () => {
  if (adminPassword.value === ADMIN_PASSWORD) {
    isAdmin = true;
    adminModal.classList.remove('open');
    artworkEditor.classList.add('open');
    adminLockIcon.className = 'fa-solid fa-lock-open';
    adminLockBtn.classList.add('unlocked');
    adminLockBtn.title = 'Click to log out';
    document.body.classList.add('admin-mode');
    renderArtworks();
  } else { modalError.textContent = 'Incorrect password. Try again.'; adminPassword.value = ''; adminPassword.focus(); }
});

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

imageUploadArea.addEventListener('click', () => imageInput.click());
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      currentImageData = ev.target.result;
      imagePreview.src = currentImageData;
      imagePreview.classList.add('visible');
      imageUploadArea.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});

addArtworkBtn.addEventListener('click', () => {
  if (!isAdmin) return;
  const title = document.getElementById('aw-title').value.trim();
  const category = document.getElementById('aw-category').value;
  const desc = document.getElementById('aw-desc').value.trim();
  const tools = document.getElementById('aw-tools').value.trim();
  if (!title || !desc) { alert('Please fill in title and description'); return; }
  const artwork = { title, category, desc, tools, image: currentImageData, dateAdded: new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }) };
  if (editingIndex !== null) { artworks[editingIndex] = artwork; editingIndex = null; }
  else { artworks.push(artwork); }
  localStorage.setItem('artworks', JSON.stringify(artworks));
  renderArtworks();
  resetForm();
});

cancelEditBtn.addEventListener('click', resetForm);

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

function renderArtworks(filter = 'all') {
  artworksGrid.innerHTML = '';
  const filtered = filter === 'all' ? artworks : artworks.filter(a => a.category === filter);
  if (filtered.length === 0) { artworkEmpty.style.display = 'block'; artworksGrid.appendChild(artworkEmpty); return; }
  artworkEmpty.style.display = 'none';
  filtered.forEach((artwork) => {
    const realIndex = artworks.indexOf(artwork);
    const card = document.createElement('div');
    card.className = 'artwork-card';
    card.innerHTML = `
      <div class="artwork-img">
        ${artwork.image ? `<img src="${artwork.image}" alt="${artwork.title}" />` : `<div class="artwork-img-placeholder"><i class="fa-solid fa-image"></i></div>`}
        ${isAdmin ? `<div class="artwork-card-actions">
          <button class="artwork-action-btn edit" onclick="editArtwork(${realIndex})"><i class="fa-solid fa-pen"></i></button>
          <button class="artwork-action-btn delete" onclick="deleteArtwork(${realIndex})"><i class="fa-solid fa-trash"></i></button>
        </div>` : ''}
      </div>
      <div class="artwork-info">
        <span class="artwork-category-badge">${artwork.category}</span>
        <h3>${artwork.title}</h3>
        <p>${artwork.desc}</p>
        ${artwork.tools ? `<div class="artwork-tools"><i class="fa-solid fa-palette"></i> ${artwork.tools}</div>` : ''}
      </div>`;
    card.addEventListener('click', (e) => {
      if (e.target.closest('.artwork-card-actions')) return;
      openViewModal({ image: artwork.image, badge: artwork.category, title: artwork.title, desc: artwork.desc, meta: artwork.tools ? artwork.tools.split(',').map(t => t.trim()) : [], date: artwork.dateAdded || 'N/A', links: [] });
    });
    artworksGrid.appendChild(card);
  });
}

window.editArtwork = (index) => {
  if (!isAdmin) return;
  const artwork = artworks[index];
  document.getElementById('aw-title').value = artwork.title;
  document.getElementById('aw-category').value = artwork.category;
  document.getElementById('aw-desc').value = artwork.desc;
  document.getElementById('aw-tools').value = artwork.tools || '';
  if (artwork.image) { currentImageData = artwork.image; imagePreview.src = artwork.image; imagePreview.classList.add('visible'); imageUploadArea.style.display = 'none'; }
  editingIndex = index;
  addArtworkBtn.innerHTML = '<i class="fa-solid fa-check"></i> Update Artwork';
  cancelEditBtn.style.display = 'inline-flex';
  artworkEditor.scrollIntoView({ behavior: 'smooth' });
};

window.deleteArtwork = (index) => {
  if (!isAdmin) return;
  if (confirm('Delete this artwork?')) { artworks.splice(index, 1); localStorage.setItem('artworks', JSON.stringify(artworks)); renderArtworks(); }
};

const artworkFilterBtns = document.querySelectorAll('#artworkFilters .filter-btn');
artworkFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    artworkFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderArtworks(btn.dataset.filter);
  });
});

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

let editingProjectIndex = null;
let currentProjectImageData = null;

const _masterProjects = [
  { title: 'CALA-CESTA', category: 'web', desc: 'A Web-Based Marketplace Management Information System developed for local souvenir shops in Calabanga, Camarines Sur. The system enables small business owners to manage products, orders, and inventory online while providing customers a convenient platform to browse and purchase local delicacies and souvenirs. Features include user authentication, product catalog, order tracking, inventory management with low-stock alerts, and a sales analytics dashboard.', tech: 'Web Systems, HTML, CSS, JavaScript, Database', github: 'https://github.com/jessiebasagre1/Cala-Cesta', demo: '', image: 'CalaCestaLogo.png', dateAdded: 'April 25, 2026' },
  { title: 'TypePhoon Game', category: 'game', desc: 'A desktop-based educational typing game developed as a capstone research project for Grade 12 CSS students of Calabanga National Science High School. The game integrates the Philippine Tropical Cyclone Wind Signal System (Signal No. 1–5) as its leveling system, where players type typhoon-related words to avoid falling hazards. It aims to improve typing speed, spelling accuracy, and typhoon disaster awareness through gamified learning. Built using Unity and C#, evaluated through pre-test and post-test results with a 5-point Likert scale survey.', tech: 'Java, Unity, C#, Game Logic, OOP', github: 'https://github.com/NeoKazaki', demo: '', image: 'TypePhoonLogo.png', dateAdded: 'April 25, 2026' },
  { title: 'Portfolio Website', category: 'web', desc: 'My personal portfolio website showcasing my projects, artworks, skills, and achievements. Built with HTML, CSS, and JavaScript featuring dark/light mode, animated backgrounds, admin-protected content management, and responsive design.', tech: 'HTML, CSS, JavaScript', github: 'https://github.com/NeoKazaki/Portfolio', demo: '', image: 'Portfolio Project.png', dateAdded: 'April 25, 2026' }
];

const PROJECT_VERSION = 'v6';
if (localStorage.getItem('projectsVersion') !== PROJECT_VERSION) {
  localStorage.setItem('projects', JSON.stringify(_masterProjects));
  localStorage.setItem('projectsVersion', PROJECT_VERSION);
}

let savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
const masterTitles = _masterProjects.map(p => p.title);
const userAdded = savedProjects.filter(p => !masterTitles.includes(p.title) && p.title !== 'Network Design Project');
let projects = [..._masterProjects, ...userAdded];
localStorage.setItem('projects', JSON.stringify(projects));

projectLockBtn.addEventListener('click', () => {
  if (isProjectAdmin) { logoutProject(); return; }
  projectModal.classList.add('open');
  projectPassword.value = ''; projectModalError.textContent = '';
  setTimeout(() => projectPassword.focus(), 100);
});
projectModalClose.addEventListener('click', () => projectModal.classList.remove('open'));
projectModal.addEventListener('click', (e) => { if (e.target === projectModal) projectModal.classList.remove('open'); });
projectPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') projectLoginBtn.click(); });

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
  } else { projectModalError.textContent = 'Incorrect password. Try again.'; projectPassword.value = ''; projectPassword.focus(); }
});

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

projectImageUploadArea.addEventListener('click', () => projectImageInput.click());
projectImageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => { currentProjectImageData = ev.target.result; projectImagePreview.src = currentProjectImageData; projectImagePreview.classList.add('visible'); projectImageUploadArea.style.display = 'none'; };
    reader.readAsDataURL(file);
  }
});

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
  if (editingProjectIndex !== null) { projects[editingProjectIndex] = project; editingProjectIndex = null; }
  else { projects.push(project); }
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

function renderProjects(filter = 'all') {
  projectsGrid.innerHTML = '';
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  if (filtered.length === 0) { projectsGrid.innerHTML = `<div class="artwork-empty"><i class="fa-solid fa-folder-open"></i><p>No projects in this category.</p></div>`; return; }
  filtered.forEach((project) => {
    const realIndex = projects.indexOf(project);
    const techTags = project.tech ? project.tech.split(',').map(t => `<span>${t.trim()}</span>`).join('') : '';
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.category = project.category;
    card.innerHTML = `
      <div class="project-img">
        ${project.image ? `<img src="${project.image}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;" />` : `<div class="project-img-placeholder"><i class="fa-solid fa-folder-open"></i></div>`}
        <div class="project-overlay">
          ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-sm">Live Demo</a>` : ''}
          ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-sm btn-outline">GitHub</a>` : ''}
        </div>
        ${isProjectAdmin ? `<div class="artwork-card-actions">
          <button class="artwork-action-btn edit" onclick="editProject(${realIndex})"><i class="fa-solid fa-pen"></i></button>
          <button class="artwork-action-btn delete" onclick="deleteProject(${realIndex})"><i class="fa-solid fa-trash"></i></button>
        </div>` : ''}
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <div class="project-tags">${techTags}</div>
      </div>`;
    card.addEventListener('click', (e) => {
      if (e.target.closest('.artwork-card-actions') || e.target.closest('.project-overlay')) return;
      const techList = project.tech ? project.tech.split(',').map(t => t.trim()) : [];
      const links = [];
      if (project.demo) links.push(`<a href="${project.demo}" target="_blank" class="btn btn-sm btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>`);
      if (project.github) links.push(`<a href="${project.github}" target="_blank" class="btn btn-sm btn-outline"><i class="fa-brands fa-github"></i> GitHub</a>`);
      openViewModal({ image: project.image, badge: project.category, title: project.title, desc: project.desc, meta: techList, date: project.dateAdded || 'N/A', links });
    });
    projectsGrid.appendChild(card);
  });
}

window.editProject = (index) => {
  if (!isProjectAdmin) return;
  const p = projects[index];
  document.getElementById('pj-title').value = p.title;
  document.getElementById('pj-category').value = p.category;
  document.getElementById('pj-desc').value = p.desc;
  document.getElementById('pj-tech').value = p.tech || '';
  document.getElementById('pj-github').value = p.github || '';
  document.getElementById('pj-demo').value = p.demo || '';
  if (p.image) { currentProjectImageData = p.image; projectImagePreview.src = p.image; projectImagePreview.classList.add('visible'); projectImageUploadArea.style.display = 'none'; }
  editingProjectIndex = index;
  addProjectBtn.innerHTML = '<i class="fa-solid fa-check"></i> Update Project';
  cancelProjectBtn.style.display = 'inline-flex';
  projectEditor.scrollIntoView({ behavior: 'smooth' });
};

window.deleteProject = (index) => {
  if (!isProjectAdmin) return;
  if (confirm('Delete this project?')) { projects.splice(index, 1); localStorage.setItem('projects', JSON.stringify(projects)); renderProjects(); }
};

const projectFilterBtns = document.querySelectorAll('#projectFilters .filter-btn');
projectFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    projectFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

// ===== SEED ARTWORKS =====
(function seedArtworks() {
  const existing = JSON.parse(localStorage.getItem('artworks')) || [];
  const seedData = [
    { title: 'The Chamelion', category: 'traditional', desc: 'This is a School Artwork that I made in our ART APPRECIATION Subject on February 20, 2024', tools: 'Copic Markers', image: 'The Chamelion.jpg', dateAdded: 'April 25, 2026' },
    { title: 'Circles', category: 'digital', desc: "This mini WIP Artwork is based on My OC and the OC's of my Friends", tools: 'Medibang Paint', image: 'Circles.png', dateAdded: 'April 25, 2026' },
    { title: 'Wikang Pinoy', category: 'traditional', desc: 'This is the Artwork that I made during the Buwan ng Wika on STI College Naga participating on the Poster Making Contest on August 30, 2024', tools: 'Copic Markers and Pencils', image: 'Wikang Pinoy.jpg', dateAdded: 'April 25, 2026' },
    { title: 'Artist Boy', category: 'character', desc: 'I made this art when I was practicing my Digital Tracing Art back on 2021', tools: 'IbisPaintX', image: 'Artist Boy.jpg', dateAdded: 'April 25, 2026' },
    { title: 'Lion and Dino', category: 'digital', desc: 'This Artwork is based on the OC of my friends as they wanted me to Commission it for them.', tools: 'Medibang Paint', image: 'Lion and Dino.png', dateAdded: 'April 25, 2026' },
    { title: 'Solemn of Tranquility', category: 'traditional', desc: 'This artwork resembles the peaceful greenery fields and the serenity silents of the river, I made this canvas during the Art Exhibit on June 11, 2024 at STI College Pasay Edsa', tools: 'Canvas and Alcohol Markers', image: 'Solemn of Tranquility.jpg', dateAdded: 'April 25, 2026' },
    { title: 'Family Collage', category: 'collage', desc: 'I created this Collage during the Holliweek event of Prosesyon in Calabanga Camarines sur on April 3, 2026', tools: 'Sony Camera and SCRL App', image: 'Family Collage.jpg', dateAdded: 'April 25, 2026' },
    { title: 'Athena', category: 'traditional', desc: 'This Artwork is based on Greek Goddess Athena that I made during INKtober on October 14, 2022', tools: 'Pencil and Ballpen', image: 'Athena.jpg', dateAdded: 'April 25, 2026' }
  ];
  seedData.forEach(seed => {
    const idx = existing.findIndex(a => a.title === seed.title);
    if (idx === -1) existing.push(seed);
    else if (existing[idx].tools !== seed.tools || existing[idx].category !== seed.category) existing[idx] = seed;
  });
  _origSetItem('artworks', JSON.stringify(existing));
  artworks = existing;
  renderArtworks();
})();

// Initial renders
renderProjects();
updateStats();
