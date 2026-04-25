---
title: "Funcții trigonometrice – sin, cos, tan, cot cu cerc trigonometric"
description: "Cum se calculează sin, cos, tan și cot pentru orice unghi. Valori uzuale, formule fundamentale și cercul trigonometric."
toolSlug: "functii-trigonometrice"
category: "geometrie"
published_at: "2026-04-25T00:00:00.000Z"
refreshed_at: "2026-04-25T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Funcții trigonometrice – sin, cos, tan, cot cu cerc trigonometric"
  "description": "Cum se calculează sin, cos, tan și cot pentru orice unghi. Valori uzuale, formule fundamentale și cercul trigonometric."
  "datePublished": "2026-04-25T00:00:00.000Z"
  "dateModified": "2026-04-25T00:00:00.000Z"
  "inLanguage": "ro"
  "author":
    "@type": "Organization"
    "@id": "https://instrumenteonline.ro/#organization"
    "name": "InstrumenteOnline"
    "url": "https://instrumenteonline.ro"
  "publisher":
    "@type": "Organization"
    "@id": "https://instrumenteonline.ro/#organization"
    "name": "InstrumenteOnline"
    "url": "https://instrumenteonline.ro"
softwareSchema:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "Calculator Funcții Trigonometrice"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Calculator online pentru sin, cos, tan și cot. Acceptă unghiuri în grade sau radiani, afișează cercul trigonometric live cu vector rotitor și proiecții pe axele Ox/Oy."
  "featureList": "sin, cos, tan, cot pentru orice unghi; toggle grade ↔ radiani; cerc trigonometric SVG live; valori uzuale (30°, 45°, 60°, 90°); formule; gratuit."
  "url": "https://instrumenteonline.ro/geometrie/functii-trigonometrice/"
  "inLanguage": "ro"
  "isAccessibleForFree": true
  "offers":
    "@type": "Offer"
    "price": "0"
    "priceCurrency": "RON"
    "availability": "https://schema.org/InStock"
  "publisher":
    "@type": "Organization"
    "name": "InstrumenteOnline"
    "url": "https://instrumenteonline.ro"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Care sunt valorile sin pentru unghiurile uzuale?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "sin 0° = 0, sin 30° = 1/2, sin 45° = √2/2 ≈ 0,707, sin 60° = √3/2 ≈ 0,866, sin 90° = 1, sin 180° = 0, sin 270° = −1, sin 360° = 0."
    - "@type": "Question"
      "name": "De ce tan(90°) este nedefinit?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "tan α = sin α / cos α. La 90° avem cos(90°) = 0, deci ar trebui să împărțim la zero — nedefinit. Funcția tan are o asimptotă verticală la 90° + k·180°."
    - "@type": "Question"
      "name": "Care e formula fundamentală a trigonometriei?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "sin² α + cos² α = 1, valabilă pentru orice unghi α. Provine direct din Pitagora aplicat în cercul de rază 1."
    - "@type": "Question"
      "name": "Ce este cercul trigonometric?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Este cercul de rază 1 centrat în origine. Pentru un unghi α măsurat de la axa Ox (sens trigonometric), punctul de pe cerc are coordonatele (cos α, sin α)."
    - "@type": "Question"
      "name": "Cum convertesc grade în radiani?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Înmulțești cu π/180. Exemplu: 60° × π/180 = π/3 rad ≈ 1,047 rad. Invers: rad × 180/π pentru grade."
    - "@type": "Question"
      "name": "Care sunt formulele duplului unghi?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "sin(2α) = 2 sin α cos α; cos(2α) = cos²α − sin²α = 2cos²α − 1 = 1 − 2sin²α; tan(2α) = 2 tan α / (1 − tan²α)."
---

Funcțiile trigonometrice — **sinus** (sin), **cosinus** (cos), **tangentă** (tan) și **cotangentă** (cot) — sunt instrumentele de bază ale trigonometriei. Inițial definite ca rapoarte între laturile unui triunghi dreptunghic, ele au fost extinse la orice unghi prin **cercul trigonometric**.

## Definițiile în triunghiul dreptunghic

Pentru un unghi ascuțit α într-un triunghi dreptunghic:

$$
\sin \alpha = \frac{\text{cateta opusă}}{\text{ipotenuză}}, \quad \cos \alpha = \frac{\text{cateta alăturată}}{\text{ipotenuză}}
$$

$$
\tan \alpha = \frac{\sin \alpha}{\cos \alpha} = \frac{\text{cateta opusă}}{\text{cateta alăturată}}, \quad \cot \alpha = \frac{1}{\tan \alpha}
$$

## Cercul trigonometric

Cercul de rază 1 centrat în origine permite extinderea funcțiilor la orice α (negativ, peste 90°, peste 360°). Pentru un punct P pe cerc la unghi α față de Ox:

$$
P = (\cos \alpha, \sin \alpha)
$$

Sin este **proiecția pe Oy**, cos este **proiecția pe Ox**.

## Tabelul valorilor uzuale

Aceste valori sunt **obligatorii** la bacalaureat:

| Unghi | 0° | 30° | 45° | 60° | 90° | 180° | 270° | 360° |
|---|---|---|---|---|---|---|---|---|
| Radiani | 0 | π/6 | π/4 | π/3 | π/2 | π | 3π/2 | 2π |
| sin | 0 | 1/2 | √2/2 | √3/2 | 1 | 0 | −1 | 0 |
| cos | 1 | √3/2 | √2/2 | 1/2 | 0 | −1 | 0 | 1 |
| tan | 0 | √3/3 | 1 | √3 | ∞ | 0 | ∞ | 0 |

## Formula fundamentală

Cea mai importantă identitate trigonometrică:

$$
\sin^2 \alpha + \cos^2 \alpha = 1
$$

Provine direct din teorema lui Pitagora aplicată în cercul de rază 1: triunghiul format din rază, proiecție pe Ox și proiecție pe Oy are catetele cos α, sin α și ipotenuza 1.

## Periodicitatea

Funcțiile trigonometrice sunt periodice:

$$
\sin(\alpha + 2\pi) = \sin \alpha, \quad \cos(\alpha + 2\pi) = \cos \alpha
$$

$$
\tan(\alpha + \pi) = \tan \alpha, \quad \cot(\alpha + \pi) = \cot \alpha
$$

Sin și cos au perioada **2π** (un cerc complet), iar tan și cot au perioada **π** (jumătate de cerc).

## Formulele sumelor

Foarte utile la bacalaureat și la rezolvarea ecuațiilor trigonometrice:

$$
\sin(\alpha \pm \beta) = \sin \alpha \cos \beta \pm \cos \alpha \sin \beta
$$

$$
\cos(\alpha \pm \beta) = \cos \alpha \cos \beta \mp \sin \alpha \sin \beta
$$

## Formulele duplului unghi

$$
\sin(2\alpha) = 2 \sin \alpha \cos \alpha
$$

$$
\cos(2\alpha) = \cos^2 \alpha - \sin^2 \alpha = 2\cos^2 \alpha - 1 = 1 - 2\sin^2 \alpha
$$

## Funcții inverse: arcsin, arccos, arctan

Pentru a găsi unghiul când cunoști valoarea funcției:

$$
\alpha = \arcsin(x), \quad \alpha = \arccos(x), \quad \alpha = \arctan(x)
$$

Domeniile de definiție: arcsin și arccos acceptă x ∈ [−1, 1]; arctan acceptă orice x real.

## Exemplu rezolvat: ecuație trigonometrică

**Rezolvă** sin x = √3/2.

Din tabel, sin 60° = √3/2. Soluțiile generale:

$$
x = 60° + k \cdot 360° \quad \text{sau} \quad x = 120° + k \cdot 360°, \quad k \in \mathbb{Z}
$$

A doua soluție vine din simetria sin(180° − α) = sin α: sin 120° = sin 60°.

## Aplicații în fizică și inginerie

- **Mișcare oscilatorie armonică:** x(t) = A · sin(ωt + φ)
- **Unde sonore și electromagnetice:** ψ(x, t) = A · cos(kx − ωt)
- **Curent alternativ:** i(t) = I_max · sin(2πft)
- **Animații grafice 2D/3D:** rotații, transformări, navigație jocuri video

## Greșeli frecvente

1. **Calculator în mod greșit (deg vs rad)** — verifică *mereu* indicatorul DEG/RAD înainte de a calcula.
2. **sin² α scris ca sin(α²)** — sin² α înseamnă (sin α)² = sin α · sin α.
3. **arcsin(2) = ?** — domeniul lui arcsin este [−1, 1]. arcsin(2) NU există în reali.
4. **Periodicitatea greșită** — tan și cot au perioada π (NU 2π).

## Calculatoare conexe

- [Triunghi dreptunghic](/geometrie/triunghi-dreptunghic/)
- [Convertor radiani-grade](/geometrie/radiani-grade/)
- [Calculator cerc](/geometrie/cerc-calculator/)
- [Calculator dreptunghi](/geometrie/dreptunghi-calculator/)
