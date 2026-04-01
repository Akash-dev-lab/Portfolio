import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import { ArrowRight, ChevronDown, Download, Sparkles } from 'lucide-react';
import * as THREE from 'three';
import { useMobile } from '../hooks/useMobile';
import { ResumeModal } from '../components/ResumeModal';
import { Button } from '../components/ui/Button';

const Web3Geometry = React.memo(({ onInteraction }: { onInteraction: () => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;

    const targetRotationX = isClicked ? state.clock.elapsedTime * 0.5 : state.clock.elapsedTime * 0.2;
    const targetRotationY = isClicked ? state.clock.elapsedTime * 0.7 : state.clock.elapsedTime * 0.3;

    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.1;
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    const targetScale = isClicked ? 1.3 : hovered ? 1.1 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), []);
  const rings = useMemo(
    () =>
      [0, 1, 2].map((i) => ({
        geometry: new THREE.TorusGeometry(2 + i * 0.3, 0.02, 16, 100),
        rotation: [Math.PI / 2, 0, (i * Math.PI) / 3] as [number, number, number],
      })),
    []
  );
  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#ff9f43',
        transparent: true,
        opacity: 0.28,
      }),
    []
  );

  const handleClick = () => {
    setIsClicked(true);
    onInteraction();
    setTimeout(() => setIsClicked(false), 1000);
  };

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          geometry={geometry}
        >
          <MeshDistortMaterial
            color={hovered ? '#7dd3fc' : '#3b82f6'}
            attach="material"
            distort={isClicked ? 0.8 : 0.4}
            speed={isClicked ? 4 : 2}
            roughness={0.15}
            metalness={0.85}
            emissive={isClicked ? '#fbbf24' : '#2563eb'}
            emissiveIntensity={isClicked ? 0.9 : 0.35}
          />
        </mesh>
      </Float>

      {rings.map((ring, i) => (
        <mesh
          key={i}
          geometry={ring.geometry}
          material={ringMaterial}
          rotation={ring.rotation}
          onUpdate={(self) => {
            const material = self.material as THREE.MeshBasicMaterial;
            if (isClicked) {
              material.color.set('#7dd3fc');
              material.opacity = 0.55;
            } else {
              material.color.set('#ff9f43');
              material.opacity = 0.28;
            }
          }}
        />
      ))}

      <pointLight position={[2, 2, 2]} intensity={isClicked ? 2 : 1} color="#7dd3fc" />
      <pointLight position={[-2, -2, -2]} intensity={isClicked ? 2 : 1} color="#ffb347" />
    </group>
  );
});

export function Hero() {
  const [interactionCount, setInteractionCount] = useState(0);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const isMobile = useMobile();

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGeometryInteraction = () => {
    setInteractionCount((prev) => prev + 1);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-16 pt-28 md:px-6 md:pt-32"
    >
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <Web3Geometry onInteraction={handleGeometryInteraction} />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} />
            </Suspense>
          </Canvas>
        </div>
      )}

      <div className={`absolute inset-0 z-10 overflow-hidden pointer-events-none ${isMobile ? 'opacity-40' : ''}`}>
        <div className="absolute left-[10%] top-[18%] h-56 w-56 rounded-full bg-primary/15 blur-3xl animate-float idle-pulse" />
        <div className="absolute right-[12%] top-[16%] h-64 w-64 rounded-full bg-accent/15 blur-3xl animate-float-delayed idle-pulse" />
        <div className="absolute bottom-[12%] left-[28%] h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float-slow idle-pulse" />
      </div>

      <div className="container relative z-20 mx-auto max-w-6xl">
        <div className="glass-panel shadow-soft relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-6 py-10 text-center sm:px-8 md:px-12 md:py-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="pointer-events-none absolute -left-16 top-12 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />

          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <span className="section-kicker">Design Engineer</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              Available for freelance and product work
            </span>
          </div>

          <div className="mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <p className="mx-auto max-w-2xl text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
              Interactive web experiences with performance-first engineering
            </p>
          </div>

          <h1 className="font-display mb-6 text-5xl leading-[0.92] animate-in fade-in slide-in-from-bottom duration-700 delay-500 sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <span className="block text-foreground/90">Creative systems.</span>
            <span className="animate-gradient block bg-gradient-to-r from-primary via-sky-400 to-accent bg-clip-text text-transparent">
              Magnetic interfaces.
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom duration-700 delay-700 md:text-xl">
            I design and build cinematic, high-performance web products that feel premium in motion and remain clean, fast, and reliable in code.
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-bottom duration-700 delay-700">
            {['Full-stack delivery', '3D storytelling', 'Conversion-focused UI'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-primary/12 bg-background/70 px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm"
              >
                {item}
              </span>
            ))}
            {interactionCount > 0 && (
              <span className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-foreground/80">
                {interactionCount} hero interactions
              </span>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom duration-700 delay-1000 sm:flex-row">
            <Button
              size="lg"
              type="button"
              onClick={() => setShowResumeModal(true)}
              aria-label="Open resume modal"
              className="magnetic-button min-w-[220px] rounded-full bg-gradient-to-r from-primary via-sky-500 to-accent px-8 text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/35"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
            <Button
              size="lg"
              type="button"
              variant="secondary"
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="Scroll to contact section"
              className="magnetic-button min-w-[220px] rounded-full border border-primary/15 bg-background/70 px-8 text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-background/90"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToAbout}
        aria-label="Scroll down to About section"
        className="magnetic-element absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full border border-primary/15 bg-background/65 px-4 py-3 text-muted-foreground transition-colors hover:text-primary"
      >
        <div className="animate-bounce">
          <ChevronDown size={32} />
        </div>
      </button>

      <ResumeModal open={showResumeModal} onClose={() => setShowResumeModal(false)} />
    </section>
  );
}
