import type { Metadata } from "next";
import { Cormorant, Jost } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
