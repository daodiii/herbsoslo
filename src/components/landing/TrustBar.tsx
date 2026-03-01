import { Leaf, FlaskConical, Truck, ShieldCheck } from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import { ScrollReveal } from "@/components/ScrollReveal";

const trustItems = [
  { icon: Leaf, label: "100% Natural" },
  { icon: FlaskConical, label: "Lab Tested" },
  { icon: Truck, label: "Fast Shipping" },
  { icon: ShieldCheck, label: "Trusted Brands" },
];

export function TrustBar() {
  return (
    <section className="relative">
      <WaveDivider fill="rgba(27, 67, 50, 0.15)" />
      <div className="bg-[rgba(27,67,50,0.1)] backdrop-blur-md border-y border-[rgba(201,168,76,0.08)]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustItems.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 100} className="flex items-center justify-center gap-3">
                <item.icon size={22} className="text-accent-gold shrink-0" />
                <span className="font-body text-sm text-foreground tracking-wide">
                  {item.label}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
