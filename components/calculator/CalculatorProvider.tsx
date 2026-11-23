"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_INPUT,
  quote,
  type Quote,
  type QuoteInput,
  type Service,
} from "@/lib/pricing";
import { orderUrl } from "@/lib/whatsapp";

type Ctx = {
  input: QuoteInput;
  q: Quote;
  nick: string;
  /** L'ID EA è obbligatorio per ordinare */
  nickOk: boolean;
  nickTouched: boolean;
  /** Porta l'utente sul campo ID EA (o sul calcolatore) e mostra l'errore */
  requestNick: () => void;
  waLink: string;
  update: (patch: Partial<QuoteInput>) => void;
  setNick: (v: string) => void;
  preset: (p: Partial<QuoteInput>) => void;
  shareUrl: () => string;
};

const CalcCtx = createContext<Ctx | null>(null);

const SERVICES: Service[] = ["climb", "weekly", "coach"];

function fromSearch(search: string): Partial<QuoteInput> | null {
  const p = new URLSearchParams(search);
  const svc = p.get("svc");
  if (!svc || !SERVICES.includes(svc as Service)) return null;
  const n = (k: string) => (p.has(k) ? Number(p.get(k)) : undefined);
  const out: Partial<QuoteInput> = { service: svc as Service };
  const from = n("from");
  const to = n("to");
  const weeks = n("weeks");
  const hours = n("hours");
  if (from !== undefined && !Number.isNaN(from)) out.from = from;
  if (to !== undefined && !Number.isNaN(to)) out.to = to;
  if (weeks !== undefined && !Number.isNaN(weeks)) out.weeks = weeks;
  if (hours !== undefined && !Number.isNaN(hours)) out.hours = hours;
  if (p.get("prio") === "1") out.priority = true;
  if (p.get("promo") === "0") out.promo = false;
  return out;
}

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState<QuoteInput>(DEFAULT_INPUT);
  const [nick, setNickRaw] = useState("");
  const [nickTouched, setNickTouched] = useState(false);
  const nickOk = nick.trim().length >= 2;

  const setNick = useCallback((v: string) => setNickRaw(v), []);
  const requestNick = useCallback(() => {
    setNickTouched(true);
    const el = document.getElementById("nick");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => (el as HTMLInputElement).focus({ preventScroll: true }), 350);
    } else {
      window.location.href = "/#prezzi";
    }
  }, []);

  // Preventivo condiviso via link (?svc=climb&from=7&to=10)
  useEffect(() => {
    const parsed = fromSearch(window.location.search);
    if (parsed) setInput((cur) => quote({ ...cur, ...parsed }).input);
  }, []);

  const update = useCallback((patch: Partial<QuoteInput>) => {
    setInput((cur) => quote({ ...cur, ...patch }).input);
  }, []);

  const q = useMemo(() => quote(input), [input]);
  const waLink = useMemo(() => orderUrl(q, nick), [q, nick]);

  const shareUrl = useCallback(() => {
    const i = q.input;
    const p = new URLSearchParams({ svc: i.service });
    if (i.service === "climb") {
      p.set("from", String(i.from));
      p.set("to", String(i.to));
    } else if (i.service === "weekly") {
      p.set("from", String(i.from));
      p.set("weeks", String(i.weeks));
    } else {
      p.set("hours", String(i.hours));
    }
    if (i.priority) p.set("prio", "1");
    if (!i.promo) p.set("promo", "0");
    return `${window.location.origin}${window.location.pathname}?${p.toString()}#prezzi`;
  }, [q]);

  const value: Ctx = {
    input: q.input,
    q,
    nick,
    nickOk,
    nickTouched,
    requestNick,
    waLink,
    update,
    setNick,
    preset: update,
    shareUrl,
  };
  return <CalcCtx.Provider value={value}>{children}</CalcCtx.Provider>;
}

export function useCalculator(): Ctx {
  const c = useContext(CalcCtx);
  if (!c) throw new Error("useCalculator va usato dentro CalculatorProvider");
  return c;
}
