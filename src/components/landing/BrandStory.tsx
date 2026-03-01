import { ScrollReveal } from "@/components/ScrollReveal";

const stats = [
  { value: "20+", label: "Premium Products" },
  { value: "5+", label: "Trusted Brands" },
  { value: "1000+", label: "Happy Customers" },
];

export function BrandStory() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <div className="relative flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(27,67,50,0.4),transparent_70%)]" aria-hidden="true" />
              <blockquote className="relative text-center px-8">
                <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed">
                  &ldquo;We believe nature holds the answer&rdquo;
                </p>
              </blockquote>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground">
                The Oslo Herbs Philosophy
              </h2>
              <p className="font-body text-muted mt-4 leading-relaxed max-w-lg">
                We curate only the highest-quality natural supplements from
                trusted brands worldwide. Every product in our collection is
                selected for purity, potency, and scientific backing — because
                your health deserves nothing less.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass rounded-[20px] p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-heading text-3xl md:text-4xl text-accent-gold">
                        {stat.value}
                      </p>
                      <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
