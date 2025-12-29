import { useState, useEffect } from 'react';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right';
import Instagram from 'lucide-react/dist/esm/icons/instagram';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  {
    name: 'Our Expertise', href: '#testimonials'
  },
  { name: 'Our Works', href: '#our-works' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state
      setScrolled(currentScrollY > 50);

      // Hide navbar logic
      if (!isOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isOpen]);

  const scrollToSection = (href: string) => {
    // Manually handle smooth scroll if not using Link/Router
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      setHidden(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isDarkText = scrolled && !isOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${hidden ? '-translate-y-full' : 'translate-y-0'
          } ${isOpen
            ? 'py-6 bg-transparent'
            : scrolled
              ? 'py-4 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-black/5 shadow-sm'
              : 'py-6 bg-gradient-to-b from-[#2A2522]/90 via-[#2A2522]/50 to-transparent'
          }`}
      >
        <div className="container-custom flex items-center justify-between px-6 lg:px-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="relative z-50 group"
          >
            <div className={`font-display text-lg md:text-xl font-bold tracking-tighter transition-colors duration-300 ${isDarkText ? 'text-wood-darkest' : 'text-white'}`}>
              SreeComfortables <span className="text-gold">.Pvt .Ltd</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`group relative text-sm uppercase tracking-wider font-bold transition-colors duration-300 overflow-hidden ${isDarkText ? 'text-wood-darkest hover:text-gold' : 'text-white/90 hover:text-white'
                  }`}
              >
                <div className="relative overflow-hidden">
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    {link.name}
                  </span>
                  <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-gold">
                    {link.name}
                  </span>
                </div>
              </a>
            ))}

            {/* Instagram Badge */}
            <a
              href="https://www.instagram.com/sree_comfortables"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 bg-wood-darkest text-white border border-wood-medium/20 hover:bg-wood-dark shadow-md hover:shadow-lg"
            >
              <Instagram size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Follow Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden relative z-50 p-2 transition-colors duration-300 ${isDarkText ? 'text-wood-darkest' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - CSS Transition based */}
      <div
        className={`fixed inset-0 z-40 bg-[url('/menu.jpg')] bg-cover bg-center flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex flex-col gap-6 text-center items-center">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`font-display text-4xl font-medium text-white hover:text-gold transition-all duration-500 relative flex items-center justify-center group transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
              {link.name}
              <ArrowUpRight
                className="absolute left-full ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold"
                size={32}
              />
            </a>
          ))}

          <a
            href="https://www.instagram.com/sree_comfortables"
            target="_blank"
            rel="noopener noreferrer"
            style={{ transitionDelay: '500ms' }}
            className={`mt-8 flex items-center gap-3 px-6 py-3 rounded-full bg-wood-darkest text-white border border-wood-medium/20 hover:bg-wood-dark transition-all duration-500 shadow-md hover:shadow-lg transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
          >
            <Instagram size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Follow Us</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
