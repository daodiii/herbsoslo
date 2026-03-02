"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { OrganicBlobs } from "@/components/OrganicBlobs";
import { GrainOverlay } from "@/components/GrainOverlay";

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <OrganicBlobs />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16 text-center">
          <ScrollReveal>
            <p className="font-body text-sm text-muted uppercase tracking-[0.2em] mb-6">
              Kontakt oss
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-foreground">
              Vi hører gjerne{" "}
              <span className="text-accent-gold">fra deg</span>
            </h1>
            <p className="font-body text-lg text-muted mt-6 max-w-2xl mx-auto leading-relaxed">
              Har du spørsmål om produktene våre, bestillinger eller noe annet?
              Send oss en melding, så svarer vi så raskt vi kan.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6">
          <ScrollReveal>
            {submitted ? (
              <div className="glass rounded-[20px] p-10 md:p-14 text-center">
                <div className="w-16 h-16 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center mx-auto mb-6">
                  <Send size={28} className="text-accent-gold" />
                </div>
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
                  Takk for din melding!
                </h2>
                <p className="font-body text-muted leading-relaxed">
                  Vi har mottatt meldingen din og vil svare deg så snart som
                  mulig. Du hører fra oss innen 1–2 virkedager.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 font-body text-sm text-accent-gold hover:text-foreground transition-colors duration-200 uppercase tracking-wider cursor-pointer"
                >
                  Send en ny melding
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-[20px] p-8 md:p-12 space-y-6"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block font-body text-sm text-muted uppercase tracking-wider mb-2"
                  >
                    Navn
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Ditt fulle navn"
                    className="w-full bg-[rgba(10,15,13,0.5)] border border-[rgba(201,168,76,0.15)] rounded-[12px] px-5 py-3 font-body text-foreground placeholder:text-[rgba(139,154,143,0.5)] focus:border-accent-gold focus:outline-none transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block font-body text-sm text-muted uppercase tracking-wider mb-2"
                  >
                    E-post
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="din@epost.no"
                    className="w-full bg-[rgba(10,15,13,0.5)] border border-[rgba(201,168,76,0.15)] rounded-[12px] px-5 py-3 font-body text-foreground placeholder:text-[rgba(139,154,143,0.5)] focus:border-accent-gold focus:outline-none transition-colors duration-200"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block font-body text-sm text-muted uppercase tracking-wider mb-2"
                  >
                    Emne
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Hva gjelder henvendelsen?"
                    className="w-full bg-[rgba(10,15,13,0.5)] border border-[rgba(201,168,76,0.15)] rounded-[12px] px-5 py-3 font-body text-foreground placeholder:text-[rgba(139,154,143,0.5)] focus:border-accent-gold focus:outline-none transition-colors duration-200"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-body text-sm text-muted uppercase tracking-wider mb-2"
                  >
                    Melding
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Skriv din melding her..."
                    className="w-full bg-[rgba(10,15,13,0.5)] border border-[rgba(201,168,76,0.15)] rounded-[12px] px-5 py-3 font-body text-foreground placeholder:text-[rgba(139,154,143,0.5)] focus:border-accent-gold focus:outline-none transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-accent-gold text-background font-body text-sm uppercase tracking-wider py-3.5 rounded-[12px] hover:bg-[#d4b35a] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Send melding
                  <Send size={16} />
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      <GrainOverlay />
    </main>
  );
}
