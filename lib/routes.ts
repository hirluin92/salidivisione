import { DIVISIONS, ELITE } from "./pricing";

export type BoostRoute = { slug: string; label: string; from: number; to: number };

const short = (i: number) => (i === ELITE ? "Élite" : `Div ${10 - i}`);
const slugPart = (i: number) => (i === ELITE ? "elite" : `divisione-${10 - i}`);

// Tratte più cercate: [indice di partenza, indice di arrivo]
const PAIRS: [number, number][] = [
  [0, 5],
  [0, 7],
  [0, 9],
  [0, 10],
  [3, 9],
  [5, 9],
  [7, 9],
  [7, 10],
  [9, 10],
];

export const BOOST_ROUTES: BoostRoute[] = PAIRS.map(([from, to]) => ({
  slug: `da-${slugPart(from)}-a-${slugPart(to)}`,
  label: `${short(from)} → ${short(to)}`,
  from,
  to,
}));

export const routeBySlug = (slug: string) => BOOST_ROUTES.find((r) => r.slug === slug);
export const divName = (i: number) => DIVISIONS[i];
