import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Square } from 'lucide-react';
import hero2 from '@/assets/hero-2.jpg';

const features = [
  'Ideation and Conceptualization',
  'Expert Design Consultation',
  'Thorough Site Assessment',
  'Curated Material Selection',
  'Creative Design Evolution',
  'Skilled Contract Management',
  'Strategic Space Arrangement',
  'Precision Architectural Sketches',
  'Tailored Furniture Crafting',
  'Artful Lighting Solutions',
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-[auto] lg:min-h-screen flex items-center bg-background relative overflow-hidden py-24 lg:py-0"
    >
      {/* Vertical Strip */}
      <div className="hidden lg:flex absolute left-0 top-0 bottom-0 w-24 bg-[#FAF9F6] items-center justify-center border-r border-gray-100 z-10">
        <h2 className="-rotate-90 text-[#C5A572] font-display font-bold text-xs lg:text-sm xl:text-lg tracking-[0.15em] whitespace-nowrap uppercase">
          Defining Workspace Elegance & Comfort Since 2006
        </h2>
      </div>

      <div className="container-custom px-6 lg:px-16 lg:pl-32 xl:pl-40">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="font-body text-xs md:text-sm uppercase tracking-widest text-[#C5A572] mb-4 font-bold">
              Defining Workspace Elegance & Comfort Since 2006
            </p>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mb-8 text-balance">
              <p>
                <b>SREE COMFORTABLES Pvt. Ltd.</b> has established itself as a premier manufacturer and dealer of high-quality office furniture and interior solutions in Hyderabad.
              </p>
              <p>
                Operating from our state-of-the-art manufacturing facility in <b>Shakthipuram, Kukatpally</b>, we combine modern technology with expert craftsmanship to create tailored environments. From ergonomic workstations to luxurious executive cabins, we specialize in transforming offices into productive, stylish, and comfortable spaces that stand the test of time.
              </p>
            </div>

            {/* Two-Column Feature List */}
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
              {[
                'Modular Office Workstations',
                'Executive Cabin Interiors',
                'Reception & Lobby Units',
                'Meeting Room Solutions',
                'Ergonomic Seating Systems',
                'Custom Moulded Furniture',
                'Turnkey Office Interiors',
                'State-of-the-art Manufacturing'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-sm flex-shrink-0" /> {/* Custom bullet */}
                  <span className="text-foreground/80 font-medium text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={hero2}
                alt="Interior Design Hyderabad"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative Element - optional, matches style of high end sites */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-wood-darkest/5 -z-10 rounded-full blur-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
