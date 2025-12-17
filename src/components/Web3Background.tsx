import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* =======================
   Tech Grid
======================= */
function TechGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollOffsetRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        if (maxScroll > 0) {
          const current = window.scrollY / maxScroll;
          scrollVelocityRef.current = Math.abs(current - lastScrollRef.current);
          lastScrollRef.current = current;
          scrollOffsetRef.current = current;
        }

        ticking = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const mat = meshRef.current.material as THREE.ShaderMaterial;

    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uScroll.value = scrollOffsetRef.current;
    mat.uniforms.uScrollVelocity.value = scrollVelocityRef.current * 10;
    mat.uniforms.uMouse.value.set(
      mouseRef.current.x,
      mouseRef.current.y
    );
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform float uScroll;
    uniform vec2 uMouse;
    uniform float uScrollVelocity;
    uniform vec3 uPrimaryColor;
    uniform vec3 uAccentColor;
    varying vec2 vUv;

    float grid(vec2 uv, float scale) {
      vec2 g = fract(uv * scale);
      float line = min(
        smoothstep(0.0, 0.02, g.x) * smoothstep(0.0, 0.02, 1.0 - g.x),
        smoothstep(0.0, 0.02, g.y) * smoothstep(0.0, 0.02, 1.0 - g.y)
      );
      return 1.0 - line;
    }

    void main() {
      vec2 uv = vUv;
      float scrollEffect = uScroll * 2.0;
      vec2 animatedUv = uv + vec2(uTime * 0.05, scrollEffect);
      float gridPattern = grid(animatedUv, 20.0);

      float dist = distance(uv, uMouse * 0.5 + 0.5);
      float mouseEffect = smoothstep(0.5, 0.0, dist) * 0.3;

      float rays = sin(uv.x * 10.0 + uTime) * cos(uv.y * 10.0 - uTime * 0.5);
      rays = pow(rays * 0.5 + 0.5, 3.0) * 0.2;

      float velocityGlow = uScrollVelocity * 0.5;

      vec3 color = mix(uPrimaryColor, uAccentColor, rays + mouseEffect + velocityGlow);
      float alpha = (gridPattern * 0.15 + rays + mouseEffect + velocityGlow * 0.3) * 0.6;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const getThemeColors = () => {
    const style = getComputedStyle(document.documentElement);

    const parse = (v: string) => v.trim().split(' ').map(Number);
    const [pl, pc, ph] = parse(style.getPropertyValue('--primary'));
    const [al, ac, ah] = parse(style.getPropertyValue('--accent'));

    const toRgb = (l: number, c: number, h: number) => {
      const r = (h * Math.PI) / 180;
      return new THREE.Vector3(
        l * 0.7 + c * Math.cos(r) * 0.3,
        l * 0.7,
        l * 0.7 + c * Math.sin(r) * 0.3
      );
    };

    return {
      primary: toRgb(pl, pc, ph),
      accent: toRgb(al, ac, ah),
    };
  };

  const colors = getThemeColors();

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uMouse: { value: new THREE.Vector2() },
          uScrollVelocity: { value: 0 },
          uPrimaryColor: { value: colors.primary },
          uAccentColor: { value: colors.accent },
        }}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* =======================
   Particles
======================= */
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const geom = useRef<THREE.BufferGeometry>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!geom.current) return;

    const count = 200;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }

    geom.current.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
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

  return (
    <points ref={ref}>
      <bufferGeometry ref={geom} />
      <pointsMaterial
        size={0.05}
        color="#00ffff"
        opacity={0.6}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* =======================
   Scene
======================= */
function Scene() {
  const { camera } = useThree();
  useEffect(() => void (camera.position.z = 5), [camera]);

  return (
    <>
      {/* <TechGrid /> */}
      <Particles />
    </>
  );
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
