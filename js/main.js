import { initI18n } from './i18n.js';
import { VideoManager } from './video-manager.js';
import { ScrollController } from './scroll-controller.js';

/**
 * Update the loading screen progress bar and percentage text.
 * @param {number} loaded - number of videos loaded so far
 * @param {number} total  - total number of videos to load
 */
function updateProgress(loaded, total) {
  const pct = total > 0 ? Math.round((loaded / total) * 100) : 100;
  const bar = document.getElementById('loader-bar');
  const label = document.getElementById('loader-percent');
  const progressbar = document.getElementById('loader-progressbar');

  if (bar) bar.style.width = `${pct}%`;
  if (label) label.textContent = `${pct}%`;
  if (progressbar) progressbar.setAttribute('aria-valuenow', String(pct));
}

/**
 * Hide and remove the loading screen with a fade-out transition.
 */
function hideLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  screen.classList.add('is-hidden');
  screen.addEventListener(
    'transitionend',
    () => screen.remove(),
    { once: true }
  );
}

/**
 * Boot sequence:
 * 1. Load i18n translations
 * 2. Preload all videos (scroll is locked during this)
 * 3. Hide loading screen
 * 4. Enable scroll + initialise ScrollController
 */
async function boot() {
  try {
    // 1. Apply translations (fast — local JSON fetch)
    await initI18n();

    // 2. Collect and preload all section videos
    const videoManager = new VideoManager();
    videoManager.collect();

    await videoManager.preload(updateProgress);

    // 3. Unlock scroll and remove loading screen
    hideLoadingScreen();
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');

    // 4. Start scroll + video coordination
    const scrollContainer = document.getElementById('scroll-container');
    if (scrollContainer) {
      const scrollController = new ScrollController(videoManager, scrollContainer);
      scrollController.init();
    }

  } catch (err) {
    // On unexpected error, still unblock the user
    console.error('[boot] Fatal error during initialisation:', err);
    hideLoadingScreen();
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
  }
}

// Wait for DOM + fonts before booting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => document.fonts.ready.then(boot));
} else {
  document.fonts.ready.then(boot);
}
