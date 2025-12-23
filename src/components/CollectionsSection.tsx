import { motion } from 'framer-motion';
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
                                >
                                    <div className="aspect-[3/5] overflow-hidden rounded-md mb-6 bg-white shadow-lg border border-black/5">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
