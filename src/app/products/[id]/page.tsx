import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShoppingBag, ArrowLeft, ShieldCheck } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { OrganicBlobs } from "@/components/OrganicBlobs";
import { GrainOverlay } from "@/components/GrainOverlay";
import { WaveDivider } from "@/components/WaveDivider";

/* ---------- Static generation ---------- */

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

/* ---------- Dynamic metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return { title: "Produkt ikke funnet | Oslo Herbs" };
  }

  return {
    title: `${product.shortName} | Oslo Herbs`,
    description: product.description,
  };
}

/* ---------- Page ---------- */

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const hasDetails = !!(product.usage || product.ingredients || product.origin);

  return (
    <main className="relative min-h-screen">
      {/* ── A. Background + Back Navigation ── */}
      <OrganicBlobs
        blobs={[
          {
            color: "bg-[#1B4332]",
            size: "w-[280px] h-[280px] md:w-[360px] md:h-[360px]",
            position: "top-10 -right-16",
            animation: "animate-drift-slow",
          },
          {
            color: "bg-[rgba(201,168,76,0.06)]",
            size: "w-[220px] h-[220px] md:w-[280px] md:h-[280px]",
            position: "bottom-40 -left-16",
            animation: "animate-drift",
          },
        ]}
      />

      <div className="relative z-10">
        {/* Back link */}
        <div className="max-w-5xl mx-auto px-6 pt-28">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-accent-gold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til produkter
          </Link>
        </div>

        {/* ── B + C + D + G. Image + Product Info Side by Side ── */}
        <ScrollReveal className="mt-10 max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
            {/* Left: Hero Image */}
            <div className="relative w-full md:w-1/2 max-w-[400px] mx-auto md:mx-0 aspect-square rounded-[24px] overflow-hidden bg-[rgba(27,67,50,0.3)] shrink-0">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 90vw, 400px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-7xl text-primary opacity-30">
                    {product.shortName.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Product Info + Buy Button */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2">
              {/* Category badge */}
              <span className="inline-block glass rounded-full px-4 py-1.5 font-body text-xs text-accent-gold uppercase tracking-wider">
                {product.category}
              </span>

              {/* Short name as h1 */}
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mt-5 leading-tight">
                {product.shortName}
              </h1>

              {/* Full name subtitle */}
              <p className="font-body text-muted mt-2 text-base">
                {product.name}
              </p>

              {/* Price */}
              <p className="font-body text-accent-gold text-2xl font-medium mt-4">
                {product.price},00 NOK
              </p>

              {/* Sold out badge */}
              {product.soldOut && (
                <span className="inline-block mt-3 bg-[rgba(239,68,68,0.2)] backdrop-blur-sm border border-[rgba(239,68,68,0.3)] rounded-full px-4 py-1.5 font-body text-sm text-red-400 uppercase tracking-wider">
                  Utsolgt
                </span>
              )}

              {/* Short Description */}
              <p className="font-body text-lg text-foreground/80 leading-relaxed mt-6">
                {product.description}
              </p>

              {/* CTA Button */}
              <button
                disabled={product.soldOut}
                className={`mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 font-body text-sm uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                  product.soldOut
                    ? "bg-muted/20 text-muted cursor-not-allowed"
                    : "bg-accent-gold/90 hover:bg-accent-gold text-background"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {product.soldOut
                  ? `Utsolgt — ${product.price},00 NOK`
                  : `Kjøp nå — ${product.price},00 NOK`}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ── E. Benefits Section ── */}
        <div className="mt-16">
          <WaveDivider fill="#111A16" />

          <section className="bg-surface py-16 px-6">
            <ScrollReveal className="max-w-5xl mx-auto">
              <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground text-center mb-10">
                Fordeler
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.benefits.map((benefit, i) => (
                  <ScrollReveal key={i} delay={100 + i * 50}>
                    <div className="glass rounded-2xl p-5 h-full flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-foreground leading-snug">
                        {benefit}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </section>

          <WaveDivider flip fill="#111A16" />
        </div>

        {/* ── F. Detail Columns ── */}
        {hasDetails && (
          <ScrollReveal delay={200} className="max-w-5xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Usage */}
              {product.usage && (
                <div className="glass rounded-2xl p-6 md:p-8">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                    Bruksanvisning
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {product.usage}
                  </p>
                </div>
              )}

              {/* Right: Ingredients & Origin */}
              {(product.ingredients || product.origin) && (
                <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
                  {product.ingredients && (
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                        Ingredienser
                      </h3>
                      <p className="font-body text-sm text-muted leading-relaxed">
                        {product.ingredients}
                      </p>
                    </div>
                  )}
                  {product.origin && (
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                        Opprinnelse
                      </h3>
                      <p className="font-body text-sm text-muted leading-relaxed">
                        {product.origin}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* ── F2. Certificates Section ── */}
        {product.certificates && product.certificates.length > 0 && (
          <div className="mt-4">
            <WaveDivider fill="#111A16" />

            <section className="bg-surface py-16 px-6">
              <ScrollReveal className="max-w-5xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-10">
                  <ShieldCheck className="w-7 h-7 text-accent-gold" />
                  <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground text-center">
                    Sertifikater
                  </h2>
                </div>

                <p className="font-body text-muted text-center max-w-xl mx-auto mb-10 text-sm">
                  Alle våre produkter leveres med dokumentasjon som bekrefter kvalitet, renhet og autentisitet.
                </p>

                <div className={`grid gap-5 ${
                  product.certificates.length === 1
                    ? "grid-cols-1 max-w-md mx-auto"
                    : product.certificates.length === 2
                      ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}>
                  {product.certificates.map((cert, i) => (
                    <ScrollReveal key={i} delay={100 + i * 75}>
                      <a
                        href={cert}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block glass rounded-2xl overflow-hidden hover:ring-2 hover:ring-accent-gold/40 transition-all group"
                      >
                        <div className="relative w-full aspect-[3/4]">
                          <Image
                            src={cert}
                            alt={`Sertifikat ${i + 1} for ${product.shortName}`}
                            fill
                            className="object-contain p-3 group-hover:scale-[1.02] transition-transform duration-300"
                            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                          />
                        </div>
                      </a>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            <WaveDivider flip fill="#111A16" />
          </div>
        )}

        {/* Spacer before related products */}
        <div className="pb-16" />

        {/* ── H. Related Products ── */}
        {related.length > 0 && (
          <div>
            <WaveDivider flip fill="#111A16" />

            <section className="bg-surface py-16 px-6">
              <ScrollReveal className="max-w-7xl mx-auto">
                <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground text-center mb-10">
                  Lignende produkter
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {related.map((r, i) => (
                    <ScrollReveal key={r.id} delay={100 + i * 50}>
                      <ProductCard product={r} />
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </section>
          </div>
        )}
      </div>

      {/* ── I. Grain Overlay ── */}
      <GrainOverlay />
    </main>
  );
}
