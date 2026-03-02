import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { OrganicBlobs } from "@/components/OrganicBlobs";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <OrganicBlobs />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Left content — 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          <p className="font-body text-sm text-muted uppercase tracking-[0.2em]">
            Håndplukket for din helse
          </p>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] text-foreground">
            Naturens beste{" "}
            <span className="text-accent-gold">kosttilskudd</span>
          </h1>

          <p className="font-body text-lg text-muted max-w-lg leading-relaxed">
            Vi håndplukker de beste naturlige kosttilskuddene, adaptogenene og
            urteekstraktene — levert fra Oslo rett til din dør.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/products"
              className="glass glass-hover rounded-[20px] px-8 py-3.5 font-body text-sm uppercase tracking-wider text-foreground hover:bg-accent-gold hover:text-background transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
            >
              Utforsk kolleksjonen
              <ArrowRight size={16} />
            </Link>
            <a
              href="#about"
              className="font-body text-sm text-muted hover:text-accent-gold transition-colors duration-200 cursor-pointer inline-flex items-center gap-1"
            >
              Les mer <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Right decorative — 2 cols */}
        <div className="hidden lg:flex lg:col-span-2 items-center justify-center relative">
          <Image
              src="/Code_Generated_Image.png"
              alt="OsloHerbs logo"
              width={800}
              height={800}
              className="w-[900px] max-w-none h-auto drop-shadow-[0_0_80px_rgba(27,67,50,0.4)]"
              priority
            />

          {/* Floating shipping badge */}
          <div className="absolute top-8 right-0 glass rounded-full px-5 py-2.5">
            <p className="font-body text-xs text-accent-gold tracking-wider">
              Fri frakt over 1000 NOK
            </p>
          </div>
        </div>

        {/* Mobile shipping badge */}
        <div className="lg:hidden glass rounded-full px-5 py-2.5 inline-flex self-start">
          <p className="font-body text-xs text-accent-gold tracking-wider">
            Fri frakt over 1000 NOK
          </p>
        </div>
      </div>
    </section>
  );
}
