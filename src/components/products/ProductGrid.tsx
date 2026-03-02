import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-heading text-2xl text-muted">Ingen produkter funnet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {products.map((product, i) => {
        const isHero = product.heroTile;
        const isFeatured = product.featured && !product.heroTile;

        return (
          <ScrollReveal
            key={product.id}
            delay={Math.min(i * 50, 400)}
            className={`${
              isHero
                ? "col-span-2 row-span-2"
                : isFeatured
                ? "md:col-span-2"
                : ""
            }`}
          >
            <ProductCard product={product} isHero={isHero} />
          </ScrollReveal>
        );
      })}
    </div>
  );
}
