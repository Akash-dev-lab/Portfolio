import { useState, useEffect } from 'react';

const getIsMobile = () => {
  if (typeof window === "undefined") return false;

  const userAgentCheck = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const widthCheck = window.matchMedia("(max-width: 768px)").matches;

  return userAgentCheck || widthCheck;
};

export function useMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    
    const handleChange = () => {
      setIsMobile(getIsMobile());
    };

    // Modern API with backward compatibility check
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // @ts-ignore - support for older Safari/Chrome
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        // @ts-ignore - support for older Safari/Chrome
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isMobile;
}
