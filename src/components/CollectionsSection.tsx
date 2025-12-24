import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

const collections = [
    { id: 1, title: 'LIVING', image: hero1, offset: 0 },
    { id: 2, title: 'BEDROOM', image: hero2, offset: 80 },
    { id: 3, title: 'DINING', image: project2, offset: 160 },
    { id: 4, title: 'KITCHEN', image: project3, offset: 240 },
    { id: 5, title: 'ACCENT', image: hero1, offset: 320 },
];

const CollectionsSection = () => {
    const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

    const handleImageLoad = (id: number) => {
        setImagesLoaded(prev => ({ ...prev, [id]: true }));
    };

    return (
        <section className="py-24 bg-background relative overflow-hidden">

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
                                    // Update the collections array first (will do in separate edit or same if I can target both)
                                    // Wait, I can't edit non-contiguous blocks with this tool easily if they are far apart.
                                    // Lines 9-15 are the array. Lines 73-75 are the usage.
                                    // I will use `multi_replace_file_content`.
                                    // Ah, I'll just use `replace_file_content` to fix the usage first using a quick index math if possible or just style with a media query class?
                                    // No, I'll use multi_replace.
                                    // Let's assume I use standard replace for the array first.
                                    // Actually, `item.offset` is used.
                                    // Any `window.innerWidth` check in render is bad.
                                    // I can change the style to:
                                    // style={{ '--lg-margin-top': `${item.offset}px` } as React.CSSProperties}
                                    // and in className add `lg:mt-[var(--lg-margin-top)]`.
                                    // This works perfectly and avoids JS window checks.
                                    // Let's do that.
                                    className="relative flex-shrink-0 w-[90%] md:w-[45%] lg:w-[19%] group cursor-pointer lg:mt-[var(--offset)]"
                                    style={{
                                        '--offset': `${item.offset}px`
                                    } as React.CSSProperties}
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
