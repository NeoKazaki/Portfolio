# JA.Port — Portfolio Website Documentation

**Developer:** John Anniluv A. Atag
**Live Site:** https://neokazaki.github.io/Portfolio/
**GitHub Repository:** https://github.com/NeoKazaki/Portfolio

---

## Project Description

JA.Port is a personal portfolio website designed and developed by John Anniluv A. Atag, a 2nd year IT student at STI Naga City and a commissioned digital and traditional artist. The portfolio serves as a digital resume and creative showcase, presenting his skills, completed projects, artworks, achievements, and contact information to potential employers, clients, and collaborators.

The site is fully responsive, works across all screen sizes, and features a modern dark/light mode design with animated backgrounds, interactive sections, and an admin-protected content management system — all built without any frameworks, using only vanilla HTML, CSS, and JavaScript.

---

## List of Features

### Navigation
- Fixed navigation bar that stays at the top while scrolling
- Smooth scroll to each section when nav links are clicked
- Active link highlighting based on current scroll position
- Hamburger menu for mobile devices
- Dark/Light mode toggle button with persistent preference via localStorage
- Custom logo (Lauvinn-Logo.png) with JA.Port branding

### Home / Hero Section
- Full name with animated flowing gradient text effect
- Typing animation cycling through roles: Web Developer, IT Student, Traditional Artist, Digital Artist, Freelancer
- Personal tagline
- Call-to-action buttons: View My Work and Contact Me
- Profile picture displayed inside a glowing circular frame
- Scroll-down indicator

### About Me Section
- Personal background and bio
- Education history (STI Pasay EDSA → STI Naga City)
- Location and contact info
- Tools experience (Medibang Paint, IbisPaint X)
- Achievements and Certifications list (6 entries)
- Certificate image gallery (4 images) with click-to-enlarge lightbox
- Live stat cards: Projects Completed, Years as Artist, Skills Learned, Artworks Added, Achievements & Certificates
- Downloadable Resume button (JA.Resume.pdf)

### Skills Section
- Skill progress bars with animated fill on scroll reveal
- Two categories: Web & Programming, Arts & Soft Skills
- Skills covered: HTML, CSS, JavaScript, Java, C#, AI Prompting, Digital Art, Traditional Art, Digital Collaging, Photography, Communication & Negotiation, Encoding
- Tech icon grid with Font Awesome icons

### Projects Section
- Admin-protected lock icon — password required to manage
- Dynamic project cards rendered from localStorage
- Each card shows: title, description, tech tags, GitHub link, Live Demo link, preview image
- Click any card to open a full detail modal with date added
- Filter buttons: All, App, Game, Web
- Admin panel: Add, Edit, Delete projects with image upload
- Pre-seeded projects: Cashier Application, TypePhoon Game, Portfolio Website

### Artworks Section
- Admin-protected lock icon — same password system
- Dynamic artwork gallery rendered from localStorage
- Each card shows: category badge, title, description, tools used
- Click any card to open a full detail modal with date added
- Filter buttons: All, Digital, Traditional, Character, Collage
- Admin panel: Add, Edit, Delete artworks with image upload
- Pre-seeded artworks: The Chamelion, Circles, Wikang Pinoy, Artist Boy, Lion and Dino, Solemn of Tranquility, Family Collage, Athena

### Admin System
- Hidden lock icon in Projects and Artworks section headers
- Password-protected modal (password: stored in script.js)
- When logged in: editor panel opens, edit/delete buttons appear on all cards
- Admin badge displayed in editor header
- Log Out button to return to viewer mode
- Admin state reflected via body.admin-mode CSS class

### Contact Section
- Contact form: Name, Email, Message with simulated send feedback
- Contact links: Email, Facebook, GitHub, LinkedIn, Instagram
- Social media icon buttons

### Footer
- Copyright with developer name
- Tools disclaimer with clickable links to: ChatGPT, Visual Studio Code, Kiro App, GitHub
- Back to top button

### Visual & Animation Features
- Animated gradient background (dark: deep purples/navy, light: soft blues/indigo)
- Animated geometric crystal polygon lines drawn on HTML5 Canvas
- Scroll reveal animations on all major sections
- Dark mode: purple/violet accent theme
- Light mode: dark navy blue accent theme with readable contrast
- Responsive design for mobile, tablet, and desktop

---

## Technologies Used

### Core
| Technology | Purpose |
|---|---|
| HTML5 | Page structure and content |
| CSS3 | Styling, animations, responsive layout, theming |
| Vanilla JavaScript (ES6+) | All interactivity and dynamic features |

### CSS Features Used
- CSS Custom Properties (variables) for theming
- CSS Grid and Flexbox for layout
- CSS Keyframe Animations (gradient shift, name gradient, bounce, blink)
- backdrop-filter for frosted glass effects
- clamp() for fluid typography
- Media queries for responsive breakpoints

### JavaScript Features Used
- localStorage for data persistence (projects, artworks, theme preference)
- IntersectionObserver API for scroll reveal animations
- FileReader API for image upload and base64 conversion
- HTML5 Canvas API for animated geometric background
- DOM manipulation for dynamic card rendering
- Event delegation and modular functions

### External Libraries
| Library | Version | Purpose |
|---|---|---|
| Font Awesome | 6.5.0 (CDN) | Icons throughout the site |

### Hosting & Version Control
| Tool | Purpose |
|---|---|
| GitHub | Source code repository and version control |
| GitHub Pages | Free static site hosting and live deployment |

### Development Tools
| Tool | Purpose |
|---|---|
| Visual Studio Code | Code editor |
| Kiro App | Design workflow and AI-assisted development |
| ChatGPT | Ideation, debugging, and content refinement |
| Git | Version control |

---

## File Structure

```
Portfolio/
├── index.html              # Main HTML file
├── style.css               # All styles and animations
├── script.js               # All JavaScript functionality
├── JA.Resume.pdf           # Downloadable resume
├── profile.png             # Profile photo
├── Lauvinn-Logo.png        # Site logo / favicon
├── Portfolio Project.png   # Project screenshot
├── The Chamelion.jpg       # Artwork image
├── Circles.png             # Artwork image
├── Wikang Pinoy.jpg        # Artwork image
├── Artist Boy.jpg          # Artwork image
├── Lion and Dino.png       # Artwork image
├── Solemn of Tranquility.jpg # Artwork image
├── Family Collage.jpg      # Artwork image
├── Athena.jpg              # Artwork image
├── Cert1.jpg               # Certificate image
├── Cert2.jpg               # Certificate image
├── Cert3.jpg               # Certificate image
└── Cert4.jpg               # Certificate image
```

---

*Documentation prepared for academic submission — April 27, 2026*
