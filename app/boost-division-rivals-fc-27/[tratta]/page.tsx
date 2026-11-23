import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service/ServicePage";
import { boostFaq } from "@/content/faq";
import { buildMetadata } from "@/lib/seo";
import { DIVISIONS, formatEUR, quote, DEFAULT_INPUT } from "@/lib/pricing";
import { BOOST_ROUTES, routeBySlug } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return BOOST_ROUTES.map((r) => ({ tratta: r.slug }));
}

function data(slug: string) {
  const r = routeBySlug(slug);
  if (!r) return null;
  const q = quote({ ...DEFAULT_INPUT, service: "climb", from: r.from, to: r.to, promo: false });
  const prio = quote({
    ...DEFAULT_INPUT,
    service: "climb",
    from: r.from,
    to: r.to,
    promo: false,
    priority: true,
  });
  const first = quote({ ...DEFAULT_INPUT, service: "climb", from: r.from, to: r.to, promo: true });
  return { r, q, prio, first, a: DIVISIONS[r.from], b: DIVISIONS[r.to] };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tratta: string }>;
}): Promise<Metadata> {
  const { tratta } = await params;
  const d = data(tratta);
  if (!d) return {};
  return buildMetadata({
    title: `Boost da ${d.a} a ${d.b} FC 27 | SaliDivisione`,
    description: `Boost Rivals FC 27 da ${d.a} a ${d.b}: ${formatEUR(d.q.total)}, di solito in ${d.q.hoursEstimate} ore. Stream gratis e rimborso garantito.`,
    path: `/boost-division-rivals-fc-27/${tratta}`,
  });
}

export default async function RoutePage({ params }: { params: Promise<{ tratta: string }> }) {
  const { tratta } = await params;
  const d = data(tratta);
  if (!d) notFound();
  const { r, q, prio, first, a, b } = d;
  const steps = r.to - r.from;
  const path = `/boost-division-rivals-fc-27/${r.slug}`;

  return (
    <ServicePage
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Boost di divisione", path: "/boost-division-rivals-fc-27" },
        { name: `${a} → ${b}`, path },
      ]}
      eyebrow="Boost di divisione · Solo PC"
      h1={`Boost Rivals FC 27 da ${a} a ${b}`}
      lead={`Sali da ${a} a ${b} in Division Rivals senza giocare: ${steps} ${steps === 1 ? "passaggio" : "passaggi"}, ${formatEUR(q.total)} in totale, di solito in circa ${q.hoursEstimate} ${q.hoursEstimate === 1 ? "ora" : "ore"} di gioco.`}
      highlights={[
        `${formatEUR(q.total)} senza extra`,
        `Garantito entro ${q.guaranteeHours} ore`,
        "Stream privato gratis",
        "Rimborso della parte non completata",
      ]}
      preset={{ service: "climb", from: r.from, to: r.to }}
      schema={{
        name: `Boost Rivals FC 27 da ${a} a ${b}`,
        description: `Salita in Division Rivals su FC 27 per PC da ${a} a ${b}.`,
        lowPrice: q.total,
        highPrice: prio.total,
        offerCount: 2,
      }}
      sections={[
        {
          h2: `Quanto costa salire da ${a} a ${b}`,
          paragraphs: [
            `Il boost da ${a} a ${b} comprende ${steps} ${steps === 1 ? "passaggio di divisione" : "passaggi di divisione"} e costa ${formatEUR(q.total)} senza extra. Con il codice PRIMO10 sul primo ordine il totale scende a ${formatEUR(first.total)}, mentre con l'extra Priorità (+20%), che ci fa partire entro 2 ore, sale a ${formatEUR(prio.total)}.`,
            `Paghi solo la strada che devi fare: se vuoi fermarti prima o andare oltre, cambia le divisioni nel calcolatore e il totale si aggiorna subito.`,
          ],
        },
        {
          h2: "Tempi e garanzie",
          paragraphs: [
            `Per questa tratta stimiamo circa ${q.hoursEstimate} ${q.hoursEstimate === 1 ? "ora" : "ore"} di gioco, circa ${q.wins} partite giocate al posto tuo. La consegna è garantita entro ${q.guaranteeHours} ore: se la superiamo ti rimborsiamo il 10%. Se non arriviamo alla divisione ordinata, rimborsiamo la parte non completata.`,
            "Il pagamento è anticipato al 100% con PayPal o bonifico istantaneo e lo stream privato della sessione è gratis, incluso in ogni ordine. Il boost è solo per PC.",
          ],
        },
      ]}
      faq={boostFaq.slice(0, 3)}
      related={[
        {
          href: "/boost-division-rivals-fc-27",
          label: "Tutti i prezzi del boost",
          text: "Dalla Divisione 10 all'Élite, passaggio per passaggio.",
        },
        {
          href: "/ricompense-settimanali-rivals",
          label: "Ricompense settimanali",
          text: "10 vittorie a settimana, la salita è inclusa.",
        },
        {
          href: "/guide/come-salire-di-divisione-rivals-fc-27",
          label: "Guida: come salire di divisione",
          text: "Vuoi provarci da solo? Parti da qui.",
        },
      ]}
    />
  );
}
