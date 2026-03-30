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
      mp4: '/assets/Chatbot vedio.mp4',
      webm: '/assets/Chatbot_optimized.webm',
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
      mp4: '/assets/boat vedio.mp4',
      webm: '/assets/boat_optimized.webm',
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
    id: 'nova-marketplace',
    title: 'NOVA - Online Market Place',
    description: 'Updated Soon...',
    fullDescription: 'Next.js powered dashboard with D3.js visualizations, providing real-time data insights. Features customizable widgets, export capabilities, and responsive design for data analysis on any device.',
    media: {
      type: 'video',
      mp4: '/Project_videos/ai-chatbot.mp4',
      webm: '/Project_videos/ai-chatbot.webm',
      poster: '/Project_images/coming soon.webp',
    },
    tags: [],
    github: '#',
    demo: '#',
    features: ['Interactive charts', 'Real-time updates', 'Custom reports', 'Data export'],
    featured: true,
  },
];
