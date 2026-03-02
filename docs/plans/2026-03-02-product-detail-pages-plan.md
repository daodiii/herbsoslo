# Product Detail Pages — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add compact Norwegian product descriptions and a beautiful editorial-style product detail page for all 20 products.

**Architecture:** Extend the Product interface with description/benefits/usage fields, populate all 20 products with Norwegian content, create a dynamic `/products/[id]` route with server-side static generation, and update ProductCard to link to detail pages.

**Tech Stack:** Next.js 16 (App Router), TailwindCSS 4, TypeScript, Lucide React icons

---

## Task 1: Extend Product Data Model

**Files:**
- Modify: `src/data/products.ts`

**Step 1: Add new fields to Product interface**

Add `description`, `benefits`, `usage`, `ingredients`, and `origin` to the interface at `src/data/products.ts:3-13`:

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  featured: boolean;
  heroTile?: boolean;
  soldOut: boolean;
  shortName: string;
  image?: string;
  description: string;
  benefits: string[];
  usage?: string;
  ingredients?: string;
  origin?: string;
}
```

**Step 2: Add Norwegian descriptions to all 20 products**

Update every product object in the `products` array with the description data from the design doc (`docs/plans/2026-03-02-product-detail-pages-design.md`, lines 105-224). Each product gets:
- `description`: 2-3 sentence Norwegian intro
- `benefits`: array of 4-6 benefit strings
- `usage`: dosage/usage text (optional for some)
- `ingredients`: key ingredients (where applicable)
- `origin`: brand/source info (where applicable)

Use proper Norwegian characters (ae, oe, aa → æ, ø, å). The design doc used ASCII approximations — convert them:
- "okt" → "økt", "stotter" → "støtter", "hoey" → "høy", "soevn" → "søvn", etc.

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add src/data/products.ts
git commit -m "feat: extend product data model with Norwegian descriptions"
```

---

## Task 2: Update ProductCard Links

**Files:**
- Modify: `src/components/ProductCard.tsx:13`

**Step 1: Change the link href**

In `src/components/ProductCard.tsx`, line 13, change:
```typescript
href={`/products#${product.id}`}
```
to:
```typescript
href={`/products/${product.id}`}
```

**Step 2: Update "View Details" text to Norwegian**

In `src/components/ProductCard.tsx`, line 47, change:
```
View Details
```
to:
```
Se detaljer
```

**Step 3: Update "Sold Out" text to Norwegian**

In `src/components/ProductCard.tsx`, line 55, change:
```
Sold Out
```
to:
```
Utsolgt
```

**Step 4: Verify the build compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 5: Commit**

```bash
git add src/components/ProductCard.tsx
git commit -m "feat: update ProductCard links to detail pages, Norwegian labels"
```

---

## Task 3: Create Product Detail Page

**Files:**
- Create: `src/app/products/[id]/page.tsx`

**Step 1: Create the dynamic route directory and page**

Create `src/app/products/[id]/page.tsx` as a server component.

The page must:
1. Import `products` from `@/data/products` and find the product by `params.id`
2. Export `generateStaticParams` to statically generate all product pages
3. Export `generateMetadata` for SEO (product name + description)
4. Return `notFound()` if product ID doesn't match
5. Find related products (same category, excluding current, max 4)

**Page structure (sections in order):**

```tsx
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { GrainOverlay } from "@/components/GrainOverlay";
import { OrganicBlobs } from "@/components/OrganicBlobs";
import { WaveDivider } from "@/components/WaveDivider";
import { ScrollReveal } from "@/components/ScrollReveal";

// Static params for all products
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

// Dynamic metadata per product
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return {};
  return {
    title: `${product.shortName} — Oslo Herbs`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="relative min-h-screen">
      {/* ... sections below ... */}
    </main>
  );
}
```

**Section 1: Back Navigation + Hero Image**

```tsx
{/* Background blobs */}
<OrganicBlobs blobs={[
  { color: "bg-[#1B4332]", size: "w-[350px] h-[350px]", position: "-top-20 -right-32", animation: "animate-drift-slow" },
  { color: "bg-[rgba(201,168,76,0.06)]", size: "w-[280px] h-[280px]", position: "bottom-60 -left-20", animation: "animate-drift" },
]} />

<div className="relative z-10">
  {/* Back link */}
  <div className="max-w-7xl mx-auto px-6 pt-28 pb-4">
    <Link
      href="/products"
      className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-accent-gold transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      Tilbake til produkter
    </Link>
  </div>

  {/* Hero image */}
  <div className="max-w-7xl mx-auto px-6 pb-12">
    <div className="flex justify-center">
      <div className="relative w-full max-w-[400px] aspect-square rounded-[24px] overflow-hidden bg-[rgba(27,67,50,0.3)]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 400px"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="font-heading text-6xl text-primary opacity-30">
              {product.shortName.charAt(0)}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
```

**Section 2: Product Header (name, category, price)**

```tsx
  {/* Product header */}
  <ScrollReveal className="max-w-3xl mx-auto px-6 text-center">
    <div className="flex justify-center mb-4">
      <span className="glass rounded-full px-4 py-1.5 font-body text-xs uppercase tracking-wider text-accent-gold">
        {product.category}
      </span>
    </div>
    <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
      {product.shortName}
    </h1>
    <p className="font-body text-sm text-muted mt-3">{product.name}</p>
    <p className="font-heading text-2xl text-accent-gold mt-4">
      {product.price},00 NOK
    </p>
    {product.soldOut && (
      <span className="inline-block mt-3 bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] rounded-full px-4 py-1.5 font-body text-xs text-red-400 uppercase tracking-wider">
        Utsolgt
      </span>
    )}
  </ScrollReveal>
```

**Section 3: Short Description**

```tsx
  {/* Description */}
  <ScrollReveal className="max-w-2xl mx-auto px-6 mt-12 text-center" delay={100}>
    <p className="font-body text-foreground/80 text-lg leading-relaxed">
      {product.description}
    </p>
  </ScrollReveal>
```

**Section 4: Wave Divider + Benefits**

```tsx
  <WaveDivider className="mt-16" fill="#111A16" />

  <section className="bg-surface py-16">
    <ScrollReveal className="max-w-4xl mx-auto px-6" delay={150}>
      <h2 className="font-heading font-semibold text-2xl text-foreground text-center mb-10">
        Fordeler
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {product.benefits.map((benefit, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-5 flex items-start gap-3"
          >
            <Sparkles className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
            <span className="font-body text-sm text-foreground/90">{benefit}</span>
          </div>
        ))}
      </div>
    </ScrollReveal>
```

**Section 5: Detail Columns (usage + origin)**

```tsx
    {(product.usage || product.ingredients || product.origin) && (
      <ScrollReveal className="max-w-4xl mx-auto px-6 mt-16" delay={200}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Usage / dosage */}
          {product.usage && (
            <div className="glass rounded-2xl p-8">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                Bruksanvisning
              </h3>
              <p className="font-body text-sm text-foreground/80 leading-relaxed">
                {product.usage}
              </p>
            </div>
          )}

          {/* Ingredients + Origin */}
          <div className="glass rounded-2xl p-8">
            {product.ingredients && (
              <>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                  Ingredienser
                </h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed mb-6">
                  {product.ingredients}
                </p>
              </>
            )}
            {product.origin && (
              <>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                  Opprinnelse
                </h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  {product.origin}
                </p>
              </>
            )}
          </div>
        </div>
      </ScrollReveal>
    )}
```

**Section 6: CTA Button**

```tsx
    <ScrollReveal className="max-w-4xl mx-auto px-6 mt-16 text-center" delay={250}>
      <button
        disabled={product.soldOut}
        className="inline-flex items-center gap-3 bg-accent-gold/90 hover:bg-accent-gold text-background font-body font-medium text-sm uppercase tracking-wider px-10 py-4 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ShoppingBag className="w-5 h-5" />
        {product.soldOut ? "Utsolgt" : "Kjøp nå"} — {product.price},00 NOK
      </button>
    </ScrollReveal>
  </section>
```

**Section 7: Related Products**

```tsx
  {related.length > 0 && (
    <>
      <WaveDivider flip fill="#111A16" />
      <section className="py-16">
        <ScrollReveal className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading font-semibold text-2xl text-foreground text-center mb-10">
            Lignende produkter
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </ScrollReveal>
      </section>
    </>
  )}

  <GrainOverlay />
</div>
```

**Step 2: Verify the build compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/app/products/\[id\]/page.tsx
git commit -m "feat: add editorial product detail page with Norwegian content"
```

---

## Task 4: Visual Verification

**Step 1: Start dev server and check pages**

Run: `npm run dev`

Test these URLs in browser:
- `/products` — verify cards link to `/products/[id]` now
- `/products/nmn-powder` — hero product, has all fields
- `/products/shilajit` — has image, all fields
- `/products/tongkat-extract` — no image, no ingredients
- `/products/creatine` — sold out state
- `/products/invalid-id` — should show 404

**Step 2: Check responsive layout**

- Mobile (375px): stacked layout, 2-col benefits grid
- Tablet (768px): 3-col benefits, 2-col details
- Desktop (1280px): full layout

**Step 3: Fix any issues found**

Address any TypeScript errors, layout issues, or missing data.

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: visual polish for product detail pages"
```

---

## Task 5: Update Products Page Text to Norwegian

**Files:**
- Modify: `src/app/products/page.tsx`

**Step 1: Update English text to Norwegian**

In `src/app/products/page.tsx`:
- Line 49: "Our Collection" → "Vår Kolleksjon"
- Line 52: "Premium natural supplements, carefully curated" → "Premium naturlige kosttilskudd, nøye utvalgt"
- Line 57: `{filtered.length} product{filtered.length !== 1 ? "s" : ""}` → `{filtered.length} produkt{filtered.length !== 1 ? "er" : ""}`

**Step 2: Verify**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add src/app/products/page.tsx
git commit -m "feat: translate products page text to Norwegian"
```
