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
    //
    //    Layout strategy:
    //    - #hero-section stays in DOM flow always (height: 100vh) so scrubWrapper.offsetTop
    //      is always stable. Only .hero-content opacity is toggled.
    //    - #scrub-player opacity toggled (position: sticky, no layout impact).
    //    - #footer-section is position: fixed — shown/hidden via display. It appears
    //      instantly over the full viewport with no scroll-in animation.
    const heroSection   = document.getElementById('hero-section');
    const footerSection = document.getElementById('footer-section');
    const scrubPlayer   = document.getElementById('scrub-player');
    const heroContent   = heroSection?.querySelector('.hero-content');
    const heroVid       = heroSection?.querySelector('video');

    if (heroSection && footerSection && scrubWrapper) {
      let lastZone = null;

      function updateZoneVisibility() {
        const scrollY = window.scrollY;

        // Footer detection: use clientHeight instead of innerHeight.
        // On mobile, window.innerHeight fluctuates when the browser address bar
        // appears/disappears (~60px swing), causing scrubEnd-based checks to
        // flicker the footer zone. document.documentElement.clientHeight is
        // the stable CSS viewport height and doesn't change with the address bar.
        // 100px tolerance also absorbs iOS rubber-band over-scroll.
        const docHeight = document.documentElement.scrollHeight;
        const clientH   = document.documentElement.clientHeight;
        const atBottom  = (scrollY + clientH) >= (docHeight - 100);

        let zone;
        if (scrollY < 2)   { zone = 'hero'; }
        else if (atBottom) { zone = 'footer'; }
        else               { zone = 'scrub'; }

        if (zone === lastZone) return;
        lastZone = zone;

        // Hero: show/hide the whole section via display.
        // When hidden, scrubWrapper collapses to offsetTop=0 so the sticky
        // scrub player immediately fills the viewport — instant swap.
        heroSection.style.display = (zone === 'hero') ? 'block' : 'none';
        if (zone === 'hero') heroVid?.play().catch(() => {});
        else                 heroVid?.pause();

        // Scrub player: opacity only (sticky element, no layout impact).
        if (scrubPlayer) scrubPlayer.style.opacity = (zone === 'scrub') ? '1' : '0';

        // Footer: position:fixed overlay — display toggles instantly over the full
        // viewport with no scroll-in animation regardless of scroll position.
        footerSection.style.display = (zone === 'footer') ? 'block' : 'none';
      }

      window.addEventListener('scroll', updateZoneVisibility, { passive: true });
      updateZoneVisibility();
    }

    // 6. Rotate indicator — dismiss + programmatic rotate
    const rotateEl        = document.getElementById('rotate-indicator');
    const rotateDismiss   = document.getElementById('rotate-dismiss');
    const rotateDoBtn     = document.getElementById('rotate-do');
    const rotateToggleBtn = document.getElementById('rotate-toggle');

    // "Continuar assim" — just dismiss
    if (rotateDismiss && rotateEl) {
      rotateDismiss.addEventListener('click', () => {
        rotateEl.classList.add('is-dismissed');
      });
    }

    const siteCanvas = document.getElementById('site-canvas');

    // "Uau! Rodar!" — apply CSS rotation and show persistent toggle
    function enableRotation() {
      siteCanvas?.classList.add('is-rotated');
      window.scrollTo(0, 0);
      if (rotateEl)        rotateEl.classList.add('is-dismissed');
      if (rotateToggleBtn) {
        rotateToggleBtn.hidden = false;
        rotateToggleBtn.classList.add('is-active');
      }
    }

    function disableRotation() {
      siteCanvas?.classList.remove('is-rotated');
      window.scrollTo(0, 0);
      if (rotateToggleBtn) rotateToggleBtn.classList.remove('is-active');
      // Re-show the rotate indicator (unless user had explicitly dismissed it before)
      if (rotateEl && rotateEl.classList.contains('is-dismissed')) {
        rotateEl.classList.remove('is-dismissed');
      }
    }

    if (rotateDoBtn) {
      rotateDoBtn.addEventListener('click', enableRotation);
    }

    // ── Touch remapping for sideways phone ──
    // When in CSS-rotated mode and the user holds the phone sideways,
    // their "landscape scroll" is a horizontal swipe in portrait coords.
    // Convert horizontal touch delta → vertical window.scrollBy so the
    // video scrubber still advances.
    let _rotTouchStartX = 0;
    let _rotTouchStartY = 0;
    document.addEventListener('touchstart', (e) => {
      _rotTouchStartX = e.touches[0].clientX;
      _rotTouchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!siteCanvas?.classList.contains('is-rotated')) return;

      const dx = e.touches[0].clientX - _rotTouchStartX;
      const dy = e.touches[0].clientY - _rotTouchStartY;

      // Only remap if the gesture is predominantly horizontal
      // (the user is holding the phone sideways and swiping "vertically"
      //  in landscape, which iOS sees as horizontal in portrait).
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 3) {
        // dx > 0 = swipe right in portrait = scroll up in landscape
        // dx < 0 = swipe left  in portrait = scroll down in landscape
        window.scrollBy(0, -dx);
        _rotTouchStartX = e.touches[0].clientX;
        _rotTouchStartY = e.touches[0].clientY;
        e.preventDefault(); // prevent horizontal rubber-band bounce
      }
    }, { passive: false });

    // Persistent toggle — shown on portrait mobile, stays after dismiss
    if (rotateToggleBtn) {
      // Show the button on portrait screens < 870px
      const portraitMQ   = window.matchMedia('(max-width: 869px) and (orientation: portrait)');
      const landscapeMQ  = window.matchMedia('(orientation: landscape)');

      const syncToggleVisibility = (mq) => {
        if (mq.matches) {
          rotateToggleBtn.hidden = false;
        } else if (!siteCanvas?.classList.contains('is-rotated')) {
          rotateToggleBtn.hidden = true;
        }
      };
      portraitMQ.addEventListener('change', syncToggleVisibility);
      syncToggleVisibility(portraitMQ);

      // When the phone physically rotates to landscape while CSS rotation is active,
      // the two rotations combine and break the layout — cancel the CSS rotation.
      landscapeMQ.addEventListener('change', (mq) => {
        if (mq.matches && siteCanvas?.classList.contains('is-rotated')) {
          disableRotation();
          // Don't re-show the rotate indicator — phone is already landscape
          if (rotateEl) rotateEl.classList.add('is-dismissed');
        }
      });

      rotateToggleBtn.addEventListener('click', () => {
        if (siteCanvas?.classList.contains('is-rotated')) {
          disableRotation();
        } else {
          enableRotation();
        }
      });
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
