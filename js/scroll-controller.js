/**
 * ScrollController — manages section-based scroll-snap with video coordination.
 *
 * Uses IntersectionObserver to detect which section is active (≥50% visible),
 * then tells VideoManager to play that section's video and pause all others.
 * Also provides keyboard navigation (↑/↓ arrows, Page Up/Down).
 */
export class ScrollController {
  /**
   * @param {import('./video-manager.js').VideoManager} videoManager
   * @param {HTMLElement} scrollContainer
   */
  constructor(videoManager, scrollContainer) {
    this.videoManager = videoManager;
    this.container = scrollContainer;
    this.sections = [];
    this.currentIndex = -1;
    this.observer = null;
    this._isScrolling = false;
    this._scrollTimeout = null;
  }

  init() {
    this.sections = [...this.container.querySelectorAll('.video-section')];

    this._setupIntersectionObserver();
    this._setupKeyboardNav();
    this._setupTimeline();

    // Activate the first section immediately
    if (this.sections.length > 0) {
      this._activate(0);
    }
  }

  /** IntersectionObserver: play video when section is ≥50% visible */
  _setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const section = entry.target;
            const newIndex = this.sections.indexOf(section);
            if (newIndex !== -1 && newIndex !== this.currentIndex) {
              this._activate(newIndex);
            }
          }
        });
      },
      {
        root: this.container,
        threshold: 0.5,
      }
    );

    this.sections.forEach(section => this.observer.observe(section));
  }

  /** Keyboard navigation: arrow keys and Page Up/Down */
  _setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          this._scrollToSection(this.currentIndex + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          this._scrollToSection(this.currentIndex - 1);
          break;
        case 'Home':
          e.preventDefault();
          this._scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          this._scrollToSection(this.sections.length - 1);
          break;
      }
    });
  }

  /** Timeline dot click interaction in the footer section */
  _setupTimeline() {
    document.querySelectorAll('.scene-11__timeline-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.scene-11__timeline-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  /**
   * Activate a section by index: update state + play its video.
   * @param {number} index
   */
  _activate(index) {
    if (index < 0 || index >= this.sections.length) return;

    this.currentIndex = index;
    const section = this.sections[index];
    const sectionId = section.dataset.section;

    // Pause all others, play this one
    this.videoManager.pauseAllExcept(sectionId);
    this.videoManager.play(sectionId);

    // Update ARIA
    this.sections.forEach((s, i) => {
      s.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  }

  /**
   * Scroll the container to a section by index (clamped).
   * @param {number} index
   */
  _scrollToSection(index) {
    const clamped = Math.max(0, Math.min(index, this.sections.length - 1));
    const target = this.sections[clamped];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /** Navigate to the next section */
  next() {
    this._scrollToSection(this.currentIndex + 1);
  }

  /** Navigate to the previous section */
  prev() {
    this._scrollToSection(this.currentIndex - 1);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
