"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/products", label: "Produkter" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
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
        className={`fixed top-4 left-4 right-4 z-50 rounded-[16px] border transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(10,15,13,0.9)] border-[rgba(201,168,76,0.2)]"
            : "bg-[rgba(10,15,13,0.6)] border-[rgba(201,168,76,0.1)]"
        } backdrop-blur-xl`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="font-heading text-2xl text-foreground tracking-wide cursor-pointer">
            OSLOHERBS
          </Link>

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

          <div className="flex items-center gap-4">
            <button
              className="relative text-foreground hover:text-accent-gold transition-colors duration-200 cursor-pointer"
              aria-label="Handlekurv"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent-gold text-background text-[10px] font-body font-semibold rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            <button
              className="md:hidden text-foreground hover:text-accent-gold transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

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
