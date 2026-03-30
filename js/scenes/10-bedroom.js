import { registerScene } from '../scroll-manager.js';

export function init(container) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=200%',
      scrub: 1,
      pin: true,
    }
  });

  // Room fades in
  tl.from('.scene-10__room', {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: 'power2.out',
  })

  // Objects appear one by one
  .from('.scene-10__object', {
    opacity: 0,
    y: 20,
    duration: 0.3,
    stagger: 0.08,
  })

  // Monitor screens start scrolling code
  .to('.scene-10__monitor-code', {
    y: -200,
    duration: 3,
    ease: 'none',
    repeat: -1,
  }, '-=0.5')

  // Day/night cycle on window
  .to('.scene-10__window-sky', {
    background: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 100%)',
    duration: 2,
    yoyo: true,
    repeat: -1,
  })

  // Hold
  .to({}, { duration: 1 })

  // Exit
  .to('.scene-10__inner', {
    y: -60,
    opacity: 0,
    duration: 0.6,
  });

  registerScene('10', tl);
}
