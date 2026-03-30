import { registerScene } from '../scroll-manager.js';

export function init(container) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=300%',
      scrub: 1,
      pin: true,
    }
  });

  // Robot chest panel opens
  tl.from('.scene-09__robot-panel', {
    scaleY: 0,
    transformOrigin: 'top center',
    duration: 0.5,
    ease: 'power2.out',
  })

  // Network graph nodes appear from center
  .from('.scene-09__skill-node', {
    scale: 0,
    opacity: 0,
    transformOrigin: 'center center',
    duration: 0.3,
    stagger: {
      each: 0.04,
      from: 'center',
    },
    ease: 'back.out(2)',
  })

  // Connections draw between nodes
  .from('.scene-09__skill-edge', {
    drawSVG: '0%',
    opacity: 0,
    duration: 0.3,
    stagger: 0.03,
  }, '-=0.3')

  // PoC project cards float in as holograms
  .from('.scene-09__poc-card', {
    opacity: 0,
    y: 40,
    scale: 0.9,
    duration: 0.4,
    stagger: 0.08,
  })

  // Hologram glow effect
  .to('.scene-09__poc-card', {
    boxShadow: '0 0 20px rgba(212, 83, 126, 0.3)',
    duration: 0.3,
    stagger: 0.05,
  }, '-=0.2')

  // Tech tags appear
  .from('.scene-09__tag', {
    opacity: 0,
    scale: 0.8,
    duration: 0.2,
    stagger: 0.02,
  }, '-=0.3')

  // Hold
  .to({}, { duration: 0.8 })

  // Exit
  .to('.scene-09__inner', {
    y: -100,
    opacity: 0,
    duration: 0.8,
  });

  registerScene('09', tl);
}
