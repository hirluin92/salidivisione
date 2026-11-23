const STEPS = [
  { t: "Calcola e scrivici", d: "Un tocco e il messaggio WhatsApp con l'ordine è già pronto." },
  {
    t: "Paghi e fissiamo l'orario",
    d: "PayPal o bonifico istantaneo. All'accesso ci passi il codice di verifica di EA.",
  },
  { t: "Giochiamo, tu guardi", d: "Aggiornamenti dopo ogni sessione e stream in diretta, gratis." },
  { t: "Ti godi le ricompense", d: "Cambi la password e il giovedì ritiri le ricompense." },
];

export function HowItWorks() {
  return (
    <section id="come" className="mx-auto max-w-[1240px] px-6 pb-14 pt-24">
      <h2 className="h2 mb-12">
        Come funziona
        <br />
        <span className="text-accent">il boost Rivals</span>
      </h2>
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7 p-0">
        {STEPS.map((s, i) => (
          <li key={s.t} className={`border-t-[3px] pt-5 ${i === 0 ? "border-accent" : "border-line3"}`}>
            <p
              aria-hidden="true"
              className={`display m-0 mb-3.5 text-[64px] leading-none ${i === 0 ? "text-accent" : "text-fg"}`}
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="m-0 mb-2 text-xl font-bold">{s.t}</h3>
            <p className="m-0 text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
