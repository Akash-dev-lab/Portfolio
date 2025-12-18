import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { ExternalLink, Github, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import * as THREE from 'three';

const projects = [
  {
    title: 'AI Chatbot',
    description: '⚡ 🚀 A scalable AI-Chatbot application with real-time messaging, AI-powered responses, and modern UI. Built with React (Frontend) + Node.js/Express (Backend) + MongoDB & Redis (Pinecone)',
    fullDescription: 'Built with React and Node.js, this platform handles thousands of products with real-time inventory updates. Features include secure payment processing via Stripe, comprehensive admin dashboard with analytics, and responsive design optimized for mobile shopping.',
    media: {
    type: 'video',
    src: '/assets/Chatbot vedio.mp4',
    poster: '/Project_images/Dark_Mode.png', // optional fallback thumbnail
  },
    tags: [
      { label: 'React', icon: '/icons/react.svg' },
      { label: 'Node.js', icon: '/icons/nodejs.svg' },
      { label: 'MongoDB', icon: '/icons/mongodb.svg' },
      { label: 'Postman', icon: '/icons/postman.svg' },
    ],
    github: 'https://github.com/Akash-dev-lab/AI-chatbot',
    demo: 'https://ai-chatbot-qe6a.onrender.com',
    features: ['Real-time inventory', 'Secure payments', 'Admin dashboard', 'Mobile optimized'],
  },
  {
    title: 'Social Media App',
    description: 'Mobile-first social platform with real-time messaging, media sharing, and advanced privacy controls.',
    fullDescription: 'A React Native application with Firebase backend providing real-time messaging, photo/video sharing, and granular privacy controls. Includes push notifications, story features, and advanced content moderation.',
    image: '/assets/generated/project-mockup-2.dim_400x600.png',
    tags: [
      { label: 'React', icon: '/icons/react.svg' },
      { label: 'Node.js', icon: '/icons/nodejs.svg' },
      { label: 'MongoDB', icon: '/icons/mongodb.svg' },
      { label: 'Postman', icon: '/icons/postman.svg' },
    ],
    github: '#',
    demo: '#',
    features: ['Real-time messaging', 'Media sharing', 'Privacy controls', 'Push notifications'],
  },
  {
    title: 'Analytics Dashboard',
    description: 'Data visualization platform with interactive charts, real-time updates, and customizable reporting.',
    fullDescription: 'Next.js powered dashboard with D3.js visualizations, providing real-time data insights. Features customizable widgets, export capabilities, and responsive design for data analysis on any device.',
      media: {
    type: 'video',
    src: '/Project_videos/ai-chatbot.mp4',
    poster: '/Project_images/Dark_Mode.png', // optional fallback thumbnail
  },
    tags: [
      { label: 'React', icon: '/icons/react.svg' },
      { label: 'Node.js', icon: '/icons/nodejs.svg' },
      { label: 'MongoDB', icon: '/icons/mongodb.svg' },
      { label: 'Postman', icon: '/icons/postman.svg' },
    ],
    github: '#',
    demo: '#',
    features: ['Interactive charts', 'Real-time updates', 'Custom reports', 'Data export'],
  },
];

// console.log('Loaded projects:', projects[0].tags[0].label);

// 3D Project Card with click interaction
function Project3DCard({ index, isActive, onClick }: { index: number; isActive: boolean; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetRotation = isActive ? 0 : Math.sin(state.clock.elapsedTime + index) * 0.2;
    meshRef.current.rotation.y += (targetRotation - meshRef.current.rotation.y) * 0.1;

    const targetScale = isActive ? 1.2 : hovered ? 1.1 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <RoundedBox
        ref={meshRef}
        args={[1.5, 2, 0.1]}
        radius={0.05}
        position={[(index - 1) * 2.5, 0, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={isActive ? "#00ffff" : hovered ? "#0099ff" : "#0088ff"}
          emissive={isActive ? "#00ffff" : "#0044ff"}
          emissiveIntensity={isActive ? 0.8 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>
    </Float>
  );
}

// 3D Scene
function ProjectsScene({ activeProject, onProjectClick }: { activeProject: number | null; onProjectClick: (index: number) => void }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      {projects.map((_, index) => (
        <Project3DCard
          key={index}
          index={index}
          isActive={activeProject === index}
          onClick={() => onProjectClick(index)}
        />
      ))}
    </>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleProjects((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const projectCards = sectionRef.current?.querySelectorAll('.project-card');
    projectCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleProjectClick = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ProjectsScene activeProject={expandedProject} onProjectClick={handleProjectClick} />
          </Suspense>
        </Canvas>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-transform duration-300 idle-pulse"
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
        />
        <div
          className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl transition-transform duration-300 idle-pulse"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
            A selection of my recent work showcasing various technologies and design approaches
          </p>
        </div>

        <div className="space-y-24 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              data-index={index}
              className={`project-card relative transition-all duration-1000 ${visibleProjects.includes(index) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
                }`}
            >
              {/* Expanded view overlay */}
              {expandedProject === index && (
                <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
                  <div className="max-w-5xl w-full bg-card border border-primary/20 rounded-2xl p-8 shadow-2xl shadow-primary/20 animate-in zoom-in duration-500">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-3xl font-bold">{project.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpandedProject(null)}
                        className="magnetic-button"
                      >
                        <X size={24} />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full rounded-lg border border-primary/20 shadow-lg"
                        />
                      </div>

                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {project.fullDescription}
                        </p>

                        <div>
                          <h4 className="font-semibold mb-2">Key Features:</h4>
                          <ul className="space-y-2">
                            {project.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button variant="outline" className="magnetic-button" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              View Code
                            </a>
                          </Button>
                          <Button className="bg-gradient-to-r from-primary to-accent magnetic-button glow-primary" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Regular card view */}
              <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div
                  className={`relative group cursor-pointer ${index % 2 === 1 ? 'md:order-2' : ''}`}
                  onClick={() => handleProjectClick(index)}
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg)`,
                    transition: 'transform 0.3s ease-out',
                  }}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10 hover:scale-105 transition-transform duration-500 hover:shadow-primary/30 magnetic-element">
                    {/* <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    /> */}
                    {project.media?.type === 'video' ? (
  <video
    src={project.media.src}
    poster={project.media.poster}
    muted
    loop
    playsInline
    autoPlay
    preload="metadata"
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
) : (
  <img
    src={project.media?.src}
    alt={project.title}
    className="w-full h-full object-cover"
  />
)}

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 gap-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="backdrop-blur-sm magnetic-button"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="rgb-border magnetic-button"
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink className="w-4 h-4 mr-2 " />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10 group-hover:border-primary/40 transition-colors duration-300 animate-float" />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold hover:text-primary transition-colors duration-300 cursor-pointer magnetic-element" onClick={() => handleProjectClick(index)}>
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-20">
                      {project.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className="rounded-full bg-secondary/50 backdrop-blur-sm border border-primary/10 text-sm font-medium hover:border-primary/30 hover:scale-105 transition-all duration-300 cursor-pointer magnetic-element"
                        >
                          <img
                            src={tag.icon}
                            alt={tag.label}
                            className="w-8 object-contain"
                            loading="lazy"
                            draggable={false}
                          />
                          {/* {tag.label} */}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="magnetic-button rgb-border"
                        onClick={() => handleProjectClick(index)}
                      >
                        Explore Project
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
