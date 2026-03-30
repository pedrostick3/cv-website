import { registerScene } from '../scroll-manager.js';

export function init(container) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === INTRO ANIMATION (plays on load, not scroll-driven) ===
  const introTl = gsap.timeline({ delay: 0.3 });

  if (!prefersReducedMotion) {
    // Stick swings in
    introTl
      .from('.scene-01__stick-group', {
        rotation: -60,
        transformOrigin: '85% 85%',
        duration: 0.6,
        ease: 'power3.out',
      })
      .to('.scene-01__stick-group', {
        rotation: 25,
        duration: 0.25,
        ease: 'power4.in',
      })
      // Puck appears on impact
      .to('.scene-01__puck-group', {
        opacity: 1,
        duration: 0.1,
      }, '-=0.05')
      // Impact particles burst
      .to('.scene-01__particle', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power2.out',
      }, '-=0.1')
      .to('.scene-01__particle', {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power2.in',
      }, '+=0.1')
      // Puck flies out
      .to('.scene-01__puck-group', {
        x: 200,
        y: -300,
        scale: 0.6,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5')
      // Stick settles
      .to('.scene-01__stick-group', {
        rotation: 5,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      }, '-=0.8');
  }

  // Text reveals (staggered)
  introTl
    .to('.scene-01__greeting', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, prefersReducedMotion ? 0 : '-=0.3')
    .from('.scene-01__greeting', {
      y: 20,
      duration: 0.6,
    }, '<')
    .to('.scene-01__name', {
      opacity: 1,
      duration: 0.8,
    }, '-=0.3')
    .from('.scene-01__name', {
      y: 30,
      duration: 0.8,
    }, '<')
    .to('.scene-01__title', {
      opacity: 1,
      duration: 0.6,
    }, '-=0.4')
    .from('.scene-01__title', {
      y: 20,
      duration: 0.6,
    }, '<')
    .to('.scene-01__motto', {
      opacity: 1,
      duration: 0.5,
    }, '-=0.2')
    .to('.scene-01__socials', {
      opacity: 1,
      duration: 0.5,
    }, '-=0.3')
    .to('.scroll-indicator', {
      opacity: 1,
      duration: 0.5,
    }, '-=0.2');

  // === SCROLL-DRIVEN EXIT ANIMATION ===
  if (!prefersReducedMotion) {
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=60%',
        scrub: 1,
      }
    });

    exitTl
      .to('.scene-01__content', {
        y: -100,
        opacity: 0,
        duration: 1,
      })
      .to('.scene-01__socials', {
        opacity: 0,
        x: -30,
        duration: 0.5,
      }, '<')
      .to('.scroll-indicator', {
        opacity: 0,
        duration: 0.3,
      }, '<')
      .to('.scene-01__stick-group', {
        y: 100,
        opacity: 0,
        duration: 1,
      }, '<0.2');

    registerScene('01', exitTl);
  }
}
