import { X } from 'lucide-react';

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
      {/* Floating Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl mx-4 rounded-2xl border border-primary/30 bg-background/90 backdrop-blur-xl p-8 animate-float-vertical"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition"
          aria-label="Close resume modal"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-6 text-center">
          Resume Overview
        </h3>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Frontend */}
          <div className="rounded-xl border border-primary/20 p-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">
              Frontend
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>React + Vite</li>
              <li>Redux Toolkit</li>
              <li>Framer Motion</li>
              <li>TailwindCSS</li>
              <li>Dark / Light Theme</li>
              <li>Image upload + preview</li>
            </ul>
          </div>

          {/* Backend */}
          <div className="rounded-xl border border-primary/20 p-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">
              Backend
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Node.js + Express</li>
              <li>Socket.IO (Realtime)</li>
              <li>MongoDB</li>
              <li>Redis / Pinecone</li>
              <li>JWT Auth</li>
              <li>Gemini-2.5 AI</li>
            </ul>
          </div>
        </div>

        {/* Download */}
        <div className="flex justify-center mt-8">
          <a
            href="/resume/Akash_Gaur_Resume.pdf"
            download
            className="rgb-border px-6 py-3 rounded-lg font-semibold magnetic-button"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
