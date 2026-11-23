export const DIVISIONS = [
  "Divisione 10",
  "Divisione 9",
  "Divisione 8",
  "Divisione 7",
  "Divisione 6",
  "Divisione 5",
  "Divisione 4",
  "Divisione 3",
  "Divisione 2",
  "Divisione 1",
  "Élite",
] as const;

export const ELITE = DIVISIONS.length - 1; // indice 10

export type Service = "climb" | "weekly" | "coach";

export const COACH_PRICES = [25, 50, 65, 85, 105] as const;
export const PRIORITY_RATE = 0.2;
export const PROMO_RATE = 0.1;
export const PROMO_CODE = "PRIMO10";
export const MONTH_DISCOUNT = 0.15;
export const LATE_REFUND_RATE = 0.1;

/** Prezzo del passaggio dalla divisione con indice i alla successiva. */
export function stepPrice(i: number): number {
  if (i < 4) return 15;
  if (i < 7) return 18;
  if (i < 9) return 21;
  return 28; // 1 → Élite
}

/** Prezzo di una settimana (10 vittorie) giocata nella divisione con indice i. */
export function weekPrice(i: number): number {
  if (i < 4) return 25;
  if (i < 7) return 30;
  if (i < 10) return 35;
  return 50;
}

/** Ore di gioco stimate per il passaggio dalla divisione i alla successiva. */
export function stepHours(i: number): number {
  if (i < 7) return 1;
  if (i < 9) return 1.5;
  return 4;
}

/** Vittorie stimate per il passaggio dalla divisione i alla successiva (media ~6, 8 per 1 → Élite). */
export function stepWins(i: number): number {
  return i === 9 ? 8 : 6;
}

/** Prezzo per vittoria della fascia (informativo). */
export function pricePerWin(i: number): number {
  if (i < 4) return 2.5;
  if (i < 7) return 3;
  if (i < 10) return 3.5;
  return 5;
}

export interface QuoteInput {
  service: Service;
  from: number;
  to: number;
  weeks: number;
  hours: number;
  priority: boolean;
  promo: boolean;
}

export interface Quote {
  input: QuoteInput;
  base: number;
  total: number;
  summary: string;
  note: string;
  /** Ore di gioco stimate (arrotondate per eccesso), solo boost di divisione. */
  hoursEstimate: number | null;
  /** Ore di consegna garantita, null per il coaching. */
  guaranteeHours: number | null;
  /** Partite risparmiate rispetto a giocarle da soli (stima). */
  wins: number | null;
  platformLabel: string | null;
}

export const DEFAULT_INPUT: QuoteInput = {
  service: "climb",
  from: 0,
  to: 3,
  weeks: 1,
  hours: 1,
  priority: false,
  promo: true,
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(n) ? Math.trunc(n) : min));

export function normalize(input: QuoteInput): QuoteInput {
  const service = input.service;
  let from = input.from;
  let to = input.to;
  if (service === "climb") {
    from = clamp(from, 0, ELITE - 1);
    to = clamp(to, from + 1, ELITE);
  } else {
    from = clamp(from, 0, ELITE);
    to = clamp(to, from, ELITE);
  }
  return {
    ...input,
    from,
    to,
    weeks: clamp(input.weeks, 1, 4),
    hours: clamp(input.hours, 1, 5),
  };
}

export const round2 = (n: number) => Math.round(n * 100) / 100;

export function applyExtras(base: number, priority: boolean, promo: boolean) {
  let t = base;
  if (priority) t *= 1 + PRIORITY_RATE;
  if (promo) t *= 1 - PROMO_RATE;
  return round2(t);
}

export function climbBase(from: number, to: number): number {
  let sum = 0;
  for (let i = from; i < to; i++) sum += stepPrice(i);
  return sum;
}

export function weeklyBase(from: number, weeks: number): number {
  return round2(weekPrice(from) * weeks * (weeks === 4 ? 1 - MONTH_DISCOUNT : 1));
}

export function coachBase(hours: number): number {
  return COACH_PRICES[clamp(hours, 1, 5) - 1];
}

export function quote(raw: QuoteInput): Quote {
  const input = normalize(raw);
  const { service, from, to, weeks, hours } = input;
  let base = 0;
  let summary = "";
  let note = "";
  let hoursEstimate: number | null = null;
  let guaranteeHours: number | null = null;
  let wins: number | null = null;
  let platformLabel: string | null = "PC";

  if (service === "climb") {
    base = climbBase(from, to);
    let h = 0;
    let w = 0;
    for (let i = from; i < to; i++) {
      h += stepHours(i);
      w += stepWins(i);
    }
    hoursEstimate = Math.ceil(h);
    guaranteeHours = to - from <= 3 ? 24 : 48;
    wins = w;
    summary = `${DIVISIONS[from]} → ${DIVISIONS[to]}`;
    note = `Di solito in circa ${hoursEstimate} ${hoursEstimate === 1 ? "ora" : "ore"} di gioco · garantito entro ${guaranteeHours} ore.`;
  } else if (service === "weekly") {
    base = weeklyBase(from, weeks);
    guaranteeHours = 24;
    wins = 10 * weeks;
    summary = `Ricompense Rivals · 10 vittorie · ${DIVISIONS[from]} · ${weeks} ${weeks === 1 ? "settimana" : "settimane"}`;
    note = "Di solito in 3–4 ore · garantito entro 24 ore, sempre prima del giovedì.";
  } else {
    base = coachBase(hours);
    platformLabel = null;
    summary = `Coaching live · ${hours} ${hours === 1 ? "ora" : "ore"}`;
    note = "Su appuntamento, in chiamata Discord. Da 3 ore il prezzo orario scende.";
  }

  const total = applyExtras(base, input.priority, input.promo);
  if (platformLabel) summary += ` · ${platformLabel}`;
  if (input.priority) summary += " · Priorità";

  return { input, base, total, summary, note, hoursEstimate, guaranteeHours, wins, platformLabel };
}

const eur = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

/** Es. "184,00 €" (con spazio non separabile, come da Intl). */
export function formatEUR(n: number): string {
  return eur.format(n);
}

/** Come formatEUR ma con uno spazio normale, adatto a messaggi e URL. */
export function formatEURPlain(n: number): string {
  return formatEUR(n).replace(/ /g, " ");
}
