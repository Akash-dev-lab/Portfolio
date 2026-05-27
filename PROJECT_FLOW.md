# Project Structure and Flow

This project is a Vite + React + TypeScript portfolio website. It is mostly a static frontend: content comes from local TypeScript files and assets in `public/`, then React renders the UI in the browser.

## Project Tree

```text
Portfolio/
+-- index.html
+-- package.json
+-- vite.config.ts
+-- vercel.json
+-- tailwind.config.js
+-- postcss.config.js
+-- tsconfig*.json
+-- public/
|   +-- assets/
|   |   +-- *.mp4 project preview videos
|   |   +-- react.svg
|   +-- icons/
|   |   +-- technology icons used by project cards
|   +-- Project_images/
|   |   +-- poster images for project previews
|   +-- resume/
|       +-- AkashsResume.pdf
+-- src/
    +-- main.tsx
    +-- App.tsx
    +-- index.css
    +-- App.css
    +-- data/
    |   +-- projects.ts
    +-- lib/
    |   +-- lenis.ts
    |   +-- utils.ts
    +-- hooks/
    |   +-- useMobile.ts
    |   +-- useEditor.ts
    +-- pages/
    |   +-- Home.tsx
    |   +-- Hero.tsx
    |   +-- About.tsx
    |   +-- Projects.tsx
    |   +-- AllProjects.tsx
    +-- components/
        +-- Navigation.tsx
        +-- Footer.tsx
        +-- ProjectCard.tsx
        +-- LazyVideo.tsx
        +-- LazySection.tsx
        +-- ThemeProvider.tsx
        +-- Web3Background.tsx
        +-- CustomCursor.tsx
        +-- IdleAnimation.tsx
        +-- ScrollStorytellingController.tsx
        +-- ResumeModal.tsx
        +-- Skills.tsx
        +-- Experience.tsx
        +-- Contact.tsx
        +-- ui/
            +-- Button.tsx
            +-- input.tsx
            +-- textarea.tsx
```

## Execution Flow

```text
Browser opens site
   |
   v
index.html loads
   |
   v
<script type="module" src="/src/main.tsx">
   |
   v
src/main.tsx runs
   +-- imports global CSS and devicon styles
   +-- initializes Lenis smooth scrolling
   +-- initializes editor communication tooling
   +-- creates React Query client
   +-- mounts <App /> into #root
         |
         v
src/App.tsx runs
   +-- wraps app in <ThemeProvider>
   +-- starts <BrowserRouter>
   +-- renders global layout
   |   +-- Navigation
   |   +-- optional CustomCursor on non-mobile after load
   |   +-- optional Web3Background on non-mobile after load
   |   +-- IdleAnimations after load
   |   +-- ScrollStorytellingController after load
   |   +-- route content
   |   +-- Footer
   +-- chooses route
       +-- /          -> Home page
       +-- /projects  -> AllProjects page
```

## Route Flow

```text
/
+-- Home.tsx
    +-- Hero
    +-- LazySection -> About
    +-- LazySection -> Skills
    +-- LazySection -> Projects
    +-- LazySection -> Experience
    +-- LazySection -> Contact

/projects
+-- AllProjects.tsx
    +-- reads all projects from src/data/projects.ts
    +-- reverses them so latest appears first
    +-- calculates project stats
    +-- renders each project using ProjectCard
```

`LazySection` uses `IntersectionObserver`. A section is not loaded immediately; it shows a skeleton until the user scrolls close to it, then React lazy-loads the real section component.

## Data Flow

```text
src/data/projects.ts
   |
   v exports projects[]
Projects.tsx
   +-- reverses projects
   +-- filters featured projects
   +-- sends each project to ProjectCard
         |
         v
      ProjectCard.tsx
         +-- displays title, description, tags, features
         +-- loads preview media through LazyVideo or <img>
         +-- links to GitHub repo
         +-- links to live demo

src/data/projects.ts
   |
   v exports projects[]
AllProjects.tsx
   +-- reverses all projects
   +-- calculates total projects, featured projects, unique tech tags
   +-- sends each project to ProjectCard
```

Project images, videos, icons, and the resume are static public files:

```text
Project data references paths like:
   /assets/Chatbot%20video.mp4
   /Project_images/Dark_Mode.png
   /icons/react.svg

Browser resolves them from:
   public/assets/
   public/Project_images/
   public/icons/
```

## Theme Flow

```text
ThemeProvider.tsx
   +-- reads localStorage["portfolio-theme"]
   +-- defaults to dark
   +-- adds either .dark or .light to <html>
   +-- provides theme + toggleTheme through React context
         |
         v
Navigation.tsx
   +-- uses useTheme() to show Sun/Moon button and toggle theme
```

The visual styling is mostly controlled by `src/index.css` and Tailwind utility classes in each component.

## Scroll and Animation Flow

```text
main.tsx
   |
   v
initLenis() from src/lib/lenis.ts
   +-- creates one global Lenis instance
   +-- drives Lenis with requestAnimationFrame

App.tsx
   +-- calls getLenis()
   +-- checks for reduced-motion preference
   +-- falls back to native scroll if Lenis is unavailable/stalled
   +-- renders scroll-related components after initial delay
```

Additional interaction layers:

```text
CustomCursor.tsx
   -> custom desktop cursor effects

Web3Background.tsx
   -> animated Three.js / Web3-style background layer

IdleAnimation.tsx
   -> ambient animations after inactivity

ScrollStorytellingController.tsx
   -> watches scroll position and sections for storytelling effects

ProjectCard.tsx
   -> uses mouse position from Projects/AllProjects for tilt effects
```

## Navigation Flow

```text
Navigation.tsx
   +-- desktop nav buttons
   +-- mobile menu
   +-- theme toggle
   +-- section scroll behavior
```

When the user clicks a nav item:

```text
If already on /
   -> document.querySelector("#section").scrollIntoView()

If currently on /projects
   -> navigate("/")
   -> pass desired section in router state
   -> Home loads
   -> Navigation effect scrolls to that section
```

The "View All Projects" button in `Projects.tsx` navigates to `/projects`.

The "Back to Home" button in `AllProjects.tsx` navigates to `/`, then scrolls back to the projects section.

## Build and Deployment Flow

```text
npm run dev
   -> vite dev server
   -> serves app locally with hot reload

npm run build
   -> tsc -b
   -> vite build
   -> creates production files in dist/

npm run preview
   -> serves production build locally

Vercel deployment
   -> builds the Vite app
   -> vercel.json rewrites every route to /index.html
   -> React Router handles / and /projects in the browser
```

The `vercel.json` rewrite is important because `/projects` is a client-side route. Without the rewrite, refreshing `/projects` on Vercel could return a 404.

## High-Level Mental Model

```text
Static assets + local project data
           |
           v
React components
           |
           v
React Router chooses page
           |
           v
Theme, scroll, animation, and cursor systems wrap the page
           |
           v
Browser renders portfolio UI
```

There is no backend API in this project. The site behaves like a static frontend portfolio, with links out to GitHub, demos, social profiles, WhatsApp, and the local resume PDF.
