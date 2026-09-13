import { Hero } from "@/components/home/Hero";
import { QuickCategories } from "@/components/home/QuickCategories";
import { TrendingDestinations } from "@/components/home/TrendingDestinations";
import { DealsSection } from "@/components/home/DealsSection";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { CabMarketplace } from "@/components/home/CabMarketplace";
import { TripTypes } from "@/components/home/TripTypes";
import { CustomerStories } from "@/components/home/CustomerStories";
import { WhyTheTravelKart } from "@/components/home/WhyTheTravelKart";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FAQSection } from "@/components/home/FAQSection";
import { LeadCapture } from "@/components/home/LeadCapture";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickCategories />
      <TrendingDestinations />
      <DealsSection />
      <FeaturedPackages />
      <CabMarketplace />
      <TripTypes />
      <CustomerStories />
      <WhyTheTravelKart />
      <BlogPreview />
      <FAQSection />
      <LeadCapture />
    </>
  );
}
