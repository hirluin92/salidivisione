export const SITE = {
  name: "SaliDivisione",
  // TODO: sostituire con il dominio definitivo (o impostare NEXT_PUBLIC_SITE_URL)
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://salidivisione.it").replace(/\/$/, ""),
  waNumber: process.env.NEXT_PUBLIC_WA_NUMBER ?? "393339406945",
  discordUrl: process.env.NEXT_PUBLIC_DISCORD_URL ?? "https://discord.gg/BcdMy39He8",
  email: "", // TODO: email di contatto, se disponibile
} as const;

export const NAV = [
  { href: "/#servizi", label: "Servizi" },
  { href: "/#prezzi", label: "Prezzi" },
  { href: "/guide", label: "Guide" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const SERVICE_LINKS = [
  { href: "/boost-division-rivals-fc-27", label: "Boost di divisione" },
  { href: "/ricompense-settimanali-rivals", label: "Ricompense settimanali" },
  { href: "/coaching-fc-27", label: "Coaching live" },
] as const;
