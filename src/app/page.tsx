import { GrainOverlay } from "@/components/GrainOverlay";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustBar } from "@/components/landing/TrustBar";
import { FeaturedProducts } from "@/components/landing/FeaturedProducts";
import { BrandStory } from "@/components/landing/BrandStory";
import { CategoriesPreview } from "@/components/landing/CategoriesPreview";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <FeaturedProducts />
      <BrandStory />
      <CategoriesPreview />
      <GrainOverlay />
    </main>
  );
}
