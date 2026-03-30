import React, { Suspense, useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  fallback, 
  threshold = 0.1, 
  rootMargin = '400px' 
}) => {
  const [hasVisited, setHasVisited] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasVisited(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={containerRef}>
      {hasVisited ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

export const SectionSkeleton = ({ height }: { height: string }) => (
  <div style={{ height }} className="w-full bg-secondary/10 animate-pulse rounded-3xl" />
);
