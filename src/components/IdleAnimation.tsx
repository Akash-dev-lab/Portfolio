import { useEffect, useState } from 'react';

export function IdleAnimations() {
  const [isIdle, setIsIdle] = useState(false);
  const [idleIntensity, setIdleIntensity] = useState(0);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    let intensityInterval: NodeJS.Timeout;

    const resetIdleTimer = () => {
      setIsIdle(false);
      setIdleIntensity(0);
      clearTimeout(idleTimer);
      clearInterval(intensityInterval);

      idleTimer = setTimeout(() => {
        setIsIdle(true);
        // Gradually increase idle animation intensity
        let intensity = 0;
        intensityInterval = setInterval(() => {
          intensity = Math.min(intensity + 0.1, 1);
          setIdleIntensity(intensity);
          if (intensity >= 1) clearInterval(intensityInterval);
        }, 500);
      }, 3000); // Start idle after 3 seconds of inactivity
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetIdleTimer));
    
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      clearInterval(intensityInterval);
      events.forEach(event => window.removeEventListener(event, resetIdleTimer));
    };
  }, []);

  useEffect(() => {
    if (isIdle) {
      document.body.classList.add('idle-state');
      document.body.style.setProperty('--idle-intensity', idleIntensity.toString());
    } else {
      document.body.classList.remove('idle-state');
    }
  }, [isIdle, idleIntensity]);

  return null;
}
