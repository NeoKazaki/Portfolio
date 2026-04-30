**JA.Port — Workstation Section Code Documentation**

**Subject:** Web Systems and Technologies

**Developer:** John Anniluv A. Atag

**Professor:** Mr. Everild Gerd R. Pablo MBA

**GitHub Repository:** https://github.com/NeoKazaki/Portfolio

**Live Portfolio:** https://neokazaki.github.io/Portfolio/


**Overview**

This document explains every piece of code used inside the Workstation section of the JA.Port portfolio website. The Workstation section is located between the About and Skills sections and showcases the physical setup, PC hardware specifications, peripherals, and devices used for development and creative work.

- Found in: `index.html` — Lines 150–270 (`<section id="workstation">`)
- CSS: `style.css` — Lines 353–670
- JavaScript: `script.js` — `window.openCert()` and `IntersectionObserver` for `.reveal-fast`


**Section Wrapper**

```html
<section id="workstation">
```

- This is a standard HTML5 semantic section element.
- The `id="workstation"` allows the scroll-based active nav highlighter in `script.js` to detect when this section is in view.
- The section uses the base `section` CSS rule which sets `padding: 100px 5%` and `max-width: 1200px; margin: 0 auto` to center it on the page.
- Additionally `#workstation` has `position: relative; z-index: 1` so it renders above the animated canvas background.


**Section Header**

```html
<div class="section-header reveal">
  <h2>My <span>Workstation</span></h2>
  <div class="underline"></div>
  <p class="section-sub">The setup I use to build, design, and create.</p>
</div>
```

- `.section-header` centers the heading and adds bottom margin.
- The `<span>` inside `<h2>` applies `color: var(--accent)` to color the word "Workstation" in purple.
- `.underline` is a short decorative bar rendered using a purple gradient.
- `.section-sub` is a muted subtitle below the heading.
- `reveal` class starts the element invisible and the `IntersectionObserver` fades it in when scrolled into view.


**Main Grid Layout**

```html
<div class="workstation-grid reveal-fast">
  <div class="workstation-left">   <!-- Left column -->
  <div class="workstation-specs">  <!-- Right column -->
</div>
```

CSS:
```css
.workstation-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  align-items: start;
}
```

- Uses CSS Grid with two columns. The right column (`1.2fr`) is slightly wider to accommodate the PC specs table.
- `align-items: start` prevents the columns from stretching to equal height.
- `reveal-fast` uses a secondary `IntersectionObserver` with a `0.05` threshold — only 5% of the element needs to be visible to trigger the animation. This prevents large grid sections from failing to animate.
- On screens below 900px, `grid-template-columns` collapses to `1fr` (single column).


**Left Column Wrapper**

```html
<div class="workstation-left">
```

CSS:
```css
.workstation-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
```

- Flexbox column that stacks all left-side cards vertically with 20px spacing between them.
- Contains: Workstation Photo, Brother Printer Card, Device Pair Grid (Phone + Camera).


**Workstation Photo**

```html
<div class="workstation-img-wrap">
  <img src="Miscellaneous/WorkStation.jpg" alt="My Workstation Setup"
       class="workstation-img"
       onclick="openCert('Miscellaneous/WorkStation.jpg')" />
  <div class="workstation-badge">
    <i class="fa-solid fa-wrench"></i> Work in Progress
  </div>
</div>
```

CSS:
```css
.workstation-img-wrap {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
  cursor: pointer;
}
.workstation-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.workstation-img-wrap:hover .workstation-img { transform: scale(1.03); }
.workstation-badge {
  position: absolute;
  top: 14px; left: 14px;
  background: var(--accent);
  color: #fff;
  padding: 5px 14px;
  border-radius: 50px;
  font-size: 0.78rem;
  font-weight: 600;
}
```

- `position: relative` on the wrapper allows the badge to be positioned absolutely on top of the image.
- `overflow: hidden` clips the image zoom effect to the card boundary.
- `onclick="openCert()"` calls the JavaScript lightbox function to open the photo full-size.
- The badge uses `position: absolute; top: 14px; left: 14px` to overlay the top-left corner of the image.


**Device Card Pattern (Printer, Phone, Camera)**

All three device cards on the left use the same `.printer-card` class structure:

```html
<div class="printer-card">
  <div class="printer-header">
    <i class="fa-solid fa-print"></i>
    <div>
      <h4>Device Name</h4>
      <span>Device Subtitle</span>
    </div>
  </div>
  <div class="printer-specs">
    <div class="printer-spec-item">
      <span>Label</span>
      <span>Value</span>
    </div>
  </div>
</div>
```

CSS:
```css
.printer-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.printer-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border);
  background: rgba(124,58,237,0.06);
}
.printer-spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 18px;
  border-bottom: 1px solid var(--border);
  font-size: 0.83rem;
}
.printer-spec-item span:first-child { color: var(--text-muted); font-weight: 500; }
.printer-spec-item span:last-child { color: var(--text); font-weight: 600; }
```

- The header has a subtle purple-tinted background (`rgba(124,58,237,0.06)`) to distinguish it from the spec rows.
- Each spec row uses `justify-content: space-between` — label floats left, value floats right.
- `border-bottom` on each row creates the divider lines between specs.
- Hover applies a light purple tint: `background: rgba(124,58,237,0.05)`.


**Brother DCP-T426W Printer Card**

```html
<div class="printer-card">
  <div class="printer-header">
    <i class="fa-solid fa-print"></i>
    <div>
      <h4>Brother DCP-T426W</h4>
      <span>Inkjet All-in-One Printer</span>
    </div>
  </div>
  <div class="printer-specs">
    <div class="printer-spec-item"><span>Model Driver</span><span>Microsoft IPP Class Driver</span></div>
    <div class="printer-spec-item"><span>Port</span><span>USB001</span></div>
    <div class="printer-spec-item"><span>NTC No.</span><span>ESD-RCE-2128412</span></div>
    <div class="printer-spec-item"><span>Machine SN</span><span>E82258G2H124059</span></div>
    <div class="printer-spec-item"><span>Color</span><span>Yes</span></div>
    <div class="printer-spec-item"><span>Double-sided</span><span>No</span></div>
    <div class="printer-spec-item"><span>Speed</span><span>11 ppm</span></div>
    <div class="printer-spec-item"><span>Max Resolution</span><span>600 dpi</span></div>
  </div>
</div>
```

- Uses `fa-solid fa-print` Font Awesome icon in the header.
- 8 spec rows covering all printer properties from the Windows printer properties dialog.


**Device Pair Grid — Phone and Camera**

```html
<div class="device-pair-grid">
  <!-- Infinix Note 40 Pro 5G card -->
  <!-- Sony Alpha a5000 card -->
</div>
```

CSS:
```css
.device-pair-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 640px) {
  .device-pair-grid { grid-template-columns: 1fr; }
}
```

- Two equal columns side by side using CSS Grid.
- Collapses to single column on screens below 640px.
- Both cards use the same `.printer-card` pattern.

**Infinix Note 40 Pro 5G** — `fa-brands fa-android` icon — specs: Brand, Model, RAM (12+12 GB), Storage (512 GB), OS, Connectivity (5G).

**Sony Alpha a5000** — `fa-solid fa-camera` icon — specs: Brand, Model (ILCE-5000), Type (Mirrorless), Sensor (APS-C CMOS 20.1MP), Storage (64GB SanDisk Card), Connectivity (Wi-Fi / NFC).


**Right Column — PC Specifications**

```html
<div class="workstation-specs">
  <div class="spec-header">
    <h3><i class="fa-solid fa-computer"></i> PC Specifications</h3>
    <span class="spec-note">Currently planning upgrades</span>
  </div>
  <div class="spec-list">
    <div class="spec-item">
      <span class="spec-label"><i class="fa-solid fa-microchip"></i> Processor</span>
      <span class="spec-value">11th Gen Intel® Core™ i7-11700 @ 2.50GHz</span>
    </div>
  </div>
</div>
```

CSS:
```css
.spec-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--border);
}
.spec-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 130px;
}
.spec-value {
  font-size: 0.85rem;
  color: var(--text);
  text-align: right;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
```

- Each spec row is a flex container — label on the left with a fixed `min-width: 130px`, value on the right aligned to the end.
- `flex-wrap: wrap` on `.spec-value` allows long values to wrap to a second line if needed.


**Upgrade Tags**

```html
<span class="upgrade-tag">Upgrade Planned</span>
<span class="upgrade-tag">Expansion Planned</span>
```

CSS:
```css
.upgrade-tag {
  background: rgba(239,68,68,0.15);
  color: #ef4444;
  padding: 2px 8px;
  border-radius: 50px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}
```

- A small red pill badge placed inline inside `.spec-value`.
- Applied to RAM, Graphics, and Storage rows.
- `white-space: nowrap` prevents the badge text from breaking across lines.


**Upgrade Note Card**

```html
<div class="spec-upgrade-note">
  <i class="fa-solid fa-rocket"></i>
  <p>This workstation is still a <strong>work in progress</strong>...</p>
</div>
```

CSS:
```css
.spec-upgrade-note {
  background: var(--card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
```

- The thick left border (`border-left: 4px solid var(--accent)`) is the visual accent that makes it stand out as a note card.
- Flexbox row with the rocket icon and paragraph side by side.


**Peripheral Cards — Mic and Headset**

```html
<div class="peripheral-cards">
  <div class="peripheral-card">
    <div class="peripheral-header">
      <i class="fa-solid fa-microphone"></i>
      <div>
        <h4>TNW K16</h4>
        <span>USB Condenser Microphone</span>
      </div>
    </div>
    <div class="peripheral-specs">
      <div class="peripheral-spec-item">
        <span>Label</span>
        <span>Value</span>
      </div>
    </div>
  </div>
</div>
```

CSS:
```css
.peripheral-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.peripheral-spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--border);
  font-size: 0.8rem;
}
@media (max-width: 640px) {
  .peripheral-cards { grid-template-columns: 1fr; }
}
```

- Same 2-column grid pattern as the device pair grid.
- Uses a separate class set (`.peripheral-card`, `.peripheral-header`, `.peripheral-specs`, `.peripheral-spec-item`) but follows the exact same visual pattern as the printer cards.
- TNW K16 uses `fa-solid fa-microphone` icon.
- MIMIFASO PC-900 uses `fa-solid fa-headphones` icon.


**JavaScript Used**

Only two JavaScript features are used in this section:

**1. openCert() — Lightbox for the workstation photo**
```js
window.openCert = (src) => {
  certModalImg.src = src;
  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
};
```
- Found in: `script.js` — Line 131
- Called by `onclick="openCert('Miscellaneous/WorkStation.jpg')"` on the photo.
- Sets the lightbox image source and opens the modal overlay.

**2. IntersectionObserver — reveal-fast animation**
```js
const revealFastEls = document.querySelectorAll('.reveal-fast');
const observerFast = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.05 });
revealFastEls.forEach(el => observerFast.observe(el));
```
- Found in: `script.js` — Lines 63–68
- Watches the `.workstation-grid` element.
- When 5% of it enters the viewport, adds the class `visible` which triggers the CSS fade-in and slide-up transition.


**CSS Variables Used**

All colors and sizes reference CSS variables defined in `:root` and `[data-theme="light"]`:

| Variable | Value (Dark Mode) | Used For |
|---|---|---|
| `--card` | `#1e1e35` | Card backgrounds |
| `--border` | `#2d2d4e` | Card borders and row dividers |
| `--accent` | `#7c3aed` | Icons, badge, left border on note card |
| `--text` | `#e2e8f0` | Spec values |
| `--text-muted` | `#94a3b8` | Spec labels |
| `--radius` | `12px` | Border radius on all cards |


**Responsive Behavior**

| Breakpoint | Behavior |
|---|---|
| Above 900px | Full 2-column layout — photo/cards left, PC specs right |
| Below 900px | Single column — left column stacks above right column |
| Below 640px | Device pair grid and peripheral cards collapse to single column. Spec rows stack label above value. |


*Workstation Documentation prepared — April 30, 2026*
