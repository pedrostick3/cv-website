# pedrodionisio.pt — Scrollable Storytelling Portfolio

Personal portfolio website for **Pedro Dionísio** (AI Engineer & Full-Stack Developer) built as a scroll-driven animated narrative that maps each career milestone to an interactive visual scene.

## Live Site

🌐 [pedrodionisio.pt](https://pedrodionisio.pt)

---

## Concept

The website tells Pedro's professional story through **11 scroll-triggered animated scenes**, each representing a real career milestone. A hockey stick hits a puck in the hero, and that puck travels through the entire site — flying over a 3D-modeled house (Erasmus+ Italy), crashing into a phone (CTDI repair), revealing electronics (IoT/PCBs), controlling a robotic arm that builds a drone, and the drone becomes the user's guide through the software and AI sections.

### Scene Flow (Chronological)

| # | Scene | Era | Visual |
|---|-------|-----|--------|
| 1 | **Hero** — Hockey stick hits puck | 2013-16 | Stick swing animation, name reveal |
| 2 | **3D House** — Erasmus+ Italy | 2015 | PT→IT map line, isometric house builds wireframe→solid |
| 3 | **Phone breaks** — CTDI repair | 2016 | Puck hits phone, screen shatters into shards |
| 4 | **Electronics revealed** — IoT & PCBs | 2016-21 | Phone explodes into layers, PCB traces light up, smart home |
| 5 | **Robotic arm builds drone** — Robotics | 2019-21 | Wireless signal, arm articulates, drone assembles |
| 6 | **Drone flies** — Transition to software | 2021+ | Drone becomes sticky scroll guide |
| 7 | **Code door `{ }`** — Flutter & .NET | 2021-24 | Door opens, app grid reveals, Matrix code rain |
| 8 | **Brain → Robot** — AI transition | 2024 | Drone picks up glowing brain, places in robot head |
| 9 | **Robot chest panel** — AI skills | 2024+ | Network graph of AI skills, PoC hologram cards |
| 10 | **Bedroom loop** — Present day | Now | Isometric room with all objects as clickable easter eggs |
| 11 | **Footer** — Contact & timeline | — | Photo, CV downloads, contact form, interactive timeline |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Core | Vanilla HTML5, CSS3, JavaScript (ES Modules) |
| Animation | [GSAP 3](https://gsap.com/) + ScrollTrigger, MotionPath, DrawSVG |
| Graphics | Inline SVG (hand-crafted), CSS animations |
| i18n | Custom JSON-based (PT-PT / EN) |
| Fonts | [Google Fonts](https://fonts.google.com/) — Space Grotesk (display) + DM Sans (body) |
| Hosting | TBD (Netlify / Vercel / GitHub Pages) |

> **No build step required.** Open `index.html` in a browser or use any static file server.

---

## Project Structure

```
pedrodionisio.pt/
├── index.html                 # Main entry — all scenes load here
├── css/
│   ├── variables.css          # Design tokens (colors, spacing, typography)
│   ├── base.css               # Reset, global styles, utilities
│   ├── scenes.css             # Scene-specific layouts and styles
│   └── responsive.css         # Breakpoints and mobile adaptations
├── js/
│   ├── main.js                # App entry — initializes everything
│   ├── gsap-setup.js          # GSAP + plugin registration
│   ├── i18n.js                # Language switching system
│   ├── scroll-manager.js      # ScrollTrigger coordination
│   └── scenes/                # One module per scene
│       ├── 01-hero.js
│       ├── 02-house-italy.js
│       ├── 03-phone-break.js
│       ├── 04-electronics.js
│       ├── 05-drone-build.js
│       ├── 06-drone-guide.js
│       ├── 07-code-door.js
│       ├── 08-brain-robot.js
│       ├── 09-ai-skills.js
│       ├── 10-bedroom.js
│       └── 11-footer.js
├── i18n/
│   ├── pt.json                # Portuguese translations
│   └── en.json                # English translations
├── assets/
│   ├── images/                # Photos (pedro-photo.webp, og-image.webp)
│   ├── svgs/                  # Complex SVG illustrations (per scene)
│   └── cvs/                   # CV PDFs for download
│       ├── CV_PedroDionisio_2025_PT.pdf
│       ├── CV_PedroDionisio_2025_EN.pdf
│       └── CV_AI_PedroDionisio_2025_EN.pdf
├── CLAUDE.md                  # Instructions for Claude Code
└── README.md                  # This file
```

---

## Getting Started

### Local Development

```bash
# Clone the repo
git clone https://github.com/pedrostick3/pedrodionisio.pt.git
cd pedrodionisio.pt

# Serve locally (any static server works)
npx serve .
# or
python3 -m http.server 8000
# or just open index.html in browser
```

### Using Claude Code

This project is optimized for development with [Claude Code](https://docs.claude.com). See `CLAUDE.md` for detailed instructions Claude Code will follow.

```bash
# From the project root
claude
```

---

## Design System

### Color Palette

| Role | Variable | Light | Dark |
|------|----------|-------|------|
| Personal / Hockey | `--c-purple` | `#7F77DD` | `#AFA9EC` |
| Hardware / IoT | `--c-teal` | `#1D9E75` | `#5DCAA5` |
| 3D / Architecture | `--c-coral` | `#D85A30` | `#F0997B` |
| Software / Code | `--c-blue` | `#378ADD` | `#85B7EB` |
| AI / ML | `--c-pink` | `#D4537E` | `#ED93B1` |
| Present / Neutral | `--c-gray` | `#888780` | `#B4B2A9` |
| Background | `--bg-primary` | `#0D0D12` | `#0D0D12` |
| Surface | `--bg-surface` | `#16161D` | `#16161D` |
| Text Primary | `--text-primary` | `#F0EDE6` | `#F0EDE6` |
| Text Secondary | `--text-secondary` | `#9A9890` | `#9A9890` |

> The site uses a **dark theme by default** to match the AI/tech aesthetic of the AI CV design.

### Typography

- **Display**: Space Grotesk (700) — headings, scene titles
- **Body**: DM Sans (400, 500) — paragraphs, labels, UI
- **Mono**: JetBrains Mono (400) — code snippets, tech tags

### Animation Principles

1. **Scroll-driven**: All major animations are tied to scroll position via GSAP ScrollTrigger
2. **Progressive reveal**: Content appears as user scrolls — nothing loads all at once
3. **Object continuity**: The puck/drone carries through scenes as a narrative thread
4. **Performant**: Only `transform` and `opacity` are animated. No layout-triggering properties
5. **Accessible**: `prefers-reduced-motion` disables animations, content remains readable

---

## Scenes Development Status

| Scene | HTML | CSS | SVG | JS/GSAP | i18n |
|-------|------|-----|-----|---------|------|
| 01 Hero | ✅ | ✅ | ✅ | ✅ | ✅ |
| 02 House Italy | ✅ | ✅ | ✅ | ✅ | ✅ |
| 03 Phone Break | ✅ | ✅ | ✅ | ✅ | ✅ |
| 04 Electronics | ✅ | ✅ | ✅ | ✅ | ✅ |
| 05 Drone Build | ✅ | ✅ | ✅ | ✅ | ✅ |
| 06 Drone Guide | ✅ | ✅ | ✅ | ✅ | ✅ |
| 07 Code Door | ✅ | ✅ | — | ✅ | ✅ |
| 08 Brain Robot | ✅ | ✅ | ✅ | ✅ | ✅ |
| 09 AI Skills | ✅ | ✅ | — | ✅ | ✅ |
| 10 Bedroom | ✅ | ✅ | ✅ | ✅ | ✅ |
| 11 Footer | ✅ | ✅ | — | ✅ | ✅ |

> **Note:** All 11 scenes have HTML structure, CSS, JS/GSAP animations and i18n keys.
> SVGs marked "—" use HTML/CSS layouts instead of SVG illustrations.
> DrawSVG plugin requires GSAP Club license — some trace animations will need the plugin or a fallback.

---

## Browser Support

- Chrome 90+ ✅
- Firefox 90+ ✅
- Safari 15+ ✅
- Edge 90+ ✅
- Mobile Safari / Chrome ✅

---

## Performance Targets

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Bundle: < 500KB (excluding CV PDFs)
- SVGs: Inline, no external requests per scene

---

## License

This is a personal portfolio. Code structure may be referenced for learning, but content (text, images, CVs) is © Pedro Dionísio.
