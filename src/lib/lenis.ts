import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const initLenis = () => {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.0,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.0,
    infinite: false,
    autoResize: true,
  });

  function raf(time: number) {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  console.log('Lenis global singleton initialized');
  return lenisInstance;
};

export const getLenis = () => lenisInstance;
