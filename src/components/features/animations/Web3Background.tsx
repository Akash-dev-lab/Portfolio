import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* =======================
   Particles
 ======================= */
const PARTICLE_POSITIONS = (() => {
  const count = 200;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
  }
  return pos;
})();

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const scrollRef = useRef(0);

  const { geometry, material } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(PARTICLE_POSITIONS, 3));
    
    const mat = new THREE.PointsMaterial({
      size: 0.05,
      color: "#00ffff",
      opacity: 0.6,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    
    return { geometry: geom, material: mat };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) scrollRef.current = window.scrollY / max;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.position.y = scrollRef.current * 5;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

/* =======================
   Scene
 ======================= */
function Scene() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return <Particles />;
}

/* =======================
   Export
 ======================= */
export function Web3Background() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        frameloop={active ? 'always' : 'demand'}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
