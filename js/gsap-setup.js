export function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.defaults({
    markers: false, // Set to true during development
  });

  gsap.defaults({
    ease: 'power2.out',
    duration: 1,
  });

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
