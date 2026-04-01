import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Moon, Sparkles, Sun, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTheme } from './ThemeProvider';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: href } });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state && (location.state as { scrollTo?: string }).scrollTo) {
      const href = (location.state as { scrollTo?: string }).scrollTo;
      setTimeout(() => {
        const element = document.querySelector(href as string);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <div
          className={`glass-panel mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-3 transition-all duration-300 md:px-5 ${
            isScrolled ? 'shadow-soft border-primary/20' : 'border-primary/10'
          }`}
        >
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-3 rounded-full px-2 py-1 text-left transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Go to homepage"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="hidden sm:block">
              <p className="font-display text-xl font-bold text-foreground">Portfolio</p>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Akash God</p>
            </div>
          </button>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-1 rounded-full border border-primary/10 bg-background/60 p-1.5">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  aria-label={`Scroll to ${item.label} section`}
                  className="rounded-full px-4 py-2 text-sm font-medium text-foreground/75 transition-all duration-300 hover:bg-primary/10 hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="h-11 w-11 rounded-full border border-primary/10 bg-background/60 text-foreground hover:border-primary/25 hover:bg-primary/10"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="h-10 w-10 rounded-full border border-primary/10 bg-background/60 text-foreground hover:border-primary/25 hover:bg-primary/10"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="h-10 w-10 rounded-full border border-primary/10 bg-background/60 text-foreground hover:border-primary/25 hover:bg-primary/10"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-x-4 top-24 z-40 md:hidden">
          <div className="glass-panel overflow-hidden rounded-[2rem] p-6">
            <div className="mb-4">
              <span className="section-kicker">Navigation</span>
            </div>
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  aria-label={`Navigate to ${item.label}`}
                  className="rounded-2xl border border-primary/10 bg-background/65 px-5 py-4 text-left text-lg font-semibold text-foreground/85 transition-all duration-300 hover:border-primary/25 hover:bg-primary/10 hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
