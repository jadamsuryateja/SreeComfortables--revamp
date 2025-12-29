import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import project2 from '@/assets/project-2.jpg';

const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src={project2}
          alt="Interior Design"
          loading="lazy"
          className="w-full h-[120%] object-cover brightness-[0.4]"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
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


        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
