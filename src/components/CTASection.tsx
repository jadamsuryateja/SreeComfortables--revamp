import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import project2 from '@/assets/project-2.jpg';

const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax Background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Content Fade In
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform scale-110"
      >
        <img
          src={project2}
          alt="Interior Design"
          loading="lazy"
          className="w-full h-[120%] object-cover brightness-[0.4]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 text-center">
        <div ref={contentRef} className="opacity-0">
          <div className="inline-block border border-gold/30 rounded-full px-6 py-2 mb-8 backdrop-blur-sm bg-black/20">
            <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold">Start Your Journey</span>
          </div>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream mb-8 leading-tight">
            Ready to <br />
            <span className="italic font-light text-gold-light">Transform?</span>
          </h2>

          <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed">
            Join us in creating a space that tells your unique story. Experience the perfect blend of luxury and comfort.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
