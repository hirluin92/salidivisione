import { track } from "@vercel/analytics";

/** Evento senza cookie su ogni clic WhatsApp, per calcolare il tasso di conversione. */
export function trackWhatsApp(source: string, service: string, total: number | null) {
  try {
    track("whatsapp_click", {
      source,
      service,
      ...(total === null ? {} : { total }),
    });
  } catch {
    /* l'analytics non deve mai bloccare il link */
  }
}
