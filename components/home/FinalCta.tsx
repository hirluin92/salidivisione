import Link from "next/link";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pb-24 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-8 rounded-[32px] bg-accent p-[clamp(36px,6vw,72px)] text-bg">
        <h2 className="display m-0 text-[clamp(48px,7vw,96px)] leading-[0.92]">
          Pronto
          <br />a salire?
        </h2>
        <div className="flex flex-[0_1_360px] flex-col gap-3.5">
          <p className="m-0 text-lg font-medium">
            Calcola il prezzo e scrivici: di solito partiamo in giornata.
          </p>
          <Link
            href="/#prezzi"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-bg px-7 py-[18px] text-center text-lg font-bold text-fg no-underline hover:text-fg"
          >
            Calcola il prezzo
          </Link>
        </div>
      </div>
    </section>
  );
}
