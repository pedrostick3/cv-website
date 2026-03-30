# CLAUDE.md — Instructions for Claude Code

## Project Overview

This is Pedro Dionísio's personal portfolio website — a scroll-driven storytelling experience with 11 animated scenes. Each scene maps to a real career milestone, connected by a hockey puck that travels through the entire narrative.

## Tech Stack

- **Vanilla HTML/CSS/JS** — no frameworks, no build step
- **GSAP 3** (via CDN) — ScrollTrigger, MotionPath, DrawSVG plugins
- **Inline SVG** — all illustrations are hand-crafted SVG in the HTML
- **ES Modules** — `type="module"` on all scripts
- **i18n** — JSON-based, PT-PT and EN, switched via `data-i18n` attributes

## Architecture Rules

### Files & Structure
- One JS module per scene in `js/scenes/XX-name.js`
- Each scene module exports an `init(container)` function
- `js/main.js` imports and initializes all scenes in order
- `js/scroll-manager.js` coordinates ScrollTrigger instances
- CSS is split: `variables.css` → `base.css` → `scenes.css` → `responsive.css`

### SVG Guidelines
- All scene SVGs are **inline** in `index.html` inside their scene `<section>`
- Complex reusable SVGs can be in `assets/svgs/` and loaded via `<use>`
- SVG animations use GSAP, not SMIL or CSS `@keyframes` (except simple loops like propeller rotation)
- Every SVG element that GSAP animates needs a unique `id` or descriptive `class`
- Use `viewBox` with proportional sizing, never fixed `width`/`height` in px

### Animation Rules
- **Only animate `transform` and `opacity`** — never `width`, `height`, `top`, `left`, `margin`
- All scene animations must use `ScrollTrigger` with `scrub: true` or `scrub: 1`
- Use `gsap.timeline()` for multi-step sequences within a scene
- Wrap all motion in `@media (prefers-reduced-motion: no-preference)` or check `window.matchMedia` in JS
- The puck element (`#puck`) is persistent across scenes — animate it via the scroll-manager, not individual scenes
- The drone element (`#drone`) becomes sticky from scene 6 onwards

### i18n Rules
- All user-visible text uses `data-i18n="key"` attributes
- Keys follow pattern: `scene.XX.element` (e.g., `scene.01.title`, `scene.07.app.bluenergy`)
- `js/i18n.js` loads the JSON and applies translations on language switch
- Default language: PT-PT (detected from browser, fallback PT)
- Language toggle is in the hero and footer

### CSS Rules
- Design tokens in `css/variables.css` — always use CSS custom properties
- Dark theme is the default (and only) theme
- Scene-specific styles use BEM-like naming: `.scene-01__stick`, `.scene-07__app-grid`
- Breakpoints: mobile-first, with `min-width: 768px` and `min-width: 1024px`
- No `!important` unless overriding third-party styles

## Scene Implementation Pattern

Each scene follows this structure:

### HTML (in index.html)
```html
<section id="scene-XX" class="scene" data-scene="XX">
  <div class="scene__inner">
    <!-- SVG illustration -->
    <svg class="scene-XX__illustration" viewBox="0 0 1920 1080">
      <!-- ... -->
    </svg>
    <!-- Text overlay -->
    <div class="scene-XX__content">
      <h2 data-i18n="scene.XX.title">...</h2>
      <p data-i18n="scene.XX.description">...</p>
    </div>
  </div>
</section>
```

### JS (in js/scenes/XX-name.js)
```javascript
export function init(container) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
    }
  });

  // Animation sequence
  tl.from('.scene-XX__element', { opacity: 0, y: 50 })
    .to('.scene-XX__other', { rotation: 360 }, '<');

  return tl; // Return for scroll-manager coordination
}
```

## Color Mapping

When adding elements, use the correct color for the career phase:
- **Purple** (`--c-purple`): Personal / childhood / hockey
- **Teal** (`--c-teal`): Hardware / electronics / IoT
- **Coral** (`--c-coral`): 3D / architecture / Italy
- **Blue** (`--c-blue`): Software / Flutter / .NET
- **Pink** (`--c-pink`): AI / ML / LangChain
- **Gray** (`--c-gray`): Present day / neutral

## Common Tasks

### Adding a new scene
1. Add `<section id="scene-XX">` to `index.html`
2. Create `js/scenes/XX-name.js` with `export function init(container)`
3. Import and register in `js/main.js`
4. Add scene styles to `css/scenes.css`
5. Add translations to both `i18n/pt.json` and `i18n/en.json`
6. Update the status table in `README.md`

### Adding a new translatable string
1. Add `data-i18n="key"` to the HTML element
2. Add the key to both `i18n/pt.json` and `i18n/en.json`
3. The i18n system will pick it up automatically

### Testing animations
- Scroll slowly through each scene to verify timing
- Check `prefers-reduced-motion` by enabling in browser DevTools
- Test on mobile viewport (375px width minimum)
- Verify no layout shift during scroll pinning

## Performance Checklist
- [ ] All SVGs are inline (no external SVG requests)
- [ ] Images are WebP format, lazy-loaded below the fold
- [ ] GSAP loaded from CDN with `defer`
- [ ] No JS blocking first paint
- [ ] CSS is < 50KB total
- [ ] `will-change` only on actively animated elements
