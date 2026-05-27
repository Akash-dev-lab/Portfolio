import React from 'react';
import { Hero } from '../components/sections/Hero';
import { LazySection, SectionSkeleton } from '../components/LazySection';

const About = React.lazy(() => import('../components/sections/About').then(m => ({ default: m.About })));
const Skills = React.lazy(() => import('../components/sections/Skills').then(m => ({ default: m.Skills })));
const Projects = React.lazy(() => import('../components/sections/Projects').then(m => ({ default: m.Projects })));
const Experience = React.lazy(() => import('../components/sections/Experience').then(m => ({ default: m.Experience })));
const Contact = React.lazy(() => import('../components/sections/Contact').then(m => ({ default: m.Contact })));

export function Home() {
  return (
    <>
      <Hero />
      <LazySection id="about" fallback={<SectionSkeleton height="800px" />}><About /></LazySection>
      <LazySection id="skills" fallback={<SectionSkeleton height="600px" />}><Skills /></LazySection>
      <LazySection id="projects" fallback={<SectionSkeleton height="1200px" />}><Projects /></LazySection>
      <LazySection id="experience" fallback={<SectionSkeleton height="800px" />}><Experience /></LazySection>
      <LazySection id="contact" fallback={<SectionSkeleton height="600px" />}><Contact /></LazySection>
    </>
  );
}
