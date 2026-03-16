import type { ContentMap } from "../types.ts";

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  PDF, EXCEL, MARKDOWN, HTML, FIȘIERE, SEO – Conținut SEO                   ║
// ║  Tot textul în română. Întreaga procesare are loc 100% în browser.         ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ═══════════════════════════════════════════════════════════════════════════════
// PDF (17 instrumente)
// ═══════════════════════════════════════════════════════════════════════════════

export const PDF_RO_CONTENT: ContentMap = {
  // ─── 1. Unire PDF ─────────────────────────────────────────────────────────
  "osszeillesztes": {
    introText:
      "Unește mai multe fișiere PDF într-un singur document, în câteva secunde, direct în browser. Nu este nevoie de instalare, înregistrare, iar fișierele tale nu părăsesc niciodată computerul.",
    guide: [
      "1. Trage sau selectează fișierele PDF pe care dorești să le unești.",
      "2. Rearanjează ordinea fișierelor prin tragere, dacă este necesar.",
      "3. Apasă butonul «Unire» – PDF-ul combinat poate fi descărcat imediat.",
    ],
    faq: [
      { q: "La ce este utilă unirea PDF-urilor?", a: "Servește la combinarea mai multor fișiere PDF separate într-un singur document, de exemplu pentru facturi, contracte sau prezentări." },
      { q: "Este sigur din punct de vedere al fișierelor mele?", a: "Da, întreaga procesare are loc în browserul tău, fișierele nu sunt încărcate pe niciun server." },
      { q: "Câte fișiere pot uni simultan?", a: "Nu există o limită fixă, dar memoria browserului stabilește granița – de obicei pot fi unite fără probleme chiar și 50-100 de PDF-uri." },
      { q: "Se păstrează conținutul intern al PDF-urilor (linkuri, marcaje)?", a: "Conținutul text, imaginile și formatarea de bază se păstrează. Elementele interactive (câmpuri de formular, JS) nu sunt întotdeauna menținute." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este responsiv și funcționează pe telefon și tabletă." },
      { q: "Ce dimensiune pot avea fișierele unite?", a: "În funcție de memoria browserului, funcționează de obicei cu fișiere de până la 100 MB fiecare." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea fișierelor", description: "Trage sau selectează fișierele PDF pe care dorești să le unești." },
        { title: "2. Stabilirea ordinii", description: "Rearanjează ordinea fișierelor prin tragere." },
        { title: "3. Unire", description: "Apasă butonul și instrumentul generează un singur PDF." },
        { title: "4. Descărcare", description: "Descarcă imediat PDF-ul combinat." },
      ],
      useCases: [
        { icon: "📑", title: "Unirea facturilor", description: "Organizează facturile lunare într-un singur PDF pentru contabilitate." },
        { icon: "📚", title: "Combinarea materialelor didactice", description: "Unirea capitolelor sau slide-urilor separate într-un singur document." },
        { icon: "📋", title: "Documentație de proiect", description: "Atașarea anexelor și certificatelor într-un singur fișier." },
      ],
      aboutSection: {
        title: "De ce merită să unești PDF-urile?",
        paragraphs: [
          "Unirea PDF-urilor simplifică gestionarea documentelor: un singur fișier este mai ușor de partajat, arhivat și tipărit decât zeci de documente separate.",
          "Instrumentul nostru folosește biblioteca pdf-lib, care procesează fișierele direct în browser – astfel sunt garantate protecția datelor și funcționarea rapidă.",
        ],
      },
      tips: [
        { icon: "📂", tip: "Aranjează fișierele în ordine înainte de unire, pentru ca documentul final să fie logic." },
        { icon: "🔒", tip: "Deblochează PDF-urile protejate cu parolă înainte de a le uni." },
        { icon: "📏", tip: "PDF-urile cu dimensiuni de pagină diferite pot fi unite – dimensiunea paginii se păstrează per fișier." },
      ],
      formatComparison: {
        title: "Comparație PDF vs formate de imagine",
        columns: ["Proprietate", "PDF", "JPG/PNG", "TIFF"],
        rows: [
          { feature: "Multipagină", values: ["Da", "Nu", "Da"] },
          { feature: "Text căutabil", values: ["Da", "Nu", "Nu"] },
          { feature: "Dimensiunea fișierului", values: ["Medie", "Mică", "Mare"] },
          { feature: "Calitate la imprimare", values: ["Excelentă", "Variabilă", "Excelentă"] },
        ],
      },
    },
  },

  // ─── 2. Separare PDF ──────────────────────────────────────────────────────
  "szetbontas": {
    introText:
      "Separă documentul PDF mare în fișiere mai mici, independente, pe baza numărului de pagini sau a intervalelor de pagini. Întregul proces are loc în browserul tău, nimic nu este încărcat pe server.",
    guide: [
      "1. Încarcă fișierul PDF pe care dorești să-l separi.",
      "2. Specifică intervalele de pagini (de ex. 1-3, 4-6, 7-10).",
      "3. Apasă butonul «Separare» – fișierele parțiale pot fi descărcate în format ZIP.",
    ],
    faq: [
      { q: "La ce este utilă separarea PDF-ului?", a: "Servește la împărțirea unui document PDF mare în mai multe fișiere mai mici, independente, pe baza numărului de pagini sau a intervalului." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, fișierele sunt procesate exclusiv în browserul tău." },
      { q: "Cum pot specifica intervalele de pagini?", a: "Specifică intervalele separate prin virgulă, de ex. «1-3, 4-6, 7» – fiecare interval devine un PDF separat." },
      { q: "Ce se întâmplă cu fișierul original?", a: "Fișierul original rămâne neschimbat, instrumentul creează fișiere PDF noi, separate." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul funcționează în orice browser modern, inclusiv pe mobil." },
      { q: "Pot descărca toate părțile simultan?", a: "Da, toate PDF-urile separate pot fi descărcate într-un singur fișier ZIP." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează sau trage fișierul PDF pe care dorești să-l separi." },
        { title: "2. Specificarea intervalelor", description: "Introdu intervalele de pagini (de ex. 1-3, 4-6)." },
        { title: "3. Separare", description: "Apasă butonul – instrumentul generează PDF-uri separate pentru fiecare interval." },
        { title: "4. Descărcare", description: "Descarcă documentele parțiale individual sau în format ZIP." },
      ],
      useCases: [
        { icon: "📄", title: "Extragerea capitolelor", description: "Extrage doar capitolele relevante dintr-un document lung." },
        { icon: "📧", title: "Atașament e-mail", description: "Împarte un PDF prea mare pentru a-l trimite mai ușor prin e-mail." },
        { icon: "🗂️", title: "Arhivare", description: "Organizează documentele în fișiere separate pe unități logice." },
      ],
      aboutSection: {
        title: "Când merită să separi un PDF?",
        paragraphs: [
          "Separarea PDF-ului este utilă atunci când ai nevoie doar de anumite pagini dintr-un document mare, sau când dorești să reduci dimensiunea fișierului pentru partajare.",
          "Instrumentul funcționează în browserul tău, astfel încât chiar și în cazul documentelor confidențiale este garantată protecția completă a datelor.",
        ],
      },
      tips: [
        { icon: "📖", tip: "Folosește previzualizarea paginilor pentru a vedea exact ce pagină vrei să incluzi în fiecare interval." },
        { icon: "🔢", tip: "Poți extrage și o singură pagină: introdu de ex. «5» ca interval cu un singur număr." },
        { icon: "💾", tip: "Descărcarea ZIP este mai convenabilă dacă generezi multe părți simultan." },
      ],
    },
  },

  // ─── 3. Selectarea paginilor ──────────────────────────────────────────────
  "oldalak-kivalasztasa": {
    introText:
      "Selectează paginile dorite din documentul PDF și creează un nou fișier PDF din ele. Lucrezi cu o previzualizare vizuală convenabilă, iar totul are loc în browserul tău.",
    guide: [
      "1. Încarcă fișierul PDF în instrument.",
      "2. Marchează paginile pe care dorești să le păstrezi în vizualizarea cu miniaturi.",
      "3. Apasă butonul «Salvare pagini selectate» – noul PDF poate fi descărcat imediat.",
    ],
    faq: [
      { q: "La ce este utilă selectarea paginilor?", a: "Servește la extragerea paginilor dorite dintr-un PDF și salvarea lor într-un document nou." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Absolut, procesarea are loc în browser, fișierul nu este încărcat pe server." },
      { q: "Pot selecta pagini neadiacente?", a: "Da, poți marca orice pagini dorești, nu este necesar să fie consecutive." },
      { q: "PDF-ul original se modifică?", a: "Nu, instrumentul creează un fișier PDF nou din paginile selectate." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, previzualizarea și selectarea funcționează și pe mobil." },
      { q: "Câte pagini pot selecta?", a: "Poți selecta orice număr de pagini – de la una singură până la toate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează fișierul PDF de pe computer." },
        { title: "2. Selectarea paginilor", description: "Apasă pe miniaturile paginilor dorite pentru a le selecta." },
        { title: "3. Crearea noului PDF", description: "Apasă butonul de salvare – noul PDF conține doar paginile selectate." },
      ],
      useCases: [
        { icon: "✂️", title: "Extragerea paginilor relevante", description: "Extrage doar paginile importante dintr-un raport lung." },
        { icon: "📤", title: "Optimizare pentru partajare", description: "Trimite doar paginile necesare, reducând dimensiunea fișierului." },
        { icon: "🖨️", title: "Pregătire pentru imprimare", description: "Selectează doar paginile pe care dorești să le tipărești." },
      ],
      aboutSection: {
        title: "Selectarea paginilor din PDF",
        paragraphs: [
          "Instrumentul de selectare a paginilor oferă o previzualizare vizuală cu miniaturi, astfel încât vezi exact ce pagină selectezi.",
          "Instrumentul este ideal atunci când ai nevoie doar de câteva pagini specifice dintr-un document lung și nu dorești să partajezi întregul fișier.",
        ],
      },
      tips: [
        { icon: "👆", tip: "Apasă pe miniaturi pentru selectarea rapidă a paginilor." },
        { icon: "🔄", tip: "Ordinea paginilor rămâne cea din selecție în noul PDF." },
        { icon: "📋", tip: "Folosește funcția «Selectează tot» și apoi deselectează paginile nedorite." },
      ],
    },
  },

  // ─── 4. Ordinea paginilor ─────────────────────────────────────────────────
  "oldalak-sorrendje": {
    introText:
      "Rearanjează ordinea paginilor PDF prin simpla tragere (drag & drop). Documentul modificat poate fi descărcat imediat, iar fișierul nu părăsește niciodată browserul tău.",
    guide: [
      "1. Încarcă fișierul PDF.",
      "2. Trage miniaturile paginilor în ordinea dorită.",
      "3. Apasă butonul «Salvare» – PDF-ul rearanjat poate fi descărcat.",
    ],
    faq: [
      { q: "La ce este utilă rearanjarea paginilor?", a: "Poți schimba ordinea paginilor unui document PDF prin tragere, fără ca alt conținut să se modifice." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, totul rulează în browserul tău, fără încărcare pe server." },
      { q: "Pot anula modificările?", a: "Da, fișierul original rămâne neschimbat, poți reîncepe oricând." },
      { q: "Cu ce dimensiuni de PDF funcționează?", a: "Depinde de memoria browserului, dar de obicei pot fi gestionate PDF-uri cu sute de pagini." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, funcționează și prin tragere tactilă pe mobil și tabletă." },
      { q: "Se modifică conținutul paginilor?", a: "Nu, se modifică doar ordinea – conținutul paginilor rămâne intact." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează fișierul PDF de pe computer." },
        { title: "2. Rearanjarea paginilor", description: "Trage miniaturile în ordinea dorită." },
        { title: "3. Salvare", description: "Apasă butonul de salvare pentru a finaliza noua ordine." },
      ],
      useCases: [
        { icon: "📊", title: "Rearanjarea prezentării", description: "Modificarea ordinii slide-urilor într-o prezentare PDF." },
        { icon: "📖", title: "Ordonarea capitolelor", description: "Aranjarea în ordine logică a capitolelor dintr-un document combinat." },
        { icon: "🖨️", title: "Ordine de imprimare", description: "Aranjarea paginilor în ordinea optimă pentru imprimare." },
      ],
      aboutSection: {
        title: "Rearanjarea paginilor PDF",
        paragraphs: [
          "Instrumentul de modificare a ordinii paginilor oferă o interfață vizuală drag & drop pentru rearanjarea rapidă și intuitivă a paginilor.",
          "Fișierul original rămâne întotdeauna intact – instrumentul creează un PDF nou în ordinea specificată.",
        ],
      },
      tips: [
        { icon: "🖱️", tip: "Trage miniatura în poziția dorită – paginile se rearanjează automat." },
        { icon: "📄", tip: "La documentele cu multe pagini, folosește scroll-ul pentru navigare." },
        { icon: "↩️", tip: "Dacă ai greșit, reîncarcă fișierul pentru a restaura ordinea originală." },
      ],
    },
  },

  // ─── 5. Rotirea paginilor ─────────────────────────────────────────────────
  "oldalak-forgatasa": {
    introText:
      "Rotește paginile PDF cu 90, 180 sau 270 de grade – individual sau simultan. Ideal pentru corectarea documentelor scanate sau rotite greșit, direct în browser.",
    guide: [
      "1. Încarcă fișierul PDF.",
      "2. Selectează paginile de rotit și gradul de rotire.",
      "3. Apasă butonul «Salvare» – PDF-ul modificat poate fi descărcat imediat.",
    ],
    faq: [
      { q: "La ce este utilă rotirea paginilor?", a: "Servește la rotirea paginilor PDF în pași de 90°, de exemplu pentru corectarea documentelor scanate greșit." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, procesarea are loc în întregime în browserul tău." },
      { q: "Pot roti paginile individual?", a: "Da, poți selecta ce pagini și în ce direcție dorești să le rotești." },
      { q: "Se degradează calitatea prin rotire?", a: "Nu, rotirea este fără pierderi – conținutul și calitatea paginii rămân neschimbate." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul funcționează și pe mobil și tabletă." },
      { q: "Rotirea este reversibilă?", a: "Da, fișierul original rămâne intact și poți inversa oricând rotirea." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Trage sau selectează fișierul PDF." },
        { title: "2. Selectarea paginilor și direcției", description: "Marchează paginile și selectează direcția de rotire." },
        { title: "3. Salvare", description: "Apasă butonul de salvare pentru a descărca PDF-ul rotit." },
      ],
      useCases: [
        { icon: "📷", title: "Corectarea documentelor scanate", description: "Rotirea paginilor scanate greșit în poziția corectă de citire." },
        { icon: "🔄", title: "Comutare peisaj/portret", description: "Rotirea paginilor cu tabele în mod peisaj pentru o citire mai bună." },
        { icon: "🖨️", title: "Pregătire pentru imprimare", description: "Asigurarea orientării corecte a paginilor înainte de imprimare." },
      ],
      aboutSection: {
        title: "Rotirea paginilor PDF",
        paragraphs: [
          "Rotirea paginilor PDF este o operațiune fără pierderi: nu afectează conținutul, textul și imaginile paginii, ci doar modifică direcția de afișare.",
          "Este deosebit de utilă la documentele scanate, unde paginile au ajuns accidental în fișier cu orientarea greșită.",
        ],
      },
      tips: [
        { icon: "🔄", tip: "90° la dreapta = în sensul acelor de ceasornic, 90° la stânga = în sens invers." },
        { icon: "📑", tip: "Cu funcția «Selectează tot» poți roti toate paginile simultan." },
        { icon: "👀", tip: "Folosește previzualizarea după rotire, înainte de a descărca fișierul." },
      ],
    },
  },

  // ─── 6. Ștergerea paginilor ───────────────────────────────────────────────
  "oldalak-torlese": {
    introText:
      "Elimină paginile inutile din documentul PDF. Selectează paginile de șters din previzualizare și descarcă PDF-ul redus – totul rămâne în browserul tău.",
    guide: [
      "1. Încarcă fișierul PDF.",
      "2. Marchează paginile de șters în vizualizarea cu miniaturi.",
      "3. Apasă butonul «Salvare» – noul PDF cu paginile rămase poate fi descărcat.",
    ],
    faq: [
      { q: "La ce este utilă ștergerea paginilor?", a: "Servește la eliminarea paginilor inutile din documentul PDF, de exemplu pagini goale sau conținut irelevant." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, procesarea are loc exclusiv în browserul tău." },
      { q: "Ștergerea este reversibilă?", a: "Fișierul original rămâne neschimbat pe computer – doar noul PDF descărcat nu conține paginile șterse." },
      { q: "Pot șterge mai multe pagini simultan?", a: "Da, poți marca oricâte pagini dorești pentru ștergere simultană." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, funcționează în orice browser modern, inclusiv pe mobil." },
      { q: "Scade dimensiunea fișierului după ștergere?", a: "Da, dimensiunea fișierului scade proporțional cu conținutul paginilor șterse." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează fișierul PDF de pe computer." },
        { title: "2. Marcarea paginilor pentru ștergere", description: "Apasă pe miniaturile paginilor pe care dorești să le ștergi." },
        { title: "3. Descărcarea PDF-ului modificat", description: "Apasă butonul de salvare – noul PDF conține doar paginile păstrate." },
      ],
      useCases: [
        { icon: "🗑️", title: "Ștergerea paginilor goale", description: "Eliminarea paginilor goale inutile din documentele scanate." },
        { icon: "🔐", title: "Eliminarea paginilor confidențiale", description: "Eliminarea paginilor confidențiale înainte de partajare." },
        { icon: "📉", title: "Reducerea dimensiunii fișierului", description: "Prin ștergerea paginilor inutile scade și dimensiunea fișierului." },
      ],
      aboutSection: {
        title: "Ștergerea paginilor din PDF",
        paragraphs: [
          "Instrumentul de ștergere a paginilor permite partajarea sau stocarea documentului fără pagini inutile.",
          "Fișierul original rămâne întotdeauna intact – instrumentul generează un PDF nou din paginile păstrate.",
        ],
      },
      tips: [
        { icon: "👀", tip: "Verifică întotdeauna în previzualizare că ai marcat paginile corecte pentru ștergere." },
        { icon: "↩️", tip: "Dacă ai marcat accidental o pagină greșită, apasă din nou pe ea pentru a deselecta." },
        { icon: "💾", tip: "Salvează și PDF-ul original înainte de a descărca versiunea modificată." },
      ],
    },
  },

  // ─── 7. PDF în imagine ────────────────────────────────────────────────────
  "pdf-keppe": {
    introText:
      "Transformă paginile PDF în fișiere imagine (JPG sau PNG). Ideal dacă dorești să inserezi conținutul documentului într-o prezentare, pe un site web sau pe rețelele sociale.",
    guide: [
      "1. Încarcă fișierul PDF.",
      "2. Selectează formatul de imagine (JPG/PNG) și rezoluția.",
      "3. Apasă butonul «Conversie» – imaginile pot fi descărcate individual sau în format ZIP.",
    ],
    faq: [
      { q: "La ce este utilă conversia PDF în imagine?", a: "Servește la convertirea paginilor PDF în fișiere imagine (JPG, PNG) pentru a le folosi pe site-uri web, în prezentări sau pe rețele sociale." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, conversia are loc în întregime în browser." },
      { q: "Ce rezoluție pot alege?", a: "Poți alege între rezoluție scăzută (72 DPI), medie (150 DPI) și înaltă (300 DPI)." },
      { q: "Să aleg JPG sau PNG?", a: "JPG oferă dimensiuni mai mici pentru fotografii, PNG este mai bun pentru conținut text și fundal transparent." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este disponibil și pe mobil." },
      { q: "Pot converti toate paginile simultan?", a: "Da, toate paginile pot fi convertite simultan și descărcate în format ZIP." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează fișierul PDF pe care dorești să-l convertești." },
        { title: "2. Setări", description: "Selectează formatul de imagine și rezoluția." },
        { title: "3. Conversie", description: "Apasă butonul de conversie – fiecare pagină devine un fișier imagine separat." },
        { title: "4. Descărcare", description: "Descarcă imaginile individual sau în format ZIP." },
      ],
      useCases: [
        { icon: "🌐", title: "Afișare web", description: "Integrarea conținutului PDF ca imagine pe pagini web." },
        { icon: "📱", title: "Rețele sociale", description: "Partajarea paginilor de document ca imagini pe platformele sociale." },
        { icon: "📊", title: "Prezentări", description: "Inserarea paginilor PDF în prezentări PowerPoint sau Google Slides." },
      ],
      aboutSection: {
        title: "Conversia PDF în imagine",
        paragraphs: [
          "Conversia PDF în imagine permite partajarea conținutului documentului într-un format universal vizibil.",
          "Prin selectarea rezoluției poți echilibra calitatea imaginii și dimensiunea fișierului în funcție de scopul utilizării.",
        ],
      },
      tips: [
        { icon: "📐", tip: "Pentru utilizare web 150 DPI este de obicei suficient, pentru imprimare alege 300 DPI." },
        { icon: "🖼️", tip: "Pentru documente text, PNG este alegerea mai bună pentru un afișaj mai clar." },
        { icon: "📦", tip: "La multe pagini, descărcarea ZIP este mai rapidă și mai convenabilă." },
      ],
    },
  },

  // ─── 8. Imagini în PDF ────────────────────────────────────────────────────
  "kepek-pdfbe": {
    introText:
      "Combină imaginile tale (JPG, PNG, WebP) într-un singur document PDF. Setează dimensiunea paginii, orientarea și plasarea imaginilor – totul rămâne în browserul tău.",
    guide: [
      "1. Trage sau selectează fișierele imagine.",
      "2. Setează dimensiunea paginii (A4, Letter etc.) și orientarea.",
      "3. Aranjează ordinea imaginilor, apoi apasă butonul «Creare PDF».",
    ],
    faq: [
      { q: "La ce este utilă conversia imaginilor în PDF?", a: "Servește la transformarea mai multor imagini într-un singur document PDF ordonat, de exemplu pentru albume foto sau arhivarea documentelor." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, imaginile nu sunt încărcate pe server – PDF-ul este creat în browser." },
      { q: "Ce formate de imagine acceptă?", a: "Suportă formatele JPG, PNG și WebP." },
      { q: "Pot seta dimensiunea paginii?", a: "Da, poți alege între A4, Letter și alte dimensiuni standard, cu orientare portret sau peisaj." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul funcționează cu funcționalitate completă și pe mobil." },
      { q: "Câte imagini pot combina?", a: "În funcție de memoria browserului, de obicei pot fi procesate zeci de imagini simultan." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea imaginilor", description: "Trage sau selectează imaginile pe care dorești să le inserezi în PDF." },
        { title: "2. Ordine și setări", description: "Aranjează imaginile și selectează dimensiunea paginii, orientarea." },
        { title: "3. Crearea PDF-ului", description: "Apasă butonul – instrumentul generează un singur PDF din imagini." },
      ],
      useCases: [
        { icon: "📸", title: "Album foto", description: "Colectarea fotografiilor de vacanță sau eveniment într-un album PDF ordonat." },
        { icon: "📋", title: "Arhivarea documentelor", description: "Organizarea imaginilor documentelor scanate într-un singur PDF." },
        { icon: "🎨", title: "Portofoliu", description: "Portofoliu PDF unitar pentru prezentarea lucrărilor grafice sau fotografice." },
      ],
      aboutSection: {
        title: "Conversia imaginilor în PDF",
        paragraphs: [
          "Crearea unui PDF din imagini este soluția ideală atunci când dorești să combini mai multe imagini într-un singur fișier ușor de partajat.",
          "Cu personalizarea dimensiunilor paginilor și orientării poți crea un document cu aspect profesional.",
        ],
      },
      tips: [
        { icon: "🔢", tip: "Aranjează imaginile în ordine înainte de combinare pentru o structură logică a documentului." },
        { icon: "📏", tip: "Alege dimensiunea A4 dacă dorești să și tipărești PDF-ul finalizat." },
        { icon: "🖼️", tip: "Imaginile cu rezoluție mai mare oferă rezultate mai frumoase în PDF." },
      ],
    },
  },

  // ─── 9. Informații PDF ────────────────────────────────────────────────────
  "pdf-informacio": {
    introText:
      "Vizualizează metadatele detaliate ale fișierului PDF: număr de pagini, dimensiunea fișierului, autor, data creării, versiunea PDF și alte proprietăți. Toate datele sunt citite în browserul tău.",
    guide: [
      "1. Încarcă fișierul PDF.",
      "2. Instrumentul afișează automat metadatele fișierului.",
      "3. Copiază informațiile necesare.",
    ],
    faq: [
      { q: "La ce sunt utile informațiile PDF?", a: "Servesc la vizualizarea rapidă a metadatelor fișierelor PDF (număr de pagini, dimensiune, autor, dată, versiune)." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, fișierul este analizat exclusiv în browserul tău." },
      { q: "Ce date afișează?", a: "Număr de pagini, dimensiunea fișierului, dimensiuni pagini, versiune PDF, autor, program de creare, data creării și modificării." },
      { q: "Pot modifica metadatele?", a: "Acest instrument este doar pentru citire – nu modifică metadatele." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul funcționează cu funcționalitate completă și pe mobil." },
      { q: "Pot fi analizate și PDF-urile protejate cu parolă?", a: "Metadatele de bază (dimensiune, număr de pagini) pot fi citite și pentru fișierele protejate cu parolă." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează fișierul PDF ale cărui metadate dorești să le vizualizezi." },
        { title: "2. Vizualizarea datelor", description: "Instrumentul citește și afișează automat proprietățile fișierului." },
        { title: "3. Copierea informațiilor", description: "Copiază datele necesare în clipboard." },
      ],
      useCases: [
        { icon: "🔍", title: "Verificarea documentelor", description: "Verificarea rapidă a versiunii și proprietăților PDF." },
        { icon: "📋", title: "Metadate de arhivare", description: "Înregistrarea metadatelor la arhivarea documentelor." },
        { icon: "🛠️", title: "Depanare", description: "Diagnosticarea problemelor de afișare PDF pe baza versiunii și programului de creare." },
      ],
      aboutSection: {
        title: "Metadatele PDF",
        paragraphs: [
          "Fișierele PDF conțin metadate ascunse: autor, program de creare, date și alte informații tehnice.",
          "Aceste date sunt utile pentru gestionarea documentelor, arhivare și identificarea problemelor de compatibilitate.",
        ],
      },
      tips: [
        { icon: "📊", tip: "Verifică versiunea PDF dacă întâmpini probleme de compatibilitate într-un cititor." },
        { icon: "📅", tip: "Data creării poate fi utilă pentru ordonarea cronologică a documentelor." },
        { icon: "📐", tip: "Informația despre dimensiunea paginii ajută la alegerea setărilor de imprimare." },
      ],
    },
  },

  // ─── 10. Comprimare PDF ────────────────────────────────────────────────────
  "tomoritese": {
    introText:
      "Reduce dimensiunea fișierului PDF fără pierderi semnificative de calitate. Ideal pentru trimiterea prin e-mail sau încărcarea pe platforme cu limite de dimensiune. Totul are loc în browserul tău.",
    guide: [
      "1. Încarcă fișierul PDF pe care dorești să-l comprimi.",
      "2. Selectează nivelul de compresie dorit (scăzut, mediu, ridicat).",
      "3. Apasă butonul «Comprimare» – PDF-ul optimizat poate fi descărcat imediat.",
    ],
    faq: [
      { q: "La ce este utilă comprimarea PDF-ului?", a: "Servește la reducerea dimensiunii fișierului PDF pentru a-l putea trimite mai ușor prin e-mail sau pentru a economisi spațiu de stocare." },
      { q: "Se pierde calitatea documentului?", a: "Comprimarea optimizează imaginile și structura internă, dar textul și elementele vectoriale rămân intacte. Pierderea de calitate vizuală este minimă." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, fișierul este procesat exclusiv în browserul tău, fără a fi încărcat pe vreun server." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează sau trage fișierul PDF pe care dorești să-l comprimi." },
        { title: "2. Alegerea nivelului de compresie", description: "Selectează nivelul dorit: compresie ușoară pentru calitate maximă sau compresie puternică pentru dimensiune minimă." },
        { title: "3. Comprimare", description: "Apasă butonul – instrumentul optimizează fișierul." },
        { title: "4. Descărcare", description: "Descarcă PDF-ul comprimat pe computer." },
      ],
      useCases: [
        { icon: "📧", title: "Trimitere prin e-mail", description: "Reduce dimensiunea PDF-ului pentru a respecta limitele de atașament ale serviciilor de e-mail." },
        { icon: "☁️", title: "Încărcare în cloud", description: "Optimizează PDF-urile mari pentru încărcare rapidă pe platforme cloud." },
        { icon: "💾", title: "Economisire spațiu", description: "Comprimă arhivele de documente PDF pentru a economisi spațiu de stocare." },
        { icon: "📱", title: "Partajare pe mobil", description: "Fișierele mai mici se descarcă și se deschid mai rapid pe dispozitivele mobile." },
      ],
      aboutSection: {
        title: "De ce să comprimi fișierele PDF?",
        paragraphs: [
          "Fișierele PDF pot deveni foarte mari, mai ales dacă conțin imagini de înaltă rezoluție sau grafice complexe. Comprimarea reduce dimensiunea fără a afecta semnificativ calitatea vizuală.",
          "Instrumentul nostru folosește tehnici de optimizare a imaginilor și a structurii interne a PDF-ului, procesând totul direct în browser pentru a garanta confidențialitatea datelor.",
        ],
      },
      tips: [
        { icon: "⚖️", tip: "Alege compresie ușoară pentru documente unde calitatea imaginii este critică (portofolii, fotografii)." },
        { icon: "📊", tip: "Comprimarea puternică poate reduce dimensiunea cu până la 70-80% pentru PDF-uri cu multe imagini." },
        { icon: "🔍", tip: "Verifică PDF-ul comprimat înainte de a-l trimite, pentru a te asigura că textul rămâne lizibil." },
      ],
    },
  },

  // ─── 11. Watermark PDF ─────────────────────────────────────────────────────
  "pdf-vizjel": {
    introText:
      "Adaugă un filigran (watermark) text sau imagine pe paginile documentului PDF. Protejează-ți documentele marcându-le cu numele tău, logo-ul companiei sau mențiunea «Confidențial». Procesarea se face complet în browser.",
    guide: [
      "1. Încarcă fișierul PDF.",
      "2. Introdu textul filigranului sau încarcă o imagine de filigran.",
      "3. Ajustează poziția, dimensiunea și transparența.",
      "4. Apasă butonul «Aplicare» – PDF-ul cu filigran poate fi descărcat.",
    ],
    faq: [
      { q: "La ce este util filigranul PDF?", a: "Servește la protejarea documentelor împotriva utilizării neautorizate, prin adăugarea unui text sau logo vizibil pe fiecare pagină." },
      { q: "Pot personaliza aspectul filigranului?", a: "Da, poți ajusta textul, dimensiunea, culoarea, rotația și transparența filigranului." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, fișierul nu părăsește browserul tău – procesarea are loc local." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează fișierul PDF pe care dorești să-l marchezi cu filigran." },
        { title: "2. Configurarea filigranului", description: "Introdu textul dorit sau încarcă o imagine de filigran." },
        { title: "3. Ajustarea poziției", description: "Setează poziția, dimensiunea, rotația și transparența filigranului." },
        { title: "4. Descărcare", description: "Apasă butonul de aplicare și descarcă PDF-ul cu filigran." },
      ],
      useCases: [
        { icon: "🔒", title: "Documente confidențiale", description: "Marchează documentele sensibile cu mențiunea «Confidențial» sau «Doar pentru uz intern»." },
        { icon: "🏢", title: "Branding corporativ", description: "Adaugă logo-ul companiei pe propuneri, rapoarte și prezentări." },
        { icon: "📝", title: "Versiuni draft", description: "Marchează versiunile preliminare cu filigranul «Draft» pentru a evita confuziile." },
        { icon: "©️", title: "Protecția drepturilor de autor", description: "Adaugă numele autorului pe materiale digitale pentru protecția proprietății intelectuale." },
      ],
      aboutSection: {
        title: "De ce să adaugi filigran pe PDF-uri?",
        paragraphs: [
          "Filigranul este o metodă eficientă de protejare a documentelor împotriva copierii sau distribuirii neautorizate. Marchează clar proprietatea și statutul documentului.",
          "Instrumentul nostru oferă opțiuni flexibile de personalizare a filigranului – text sau imagine, cu control complet asupra poziției, dimensiunii și transparenței, totul procesat în browser.",
        ],
      },
      tips: [
        { icon: "👁️", tip: "Setează transparența la 30-50% pentru ca filigranul să fie vizibil fără a obstrucționa conținutul." },
        { icon: "↗️", tip: "Rotirea diagonală (45°) face filigranul mai greu de eliminat și mai vizibil." },
        { icon: "🎨", tip: "Folosește culori deschise (gri deschis) pentru filigranele text, pentru a nu afecta lizibilitatea documentului." },
      ],
    },
  },

  // ─── 12. Numerotare pagini PDF ─────────────────────────────────────────────
  "oldalszamok": {
    introText:
      "Adaugă numere de pagină pe documentul PDF. Alege poziția, formatul și stilul numerotării. Procesarea completă are loc în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Încarcă fișierul PDF.",
      "2. Selectează poziția numerelor de pagină (sus/jos, stânga/centru/dreapta).",
      "3. Alege formatul de numerotare și numărul de start.",
      "4. Apasă butonul «Aplicare» – PDF-ul numerotat poate fi descărcat.",
    ],
    faq: [
      { q: "La ce este utilă numerotarea paginilor?", a: "Servește la adăugarea automată a numerelor de pagină pe documentele PDF, facilitând navigarea și referențierea." },
      { q: "Pot alege unde apar numerele de pagină?", a: "Da, poți plasa numerele în antet sau subsol, aliniate la stânga, centru sau dreapta." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, totul se procesează în browserul tău, fără încărcare pe server." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează fișierul PDF pe care dorești să-l numerotezi." },
        { title: "2. Configurarea numerotării", description: "Alege poziția, formatul și stilul numerelor de pagină." },
        { title: "3. Aplicare", description: "Apasă butonul – instrumentul adaugă numerele pe fiecare pagină." },
        { title: "4. Descărcare", description: "Descarcă PDF-ul cu paginile numerotate." },
      ],
      useCases: [
        { icon: "📖", title: "Cărți și manuale", description: "Adaugă numere de pagină pentru navigarea ușoară în documente lungi." },
        { icon: "📋", title: "Rapoarte profesionale", description: "Dă un aspect profesional rapoartelor și propunerilor de afaceri." },
        { icon: "📚", title: "Lucrări academice", description: "Numerotarea paginilor conform cerințelor academice." },
        { icon: "📄", title: "Documente juridice", description: "Adaugă numere de pagină pentru referințe precise în contracte." },
      ],
      aboutSection: {
        title: "Numerotarea paginilor PDF",
        paragraphs: [
          "Numerotarea paginilor este esențială pentru documentele profesionale și academice. Facilitează navigarea, referențierea și oferă un aspect ordonat documentului.",
          "Instrumentul nostru permite personalizarea completă a stilului de numerotare – format, poziție, dimensiune și pagina de start – totul procesat în siguranță în browserul tău.",
        ],
      },
      tips: [
        { icon: "📏", tip: "Plasează numerele de pagină în subsolul centrat pentru cel mai profesional aspect." },
        { icon: "🔢", tip: "Poți exclude prima pagină (coperta) de la numerotare și începe numerotarea de la pagina a doua." },
        { icon: "🎨", tip: "Alege o dimensiune și o culoare a fontului care se potrivesc cu stilul documentului." },
      ],
    },
  },

  // ─── 13. Extragere text din PDF ────────────────────────────────────────────
  "szoveg-kinyerese": {
    introText:
      "Extrage textul din fișierele PDF și salvează-l ca text simplu. Ideal pentru copierea conținutului din documente scanate sau protejate, direct în browserul tău.",
    guide: [
      "1. Încarcă fișierul PDF din care dorești să extragi textul.",
      "2. Instrumentul procesează automat documentul și extrage textul.",
      "3. Copiază textul extras sau descarcă-l ca fișier text.",
    ],
    faq: [
      { q: "La ce este utilă extragerea textului?", a: "Servește la extragerea conținutului text din fișierele PDF pentru editare, analiză sau reutilizare în alte documente." },
      { q: "Funcționează cu documente scanate?", a: "Instrumentul extrage textul încorporat în PDF. Pentru documente scanate ca imagini, este necesară tehnologia OCR." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, procesarea are loc exclusiv în browserul tău, fără transmitere de date." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează fișierul PDF din care dorești să extragi textul." },
        { title: "2. Extragere automată", description: "Instrumentul citește și extrage textul din toate paginile." },
        { title: "3. Copiere sau descărcare", description: "Copiază textul în clipboard sau descarcă-l ca fișier .txt." },
      ],
      useCases: [
        { icon: "📝", title: "Editarea conținutului", description: "Extrage textul din PDF pentru a-l edita în Word sau alt editor de text." },
        { icon: "🔍", title: "Căutare în documente", description: "Transformă conținutul PDF în text căutabil pentru analiza rapidă." },
        { icon: "📊", title: "Extragere date", description: "Extrage date din tabele și rapoarte PDF pentru prelucrare ulterioară." },
        { icon: "🌐", title: "Traducere", description: "Extrage textul din PDF pentru a-l traduce cu un instrument de traducere." },
      ],
      aboutSection: {
        title: "Extragerea textului din PDF",
        paragraphs: [
          "Extragerea textului din PDF este utilă atunci când ai nevoie de conținutul documentului într-un format editabil. Instrumentul identifică straturile de text din fișierul PDF și le extrage fidel.",
          "Procesarea se face complet în browserul tău, garantând confidențialitatea datelor. Textul extras păstrează ordinea paragrafelor și structura de bază a documentului original.",
        ],
      },
      tips: [
        { icon: "📄", tip: "Verifică textul extras – formatarea complexă (coloane, tabele) poate necesita ajustări manuale." },
        { icon: "🔤", tip: "Pentru cele mai bune rezultate, folosește PDF-uri create digital, nu scanate ca imagini." },
        { icon: "📋", tip: "Folosește funcția de copiere pentru a transfera rapid textul extras în alte aplicații." },
      ],
    },
  },

  // ─── 14. Semnare PDF ──────────────────────────────────────────────────────
  "alairas": {
    introText:
      "Adaugă semnătura ta pe documentele PDF – desenează, tastează sau încarcă o imagine cu semnătura. Semnează contracte, formulare și documente oficial, direct din browser.",
    guide: [
      "1. Încarcă fișierul PDF pe care dorești să-l semnezi.",
      "2. Creează semnătura – desenează cu mouse-ul, tastează sau încarcă o imagine.",
      "3. Plasează semnătura pe pagina dorită și ajustează dimensiunea.",
      "4. Apasă butonul «Salvare» – PDF-ul semnat poate fi descărcat.",
    ],
    faq: [
      { q: "La ce este utilă semnarea PDF-ului?", a: "Servește la adăugarea semnăturii personale pe documente PDF, fără a fi nevoie să le tipărești, semnezi manual și scanezi din nou." },
      { q: "Semnătura are valoare juridică?", a: "Semnătura electronică adăugată vizual pe PDF are caracter informativ. Pentru semnătură digitală cu valoare juridică completă, este necesară o semnătură electronică calificată." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, documentul și semnătura rămân în browserul tău, fără a fi transmise pe vreun server." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează documentul PDF pe care dorești să-l semnezi." },
        { title: "2. Crearea semnăturii", description: "Desenează semnătura, tastează-o sau încarcă o imagine cu semnătura ta." },
        { title: "3. Plasarea semnăturii", description: "Trage semnătura pe poziția dorită și ajustează dimensiunea." },
        { title: "4. Descărcare", description: "Salvează și descarcă PDF-ul semnat." },
      ],
      useCases: [
        { icon: "📝", title: "Semnarea contractelor", description: "Semnează contracte și acorduri fără a le tipări." },
        { icon: "📋", title: "Formulare oficiale", description: "Completează și semnează formulare administrative sau fiscale." },
        { icon: "✉️", title: "Scrisori și documente", description: "Adaugă semnătura pe scrisori oficiale și documente de afaceri." },
        { icon: "🏠", title: "Documente imobiliare", description: "Semnează documentele de închiriere sau vânzare-cumpărare." },
      ],
      aboutSection: {
        title: "Semnarea electronică a PDF-urilor",
        paragraphs: [
          "Semnarea electronică a documentelor PDF elimină necesitatea tipăririi, semnării manuale și scanării. Economisești timp și hârtie, putând semna documente de oriunde.",
          "Instrumentul nostru oferă mai multe metode de creare a semnăturii – desen liber, tastare sau imagine încărcată – cu control complet asupra poziționării și dimensiunii pe document.",
        ],
      },
      tips: [
        { icon: "✍️", tip: "Desenează semnătura cu mouse-ul sau cu degetul pe ecranul tactil pentru un aspect natural." },
        { icon: "💾", tip: "Salvează semnătura pentru a o reutiliza rapid pe alte documente." },
        { icon: "📐", tip: "Ajustează dimensiunea semnăturii pentru a se potrivi în spațiul destinat de pe document." },
      ],
    },
  },

  // ─── 15. Protejare PDF cu parolă ──────────────────────────────────────────
  "jelszo-vedelem": {
    introText:
      "Protejează fișierul PDF cu parolă pentru a preveni accesul neautorizat. Setează o parolă de deschidere și restricții de tipărire sau copiere. Criptarea se face complet în browser.",
    guide: [
      "1. Încarcă fișierul PDF pe care dorești să-l protejezi.",
      "2. Introdu parola dorită și selectează restricțiile (tipărire, copiere).",
      "3. Apasă butonul «Protejare» – PDF-ul criptat poate fi descărcat.",
    ],
    faq: [
      { q: "La ce este utilă protejarea cu parolă?", a: "Servește la restricționarea accesului la documentul PDF – doar persoanele care cunosc parola pot deschide fișierul." },
      { q: "Ce tip de criptare se folosește?", a: "Instrumentul folosește criptare standard PDF, care protejează documentul cu parola specificată de tine." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, criptarea are loc exclusiv în browserul tău – parola și fișierul nu sunt transmise nicăieri." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează fișierul PDF pe care dorești să-l protejezi cu parolă." },
        { title: "2. Setarea parolei", description: "Introdu parola de deschidere și selectează restricțiile dorite." },
        { title: "3. Criptare", description: "Apasă butonul – instrumentul criptează fișierul PDF." },
        { title: "4. Descărcare", description: "Descarcă PDF-ul protejat cu parolă." },
      ],
      useCases: [
        { icon: "🔒", title: "Documente confidențiale", description: "Protejează rapoartele financiare, contractele și documentele sensibile." },
        { icon: "📧", title: "Trimitere securizată prin e-mail", description: "Criptează PDF-urile înainte de a le trimite prin e-mail pentru protecție suplimentară." },
        { icon: "🏥", title: "Date medicale", description: "Protejează documentele medicale și rapoartele de sănătate cu parolă." },
        { icon: "👤", title: "Date personale", description: "Securizează documentele ce conțin date cu caracter personal." },
      ],
      aboutSection: {
        title: "Protejarea PDF-urilor cu parolă",
        paragraphs: [
          "Protejarea cu parolă a fișierelor PDF este esențială pentru securizarea documentelor confidențiale. Criptarea previne accesul neautorizat și protejează informațiile sensibile.",
          "Instrumentul nostru permite setarea unei parole de deschidere și a restricțiilor suplimentare (tipărire, copiere), iar întreaga procesare are loc în browserul tău pentru securitate maximă.",
        ],
      },
      tips: [
        { icon: "🔑", tip: "Folosește o parolă puternică – cel puțin 8 caractere, cu litere mari, mici, cifre și simboluri." },
        { icon: "📝", tip: "Notează parola într-un loc sigur – fără ea, documentul nu poate fi deschis." },
        { icon: "🔐", tip: "Adaugă și restricții de copiere sau tipărire pentru un nivel suplimentar de protecție." },
      ],
    },
  },

  // ─── 16. Eliminare parolă PDF ─────────────────────────────────────────────
  "jelszo-eltavolitasa": {
    introText:
      "Elimină protecția cu parolă de pe fișierele PDF. Dacă cunoști parola curentă, poți debloca documentul și salva o versiune fără restricții. Procesarea se face complet în browser.",
    guide: [
      "1. Încarcă fișierul PDF protejat cu parolă.",
      "2. Introdu parola curentă a documentului.",
      "3. Apasă butonul «Deblocare» – PDF-ul fără parolă poate fi descărcat.",
    ],
    faq: [
      { q: "La ce este utilă eliminarea parolei?", a: "Servește la deblocarea fișierelor PDF protejate cu parolă, creând o versiune fără restricții de acces." },
      { q: "Pot elimina parola fără s-o cunosc?", a: "Nu, trebuie să cunoști parola curentă pentru a debloca documentul. Instrumentul nu sparge parole." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, fișierul și parola sunt procesate exclusiv în browserul tău, fără transmitere pe server." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului protejat", description: "Selectează fișierul PDF protejat cu parolă." },
        { title: "2. Introducerea parolei", description: "Introdu parola curentă a documentului pentru autentificare." },
        { title: "3. Deblocare", description: "Apasă butonul – instrumentul elimină protecția cu parolă." },
        { title: "4. Descărcare", description: "Descarcă PDF-ul deblocat, fără restricții." },
      ],
      useCases: [
        { icon: "🔓", title: "Deblocarea documentelor proprii", description: "Elimină parola de pe documentele tale când nu mai este necesară protecția." },
        { icon: "🖨️", title: "Activare tipărire", description: "Deblochează restricția de tipărire pentru a putea imprima documentul." },
        { icon: "📋", title: "Activare copiere", description: "Elimină restricțiile de copiere a textului din document." },
      ],
      aboutSection: {
        title: "Eliminarea parolei din PDF",
        paragraphs: [
          "Uneori protecția cu parolă nu mai este necesară – de exemplu, atunci când documentul a fost aprobat sau când dorești să-l partajezi liber. Eliminarea parolei creează o versiune deschisă a documentului.",
          "Instrumentul necesită cunoașterea parolei curente – nu este un instrument de spargere a parolelor. Procesarea se face complet în browserul tău pentru securitatea datelor.",
        ],
      },
      tips: [
        { icon: "🔑", tip: "Asigură-te că ai parola corectă înainte de a începe – instrumentul nu poate recupera parole uitate." },
        { icon: "💾", tip: "Salvează o copie a fișierului protejat original, în cazul în care vei avea nevoie de el în viitor." },
        { icon: "⚠️", tip: "După eliminarea parolei, oricine poate accesa documentul – asigură-te că acest lucru este intenționat." },
      ],
    },
  },

  // ─── 17. Redactare PDF ────────────────────────────────────────────────────
  "eltakares": {
    introText:
      "Redactează (acoperă permanent) informațiile sensibile din documentele PDF. Marchează zonele pe care dorești să le ascunzi – textul acoperit nu poate fi recuperat. Procesarea are loc în browser.",
    guide: [
      "1. Încarcă fișierul PDF care conține informații sensibile.",
      "2. Selectează sau marchează zonele de text pe care dorești să le redactezi.",
      "3. Apasă butonul «Redactare» – PDF-ul cu informațiile acoperite poate fi descărcat.",
    ],
    faq: [
      { q: "La ce este utilă redactarea PDF-ului?", a: "Servește la acoperirea permanentă a informațiilor sensibile (nume, adrese, coduri numerice personale) din documentele PDF înainte de partajare." },
      { q: "Informațiile redactate pot fi recuperate?", a: "Nu, redactarea este permanentă – textul acoperit este eliminat complet din fișier și nu poate fi recuperat." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, documentul este procesat exclusiv în browserul tău, fără transmitere pe server." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea PDF-ului", description: "Selectează fișierul PDF care conține informații de redactat." },
        { title: "2. Marcarea zonelor sensibile", description: "Selectează textul sau zonele pe care dorești să le acoperi permanent." },
        { title: "3. Aplicarea redactării", description: "Apasă butonul – instrumentul acoperă ireversibil zonele marcate." },
        { title: "4. Descărcare", description: "Descarcă PDF-ul redactat cu informațiile sensibile eliminate." },
      ],
      useCases: [
        { icon: "👤", title: "Protecția datelor personale", description: "Acoperă numele, adresele și codurile numerice personale din documente înainte de partajare." },
        { icon: "💰", title: "Informații financiare", description: "Redactează sumele, numerele de cont sau alte date financiare sensibile." },
        { icon: "⚖️", title: "Documente juridice", description: "Acoperă informațiile confidențiale din contracte și documente legale." },
        { icon: "🏥", title: "Date medicale", description: "Protejează informațiile medicale din rapoarte și documente de sănătate." },
      ],
      aboutSection: {
        title: "Redactarea informațiilor din PDF",
        paragraphs: [
          "Redactarea PDF este procesul de acoperire permanentă a informațiilor sensibile dintr-un document. Spre deosebire de simpla acoperire vizuală, redactarea elimină complet textul din structura fișierului.",
          "Instrumentul nostru garantează că informațiile redactate nu pot fi recuperate prin niciun mijloc – textul este eliminat permanent, nu doar ascuns. Procesarea se face în browser pentru securitate maximă.",
        ],
      },
      tips: [
        { icon: "🔍", tip: "Verifică cu atenție toate zonele marcate înainte de a aplica redactarea – procesul este ireversibil." },
        { icon: "💾", tip: "Păstrează întotdeauna o copie a documentului original înainte de redactare." },
        { icon: "📋", tip: "Verifică PDF-ul redactat prin căutare text pentru a te asigura că informațiile sensibile au fost complet eliminate." },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXCEL (4 instrumente)
// ═══════════════════════════════════════════════════════════════════════════════

export const EXCEL_RO_CONTENT: ContentMap = {
  // ─── 1. XLSX → CSV ────────────────────────────────────────────────────────
  "xlsx-csv": {
    introText:
      "Transformă fișierul Excel (XLSX) în format CSV, direct în browser. Conversia este rapidă, sigură și nu necesită instalarea Excel.",
    guide: [
      "1. Încarcă fișierul XLSX.",
      "2. Selectează foaia de lucru pe care dorești să o convertești, dacă sunt mai multe.",
      "3. Apasă butonul «Conversie» – fișierul CSV poate fi descărcat imediat.",
    ],
    faq: [
      { q: "La ce este utilă conversia XLSX în CSV?", a: "Servește la convertirea tabelelor Excel în format text simplu CSV, care poate fi deschis în aproape orice program." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, fișierul nu este încărcat pe server, totul are loc în browser." },
      { q: "Ce se întâmplă cu formatarea?", a: "CSV-ul conține doar date brute – formatarea (culori, fonturi, lățimi de coloane) nu este transferată." },
      { q: "Pot converti mai multe foi de lucru?", a: "Da, poți alege ce foaie de lucru sau pe toate să le convertești în fișiere CSV separate." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este responsiv și funcționează pe mobil." },
      { q: "Ce delimiter folosește CSV-ul?", a: "Implicit virgulă, dar poți alege punct și virgulă sau tab." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea XLSX", description: "Selectează sau trage fișierul Excel." },
        { title: "2. Selectarea foii de lucru", description: "Dacă sunt mai multe foi de lucru, selecteaz-o pe cea de convertit." },
        { title: "3. Conversie și descărcare", description: "Apasă butonul de conversie și descarcă fișierul CSV." },
      ],
      useCases: [
        { icon: "📊", title: "Import de date", description: "CSV-ul poate fi importat în aproape orice bază de date și software." },
        { icon: "🔄", title: "Transfer între sisteme", description: "Transferul datelor Excel în alt sistem prin CSV." },
        { icon: "📈", title: "Analiză de date", description: "Încărcarea fișierelor CSV în Python, R sau alte instrumente de analiză." },
      ],
      formatComparison: {
        title: "Comparație XLSX vs CSV vs JSON",
        columns: ["Proprietate", "XLSX", "CSV", "JSON"],
        rows: [
          { feature: "Formatare", values: ["Da", "Nu", "Nu"] },
          { feature: "Mai multe foi de lucru", values: ["Da", "Nu", "Nu"] },
          { feature: "Dimensiunea fișierului", values: ["Medie", "Mică", "Medie"] },
          { feature: "Lizibilitate universală", values: ["Necesită Excel", "Cu orice", "Cu orice"] },
          { feature: "Formule", values: ["Da", "Nu", "Nu"] },
        ],
      },
      aboutSection: {
        title: "Despre formatele XLSX și CSV",
        paragraphs: [
          "XLSX este formatul nativ Excel, care suportă formatare, formule și mai multe foi de lucru. CSV este un format text simplu, cu valori separate prin delimiter.",
          "Avantajul CSV-ului este compatibilitatea universală: aproape orice software îl poate citi, în timp ce XLSX necesită Excel sau un program compatibil.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Verifică rezultatul dacă tabelul conține caractere speciale (virgulă, ghilimele)." },
        { icon: "🔢", tip: "Din formule ajung în CSV doar valorile, nu formulele în sine." },
        { icon: "📝", tip: "Pentru datele românești, delimitatorul punct și virgulă poate fi mai practic, deoarece separatorul zecimal românesc este virgula." },
      ],
    },
  },

  // ─── 2. XLSX → JSON ───────────────────────────────────────────────────────
  "xlsx-json": {
    introText:
      "Convertește tabelul Excel în format JSON pentru a-l folosi ușor în API-uri, baze de date sau dezvoltare web. Procesarea are loc în browser.",
    guide: [
      "1. Încarcă fișierul XLSX.",
      "2. Selectează foaia de lucru și setările de conversie.",
      "3. Apasă butonul «Conversie» – JSON-ul apare imediat și poate fi descărcat.",
    ],
    faq: [
      { q: "La ce este utilă conversia XLSX în JSON?", a: "Servește la convertirea datelor Excel în format JSON structurat, ideal pentru dezvoltare web și integrări API." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, fișierul este procesat exclusiv în browserul tău." },
      { q: "Cum devine tabelul JSON?", a: "Numele coloanelor din primul rând devin cheile JSON, iar rândurile următoare devin valorile." },
      { q: "Gestionează celulele goale?", a: "Da, celulele goale apar ca valori null în JSON." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, funcționează cu funcționalitate completă și pe mobil." },
      { q: "Pot converti mai multe foi de lucru?", a: "Da, fiecare foaie de lucru poate fi exportată ca obiect JSON separat." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea XLSX", description: "Selectează fișierul Excel de pe computer." },
        { title: "2. Setări", description: "Selectează foaia de lucru și opțiunile de conversie." },
        { title: "3. Descărcarea JSON", description: "Copiază JSON-ul convertit sau descarcă-l ca fișier." },
      ],
      useCases: [
        { icon: "🌐", title: "Dezvoltare web", description: "Utilizarea datelor Excel ca JSON în aplicații web." },
        { icon: "🔗", title: "Integrare API", description: "Convertirea datelor tabulare în format JSON pentru apeluri API." },
        { icon: "💾", title: "Baze de date NoSQL", description: "Pregătirea datelor pentru import în MongoDB sau alte baze de date NoSQL." },
      ],
      aboutSection: {
        title: "XLSX și JSON",
        paragraphs: [
          "JSON este limba universală a dezvoltării web și API-urilor – prin conversia datelor Excel în JSON, le poți utiliza direct în aplicații.",
          "În timpul conversiei, rândurile tabelului Excel devin obiecte JSON, unde anteturile furnizează cheile.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Asigură-te că primul rând conține nume de coloane unice – acestea vor deveni cheile JSON." },
        { icon: "🔤", tip: "Evită spațiile și caracterele speciale în numele coloanelor pentru un JSON mai curat." },
        { icon: "📊", tip: "Verifică tipurile de date: în JSON numerele și textele sunt separate automat." },
      ],
    },
  },

  // ─── 3. CSV → XLSX ────────────────────────────────────────────────────────
  "csv-xlsx": {
    introText:
      "Transformă fișierul CSV în format Excel (XLSX), direct în browser. După conversie poți edita, formata și crea grafice în Excel.",
    guide: [
      "1. Încarcă fișierul CSV.",
      "2. Verifică în previzualizare că datele sunt afișate corect.",
      "3. Apasă butonul «Conversie» – fișierul XLSX poate fi descărcat imediat.",
    ],
    faq: [
      { q: "La ce este utilă conversia CSV în XLSX?", a: "Servește la convertirea fișierelor CSV în format Excel, unde poți adăuga formatare, formule și grafice." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, procesarea are loc în întregime în browserul tău." },
      { q: "Ce delimiteri recunoaște?", a: "Recunoaște automat virgula, punctul și virgula și tab-ul." },
      { q: "Se păstrează textul cu diacritice?", a: "Da, suportă codificarea UTF-8, caracterele cu diacritice sunt afișate corect." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, este disponibil și funcționează și pe mobil." },
      { q: "Am nevoie de Excel pentru a deschide XLSX?", a: "Poate fi deschis în Excel, Google Sheets și LibreOffice Calc." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea CSV", description: "Selectează sau trage fișierul CSV." },
        { title: "2. Verificarea previzualizării", description: "Asigură-te că datele și coloanele sunt afișate corect." },
        { title: "3. Descărcarea XLSX", description: "După conversie, descarcă fișierul Excel." },
      ],
      useCases: [
        { icon: "📊", title: "Formatarea datelor", description: "Formatarea și colorarea datelor CSV în Excel pentru o vizualizare mai bună." },
        { icon: "📈", title: "Crearea graficelor", description: "Crearea graficelor și diagramelor în Excel din datele CSV." },
        { icon: "🔄", title: "Schimb de date", description: "Conversia CSV-ului exportat din alt sistem în format Excel pentru procesare ulterioară." },
      ],
      aboutSection: {
        title: "Din CSV în Excel",
        paragraphs: [
          "CSV este un format text simplu, la care formatul Excel adaugă formatare, formule și posibilități de vizualizare.",
          "Prin conversie, datele brute pot ajunge într-un tabel formatat profesional, completat cu grafice și tabele pivot.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Verifică corectitudinea datelor în previzualizare înainte de a converti." },
        { icon: "🔢", tip: "Dacă numerele apar ca text, setarea delimitatorului poate ajuta." },
        { icon: "🌍", tip: "La fișierele CSV românești, delimitatorul punct și virgulă este frecvent – instrumentul îl recunoaște automat." },
      ],
    },
  },

  // ─── 4. Vizualizator XLSX ─────────────────────────────────────────────────
  "xlsx-megtekinto": {
    introText:
      "Vizualizează conținutul fișierelor Excel (XLSX) direct în browser, fără instalarea Excel. Previzualizare rapidă cu foi de lucru, filtrare și căutare.",
    guide: [
      "1. Încarcă fișierul XLSX.",
      "2. Comută între foile de lucru folosind tab-urile.",
      "3. Folosește căutarea și filtrarea pentru a naviga prin date.",
    ],
    faq: [
      { q: "La ce este util vizualizatorul XLSX?", a: "Servește la vizualizarea rapidă a fișierelor Excel în browser, fără instalarea Excel." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, fișierul se deschide exclusiv în browserul tău." },
      { q: "Pot edita fișierul?", a: "Instrumentul este doar pentru vizualizare, pentru editare se recomandă Excel sau Google Sheets." },
      { q: "Suportă mai multe foi de lucru?", a: "Da, toate foile de lucru sunt disponibile ca tab-uri în vizualizator." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, cu interfață responsivă poți vizualiza confortabil tabelele și pe mobil." },
      { q: "Se afișează rezultatele formulelor?", a: "Da, în locul formulelor se afișează valorile calculate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea XLSX", description: "Selectează fișierul Excel de pe computer." },
        { title: "2. Vizualizarea datelor", description: "Navighează prin tabel, comută între foile de lucru." },
        { title: "3. Căutare și filtrare", description: "Folosește căutarea integrată pentru a găsi rapid datele." },
      ],
      useCases: [
        { icon: "👀", title: "Previzualizare rapidă", description: "Verificarea conținutului fișierului Excel fără instalarea Excel." },
        { icon: "📱", title: "Vizualizare mobilă", description: "Navigarea fișierelor Excel pe telefon sau tabletă." },
        { icon: "🔍", title: "Căutare date", description: "Găsirea rapidă a datelor specifice în tabele mari." },
      ],
      aboutSection: {
        title: "Vizualizator Excel în browser",
        paragraphs: [
          "Vizualizatorul XLSX permite navigarea și căutarea în fișierele Excel direct în browser, fără instalarea unui software suplimentar.",
          "Ideal atunci când dorești doar să vizualizezi conținutul unui tabel, de exemplu pentru verificarea rapidă a unui atașament primit prin e-mail.",
        ],
      },
      tips: [
        { icon: "🔍", tip: "Folosește combinația de taste Ctrl+F (Cmd+F) pentru căutare rapidă în tabel." },
        { icon: "📑", tip: "La mai multe foi de lucru, apasă pe tab-uri pentru a comuta între ele." },
        { icon: "📊", tip: "În vizualizator, coloanele pot fi redimensionate pentru o vizibilitate mai bună." },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// MARKDOWN (1 instrument)
// ═══════════════════════════════════════════════════════════════════════════════

export const MARKDOWN_RO_CONTENT: ContentMap = {
  // ─── 1. Markdown → HTML ───────────────────────────────────────────────────
  "markdown-html": {
    introText:
      "Transformă textul Markdown în cod HTML cu previzualizare în timp real. Conversia are loc instantaneu în browser – ideal pentru postări de blog, documentație și conținut web.",
    guide: [
      "1. Lipește sau scrie textul Markdown în editorul din stânga.",
      "2. Previzualizarea HTML și codul apar imediat în partea dreaptă.",
      "3. Copiază codul HTML sau descarcă-l ca fișier.",
    ],
    faq: [
      { q: "La ce este utilă conversia Markdown în HTML?", a: "Servește la convertirea textului formatat Markdown în cod HTML pe care îl poți integra în pagini web și bloguri." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, conversia are loc exclusiv în browserul tău." },
      { q: "Ce sintaxă Markdown suportă?", a: "Standardul complet CommonMark, completat cu elemente GFM (GitHub Flavored Markdown): tabele, liste de sarcini, blocuri de cod." },
      { q: "Previzualizarea se actualizează în timp real?", a: "Da, în timpul tastării se actualizează imediat ieșirea HTML și previzualizarea." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul funcționează cu interfață responsivă și pe mobil." },
      { q: "Pot personaliza ieșirea HTML?", a: "Primești codul HTML brut, pe care îl poți stiliza după dorință cu CSS." },
    ],
    content: {
      howToSteps: [
        { title: "1. Scrierea Markdown", description: "Lipește sau scrie textul Markdown în editor." },
        { title: "2. Vizualizarea previzualizării", description: "Vezi în timp real previzualizarea formatată și codul HTML." },
        { title: "3. Copierea codului HTML", description: "Copiază HTML-ul generat în clipboard sau descarcă-l ca fișier." },
      ],
      useCases: [
        { icon: "📝", title: "Postări de blog", description: "Conversia articolelor de blog scrise în Markdown în HTML pentru site-ul web." },
        { icon: "📖", title: "Documentație", description: "Conversia documentației tehnice pentru afișare web." },
        { icon: "📧", title: "Buletine informative", description: "Conversia conținutului Markdown în HTML pentru buletine de e-mail." },
        { icon: "🎓", title: "Materiale educaționale", description: "Crearea versiunii HTML formatate a materialelor didactice." },
      ],
      aboutSection: {
        title: "Markdown și HTML",
        paragraphs: [
          "Markdown este un limbaj de marcare ușor, creat de John Gruber în 2004. Cu sintaxa sa simplă poți scrie rapid text formatat, pe care apoi îl poți converti în HTML.",
          "HTML este limbajul de bază al web-ului – prin conversia Markdown, conținutul tău poate fi afișat pe orice pagină web, în timp ce te bucuri de simplitatea Markdown în timpul scrierii.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Folosește titluri (#, ##, ###) pentru structurarea logică a conținutului." },
        { icon: "💻", tip: "Pentru marcarea blocurilor de cod folosește trei backtick-uri (```) cu specificarea limbajului." },
        { icon: "🔗", tip: "Sintaxa linkurilor: [text](URL) – simplă și rapidă." },
        { icon: "📊", tip: "Poți folosi și tabele GFM: în formatul | antet | antet |." },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// HTML (2 instrumente)
// ═══════════════════════════════════════════════════════════════════════════════

export const HTML_RO_CONTENT: ContentMap = {
  // ─── 1. HTML în text ──────────────────────────────────────────────────────
  "html-szovegge": {
    introText:
      "Elimină tag-urile HTML și extrage textul curat din codul HTML. Ideal pentru salvarea conținutului paginilor web în formă text, cu procesare instantanee în browser.",
    guide: [
      "1. Lipește codul HTML în câmpul de introducere.",
      "2. Apasă butonul «Conversie».",
      "3. Copiază textul curat sau descarcă-l ca fișier .txt.",
    ],
    faq: [
      { q: "La ce este utilă conversia HTML în text?", a: "Servește la eliminarea tag-urilor din codul HTML și extragerea conținutului text curat." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, procesarea are loc în browser, niciun fel de date nu sunt trimise către server." },
      { q: "Ce se întâmplă cu linkurile și imaginile?", a: "Textul linkurilor se păstrează, textul alt al imaginilor poate fi extras – tag-urile și atributele HTML sunt eliminate." },
      { q: "Se păstrează întreruperile de rând?", a: "Da, paragrafele și întreruperile de rând sunt păstrate pentru lizibilitate." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul funcționează în orice browser modern." },
      { q: "Gestionează entitățile HTML speciale?", a: "Da, entitățile (de ex. &amp;, &lt;) sunt transformate în caractere normale." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea HTML-ului", description: "Copiază codul HTML în câmpul de introducere." },
        { title: "2. Extragerea textului", description: "Apasă butonul de conversie pentru eliminarea tag-urilor." },
        { title: "3. Copierea rezultatului", description: "Textul curat poate fi copiat sau descărcat." },
      ],
      useCases: [
        { icon: "📄", title: "Extragerea conținutului", description: "Salvarea conținutului text al paginii web fără tag-uri HTML." },
        { icon: "📋", title: "Curățarea textului", description: "Eliminarea formatării textului copiat din e-mail sau web." },
        { icon: "🔍", title: "Analiză de text", description: "Pregătirea textului fără HTML pentru analiză sau procesare." },
      ],
      aboutSection: {
        title: "Conversia HTML în text",
        paragraphs: [
          "Conversia HTML în text elimină elementele limbajului de marcare și lasă conținutul text pur în formă lizibilă.",
          "Este utilă atunci când dorești să salvezi conținut web în formă text sau ai nevoie de text fără HTML pentru procesare.",
        ],
      },
      tips: [
        { icon: "📝", tip: "Rezultatul poate fi salvat ca fișier .txt pentru arhivare simplă." },
        { icon: "🔗", tip: "URL-urile linkurilor pot fi extrase și ele, dacă este necesar." },
        { icon: "📋", tip: "Spațiile și rândurile goale în exces sunt reduse automat." },
      ],
    },
  },

  // ─── 2. Minificarea HTML ──────────────────────────────────────────────────
  "html-minimalas-html": {
    introText:
      "Redu dimensiunea codului HTML prin eliminarea spațiilor inutile, comentariilor și întreruperilor de rând. Obții încărcare mai rapidă a paginilor web, iar totul are loc în browserul tău.",
    guide: [
      "1. Lipește codul HTML în câmpul de introducere.",
      "2. Apasă butonul «Minificare».",
      "3. Copiază HTML-ul comprimat sau descarcă-l ca fișier.",
    ],
    faq: [
      { q: "La ce este utilă minificarea HTML?", a: "Servește la reducerea dimensiunii codului HTML prin eliminarea spațiilor albe inutile, comentariilor și întreruperilor de rând." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, procesarea are loc în întregime în browserul tău." },
      { q: "Se schimbă aspectul paginii web?", a: "Nu, minificarea comprimă doar codul sursă – aspectul și funcționalitatea rămân neschimbate." },
      { q: "Cu cât va fi mai mic codul?", a: "De obicei se poate obține o reducere de 10-30% a dimensiunii, în funcție de complexitatea HTML-ului." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul funcționează și pe mobil." },
      { q: "Poate fi reconvertit HTML-ul minificat?", a: "Cu instrumente de HTML prettify poate fi reformatat, dar comentariile nu pot fi restaurate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea HTML-ului", description: "Copiază codul HTML pe care dorești să-l minifici." },
        { title: "2. Minificare", description: "Apasă butonul pentru eliminarea caracterelor inutile." },
        { title: "3. Copierea rezultatului", description: "Copiază HTML-ul comprimat sau descarcă-l." },
      ],
      useCases: [
        { icon: "🚀", title: "Accelerarea site-ului web", description: "Un fișier HTML mai mic rezultă în încărcare mai rapidă a paginii." },
        { icon: "📡", title: "Reducerea lățimii de bandă", description: "HTML-ul mai compact generează mai puțin trafic de date." },
        { icon: "⚡", title: "Deploy în producție", description: "Optimizarea codului HTML înainte de implementarea în mediul de producție." },
      ],
      aboutSection: {
        title: "Minificarea HTML",
        paragraphs: [
          "Minificarea HTML elimină din codul sursă caracterele spații albe inutile, comentariile și tag-urile de închidere opționale, reducând dimensiunea fișierului.",
          "Fișierul HTML mai mic rezultă în încărcare mai rapidă a paginii și o experiență utilizator mai bună, în special pe conexiuni mai lente.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Combină minificarea HTML cu minificarea CSS și JS pentru efect maxim." },
        { icon: "📦", tip: "Împreună cu compresia Gzip se poate obține o reducere și mai mare a dimensiunii." },
        { icon: "🔄", tip: "Păstrează întotdeauna și codul sursă original formatat pentru editabilitate." },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// FIȘIERE (4 instrumente)
// ═══════════════════════════════════════════════════════════════════════════════

export const FAJL_RO_CONTENT: ContentMap = {
  // ─── 1. Creator ZIP ───────────────────────────────────────────────────────
  "zip-keszito": {
    introText:
      "Creează o arhivă ZIP din fișierele tale direct în browser. Selectează fișierele de comprimat și descarcă fișierul ZIP cu un singur clic – nimic nu este încărcat pe server.",
    guide: [
      "1. Trage sau selectează fișierele de comprimat.",
      "2. Verifică lista fișierelor și dimensiunea totală.",
      "3. Apasă butonul «Creare ZIP» – fișierul ZIP poate fi descărcat imediat.",
    ],
    faq: [
      { q: "La ce este util creatorul ZIP?", a: "Servește la împachetarea mai multor fișiere într-o singură arhivă ZIP comprimată, pentru partajare și arhivare mai ușoară." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, compresia are loc în întregime în browserul tău." },
      { q: "Ce tipuri de fișiere pot comprima?", a: "Orice tip de fișier: documente, imagini, videoclipuri, cod – nu există restricții." },
      { q: "Cu cât va fi mai mic fișierul ZIP?", a: "Gradul de compresie depinde de tipul fișierului: fișierele text se reduc semnificativ, imaginile și videoclipurile mai puțin." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este disponibil și funcționează și pe mobil." },
      { q: "Există o limită de dimensiune?", a: "Memoria browserului stabilește limita – de obicei funcționează fără probleme până la câteva sute de MB." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea fișierelor", description: "Trage sau selectează fișierele pe care dorești să le împachetezi în ZIP." },
        { title: "2. Verificarea listei de fișiere", description: "Verifică fișierele selectate și dimensiunea lor totală." },
        { title: "3. Crearea și descărcarea ZIP-ului", description: "Apasă butonul – ZIP-ul poate fi descărcat imediat." },
      ],
      useCases: [
        { icon: "📧", title: "Atașament e-mail", description: "Împachetarea mai multor fișiere într-un singur ZIP pentru trimitere prin e-mail." },
        { icon: "📦", title: "Arhivare", description: "Împachetarea fișierelor de proiect într-o arhivă ordonată pentru păstrare." },
        { icon: "📤", title: "Partajarea fișierelor", description: "Partajarea unui singur fișier ZIP în loc de mai multe fișiere separate." },
      ],
      aboutSection: {
        title: "Despre formatul ZIP",
        paragraphs: [
          "ZIP este cel mai răspândit format de arhivă comprimată, suportat nativ de aproape toate sistemele de operare.",
          "Formatul ZIP folosește algoritmul DEFLATE, care oferă un echilibru bun între rata de compresie și viteză.",
        ],
      },
      tips: [
        { icon: "📝", tip: "La fișierele text (TXT, CSV, JSON) rata de compresie este cea mai mare." },
        { icon: "🖼️", tip: "La fișierele deja comprimate (JPG, MP4) dimensiunea ZIP-ului aproape că nu scade." },
        { icon: "📂", tip: "Dă un nume semnificativ fișierului ZIP pentru identificare mai ușoară." },
      ],
    },
  },

  // ─── 2. Extractor ZIP ─────────────────────────────────────────────────────
  "zip-kibonto": {
    introText:
      "Extrage conținutul arhivelor ZIP direct în browser, fără instalare de software. Vizualizează lista de fișiere și descarcă fișierele dorite individual sau simultan.",
    guide: [
      "1. Încarcă fișierul ZIP în instrument.",
      "2. Vizualizează conținutul arhivei în lista de fișiere.",
      "3. Descarcă fișierele dorite individual sau pe toate simultan.",
    ],
    faq: [
      { q: "La ce este util extractorul ZIP?", a: "Servește la vizualizarea și extragerea conținutului arhivelor ZIP direct în browser." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, extragerea are loc în browser, fișierul nu este încărcat pe server." },
      { q: "Ce formate de arhivă suportă?", a: "În principal formatul ZIP, inclusiv variantele comprimate și necomprimate." },
      { q: "Extrage și ZIP-uri protejate cu parolă?", a: "Gestionarea arhivelor protejate cu parolă este suportată limitat." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, funcționează cu funcționalitate completă și pe mobil." },
      { q: "Ce dimensiuni de ZIP pot extrage?", a: "În funcție de memoria browserului, de obicei pot fi gestionate arhive de câteva sute de MB." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea ZIP-ului", description: "Selectează sau trage fișierul ZIP pe care dorești să-l extragi." },
        { title: "2. Vizualizarea conținutului", description: "Navighează prin lista de fișiere și foldere a arhivei ZIP." },
        { title: "3. Descărcarea fișierelor", description: "Descarcă fișierele dorite individual sau pe toate." },
      ],
      useCases: [
        { icon: "📥", title: "Extragerea atașamentelor", description: "Extragerea rapidă a atașamentelor ZIP primite prin e-mail." },
        { icon: "👀", title: "Previzualizarea conținutului", description: "Vizualizarea conținutului arhivei ZIP fără extragere completă." },
        { icon: "📱", title: "Extragere mobilă", description: "Extragerea fișierelor ZIP pe telefon, fără aplicație separată." },
      ],
      aboutSection: {
        title: "Extragerea ZIP în browser",
        paragraphs: [
          "Extragerea ZIP în browser este o soluție convenabilă atunci când nu ai instalat un software de arhivare sau dorești să vizualizezi conținutul unei arhive de pe un dispozitiv mobil.",
          "Instrumentul afișează și lista de fișiere și folderele, astfel încât poți descărca selectiv doar fișierele necesare.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Mai întâi vizualizează lista de fișiere, înainte de a extrage totul." },
        { icon: "📁", tip: "Structura folderelor se păstrează în timpul extragerii." },
        { icon: "💾", tip: "Poți descărca și fișiere individual dacă nu ai nevoie de întreaga arhivă." },
      ],
    },
  },

  // ─── 3. Verificator hash ──────────────────────────────────────────────────
  "hash-ellenorzo": {
    introText:
      "Calculează valoarea hash a fișierelor tale (MD5, SHA-1, SHA-256) direct în browser. Verifică integritatea fișierelor descărcate – fișierul nu părăsește niciodată computerul tău.",
    guide: [
      "1. Încarcă fișierul pentru care dorești să calculezi valoarea hash.",
      "2. Selectează algoritmul hash (MD5, SHA-1, SHA-256).",
      "3. Rezultatul apare imediat – compară-l cu valoarea așteptată.",
    ],
    faq: [
      { q: "La ce este util verificatorul hash?", a: "Servește la calcularea valorii hash a fișierelor pentru verificarea integrității, adică la confirmarea faptului că fișierul nu a fost modificat." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, calculul hash are loc în întregime în browserul tău." },
      { q: "Ce algoritmi hash suportă?", a: "Algoritmii MD5, SHA-1 și SHA-256." },
      { q: "Ce este valoarea hash?", a: "O amprentă digitală unică – dacă se schimbă un singur bit al fișierului, hash-ul va fi complet diferit." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, funcționează cu funcționalitate completă și pe mobil." },
      { q: "Ce algoritm hash să aleg?", a: "SHA-256 este cel mai sigur. MD5 și SHA-1 sunt considerate depășite, dar pot fi utilizate încă pentru verificarea integrității." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea fișierului", description: "Selectează fișierul pentru care dorești să calculezi valoarea hash." },
        { title: "2. Selectarea algoritmului", description: "Alege între MD5, SHA-1 sau SHA-256." },
        { title: "3. Compararea hash-ului", description: "Compară hash-ul obținut cu valoarea așteptată." },
      ],
      useCases: [
        { icon: "✅", title: "Verificarea descărcării", description: "Confirmarea integrității fișierului descărcat pe baza hash-ului specificat." },
        { icon: "🔒", title: "Verificare de securitate", description: "Examinarea integrității fișierului în caz de suspiciune de modificare." },
        { icon: "📁", title: "Căutarea duplicatelor", description: "Identificarea fișierelor cu hash identic pentru detectarea duplicatelor." },
      ],
      aboutSection: {
        title: "Despre verificarea hash",
        paragraphs: [
          "Funcția hash produce din date de dimensiune arbitrară un șir de caractere unic cu lungime fixă (hash), care este amprenta digitală a fișierului.",
          "Verificarea hash este cea mai frecventă metodă de confirmare a faptului că un fișier descărcat este intact și nu a fost modificat în timpul transferului.",
        ],
      },
      tips: [
        { icon: "🔐", tip: "SHA-256 este cea mai bună alegere pentru verificarea integrității – oferă securitate pe 256 de biți." },
        { icon: "📋", tip: "Copiază valoarea hash în clipboard pentru comparație exactă." },
        { icon: "⚠️", tip: "MD5 și SHA-1 sunt sensibile la atacuri de coliziune – pentru securitate folosește SHA-256." },
      ],
    },
  },

  // ─── 4. Informații fișier ─────────────────────────────────────────────────
  "fajl-informacio": {
    introText:
      "Vizualizează datele detaliate ale oricărui fișier: dimensiune, tip, tip MIME, data ultimei modificări. Toate datele sunt citite în browserul tău, fișierul nu părăsește computerul.",
    guide: [
      "1. Trage sau selectează fișierul.",
      "2. Instrumentul afișează automat datele detaliate ale fișierului.",
      "3. Copiază informațiile necesare.",
    ],
    faq: [
      { q: "La ce sunt utile informațiile despre fișier?", a: "Servesc la vizualizarea rapidă a datelor detaliate ale fișierelor (dimensiune, tip, MIME, dată)." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, fișierul este analizat exclusiv în browserul tău." },
      { q: "Ce date afișează?", a: "Numele fișierului, dimensiunea, tipul MIME, extensia, data ultimei modificări." },
      { q: "Funcționează cu orice tip de fișier?", a: "Da, instrumentul poate afișa metadatele de bază ale oricărui fișier." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, funcționează și pe mobil." },
      { q: "Modifică fișierul?", a: "Nu, instrumentul citește exclusiv datele fișierului, nu modifică nimic." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea fișierului", description: "Trage sau selectează fișierul." },
        { title: "2. Vizualizarea datelor", description: "Instrumentul afișează automat toate datele disponibile ale fișierului." },
        { title: "3. Copierea informațiilor", description: "Copiază datele necesare." },
      ],
      useCases: [
        { icon: "📊", title: "Verificarea dimensiunii", description: "Verificarea rapidă a dimensiunii fișierului înainte de încărcare sau trimitere." },
        { icon: "🔍", title: "Identificarea tipului", description: "Identificarea tipului și tipului MIME al unui fișier necunoscut." },
        { icon: "📅", title: "Verificarea datei", description: "Vizualizarea datei de modificare a fișierului." },
      ],
      aboutSection: {
        title: "Metadatele fișierului",
        paragraphs: [
          "Fiecare fișier conține metadate: numele, dimensiunea, tipul și data modificării, gestionate de sistemul de fișiere și browser.",
          "Aceste date sunt utile pentru identificarea, filtrarea și organizarea fișierelor.",
        ],
      },
      tips: [
        { icon: "📏", tip: "Dimensiunea fișierului este afișată și în KB, MB și GB pentru claritate." },
        { icon: "📋", tip: "Tipul MIME este important la încărcările web – instrumentul îl determină automat." },
        { icon: "📁", tip: "Poți verifica mai multe fișiere unul după altul pentru comparație rapidă." },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SEO (8 instrumente)
// ═══════════════════════════════════════════════════════════════════════════════

export const SEO_TOOL_RO_CONTENT: ContentMap = {
  // ─── 1. Verificator lungime Title și Meta ─────────────────────────────────
  "title-meta-hossz": {
    introText:
      "Verifică lungimea tag-ului title și a meta description în timp real. Vezi previzualizarea rezultatului Google și primește avertismente imediate dacă textul este prea lung sau prea scurt.",
    guide: [
      "1. Introdu sau lipește textul tag-ului title.",
      "2. Introdu textul meta description.",
      "3. Vezi în timp real numărul de caractere, previzualizarea Google și sugestiile.",
    ],
    faq: [
      { q: "La ce este util verificatorul de lungime title și meta?", a: "Servește la verificarea lungimii optime a textelor title și description care apar pe pagina de rezultate Google." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, totul rulează în browserul tău, niciun fel de date nu sunt trimise către server." },
      { q: "Care este lungimea ideală a title-ului?", a: "50-60 de caractere este recomandat – Google afișează aproximativ atâtea caractere." },
      { q: "Care este lungimea ideală a meta description?", a: "120-160 de caractere este optim – textul mai lung este tăiat de Google." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul funcționează perfect și pe mobil." },
      { q: "Măsoară și lungimea în pixeli?", a: "Da, afișează atât lungimea în caractere, cât și în pixeli, deoarece Google taie pe baza pixelilor." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introducerea title-ului", description: "Introdu textul tag-ului title în câmpul de introducere." },
        { title: "2. Introducerea meta description", description: "Introdu textul meta description." },
        { title: "3. Verificarea rezultatului", description: "Urmărește feedback-ul în timp real despre lungime și previzualizarea Google." },
      ],
      useCases: [
        { icon: "🔍", title: "Optimizare SEO", description: "Perfecționarea title-ului și description-ului pentru o apariție mai bună în Google." },
        { icon: "📊", title: "Verificare în masă", description: "Verificarea rapidă a textelor title/meta pentru mai multe pagini." },
        { icon: "👀", title: "Previzualizare Google", description: "Poți vedea în avans cum va apărea pagina ta în motorul de căutare." },
      ],
      aboutSection: {
        title: "Title și meta description în SEO",
        paragraphs: [
          "Tag-ul title și meta description sunt cele mai importante elemente SEO: acestea apar pe pagina de rezultate Google și influențează decisiv rata de click.",
          "Respectarea lungimii optime asigură faptul că textul tău nu va fi tăiat în rezultatele căutării.",
        ],
      },
      tips: [
        { icon: "📐", tip: "Lungimea ideală a title-ului este 50-60 de caractere, a meta description-ului 120-160 de caractere." },
        { icon: "🎯", tip: "Pune întotdeauna cuvântul cheie cel mai important la începutul title-ului." },
        { icon: "📱", tip: "Pe mobil se afișează mai puține caractere – merită să favorizezi versiunile mai scurte." },
      ],
    },
  },

  // ─── 2. Eliminator UTM ────────────────────────────────────────────────────
  "utm-eltavolito": {
    introText:
      "Elimină parametrii UTM și alte coduri de urmărire din URL-uri. Obții linkuri curate, potrivite pentru partajare – totul are loc în browserul tău.",
    guide: [
      "1. Lipește URL-ul în câmpul de introducere.",
      "2. Instrumentul elimină automat parametrii UTM și de urmărire.",
      "3. Copiază URL-ul curat.",
    ],
    faq: [
      { q: "La ce este util eliminatorul UTM?", a: "Servește la eliminarea parametrilor UTM și a altor parametri de urmărire din URL-uri pentru partajare mai curată a linkurilor." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, procesarea are loc în browser." },
      { q: "Ce sunt parametrii UTM?", a: "Coduri de urmărire atașate la URL (utm_source, utm_medium, utm_campaign), utilizate pentru măsurarea performanței campaniilor de marketing." },
      { q: "Parametrii UTM influențează conținutul paginii?", a: "De obicei nu – parametrii UTM servesc doar scopuri analitice." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, funcționează și pe mobil." },
      { q: "Ce parametri elimină?", a: "Parametrii UTM (utm_source, utm_medium, utm_campaign, utm_term, utm_content) și alți parametri de urmărire răspândiți." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea URL-ului", description: "Copiază URL-ul care conține parametrii de urmărire." },
        { title: "2. Curățare automată", description: "Instrumentul elimină imediat parametrii UTM și de urmărire." },
        { title: "3. Copierea URL-ului curat", description: "Copiază linkul curățat." },
      ],
      useCases: [
        { icon: "🔗", title: "Partajarea linkurilor", description: "Partajarea URL-urilor curate pe rețele sociale sau în e-mail." },
        { icon: "🛡️", title: "Protecția datelor", description: "Eliminarea parametrilor de urmărire pentru protejarea vieții private." },
        { icon: "📋", title: "Documentație", description: "Utilizarea URL-urilor curate în documentație și prezentări." },
      ],
      aboutSection: {
        title: "Parametrii UTM și urmărirea",
        paragraphs: [
          "Parametrii UTM sunt utilizați de Google Analytics și alte instrumente analitice pentru a măsura performanța campaniilor.",
          "La partajare merită să-i elimini, deoarece fac URL-ul inutil de lung și conțin date de urmărire.",
        ],
      },
      tips: [
        { icon: "🔗", tip: "Verifică întotdeauna că URL-ul curățat funcționează corect." },
        { icon: "📋", tip: "Poți curăța mai multe URL-uri unul după altul." },
        { icon: "🛡️", tip: "Eliminarea parametrilor de urmărire îmbunătățește protecția datelor linkurilor partajate." },
      ],
    },
  },

  // ─── 3. Normalizator URL ──────────────────────────────────────────────────
  "url-normalizalo": {
    introText:
      "Normalizează URL-urile într-o formă unitară: host cu litere mici, parametri ordonați, gestionarea trailing slash. URL-urile uniforme îmbunătățesc SEO-ul și evită problemele de conținut duplicat.",
    guide: [
      "1. Lipește URL-ul în câmpul de introducere.",
      "2. Instrumentul normalizează automat URL-ul.",
      "3. Copiază URL-ul uniformizat.",
    ],
    faq: [
      { q: "La ce este utilă normalizarea URL?", a: "Servește la aducerea URL-urilor la o formă unitară pentru evitarea conținutului duplicat și îmbunătățirea SEO." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, procesarea are loc în browser." },
      { q: "Ce înseamnă normalizarea URL?", a: "Transformarea host-ului în litere mici, ordonarea parametrilor, gestionarea slash-ului final și eliminarea portului implicit." },
      { q: "De ce este importantă din punct de vedere SEO?", a: "Motoarele de căutare pot considera URL-urile cu forme diferite ca pagini diferite, ceea ce rezultă în conținut duplicat." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul funcționează și pe mobil." },
      { q: "Se modifică conținutul URL-ului?", a: "Nu, URL-ul indică spre aceeași pagină – doar formatul devine uniform." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea URL-ului", description: "Copiază URL-ul pe care dorești să-l normalizezi." },
        { title: "2. Normalizare", description: "Instrumentul aduce automat URL-ul la forma unitară." },
        { title: "3. Copierea rezultatului", description: "Copiază URL-ul normalizat." },
      ],
      useCases: [
        { icon: "🔍", title: "Audit SEO", description: "Uniformizarea URL-urilor site-ului web pentru evitarea conținutului duplicat." },
        { icon: "📊", title: "Analitică", description: "Normalizarea URL-urilor pentru agregarea mai precisă a datelor analitice." },
        { icon: "🔗", title: "Gestionarea linkurilor", description: "Utilizarea unui format URL uniform în baza de date de linkuri." },
      ],
      aboutSection: {
        title: "Normalizarea URL și SEO",
        paragraphs: [
          "Normalizarea URL asigură accesarea aceleiași pagini cu un URL identic, evitând duplicatele confuze pentru motoarele de căutare.",
          "URL-urile uniforme îmbunătățesc distribuția link equity și acuratețea datelor analitice.",
        ],
      },
      tips: [
        { icon: "📐", tip: "Decide din timp dacă folosești URL-urile cu sau fără trailing slash." },
        { icon: "🔤", tip: "Partea host trebuie să fie întotdeauna cu litere mici – partea path poate fi însă case-sensitive." },
        { icon: "🔗", tip: "Folosește un format URL consistent pe întregul site web." },
      ],
    },
  },

  // ─── 4. Constructor Canonical URL ─────────────────────────────────────────
  "canonical-epito": {
    introText:
      "Generează tag-ul canonical URL pentru paginile tale web. Tag-ul canonical corect ajută motoarele de căutare să identifice versiunea primară a paginii, evitând problema conținutului duplicat.",
    guide: [
      "1. Introdu URL-ul paginii.",
      "2. Instrumentul creează elementul canonical link.",
      "3. Copiază tag-ul generat în secțiunea head a paginii tale web.",
    ],
    faq: [
      { q: "La ce este util constructorul canonical URL?", a: "Servește la generarea tag-ului canonical link care indică motoarelor de căutare versiunea primară a paginii." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, generarea are loc în browser." },
      { q: "Ce este tag-ul canonical?", a: "Un element HTML în secțiunea head care indică motoarelor de căutare URL-ul canonic (primar) al paginii." },
      { q: "De ce este important tag-ul canonical?", a: "Previne ca motoarele de căutare să trateze diferitele variante URL ale paginii ca conținut duplicat." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, funcționează și pe mobil." },
      { q: "Este necesar tag-ul canonical pe fiecare pagină?", a: "Da, este recomandat să-l plasezi pe fiecare pagină – chiar și ca canonical auto-referențial." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introducerea URL-ului", description: "Introdu URL-ul primar al paginii." },
        { title: "2. Generarea tag-ului", description: "Instrumentul creează elementul canonical link." },
        { title: "3. Inserare", description: "Copiază codul în secțiunea head a paginii tale web." },
      ],
      useCases: [
        { icon: "🔍", title: "Gestionarea duplicatelor SEO", description: "Prevenirea problemelor de conținut duplicat cu tag-ul canonical." },
        { icon: "🌐", title: "Pagini multilingve", description: "Setarea corectă a canonical-ului pentru variantele lingvistice." },
        { icon: "📱", title: "Versiuni mobil/desktop", description: "Setarea relației canonical între URL-urile mobile și desktop." },
      ],
      aboutSection: {
        title: "URL-uri canonice",
        paragraphs: [
          "Tag-ul canonical indică motoarelor de căutare că un anumit conținut este disponibil pe mai multe URL-uri, dar care este versiunea primară.",
          "Cu utilizarea corectă poți evita ca Google să detecteze conținut duplicat și poți asigura distribuția corectă a link equity.",
        ],
      },
      tips: [
        { icon: "🔗", tip: "URL-ul canonical trebuie să fie întotdeauna un URL absolut (care începe cu https://...)." },
        { icon: "📋", tip: "Plasează un tag canonical pe fiecare pagină, chiar și ca auto-referință." },
        { icon: "⚠️", tip: "Nu seta canonical către o pagină cu conținut complet diferit – motoarele de căutare ar putea să-l ignore." },
      ],
    },
  },

  // ─── 5. Optimizator nume fișier ───────────────────────────────────────────
  "fajlnev-optimalizalo": {
    introText:
      "Optimizează numele fișierelor tale în format prietenos SEO: separare cu cratime, eliminarea diacriticelor, transformare în litere mici. Numele bune de fișiere îmbunătățesc rezultatele de căutare ale imaginilor și documentelor.",
    guide: [
      "1. Introdu sau lipește numele original al fișierului.",
      "2. Instrumentul îl transformă automat în format prietenos SEO.",
      "3. Copiază numele de fișier optimizat.",
    ],
    faq: [
      { q: "La ce este util optimizatorul de nume fișier?", a: "Servește la transformarea numelor de fișiere în format prietenos SEO: litere mici, cu cratime, fără diacritice." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, procesarea are loc în browser." },
      { q: "De ce este important numele fișierului pentru SEO?", a: "Motoarele de căutare (în special Google Images) iau în considerare numele fișierului pentru înțelegerea conținutului." },
      { q: "Ce transformări efectuează?", a: "Transformare în litere mici, eliminarea diacriticelor, înlocuirea spațiilor cu cratime, eliminarea caracterelor speciale." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, funcționează și pe mobil." },
      { q: "Pot optimiza mai multe nume de fișiere simultan?", a: "Da, poți introduce și transforma mai multe unul după altul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introducerea numelui fișierului", description: "Introdu numele fișierului pe care dorești să-l optimizezi." },
        { title: "2. Transformare automată", description: "Instrumentul transformă numele în format prietenos SEO." },
        { title: "3. Copierea rezultatului", description: "Copiază numele de fișier optimizat." },
      ],
      useCases: [
        { icon: "🖼️", title: "Optimizarea imaginilor", description: "Denumirea fișierelor imagine în format prietenos SEO pentru un ranking mai bun în Google Images." },
        { icon: "📄", title: "Documente", description: "Optimizarea numelor de fișiere ale PDF-urilor și altor documente." },
        { icon: "🌐", title: "Conținut web", description: "Uniformizarea numelor fișierelor încărcate pe site-ul web." },
      ],
      aboutSection: {
        title: "Nume de fișiere prietenoase SEO",
        paragraphs: [
          "Motoarele de căutare interpretează și numele fișierelor pentru determinarea conținutului, în special la imagini și documente.",
          "Numele de fișier ideal este cu litere mici, folosește separare cu cratime, este descriptiv și nu conține diacritice sau caractere speciale.",
        ],
      },
      tips: [
        { icon: "📝", tip: "Folosește nume de fișiere descriptive: «trandafir-rosu-gradina.jpg» este mai bun decât «IMG_2341.jpg»." },
        { icon: "🔤", tip: "Folosește cratima (-) în loc de spații, nu liniuța de subliniere (_)." },
        { icon: "🌍", tip: "Folosește litere fără diacritice în locul diacriticelor pentru compatibilitate maximă." },
      ],
    },
  },

  // ─── 6. Șablon text alt ───────────────────────────────────────────────────
  "alt-szoveg-sablon": {
    introText:
      "Generează șabloane de text alt optimizate SEO pentru imaginile tale. Un text alt bun îmbunătățește accesibilitatea și apariția în Google Images.",
    guide: [
      "1. Introdu subiectul și contextul imaginii.",
      "2. Instrumentul generează șabloane de text alt.",
      "3. Selectează cel mai potrivit și personalizează-l.",
    ],
    faq: [
      { q: "La ce este util șablonul de text alt?", a: "Servește la generarea textelor atribut alt optimizate SEO și accesibile pentru imagini." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, generarea are loc în browser." },
      { q: "Ce este textul alt?", a: "Atributul alt al elementului HTML img, care descrie conținutul imaginii pentru cititoarele de ecran și motoarele de căutare." },
      { q: "Cât de lung ar trebui să fie textul alt?", a: "Ideal 80-125 de caractere, concis și descriptiv." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, este disponibil și pe mobil." },
      { q: "Îmbunătățește SEO-ul?", a: "Da, un text alt bun îmbunătățește clasamentul în Google Images și accesibilitatea site-ului web." },
    ],
    content: {
      howToSteps: [
        { title: "1. Descrierea imaginii", description: "Descrie subiectul și contextul imaginii." },
        { title: "2. Generarea șablonului", description: "Instrumentul creează mai multe sugestii de text alt." },
        { title: "3. Personalizare", description: "Selectează și rafinează cel mai potrivit șablon." },
      ],
      useCases: [
        { icon: "🖼️", title: "Imagini web", description: "Adăugarea textului alt la imaginile site-ului web în scopuri SEO și accesibilitate." },
        { icon: "🛒", title: "Imagini produse webshop", description: "Optimizarea imaginilor din catalogul de produse cu text alt." },
        { icon: "♿", title: "Accesibilitate", description: "Asigurarea conformității WCAG cu șabloane de text alt." },
      ],
      aboutSection: {
        title: "Rolul textului alt",
        paragraphs: [
          "Textul alt îndeplinește un dublu rol: face imaginile accesibile persoanelor cu deficiențe de vedere și ajută motoarele de căutare să înțeleagă conținutul imaginii.",
          "Un text alt bine scris este concis, descriptiv și conține cuvintele cheie relevante într-un mod natural.",
        ],
      },
      tips: [
        { icon: "📝", tip: "Descrie ce prezintă imaginea, nu scrie «imagine despre...»." },
        { icon: "🎯", tip: "Plasează cuvântul cheie cel mai important la începutul textului alt." },
        { icon: "⚠️", tip: "La imaginile decorative folosește atributul alt gol (alt=\"\")." },
      ],
    },
  },

  // ─── 7. Verificator robots.txt ────────────────────────────────────────────
  "robots-txt-ellenorzo": {
    introText:
      "Verifică fișierul robots.txt: validarea sintaxei, analiza regulilor și testarea dacă un anumit URL este permis sau blocat pentru roboții de căutare.",
    guide: [
      "1. Lipește conținutul fișierului robots.txt.",
      "2. Instrumentul analizează sintaxa și regulile.",
      "3. Testează URL-uri: introdu dacă un anumit bot poate accesa URL-ul.",
    ],
    faq: [
      { q: "La ce este util verificatorul robots.txt?", a: "Servește la verificarea sintaxei fișierelor robots.txt și testarea regulilor." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, verificarea are loc în browser." },
      { q: "Ce este robots.txt?", a: "Un fișier text în rădăcina site-ului web care indică roboților de căutare ce URL-uri pot accesa și ce nu." },
      { q: "Pot testa blocarea unui URL?", a: "Da, poți introduce URL-ul și botul, iar instrumentul arată dacă este permis." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este disponibil și pe mobil." },
      { q: "Semnalează erorile de sintaxă?", a: "Da, liniile cu erori sunt evidențiate cu explicații." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea robots.txt", description: "Copiază conținutul fișierului robots.txt." },
        { title: "2. Verificarea sintaxei", description: "Instrumentul analizează regulile și semnalează erorile." },
        { title: "3. Testarea URL-ului", description: "Introdu un URL pentru a testa regulile de blocare." },
      ],
      useCases: [
        { icon: "🔍", title: "Audit SEO", description: "Verificarea funcționării corecte a robots.txt în cadrul auditului SEO." },
        { icon: "🐛", title: "Depanare", description: "Identificarea problemelor neașteptate de indexare prin analiza regulilor robots.txt." },
        { icon: "🛡️", title: "Controlul accesării", description: "Verificarea blocării paginilor private și interfețelor de administrare." },
      ],
      aboutSection: {
        title: "Fișierul robots.txt",
        paragraphs: [
          "Robots.txt face parte din Protocolul de Excludere a Roboților: un fișier text simplu în rădăcina site-ului web care oferă directive roboților de căutare.",
          "Configurarea corectă este critică din punct de vedere SEO – regulile greșite pot împiedica indexarea paginilor importante.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Plasează întotdeauna o referință Sitemap în fișierul robots.txt." },
        { icon: "⚠️", tip: "Regula Disallow: / blochează întregul site – folosește-o cu precauție." },
        { icon: "🔍", tip: "Testează URL-uri specifice pentru a te asigura că se aplică regulile dorite." },
      ],
    },
  },

  // ─── 8. Verificator URL Sitemap ───────────────────────────────────────────
  "sitemap-url-ellenorzo": {
    introText:
      "Verifică URL-urile din sitemap-ul XML: formatul este valid, URL-urile sunt accesibile și nu există duplicate. Verificarea are loc în browserul tău.",
    guide: [
      "1. Lipește conținutul sitemap-ului XML sau lista de URL-uri.",
      "2. Instrumentul validează formatul și URL-urile.",
      "3. Vizualizează rezultatele și corectează erorile.",
    ],
    faq: [
      { q: "La ce este util verificatorul URL sitemap?", a: "Servește la validarea formatului URL-urilor din sitemap-ul XML și la căutarea duplicatelor." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, verificarea are loc în browser." },
      { q: "Ce este un sitemap?", a: "Un fișier XML care listează URL-urile importante ale site-ului web, ajutând motoarele de căutare în accesare." },
      { q: "Ce erori semnalează?", a: "Format URL invalid, duplicate, elemente lipsă și erori de sintaxă XML." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul funcționează și pe mobil." },
      { q: "Câte URL-uri pot verifica?", a: "În funcție de performanța browserului, de obicei pot fi verificate mai multe mii de URL-uri." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea sitemap-ului", description: "Copiază conținutul XML al sitemap-ului sau lista de URL-uri." },
        { title: "2. Validare", description: "Instrumentul verifică formatul, URL-urile și duplicatele." },
        { title: "3. Examinarea rezultatelor", description: "Vizualizează erorile și sugestiile, apoi corectează sitemap-ul." },
      ],
      useCases: [
        { icon: "🔍", title: "Audit SEO", description: "Validarea sitemap-ului ca parte a auditului SEO al site-ului web." },
        { icon: "🐛", title: "Depanare", description: "Identificarea erorilor de sitemap atunci când indexarea nu funcționează conform așteptărilor." },
        { icon: "📊", title: "Analiza URL-urilor", description: "Examinarea URL-urilor din sitemap și căutarea duplicatelor." },
      ],
      aboutSection: {
        title: "XML Sitemap",
        paragraphs: [
          "Sitemap-ul XML ajută motoarele de căutare să înțeleagă structura site-ului web și să găsească toate URL-urile importante.",
          "Un sitemap corect îmbunătățește eficiența indexării, în special la site-urile mari și paginile lansate recent.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Sitemap-ul ar trebui să conțină maximum 50.000 de URL-uri – pentru site-uri mai mari folosește un index sitemap." },
        { icon: "🔗", tip: "Include doar URL-uri canonice și indexabile în sitemap." },
        { icon: "📅", tip: "Folosește elementul lastmod pentru a indica data de actualizare a conținutului." },
      ],
    },
  },
};
