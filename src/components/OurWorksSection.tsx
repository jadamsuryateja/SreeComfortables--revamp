import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';


const projects = [
    // Office Projects
    { id: 1, title: "Office Space - DSC09999", category: "Office", image: "/office/20200104-DSC09999.jpg" },
    { id: 2, title: "Glass Partition Cabin", category: "Office", image: "/office/Cabin Front Door Glass Partition.JPG" },
    { id: 3, title: "Cabin Interior", category: "Office", image: "/office/Cabin Fur View.JPG" },
    { id: 4, title: "Workstation View", category: "Office", image: "/office/Part Photo.JPG" },
    { id: 5, title: "Cabin Overview", category: "Office", image: "/office/View Cabins from WS.JPG" },

    // Residential Projects
    { id: 6, title: "Modern Interior 1", category: "Residential", image: "/residential/0ee8a67a-8027-4ea2-8320-39c1e7df91ad.jpg" },
    { id: 7, title: "Modern Interior 2", category: "Residential", image: "/residential/1aa2fd21-6799-4925-bf34-7c0787f153ce.jpg" },
    { id: 8, title: "Elegant Space", category: "Residential", image: "/residential/1b565e6e-8021-4ad7-bf5a-f1bbd9fd529b.jpg" },
    { id: 9, title: "Cozy Corner", category: "Residential", image: "/residential/3a2cf365-dfd2-4dde-b374-eb43779f979c.jpg" },
    { id: 10, title: "Luxury Living", category: "Residential", image: "/residential/07c200ff-452f-4860-b832-53b232458acc.jpg" },
    { id: 11, title: "Spacious Design", category: "Residential", image: "/residential/40b59b8a-bddd-4a28-9c25-51fe0b5e8048.jpg" },
    { id: 12, title: "Contemporary Style", category: "Residential", image: "/residential/58f1751e-21ca-4f67-ab19-a10b1d1a93e8.jpg" },
    { id: 13, title: "Dining Area", category: "Residential", image: "/residential/939d61de-6aee-4a2e-8ff3-30d0055bda9b.jpg" },
    { id: 14, title: "Bedroom Setup", category: "Residential", image: "/residential/aa4a3fc9-24b4-4d97-9b4a-47dd0e4fc02b.jpg" },
    { id: 15, title: "Balcony View", category: "Residential", image: "/residential/BALCONY.JPG" },
    { id: 16, title: "Interior Detail 1", category: "Residential", image: "/residential/c1956e6e-13af-4241-a216-e0af81e0dab3.jpg" },
    { id: 17, title: "Interior Detail 2", category: "Residential", image: "/residential/c97778ba-ff35-48ba-9922-a681f25ce617.jpg" },
    { id: 18, title: "Project Capture 1", category: "Residential", image: "/residential/Capture.JPG-1.JPG" },
    { id: 19, title: "Project Capture 2", category: "Residential", image: "/residential/Capture.JPG-2.JPG" },
    { id: 20, title: "Project Capture 3", category: "Residential", image: "/residential/Capture.JPG-3.JPG" },
    { id: 21, title: "Project Capture 4", category: "Residential", image: "/residential/Capture.JPG-4.JPG" },
    { id: 22, title: "Project Capture 5", category: "Residential", image: "/residential/Capture.JPG-5.JPG" },
    { id: 23, title: "Elegant Finish", category: "Residential", image: "/residential/f97c5a28-b5a2-4c20-a442-3772ee82173e.jpg" },
    { id: 24, title: "First Floor Bedroom", category: "Residential", image: "/residential/FIRST FLOOR 2 ND BEDROOM.JPG" },
    { id: 25, title: "Ground Floor Drawing", category: "Residential", image: "/residential/GROND FLOOR DRAWING ROOM.JPG" },
    { id: 26, title: "Ground Floor Bedroom", category: "Residential", image: "/residential/GROUND FLOOR BEDROOM.JPG" },
    { id: 27, title: "Kitchen Design 1", category: "Residential", image: "/residential/IMG_4252.JPG" },
    { id: 28, title: "Kitchen Design 2", category: "Residential", image: "/residential/IMG_4260.JPG" },
    { id: 29, title: "Kitchen Design 3", category: "Residential", image: "/residential/IMG_4261.JPG" },
    { id: 30, title: "Kitchen Detail 1", category: "Residential", image: "/residential/IMG_4264.JPG" },
    { id: 31, title: "Kitchen Detail 2", category: "Residential", image: "/residential/IMG_4265.JPG" },
    { id: 32, title: "Kitchen Detail 3", category: "Residential", image: "/residential/IMG_4267.JPG" },
    { id: 33, title: "Room View 1", category: "Residential", image: "/residential/IMG_4270.JPG" },
    { id: 34, title: "Room View 2", category: "Residential", image: "/residential/IMG_4271.JPG" },
    { id: 35, title: "Room View 3", category: "Residential", image: "/residential/IMG_4273.JPG" },
    { id: 36, title: "Room View 4", category: "Residential", image: "/residential/IMG_4274.JPG" },
    { id: 37, title: "Room View 5", category: "Residential", image: "/residential/IMG_4276.JPG" },
    { id: 38, title: "Room View 6", category: "Residential", image: "/residential/IMG_4277.JPG" },
    { id: 39, title: "Kitchen V2", category: "Residential", image: "/residential/KITCHEN -2.JPG" },
    { id: 40, title: "Kitchen V3", category: "Residential", image: "/residential/KITCHEN V.JPG" },
    { id: 41, title: "Living & Dining", category: "Residential", image: "/residential/LIVING AND DINNING.JPG" },
    { id: 42, title: "Master Bedroom", category: "Residential", image: "/residential/MASTER BEDROOM.JPG" },
];

const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: index * 0.5,
            duration: 0.6,
            ease: "easeOut" as "easeOut"
        }
    })
};

const ProjectCard = ({ project, index, setSelectedImage }: { project: any, index: number, setSelectedImage: (img: string) => void }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Generate small image path: /path/to/image.jpg -> /path/to/image.small.jpg
    const smallImage = project.image.replace(/(\.[^.]+)$/, '.small$1');

    return (
        <motion.div
            layout
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={projectVariants}
            className="group cursor-pointer will-change-transform"
            onClick={() => setSelectedImage(project.image)}
        >
            <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3] bg-muted/10">
                {/* Low Quality Placeholder (Always visible, behind) */}
                <img
                    src={smallImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
                />

                {/* Full Quality Image (Fades in) */}
                <img
                    src={project.image}
                    alt={project.title}
                    className={`relative z-10 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:scale-105 ${!isLoaded ? 'opacity-0' : 'opacity-100'
                        }`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                />
            </div>
            <div className="flex justify-between items-center border-b border-black/10 pb-4">
                <h3 className="font-display text-2xl text-foreground">{project.title}</h3>
                <span className="text-sm font-bold uppercase tracking-widest text-gold text-right">
                    {project.category}
                </span>
            </div>
        </motion.div>
    );
};

const OurWorksSection = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const displayedProjects = projects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // Scroll to top of section when changing pages
            const section = document.getElementById('our-works');
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section id="our-works" className="py-24 bg-background relative">
            <div className="container-custom px-4 lg:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 text-center md:text-left">
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground uppercase">
                        Our Works
                    </h2>
                    <p className="text-muted-foreground max-w-md mt-4 md:mt-0 text-center md:text-right">
                        A curated selection of our finest interior design projects, showcasing elegance and functionality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {displayedProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            setSelectedImage={setSelectedImage}
                        />
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="mt-16 flex justify-center items-center gap-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-2 px-6 py-3 border border-wood-darkest rounded-full transition-all duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed text-wood-darkest' : 'text-wood-darkest hover:bg-wood-darkest hover:text-white'}`}
                    >
                        <ChevronLeft size={20} />
                        <span className="uppercase tracking-widest text-sm font-bold">Previous</span>
                    </button>

                    <div className="font-display text-xl text-wood-darkest">
                        <span className="font-bold">{currentPage}</span> / {totalPages}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-2 px-6 py-3 border border-wood-darkest rounded-full transition-all duration-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed text-wood-darkest' : 'text-wood-darkest hover:bg-wood-darkest hover:text-white'}`}
                    >
                        <span className="uppercase tracking-widest text-sm font-bold">Next</span>
                        <ChevronRight size={20} />
                    </button>
                </div>
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

export default OurWorksSection;
