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

  return (
    <div
      data-index={index}
      className={`project-card relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
      }`}
    >
      <div className={`grid ${layout === 'alternating' ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}>
        {/* Image/Media Side */}
        <div
          className={`relative group cursor-pointer ${isReversed ? 'md:order-2' : ''}`}
          onClick={onClick}
          style={layout === 'alternating' ? {
            transform: `perspective(1000px) rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg)`,
            transition: 'transform 0.3s ease-out',
          } : {}}
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10 hover:scale-105 transition-transform duration-500 hover:shadow-primary/30 magnetic-element">
            {project.media.type === 'video' ? (
              <LazyVideo
                mp4={project.media.mp4}
                webm={project.media.webm}
                poster={project.media.poster || ''}
                alt={`${project.title} project video preview`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <img
                src={project.media.src || project.media.mp4}
                alt={`${project.title} project showcase`}
                loading="lazy"
                decoding="async"
                width={800}
                height={450}
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

        {/* Content Side */}
        <div className={isReversed ? 'md:order-1' : ''}>
          <div className="space-y-4">
            <h3 
              className="text-3xl font-bold hover:text-primary transition-colors duration-300 cursor-pointer magnetic-element" 
              onClick={onClick}
            >
              {project.title}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-8">
              {project.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="rounded-full bg-secondary/50 backdrop-blur-sm border border-primary/10 p-2 hover:border-primary/30 hover:scale-110 transition-all duration-300 cursor-pointer magnetic-element flex items-center justify-center"
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
              <p className="rgb-border px-4 py-2 rounded-full text-sm text-muted-foreground">
                Consider Readme.md File to know more...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
