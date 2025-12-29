import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
const collections = [
    { id: 1, title: 'LIVING', image: "/residential/GROND FLOOR DRAWING ROOM.JPG", offset: 0 },
    { id: 2, title: 'BEDROOM', image: "/residential/MASTER BEDROOM.JPG", offset: 80 },
    { id: 3, title: 'DINING', image: "/residential/LIVING AND DINNING.JPG", offset: 160 },
    { id: 4, title: 'KITCHEN', image: "/residential/KITCHEN -2.JPG", offset: 240 },
    { id: 5, title: 'OFFICE', image: "/office/20200104-DSC09999.jpg", offset: 320 },
];

const CollectionsSection = ({ onCategorySelect }: { onCategorySelect: (category: string) => void }) => {
    const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

    const handleImageLoad = (id: number) => {
        setImagesLoaded(prev => ({ ...prev, [id]: true }));
    };

    const handleCollectionClick = (category: string) => {
        onCategorySelect(category);
        // Scroll to the Our Works gallery section with a slight delay to allow state update
        setTimeout(() => {
            const gallerySection = document.getElementById('our-works-gallery');
            if (gallerySection) {
                const navHeight = 0; // Adjust if you have a fixed header that overlaps
                const elementPosition = gallerySection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                // Try standard scroll first as it handles Layout better with smooth behavior sometimes
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
    };

    return (
        <section id="our-works" className="py-24 bg-background relative overflow-hidden">

            {/* Vertical Strip */}
            <div className="hidden lg:flex absolute left-0 top-0 bottom-0 w-24 bg-[#FAF9F6] items-center justify-center border-r border-gray-100 z-10">
                <h2 className="-rotate-90 text-[#C5A572] font-display font-bold text-5xl tracking-widest whitespace-nowrap uppercase">
                    Our Collections
                </h2>
            </div>

            <div className="container-custom px-4 lg:px-6 relative z-10 lg:pl-40">
                <div className="flex flex-col lg:flex-row gap-8 items-start relative">

                    {/* Left Vertical Stripe Label - REMOVED (Replaced by strip above) */}



                    {/* RIGHT SIDE: Staggered Image Grid */}
                    <div className="flex-grow w-full relative">

                        {/* Top Right Decorative Grey Dots */}
                        <div className="absolute -top-24 right-0 w-[120%] h-64 opacity-30 pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle, #999 2px, transparent 2px)',
                                backgroundSize: '20px 20px'
                            }}
                        />

                        {/* The Grid */}
                        <motion.div
                            className="flex flex-wrap lg:flex-nowrap gap-8 lg:gap-4 justify-center lg:justify-between items-start"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.3 // Slower stagger for "one by one" feel
                                    }
                                }
                            }}
                        >
                            {collections.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    // Responsive percentage width to fit all 5 cards
                                    className="relative flex-shrink-0 w-[90%] md:w-[45%] lg:w-[19%] group cursor-pointer"
                                    style={{
                                        marginTop: window.innerWidth > 1024 ? `${item.offset}px` : '0px'
                                    }}
                                    variants={{
                                        hidden: { opacity: 0, y: 100 }, // Start lower for dramatic effect
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.8,
                                                ease: [0.215, 0.61, 0.355, 1] // Cubic bezier for smooth entry
                                            }
                                        }
                                    }}
                                    onClick={() => handleCollectionClick(item.title)}
                                >
                                    <div className="relative aspect-[3/5] overflow-hidden rounded-md mb-6 bg-white shadow-lg border border-black/5">
                                        {!imagesLoaded[item.id] && (
                                            <Skeleton className="absolute inset-0 w-full h-full" />
                                        )}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!imagesLoaded[item.id] ? 'opacity-0' : 'opacity-100'}`}
                                            onLoad={() => handleImageLoad(item.id)}
                                        />
                                    </div>
                                    <h3 className="text-center font-display text-sm tracking-[0.2em] uppercase text-wood-darkest font-bold group-hover:text-gold transition-colors">{item.title}</h3>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CollectionsSection;
