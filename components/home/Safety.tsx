const RULES = [
  {
    t: "Connessione dall'Italia",
    d: "Giochiamo dalla tua stessa zona, senza accessi da paesi lontani.",
  },
  {
    t: "Mai il mercato",
    d: "Non tocchiamo crediti, giocatori, pacchetti o trasferimenti. Solo partite Rivals.",
  },
  {
    t: "Codice a ogni accesso",
    d: "Tieni attiva la verifica in due passaggi: senza il tuo codice non entriamo.",
  },
  {
    t: "Dati cancellati",
    d: "A fine ordine eliminiamo le credenziali e ti mandiamo il riepilogo delle partite.",
  },
];

export function Safety() {
  return (
    <section id="sicurezza" className="mx-auto max-w-[1240px] px-6 py-14">
      <div className="flex flex-wrap gap-12 rounded-[32px] border border-line bg-alt p-[clamp(28px,5vw,60px)]">
        <div className="min-w-0 flex-[1_1_340px]">
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="#C6F432"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <h2 className="display mb-3 mt-[18px] text-[clamp(38px,4.4vw,56px)] leading-[0.98]">
            Il tuo account,
            <br />
            trattato con cura
          </h2>
          <p className="m-0 text-[17px] text-muted">
            Le regole che seguiamo in ogni sessione, senza eccezioni.
          </p>
        </div>
        <div className="grid min-w-0 flex-[2_1_560px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {RULES.map((r) => (
            <div key={r.t} className="rounded-[18px] bg-surface p-6">
              <h3 className="m-0 mb-1.5 text-lg font-bold">{r.t}</h3>
              <p className="m-0 text-muted">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
