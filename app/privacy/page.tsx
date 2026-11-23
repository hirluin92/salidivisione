import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy policy | SaliDivisione",
  description:
    "Informativa sulla privacy di SaliDivisione: dati degli ordini su WhatsApp, analytics senza cookie e diritti degli utenti.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <article className="mx-auto max-w-[780px] px-6 pb-16 pt-4">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />
      <h1 className="display mb-6 mt-8 text-[clamp(40px,5.4vw,68px)] leading-[0.98]">
        Privacy policy
      </h1>
      <div className="prose-sd">
        <p>
          Questa pagina spiega quali dati trattiamo quando usi SaliDivisione.it e ordini un servizio.
          Il sito è una vetrina: non ha registrazione, non ha un checkout e non usa cookie di
          profilazione.
        </p>

        <h2>Dati che trattiamo</h2>
        <ul>
          <li>
            <strong>Dati dell&apos;ordine:</strong> quando ordini su WhatsApp ci invii il tuo ID EA o
            nickname, il servizio scelto e il tuo numero di telefono, e per eseguire il servizio le
            credenziali di accesso e il codice di verifica che ci comunichi.
          </li>
          <li>
            <strong>Comunicazioni su Discord:</strong> se ci contatti o fai coaching sul nostro
            server, trattiamo il tuo nome utente e i messaggi che ci invii.
          </li>
          <li>
            <strong>Statistiche del sito:</strong> usiamo un servizio di analytics senza cookie e
            senza profilazione, che registra visite e clic aggregati sui pulsanti di contatto (ad
            esempio il servizio e il totale mostrati nel calcolatore), non i dati personali.
          </li>
        </ul>

        <h2>Perché li trattiamo</h2>
        <p>
          Per eseguire il servizio che hai richiesto, gestire pagamenti e rimborsi, risponderti e
          adempiere a obblighi di legge. Non vendiamo i tuoi dati e non li usiamo per pubblicità.
        </p>

        <h2>Per quanto tempo</h2>
        <p>
          Le credenziali e i codici di accesso li eliminiamo a fine ordine. Gli altri dati dell&apos;ordine
          li conserviamo per il tempo necessario a gestire eventuali contestazioni e per gli obblighi
          di legge.
        </p>

        <h2>Con chi li condividiamo</h2>
        <p>
          Usiamo servizi di terzi che trattano alcuni dati per nostro conto: WhatsApp, Discord, PayPal
          o la tua banca per i pagamenti, e Vercel per ospitare il sito e raccogliere le statistiche.
          Ognuno ha una propria informativa.
        </p>

        <h2>Cookie</h2>
        <p>Il sito non usa cookie di profilazione né di marketing, quindi non serve il banner.</p>

        <h2>I tuoi diritti</h2>
        <p>
          Puoi chiederci di accedere ai tuoi dati, correggerli, cancellarli, limitarne il
          trattamento o opporti, scrivendoci su WhatsApp o Discord. Puoi anche presentare reclamo al
          Garante per la protezione dei dati personali.
        </p>
      </div>
    </article>
  );
}
