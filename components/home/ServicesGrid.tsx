import Link from "next/link";

const stroke = {
  width: 44,
  height: 44,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ServicesGrid() {
  const card =
    "lift flex flex-col gap-3.5 rounded-3xl border p-8 text-inherit no-underline hover:text-inherit";
  return (
    <section id="servizi" className="mx-auto max-w-[1240px] px-6 pb-14 pt-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <h2 className="h2">
          Servizi Division Rivals
          <br />
          <span className="text-accent">FC 27</span>
        </h2>
        <p className="m-0 max-w-[380px] text-[17px] text-muted">
          Tutti i servizi sono su PC, dalla Divisione 10 fino all&apos;Élite.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        <Link
          href="/boost-division-rivals-fc-27"
          className={`${card} border-line2 bg-surface text-fg`}
        >
          <div className="flex items-center justify-between">
            <svg {...stroke} stroke="#C6F432">
              <path d="M6 15l6-6 6 6" />
              <path d="M6 20l6-6 6 6" />
              <path d="M6 10l6-6 6 6" />
            </svg>
            <span className="display text-[28px] text-[#3A4554]" aria-hidden="true">
              01
            </span>
          </div>
          <h3 className="display m-0 text-[32px] tracking-[0.01em]">Boost di divisione</h3>
          <p className="m-0 text-[13px] font-bold uppercase tracking-[0.06em] text-accent">Solo PC</p>
          <p className="m-0 grow text-fg2">
            Scegli da dove parti e dove vuoi arrivare. Paghi solo le divisioni da scalare.
          </p>
          <p className="m-0 border-t border-line2 pt-4 text-sm text-muted">
            da <span className="display text-[34px] text-fg">15 €</span> a divisione
          </p>
        </Link>

        <Link
          href="/ricompense-settimanali-rivals"
          className={`${card} border-accent bg-accent text-bg`}
        >
          <div className="flex items-center justify-between">
            <svg {...stroke} stroke="#07090C">
              <rect x="3" y="8" width="18" height="13" rx="2" />
              <path d="M12 8v13M3 12h18" />
              <path d="M12 8c-2-4-6-4-6-1s6 1 6 1 6 2 6-1-4-3-6 1z" />
            </svg>
            <span className="rounded-full bg-bg px-3 py-1.5 text-xs font-bold uppercase tracking-[0.05em] text-accent">
              Il più richiesto
            </span>
          </div>
          <h3 className="display m-0 text-[32px] tracking-[0.01em]">Ricompense settimanali</h3>
          <p className="m-0 text-[13px] font-bold uppercase tracking-[0.06em]">Solo PC</p>
          <p className="m-0 grow text-[#1E2A0A]">
            10 vittorie in settimana: i 30 punti delle ricompense migliorate. E intanto sali di
            divisione.
          </p>
          <p className="m-0 border-t border-[rgba(7,9,12,0.2)] pt-4 text-sm text-[#1E2A0A]">
            da <span className="display text-[34px] text-bg">25 €</span> a settimana · −15% al mese
          </p>
        </Link>

        <Link href="/coaching-fc-27" className={`${card} border-line2 bg-surface text-fg`}>
          <div className="flex items-center justify-between">
            <svg {...stroke} stroke="#C6F432">
              <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
              <rect x="2" y="14" width="5" height="7" rx="2" />
              <rect x="17" y="14" width="5" height="7" rx="2" />
            </svg>
            <span className="display text-[28px] text-[#3A4554]" aria-hidden="true">
              03
            </span>
          </div>
          <h3 className="display m-0 text-[32px] tracking-[0.01em]">Coaching live</h3>
          <p className="m-0 text-[13px] font-bold uppercase tracking-[0.06em] text-accent">
            Solo PC
          </p>
          <p className="m-0 grow text-fg2">
            Giochi tu dal tuo account, un nostro player ti segue in chiamata Discord. Nessuna
            password condivisa.
          </p>
          <p className="m-0 border-t border-line2 pt-4 text-sm text-muted">
            <span className="display text-[34px] text-fg">25 €</span> l&apos;ora · 3 ore a 65 €
          </p>
        </Link>
      </div>
    </section>
  );
}
