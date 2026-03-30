const sceneTimelines = new Map();

export function registerScene(id, timeline) {
  sceneTimelines.set(id, timeline);
}

export function getSceneTimeline(id) {
  return sceneTimelines.get(id);
}

export function initScrollManager() {
  // Scene height coordination
  // Each pinned scene needs enough scroll distance for its animations
  document.querySelectorAll('.scene[data-scroll-length]').forEach(scene => {
    const length = scene.dataset.scrollLength;
    if (length) {
      scene.style.setProperty('--scroll-length', length);
    }
  });
}
