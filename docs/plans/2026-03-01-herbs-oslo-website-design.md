# Oslo Herbs Website Design — "The Ancient Apothecary"

**Date:** 2026-03-01
**Stack:** Next.js + Tailwind CSS
**Phases:** 2 (Landing Page, Product Page)

---

## Concept

Dark Forest Apothecary — walking into a dimly-lit Nordic herbal workshop. Deep emerald/black canvas with gold accents, glassmorphic cards that glow like potion bottles on shelves. Organic blob shapes float in the background like wisps of herbal smoke.

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0A0F0D` | Page background |
| `--surface` | `#111A16` | Elevated surfaces |
| `--card` | `rgba(27, 67, 50, 0.25)` | Glassmorphic cards |
| `--card-border` | `rgba(201, 168, 76, 0.15)` | Gold border whisper |
| `--card-border-hover` | `rgba(201, 168, 76, 0.4)` | Gold border hover |
| `--primary` | `#1B4332` | Deep forest green |
| `--accent-gold` | `#C9A84C` | Apothecary gold |
| `--accent-green` | `#4ADE80` | Fresh herb glow |
| `--text` | `#E8E4D9` | Warm parchment text |
| `--text-muted` | `#8B9A8F` | Sage gray text |
| `--glass-blur` | `20px` | Backdrop blur amount |

### Typography

- **Heading:** Cormorant (400, 500, 600, 700)
- **Body:** Jost (300, 400, 500, 600)
- **Accent/Quotes:** Cormorant Italic

### Spacing & Radius

- Section gap: 120px desktop / 80px mobile
- Card radius: 20px
- Navbar radius: 16px
- Organic blobs: 50% radius with irregular transforms

### Key Effects

- Glassmorphism: `backdrop-filter: blur(20px)` + translucent bg + thin gold border
- Grain texture: SVG noise filter at 0.03 opacity, covers full page
- Organic blobs: CSS radial gradients with slow `animation: drift 20s ease-in-out infinite`
- Bent section dividers: SVG wave paths between sections
- Scroll-triggered entrance animations via Intersection Observer
- Hover: `translateY(-4px)` lift + gold border intensity increase + 200ms transitions

---

## Phase 1: Landing Page

### Shared — Floating Navbar
- Glassmorphic bar: `top-4 left-4 right-4`, `backdrop-blur(20px)`, `bg: rgba(10,15,13,0.7)`
- Logo (text "OSLOHERBS" in Cormorant) left
- Nav links center: Home, Products, About, Contact
- Cart icon right with item count badge (gold)
- Blur intensifies on scroll (bg opacity increases)
- Mobile: hamburger opens full-screen glassmorphic overlay
- `z-index: 50`, `position: fixed`

### Section 1 — Hero (100vh)
- Dark mesh gradient background with 3 floating organic blobs:
  - Blob 1: Deep green `#1B4332`, top-right, 400px, slow drift
  - Blob 2: Gold tint `rgba(201,168,76,0.08)`, bottom-left, 300px
  - Blob 3: Emerald `#0D3321`, center-right, 250px
- Grain texture overlay full section
- Left content (60% width):
  - Subheading: "Oslo's Premium Supplement Collection" in Jost 400, text-muted, uppercase tracking-wider
  - Heading: "Nature's Most Powerful Remedies" in Cormorant 700, 4xl-6xl responsive, text-primary. "Powerful" highlighted in accent-gold
  - Body text: 1-2 lines in Jost 300, text-muted
  - CTA: Glassmorphic button "Explore Collection" with gold border, hover fills gold
  - Secondary CTA: Text link "Learn More" with arrow
- Right content (40% width):
  - Decorative botanical SVG silhouettes (leaf, herb branch) in `#1B4332` with soft box-shadow glow
  - Subtle parallax on scroll
- Glassmorphic floating badge top-right: "Free Shipping 1000+ NOK"

### Section 2 — Trust Bar
- Curved SVG wave divider on top edge
- Glassmorphic strip: `bg: rgba(27,67,50,0.15)`, `backdrop-blur(16px)`
- 4 items in flex row:
  1. "100% Natural" — Leaf icon (Lucide)
  2. "Lab Tested" — FlaskConical icon
  3. "Fast Shipping" — Truck icon
  4. "Trusted Brands" — ShieldCheck icon
- Each: icon in accent-gold + text in text-primary
- Staggered entrance animation on scroll

### Section 3 — Featured Products (Mini Bento)
- Curved wave divider top
- Section title: "Curated for You" in Cormorant 600, center-aligned
- Subtitle: "Our most popular natural supplements" in Jost 300, text-muted
- Bento grid (CSS Grid):
  ```
  Layout (desktop):
  [  NMN (2-row)  ] [ Shilajit    ] [ Ashwagandha ]
  [               ] [ Lion's Mane ] [ Tongkat Ali  ]
  ```
  - NMN gets `grid-row: span 2` (hero tile)
  - All cards: glassmorphic, gold border on hover, product image, name (Cormorant), price (Jost, gold), "View" button
  - Hover: lift + border glow + "View" slides up
- Mobile: stacked single column, NMN stays large

### Section 4 — Brand Story
- Split layout: 55% left / 45% right
- Left: Large organic blob decoration (CSS gradient) containing centered italic quote: "We believe nature holds the answer" in Cormorant Italic, text-primary
- Right:
  - Heading: "The Oslo Herbs Philosophy" in Cormorant 600
  - Paragraph: Curating premium natural supplements... in Jost 400
  - Glassmorphic stats card:
    - "20+" — Premium Products
    - "5+" — Trusted Brands
    - "1000+" — Happy Customers
  - Stats numbers in accent-gold, labels in text-muted

### Section 5 — Categories Preview
- Heading: "Browse by Category" in Cormorant 500
- Horizontal scrollable row of glassmorphic "capsule" buttons:
  - Mushrooms, Adaptogens, Longevity, Vitamins & Minerals, Amino Acids
- Each: rounded-full, glass bg, gold border on hover, Jost 400
- Links to product page with filter applied
- Scroll indicators (fade edges) on mobile

### Section 6 — Newsletter + Footer
- Curved SVG wave divider top
- Newsletter section:
  - Heading: "Join the Apothecary" in Cormorant 600
  - Subtitle: "Get early access to new arrivals and exclusive offers"
  - Glassmorphic input + gold-accent submit button
- Footer:
  - Logo, nav links, payment method icons (Visa, MC, Amex, Apple Pay, Klarna)
  - Copyright, "Powered by Nature" tagline
  - Subtle grain texture continues

---

## Phase 2: Product Page

### Header Area
- Same floating navbar
- Page title: "Our Collection" in Cormorant 700, large
- Product count badge: glassmorphic, "20 products"
- Short description in Jost 300

### Filter Bar
- Glassmorphic horizontal bar, sticky below navbar on scroll
- Category filters as pill buttons: All, Mushrooms, Adaptogens, Longevity, Vitamins & Minerals, Amino Acids
- Active filter: filled gold background
- Client-side filtering (no page reload)

### Product Categories
Products organized as:
- **Mushrooms:** Cordyceps, Lion's Mane
- **Adaptogens:** Ashwagandha, Tongkat Ali (both), Fadogia Agrestis, Cistanche, Pine Pollen
- **Longevity:** NMN (powder), SLC Enteric NMN, Berberine, Shilajit, Methylene Blue
- **Vitamins & Minerals:** Vitamin D3+K2, Magnesium Glycinate, MicroZinc
- **Amino Acids & Protein:** Creatine, Taurine, Collagen, Black Ginger

### Bento Grid Layout
- CSS Grid with `auto-fill` and explicit spans for featured items
- Desktop layout: 4 columns, varying row spans
  - Featured items (NMN, Shilajit, Berberine): `grid-column: span 2` or `grid-row: span 2`
  - Regular items: 1x1
- Tablet: 3 columns
- Mobile: 2 columns, featured items span full width

### Product Card
- Glassmorphic: `bg: rgba(27,67,50,0.2)`, `backdrop-blur(16px)`, `border: 1px solid rgba(201,168,76,0.1)`
- Image container: dark background, centered product photo, slight zoom on hover
- Content: Product name (Cormorant 500), price in accent-gold (Jost 500)
- Hover state:
  - Card lifts `translateY(-4px)`
  - Border transitions to `rgba(201,168,76,0.4)`
  - "Add to Cart" / "View Details" button slides up from bottom
  - Shadow: `0 8px 32px rgba(0,0,0,0.3)`
- Sold out: desaturated overlay + "Sold Out" badge in glassmorphic red-tint

---

## Complete Product Catalog (20 products)

| # | Product | Price (NOK) | Category | Featured | Status |
|---|---------|------------|----------|----------|--------|
| 1 | 1% Methylene Blue Solution USP 30ml | 439 | Longevity | No | In Stock |
| 2 | Freeze Dried Black Ginger 50g | 349 | Amino Acids & Protein | No | In Stock |
| 3 | Berberine (Liposomal) 90 caps | 539 | Longevity | Yes | In Stock |
| 4 | Cistanche tubulosa 60 Tablets | 489 | Adaptogens | No | In Stock |
| 5 | Collagen Hydrolysate 450g | 499 | Amino Acids & Protein | No | In Stock |
| 6 | Cordyceps Extract Powder 30g | 279 | Mushrooms | No | In Stock |
| 7 | Fadogia Agrestis 10:1 Extract 60 caps | 379 | Adaptogens | No | In Stock |
| 8 | Lion's Mane Mushroom 1:1 60 caps | 339 | Mushrooms | No | In Stock |
| 9 | Magnesium Glycinate 180 caps | 449 | Vitamins & Minerals | No | In Stock |
| 10 | MicroZinc 20mg 30 caps | 279 | Vitamins & Minerals | No | In Stock |
| 11 | NMN 100g Pure Powder | 789 | Longevity | Yes (Hero) | In Stock |
| 12 | Pine Pollen 50g | 269 | Adaptogens | No | In Stock |
| 13 | Shilajit Resin 30g | 450 | Longevity | Yes | In Stock |
| 14 | Shoden Ashwagandha 30 Caps | 279 | Adaptogens | No | In Stock |
| 15 | SLC Enteric NMN Zinc Free 60ct | 349 | Longevity | No | In Stock |
| 16 | Solaray Tongkat Ali 400mg 60 caps | 269 | Adaptogens | No | In Stock |
| 17 | Tongkat Ali Extract 60 caps | 319 | Adaptogens | No | In Stock |
| 18 | Vitamin D3 + K2 + C 60 Tablets | 249 | Vitamins & Minerals | No | In Stock |
| 19 | Creapure Creatine Monohydrate 300g | 319 | Amino Acids & Protein | No | Sold Out |
| 20 | Taurine Powder 250g | 229 | Amino Acids & Protein | No | Sold Out |

---

## Technical Notes

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v3+ with custom theme
- **Fonts:** Google Fonts (Cormorant + Jost)
- **Icons:** Lucide React
- **Animations:** CSS animations + Intersection Observer for scroll triggers
- **Images:** Next.js Image component with placeholder blur
- **Responsive:** Mobile-first, breakpoints at sm(640), md(768), lg(1024), xl(1280)
- **Accessibility:** WCAG AA contrast, focus states, reduced-motion support, semantic HTML
