import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Paintbrush, Sofa, Lightbulb, Wrench, Palette, Building2, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Paintbrush,
    title: 'Interior Design',
    description: 'Bespoke interior solutions that reflect your personal style and enhance your daily living experience.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'
  },
  {
    icon: Sofa,
    title: 'Custom Furniture',
    description: 'Handcrafted furniture pieces designed to fit your space perfectly, merging form with function.',
    image: 'https://images.unsplash.com/photo-1592917996117-465d8409a937?q=80&w=2000&auto=format&fit=crop'
  },
  {
    icon: Lightbulb,
    title: 'Lighting Strategy',
    description: 'Advanced lighting schemes that set the mood and highlight the architectural beauty of your home.',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2000&auto=format&fit=crop'
  },
  {
    icon: Wrench,
    title: 'Renovation',
    description: 'End-to-end renovation management, transforming dated spaces into modern masterpieces.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop'
  },
  {
    icon: Palette,
    title: 'Color Curation',
    description: 'Expert color theory application to create harmonious and impactful visual environments.',
    image: 'https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?q=80&w=2000&auto=format&fit=crop'
  },
  {
    icon: Building2,
    title: 'Commercial Spaces',
    description: 'Strategic designs for offices and retail that boost productivity and impress clientele.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop'
  },
];

const ServicesSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Quick dubplication for seamless loop
  const extendedServices = [...services, ...services];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Auto-scroll animation
    // Calculate total width of one set of items to scroll exactly that much before resetting
    // Assuming each card is roughly 600px + gap, or we can just rely on percentages if container is wide enough
    // Ideally we measure, but for a simple marquee GSAP's xPercent is great.
    // If we have 2 sets, we want to move from 0% to -50% of the total width.

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 20, // Adjust speed here
        repeat: -1
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="relative bg-muted py-24 overflow-hidden">

      {/* Header */}
      <div className="container-custom px-6 lg:px-16 mb-16">
        <p className="text-gold uppercase tracking-[0.3em] text-sm mb-2">Capabilities</p>
        <h2 className="font-display text-4xl lg:text-5xl text-foreground">Our Expertise</h2>
      </div>

      {/* Marquee Track Container */}
      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 w-max px-4"
        >
          {extendedServices.map((service, index) => (
            <div
              key={`${service.title}-${index}`}
              className="relative w-[85vw] md:w-[600px] h-[60vh] md:h-[500px] flex-shrink-0 group overflow-hidden bg-card border border-white/10"
            >
              {/* Image Background */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
                <div className="mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <service.icon className="w-10 h-10 text-gold mb-6" />
                  <h3 className="font-display text-4xl mb-4">{service.title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-gold text-sm font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Discover More <ArrowRight size={16} />
                </div>
              </div>

              {/* Number */}
              <div className="absolute top-8 right-8 text-6xl font-display text-white/10 font-bold group-hover:text-white/20 transition-colors">
                0{index % services.length + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
