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
      <div className="prose-sd">
        <p>
          Ordinando un servizio su SaliDivisione.it accetti queste condizioni. Il sito è una vetrina:
          l&apos;ordine si completa su WhatsApp.
        </p>
        <h2>Servizi</h2>
        <p>
          Boost di divisione e ricompense settimanali sono disponibili solo per PC. Le ricompense
          settimanali comprendono 10 vittorie; l&apos;eventuale salita di divisione è inclusa nel
          servizio. Anche il coaching è disponibile solo per PC.
        </p>
        <h2>Ordini e pagamenti</h2>
        <p>
          L&apos;ordine parte da WhatsApp e il pagamento si concorda lì. Per ordinare serve indicare il
          tuo ID EA o nickname. Il pagamento è anticipato al 100%, senza acconto, con PayPal o
          bonifico istantaneo. Non accettiamo carta diretta.
        </p>
        <h2>Codice sconto PRIMO10</h2>
        <p>
          Il codice PRIMO10 dà il 10% di sconto sul primo ordine e vale una sola volta per cliente.
          Lo verifichiamo su WhatsApp: se risulta già usato, l&apos;ordine viene confermato al prezzo
          pieno. Gli sconti non sono cumulabili con altri codici.
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
          esiste sempre. Riduciamo il rischio giocando dall&apos;Italia, con il tuo codice di
          verifica e senza toccare il mercato, ma non possiamo escludere sanzioni da parte di EA.
          Ordinando accetti questo rischio. Se vuoi evitarlo, scegli il coaching, in cui giochi tu.
        </p>
        <h2>Durante il servizio</h2>
        <p>
          Mentre giochiamo non devi accedere all&apos;account: un doppio accesso disconnette entrambi.
          A fine ordine ti consigliamo di cambiare la password.
        </p>
        <h2>Stream della sessione</h2>
        <p>Lo stream privato della sessione è gratuito e incluso in ogni ordine.</p>
        <h2>Contatti</h2>
        <p>Per ordini e assistenza scrivici su WhatsApp o sul nostro server Discord.</p>
      </div>
    </article>
  );
}
