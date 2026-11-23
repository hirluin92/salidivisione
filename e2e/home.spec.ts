import { expect, test } from "@playwright/test";

test("la home si carica con un solo H1", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Boost Division Rivals FC 27 in Italia/);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("link", { name: /Vedi i prezzi · da 15 €/ })).toBeVisible();
});

test("calcolatore: 10 → Élite senza extra e senza sconto = 184 €", async ({ page }) => {
  await page.goto("/");
  await page.locator("#prezzi").scrollIntoViewIfNeeded();
  await page.getByLabel("Primo ordine", { exact: false }).uncheck();
  await page.locator("#fromDiv").selectOption({ label: "Divisione 10" });
  await page.locator("#toDiv").selectOption({ label: "Élite" });
  await page.locator("#nick").fill("MioID");
  await expect(page.getByTestId("total")).toHaveText(/184,00\s*€/);

  const href = (await page.getByTestId("wa-order").getAttribute("href")) ?? "";
  expect(href.startsWith("https://wa.me/393339406945?text=")).toBe(true);
  const text = decodeURIComponent(href.split("text=")[1]).replace(/ /g, " ");
  expect(text).toContain("184,00 €");
  expect(text).toContain("Divisione 10 → Élite");
  expect(text).toContain("ID EA / nickname: MioID");
});

test("l'ID EA è obbligatorio per ordinare", async ({ page }) => {
  await page.goto("/");
  const order = page.getByTestId("wa-order");
  // senza ID EA non c'è nessun link WhatsApp
  await expect(order).toHaveText(/Inserisci l'ID EA/);
  expect(await order.getAttribute("href")).toBeNull();
  await order.click();
  await expect(page.locator("#nick-err")).toContainText("ID EA");
  // con l'ID EA il link compare
  await page.locator("#nick").fill("AB");
  await expect(page.getByTestId("wa-order")).toHaveAttribute("href", /wa\.me/);
});

test("il messaggio WhatsApp include il nickname", async ({ page }) => {
  await page.goto("/");
  await page.locator("#nick").fill("MioID");
  const href = (await page.getByTestId("wa-order").getAttribute("href")) ?? "";
  expect(decodeURIComponent(href)).toContain("ID EA / nickname: MioID");
});

test("preventivo condiviso via link", async ({ page }) => {
  await page.goto("/?svc=climb&from=7&to=10&promo=0#prezzi");
  await expect(page.getByTestId("total")).toHaveText(/70,00\s*€/); // 21+21+28
});

test("la pagina servizio preimposta il calcolatore", async ({ page }) => {
  await page.goto("/coaching-fc-27");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByTestId("summary")).toContainText("Coaching live");
});

test("nessuno scroll orizzontale", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("barra mobile col totale sotto i 720px", async ({ page, isMobile }) => {
  test.skip(!isMobile, "solo mobile");
  await page.goto("/");
  await expect(page.locator(".mob-bar")).toBeVisible();
  await expect(page.locator(".wa-float")).toBeHidden();
  await expect(page.locator(".mob-bar")).toContainText("Inserisci ID EA");
  await page.locator("#nick").fill("MioID");
  await expect(page.locator(".mob-bar").getByRole("link", { name: /Ordina su WhatsApp/ })).toBeVisible();
});
