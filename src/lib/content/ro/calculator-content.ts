import type { ContentMap } from "../types.ts";

// Math calculator RO content – Fázis 2
export const CALCULATOR_RO_CONTENT: ContentMap = {
  "procent-calculator": {
    introText:
      "Calculatorul de procente acoperă cele 4 cazuri cele mai des întâlnite: cât face X% din Y, ce procent reprezintă X din Y, creșterea sau scăderea procentuală între două valori și diferența procentuală simetrică. Toate calculele sunt făcute în timp real, în browserul tău.",
    guide: [
      "1. Alege scenariul: «procent din», «cât la sută», «creștere/scădere» sau «diferență».",
      "2. Introdu valorile cerute (nu contează dacă folosești virgulă sau punct).",
      "3. Citește rezultatul în card cu formula completă afișată.",
    ],
    faq: [
      { q: "Cum calculez 20% dintr-un număr?", a: "Înmulțești numărul cu 0,20 (sau cu 20 și împarți la 100). Exemplu: 20% din 250 = 250 × 0,20 = 50." },
      { q: "Ce reprezintă o creștere de 25%?", a: "Înmulțești valoarea inițială cu 1,25. Exemplu: 80 → 80 × 1,25 = 100." },
      { q: "Cum aflu ce procent este X din Y?", a: "Împarți X la Y și înmulțești cu 100. Exemplu: 30 din 200 = 30/200 × 100 = 15%." },
      { q: "Care este diferența între «creștere %» și «diferență %»?", a: "Creșterea folosește valoarea veche ca bază (asimetrică). Diferența procentuală folosește media celor două valori (simetrică, utilă în comparații științifice)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul de calcul", description: "Cele 4 carduri acoperă scenariile uzuale: procent din, cât % este, creștere/scădere, diferență simetrică." },
        { title: "2. Completează valorile", description: "Câmpurile acceptă atât virgulă, cât și punct ca separator zecimal." },
        { title: "3. Vezi rezultatul și formula", description: "Rezultatul se afișează imediat, împreună cu formula matematică folosită." },
      ],
      useCases: [
        { icon: "🛒", title: "Reduceri Black Friday", description: "Calculează rapid prețul după o reducere de 30% sau 40%." },
        { icon: "📊", title: "Note și medii", description: "Cât % a obținut un elev dintr-un total de puncte la examen." },
        { icon: "💰", title: "Salariu și buget", description: "Cu cât crește salariul după o majorare de 8%, cât economisești dacă pui 15% la economii." },
        { icon: "📈", title: "Variația prețurilor", description: "Cu cât % a crescut sau a scăzut prețul unui produs între două perioade." },
      ],
      aboutSection: {
        title: "Despre calculul procentual",
        paragraphs: [
          "Procentul este o fracție cu numitorul 100, marcată cu simbolul %. Astfel, 25% înseamnă 25 din 100, sau 0,25 ca număr zecimal. Procentele sunt instrumentul standard pentru a exprima proporții în comerț, contabilitate, statistică și viața de zi cu zi.",
          "Atenție: o creștere de 50% urmată de o scădere de 50% NU readuce la valoarea inițială. 100 → +50% → 150 → −50% → 75. Această asimetrie este sursa multor erori de comunicare. De aceea în comparații științifice se preferă diferența procentuală simetrică (relativă la media celor două valori).",
        ],
      },
    },
  },
  "ecuatie-grad-doi": {
    introText:
      "Calculatorul rezolvă orice ecuație de gradul al doilea de forma ax² + bx + c = 0 prin metoda discriminantului. Afișează pas cu pas valoarea lui Δ, calculul rădăcinii pătrate și formula completă, indiferent dacă rădăcinile sunt reale sau complexe.",
    guide: [
      "1. Introdu coeficienții a, b și c (a trebuie să fie diferit de zero).",
      "2. Apasă «Calculează» – pașii apar imediat.",
      "3. Citește tipul rădăcinilor: două reale distincte, una dublă sau două complex conjugate.",
    ],
    faq: [
      { q: "Care este formula pentru rădăcinile ecuației de gradul II?", a: "x = (−b ± √Δ) / (2a), unde Δ = b² − 4ac este discriminantul." },
      { q: "Ce înseamnă discriminant negativ?", a: "Δ < 0 înseamnă că ecuația nu are rădăcini reale, ci două rădăcini complex conjugate de forma α ± βi." },
      { q: "Cum se rezolvă x² − 5x + 6 = 0?", a: "a=1, b=−5, c=6. Δ = 25 − 24 = 1. x₁ = (5+1)/2 = 3, x₂ = (5−1)/2 = 2." },
      { q: "Ce înseamnă rădăcină dublă?", a: "Când Δ = 0, ecuația are o singură soluție repetată: x = −b/(2a). Geometric, parabola atinge axa Ox într-un singur punct (vârful)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Notează coeficienții", description: "Identifică a (coeficientul lui x²), b (coeficientul lui x) și c (termenul liber)." },
        { title: "2. Calculează Δ", description: "Δ = b² − 4ac. Semnul lui Δ determină tipul rădăcinilor." },
        { title: "3. Aplică formula", description: "x = (−b ± √Δ) / (2a). Rezultatul: două rădăcini reale, una dublă sau două complexe." },
      ],
      useCases: [
        { icon: "🎓", title: "Bacalaureat", description: "Subiectul de matematică conține adesea ecuații de gradul II la profilul real." },
        { icon: "📐", title: "Probleme cu arii", description: "Ecuațiile patratice apar la calculul dimensiunilor unei suprafețe date." },
        { icon: "🏗️", title: "Inginerie", description: "Mișcare cu accelerație constantă (cinematică), traiectorii parabolice." },
      ],
      aboutSection: {
        title: "Despre ecuația de gradul al doilea",
        paragraphs: [
          "Ecuația de gradul al doilea este una dintre cele mai studiate forme algebrice. Reprezentarea ei grafică este o parabolă: dacă a > 0 deschisă în sus, dacă a < 0 deschisă în jos. Punctele de intersecție cu axa Ox sunt rădăcinile.",
          "Discriminantul Δ = b² − 4ac este criteriul care decide totul: Δ > 0 → două rădăcini reale distincte; Δ = 0 → o rădăcină dublă (vârful parabolei atinge axa); Δ < 0 → două rădăcini complex conjugate (parabola nu intersectează axa Ox).",
        ],
      },
    },
  },
  "ecuatii-exponentiale": {
    introText:
      "Calculatorul rezolvă ecuații exponențiale de forma a · bˣ = c folosind logaritmi. Afișează pașii intermediari: împărțirea cu a, logaritmarea ambelor părți și verificarea finală.",
    guide: [
      "1. Introdu coeficienții a (factor), b (bază) și c (rezultat).",
      "2. Apasă «Rezolvă» pentru a vedea pașii.",
      "3. Citește valoarea lui x și pasul de verificare.",
    ],
    faq: [
      { q: "Cum se rezolvă 2 · 3ˣ = 54?", a: "Împărțim cu 2: 3ˣ = 27. Logaritmăm: x · log(3) = log(27). x = log(27)/log(3) = 3." },
      { q: "Ce restricții există asupra coeficienților?", a: "Baza b trebuie să fie pozitivă și diferită de 1 (b > 0, b ≠ 1). Coeficientul a nu poate fi zero. Raportul c/a trebuie să fie pozitiv pentru rădăcină reală." },
      { q: "De ce nu se poate baza 1?", a: "Pentru b = 1, expresia 1ˣ este mereu 1 indiferent de x, deci ecuația fie are infinit de soluții, fie niciuna." },
      { q: "Pot rezolva eˣ = 7,389?", a: "Da. Folosește bază b ≈ 2,718 (numărul lui Euler). Rezultat: x = ln(7,389) ≈ 2." },
    ],
    content: {
      howToSteps: [
        { title: "1. Aduce la formă standard", description: "Scrie ecuația ca a · bˣ = c. Dacă lipsește a, ia a = 1." },
        { title: "2. Logaritmează", description: "log(a · bˣ) = log(c) → log(a) + x · log(b) = log(c)." },
        { title: "3. Izolează x", description: "x = (log(c) − log(a)) / log(b) = log(c/a) / log(b)." },
      ],
      useCases: [
        { icon: "🔬", title: "Decăderea radioactivă", description: "Calcul timp de înjumătățire pentru izotopi (Cs-137, C-14)." },
        { icon: "💸", title: "Dobândă compusă", description: "Calcul perioadă necesară pentru ca o sumă să se dubleze." },
        { icon: "📈", title: "Creștere populație", description: "Modele exponențiale în biologie și demografie." },
      ],
      aboutSection: {
        title: "Despre ecuațiile exponențiale",
        paragraphs: [
          "Ecuațiile exponențiale apar în orice fenomen unde rata de schimbare este proporțională cu valoarea curentă: dezintegrare radioactivă, dobândă compusă, creșterea populațiilor. Cheia rezolvării este logaritmul – funcția inversă a exponențialei.",
          "Logaritmul natural ln (bază e ≈ 2,718) este cel mai folosit în științe naturale. Logaritmul în bază 10 (lg sau log) apare în chimie (pH), inginerie audio (decibeli) și seismologie (Richter).",
        ],
      },
    },
  },
  "medie-aritmetica": {
    introText:
      "Calculatorul de medie aritmetică, mediană și mod calculează simultan toate statisticile descriptive importante pentru un set de numere: medie aritmetică sau ponderată, mediană, mod, sumă, valoare minimă/maximă, abatere standard și varianță.",
    guide: [
      "1. Introdu valorile pe rânduri (poți adăuga sau șterge rânduri dinamic).",
      "2. Comută între mod «simplu» și «ponderat» (cu greutăți).",
      "3. Citește toate statisticile în cardurile rezultatelor.",
    ],
    faq: [
      { q: "Care este formula mediei aritmetice?", a: "Media aritmetică = (suma valorilor) / (numărul de valori). Notată x̄ (x-bar) sau M." },
      { q: "Care este diferența între mediană și medie?", a: "Mediana este valoarea din mijlocul șirului ordonat. Spre deosebire de medie, mediana nu este influențată de valori extreme." },
      { q: "Ce este modul?", a: "Modul este valoarea care apare cel mai des. Un set poate avea un mod, mai multe (multimodal) sau niciun mod dacă toate valorile sunt unice." },
      { q: "Cum se calculează media ponderată a notelor?", a: "Înmulțești fiecare notă cu numărul de credite (greutatea), aduni produsele și împarți la suma greutăților. Mod «ponderat» face asta automat." },
      { q: "Ce este abaterea standard?", a: "Abaterea standard (σ) măsoară împrăștierea valorilor în jurul mediei. σ mică = valori apropiate de medie; σ mare = valori dispersate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu seria de valori", description: "Câte o valoare pe rând. Apasă «+ Adaugă rând» pentru mai multe valori." },
        { title: "2. Alege modul", description: "«Simplu» pentru media aritmetică clasică, «Ponderat» dacă unele valori contează mai mult (note × credite, vânzări × cantități)." },
        { title: "3. Citește statisticile", description: "Media, mediana, modul, abaterea standard și varianța se actualizează în timp real." },
      ],
      useCases: [
        { icon: "🎓", title: "Media de bacalaureat", description: "Calcul medie ponderată a notelor cu credite (probe E.a, E.c, E.d)." },
        { icon: "💼", title: "Salariu mediu echipă", description: "Statistici descriptive pentru analize HR." },
        { icon: "📊", title: "Cercetare școlară", description: "Statistici pe rezultate de chestionare, experimente, sondaje." },
        { icon: "📈", title: "Analize financiare", description: "Medie randament portofoliu, abatere standard pentru risc." },
      ],
      aboutSection: {
        title: "Despre statisticile descriptive",
        paragraphs: [
          "Media, mediana și modul sunt cele 3 măsuri de tendință centrală. Le folosim pentru a rezuma un set de date printr-o singură valoare reprezentativă. Care dintre ele alegem depinde de natura datelor.",
          "Pentru distribuții simetrice (aproximativ normale), media este suficientă. Pentru distribuții asimetrice (cu valori extreme), mediana este mai robustă. Pentru date categorice (preferințe, voturi), modul este singura opțiune validă.",
          "Abaterea standard (σ) și varianța (σ²) descriu cât de împrăștiate sunt datele în jurul mediei. În distribuții normale, ~68% din valori se află între x̄ ± σ și ~95% între x̄ ± 2σ.",
        ],
      },
    },
  },
  "regula-de-trei-simpla": {
    introText:
      "Regula de trei simplă este una dintre cele mai folosite tehnici de calcul în viața de zi cu zi. Calculatorul nostru o aplică instant: dă-i 3 valori cunoscute și obții al patrulea termen, fie pentru proporție directă, fie inversă.",
    guide: [
      "1. Introdu primele două valori care formează raportul cunoscut (A : B).",
      "2. Introdu a treia valoare (C) – pentru ea calculezi necunoscuta x.",
      "3. Alege tipul: directă (cu cât crește A, cu atât crește B) sau inversă.",
    ],
    faq: [
      { q: "Ce este regula de trei simplă?", a: "Este o metodă de a calcula al patrulea termen al unei proporții când 3 dintre ele sunt cunoscute. Bazată pe relația A/B = C/x." },
      { q: "Care este diferența între proporție directă și inversă?", a: "Directă: ambele cresc sau scad împreună (ex: km × oră). Inversă: când una crește, cealaltă scade (ex: muncitori × ore)." },
      { q: "Cum calculez prețul a 7 mere dacă 3 mere costă 4,50 lei?", a: "Proporție directă: 3/4,50 = 7/x → x = 7 × 4,50 / 3 = 10,50 lei." },
      { q: "Cum calculez câte ore îi trebuie la 5 muncitori să facă o lucrare pe care 3 muncitori o fac în 8 ore?", a: "Proporție inversă: 3 × 8 = 5 × x → x = 24/5 = 4,8 ore." },
    ],
    content: {
      howToSteps: [
        { title: "1. Recunoaște tipul de proporție", description: "Dacă valorile cresc/scad împreună → directă. Dacă una crește când cealaltă scade → inversă." },
        { title: "2. Aranjează datele", description: "Notează A : B = C : x (proporție directă) sau A · B = C · x (proporție inversă)." },
        { title: "3. Calculează x", description: "Directă: x = (B × C) / A. Inversă: x = (A × B) / C." },
      ],
      useCases: [
        { icon: "🛒", title: "Cumpărături", description: "Cât costă 7 produse dacă 3 costă X lei." },
        { icon: "🍳", title: "Rețete culinare", description: "Ajustare cantități pentru un număr diferit de porții." },
        { icon: "👷", title: "Muncă & timp", description: "Câți muncitori sunt necesari pentru a termina mai rapid (proporție inversă)." },
        { icon: "🚗", title: "Distanțe & viteze", description: "Cât durează un drum la o viteză diferită (proporție inversă)." },
      ],
      aboutSection: {
        title: "Despre regula de trei",
        paragraphs: [
          "Regula de trei este probabil cel mai folosit instrument matematic în comerț, gastronomie, construcții și gospodărie. Esența ei este simplă: două mărimi proporționale, când cunoști 3 valori dintre ele, o poți determina pe a patra.",
          "Atenție la tipul de proporție! Greșeala cea mai frecventă este aplicarea formulei pentru directe la situații inverse. Întrebare cheie: «Dacă o mărime se dublează, cealaltă se dublează (directă) sau se înjumătățește (inversă)?»",
        ],
      },
    },
  },

  "numere-romane": {
    introText:
      "Convertorul de numere romane transformă bidirecțional între cifre romane (I, V, X, L, C, D, M) și numere arabe, în intervalul 1–3999. Editezi oricare câmp, iar celălalt se actualizează instant, cu validare și descompunere pe simboluri. Util pentru ceasuri, capitole, ani, monumente și exerciții școlare.",
    guide: [
      "1. Scrie un număr arab (1–3999) sau un număr roman.",
      "2. Conversia apare instant în celălalt câmp, cu descompunerea pe simboluri.",
      "3. Apasă pe simbolurile de bază (I, V, X, L, C, D, M) pentru exemple rapide.",
    ],
    faq: [
      { q: "Care sunt simbolurile numerelor romane?", a: "Cele șapte simboluri de bază sunt: I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. Toate celelalte numere se formează prin combinarea acestora." },
      { q: "Cum se scrie 2026 cu numere romane?", a: "2026 = MMXXVI. Descompunere: M (1000) + M (1000) + X (10) + X (10) + V (5) + I (1) = 2026." },
      { q: "Ce este notația substractivă?", a: "Pentru a evita patru simboluri identice la rând, se scade un simbol mai mic pus înaintea unuia mai mare: IV = 4 (5−1), IX = 9, XL = 40, XC = 90, CD = 400, CM = 900." },
      { q: "Care este cel mai mare număr roman standard?", a: "În notația standard, cel mai mare număr este 3999 = MMMCMXCIX. Peste această valoare se folosesc bare deasupra (vinculum), care înmulțesc cu 1000, dar acestea nu sunt acoperite de convertorul clasic." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu valoarea", description: "Un număr arab (1–3999) sau o secvență romană validă." },
        { title: "2. Conversie instant", description: "Celălalt câmp se actualizează, cu validare automată." },
        { title: "3. Vezi descompunerea", description: "Numărul este descompus pe simboluri (ex. MM + XX + VI)." },
      ],
      useCases: [
        { icon: "🕐", title: "Ceasuri", description: "Citirea cadranelor cu cifre romane (I–XII)." },
        { icon: "📖", title: "Capitole și volume", description: "Numerotarea capitolelor, prefețelor și anexelor." },
        { icon: "🏛️", title: "Monumente și ani", description: "Anii inscripționați pe clădiri și monumente." },
        { icon: "🎓", title: "Școală", description: "Exerciții de conversie la matematică și istorie." },
      ],
      aboutSection: {
        title: "Despre numerele romane",
        paragraphs: [
          "Numerele romane sunt un sistem de notație din Roma antică, bazat pe șapte simboluri literale. Spre deosebire de sistemul zecimal pozițional, valoarea se obține prin adunarea (și, în notația substractivă, scăderea) simbolurilor citite de la stânga la dreapta.",
          "Regulile principale: un simbol nu se repetă de mai mult de trei ori la rând (de aici IV în loc de IIII); simbolurile V, L, D nu se repetă; notația substractivă permite doar I înaintea lui V și X, X înaintea lui L și C, C înaintea lui D și M. Sistemul standard acoperă valorile 1–3999.",
        ],
      },
    },
  },

  "cmmdc-cmmmc": {
    introText:
      "Calculatorul CMMDC și CMMMC determină cel mai mare divizor comun și cel mai mic multiplu comun pentru oricâte numere naturale. Folosește algoritmul lui Euclid și afișează descompunerea în factori primi a fiecărui număr. Util la simplificarea fracțiilor, aducerea la același numitor și problemele de gimnaziu.",
    guide: [
      "1. Scrie două sau mai multe numere naturale, separate prin virgulă sau spațiu.",
      "2. Vezi instant CMMDC și CMMMC.",
      "3. Verifică descompunerea în factori primi a fiecărui număr.",
    ],
    faq: [
      { q: "Ce este CMMDC (c.m.m.d.c.)?", a: "Cel mai mare divizor comun al unor numere este cel mai mare număr natural care le împarte pe toate fără rest. Exemplu: CMMDC(12, 18) = 6, deoarece 6 este cel mai mare număr care împarte și 12, și 18." },
      { q: "Ce este CMMMC (c.m.m.m.c.)?", a: "Cel mai mic multiplu comun este cel mai mic număr natural diferit de zero care este multiplu al tuturor numerelor date. Exemplu: CMMMC(4, 6) = 12." },
      { q: "Cum funcționează algoritmul lui Euclid?", a: "Pentru două numere, se împarte cel mare la cel mic și se reține restul; apoi se repetă cu (împărțitorul, restul) până când restul devine 0. Ultimul împărțitor nenul este CMMDC. Exemplu: 18 = 1×12 + 6; 12 = 2×6 + 0 → CMMDC = 6." },
      { q: "Care este relația dintre CMMDC și CMMMC?", a: "Pentru două numere: CMMDC(a, b) × CMMMC(a, b) = a × b. De aceea CMMMC(a, b) = (a × b) / CMMDC(a, b)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu numerele", description: "Două sau mai multe numere naturale, separate prin virgulă." },
        { title: "2. Vezi rezultatele", description: "CMMDC și CMMMC, calculate instant." },
        { title: "3. Factori primi", description: "Descompunerea fiecărui număr pentru verificare." },
      ],
      useCases: [
        { icon: "➗", title: "Simplificarea fracțiilor", description: "Împarte numărătorul și numitorul la CMMDC." },
        { icon: "🧮", title: "Numitor comun", description: "Aduce fracțiile la același numitor folosind CMMMC." },
        { icon: "📅", title: "Probleme de coincidență", description: "Când se întâlnesc din nou două evenimente periodice (CMMMC)." },
        { icon: "🎓", title: "Teme și teze", description: "Exerciții clasice de gimnaziu cu divizori și multipli." },
      ],
      aboutSection: {
        title: "Despre CMMDC, CMMMC și algoritmul lui Euclid",
        paragraphs: [
          "Cel mai mare divizor comun (CMMDC) și cel mai mic multiplu comun (CMMMC) sunt noțiuni fundamentale din teoria numerelor, introduse în gimnaziu. CMMDC se folosește la simplificarea fracțiilor, iar CMMMC la aducerea fracțiilor la același numitor și la problemele cu evenimente periodice.",
          "Algoritmul lui Euclid (sec. III î.Hr.) este cea mai eficientă metodă de calcul al CMMDC: se bazează pe faptul că CMMDC(a, b) = CMMDC(b, a mod b). Alternativ, ambele se pot obține din descompunerea în factori primi: CMMDC ia factorii comuni la puterea minimă, iar CMMMC ia toți factorii la puterea maximă.",
        ],
      },
    },
  },

  // ─── Fázis 4 cleanup: Consum combustibil (mutat din /conversii/) ──────────
  "consum-combustibil": {
    introText:
      "Calculator complet pentru consumul de combustibil — l/100 km, mpg, litri necesari pentru un drum, cost total și emisii CO₂. Suportă 3 tipuri de combustibil RO (motorină, benzină, GPL) cu factori de emisie și densități standardizate. Util pentru șoferi care vor să-și monitorizeze fogyasztarea, să compare mașini sau să planifice costul unui drum lung.",
    guide: [
      "1. Alege modul: «Calcul consum» (din km + litri folosiți), «Litri necesari» (planificare drum) sau «Cost total» (estimare buget).",
      "2. Introdu valorile cerute (km, litri, l/100 km, preț/l).",
      "3. Folosește presets RO (motorină 7,50 lei/l, benzină 95, GPL etc.) sau preset mașini (sedan, SUV, camionetă).",
      "4. Vezi rezultatul instant: l/100 km, mpg echivalent, total litri și cost final.",
    ],
    faq: [
      { q: "Cum se calculează consumul mașinii?", a: "Consumul mediu (l/100 km) = (litri folosiți ÷ km parcursi) × 100. Exemplu: dacă ai parcurs 600 km cu 42 litri, consumul este (42 ÷ 600) × 100 = 7 l/100 km." },
      { q: "Ce înseamnă mpg și prin ce diferă de l/100 km?", a: "L/100 km arată câți litri sunt necesari pentru 100 km. Mpg (miles per gallon, sistem SUA) arată câte mile poți parcurge cu 1 galon american (3,785 l). Formula de conversie: mpg = 235,21 ÷ (l/100 km). Exemplu: 7 l/100 km ≈ 33,6 mpg." },
      { q: "Ce este un consum bun pentru o mașină?", a: "Depinde de categorie: utilitară mică 4-6 l/100 km, sedan mediu 6-8 l/100 km, SUV 8-12 l/100 km, hibrid 3-5 l/100 km. Aceste valori sunt orientative pentru consum mixt (oraș + autostradă). În oraș, consumul e cu 20-30% mai mare." },
      { q: "Cum reduc consumul de combustibil?", a: "Stil de condus uniform (fără accelerări/frânări bruște), presiune corectă pneuri (verifică lunar), eliminarea greutății inutile (portbagaj, suport sus), folosirea AC doar când e necesar (peste 25°C), service regulat (filtre, ulei). Aceste tehnici pot reduce consumul cu 15–20%." },
      { q: "Cât emite CO₂ o mașină pe litru?", a: "Benzină: ~2,31 kg CO₂/litru. Motorină: ~2,68 kg CO₂/litru. GPL: ~1,51 kg CO₂/litru. La 7 l/100 km benzină pe un drum de 500 km, emisiile sunt: 35 litri × 2,31 = 80,85 kg CO₂. GPL este cea mai prietenoasă opțiune din punct de vedere ecologic." },
      { q: "Cât costă un drum de 500 km cu 7 l/100 km la motorină?", a: "Litri necesari: (7 × 500) ÷ 100 = 35 l. Cost: 35 × 7,50 lei = 262,50 lei (la prețul motorinei RO 2026)." },
      { q: "Cât diferă consumul iarna față de vara?", a: "Iarna consumul este cu 10–15% mai mare din cauza încălzirii habitaclului, motorului rece (combustibil suplimentar pentru îmbogățire), pneurilor de iarnă (rezistență mai mare la rulare) și combustibilului «de iarnă» (densitate diferită)." },
      { q: "Computerul de bord arată consumul corect?", a: "De obicei NU. Computerul de bord afișează un consum cu 5–10% mai optimist decât valoarea reală măsurată cu plinul. Pentru o valoare exactă, folosește metoda «plin până la plin»: completează rezervorul, resetează kilometrajul, conduce, completează din nou și calculează (litri ÷ km) × 100." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul de calcul", description: "Cele 3 carduri acoperă scenariile uzuale: calcul consum din date reale, planificare litri necesari, estimare cost total al drumului." },
        { title: "2. Introdu valorile", description: "Km parcursi, litri folosiți, consum mediu (l/100 km), preț pe litru. Câmpurile acceptă atât virgulă, cât și punct ca separator." },
        { title: "3. Folosește presets RO 2026", description: "Click pe motorină, benzină 95/98 sau GPL pentru prețuri actuale RO. Preset-uri mașini (sedan, SUV) pentru consumul mediu." },
        { title: "4. Compară și planifică", description: "Folosește rezultatele pentru a compara mașini, a urmări consumul lunar sau a împărți costul cu pasagerii." },
      ],
      useCases: [
        { icon: "🚗", title: "Monitorizare consum", description: "Calculează consumul real al mașinii din datele reale ale plinului." },
        { icon: "🛣️", title: "Planificare drum", description: "Câți litri ai nevoie pentru un drum de 800 km la 7 l/100 km — și cât te va costa." },
        { icon: "🤝", title: "Călătorii de grup", description: "Împărțirea costului între pasageri în funcție de distanță și consum." },
        { icon: "🔍", title: "Comparație mașini", description: "Comparare directă între două mașini cu consum diferit pentru același drum." },
        { icon: "🌱", title: "Emisii CO₂", description: "Estimare emisii pentru a face alegeri ecologice — GPL emite cu 35% mai puțin CO₂ ca benzina." },
        { icon: "📊", title: "Bugetare lunară", description: "Estimare cost combustibil lunar pe baza km parcursi și consum mediu." },
      ],
      aboutSection: {
        title: "Despre consumul de combustibil în RO",
        paragraphs: [
          "Consumul de combustibil este unul dintre cei mai importanți indicatori economici și ecologici ai unei mașini. În RO, prețurile la pompă pentru 2026 (medii naționale) sunt: motorină ~7,50 lei/l, benzină 95 ~7,40 lei/l, benzină 98 ~7,90 lei/l, GPL auto ~3,80 lei/l. La un consum mediu de 7 l/100 km și 15.000 km/an, costul anual este de ~7.875 lei (motorină) sau ~7.770 lei (benzină 95).",
          "Consumul real diferă semnificativ de cel din specificațiile WLTP (test standardizat european). În medie, în condiții reale, consumul este cu 10–25% mai mare decât valorile oficiale. Factori care îl influențează: stilul de condus (cea mai mare diferență — agresiv vs. relaxat poate fi 30%), traficul (oraș vs. autostradă), starea mașinii (filtre, presiune pneuri), sezonul (iarna +10–15%) și sarcina (greutate, portbagaj).",
          "În UE, din 2025 toate mașinile noi trebuie să raporteze consum WLTP și emisii CO₂ pe etichetă (Regulamentul UE 2017/1151). Pentru tracking personal, recomandăm metoda «plin până la plin» — singura metodă care dă valoarea reală, neafectată de calibrarea computerului de bord. Aplicații mobile populare în RO: Fuelio, Drivvo, MyFuelLog2.",
          "Tendința în RO 2026: piața auto se polarizează între diesel (în declin în orașe mari datorită restricțiilor anti-poluare) și hybrid/electrice (creștere accelerată cu programul Rabla Plus). Consumul mediu al parcului auto din RO scade lent — din 7,8 l/100 km în 2018 la ~7,2 l/100 km estimat 2026, datorită înnoirii cu mașini Euro 6 și hybrid.",
        ],
      },
    },
  },
};
