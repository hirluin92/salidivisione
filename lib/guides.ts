export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  minutes: number;
  date: string; // ISO
};

export const GUIDES: GuideMeta[] = [
  {
    slug: "come-salire-di-divisione-rivals-fc-27",
    title: "Come salire di divisione in Rivals su FC 27",
    description:
      "Come funziona la salita in Division Rivals su FC 27: punti, divisioni e metodi per salire più in fretta, da solo o con aiuto.",
    minutes: 5,
    date: "2026-11-23",
  },
  {
    slug: "ricompense-division-rivals-fc-27-punti",
    title: "Ricompense Division Rivals FC 27: quanti punti servono",
    description:
      "Quanti punti servono per le ricompense settimanali di Division Rivals su FC 27, quando arrivano e come non perderle.",
    minutes: 4,
    date: "2026-11-23",
  },
  {
    slug: "migliori-moduli-tattiche-rivals-fc-27",
    title: "Migliori moduli e tattiche per Rivals su FC 27",
    description:
      "I moduli e le tattiche più efficaci per vincere in Division Rivals su FC 27, con istruzioni giocatore e consigli pratici.",
    minutes: 6,
    date: "2026-11-23",
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
