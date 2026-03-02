import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Hjem" },
  { href: "/products", label: "Produkter" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-[rgba(201,168,76,0.08)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <Link href="/" className="font-heading text-xl text-foreground cursor-pointer">
              OSLOHERBS
            </Link>
            <p className="font-body text-xs text-muted mt-1">Drevet av naturen</p>
          </div>

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
            &copy; {new Date().getFullYear()} Oslo Herbs. Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </footer>
  );
}
