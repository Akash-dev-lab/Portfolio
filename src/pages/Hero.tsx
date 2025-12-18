import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';
import { ResumeModal } from '../components/ResumeModal'

// 3D Web3 geometry with click interaction
function Web3Geometry({ onInteraction }: { onInteraction: () => void }) {
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

    // Scale animation on click
    const targetScale = isClicked ? 1.3 : hovered ? 1.1 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

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
        >
          <icosahedronGeometry args={[1.5, 1]} />
          <MeshDistortMaterial
            color={hovered ? "#00ffff" : "#0088ff"}
            attach="material"
            distort={isClicked ? 0.8 : 0.4}
            speed={isClicked ? 4 : 2}
            roughness={0.2}
            metalness={0.8}
            emissive={isClicked ? "#00ffff" : "#0088ff"}
            emissiveIntensity={isClicked ? 1 : 0.5}
          />
        </mesh>
      </Float>

      {/* Orbiting rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}>
          <torusGeometry args={[2 + i * 0.3, 0.02, 16, 100]} />
          <meshBasicMaterial
            color={isClicked ? "#00ffff" : "#ff00ff"}
            transparent
            opacity={isClicked ? 0.6 : 0.3}
          />
        </mesh>
      ))}

      {/* Point lights for glow */}
      <pointLight
        position={[2, 2, 2]}
        intensity={isClicked ? 2 : 1}
        color="#00ffff"
      />
      <pointLight
        position={[-2, -2, -2]}
        intensity={isClicked ? 2 : 1}
        color="#ff00ff"
      />
    </group>
  );
}

export function Hero() {
  const [interactionCount, setInteractionCount] = useState(0);
  const [showResumeModal, setShowResumeModal] = useState(false);


  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGeometryInteraction = () => {
    setInteractionCount(prev => prev + 1);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <Web3Geometry onInteraction={handleGeometryInteraction} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float idle-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed idle-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float-slow idle-pulse" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm glow-primary cursor-pointer hover:scale-105 transition-transform">
              Welcome to the Web3 Experience {interactionCount > 0 && `• ${interactionCount} interactions`}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom duration-700 delay-400">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Creative Developer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-600">
            Crafting immersive digital experiences with cutting-edge 3D technology and innovative design
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom duration-700 delay-800">
            <button
              onClick={() => setShowResumeModal(true)}
              className="magnetic-button rgb-border px-8 py-4 bg-secondary/50 backdrop-blur-sm text-foreground rounded-lg font-semibold border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Download Resume
            </button>
            <button
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="magnetic-button px-8 py-4 bg-secondary/50 backdrop-blur-sm text-foreground rounded-lg font-semibold border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-muted-foreground hover:text-primary transition-colors animate-in fade-in delay-1000 magnetic-element"
      >
        <div className="animate-bounce">
          <ChevronDown size={32} />
        </div>
      </button>

      <ResumeModal
        open={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />

    </section>
  );
}
