import { X, Download } from 'lucide-react';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Wrapper */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl mx-4 rounded-3xl border border-primary/30
                   bg-black backdrop-blur-xl p-8 md:p-10"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Frontend Card */}
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

          {/* Backend Card */}
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
        <div className="mt-10 text-center text-lg md:text-xl font-medium text-white">
          Grab me as a{' '}
          <span className="relative inline-block px-1">
            <span
              className="absolute inset-0 -z-10 bg-yellow-400/80 rounded-sm
                         rotate-[-2deg]"
            />
            <span className="text-black font-bold">Full-Stack</span>
          </span>{' '}
          Engineer too.
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Floating Card Component             */
/* ---------------------------------- */

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
      className="relative rounded-2xl border border-primary/30 p-6
                 bg-background/70 backdrop-blur-md
                 animate-float-vertical"
    >
      <h3 className="text-2xl font-bold text-primary mb-4 text-center">
        {title}
      </h3>

      <ul className="space-y-2 text-muted-foreground text-sm">
        {items.map((item,i) => (
          <li key={item} className="flex justify-center items-start gap-3">
            <span
              className="mt-1 h-2 w-2 rounded-full rgb-dot"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Download Button */}
      <a
        href={resume}
        download
        className="group absolute -bottom-5 left-1/2 -translate-x-1/2
                   h-12 w-12 rounded-full border border-primary/40
                   bg-background flex items-center justify-center
                   transition-all duration-300
                   hover:scale-110 hover:border-primary"
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
