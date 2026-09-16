// ============================================================
// PROBLEME DE MATEMATICĂ PE CLASE (RO-only)
// Single source of truth pentru hub-ul „/probleme-matematica/"
// și paginile pe clase (clasa a V-a … a XII-a).
//
// Structură inspirată de secțiunea „pe clase" a rețelei-soră
// MatekMegoldások.hu, adaptată integral la sistemul de învățământ
// românesc (gimnaziu V–VIII + Evaluarea Națională, liceu IX–XII +
// Bacalaureat) și la programa școlară a Ministerului Educației.
//
// Fiecare clasă are: capitole (topics), probleme rezolvate pas cu
// pas (enunț → rezolvare → răspuns, cu grad de dificultate) și FAQ.
// Enunțurile/răspunsurile folosesc notație Unicode (lizibile și în
// schema JSON-LD); pașii pot conține KaTeX ($…$ / $$…$$), redate de
// `renderMixed` la build-time (fără JS pe client).
//
// Izolare de limbă: paginile se generează DOAR pe build-ul RO
// (getStaticPaths early-return pe HU). Nu există scurgere HU↔RO.
// ============================================================

export type Difficulty = "usor" | "mediu" | "dificil";

export interface Exercise {
  /** id stabil, unic în cadrul clasei (pentru ancore/keys) */
  id: string;
  /** capitolul din care face parte */
  topic: string;
  difficulty: Difficulty;
  /** enunțul – text Unicode (folosit și ca Question.text în schema) */
  statement: string;
  /** pașii rezolvării – pot conține KaTeX inline ($…$) sau bloc ($$…$$) */
  steps: string[];
  /** răspunsul final – text Unicode (folosit și ca Answer.text) */
  answer: string;
}

export interface GradeLevel {
  /** 5 … 12 */
  grade: number;
  /** slug URL, ex. "clasa-8" */
  slug: string;
  /** eticheta afișată, ex. "Clasa a VIII-a" */
  label: string;
  /** numeralul roman, ex. "VIII" */
  roman: string;
  /** ciclul de învățământ */
  cycle: "Gimnaziu" | "Liceu";
  /** badge de examen relevant (EN / BAC), sau null */
  examBadge: string | null;
  /** context examen (o frază) */
  examContext: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  /** 2–3 paragrafe intro (RO) */
  intro: string[];
  /** capitolele clasei (programa) */
  topics: string[];
  exercises: Exercise[];
  faq: { q: string; a: string }[];
  updatedAt: string;
}

// ============================================================
// HUB (pagina „bevezetes" / introducere)
// ============================================================
export const HUB = {
  slug: "probleme-matematica",
  metaTitle:
    "Probleme de matematică rezolvate pe clase (V–XII) – Gimnaziu și Liceu",
  metaDescription:
    "Culegere gratuită de probleme de matematică rezolvate pas cu pas, organizate pe clase, de la a V-a la a XII-a. Pentru gimnaziu, liceu, Evaluarea Națională și Bacalaureat.",
  h1: "Probleme de matematică rezolvate pe clase",
  tagline:
    "De la clasa a V-a la a XII-a — enunț, rezolvare pas cu pas și răspuns.",
  intro: [
    "Bine ai venit în culegerea noastră interactivă de probleme de matematică! Aici găsești exerciții organizate pe clase, fiecare cu rezolvare completă pas cu pas — exact ca la clasă, dar oricând disponibile și complet gratuite, fără cont și fără reclame intruzive.",
    "Structura urmează programa școlară a Ministerului Educației: ciclul gimnazial (clasele a V-a – a VIII-a), cu pregătire pentru Evaluarea Națională, și ciclul liceal (clasele a IX-a – a XII-a), cu pregătire pentru examenul de Bacalaureat. Alege clasa ta și exersează pe capitolele care contează.",
    "Fiecare problemă are un grad de dificultate marcat cu culoare — ușor (verde), mediu (galben) sau dificil (roșu) — astfel încât să poți urca treptat. Rezolvările sunt scrise didactic, cu fiecare pas explicat, ca să înțelegi metoda, nu doar rezultatul.",
  ],
  faq: [
    {
      q: "Este gratuit?",
      a: "Da, complet gratuit. Nu este nevoie de cont, de abonament sau de descărcare. Toate problemele și rezolvările sunt accesibile direct în pagină.",
    },
    {
      q: "Ce clase sunt acoperite?",
      a: "Toate clasele de la a V-a la a XII-a: ciclul gimnazial (V–VIII), cu pregătire pentru Evaluarea Națională, și ciclul liceal (IX–XII), cu pregătire pentru Bacalaureat.",
    },
    {
      q: "Cum sunt prezentate rezolvările?",
      a: "Fiecare problemă are enunțul, apoi rezolvarea pas cu pas (fiecare etapă explicată) și răspunsul final evidențiat. Poți urmări logica completă, nu doar rezultatul.",
    },
    {
      q: "Problemele respectă programa școlară din România?",
      a: "Da. Capitolele și tipurile de probleme sunt aliniate la programa școlară în vigoare a Ministerului Educației, pe fiecare clasă, incluzând temele frecvente la Evaluarea Națională și la Bacalaureat.",
    },
    {
      q: "Cum mă pregătesc pentru Evaluarea Națională sau Bacalaureat?",
      a: "Începe cu clasa curentă, apoi parcurge clasele anterioare pentru recapitulare. Pentru EN, insistă pe clasa a VIII-a (algebră, funcții, geometrie în spațiu); pentru BAC, pe clasele a XI-a și a XII-a (analiză matematică, structuri algebrice). Poți folosi și calculatoarele noastre de medii pentru simulări.",
    },
  ],
  updatedAt: "2026-09-16",
};

// ─── Legături utile către instrumentele existente (internal linking) ─
export const RELATED_TOOLS: { label: string; href: string; icon: string }[] = [
  { label: "Calculator medie Evaluarea Națională", href: "/calculator/medie-admitere-liceu/", icon: "🎯" },
  { label: "Calculator medie Bacalaureat", href: "/calculator/medie-bacalaureat/", icon: "🎓" },
  { label: "Calculator medie note", href: "/calculator/calculator-medii-note/", icon: "📒" },
  { label: "Ecuație de gradul II", href: "/calculator/ecuatie-grad-doi/", icon: "➗" },
  { label: "Calculator logaritmi", href: "/calculator/logaritmi/", icon: "🔣" },
  { label: "Calculator fracții", href: "/calculator/calculator-fractii/", icon: "🧮" },
];

// ============================================================
// CLASELE
// ============================================================
export const GRADES: GradeLevel[] = [
  // ─────────────────────────── CLASA a V-a ───────────────────────────
  {
    grade: 5,
    slug: "clasa-5",
    label: "Clasa a V-a",
    roman: "V",
    cycle: "Gimnaziu",
    examBadge: null,
    examContext: "Primul an de gimnaziu — bazele aritmeticii și ale geometriei.",
    icon: "5️⃣",
    metaTitle: "Probleme de matematică clasa a V-a, rezolvate pas cu pas",
    metaDescription:
      "Probleme rezolvate de matematică pentru clasa a V-a: numere naturale, fracții ordinare și zecimale, divizibilitate, unități de măsură și geometrie. Cu rezolvare completă.",
    intro: [
      "Clasa a V-a este primul an de gimnaziu și pune bazele întregii matematici de mai târziu. Elevii trec de la aritmetica din ciclul primar la operații mai complexe cu numere naturale, la fracții ordinare și zecimale și la primele noțiuni de geometrie riguroasă.",
      "Accentul cade pe ordinea operațiilor, pe criteriile de divizibilitate și pe rezolvarea problemelor prin metode aritmetice (metoda mersului invers, metoda figurativă). Problemele de mai jos acoperă capitolele-cheie și se rezolvă complet, pas cu pas.",
    ],
    topics: [
      "Numere naturale și ordinea operațiilor",
      "Puteri cu exponent natural",
      "Divizibilitate (criterii)",
      "Fracții ordinare",
      "Fracții zecimale",
      "Unități de măsură",
      "Elemente de geometrie (drepte, unghiuri)",
    ],
    exercises: [
      {
        id: "v-1",
        topic: "Ordinea operațiilor",
        difficulty: "usor",
        statement: "Calculați: 2 · (3 + 5²) − 12 : 4.",
        steps: [
          "Efectuăm mai întâi puterea: 5² = 25.",
          "Calculăm paranteza: 3 + 25 = 28.",
          "Apoi înmulțirea și împărțirea: 2 · 28 = 56 și 12 : 4 = 3.",
          "La final, scăderea: 56 − 3 = 53.",
        ],
        answer: "53",
      },
      {
        id: "v-2",
        topic: "Fracții ordinare",
        difficulty: "mediu",
        statement: "Adunați fracțiile: 2/3 + 3/4.",
        steps: [
          "Aflăm cel mai mic multiplu comun al numitorilor 3 și 4: c.m.m.m.c.(3, 4) = 12.",
          "Aducem fracțiile la același numitor: $\\frac{2}{3}=\\frac{8}{12}$ și $\\frac{3}{4}=\\frac{9}{12}$.",
          "Adunăm numărătorii: 8/12 + 9/12 = 17/12.",
          "Scriem rezultatul ca fracție mixtă: 17/12 = 1 și 5/12.",
        ],
        answer: "17/12 = 1 5/12",
      },
      {
        id: "v-3",
        topic: "Fracții zecimale",
        difficulty: "usor",
        statement: "Calculați: 0,25 + 1,4 − 0,05.",
        steps: [
          "Adunăm primele două zecimale: 0,25 + 1,4 = 1,65.",
          "Scădem: 1,65 − 0,05 = 1,60.",
        ],
        answer: "1,6",
      },
      {
        id: "v-4",
        topic: "Divizibilitate",
        difficulty: "mediu",
        statement: "Care este cel mai mare număr natural de două cifre divizibil cu 9?",
        steps: [
          "Numerele de două cifre ajung până la 99.",
          "Verificăm: 99 : 9 = 11, împărțire exactă, deci 99 se divide cu 9.",
          "(Criteriu: suma cifrelor 9 + 9 = 18 se divide cu 9.)",
        ],
        answer: "99",
      },
      {
        id: "v-5",
        topic: "Metoda mersului invers",
        difficulty: "mediu",
        statement: "M-am gândit la un număr, l-am înmulțit cu 3, am adăugat 7 și am obținut 34. La ce număr m-am gândit?",
        steps: [
          "Pornim de la rezultat și mergem invers. Ultima operație a fost „+7”, deci o anulăm: 34 − 7 = 27.",
          "Înainte s-a înmulțit cu 3, deci împărțim: 27 : 3 = 9.",
          "Verificare: 9 · 3 + 7 = 27 + 7 = 34. ✓",
        ],
        answer: "9",
      },
      {
        id: "v-6",
        topic: "Unghiuri",
        difficulty: "usor",
        statement: "Două unghiuri sunt suplementare. Unul măsoară 65°. Cât are celălalt?",
        steps: [
          "Unghiurile suplementare au suma măsurilor de 180°.",
          "Celălalt unghi: 180° − 65° = 115°.",
        ],
        answer: "115°",
      },
      {
        id: "v-7",
        topic: "Puteri",
        difficulty: "usor",
        statement: "Calculați: 3⁴.",
        steps: [
          "Puterea înseamnă înmulțire repetată: 3⁴ = 3 · 3 · 3 · 3.",
          "3 · 3 = 9; 9 · 3 = 27; 27 · 3 = 81.",
        ],
        answer: "81",
      },
      {
        id: "v-8",
        topic: "Unități de măsură",
        difficulty: "mediu",
        statement: "Transformați 2,5 km în metri și 350 cm în metri.",
        steps: [
          "1 km = 1000 m, deci 2,5 km = 2,5 · 1000 = 2500 m.",
          "1 m = 100 cm, deci 350 cm = 350 : 100 = 3,5 m.",
        ],
        answer: "2500 m și 3,5 m",
      },
      {
        id: "v-9",
        topic: "Fracții ordinare",
        difficulty: "mediu",
        statement: "Comparați fracțiile 3/5 și 5/8.",
        steps: [
          "Aducem la același numitor. c.m.m.m.c.(5, 8) = 40.",
          "$\\frac{3}{5}=\\frac{24}{40}$ și $\\frac{5}{8}=\\frac{25}{40}$.",
          "Cum 24 < 25, rezultă 3/5 < 5/8.",
        ],
        answer: "3/5 < 5/8",
      },
      {
        id: "v-10",
        topic: "Fracții zecimale",
        difficulty: "usor",
        statement: "Calculați: 1,2 · 0,5.",
        steps: [
          "Înmulțim fără virgulă: 12 · 5 = 60.",
          "Numărul total de zecimale este 2 (una din 1,2 și una din 0,5), deci punem virgula: 0,60 = 0,6.",
        ],
        answer: "0,6",
      },
      {
        id: "v-11",
        topic: "Fracții ordinare",
        difficulty: "mediu",
        statement: "Un elev a citit 2/5 dintr-o carte de 200 de pagini. Câte pagini a citit și câte i-au rămas?",
        steps: [
          "2/5 din 200 = (200 : 5) · 2 = 40 · 2 = 80 de pagini citite.",
          "Pagini rămase: 200 − 80 = 120.",
        ],
        answer: "80 de pagini citite, 120 rămase",
      },
      {
        id: "v-12",
        topic: "Unghiuri",
        difficulty: "usor",
        statement: "Două unghiuri sunt complementare. Unul are 32°. Cât are celălalt?",
        steps: [
          "Unghiurile complementare au suma măsurilor de 90°.",
          "Celălalt unghi: 90° − 32° = 58°.",
        ],
        answer: "58°",
      },
      {
        id: "v-13",
        topic: "Numere naturale",
        difficulty: "dificil",
        statement: "Suma a două numere naturale este 45, iar diferența lor este 11. Aflați numerele.",
        steps: [
          "Numărul mai mare = (sumă + diferență) : 2 = (45 + 11) : 2 = 56 : 2 = 28.",
          "Numărul mai mic = 45 − 28 = 17.",
          "Verificare: 28 + 17 = 45 și 28 − 17 = 11. ✓",
        ],
        answer: "28 și 17",
      },
    ],
    faq: [
      {
        q: "Ce se învață la matematică în clasa a V-a?",
        a: "Numere naturale și ordinea operațiilor, puteri, criterii de divizibilitate, fracții ordinare și zecimale, unități de măsură și primele elemente de geometrie (drepte, unghiuri).",
      },
      {
        q: "Cum se calculează ordinea operațiilor?",
        a: "Întâi parantezele, apoi puterile (ridicările la putere), apoi înmulțirile și împărțirile (de la stânga la dreapta) și, la final, adunările și scăderile.",
      },
      {
        q: "Ce înseamnă metoda mersului invers?",
        a: "Pornești de la rezultatul final și anulezi pe rând operațiile (scădere în loc de adunare, împărțire în loc de înmulțire) până ajungi la numărul necunoscut.",
      },
    ],
    updatedAt: "2026-09-16",
  },

  // ─────────────────────────── CLASA a VI-a ──────────────────────────
  {
    grade: 6,
    slug: "clasa-6",
    label: "Clasa a VI-a",
    roman: "VI",
    cycle: "Gimnaziu",
    examBadge: null,
    examContext: "Rapoarte, proporții, procente și introducerea numerelor întregi.",
    icon: "6️⃣",
    metaTitle: "Probleme de matematică clasa a VI-a, rezolvate pas cu pas",
    metaDescription:
      "Probleme rezolvate de matematică pentru clasa a VI-a: c.m.m.d.c. și c.m.m.m.c., rapoarte și proporții, procente, numere întregi și geometria triunghiului.",
    intro: [
      "În clasa a VI-a matematica devine mai abstractă: apar numerele întregi (cu semn), rapoartele și proporțiile, procentele și divizibilitatea aprofundată prin c.m.m.d.c. și c.m.m.m.c. La geometrie se studiază triunghiul, congruența și liniile importante.",
      "Aceste noțiuni sunt fundamentul pentru algebra din clasele următoare. Problemele de mai jos acoperă capitolele esențiale, cu rezolvări complete și verificări acolo unde este util.",
    ],
    topics: [
      "c.m.m.d.c. și c.m.m.m.c.",
      "Rapoarte și proporții",
      "Procente",
      "Numere întregi",
      "Numere raționale",
      "Triunghiul și unghiurile",
    ],
    exercises: [
      {
        id: "vi-1",
        topic: "c.m.m.d.c. și c.m.m.m.c.",
        difficulty: "mediu",
        statement: "Aflați c.m.m.d.c. și c.m.m.m.c. pentru numerele 12 și 18.",
        steps: [
          "Descompunem în factori primi: 12 = 2² · 3 și 18 = 2 · 3².",
          "c.m.m.d.c. = produsul factorilor comuni luați la puterea cea mai mică: 2 · 3 = 6.",
          "c.m.m.m.c. = produsul tuturor factorilor luați la puterea cea mai mare: 2² · 3² = 4 · 9 = 36.",
        ],
        answer: "c.m.m.d.c. = 6 și c.m.m.m.c. = 36",
      },
      {
        id: "vi-2",
        topic: "Proporții",
        difficulty: "mediu",
        statement: "Dacă 4 caiete costă 20 de lei, cât costă 7 caiete de același fel?",
        steps: [
          "Aflăm prețul unui caiet: 20 : 4 = 5 lei.",
          "Pentru 7 caiete: 7 · 5 = 35 lei.",
          "(Mărimi direct proporționale: cu cât mai multe caiete, cu atât mai mult cost.)",
        ],
        answer: "35 de lei",
      },
      {
        id: "vi-3",
        topic: "Procente",
        difficulty: "usor",
        statement: "Cât reprezintă 15% din 240?",
        steps: [
          "Scriem procentul ca fracție: 15% = 15/100 = 0,15.",
          "Înmulțim: 0,15 · 240 = 36.",
        ],
        answer: "36",
      },
      {
        id: "vi-4",
        topic: "Numere întregi",
        difficulty: "mediu",
        statement: "Calculați: (−7) + 12 − (−5).",
        steps: [
          "Adunăm primii doi termeni: −7 + 12 = 5.",
          "Scăderea unui număr negativ devine adunare: 5 − (−5) = 5 + 5 = 10.",
        ],
        answer: "10",
      },
      {
        id: "vi-5",
        topic: "Triunghiul",
        difficulty: "mediu",
        statement: "Într-un triunghi, două unghiuri au măsurile de 47° și 68°. Cât măsoară al treilea unghi?",
        steps: [
          "Suma măsurilor unghiurilor unui triunghi este 180°.",
          "Adunăm cele două unghiuri cunoscute: 47° + 68° = 115°.",
          "Al treilea unghi: 180° − 115° = 65°.",
        ],
        answer: "65°",
      },
      {
        id: "vi-6",
        topic: "Rapoarte",
        difficulty: "dificil",
        statement: "Două numere sunt în raportul 3 : 5, iar suma lor este 64. Aflați numerele.",
        steps: [
          "Notăm numerele cu 3k și 5k (k = valoarea unei „părți”).",
          "Suma: 3k + 5k = 8k = 64, deci k = 64 : 8 = 8.",
          "Numerele sunt: 3 · 8 = 24 și 5 · 8 = 40.",
          "Verificare: 24 + 40 = 64 și 24 : 40 = 3 : 5. ✓",
        ],
        answer: "24 și 40",
      },
      {
        id: "vi-7",
        topic: "Numere raționale",
        difficulty: "mediu",
        statement: "Calculați: −3/4 + 1/2.",
        steps: [
          "Aducem la același numitor: $\\frac{1}{2}=\\frac{2}{4}$.",
          "$-\\frac{3}{4}+\\frac{2}{4}=-\\frac{1}{4}$.",
        ],
        answer: "−1/4",
      },
      {
        id: "vi-8",
        topic: "Procente",
        difficulty: "mediu",
        statement: "30% dintr-un număr este 45. Care este numărul?",
        steps: [
          "Scriem procentul ca zecimală: 30% = 0,3.",
          "Dacă 0,3 · x = 45, atunci x = 45 : 0,3 = 150.",
        ],
        answer: "150",
      },
      {
        id: "vi-9",
        topic: "Numere întregi",
        difficulty: "mediu",
        statement: "Calculați: (−4) · 5 + (−3) · (−6).",
        steps: [
          "(−4) · 5 = −20 (produsul a două numere de semne diferite este negativ).",
          "(−3) · (−6) = 18 (produsul a două numere negative este pozitiv).",
          "−20 + 18 = −2.",
        ],
        answer: "−2",
      },
      {
        id: "vi-10",
        topic: "Proporționalitate inversă",
        difficulty: "dificil",
        statement: "3 muncitori termină o lucrare în 8 zile. În câte zile o termină 4 muncitori, în același ritm?",
        steps: [
          "Numărul de muncitori și numărul de zile sunt invers proporționale: produsul lor este constant.",
          "3 · 8 = 24 (muncitori · zile).",
          "Pentru 4 muncitori: 24 : 4 = 6 zile.",
        ],
        answer: "6 zile",
      },
      {
        id: "vi-11",
        topic: "Divizibilitate",
        difficulty: "usor",
        statement: "Scrieți toți divizorii numărului 12.",
        steps: [
          "Căutăm numerele care împart exact 12.",
          "Acestea sunt: 1, 2, 3, 4, 6 și 12.",
        ],
        answer: "1, 2, 3, 4, 6, 12",
      },
      {
        id: "vi-12",
        topic: "Triunghiul",
        difficulty: "mediu",
        statement: "Într-un triunghi isoscel, unghiul de la vârf are 40°. Cât măsoară unghiurile de la bază?",
        steps: [
          "Într-un triunghi isoscel, unghiurile de la bază sunt egale.",
          "Suma unghiurilor este 180°, deci unghiurile bazei însumează 180° − 40° = 140°.",
          "Fiecare unghi de la bază: 140° : 2 = 70°.",
        ],
        answer: "70° fiecare",
      },
      {
        id: "vi-13",
        topic: "Proporții",
        difficulty: "mediu",
        statement: "Aflați x din proporția x/6 = 10/15.",
        steps: [
          "Într-o proporție, produsul extremilor este egal cu produsul mezilor: 15 · x = 6 · 10.",
          "15x = 60, deci x = 60 : 15 = 4.",
        ],
        answer: "x = 4",
      },
    ],
    faq: [
      {
        q: "Care este diferența dintre c.m.m.d.c. și c.m.m.m.c.?",
        a: "c.m.m.d.c. (cel mai mare divizor comun) este cel mai mare număr care divide ambele numere; c.m.m.m.c. (cel mai mic multiplu comun) este cel mai mic număr care este multiplu al ambelor. Se află din descompunerea în factori primi.",
      },
      {
        q: "Cum se rezolvă o problemă cu procente?",
        a: "Transformi procentul în fracție (p% = p/100) și îl înmulțești cu întregul. De exemplu, 15% din 240 = 0,15 · 240 = 36.",
      },
      {
        q: "Cum aduni numere întregi cu semne diferite?",
        a: "Scazi valorile absolute și păstrezi semnul numărului cu valoarea absolută mai mare. Scăderea unui număr negativ se transformă în adunarea opusului.",
      },
    ],
    updatedAt: "2026-09-16",
  },

  // ─────────────────────────── CLASA a VII-a ─────────────────────────
  {
    grade: 7,
    slug: "clasa-7",
    label: "Clasa a VII-a",
    roman: "VII",
    cycle: "Gimnaziu",
    examBadge: null,
    examContext: "Calcul algebric, ecuații, Teorema lui Pitagora și asemănare.",
    icon: "7️⃣",
    metaTitle: "Probleme de matematică clasa a VII-a, rezolvate pas cu pas",
    metaDescription:
      "Probleme rezolvate de matematică pentru clasa a VII-a: radicali, calcul algebric, ecuații de gradul I, Teorema lui Pitagora, asemănarea triunghiurilor și arii.",
    intro: [
      "Clasa a VII-a introduce numerele reale și radicalii, calculul algebric cu formule (produse remarcabile) și ecuațiile de gradul I. La geometrie apar două teoreme fundamentale: Teorema lui Pitagora și teorema fundamentală a asemănării (Thales).",
      "Este anul în care matematica devine cu adevărat „algebrică”. Stăpânirea acestor capitole este esențială pentru clasa a VIII-a și pentru Evaluarea Națională. Problemele de mai jos exersează exact aceste competențe.",
    ],
    topics: [
      "Numere reale și radicali",
      "Calcul algebric (produse remarcabile)",
      "Ecuații de gradul I",
      "Teorema lui Pitagora",
      "Asemănare (teorema lui Thales)",
      "Arii de patrulatere",
    ],
    exercises: [
      {
        id: "vii-1",
        topic: "Ecuații de gradul I",
        difficulty: "usor",
        statement: "Rezolvați ecuația: 3x − 7 = 11.",
        steps: [
          "Trecem termenul liber în dreapta: 3x = 11 + 7 = 18.",
          "Împărțim la coeficientul lui x: x = 18 : 3 = 6.",
          "Verificare: 3 · 6 − 7 = 18 − 7 = 11. ✓",
        ],
        answer: "x = 6",
      },
      {
        id: "vii-2",
        topic: "Radicali",
        difficulty: "mediu",
        statement: "Calculați: √50 − √8.",
        steps: [
          "Scoatem factorii de sub radical: $\\sqrt{50}=\\sqrt{25\\cdot 2}=5\\sqrt{2}$.",
          "La fel: $\\sqrt{8}=\\sqrt{4\\cdot 2}=2\\sqrt{2}$.",
          "Scădem radicalii asemenea: 5√2 − 2√2 = 3√2.",
        ],
        answer: "3√2",
      },
      {
        id: "vii-3",
        topic: "Produse remarcabile",
        difficulty: "mediu",
        statement: "Dezvoltați: (x + 3)².",
        steps: [
          "Aplicăm formula pătratului unei sume: $(a+b)^2=a^2+2ab+b^2$.",
          "Cu a = x și b = 3: x² + 2 · x · 3 + 3².",
          "Obținem: x² + 6x + 9.",
        ],
        answer: "x² + 6x + 9",
      },
      {
        id: "vii-4",
        topic: "Teorema lui Pitagora",
        difficulty: "mediu",
        statement: "Un triunghi dreptunghic are catetele de 6 cm și 8 cm. Cât este ipotenuza?",
        steps: [
          "Teorema lui Pitagora: ipotenuza² = catetă² + catetă².",
          "$i^2 = 6^2 + 8^2 = 36 + 64 = 100$.",
          "i = √100 = 10 cm.",
        ],
        answer: "10 cm",
      },
      {
        id: "vii-5",
        topic: "Asemănare (Thales)",
        difficulty: "dificil",
        statement: "În triunghiul ABC, o dreaptă paralelă cu BC taie latura AB în M și latura AC în N. Dacă AM = 4, MB = 6 și AN = 6, aflați NC.",
        steps: [
          "Teorema fundamentală a asemănării (Thales) dă proporția: AM/MB = AN/NC.",
          "Înlocuim: 4/6 = 6/NC.",
          "Din proporție (produsul mezilor = produsul extremilor): 4 · NC = 6 · 6 = 36.",
          "NC = 36 : 4 = 9.",
        ],
        answer: "NC = 9",
      },
      {
        id: "vii-6",
        topic: "Arii",
        difficulty: "usor",
        statement: "Aflați aria unui dreptunghi cu lungimea de 12 cm și lățimea de 5 cm.",
        steps: [
          "Aria dreptunghiului: A = lungime · lățime.",
          "A = 12 · 5 = 60 cm².",
        ],
        answer: "60 cm²",
      },
      {
        id: "vii-7",
        topic: "Produse remarcabile",
        difficulty: "mediu",
        statement: "Calculați rapid, folosind o formulă: 101 · 99.",
        steps: [
          "Observăm că 101 = 100 + 1 și 99 = 100 − 1.",
          "Aplicăm $(a-b)(a+b)=a^2-b^2$: 101 · 99 = 100² − 1².",
          "= 10000 − 1 = 9999.",
        ],
        answer: "9999",
      },
      {
        id: "vii-8",
        topic: "Ecuații de gradul I",
        difficulty: "mediu",
        statement: "Rezolvați ecuația: 2(x − 3) = x + 4.",
        steps: [
          "Desfacem paranteza: 2x − 6 = x + 4.",
          "Grupăm termenii cu x în stânga și restul în dreapta: 2x − x = 4 + 6.",
          "x = 10.",
        ],
        answer: "x = 10",
      },
      {
        id: "vii-9",
        topic: "Radicali",
        difficulty: "usor",
        statement: "Calculați: √144 + √25.",
        steps: [
          "√144 = 12 (deoarece 12² = 144).",
          "√25 = 5 (deoarece 5² = 25).",
          "12 + 5 = 17.",
        ],
        answer: "17",
      },
      {
        id: "vii-10",
        topic: "Teorema lui Pitagora",
        difficulty: "mediu",
        statement: "Un triunghi dreptunghic are ipotenuza de 13 cm și o catetă de 5 cm. Aflați cealaltă catetă.",
        steps: [
          "Din teorema lui Pitagora: catetă² = ipotenuză² − catetă².",
          "= 13² − 5² = 169 − 25 = 144.",
          "Cateta = √144 = 12 cm.",
        ],
        answer: "12 cm",
      },
      {
        id: "vii-11",
        topic: "Arii",
        difficulty: "mediu",
        statement: "Aflați aria unui triunghi cu baza de 10 cm și înălțimea de 6 cm.",
        steps: [
          "Aria triunghiului: $A=\\dfrac{b\\cdot h}{2}$.",
          "A = (10 · 6) : 2 = 60 : 2 = 30 cm².",
        ],
        answer: "30 cm²",
      },
      {
        id: "vii-12",
        topic: "Produse remarcabile",
        difficulty: "mediu",
        statement: "Descompuneți în factori: 6x² + 9x.",
        steps: [
          "Căutăm factorul comun al termenilor 6x² și 9x: acesta este 3x.",
          "6x² + 9x = 3x(2x + 3).",
        ],
        answer: "3x(2x + 3)",
      },
      {
        id: "vii-13",
        topic: "Radicali",
        difficulty: "dificil",
        statement: "Ordonați crescător numerele: 2√3, 3√2 și 4.",
        steps: [
          "Introducem factorii sub radical: 2√3 = √(4·3) = √12 și 3√2 = √(9·2) = √18.",
          "Scriem și 4 ca radical: 4 = √16.",
          "Comparăm radicalii (cu cât numărul de sub radical e mai mare, cu atât radicalul e mai mare): √12 < √16 < √18.",
          "Deci ordinea crescătoare este: 2√3 < 4 < 3√2.",
        ],
        answer: "2√3 < 4 < 3√2",
      },
    ],
    faq: [
      {
        q: "Când se aplică Teorema lui Pitagora?",
        a: "Numai în triunghiul dreptunghic. Relația este: pătratul ipotenuzei (latura cea mai lungă, opusă unghiului drept) este egal cu suma pătratelor celor două catete.",
      },
      {
        q: "Ce spune teorema lui Thales?",
        a: "O paralelă la una dintre laturile unui triunghi determină pe celelalte două laturi segmente proporționale. Ea stă la baza asemănării triunghiurilor.",
      },
      {
        q: "Cum se scot factorii de sub radical?",
        a: "Descompui numărul de sub radical într-un produs în care un factor este pătrat perfect, apoi îl scoți: √50 = √(25·2) = 5√2.",
      },
    ],
    updatedAt: "2026-09-16",
  },

  // ─────────────────────────── CLASA a VIII-a ────────────────────────
  {
    grade: 8,
    slug: "clasa-8",
    label: "Clasa a VIII-a",
    roman: "VIII",
    cycle: "Gimnaziu",
    examBadge: "Evaluarea Națională",
    examContext: "Anul Evaluării Naționale — algebră, funcții și geometrie în spațiu.",
    icon: "8️⃣",
    metaTitle: "Probleme matematică clasa a VIII-a – pregătire Evaluarea Națională",
    metaDescription:
      "Probleme rezolvate de matematică pentru clasa a VIII-a și Evaluarea Națională: sisteme de ecuații, funcția de gradul I, descompuneri și geometrie în spațiu (volume, arii).",
    intro: [
      "Clasa a VIII-a se încheie cu Evaluarea Națională, examenul care decide repartizarea la liceu. La matematică se recapitulează și se aprofundează algebra (calcul cu numere reale, descompuneri, ecuații, inecuații, sisteme și funcția de gradul I) și se studiază geometria în spațiu: prisma, piramida, cilindrul, conul și sfera.",
      "Problemele de tip Evaluarea Națională combină de obicei un calcul algebric cu o aplicație geometrică. Exercițiile de mai jos acoperă tocmai aceste tipuri, cu rezolvări complete, astfel încât să te antrenezi eficient pentru examen.",
    ],
    topics: [
      "Numere reale și calcul algebric",
      "Descompuneri în factori",
      "Funcția de gradul I",
      "Ecuații, inecuații și sisteme",
      "Geometrie în spațiu: volume și arii",
    ],
    exercises: [
      {
        id: "viii-1",
        topic: "Sisteme de ecuații",
        difficulty: "mediu",
        statement: "Rezolvați sistemul: x + y = 10 și x − y = 4.",
        steps: [
          "Adunăm cele două ecuații membru cu membru: (x + y) + (x − y) = 10 + 4, adică 2x = 14.",
          "De aici x = 7.",
          "Înlocuim în prima ecuație: 7 + y = 10, deci y = 3.",
          "Verificare: 7 − 3 = 4. ✓",
        ],
        answer: "x = 7, y = 3",
      },
      {
        id: "viii-2",
        topic: "Funcția de gradul I",
        difficulty: "mediu",
        statement: "Fie funcția f(x) = 2x − 3. Calculați f(0) și f(4) și aflați unde intersectează graficul axa Ox.",
        steps: [
          "f(0) = 2 · 0 − 3 = −3.",
          "f(4) = 2 · 4 − 3 = 8 − 3 = 5.",
          "Graficul taie axa Ox unde f(x) = 0: 2x − 3 = 0, deci x = 3/2 = 1,5.",
          "Punctul de intersecție cu Ox este (1,5 ; 0).",
        ],
        answer: "f(0) = −3, f(4) = 5, intersecție cu Ox în (1,5 ; 0)",
      },
      {
        id: "viii-3",
        topic: "Geometrie în spațiu",
        difficulty: "usor",
        statement: "Aflați volumul unui cub cu muchia de 5 cm.",
        steps: [
          "Volumul cubului: V = l³ (muchia la puterea a treia).",
          "V = 5³ = 125 cm³.",
        ],
        answer: "125 cm³",
      },
      {
        id: "viii-4",
        topic: "Geometrie în spațiu",
        difficulty: "mediu",
        statement: "O piramidă are aria bazei de 24 cm² și înălțimea de 10 cm. Aflați volumul.",
        steps: [
          "Volumul piramidei: $V=\\dfrac{A_{\\text{bază}}\\cdot h}{3}$.",
          "V = (24 · 10) : 3 = 240 : 3 = 80 cm³.",
        ],
        answer: "80 cm³",
      },
      {
        id: "viii-5",
        topic: "Descompuneri în factori",
        difficulty: "mediu",
        statement: "Descompuneți în factori: x² − 9.",
        steps: [
          "Recunoaștem o diferență de pătrate: $a^2-b^2=(a-b)(a+b)$.",
          "Aici x² − 9 = x² − 3².",
          "Deci x² − 9 = (x − 3)(x + 3).",
        ],
        answer: "(x − 3)(x + 3)",
      },
      {
        id: "viii-6",
        topic: "Geometrie în spațiu",
        difficulty: "dificil",
        statement: "Un cilindru are raza bazei de 3 cm și înălțimea de 10 cm. Aflați volumul (în funcție de π și aproximativ).",
        steps: [
          "Volumul cilindrului: $V=\\pi r^2 h$.",
          "V = π · 3² · 10 = π · 9 · 10 = 90π cm³.",
          "Aproximativ, cu π ≈ 3,14: 90 · 3,14 ≈ 282,6 cm³.",
        ],
        answer: "90π cm³ ≈ 282,6 cm³",
      },
      {
        id: "viii-7",
        topic: "Inecuații",
        difficulty: "mediu",
        statement: "Rezolvați inecuația: 2x − 3 ≤ 7.",
        steps: [
          "Adunăm 3 în ambii membri: 2x ≤ 10.",
          "Împărțim la 2: x ≤ 5.",
          "Soluția: x ∈ (−∞ ; 5].",
        ],
        answer: "x ≤ 5",
      },
      {
        id: "viii-8",
        topic: "Numere reale",
        difficulty: "mediu",
        statement: "Calculați: √50 · √2.",
        steps: [
          "Produsul radicalilor: √50 · √2 = √(50 · 2) = √100.",
          "√100 = 10.",
        ],
        answer: "10",
      },
      {
        id: "viii-9",
        topic: "Geometrie în spațiu",
        difficulty: "mediu",
        statement: "Aflați volumul unui paralelipiped dreptunghic cu dimensiunile 4 cm, 5 cm și 6 cm.",
        steps: [
          "Volumul paralelipipedului: V = L · l · h.",
          "V = 4 · 5 · 6 = 120 cm³.",
        ],
        answer: "120 cm³",
      },
      {
        id: "viii-10",
        topic: "Geometrie în spațiu",
        difficulty: "dificil",
        statement: "Un con are raza bazei de 6 cm și înălțimea de 8 cm. Aflați generatoarea și volumul (în funcție de π).",
        steps: [
          "Generatoarea (din teorema lui Pitagora): $g=\\sqrt{R^2+h^2}=\\sqrt{36+64}=\\sqrt{100}=10$ cm.",
          "Volumul conului: $V=\\dfrac{\\pi R^2 h}{3}=\\dfrac{\\pi\\cdot 36\\cdot 8}{3}=\\dfrac{288\\pi}{3}=96\\pi$ cm³.",
        ],
        answer: "g = 10 cm; V = 96π cm³",
      },
      {
        id: "viii-11",
        topic: "Funcția de gradul I",
        difficulty: "mediu",
        statement: "Fie f(x) = −x + 2. Calculați f(−1) și f(3) și precizați dacă funcția este crescătoare sau descrescătoare.",
        steps: [
          "f(−1) = −(−1) + 2 = 1 + 2 = 3.",
          "f(3) = −3 + 2 = −1.",
          "Coeficientul lui x este −1 (negativ), deci funcția este descrescătoare.",
        ],
        answer: "f(−1) = 3, f(3) = −1; descrescătoare",
      },
      {
        id: "viii-12",
        topic: "Descompuneri în factori",
        difficulty: "mediu",
        statement: "Descompuneți în factori: x² + 5x + 6.",
        steps: [
          "Căutăm două numere cu suma 5 și produsul 6: acestea sunt 2 și 3.",
          "x² + 5x + 6 = (x + 2)(x + 3).",
        ],
        answer: "(x + 2)(x + 3)",
      },
      {
        id: "viii-13",
        topic: "Geometrie în spațiu",
        difficulty: "dificil",
        statement: "Un cub are muchia de 4 cm. Aflați aria totală și volumul.",
        steps: [
          "Aria totală a cubului (6 fețe pătrate): A = 6 · l² = 6 · 4² = 6 · 16 = 96 cm².",
          "Volumul: V = l³ = 4³ = 64 cm³.",
        ],
        answer: "A totală = 96 cm²; V = 64 cm³",
      },
    ],
    faq: [
      {
        q: "Ce se dă la matematică la Evaluarea Națională?",
        a: "Subiectul acoperă materia de gimnaziu (mai ales clasele VII–VIII): calcul cu numere reale, ecuații și inecuații, funcția de gradul I, elemente de geometrie plană și geometrie în spațiu (volume și arii ale corpurilor).",
      },
      {
        q: "Cum se rezolvă un sistem de două ecuații?",
        a: "Prin metoda reducerii (aduni sau scazi ecuațiile ca să elimini o necunoscută) sau prin metoda substituției (exprimi o necunoscută și o înlocuiești în cealaltă ecuație).",
      },
      {
        q: "Care sunt formulele volumelor cerute în clasa a VIII-a?",
        a: "Cub: V = l³. Paralelipiped: V = L · l · h. Prismă/cilindru: V = A_bază · h. Piramidă/con: V = (A_bază · h)/3. Sferă: V = (4/3)·π·R³.",
      },
    ],
    updatedAt: "2026-09-16",
  },

  // ─────────────────────────── CLASA a IX-a ──────────────────────────
  {
    grade: 9,
    slug: "clasa-9",
    label: "Clasa a IX-a",
    roman: "IX",
    cycle: "Liceu",
    examBadge: null,
    examContext: "Primul an de liceu — funcții, gradul II, vectori și trigonometrie.",
    icon: "9️⃣",
    metaTitle: "Probleme de matematică clasa a IX-a, rezolvate pas cu pas",
    metaDescription:
      "Probleme rezolvate de matematică pentru clasa a IX-a (liceu): funcția de gradul II, ecuații și inecuații, vectori, trigonometrie în triunghi și geometrie analitică.",
    intro: [
      "Clasa a IX-a deschide ciclul liceal și ridică nivelul de abstractizare: mulțimi și funcții (injectivitate, monotonie), funcția de gradul II cu parabola ei, ecuații și inecuații, vectori în plan, elemente de trigonometrie și geometrie analitică.",
      "Este anul care face trecerea de la geometria „cu figuri” la geometria „cu coordonate” și de la calculul numeric la gândirea funcțională. Problemele de mai jos exersează capitolele centrale ale programei de clasa a IX-a.",
    ],
    topics: [
      "Mulțimi și funcții",
      "Funcția de gradul II (parabola)",
      "Ecuații și inecuații",
      "Vectori în plan",
      "Trigonometrie în triunghiul dreptunghic",
      "Geometrie analitică",
    ],
    exercises: [
      {
        id: "ix-1",
        topic: "Funcția de gradul II",
        difficulty: "mediu",
        statement: "Aflați coordonatele vârfului parabolei f(x) = x² − 4x + 3.",
        steps: [
          "Identificăm coeficienții: a = 1, b = −4, c = 3.",
          "Abscisa vârfului: $x_V=-\\dfrac{b}{2a}=-\\dfrac{-4}{2}=2$.",
          "Ordonata: y_V = f(2) = 2² − 4·2 + 3 = 4 − 8 + 3 = −1.",
          "Vârful parabolei este V(2 ; −1).",
        ],
        answer: "V(2 ; −1)",
      },
      {
        id: "ix-2",
        topic: "Ecuația de gradul II",
        difficulty: "mediu",
        statement: "Rezolvați ecuația: x² − 5x + 6 = 0.",
        steps: [
          "Calculăm discriminantul: $\\Delta=b^2-4ac=(-5)^2-4\\cdot 1\\cdot 6=25-24=1$.",
          "Aplicăm formula: $x=\\dfrac{-b\\pm\\sqrt{\\Delta}}{2a}=\\dfrac{5\\pm 1}{2}$.",
          "x₁ = (5 + 1)/2 = 3 și x₂ = (5 − 1)/2 = 2.",
        ],
        answer: "x₁ = 3, x₂ = 2",
      },
      {
        id: "ix-3",
        topic: "Trigonometrie",
        difficulty: "mediu",
        statement: "Într-un triunghi dreptunghic, un unghi ascuțit are 30°, iar ipotenuza este 12 cm. Aflați cateta opusă acestui unghi.",
        steps: [
          "Sinusul unghiului = cateta opusă / ipotenuză, deci cateta opusă = ipotenuză · sin(unghi).",
          "sin(30°) = 1/2.",
          "Cateta opusă = 12 · (1/2) = 6 cm.",
        ],
        answer: "6 cm",
      },
      {
        id: "ix-4",
        topic: "Vectori",
        difficulty: "dificil",
        statement: "Se dau vectorii u = (2, 3) și v = (−1, 4). Calculați u + v și 2u − v.",
        steps: [
          "Adunarea se face pe componente: u + v = (2 + (−1) , 3 + 4) = (1 , 7).",
          "Înmulțim u cu scalarul 2: 2u = (4 , 6).",
          "Scădem: 2u − v = (4 − (−1) , 6 − 4) = (5 , 2).",
        ],
        answer: "u + v = (1, 7); 2u − v = (5, 2)",
      },
      {
        id: "ix-5",
        topic: "Geometrie analitică",
        difficulty: "mediu",
        statement: "Se dau punctele A(1, 2) și B(7, 10). Aflați mijlocul segmentului AB și lungimea AB.",
        steps: [
          "Mijlocul: $M\\left(\\dfrac{x_A+x_B}{2},\\dfrac{y_A+y_B}{2}\\right)=M\\left(\\dfrac{1+7}{2},\\dfrac{2+10}{2}\\right)=M(4,6)$.",
          "Distanța: $AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}=\\sqrt{6^2+8^2}$.",
          "AB = √(36 + 64) = √100 = 10.",
        ],
        answer: "M(4, 6); AB = 10",
      },
      {
        id: "ix-6",
        topic: "Inecuații de gradul II",
        difficulty: "dificil",
        statement: "Rezolvați inecuația: x² − 4 < 0.",
        steps: [
          "Aflăm rădăcinile ecuației atașate x² − 4 = 0: (x − 2)(x + 2) = 0, deci x = −2 și x = 2.",
          "Coeficientul lui x² este pozitiv, deci parabola este „deschisă în sus”: expresia este negativă între rădăcini.",
          "Soluția inecuației este intervalul (−2, 2).",
        ],
        answer: "x ∈ (−2, 2)",
      },
      {
        id: "ix-7",
        topic: "Mulțimi și funcții",
        difficulty: "mediu",
        statement: "Fie A = {1, 2, 3, 4} și B = {3, 4, 5, 6}. Aflați A ∩ B și A ∪ B.",
        steps: [
          "Intersecția A ∩ B conține elementele comune: {3, 4}.",
          "Reuniunea A ∪ B conține toate elementele (fără repetare): {1, 2, 3, 4, 5, 6}.",
        ],
        answer: "A ∩ B = {3, 4}; A ∪ B = {1, 2, 3, 4, 5, 6}",
      },
      {
        id: "ix-8",
        topic: "Mulțimi și funcții",
        difficulty: "mediu",
        statement: "Fie f: ℝ → ℝ, f(x) = 3x + 1. Aflați funcția inversă f⁻¹.",
        steps: [
          "Notăm y = 3x + 1 și exprimăm x în funcție de y.",
          "3x = y − 1, deci x = (y − 1)/3.",
          "Schimbând notația: f⁻¹(x) = (x − 1)/3.",
        ],
        answer: "f⁻¹(x) = (x − 1)/3",
      },
      {
        id: "ix-9",
        topic: "Trigonometrie",
        difficulty: "mediu",
        statement: "Calculați: sin 30° + cos 60° + tg 45°.",
        steps: [
          "Valorile uzuale: sin 30° = 1/2, cos 60° = 1/2, tg 45° = 1.",
          "Suma: 1/2 + 1/2 + 1 = 2.",
        ],
        answer: "2",
      },
      {
        id: "ix-10",
        topic: "Funcția de gradul II",
        difficulty: "dificil",
        statement: "Aflați rădăcinile funcției f(x) = x² − x − 6 și intervalul pe care funcția este negativă.",
        steps: [
          "Discriminantul: Δ = (−1)² − 4·1·(−6) = 1 + 24 = 25.",
          "Rădăcinile: x = (1 ± 5)/2, deci x₁ = 3 și x₂ = −2.",
          "Cum a = 1 > 0, funcția este negativă între rădăcini: x ∈ (−2, 3).",
        ],
        answer: "rădăcini −2 și 3; negativă pe (−2, 3)",
      },
      {
        id: "ix-11",
        topic: "Vectori",
        difficulty: "mediu",
        statement: "Aflați lungimea (modulul) vectorului v = (3, −4).",
        steps: [
          "Modulul unui vector: $|\\vec{v}|=\\sqrt{x^2+y^2}$.",
          "$|\\vec{v}|=\\sqrt{3^2+(-4)^2}=\\sqrt{9+16}=\\sqrt{25}=5$.",
        ],
        answer: "|v| = 5",
      },
      {
        id: "ix-12",
        topic: "Geometrie analitică",
        difficulty: "dificil",
        statement: "Scrieți ecuația dreptei care trece prin punctele A(0, 1) și B(2, 5).",
        steps: [
          "Panta dreptei: m = (y_B − y_A)/(x_B − x_A) = (5 − 1)/(2 − 0) = 4/2 = 2.",
          "Ecuația are forma y = mx + n. Din A(0, 1): 1 = 2·0 + n, deci n = 1.",
          "Ecuația dreptei: y = 2x + 1.",
        ],
        answer: "y = 2x + 1",
      },
      {
        id: "ix-13",
        topic: "Ecuația de gradul II",
        difficulty: "mediu",
        statement: "Rezolvați ecuația: x² = 5x.",
        steps: [
          "Aducem toți termenii în stânga: x² − 5x = 0.",
          "Dăm factor comun: x(x − 5) = 0.",
          "Un produs este 0 dacă un factor este 0: x = 0 sau x = 5.",
        ],
        answer: "x₁ = 0, x₂ = 5",
      },
    ],
    faq: [
      {
        q: "Cum se află vârful unei parabole?",
        a: "Pentru f(x) = ax² + bx + c, abscisa vârfului este x_V = −b/(2a), iar ordonata y_V = f(x_V) = −Δ/(4a). Vârful este punctul de minim (dacă a > 0) sau de maxim (dacă a < 0).",
      },
      {
        q: "Ce este discriminantul unei ecuații de gradul II?",
        a: "Δ = b² − 4ac. Dacă Δ > 0 ecuația are două soluții reale, dacă Δ = 0 o soluție dublă, iar dacă Δ < 0 nu are soluții reale.",
      },
      {
        q: "Cum se adună doi vectori dați prin coordonate?",
        a: "Se adună componentă cu componentă: dacă u = (x₁, y₁) și v = (x₂, y₂), atunci u + v = (x₁ + x₂, y₁ + y₂).",
      },
    ],
    updatedAt: "2026-09-16",
  },

  // ─────────────────────────── CLASA a X-a ───────────────────────────
  {
    grade: 10,
    slug: "clasa-10",
    label: "Clasa a X-a",
    roman: "X",
    cycle: "Liceu",
    examBadge: null,
    examContext: "Logaritmi, combinatorică, probabilități și numere complexe.",
    icon: "🔟",
    metaTitle: "Probleme de matematică clasa a X-a, rezolvate pas cu pas",
    metaDescription:
      "Probleme rezolvate de matematică pentru clasa a X-a (liceu): puteri și radicali, logaritmi, ecuații exponențiale, combinatorică, probabilități și numere complexe.",
    intro: [
      "Clasa a X-a aduce capitole noi și puternice: funcția exponențială și funcția logaritmică (cu ecuațiile aferente), metode de numărare (combinatorică: permutări, aranjamente, combinări), probabilități și numerele complexe.",
      "Aceste teme apar constant la Bacalaureat și sunt indispensabile în clasele a XI-a și a XII-a. Problemele de mai jos exersează calculul cu logaritmi, combinări și module de numere complexe.",
    ],
    topics: [
      "Puteri și radicali",
      "Logaritmi",
      "Ecuații exponențiale și logaritmice",
      "Combinatorică",
      "Probabilități",
      "Numere complexe",
    ],
    exercises: [
      {
        id: "x-1",
        topic: "Ecuații exponențiale",
        difficulty: "mediu",
        statement: "Rezolvați ecuația: 2ˣ = 32.",
        steps: [
          "Scriem membrul drept ca putere a lui 2: 32 = 2⁵.",
          "Ecuația devine 2ˣ = 2⁵.",
          "Bazele fiind egale, egalăm exponenții: x = 5.",
        ],
        answer: "x = 5",
      },
      {
        id: "x-2",
        topic: "Logaritmi",
        difficulty: "mediu",
        statement: "Calculați: log₂ 8 + log₃ 9.",
        steps: [
          "log₂ 8: la ce putere ridicăm 2 ca să obținem 8? 2³ = 8, deci log₂ 8 = 3.",
          "log₃ 9: 3² = 9, deci log₃ 9 = 2.",
          "Suma: 3 + 2 = 5.",
        ],
        answer: "5",
      },
      {
        id: "x-3",
        topic: "Combinatorică",
        difficulty: "mediu",
        statement: "În câte moduri putem alege 2 elevi dintr-o grupă de 6 (ordinea nu contează)?",
        steps: [
          "Ordinea nu contează → folosim combinări: $C_6^2=\\dfrac{6!}{2!\\,(6-2)!}$.",
          "$C_6^2=\\dfrac{6\\cdot 5}{2\\cdot 1}=\\dfrac{30}{2}=15$.",
        ],
        answer: "15 moduri",
      },
      {
        id: "x-4",
        topic: "Probabilități",
        difficulty: "usor",
        statement: "Se aruncă un zar. Care este probabilitatea de a obține un număr par?",
        steps: [
          "Cazuri favorabile (numere pare): {2, 4, 6} → 3 cazuri.",
          "Cazuri posibile: {1, 2, 3, 4, 5, 6} → 6 cazuri.",
          "P = cazuri favorabile / cazuri posibile = 3/6 = 1/2.",
        ],
        answer: "1/2 (adică 50%)",
      },
      {
        id: "x-5",
        topic: "Numere complexe",
        difficulty: "dificil",
        statement: "Se dă z = 3 + 4i. Calculați modulul |z| și conjugatul lui z.",
        steps: [
          "Modulul: $|z|=\\sqrt{a^2+b^2}=\\sqrt{3^2+4^2}=\\sqrt{9+16}=\\sqrt{25}=5$.",
          "Conjugatul se obține schimbând semnul părții imaginare: z̄ = 3 − 4i.",
        ],
        answer: "|z| = 5; z̄ = 3 − 4i",
      },
      {
        id: "x-6",
        topic: "Radicali",
        difficulty: "usor",
        statement: "Calculați: √3 · √12.",
        steps: [
          "Produsul radicalilor: √3 · √12 = √(3 · 12) = √36.",
          "√36 = 6.",
        ],
        answer: "6",
      },
      {
        id: "x-7",
        topic: "Logaritmi",
        difficulty: "mediu",
        statement: "Rezolvați ecuația: log₂ x = 5.",
        steps: [
          "Trecem la forma exponențială: x = 2⁵.",
          "x = 32.",
        ],
        answer: "x = 32",
      },
      {
        id: "x-8",
        topic: "Combinatorică",
        difficulty: "mediu",
        statement: "În câte moduri pot fi așezate 4 persoane pe 4 scaune?",
        steps: [
          "Ordinea contează și folosim toate persoanele → permutări de 4.",
          "$P_4=4!=4\\cdot 3\\cdot 2\\cdot 1=24$.",
        ],
        answer: "24 de moduri",
      },
      {
        id: "x-9",
        topic: "Numere complexe",
        difficulty: "dificil",
        statement: "Calculați (2 + 3i) + (1 − i) și (2 + 3i)(1 − i).",
        steps: [
          "Suma (adunăm părțile reale și cele imaginare): (2 + 1) + (3 − 1)i = 3 + 2i.",
          "Produsul: 2·1 − 2i + 3i − 3i² = 2 + i − 3·(−1).",
          "Cum i² = −1: 2 + i + 3 = 5 + i.",
        ],
        answer: "3 + 2i; respectiv 5 + i",
      },
      {
        id: "x-10",
        topic: "Probabilități",
        difficulty: "usor",
        statement: "Dintr-o urnă cu 5 bile roșii și 3 albastre se extrage o bilă. Care este probabilitatea să fie roșie?",
        steps: [
          "Cazuri favorabile (bile roșii): 5. Cazuri posibile (total bile): 5 + 3 = 8.",
          "P = 5/8.",
        ],
        answer: "5/8",
      },
      {
        id: "x-11",
        topic: "Ecuații exponențiale",
        difficulty: "mediu",
        statement: "Rezolvați ecuația: 3^(x+1) = 27.",
        steps: [
          "Scriem 27 ca putere a lui 3: 27 = 3³.",
          "3^(x+1) = 3³ ⇒ x + 1 = 3.",
          "x = 2.",
        ],
        answer: "x = 2",
      },
      {
        id: "x-12",
        topic: "Combinatorică",
        difficulty: "dificil",
        statement: "Câte numere de 3 cifre distincte se pot forma cu cifrele 1, 2, 3, 4, 5?",
        steps: [
          "Ordinea contează, cifrele sunt distincte → aranjamente de 5 luate câte 3.",
          "$A_5^3=5\\cdot 4\\cdot 3=60$.",
        ],
        answer: "60 de numere",
      },
      {
        id: "x-13",
        topic: "Logaritmi",
        difficulty: "mediu",
        statement: "Calculați: log₁₀ 2 + log₁₀ 5.",
        steps: [
          "Proprietatea logaritmului: log a + log b = log(a · b).",
          "log 2 + log 5 = log(2 · 5) = log 10 = 1.",
        ],
        answer: "1",
      },
    ],
    faq: [
      {
        q: "Ce este un logaritm?",
        a: "log_a b este exponentul la care trebuie ridicată baza a pentru a obține b. De exemplu, log₂ 8 = 3 pentru că 2³ = 8. Condiții: a > 0, a ≠ 1, b > 0.",
      },
      {
        q: "Când folosesc aranjamente și când combinări?",
        a: "Aranjamentele (A) contează ordinea, combinările (C) nu. Dacă alegi o echipă unde rolul nu contează, folosești combinări; dacă alegi un clasament (locul 1, 2, 3), folosești aranjamente.",
      },
      {
        q: "Cum se calculează modulul unui număr complex?",
        a: "Pentru z = a + bi, modulul este |z| = √(a² + b²). Reprezintă distanța de la origine la punctul (a, b) în planul complex.",
      },
    ],
    updatedAt: "2026-09-16",
  },

  // ─────────────────────────── CLASA a XI-a ──────────────────────────
  {
    grade: 11,
    slug: "clasa-11",
    label: "Clasa a XI-a",
    roman: "XI",
    cycle: "Liceu",
    examBadge: null,
    examContext: "Matrici, determinanți și începutul analizei matematice (limite, derivate).",
    icon: "1️⃣1️⃣",
    metaTitle: "Probleme de matematică clasa a XI-a, rezolvate pas cu pas",
    metaDescription:
      "Probleme rezolvate de matematică pentru clasa a XI-a (liceu): matrici, determinanți, sisteme (Cramer), limite de funcții, derivate și studiul funcțiilor.",
    intro: [
      "Clasa a XI-a are două mari direcții: algebra liniară (matrici, determinanți, sisteme de ecuații rezolvate cu regula lui Cramer) și analiza matematică (limite de șiruri și de funcții, continuitate, derivate și studiul funcțiilor).",
      "Derivatele și studiul monotoniei/extremelor sunt printre cele mai importante instrumente din liceu și revin masiv la Bacalaureat. Problemele de mai jos acoperă atât partea de algebră liniară, cât și primii pași în analiză.",
    ],
    topics: [
      "Matrici",
      "Determinanți",
      "Sisteme de ecuații (Cramer)",
      "Limite de funcții",
      "Derivate",
      "Studiul funcțiilor (monotonie, extreme)",
    ],
    exercises: [
      {
        id: "xi-1",
        topic: "Determinanți",
        difficulty: "mediu",
        statement: "Calculați determinantul matricei A = ( (2, 3), (1, 4) ).",
        steps: [
          "Pentru o matrice 2×2, $\\det\\begin{pmatrix}a & b\\\\ c & d\\end{pmatrix}=ad-bc$.",
          "det(A) = 2 · 4 − 3 · 1 = 8 − 3 = 5.",
        ],
        answer: "5",
      },
      {
        id: "xi-2",
        topic: "Matrici",
        difficulty: "mediu",
        statement: "Calculați produsul matricelor ( (1, 2), (0, 1) ) · ( (3), (4) ).",
        steps: [
          "Înmulțim linia cu coloana. Prima linie: 1 · 3 + 2 · 4 = 3 + 8 = 11.",
          "A doua linie: 0 · 3 + 1 · 4 = 0 + 4 = 4.",
          "Rezultatul este matricea coloană ( (11), (4) ).",
        ],
        answer: "( (11), (4) )",
      },
      {
        id: "xi-3",
        topic: "Limite",
        difficulty: "mediu",
        statement: "Calculați limita: lim(x→2) (x² − 4)/(x − 2).",
        steps: [
          "Prin înlocuire directă obținem 0/0 — caz de nedeterminare.",
          "Factorizăm numărătorul: x² − 4 = (x − 2)(x + 2).",
          "Simplificăm cu (x − 2): $\\dfrac{(x-2)(x+2)}{x-2}=x+2$ (pentru x ≠ 2).",
          "lim(x→2) (x + 2) = 2 + 2 = 4.",
        ],
        answer: "4",
      },
      {
        id: "xi-4",
        topic: "Derivate",
        difficulty: "mediu",
        statement: "Calculați derivata funcției f(x) = x³ − 3x² + 2x − 5.",
        steps: [
          "Derivăm termen cu termen, folosind (xⁿ)′ = n·xⁿ⁻¹.",
          "(x³)′ = 3x²; (3x²)′ = 6x; (2x)′ = 2; derivata constantei este 0.",
          "f ′(x) = 3x² − 6x + 2.",
        ],
        answer: "f ′(x) = 3x² − 6x + 2",
      },
      {
        id: "xi-5",
        topic: "Studiul funcțiilor",
        difficulty: "dificil",
        statement: "Aflați punctul de extrem al funcției f(x) = x² − 6x + 5.",
        steps: [
          "Calculăm derivata: f ′(x) = 2x − 6.",
          "Punctele critice: f ′(x) = 0 → 2x − 6 = 0 → x = 3.",
          "Derivata a doua f ″(x) = 2 > 0, deci în x = 3 avem un punct de minim.",
          "Valoarea minimă: f(3) = 3² − 6·3 + 5 = 9 − 18 + 5 = −4.",
        ],
        answer: "punct de minim în (3 ; −4)",
      },
      {
        id: "xi-6",
        topic: "Sisteme (Cramer)",
        difficulty: "dificil",
        statement: "Rezolvați cu regula lui Cramer sistemul: 2x + y = 5 și x − y = 1.",
        steps: [
          "Determinantul sistemului: Δ = 2·(−1) − 1·1 = −2 − 1 = −3.",
          "Δₓ (înlocuim coloana lui x cu termenii liberi): 5·(−1) − 1·1 = −5 − 1 = −6, deci x = Δₓ/Δ = −6/−3 = 2.",
          "Δ_y (înlocuim coloana lui y): 2·1 − 5·1 = 2 − 5 = −3, deci y = Δ_y/Δ = −3/−3 = 1.",
          "Verificare: 2·2 + 1 = 5 și 2 − 1 = 1. ✓",
        ],
        answer: "x = 2, y = 1",
      },
      {
        id: "xi-7",
        topic: "Matrici",
        difficulty: "mediu",
        statement: "Fie A = ( (1, 2), (3, 4) ) și B = ( (0, 1), (2, 1) ). Calculați A + 2B.",
        steps: [
          "Înmulțim B cu scalarul 2: 2B = ( (0, 2), (4, 2) ).",
          "Adunăm element cu element: A + 2B = ( (1+0, 2+2), (3+4, 4+2) ).",
          "= ( (1, 4), (7, 6) ).",
        ],
        answer: "( (1, 4), (7, 6) )",
      },
      {
        id: "xi-8",
        topic: "Limite",
        difficulty: "mediu",
        statement: "Calculați: lim(x→∞) (3x² + 2x)/(x² − 1).",
        steps: [
          "Împărțim numărătorul și numitorul la x² (puterea dominantă): (3 + 2/x)/(1 − 1/x²).",
          "Când x → ∞, termenii 2/x și 1/x² tind la 0.",
          "Limita = 3/1 = 3.",
        ],
        answer: "3",
      },
      {
        id: "xi-9",
        topic: "Derivate",
        difficulty: "mediu",
        statement: "Calculați derivata funcției f(x) = (2x + 1)(x − 3).",
        steps: [
          "Desfacem produsul: f(x) = 2x² − 6x + x − 3 = 2x² − 5x − 3.",
          "Derivăm: f ′(x) = 4x − 5.",
        ],
        answer: "f ′(x) = 4x − 5",
      },
      {
        id: "xi-10",
        topic: "Determinanți",
        difficulty: "dificil",
        statement: "Calculați determinantul de ordinul 3, cu regula lui Sarrus, pentru matricea cu liniile (1, 2, 0), (0, 1, 3), (2, 0, 1).",
        steps: [
          "Sarrus — diagonalele principale: 1·1·1 + 2·3·2 + 0·0·0 = 1 + 12 + 0 = 13.",
          "Diagonalele secundare: 0·1·2 + 1·3·0 + 2·0·1 = 0.",
          "Determinantul = 13 − 0 = 13.",
        ],
        answer: "13",
      },
      {
        id: "xi-11",
        topic: "Derivate",
        difficulty: "dificil",
        statement: "Aflați ecuația tangentei la graficul funcției f(x) = x² în punctul de abscisă x₀ = 2.",
        steps: [
          "Punctul de tangență: f(2) = 4, deci (2, 4).",
          "Panta tangentei este derivata în x₀: f ′(x) = 2x, deci m = f ′(2) = 4.",
          "Tangenta: y − y₀ = m(x − x₀) ⇒ y − 4 = 4(x − 2) ⇒ y = 4x − 4.",
        ],
        answer: "y = 4x − 4",
      },
      {
        id: "xi-12",
        topic: "Studiul funcțiilor",
        difficulty: "mediu",
        statement: "Studiați monotonia funcției f(x) = x² − 4x folosind derivata.",
        steps: [
          "f ′(x) = 2x − 4.",
          "f ′(x) = 0 ⇒ x = 2.",
          "Pentru x < 2, f ′(x) < 0 (descrescătoare); pentru x > 2, f ′(x) > 0 (crescătoare).",
        ],
        answer: "descrescătoare pe (−∞, 2), crescătoare pe (2, ∞)",
      },
      {
        id: "xi-13",
        topic: "Studiul funcțiilor",
        difficulty: "dificil",
        statement: "Aflați intervalele de convexitate și concavitate ale funcției f(x) = x³ − 3x.",
        steps: [
          "Prima derivată: f ′(x) = 3x² − 3. A doua derivată: f ″(x) = 6x.",
          "f ″(x) = 0 ⇒ x = 0.",
          "Pentru x < 0, f ″ < 0 → concavă; pentru x > 0, f ″ > 0 → convexă. Punct de inflexiune în x = 0.",
        ],
        answer: "concavă pe (−∞, 0), convexă pe (0, ∞); inflexiune în 0",
      },
    ],
    faq: [
      {
        q: "Cum se calculează un determinant de ordinul 2?",
        a: "Pentru matricea ( (a, b), (c, d) ), determinantul este ad − bc (produsul diagonalei principale minus produsul diagonalei secundare).",
      },
      {
        q: "Ce înseamnă derivata unei funcții?",
        a: "Derivata măsoară viteza de variație a funcției (panta tangentei la grafic). Se calculează cu reguli: (xⁿ)′ = n·xⁿ⁻¹, derivata sumei este suma derivatelor, iar derivata constantei este 0.",
      },
      {
        q: "Cum aflu punctele de extrem?",
        a: "Rezolvi ecuația f ′(x) = 0 (puncte critice) și studiezi semnul derivatei: acolo unde derivata trece de la − la + ai minim, iar de la + la − ai maxim.",
      },
    ],
    updatedAt: "2026-09-16",
  },

  // ─────────────────────────── CLASA a XII-a ─────────────────────────
  {
    grade: 12,
    slug: "clasa-12",
    label: "Clasa a XII-a",
    roman: "XII",
    cycle: "Liceu",
    examBadge: "Bacalaureat",
    examContext: "Anul Bacalaureatului — structuri algebrice, polinoame și integrale.",
    icon: "1️⃣2️⃣",
    metaTitle: "Probleme matematică clasa a XII-a – pregătire Bacalaureat",
    metaDescription:
      "Probleme rezolvate de matematică pentru clasa a XII-a și Bacalaureat: primitive, integrala definită, aria subgraficului, polinoame și structuri algebrice (legi de compoziție).",
    intro: [
      "Clasa a XII-a este anul Bacalaureatului. La matematică se studiază structurile algebrice (legi de compoziție, grupuri, inele, corpuri), polinoamele și, în analiză, primitivele și integrala definită, cu aplicații la calculul ariilor.",
      "Integralele reprezintă adesea subiectul III de la Bacalaureat, iar structurile algebrice apar la subiectul II. Problemele de mai jos acoperă exact aceste tipuri, cu rezolvări complete pentru o pregătire eficientă.",
    ],
    topics: [
      "Structuri algebrice (legi de compoziție, grupuri)",
      "Polinoame",
      "Primitive (integrala nedefinită)",
      "Integrala definită",
      "Aplicații: aria subgraficului",
    ],
    exercises: [
      {
        id: "xii-1",
        topic: "Primitive",
        difficulty: "mediu",
        statement: "Aflați o primitivă a funcției f(x) = 3x² + 2x.",
        steps: [
          "Folosim regula $\\int x^n\\,dx=\\dfrac{x^{n+1}}{n+1}+C$.",
          "∫(3x² + 2x) dx = 3 · x³/3 + 2 · x²/2 + C.",
          "= x³ + x² + C.",
          "Verificare: (x³ + x²)′ = 3x² + 2x. ✓",
        ],
        answer: "F(x) = x³ + x² + C",
      },
      {
        id: "xii-2",
        topic: "Integrala definită",
        difficulty: "mediu",
        statement: "Calculați integrala definită a funcției 2x pe intervalul [0, 2].",
        steps: [
          "O primitivă a lui 2x este x².",
          "Aplicăm formula Leibniz–Newton: $\\int_0^2 2x\\,dx=\\big[x^2\\big]_0^2=2^2-0^2$.",
          "= 4 − 0 = 4.",
        ],
        answer: "4",
      },
      {
        id: "xii-3",
        topic: "Aria subgraficului",
        difficulty: "dificil",
        statement: "Aflați aria subgraficului funcției f(x) = x², între x = 0 și x = 3.",
        steps: [
          "Aria subgraficului unei funcții pozitive este $A=\\int_0^3 x^2\\,dx$.",
          "O primitivă a lui x² este x³/3.",
          "A = [x³/3] de la 0 la 3 = 3³/3 − 0 = 27/3 = 9.",
        ],
        answer: "9 (unități de arie)",
      },
      {
        id: "xii-4",
        topic: "Polinoame",
        difficulty: "mediu",
        statement: "Fie P(x) = x³ − 2x² + x − 6. Calculați P(3) și stabiliți dacă x = 3 este rădăcină.",
        steps: [
          "Înlocuim x = 3: P(3) = 3³ − 2·3² + 3 − 6.",
          "= 27 − 2·9 + 3 − 6 = 27 − 18 + 3 − 6 = 6.",
          "Deoarece P(3) = 6 ≠ 0, x = 3 nu este rădăcină a polinomului.",
        ],
        answer: "P(3) = 6; x = 3 nu este rădăcină",
      },
      {
        id: "xii-5",
        topic: "Structuri algebrice",
        difficulty: "dificil",
        statement: "Pe mulțimea numerelor reale se definește legea x ∗ y = x + y − 3. Aflați elementul neutru al legii.",
        steps: [
          "Elementul neutru e satisface x ∗ e = x pentru orice x real.",
          "Scriem condiția: x + e − 3 = x.",
          "Reducem x din ambii membri: e − 3 = 0, deci e = 3.",
          "Verificare: x ∗ 3 = x + 3 − 3 = x. ✓",
        ],
        answer: "e = 3",
      },
      {
        id: "xii-6",
        topic: "Integrala definită",
        difficulty: "usor",
        statement: "Calculați integrala funcției constante 1 pe intervalul [1, 4].",
        steps: [
          "O primitivă a funcției constante 1 este x.",
          "[x] de la 1 la 4 = 4 − 1 = 3.",
          "(Geometric, este aria dreptunghiului de lățime 3 și înălțime 1.)",
        ],
        answer: "3",
      },
      {
        id: "xii-7",
        topic: "Primitive",
        difficulty: "mediu",
        statement: "Aflați o primitivă a funcției f(x) = cos x.",
        steps: [
          "Căutăm o funcție F cu F ′(x) = cos x.",
          "Deoarece (sin x)′ = cos x, avem ∫cos x dx = sin x + C.",
        ],
        answer: "F(x) = sin x + C",
      },
      {
        id: "xii-8",
        topic: "Integrala definită",
        difficulty: "mediu",
        statement: "Calculați ∫ de la 1 la 2 din (2x + 1) dx.",
        steps: [
          "O primitivă a lui 2x + 1 este x² + x.",
          "$\\int_1^2 (2x+1)\\,dx=\\big[x^2+x\\big]_1^2=(4+2)-(1+1)$.",
          "= 6 − 2 = 4.",
        ],
        answer: "4",
      },
      {
        id: "xii-9",
        topic: "Structuri algebrice",
        difficulty: "dificil",
        statement: "Pe ℤ se definește legea x ∗ y = x + y + 2. Arătați că este comutativă și aflați simetricul lui 3.",
        steps: [
          "Comutativitate: x ∗ y = x + y + 2 = y + x + 2 = y ∗ x. ✓",
          "Elementul neutru e: x + e + 2 = x ⇒ e = −2.",
          "Simetricul x′ al lui 3: 3 + x′ + 2 = −2 ⇒ x′ = −7.",
          "Verificare: 3 ∗ (−7) = 3 + (−7) + 2 = −2 = e. ✓",
        ],
        answer: "comutativă; simetricul lui 3 este −7",
      },
      {
        id: "xii-10",
        topic: "Polinoame",
        difficulty: "mediu",
        statement: "Aflați restul împărțirii polinomului P(x) = x³ + 2x − 3 la (x − 1).",
        steps: [
          "Teorema restului: restul împărțirii la (x − a) este P(a). Aici a = 1.",
          "P(1) = 1³ + 2·1 − 3 = 1 + 2 − 3 = 0.",
          "Restul este 0 (deci x = 1 este rădăcină, iar x − 1 divide P).",
        ],
        answer: "restul = 0",
      },
      {
        id: "xii-11",
        topic: "Aria subgraficului",
        difficulty: "dificil",
        statement: "Calculați aria subgraficului funcției f(x) = x³ pe intervalul [0, 2].",
        steps: [
          "$A=\\int_0^2 x^3\\,dx$. O primitivă a lui x³ este x⁴/4.",
          "A = 2⁴/4 − 0 = 16/4 = 4.",
        ],
        answer: "4",
      },
      {
        id: "xii-12",
        topic: "Primitive",
        difficulty: "mediu",
        statement: "Aflați o primitivă a funcției f(x) = 4x³ − 6x + 5.",
        steps: [
          "Integrăm termen cu termen: ∫(4x³ − 6x + 5) dx = 4·x⁴/4 − 6·x²/2 + 5x + C.",
          "= x⁴ − 3x² + 5x + C.",
        ],
        answer: "F(x) = x⁴ − 3x² + 5x + C",
      },
      {
        id: "xii-13",
        topic: "Integrala definită",
        difficulty: "mediu",
        statement: "Calculați ∫ de la 0 la 1 din eˣ dx.",
        steps: [
          "O primitivă a lui eˣ este eˣ.",
          "$\\int_0^1 e^x\\,dx=\\big[e^x\\big]_0^1=e^1-e^0=e-1$.",
          "≈ 2,718 − 1 = 1,718.",
        ],
        answer: "e − 1 ≈ 1,718",
      },
    ],
    faq: [
      {
        q: "Ce se dă la matematică la Bacalaureat?",
        a: "Depinde de profil (M_mate-info, M_șt-nat, M_tehnologic, M_pedagogic), dar temele majore din clasa a XII-a sunt: primitive și integrale (adesea subiectul III), structuri algebrice și polinoame (subiectul II), alături de recapitularea materiei de liceu.",
      },
      {
        q: "Care este legătura dintre primitivă și integrala definită?",
        a: "Formula Leibniz–Newton: integrala definită a lui f pe [a, b] este F(b) − F(a), unde F este o primitivă a lui f. Astfel, calculul ariilor se reduce la găsirea unei primitive.",
      },
      {
        q: "Cum aflu elementul neutru al unei legi de compoziție?",
        a: "Rezolvi ecuația x ∗ e = x (și e ∗ x = x) pentru un x oarecare; valoarea lui e care verifică pentru orice x este elementul neutru.",
      },
    ],
    updatedAt: "2026-09-16",
  },
];

// ─── Helpers ─────────────────────────────────────────────────
export function getGradeBySlug(slug: string): GradeLevel | undefined {
  return GRADES.find((g) => g.slug === slug);
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  usor: "Ușor",
  mediu: "Mediu",
  dificil: "Dificil",
};
