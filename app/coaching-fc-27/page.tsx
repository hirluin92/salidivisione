import { ServicePage } from "@/components/service/ServicePage";
import { coachFaq } from "@/content/faq";
import { buildMetadata } from "@/lib/seo";

const PATH = "/coaching-fc-27";

export const metadata = buildMetadata({
  title: "Coaching FC 27 live su Discord | SaliDivisione",
  description:
    "Coaching FC 27 su PC: giochi tu, un player ti segue su Discord. Da 25 € l'ora, 3 ore a 65 €. Nessuna password condivisa.",
  path: PATH,
});

export default function CoachingPage() {
  return (
    <ServicePage
      path={PATH}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Coaching live", path: PATH },
      ]}
      eyebrow="Coaching live · Solo PC"
      h1="Coaching FC 27 live: migliora giocando con noi"
      lead="Giochi tu dal tuo account, un nostro player ti segue in chiamata Discord e ti dice cosa cambiare. Su PC, senza condividere password."
      highlights={[
        "Da 25 € l'ora",
        "3 ore a 65 €",
        "Su PC",
        "Nessun rischio per l'account",
      ]}
      preset={{ service: "coach", hours: 1 }}
      schema={{
        name: "Coaching live FC 27",
        description:
          "Sessioni di coaching live su Discord per Division Rivals su FC 27, per PC.",
        lowPrice: 25,
        highPrice: 105,
        offerCount: 5,
      }}
      sections={[
        {
          h2: "Come funziona il coaching FC 27",
          paragraphs: [
            "Il coaching live di SaliDivisione è pensato per chi vuole migliorare nelle partite di Division Rivals su FC 27 invece di farsi giocare le partite. Ti colleghi a una chiamata Discord con uno dei nostri player, giochi dal tuo account e dalla tua piattaforma e lui ti segue in diretta: commenta le scelte, individua gli errori che si ripetono e ti suggerisce cosa cambiare.",
            "Dato che giochi sempre tu, nessuno accede al tuo account e non condividi nessuna password. Per questo il coaching è il solo servizio senza il rischio legato all'accesso di terzi.",
          ],
        },
        {
          h2: "Cosa si lavora in una sessione",
          paragraphs: [
            "Prima dell'incontro ci racconti a che punto sei e cosa vuoi migliorare: la divisione in cui giochi, il modulo che usi, i problemi che senti di più. La sessione si costruisce su quello, senza un programma fisso uguale per tutti. Gli ambiti tipici sono questi.",
          ],
          list: [
            "Scelta del modulo e delle istruzioni giocatore adatte al tuo stile",
            "Costruzione del gioco e gestione del possesso",
            "Difesa: posizionamento, pressing e quando non rischiare",
            "Gestione delle serie negative e della testa durante le partite",
          ],
        },
        {
          h2: "Prezzi del coaching",
          paragraphs: [
            "Il coaching costa 25 € per 1 ora, 50 € per 2 ore, 65 € per 3 ore, 85 € per 4 ore e 105 € per 5 ore: da 3 ore il prezzo orario scende. Sul primo ordine puoi usare il codice PRIMO10 per il 10% di sconto, e con l'extra Priorità (+20%) fissiamo l'appuntamento prima. Le sessioni sono su appuntamento, concordato su WhatsApp.",
            "Il pagamento è anticipato al 100%, con PayPal o bonifico istantaneo. Se una parte del servizio non viene svolta, la rimborsiamo.",
          ],
        },
        {
          h2: "Coaching o boost: cosa scegliere",
          paragraphs: [
            "Se vuoi arrivare in fretta a una divisione e non ti interessa giocare, il boost è più adatto. Se invece vuoi diventare più forte e mantenere i risultati nel tempo, il coaching è la scelta giusta. Molti iniziano dal coaching e passano poi al boost nelle settimane in cui non hanno tempo.",
          ],
        },
      ]}
      faq={coachFaq}
      related={[
        {
          href: "/boost-division-rivals-fc-27",
          label: "Boost di divisione",
          text: "Per chi vuole salire senza giocare, su PC.",
        },
        {
          href: "/ricompense-settimanali-rivals",
          label: "Ricompense settimanali",
          text: "Le 10 vittorie della settimana giocate da noi.",
        },
        {
          href: "/guide/migliori-moduli-tattiche-rivals-fc-27",
          label: "Guida: moduli e tattiche",
          text: "Da dove partire per scegliere il modulo.",
        },
      ]}
    />
  );
}
