# Web3 Inspired Interactive Portfolio Experience

## Overview
A single-page Web3-inspired interactive portfolio website featuring immersive 3D visuals, scroll-driven storytelling, and maximum user engagement through advanced interactivity. Built with React Three Fiber for 3D experiences while maintaining professional portfolio functionality.

## Visual Design & Theming
- Dual theme system: Dark mode (black/graphite backgrounds) and Light mode (clean white/light backgrounds)
- Web3-inspired neon accent colors with bloom/glow effects
- 3D scenes adapt colors based on current theme
- Modern, clean typography with interactive elements
- Fully responsive design (desktop, tablet, mobile)
- Smooth animated transitions between light and dark themes

## Enhanced Global Interactivity System
- Custom cursor with dynamic glow effects that adapt to hovered elements
- Global cursor-reactive interactions with magnetic hover effects on all interactive elements
- Subtle parallax effects tied to mouse movement across all sections
- Cursor magnetism with attraction zones around buttons and interactive elements
- Performance-safe engagement hooks using requestIdleCallback
- Reduced motion fallback for accessibility compliance

## 3D Graphics & Animation System
- React Three Fiber integration for all 3D scenes and objects
- Full-page 3D background layer with shader-based tech grid/energy rays/data streams
- 3D background reacts to scroll position, cursor movement, and scroll velocity
- Clickable 3D elements in Hero and Projects sections with animation responses
- Camera shifts and visual feedback on 3D element interactions
- Performance optimizations: lazy loading of 3D assets, adaptive DPR, pause animations when tab inactive
- Framer Motion animations on 2D components (entrance animations, hover effects, transitions)
- GSAP with ScrollTrigger for scroll-based animations and camera movements
- Lenis smooth scrolling integrated with GSAP ScrollTrigger and Three.js scenes

## Critical Scroll System Requirements - Fully Normalized Native Scrolling
- Single Lenis instance initialization in **non-locking mode** with proper requestAnimationFrame loop and immediate cleanup on unmount
- Lenis configuration must **never** use preventDefault, scroll hijacking, or block native scroll events
- All Three.js/WebGL canvas layers must use `pointer-events: none` at wrapper level to prevent scroll blocking
- Web3Background and TechRaysBackground components must not intercept pointer events
- **Absolutely no** scroll-lock logic, wheel event preventDefault, or custom scroll controllers that block default scrolling
- Body/html overflow must be set to allow vertical scrolling: `overflow-y: auto` and `height: auto`
- Root container (#root) must use `height: auto` and `overflow-y: auto`
- **Remove all global** `overflow: hidden`, `position: fixed`, or height constraints that block scrolling
- **Disable any** custom scroll-snapping, scroll-storytelling locks, or section pinning that requires dragging
- Scroll functionality must work immediately on page load without requiring user interaction
- **Hard fallback system**: if Lenis fails or stalls, immediately revert to pure native browser scrolling
- ScrollStorytellingController must not hijack scroll events or lock page height
- Verified scroll compatibility across **all input methods**: mouse wheel, trackpad, touch, scrollbar dragging, and keyboard (PageDown/Space)
- No "click then scroll" behavior - scrolling must work immediately upon page load
- Smooth scrolling experience without blocking or delays across all devices and input methods

## Scroll-Based Storytelling System
- Section-to-section transitions using GSAP timelines without blocking scroll
- Camera movement synchronized with scroll progress using non-blocking scroll listeners
- Background morphing effects between sections
- Color shifts and lighting changes tied to scroll position
- Reactive lighting system that responds to scroll velocity
- Smooth perspective shifts for immersive storytelling experience

## Ambient Engagement Elements
- Idle animations that activate after periods of inactivity
- Subtle background motion changes during idle states
- Reactive lighting system tied to user interaction patterns
- Ambient particle systems that respond to user presence
- Dynamic background intensity based on engagement level

## Global Features
- Light/Dark mode toggle in navigation bar with 3D scene color adaptation
- Theme preference persistence in local storage
- Animated theme transitions across all sections and 3D scenes
- Consistent 3D background layer across entire site with optimal performance
- Performance monitoring and adaptive quality settings

## Page Sections

### Hero Section - 3D Web3 Landing Scene
- Immersive 3D scene with rotating abstract geometry and clickable elements
- Interactive 3D objects that respond to clicks with animations and camera shifts
- Neon edges and bloom/glow effects
- Professional introduction with animated typography
- 3D animations synchronized with GSAP and Framer Motion timelines
- Cursor-reactive elements with magnetic attraction effects

### About Section
- Personal introduction and background
- 3D floating elements with cursor-reactive interactions
- Interactive particles that respond to mouse movement
- Smooth entrance animations with depth effects and parallax

### Skills Section
- Interactive 3D floating technology objects with enhanced hover magnetism
- Clickable skill objects with 3D tilt animations and visual feedback
- Progressive reveal animations using camera movements
- Cursor-reactive hover effects with attraction zones
- Responsive grid layout with 3D depth and parallax effects

### Projects Section - Interactive Exploration System
- Portfolio project showcase with interactive 3D presentation cards
- Expand-in-place project cards with 3D tilt effects on hover
- Live preview functionality within expanded cards
- Smooth return animations without page navigation
- Clickable 3D elements with camera shifts and visual feedback
- Scroll-triggered camera movements for project reveals
- Enhanced hover animations with depth, perspective, and magnetism

### Experience Section
- Professional experience timeline with interactive 3D elements
- Animated content reveals with camera movements and depth fades
- Interactive timeline navigation with cursor-reactive elements
- Parallax effects tied to mouse movement

### Contact Section
- Contact information and form with enhanced 3D interactive elements
- Magnetic button effects with cursor attraction zones
- Professional call-to-action with Web3-inspired visual effects
- Cursor-reactive form elements with glow effects

## Technical Requirements
- Built with React and TypeScript (.tsx files)
- React Three Fiber for 3D graphics and interactive scenes
- Tailwind CSS for styling and layout
- Framer Motion for 2D component animations
- GSAP with ScrollTrigger for scroll animations and camera control
- Lenis for smooth scrolling with proper initialization, RAF loop, immediate cleanup, and **non-locking configuration**
- Three.js shaders for background effects and visual enhancements
- Custom cursor implementation with global state management
- Performance optimization with requestIdleCallback and reduced motion support
- Local storage for theme persistence
- Performance optimization techniques for 3D rendering
- All content in English
- No backend data persistence required - static portfolio content
- No React Query dependency - remove all React Query imports and usage since this is a static portfolio
- Clean main.tsx initialization without unused package imports
- Ensure proper Vite build configuration for all dependencies
- Critical: Ensure immediate scroll functionality without user interaction requirements and native scroll behavior preservation
