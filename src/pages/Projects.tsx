import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Only show featured projects on the home page (limit to 3)
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

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
      { threshold: 0.1 }
    );

    const projectCards = sectionRef.current?.querySelectorAll('.project-card');
    projectCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [featuredProjects.length]);

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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
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
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={visibleProjects.includes(index)}
              mousePos={mousePos}
              onClick={() => {}}
              layout="alternating"
            />
          ))}
        </div>

        <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <Button
            size="lg"
            className="rgb-border magnetic-button group text-foreground"
            onClick={() => {
              navigate('/projects');
              window.scrollTo(0, 0);
            }}
          >
            View All Projects
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
