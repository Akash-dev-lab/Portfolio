import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'magnetic' | 'clickable'>('default');
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isMagnetic = target.closest('.magnetic-button, .magnetic-element');
      const isClickable = target.closest('button, a, [role="button"]');

      if (isMagnetic) {
        setCursorType('magnetic');
        setIsHovering(true);
      } else if (isClickable) {
        setCursorType('clickable');
        setIsHovering(true);
      } else {
        setCursorType('default');
        setIsHovering(false);
      }
    };

    const animate = () => {
      // Smooth cursor follow with easing
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;
      
      cursorPos.current.x += dx * 0.15;
      cursorPos.current.y += dy * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }

      if (cursorGlowRef.current) {
        // Glow follows with more lag for trailing effect
        const glowDx = mousePos.current.x - parseFloat(cursorGlowRef.current.style.left || '0');
        const glowDy = mousePos.current.y - parseFloat(cursorGlowRef.current.style.top || '0');
        
        cursorGlowRef.current.style.left = `${parseFloat(cursorGlowRef.current.style.left || '0') + glowDx * 0.08}px`;
        cursorGlowRef.current.style.top = `${parseFloat(cursorGlowRef.current.style.top || '0') + glowDy * 0.08}px`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Hide on mobile/touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Cursor glow */}
      <div
        ref={cursorGlowRef}
        className="custom-cursor-glow"
        style={{
          opacity: isHovering ? 0.6 : 0.3,
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      />
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${cursorType}`}
        style={{
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      />
    </>
  );
}
