import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import X from 'lucide-react/dist/esm/icons/x';
import { Skeleton } from "@/components/ui/skeleton";

const works = [
  // Office
  { id: 1, title: 'Office Space', image: '/office/20200104-DSC09999.webp' },
  { id: 2, title: 'Glass Partition', image: '/office/Cabin Front Door Glass Partition.webp' },
  { id: 3, title: 'Cabin Interior', image: '/office/Cabin Fur View.webp' },
  { id: 4, title: 'Workstation', image: '/office/Part Photo.webp' },
  { id: 5, title: 'Cabin Overview', image: '/office/View Cabins from WS.webp' },
  // Residential
  { id: 6, title: 'Modern Interior', image: '/residential/0ee8a67a-8027-4ea2-8320-39c1e7df91ad.webp' },
  { id: 7, title: 'Elegant Living', image: '/residential/1aa2fd21-6799-4925-bf34-7c0787f153ce.webp' },
  { id: 8, title: 'Cozy Space', image: '/residential/1b565e6e-8021-4ad7-bf5a-f1bbd9fd529b.webp' },
  { id: 9, title: 'Dining Room', image: '/residential/3a2cf365-dfd2-4dde-b374-eb43779f979c.webp' },
  { id: 10, title: 'Luxury Bedroom', image: '/residential/07c200ff-452f-4860-b832-53b232458acc.webp' },
  { id: 11, title: 'Spacious Hall', image: '/residential/40b59b8a-bddd-4a28-9c25-51fe0b5e8048.webp' },
  { id: 12, title: 'Contemporary', image: '/residential/58f1751e-21ca-4f67-ab19-a10b1d1a93e8.webp' },
  { id: 13, title: 'Family Room', image: '/residential/939d61de-6aee-4a2e-8ff3-30d0055bda9b.webp' },
  { id: 14, title: 'Bedroom Decor', image: '/residential/aa4a3fc9-24b4-4d97-9b4a-47dd0e4fc02b.webp' },
  { id: 15, title: 'Balcony', image: '/residential/BALCONY.webp' },
  { id: 16, title: 'Kitchen Detail', image: '/residential/c1956e6e-13af-4241-a216-e0af81e0dab3.webp' },
  { id: 17, title: 'Interior Art', image: '/residential/c97778ba-ff35-48ba-9922-a681f25ce617.webp' },
  { id: 18, title: 'Project View', image: '/residential/Capture.JPG-1.webp' },
  { id: 19, title: 'Classic Style', image: '/residential/Capture.JPG-2.webp' },
  { id: 20, title: 'Modern Vibes', image: '/residential/Capture.JPG-3.webp' },
];

const works2 = [
  { id: 21, title: 'Elegant Vibe', image: '/residential/Capture.JPG-4.webp' },
  { id: 22, title: 'Project Shot', image: '/residential/Capture.JPG-5.webp' },
  { id: 23, title: 'Luxury Finish', image: '/residential/f97c5a28-b5a2-4c20-a442-3772ee82173e.webp' },
  { id: 24, title: 'Guest Bedroom', image: '/residential/FIRST FLOOR 2 ND BEDROOM.webp' },
  { id: 25, title: 'Drawing Room', image: '/residential/GROND FLOOR DRAWING ROOM.webp' },
  { id: 26, title: 'Ground Bedroom', image: '/residential/GROUND FLOOR BEDROOM.webp' },
  { id: 27, title: 'Kitchen Space', image: '/residential/IMG_4252.webp' },
  { id: 28, title: 'Kitchen Cabinets', image: '/residential/IMG_4260.webp' },
  { id: 29, title: 'Modern Kitchen', image: '/residential/IMG_4261.webp' },
  { id: 30, title: 'Kitchen Corner', image: '/residential/IMG_4264.webp' },
  { id: 31, title: 'Storage Solution', image: '/residential/IMG_4265.webp' },
  { id: 32, title: 'Kitchen Setup', image: '/residential/IMG_4267.webp' },
  { id: 33, title: 'Living Comfort', image: '/residential/IMG_4270.webp' },
  { id: 34, title: 'Room Design', image: '/residential/IMG_4271.webp' },
  { id: 35, title: 'Interior View', image: '/residential/IMG_4273.webp' },
  { id: 36, title: 'Cozy Corner', image: '/residential/IMG_4274.webp' },
  { id: 37, title: 'Wall Decor', image: '/residential/IMG_4276.webp' },
  { id: 38, title: 'Room Setup', image: '/residential/IMG_4277.webp' },
  { id: 39, title: 'Kitchen View', image: '/residential/KITCHEN -2.webp' },
  { id: 40, title: 'Kitchen V3', image: '/residential/KITCHEN V.webp' },
  { id: 41, title: 'Living Dining', image: '/residential/LIVING AND DINNING.webp' },
  { id: 42, title: 'Master Bed', image: '/residential/MASTER BEDROOM.webp' },
];

// Duplicate list for infinite loop
const allWorks = [...works, ...works2, ...works, ...works2];

const TestimonialItem = ({ work, onClick }: { work: { id: number; title: string; image: string }; onClick: () => void }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      className="inline-block w-[280px] md:w-[350px] aspect-[4/3] flex-shrink-0 relative group overflow-hidden rounded-lg cursor-pointer bg-gray-100"
      onClick={onClick}
    >
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <img
        src={work.image}
        alt={work.title}
        draggable={false}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!isLoaded ? "opacity-0" : "opacity-100"}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <h3 className="text-white font-display text-xl">{work.title}</h3>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Drag State (Refs for performance, no re-renders)
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Auto Scroll State
  const isHovered = useRef(false);
  const scrollSpeed = 0.5; // Pixels per frame

  // Optimized animation loop to prevent forced reflows
  const animateScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    // 1. Read Phase
    let { scrollLeft, scrollWidth } = scrollContainerRef.current;

    // 2. Calculation Phase
    if (!isDown.current && !isHovered.current) {
      scrollLeft += scrollSpeed;
    }

    // Infinite Loop Check
    if (scrollLeft >= (scrollWidth / 2)) {
      scrollLeft = 0;
    }

    // 3. Write Phase
    if (scrollContainerRef.current.scrollLeft !== scrollLeft) {
      scrollContainerRef.current.scrollLeft = scrollLeft;
    }

    animationRef.current = requestAnimationFrame(animateScroll);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateScroll);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animateScroll]);


  // Manual Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    if (scrollContainerRef.current) {
      startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    isHovered.current = false;
    if (scrollContainerRef.current) scrollContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (scrollContainerRef.current) scrollContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Touch Handling for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    isDown.current = true;
    isHovered.current = true;
    if (scrollContainerRef.current) {
      startX.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDown.current || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isDown.current = false;
    isHovered.current = false;
  };



  return (
    <section id="testimonials" className="py-24 bg-background relative">
      <div className="container-custom px-4 mb-12 flex justify-between items-end">
        <div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground uppercase">Capabilities <br /> Our Expertise</h2>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-hidden gap-6 px-4 pb-8 cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => isHovered.current = true}

        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}

        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          touchAction: 'pan-y'
        }}
      >
        {allWorks.map((work, i) => (
          <TestimonialItem
            key={`${work.id}-${i}`}
            work={work}
            onClick={() => {
              // Prevent click if we were dragging
              // Simple heuristic: if isDown was true recently? 
              // Actually, onClick fires on MouseUp. If we moved significantly, it's a drag.
              // For now, accept click. 
              setSelectedImage(work.image)
            }}
          />
        ))}
      </div>

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
              onClick={(e) => e.stopPropagation()}
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
