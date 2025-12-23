import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

import CollectionsSection from '@/components/CollectionsSection';

import OurWorksSection from '@/components/OurWorksSection';

const Index = () => {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
      <CollectionsSection />
      <OurWorksSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
