import Link from "next/link";
import { Calculator } from "@/components/calculator/Calculator";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq, type FaqItem } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { CheckIcon } from "@/components/ui/icons";
import { faqLd, serviceLd } from "@/lib/seo";
import type { Crumb } from "@/lib/seo";
import type { QuoteInput } from "@/lib/pricing";

export type Section = { h2: string; paragraphs: string[]; list?: string[] };
export type Related = { href: string; label: string; text: string };

export function ServicePage(props: {
  path: string;
  crumbs: Crumb[];
  eyebrow: string;
  h1: string;
  lead: string;
  highlights: string[];
  preset: Partial<QuoteInput>;
  sections: Section[];
  faq: FaqItem[];
  related: Related[];
  schema: { name: string; description: string; lowPrice: number; highPrice: number; offerCount: number };
}) {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({ ...props.schema, path: props.path }),
          faqLd(props.faq),
        ]}
      />
      <div className="mx-auto max-w-[1240px] px-6 pt-4">
        <Breadcrumbs crumbs={props.crumbs} />
        <header className="pb-2 pt-8">
          <p className="m-0 mb-4 text-sm font-semibold uppercase tracking-[0.06em] text-fg2">
            {props.eyebrow}
          </p>
          <h1 className="display m-0 mb-5 max-w-[980px] text-[clamp(44px,6.4vw,92px)] leading-[0.95]">
            {props.h1}
          </h1>
          <p className="m-0 mb-6 max-w-[680px] text-xl text-fg2">{props.lead}</p>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-[15px] font-medium text-fg2">
            {props.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-2">
                <CheckIcon />
                {h}
              </li>
            ))}
          </ul>
        </header>
      </div>

      <Calculator preset={props.preset} />

      <div className="mx-auto max-w-[780px] px-6 pb-8 pt-10">
        <div className="prose-sd">
          {props.sections.map((s) => (
            <section key={s.h2}>
              <h2>{s.h2}</h2>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-[900px] px-6 pb-12 pt-10">
        <h2 className="h2 mb-8">Domande frequenti</h2>
        <Faq items={props.faq} />
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-24">
        <h2 className="display m-0 mb-6 text-[clamp(30px,3.6vw,44px)] leading-none">
          Continua da qui
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {props.related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="lift flex flex-col gap-1.5 rounded-3xl border border-line2 bg-surface p-6 text-fg no-underline hover:text-fg"
            >
              <span className="text-lg font-bold">{r.label}</span>
              <span className="text-muted">{r.text}</span>
              <span className="mt-1 font-bold text-accent">Vai →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
