import Link from "next/link";
import { GuidesList } from "@/components/home/GuidesList";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guide Division Rivals FC 27 | SaliDivisione",
  description:
    "Guide su Division Rivals FC 27: come salire di divisione, quanti punti servono per le ricompense e quali moduli e tattiche usare.",
  path: "/guide",
});

export default function GuideIndex() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 pt-4">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guide", path: "/guide" },
        ]}
      />
      <h1 className="display mt-6 text-[clamp(48px,6vw,84px)] leading-[0.95]">
        Guide Division Rivals <span className="text-accent">FC 27</span>
      </h1>
      <p className="max-w-[640px] text-lg text-fg2">
        Tutto quello che serve per salire di divisione e prendere le ricompense della settimana. Se
        preferisci non giocare, guarda il <Link href="/boost-division-rivals-fc-27">boost di divisione</Link>.
      </p>
      <div className="-mx-6">
        <GuidesList headingLevel={3} />
      </div>
    </div>
  );
}
