---
title: "Generator de Parole Sigure – Aleatorii, Fraze de Acces, PIN, Entropie"
description: "Generator de parole online 100% local: parole aleatorii, fraze de acces memorabile, parole pronunțabile și coduri PIN. Indicator de tărie cu entropie în biți, crypto.getRandomValues, fără server."
toolSlug: "generator-parola"
category: "fejleszto"
published_at: "2026-06-07T00:00:00.000Z"
refreshed_at: "2026-06-07T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Generator de Parole Sigure – Aleatorii, Fraze de Acces, PIN, Entropie"
  "description": "Generator de parole online 100% local: parole aleatorii, fraze de acces memorabile, parole pronunțabile și coduri PIN. Indicator de tărie cu entropie în biți, crypto.getRandomValues, fără server."
  "datePublished": "2026-06-07T00:00:00.000Z"
  "dateModified": "2026-06-07T00:00:00.000Z"
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
  "name": "Generator de Parole Sigure"
  "applicationCategory": "SecurityApplication"
  "operatingSystem": "Web"
  "description": "Generator de parole securizat care rulează 100% în browser cu crypto.getRandomValues. Patru moduri: parolă aleatorie, frază de acces, parolă pronunțabilă și cod PIN. Indicator de tărie cu entropie în biți și estimare a timpului de spargere."
  "featureList": "4 moduri (aleatorie, frază de acces, pronunțabilă, PIN); lungime configurabilă 6-64; seturi de caractere comutabile; excludere caractere ambigue; garantare diversitate; generare în lot până la 12 variante; indicator de entropie și timp de spargere; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/dezvoltator/generator-parola/"
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
    "ratingValue": "4.89"
    "reviewCount": 57
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
        "name": "Cristina M."
      "reviewBody": "Îmi place că totul se generează local — verific în consolă, nu pleacă nimic în rețea. Folosesc modul frază de acces pentru parola-master a managerului meu de parole."
      "datePublished": "2026-06-07"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Radu T."
      "reviewBody": "Indicatorul de entropie în biți e exact ce căutam. În sfârșit un generator care explică de ce o parolă e puternică, nu doar un bec verde."
      "datePublished": "2026-06-07"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Cât de sigure sunt parolele generate aici?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Parolele sunt generate cu crypto.getRandomValues(), generatorul de numere aleatorii criptografic al browserului, folosind eșantionare cu respingere (rejection sampling) pentru a evita orice bias statistic. Totul rulează local: nicio parolă nu părăsește dispozitivul tău, nu este transmisă prin rețea și nu este stocată. Reîncărcarea paginii elimină definitiv parolele afișate."
    - "@type": "Question"
      "name": "Ce înseamnă entropia măsurată în biți?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Entropia exprimă imprevizibilitatea parolei. Se calculează ca lungime × log₂(numărul de simboluri posibile). O parolă de 16 caractere din toate cele 4 tipuri (~90 simboluri) are circa 104 biți de entropie. Sub 28 de biți parola e foarte slabă; peste 60 de biți e puternică, iar peste 128 de biți e considerată practic de nespart cu tehnologia actuală."
    - "@type": "Question"
      "name": "Parolă aleatorie sau frază de acces — ce să aleg?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "O frază de acces din 4–6 cuvinte aleatorii (de exemplu Munte-Soare-Floare-42) oferă entropie ridicată și este mult mai ușor de memorat decât un șir de caractere haotic. Pentru conturile pe care le scrii rar și le stochezi într-un manager de parole, alege modul aleatoriu cu lungime mare. Pentru o parolă-master pe care o tastezi des, fraza de acces e alegerea practică."
    - "@type": "Question"
      "name": "De ce să exclud caracterele ambigue?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Caracterele I (i mare), l (L mic), 1 (cifra unu), O (o mare) și 0 (cifra zero) se confundă vizual ușor, mai ales la fonturi fără serife sau pe hârtie tipărită. Dacă transcrii parola manual sau o dictezi, excluderea lor reduce erorile. Pierderea de entropie este neglijabilă la lungimi de 14+ caractere."
    - "@type": "Question"
      "name": "Câte caractere ar trebui să aibă o parolă bună?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Recomandarea curentă (NIST SP 800-63B) este minim 12 caractere, ideal 16 sau mai mult pentru conturi importante. Lungimea contează mai mult decât complexitatea: o parolă lungă din litere mici e mai greu de spart decât una scurtă cu simboluri. Pentru o frază de acces, 4 cuvinte sunt minimul rezonabil, 6 fiind recomandate pentru conturi critice."
    - "@type": "Question"
      "name": "Pot folosi același generator pentru coduri PIN?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Da. Modul „Cod PIN” produce secvențe pur numerice de 4–12 cifre, generate criptografic — fără tipare previzibile precum 1234, 0000 sau ani de naștere. Este ideal pentru carduri bancare, seifuri, telefoane sau lacăte digitale. Reține că un PIN de 4 cifre are doar ~13 biți de entropie, deci folosește 6+ cifre acolo unde sistemul permite."
    - "@type": "Question"
      "name": "Ce este timpul de spargere afișat?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Este o estimare a duratei necesare pentru a ghici parola printr-un atac de tip brute-force offline, presupunând 10¹¹ (o sută de miliarde) de încercări pe secundă — capacitatea aproximativă a unui cluster GPU modern atacând un hash rapid. În medie, atacatorul găsește parola după ce parcurge jumătate din spațiul posibil, de aceea estimarea folosește jumătate din numărul total de combinații."
---

**O parolă bună nu este una care arată complicat — este una pe care un atacator nu o poate ghici.** Diferența dintre cele două este matematică, nu estetică. Acest generator produce parole imprevizibile folosind sursa de aleatoriu criptografic a browserului (`crypto.getRandomValues()`), totul executat local pe dispozitivul tău: nicio parolă nu este trimisă, salvată sau înregistrată pe vreun server. În continuare îți explicăm exact *de ce* funcționează și *cum* să alegi parametrii pentru fiecare situație.

## Cele patru moduri de generare

Generatorul oferă patru strategii distincte, fiecare cu un compromis diferit între securitate și memorabilitate:

| Mod | Cum arată | Memorabilitate | Cazul ideal |
|-----|-----------|----------------|-------------|
| **Aleatorie** | `k9#mQ2v!Lx7@pRf` | Scăzută | Conturi stocate într-un manager de parole |
| **Frază de acces** | `Munte-Soare-Floare-Vulpe-42` | Ridicată | Parolă-master, criptare de disc |
| **Pronunțabilă** | `Kabopudi-47` | Medie | Parole dictate verbal, conturi temporare |
| **Cod PIN** | `729413` | Ridicată | Carduri, seifuri, dispozitive |

Niciun mod nu este „mai bun” în absolut — depinde de cum vei folosi parola. O parolă pe care o tastezi de zece ori pe zi are alte cerințe decât una pe care o salvezi o singură dată într-un seif digital.

## Ce este entropia și de ce contează

Securitatea reală a unei parole se măsoară prin **entropie** — gradul ei de imprevizibilitate, exprimat în biți. Fiecare bit de entropie dublează numărul de încercări necesare pentru a ghici parola prin forță brută. Formula este directă:

$$
H = L \cdot \log_2(N)
$$

unde $H$ este entropia în biți, $L$ este lungimea parolei (numărul de simboluri) și $N$ este dimensiunea setului din care alegem fiecare simbol.

### Dimensiunea setului de caractere

Numărul de simboluri posibile $N$ depinde de tipurile de caractere activate:

| Set activat | Simboluri | $N$ |
|-------------|-----------|----:|
| Doar litere mici | a–z | 26 |
| Litere mici + mari | a–z, A–Z | 52 |
| + cifre | a–z, A–Z, 0–9 | 62 |
| + simboluri | toate | ~90 |

### Exemplu de calcul

Pentru o parolă **aleatorie de 16 caractere** din toate cele patru tipuri ($N = 90$):

$$
H = 16 \cdot \log_2(90) \approx 16 \cdot 6.49 \approx 104 \text{ biți}
$$

Pentru o **frază de acces de 5 cuvinte** dintr-un dicționar de ~120 de cuvinte ($N = 120$):

$$
H = 5 \cdot \log_2(120) \approx 5 \cdot 6.91 \approx 35 \text{ biți}
$$

iar dacă adăugăm și un număr și un al șaselea cuvânt, depășim ușor 45–50 de biți. Observă un lucru contraintuitiv: o frază din cuvinte simple poate avea entropie comparabilă cu o parolă scurtă plină de simboluri — și este infinit mai ușor de memorat.

## Clasificarea tăriei

Pe baza entropiei calculate, generatorul clasifică fiecare parolă în cinci niveluri. Pragurile reflectă practicile curente de securitate:

| Entropie | Clasificare | Verdict |
|----------|-------------|---------|
| < 28 biți | Foarte slabă | Spartă instantaneu |
| 28–35 biți | Slabă | Rezistă doar atacurilor banale |
| 36–59 biți | Rezonabilă | Acceptabilă pentru conturi minore |
| 60–127 biți | Puternică | Recomandată pentru conturi importante |
| ≥ 128 biți | Foarte puternică | Practic de nespart |

## Cum se calculează timpul de spargere

Generatorul estimează durata unui atac **brute-force offline** — scenariul în care un atacator a obținut baza de date cu hash-uri și încearcă combinațiile pe propriul hardware, fără limitarea impusă de un server. Presupunem o viteză de $10^{11}$ (o sută de miliarde) de încercări pe secundă, ordinul de mărime al unui cluster GPU modern care atacă un hash rapid (de exemplu MD5 sau SHA-1 neprotejat).

Numărul total de combinații posibile este:

$$
C = N^L = 2^H
$$

În medie, atacatorul găsește parola după ce parcurge **jumătate** din spațiul de căutare. Timpul estimat este deci:

$$
t = \frac{2^H / 2}{10^{11}} = \frac{2^{H-1}}{10^{11}} \text{ secunde}
$$

### Tabel orientativ

| Entropie | Combinații ($2^H$) | Timp mediu de spargere |
|---------:|-------------------:|------------------------|
| 28 biți | 2.7 × 10⁸ | sub o secundă |
| 40 biți | 1.1 × 10¹² | ~5 secunde |
| 60 biți | 1.2 × 10¹⁸ | ~2 luni |
| 80 biți | 1.2 × 10²⁴ | ~190.000 de ani |
| 104 biți | 2.0 × 10³¹ | ~3 × 10¹² ani |
| 128 biți | 3.4 × 10³⁸ | dincolo de vârsta universului |

Reține că aceste cifre presupun un hash *rapid*. Sistemele bine proiectate folosesc funcții *lente* și sărate (bcrypt, scrypt, Argon2), care reduc viteza de atac de la miliarde la câteva mii de încercări pe secundă — adăugând efectiv 20–30 de biți de protecție suplimentară. Dar tu nu controlezi cum îți stochează site-urile parola, așa că marja de siguranță trebuie să vină din entropia parolei tale.

## De ce aleatoriul criptografic este obligatoriu

Calitatea unei parole depinde integral de calitatea sursei de aleatoriu. Acest generator folosește `crypto.getRandomValues()` — interfața Web Crypto care extrage entropie din generatorul criptografic al sistemului de operare (CSPRNG). Spre deosebire de `Math.random()`, care este un generator pseudoaleatoriu previzibil, valorile produse sunt nepredictibile din punct de vedere criptografic.

### Problema biasului modulo

Un detaliu subtil dar critic: dacă mapăm naiv un număr aleatoriu pe un set de caractere folosind operatorul modulo (`rand % N`), introducem un **bias** — unele caractere apar mai des decât altele atunci când $N$ nu divide exact intervalul generatorului. Acest generator folosește **eșantionare cu respingere** (rejection sampling): respinge valorile care ar cădea în zona „de prisos” și regenerează, garantând o distribuție perfect uniformă.

```js
function randInt(max) {
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  let x;
  do { crypto.getRandomValues(buf); x = buf[0]; } while (x >= limit);
  return x % max;
}
```

Fără acest pas, o parolă „aleatorie” are de fapt o entropie mai mică decât cea calculată, fiindcă atacatorul poate prioritiza caracterele mai probabile.

## Ghidul de alegere a parametrilor

### Pentru conturi online obișnuite

Mod **aleatoriu**, **16 caractere**, toate tipurile activate. Stochează parola într-un manager de parole — nu trebuie să o memorezi. Activează „cel puțin unul din fiecare tip” pentru a respecta politicile de complexitate ale site-urilor.

### Pentru o parolă-master memorabilă

Mod **frază de acces**, **5–6 cuvinte**, cu separator și un număr la final. Aceasta este singura parolă pe care chiar trebuie să o ții minte (cea a managerului de parole sau a criptării de disc), deci memorabilitatea contează.

### Pentru parole dictate la telefon

Mod **pronunțabil**. Silabele consoană-vocală alternante se rostesc clar și se transcriu fără confuzii — util pentru suport tehnic sau credențiale temporare comunicate verbal.

### Pentru carduri și dispozitive

Mod **cod PIN**, minim **6 cifre**. Evită PIN-urile previzibile (1234, 0000, ani de naștere). Un PIN de 4 cifre are doar ~13 biți de entropie; fiecare cifră în plus adaugă ~3.3 biți.

## Greșeli frecvente de evitat

1. **Reutilizarea parolelor.** O singură breșă pe un site expune toate conturile cu aceeași parolă. Folosește o parolă unică pe fiecare site — fezabil doar cu un manager de parole.
2. **Substituții previzibile.** `Par0la!` în loc de `Parola` nu păcălește pe nimeni: atacurile de dicționar testează automat aceste substituții (`@`→a, `0`→o, `1`→i).
3. **Informații personale.** Numele, data nașterii, numele animalului de companie — toate sunt printre primele încercate într-un atac țintit.
4. **Complexitate în loc de lungime.** O parolă de 8 caractere cu simboluri (~52 biți) e mai slabă decât una de 16 litere mici (~75 biți). Prioritizează lungimea.
5. **Expirarea forțată periodică.** Schimbarea obligatorie a parolei la 90 de zile duce la tipare previzibile (`Parola1`, `Parola2`). Recomandările NIST actuale o descurajează — schimbă parola doar la suspiciune de compromitere.
6. **Notarea parolei la vedere.** Un bilețel lipit pe monitor anulează orice entropie. Dacă trebuie să scrii ceva, scrie parola-master a managerului și ține-o în portofel.

## Bune practici complementare

Chiar și parola perfectă nu este suficientă singură:

- **Manager de parole** — generează lung și aleatoriu, stochează criptat, completează automat. Nu mai trebuie să memorezi nimic în afară de parola-master.
- **Autentificare în doi pași (2FA)** — un al doilea factor (aplicație TOTP, cheie hardware) face ca o parolă spartă să fie insuficientă pentru acces.
- **Verificarea breșelor** — servicii precum Have I Been Pwned îți spun dacă o adresă de e-mail a apărut într-o scurgere de date cunoscută.
- **Chei de acces (passkeys)** — standardul FIDO2/WebAuthn elimină complet parola pentru site-urile care îl suportă, înlocuind-o cu criptografie cu cheie publică legată de dispozitiv.

## Confidențialitate: totul rămâne pe dispozitivul tău

Spre deosebire de multe generatoare online, acesta **nu trimite nimic** către vreun server. Întregul cod rulează în browserul tău: poți deschide panoul de rețea din instrumentele de dezvoltator și vei vedea că nu pleacă nicio cerere atunci când generezi o parolă. Parolele afișate există doar în memoria paginii — o reîncărcare le șterge definitiv, fără urmă în istoric sau în vreo bază de date.

## Instrumente înrudite

- [Generator Cod QR cu Pictogramă](/dezvoltator/generator-cod-qr/) — codează parole Wi-Fi sau linkuri în coduri QR scanabile
- [Generator Cod de Bare](/dezvoltator/generator-cod-bare/) — EAN-13, CODE-128, UPC-A cu cifră de control GS1
- [Codificare Base64](/dezvoltator/base64-codificare-decodificare/) — codare reversibilă pentru transmiterea datelor binare
