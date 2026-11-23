import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { GUIDES, guideBySlug } from "@/lib/guides";
import { articleLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return buildMetadata({
    title: `${g.title} | SaliDivisione`.length <= 60 ? `${g.title} | SaliDivisione` : g.title,
    description: g.description,
    path: `/guide/${g.slug}`,
    type: "article",
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();
  const { default: Content } = await import(`@/content/guide/${slug}.mdx`);
  const path = `/guide/${g.slug}`;

  return (
    <article className="mx-auto max-w-[780px] px-6 pb-16 pt-4">
      <JsonLd data={articleLd({ title: g.title, description: g.description, path, date: g.date })} />
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guide", path: "/guide" },
          { name: g.title, path },
        ]}
      />
      <p className="mb-2 mt-8 text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
        Guida · {g.minutes} min
      </p>
      <h1 className="display m-0 mb-6 text-[clamp(40px,5.4vw,68px)] leading-[0.98]">{g.title}</h1>
      <div className="prose-sd">
        <Content />
      </div>
      <aside className="mt-12 rounded-[24px] bg-accent p-8 text-bg">
        <p className="display m-0 mb-2 text-[32px] leading-none">Non vuoi giocarle tu?</p>
        <p className="m-0 mb-4 font-medium">
          Calcola il prezzo del boost e ordina su WhatsApp: guardi tutto in diretta, gratis.
        </p>
        <Link
          href="/boost-division-rivals-fc-27#prezzi"
          className="inline-flex min-h-[44px] items-center rounded-full bg-bg px-6 py-3 font-bold text-fg no-underline hover:text-fg"
        >
          Calcola il prezzo
        </Link>
      </aside>
    </article>
  );
}
