import Link from "next/link";
import { breadcrumbLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <nav aria-label="Percorso" className="text-sm text-muted">
        <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex gap-2">
                {last ? (
                  <span aria-current="page" className="text-fg2">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="text-muted underline-offset-4 hover:text-accent">
                    {c.name}
                  </Link>
                )}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
