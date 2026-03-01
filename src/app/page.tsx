import { GrainOverlay } from "@/components/GrainOverlay";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustBar } from "@/components/landing/TrustBar";
import { FeaturedProducts } from "@/components/landing/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <FeaturedProducts />
      <GrainOverlay />
    </main>
  );
}
