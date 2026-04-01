/**
 * VideoManager — preloads and controls playback of all section videos.
 */
export class VideoManager {
  constructor() {
    /** @type {Map<string, HTMLVideoElement>} section id → video element */
    this.videos = new Map();
  }

  /** Collect all video elements from .video-section containers */
  collect() {
    document.querySelectorAll('.video-section[data-section]').forEach(section => {
      const id = section.dataset.section;
      const video = section.querySelector('video');
      if (video) {
        this.videos.set(id, video);
      }
    });
    console.log(`[VideoManager] Found ${this.videos.size} videos to preload`);
  }

  /**
   * Preload all videos. Calls onProgress(loaded, total) after each video is ready.
   * Resolves when all videos reach HAVE_ENOUGH_DATA (readyState >= 4) or error.
   * @param {(loaded: number, total: number) => void} onProgress
   * @returns {Promise<void>}
   */
  preload(onProgress) {
    const entries = [...this.videos.entries()];
    const total = entries.length;
    let loaded = 0;

    const promises = entries.map(([id, video]) => {
      return new Promise((resolve) => {
        // Already fully buffered
        if (video.readyState >= 4) {
          loaded++;
          onProgress(loaded, total);
          resolve();
          return;
        }

        const cleanup = () => {
          video.removeEventListener('canplaythrough', onReady);
          video.removeEventListener('error', onError);
        };

        const onReady = () => {
          cleanup();
          loaded++;
          onProgress(loaded, total);
          console.log(`[VideoManager] Ready: ${id} (${loaded}/${total})`);
          resolve();
        };

        const onError = (e) => {
          cleanup();
          loaded++;
          onProgress(loaded, total);
          console.warn(`[VideoManager] Failed to load: ${id}`, e);
          resolve(); // Don't block on failed videos
        };

        video.addEventListener('canplaythrough', onReady);
        video.addEventListener('error', onError);

        // Set to eager preload and trigger load
        video.preload = 'auto';
        video.load();
      });
    });

    return Promise.all(promises);
  }

  /**
   * Play the video for a section. Resets to start if it's not a loop.
   * @param {string} sectionId
   */
  play(sectionId) {
    const video = this.videos.get(sectionId);
    if (!video) return;

    // Restart non-loop videos from the beginning
    if (!video.loop) {
      video.currentTime = 0;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — silently ignore (video will be static)
      });
    }
  }

  /**
   * Pause the video for a section.
   * @param {string} sectionId
   */
  pause(sectionId) {
    const video = this.videos.get(sectionId);
    if (!video) return;
    video.pause();
  }

  /**
   * Pause all videos except the specified active section.
   * @param {string} activeSectionId
   */
  pauseAllExcept(activeSectionId) {
    this.videos.forEach((video, id) => {
      if (id !== activeSectionId && !video.paused) {
        video.pause();
      }
    });
  }
}
