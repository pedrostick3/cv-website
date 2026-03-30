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

  // Phase 1: Map line draws PT → IT
  tl.from('.scene-02__map-line', {
    drawSVG: '0%',
    duration: 1,
    ease: 'none',
  })
  .from('.scene-02__map-dot-it', {
    scale: 0,
    transformOrigin: 'center center',
    duration: 0.3,
  })
  .from('.scene-02__map-label-it', {
    opacity: 0,
    y: 10,
    duration: 0.3,
  }, '-=0.1')

  // Phase 2: Foundation
  .from('.scene-02__house-foundation', {
    scaleY: 0,
    transformOrigin: 'bottom center',
    duration: 0.5,
    ease: 'power2.out',
  }, '+=0.2')

  // Phase 3: Walls build
  .from('.scene-02__house-wall-left', {
    scaleY: 0,
    transformOrigin: 'bottom center',
    duration: 0.6,
    ease: 'power2.out',
  })
  .from('.scene-02__house-wall-right', {
    scaleY: 0,
    transformOrigin: 'bottom center',
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.4')

  // Phase 4: Wireframe → solid
  .to('.scene-02__house-wireframe', {
    opacity: 0,
    duration: 0.6,
  })
  .from('.scene-02__house-solid', {
    opacity: 0,
    duration: 0.6,
  }, '<')

  // Phase 5: Roof
  .from('.scene-02__house-roof', {
    y: -60,
    opacity: 0,
    duration: 0.5,
    ease: 'bounce.out',
  })

  // Phase 6: Windows and door
  .from('.scene-02__house-detail', {
    scale: 0,
    transformOrigin: 'center center',
    duration: 0.3,
    stagger: 0.08,
    ease: 'back.out(2)',
  })

  // Phase 7: Text
  .from('.scene-02__content-title', {
    opacity: 0,
    y: 30,
    duration: 0.5,
  }, '-=0.2')
  .from('.scene-02__content-desc', {
    opacity: 0,
    y: 20,
    duration: 0.4,
  }, '-=0.2')
  .from('.scene-02__tag', {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    stagger: 0.05,
  }, '-=0.2')

  // Hold
  .to({}, { duration: 0.5 })

  // Exit
  .to('.scene-02__inner', {
    y: -100,
    opacity: 0,
    duration: 0.8,
  });

  registerScene('02', tl);
}
