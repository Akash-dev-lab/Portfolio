import { Heart } from 'lucide-react';
import { SiGithub, SiLinkedin, SiWhatsapp, SiX } from 'react-icons/si';

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-4 pb-10 pt-6 md:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="glass-panel relative z-10 mx-auto max-w-6xl rounded-[2rem] px-6 py-12 md:px-10">
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom duration-1000">
          <div className="mb-10 text-center">
            <span className="section-kicker">Footer</span>
            <h3 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Akash God</h3>
            <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
              Design-led frontend engineering for products that need speed, clarity, and strong first impressions.
            </p>
          </div>

          <div className="mb-12 flex items-center gap-4">
            <SocialLink href="https://github.com/Akash-dev-lab" icon={<SiGithub size={20} />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/akash-god-382aa71a9/" icon={<SiLinkedin size={20} />} label="LinkedIn" />
            <SocialLink href="https://x.com/home" icon={<SiX size={18} />} label="X (Twitter)" />
            <SocialLink href="https://wa.me/918923101766" icon={<SiWhatsapp size={20} />} label="WhatsApp" isWhatsapp />
          </div>

          <div className="flex w-full max-w-4xl flex-col items-center justify-between gap-4 border-t border-primary/10 pt-8 text-sm text-muted-foreground md:flex-row">
            <div className="flex items-center gap-2">
              <span>Copyright {new Date().getFullYear()}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
              <span>Built with</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500 animate-pulse" />
              <span>by Akash</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#about" className="transition-colors hover:text-primary">About</a>
              <a href="#projects" className="transition-colors hover:text-primary">Work</a>
              <a href="#contact" className="transition-colors hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
  isWhatsapp = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isWhatsapp?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`flex h-12 w-12 items-center justify-center rounded-full border border-primary/10 bg-background/70 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 ${
        isWhatsapp ? 'hover:bg-[#25D366]/10 hover:text-[#25D366]' : 'hover:bg-primary/10 hover:text-primary'
      }`}
    >
      {icon}
    </a>
  );
}
