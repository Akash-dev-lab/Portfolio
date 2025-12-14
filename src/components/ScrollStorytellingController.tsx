import { useEffect, useRef } from 'react';

export function ScrollStorytellingController() {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    let rafId: number | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastScrollTime;
      
      if (timeDelta > 0) {
        scrollVelocity = Math.abs(currentScrollY - lastScrollY) / timeDelta;
      }
      
      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
      
      // Update CSS variable for reactive lighting (clamped to prevent extreme values)
      const velocityValue = Math.min(scrollVelocity * 2, 1);
      document.documentElement.style.setProperty('--scroll-velocity', velocityValue.toString());
      
      // Determine which section is in view
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const windowHeight = window.innerHeight;
      const scrollPosition = currentScrollY + windowHeight / 2;
      
      let currentSection = 0;
      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + currentScrollY;
          if (scrollPosition >= elementTop) {
            currentSection = index;
          }
        }
      });
      
      document.documentElement.style.setProperty('--scroll-section', currentSection.toString());
    };

    // Throttle scroll handler for performance using RAF
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Intersection Observer for section transitions
    const observerOptions = {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '-10% 0px -10% 0px',
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target as HTMLElement;
          section.classList.add('section-in-view');
          
          // Add subtle parallax effect to headers (non-blocking)
          const header = section.querySelector('h2');
          if (header) {
            const scrollProgress = entry.intersectionRatio;
            const translateY = (1 - scrollProgress) * 30; // Reduced from 50 to 30
            header.style.transform = `translateY(-${translateY}px)`;
            header.style.willChange = 'transform';
          }
        } else {
          const section = entry.target as HTMLElement;
          section.classList.remove('section-in-view');
          
          // Reset header transform
          const header = section.querySelector('h2');
          if (header) {
            header.style.transform = '';
            header.style.willChange = 'auto';
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => sectionObserver.observe(section));

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      sectionObserver.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
