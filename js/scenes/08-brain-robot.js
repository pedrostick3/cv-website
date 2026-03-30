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

  // Brain appears with neural pulses
  tl.from('.scene-08__brain', {
    scale: 0,
    opacity: 0,
    transformOrigin: 'center center',
    duration: 0.6,
    ease: 'back.out(1.5)',
  })
  .from('.scene-08__neural-pulse', {
    drawSVG: '0%',
    opacity: 0,
    duration: 0.4,
    stagger: 0.08,
  })

  // Drone descends with gripper
  .from('.scene-08__drone-claw', {
    y: -200,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.2')

  // Gripper closes on brain
  .to('.scene-08__claw-left', {
    rotation: 15,
    transformOrigin: 'top center',
    duration: 0.3,
  })
  .to('.scene-08__claw-right', {
    rotation: -15,
    transformOrigin: 'top center',
    duration: 0.3,
  }, '<')

  // Drone + brain fly up and across to robot
  .to('.scene-08__drone-brain-group', {
    motionPath: {
      path: [
        { x: 0, y: -100 },
        { x: 200, y: -150 },
        { x: 350, y: -50 },
      ],
      curviness: 1.5,
    },
    duration: 1.2,
    ease: 'power2.inOut',
  })

  // Robot head opens
  .to('.scene-08__robot-head-top', {
    y: -30,
    duration: 0.3,
    ease: 'power2.out',
  }, '-=0.3')

  // Brain drops in
  .to('.scene-08__brain-small', {
    y: 40,
    scale: 0.6,
    duration: 0.4,
    ease: 'bounce.out',
  })

  // Head closes
  .to('.scene-08__robot-head-top', {
    y: 0,
    duration: 0.3,
    ease: 'power2.in',
  })

  // Robot eyes activate
  .to('.scene-08__robot-eye', {
    opacity: 1,
    fill: '#D4537E',
    duration: 0.2,
    stagger: 0.1,
  })

  // Neural network propagates through body
  .from('.scene-08__body-neural', {
    drawSVG: '0%',
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
  })

  // "AI MODE ACTIVATED" text
  .from('.scene-08__activation-text', {
    opacity: 0,
    scale: 1.2,
    duration: 0.5,
    ease: 'power2.out',
  })

  // Hold
  .to({}, { duration: 0.5 })

  // Exit
  .to('.scene-08__inner', {
    y: -100,
    opacity: 0,
    duration: 0.8,
  });

  registerScene('08', tl);
}
