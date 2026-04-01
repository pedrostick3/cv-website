import { initI18n } from './i18n.js';
import { VideoScrubber } from './scroll-controller.js';

/**
 * How many pixels of scroll correspond to one second of video.
 * Increase to make scrubbing slower (more scroll per second of video).
 * Decrease to make scrubbing faster (less scroll per second of video).
 */
const PIXELS_PER_SECOND = 200;

// ─── Loading screen helpers ────────────────────────────────────────────────

function updateProgress(loaded, total) {
  const pct = total > 0 ? Math.round((loaded / total) * 100) : 100;
  const bar        = document.getElementById('loader-bar');
  const label      = document.getElementById('loader-percent');
  const progressEl = document.getElementById('loader-progressbar');
  if (bar)        bar.style.width = `${pct}%`;
  if (label)      label.textContent = `${pct}%`;
  if (progressEl) progressEl.setAttribute('aria-valuenow', String(pct));
}

function hideLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  screen.classList.add('is-hidden');
  screen.addEventListener('transitionend', () => screen.remove(), { once: true });
}

// ─── Video preload helper ──────────────────────────────────────────────────

function preloadVideo(video) {
  return new Promise(resolve => {
    if (video.readyState >= 4) { resolve(); return; }

    const cleanup = () => {
      video.removeEventListener('canplaythrough', onReady);
      video.removeEventListener('error', onError);
    };
    const onReady = () => { cleanup(); resolve(); };
    const onError = (e) => {
      cleanup();
      console.warn('[preload] Failed:', video.currentSrc, e);
      resolve(); // Don't block on error
    };

    video.addEventListener('canplaythrough', onReady);
    video.addEventListener('error', onError);
    video.preload = 'auto';
    video.load();
  });
}

// ─── Boot ──────────────────────────────────────────────────────────────────

async function boot() {
  try {
    // 1. Load translations
    await initI18n();

    // 2. Preload all videos (hero, scrub videos, footer)
    const allVideos = [...document.querySelectorAll('video')];
    const total = allVideos.length;
    let loaded = 0;

    await Promise.all(
      allVideos.map(v =>
        preloadVideo(v).then(() => {
          loaded++;
          updateProgress(loaded, total);
        })
      )
    );

    // 3. Start hero loop and footer ping-pong
    const heroVideo   = document.querySelector('#hero-section video');
    const footerVideo = document.querySelector('#footer-section video');
    heroVideo?.play().catch(() => {});

    // Footer video: ping-pong (play forward → reverse → repeat)
    if (footerVideo) {
      footerVideo.loop = false;
      let reversing = false;
      let rafId = null;
      let lastTimestamp = 0;

      footerVideo.play().catch(() => {});

      footerVideo.addEventListener('ended', () => {
        // Forward pass finished — start reversing
        reversing = true;
        lastTimestamp = 0;
        rafId = requestAnimationFrame(reverseStep);
      });

      function reverseStep(timestamp) {
        if (!reversing) return;
        if (!lastTimestamp) { lastTimestamp = timestamp; rafId = requestAnimationFrame(reverseStep); return; }

        const delta = (timestamp - lastTimestamp) / 1000; // seconds elapsed
        lastTimestamp = timestamp;
        const newTime = footerVideo.currentTime - delta; // 1× speed backward

        if (newTime <= 0) {
          // Reached the start — play forward again
          reversing = false;
          footerVideo.currentTime = 0;
          footerVideo.play().catch(() => {});
          return;
        }

        footerVideo.currentTime = newTime;
        rafId = requestAnimationFrame(reverseStep);
      }
    }

    // 4. Initialise the scrub player
    const scrubWrapper = document.getElementById('scrub-wrapper');
    const scrubVideos  = [
      ...document.querySelectorAll('#scrub-player .scrub-video'),
    ];

    if (scrubWrapper && scrubVideos.length > 0) {
      const scrubber = new VideoScrubber(scrubWrapper, scrubVideos, PIXELS_PER_SECOND);
      scrubber.init();
    }

    // 5. Instant hero↔scrub and scrub↔footer transitions
    //    Hero shows when scrollY is 0 (top of page).
    //    Footer fades in when scrolled past all scrub videos.
    //    Both use visibility/opacity so they don't collapse layout.
    const heroSection   = document.getElementById('hero-section');
    const footerSection = document.getElementById('footer-section');
    const scrubPlayer   = document.getElementById('scrub-player');

    if (heroSection && footerSection && scrubWrapper) {
      let lastZone = 'hero';

      function updateZoneVisibility() {
        const scrollY  = window.scrollY;
        // Hero occupies exactly 100vh at the top
        const heroEnd  = heroSection.offsetHeight;
        // Scrub wrapper offset + its full scroll height
        const scrubEnd = scrubWrapper.offsetTop + scrubWrapper.offsetHeight - window.innerHeight;

        let zone;
        if (scrollY < 2) {
          zone = 'hero';
        } else if (scrollY >= scrubEnd) {
          zone = 'footer';
        } else {
          zone = 'scrub';
        }

        if (zone === lastZone) return;
        lastZone = zone;

        // Hero: hide content overlay when scrolled, but keep section for layout
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) heroContent.style.opacity = (zone === 'hero') ? '1' : '0';

        // Scrub player: show only in scrub zone (and briefly at edges)
        if (scrubPlayer) scrubPlayer.style.opacity = (zone === 'hero') ? '0' : '1';

        // Footer: fade in at the bottom
        footerSection.style.opacity = (zone === 'footer') ? '1' : '0';
        footerSection.style.pointerEvents = (zone === 'footer') ? '' : 'none';
      }

      window.addEventListener('scroll', updateZoneVisibility, { passive: true });
      updateZoneVisibility();
    }

    // 6. Rotate indicator dismiss
    const rotateBtn = document.getElementById('rotate-dismiss');
    const rotateEl  = document.getElementById('rotate-indicator');
    if (rotateBtn && rotateEl) {
      rotateBtn.addEventListener('click', () => rotateEl.classList.add('is-dismissed'));
    }

    // 7. Unlock scroll and remove loading screen
    hideLoadingScreen();
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');

  } catch (err) {
    console.error('[boot] Unexpected error:', err);
    hideLoadingScreen();
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
  }
}

// Wait for DOM + fonts
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => document.fonts.ready.then(boot));
} else {
  document.fonts.ready.then(boot);
}
