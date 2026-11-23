import { SparkIcon } from "@/components/ui/icons";

const ITEMS = [
  "Boost di divisione",
  "Ricompense settimanali",
  "Coaching live",
  "Stream gratis",
  "Assistenza in italiano",
  "PayPal",
  "Tempi garantiti",
  "Rimborso garantito",
];

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <>
      <div
        aria-hidden="true"
        className="-mx-5 overflow-hidden whitespace-nowrap bg-accent py-3.5 text-bg"
        style={{ transform: "rotate(-1.2deg)" }}
      >
        <div className="marquee display inline-flex text-[26px] tracking-[0.02em]">
          {loop.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-7 pr-7">
              {t}
              <SparkIcon />
            </span>
          ))}
        </div>
      </div>
      {/* Stessi contenuti per screen reader e motori di ricerca */}
      <ul className="sr-only">
        {ITEMS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </>
  );
}
