import Link from "next/link";
import { SERVICE_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-5 px-6 py-9 text-[13px] text-muted">
        <div className="max-w-[720px]">
          <p className="m-0">
            SaliDivisione.it è un servizio indipendente, non affiliato, sponsorizzato o approvato da
            Electronic Arts. EA Sports FC è un marchio dei rispettivi proprietari. Ordinando accetti
            i Termini di servizio e il rischio legato all&apos;accesso di terzi al tuo account.
          </p>
          <p className="m-0 mt-3">
            Pagamento anticipato al 100% con PayPal o bonifico istantaneo · rimborso della parte non
            completata · stream privato gratis in ogni ordine.
          </p>
        </div>
        <nav aria-label="Link utili" className="flex flex-col gap-1">
          {SERVICE_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex min-h-[32px] items-center">
              {l.label}
            </Link>
          ))}
          <Link href="/guide" className="inline-flex min-h-[32px] items-center">
            Guide
          </Link>
        </nav>
        <p className="m-0">
          <Link href="/termini">Termini</Link> · <Link href="/privacy">Privacy</Link>
        </p>
      </div>
    </footer>
  );
}
