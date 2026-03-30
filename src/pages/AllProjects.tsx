import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

export function AllProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Latest projects first
  const latestProjects = useMemo(() => [...projects].reverse(), []);

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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              All <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl">
              A comprehensive list of my work, experiments, and open-source contributions.
            </p>
          </div>
          
          <div className="animate-in fade-in slide-in-from-right duration-700">
            <Button
              variant="outline"
              className="rgb-border magnetic-button group text-foreground"
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('projects');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 max-w-7xl mx-auto">
          {latestProjects.map((project: Project, index: number) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={visibleProjects.includes(index)}
              mousePos={mousePos}
              onClick={() => {}}
              layout="grid"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
