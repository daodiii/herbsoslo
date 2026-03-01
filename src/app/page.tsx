import { GrainOverlay } from "@/components/GrainOverlay";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustBar } from "@/components/landing/TrustBar";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <GrainOverlay />
    </main>
  );
}
