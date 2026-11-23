import { describe, expect, it } from "vitest";
import {
  DEFAULT_INPUT,
  formatEURPlain,
  normalize,
  quote,
  stepPrice,
  weekPrice,
  type QuoteInput,
} from "../lib/pricing";

const q = (o: Partial<QuoteInput>) =>
  quote({ ...DEFAULT_INPUT, priority: false, promo: false, ...o });

describe("boost di divisione", () => {
  it("10 → Élite costa 184 € senza extra", () => {
    expect(q({ from: 0, to: 10 }).total).toBe(184);
  });
  it("prezzo per passaggio per fascia", () => {
    expect(stepPrice(0)).toBe(15);
    expect(stepPrice(3)).toBe(15);
    expect(stepPrice(4)).toBe(18);
    expect(stepPrice(6)).toBe(18);
    expect(stepPrice(7)).toBe(21);
    expect(stepPrice(8)).toBe(21);
    expect(stepPrice(9)).toBe(28);
  });
  it("Div 10 → Div 7 sono 3 passaggi da 15 €", () => {
    expect(q({ from: 0, to: 3 }).total).toBe(45);
  });
  it("forza 'a' sempre maggiore di 'da'", () => {
    const n = normalize({ ...DEFAULT_INPUT, from: 5, to: 2 });
    expect(n.to).toBe(6);
  });
  it("tempi: ore per eccesso e garanzia 24/48 h", () => {
    const short = q({ from: 7, to: 9 }); // 1,5 + 1,5 = 3 h, 2 passaggi
    expect(short.hoursEstimate).toBe(3);
    expect(short.guaranteeHours).toBe(24);
    const long = q({ from: 0, to: 10 }); // 7×1 + 2×1,5 + 4 = 14 h
    expect(long.hoursEstimate).toBe(14);
    expect(long.guaranteeHours).toBe(48);
    expect(q({ from: 0, to: 3 }).guaranteeHours).toBe(24);
    expect(q({ from: 0, to: 4 }).guaranteeHours).toBe(48);
    expect(q({ from: 7, to: 8 }).hoursEstimate).toBe(2); // 1,5 → 2
  });
});

describe("ricompense settimanali", () => {
  it("prezzo per divisione di gioco", () => {
    expect(weekPrice(0)).toBe(25);
    expect(weekPrice(3)).toBe(25);
    expect(weekPrice(4)).toBe(30);
    expect(weekPrice(6)).toBe(30);
    expect(weekPrice(7)).toBe(35);
    expect(weekPrice(9)).toBe(35);
    expect(weekPrice(10)).toBe(50);
  });
  it("4 settimane hanno −15%", () => {
    expect(q({ service: "weekly", from: 0, weeks: 4 }).total).toBe(85);
    expect(q({ service: "weekly", from: 0, weeks: 3 }).total).toBe(75);
  });
  it("garantito entro 24 ore", () => {
    expect(q({ service: "weekly" }).guaranteeHours).toBe(24);
  });
});

describe("coaching", () => {
  it("1–5 ore", () => {
    expect([1, 2, 3, 4, 5].map((hours) => q({ service: "coach", hours }).total)).toEqual([
      25, 50, 65, 85, 105,
    ]);
  });
  it("non riporta PC nel riepilogo", () => {
    expect(q({ service: "coach" }).summary).not.toContain("PC");
  });
});

describe("extra", () => {
  it("priorità +20%", () => {
    expect(q({ from: 0, to: 10, priority: true }).total).toBe(220.8);
  });
  it("PRIMO10 −10%", () => {
    expect(q({ from: 0, to: 10, promo: true }).total).toBe(165.6);
  });
  it("entrambi, arrotondati a 2 decimali", () => {
    expect(q({ from: 0, to: 3, priority: true, promo: true }).total).toBe(48.6);
    expect(q({ from: 0, to: 1, priority: true, promo: true }).total).toBe(16.2);
  });
});

describe("formato", () => {
  it("euro in italiano", () => {
    expect(formatEURPlain(184)).toBe("184,00 €");
    expect(formatEURPlain(48.6)).toBe("48,60 €");
  });
  it("riepilogo boost e settimanali riporta PC", () => {
    expect(q({ from: 0, to: 3 }).summary).toBe("Divisione 10 → Divisione 7 · PC");
    expect(q({ service: "weekly" }).summary).toContain("· PC");
  });
});
