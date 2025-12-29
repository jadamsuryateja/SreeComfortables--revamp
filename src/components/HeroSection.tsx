import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hero1 from '@/assets/hero-1.webp';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial Loading Animation
    tl.fromTo(imageRef.current,
      { scale: 1.2 },
      { scale: 1, duration: 1.5, ease: 'power2.out' }
    )
      .fromTo([text1Ref.current, text2Ref.current],
        { y: 100, opacity: 0, skewY: 10 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
        '<'
      );

    // Scroll Parallax
    if (containerRef.current) {
      gsap.to(text1Ref.current, {
        xPercent: -20,
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
          start: 'top top',
        }
      });
      gsap.to(text2Ref.current, {
        xPercent: 20,
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
          start: 'top top',
        }
      });
      gsap.to(imageRef.current, {
        yPercent: 20,
        scale: 1.1,
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
          start: 'top top',
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-cream"
    >
      {/* Background Image - Light & Airy */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div ref={imageRef} className="w-full h-full relative">
          <img
            src="/hero-1.webp"
            alt="Interior Design"
            // @ts-ignore
            fetchpriority="high"
            className="w-full h-full object-cover opacity-90" // High opacity for that bright look
          />
          {/* Subtle white gradient overlay to ensure text readability if needed, matches reference 'bright' look */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30 mix-blend-overlay" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center container-custom px-4 lg:px-16">

        {/* Top Text "SREE" */}
        <div className="relative text-center md:text-left">
          <h1
            ref={text1Ref}
            className="font-display font-medium text-[25vw] md:text-[18vw] leading-[0.8] tracking-tighter text-wood-darkest mix-blend-hard-light"
          >
            SREE
          </h1>
        </div>

        {/* Bottom Text "COMFORTABLES" - Staggered Right */}
        <div className="relative text-center md:text-right mt-2 md:mt-0">
          <h1
            ref={text2Ref}
            className="font-display font-medium text-[12vw] md:text-[10vw] lg:text-[8.5vw] leading-[0.8] tracking-tighter text-wood-darkest mix-blend-hard-light inline-block whitespace-nowrap"
          >
            COMFORTABLES
          </h1>
        </div>

        {/* Mobile Specific Subtext (since button is hidden on mobile often, or just to add context) */}
        <div className="lg:hidden absolute bottom-24 left-0 right-0 flex justify-center text-center z-50">
          <button
            onClick={() => {
              const element = document.querySelector('#our-works');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-black text-white px-8 py-3 w-auto uppercase tracking-widest text-xs font-bold hover:bg-wood-dark transition-colors"
          >
            Explore Works
          </button>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
