import { useEffect, useRef, useState } from 'react';
import { Hero } from './pages/Hero';
import { About } from '../src/pages/About';
import { Skills } from './components/Skills';
import { Projects } from './pages/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Web3Background } from './components/Web3Background';
import { ThemeProvider } from './components/ThemeProvider';
import { CustomCursor } from './components/CustomCursor';
import { IdleAnimations } from './components/IdleAnimation';
import { ScrollStorytellingController } from './components/ScrollStorytellingController';

function App() {
  const lenisRef = useRef<any>(null);
  const rafHandleRef = useRef<number | null>(null);
  const [useNativeScroll, setUseNativeScroll] = useState(false);
  const stallCheckRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      console.log('Reduced motion preferred, using native scroll');
      setUseNativeScroll(true);
      return;
    }

    // Initialize Lenis smooth scroll if available
    const initLenis = async () => {
      // @ts-ignore - Lenis loaded via CDN
      const Lenis = (window as any).Lenis;
      if (!Lenis) {
        console.log('Lenis not available, using native scroll');
        setUseNativeScroll(true);
        return;
      }

      try {
        const lenis = new Lenis({
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.0,
          smoothTouch: false, // Disable smooth touch to prevent mobile scroll blocking
          touchMultiplier: 1.0,
          infinite: false,
          autoResize: true,
          prevent: () => false, // Never prevent scroll events
          syncTouch: false, // Don't sync touch events
          syncTouchLerp: 0.1,
          touchInertiaMultiplier: 1,
        });

        lenisRef.current = lenis;

        // Stall detection - if scroll doesn't work for 2 seconds, fallback to native
        const checkForStall = () => {
          const currentScrollY = window.scrollY;
          if (currentScrollY === lastScrollYRef.current && currentScrollY === 0) {
            // User might be trying to scroll but nothing happens
            const timeSinceInit = Date.now();
            if (stallCheckRef.current && timeSinceInit - stallCheckRef.current > 2000) {
              console.warn('Lenis appears to be stalled, reverting to native scroll');
              if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
              }
              setUseNativeScroll(true);
            }
          } else {
            stallCheckRef.current = null; // Reset stall check
          }
          lastScrollYRef.current = currentScrollY;
        };

        stallCheckRef.current = Date.now();
        const stallCheckInterval = setInterval(checkForStall, 500);

        function raf(time: number) {
          if (lenisRef.current) {
            lenisRef.current.raf(time);
            rafHandleRef.current = requestAnimationFrame(raf);
          }
        }

        rafHandleRef.current = requestAnimationFrame(raf);
        
        console.log('Lenis smooth scroll initialized in non-locking mode');

        return () => {
          clearInterval(stallCheckInterval);
        };
      } catch (error) {
        console.error('Failed to initialize Lenis:', error);
        setUseNativeScroll(true);
      }
    };

    const cleanup = initLenis();

    return () => {
      // Cleanup RAF loop
      if (rafHandleRef.current !== null) {
        cancelAnimationFrame(rafHandleRef.current);
        rafHandleRef.current = null;
      }
      
      // Destroy Lenis instance
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      if (cleanup && typeof cleanup === 'object' && 'then' in cleanup) {
        cleanup.then((fn: any) => fn && fn());
      }
    };
  }, []);

  // Apply native scroll class if needed
  useEffect(() => {
    if (useNativeScroll) {
      document.documentElement.classList.add('native-scroll');
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    }
  }, [useNativeScroll]);

  return (
    <ThemeProvider>
      <div className="relative bg-background text-foreground transition-colors duration-500">
        <CustomCursor />
        <IdleAnimations />
        <ScrollStorytellingController />
        <Web3Background />
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
