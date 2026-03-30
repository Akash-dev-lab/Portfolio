import React from 'react';
import { Hero } from './Hero';
import { LazySection, SectionSkeleton } from '../components/LazySection';

const About = React.lazy(() => import('./About').then(m => ({ default: m.About })));
const Skills = React.lazy(() => import('../components/Skills').then(m => ({ default: m.Skills })));
const Projects = React.lazy(() => import('./Projects').then(m => ({ default: m.Projects })));
const Experience = React.lazy(() => import('../components/Experience').then(m => ({ default: m.Experience })));
const Contact = React.lazy(() => import('../components/Contact').then(m => ({ default: m.Contact })));

export function Home() {
  return (
    <>
      <Hero />
      <LazySection fallback={<SectionSkeleton height="800px" />}><About /></LazySection>
      <LazySection fallback={<SectionSkeleton height="600px" />}><Skills /></LazySection>
      <LazySection fallback={<SectionSkeleton height="1200px" />}><Projects /></LazySection>
      <LazySection fallback={<SectionSkeleton height="800px" />}><Experience /></LazySection>
      <LazySection fallback={<SectionSkeleton height="600px" />}><Contact /></LazySection>
    </>
  );
}
