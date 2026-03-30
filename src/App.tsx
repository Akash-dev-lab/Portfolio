import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Web3Background } from './components/Web3Background';
import { ThemeProvider } from './components/ThemeProvider';
import { CustomCursor } from './components/CustomCursor';
import { IdleAnimations } from './components/IdleAnimation';
import { ScrollStorytellingController } from './components/ScrollStorytellingController';
import { getLenis } from './lib/lenis';
import { useMobile } from './hooks/useMobile';

const Home = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const AllProjects = React.lazy(() => import('./pages/AllProjects').then(m => ({ default: m.AllProjects })));

// ScrollToTop component to ensure pages start at the top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [useNativeScroll, setUseNativeScroll] = useState(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const isMobile = useMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const stallCheckRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

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

  // Apply native scroll class if needed
  useEffect(() => {
    if (useNativeScroll) {
      document.documentElement.classList.add('native-scroll');
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    }
  }, [useNativeScroll]);

  return (
    <div className={`relative bg-background text-foreground transition-colors duration-500 ${useNativeScroll ? 'scroll-smooth' : ''}`}>
      <ScrollToTop />
      {isLoaded && !isMobile && <CustomCursor />}
      {isLoaded && !isMobile && <Web3Background />}
      {isLoaded && <IdleAnimations />}
      {isLoaded && <ScrollStorytellingController />}
      
      <header>
        <Navigation />
      </header>

      <main>
        <React.Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjects />} />
          </Routes>
        </React.Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
