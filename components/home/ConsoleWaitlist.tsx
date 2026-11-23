"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon } from "@/components/ui/icons";

type Console = "ps" | "xbox";
const CONSOLES: { id: Console; label: string }[] = [
  { id: "ps", label: "PlayStation 5" },
  { id: "xbox", label: "Xbox Series X|S" },
];

export function ConsoleWaitlist() {
  const [console_, setConsole] = useState<Console>("ps");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const label = CONSOLES.find((c) => c.id === console_)!.label;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErr("Inserisci un indirizzo email valido.");
      return;
    }
    if (!consent) {
      setErr("Serve il consenso per poterti scrivere.");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, console: console_, consent, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Qualcosa è andato storto. Riprova tra poco.");
      setSent(true);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Qualcosa è andato storto.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="console" className="mx-auto max-w-[1240px] px-6 py-14">
      <div className="flex flex-wrap items-center gap-10 rounded-[32px] border-[1.5px] border-line2 p-[clamp(28px,5vw,56px)]">
        <div className="min-w-0 flex-[1_1_380px]">
          <span className="mb-4 inline-block rounded-full bg-surface3 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.05em] text-accent">
            In arrivo
          </span>
          <h2 className="display m-0 mb-3 text-[clamp(38px,4.4vw,56px)] leading-[0.98]">
            Boost per PlayStation
            <br />e Xbox
          </h2>
          <p className="m-0 text-[17px] text-muted">
            Lascia la tua email: ti avvisiamo appena parte, con il 15% di sconto sul primo ordine.
            Nel frattempo, il{" "}
            <Link href="/coaching-fc-27">coaching è già disponibile</Link> per la tua console.
          </p>
        </div>
        <div className="min-w-0 flex-[1_1_380px]">
          {sent ? (
            <div
              role="status"
              className="flex items-start gap-4 rounded-[20px] bg-surface p-7"
            >
              <CheckIcon size={32} />
              <div>
                <p className="m-0 mb-1 text-lg font-bold">Quasi fatto!</p>
                <p className="m-0 text-muted">
                  Ti abbiamo scritto per confermare l&apos;iscrizione: controlla la posta (anche lo
                  spam). Appena il boost per {label} è disponibile, ti avvisiamo.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3.5">
              <div className="flex flex-wrap gap-2.5" role="group" aria-label="La tua console">
                {CONSOLES.map((c) => {
                  const on = c.id === console_;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setConsole(c.id)}
                      className={`min-h-[44px] cursor-pointer rounded-full border-[1.5px] px-5 py-3 text-[15px] font-bold ${
                        on
                          ? "border-accent bg-accent text-alt"
                          : "border-line3 bg-transparent text-fg"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
              <label htmlFor="wlEmail" className="font-semibold">
                La tua email
              </label>
              <div className="flex flex-wrap gap-2.5">
                <input
                  id="wlEmail"
                  type="email"
                  autoComplete="email"
                  placeholder="nome@email.it"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErr("");
                  }}
                  className="min-h-[52px] min-w-0 flex-[1_1_220px] rounded-[14px] border-[1.5px] border-line3 bg-bg px-4 text-base text-fg"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="btn-main min-h-[52px] cursor-pointer rounded-full border-0 bg-accent px-6 text-base font-bold text-bg disabled:opacity-60"
                >
                  {busy ? "Invio…" : "Avvisami"}
                </button>
              </div>
              {/* honeypot anti-bot: nascosto a utenti e screen reader */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    setErr("");
                  }}
                  className="mt-0.5 shrink-0"
                />
                <span>
                  Acconsento a ricevere un&apos;email quando il servizio sarà disponibile.{" "}
                  <Link href="/privacy">Privacy</Link>
                </span>
              </label>
              {err && (
                <p role="alert" className="m-0 text-sm text-[#FFB4A8]">
                  {err}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
