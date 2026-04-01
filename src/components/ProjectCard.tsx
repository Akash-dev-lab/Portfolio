import { Github, ExternalLink } from 'lucide-react';
import { Button } from './ui/Button';
import { LazyVideo } from './LazyVideo';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
  mousePos: { x: number; y: number };
  onClick: () => void;
  layout?: 'alternating' | 'grid';
}

export function ProjectCard({ project, index, isVisible, mousePos, onClick, layout = 'alternating' }: ProjectCardProps) {
  const isReversed = layout === 'alternating' && index % 2 === 1;
  const isGrid = layout === 'grid';

  return (
    <div
      data-index={index}
      className={`project-card relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
      }`}
    >
      <div className={`grid ${layout === 'alternating' ? 'md:grid-cols-2' : 'grid-cols-1'} gap-10 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}>
        {/* Image/Media Side */}
        <div
          className={`relative group cursor-pointer ${isReversed ? 'md:order-2' : ''}`}
          onClick={onClick}
          style={layout === 'alternating' ? {
            transform: `perspective(1000px) rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg)`,
            transition: 'transform 0.3s ease-out',
          } : {}}
        >
          <div className={`glass-panel magnetic-element relative overflow-hidden border border-primary/15 shadow-soft transition-transform duration-500 hover:scale-[1.02] hover:shadow-primary/10 ${isGrid ? 'rounded-[1.9rem]' : 'aspect-video rounded-[1.75rem]'}`}>
            {project.media.type === 'video' ? (
              <LazyVideo
                mp4={project.media.mp4}
                webm={project.media.webm}
                poster={project.media.poster || ''}
                alt={`${project.title} project video preview`}
                className={`${isGrid ? 'aspect-[16/10]' : 'w-full h-full'} object-cover transition-transform duration-500 group-hover:scale-110`}
              />
            ) : (
              <img
                src={project.media.src || project.media.mp4}
                alt={`${project.title} project showcase`}
                loading="lazy"
                decoding="async"
                width={800}
                height={450}
                className={`${isGrid ? 'aspect-[16/10]' : 'w-full h-full'} object-cover`}
              />
            )}

            <div className="absolute inset-0 flex items-end justify-center gap-4 bg-gradient-to-t from-background/95 via-background/25 to-transparent pb-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
          <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-[1.5rem] border border-primary/20 bg-primary/10 -z-10 transition-colors duration-300 group-hover:border-primary/35 animate-float ${isGrid ? 'opacity-70' : ''}`} />
        </div>

        {/* Content Side */}
        <div className={isReversed ? 'md:order-1' : ''}>
          <div className={`space-y-5 ${isGrid ? 'glass-panel rounded-[1.9rem] p-6' : ''}`}>
            <div className="section-kicker">
              {isGrid ? 'Project Showcase' : 'Featured Build'}
            </div>
            <h3 
              className="text-3xl font-bold hover:text-primary transition-colors duration-300 cursor-pointer magnetic-element" 
              onClick={onClick}
            >
              {project.title}
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            {isGrid && project.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-primary/12 bg-background/70 px-3 py-1 text-xs font-medium text-foreground/75"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-4 md:gap-8">
              {project.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="flex cursor-pointer items-center justify-center rounded-2xl border border-primary/10 bg-background/70 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-primary/30 magnetic-element"
                  title={tag.label}
                >
                  <img
                    src={tag.icon}
                    alt={tag.label}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                    draggable={false}
                  />
                </span>
              ))}
            </div>
            <div className="flex gap-4 pt-4">
              <p className="rounded-full border border-primary/15 bg-background/70 px-4 py-2 text-sm text-foreground/80">
                {isGrid ? 'Open the repo or live demo for a deeper walkthrough.' : 'Read the repository for implementation details and setup notes.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
