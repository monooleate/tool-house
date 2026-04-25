import type { ContentMap } from "../types.ts";

// Geometry calculator RO content – Fázis 3
export const GEOMETRIE_RO_CONTENT: ContentMap = {
  "triunghi-dreptunghic": {
    introText:
      "Calculatorul de triunghi dreptunghic rezolvă orice triunghi cu un unghi de 90° pornind de la 6 combinații posibile de date inițiale (două catete, cateta + ipotenuza sau o latură + un unghi ascuțit). Vizualizarea SVG la scară redă proporțiile reale, iar detectorul de triunghiuri remarcabile semnalează automat cazurile 30°-60°-90°, 45°-45°-90° sau tripletele pitagorice (3-4-5, 5-12-13, 8-15-17).",
    guide: [
      "1. Alege ce date introduci: două catete, cateta + ipotenuza, sau o latură + un unghi ascuțit.",
      "2. Completează valorile (acceptă atât virgulă, cât și punct).",
      "3. Citește toate elementele triunghiului: laturi, unghiuri, arie, perimetru, înălțime, raze.",
    ],
    faq: [
      { q: "Care este teorema lui Pitagora?", a: "Pentru un triunghi dreptunghic cu catetele a și b și ipotenuza c, avem c² = a² + b². Folosită pentru a calcula orice latură când celelalte două sunt cunoscute." },
      { q: "Cum verific dacă 3 numere formează un triunghi pitagoreic?", a: "Verifici dacă suma pătratelor celor mai mici două este egală cu pătratul celui mai mare. Exemplu: 3² + 4² = 9 + 16 = 25 = 5². Da, e pitagoreic." },
      { q: "Care este formula ariei triunghiului dreptunghic?", a: "T = (a · b) / 2, unde a și b sunt catetele (laturile care formează unghiul drept). Diferă de triunghiul oarecare unde T = (bază × înălțime) / 2." },
      { q: "Ce înseamnă triunghi 30°-60°-90°?", a: "Are unghiurile 30°, 60° și 90°. Laturile sunt în raportul 1 : √3 : 2 — dacă cateta scurtă (opusă lui 30°) e 1, cealaltă e √3 ≈ 1,732 și ipotenuza e 2. Apare frecvent la bacalaureat." },
      { q: "Cum calculez înălțimea pe ipotenuză?", a: "Formula este h_c = (a · b) / c, unde a și b sunt catetele și c e ipotenuza. Această înălțime cade din vârful unghiului drept perpendicular pe ipotenuză." },
    ],
    content: {
      howToSteps: [
        { title: "1. Identifică datele cunoscute", description: "Alege unul dintre cele 6 moduri: două catete, cateta + ipotenuza sau latură + unghi ascuțit." },
        { title: "2. Aplică formula corespunzătoare", description: "Pitagora pentru laturi (c² = a² + b²), trigonometrie pentru unghiuri (sin, cos, tan)." },
        { title: "3. Verifică cu unghiurile", description: "α + β = 90° (suma unghiurilor ascuțite). Dacă nu, sunt erori în date." },
      ],
      useCases: [
        { icon: "🎓", title: "Bacalaureat și evaluare națională", description: "Subiecte de geometrie cu Pitagora, sin/cos și triunghiuri speciale." },
        { icon: "🏗️", title: "Construcții", description: "Verificare unghiuri drepte (regula 3-4-5 pentru fundații, ziduri perpendiculare)." },
        { icon: "📐", title: "Tâmplărie și mobilier", description: "Calcul diagonală raft, lungime grindă, înălțime acoperiș." },
        { icon: "🗺️", title: "Topografie", description: "Triangulații, distanțe inaccesibile, calcul pante." },
      ],
      aboutSection: {
        title: "Despre triunghiul dreptunghic",
        paragraphs: [
          "Triunghiul dreptunghic este cel mai studiat triunghi din matematică datorită teoremei lui Pitagora. Are exact un unghi de 90°, iar celelalte două sunt complementare (α + β = 90°). Latura opusă unghiului drept se numește ipotenuză și este întotdeauna cea mai lungă; celelalte două laturi se numesc catete.",
          "Triunghiurile pitagorice — cu toate cele trei laturi numere întregi — sunt extrem de utile în construcții. Cele mai cunoscute sunt 3-4-5, 5-12-13 și 8-15-17. Constructorii folosesc tripletul 3-4-5 de mii de ani pentru a verifica colțurile drepte fără echer: marchează 3 m pe un perete, 4 m pe celălalt, iar dacă diagonala măsoară exact 5 m, unghiul este perfect 90°.",
          "Triunghiurile remarcabile 30°-60°-90° (raport 1 : √3 : 2) și 45°-45°-90° (raport 1 : 1 : √2) apar frecvent în trigonometrie și sunt de obicei memorate la bacalaureat — pe baza lor se deduc valorile exacte ale lui sin, cos, tan pentru aceste unghiuri.",
        ],
      },
    },
  },
  "functii-trigonometrice": {
    introText:
      "Calculatorul de funcții trigonometrice afișează simultan sin, cos, tan și cot pentru orice unghi, în grade sau radiani. Cercul trigonometric live arată vectorul rotitor și proiecțiile pe axele Ox (cos) și Oy (sin), făcându-l ideal pentru învățarea trigonometriei la liceu sau bacalaureat.",
    guide: [
      "1. Alege unitatea (grade sau radiani) și introdu valoarea unghiului.",
      "2. Vizualizează cercul trigonometric cu vectorul de rază 1 rotitor.",
      "3. Citește valorile sin, cos, tan, cot din cele 4 carduri colorate.",
    ],
    faq: [
      { q: "Care sunt valorile sin pentru unghiurile uzuale?", a: "sin(0°)=0, sin(30°)=1/2, sin(45°)=√2/2 ≈ 0,707, sin(60°)=√3/2 ≈ 0,866, sin(90°)=1, sin(180°)=0, sin(270°)=−1." },
      { q: "De ce tan(90°) este nedefinit?", a: "tan α = sin α / cos α. La 90° avem cos(90°)=0, deci împărțim la zero — nedefinit. Geometric, dreapta tangentă devine paralelă cu axa Ox." },
      { q: "Cum convertesc grade în radiani?", a: "Înmulțești cu π/180. Exemplu: 60° × π/180 = π/3 rad ≈ 1,047 rad. Invers: rad × 180/π pentru grade." },
      { q: "Ce este cercul trigonometric?", a: "Cercul de rază 1 centrat în origine. Pentru un unghi α măsurat de la axa Ox, punctul de pe cerc are coordonatele (cos α, sin α). Vizual ajută la înțelegerea valorilor și semnelor." },
      { q: "Care e formula fundamentală a trigonometriei?", a: "sin²α + cos²α = 1, valabilă pentru orice α. Provine direct din teorema lui Pitagora aplicată în cercul unitate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege unitatea", description: "Grade (°) — uzual la liceu. Radiani (π) — uzual la bacalaureat M2 și matematică superioară." },
        { title: "2. Introdu unghiul", description: "Folosește presets-urile (30°, 45°, 60°, 90°) sau scrie orice valoare. Valori negative și mai mari de 360° sunt acceptate." },
        { title: "3. Citește cele 4 funcții", description: "sin (proiecție Oy, roșu), cos (proiecție Ox, albastru), tan (raport sin/cos), cot (raport cos/sin)." },
      ],
      useCases: [
        { icon: "🎓", title: "Bacalaureat M1/M2", description: "Subiecte cu trigonometrie, ecuații trigonometrice, identități." },
        { icon: "📐", title: "Geometrie analitică", description: "Calcul coordonate în plan, transformări geometrice." },
        { icon: "🌊", title: "Fizică (oscilații, unde)", description: "Mișcare oscilatorie armonică x(t) = A·sin(ωt + φ)." },
        { icon: "💻", title: "Programare grafică", description: "Animații rotative, calcul poziții pe cerc, transformări 2D/3D." },
      ],
      aboutSection: {
        title: "Despre funcțiile trigonometrice",
        paragraphs: [
          "Funcțiile sin, cos, tan și cot sunt instrumentele de bază ale trigonometriei. Definite inițial în triunghiul dreptunghic ca rapoarte între laturi (sin α = catetă opusă / ipotenuză, cos α = catetă alăturată / ipotenuză), ele au fost extinse la orice unghi prin cercul trigonometric — o construcție geometrică care permite calculul lor pentru valori negative, peste 90° sau în radiani.",
          "Periodicitatea (sin și cos au perioada 2π, tan și cot perioada π) face ca aceste funcții să fie indispensabile în modelarea fenomenelor periodice: mișcare oscilatorie, unde sonore, semnale electrice, fenomene meteorologice. La bacalaureat, cunoașterea exactă a valorilor pentru unghiurile speciale (0°, 30°, 45°, 60°, 90°) este esențială.",
          "Identitățile trigonometrice sunt scheletul demonstrațiilor: sin²α + cos²α = 1 (formula fundamentală), formula sumelor sin(α±β) = sin α · cos β ± cos α · sin β, formulele duplului unghi sin(2α) = 2 sin α cos α etc.",
        ],
      },
    },
  },
  "radiani-grade": {
    introText:
      "Convertor bidirecțional între grade sexagesimale și radiani, cele două unități uzuale pentru măsurarea unghiurilor. Sectorul circular vizual îți arată mărimea reală a unghiului introdus — extrem de util când trebuie să-ți faci o intuiție rapidă despre cât de mare e π/6 față de π/3 sau față de 2π.",
    guide: [
      "1. Introdu valoarea în câmpul «Grade» sau «Radiani» (celălalt se actualizează automat).",
      "2. Sectorul circular SVG redă vizual mărimea unghiului.",
      "3. Folosește presets-urile pentru unghiurile uzuale: 30°, 45°, 60°, 90°, 180°, 360°.",
    ],
    faq: [
      { q: "Cât este 90° în radiani?", a: "90° = π/2 rad ≈ 1,5708 rad. Este unghiul drept, deci jumătate dintr-un unghi alungit (180° = π rad)." },
      { q: "De ce folosim radiani și nu doar grade?", a: "Radianii sunt unitatea «naturală» — fac formulele mai simple. Derivata lui sin(x) este cos(x) doar dacă x e în radiani; în grade ar apărea factori suplimentari π/180." },
      { q: "Cât este π/3 în grade?", a: "π/3 rad × 180/π = 60°. Folosit la triunghiul echilateral și la 30°-60°-90°." },
      { q: "Cât este 2π în grade?", a: "2π rad = 360°, adică un cerc complet. Așa cum 1 cerc are 360°, 2π este măsura sa în radiani (lungimea cercului unitate)." },
      { q: "Cum se scriu unghiurile uzuale în radiani?", a: "30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2, 120° = 2π/3, 180° = π, 270° = 3π/2, 360° = 2π. La bacalaureat se preferă forma exactă cu π." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege direcția conversiei", description: "Tastând în câmpul Grade actualizează Radianii și invers — bidirecțional, în timp real." },
        { title: "2. Aplică formula corectă", description: "rad = grade × (π/180) și grade = rad × (180/π). Memorează: π rad = 180°." },
        { title: "3. Verifică cu sectorul vizual", description: "Sectorul SVG îți arată dacă unghiul e ascuțit, drept, obtuz sau alungit." },
      ],
      useCases: [
        { icon: "🎓", title: "Bacalaureat trigonometrie", description: "Conversia rapidă între notații: subiectele vin amestecat grade și radiani." },
        { icon: "🔬", title: "Fizică", description: "Viteza unghiulară ω se exprimă în rad/s, dar problema dă uneori rotații/min." },
        { icon: "💻", title: "Programare (Math.sin)", description: "Toate limbajele (JS, Python, C) folosesc radiani în funcțiile trigonometrice." },
        { icon: "🛰️", title: "Inginerie & GPS", description: "Coordonate, calcul azimut, mișcare circulară a sateliților." },
      ],
      aboutSection: {
        title: "Despre radiani și grade",
        paragraphs: [
          "Sistemul sexagesimal (cu 360° pe cerc) provine din astronomia babiloniană acum 4.000 de ani — bazat pe sistemul în baza 60. Diviziunea 360 este matematic comodă: are mulți divizori (2, 3, 4, 5, 6, 8, 9, 10, 12...), așa că multe unghiuri uzuale dau valori întregi de grade.",
          "Radianul, în schimb, este definit pur geometric: unghiul în care arcul are lungimea egală cu raza. Astfel, întreg cercul (lungimea 2π·r) cuprinde 2π radiani. Avantajul major: în calculul diferențial, derivata și seriile Taylor ale lui sin și cos sunt simple doar în radiani.",
          "Regula practică: la liceu românesc M1, geometria foloseşte grade. La M2 (Mate-Info) și la facultăți tehnice, radianii devin standard. Conversia mentală cheie: π = 180°, deci π/2 = 90°, π/3 = 60°, π/4 = 45°, π/6 = 30°.",
        ],
      },
    },
  },
  "cerc-calculator": {
    introText:
      "Calculatorul de cerc îți arată rapid raza, diametrul, perimetrul (circumferința) și aria pornind de la oricare dintre acestea patru. Modul «sector circular» permite să calculezi lungimea arcului, aria sectorului și aria segmentului pentru orice unghi central α — indispensabil la geometria de liceu.",
    guide: [
      "1. Alege ce variabilă cunoști: rază, diametru, perimetru sau arie.",
      "2. Introdu valoarea și unitatea de măsură (mm, cm, m, km).",
      "3. Activează modul sector dacă ai nevoie de arc, sector sau segment.",
    ],
    faq: [
      { q: "Care este formula pentru aria cercului?", a: "A = π · r², unde r este raza. Exemplu: pentru r = 5 cm, A = π · 25 ≈ 78,54 cm²." },
      { q: "Care este formula pentru perimetrul cercului?", a: "P = 2π · r = π · d, unde r este raza și d diametrul. Numit și circumferință sau lungime a cercului." },
      { q: "Cât este π?", a: "π (pi) ≈ 3,14159265... este numărul irațional egal cu raportul dintre circumferință și diametru, indiferent de mărimea cercului." },
      { q: "Cum calculez aria unui sector circular?", a: "A_sector = (α / 360°) × π · r², unde α este unghiul central în grade. Sau echivalent: A_sector = (1/2) · r² · α (cu α în radiani)." },
      { q: "Care e diferența între sector și segment?", a: "Sectorul = «felie de tort» (între 2 raze și un arc). Segmentul = «coajă» (între un arc și o coardă). Aria segmentului = aria sector − aria triunghi format din cele 2 raze." },
    ],
    content: {
      howToSteps: [
        { title: "1. Identifică variabila cunoscută", description: "Rază, diametru, perimetru sau arie — toate sunt convertibile între ele." },
        { title: "2. Aplică formula", description: "Cunoscută raza, restul derivă: d = 2r, P = 2πr, A = πr²." },
        { title: "3. Activează modul sector", description: "Pentru calcule cu unghi central: arc, sector, segment de cerc." },
      ],
      useCases: [
        { icon: "🎓", title: "Geometria de liceu", description: "Subiecte cu cerc, sector, coardă, tangentă la bacalaureat și olimpiade." },
        { icon: "🏗️", title: "Construcții și design", description: "Boltă, arcadă, fereastră circulară, plan teren circular." },
        { icon: "🍕", title: "Calcul pizza/tort", description: "Arie pizza familială, mărime felie pentru x persoane." },
        { icon: "🚗", title: "Inginerie auto", description: "Roți, frâne, raza de viraj — formule cu π peste tot." },
      ],
      aboutSection: {
        title: "Despre cerc și π",
        paragraphs: [
          "Cercul este locul geometric al punctelor egal depărtate de un punct fix (centrul). Distanța comună se numește rază (r), iar dublul ei — diametru (d). Perimetrul (P = 2πr) se mai numește circumferință, iar aria închisă este A = πr².",
          "π este una dintre cele mai studiate constante matematice. Iraționalitatea sa a fost demonstrată de Lambert în 1761, iar transcendentă de Lindemann în 1882 (rezolvând definitiv problema veche de 2.000 de ani a cuadraturii cercului — imposibilă cu rigla și compasul). Prima 5 cifre sunt 3,14159; pentru calcule uzuale 3,14 sau 3,1416 sunt suficiente.",
          "Sectorul circular și segmentul apar frecvent în probleme practice: arcade, ferestre, bolți, parcele de teren circulare. Lungimea unui arc de unghi α (în radiani) este l = r · α; aria sectorului este A_s = (1/2) · r² · α. Pentru α în grade, înlocuiește α cu α · π / 180.",
        ],
      },
    },
  },
  "dreptunghi-calculator": {
    introText:
      "Calculatorul de dreptunghi îți arată instant aria, perimetrul, diagonala și raportul laturilor pornind de la 4 combinații posibile (laturi, perimetru + latură, arie + latură, diagonală + latură). Detectează automat dacă forma este pătrat (a = b) sau dacă raportul se apropie de secțiunea de aur (φ ≈ 1,618).",
    guide: [
      "1. Alege ce date cunoști din 4 moduri.",
      "2. Introdu valorile cu unitatea de măsură (mm, cm, m, km).",
      "3. Vizualizează dreptunghiul la scară cu diagonală evidențiată.",
    ],
    faq: [
      { q: "Care este formula ariei dreptunghiului?", a: "A = a · b, produsul laturilor. Pentru pătrat (a = b): A = a²." },
      { q: "Care este formula perimetrului dreptunghiului?", a: "P = 2(a + b) sau echivalent P = 2a + 2b. Suma celor 4 laturi." },
      { q: "Cum calculez diagonala dreptunghiului?", a: "Cu teorema lui Pitagora: d = √(a² + b²). Diagonala face cu laturile triunghiuri dreptunghice congruente." },
      { q: "Ce este secțiunea de aur (φ)?", a: "Numărul φ = (1 + √5) / 2 ≈ 1,618. Un dreptunghi cu raportul a/b = φ se numește «dreptunghi de aur» și e considerat estetic plăcut — apare la Parthenon, Mona Lisa, multe logo-uri." },
      { q: "De ce A4 are dimensiunile 21 × 29,7 cm?", a: "Standardul ISO 216 folosește raportul √2 ≈ 1,414. Astfel, când împarți o foaie A4 în două, obții A5 cu același raport. Foarte eficient pentru tipar și design." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul de calcul", description: "Cunoscute laturile sau una + perimetrul/aria/diagonala." },
        { title: "2. Aplică formulele", description: "P = 2(a+b), A = a·b, d = √(a²+b²). Toate derivă imediat din laturi." },
        { title: "3. Verifică detectorul", description: "Dacă afișează «pătrat» sau «secțiune de aur», ai un caz remarcabil." },
      ],
      useCases: [
        { icon: "🏠", title: "Imobiliare și amenajări", description: "Suprafață cameră, lungime gard, parchet pentru fiecare cameră." },
        { icon: "📄", title: "Tipar și design", description: "Format hârtie A4/A3, panouri, postere — toate dreptunghiuri standardizate." },
        { icon: "🎨", title: "Artă și fotografie", description: "Compoziție bazată pe secțiunea de aur sau pe regula treimilor." },
        { icon: "⚽", title: "Sport", description: "Teren fotbal, baschet, tenis — dimensiuni reglementate strict ca dreptunghi." },
      ],
      aboutSection: {
        title: "Despre dreptunghi",
        paragraphs: [
          "Dreptunghiul este patrulaterul cu toate cele 4 unghiuri drepte (90°). Laturile opuse sunt egale și paralele, iar diagonalele sunt egale și se înjumătățesc reciproc. Cazul particular când toate laturile sunt egale dă pătratul — cea mai simetrică formă patrulaterală.",
          "Secțiunea de aur (φ ≈ 1,618) este un raport care apare natural în arhitectură, artă și natură (cochilii de melc, spirale galactice, proporțiile corpului uman). Un «dreptunghi de aur» are proprietatea unică: dacă tai din el un pătrat, dreptunghiul rămas are din nou raportul de aur. Această proprietate fractală a fascinat artiști de la Leonardo da Vinci la Le Corbusier.",
          "Standardul ISO 216 (A4, A3, A5...) se bazează pe raportul √2 ≈ 1,414. La împărțirea în două a unei coli A4, obții două coli A5 cu același raport — extrem de eficient pentru editare și tipar. Imobiliarele și terenurile sunt aproape mereu modelate ca dreptunghiuri, motiv pentru care formula A = a · b este cea mai folosită formulă matematică în viața de zi cu zi.",
        ],
      },
    },
  },
};
