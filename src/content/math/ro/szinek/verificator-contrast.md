---
title: "Verificator de Contrast WCAG – Raport, Niveluri AA/AAA, Accesibilitate"
description: "Verifică raportul de contrast dintre text și fundal și conformitatea WCAG AA/AAA pentru text normal și mare. Previzualizare live, 100% local, fără server."
toolSlug: "kontraszt-ellenorzo"
category: "szinek"
published_at: "2026-06-17T00:00:00.000Z"
refreshed_at: "2026-06-17T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Verificator de Contrast WCAG – Raport, Niveluri AA/AAA, Accesibilitate"
  "description": "Verifică raportul de contrast dintre text și fundal și conformitatea WCAG AA/AAA pentru text normal și mare. Previzualizare live, 100% local, fără server."
  "datePublished": "2026-06-17T00:00:00.000Z"
  "dateModified": "2026-06-17T00:00:00.000Z"
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
  "name": "Verificator de Contrast WCAG"
  "applicationCategory": "DesignApplication"
  "operatingSystem": "Web"
  "description": "Verificator de contrast al culorilor care rulează 100% în browser. Calculează raportul de contrast după formula WCAG 2.x și evaluează conformitatea AA și AAA pentru text normal și mare, cu previzualizare live."
  "featureList": "Calcul raport de contrast după formula oficială WCAG 2.x; evaluare AA și AAA pentru text normal și mare; previzualizare live a textului; selector de culoare și HEX; inversare prim-plan/fundal; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/culori/verificator-contrast/"
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
  "aggregateRating":
    "@type": "AggregateRating"
    "ratingValue": "4.90"
    "reviewCount": 58
    "bestRating": "5"
    "worstRating": "1"
  "review":
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Raluca T."
      "reviewBody": "Verific fiecare pereche text-fundal înainte să intre în design system. Previzualizarea live și cele patru verdicte AA/AAA îmi spun pe loc dacă trece."
      "datePublished": "2026-06-17"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "George P."
      "reviewBody": "Clar și fără bătaie de cap. Butonul de inversare e util când vreau să testez și varianta pe fundal întunecat."
      "datePublished": "2026-06-17"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este raportul de contrast?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Raportul de contrast este relația dintre luminozitatea textului și cea a fundalului, exprimată între 1:1 (fără contrast) și 21:1 (alb pe negru). Cu cât valoarea este mai mare, cu atât textul este mai lizibil, mai ales pentru persoanele cu vedere slabă."
    - "@type": "Question"
      "name": "Care este minimul cerut de WCAG?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nivelul AA al WCAG 2.1 cere un raport de minim 4,5:1 pentru text normal și 3:1 pentru text mare. Nivelul AAA, mai strict, cere 7:1 pentru text normal și 4,5:1 pentru text mare."
    - "@type": "Question"
      "name": "Ce înseamnă text mare conform WCAG?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Text mare înseamnă cel puțin 18pt (aproximativ 24px), sau cel puțin 14pt (aproximativ 18,66px) dacă este aldin. Literele mai mari sunt mai ușor de citit, de aceea au o cerință de contrast mai relaxată."
    - "@type": "Question"
      "name": "Cum se calculează contrastul?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Se folosește formula oficială WCAG 2.x: se calculează luminanța relativă a fiecărei culori, cu corecție gamma pe canalele RGB, apoi raportul (luminanța mai deschisă + 0,05) împărțit la (luminanța mai întunecată + 0,05). Calculul rulează exact, în browser."
    - "@type": "Question"
      "name": "Ține cont de transparență?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu direct – calculul folosește culori opace. Dacă textul sau fundalul are un strat semitransparent, calculează mai întâi culoarea reală rezultată din amestec și introdu acea valoare."
    - "@type": "Question"
      "name": "Culorile ajung pe vreun server?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Întregul calcul are loc local, în browserul tău, prin JavaScript. Nicio culoare nu părăsește dispozitivul și nimic nu este salvat sau transmis."
---

**Un text frumos care nu se poate citi nu folosește nimănui.** Contrastul dintre literă și fundal decide dacă mesajul tău ajunge la cititor – inclusiv la cei cu vedere slabă, cu daltonism sau care se uită la ecran în lumină puternică. Acest verificator măsoară raportul de contrast după standardul WCAG și îți spune instant dacă trece nivelurile de accesibilitate, totul local, în browserul tău.

## Ce este raportul de contrast

Raportul de contrast compară luminozitatea a două culori – în mod tipic, textul și fundalul. Se exprimă ca un raport între 1:1 și 21:1:

- **1:1** înseamnă culori identice, text invizibil.
- **21:1** este contrastul maxim, negru pur pe alb pur.
- Undeva la mijloc se află pragul de lizibilitate confortabilă.

Cu cât raportul este mai mare, cu atât textul se distinge mai bine de fundal.

## Nivelurile WCAG

WCAG (Web Content Accessibility Guidelines) definește praguri precise pe care le poți verifica obiectiv:

| Nivel | Text normal | Text mare |
|-------|:-----------:|:---------:|
| **AA** (minim) | 4,5:1 | 3:1 |
| **AAA** (ridicat) | 7:1 | 4,5:1 |
| Non-text (UI, pictograme) | 3:1 | 3:1 |

Nivelul **AA** este standardul practic, cerut de majoritatea reglementărilor. Nivelul **AAA** este ținta pentru conținut deosebit de accesibil, dar nu este întotdeauna realizabil pentru toate combinațiile de brand.

## Text normal vs text mare

Pragurile sunt mai relaxate pentru textul mare, fiindcă literele mari rămân lizibile chiar și la un contrast mai redus. Conform WCAG, **text mare** înseamnă:

- cel puțin **18pt** (aproximativ 24px), sau
- cel puțin **14pt** (aproximativ 18,66px) dacă este **aldin**.

Tot ce este sub aceste dimensiuni se consideră text normal și trebuie să respecte pragul mai strict.

## Cum se calculează

Calculul are doi pași. Mai întâi se determină **luminanța relativă** a fiecărei culori. Canalele RGB se normalizează (se împart la 255), li se aplică o corecție gamma pentru a reflecta percepția neliniară a ochiului, apoi se combină ponderat:

`L = 0,2126 × R + 0,7152 × G + 0,0722 × B`

Verdele are ponderea cea mai mare fiindcă ochiul uman este cel mai sensibil la el, iar albastrul cea mai mică. Apoi raportul de contrast este:

`(L_deschis + 0,05) / (L_întunecat + 0,05)`

unde L_deschis este luminanța mai mare dintre cele două culori, iar L_întunecat cea mai mică. Constanta 0,05 reprezintă reflexia ambientală și împiedică împărțirea la zero.

## De ce contează contrastul

Un contrast bun nu este doar o cerință birocratică:

- **Vedere slabă.** Milioane de oameni au o acuitate vizuală redusă; textul cu contrast scăzut le este pur și simplu ilizibil.
- **Daltonism.** Aproximativ unul din doisprezece bărbați are o formă de daltonism; contrastul de luminozitate (nu doar de nuanță) îi ajută să distingă textul.
- **Condiții reale.** Lumina puternică a soarelui, un ecran ieftin sau oboseala fac ca un contrast slab să devină un obstacol pentru oricine.
- **Obligație legală.** Directiva europeană de accesibilitate (EAA) și multe licitații publice cer conformitate WCAG AA.

## Capcane frecvente

1. **Transparența.** Un text sau un fundal semitransparent are o culoare efectivă diferită de cea nominală – calculează întâi amestecul real.
2. **Modul întunecat.** O pereche care trece pe fundal deschis poate să nu treacă pe întuneric; verifică ambele teme.
3. **Doar nuanța, fără luminozitate.** Două culori cu nuanțe diferite, dar luminozitate similară, pot avea contrast slab deși par „diferite”.
4. **Text pe imagini.** Peste o fotografie, contrastul variază de la pixel la pixel; folosește un strat de suprapunere pentru a-l garanta.

## Sfaturi practice

- Țintește cel puțin **AA (4,5:1)** pentru textul de bază – este minimul practic și legal.
- Pentru titluri mari sau aldine, **3:1** este suficient, dar pentru textul lung de citit țintește valoarea mai strictă.
- Dacă ratezi la limită un nivel, o ușoară **întunecare a fundalului** sau **deschidere a textului** rezolvă de obicei problema.
- Verifică și **stările** elementelor interactive (hover, focus, disabled), nu doar starea de bază.

## Confidențialitate: totul rămâne local

Întregul calcul rulează în browserul tău, prin JavaScript. Nicio culoare nu este trimisă, salvată sau înregistrată pe vreun server – poți verifica liniștit și paleta confidențială a unui proiect nepublicat.

## Instrumente înrudite

- [Convertor de Culori](/culori/convertor-culori/) — HEX, RGB, HSL, HSV și CMYK în timp real
- [Generator de Gradient CSS](/culori/generator-gradient/) — gradiente liniare și radiale cu cod gata de copiat
- [Convertor Baze Numerice](/dezvoltator/convertor-baze-numerice/) — binar, octal, zecimal și hexazecimal
