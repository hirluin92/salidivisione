const STATS = [
  { n: "1–2 H", t: "di solito per una divisione", accent: true },
  { n: "24 H", t: "consegna garantita fino a 3 divisioni" },
  { n: "0 €", t: "per guardare la sessione in diretta" },
  { n: "10%", t: "rimborsato se siamo in ritardo" },
];

export function StatsStrip() {
  return (
    <section aria-label="In numeri" className="border-y border-line bg-alt">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7 px-6 py-9">
        {STATS.map((s) => (
          <div key={s.n}>
            <p
              className={`display m-0 text-[52px] leading-none ${s.accent ? "text-accent" : "text-fg"}`}
            >
              {s.n}
            </p>
            <p className="m-0 mt-1.5 text-fg2">{s.t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
