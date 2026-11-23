import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export function GuidesList({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <section id="guide" className="mx-auto max-w-[1240px] px-6 pb-14 pt-24">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <H className="h2">
          Guide Rivals <span className="text-accent">FC 27</span>
        </H>
        <p className="m-0 text-[17px] text-muted">Vuoi provarci da solo? Parti da qui.</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guide/${g.slug}`}
            className="lift box-border flex min-h-[200px] flex-col gap-2.5 rounded-3xl border border-line2 bg-surface p-7 text-fg no-underline hover:text-fg"
          >
            <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
              Guida · {g.minutes} min
            </p>
            <h3 className="m-0 grow text-[22px] leading-tight">{g.title}</h3>
            <p className="m-0 font-bold text-accent">Leggi la guida →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
