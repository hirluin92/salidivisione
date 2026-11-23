import fs from "node:fs";
import path from "node:path";

export type GuideMeta = {
  slug: string;
  title: string;
  /** Title tag completo (≤ 60 caratteri) */
  metaTitle: string;
  description: string;
  minutes: number;
  date: string; // ISO
};

export const GUIDES: GuideMeta[] = [
  {
    slug: "come-salire-di-divisione-rivals-fc-27",
    title: "Come salire di divisione in Rivals su FC 27",
    metaTitle: "Come salire di divisione in Rivals FC 27 | SaliDivisione",
    description:
      "Stage, serie di vittorie e checkpoint: come funziona la scalata in Division Rivals su FC 27 e 8 consigli pratici per salire più in fretta.",
    minutes: 5,
    date: "2026-11-23",
  },
  {
    slug: "ricompense-division-rivals-fc-27-punti",
    title: "Ricompense Division Rivals FC 27: quanti punti servono",
    metaTitle: "Ricompense Rivals FC 27: quanti punti servono",
    description:
      "Punti settimanali, ricompense base e migliorate, giorno di consegna: tutto quello che serve sapere sulle ricompense di Rivals su FC 27.",
    minutes: 4,
    date: "2026-11-23",
  },
  {
    slug: "migliori-moduli-tattiche-rivals-fc-27",
    title: "Migliori moduli e tattiche per Rivals su FC 27",
    metaTitle: "Migliori moduli e tattiche per Rivals su FC 27",
    description:
      "4-2-1-3, 4-3-3, 4-4-1-1 e gli altri moduli più usati in Ultimate Team su FC 27: punti di forza, quando usarli e come impostare le tattiche personalizzate.",
    minutes: 6,
    date: "2026-11-23",
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);

/** Estrae le domande della sezione "## Domande frequenti" dal file MDX (per il JSON-LD FAQPage). */
export function guideFaq(slug: string): { q: string; a: string }[] {
  const file = path.join(process.cwd(), "content", "guide", `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const start = raw.indexOf("## Domande frequenti");
  if (start < 0) return [];
  const section = raw.slice(start).split("\n---")[0];
  const clean = (s: string) =>
    s
      .replace(/\*\*/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();
  return section
    .split(/\n### /)
    .slice(1)
    .map((block) => {
      const [q, ...rest] = block.split("\n");
      return { q: clean(q), a: clean(rest.join(" ")) };
    })
    .filter((f) => f.q && f.a);
}
