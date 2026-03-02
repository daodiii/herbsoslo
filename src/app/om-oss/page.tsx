import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf, FlaskConical, Eye } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { OrganicBlobs } from "@/components/OrganicBlobs";
import { GrainOverlay } from "@/components/GrainOverlay";

export const metadata: Metadata = {
  title: "Om oss — Oslo Herbs",
  description:
    "Historien bak Oslo Herbs. Vi startet med en lidenskap for naturens kraft og en visjon om å gjøre premium kosttilskudd tilgjengelig for alle i Norge.",
};

const values = [
  {
    icon: Leaf,
    title: "Renhet",
    description:
      "Vi velger kun produkter med rene, naturlige ingredienser uten unødvendige tilsetningsstoffer eller fyllstoffer.",
  },
  {
    icon: FlaskConical,
    title: "Vitenskap",
    description:
      "Hvert produkt er støttet av forskning og tredjepartstestet for styrke, renhet og sikkerhet.",
  },
  {
    icon: Eye,
    title: "Åpenhet",
    description:
      "Full transparens om ingredienser, opprinnelse og testing. Du fortjener å vite hva du tar.",
  },
];

const qualityPoints = [
  "Håndplukket fra verdens mest anerkjente produsenter",
  "Tredjepartstestet for renhet og styrke",
  "Ingen kunstige tilsetningsstoffer eller fyllstoffer",
  "Sporbar opprinnelse på hvert produkt",
  "Oppbevart og sendt under optimale forhold",
];

export default function OmOssPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <OrganicBlobs />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
          <ScrollReveal>
            <p className="font-body text-sm text-muted uppercase tracking-[0.2em] mb-6">
              Vår historie
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-foreground">
              Fra lidenskap til{" "}
              <span className="text-accent-gold">naturens kraft</span>
            </h1>
            <p className="font-body text-lg text-muted mt-6 max-w-2xl mx-auto leading-relaxed">
              Oslo Herbs ble født ut av en personlig reise mot bedre helse
              — og en overbevisning om at naturen har de beste svarene.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Founder Story ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <ScrollReveal>
            <p className="font-body text-muted leading-relaxed text-lg">
              Det hele startet med en enkel frustrasjon: å finne naturlige
              kosttilskudd av høy kvalitet i Norge var overraskende vanskelig.
              Markedet var fullt av produkter med tvilsomme ingredienser,
              overdrevne påstander og manglende transparens. Vi visste at det
              fantes bedre alternativer der ute — vi måtte bare finne dem.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <blockquote className="relative my-12 py-8">
              <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(ellipse_at_center,rgba(27,67,50,0.3),transparent_70%)]" />
              <p className="relative font-heading italic text-2xl md:text-3xl text-foreground text-center leading-relaxed px-4">
                &ldquo;Vi ønsket ikke å lage enda et
                kosttilskuddsmerke. Vi ønsket å tilby
                det aller beste naturen har.&rdquo;
              </p>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="font-body text-muted leading-relaxed text-lg">
              Så vi begynte å lete. Vi reiste, forsket og testet hundrevis av
              produkter fra produsenter over hele verden. Vi besøkte
              laboratorier, snakket med forskere og stilte de vanskelige
              spørsmålene. Resultatet er Oslo Herbs — en nøye kuratert
              kolleksjon av naturlige kosttilskudd fra merkene vi stoler på
              mest.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="font-body text-muted leading-relaxed text-lg">
              I dag er Oslo Herbs mer enn en nettbutikk. Det er et løfte om
              kvalitet, ærlighet og en genuin tro på at naturen har kraften
              til å støtte kropp og sinn — når vi velger riktig.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="font-body text-sm text-muted uppercase tracking-[0.2em] mb-4">
                Våre verdier
              </p>
              <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground">
                Hva vi tror på
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 150}>
                <div className="glass rounded-[20px] p-8 h-full flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-5">
                    <item.icon size={22} className="text-accent-gold" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality Promise ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <p className="font-body text-sm text-muted uppercase tracking-[0.2em]">
                  Vårt løfte
                </p>
                <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground">
                  Kvalitet uten kompromiss
                </h2>
                <p className="font-body text-muted leading-relaxed">
                  Fra jord til hylle — vi kontrollerer hvert ledd i prosessen
                  for å sikre at du får det aller beste.
                </p>
                <ul className="space-y-3 pt-2">
                  {qualityPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-gold shrink-0" />
                      <span className="font-body text-sm text-muted leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
                <div
                  className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(27,67,50,0.4),transparent_70%)]"
                  aria-hidden="true"
                />
                <blockquote className="relative text-center px-8">
                  <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed">
                    &ldquo;Helsen din fortjener det beste&rdquo;
                  </p>
                </blockquote>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground mb-4">
              Klar til å oppleve forskjellen?
            </h2>
            <p className="font-body text-muted mb-8 leading-relaxed">
              Utforsk vår kuraterte kolleksjon av naturlige kosttilskudd
              — håndplukket for din helse.
            </p>
            <Link
              href="/products"
              className="glass glass-hover rounded-[20px] px-8 py-3.5 font-body text-sm uppercase tracking-wider text-foreground hover:bg-accent-gold hover:text-background transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
            >
              Utforsk kolleksjonen
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <GrainOverlay />
    </main>
  );
}
