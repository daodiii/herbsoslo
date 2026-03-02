import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { WaveDivider } from "@/components/WaveDivider";
import { ScrollReveal } from "@/components/ScrollReveal";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);
  const heroProduct = featured.find((p) => p.heroTile);
  const otherFeatured = featured.filter((p) => !p.heroTile);

  const extraPicks = products.filter(
    (p) => !p.featured && !p.soldOut && ["lions-mane", "tongkat-extract"].includes(p.id)
  );
  const gridProducts = [...otherFeatured, ...extraPicks];

  return (
    <section className="relative py-20 md:py-28">
      <WaveDivider fill="rgba(27, 67, 50, 0.1)" className="absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-heading font-semibold text-4xl md:text-5xl text-foreground">
            Håndplukket for deg
          </h2>
          <p className="font-body text-muted mt-3 max-w-md mx-auto">
            Våre mest populære naturlige kosttilskudd
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {heroProduct && (
            <ScrollReveal className="md:row-span-2 h-full">
              <ProductCard product={heroProduct} isHero />
            </ScrollReveal>
          )}

          {gridProducts.map((product, i) => (
            <ScrollReveal key={product.id} delay={(i + 1) * 100}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
