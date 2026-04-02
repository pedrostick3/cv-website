/**
 * VideoScrubber — maps the page scroll position to video playback time.
 *
 * All "middle" videos (between the hero loop and the footer loop) are stacked
 * inside #scrub-player. The user's scroll position within #scrub-wrapper is
 * translated to a position in the combined timeline of all middle videos.
 *
 * Scroll down  → advance video forward (next frames / next video)
 * Scroll up    → go backward (previous frames / previous video)
 *
 * Hero and footer videos are unaffected — they loop independently.
 */
export class VideoScrubber {
  /**
   * @param {HTMLElement}        wrapper          - #scrub-wrapper (tall scroll container)
   * @param {HTMLVideoElement[]} videoEls         - middle videos in playback order
   * @param {number}             pixelsPerSecond  - scroll pixels per second of video (scrub speed)
   */
  constructor(wrapper, videoEls, pixelsPerSecond = 200) {
    this.wrapper   = wrapper;
    this.videoEls  = videoEls;
    this.pps       = pixelsPerSecond;

    /** @type {Array<{el: HTMLVideoElement, startTime: number, endTime: number, duration: number}>} */
    this.timeline      = [];
    this.totalDuration = 0;
    this.activeIndex   = -1;

    this._onScroll = this._onScroll.bind(this);
    this._rafId    = null;
    this._lastSeekTime = 0;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    // Touch/mobile: cap seeks at ~10fps (100ms) to avoid overwhelming the
    // video decoder. Desktop: no extra cap beyond the rAF (up to 60fps).
    this._seekInterval  = isTouchDevice ? 100 : 0;
    // Touch/mobile: only seek if moved >2 frames; desktop: >1 frame.
    this._seekThreshold = isTouchDevice ? 0.066 : 0.033;
  }

  /**
   * Build the timeline from loaded video durations, size the wrapper, and
   * attach the scroll listener. Call after all videos have canplaythrough.
   */
  init() {
    // Build cumulative timeline
    let cumTime = 0;
    this.videoEls.forEach(el => {
      const dur = isFinite(el.duration) ? el.duration : 0;
      this.timeline.push({ el, startTime: cumTime, endTime: cumTime + dur, duration: dur });
      cumTime += dur;
    });
    this.totalDuration = cumTime;

    if (this.totalDuration === 0) {
      console.warn('[VideoScrubber] Total duration is 0 — videos may not have loaded metadata.');
      return;
    }

    // Make wrapper tall enough to hold the entire scrub scroll distance
    const scrollHeight = Math.round(this.totalDuration * this.pps);
    this.wrapper.style.height = `${scrollHeight}px`;

    // Show first frame immediately
    this._seekToTime(0);

    // Listen to scroll (passive — no preventDefault needed)
    window.addEventListener('scroll', this._onScroll, { passive: true });

    console.log(
      `[VideoScrubber] Ready — ${this.videoEls.length} videos, ` +
      `${this.totalDuration.toFixed(1)}s total, ` +
      `${scrollHeight}px scroll height`
    );
  }

  // ─── Private ──────────────────────────────────────────────────────────────

  _onScroll() {
    // rAF ensures we never seek more than once per paint frame.
    if (this._rafId) return;
    this._rafId = requestAnimationFrame(() => {
      this._rafId = null;
      // On mobile: additional hard cap so seeks never exceed ~10fps,
      // giving the video decoder time to finish before the next seek.
      if (this._seekInterval > 0) {
        const now = performance.now();
        if (now - this._lastSeekTime < this._seekInterval) return;
        this._lastSeekTime = now;
      }
      this._processScroll();
    });
  }

  _processScroll() {
    // Absolute top of the scrub wrapper relative to the document
    const wrapperTop  = this.wrapper.getBoundingClientRect().top + window.scrollY;
    const scrolled    = window.scrollY - wrapperTop;
    const maxScroll   = this.wrapper.offsetHeight - window.innerHeight;

    if (maxScroll <= 0) return;

    if (scrolled <= 0) {
      this._seekToTime(0);
      return;
    }

    if (scrolled >= maxScroll) {
      this._seekToTime(this.totalDuration - 0.001);
      return;
    }

    const targetTime = (scrolled / maxScroll) * this.totalDuration;
    this._seekToTime(targetTime);
  }

  _seekToTime(time) {
    // Find which video in the timeline this time belongs to
    let idx = this.timeline.findIndex(v => time >= v.startTime && time < v.endTime);
    if (idx === -1) idx = this.timeline.length - 1; // clamp to last

    const entry     = this.timeline[idx];
    const localTime = Math.max(0, Math.min(time - entry.startTime, entry.duration - 0.001));

    // Switch the active (visible) video if needed
    if (idx !== this.activeIndex) {
      if (this.activeIndex >= 0) {
        this.timeline[this.activeIndex].el.classList.remove('is-active');
      }
      entry.el.classList.add('is-active');
      this.activeIndex = idx;
      this._updateOverlays(idx);
    }

    // Skip if the decoder is still processing a previous seek — this prevents
    // seek queue build-up which is the main cause of jank on mobile Chrome.
    // The rAF + interval throttle above already limits frequency; this makes
    // it adaptive: on slow devices seeks are skipped until the decoder is ready.
    if (entry.el.seeking) return;

    // Only seek if the difference is meaningful (avoids micro-jitter).
    // Threshold is 0.033s on desktop (30fps), 0.066s on touch devices (15fps).
    if (Math.abs(entry.el.currentTime - localTime) > this._seekThreshold) {
      // fastSeek() is designed for scrubbing — more efficient code path in
      // browsers that support it (Chrome 90+, Safari). Falls back to currentTime.
      if (entry.el.fastSeek) {
        entry.el.fastSeek(localTime);
      } else {
        entry.el.currentTime = localTime;
      }
    }
  }

  /** Show the overlay matching the active video index, hide all others. */
  _updateOverlays(activeVideoIndex) {
    document.querySelectorAll('.scrub-overlay').forEach(el => {
      const vidIdx = parseInt(el.dataset.videoIndex, 10);
      el.hidden = vidIdx !== activeVideoIndex;
    });
  }

  destroy() {
    window.removeEventListener('scroll', this._onScroll);
  }
}
