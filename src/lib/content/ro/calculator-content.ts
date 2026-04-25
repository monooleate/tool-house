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
};
