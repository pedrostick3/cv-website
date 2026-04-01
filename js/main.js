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

    // 5. Timeline dot interaction (footer)
    document.querySelectorAll('.scene-11__timeline-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.scene-11__timeline-item')
          .forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });

    // 6. Unlock scroll and remove loading screen
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
