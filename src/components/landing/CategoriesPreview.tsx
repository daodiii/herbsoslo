import Link from "next/link";
import { categories } from "@/data/products";
import { ScrollReveal } from "@/components/ScrollReveal";

export function CategoriesPreview() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-10">
          <h2 className="font-heading font-medium text-3xl md:text-4xl text-foreground">
            Bla etter kategori
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:justify-center">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat} delay={i * 80}>
                <Link
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  className="glass glass-hover rounded-full px-6 py-3 font-body text-sm text-foreground whitespace-nowrap hover:bg-accent-gold hover:text-background transition-all duration-300 cursor-pointer shrink-0"
                >
                  {cat}
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
