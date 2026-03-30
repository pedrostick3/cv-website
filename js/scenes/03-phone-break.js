import { registerScene } from '../scroll-manager.js';

export function init(container) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=180%',
      scrub: 1,
      pin: true,
    }
  });

  // Phone slides in from right
  tl.from('.scene-03__phone', {
    x: 300,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  })

  // Puck enters from left and hits phone
  .from('.scene-03__puck-incoming', {
    x: -600,
    duration: 0.4,
    ease: 'power3.in',
  }, '+=0.2')

  // Impact flash
  .to('.scene-03__impact-flash', {
    opacity: 1,
    scale: 1.5,
    duration: 0.1,
  })
  .to('.scene-03__impact-flash', {
    opacity: 0,
    scale: 2,
    duration: 0.3,
  })

  // Screen cracks — shards fly out
  .to('.scene-03__screen-intact', {
    opacity: 0,
    duration: 0.1,
  }, '-=0.3')
  .from('.scene-03__shard', {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    duration: 0.01,
  })
  .to('.scene-03__shard', {
    x: 'random(-200, 200)',
    y: 'random(-150, 300)',
    rotation: 'random(-180, 180)',
    scale: 'random(0.3, 0.8)',
    opacity: 0,
    duration: 0.8,
    stagger: 0.03,
    ease: 'power2.out',
  })

  // Glitch effect on phone body
  .to('.scene-03__phone-body', {
    skewX: 3,
    duration: 0.05,
    yoyo: true,
    repeat: 5,
  }, '-=0.6')

  // Text content
  .from('.scene-03__content-title', {
    opacity: 0,
    y: 30,
    duration: 0.5,
  })
  .from('.scene-03__content-desc', {
    opacity: 0,
    y: 20,
    duration: 0.4,
  }, '-=0.2')
  .from('.scene-03__tag', {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    stagger: 0.05,
  }, '-=0.2')

  // Hold
  .to({}, { duration: 0.4 })

  // Exit
  .to('.scene-03__inner', {
    y: -100,
    opacity: 0,
    duration: 0.8,
  });

  registerScene('03', tl);
}
