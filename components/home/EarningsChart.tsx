import Link from "next/link";

const BARS = [
  { l: "10", h: 14 },
  { l: "9", h: 20 },
  { l: "8", h: 26 },
  { l: "7", h: 33 },
  { l: "6", h: 40 },
  { l: "5", h: 48 },
  { l: "4", h: 56 },
  { l: "3", h: 65 },
  { l: "2", h: 75 },
  { l: "1", h: 87, hi: true },
  { l: "É", h: 100, hi: true },
];

export function EarningsChart() {
  return (
    <section id="perche" className="mx-auto max-w-[1240px] px-6 py-14">
      <div className="flex flex-wrap items-center gap-12">
        <div className="min-w-0 flex-[1_1_380px]">
          <h2 className="h2 mb-4">
            Più sali,
            <br />
            <span className="text-accent">più incassi.</span>
            <br />
            Ogni giovedì.
          </h2>
          <p className="m-0 mb-6 max-w-[480px] text-lg text-fg2">
            In Rivals le ricompense settimanali crescono a ogni divisione: crediti e pacchetti,
            scambiabili sul mercato. Salire una volta ti fa guadagnare di più per tutte le settimane
            successive.
          </p>
          <Link
            href="/boost-division-rivals-fc-27"
            className="btn-main inline-flex min-h-[44px] items-center rounded-full bg-accent px-7 py-4 text-[17px] font-bold text-bg no-underline"
          >
            Scopri quanto costa salire
          </Link>
        </div>
        <div className="min-w-0 flex-[1_1_460px] rounded-[28px] border border-line2 bg-surface p-7">
          <p className="m-0 mb-5 text-sm font-semibold uppercase tracking-[0.06em] text-muted">
            Ricompense settimanali per divisione
          </p>
          <div
            role="img"
            aria-label="Le ricompense crescono dalla Divisione 10 all'Élite"
            className="flex h-[260px] items-end gap-2"
          >
            {BARS.map((b) => (
              <div
                key={b.l}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  className={`w-full rounded-t-[10px] rounded-b-[4px] ${b.hi ? "bg-accent" : "bg-[#2A3442]"}`}
                  style={{ height: `${b.h}%` }}
                />
                <span className={`text-[13px] font-bold ${b.hi ? "text-accent" : "text-muted"}`}>
                  {b.l}
                </span>
              </div>
            ))}
          </div>
          <p className="m-0 mt-4 text-[13px] text-muted">
            Andamento indicativo: i valori esatti cambiano di stagione in stagione.
          </p>
        </div>
      </div>
    </section>
  );
}
