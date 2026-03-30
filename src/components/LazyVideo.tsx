import React, { useEffect, useRef, useState } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  webm?: string;
  mp4?: string;
  poster: string;
  alt: string;
  className?: string;
}

export const LazyVideo: React.FC<LazyVideoProps> = ({ webm, mp4, poster, alt, className, ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const containerElement = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '200px', // Load slightly before coming into view
      }
    );

    if (containerElement) {
      observer.observe(containerElement);
    }

    return () => {
      if (containerElement) {
        observer.unobserve(containerElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={className + " relative overflow-hidden"}>
      {isInView ? (
        <video
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={alt}
          className="w-full h-full object-cover"
          {...props}
        >
          {webm && <source src={webm} type="video/webm" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      ) : (
        <img 
          src={poster} 
          alt={alt} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
};
