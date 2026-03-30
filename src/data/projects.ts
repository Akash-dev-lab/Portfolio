export interface ProjectMedia {
  type: 'video' | 'image';
  src?: string;
  mp4?: string;
  webm?: string;
  poster?: string;
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

export const projects: Project[] = [
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot',
    description: '⚡ 🚀 A scalable AI-Chatbot application with real-time messaging, AI-powered responses, and modern UI. Built with React (Frontend) + Node.js/Express (Backend) + MongoDB & Redis (Pinecone)',
    fullDescription: 'Built with React and Node.js, this platform handles thousands of products with real-time inventory updates. Features include secure payment processing via Stripe, comprehensive admin dashboard with analytics, and responsive design optimized for mobile shopping.',
    media: {
      type: 'video',
      mp4: '/assets/Chatbot%20vedio.mp4',
      poster: '/Project_images/Dark_Mode.png',
    },
    tags: [
      { label: 'React', icon: '/icons/react.svg' },
      { label: 'Node.js', icon: '/icons/nodejs.svg' },
      { label: 'MongoDB', icon: '/icons/mongodb.svg' },
      { label: 'Postman', icon: '/icons/postman.svg' },
    ],
    github: 'https://github.com/Akash-dev-lab/AI-chatbot',
    demo: 'https://ai-chatbot-qe6a.onrender.com',
    features: ['Real-time inventory', 'Secure payments', 'Admin dashboard', 'Mobile optimized'],
    featured: true,
  },
  {
    id: 'boat-redesign',
    title: 'Boat Re-Design',
    description: "A visually enhanced, responsive boAt-inspired eCommerce website. ⚡️ Smooth animations. 🔄 Seamless scrolling. 📱 Fully responsive. Designed to reflect the premium, youth-focused energy of boAt's brand. built using the modern frontend stack:",
    fullDescription: 'A React Native application with Firebase backend providing real-time messaging, photo/video sharing, and granular privacy controls. Includes push notifications, story features, and advanced content moderation.',
    media: {
      type: 'video',
      mp4: '/assets/boat%20vedio.mp4',
      poster: '/Project_images/Boat.png',
    },
    tags: [
      { label: 'React', icon: '/icons/react.svg' },
      { label: 'Tailwind', icon: '/icons/tailwind.svg' },
      { label: 'Framer', icon: '/icons/framer.svg' },
    ],
    github: 'https://github.com/Akash-dev-lab/boat-web-redevelopment',
    demo: 'https://boat-web-redevelopment.vercel.app/',
    features: ['Real-time messaging', 'Media sharing', 'Privacy controls', 'Push notifications'],
    featured: true,
  },
  {
    id: 'ai-3d-tutor',
    title: 'AI-3D Tutor',
    description: 'Built with React Three Fiber for high-performance graphics.',
    fullDescription: 'An AI-powered 3D tutor that provides personalized learning experiences to students. Built with React Three Fiber for high-performance graphics.',
    media: {
      type: 'video',
      mp4: '/assets/Landing%20Page.mp4',
      poster: '/assets/react.svg',
    },
    tags: [],
    github: 'https://github.com/Akash-dev-lab/ai-3d-tutor/',
    demo: 'https://ai-3d-tutor.vercel.app/',
    features: ['Interactive charts', 'Real-time updates', 'Custom reports', 'Data export'],
    featured: true,
  },
  {
    id: 'BizStartup',
    title: 'BizStartup',
    description: 'A modern business startup website with a clean and professional design. Built with React for high-performance graphics.',
    fullDescription: 'A modern business startup website with a clean and professional design. Built with React for high-performance graphics.',
    media: {
      type: 'video',
      mp4: '/assets/BizStartup.mp4',
      poster: '/assets/react.svg',
    },
    tags: [],
    github: 'https://github.com/Akash-dev-lab/Business-startup/',
    demo: 'https://business-startup-lac.vercel.app/',
    features: ['Interactive charts', 'Real-time updates', 'Custom reports', 'Data export'],
    featured: true,
  },
  {
    id: 'Local GYM Website',
    title: 'Local GYM Website',
    description: 'I made this website for a local gym owner. He wanted a website that was modern, responsive, and easy to navigate. He also wanted a website that was easy to update.',
    fullDescription: '',
    media: {
      type: 'video',
      mp4: '/assets/Gym.mp4',
      poster: '/assets/react.svg',
    },
    tags: [],
    github: 'https://github.com/Akash-dev-lab/Gym-Demo',
    demo: 'https://gym-demo-rust.vercel.app/',
    features: ['Interactive charts', 'Real-time updates', 'Custom reports', 'Data export'],
    featured: true,
  },
  {
    id: 'RankBoost Studio',
    title: 'RankBoost Studio',
    description: 'RankBoost Studio is a modern, AI-powered SEO analytics platform designed to help businesses optimize their online presence and improve search engine rankings. Built with Next.js and Tailwind CSS, it provides real-time insights, competitor analysis, and actionable recommendations to boost visibility and drive organic growth.',
    fullDescription: 'RankBoost Studio is a modern, AI-powered SEO analytics platform designed to help businesses optimize their online presence and improve search engine rankings. Built with Next.js and Tailwind CSS, it provides real-time insights, competitor analysis, and actionable recommendations to boost visibility and drive organic growth.',
    media: {
      type: 'video',
      mp4: '/assets/RankBoost.mp4',
      poster: '/assets/react.svg',
    },
    tags: [],
    github: 'https://github.com/Akash-dev-lab/RankBoost-Studio',
    demo: 'https://rank-boost-studio.vercel.app/',
    features: ['Interactive charts', 'Real-time updates', 'Custom reports', 'Data export'],
    featured: true,
  },
];