# Oslo Herbs "Ancient Apothecary" Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Next.js website with two pages (Landing + Products) using the "Dark Forest Apothecary" aesthetic — glassmorphic cards, organic blobs, bent section dividers, bento grid, on a deep emerald/black canvas with gold accents.

**Architecture:** Next.js 14 App Router with Tailwind CSS custom theme. Static pages (no backend/API needed). Product data hardcoded in a data module. Shared layout with floating glassmorphic navbar. Each landing section is its own component. Product page uses client-side category filtering.

**Tech Stack:** Next.js 14+, Tailwind CSS v4, Google Fonts (Cormorant + Jost), Lucide React icons, CSS animations + Intersection Observer

**Design Doc:** `docs/plans/2026-03-01-herbs-oslo-website-design.md`

---

## Phase 1: Landing Page (Tasks 1-10)

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: project root via `create-next-app`
- Modify: `package.json` (verify deps)

**Step 1: Create Next.js app with Tailwind**

Run:
```bash
cd /Users/daodilyas/Desktop/herbsoslo
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --turbopack
```

When prompted, accept defaults. The `.` installs into the current directory.

**Step 2: Install dependencies**

Run:
```bash
npm install lucide-react
```

**Step 3: Verify project runs**

Run:
```bash
npm run dev
```

Expected: Dev server starts on `http://localhost:3000`, default Next.js page loads.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind and Lucide"
```

---

### Task 2: Design System — Tailwind Config + Global CSS + Fonts

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts` (if exists) or CSS `@theme` block

**Step 1: Set up Google Fonts in layout.tsx**

Replace `src/app/layout.tsx` entirely:

```tsx
import type { Metadata } from "next";
import { Cormorant, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oslo Herbs — Nature's Most Powerful Remedies",
  description:
    "Premium natural supplements and alternative medicine. Curated herbs, adaptogens, mushroom extracts, and longevity compounds delivered across Norway.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-background text-foreground font-body antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Set up globals.css with design tokens and Tailwind v4 theme**

Replace `src/app/globals.css` entirely:

```css
@import "tailwindcss";

@theme {
  --color-background: #0A0F0D;
  --color-surface: #111A16;
  --color-primary: #1B4332;
  --color-accent-gold: #C9A84C;
  --color-accent-green: #4ADE80;
  --color-foreground: #E8E4D9;
  --color-muted: #8B9A8F;
  --color-card: rgba(27, 67, 50, 0.25);
  --color-card-border: rgba(201, 168, 76, 0.15);
  --color-card-hover: rgba(201, 168, 76, 0.4);

  --font-heading: var(--font-cormorant), "Cormorant", serif;
  --font-body: var(--font-jost), "Jost", sans-serif;

  --radius-card: 20px;
  --radius-nav: 16px;
}

/* Grain texture overlay */
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* Organic blob animations */
@keyframes drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -20px) scale(1.05); }
  50% { transform: translate(-20px, 30px) scale(0.95); }
  75% { transform: translate(20px, 20px) scale(1.02); }
}

@keyframes drift-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-40px, 20px) scale(1.08); }
  66% { transform: translate(30px, -30px) scale(0.96); }
}

/* Scroll-triggered entrance animations */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up 0.6s ease-out forwards;
}

.animate-drift {
  animation: drift 20s ease-in-out infinite;
}

.animate-drift-slow {
  animation: drift-slow 25s ease-in-out infinite;
}

/* Glassmorphic utility */
.glass {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(27, 67, 50, 0.25);
  border: 1px solid rgba(201, 168, 76, 0.15);
}

.glass-hover:hover {
  border-color: rgba(201, 168, 76, 0.4);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-drift,
  .animate-drift-slow,
  .animate-fade-up {
    animation: none;
  }
}
```

**Step 3: Verify fonts load — update page.tsx with a test**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-6xl text-foreground">Oslo Herbs</h1>
        <p className="font-body text-xl text-muted mt-4">Design system loaded</p>
        <div className="mt-8 glass rounded-[20px] p-6 inline-block">
          <p className="text-accent-gold font-heading text-2xl">Glassmorphic Card</p>
        </div>
      </div>
      <div className="grain-overlay" />
    </main>
  );
}
```

**Step 4: Run dev server and verify**

Run: `npm run dev`
Expected: Dark background (#0A0F0D), Cormorant heading, Jost body, glassmorphic card with gold text visible. Grain texture barely visible.

**Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/app/page.tsx
git commit -m "feat: establish design system — colors, fonts, glass utilities, grain overlay"
```

---

### Task 3: Shared Components — WaveDivider, OrganicBlobs, GrainOverlay, ScrollReveal

**Files:**
- Create: `src/components/WaveDivider.tsx`
- Create: `src/components/OrganicBlobs.tsx`
- Create: `src/components/GrainOverlay.tsx`
- Create: `src/components/ScrollReveal.tsx`

**Step 1: Create GrainOverlay component**

Create `src/components/GrainOverlay.tsx`:

```tsx
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
```

**Step 2: Create WaveDivider component**

Create `src/components/WaveDivider.tsx`:

```tsx
interface WaveDividerProps {
  flip?: boolean;
  className?: string;
  fill?: string;
}

export function WaveDivider({ flip = false, className = "", fill = "#0A0F0D" }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px] lg:h-[120px]"
      >
        <path
          d="M0,40 C360,120 720,0 1080,80 C1260,120 1380,40 1440,60 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
```

**Step 3: Create OrganicBlobs component**

Create `src/components/OrganicBlobs.tsx`:

```tsx
interface BlobConfig {
  color: string;
  size: string;
  position: string;
  animation: string;
}

interface OrganicBlobsProps {
  blobs?: BlobConfig[];
}

const defaultBlobs: BlobConfig[] = [
  {
    color: "bg-[#1B4332]",
    size: "w-[300px] h-[300px] md:w-[400px] md:h-[400px]",
    position: "top-20 -right-20",
    animation: "animate-drift",
  },
  {
    color: "bg-[rgba(201,168,76,0.08)]",
    size: "w-[250px] h-[250px] md:w-[300px] md:h-[300px]",
    position: "bottom-20 -left-20",
    animation: "animate-drift-slow",
  },
  {
    color: "bg-[#0D3321]",
    size: "w-[200px] h-[200px] md:w-[250px] md:h-[250px]",
    position: "top-1/2 right-1/4",
    animation: "animate-drift",
  },
];

export function OrganicBlobs({ blobs = defaultBlobs }: OrganicBlobsProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl opacity-60 ${blob.color} ${blob.size} ${blob.position} ${blob.animation}`}
        />
      ))}
    </div>
  );
}
```

**Step 4: Create ScrollReveal component**

Create `src/components/ScrollReveal.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

**Step 5: Commit**

```bash
git add src/components/
git commit -m "feat: add shared components — WaveDivider, OrganicBlobs, GrainOverlay, ScrollReveal"
```

---

### Task 4: Floating Glassmorphic Navbar

**Files:**
- Create: `src/components/Navbar.tsx`

**Step 1: Create Navbar component**

Create `src/components/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-4 left-4 right-4 z-50 rounded-[var(--radius-nav)] border transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(10,15,13,0.9)] border-[rgba(201,168,76,0.2)]"
            : "bg-[rgba(10,15,13,0.6)] border-[rgba(201,168,76,0.1)]"
        } backdrop-blur-xl`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading text-2xl text-foreground tracking-wide cursor-pointer">
            OSLOHERBS
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-muted hover:text-accent-gold transition-colors duration-200 tracking-wider uppercase cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <button
              className="relative text-foreground hover:text-accent-gold transition-colors duration-200 cursor-pointer"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent-gold text-background text-[10px] font-body font-semibold rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-foreground hover:text-accent-gold transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(10,15,13,0.95)] backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-3xl text-foreground hover:text-accent-gold transition-colors cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
```

**Step 2: Add Navbar to layout.tsx**

In `src/app/layout.tsx`, import and add the Navbar inside `<body>` above `{children}`:

```tsx
import { Navbar } from "@/components/Navbar";
```

Add inside body:
```tsx
<Navbar />
{children}
```

**Step 3: Verify**

Run: `npm run dev`
Expected: Floating glass navbar with "OSLOHERBS" logo, nav links, cart icon. Becomes more opaque on scroll. Hamburger menu works on mobile viewport.

**Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/app/layout.tsx
git commit -m "feat: add floating glassmorphic navbar with mobile overlay"
```

---

### Task 5: Hero Section

**Files:**
- Create: `src/components/landing/HeroSection.tsx`
- Create: `src/components/BotanicalSVG.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create BotanicalSVG decorative component**

Create `src/components/BotanicalSVG.tsx`:

```tsx
export function BotanicalSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main stem */}
      <path
        d="M200 480 C200 400, 180 350, 200 280 C220 210, 200 150, 200 80"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Left leaves */}
      <path
        d="M200 380 C160 360, 100 340, 80 300 C100 320, 160 330, 200 350"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M200 300 C150 270, 90 250, 60 200 C90 230, 150 250, 200 270"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M200 220 C170 190, 120 160, 100 120 C130 150, 170 170, 200 195"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* Right leaves */}
      <path
        d="M200 340 C240 320, 300 310, 320 270 C300 290, 240 300, 200 315"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M200 260 C250 230, 310 210, 340 170 C310 200, 250 215, 200 235"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M200 180 C230 150, 280 120, 300 80 C270 110, 230 135, 200 155"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* Top bud */}
      <circle cx="200" cy="75" r="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <circle cx="200" cy="75" r="3" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}
```

**Step 2: Create HeroSection component**

Create `src/components/landing/HeroSection.tsx`:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OrganicBlobs } from "@/components/OrganicBlobs";
import { BotanicalSVG } from "@/components/BotanicalSVG";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <OrganicBlobs />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Left content — 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          <p className="font-body text-sm text-muted uppercase tracking-[0.2em]">
            Oslo&apos;s Premium Supplement Collection
          </p>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] text-foreground">
            Nature&apos;s Most{" "}
            <span className="text-accent-gold">Powerful</span>{" "}
            Remedies
          </h1>

          <p className="font-body text-lg text-muted max-w-lg leading-relaxed">
            Curating the finest natural supplements, adaptogens, and herbal
            extracts — delivered from Oslo to your doorstep.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/products"
              className="glass glass-hover rounded-[var(--radius-card)] px-8 py-3.5 font-body text-sm uppercase tracking-wider text-foreground hover:bg-accent-gold hover:text-background transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
            <a
              href="#about"
              className="font-body text-sm text-muted hover:text-accent-gold transition-colors duration-200 cursor-pointer inline-flex items-center gap-1"
            >
              Learn More <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Right decorative — 2 cols */}
        <div className="hidden lg:flex lg:col-span-2 items-center justify-center relative">
          <BotanicalSVG className="w-[300px] h-[400px] text-primary drop-shadow-[0_0_60px_rgba(27,67,50,0.5)]" />

          {/* Floating shipping badge */}
          <div className="absolute top-8 right-0 glass rounded-full px-5 py-2.5">
            <p className="font-body text-xs text-accent-gold tracking-wider">
              Free Shipping 1000+ NOK
            </p>
          </div>
        </div>

        {/* Mobile shipping badge */}
        <div className="lg:hidden glass rounded-full px-5 py-2.5 inline-flex self-start">
          <p className="font-body text-xs text-accent-gold tracking-wider">
            Free Shipping 1000+ NOK
          </p>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Wire up page.tsx with Hero**

Replace `src/app/page.tsx`:

```tsx
import { GrainOverlay } from "@/components/GrainOverlay";
import { HeroSection } from "@/components/landing/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <GrainOverlay />
    </main>
  );
}
```

**Step 4: Verify**

Run: `npm run dev`
Expected: Full-viewport hero with floating blobs, botanical SVG, large heading with gold "Powerful", glassmorphic CTA button, shipping badge. Responsive at mobile.

**Step 5: Commit**

```bash
git add src/components/BotanicalSVG.tsx src/components/landing/HeroSection.tsx src/app/page.tsx
git commit -m "feat: add hero section with organic blobs, botanical SVG, and glassmorphic CTAs"
```

---

### Task 6: Trust Bar Section

**Files:**
- Create: `src/components/landing/TrustBar.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create TrustBar component**

Create `src/components/landing/TrustBar.tsx`:

```tsx
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
```

**Step 2: Add to page.tsx**

Import and add `<TrustBar />` after `<HeroSection />` in `src/app/page.tsx`.

**Step 3: Verify**

Expected: Curved wave divider at top, glassmorphic strip with 4 trust items, staggered fade-in on scroll.

**Step 4: Commit**

```bash
git add src/components/landing/TrustBar.tsx src/app/page.tsx
git commit -m "feat: add trust bar with wave divider and scroll-reveal animation"
```

---

### Task 7: Featured Products Mini Bento Section

**Files:**
- Create: `src/data/products.ts`
- Create: `src/components/ProductCard.tsx`
- Create: `src/components/landing/FeaturedProducts.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create product data module**

Create `src/data/products.ts`:

```ts
export type Category = "Mushrooms" | "Adaptogens" | "Longevity" | "Vitamins & Minerals" | "Amino Acids & Protein";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  featured: boolean;
  heroTile?: boolean;
  soldOut: boolean;
  shortName: string;
}

export const products: Product[] = [
  { id: "methylene-blue", name: "1% Methylene Blue Solution USP 30ml", shortName: "Methylene Blue", price: 439, category: "Longevity", featured: false, soldOut: false },
  { id: "black-ginger", name: "Freeze Dried Black Ginger 50g", shortName: "Black Ginger", price: 349, category: "Amino Acids & Protein", featured: false, soldOut: false },
  { id: "berberine", name: "Berberine (Liposomal) 90 caps", shortName: "Berberine", price: 539, category: "Longevity", featured: true, soldOut: false },
  { id: "cistanche", name: "Cistanche tubulosa 60 Tablets", shortName: "Cistanche", price: 489, category: "Adaptogens", featured: false, soldOut: false },
  { id: "collagen", name: "Collagen Hydrolysate 450g", shortName: "Collagen", price: 499, category: "Amino Acids & Protein", featured: false, soldOut: false },
  { id: "cordyceps", name: "Cordyceps Extract Powder 30g", shortName: "Cordyceps", price: 279, category: "Mushrooms", featured: false, soldOut: false },
  { id: "fadogia", name: "Fadogia Agrestis 10:1 Extract 60 caps", shortName: "Fadogia Agrestis", price: 379, category: "Adaptogens", featured: false, soldOut: false },
  { id: "lions-mane", name: "Lion's Mane Mushroom 1:1 60 caps", shortName: "Lion's Mane", price: 339, category: "Mushrooms", featured: false, soldOut: false },
  { id: "magnesium", name: "Magnesium Glycinate 180 caps", shortName: "Magnesium", price: 449, category: "Vitamins & Minerals", featured: false, soldOut: false },
  { id: "zinc", name: "MicroZinc 20mg 30 caps", shortName: "MicroZinc", price: 279, category: "Vitamins & Minerals", featured: false, soldOut: false },
  { id: "nmn-powder", name: "NMN 100g Pure Powder", shortName: "NMN Powder", price: 789, category: "Longevity", featured: true, heroTile: true, soldOut: false },
  { id: "pine-pollen", name: "Pine Pollen 50g", shortName: "Pine Pollen", price: 269, category: "Adaptogens", featured: false, soldOut: false },
  { id: "shilajit", name: "Shilajit Resin 30g", shortName: "Shilajit", price: 450, category: "Longevity", featured: true, soldOut: false },
  { id: "ashwagandha", name: "Shoden Ashwagandha 30 Caps", shortName: "Ashwagandha", price: 279, category: "Adaptogens", featured: false, soldOut: false },
  { id: "slc-nmn", name: "SLC Enteric NMN Zinc Free 60ct", shortName: "SLC NMN", price: 349, category: "Longevity", featured: false, soldOut: false },
  { id: "tongkat-solaray", name: "Solaray Tongkat Ali 400mg 60 caps", shortName: "Tongkat Ali (Solaray)", price: 269, category: "Adaptogens", featured: false, soldOut: false },
  { id: "tongkat-extract", name: "Tongkat Ali Extract 60 caps", shortName: "Tongkat Ali Extract", price: 319, category: "Adaptogens", featured: false, soldOut: false },
  { id: "vitamin-d3k2", name: "Vitamin D3 + K2 + C 60 Tablets", shortName: "Vitamin D3+K2", price: 249, category: "Vitamins & Minerals", featured: false, soldOut: false },
  { id: "creatine", name: "Creapure Creatine Monohydrate 300g", shortName: "Creatine", price: 319, category: "Amino Acids & Protein", featured: false, soldOut: true },
  { id: "taurine", name: "Taurine Powder 250g", shortName: "Taurine", price: 229, category: "Amino Acids & Protein", featured: false, soldOut: true },
];

export const categories: Category[] = ["Mushrooms", "Adaptogens", "Longevity", "Vitamins & Minerals", "Amino Acids & Protein"];
```

**Step 2: Create ProductCard component**

Create `src/components/ProductCard.tsx`:

```tsx
import type { Product } from "@/data/products";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  isHero?: boolean;
}

export function ProductCard({ product, isHero = false }: ProductCardProps) {
  return (
    <Link
      href={`/products#${product.id}`}
      className={`group relative glass glass-hover rounded-[var(--radius-card)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer flex flex-col ${
        product.soldOut ? "opacity-60 saturate-50" : ""
      }`}
    >
      {/* Image placeholder area */}
      <div className={`bg-[rgba(27,67,50,0.3)] flex items-center justify-center ${isHero ? "min-h-[200px] flex-1" : "h-[160px]"}`}>
        <span className="font-heading text-3xl text-primary opacity-30">{product.shortName.charAt(0)}</span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="font-heading text-lg text-foreground leading-snug">
          {product.shortName}
        </h3>
        <p className="font-body text-sm text-accent-gold font-medium">
          {product.price} NOK
        </p>
      </div>

      {/* Hover overlay — "View" button */}
      {!product.soldOut && (
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-4">
          <span className="block text-center glass rounded-full py-2 font-body text-xs uppercase tracking-wider text-accent-gold">
            View Details
          </span>
        </div>
      )}

      {/* Sold out badge */}
      {product.soldOut && (
        <div className="absolute top-3 right-3 bg-[rgba(239,68,68,0.2)] backdrop-blur-sm border border-[rgba(239,68,68,0.3)] rounded-full px-3 py-1">
          <span className="font-body text-xs text-red-400 uppercase tracking-wider">Sold Out</span>
        </div>
      )}
    </Link>
  );
}
```

**Step 3: Create FeaturedProducts section**

Create `src/components/landing/FeaturedProducts.tsx`:

```tsx
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { WaveDivider } from "@/components/WaveDivider";
import { ScrollReveal } from "@/components/ScrollReveal";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);
  const heroProduct = featured.find((p) => p.heroTile);
  const otherFeatured = featured.filter((p) => !p.heroTile);

  // Add two more popular products for the grid
  const extraPicks = products.filter(
    (p) => !p.featured && !p.soldOut && ["lions-mane", "tongkat-extract"].includes(p.id)
  );
  const gridProducts = [...otherFeatured, ...extraPicks];

  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">
            Curated for You
          </h2>
          <p className="font-body text-muted mt-3 max-w-md mx-auto">
            Our most popular natural supplements
          </p>
        </ScrollReveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Hero tile — spans 2 rows on desktop */}
          {heroProduct && (
            <ScrollReveal className="md:row-span-2">
              <ProductCard product={heroProduct} isHero />
            </ScrollReveal>
          )}

          {/* Other 4 products fill the remaining slots */}
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
```

**Step 4: Add to page.tsx**

Import and add `<FeaturedProducts />` after `<TrustBar />`.

**Step 5: Verify**

Expected: Bento grid with NMN as tall hero tile, 4 other products, glassmorphic cards, gold price, hover lift effect.

**Step 6: Commit**

```bash
git add src/data/products.ts src/components/ProductCard.tsx src/components/landing/FeaturedProducts.tsx src/app/page.tsx
git commit -m "feat: add featured products bento grid with product data module"
```

---

### Task 8: Brand Story Section

**Files:**
- Create: `src/components/landing/BrandStory.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create BrandStory component**

Create `src/components/landing/BrandStory.tsx`:

```tsx
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
          {/* Left — decorative quote */}
          <ScrollReveal>
            <div className="relative flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
              {/* Background blob */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(27,67,50,0.4),transparent_70%)]" aria-hidden="true" />
              <blockquote className="relative text-center px-8">
                <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed">
                  &ldquo;We believe nature holds the answer&rdquo;
                </p>
              </blockquote>
            </div>
          </ScrollReveal>

          {/* Right — story + stats */}
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

            {/* Stats card */}
            <ScrollReveal delay={200}>
              <div className="glass rounded-[var(--radius-card)] p-6">
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
```

**Step 2: Add to page.tsx**

Import and add `<BrandStory />` after `<FeaturedProducts />`.

**Step 3: Verify and commit**

```bash
git add src/components/landing/BrandStory.tsx src/app/page.tsx
git commit -m "feat: add brand story section with quote, philosophy, and stats"
```

---

### Task 9: Categories Preview Section

**Files:**
- Create: `src/components/landing/CategoriesPreview.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create CategoriesPreview component**

Create `src/components/landing/CategoriesPreview.tsx`:

```tsx
import Link from "next/link";
import { categories } from "@/data/products";
import { ScrollReveal } from "@/components/ScrollReveal";

export function CategoriesPreview() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground">
            Browse by Category
          </h2>
        </ScrollReveal>

        {/* Scrollable row with fade edges */}
        <div className="relative">
          {/* Fade edges */}
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
```

**Step 2: Add to page.tsx**

Import and add `<CategoriesPreview />` after `<BrandStory />`.

**Step 3: Commit**

```bash
git add src/components/landing/CategoriesPreview.tsx src/app/page.tsx
git commit -m "feat: add categories preview with scrollable glassmorphic pills"
```

---

### Task 10: Newsletter + Footer

**Files:**
- Create: `src/components/landing/Newsletter.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create Newsletter component**

Create `src/components/landing/Newsletter.tsx`:

```tsx
import { WaveDivider } from "@/components/WaveDivider";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Newsletter() {
  return (
    <section id="contact" className="relative">
      <WaveDivider fill="#111A16" />
      <div className="bg-surface py-16 md:py-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground">
              Join the Apothecary
            </h2>
            <p className="font-body text-muted mt-3">
              Get early access to new arrivals and exclusive offers
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <form className="mt-8 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 glass rounded-[var(--radius-card)] px-5 py-3.5 font-body text-sm text-foreground placeholder:text-muted bg-transparent outline-none focus:border-accent-gold transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-accent-gold text-background font-body text-sm uppercase tracking-wider px-8 py-3.5 rounded-[var(--radius-card)] hover:bg-[#D4B355] transition-colors duration-200 cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-[rgba(201,168,76,0.08)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="text-center md:text-left">
            <Link href="/" className="font-heading text-xl text-foreground cursor-pointer">
              OSLOHERBS
            </Link>
            <p className="font-body text-xs text-muted mt-1">Powered by Nature</p>
          </div>

          {/* Nav links */}
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs text-muted hover:text-accent-gold transition-colors cursor-pointer uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Payment icons (text placeholders) */}
          <div className="flex items-center gap-3">
            {["Visa", "MC", "Amex", "Apple Pay", "Klarna"].map((method) => (
              <span
                key={method}
                className="font-body text-[10px] text-muted border border-[rgba(201,168,76,0.1)] rounded px-2 py-1"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(201,168,76,0.05)] text-center">
          <p className="font-body text-xs text-muted">
            &copy; {new Date().getFullYear()} Oslo Herbs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: Add Newsletter to page.tsx, Footer to layout.tsx**

In `src/app/page.tsx`, import and add `<Newsletter />` after `<CategoriesPreview />`.

In `src/app/layout.tsx`, import `Footer` and add `<Footer />` after `{children}` inside body.

**Step 4: Verify full landing page**

Run: `npm run dev`
Expected: Complete landing page with all 6 sections, wave dividers between sections, grain overlay, smooth scroll reveals, glassmorphic cards, and footer.

**Step 5: Commit**

```bash
git add src/components/landing/Newsletter.tsx src/components/Footer.tsx src/app/page.tsx src/app/layout.tsx
git commit -m "feat: add newsletter section and footer — landing page complete"
```

---

## Phase 2: Product Page (Tasks 11-14)

---

### Task 11: Product Page — Filter Bar Component

**Files:**
- Create: `src/components/products/FilterBar.tsx`

**Step 1: Create FilterBar component**

Create `src/components/products/FilterBar.tsx`:

```tsx
"use client";

import { categories, type Category } from "@/data/products";

interface FilterBarProps {
  active: Category | "All";
  onChange: (category: Category | "All") => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  const allCategories: (Category | "All")[] = ["All", ...categories];

  return (
    <div className="sticky top-20 z-30 py-4">
      <div className="glass rounded-[var(--radius-card)] p-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`rounded-full px-5 py-2 font-body text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                active === cat
                  ? "bg-accent-gold text-background"
                  : "text-muted hover:text-foreground hover:bg-[rgba(201,168,76,0.1)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/products/FilterBar.tsx
git commit -m "feat: add product filter bar with category pills"
```

---

### Task 12: Product Page — Bento Grid Component

**Files:**
- Create: `src/components/products/ProductGrid.tsx`

**Step 1: Create ProductGrid component**

Create `src/components/products/ProductGrid.tsx`:

```tsx
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
        <p className="font-heading text-2xl text-muted">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {products.map((product, i) => {
        // Featured products get larger tiles
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
```

**Step 2: Commit**

```bash
git add src/components/products/ProductGrid.tsx
git commit -m "feat: add bento-style product grid with featured item spanning"
```

---

### Task 13: Product Page Assembly

**Files:**
- Create: `src/app/products/page.tsx`

**Step 1: Create the products page**

Create `src/app/products/page.tsx`:

```tsx
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

  // Sort: in-stock first, then featured first
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
        {/* Header */}
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

        {/* Filter bar */}
        <FilterBar active={activeCategory} onChange={setActiveCategory} />

        {/* Product grid */}
        <div className="mt-8">
          <ProductGrid products={sorted} />
        </div>
      </div>

      <GrainOverlay />
    </main>
  );
}
```

**Step 2: Verify**

Run: `npm run dev`, navigate to `/products`
Expected: Full product page with header, filter bar, bento grid. Clicking filters shows/hides products instantly. Featured products have larger tiles. Sold out products are dimmed with badges.

**Step 3: Commit**

```bash
git add src/app/products/page.tsx
git commit -m "feat: add products page with bento grid and category filtering"
```

---

### Task 14: Polish — Responsive Testing, Height Fixes, Final Touches

**Files:**
- Potentially modify: any component needing responsive fixes
- Modify: `src/app/globals.css` (scrollbar-hide utility)

**Step 1: Add scrollbar-hide utility to globals.css**

Add to `src/app/globals.css` at the bottom:

```css
/* Hide scrollbar for category/filter scroll */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

**Step 2: Test all breakpoints**

Run: `npm run dev`
Test at these widths:
- 375px (mobile) — single column products, stacked hero, hamburger nav
- 768px (tablet) — 3-column grid, hero layout adjusts
- 1024px (desktop) — full layout, 4-column product grid
- 1440px (wide) — content stays max-w-7xl, centered

**Step 3: Verify ProductCard height in bento grid**

Make sure the `isHero` ProductCard fills the full height of a 2-row span. If needed, add `h-full` to the ProductCard root element and the ScrollReveal wrapper.

In `src/components/ProductCard.tsx`, ensure the root `<Link>` has `h-full`:
```tsx
className={`group relative glass glass-hover ... h-full flex flex-col`}
```

In `src/components/products/ProductGrid.tsx` and `src/components/landing/FeaturedProducts.tsx`, ensure ScrollReveal wrappers for hero tiles include `h-full`:
```tsx
<ScrollReveal className="md:row-span-2 h-full">
```

**Step 4: Run build to check for errors**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: polish responsive layout, scrollbar-hide, and bento grid heights"
```

---

## Summary

| Phase | Tasks | What it delivers |
|-------|-------|-----------------|
| Phase 1 | Tasks 1-10 | Complete landing page: Hero, Trust Bar, Featured Products Bento, Brand Story, Categories, Newsletter, Footer |
| Phase 2 | Tasks 11-14 | Complete product page: Filter Bar, Bento Grid, 20 products with categories, responsive layout |

**Total tasks:** 14
**Total commits:** 14

Each task is independently verifiable and committable. Tasks within each phase must be done sequentially (later tasks depend on earlier ones). Phase 2 depends on Phase 1 being complete (shared components + data module).
