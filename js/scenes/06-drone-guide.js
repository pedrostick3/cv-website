import { registerScene } from '../scroll-manager.js';

export function init(container) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=150%',
      scrub: 1,
      pin: true,
    }
  });

  // Drone enters from top
  tl.from('.scene-06__drone', {
    y: -300,
    scale: 0.3,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  })

  // Drone settles into guide position (right side)
  .to('.scene-06__drone', {
    x: 250,
    y: 0,
    scale: 0.7,
    duration: 0.6,
    ease: 'power2.inOut',
  })

  // Parallax clouds pass by
  .from('.scene-06__cloud', {
    x: 400,
    duration: 2,
    stagger: 0.3,
    ease: 'none',
  }, '<')

  // Transition text
  .from('.scene-06__content-title', {
    opacity: 0,
    y: 30,
    duration: 0.5,
  }, '-=0.8')
  .from('.scene-06__content-desc', {
    opacity: 0,
    y: 20,
    duration: 0.4,
  }, '-=0.2')

  // Code particles start appearing (transition to software world)
  .from('.scene-06__code-particle', {
    opacity: 0,
    y: 50,
    duration: 0.3,
    stagger: 0.05,
  }, '-=0.3')

  // Hold
  .to({}, { duration: 0.3 })

  // Exit
  .to('.scene-06__inner', {
    y: -80,
    opacity: 0,
    duration: 0.6,
  });

  registerScene('06', tl);
}
