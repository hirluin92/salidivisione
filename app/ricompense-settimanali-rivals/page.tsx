import { ServicePage } from "@/components/service/ServicePage";
import { weeklyFaq } from "@/content/faq";
import { buildMetadata } from "@/lib/seo";
import { weeklyBase } from "@/lib/pricing";

const PATH = "/ricompense-settimanali-rivals";

export const metadata = buildMetadata({
  title: "Ricompense Rivals FC 27: 10 vittorie | SaliDivisione",
  description:
    "Ricompense Rivals FC 27 su PC: 10 vittorie a settimana da 25 €, entro 24 ore e prima del giovedì. Stream gratis, −15% con 4 settimane.",
  path: PATH,
});

export default function WeeklyPage() {
  return (
    <ServicePage
      path={PATH}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Ricompense settimanali", path: PATH },
      ]}
      eyebrow="Ricompense settimanali · Solo PC"
      h1="Ricompense Rivals FC 27: 10 vittorie a settimana"
      lead="Giochiamo le 10 vittorie che ti servono per le ricompense migliorate di Division Rivals, su PC, entro 24 ore e sempre prima del giovedì. Lo stream è gratis."
      highlights={[
        "Da 25 € a settimana",
        "−15% con 4 settimane",
        "Entro 24 ore, prima del giovedì",
        "Salita di divisione inclusa",
      ]}
      preset={{ service: "weekly", from: 0, weeks: 1 }}
      schema={{
        name: "Ricompense settimanali Rivals FC 27",
        description:
          "10 vittorie a settimana in Division Rivals su FC 27 per PC, per ottenere le ricompense migliorate.",
        lowPrice: 25,
        highPrice: weeklyBase(10, 4),
        offerCount: 4,
      }}
      sections={[
        {
          h2: "Cosa sono le ricompense settimanali Rivals",
          paragraphs: [
            "In Division Rivals ogni settimana guadagni punti con le tue partite: ogni vittoria vale 3 punti e ogni pareggio 1. Con 15 punti sblocchi le ricompense base, con 30 punti, cioè 10 vittorie, quelle migliorate. Le ricompense arrivano ogni giovedì e crescono con la divisione in cui giochi.",
            "Chi non ha tempo per giocare ogni settimana rischia di perdere ricompense che si possono scambiare sul mercato. Con il servizio di ricompense settimanali di SaliDivisione giochiamo noi le 10 vittorie, sul PC, e tu ritiri le ricompense il giovedì.",
          ],
        },
        {
          h2: "Quanto costano le ricompense settimanali",
          paragraphs: [
            "Il prezzo dipende dalla divisione in cui giochi, perché ogni vittoria ha un prezzo diverso a seconda della fascia. Una settimana costa 25 € nelle divisioni 10–7, 30 € nelle divisioni 6–4, 35 € nelle divisioni 3–1 e 50 € in Élite. Scegliendo 4 settimane (abbonamento mensile) il totale scende del 15%.",
            "Paghi ogni vittoria allo stesso modo in entrambi i servizi: se nelle 10 vittorie sali di divisione, la salita è inclusa nel prezzo. Sul primo ordine puoi usare PRIMO10 per il 10% di sconto.",
          ],
          list: [
            "Divisioni 10–7: 25 € a settimana",
            "Divisioni 6–4: 30 € a settimana",
            "Divisioni 3–1: 35 € a settimana",
            "Élite: 50 € a settimana",
          ],
        },
        {
          h2: "Tempi e garanzia",
          paragraphs: [
            "Di solito le 10 vittorie richiedono 3–4 ore di gioco. La consegna è garantita entro 24 ore e sempre prima del giovedì, così le ricompense non scappano. Se non arriviamo ai 30 punti entro il giovedì ti rimborsiamo la settimana, e se superiamo la scadenza garantita ti rimborsiamo il 10%.",
            "Lo stream privato della sessione è gratis e incluso. Mentre giochiamo non devi usare l'account, per evitare doppi accessi.",
          ],
        },
        {
          h2: "Pagamento e sicurezza",
          paragraphs: [
            "Il pagamento è anticipato al 100%, con PayPal o bonifico istantaneo, e l'ordine parte da WhatsApp. Giochiamo dall'Italia, con il tuo codice di verifica a ogni accesso e senza toccare il mercato. L'accesso di terzi va contro i termini di EA: se vuoi il rischio più basso possibile, valuta il coaching, dove giochi tu.",
          ],
        },
      ]}
      faq={weeklyFaq}
      related={[
        {
          href: "/boost-division-rivals-fc-27",
          label: "Boost di divisione",
          text: "Salta direttamente alla divisione che vuoi.",
        },
        {
          href: "/coaching-fc-27",
          label: "Coaching live",
          text: "Impara a vincere da solo, con un player in chiamata.",
        },
        {
          href: "/guide/ricompense-division-rivals-fc-27-punti",
          label: "Guida: punti per le ricompense",
          text: "Quanti punti servono e quando arrivano.",
        },
      ]}
    />
  );
}
