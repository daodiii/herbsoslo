# Product Detail Pages + Compact Descriptions — Design Doc

**Date:** 2026-03-02
**Status:** Approved

## Goal

1. Create compact, benefit-focused Norwegian product descriptions for all 20 products
2. Build a beautiful editorial/magazine-style product detail page at `/products/[id]`
3. Extend the product data model to support rich content

## Constraints

- All text in Norwegian
- Work within existing design system (forest green + gold, Cormorant/Jost, glassmorphism, grain, organic blobs)
- "Kjop na" button is non-functional placeholder
- Next.js 16 with App Router, TailwindCSS 4, TypeScript

---

## Part 1: Extended Product Data Model

Extend `Product` interface in `src/data/products.ts`:

```typescript
interface Product {
  // existing
  id: string;
  name: string;
  price: number;
  category: Category;
  featured: boolean;
  heroTile?: boolean;
  soldOut: boolean;
  shortName: string;
  image?: string;
  // new fields
  description: string;      // 2-3 sentence Norwegian intro
  benefits: string[];        // 4-6 scannable benefit strings
  usage?: string;            // dosage/usage text
  ingredients?: string;      // key ingredients
  origin?: string;           // brand/source context
}
```

## Part 2: Product Detail Page Layout

**Route:** `/products/[id]/page.tsx` (dynamic route, server component where possible)

### Section 1: Hero
- Full-width dark background (`--color-background`)
- Large product image centered (max ~400px wide, with subtle shadow)
- Organic blob in background (muted, behind image)
- Back link: "Tilbake til produkter" with arrow icon

### Section 2: Product Header
- Product name in Cormorant serif, large (text-4xl/5xl)
- Category badge pill (glass style)
- Price in gold accent (`--color-accent-gold`)
- Sold out badge if applicable

### Section 3: Short Description ("Kort om")
- 2-3 sentence intro in Jost, centered
- Max-width 65ch for optimal readability
- Line-height 1.6-1.75

### Section 4: Benefits Strip
- Horizontal layout of benefit items
- Each: Lucide icon + short text
- Gold accent on icons
- Wraps on mobile to 2-column grid
- Glass card background

### Section 5: Detail Columns (desktop: 2-col, mobile: stacked)
- **Left column — "Hva er [produkt]?"**: Extended description paragraph
- **Right column — "Bruksanvisning"**: Usage/dosage in a glass card (if available)

### Section 6: CTA
- "Kjop na" button, centered, gold/primary styling
- Price repeated
- Non-functional (no link)

### Section 7: Related Products
- "Lignende produkter" heading
- 3-4 products from same category
- Reuse existing ProductCard component
- Horizontal scroll on mobile

### Visual Treatment
- ScrollReveal fade-up on each section
- Wave divider between hero and content
- Grain overlay (existing GrainOverlay component)
- Organic blobs in background (existing OrganicBlobs)
- All animations respect prefers-reduced-motion

### Responsive Breakpoints
- Mobile (<768px): single column, stacked layout, smaller image
- Tablet (768-1024px): 2-col benefits, stacked detail columns
- Desktop (>1024px): full layout with side-by-side detail columns

---

## Part 3: All 20 Product Descriptions (Norwegian)

### 1. Methylene Blue
- **description:** "USP-grad metylenblatt er anerkjent for sine potente antioksidantegenskaper. Det noytraliserer effektivt skadelige frie radikaler og beskytter celler mot oksidativt stress."
- **benefits:** ["Forbedret hukommelse", "Okt cellulaer energi", "Nevrobeskyttende effekter", "Antimikrobielle egenskaper", "Stotter mitokondriell funksjon"]
- **usage:** "Kun til forsknings- og laboratoriebruk. Radfor deg med helsepersonell for bruk."
- **origin:** "USP (pharma) grade"

### 2. Black Ginger
- **description:** "Ren thailandsk svart ingefaer (Kaempferia parviflora), brukt i tradisjonell thailandsk urtemedisin i over tusen ar. Kjent for a oke fysisk ytelse og gi naturlig vitalitet."
- **benefits:** ["Forbedret atletisk ytelse", "Okt energi pa celleniva", "Beskytter hjernen mot stress", "Naturlig PDE5-hemmer", "Forbedret blodsirkulasjon"]
- **usage:** "100% rent pulver uten fyllstoffer eller tilsetningsstoffer."
- **ingredients:** "100% frysetoerket svart ingefaer"
- **origin:** "Addictive Wellness"

### 3. Berberine (Liposomal)
- **description:** "Berberin er et naturlig planteekstrakt med lang tradisjon i asiatisk medisin. Liposomal innkapsling gir betydelig bedre opptak enn standard berberin."
- **benefits:** ["Stotter blodsukkerregulering", "Forbedrer insulinfoolsomhet", "Senker LDL-kolesterol", "Stotter vektkontroll", "Anti-inflammatorisk", "Fremmer sunn tarmflora"]
- **usage:** "90 kapsler. Foelg anbefalt dosering pa pakken."
- **origin:** "Renue by Science — opptil 98% renhet, ISO/cGMP-sertifisert"

### 4. Cistanche
- **description:** "Cistanche tubulosa, kjent som oerkenginseng, er en hjornesten i tradisjonell kinesisk medisin. Standardisert til minimum 50% echinacoside og 10% acetosid."
- **benefits:** ["Stotter sunne testosteronniva", "Styrker immunforsvaret", "Forbedrer kognitive evner", "Kraftig antioksidant", "Oker vitalitet og energi"]
- **usage:** "60 tabletter. Foelg anbefalt dosering."
- **origin:** "Standardisert ekstrakt, kvalitetstestet"

### 5. Collagen
- **description:** "Premium kollagenhydrolysat fra 100% gressforet brasiliansk storfe. Hydrolyserte peptider absorberes raskt for optimal effekt pa hud, ledd og fordoyelse."
- **benefits:** ["Styrker bein og ledd", "Forbedrer hudens elastisitet", "Stotter muskelreparasjon", "Fremmer sunn fordoyelse", "Styrker har og negler"]
- **usage:** "Bland 1 spiseskje (10g) i varm eller kald drikke. Kan tas opptil to ganger daglig."
- **ingredients:** "100% ublandet kollagenhydrolysat, Type I og III"
- **origin:** "Nutraviva — glutenfri, GMO-fri, kosher-sertifisert"

### 6. Cordyceps
- **description:** "Cordyceps militaris soppekstrakt med hoye nivaer av Cordycepin — den viktigste bioaktive forbindelsen. Brukt i tradisjonell medisin i tusenvis av ar."
- **benefits:** ["Fremmer cellulaer funksjon", "Stotter immunsystemet", "Oker energi", "Forbedrer kognitiv funksjon", "Okt folelse av velvaere"]
- **usage:** "30g pulver. Bland i drikke eller smoothie."
- **origin:** "Cordyceps militaris ekstrakt"

### 7. Creatine
- **description:** "Creapure kreatin monohydrat — gullstandarden for renhet. Produsert i Tyskland under strenge kvalitetsstandarder, uten fyllstoffer eller tilsetningsstoffer."
- **benefits:** ["Naturlig energiproduksjon", "Stotter hjerneenergi og klarhet", "Opprettholder muskelmasse", "Ideal for plantebasert kosthold", "Stotter fysisk motstandskraft"]
- **usage:** "Bland i vann eller drikke. Daglig bruk anbefales."
- **ingredients:** "100% Creapure kreatin monohydrat"
- **origin:** "Nutraviva Creapure — tysk kvalitet, klinisk dokumentert"

### 8. Fadogia Agrestis
- **description:** "Fadogia Agrestis fra Soer- og Sentral-Afrika, omhyggelig laget som 10:1 ekstrakt for a opprettholde plantens naturlige egenskaper."
- **benefits:** ["Kan oke testosteronnivaer", "Forbedrer libido", "Stotter muskelvekst", "Fremmer restitusjon"]
- **usage:** "Maks to kapsler daglig. Bruk i sykluser: 2 uker pa / 1 uke av, eller 4 uker pa / 2 uker av."
- **origin:** "Barlowe's Herbal Elixirs — 10:1 ekstrakt"

### 9. Lion's Mane
- **description:** "Lion's Mane soppekstrakt standardisert til minimum 25% beta-glukan. Kjent for potensielle fordeler for hjerne- og nervesystemfunksjoner."
- **benefits:** ["Stotter kognitiv funksjon", "Forbedrer hukommelse", "Nevrobeskyttende egenskaper", "Anti-inflammatorisk", "Stotter nervevekst og reparasjon"]
- **usage:** "60 kapsler. Foelg anbefalt dosering."
- **origin:** "Nootropics Depot — hoeyeste kvalitetskontroll"

### 10. Magnesium
- **description:** "Magnesiumglysinat — et essensielt mineral for over 300 enzymsystemer i kroppen. Glycinatformen gir skansomst opptak."
- **benefits:** ["Bedre soevnkvalitet", "Stotter stressmestring", "Fremmer kognitiv funksjon", "Positiv innvirkning pa humoer", "Essensiell for enzymfunksjon"]
- **usage:** "180 kapsler. Foelg anbefalt dosering."
- **origin:** "Nootropics Depot — grundig laboratorietesting"

### 11. MicroZinc
- **description:** "MicroZinc er en svaert biotilgjengelig form for sukrosomalt sinkoksid — et allsidig kosttilskudd for generell velvaere."
- **benefits:** ["Stotter immunforsvaret", "Fremmer sarheling", "Bidrar til sunn hud", "Kan forbedre kognitive evner"]
- **usage:** "30 kapsler, 20mg per kapsel. Foelg anbefalt dosering."
- **origin:** "Nootropics Depot — strenge laboratorietester"

### 12. NMN Powder
- **description:** "NMN er en naturlig forloeper til NAD+, et kritisk koenzym for cellulaer energi og aldringsprosesser. 100g rent pulver med opptil 98% renhet."
- **benefits:** ["Oker NAD+-nivaer", "Stotter DNA-reparasjon", "Forbedrer energi og reduserer troeetthet", "Fremmer sunn aldring", "Stotter hukommelse og fokus", "Styrker immunforsvaret"]
- **usage:** "Rent pulver. Bland i vann eller drikke."
- **origin:** "Renue by Science — 98% renhet, ISO/cGMP-sertifisert"

### 13. Pine Pollen
- **description:** "Villhoestet furupollen fra uroerte naturomrader. Inneholder fyto-androgener, vitaminer, mineraler og enzymer som stoetter kroppens naturlige hormonbalanse."
- **benefits:** ["Stoetter hormonbalanse", "Naturlig testosteronstoette", "Oker energi og vitalitet", "Hoey biotilgjengelighet"]
- **usage:** "50g pulver. Bland i drikke eller smoothie."
- **origin:** "Lost Empire Herbs — villhoestet, uten tilsetningsstoffer"

### 14. Shilajit
- **description:** "Shilajit er en kraftig harpiks fra Himalaya, dannet over arhundrer av plantenedbrytning. Kalt 'fjellenes erobrer' i ayurvedisk tradisjon."
- **benefits:** ["Oker energi", "Stoetter testosteronnivaer", "Forbedrer hukommelse", "Stoetter fruktbarhet", "Anti-inflammatorisk"]
- **usage:** "30g harpiks. Bruk en liten mengde (ertestoerrelse) opploest i varm drikke."
- **origin:** "Himalaya-regionen, ayurvedisk tradisjon"

### 15. Ashwagandha
- **description:** "Shoden Ashwagandha med 35% withanolid-glykosider — den hoeyeste konsentrasjonen pa markedet. Klinisk testet adaptogen for stress og balanse."
- **benefits:** ["Stoetter kroppens stresshandtering", "Fremmer soevnkvalitet", "Forbedrer fokus", "Stoetter vitalitet", "Balansert inflammasjonsrespons"]
- **usage:** "30 kapsler. Foelg anbefalt dosering."
- **origin:** "Shoden — klinisk testet, 35% withanolider"

### 16. SLC NMN
- **description:** "Enterisk NMN med forsinket frigjoeringsteknologi for optimal absorpsjon. Sinkfri formel fra Renue by Science med opptil 98% renhet."
- **benefits:** ["Stoetter NAD+-produksjon", "Cellulaer energi", "DNA-reparasjon", "Forbedrer soevn og doegnrytme", "Styrker immunforsvaret"]
- **usage:** "60 kapsler med forsinket frigoering. Foelg anbefalt dosering."
- **origin:** "Renue by Science — enterisk, sinkfri, 98% renhet"

### 17. Tongkat Ali (Solaray)
- **description:** "Verdens mest solgte Tongkat Ali fra Solaray. Eurycoma longifolia har vaert brukt i soeroestasiatisk tradisjonell medisin i arhundrer."
- **benefits:** ["Okt testosteronproduksjon", "Bedre libido", "Okt muskelmasse", "Reduserer stress og angst"]
- **usage:** "60 vegankapsler, 400mg per kapsel."
- **origin:** "Solaray — verdens mest solgte Tongkat Ali"

### 18. Tongkat Ali Extract
- **description:** "Tongkat Ali-ekstrakt standardisert til 2% eurycomanone — den mest aktive forbindelsen for vitalitet og styrke."
- **benefits:** ["Fremmer testosteronnivaer", "Oker drivkraft og energi", "Stoetter muskelmasse", "Forbedrer fysisk ytelse"]
- **usage:** "60 kapsler. Foelg anbefalt dosering."
- **origin:** "2% eurycomanone standardisert ekstrakt"

### 19. Vitamin D3+K2
- **description:** "Kombinasjonen av vitamin D3, K2 (MK-7) og C gir omfattende stoette for immunforsvar, beinbygning og hjerte-karsystemet."
- **benefits:** ["Styrker immunforsvaret", "Oker beintetthet", "Stoetter hjerte-karhelse", "Forbedrer arteriell fleksibilitet", "Reduserer forkalkninger"]
- **usage:** "60 tabletter. Foelg anbefalt dosering."

### 20. Taurine
- **description:** "Taurin er en betinget essensiell aminosyre som finnes naturlig i kroppen. Tilskudd kan heve taurinreservene for forbedret ytelse og helse."
- **benefits:** ["Reduserer muskelskader", "Oker utholdenhet", "Forbedrer insulinfoolsomhet", "Stoetter fordoyelse", "Styrker immunforsvaret"]
- **usage:** "250g pulver. Bland i vann eller drikke."

---

## Technical Notes

- Update ProductCard links from `#${id}` to `/products/${id}`
- Product detail page is primarily a server component (static data)
- Use `generateStaticParams` for static generation of all product pages
- Reuse existing components: ScrollReveal, OrganicBlobs, GrainOverlay, WaveDivider, ProductCard
