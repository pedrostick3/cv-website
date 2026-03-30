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

  // Code door { } appears
  tl.from('.scene-07__door-left', {
    x: 100,
    opacity: 0,
    duration: 0.5,
  })
  .from('.scene-07__door-right', {
    x: -100,
    opacity: 0,
    duration: 0.5,
  }, '<')

  // Doors open (rotate outward)
  .to('.scene-07__door-left', {
    x: -200,
    rotateY: -60,
    opacity: 0.3,
    duration: 0.8,
    ease: 'power2.inOut',
  }, '+=0.2')
  .to('.scene-07__door-right', {
    x: 200,
    rotateY: 60,
    opacity: 0.3,
    duration: 0.8,
    ease: 'power2.inOut',
  }, '<')

  // Matrix code rain falls
  .from('.scene-07__code-rain-col', {
    y: -600,
    opacity: 0,
    duration: 1.5,
    stagger: 0.05,
    ease: 'none',
  }, '-=0.4')

  // App grid appears with stagger
  .from('.scene-07__app-card', {
    scale: 0,
    opacity: 0,
    transformOrigin: 'center center',
    duration: 0.4,
    stagger: {
      each: 0.06,
      grid: 'auto',
      from: 'center',
    },
    ease: 'back.out(1.5)',
  }, '-=0.8')

  // Backend stack layers appear
  .from('.scene-07__stack-layer', {
    x: -80,
    opacity: 0,
    duration: 0.4,
    stagger: 0.08,
  }, '-=0.3')

  // Skill tags
  .from('.scene-07__tag', {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    stagger: 0.03,
  }, '-=0.2')

  // Hold
  .to({}, { duration: 0.8 })

  // Exit
  .to('.scene-07__inner', {
    y: -100,
    opacity: 0,
    duration: 0.8,
  });

  registerScene('07', tl);
}
