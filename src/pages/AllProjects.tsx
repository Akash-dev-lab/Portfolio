import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { Project } from '../data/projects';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/ui/Button';

export function AllProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const latestProjects = useMemo(() => [...projects].reverse(), []);
  const featuredCount = latestProjects.filter((project) => project.featured).length;
  const techCount = new Set(
    latestProjects.flatMap((project) => project.tags.map((tag) => tag.label))
  ).size;

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
  }, []);

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
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-background pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[10%] top-40 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-[12%] left-1/3 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="section-shell mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <span className="section-kicker">All Projects</span>
              <h1 className="mt-5 text-4xl font-bold md:text-6xl">
                Full archive of
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> shipped ideas</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                A broader look at my client work, redesigns, learning builds, and experiments. Each project reflects a mix of execution, visual thinking, and problem-solving.
              </p>
            </div>

            <div className="animate-in fade-in slide-in-from-right duration-700">
              <div className="glass-panel rounded-[1.75rem] p-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Portfolio snapshot
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Projects', value: String(latestProjects.length) },
                    { label: 'Featured', value: String(featuredCount) },
                    { label: 'Tech Tags', value: String(techCount) },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-primary/10 bg-background/65 px-4 py-4 text-center">
                      <div className="text-2xl font-bold text-foreground">{item.value}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <Button
                    variant="secondary"
                    className="magnetic-button w-full rounded-full border border-primary/15 bg-background/75 text-foreground hover:border-primary/30 hover:bg-background/90"
                    onClick={() => {
                      navigate('/');
                      setTimeout(() => {
                        const element = document.getElementById('projects');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10 flex flex-wrap gap-3">
            {['Case-study style builds', 'Responsive-first UI', 'Performance-aware frontends'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-primary/12 bg-background/70 px-4 py-2 text-sm font-medium text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
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
      </div>
    </section>
  );
}
