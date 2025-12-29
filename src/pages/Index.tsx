import { lazy, Suspense, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

// Lazy load components below the fold
const AboutSection = lazy(() => import('@/components/AboutSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const CollectionsSection = lazy(() => import('@/components/CollectionsSection'));
const OurWorksSection = lazy(() => import('@/components/OurWorksSection'));
const CTASection = lazy(() => import('@/components/CTASection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="relative">
      <Navbar />
      <HeroSection />

      <Suspense fallback={<div className="h-20 bg-cream" />}>
        <AboutSection />
        <TestimonialsSection />
        <CollectionsSection onCategorySelect={setSelectedCategory} />
        <OurWorksSection selectedCategory={selectedCategory} />
        <CTASection />
        <ContactSection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
