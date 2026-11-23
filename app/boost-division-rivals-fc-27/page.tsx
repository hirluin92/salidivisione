import { ServicePage } from "@/components/service/ServicePage";
import { boostFaq } from "@/content/faq";
import { buildMetadata } from "@/lib/seo";
import { climbBase, ELITE } from "@/lib/pricing";
import { BOOST_ROUTES } from "@/lib/routes";
import Link from "next/link";

const PATH = "/boost-division-rivals-fc-27";

export const metadata = buildMetadata({
  title: "Boost Rivals FC 27: sali di divisione | SaliDivisione",
  description:
    "Boost Rivals FC 27 su PC: sali di divisione da 15 € a passaggio, di solito in 1–2 ore, con stream gratis e rimborso della parte non completata.",
  path: PATH,
});

export default function BoostPage() {
  return (
    <>
      <ServicePage
        path={PATH}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Boost di divisione", path: PATH },
        ]}
        eyebrow="Boost di divisione · Solo PC"
        h1="Boost Rivals FC 27: salire di divisione senza giocare"
        lead="Scegli da quale divisione parti e dove vuoi arrivare: giochiamo noi le partite di Division Rivals su PC, tu guardi lo stream privato, gratis."
        highlights={[
          "Da 15 € a divisione",
          "Di solito 1–2 ore a divisione",
          "Stream privato gratis",
          "Rimborso della parte non completata",
        ]}
        preset={{ service: "climb", from: 0, to: 3 }}
        schema={{
          name: "Boost di divisione Rivals FC 27",
          description:
            "Servizio di salita di divisione in Division Rivals su FC 27 per PC, dalla Divisione 10 all'Élite.",
          lowPrice: 15,
          highPrice: climbBase(0, ELITE),
          offerCount: ELITE,
        }}
        sections={[
          {
            h2: "Come funziona il boost di divisione",
            paragraphs: [
              "Il boost Rivals di SaliDivisione è un servizio per chi vuole salire di divisione in Division Rivals su FC 27 senza passare le serate a giocare partite. Scegli la divisione da cui parti e quella che vuoi raggiungere, scrivi su WhatsApp con il messaggio già pronto e concordi pagamento e orario. Da quel momento un nostro player italiano gioca le partite necessarie dal tuo account, sul PC, e tu guardi tutto in diretta.",
              "Il servizio è solo per PC: su FC 27 ogni piattaforma ha un club Ultimate Team separato e il nostro booster gioca da PC. Se giochi su PlayStation o Xbox puoi usare il coaching, oppure iscriverti alla lista d'attesa per il boost console con il 15% di sconto sul primo ordine.",
            ],
          },
          {
            h2: "Quanto costa salire di divisione",
            paragraphs: [
              "Il prezzo dipende solo dai passaggi che devi fare, perché paghi ogni salita e non un pacchetto fisso. Ogni passaggio costa 15 € dalla Divisione 10 alla 6, 18 € dalla 6 alla 3, 21 € dalla 3 alla 1 e 28 € dalla Divisione 1 all'Élite. Salire dalla Divisione 10 all'Élite costa 184 € in totale, senza extra.",
              "Sul primo ordine puoi usare il codice PRIMO10 per il 10% di sconto. Con l'extra Priorità (+20%) iniziamo entro 2 ore dalla conferma. Il calcolatore qui sopra ti mostra il totale esatto: quello che vedi è quello che paghi.",
            ],
            list: [
              "Divisione 10 → 9, 9 → 8, 8 → 7, 7 → 6: 15 € ciascuno",
              "Divisione 6 → 5, 5 → 4, 4 → 3: 18 € ciascuno",
              "Divisione 3 → 2, 2 → 1: 21 € ciascuno",
              "Divisione 1 → Élite: 28 €",
            ],
          },
          {
            h2: "Tempi di consegna garantiti",
            paragraphs: [
              "Di solito una divisione richiede circa 1 ora, fino a 1,5 ore nelle divisioni più alte e circa 4 ore per l'ultimo passaggio verso l'Élite. Ogni ordine ha una scadenza garantita: entro 24 ore fino a 3 divisioni e entro 48 ore oltre. Se la superiamo, ti rimborsiamo il 10%.",
              "Mentre giochiamo non devi usare l'account: un doppio accesso disconnette entrambi. Ti scriviamo appena finisce ogni sessione.",
            ],
          },
          {
            h2: "Sicurezza e condizioni",
            paragraphs: [
              "Far giocare un'altra persona sul tuo account va contro i termini di EA, quindi un rischio esiste sempre. Lo riduciamo giocando dall'Italia, con il tuo codice di verifica a ogni accesso e senza mai toccare il mercato. A fine ordine eliminiamo le credenziali. Il pagamento è anticipato al 100%, con PayPal o bonifico istantaneo, e se una parte del servizio non viene completata la rimborsiamo.",
              "Non sai se ti conviene salire o prendere solo le ricompense? Leggi la guida su come salire di divisione o guarda le ricompense settimanali.",
            ],
          },
        ]}
        faq={boostFaq}
        related={[
          {
            href: "/ricompense-settimanali-rivals",
            label: "Ricompense settimanali",
            text: "10 vittorie a settimana, la salita è inclusa.",
          },
          {
            href: "/coaching-fc-27",
            label: "Coaching live",
            text: "Giochi tu, noi ti seguiamo su Discord.",
          },
          {
            href: "/guide/come-salire-di-divisione-rivals-fc-27",
            label: "Guida: come salire di divisione",
            text: "Vuoi provarci da solo? Parti da qui.",
          },
        ]}
      />
      <section className="mx-auto max-w-[1240px] px-6 pb-20">
        <h2 className="display m-0 mb-4 text-[clamp(26px,3vw,36px)] leading-none">
          Prezzi per le tratte più richieste
        </h2>
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {BOOST_ROUTES.map((r) => (
            <li key={r.slug}>
              <Link
                href={`${PATH}/${r.slug}`}
                className="inline-flex min-h-[44px] items-center rounded-full border border-line3 px-5 py-2 font-semibold text-fg no-underline hover:border-accent hover:text-accent"
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
