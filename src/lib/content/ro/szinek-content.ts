import type { ContentMap } from "../types.ts";

// ═══ SZÍNEK kategória – RO content (HU+RO közös toolok) ════════════════════
export const SZINEK_RO_CONTENT: ContentMap = {
  // ─── Convertor de culori ──────────────────────────────────────────────────
  "szinkonverter": {
    introText:
      "Convertorul de culori transformă în timp real culorile între cele mai importante formate din dezvoltarea web și design: HEX, RGB, HSL, HSV și CMYK. Lipește orice format, alege o culoare cu selectorul vizual sau ajustează canalele R/G/B cu glisoarele – toate valorile se actualizează instantaneu, alături de mostra de culoare. Pentru designeri, dezvoltatori și creatori de conținut care au nevoie de coduri de culoare precise, fără instalare.",
    guide: [
      "1. Lipește culoarea în orice format (de ex. #3B82F6, rgb(59,130,246) sau hsl(217,91%,60%)).",
      "2. Sau deschide selectorul de culoare și alege vizual.",
      "3. Ajustează fin canalele R, G, B cu glisoarele.",
      "4. Copiază formatul dorit (HEX, RGB, HSL, HSV, CMYK) cu butonul de lângă rând.",
    ],
    faq: [
      { q: "Ce formate de culoare recunoaște?", a: "Câmpul de introducere recunoaște formatele HEX (#RGB și #RRGGBB), rgb()/rgba() și hsl()/hsla(). La ieșire afișează în plus și valorile HSV și CMYK." },
      { q: "Care e diferența între HEX și RGB?", a: "Descriu aceeași culoare cu notații diferite: HEX este hexazecimal (#3B82F6), iar RGB folosește trei numere între 0 și 255 (rgb(59,130,246)). Browserele le înțeleg pe amândouă; HEX este mai scurt, cu RGB e mai ușor de calculat din cod." },
      { q: "La ce folosește HSL?", a: "HSL (nuanță, saturație, luminozitate) este mai intuitiv pentru ajustarea manuală: păstrând nuanța (0–360°), poți regla separat saturația și luminozitatea – ideal pentru a crea o paletă sau o stare de hover." },
      { q: "Ce este CMYK și când e nevoie?", a: "CMYK (cyan, magenta, galben, negru) este modelul de culoare al tiparului. Ecranul emite lumină în RGB, dar imprimanta lucrează cu cerneluri, deci pentru lucrări tipografice ai nevoie de valori CMYK. Conversia este aproximativă – pentru potrivire exactă e nevoie de un profil ICC." },
      { q: "Valoarea rămâne în browser?", a: "Da. Întreaga conversie are loc în browserul tău, cu JavaScript – nicio culoare sau dată nu ajunge pe server." },
      { q: "Este precisă conversia?", a: "Între HEX, RGB, HSL și HSV conversia este matematic precisă și fără pierderi (rotunjită la valori întregi). CMYK este o aproximare simplă, fără profil, suficientă pentru web, dar nu pentru fidelitatea de culoare la tipar." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introducerea culorii", description: "Lipește în format HEX, RGB sau HSL, ori folosește selectorul de culoare pentru alegere vizuală." },
        { title: "2. Ajustare fină", description: "Cu glisoarele R/G/B reglezi exact culoarea – toate ieșirile o urmăresc live." },
        { title: "3. Citirea valorilor", description: "Vezi simultan valorile HEX, RGB, HSL, HSV și CMYK, alături de mostra de culoare." },
        { title: "4. Copierea", description: "Copiezi formatul dorit în clipboard cu un singur clic." },
      ],
      useCases: [
        { icon: "🎨", title: "Web design", description: "Conversia culorilor de brand din HEX-ul instrumentului de design în CSS sau invers, cu valori precise." },
        { icon: "💻", title: "Dezvoltare CSS", description: "Trecerea la HSL pentru a crea ușor nuanțe mai deschise sau mai întunecate pentru stările de hover și active." },
        { icon: "🖨️", title: "Pregătire pentru tipar", description: "Citirea valorii CMYK aproximative a unei culori RGB de ecran pentru materiale de imprimat." },
        { icon: "♿", title: "Accesibilitate", description: "Valoarea exactă a culorii este primul pas pentru verificarea contrastului corect al textului." },
      ],
      formatComparison: {
        title: "Formate de culoare",
        columns: ["Format", "Exemplu", "Unde se folosește"],
        rows: [
          { feature: "HEX", values: ["#3B82F6", "Web, CSS – notație scurtă"] },
          { feature: "RGB", values: ["rgb(59, 130, 246)", "Web, CSS, canvas, programare"] },
          { feature: "HSL", values: ["hsl(217, 91%, 60%)", "Web – ajustare manuală intuitivă"] },
          { feature: "HSV", values: ["hsv(217, 76%, 96%)", "Roata de culori din software de design"] },
          { feature: "CMYK", values: ["cmyk(76%, 47%, 0%, 4%)", "Tipar (cerneluri)"] },
        ],
      },
      aboutSection: {
        title: "Modelele de culoare pe scurt",
        paragraphs: [
          "Culorile digitale pot fi descrise prin mai multe modele, fiecare exprimând aceeași culoare dintr-o perspectivă diferită. RGB este un model aditiv: culoarea rezultă din amestecul luminilor roșie, verde și albastră, motiv pentru care îl folosește orice ecran. HEX este doar o scriere compactă, hexazecimală, a acestuia – cei trei octeți din #RRGGBB sunt exact cele trei canale RGB.",
          "HSL și HSV sunt modele mai apropiate de percepția umană a culorii: nuanța (hue) este dată pe un cerc cromatic de 0–360 de grade, iar saturația și luminozitatea (HSL), respectiv valoarea (HSV), sunt tratate separat. Cu ele este mult mai ușor să creezi o variantă mai deschisă sau mai întunecată a unei culori existente fără ca nuanța să se modifice.",
          "CMYK, în schimb, este un model substractiv, lumea tiparului: culoarea se formează pe hârtie din absorbția cernelurilor cyan, magenta, galben și negru. Deoarece ecranul și hârtia produc fizic culoarea în mod diferit, conversia RGB→CMYK este întotdeauna o aproximare – pentru fidelitate exactă la tipar este nevoie de un profil ICC calibrat.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru web rămâi la HEX sau RGB; treci la HSL când trebuie să deschizi/închizi o culoare păstrând nuanța." },
        { icon: "🎨", tip: "Cu selectorul experimentezi rapid, iar cu glisoarele reglezi canalele cu precizie." },
        { icon: "🖨️", tip: "Valoarea CMYK de aici este orientativă – pentru tipar profesional cere mereu o conversie cu profil." },
        { icon: "🔒", tip: "Culorile rămân în browserul tău; poți converti liniștit și culori de brand confidențiale." },
      ],
    },
  },

  // ─── Verificator de contrast WCAG ─────────────────────────────────────────
  "kontraszt-ellenorzo": {
    introText:
      "Verificatorul de contrast WCAG măsoară raportul de contrast dintre culoarea textului și cea a fundalului și îți arată dacă respectă nivelurile AA și AAA ale standardului de accesibilitate WCAG, pentru text normal și text mare. Alegi două culori și vezi în previzualizare live cât de lizibilă este combinația. Pentru designeri și dezvoltatori care creează interfețe accesibile, ușor de citit de toată lumea.",
    guide: [
      "1. Setează culoarea textului (prim-plan) și culoarea fundalului – cu cod HEX sau cu selectorul de culoare.",
      "2. Citește raportul de contrast (de ex. 4,53:1) și previzualizarea live.",
      "3. Vezi conformitatea WCAG: AA/AAA, text normal și mare – bifă verde sau X roșu.",
      "4. Cu butonul de inversare poți schimba între ele culoarea de prim-plan și cea de fundal.",
    ],
    faq: [
      { q: "Ce este raportul de contrast?", a: "Raportul de contrast este relația dintre luminozitatea (luminanța relativă) a textului și a fundalului, între 1:1 (fără contrast) și 21:1 (alb-negru). Cu cât e mai mare, cu atât textul e mai lizibil." },
      { q: "Care este minimul WCAG?", a: "Nivelul AA al WCAG 2.1 cere 4,5:1 pentru text normal și 3:1 pentru text mare (peste 18pt, sau 14pt aldin). Nivelul AAA este mai strict: 7:1, respectiv 4,5:1 pentru text mare." },
      { q: "Ce înseamnă text mare?", a: "Conform WCAG, textul mare are cel puțin 18pt (circa 24px), sau cel puțin 14pt (circa 18,66px) dacă este aldin. Literele mai mari se citesc mai ușor, de aceea au o cerință de contrast mai relaxată." },
      { q: "Cum se calculează contrastul?", a: "Cu formula oficială WCAG 2.x: se calculează luminanța relativă a fiecărei culori (cu corecție gamma), apoi raportul (mai deschisă + 0,05) / (mai întunecată + 0,05). Calculul rulează exact, în browser." },
      { q: "Ține cont și de transparență?", a: "Nu direct – calculul lucrează cu culori opace. Dacă folosești text sau fundal cu un strat semitransparent, calculează întâi culoarea reală rezultată din amestec și introdu-o pe aceea." },
      { q: "Culorile ajung pe vreun server?", a: "Nu. Întregul calcul are loc în browserul tău – nicio culoare nu părăsește dispozitivul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Setarea culorilor", description: "Stabilește culoarea textului și a fundalului cu cod HEX sau cu selectorul de culoare." },
        { title: "2. Citirea raportului", description: "Raportul de contrast, afișat ca număr mare, se actualizează instant, alături de previzualizarea live a textului." },
        { title: "3. Evaluarea WCAG", description: "Cele patru niveluri (AA/AAA × normal/mare) indică prin bifă verde sau X roșu conformitatea." },
        { title: "4. Ajustare", description: "Modifică culorile până atingi nivelul dorit; butonul de inversare schimbă prim-planul cu fundalul." },
      ],
      useCases: [
        { icon: "♿", title: "Accesibilitate", description: "Asigurarea că textul este lizibil și pentru persoanele cu vedere slabă sau daltonism." },
        { icon: "🎨", title: "Sistem de design", description: "Verificarea perechilor de culori de brand și de text înainte de a intra în sistemul de stiluri." },
        { icon: "📑", title: "Conformitate legală", description: "Directiva europeană de accesibilitate (EAA) și multe licitații publice cer conformitate WCAG AA." },
        { icon: "🔘", title: "Butoane și linkuri", description: "Validarea contrastului elementelor interactive și al stărilor lor (hover, focus)." },
      ],
      formatComparison: {
        title: "Praguri de contrast WCAG",
        columns: ["Nivel", "Text normal", "Text mare"],
        rows: [
          { feature: "AA (minim)", values: ["4,5:1", "3:1"] },
          { feature: "AAA (ridicat)", values: ["7:1", "4,5:1"] },
          { feature: "Non-text (UI, pictograme)", values: ["3:1", "3:1"] },
        ],
      },
      aboutSection: {
        title: "De ce contează contrastul?",
        paragraphs: [
          "Lizibilitatea textului depinde în mare măsură de contrastul dintre literă și fundal. Pentru persoanele cu vedere slabă, pentru cele cu deficiențe de vedere legate de vârstă și pentru cei cu daltonism, textul cu contrast scăzut este adesea complet ilizibil – dar și pentru cei cu vedere bună devine obositor în lumină puternică sau pe un ecran slab. Contrastul potrivit nu este deci doar respectarea unui standard, ci o chestiune fundamentală de utilizabilitate.",
          "WCAG (Web Content Accessibility Guidelines) este standardul internațional de accesibilitate web, care leagă contrastul de praguri măsurabile. Nivelul AA este minimul practic cerut de majoritatea reglementărilor (inclusiv directiva europeană de accesibilitate); AAA este ținta pentru conținut deosebit de accesibil. Pragurile țin cont și de dimensiunea fontului, fiindcă textul mai mare rămâne lizibil și la un contrast mai redus.",
        ],
      },
      tips: [
        { icon: "✅", tip: "Țintește cel puțin AA (4,5:1) pentru textul de bază – este minimul practic și legal pentru majoritatea proiectelor." },
        { icon: "🔤", tip: "Pentru titluri mari sau aldine e suficient 3:1, dar pentru textul lung de citit țintește mereu valoarea mai strictă." },
        { icon: "🌗", tip: "În modul întunecat verifică separat contrastul – ce trece pe fundal deschis nu trece neapărat pe întuneric." },
        { icon: "🎯", tip: "Dacă ratezi la limită un nivel, o ușoară întunecare a fundalului sau deschidere a textului e adesea suficientă." },
      ],
    },
  },

  // ─── Generator de gradient CSS ────────────────────────────────────────────
  "gradient-generator": {
    introText:
      "Generatorul de gradient CSS creează vizual, cu previzualizare live, gradiente liniare și radiale și îți oferă instant codul CSS gata de folosit. Adaugi puncte de culoare, reglezi unghiul și pozițiile, apoi copiezi CSS-ul cu un clic. Pentru designeri și dezvoltatori care au nevoie rapid de un fundal cu degrade frumos, fără scris cod de mână.",
    guide: [
      "1. Alege tipul: gradient liniar sau radial.",
      "2. La cel liniar, reglează unghiul degradeului (0–360°) cu glisorul.",
      "3. Adaugă sau modifică punctele de culoare: culoare și poziție (0–100%).",
      "4. Copiază codul CSS gata făcut cu butonul «Copiază».",
    ],
    faq: [
      { q: "Care e diferența între gradientul liniar și cel radial?", a: "Gradientul liniar merge pe o linie dreaptă de la o culoare la alta (unghiul stabilește direcția). Gradientul radial se răspândește dintr-un punct central spre exterior, în cercuri concentrice." },
      { q: "Câte puncte de culoare pot folosi?", a: "Cel puțin două, iar în acest instrument cel mult șase. Fiecare punct are o culoare și o poziție între 0 și 100%, unde culoarea respectivă se manifestă complet." },
      { q: "Ce înseamnă unghiul în grade?", a: "Direcția gradientului liniar: 0° în sus, 90° spre dreapta, 180° în jos, 270° spre stânga. CSS îl măsoară de la ora 12, în sensul acelor de ceasornic." },
      { q: "Unde pot folosi codul obținut?", a: "Oriunde poți seta un fundal CSS: în proprietatea background, într-o clasă CSS sau în stil inline. Toate browserele moderne suportă gradientele CSS." },
      { q: "Funcționează în toate browserele?", a: "Da, gradientele CSS liniare și radiale sunt suportate nativ de toate browserele moderne, fără prefix. Pentru browsere foarte vechi e bine să adaugi o culoare de fundal de rezervă." },
      { q: "Codul generat se face în browser?", a: "Da, complet pe partea de client – nicio dată nu ajunge pe server." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alegerea tipului", description: "Gradient liniar (pe o linie dreaptă) sau radial (din centru spre exterior)." },
        { title: "2. Setarea direcției", description: "La cel liniar, reglezi cu glisorul unghiul (0–360°) ce dă direcția degradeului." },
        { title: "3. Puncte de culoare", description: "Culoare și poziție pentru fiecare punct; poți adăuga sau elimina puncte." },
        { title: "4. Copierea CSS", description: "Copiezi regula background gata făcută în clipboard cu un singur clic." },
      ],
      useCases: [
        { icon: "🖼️", title: "Fundaluri", description: "Fundaluri moderne, cu degrade fin, pentru secțiuni hero, carduri și butoane." },
        { icon: "🎨", title: "Experiment de design", description: "Testarea rapidă a combinațiilor de culori și a tranzițiilor cu previzualizare live." },
        { icon: "🔘", title: "Stiluri de butoane", description: "Crearea de butoane și elemente CTA atrăgătoare, cu degrade." },
        { icon: "📱", title: "UI modern", description: "Baza pentru glassmorphism și suprafețe vii, cu degrade, din designul web actual." },
      ],
      formatComparison: {
        title: "Tipuri de gradient",
        columns: ["Tip", "Direcție", "Funcție CSS"],
        rows: [
          { feature: "Liniar", values: ["Linie dreaptă, cu unghi", "linear-gradient()"] },
          { feature: "Radial", values: ["Din centru spre exterior", "radial-gradient()"] },
        ],
      },
      aboutSection: {
        title: "Despre gradientele CSS",
        paragraphs: [
          "Un gradient CSS este o tranziție continuă de culoare pe care browserul o tratează ca imagine, dar pe care de fapt o generează codul – astfel rămâne clară la orice rezoluție și nu încarcă pagina cu un fișier imagine separat. Cele două tipuri de bază sunt cel liniar (pe o linie dreaptă) și cel radial (radial dintr-un punct) și pot conține oricâte puncte de culoare.",
          "Fiecare punct de culoare are o culoare și o poziție opțională (0–100%), care indică unde se manifestă complet acea culoare; în zonele intermediare browserul amestecă continuu culorile vecine. Unghiul gradientului liniar stabilește direcția, măsurată de la ora 12 în sensul acelor de ceasornic.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Două nuanțe apropiate (de ex. o versiune mai deschisă și una mai întunecată a aceleiași culori) dau un degrade fin și elegant." },
        { icon: "📐", tip: "Unghiul de 135° (diagonală, din stânga-sus spre dreapta-jos) este una dintre cele mai populare și echilibrate direcții." },
        { icon: "🛟", tip: "Adaugă și o culoare de fundal de rezervă înainte de gradient, ca să existe fundal și în browsere foarte vechi." },
        { icon: "🔒", tip: "Generarea rulează în browserul tău – fără server, fără încărcare, doar CSS-ul gata făcut." },
      ],
    },
  },

  // ─── Generator de armonii de culori ───────────────────────────────────────
  "szin-harmonia": {
    introText:
      "Generatorul de armonii de culori creează dintr-o singură culoare de bază scheme de culori care se potrivesc, conform regulilor teoriei culorilor: armonie complementară, analoagă, triadică, complementară divizată, tetradică și monocromatică. Pentru fiecare schemă primești valorile HEX gata de copiat cu un clic. Pentru designeri și creatori de conținut care caută o paletă echilibrată și armonioasă, fără să experimenteze la nesfârșit.",
    guide: [
      "1. Introdu culoarea de bază cu cod HEX sau cu selectorul de culoare.",
      "2. Instrumentul generează instant cele șase scheme de armonie.",
      "3. Apasă pe orice mostră de culoare pentru a copia valoarea HEX.",
      "4. Cu butonul «Copiază rândul» copiezi deodată toate culorile unei scheme.",
    ],
    faq: [
      { q: "Ce este culoarea complementară?", a: "Culoarea aflată față în față pe cercul cromatic, la 180°. Oferă cel mai mare contrast, deci atrage atenția, dar pe suprafețe mari poate obosi – funcționează bine pentru accente." },
      { q: "Care e diferența între schema analoagă și cea triadică?", a: "Schema analoagă folosește culori vecine pe cercul cromatic (±30°), ceea ce dă un efect calm, armonios. Schema triadică folosește trei culori la distanță egală (120°) – vie, dar echilibrată." },
      { q: "Cum se calculează armoniile?", a: "Culoarea de bază este transformată în modelul HSL, apoi nuanța (hue) este rotită cu unghiul schemei, păstrând saturația și luminozitatea. Schema monocromatică păstrează nuanța și variază luminozitatea." },
      { q: "Ce schemă să folosesc și când?", a: "Complementară: pentru contrast puternic, accente. Analoagă: pentru o suprafață calmă, unitară. Triadică și tetradică: pentru design jucăuș, colorat. Monocromatică: pentru un aspect curat, elegant, dintr-o singură culoare." },
      { q: "Culoarea ajunge pe server?", a: "Nu, întreaga generare are loc în browserul tău – culoarea nu părăsește dispozitivul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introducerea culorii de bază", description: "Scrie cu cod HEX sau alege cu selectorul culoarea de bază." },
        { title: "2. Vizualizarea schemelor", description: "Cele șase scheme de armonie apar instant, fiecare cu mostrele ei de culoare." },
        { title: "3. Copierea culorii", description: "Apasă pe o mostră pentru a copia valoarea HEX în clipboard." },
        { title: "4. Schema completă", description: "Cu butonul «Copiază rândul» copiezi deodată toate culorile unei scheme." },
      ],
      useCases: [
        { icon: "🎨", title: "Sistem de design", description: "Construirea unei palete echilibrate în jurul unei culori de brand sau de accent." },
        { icon: "🖌️", title: "Ilustrație", description: "Selectarea rapidă a culorilor potrivite pentru grafică și ilustrații." },
        { icon: "💻", title: "Culori UI", description: "Culori armonioase de fundal, accent și stare pentru interfețe web." },
        { icon: "📊", title: "Diagrame", description: "Culori distincte, dar armonioase, pentru vizualizarea datelor." },
      ],
      formatComparison: {
        title: "Scheme de armonie",
        columns: ["Schemă", "Unghiuri", "Efect"],
        rows: [
          { feature: "Complementară", values: ["0°, 180°", "Contrast puternic"] },
          { feature: "Analoagă", values: ["−30°, 0°, +30°", "Calmă, unitară"] },
          { feature: "Triadică", values: ["0°, 120°, 240°", "Vie, echilibrată"] },
          { feature: "Complementară divizată", values: ["0°, 150°, 210°", "Contrast, mai blând"] },
          { feature: "Tetradică (pătrat)", values: ["0°, 90°, 180°, 270°", "Bogată, colorată"] },
          { feature: "Monocromatică", values: ["aceeași nuanță, luminozitate diferită", "Curată, elegantă"] },
        ],
      },
      aboutSection: {
        title: "Despre armonia culorilor",
        paragraphs: [
          "Armonia culorilor descrie care culori se potrivesc estetic. La bază stă cercul cromatic, pe care culorile sunt dispuse după nuanța lor, între 0 și 360 de grade. Schemele clasice de armonie determină culori potrivite în funcție de poziția (unghiul) pe cerc – de exemplu, culorile opuse sunt complementare, cele vecine sunt analoage.",
          "Aceste reguli nu sunt arbitrare: ochiul și creierul uman percep anumite relații de culoare ca echilibrate, iar altele ca tensionate. Schemele de armonie oferă un punct de plecare – nu sunt reguli obligatorii, dar dau o bază sigură pentru construirea unei palete plăcute și profesionale, pe care apoi o poți rafina ajustând saturația și luminozitatea.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pornește de la o culoare de brand sau de accent puternică și construiește schema pe ea – nu invers." },
        { icon: "⚖️", tip: "Într-o paletă funcționează de obicei cel mai bine o culoare dominantă, una-două complementare și una de accent (regula 60-30-10)." },
        { icon: "♿", tip: "Verifică contrastul perechilor de culori alese cu verificatorul de contrast, pentru lizibilitate." },
      ],
    },
  },

  // ─── Simulator de daltonism ───────────────────────────────────────────────
  "szinvaksag-szimulator": {
    introText:
      "Simulatorul de daltonism arată cum apare o culoare pentru persoanele cu cele mai frecvente deficiențe de vedere a culorilor: protanopie (lipsă de roșu), deuteranopie (lipsă de verde), tritanopie (lipsă de albastru) și acromatopsie (lipsă totală a culorii). Astfel poți verifica dacă culorile design-ului tău rămân distincte pentru toată lumea. Pentru designeri și dezvoltatori care creează interfețe accesibile, utilizabile de oricine.",
    guide: [
      "1. Introdu culoarea testată cu cod HEX sau cu selectorul de culoare.",
      "2. Instrumentul arată aspectul simulat al culorii pentru fiecare tip de daltonism.",
      "3. Compară mostrele – dacă două culori importante se contopesc, merită modificate.",
      "4. Orice valoare HEX simulată poate fi copiată cu un clic.",
    ],
    faq: [
      { q: "Ce este daltonismul?", a: "Daltonismul este capacitatea redusă de a distinge culorile, de obicei ereditară. Cel mai frecvent este tipul roșu-verde (protanopie/deuteranopie), care afectează circa 8% dintre bărbați." },
      { q: "Ce tipuri simulează?", a: "Patru: protanopie (lipsa percepției roșului), deuteranopie (a verdelui), tritanopie (a albastrului, rară) și acromatopsie (lipsa totală a culorii, doar diferențe de luminozitate). Deuteranopia este cea mai frecventă." },
      { q: "Cât de precisă este simularea?", a: "Aproximativă: se bazează pe matrice de transformare a culorilor răspândite în literatura de specialitate. Este un instrument excelent pentru verificarea rapidă a accesibilității design-ului, dar nu este potrivit pentru diagnostic medical." },
      { q: "De ce este important în design?", a: "Dacă interfața transmite informația exclusiv prin culoare (de ex. roșu = eroare, verde = succes), pentru persoanele cu daltonism aceasta se poate pierde. Simulatorul ajută la depistarea unor astfel de probleme încă din faza de proiectare." },
      { q: "Culoarea ajunge pe server?", a: "Nu, întreaga simulare rulează în browserul tău – culoarea nu părăsește dispozitivul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introducerea culorii", description: "Scrie cu cod HEX sau alege cu selectorul culoarea de verificat." },
        { title: "2. Vizualizarea simulării", description: "Apare culoarea cu vedere normală și simulată pentru cele patru tipuri de daltonism." },
        { title: "3. Comparare", description: "Verifică dacă culoarea rămâne distinctă – mai ales la perechile critice de culori." },
        { title: "4. Copierea valorii", description: "Orice valoare HEX simulată poate fi copiată în clipboard." },
      ],
      useCases: [
        { icon: "♿", title: "Accesibilitate", description: "Verificarea faptului că culorile interfeței rămân distincte pentru toată lumea." },
        { icon: "🚦", title: "Indicatori de stare", description: "Testarea semnalelor de succes/eroare (verde/roșu) – care se contopesc ușor la daltonismul roșu-verde." },
        { icon: "📊", title: "Vizualizarea datelor", description: "Verificarea culorilor din diagrame și hărți, astfel încât categoriile să se distingă." },
        { icon: "🎨", title: "Culori de brand", description: "Examinarea modului în care percepe o parte a publicului culorile de brand." },
      ],
      formatComparison: {
        title: "Tipuri de daltonism",
        columns: ["Tip", "Ce lipsește", "Frecvență"],
        rows: [
          { feature: "Protanopie", values: ["Percepția roșului", "bărbați ~1%"] },
          { feature: "Deuteranopie", values: ["Percepția verdelui", "bărbați ~6%"] },
          { feature: "Tritanopie", values: ["Percepția albastrului", "foarte rar"] },
          { feature: "Acromatopsie", values: ["Toate culorile", "extrem de rar"] },
        ],
      },
      aboutSection: {
        title: "Despre daltonism",
        paragraphs: [
          "Daltonismul este scăderea ereditară sau dobândită a capacității de a distinge culorile. Unul dintre cele trei tipuri de conuri receptoare de culoare din ochi lipsește sau funcționează diferit, de aceea anumite culori se contopesc. Cel mai frecvent este tipul roșu-verde, care afectează aproape 8% dintre bărbați și o mică parte dintre femei.",
          "Din punct de vedere al design-ului, asta înseamnă că nu trebuie să te bazezi exclusiv pe culoare pentru a transmite informația. Dacă un buton își indică starea doar prin culoare, sau o diagramă distinge categoriile doar prin culoare, pentru persoanele cu daltonism acest lucru se poate pierde. Soluția: pe lângă culoare folosește și formă, pictogramă, model sau etichetă – iar simulatorul te ajută să depistezi cazurile problematice.",
        ],
      },
      tips: [
        { icon: "🔴", tip: "Roșu-verde este cel mai frecvent – nu folosi niciodată aceste două culori ca singură metodă de diferențiere." },
        { icon: "➕", tip: "Pe lângă culoare adaugă mereu un semnal secundar: pictogramă, formă, model sau text." },
        { icon: "🔍", tip: "Dacă două culori importante se contopesc în simulare, mărește diferența de luminozitate dintre ele." },
      ],
    },
  },
};
