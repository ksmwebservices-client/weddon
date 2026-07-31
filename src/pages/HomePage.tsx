import { HeroSection } from '@/components/home/HeroSection';
import { ServiceCategoriesSection } from '@/components/home/ServiceCategoriesSection';
import { PackagesSection } from '@/components/home/PackagesSection';
import { FeaturedVendorsSection } from '@/components/home/FeaturedVendorsSection';
import { BridalShowcaseSection } from '@/components/home/BridalShowcaseSection';
import { RentalCollectionSection } from '@/components/home/RentalCollectionSection';
import { TimelineSection } from '@/components/home/TimelineSection';
import { AIPlannerTeaserSection } from '@/components/home/AIPlannerTeaserSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { GalleryPreviewSection } from '@/components/home/GalleryPreviewSection';
import { BlogPreviewSection } from '@/components/home/BlogPreviewSection';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactSection } from '@/components/home/ContactSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCategoriesSection />
      <PackagesSection />
      <FeaturedVendorsSection />
      <BridalShowcaseSection />
      <RentalCollectionSection />
      <TimelineSection />
      <AIPlannerTeaserSection />
      <TestimonialsSection />
      <GalleryPreviewSection />
      <BlogPreviewSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
