import { PlusIcon } from "./icons";

export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col border-t border-line2">
      {items.map((f) => (
        <details key={f.q} className="border-b border-line2 px-1 py-[22px]">
          <summary className="flex min-h-[32px] items-center justify-between gap-4 text-[19px] font-semibold">
            <h3 className="m-0 text-[19px] font-semibold">{f.q}</h3>
            <PlusIcon />
          </summary>
          <p className="m-0 mt-3 max-w-[720px] text-fg2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
