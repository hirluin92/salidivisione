"use client";

import { useEffect, useState } from "react";
import { PROMO_CODE } from "@/lib/pricing";

const DEFAULT = `Ricompense in arrivo giovedì: ordina entro mercoledì sera · Primo ordine −10% con ${PROMO_CODE}`;

function romeWeekday(): number {
  const wd = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Europe/Rome" }).format(
    new Date(),
  );
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
}

function messageFor(day: number): string {
  if (day === 3) return `Ricompense in arrivo domani: ordina entro stasera · Primo ordine −10% con ${PROMO_CODE}`;
  if (day === 4)
    return `Ricompense di oggi in arrivo · Prenota le prossime: primo ordine −10% con ${PROMO_CODE}`;
  if (day === 5 || day === 6 || day === 0)
    return `Parti col piede giusto: prenota le ricompense della prossima settimana · −10% con ${PROMO_CODE}`;
  return DEFAULT;
}

/** Testo dinamico in base al giorno (fuso di Roma): l'urgenza resta sempre vera. */
export function PromoBar() {
  const [text, setText] = useState(DEFAULT);
  useEffect(() => {
    setText(messageFor(romeWeekday()));
  }, []);
  return (
    <div className="bg-accent px-4 py-2.5 text-center text-sm font-bold text-bg">{text}</div>
  );
}
