import { SITE } from "./site";
import { PROMO_CODE, formatEURPlain, type Quote } from "./pricing";

export function waUrl(text: string): string {
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(text)}`;
}

export function homeWaUrl(): string {
  return waUrl("Ciao SaliDivisione! Vorrei informazioni sul boost Rivals.");
}

export function orderMessage(q: Quote, nick = ""): string {
  const promo = q.input.promo ? ` (codice ${PROMO_CODE})` : "";
  return `Ciao SaliDivisione! Vorrei ordinare: ${q.summary}${promo} – ${formatEURPlain(q.total)}. ID EA / nickname: ${nick.trim()}`;
}

export function orderUrl(q: Quote, nick = ""): string {
  return waUrl(orderMessage(q, nick));
}
