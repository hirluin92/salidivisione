import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy policy | SaliDivisione",
  description: "Informativa sulla privacy di SaliDivisione: dati degli ordini su WhatsApp e analytics senza cookie.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <article className="mx-auto max-w-[780px] px-6 pb-16 pt-4">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />
      <h1 className="display mb-6 mt-8 text-[clamp(40px,5.4vw,68px)] leading-[0.98]">
        Privacy policy
      </h1>
      {/* TODO: far rivedere il testo definitivo a un consulente legale. */}
      <div className="prose-sd">
        <p>Testo segnaposto: da completare.</p>
        <h2>Dati che raccogliamo</h2>
        <ul>
          <li>
            <strong>Ordini:</strong> i dati che ci invii su WhatsApp per eseguire il servizio, che
            eliminiamo a fine ordine.
          </li>
          <li>
            <strong>Statistiche:</strong> analytics senza cookie e senza profilazione.
          </li>
        </ul>
        <h2>Diritti</h2>
        <p>TODO: diritti dell&apos;interessato, conservazione e come revocare il consenso.</p>
      </div>
    </article>
  );
}
