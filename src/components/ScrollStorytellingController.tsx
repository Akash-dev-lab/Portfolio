import { useEffect, useRef } from 'react';

export function ScrollStorytellingController() {
  const hasInitialized = useRef(false);

  useEffect(() => {
    // ✅ FIX: disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // ✅ FIX: always start from top on reload
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

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

      document.documentElement.style.setProperty(
        '--scroll-velocity',
        Math.min(scrollVelocity * 2, 1).toString()
      );

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const windowHeight = window.innerHeight;
      const scrollPosition = currentScrollY + windowHeight / 2;

      let currentSection = 0;
      sections.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + currentScrollY;
          if (scrollPosition >= top) currentSection = index;
        }
      });

      document.documentElement.style.setProperty(
        '--scroll-section',
        currentSection.toString()
      );
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          const header = section.querySelector('h2');

          if (entry.isIntersecting) {
            section.classList.add('section-in-view');
            if (header) {
              const translateY = (1 - entry.intersectionRatio) * 30;
              header.style.transform = `translateY(-${translateY}px)`;
              header.style.willChange = 'transform';
            }
          } else {
            section.classList.remove('section-in-view');
            if (header) {
              header.style.transform = '';
              header.style.willChange = 'auto';
            }
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
