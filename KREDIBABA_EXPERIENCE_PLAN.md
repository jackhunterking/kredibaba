# Kredibaba Turkish Mortgage Experience Plan

## Summary

- Use MyPerch as the structural North Star: Solutions, Tools, Learn, About, signup flow, calculators, FAQs, buyer/owner journeys.
- Use original Turkish copy with a bank/financial-institution feel for Turkish-speaking Canadians.
- Hide `Giriş` and public dashboard access in MVP; keep direct WhatsApp contact as the main CTA until real auth is intentionally reintroduced later.
- Keep this file as the living source of truth for product, content, compliance, and design decisions.

## Key Changes

- **Information Architecture:** `Çözümler`, `Araçlar`, `Öğren`, `Hakkımızda`, `İletişim`, plus primary CTA `WhatsApp’tan Yazın`.
- **Solutions Menu:** keep MyPerch-like grouping, but with original Turkish logic: `Kime yardım ediyoruz?` for personas and `Ne konuda yardım ediyoruz?` for financing intents.
- **Homepage Flow:** rate-first hero, trust row, intent-based journey cards, persona section, tools preview, Learn preview, and final compliance CTA.
- **Rates:** maintain approved hero rates through `HERO_RATES`; if a second approved rate is not available, show `Güncelleniyor` instead of inventing a number.
- **Tone:** formal/institutional Turkish, but plain and understandable; first mention terms as `mortgage (konut kredisi)`, `broker (mortgage aracısı)`, `lender (kredi veren kurum)`.
- **Public Framing:** avoid side-by-side marketplace language; describe the experience as seeing, understanding, reviewing, and finding a suitable path.

## Lean Journey Rules

- Reduce text-to-pixel ratio: each section should have one headline, one short helper sentence at most, and graphic/card-based choices.
- Lead with user journeys based on why financing is needed: `Ev almak istiyorum`, `Ev kredimi yenilemek`, `Tadilat için finansman arıyorum`, `Borç ödemelerimi rahatlatmak istiyorum`.
- Keep personas separate from journeys: `İlk ev alıcıları`, `Ev sahipleri`, `Ev sahipleri / yatırımcılar`, `Şirket sahibi / serbest meslek`, `Kanada’ya yeni gelenler`.
- Treat `Ön onay` as a supporting tool/step across journeys, not as a standalone solution intent.
- Use visual orientation patterns: journey cards, step rails, compact rate cards, calculator previews, icons, progress/status chips.
- Make every section answer “What do I do next?” with one primary action and no competing long paragraphs.
- Keep compliance copy visible but compact: disclosures live near rates, calculator results, and footer instead of dominating the main journey.

## Homepage Rate Hero

- Headline: `Kanada’da Bugünün En Düşük Mortgage Oranları`
- Do not show a hero subline; keep the visible copy to headline, two compact rates, CTA, and disclosure link.
- Use a Perch-like structure: headline above, rate card with rates/CTA/disclosure on the left, professional home image on the right.
- Show two compact rate tiles from `HERO_RATES` with only `term` and `rate`; if a second approved rate is unavailable, show `Güncelleniyor`.
- Keep hero typography restrained: headline maxes out below oversized marketing-display scale, rate values are capped, and long status labels like `Güncelleniyor` must never overlap or clip at tablet widths.
- Primary CTA inside the rate card: `Oranları Gör`.
- Secondary disclosure action inside the rate card: subtle text link `Açıklama`, opening a short disclosure modal.
- Keep product type, updated date, qualification notes, and legal conditions out of the visible hero; disclosure modal must say rates are examples only, not guaranteed, approval depends on file/lender conditions, Kredibaba operates through `RMA Mortgage`, and borrower fees are disclosed before commitment.

## Journey And Persona Rules

- **Journeys = why they need the product**
  - `Ev almak istiyorum`
  - `Ev kredimi yenilemek`
  - `Tadilat için finansman arıyorum`
  - `Borç ödemelerimi rahatlatmak istiyorum`
- **Personas = who they are**
  - `İlk ev alıcıları`
  - `Ev sahipleri`
  - `Ev sahipleri / yatırımcılar`
  - `Şirket sahibi / serbest meslek`
  - `Kanada’ya yeni gelenler`
- **Tools/steps = what supports journeys**
  - `Ön onay`
  - `Mortgage hesaplayıcı`
  - `Uygunluk hesaplayıcı`
  - `Kapanış masrafı`
  - `Tapu devir vergisi`
  - `Ödeme farkı hesaplayıcı`

## Mega Menu Structure

- **Top Promo Bar:** `🔎 Ücretsiz mortgage hesaplaması` plus CTA `WhatsApp’tan yazın`.
- **Desktop Navigation:** `Çözümler` and `Araçlar` open hover/click mega panels; `Öğren` and `Hakkımızda` remain direct links.
- **Mobile Navigation:** logo, `WhatsApp’tan Yazın`, and `Menü ☰`; open state becomes `Menü ×`.
- **Mobile Drawer:** grouped rows for `Çözümler`, `Araçlar`, `Öğren`, and `Hakkımızda`; expanded lists use short Turkish labels, one-line descriptions, and Kredibaba blue accent bars.
- **Solutions Grouping:** `Kime yardım ediyoruz?` covers audience types; `Ne konuda yardım ediyoruz?` covers mortgage journey tasks.
- **Solution Intents:** use `Ev almak`, `Ev kredimi yenilemek`, `Tadilat finansmanı`, `Borç ödemelerini rahatlatmak`, `Ev değerinden yararlanmak`, and `Mortgage seçeneklerini incelemek`.
- **Tools Grouping:** calculators and decision tools stay in one clear grid, with page anchors such as `/araclar#mortgage-hesaplayici` and `/araclar#on-onay`.
- **Pre-Approval Placement:** never list `Ön onay` under `Çözümler`; it belongs under `Araçlar`.
- **Dropdown Spacing:** desktop mega menus need at least `S[64]` bottom padding; mobile drawers need equal top rhythm plus extra bottom clearance after expanded lists so final rows never touch the viewport edge.
- **No Marketplace Copy:** route labels, cards, modal text, glossary entries, CTAs, and compliance copy should use `gör`, `incele`, `bul`, and `netleştir` language.

## Brand Guardrails

- Perch is a structure reference only; do not copy Perch’s mint/green visual identity.
- Use Kredibaba’s own bank-style palette from `src/theme.jsx`: navy, blue, white, light blue, and soft gray.
- Menu panels, drawer accordions, cards, CTAs, forms, disclosures, and footer elements should use shared tokens such as `C.navy`, `C.blue`, `C.blueFaint`, `C.surface`, `C.border`, `C.body`, and `C.muted`.
- Keep green/amber only for semantic status cues such as rate badges, savings/status indicators, or warnings; keep WhatsApp green only for WhatsApp actions.
- Avoid adding new hardcoded brand colors unless a new token is approved and documented in `src/theme.jsx`.

## Design System Rules

- Use shared `R`, `S`, and `SHADOW` tokens from `src/theme.jsx` for radius, spacing, and depth.
- Approved radii are `R.control`, `R.chip`, `R.icon`, `R.card`, `R.panel`, `R.media`, and `R.circle`.
- Do not use pill-style `999px` radius in normal UI; `R.circle` is only for avatars and small status dots.
- Mobile drawer rows, menu items, buttons, cards, modal options, chips, and badges should use rectangular institutional corners.
- Page sections should use tokenized vertical spacing and visually balanced top/bottom padding.
- QA every design-system change on `/`, `/cozumler`, `/araclar`, `/oranlar`, `/ogren`, `/hakkimizda`, `/iletisim`, both desktop and mobile, plus desktop/mobile menus and WhatsApp CTA links.

## Compliance Rules

- Display RMA Mortgage authorized brokerage identity and FSRA licence details prominently before launch.
- Follow FSRA public advertising/disclosure guidance: no misleading claims, no guaranteed approval/rates, clear brokerage role, clear plain-language disclosures.
- “Best rate” feeling should use compliant language: `bugünün oranlarını görün`, `size uygun yolu bulun`, `bugünün en düşük oranı`; avoid approval or rate guarantees.
- Include lender-paid compensation/fee disclosure in simple Turkish, and note any borrower fees are disclosed before commitment.
- References: [FSRA advertising requirements](https://www.fsrao.ca/industry/mortgage-brokering/compliance-and-other-resources/mortgage-industry-public-relations-and-advertising-requirements), [FSRA disclosure requirements](https://www.fsrao.ca/industry/mortgage-brokering/compliance-and-other-resources/mortgage-brokerage-disclosure-requirements).

## Test Plan

- Verify all navigation labels and CTAs are Turkish-first and MyPerch-like in structure.
- Check mobile layout for menus, calculators, CTA visibility, and disclosure readability.
- Run `npm run build`.
- Review all rate language for date, conditions, and non-guarantee disclosure.
- Desktop audit: `/`, `/cozumler`, `/araclar`, `/oranlar`, `/ogren`, `/hakkimizda`, plus `Çözümler` and `Araçlar` mega menus.
- Mobile audit: homepage, drawer, expanded `Çözümler`, expanded `Araçlar`, final drawer item spacing, hero disclosure modal, contact page, and WhatsApp CTA links.
- Confirm `Ön onay` appears under tools and never as a standalone solution intent.
- Require final legal/compliance review by RMA/Principal Broker before public launch.

## Assumptions

- RMA Mortgage is the brokerage identity to use, but exact authorized name/licence number remain launch-blocking required fields.
- Real login/auth is a later phase; MVP lead capture is direct WhatsApp messaging handled manually through WhatsApp Business App.
- MyPerch is a structural inspiration only; all Kredibaba copy/design is original and Turkish-community specific.
