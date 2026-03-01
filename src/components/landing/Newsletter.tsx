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
                className="flex-1 glass rounded-[20px] px-5 py-3.5 font-body text-sm text-foreground placeholder:text-muted bg-transparent outline-none focus:border-accent-gold transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-accent-gold text-background font-body text-sm uppercase tracking-wider px-8 py-3.5 rounded-[20px] hover:bg-[#D4B355] transition-colors duration-200 cursor-pointer shrink-0"
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
