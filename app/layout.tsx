import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { CalculatorProvider } from "@/components/calculator/CalculatorProvider";
import { PromoBar } from "@/components/layout/PromoBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileOrderBar } from "@/components/layout/MobileOrderBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { SITE } from "@/lib/site";
import "./globals.css";

// Font self-hosted (subset latin, scaricati da Google Fonts): nessuna richiesta esterna al caricamento.
const anton = localFont({
  src: "./fonts/Anton-400.woff2",
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});
const inter = localFont({
  src: "./fonts/Inter.woff2",
  weight: "400 700",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Boost Division Rivals FC 27 in Italia | SaliDivisione", template: "%s" },
  description:
    "Boost Division Rivals FC 27 su PC: sali di divisione, ricompense settimanali e coaching. Prezzi chiari da 15 €, stream gratis, ordini su WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#07090C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${anton.variable} ${inter.variable}`}>
      <body>
        <CalculatorProvider>
          <div className="page min-h-screen overflow-x-hidden">
            <PromoBar />
            <Header />
            <main id="contenuto">{children}</main>
            <Footer />
            <MobileOrderBar />
            <WhatsAppFloat />
          </div>
        </CalculatorProvider>
        <Analytics />
      </body>
    </html>
  );
}
