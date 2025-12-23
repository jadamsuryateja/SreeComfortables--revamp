import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';

const projects = [
  {
    id: 1,
    title: 'Executive Office Suite',
    category: 'Commercial',
    location: 'Bangalore, India',
    year: '2024',
    image: project1,
  },
  {
    id: 2,
    title: 'Luxury Dining Room',
    category: 'Residential',
    location: 'Mumbai, India',
    year: '2023',
    image: project2,
  },
  {
    id: 3,
    title: 'Spa Bathroom',
    category: 'Residential',
    location: 'Hyderabad, India',
    year: '2023',
    image: project3,
  },
  {
    id: 4,
    title: 'Master Bedroom',
    category: 'Residential',
    location: 'Chennai, India',
    year: '2022',
    image: hero2,
  },
  {
    id: 5,
    title: 'Modern Kitchen',
    category: 'Residential',
    location: 'Pune, India',
    year: '2024',
    image: hero3,
  },
];

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Follow cursor for image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="projects" className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden cursor-none">
      <div className="container-custom px-4 lg:px-24">
        <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">Selected Work</p>
            <h2 className="font-display text-5xl md:text-6xl text-cream">Our Portfolio</h2>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-4xl font-display text-gold mb-2">250+</div>
            <div className="text-sm uppercase tracking-wider opacity-60">Completed Projects</div>
          </div>
        </div>

        <div className="flex flex-col">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative border-b border-white/10 py-12 transition-all duration-300 hover:bg-white/5 px-4 md:px-8"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 mix-blend-difference">
                <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-cream group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 md:gap-12 mt-4 md:mt-0 text-sm md:text-base text-cream/60 group-hover:text-cream/90 transition-colors">
                  <span className="uppercase tracking-wider w-32">{project.category}</span>
                  <span className="uppercase tracking-wider hidden md:block w-32">{project.location}</span>
                  <span className="font-display italic">{project.year}</span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300 group-hover:bg-gold group-hover:border-gold group-hover:text-wood-darkest">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="btn-outline border-cream text-cream hover:bg-cream hover:text-wood-darkest">
            View All Projects
          </button>
        </div>
      </div>

      {/* Floating Image Reveal */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[400px] h-[300px] z-50 pointer-events-none hidden lg:block -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden opacity-0 has-[div]:opacity-100 transition-opacity duration-300"
      >
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full p-2"
            >
              <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl relative">
                <img
                  src={projects.find(p => p.id === activeProject)?.image}
                  alt="Project Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
