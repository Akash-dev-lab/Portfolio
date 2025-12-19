import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'Sheryians Coding School',
    period: '2025 - Jan - Nov',
    description: '"A high-performance redesign of the boAt website developed during a competitive hackathon at Sheryians Coding School. This project showcases advanced frontend capabilities, blending GSAP and Framer Motion for cinematic animations with Lenis for smooth-scroll physics, all wrapped in a sleek, Tailwind-powered modern interface."',
    achievements: [],
  },
  {
    title: 'Frontend Developer',
    company: 'Zidio Pvt Ltd',
    period: '2024 - 3 Months',
    description: 'Created responsive and interactive user interfaces for various clients. Focused on performance optimization and accessibility.',
    achievements: [], // Achievements removed as requested
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
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
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
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-secondary/20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
            My professional journey and key accomplishments
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                data-index={index}
                className={`experience-card relative grid md:grid-cols-2 gap-8 transition-all duration-1000 ${
                  visibleCards.includes(index) ? 'opacity-100 translate-x-0' : `opacity-0 ${index % 2 === 0 ? '-translate-x-12' : 'translate-x-12'}`
                } ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-8 w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full -translate-x-1/2 shadow-lg shadow-primary/50 hidden md:block z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full animate-ping opacity-75" />
                </div>

                {/* Content */}
                <div className={index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}>
                  <div className="p-6 rounded-2xl text-left bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg hover:scale-105">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{exp.period}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>

                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Only render achievements section if there are items */}
                    {exp.achievements.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-primary">Key Achievements:</p>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement) => (
                            <li
                              key={achievement}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className={index % 2 === 0 ? 'hidden md:block' : 'hidden md:block md:col-start-1'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}