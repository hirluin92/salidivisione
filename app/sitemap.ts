import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { GUIDES } from "@/lib/guides";
import { BOOST_ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: SITE.url + path,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/boost-division-rivals-fc-27", 0.9),
    page("/ricompense-settimanali-rivals", 0.9),
    page("/coaching-fc-27", 0.8),
    ...BOOST_ROUTES.map((r) => page(`/boost-division-rivals-fc-27/${r.slug}`, 0.6)),
    page("/guide", 0.7),
    ...GUIDES.map((g) => page(`/guide/${g.slug}`, 0.6)),
    page("/termini", 0.2),
    page("/privacy", 0.2),
  ];
}
