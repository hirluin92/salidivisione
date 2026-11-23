import { CheckIcon } from "@/components/ui/icons";

// TODO: quando disponibili, aggiungere qui screenshot anonimizzati di ordini reali,
// un breve video dello stream di una sessione e il nome/volto del booster.
// Le recensioni (Trustpilot/Google) vanno aggiunte solo quando saranno vere.
const POINTS = [
  { t: "Stream privato gratis", d: "Vedi ogni partita in diretta, in ogni ordine, senza extra." },
  { t: "Aggiornamenti dopo ogni sessione", d: "Ti scriviamo su WhatsApp appena finiamo, con il riepilogo delle partite." },
  { t: "Rimborso della parte non completata", d: "Divisioni non scalate o settimana sotto i 30 punti: restituiamo la quota." },
  { t: "10% se siamo in ritardo", d: "Ogni ordine ha una scadenza garantita: se la superiamo, rimborsiamo il 10%." },
];

export function Verify() {
  return (
    <section aria-labelledby="verifica" className="mx-auto max-w-[1240px] px-6 pb-4 pt-6">
      <div className="rounded-[28px] border border-line2 bg-surface p-[clamp(24px,4vw,44px)]">
        <h2 id="verifica" className="display m-0 mb-2 text-[clamp(32px,3.6vw,44px)] leading-none">
          Paghi prima, ma controlli tu
        </h2>
        <p className="m-0 mb-6 max-w-[640px] text-muted">
          Il pagamento è anticipato al 100%, per questo ogni ordine è verificabile in tempo reale e
          coperto da rimborso.
        </p>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 p-0">
          {POINTS.map((p) => (
            <li key={p.t} className="flex gap-3">
              <span className="mt-1 shrink-0">
                <CheckIcon size={20} />
              </span>
              <span>
                <strong className="block">{p.t}</strong>
                <span className="text-muted">{p.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
