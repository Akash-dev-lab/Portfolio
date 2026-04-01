import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'Sheryians Coding School',
    period: '2025 - Jan - Nov',
    description:
      'A high-performance redesign of the boAt website developed during a hackathon at Sheryians Coding School. The project blended GSAP, Framer Motion, and Lenis with a polished Tailwind interface for a cinematic browsing experience.',
  },
  {
    title: 'Frontend Developer',
    company: 'Zidio Pvt Ltd',
    period: '2024 - 3 Months',
    description:
      'Built responsive and interactive user interfaces for client work, with a strong focus on performance, implementation clarity, and better overall usability.',
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('.experience-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden bg-secondary/20 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="section-shell mx-auto max-w-5xl">
          <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom duration-700">
            <span className="section-kicker">Experience</span>
            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Building strong foundations
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> across product teams</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              My work history reflects a balance of design sensitivity, frontend execution, and shipping products that feel polished in the details.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl">
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary/20 via-accent/40 to-primary/20 md:block" />

            <div className="space-y-10" role="list" aria-label="Professional work experience timeline">
              {experiences.map((experience, index) => (
                <div
                  key={experience.title}
                  data-index={index}
                  role="listitem"
                  aria-label={`${experience.title} at ${experience.company}, ${experience.period}`}
                  className={`experience-card relative grid gap-8 transition-all duration-1000 md:grid-cols-2 ${
                    visibleCards.includes(index)
                      ? 'translate-x-0 opacity-100'
                      : index % 2 === 0
                        ? '-translate-x-12 opacity-0'
                        : 'translate-x-12 opacity-0'
                  }`}
                >
                  <div className="absolute left-1/2 top-8 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50 md:block">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-75 animate-ping" />
                  </div>

                  <div className={index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'}>
                    <div className="glass-panel rounded-[1.75rem] p-6 text-left">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-background/65 px-3 py-2 text-primary">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">{experience.period}</span>
                      </div>

                      <h3 className="text-2xl font-bold">{experience.title}</h3>

                      <div className="mb-4 mt-2 flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span className="font-medium">{experience.company}</span>
                      </div>

                      <p className="leading-relaxed text-muted-foreground">{experience.description}</p>
                    </div>
                  </div>

                  <div className={index % 2 === 0 ? 'hidden md:block' : 'hidden md:col-start-1 md:block'} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
