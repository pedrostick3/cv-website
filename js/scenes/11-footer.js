import { registerScene } from '../scroll-manager.js';

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

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
    }
  });

  // Photo and info
  tl.from('.scene-11__photo', {
    opacity: 0,
    scale: 0.9,
    duration: 0.5,
  })
  .from('.scene-11__info', {
    opacity: 0,
    y: 30,
    duration: 0.5,
  }, '-=0.3')

  // Download buttons
  .from('.scene-11__download-btn', {
    opacity: 0,
    y: 20,
    duration: 0.3,
    stagger: 0.08,
  }, '-=0.2')

  // Timeline nodes
  .from('.scene-11__timeline-item', {
    opacity: 0,
    y: 20,
    duration: 0.3,
    stagger: 0.05,
  }, '-=0.2')

  // Contact form
  .from('.scene-11__contact', {
    opacity: 0,
    y: 30,
    duration: 0.5,
  }, '-=0.2');

  registerScene('11', tl);
}
