 import { useEffect, useRef, useState } from 'react';
 import { getLenis } from '../lib/lenis';


export function useScrollMode() {
    const [isLoaded, setIsLoaded] = useState(false);
  const stallCheckRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const [useNativeScroll, setUseNativeScroll] = useState(() => 
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
    // Defer non-critical JS
    const timer = setTimeout(() => setIsLoaded(true), 2000);

    const lenis = getLenis();
    if (!lenis) {
      // Defer state update to next tick to avoid cascading render warning
      setTimeout(() => setUseNativeScroll(true), 0);
      return () => clearTimeout(timer);
    }

    // Stall detection
    const checkForStall = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === lastScrollYRef.current && currentScrollY === 0) {
        const timeSinceInit = Date.now();
        if (stallCheckRef.current && timeSinceInit - stallCheckRef.current > 2000) {
          lenis.destroy();
          setUseNativeScroll(true);
        }
      } else {
        stallCheckRef.current = null;
      }
      lastScrollYRef.current = currentScrollY;
    };

    stallCheckRef.current = Date.now();
    const stallCheckInterval = setInterval(checkForStall, 500);

    return () => {
      clearInterval(stallCheckInterval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (useNativeScroll) {
      document.documentElement.classList.add('native-scroll');
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    }
  }, [useNativeScroll]);

  return { isLoaded, useNativeScroll}
}