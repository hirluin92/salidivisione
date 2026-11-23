import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { StatsStrip } from "@/components/home/StatsStrip";
import { Calculator } from "@/components/calculator/Calculator";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { EarningsChart } from "@/components/home/EarningsChart";
import { Comparison } from "@/components/home/Comparison";
import { Verify } from "@/components/home/Verify";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Safety } from "@/components/home/Safety";
import { ConsoleWaitlist } from "@/components/home/ConsoleWaitlist";
import { GuidesList } from "@/components/home/GuidesList";
import { FinalCta } from "@/components/home/FinalCta";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { generalFaq } from "@/content/faq";
import { breadcrumbLd, buildMetadata, faqLd, organizationLd, websiteLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Boost Division Rivals FC 27 in Italia | SaliDivisione",
  description:
    "Boost Division Rivals FC 27 su PC: sali di divisione da 15 €, ricompense settimanali e coaching. Stream gratis, rimborso garantito, ordini su WhatsApp.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          websiteLd(),
          faqLd(generalFaq),
          breadcrumbLd([{ name: "Home", path: "/" }]),
        ]}
      />
      <Hero />
      <Marquee />
      <StatsStrip />
      <Calculator />
      <ServicesGrid />
      <EarningsChart />
      <Comparison />
      <Verify />
      <HowItWorks />
      <Safety />
      <ConsoleWaitlist />
      <GuidesList />
      <section id="faq" className="mx-auto max-w-[900px] px-6 pb-[72px] pt-24">
        <h2 className="h2 mb-8">Domande frequenti</h2>
        <Faq items={generalFaq} />
      </section>
      <FinalCta />
    </>
  );
}
