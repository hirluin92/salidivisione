import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{2,}$/;
const CONSOLES = { ps: "PlayStation 5", xbox: "Xbox Series X|S" } as const;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }
  const b = (body ?? {}) as Record<string, unknown>;
  const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
  const consoleKey = typeof b.console === "string" ? b.console : "";

  // honeypot: i bot compilano il campo nascosto; rispondiamo "ok" senza fare nulla
  if (typeof b.website === "string" && b.website.length > 0) {
    return NextResponse.json({ ok: true });
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ error: "Inserisci un indirizzo email valido." }, { status: 400 });
  }
  if (b.consent !== true) {
    return NextResponse.json({ error: "Serve il consenso per poterti scrivere." }, { status: 400 });
  }
  if (!(consoleKey in CONSOLES)) {
    return NextResponse.json({ error: "Scegli la tua console." }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID); // ID della lista "Waitlist console"
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID); // template di conferma double opt-in
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://salidivisione.it";
  if (!apiKey || !listId || !templateId) {
    console.error("Waitlist: configurazione Brevo mancante");
    return NextResponse.json(
      { error: "Iscrizione momentaneamente non disponibile. Scrivici su WhatsApp." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      email,
      attributes: { CONSOLE: CONSOLES[consoleKey as keyof typeof CONSOLES] },
      includeListIds: [listId],
      templateId,
      redirectionUrl: `${siteUrl}/?iscrizione=confermata`,
    }),
  });

  // 204 = ok; 400 "Contact already exist" non va rivelato (privacy): trattiamo come ok.
  if (res.ok || res.status === 400) {
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      if (!/already exist/i.test(t)) console.error("Brevo 400:", t.slice(0, 200));
    }
    return NextResponse.json({ ok: true });
  }
  console.error("Brevo errore", res.status);
  return NextResponse.json({ error: "Qualcosa è andato storto. Riprova tra poco." }, { status: 502 });
}
