import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { Web3Background } from './components/features/animations/Web3Background';
import { CustomCursor } from './components/features/animations/CustomCursor';
import { IdleAnimations } from './components/features/animations/IdleAnimation';
import { ScrollStorytellingController } from './components/features/animations/ScrollStorytellingController';
import { useMobile } from './hooks/useMobile';
import { useScrollMode } from './hooks/useScrollMode';
import { ScrollToTop }
from './components/shared/ScrollToTop';

const Home = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const AllProjects = React.lazy(() => import('./pages/AllProjects').then(m => ({ default: m.AllProjects })));

export function AppContent() {
  const isMobile = useMobile();
  const {isLoaded, useNativeScroll} = useScrollMode();

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