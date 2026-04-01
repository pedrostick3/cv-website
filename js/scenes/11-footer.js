export function init(container) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Timeline interactivity
  const timelineItems = container.querySelectorAll('.scene-11__timeline-item');
  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      timelineItems.forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  if (prefersReducedMotion) return;
}
