import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";

function FieldLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <g fill="none" stroke="#151C25" strokeWidth="2">
        <rect x="20" y="20" width="1160" height="660" rx="6" />
        <line x1="600" y1="20" x2="600" y2="680" />
        <circle cx="600" cy="350" r="110" />
        <rect x="20" y="190" width="170" height="320" />
        <rect x="1010" y="190" width="170" height="320" />
        <rect x="20" y="270" width="60" height="160" />
        <rect x="1120" y="270" width="60" height="160" />
      </g>
    </svg>
  );
}

function ClimbCard() {
  const row = "flex items-center justify-between rounded-xl font-semibold";
  return (
    <div className="min-w-0 max-w-[460px] flex-[1_1_380px] rounded-[28px] border border-line2 bg-surface p-[26px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <div className="mb-[18px] flex items-center justify-between">
        <p className="display m-0 text-2xl tracking-[0.02em]">La scalata</p>
        <span className="rounded-full bg-surface3 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.05em] text-accent">
          Ordine reale
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className={`${row} bg-surface2 px-3.5 py-2.5 text-muted`}>
          <span>Élite</span>
          <span className="text-[13px]">—</span>
        </div>
        <div
          className={`${row} climb-b border-[1.5px] border-accent bg-accent px-4 py-3.5 text-bg font-bold`}
        >
          <span className="display text-[22px]">Divisione 1</span>
          <span className="text-[13px]">Arrivo</span>
        </div>
        <div className={`${row} climb-a border-[1.5px] border-accent bg-surface3 px-4 py-3`}>
          <span>Divisione 2</span>
          <span className="text-[13px]">Superata</span>
        </div>
        <div className={`${row} border-[1.5px] border-dashed border-[#5A6676] bg-surface3 px-4 py-3`}>
          <span>Divisione 3 · gradino 9</span>
          <span className="text-[13px] text-fg2">Partenza</span>
        </div>
        <div className={`${row} bg-surface2 px-3.5 py-2.5 text-muted`}>
          <span>Divisione 4</span>
          <span className="text-[13px]">—</span>
        </div>
        <div className={`${row} bg-[#121820] px-3.5 py-2.5 text-muted`}>
          <span>Divisione 5 … 10</span>
          <span className="text-[13px]">—</span>
        </div>
      </div>
      <div className="mt-[22px] flex items-end justify-between gap-4 border-t border-line2 pt-[18px]">
        <div>
          <p className="m-0 text-[13px] text-muted">Tempo impiegato</p>
          <p className="display m-0 text-[40px] leading-[1.05]">Una notte</p>
        </div>
        <p className="m-0 text-right text-[13px] text-muted">
          2 divisioni
          <br />
          in poche ore
        </p>
      </div>
      <div aria-hidden="true" className="mt-4 h-2 overflow-hidden rounded-full bg-surface3">
        <div className="fillbar h-full w-full rounded-full bg-accent" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-[1240px] px-6 pb-[72px] pt-12">
      <FieldLines />
      <div className="relative flex flex-wrap items-center gap-14">
        <div className="min-w-0 flex-[1_1_540px]">
          <p className="m-0 mb-5 inline-flex flex-wrap items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.06em] text-fg2">
            <span className="inline-block size-2 rounded-full bg-accent" />
            Boost Division Rivals FC 27 · PC · Coaching anche su PS5 e Xbox
          </p>
          <p className="m-0 mb-[18px] flex w-fit max-w-full flex-wrap items-baseline gap-2 rounded-full border border-[#2A3442] bg-surface px-4 py-2 text-[15px] text-fg2">
            Boost da <span className="display text-[22px] text-accent">15 €</span> a divisione ·
            settimanali da <span className="display text-[22px] text-accent">25 €</span>
          </p>
          <h1 className="display m-0 mb-6 text-[clamp(56px,8.4vw,116px)] leading-[0.92] tracking-[0.005em]">
            Sali di divisione in Rivals.
            <br />
            <span className="text-accent">Senza giocare.</span>
          </h1>
          <p className="m-0 mb-9 max-w-[560px] text-xl text-fg2">
            Player italiani giocano le tue partite di Division Rivals su FC 27 per PC. Una divisione
            di solito in 1–2 ore, e guardi tutto in diretta,{" "}
            <strong className="text-fg">gratis</strong>. Giochi su console? Ti seguiamo in coaching.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              href="/#prezzi"
              className="btn-main inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-accent px-8 py-[18px] text-lg font-bold text-bg no-underline"
            >
              Vedi i prezzi · da 15 €
              <ArrowIcon />
            </Link>
            <Link
              href="/#come"
              className="inline-flex min-h-[44px] items-center rounded-full border-[1.5px] border-line3 px-[30px] py-[18px] text-lg font-semibold text-fg no-underline hover:text-accent"
            >
              Come funziona
            </Link>
          </div>
          <ul className="m-0 mt-9 flex list-none flex-wrap gap-x-[22px] gap-y-2 p-0 text-sm font-medium text-muted">
            {[
              "Pagamento con PayPal",
              "Stream privato gratis",
              "Assistenza in italiano",
              "Rimborso garantito",
            ].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <CheckIcon />
                {t}
              </li>
            ))}
          </ul>
          <p className="m-0 mt-5 text-sm text-muted">
            Paura per l&apos;account? Giochiamo dall&apos;Italia, con il tuo codice a ogni accesso e
            senza toccare il mercato.{" "}
            <Link href="/#sicurezza" className="font-semibold">
              Come proteggiamo l&apos;account →
            </Link>
          </p>
        </div>
        <ClimbCard />
      </div>
    </section>
  );
}
