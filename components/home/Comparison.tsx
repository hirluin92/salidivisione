import { CheckIcon, CrossIcon } from "@/components/ui/icons";

const SOLO = [
  "Serate intere di partite, settimana dopo settimana",
  "Una serie di sconfitte e scendi di nuovo",
  "Ricompense del giovedì a rischio se non arrivi a 30 punti",
  "Nessuna garanzia sul risultato",
];
const US = [
  "Zero partite da giocare: una divisione di solito in 1–2 ore",
  "Risultato garantito, o ti rimborsiamo la parte mancante",
  "I 30 punti settimanali entro 24 ore, sempre prima del giovedì",
  "Guardi ogni partita in diretta, gratis",
];

export function Comparison() {
  return (
    <section id="confronto" className="mx-auto max-w-[1240px] px-6 py-14">
      <h2 className="h2 mb-9">
        Grindarla tu <span className="text-[#8A95A5]">vs</span>{" "}
        <span className="text-accent">farla con noi</span>
      </h2>
      <div className="flex flex-wrap gap-5">
        <div className="min-w-0 flex-[1_1_380px] rounded-[28px] border border-line bg-alt p-8">
          <h3 className="display m-0 mb-5 text-[28px] text-muted">Da solo</h3>
          <ul className="m-0 flex list-none flex-col gap-4 p-0 text-muted">
            {SOLO.map((t) => (
              <li key={t} className="flex gap-3">
                <CrossIcon color="#8A95A5" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 flex-[1_1_380px] rounded-[28px] border-[1.5px] border-accent bg-surface p-8">
          <h3 className="display m-0 mb-5 text-[28px] text-accent">Con SaliDivisione</h3>
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {US.map((t) => (
              <li key={t} className="flex gap-3">
                <CheckIcon size={22} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
