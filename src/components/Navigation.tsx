import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 50);
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

  // Effect to handle scrolling when navigating back to home from another page
  useEffect(() => {
    if (location.pathname === '/' && location.state && (location.state as any).scrollTo) {
      const href = (location.state as any).scrollTo;
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Clear state to prevent scrolling on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-in slide-in-from-top ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-left duration-500 cursor-pointer"
              onClick={() => navigate('/')}
            >
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  aria-label={`Scroll to ${item.label} section`}
                  className="relative text-foreground/80 hover:text-primary transition-colors duration-300 group animate-in fade-in slide-in-from-top"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                className="text-foreground hover:text-primary transition-colors animate-in fade-in slide-in-from-top"
                style={{ animationDelay: `${navItems.length * 100}ms` }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="md:hidden flex items-center gap-2 animate-in fade-in slide-in-from-right duration-500">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="text-foreground hover:text-primary"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="text-foreground hover:text-primary"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[73px] right-0 bottom-0 w-full md:hidden z-40 bg-background/95 backdrop-blur-xl border-l border-primary/20 animate-in slide-in-from-right duration-300">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToSection(item.href)}
                aria-label={`Navigate to ${item.label}`}
                className="text-2xl text-foreground/80 hover:text-primary transition-colors duration-300 animate-in fade-in slide-in-from-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
