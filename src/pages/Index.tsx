import { lazy, Suspense } from 'react';
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
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />

      <Suspense fallback={<div className="h-20 bg-cream" />}>
        <AboutSection />
        <TestimonialsSection />
        <CollectionsSection />
        <OurWorksSection />
        <CTASection />
        <ContactSection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
