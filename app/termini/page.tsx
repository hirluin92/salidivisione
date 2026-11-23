import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Termini di servizio | SaliDivisione",
  description: "Termini di servizio di SaliDivisione: pagamenti, rimborsi, tempi garantiti e rischi.",
  path: "/termini",
});

export default function Termini() {
  return (
    <article className="mx-auto max-w-[780px] px-6 pb-16 pt-4">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Termini", path: "/termini" },
        ]}
      />
      <h1 className="display mb-6 mt-8 text-[clamp(40px,5.4vw,68px)] leading-[0.98]">
        Termini di servizio
      </h1>
      {/* TODO: far rivedere il testo definitivo a un consulente legale. */}
      <div className="prose-sd">
        <p>Testo segnaposto: da completare. Qui sotto le condizioni commerciali già previste.</p>
        <h2>Servizi</h2>
        <p>
          Boost di divisione e ricompense settimanali sono disponibili solo per PC. Le ricompense
          settimanali comprendono 10 vittorie; l&apos;eventuale salita di divisione è inclusa nel
          servizio. Anche il coaching è disponibile solo per PC.
        </p>
        <h2>Ordini e pagamenti</h2>
        <p>
          L&apos;ordine parte da WhatsApp e il pagamento si concorda lì. Il pagamento è anticipato al
          100%, senza acconto, con PayPal o bonifico istantaneo. Non accettiamo carta diretta.
        </p>
        <h2>Tempi garantiti e rimborsi</h2>
        <ul>
          <li>Boost di divisione: consegna garantita entro 24 ore fino a 3 divisioni, entro 48 ore oltre.</li>
          <li>Ricompense settimanali: entro 24 ore e sempre prima del giovedì.</li>
          <li>Se superiamo la scadenza garantita rimborsiamo il 10% del prezzo.</li>
          <li>
            Rimborso garantito della parte non completata (divisioni non scalate, settimana sotto i
            30 punti).
          </li>
        </ul>
        <h2>Rischi legati all&apos;accesso di terzi</h2>
        <p>
          Far giocare un&apos;altra persona sul proprio account va contro i termini di EA: un rischio
          esiste sempre. TODO: completare con clausole di accettazione del rischio.
        </p>
        <h2>Stream della sessione</h2>
        <p>Lo stream privato della sessione è gratuito e incluso in ogni ordine.</p>
        <h2>Contatti</h2>
        <p>Per ordini e assistenza scrivici su WhatsApp o sul nostro server Discord.</p>
      </div>
    </article>
  );
}
