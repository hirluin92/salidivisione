import Link from "next/link";
import { LogoMark } from "@/components/ui/icons";
import { NAV } from "@/lib/site";

export function Header() {
  return (
    <header className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-5">
      <Link href="/" className="flex items-center gap-2.5 text-fg no-underline hover:text-fg">
        <LogoMark />
        <span className="display text-[26px] tracking-[0.02em]">
          SaliDivisione<span className="text-accent">.it</span>
        </span>
      </Link>
      <nav
        aria-label="Principale"
        className="flex flex-wrap items-center gap-x-[26px] gap-y-2 text-[15px] font-medium"
      >
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="inline-flex min-h-[44px] items-center text-fg2 no-underline hover:text-accent"
          >
            {n.label}
          </Link>
        ))}
        <Link
          href="/#prezzi"
          className="btn-main inline-flex min-h-[44px] items-center rounded-full bg-accent px-[22px] py-3 font-bold text-bg no-underline"
        >
          Ordina ora
        </Link>
      </nav>
    </header>
  );
}
