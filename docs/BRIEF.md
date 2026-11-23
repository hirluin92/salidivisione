# Brief – SaliDivisione.it

Sito vetrina per un servizio italiano di boost **Division Rivals** su EA Sports FC 27
(boost di divisione, ricompense settimanali, coaching).

**Piattaforme**: boost di divisione e ricompense settimanali **solo PC** (su FC 27 ogni piattaforma ha un club Ultimate Team separato e il booster gioca da PC). Il coaching vale per PC, PlayStation e Xbox. Il boost per console è "in arrivo" con lista d'attesa.
Obiettivo: arrivare su Google Italia con le ricerche dei giocatori e trasformare le visite in ordini su WhatsApp.

## Riferimento grafico
`docs/design-reference.html` è il design approvato: colori, font, testi, sezioni e logica del calcolatore.
È in un formato proprietario (`<x-dc>`, `{{segnaposto}}`, classe `Component extends DCLogic`): **non riusare il runtime**.
Leggilo solo come riferimento e riproducilo fedelmente con componenti React.

- Sfondo `#07090C`, sezioni alternate `#0B0F14`, superfici `#10151C`, bordi `#1A222C` / `#222B36` / `#3A4554`
- Accento `#C6F432` (testo scuro `#07090C` sopra l'accento); blocchi pieni in accento per servizio più richiesto, riepilogo prezzo e fascia finale
- Testo `#F2F5F7`, secondario `#C9D1DB`, attenuato `#9AA4B2`
- Font: **Anton** (maiuscolo, titoli grandi e numeri) e **Inter** 400–700 per il resto, con `next/font`
- Elementi distintivi da mantenere: barra promo in alto, linee del campo da calcio in sfondo all'hero, card "La scalata" (Div 3 → Div 1 in una notte, ordine reale), striscia numeri (1–2 H, 24 H, 0 €, 10%), hover che solleva le card, FAQ a fisarmonica con "+", fascia finale "Pronto a salire?"
- Sezioni aggiuntive di conversione: nastro inclinato a scorrimento con i vantaggi, grafico "Più sali, più incassi" (barre crescenti Div 10 → Élite, valori indicativi), confronto "Grindarla tu vs farla con noi", pulsante WhatsApp fisso in basso a destra con pulsazione
- Animazioni: card "La scalata" che si illumina e barra di avanzamento; tutto disattivato con `prefers-reduced-motion`
- Ordine delle sezioni (conta per la conversione da mobile): hero → nastro → numeri → **calcolatore** → servizi → "Più sali, più incassi" → confronto → come funziona → sicurezza → console → guide → FAQ → fascia finale
- Prezzo visibile subito: pillola "Boost da 15 € a divisione · settimanali da 25 €" sopra l'H1 e pulsante "Vedi i prezzi · da 15 €"
- Sotto i 720px: barra fissa in basso con il totale del calcolatore e "Ordina su WhatsApp" (il pulsante flottante si nasconde); padding in fondo alla pagina per non coprire il footer
- Misurare: evento analytics su ogni clic WhatsApp (con servizio e totale) per calcolare il tasso di conversione
- Niente recensioni o contatori inventati: aggiungere recensioni vere (Trustpilot/Google) solo quando ci saranno

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Tutte le pagine statiche (SSG), nessun backend
- Deploy su Vercel
- Variabili d'ambiente: `NEXT_PUBLIC_WA_NUMBER` = 393339406945 e `NEXT_PUBLIC_DISCORD_URL`
- Analytics senza cookie (Vercel Analytics o Plausible), così non serve il cookie banner

## Pagine e URL
| URL | Contenuto | Parola chiave principale |
|---|---|---|
| `/` | Home, come nel design | boost division rivals fc 27 |
| `/boost-division-rivals-fc-27` | Salita di divisione + calcolatore preimpostato | boost rivals fc 27 / salire di divisione |
| `/ricompense-settimanali-rivals` | 10 vittorie/settimana, abbonamento mensile | ricompense rivals fc 27 |
| `/coaching-fc-27` | Coaching live su Discord | coaching fc 27 |
| `/guide` + `/guide/[slug]` | Articoli in MDX | vedi sotto |
| `/termini`, `/privacy` | Pagine legali (testo segnaposto da completare) | – |

Guide iniziali (crea i file MDX con struttura H2/H3 e testo segnaposto marcato `TODO`):
1. `come-salire-di-divisione-rivals-fc-27`
2. `ricompense-division-rivals-fc-27-punti`
3. `migliori-moduli-tattiche-rivals-fc-27`

Ogni pagina servizio ha: H1 con la parola chiave, testo di almeno 300 parole, calcolatore, FAQ specifiche e link interni alle altre pagine e alle guide.

## SEO tecnica
- `lang="it"`, `metadataBase`, title e description unici per ogni pagina (title ≤ 60 caratteri, description ≤ 155)
  - Home: "Boost Division Rivals FC 27 in Italia | SaliDivisione"
- Canonical, Open Graph e Twitter card (immagine OG generata con `next/og`)
- `app/sitemap.ts` e `app/robots.ts`
- JSON-LD: `Organization` + `WebSite` in home, `Service` con `Offer` (prezzi in EUR) nelle pagine servizio, `FAQPage` dove ci sono FAQ, `Article` nelle guide, `BreadcrumbList` ovunque
- Un solo H1 per pagina, gerarchia dei titoli corretta, `alt` su tutte le immagini
- Obiettivo Lighthouse ≥ 95 su Performance, SEO e Accessibilità da mobile

## Calcolatore (client component)
Tutta la logica dei prezzi in `lib/pricing.ts`, pura e testata con Vitest.
Divisioni in ordine: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, Élite (indici 0–10).

Principio: **un unico prezzo per vittoria** per fascia di divisione, così i due servizi non si fanno concorrenza
(10 vittorie settimanali fanno salire di 1–2 divisioni: la salita è inclusa perché si paga ogni vittoria).
Prezzo per vittoria: Div 10–7 → 2,50 €; Div 6–4 → 3 €; Div 3–1 → 3,50 €; Élite → 5 €. Media ~6 vittorie per divisione, 8 per 1→Élite.
- **Boost di divisione**: somma dei passaggi da→a. Prezzo per passaggio con indice di partenza i:
  i < 4 → 15 €; i < 7 → 18 €; i < 9 → 21 €; i = 9 (1→Élite) → 28 €. Totale 10→Élite = 184 €.
- **Ricompense settimanali** (10 vittorie, prezzo per divisione in cui gioca): indici 0–3 → 25 €; 4–6 → 30 €; 7–9 → 35 €; Élite → 50 €.
  Da 1 a 4 settimane; con 4 settimane −15%.
- **Coaching**: da 1 a 5 ore → 25, 50, 65, 85, 105 €.
- **Tempi mostrati sotto il prezzo** ("di solito" + "garantito entro"):
  - Boost di divisione: ore stimate = somma per passaggio (indice < 7 → 1 h; < 9 → 1,5 h; 1→Élite → 4 h), arrotondate per eccesso. Garantito entro 24 ore fino a 3 divisioni, 48 ore oltre.
  - Settimanali: di solito 3–4 ore, garantito entro 24 ore e sempre prima del giovedì.
  - Se si supera la scadenza garantita: rimborso del 10% (riportarlo nelle FAQ e nei Termini).
- Extra: Priorità +20%; codice primo ordine PRIMO10 −10% (spuntato di default).
- Arrotondamento a 2 decimali, formato italiano (`Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' })`).
- Il pulsante "Ordina su WhatsApp" apre `https://wa.me/<numero>?text=<messaggio>` con servizio, divisioni, extra, totale e alla fine "ID EA / nickname: " (boost) oppure "Gioco su: " (coaching). Boost e settimanali riportano "PC" nel riepilogo.

## Pagamenti e condizioni (da riportare in tutto il sito)
- Pagamento anticipato al 100%, nessun acconto
- Metodo principale PayPal; alternativa bonifico istantaneo. Niente carta diretta
- Rimborso garantito della parte non completata (divisioni non scalate, settimana sotto i 30 punti)
- Termini: le ricompense settimanali comprendono 10 vittorie; l'eventuale salita di divisione è inclusa nel servizio
- Stream privato della sessione **gratis** e incluso in ogni ordine: mettilo in evidenza (hero, pagine servizio, FAQ)
- Non c'è checkout sul sito: l'ordine parte da WhatsApp e il pagamento si concorda lì

## Lista d'attesa console
- Sezione "Boost per PlayStation e Xbox – in arrivo" (vedi design): scelta console, email, consenso esplicito non preselezionato, link alla Privacy.
- Invio tramite route handler Next.js (`app/api/waitlist/route.ts`) verso Brevo (API contatti, lista "Waitlist console", attributo CONSOLE), chiave in `BREVO_API_KEY`. Validazione lato server, double opt-in, nessun dato in query string.
- Promessa da mantenere: 15% di sconto sul primo ordine console agli iscritti.

## Accessibilità e qualità
- Bottoni e link veri, `label` sui controlli, target ≥ 44px, contrasto AA
- Layout fluido: perfetto da 360px (la maggior parte del traffico arriva da mobile)
- Test end-to-end con Playwright: la home si carica, il calcolatore restituisce 184 € per 10→Élite senza extra e senza sconto, il link WhatsApp contiene il totale
- Footer: disclaimer "non affiliato a Electronic Arts", P.IVA segnaposto, link a Termini e Privacy

## Come lavorare
1. Prima mostrami il piano (struttura cartelle e componenti) e aspetta il mio ok.
2. Poi costruisci una pagina alla volta, partendo dalla home.
3. Alla fine: `npm run build` senza errori, test verdi, e una lista di cosa resta da completare (testi TODO, numero WhatsApp, P.IVA, dominio).

## Da non fare
- Non citare Punti Champions, qualificazione o Weekend League da nessuna parte (testi, guide, metadati, dati strutturati): il servizio riguarda solo Rivals e non deve far pensare che la qualificazione sia inclusa.
