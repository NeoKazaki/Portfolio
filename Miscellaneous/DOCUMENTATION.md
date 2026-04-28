**JA.Port — Portfolio Website Project Documentation**

**Subject:** Web Systems and Technologies

**Developer:** John Anniluv A. Atag

**Professor:** Mr. Everild Gerd R. Pablo MBA

**GitHub Repository:** https://github.com/NeoKazaki/Portfolio

**Live Portfolio:** https://neokazaki.github.io/Portfolio/


**Project Description**

JA.Port is a personal portfolio website designed and developed by John Anniluv A. Atag, a 2nd year IT student at STI Naga City and a commissioned digital and traditional artist. The portfolio serves as a digital resume and creative showcase, presenting his skills, completed projects, artworks, film work, achievements, and contact information to potential employers, clients, and collaborators.

The site is fully responsive, works across all screen sizes, and features a modern dark/light mode design with animated backgrounds, interactive sections, an admin-protected content management system, a film showcase section, and a certificate gallery — all built without any frameworks, using only vanilla HTML, CSS, and JavaScript.


**List of Features**


**1. Navigation Bar**

**Fixed Navigation Bar**
- Found in: `index.html` — Line 17 (`<nav id="navbar">`)
- Code: `<nav id="navbar">`
- What it does: The navbar is fixed at the top of the screen at all times using `position: fixed` in CSS. Even when the user scrolls down the page, the navigation remains visible so they can jump to any section without scrolling back up.
- CSS rule: `style.css` — Line 172 (`#navbar { position: fixed; }`)


**Smooth Scrolling**
- Found in: `index.html` — Lines 24–31 (nav links with `href="#section"`)
- CSS: `style.css` — Line 113 (`html { scroll-behavior: smooth; }`)
- What it does: When a nav link is clicked, the page glides smoothly to the target section instead of jumping abruptly. This is handled by the CSS `scroll-behavior: smooth` property applied to the `html` element.


**Pill Navigation with Particle Burst**
- Found in: `index.html` — Line 32 (`<div class="gooey-nav-container">`) wrapping the desktop `<nav>` (Lines 33–43) with `<ul class="nav-links-desktop" id="navLinksDesktop">` and two effect spans: Line 44 (`<span class="effect filter" id="gooeyFilter">`) and Line 45 (`<span class="effect text" id="gooeyText">`)
- JavaScript: `script.js` — Line 579 (`(function initGooeyNav()`) — `makeParticles` function at Line 605, `updateEffectPosition` at Line 632, `activateItem` at Line 649, scroll sync at Line 688, resize handler at Line 701
- CSS: `style.css` — Line 1290 (`/* ===== PILL NAV =====`) through end of file
- What it does: On desktop, the navigation links inside `.gooey-nav-container` use `#navLinksDesktop`. When a nav item is clicked or the scroll position changes section, the active `<li>` receives the class `active`, which animates a smooth accent-colored pill behind the link text using a CSS `::before` pseudo-element (scale + opacity transition). Simultaneously, a JavaScript particle burst fires from the clicked item — 15 colored dot particles animate outward using CSS custom property keyframes. On mobile (`max-width: 640px`), the entire `.gooey-nav-container` is hidden with `display: none !important` — no pill, no particles, no black backdrop.
- Dark mode: pill uses `var(--accent)` purple
- Light mode: pill uses `var(--accent)` navy blue, active text stays white


**Active Link Highlighting**
- Found in: `script.js` — Lines 24–37 (`// ===== ACTIVE NAV =====`)
- What it does: A scroll event listener checks which section is currently in view. It updates active state on both `'.nav-links a'` (mobile) and `'.nav-links-desktop a'` (desktop) simultaneously. The film section is mapped to the Projects nav item since it has no dedicated nav link.


**Hamburger Menu**
- Found in: `index.html` — Line 48 (`<button class="hamburger" id="hamburger">`)
- JavaScript: `script.js` — Lines 18–23 (`// ===== HAMBURGER =====`)
- CSS: `style.css` — Line 587 (`@media (max-width: 640px)`) and Line 609 (`.hamburger { display: flex; }`)
- What it does: On mobile, the gooey nav container is fully hidden and replaced with a hamburger button. Clicking it toggles the class `open` on `#navLinks` (a plain `<ul>` that lives outside the gooey container in the HTML), which drops down a clean list of links pinned under the navbar. Clicking any link closes the menu. The plain nav links have no pill or particle effects — just accent color on active/hover.


**Dark/Light Mode Toggle**
- Found in: `index.html` — Line 37 (`<button id="themeToggle">`)
- JavaScript: `script.js` — Lines 1–17 (`// ===== THEME TOGGLE =====`)
- CSS dark mode: `style.css` — Line 18 (`[data-theme="dark"] body`)
- CSS light mode: `style.css` — Line 52 (`[data-theme="light"]`)
- What it does: Clicking the button reads the current theme from the `data-theme` attribute on the `html` element, switches it to the opposite, saves the choice to `localStorage`, and updates the moon/sun icon. All colors change automatically because CSS variables are defined per theme. The pill nav accent color also adapts — purple in dark mode, navy blue in light mode.


**Custom Logo with Text**
- Found in: `index.html` — Lines 18–21 (`.nav-logo` block)
- CSS: `style.css` — Lines 187–212 (`.nav-logo`, `.nav-logo-img`, `.nav-logo-text`, `.nav-logo-dot`)
- What it does: The `Miscellaneous/Lauvinn-Logo.png` image is displayed on the left side of the navbar. Beside it is the text "JA.Port" with a purple dot, serving as the site's brand identity. The logo scales slightly on hover.


**Browser Tab Favicon**
- Found in: `index.html` — Line 8 (`<link rel="icon" type="image/png" href="Miscellaneous/Lauvinn-Logo.png" />`)
- What it does: Sets the small icon that appears on the browser tab next to the page title. Uses the same Lauvinn-Logo.png file.


**2. Home / Hero Section**

**Animated Gradient Name**
- Found in: `index.html` — Line 46 (`<h1 class="hero-name">`)
- CSS: `style.css` — Lines 288–305 (`.hero-name`) and Line 1108 (`[data-theme="light"] .hero-name`)
- Animation: `style.css` — Line 307 (`@keyframes nameGradient`)
- What it does: The full name uses `background-clip: text` with a multi-color gradient (white → purple → indigo → cyan → back). The `nameGradient` animation moves the background position on a 12-second cycle, creating a slow flowing color sweep across the text.


**Typing Animation**
- Found in: `script.js` — Lines 38–50 (`// ===== TYPED EFFECT =====`)
- HTML element: `index.html` — Line 47 (`<span id="typed">`)
- What it does: The `type()` function cycles through an array of roles. It adds one character at a time when typing forward, then removes one character at a time when deleting. Delays control the speed. After deleting, it moves to the next role in the array.


**Personal Tagline**
- Found in: `index.html` — Line 48 (`<p class="hero-tagline">`)
- CSS: `style.css` — Line 320 (`.hero-tagline`)
- What it does: A short sentence below the typed role gives visitors a quick summary of who John is. Styled in muted color with a max-width to keep it readable.


**Call-to-Action Buttons**
- Found in: `index.html` — Lines 49–52 (`.hero-btns`)
- CSS: `style.css` — Lines 128–153 (`.btn`, `.btn-primary`, `.btn-outline`)
- What it does: Two buttons guide visitors — "View My Work" scrolls to the Projects section, and "Contact Me" scrolls to the Contact section.


**Profile Picture**
- Found in: `index.html` — Lines 54–58 (`.hero-avatar` block)
- CSS: `style.css` — Lines 268–284 (`.avatar-ring`, `.avatar-placeholder`)
- What it does: The `Miscellaneous/profile.png` image is displayed inside a circular frame wrapped in a gradient ring with a glowing purple box-shadow.


**Scroll-Down Indicator**
- Found in: `index.html` — Line 61 (`<a class="scroll-down">`)
- CSS animation: `style.css` — Lines 322–329 (`.scroll-down`) and `@keyframes bounce`
- What it does: A small chevron arrow at the bottom of the hero section bounces up and down, visually hinting to the user that there is more content below.


**3. About Me Section**

**Personal Background**
- Found in: `index.html` — Lines 71–82 (`.about-text` paragraphs)
- What it does: Three paragraphs describe who John is, his background as an IT student and commissioned artist, his experience with digital and traditional illustration, and his tools (Medibang Paint, IbisPaintX).


**Education History**
- Found in: `index.html` — Lines 75–80 (`.about-info` div entries)
- What it does: Lists his academic path with icons: 1st year at STI Pasay EDSA, then 2nd year to present at STI Naga City.


**Achievements Card**
- Found in: `index.html` — Lines 83–94 (`<div class="achievements">`)
- CSS: `style.css` — Lines 607–634 (`.achievements`, `.achievements h4`, `.achievements ul li`)
- What it does: A styled card with a left purple border lists all 6 of his achievements and certifications including contest placements, art exhibit recognition, and service awards.


**Certificate Gallery**
- Found in: `index.html` — Lines 118–131 (`<div class="cert-gallery">`)
- CSS: `style.css` — Lines 1044–1079 (`.cert-gallery`, `.cert-item`, `.cert-overlay`)
- What it does: Four certificate images (Cert1–4.jpg) are displayed in a 2×2 grid in the right column of the About section. Each image has a hover overlay with a zoom icon. Clicking any opens the certificate lightbox.


**Certificate Lightbox**
- Found in: `index.html` — Lines 510–515 (`<div id="certModal">`)
- JavaScript: `script.js` — Lines 131–136 (`window.openCert`)
- CSS: `style.css` — Lines 1081–1101 (`.cert-lightbox`, `.cert-lightbox img`)
- What it does: Clicking any certificate image calls `openCert(src)` which sets the lightbox image source and adds the class `open` to the modal overlay. The lightbox closes with the ✕ button, clicking outside, or pressing Escape. This same lightbox is reused for the film poster and film certificates.


**Live Stat Cards**
- Found in: `index.html` — Lines 97–131 (`.about-stats` block)
- JavaScript: `script.js` — Lines 92–105 (`function updateStats()`)
- What it does: Five cards display key numbers. Projects Completed and Artworks Added are read from `localStorage` and update automatically whenever items are added or deleted. The other three are fixed values.


**Download Resume Button**
- Found in: `index.html` — Line 95 (`<a href="Miscellaneous/JA.Resume.pdf" download>`)
- What it does: Directly downloads `JA.Resume.pdf` when clicked using the HTML `download` attribute.


**4. Skills Section**

**Skill Progress Bars**
- Found in: `index.html` — Lines 148–202 (`.skill-bars` inside each `.skill-category`)
- CSS: `style.css` — Lines 386–391 (`.skill-fill`)
- JavaScript trigger: `script.js` — Lines 52–61 (`// ===== SCROLL REVEAL =====`, `IntersectionObserver`)
- What it does: Each skill bar has a `data-width` attribute. When the section scrolls into view, the observer sets `bar.style.width = bar.dataset.width + '%'`, triggering a CSS transition that animates the fill from 0% to the target percentage.


**Tech Icon Grid**
- Found in: `index.html` — Lines 206–216 (`.tech-icons`)
- CSS: `style.css` — Lines 393–415 (`.tech-icon`)
- What it does: A row of icon cards displays each technology with its Font Awesome icon and label. Cards lift up on hover with a transform and box-shadow effect.


**5. Projects Section**

**Admin Lock Icon**
- Found in: `index.html` — Lines 224–227 (`<button id="projectLockBtn">`)
- JavaScript: `script.js` — Lines 338–345 (projectLockBtn click handler)
- CSS: `style.css` — Lines 804–821 (`.admin-lock-btn`)
- What it does: A small lock icon sits in the section header at 35% opacity. Clicking it opens the password modal. If already logged in, clicking it logs out instead.


**Password Modal**
- Found in: `index.html` — Lines 298–309 (`<div id="projectModal">`)
- JavaScript: `script.js` — Lines 387–396 (projectLoginBtn click handler)
- CSS: `style.css` — Lines 848–876 (`.modal-overlay`, `.modal-box`)
- What it does: A centered popup with a password input. Pressing Enter or clicking "Unlock" checks the input against `ADMIN_PASSWORD`. Correct password activates admin mode. Wrong password shows an error message and clears the field.


**Dynamic Project Cards**
- Found in: `script.js` — Lines 457–513 (`function renderProjects()`)
- HTML container: `index.html` — Line 293 (`<div id="projectsGrid">`)
- What it does: All project cards are built by JavaScript and injected into the grid. The HTML file contains no hardcoded project cards — everything is rendered from the `projects` array stored in `localStorage`.


**Filter Buttons**
- Found in: `index.html` — Lines 286–292 (`<div id="projectFilters">`)
- JavaScript: `script.js` — Lines 519–524 (projectFilterBtns event listeners)
- What it does: Clicking a filter button calls `renderProjects(filter)` which filters the array by category before rendering.


**Admin Editor Panel**
- Found in: `index.html` — Lines 230–280 (`<div id="projectEditor">`)
- JavaScript: `script.js` — Lines 386–455 (project editor handlers)
- What it does: When admin is logged in, this panel opens. It contains input fields for all project data and an image upload area. Submitting saves to `localStorage` and re-renders the grid.


**Pre-seeded Projects**
- Found in: `script.js` — Lines 356–362 (`const _masterProjects`)
- Version control: `script.js` — Line 362 (`const PROJECT_VERSION = 'v8'`)
- What it does: Three projects (CALA-CESTA, TypePhoon Game, Portfolio Website) are defined in `_masterProjects`. Their thumbnails are stored under `Projects/`. On page load, if the stored version doesn't match, localStorage is force-reset with the latest master data.


**Always-Visible Admin Buttons**
- Found in: `style.css` — Lines 748–760 (`.artwork-card-actions`, `body.admin-mode .artwork-card-actions`)
- What it does: Edit and delete buttons are normally at `opacity: 0`. When `body.admin-mode` is active, CSS forces them to `opacity: 1 !important` on all cards.


**6. Film Section**

**Film Card Layout**
- Found in: `index.html` — Lines 313–349 (`<section id="film">`)
- CSS: `style.css` — Lines 1120–1248 (`.film-card`, `.film-poster`, `.film-details`)
- What it does: A two-column card layout — left column holds the poster image, right column holds all film details. Uses CSS Grid with `grid-template-columns: 320px 1fr`. Collapses to single column on mobile.


**Clickable Film Poster**
- Found in: `index.html` — Line 317 (`onclick="openCert('Projects/Alok Film.jpg')"`)
- JavaScript: `script.js` — Line 131 (`window.openCert`)
- CSS: `style.css` — Lines 1138–1147 (`.film-poster-img`, hover zoom)
- What it does: Clicking the poster opens the certificate lightbox with the film poster as the full-size image. A hover zoom effect provides a visual cue that it is clickable.


**Film Meta Details**
- Found in: `index.html` — Lines 323–330 (`<div class="film-meta">`)
- CSS: `style.css` — Lines 1201–1220 (`.film-meta`) and Line 1250 (`[data-theme="light"] .film-meta`)
- What it does: A styled box with a left purple border lists the director, producer, and main character. In light mode, a navy blue tinted background is applied so the box remains visible against the white card.


**Watch Buttons**
- Found in: `index.html` — Lines 332–335 (`<div class="film-btns">`)
- CSS: `style.css` — Line 1237 (`.film-btns`)
- What it does: Two buttons link to external video platforms — "Watch on Facebook" and "Watch on UNIPLAT". Both open in a new tab.


**Film Certificates**
- Found in: `index.html` — Lines 336–347 (`<div class="film-certs">` and `<div class="film-cert-gallery">`)
- CSS: `style.css` — Lines 1258–1274 (`.film-certs`, `.film-certs h4`, `.film-cert-gallery`)
- Image files: `Certificates/AlokCert1.jpg` (Line 344), `Certificates/AlokCert2.jpg` (Line 340)
- What it does: Two certificate images related to the Alok short film are displayed in a 2-column grid at the bottom of the film card, below the watch buttons. Each image has the same hover overlay and zoom icon as the About section certificates. Clicking either opens the certificate lightbox with the full-size image.


**7. Artworks Section**

**Dynamic Artwork Gallery**
- Found in: `script.js` — Lines 279–333 (`function renderArtworks()`)
- HTML container: `index.html` — Line 422 (`<div id="artworksGrid">`)
- What it does: All artwork cards are built by JavaScript and injected into the grid. The seed function pre-populates `localStorage` with 8 artworks on first load.


**Image Upload**
- Found in: `index.html` — Lines 397–402 (`<div id="imageUploadArea">`)
- JavaScript: `script.js` — Lines 231–241 (imageInput change handler)
- What it does: The upload area accepts image files. `FileReader.readAsDataURL()` converts the file to a base64 string stored in `localStorage` and used as the card image `src`.


**Pre-seeded Artworks**
- Found in: `script.js` — Lines 527–570 (`(function seedArtworks()`)
- Version control: `script.js` — `const ARTWORK_VERSION = 'v2'`
- What it does: Uses a version-controlled seed system. On first load or when the version changes, localStorage is force-reset with all 8 artworks using the correct `Artworks/` folder paths. On subsequent loads it merges seed data into existing artworks, always keeping image paths up to date. After seeding, `renderArtworks()` is called.


**8. Admin System**

**Admin Mode Activation**
- Found in: `script.js` — Lines 208–217 (artwork admin login) and Lines 387–396 (project admin login)
- CSS class: `style.css` — Line 758 (`body.admin-mode`)
- What it does: On successful login, `document.body.classList.add('admin-mode')` is called. This CSS class makes all `.artwork-card-actions` elements fully visible. The lock icon changes to an open lock and turns green.


**Log Out**
- Found in: `script.js` — Lines 221–229 (`function logout()`) and Lines 400–408 (`function logoutProject()`)
- What it does: Removes `admin-mode` from the body, closes the editor panel, resets the lock icon, resets the form fields, and re-renders the cards without admin buttons.


**Shared Password**
- Found in: `script.js` — Line 87 (`const ADMIN_PASSWORD = 'NeoKazaki2026'`)
- What it does: A single constant stores the admin password used by both the artworks and projects login modals.


**9. View Detail Modal**

**Modal Trigger**
- Found in: `script.js` — Lines 304–308 (artwork card click) and Lines 490–497 (project card click)
- HTML: `index.html` — Lines 518–531 (`<div id="viewModal">`)
- CSS: `style.css` — Lines 911–998 (`.view-modal-box`, `.view-modal-inner`, `.view-modal-details`)
- What it does: Clicking any project or artwork card calls `openViewModal()` which populates the modal with the item's image, badge, title, description, tags, date, and links, then shows it.


**Close Behavior**
- Found in: `script.js` — Lines 120–124 (viewModalClose, viewModal click, and keydown handlers)
- What it does: Three ways to close — clicking the ✕ button, clicking outside the modal box, or pressing Escape.


**10. Contact Section**

**Contact Form**
- Found in: `index.html` — Lines 469–481 (`<form id="contactForm">`)
- JavaScript: `script.js` — Lines 63–90 (contactForm submit handler)
- EmailJS SDK: `index.html` — Lines 10–11 (`emailjs` CDN script and `emailjs.init('DPLiPC0Q01Xuv3xF5')`)
- Service ID: `service_a4ahz22` — Template ID: `template_l8d3gio`
- What it does: Form submission is intercepted with `e.preventDefault()`. All three fields are validated. If valid, the submit button shows a spinner and is disabled. `emailjs.send()` is called with the sender's name, email, and message — this delivers the message directly to `NeoKazaki@gmail.com` via the configured EmailJS Gmail service. On success a confirmation message appears and the form resets. On failure an error message is shown. No backend server is required.


**Social Links**
- Found in: `index.html` — Lines 462–468 (`.social-icons`)
- What it does: Square icon buttons for GitHub, LinkedIn, Instagram, and Facebook each link to John's actual profiles in a new tab.


**11. Footer**

**Tools Disclaimer**
- Found in: `index.html` — Lines 494–503 (`<div class="footer-disclaimer">`)
- CSS: `style.css` — Lines 1017–1036 (`.footer-disclaimer`, `.tool-link`)
- What it does: A paragraph credits the tools used to build the portfolio. Each tool name (ChatGPT, Visual Studio Code, Kiro App, GitHub) is a clickable link styled with the accent color and a dashed underline.


**Back to Top Button**
- Found in: `index.html` — Line 492 (`<a href="#home" class="back-to-top">`)
- CSS: `style.css` — Lines 564–572 (`.back-to-top`)
- What it does: A square button with an up arrow icon that smooth-scrolls back to the top of the page.


**12. Visual & Animation Features**

**Animated Gradient Background**
- Found in: `style.css` — Line 18 (`[data-theme="dark"] body`) and Line 64 (`[data-theme="light"] body`)
- Keyframe: `style.css` — Line 32 (`@keyframes gradientShift`)
- What it does: The body background uses a `linear-gradient` with `background-size: 400% 400%`. The animation moves the background position over 14 seconds, creating a slow shifting color effect. Dark mode uses deep purples and navy blues. Light mode uses soft blues and indigo.


**Crystal Polygon Canvas**
- Found in: `index.html` — Line 14 (`<canvas id="bgCanvas">`)
- JavaScript: `script.js` — Lines 137–173 (`// ===== CANVAS BACKGROUND =====`)
- CSS: `style.css` — Lines 1002–1013 (`#bgCanvas`)
- What it does: A fixed canvas element sits behind all content (`z-index: 0`). JavaScript defines 12 moving points and 7 polygon shapes connecting them. On every animation frame, points move slightly, shapes are redrawn with semi-transparent strokes, and a floating circle pulses using a sine wave. Colors switch based on the current theme.


**Scroll Reveal Animations**
- Found in: `script.js` — Lines 52–61 (`// ===== SCROLL REVEAL =====`)
- CSS: `style.css` — Lines 575–583 (`.reveal`, `.reveal.visible`)
- What it does: All elements with the class `reveal` start invisible (`opacity: 0`) and shifted down (`transform: translateY(30px)`). The IntersectionObserver adds the class `visible` when they enter the viewport, triggering a fade-in and slide-up transition over 0.7 seconds.


**Responsive Design**
- Found in: `style.css` — Line 585 (`@media (max-width: 900px)`) and Line 597 (`@media (max-width: 640px)`)
- What it does: At 900px the hero section stacks vertically and multi-column grids collapse. At 640px the hamburger menu replaces the nav links, editor rows collapse to single columns, and padding is reduced.


**Technologies Used**


**HTML5**
- Used in: `index.html`
- What it does: Defines the structure and content of every section — navbar, hero, about, skills, projects, film, artworks, contact, footer, and all modals.


**CSS3**
- Used in: `style.css`
- What it does: Controls all visual appearance including colors, fonts, layout, spacing, animations, transitions, and responsive breakpoints. Uses CSS variables, Grid, Flexbox, `clamp()`, `backdrop-filter`, and `@keyframes`.


**Vanilla JavaScript (ES6+)**
- Used in: `script.js`
- What it does: Handles all dynamic behavior — rendering cards from data, admin login system, image uploads, modals, canvas drawing, typed animation, scroll reveal, pill nav particle system, and localStorage management.


**CSS Custom Properties (Variables)**
- Found in: `style.css` — Lines 1–17 (`:root`) and Lines 52–63 (`[data-theme="light"]`)
- What it does: Defines reusable values like `--accent`, `--bg`, `--text`, `--card`. When the theme switches, only the variable values change and all elements update automatically.


**localStorage**
- Found in: `script.js` — Lines 92–105 (`updateStats`) and throughout artworks/projects managers
- What it does: Stores all project data, artwork data, theme preference, and version number in the browser's built-in key-value storage. Data persists between page visits without a server or database.


**IntersectionObserver API**
- Found in: `script.js` — Lines 52–61 (scroll reveal and skill bar trigger)
- What it does: Watches for `.reveal` elements to enter the viewport and adds the `visible` class. Also triggers skill bar fill animations when the skills section becomes visible.


**FileReader API**
- Found in: `script.js` — Lines 231–241 (artwork upload) and Lines 430–440 (project upload)
- What it does: Reads image files selected by the admin and converts them to base64 data URLs using `readAsDataURL()`. The resulting string is stored in localStorage and used as the `src` of card images.


**HTML5 Canvas API**
- Found in: `script.js` — Lines 137–173 (`// ===== CANVAS BACKGROUND =====`)
- What it does: Provides a 2D drawing surface. JavaScript uses `ctx.beginPath()`, `ctx.lineTo()`, `ctx.stroke()`, and `ctx.arc()` to draw animated polygon shapes and a floating circle on every animation frame.


**Font Awesome 6.5.0**
- Loaded in: `index.html` — Line 9 (Font Awesome CDN link)
- What it does: Provides all icons used throughout the site via CSS classes like `fa-solid fa-lock`.


**EmailJS**
- Loaded in: `index.html` — Lines 10–11 (EmailJS CDN and `emailjs.init()`)
- Used in: `script.js` — Line 75 (`emailjs.send('service_a4ahz22', 'template_l8d3gio', {...})`)
- What it does: A client-side email service that sends contact form submissions directly to `NeoKazaki@gmail.com` without any backend server. Uses the configured Gmail service (`service_a4ahz22`) and email template (`template_l8d3gio`) to format and deliver messages with the sender's name, email, and message content.


**ChatGPT**
- Used for: Ideation, debugging assistance, content refinement, and code suggestions throughout the development of this portfolio.
- What it does: Assisted in generating ideas for layout and features, helped troubleshoot JavaScript logic and CSS issues, and refined written content such as project descriptions and the about section text.


**Visual Studio Code**
- Used for: Writing, editing, and organizing all source files (`index.html`, `style.css`, `script.js`) during development.
- What it does: Served as the primary code editor for building and refining the portfolio. Used for syntax highlighting, file management, live server preview, and version control integration with GitHub.


**Kiro App**
- Used for: Organizing design workflows, managing development tasks, and AI-assisted code editing directly within the IDE.
- What it does: Provided an integrated AI coding environment that streamlined the implementation of features, helped apply code changes across multiple files, and assisted in maintaining consistent code structure throughout the project.


**GitHub Pages**
- What it does: Automatically serves the portfolio as a live website from the GitHub repository at `https://neokazaki.github.io/Portfolio/`. Any push to the main branch updates the live site within minutes.


**File Structure**

```
Portfolio/
├── index.html                         # Main HTML — all sections, modals, and structure
├── style.css                          # All CSS — styles, animations, themes, responsive rules
├── script.js                          # All JavaScript — rendering, admin, canvas, modals
│
├── Artworks/
│   ├── The Chamelion.jpg              # Artwork — Traditional, Copic Markers
│   ├── Circles.png                    # Artwork — Digital, Medibang Paint
│   ├── Wikang Pinoy.jpg               # Artwork — Traditional, Copic Markers and Pencils
│   ├── Artist Boy.jpg                 # Artwork — Character, IbisPaintX
│   ├── Lion and Dino.png              # Artwork — Digital, Medibang Paint
│   ├── Solemn of Tranquility.jpg      # Artwork — Traditional, Canvas and Alcohol Markers
│   ├── Family Collage.jpg             # Artwork — Collage, Sony Camera and SCRL App
│   └── Athena.jpg                     # Artwork — Traditional, Pencil and Ballpen
│
├── Certificates/
│   ├── Cert1.jpg                      # Certificate image in About section
│   ├── Cert2.jpg                      # Certificate image in About section
│   ├── Cert3.jpg                      # Certificate image in About section
│   ├── Cert4.jpg                      # Certificate image in About section
│   ├── AlokCert1.jpg                  # Alok film participation certificate
│   └── AlokCert2.jpg                  # Alok film recognition certificate
│
├── Projects/
│   ├── Alok Film.jpg                  # Film poster for Alok (Offer) short film
│   ├── CalaCestaLogo.png              # CALA-CESTA project thumbnail
│   ├── TypePhoonLogo.png              # TypePhoon Game project thumbnail
│   └── Portfolio Project.png          # Portfolio Website project thumbnail
│
└── Miscellaneous/
    ├── DOCUMENTATION.md               # This documentation file
    ├── JA.Resume.pdf                  # Downloadable resume linked in the About section
    ├── Lauvinn-Logo.png               # Site logo in navbar and browser tab favicon
    └── profile.png                    # Profile photo in the hero section
```


*Documentation last updated — April 29, 2026*
