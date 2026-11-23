"use client";

import { homeWaUrl } from "@/lib/whatsapp";
import { trackWhatsApp } from "@/lib/analytics";
import { ChatIcon } from "@/components/ui/icons";

export function WhatsAppFloat() {
  return (
    <a
      className="wa-float fixed bottom-5 right-5 z-50 inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-accent px-5 py-3.5 font-bold text-bg no-underline shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:text-bg"
      href={homeWaUrl()}
      target="_blank"
      rel="noopener"
      aria-label="Scrivici su WhatsApp"
      onClick={() => trackWhatsApp("float", "info", null)}
    >
      <ChatIcon size={22} />
      Scrivici
    </a>
  );
}
