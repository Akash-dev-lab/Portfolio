import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Code2, Cpu, Database, Globe, Zap } from 'lucide-react';
import * as THREE from 'three';

const skills = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description: 'React, Javascript, Next.js, Tailwind CSS',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Database,
    title: 'Backend Development',
    description: 'Node.js, Postman, MongoDB, RESTful APIs',
    color: 'from-green-500 to-emerald-500',
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
  { name: 'React', icon: '/icons/react.svg' },
  { name: 'JavaScript', icon: '/icons/js.svg' },
  { name: 'Node.js', icon: '/icons/nodejs.svg' },
  { name: 'MongoDB', icon: '/icons/mongodb.svg' },
  { name: 'Postman', icon: '/icons/postman.svg' },
  { name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
  { name: 'Framer Motion', icon: '/icons/framer.svg' },
  { name: 'Git', icon: '/icons/git.svg' },
  { name: 'HTML5', icon: '/icons/html.svg' },
  { name: 'CSS3', icon: '/icons/css.svg' },
];

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
          color={clicked ? '#f59e0b' : hovered ? '#7dd3fc' : '#3b82f6'}
          emissive={clicked ? '#f59e0b' : hovered ? '#7dd3fc' : '#2563eb'}
          emissiveIntensity={clicked ? 1 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function SkillsScene({ onIconClick }: { onIconClick: (index: number) => void }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />

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
    const handleMouseMove = (event: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleIconClick = () => {
    setIconClicks((prev) => prev + 1);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden bg-secondary/20 py-24 transition-colors duration-500 md:py-32"
    >
      <div className="pointer-events-auto absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }} dpr={[1, 2]} aria-label="Interactive 3D technology icons scene">
          <Suspense fallback={null}>
            <SkillsScene onIconClick={handleIconClick} />
          </Suspense>
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl transition-transform duration-300 idle-pulse"
          style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl transition-transform duration-300 idle-pulse"
          style={{ transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px)` }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="section-shell mx-auto max-w-6xl">
          <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <span className="section-kicker">Skills</span>
            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              The stack behind
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> polished products</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              A practical toolkit for shipping performant interfaces, scalable backends, and design-led product experiences.
              {iconClicks > 0 && ` ${iconClicks} 3D interactions`}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Core professional skills">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const cardMouseX = mousePos.x - (index % 3) * 300;
              const cardMouseY = mousePos.y - Math.floor(index / 3) * 300;

              return (
                <div
                  key={skill.title}
                  role="listitem"
                  aria-label={`${skill.title}: ${skill.description}`}
                  className={`magnetic-element group relative cursor-pointer rounded-[1.75rem] border border-primary/10 bg-background/70 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:border-primary/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transform: `perspective(1000px) rotateX(${cardMouseY * 0.01}deg) rotateY(${cardMouseX * 0.01}deg)`,
                  }}
                >
                  <div className={`absolute inset-0 rounded-[1.75rem] bg-gradient-to-br ${skill.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                  <div className="relative z-10">
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${skill.color} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-primary">{skill.title}</h3>

                    <p className="text-sm leading-relaxed text-muted-foreground">{skill.description}</p>

                    <div className="absolute right-4 top-4 h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`mt-16 transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="mb-8 text-center text-lg text-muted-foreground">Technologies I work with:</p>
            <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10" role="list" aria-label="Technology stack icons">
              {technologies.map((tech, index) => (
                <div
                  key={tech.name}
                  role="listitem"
                  aria-label={`${tech.name} technology`}
                  className={`magnetic-element group flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-primary/10 bg-background/70 p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:scale-110 hover:border-primary/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${(index + 6) * 80}ms` }}
                >
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <img
                      src={tech.icon}
                      alt={`${tech.name} tech icon`}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-10 w-10 object-contain transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <span className="text-center text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
