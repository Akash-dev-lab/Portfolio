import { X, Download } from 'lucide-react';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Main Wrapper */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl mx-4 rounded-3xl border border-border
                   bg-background text-foreground shadow-2xl p-8 md:p-10 transition-colors duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Grid Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          <FloatingCard
            title="Frontend"
            items={[
              'React + Vite',
              'Redux Toolkit',
              'Framer Motion',
              'TailwindCSS',
              'Dark / Light Theme',
              'Image upload + preview',
            ]}
            resume="/resume/Akash_Gaur_Frontend.pdf"
          />

          <FloatingCard
            title="Backend"
            items={[
              'Node.js + Express',
              'Socket.IO (Realtime)',
              'MongoDB',
              'Redis / Pinecone',
              'JWT Authentication',
              'Gemini-2.5 AI',
            ]}
            resume="/resume/Akash_Gaur_Backend.pdf"
          />
        </div>

        {/* Tagline */}
        <div className="mt-12 text-center text-lg md:text-xl font-medium text-foreground">
          Grab me as a{' '}
          <span className="relative inline-block px-2">
            {/* Highlight Background */}
            <span
              className="absolute inset-0 bg-yellow-400 rounded-sm rotate-[-2deg]"
              aria-hidden="true"
            />
            {/* Text forced to show above the yellow */}
            <span className="relative z-10 text-black font-bold">
              Full-Stack
            </span>
          </span>{' '}
          Engineer too.
        </div>
      </div>
    </div>
  );
}

function FloatingCard({
  title,
  items,
  resume,
}: {
  title: string;
  items: string[];
  resume: string;
}) {
  return (
    <div
      className="relative rounded-2xl border border-border p-8
                 bg-card text-card-foreground shadow-sm
                 animate-float-vertical"
    >
      <h3 className="text-2xl font-bold text-primary mb-6 text-center">
        {title}
      </h3>

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={item} className="flex items-center gap-3 text-sm md:text-base">
            <span
              className="h-2 w-2 rounded-full rgb-dot shrink-0"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>

      {/* Download Button */}
      <a
        href={resume}
        download
        className="group absolute -bottom-6 left-1/2 -translate-x-1/2
                   h-12 w-12 rounded-full border border-primary/40
                   bg-background flex items-center justify-center
                   transition-all duration-300 shadow-lg
                   hover:scale-110 hover:border-primary hover:bg-primary/5"
        aria-label={`Download ${title} Resume`}
      >
        <Download
          size={20}
          className="text-primary group-hover:rotate-[-8deg] transition"
        />
      </a>
    </div>
  );
}