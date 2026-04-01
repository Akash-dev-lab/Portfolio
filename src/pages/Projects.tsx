import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../data/projects';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/ui/Button';

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const featuredProjects = useMemo(() => [...projects].reverse().filter((project) => project.featured).slice(0, 3), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
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
    const handleMouseMove = (event: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
      });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="container relative z-10 mx-auto px-4">
        <div className="section-shell mx-auto max-w-6xl">
          <div className="mb-16 grid gap-6 md:grid-cols-[1.3fr_0.7fr] md:items-end">
            <div className="animate-in fade-in slide-in-from-bottom duration-700">
              <span className="section-kicker">Projects</span>
              <h2 className="mt-5 text-4xl font-bold md:text-5xl">
                Selected work with
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> strong visual taste</span>
              </h2>
            </div>
            <p className="animate-in fade-in slide-in-from-bottom text-lg leading-relaxed text-muted-foreground duration-700 md:pl-10">
              A curated set of launches, redesigns, and experiments where interaction design and frontend execution both mattered.
            </p>
          </div>

          <div className="mx-auto max-w-6xl space-y-20">
            {featuredProjects.map((project: Project, index: number) => (
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

          <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            <Button
              size="lg"
              className="magnetic-button group rounded-full border border-primary/15 bg-background/75 px-8 text-foreground shadow-lg shadow-black/5 hover:-translate-y-1 hover:border-primary/30 hover:bg-background/90"
              onClick={() => {
                navigate('/projects');
                window.scrollTo(0, 0);
              }}
            >
              View All Projects
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
