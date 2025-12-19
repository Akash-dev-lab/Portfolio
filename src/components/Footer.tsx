import { Heart } from 'lucide-react';
import { SiGithub, SiLinkedin, SiX, SiWhatsapp } from 'react-icons/si';

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-primary/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom duration-1000">
          
          {/* Brand & Tagline */}
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 tracking-tight">
              Akash God
            </h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              Where high-performance code meets cinematic design.
            </p>
          </div>

          {/* Social Links - WhatsApp added to the right of X */}
          <div className="flex items-center gap-6 mb-12">
            <SocialLink href="https://github.com/Akash-dev-lab" icon={<SiGithub size={22} />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/akash-god-382aa71a9/" icon={<SiLinkedin size={22} />} label="LinkedIn" />
            <SocialLink href="https://x.com/home" icon={<SiX size={20} />} label="X (Twitter)" />
            <SocialLink 
              href="https://wa.me/918923101766" 
              icon={<SiWhatsapp size={22} />} 
              label="WhatsApp" 
              isWhatsapp 
            />
          </div>

          {/* Bottom Bar */}
          <div className="w-full max-w-4xl border-t border-primary/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>by Akash</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#projects" className="hover:text-primary transition-colors">Work</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
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
  isWhatsapp = false 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  isWhatsapp?: boolean 
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`p-3 rounded-full border border-primary/10 bg-secondary/20 
                 text-muted-foreground transition-all duration-300 
                 hover:scale-110 hover:border-primary/40
                 ${isWhatsapp ? 'hover:text-[#25D366] hover:bg-[#25D366]/5' : 'hover:text-primary hover:bg-primary/5'}`}
    >
      {icon}
    </a>
  );
}