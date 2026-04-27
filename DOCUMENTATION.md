# JA.Port — Portfolio Website Documentation

**Developer:** John Anniluv A. Atag
**Live Site:** https://neokazaki.github.io/Portfolio/
**GitHub Repository:** https://github.com/NeoKazaki/Portfolio

---

## Project Description

JA.Port is a personal portfolio website designed and developed by John Anniluv A. Atag, a 2nd year IT student at STI Naga City and a commissioned digital and traditional artist. The portfolio serves as a digital resume and creative showcase, presenting his skills, completed projects, artworks, film work, achievements, and contact information to potential employers, clients, and collaborators.

The site is fully responsive, works across all screen sizes, and features a modern dark/light mode design with animated backgrounds, interactive sections, an admin-protected content management system, a film showcase section, and a certificate gallery — all built without any frameworks, using only vanilla HTML, CSS, and JavaScript.

---

## List of Features

---

### 1. Navigation Bar

**Fixed Navigation Bar**
- Found in: `index.html` — Line 17
- Code: `<nav id="navbar">`
- What it does: The navbar is fixed at the top of the screen at all times using `position: fixed` in CSS. Even when the user scrolls down the page, the navigation remains visible so they can jump to any section without scrolling back up.
- CSS rule: `style.css` — Line 172 (`#navbar { position: fixed; }`)

---

**Smooth Scrolling**
- Found in: `index.html` — Lines 23–29 (nav links with `href="#section"`)
- CSS: `style.css` — Line 113 (`html { scroll-behavior: smooth; }`)
- What it does: When a nav link is clicked, the page glides smoothly to the target section instead of jumping abruptly. This is handled by the CSS `scroll-behavior: smooth` property applied to the `html` element.

---

**Active Link Highlighting**
- Found in: `script.js` — Lines 24–34
- Code: `// ===== ACTIVE NAV =====`
- What it does: A scroll event listener checks which section is currently in view. The matching nav link gets the class `active` which applies a purple color and underline. All other links have `active` removed. This tells the user which section they are currently viewing.

---

**Hamburger Menu**
- Found in: `index.html` — Line 32 (`<button class="hamburger" id="hamburger">`)
- JavaScript: `script.js` — Lines 18–23
- CSS: `style.css` — Line 593 (`@media (max-width: 640px)`)
- What it does: On small screens, the full nav links are hidden and replaced with a hamburger icon. Clicking it toggles the class `open` on the nav links list, which makes them appear vertically. Clicking any link closes the menu again.

---

**Dark/Light Mode Toggle**
- Found in: `index.html` — Line 31 (`<button id="themeToggle">`)
- JavaScript: `script.js` — Lines 1–17
- CSS dark mode: `style.css` — Line 18 (`[data-theme="dark"] body`)
- CSS light mode: `style.css` — Line 52 (`[data-theme="light"]`)
- What it does: Clicking the button reads the current theme from the `data-theme` attribute on the `html` element, switches it to the opposite, saves the choice to `localStorage`, and updates the moon/sun icon. All colors change automatically because CSS variables are defined per theme.

---

**Custom Logo with Text**
- Found in: `index.html` — Lines 18–22
- CSS: `style.css` — Lines 188–213
- What it does: The `Lauvinn-Logo.png` image is displayed on the left side of the navbar. Beside it is the text "JA.Port" with a purple dot, serving as the site's brand identity. The logo scales slightly on hover.

---

**Browser Tab Favicon**
- Found in: `index.html` — Line 8 (`<link rel="icon" type="image/png" href="Lauvinn-Logo.png" />`)
- What it does: Sets the small icon that appears on the browser tab next to the page title. Uses the same Lauvinn-Logo.png file.

---

### 2. Home / Hero Section

**Animated Gradient Name**
- Found in: `index.html` — Line 40 (`<h1 class="hero-name">`)
- CSS: `style.css` — Lines 283–305
- Animation: `@keyframes nameGradient` — `style.css` Line 302
- What it does: The full name uses `background-clip: text` with a multi-color gradient (white → purple → indigo → cyan → back). The `nameGradient` animation moves the background position on a 12-second cycle, creating a slow flowing color sweep across the text.

---

**Typing Animation**
- Found in: `script.js` — Lines 36–49
- HTML element: `index.html` — Line 41 (`<span id="typed">`)
- What it does: The `type()` function cycles through an array of roles. It adds one character at a time when typing forward, then removes one character at a time when deleting. Delays control the speed. After deleting, it moves to the next role in the array.

---

**Personal Tagline**
- Found in: `index.html` — Line 42 (`<p class="hero-tagline">`)
- CSS: `style.css` — Line 316
- What it does: A short sentence below the typed role gives visitors a quick summary of who John is. Styled in muted color with a max-width to keep it readable.

---

**Call-to-Action Buttons**
- Found in: `index.html` — Lines 44–47
- CSS: `style.css` — Lines 120–145 (`.btn`, `.btn-primary`, `.btn-outline`)
- What it does: Two buttons guide visitors — "View My Work" scrolls to the Projects section, and "Contact Me" scrolls to the Contact section. They use smooth scroll via the CSS `scroll-behavior` property.

---

**Profile Picture**
- Found in: `index.html` — Lines 49–54
- CSS: `style.css` — Lines 263–281
- What it does: The `profile.png` image is displayed inside a circular frame (`.avatar-placeholder`) wrapped in a gradient ring (`.avatar-ring`). The ring has a glowing box-shadow. The image is static — no floating animation.

---

**Scroll-Down Indicator**
- Found in: `index.html` — Line 55 (`<a class="scroll-down">`)
- CSS animation: `style.css` — Line 325 (`@keyframes bounce`)
- What it does: A small chevron arrow at the bottom of the hero section bounces up and down using the `bounce` keyframe animation, visually hinting to the user that there is more content below.

---

### 3. About Me Section

**Personal Background**
- Found in: `index.html` — Lines 66–70
- What it does: Three paragraphs describe who John is, his background as an IT student and commissioned artist, his experience with digital and traditional illustration, and his tools (Medibang Paint, IbisPaintX).

---

**Education History**
- Found in: `index.html` — Lines 71–72 (`.about-info` div entries)
- What it does: Lists his academic path with graduation cap and school icons: 1st year at STI Pasay EDSA, then 2nd year to present at STI Naga City.

---

**Achievements Card**
- Found in: `index.html` — Lines 77–89 (`<div class="achievements">`)
- CSS: `style.css` — Lines 1010–1030 (`.achievements`)
- What it does: A styled card with a left purple border lists all 6 of his achievements and certifications including contest placements, art exhibit recognition, and service awards.

---

**Certificate Gallery**
- Found in: `index.html` — Lines 112–131 (`<div class="cert-gallery">`)
- CSS: `style.css` — Lines 1033–1060 (`.cert-gallery`, `.cert-item`)
- What it does: Four certificate images are displayed in a 2×2 grid in the right column of the About section, directly below the stat cards. Each image has a hover overlay with a zoom icon.

---

**Certificate Lightbox**
- Found in: `index.html` — Lines 491–496 (`<div id="certModal">`)
- JavaScript: `script.js` — Lines 125–133
- CSS: `style.css` — Lines 1060–1080 (`.cert-lightbox`)
- What it does: Clicking any certificate image calls `openCert(src)` which sets the lightbox image source and adds the class `open` to the modal overlay. The lightbox closes with the ✕ button, clicking outside, or pressing Escape.

---

**Live Stat Cards**
- Found in: `index.html` — Lines 91–131 (`<div class="about-stats">`)
- JavaScript: `script.js` — Lines 89–105 (`function updateStats()`)
- What it does: Five cards display key numbers. The Projects Completed and Artworks Added counts are read from `localStorage` and updated automatically whenever a project or artwork is added or deleted. The other three are fixed values.

---

**Download Resume Button**
- Found in: `index.html` — Line 90 (`<a href="JA.Resume.pdf" download>`)
- What it does: A button that directly downloads `JA.Resume.pdf` when clicked. The `download` attribute tells the browser to save the file instead of opening it.

---

### 4. Skills Section

**Skill Progress Bars**
- Found in: `index.html` — Lines 143–170 (`.skill-bars`)
- CSS: `style.css` — Lines 381–390 (`.skill-fill`)
- JavaScript trigger: `script.js` — Lines 52–61 (`IntersectionObserver`)
- What it does: Each skill bar has a `data-width` attribute with the target percentage. When the skills section scrolls into view, the IntersectionObserver sets `bar.style.width = bar.dataset.width + '%'`, triggering a CSS transition that animates the fill from 0% to the target.

---

**Tech Icon Grid**
- Found in: `index.html` — Lines 200–212 (`.tech-icons`)
- CSS: `style.css` — Lines 395–415 (`.tech-icon`)
- What it does: A row of icon cards displays each technology with its Font Awesome icon and label. Cards lift up on hover with a transform and box-shadow effect.

---

### 5. Projects Section

**Admin Lock Icon**
- Found in: `index.html` — Lines 218–221 (`<button id="projectLockBtn">`)
- JavaScript: `script.js` — Lines 339–345
- CSS: `style.css` — Lines 800–820 (`.admin-lock-btn`)
- What it does: A small lock icon sits in the section header at 35% opacity. Clicking it opens the password modal. If already logged in, clicking it logs out instead.

---

**Password Modal**
- Found in: `index.html` — Lines 292–305 (`<div id="projectModal">`)
- JavaScript: `script.js` — Lines 370–385
- CSS: `style.css` — Lines 843–872 (`.modal-overlay`, `.modal-box`)
- What it does: A centered popup with a password input. Pressing Enter or clicking "Unlock" checks the input against `ADMIN_PASSWORD`. Correct password activates admin mode. Wrong password shows an error message and clears the field.

---

**Dynamic Project Cards**
- Found in: `script.js` — Lines 455–522 (`function renderProjects()`)
- HTML container: `index.html` — Line 287 (`<div id="projectsGrid">`)
- What it does: All project cards are built by JavaScript using `document.createElement('div')` and injected into the grid. The HTML file contains no hardcoded project cards — everything is rendered from the `projects` array stored in `localStorage`.

---

**Filter Buttons**
- Found in: `index.html` — Lines 280–286 (`<div id="projectFilters">`)
- JavaScript: `script.js` — Lines 519–524
- What it does: Clicking a filter button sets it as active and calls `renderProjects(filter)` which filters the array by category before rendering. Cards not matching the filter are simply not rendered.

---

**Admin Editor Panel**
- Found in: `index.html` — Lines 222–279 (`<div id="projectEditor">`)
- JavaScript: `script.js` — Lines 386–454
- What it does: When admin is logged in, this panel slides open. It contains input fields for all project data and an image upload area. Submitting saves to `localStorage` and re-renders the grid.

---

**Pre-seeded Projects**
- Found in: `script.js` — Lines 356–361 (`const _masterProjects`)
- Version control: `script.js` — Line 362 (`const PROJECT_VERSION = 'v7'`)
- What it does: Three projects are defined in the `_masterProjects` array. On page load, if the stored version does not match `PROJECT_VERSION`, localStorage is force-reset with the latest master data. This ensures updates always apply.

---

**Always-Visible Admin Buttons**
- Found in: `style.css` — Lines 744–764 (`.artwork-card-actions`, `body.admin-mode`)
- What it does: The edit and delete buttons are normally at `opacity: 0`. When `body.admin-mode` is active, CSS forces them to `opacity: 1 !important` on all cards, making them permanently visible without needing to hover.

---

### 6. Film Section

**Film Card Layout**
- Found in: `index.html` — Lines 307–333 (`<section id="film">`)
- CSS: `style.css` — Lines 1090–1160 (`.film-card`, `.film-poster`, `.film-details`)
- What it does: A two-column card layout — the left column holds the poster image, the right column holds all film details. Uses CSS Grid with `grid-template-columns: 320px 1fr`.

---

**Clickable Film Poster**
- Found in: `index.html` — Line 311 (`onclick="openCert('Alok Film.jpg')"`)
- JavaScript: `script.js` — Line 129 (`window.openCert`)
- CSS: `style.css` — Lines 1100–1115 (`.film-poster-img`)
- What it does: Clicking the poster calls `openCert()` which opens the certificate lightbox with the film poster as the image. A hover zoom effect (`transform: scale(1.03)`) provides a visual cue that it is clickable.

---

**Film Meta Details**
- Found in: `index.html` — Lines 317–322 (`<div class="film-meta">`)
- CSS: `style.css` — Lines 1130–1150 (`.film-meta`)
- What it does: A styled box with a left purple border lists the director, producer, and main character. In light mode, an additional navy blue tinted background is applied so the box is visible against the white card.

---

**Watch Buttons**
- Found in: `index.html` — Lines 328–332 (`<div class="film-btns">`)
- What it does: Two buttons link to external video platforms. "Watch on Facebook" opens the Facebook video link. "Watch on UNIPLAT" opens the UNIPLAT platform link. Both open in a new tab.

---

### 7. Artworks Section

**Dynamic Artwork Gallery**
- Found in: `script.js` — Lines 277–334 (`function renderArtworks()`)
- HTML container: `index.html` — Line 403 (`<div id="artworksGrid">`)
- What it does: All artwork cards are built by JavaScript and injected into the grid. The seed function pre-populates `localStorage` with 8 artworks on first load. Each card is created with `document.createElement` and appended to the grid.

---

**Image Upload**
- Found in: `index.html` — Lines 360–370 (`<div id="imageUploadArea">`)
- JavaScript: `script.js` — Lines 228–240
- What it does: The upload area accepts image files. When a file is selected, `FileReader.readAsDataURL()` converts it to a base64 string. This string is stored in `localStorage` as the image value and used as the `src` of the card image.

---

**Pre-seeded Artworks**
- Found in: `script.js` — Lines 524–600 (`(function seedArtworks()`)
- What it does: An immediately-invoked function checks `localStorage` for existing artworks. For each of the 8 pre-defined artworks, if the title does not exist yet it is added. If it exists with outdated data (e.g., wrong tools), it is overwritten. After seeding, `renderArtworks()` is called.

---

### 8. Admin System

**Admin Mode Activation**
- Found in: `script.js` — Lines 196–215 (artwork admin login) and Lines 370–385 (project admin login)
- CSS class: `body.admin-mode` — `style.css` Line 753
- What it does: On successful login, `document.body.classList.add('admin-mode')` is called. This CSS class triggers all `.artwork-card-actions` elements to become fully visible. The lock icon changes to an open lock and turns green.

---

**Log Out**
- Found in: `script.js` — Lines 219–227 (`function logout()`) and Lines 398–407 (`function logoutProject()`)
- What it does: Removes `admin-mode` from the body, closes the editor panel, resets the lock icon to locked state, resets the form fields, and re-renders the cards without admin buttons.

---

**Shared Password**
- Found in: `script.js` — Line 85 (`const ADMIN_PASSWORD = 'NeoKazaki2026'`)
- What it does: A single constant stores the admin password. Both the artworks and projects login modals check against this same value. Changing it here updates both sections at once.

---

### 9. View Detail Modal

**Modal Trigger**
- Found in: `script.js` — Lines 309–320 (artwork click) and Lines 490–510 (project click)
- HTML: `index.html` — Lines 499–515 (`<div id="viewModal">`)
- CSS: `style.css` — Lines 940–1000 (`.view-modal-box`, `.view-modal-inner`)
- What it does: An event listener on each card calls `openViewModal()` passing the item's data. The function populates the modal's inner elements with the image, badge, title, description, tags, date, and links, then adds the class `open` to show it.

---

**Close Behavior**
- Found in: `script.js` — Lines 121–124
- What it does: Three ways to close: clicking the ✕ button calls `closeViewModal()`, clicking outside the modal box (on the overlay) also calls it, and pressing the Escape key triggers it via a `keydown` event listener on `document`.

---

### 10. Contact Section

**Contact Form**
- Found in: `index.html` — Lines 450–468 (`<form id="contactForm">`)
- JavaScript: `script.js` — Lines 62–83
- What it does: The form submission is intercepted with `e.preventDefault()`. All three fields are validated. If valid, the submit button shows a spinner and is disabled. After 1.5 seconds a success message appears, the form resets, and the button is re-enabled. No actual email is sent — it is a simulated response.

---

**Social Links**
- Found in: `index.html` — Lines 435–448 (`.social-icons`)
- What it does: Square icon buttons for GitHub, LinkedIn, Instagram, and Facebook each link to John's actual profiles. They open in a new tab using `target="_blank"`.

---

### 11. Footer

**Tools Disclaimer**
- Found in: `index.html` — Lines 483–492 (`<div class="footer-disclaimer">`)
- CSS: `style.css` — Lines 1200–1220 (`.footer-disclaimer`, `.tool-link`)
- What it does: A paragraph credits the tools used to build the portfolio. Each tool name (ChatGPT, Visual Studio Code, Kiro App, GitHub) is a clickable link styled with the accent color and a dashed underline. Hovering changes the color to the darker accent.

---

**Back to Top Button**
- Found in: `index.html` — Line 481 (`<a href="#home" class="back-to-top">`)
- CSS: `style.css` — Lines 560–570 (`.back-to-top`)
- What it does: A square button with an up arrow icon. Clicking it uses the smooth scroll behavior to return the user to the top of the page.

---

### 12. Visual & Animation Features

**Animated Gradient Background**
- Found in: `style.css` — Line 18 (`[data-theme="dark"] body`) and Line 64 (`[data-theme="light"] body`)
- Keyframe: `style.css` — Line 32 (`@keyframes gradientShift`)
- What it does: The body background uses a `linear-gradient` with `background-size: 400% 400%`. The `gradientShift` animation moves the background position through four keyframe positions over 14 seconds, creating a slow shifting color effect. Dark mode uses deep purples and navy blues. Light mode uses soft blues and indigo.

---

**Crystal Polygon Canvas**
- Found in: `index.html` — Line 15 (`<canvas id="bgCanvas">`)
- JavaScript: `script.js` — Lines 134–172 (`const canvas`, `function drawCanvas()`)
- CSS: `style.css` — Lines 960–975 (`#bgCanvas`)
- What it does: A fixed canvas element sits behind all content (`z-index: 0`). JavaScript defines 12 moving points and 7 polygon shapes connecting them. On every animation frame, points move slightly, shapes are redrawn with semi-transparent strokes, and a floating circle pulses using a sine wave. Colors switch based on the current theme.

---

**Scroll Reveal Animations**
- Found in: `script.js` — Lines 50–61 (`const observer = new IntersectionObserver`)
- CSS: `style.css` — Lines 570–579 (`.reveal`, `.reveal.visible`)
- What it does: All elements with the class `reveal` start invisible (`opacity: 0`) and shifted down (`transform: translateY(30px)`). The IntersectionObserver watches them. When they enter the viewport, the class `visible` is added, triggering a CSS transition that fades them in and slides them up over 0.7 seconds.

---

**Responsive Design**
- Found in: `style.css` — Line 581 (`@media (max-width: 900px)`) and Line 593 (`@media (max-width: 640px)`)
- What it does: At 900px the hero section stacks vertically, the avatar moves above the text, and multi-column grids collapse. At 640px the hamburger menu replaces the nav links, the editor rows collapse to single columns, and padding is reduced for small screens.

---

## Technologies Used

---

**HTML5**
- Used in: `index.html`
- What it does: Defines the structure and content of every section. All elements — the navbar, hero, about, skills, projects, film, artworks, contact, footer, and all modals — are written as HTML5 semantic elements.

---

**CSS3**
- Used in: `style.css`
- What it does: Controls all visual appearance including colors, fonts, layout, spacing, animations, transitions, and responsive breakpoints. Uses modern features like CSS variables, Grid, Flexbox, clamp(), and backdrop-filter.

---

**Vanilla JavaScript (ES6+)**
- Used in: `script.js`
- What it does: Handles all dynamic behavior — rendering cards from data, admin login system, image uploads, modals, canvas drawing, typed animation, scroll reveal, localStorage management, and stat counter updates.

---

**CSS Custom Properties (Variables)**
- Found in: `style.css` — Lines 1–17 (`:root`) and Lines 52–63 (`[data-theme="light"]`)
- What it does: Defines reusable values like `--accent`, `--bg`, `--text`, `--card` that are referenced throughout the stylesheet. When the theme switches, only the variable values change and all elements update automatically.

---

**localStorage**
- Found in: `script.js` — Lines 85–105 and throughout the artworks/projects managers
- What it does: Stores all project data, artwork data, theme preference, and version number in the browser's built-in key-value storage. Data persists between page visits without needing a server or database.

---

**IntersectionObserver API**
- Found in: `script.js` — Lines 50–61
- What it does: A browser API that watches for elements to enter the visible area of the screen. When a `.reveal` element becomes visible, it adds the `visible` class. When the skills section becomes visible, it triggers skill bar fill animations.

---

**FileReader API**
- Found in: `script.js` — Lines 228–240 (artwork upload) and Lines 430–440 (project upload)
- What it does: Reads image files selected by the admin and converts them to base64 data URLs using `readAsDataURL()`. The resulting string is stored in localStorage and used as the `src` attribute of card images.

---

**HTML5 Canvas API**
- Found in: `script.js` — Lines 134–172
- What it does: Provides a 2D drawing surface. JavaScript uses `ctx.beginPath()`, `ctx.lineTo()`, `ctx.stroke()`, and `ctx.arc()` to draw the animated polygon shapes and floating circle on every animation frame.

---

**Font Awesome 6.5.0**
- Loaded in: `index.html` — Line 10 (`<link rel="stylesheet" href="cdnjs...font-awesome...">`)
- What it does: Provides all icons used throughout the site — nav icons, section icons, social media icons, button icons, card action buttons, and modal icons — via CSS classes like `fa-solid fa-lock`.

---

**GitHub Pages**
- What it does: Automatically serves the portfolio as a live website from the GitHub repository at `https://neokazaki.github.io/Portfolio/`. Any push to the main branch updates the live site within minutes.

---

## File Structure

```
Portfolio/
├── index.html                    # Main HTML — all sections, modals, and structure
├── style.css                     # All CSS — styles, animations, themes, responsive rules
├── script.js                     # All JavaScript — rendering, admin, canvas, modals
├── DOCUMENTATION.md              # This documentation file
├── JA.Resume.pdf                 # Downloadable resume linked in the About section
├── profile.png                   # Profile photo in the hero section
├── Lauvinn-Logo.png              # Site logo in navbar and browser tab favicon
├── CalaCestaLogo.png             # CALA-CESTA project thumbnail
├── TypePhoonLogo.png             # TypePhoon Game project thumbnail
├── Portfolio Project.png         # Portfolio Website project thumbnail
├── Alok Film.jpg                 # Film poster for Alok (Offer) short film
├── The Chamelion.jpg             # Artwork — Traditional, Copic Markers
├── Circles.png                   # Artwork — Digital, Medibang Paint
├── Wikang Pinoy.jpg              # Artwork — Traditional, Copic Markers and Pencils
├── Artist Boy.jpg                # Artwork — Character, IbisPaintX
├── Lion and Dino.png             # Artwork — Digital, Medibang Paint
├── Solemn of Tranquility.jpg     # Artwork — Traditional, Canvas and Alcohol Markers
├── Family Collage.jpg            # Artwork — Collage, Sony Camera and SCRL App
├── Athena.jpg                    # Artwork — Traditional, Pencil and Ballpen
├── Cert1.jpg                     # Certificate image in About section
├── Cert2.jpg                     # Certificate image in About section
├── Cert3.jpg                     # Certificate image in About section
└── Cert4.jpg                     # Certificate image in About section
```

---

*Documentation prepared for academic submission — April 27, 2026*
