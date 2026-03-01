"use client";

import { useState } from "react";
import { products, type Category } from "@/data/products";
import { FilterBar } from "@/components/products/FilterBar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { GrainOverlay } from "@/components/GrainOverlay";
import { OrganicBlobs } from "@/components/OrganicBlobs";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (a.soldOut !== b.soldOut) return a.soldOut ? 1 : -1;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return 0;
  });

  return (
    <main className="relative min-h-screen">
      <OrganicBlobs
        blobs={[
          {
            color: "bg-[#1B4332]",
            size: "w-[300px] h-[300px]",
            position: "-top-20 -right-20",
            animation: "animate-drift-slow",
          },
          {
            color: "bg-[rgba(201,168,76,0.06)]",
            size: "w-[250px] h-[250px]",
            position: "bottom-40 -left-20",
            animation: "animate-drift",
          },
        ]}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        <ScrollReveal className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground">
                Our Collection
              </h1>
              <p className="font-body text-muted mt-2">
                Premium natural supplements, carefully curated
              </p>
            </div>
            <div className="glass rounded-full px-4 py-2 self-start sm:self-auto">
              <span className="font-body text-xs text-accent-gold">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <FilterBar active={activeCategory} onChange={setActiveCategory} />

        <div className="mt-8">
          <ProductGrid products={sorted} />
        </div>
      </div>

      <GrainOverlay />
    </main>
  );
}
