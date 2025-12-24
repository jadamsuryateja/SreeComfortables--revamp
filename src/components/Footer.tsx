import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-wood-darkest text-cream pt-24 pb-8 overflow-hidden">
      <div className="container-custom px-4 lg:px-24">
        {/* Huge Footer Text */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[0.8] tracking-tighter text-white/90">
            SreeComfortables <span className="text-gold">.Pvt .Ltd</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <p className="text-xl text-white/60 max-w-md leading-relaxed">
              Creating timeless interiors that reflect your unique personality and lifestyle. Experience the art of living.
            </p>
          </div>
          <div>
            <h4 className="text-[#997B44] uppercase tracking-widest text-sm mb-6">Sitemap</h4>
            <ul className="space-y-4 text-white/80">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#our-works" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-[#997B44] uppercase tracking-widest text-sm mb-6">Socials</h4>
              <ul className="space-y-4 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
              </ul>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-8 self-start md:self-end w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#997B44] hover:text-wood-darkest ruber:border-[#997B44] transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Sree Comfortables. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
