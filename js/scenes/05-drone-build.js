import { registerScene } from '../scroll-manager.js';

export function init(container) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=220%',
      scrub: 1,
      pin: true,
    }
  });

  // Phone emits wireless signal
  tl.from('.scene-05__phone-source', {
    opacity: 0,
    scale: 0.8,
    duration: 0.4,
  })
  .from('.scene-05__wireless-wave', {
    scale: 0,
    opacity: 0,
    transformOrigin: 'left center',
    duration: 0.4,
    stagger: 0.12,
    ease: 'power2.out',
  })

  // Robotic arm base appears
  .from('.scene-05__arm-base', {
    scaleY: 0,
    transformOrigin: 'bottom center',
    duration: 0.5,
    ease: 'power2.out',
  }, '-=0.2')

  // Arm segments articulate
  .from('.scene-05__arm-segment-1', {
    rotation: -45,
    transformOrigin: 'bottom center',
    duration: 0.6,
    ease: 'power2.out',
  })
  .from('.scene-05__arm-segment-2', {
    rotation: 30,
    transformOrigin: 'bottom left',
    duration: 0.5,
    ease: 'power2.out',
  }, '-=0.3')

  // Gripper opens
  .from('.scene-05__arm-gripper', {
    scaleX: 0.3,
    transformOrigin: 'center top',
    duration: 0.3,
  })

  // Drone body appears (arm places it)
  .from('.scene-05__drone-body', {
    opacity: 0,
    y: -30,
    duration: 0.4,
    ease: 'power2.out',
  })

  // Arms/propellers attach one by one
  .from('.scene-05__drone-arm', {
    scale: 0,
    transformOrigin: 'center center',
    duration: 0.3,
    stagger: 0.1,
    ease: 'back.out(2)',
  })

  // LEDs light up in sequence
  .to('.scene-05__drone-led', {
    opacity: 1,
    duration: 0.15,
    stagger: 0.08,
  })

  // Propellers start spinning (CSS animation triggered via class)
  .to('.scene-05__drone-propeller', {
    className: '+=spinning',
    duration: 0.01,
  })

  // Drone lifts off
  .to('.scene-05__drone-group', {
    y: -40,
    duration: 0.6,
    ease: 'power2.out',
  })

  // Text content
  .from('.scene-05__content-title', {
    opacity: 0,
    y: 30,
    duration: 0.5,
  }, '-=0.3')
  .from('.scene-05__tag', {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    stagger: 0.05,
  }, '-=0.2')

  // Hold
  .to({}, { duration: 0.4 })

  // Exit — drone flies upward (will be caught by scene 06)
  .to('.scene-05__drone-group', {
    y: -400,
    scale: 0.5,
    duration: 0.8,
    ease: 'power2.in',
  })
  .to('.scene-05__inner', {
    opacity: 0,
    duration: 0.6,
  }, '<0.2');

  registerScene('05', tl);
}
