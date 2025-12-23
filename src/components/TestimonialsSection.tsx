import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';


const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const works = [
  // Office
  { id: 1, title: 'Office Space', image: '/office/20200104-DSC09999.jpg' },
  { id: 2, title: 'Glass Partition', image: '/office/Cabin Front Door Glass Partition.JPG' },
  { id: 3, title: 'Cabin Interior', image: '/office/Cabin Fur View.JPG' },
  { id: 4, title: 'Workstation', image: '/office/Part Photo.JPG' },
  { id: 5, title: 'Cabin Overview', image: '/office/View Cabins from WS.JPG' },
  // Residential
  { id: 6, title: 'Modern Interior', image: '/residential/0ee8a67a-8027-4ea2-8320-39c1e7df91ad.jpg' },
  { id: 7, title: 'Elegant Living', image: '/residential/1aa2fd21-6799-4925-bf34-7c0787f153ce.jpg' },
  { id: 8, title: 'Cozy Space', image: '/residential/1b565e6e-8021-4ad7-bf5a-f1bbd9fd529b.jpg' },
  { id: 9, title: 'Dining Room', image: '/residential/3a2cf365-dfd2-4dde-b374-eb43779f979c.jpg' },
  { id: 10, title: 'Luxury Bedroom', image: '/residential/07c200ff-452f-4860-b832-53b232458acc.jpg' },
  { id: 11, title: 'Spacious Hall', image: '/residential/40b59b8a-bddd-4a28-9c25-51fe0b5e8048.jpg' },
  { id: 12, title: 'Contemporary', image: '/residential/58f1751e-21ca-4f67-ab19-a10b1d1a93e8.jpg' },
  { id: 13, title: 'Family Room', image: '/residential/939d61de-6aee-4a2e-8ff3-30d0055bda9b.jpg' },
  { id: 14, title: 'Bedroom Decor', image: '/residential/aa4a3fc9-24b4-4d97-9b4a-47dd0e4fc02b.jpg' },
  { id: 15, title: 'Balcony', image: '/residential/BALCONY.JPG' },
  { id: 16, title: 'Kitchen Detail', image: '/residential/c1956e6e-13af-4241-a216-e0af81e0dab3.jpg' },
  { id: 17, title: 'Interior Art', image: '/residential/c97778ba-ff35-48ba-9922-a681f25ce617.jpg' },
  { id: 18, title: 'Project View', image: '/residential/Capture.JPG-1.JPG' },
  { id: 19, title: 'Classic Style', image: '/residential/Capture.JPG-2.JPG' },
  { id: 20, title: 'Modern Vibes', image: '/residential/Capture.JPG-3.JPG' },
];

const works2 = [
  { id: 21, title: 'Elegant Vibe', image: '/residential/Capture.JPG-4.JPG' },
  { id: 22, title: 'Project Shot', image: '/residential/Capture.JPG-5.JPG' },
  { id: 23, title: 'Luxury Finish', image: '/residential/f97c5a28-b5a2-4c20-a442-3772ee82173e.jpg' },
  { id: 24, title: 'Guest Bedroom', image: '/residential/FIRST FLOOR 2 ND BEDROOM.JPG' },
  { id: 25, title: 'Drawing Room', image: '/residential/GROND FLOOR DRAWING ROOM.JPG' },
  { id: 26, title: 'Ground Bedroom', image: '/residential/GROUND FLOOR BEDROOM.JPG' },
  { id: 27, title: 'Kitchen Space', image: '/residential/IMG_4252.JPG' },
  { id: 28, title: 'Kitchen Cabinets', image: '/residential/IMG_4260.JPG' },
  { id: 29, title: 'Modern Kitchen', image: '/residential/IMG_4261.JPG' },
  { id: 30, title: 'Kitchen Corner', image: '/residential/IMG_4264.JPG' },
  { id: 31, title: 'Storage Solution', image: '/residential/IMG_4265.JPG' },
  { id: 32, title: 'Kitchen Setup', image: '/residential/IMG_4267.JPG' },
  { id: 33, title: 'Living Comfort', image: '/residential/IMG_4270.JPG' },
  { id: 34, title: 'Room Design', image: '/residential/IMG_4271.JPG' },
  { id: 35, title: 'Interior View', image: '/residential/IMG_4273.JPG' },
  { id: 36, title: 'Cozy Corner', image: '/residential/IMG_4274.JPG' },
  { id: 37, title: 'Wall Decor', image: '/residential/IMG_4276.JPG' },
  { id: 38, title: 'Room Setup', image: '/residential/IMG_4277.JPG' },
  { id: 39, title: 'Kitchen View', image: '/residential/KITCHEN -2.JPG' },
  { id: 40, title: 'Kitchen V3', image: '/residential/KITCHEN V.JPG' },
  { id: 41, title: 'Living Dining', image: '/residential/LIVING AND DINNING.JPG' },
  { id: 42, title: 'Master Bed', image: '/residential/MASTER BEDROOM.JPG' },
];

const ParallaxText = React.memo(({ children, baseVelocity = 100 }: { children: React.ReactNode; baseVelocity: number }) => { // 1. Memoize
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const isHovered = useRef(false);

  useAnimationFrame((t, delta) => {
    if (isHovered.current) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Change direction if scrolling
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap cursor-pointer"
      onMouseEnter={() => isHovered.current = true}
      onMouseLeave={() => isHovered.current = false}
    >
      <motion.div
        className="scroller flex flex-nowrap whitespace-nowrap gap-8 py-8 will-change-transform" // 2. Add will-change-transform
        style={{ x }}
      >
        {children}
        {children} {/* 3. Reduced duplication from 4 to 2 (if list is long enough, 2 is plenty) */}
      </motion.div>
    </div>
  );
});

const allWorks = [...works.slice(0, 8), ...works2.slice(0, 8)]; // Reduce initial load size slightly if possible, or keep full list but optimize rendering

const TestimonialsSection = () => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  // 4. Memoize the works list rendering
  const worksList = React.useMemo(() => allWorks.map((work, i) => (
    <div
      key={i}
      className="inline-block w-[300px] md:w-[400px] aspect-[4/3] relative group overflow-hidden rounded-lg mx-4 cursor-pointer"
      onClick={() => setSelectedImage(work.image)}
    >
      <img
        src={work.image}
        alt={work.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        decoding="async" // 5. Async decoding
      />
    </div>
  )), []);

  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden relative">
      <div className="text-center mb-16 px-4">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground uppercase">Capabilities
          Our Expertise</h2>
      </div>

      <ParallaxText baseVelocity={-0.5}>
        {worksList}
      </ParallaxText>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              layoutId={selectedImage}
              className="relative max-w-full max-h-full rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
              <img
                src={selectedImage}
                alt="Preview"
                className="max-w-full max-h-[85vh] object-contain"
              />
              <button
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSection;
