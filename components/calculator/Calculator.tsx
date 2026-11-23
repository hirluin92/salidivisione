"use client";

import { useEffect, useRef, useState } from "react";
import { useCalculator } from "./CalculatorProvider";
import {
  DIVISIONS,
  ELITE,
  PROMO_CODE,
  formatEUR,
  type QuoteInput,
  type Service,
} from "@/lib/pricing";
import { SITE } from "@/lib/site";
import { trackWhatsApp } from "@/lib/analytics";
import { ChatIcon } from "@/components/ui/icons";

const SERVICES: { id: Service; label: string }[] = [
  { id: "climb", label: "Boost di divisione" },
  { id: "weekly", label: "Ricompense settimanali" },
  { id: "coach", label: "Coaching live" },
];

const field =
  "w-full min-h-[52px] rounded-[14px] border-[1.5px] bg-bg px-4 text-base text-fg";

export function Calculator({
  preset,
  heading = "Calcola il prezzo",
  headingLevel = 2,
}: {
  preset?: Partial<QuoteInput>;
  heading?: string;
  headingLevel?: 1 | 2;
}) {
  const { input, q, nick, nickOk, nickTouched, requestNick, waLink, update, setNick, shareUrl } =
    useCalculator();
  const showNickError = nickTouched && !nickOk;
  const waClass =
    "flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-bg px-5 py-[18px] text-center text-[17px] font-bold text-fg no-underline hover:text-fg";
  const [copied, setCopied] = useState(false);
  const applied = useRef(false);

  useEffect(() => {
    if (preset && !applied.current) {
      applied.current = true;
      update(preset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isClimb = input.service === "climb";
  const fromMax = isClimb ? ELITE : ELITE + 1;
  const fromOpts = DIVISIONS.slice(0, fromMax);
  const toOpts = DIVISIONS.map((d, i) => ({ d, i })).filter((o) => o.i > input.from);
  const Heading = headingLevel === 1 ? "h1" : "h2";

  async function copyLink() {
    const url = shareUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copia il link del tuo preventivo:", url);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section id="prezzi" className="mx-auto max-w-[1240px] px-6 pb-10 pt-[72px]">
      <div className="flex flex-wrap overflow-hidden rounded-[32px] border border-line2 bg-surface">
        <div className="min-w-0 flex-[999_1_560px] p-[clamp(28px,4vw,52px)]">
          <Heading className="display m-0 mb-2 text-[clamp(38px,4.4vw,56px)] leading-none">
            {heading}
          </Heading>
          <p className="m-0 mb-8 text-muted">Prezzo finale in euro, nessun costo nascosto.</p>

          <p className="m-0 mb-3 text-sm font-semibold uppercase tracking-[0.06em] text-muted">
            Servizio
          </p>
          <div className="mb-[30px] flex flex-wrap gap-2.5" role="group" aria-label="Servizio">
            {SERVICES.map((s) => {
              const on = s.id === input.service;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => update({ service: s.id })}
                  className={`min-h-[44px] cursor-pointer rounded-full border-[1.5px] px-5 py-3 text-[15px] font-bold ${
                    on
                      ? "border-accent bg-accent text-alt"
                      : "border-line3 bg-transparent text-fg"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <div className="mb-[26px] flex flex-wrap gap-4">
            <div className="min-w-0 flex-[1_1_200px]">
              <label htmlFor="fromDiv" className="mb-2 block font-semibold">
                {isClimb
                  ? "Divisione attuale"
                  : input.service === "coach"
                    ? "La tua divisione"
                    : "Divisione in cui giochi"}
              </label>
              <select
                id="fromDiv"
                value={input.from}
                onChange={(e) => update({ from: Number(e.target.value) })}
                className={`${field} border-line3`}
              >
                {fromOpts.map((d, i) => (
                  <option key={d} value={i}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            {isClimb && (
              <div className="min-w-0 flex-[1_1_200px]">
                <label htmlFor="toDiv" className="mb-2 block font-semibold">
                  Divisione da raggiungere
                </label>
                <select
                  id="toDiv"
                  value={input.to}
                  onChange={(e) => update({ to: Number(e.target.value) })}
                  className={`${field} border-accent`}
                >
                  {toOpts.map((o) => (
                    <option key={o.d} value={o.i}>
                      {o.d}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {input.service === "weekly" && (
            <>
              <label htmlFor="weeks" className="mb-3 block font-semibold">
                Settimane: <span className="text-accent">{input.weeks}</span>{" "}
                <span className="font-normal text-muted">
                  {input.weeks === 4 ? "(abbonamento mensile −15%)" : ""}
                </span>
              </label>
              <input
                id="weeks"
                type="range"
                min={1}
                max={4}
                step={1}
                value={input.weeks}
                onChange={(e) => update({ weeks: Number(e.target.value) })}
                className="mb-[26px] w-full"
              />
            </>
          )}
          {input.service === "coach" && (
            <>
              <label htmlFor="hours" className="mb-3 block font-semibold">
                Ore di coaching: <span className="text-accent">{input.hours}</span>
              </label>
              <input
                id="hours"
                type="range"
                min={1}
                max={5}
                step={1}
                value={input.hours}
                onChange={(e) => update({ hours: Number(e.target.value) })}
                className="mb-[26px] w-full"
              />
            </>
          )}

          <div className="flex flex-wrap gap-3">
            <label className="flex min-h-[56px] flex-[1_1_240px] cursor-pointer items-center gap-3 rounded-[14px] border-[1.5px] border-[#2A3442] px-4">
              <input
                type="checkbox"
                checked={input.priority}
                onChange={(e) => update({ priority: e.target.checked })}
              />
              <span>
                <strong>Priorità</strong>{" "}
                <span className="text-muted">· partiamo entro 2 ore (+20%)</span>
              </span>
            </label>
            <label className="flex min-h-[56px] flex-[1_1_240px] cursor-pointer items-center gap-3 rounded-[14px] border-[1.5px] border-[#2A3442] px-4">
              <input
                type="checkbox"
                checked={input.promo}
                onChange={(e) => update({ promo: e.target.checked })}
              />
              <span>
                <strong>Primo ordine</strong>{" "}
                <span className="text-muted">· {PROMO_CODE} (−10%)</span>
              </span>
            </label>
          </div>

          <div className="mt-5">
            <label htmlFor="nick" className="mb-2 block font-semibold">
              ID EA / nickname <span className="text-accent">*</span>{" "}
              <span className="font-normal text-muted">(obbligatorio, lo aggiungiamo al messaggio)</span>
            </label>
            <input
              id="nick"
              type="text"
              required
              autoComplete="off"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              aria-invalid={showNickError}
              aria-describedby={showNickError ? "nick-err" : undefined}
              placeholder="Il tuo ID EA"
              className={`${field} ${showNickError ? "border-[#FFB4A8]" : "border-line3"}`}
            />
            {showNickError && (
              <p id="nick-err" role="alert" className="m-0 mt-2 text-sm text-[#FFB4A8]">
                Inserisci il tuo ID EA per poter ordinare.
              </p>
            )}
          </div>

          <p className="m-0 mt-4 text-[13px] text-muted">
            Il codice {PROMO_CODE} vale una sola volta per cliente ed è verificato da noi su WhatsApp.
          </p>
        </div>

        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-3.5 bg-accent p-[clamp(28px,4vw,44px)] text-bg">
          <p className="m-0 text-[13px] font-bold uppercase tracking-[0.08em]">Il tuo ordine</p>
          <p className="m-0 text-lg font-semibold" data-testid="summary">
            {q.summary}
          </p>
          {isClimb && <MiniLadder from={input.from} to={input.to} />}
          <p
            className="display m-0 mt-1.5 text-[clamp(60px,9vw,84px)] leading-[0.95]"
            data-testid="total"
            aria-live="polite"
          >
            {formatEUR(q.total)}
          </p>
          <p className="m-0 text-sm font-medium text-[#2A3A10]">{q.note}</p>
          {q.wins !== null && (
            <p className="m-0 text-sm font-semibold text-[#1E2A0A]">
              {input.service === "climb"
                ? `Circa ${q.wins} partite che non giochi tu.`
                : `${q.wins} vittorie giocate al posto tuo.`}
            </p>
          )}
          <div className="grow" />
          {nickOk ? (
            <a
              href={waLink}
              data-testid="wa-order"
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsApp("calculator", input.service, q.total)}
              className={waClass}
            >
              <ChatIcon color="#C6F432" />
              Ordina su WhatsApp
            </a>
          ) : (
            <button type="button" data-testid="wa-order" onClick={requestNick} className={waClass}>
              <ChatIcon color="#C6F432" />
              Inserisci l&apos;ID EA per ordinare
            </button>
          )}
          {SITE.discordUrl && (
            <a
              href={SITE.discordUrl}
              target="_blank"
              rel="noopener"
              className="flex min-h-[44px] items-center justify-center rounded-full border-[1.5px] border-bg px-5 py-[15px] text-center font-bold text-bg no-underline hover:text-bg"
            >
              Oppure su Discord
            </a>
          )}
          <button
            type="button"
            onClick={copyLink}
            className="min-h-[44px] cursor-pointer rounded-full border-0 bg-transparent px-2 text-sm font-bold text-bg underline underline-offset-4"
          >
            {copied ? "Link copiato ✓" : "Salva questo preventivo (copia link)"}
          </button>
          <p className="m-0 text-[13px] text-[#2A3A10]">
            Pagamento anticipato · PayPal o bonifico istantaneo · stream privato della sessione{" "}
            <strong>gratis</strong> · rimborso della parte non completata.
          </p>
        </div>
      </div>
    </section>
  );
}

function MiniLadder({ from, to }: { from: number; to: number }) {
  const pct = ((to - from) / ELITE) * 100;
  return (
    <div className="rounded-2xl bg-[rgba(7,9,12,0.1)] p-3" aria-hidden="true">
      <div className="flex items-center justify-between gap-2 text-[13px] font-bold">
        <span className="rounded-full bg-bg px-3 py-1 text-accent">{DIVISIONS[from]}</span>
        <span className="h-[3px] grow rounded bg-[rgba(7,9,12,0.35)]" />
        <span className="rounded-full bg-bg px-3 py-1 text-accent">{DIVISIONS[to]}</span>
      </div>
      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[rgba(7,9,12,0.2)]">
        <div className="h-full rounded-full bg-bg" style={{ width: `${Math.max(pct, 8)}%` }} />
      </div>
    </div>
  );
}
