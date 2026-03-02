import { ScrollReveal } from "@/components/ScrollReveal";

export function BrandStory() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <div className="relative flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(27,67,50,0.4),transparent_70%)]" aria-hidden="true" />
              <blockquote className="relative text-center px-8">
                <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed">
                  &ldquo;Vi tror naturen har svaret&rdquo;
                </p>
              </blockquote>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground">
              Oslo Herbs-filosofien
            </h2>
            <p className="font-body text-muted mt-4 leading-relaxed max-w-lg">
              Vi velger kun naturlige kosttilskudd av høyeste kvalitet fra
              anerkjente merker verden over. Hvert produkt i vår kolleksjon er
              valgt ut for renhet, styrke og vitenskapelig grunnlag — fordi
              helsen din fortjener det beste.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
