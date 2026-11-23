"use client";

import Link from "next/link";
import { useCalculator } from "@/components/calculator/CalculatorProvider";
import { formatEUR } from "@/lib/pricing";
import { trackWhatsApp } from "@/lib/analytics";
import { ChatIcon } from "@/components/ui/icons";

/** Sotto i 720px: totale del calcolatore + "Ordina su WhatsApp" sempre a portata di pollice. */
export function MobileOrderBar() {
  const { q, waLink, input, nickOk, requestNick } = useCalculator();
  const btn =
    "inline-flex min-h-[48px] max-w-[240px] flex-auto cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-accent px-[18px] font-bold text-bg no-underline hover:text-bg";
  return (
    <div className="mob-bar fixed inset-x-0 bottom-0 z-[60] items-center justify-between gap-3 border-t border-[#2A3442] bg-alt px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <Link
        href="/#prezzi"
        className="flex min-h-[44px] flex-col justify-center text-fg no-underline hover:text-fg"
      >
        <span className="text-xs text-muted">Il tuo boost</span>
        <span className="display text-[22px] leading-[1.1] text-accent">{formatEUR(q.total)}</span>
      </Link>
      {nickOk ? (
        <a
          href={waLink}
          target="_blank"
          rel="noopener"
          onClick={() => trackWhatsApp("mobile-bar", input.service, q.total)}
          className={btn}
        >
          <ChatIcon />
          Ordina su WhatsApp
        </a>
      ) : (
        <button type="button" onClick={requestNick} className={btn}>
          <ChatIcon />
          Inserisci ID EA
        </button>
      )}
    </div>
  );
}
