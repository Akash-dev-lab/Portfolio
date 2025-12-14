import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import { Code2, Database, Palette, Zap, Globe, Cpu } from 'lucide-react';
import * as THREE from 'three';

const skills = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description: 'React, TypeScript, Next.js, Tailwind CSS',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Database,
    title: 'Backend Development',
    description: 'Node.js, Python, Motoko, PostgreSQL',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Figma, Adobe XD, Responsive Design',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimization, Web Vitals, SEO',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Web3 & Blockchain',
    description: 'Internet Computer, Smart Contracts',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Cpu,
    title: 'DevOps & Tools',
    description: 'Git, Docker, CI/CD, Testing',
    color: 'from-red-500 to-rose-500',
  },
];

const technologies = [
  { name: 'React', icon: '/assets/generated/react-icon.dim_64x64.png' },
  { name: 'TypeScript', icon: '/assets/generated/typescript-icon.dim_64x64.png' },
  { name: 'GSAP', icon: '/assets/generated/gsap-icon.dim_64x64.png' },
  { name: 'Framer Motion', icon: '/assets/generated/framer-motion-icon.dim_64x64.png' },
  { name: 'Tailwind', icon: '/assets/generated/tailwind-icon.dim_64x64.png' },
  { name: 'Node.js', icon: '/assets/generated/nodejs-icon.dim_64x64.png' },
  { name: 'JavaScript', icon: '/assets/generated/javascript-icon.dim_64x64.png' },
  { name: 'HTML5', icon: '/assets/generated/html5-icon.dim_64x64.png' },
  { name: 'CSS3', icon: '/assets/generated/css3-icon.dim_64x64.png' },
  { name: 'Git', icon: '/assets/generated/git-icon.dim_64x64.png' },
];

// 3D Floating Tech Icon with click interaction
function FloatingTechIcon({ position, index, onClick }: { position: [number, number, number]; index: number; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + index;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + index) * 0.2;
    
    const targetScale = clicked ? 1.5 : hovered ? 1.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const handleClick = () => {
    setClicked(true);
    onClick();
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={clicked ? '#ff00ff' : hovered ? '#00ffff' : '#0088ff'}
          emissive={clicked ? '#ff00ff' : hovered ? '#00ffff' : '#0044ff'}
          emissiveIntensity={clicked ? 1 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// 3D Scene for Skills
function SkillsScene({ onIconClick }: { onIconClick: (index: number) => void }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      
      {technologies.slice(0, 6).map((_, index) => {
        const angle = (index / 6) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <FloatingTechIcon 
            key={index} 
            position={[x, 0, z]} 
            index={index}
            onClick={() => onIconClick(index)}
          />
        );
      })}
    </>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [iconClicks, setIconClicks] = useState(0);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleIconClick = (index: number) => {
    setIconClicks(prev => prev + 1);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-secondary/20 transition-colors duration-500"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <SkillsScene onIconClick={handleIconClick} />
          </Suspense>
        </Canvas>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-transform duration-300 idle-pulse"
          style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl transition-transform duration-300 idle-pulse"
          style={{ transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks
            {iconClicks > 0 && ` • ${iconClicks} 3D interactions`}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const cardMouseX = mousePos.x - (index % 3) * 300;
            const cardMouseY = mousePos.y - Math.floor(index / 3) * 300;
            
            return (
              <div
                key={skill.title}
                className={`group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-2 magnetic-element ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transform: `perspective(1000px) rotateX(${cardMouseY * 0.01}deg) rotateY(${cardMouseX * 0.01}deg)`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {skill.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech stack icons grid */}
        <div className={`mt-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-muted-foreground mb-8 text-center text-lg">Technologies I work with:</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-6 max-w-6xl mx-auto">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className={`group flex flex-col items-center gap-3 p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 hover:bg-card/50 transition-all duration-500 cursor-pointer hover:scale-110 hover:-translate-y-2 magnetic-element ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 6) * 80}ms` }}
              >
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                </div>
                <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
