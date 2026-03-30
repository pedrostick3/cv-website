import { registerScene } from '../scroll-manager.js';

export function init(container) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=250%',
      scrub: 1,
      pin: true,
    }
  });

  // Phone appears centered
  tl.from('.scene-04__phone-shell', {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
  })

  // Exploded view — layers separate
  .to('.scene-04__layer-screen', {
    y: -80,
    opacity: 0.6,
    duration: 0.8,
    ease: 'power2.out',
  })
  .to('.scene-04__layer-battery', {
    y: 60,
    x: -40,
    opacity: 0.8,
    duration: 0.8,
    ease: 'power2.out',
  }, '<0.1')
  .to('.scene-04__layer-pcb', {
    y: 0,
    scale: 1.3,
    duration: 0.8,
    ease: 'power2.out',
  }, '<0.1')
  .to('.scene-04__layer-back', {
    y: 100,
    opacity: 0.5,
    duration: 0.8,
    ease: 'power2.out',
  }, '<0.1')

  // PCB traces illuminate
  .from('.scene-04__pcb-trace', {
    drawSVG: '0%',
    duration: 0.6,
    stagger: 0.1,
    ease: 'none',
  })

  // Components highlight
  .from('.scene-04__component', {
    scale: 0,
    transformOrigin: 'center center',
    duration: 0.3,
    stagger: 0.06,
    ease: 'back.out(2)',
  })

  // Labels appear
  .from('.scene-04__component-label', {
    opacity: 0,
    x: -20,
    duration: 0.3,
    stagger: 0.05,
  }, '-=0.3')

  // Smart home connection — lines extend from PCB
  .from('.scene-04__smartline', {
    drawSVG: '0%',
    duration: 0.5,
    stagger: 0.1,
  }, '+=0.2')

  // Smart home mini-house lights up
  .from('.scene-04__smarthome', {
    scale: 0,
    transformOrigin: 'center bottom',
    duration: 0.4,
    ease: 'back.out(1.5)',
  })
  .to('.scene-04__smarthome-light', {
    opacity: 1,
    duration: 0.3,
    stagger: 0.1,
    repeat: 2,
    yoyo: true,
  })

  // Project cards appear
  .from('.scene-04__project-card', {
    opacity: 0,
    y: 30,
    duration: 0.4,
    stagger: 0.08,
  })

  // Text content
  .from('.scene-04__content-title', {
    opacity: 0,
    y: 30,
    duration: 0.5,
  }, '-=0.3')
  .from('.scene-04__tag', {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    stagger: 0.05,
  }, '-=0.2')

  // Hold
  .to({}, { duration: 0.6 })

  // Exit
  .to('.scene-04__inner', {
    y: -100,
    opacity: 0,
    duration: 0.8,
  });

  registerScene('04', tl);
}
