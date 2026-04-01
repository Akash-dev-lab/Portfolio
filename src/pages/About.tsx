import React, { useEffect, useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { LazyVideo } from '../components/LazyVideo';

// 3D Floating orbs
const FloatingOrbs = React.memo(() => {
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useMemo(() => new THREE.SphereGeometry(0.2, 32, 32), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.5} floatIntensity={1}>
          <mesh
            position={[Math.cos(i * 1.2) * 2, Math.sin(i * 1.2) * 2, 0]}
            geometry={geometry}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00ffff' : '#ff00ff'}
              emissive={i % 2 === 0 ? '#0088ff' : '#880088'}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
});

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <FloatingOrbs />
          </Suspense>
        </Canvas>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="section-shell mx-auto max-w-6xl">
          <div className={`mb-14 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-kicker">About</span>
            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Designing with clarity,
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> building with intent</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              I care about how products feel, how fast they load, and how easily users can trust what they are interacting with.
            </p>
          </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-primary/15 bg-background/60 shadow-soft hover:scale-[1.02] transition-transform duration-500">
              <LazyVideo
                mp4="/assets/my-ai-video.mp4"
                poster="/Project_images/coming-soon.webp"
                autoPlay
                alt="Akash God AI-powered futuristic avatar video preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <div className="absolute inset-4 rounded-[1.4rem] border border-white/10" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-background/60 px-4 py-3 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.25em] text-primary/80">Current focus</p>
                <p className="mt-2 text-lg font-semibold text-foreground">Scalable frontends with high visual polish</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-3xl border border-primary/25 bg-primary/10 -z-10 animate-float" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-[2rem] border border-accent/30 bg-accent/10 -z-10 animate-float-delayed" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className={`text-3xl font-bold transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              Product-minded development for ambitious brands and startups
            </h3>

            <p className={`text-muted-foreground text-lg leading-relaxed transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              I am a full-stack developer focused on shaping interfaces that look intentional, move smoothly, and stay maintainable long after launch. My work blends product thinking, frontend craft, and performance discipline.
            </p>

            <p className={`text-muted-foreground text-lg leading-relaxed transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              From cinematic landing pages to robust application flows, I like building experiences that feel premium for users while remaining practical for teams shipping and iterating quickly.
            </p>

            <div className={`grid grid-cols-1 gap-3 pt-1 text-sm font-medium text-foreground/80 transition-all duration-700 delay-500 sm:grid-cols-3 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {['Clear UX systems', 'Fast delivery cycles', 'Motion with restraint'].map((item) => (
                <div key={item} className="rounded-2xl border border-primary/10 bg-background/65 px-4 py-3">
                  {item}
                </div>
              ))}
            </div>

            <div className={`grid grid-cols-2 gap-4 pt-4 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[
                { label: 'Years Experience', value: '2+' },
                { label: 'Projects Completed', value: '8+' },
                { label: 'Technologies', value: '20+' },
                { label: 'Design Precision', value: 'High' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-primary/10 bg-background/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
