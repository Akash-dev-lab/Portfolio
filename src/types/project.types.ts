import type { ReactNode } from 'react';

export interface ProjectTag {
  label: string;
  icon: string;
}

export interface ProjectMedia {
  type: 'video' | 'image';
  mp4?: string;
  webm?: string;
  poster?: string;
  src?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  media: ProjectMedia;
  tags: { label: string; icon: string }[];
  github: string;
  demo: string;
  features: string[];
  featured?: boolean;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
  mousePos: { x: number; y: number };
  onClick: () => void;
  layout?: 'alternating' | 'grid';
}

export interface LazySectionProps {
  children: ReactNode;
  fallback: ReactNode;
  id?: string;
  threshold?: number;
  rootMargin?: string;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
