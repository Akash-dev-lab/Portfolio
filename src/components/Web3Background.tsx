import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Shader-based tech grid background
function TechGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const scrollOffsetRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    
    const handleScroll = () => {
      const currentScroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      scrollOffsetRef.current = currentScroll;
      
      // Calculate velocity
      const velocity = Math.abs(currentScroll - lastScrollRef.current);
      scrollVelocityRef.current = velocity;
      lastScrollRef.current = currentScroll;
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
    const material = meshRef.current.material as THREE.ShaderMaterial;
    
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uScroll.value = scrollOffsetRef.current;
    material.uniforms.uMouse.value.set(mousePos.x, mousePos.y);
    material.uniforms.uScrollVelocity.value = scrollVelocityRef.current * 10;
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
      vec2 grid = fract(uv * scale);
      float line = min(
        smoothstep(0.0, 0.02, grid.x) * smoothstep(0.0, 0.02, 1.0 - grid.x),
        smoothstep(0.0, 0.02, grid.y) * smoothstep(0.0, 0.02, 1.0 - grid.y)
      );
      return 1.0 - line;
    }

    void main() {
      vec2 uv = vUv;
      
      // Animated grid with scroll
      float scrollEffect = uScroll * 2.0;
      vec2 animatedUv = uv + vec2(uTime * 0.05, scrollEffect);
      float gridPattern = grid(animatedUv, 20.0);
      
      // Mouse interaction with parallax
      float dist = distance(uv, uMouse * 0.5 + 0.5);
      float mouseEffect = smoothstep(0.5, 0.0, dist) * 0.3;
      
      // Energy rays
      float rays = sin(uv.x * 10.0 + uTime) * cos(uv.y * 10.0 - uTime * 0.5) * 0.5 + 0.5;
      rays = pow(rays, 3.0) * 0.2;
      
      // Scroll velocity reactive lighting
      float velocityGlow = uScrollVelocity * 0.5;
      
      // Combine effects
      vec3 color = mix(uPrimaryColor, uAccentColor, rays + mouseEffect + velocityGlow);
      float alpha = (gridPattern * 0.15 + rays + mouseEffect + velocityGlow * 0.3) * 0.6;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  // Get theme colors from CSS variables
  const getThemeColors = () => {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    
    // Parse OKLCH values
    const primaryOKLCH = style.getPropertyValue('--primary').trim().split(' ');
    const accentOKLCH = style.getPropertyValue('--accent').trim().split(' ');
    
    // Convert OKLCH to RGB (simplified approximation)
    const oklchToRgb = (l: number, c: number, h: number) => {
      const hRad = (h * Math.PI) / 180;
      const a = c * Math.cos(hRad);
      const b = c * Math.sin(hRad);
      return new THREE.Vector3(l * 0.7 + a * 0.3, l * 0.7, l * 0.7 + b * 0.3);
    };
    
    const primary = oklchToRgb(
      parseFloat(primaryOKLCH[0]),
      parseFloat(primaryOKLCH[1]),
      parseFloat(primaryOKLCH[2])
    );
    const accent = oklchToRgb(
      parseFloat(accentOKLCH[0]),
      parseFloat(accentOKLCH[1]),
      parseFloat(accentOKLCH[2])
    );
    
    return { primary, accent };
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
          uMouse: { value: new THREE.Vector2(0, 0) },
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

// Floating particles with ambient motion
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const [isIdle, setIsIdle] = useState(false);
  const scrollOffsetRef = useRef(0);

  useEffect(() => {
    if (!geometryRef.current) return;

    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }

    geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  }, []);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 3000);
    };
    
    const handleScroll = () => {
      const currentScroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      scrollOffsetRef.current = currentScroll;
      resetIdle();
    };
    
    window.addEventListener('mousemove', resetIdle, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    resetIdle();
    
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const baseRotation = state.clock.elapsedTime * 0.05;
    const idleRotation = isIdle ? Math.sin(state.clock.elapsedTime * 0.2) * 0.1 : 0;
    
    particlesRef.current.rotation.y = baseRotation + idleRotation;
    particlesRef.current.position.y = scrollOffsetRef.current * 5;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.05}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Scene setup
function Scene() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 5;
  }, [camera]);

  return (
    <>
      <TechGrid />
      <Particles />
    </>
  );
}

export function Web3Background() {
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 web3-background-layer" 
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        frameloop={isTabActive ? 'always' : 'demand'}
        style={{ pointerEvents: 'none' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
