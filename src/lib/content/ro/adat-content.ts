import type { ContentMap } from "../types.ts";

export const ADAT_RO_CONTENT: ContentMap = {
  // ═══ 1. CSV → JSON ═════════════════════════════════════════════════════
  "csv-json": {
    introText:
      "Instrumentul de conversie CSV → JSON îți permite să transformi fișierele CSV în format JSON structurat cu un singur clic. Funcționează cu detectare automată a delimiterului, gestionarea anteturilor și detectarea tipurilor, iar întreaga procesare are loc în browserul tău.",
    guide: [
      "1. Încarcă fișierul CSV sau lipește textul în câmpul de introducere.",
      "2. Instrumentul detectează automat delimiterul (virgulă, punct și virgulă, tab, pipe).",
      "3. Apasă butonul «Conversie» – rezultatul apare în format JSON.",
      "4. Copiază JSON-ul în clipboard sau descarcă-l ca fișier .json.",
    ],
    faq: [
      { q: "La ce este util convertorul CSV → JSON?", a: "Servește la transformarea datelor tabulare CSV în format JSON, ideal pentru API-uri, aplicații web și sisteme de procesare a datelor." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc 100% în browserul tău, niciun fel de date nu sunt trimise către un server – protecție completă a datelor." },
      { q: "Ce delimiteri detectează automat?", a: "Virgulă (,), punct și virgulă (;), tab și caracterul pipe (|). Modul de auto-detectare determină separatorul corect din conținutul fișierului." },
      { q: "Păstrează tipurile numerice și boolean?", a: "Da, opțional poți activa detectarea automată a tipurilor, care tratează numerele și valorile boolean ca tipuri JSON corespunzătoare." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează excelent pe mobil și tabletă în orice browser modern." },
      { q: "Există o limită de dimensiune?", a: "Nu există limită pe server, deoarece procesarea are loc în browser. Pentru fișiere mari, conversia rulează într-un Web Worker, astfel încât interfața nu se blochează." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea CSV-ului", description: "Trage fișierul CSV sau lipește conținutul text în câmpul de introducere." },
        { title: "2. Verificarea setărilor", description: "Verifică delimiterul detectat automat și setarea antetului. Modifică dacă este necesar." },
        { title: "3. Conversie", description: "Apasă butonul «Conversie» – JSON-ul apare imediat în panoul de previzualizare." },
        { title: "4. Salvarea rezultatului", description: "Copiază JSON-ul în clipboard sau descarcă-l ca fișier .json." },
      ],
      useCases: [
        { icon: "🔌", title: "Încărcare date API", description: "Crearea unui payload JSON din tabele CSV pentru API-uri REST, fără conversie manuală." },
        { icon: "📊", title: "Analiza datelor", description: "Conversia datelor CSV exportate din foi de calcul în JSON pentru procesare JavaScript sau Python." },
        { icon: "🗄️", title: "Migrarea bazelor de date", description: "Transformarea exporturilor CSV în format JSON pentru importul în baze de date NoSQL (MongoDB, Firebase)." },
        { icon: "⚙️", title: "Generarea configurațiilor", description: "Transformarea setărilor stocate în CSV în fișiere de configurare JSON pentru aplicații web." },
      ],
      formatComparison: {
        title: "Comparație CSV vs JSON",
        columns: ["Proprietate", "CSV", "JSON"],
        rows: [
          { feature: "Structură", values: ["Plată, tabulară", "Ierarhică, imbricabilă"] },
          { feature: "Lizibilitate", values: ["Excelentă în tabele", "La nivel de cod, formatabilă"] },
          { feature: "Dimensiunea fișierului", values: ["Mai mică (fără repetarea numelor cheilor)", "Mai mare (numele cheilor în fiecare rând)"] },
          { feature: "Gestionarea tipurilor", values: ["Totul este text", "Număr, boolean, null, array, obiect"] },
          { feature: "Utilizare", values: ["Excel, foi de calcul, export", "API, aplicație web, NoSQL DB"] },
        ],
      },
      aboutSection: {
        title: "Despre conversia CSV → JSON",
        paragraphs: [
          "CSV (Comma-Separated Values) este unul dintre cele mai răspândite formate de schimb de date, utilizat atât de foi de calcul, cât și de baze de date. Structura sa simplă și plată este ideală pentru date tabulare, dar nu suportă date imbricate.",
          "JSON (JavaScript Object Notation) este formatul principal de date al aplicațiilor web moderne și al API-urilor. Suportă structuri de date complexe, ierarhice, valori cu tip și utilizarea array-urilor.",
          "Conversia CSV → JSON este necesară cel mai frecvent atunci când datele tabulare trebuie integrate într-o aplicație web, trimise prin API sau importate într-o bază de date NoSQL.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Verifică dacă anteturile CSV sunt chei JSON valide – evită spațiile și caracterele speciale în anteturi." },
        { icon: "🔢", tip: "Activează detectarea automată a tipurilor dacă dorești ca numerele și valorile boolean să fie tratate ca tipuri JSON." },
        { icon: "📋", tip: "La fișierele CSV românești, delimitatorul punct și virgulă este frecvent – auto-detectarea îl recunoaște automat." },
        { icon: "⚠️", tip: "Dacă valorile celulelor CSV conțin virgule, asigură-te că sunt între ghilimele." },
      ],
    },
  },

  // ═══ 2. JSON → CSV ═════════════════════════════════════════════════════
  "json-csv": {
    introText:
      "Instrumentul de conversie JSON → CSV transformă array-uri JSON în format tabular CSV, care poate fi deschis cu Excel, Google Sheets sau orice altă foaie de calcul. Delimiter la alegere, gestionarea anteturilor și întreaga procesare are loc în browserul tău.",
    guide: [
      "1. Lipește array-ul JSON în câmpul de introducere sau încarcă fișierul .json.",
      "2. Selectează delimiterul dorit (virgulă, punct și virgulă, tab).",
      "3. Apasă butonul «Conversie» – previzualizarea CSV apare imediat.",
      "4. Copiază rezultatul sau descarcă-l ca fișier .csv.",
    ],
    faq: [
      { q: "La ce este util convertorul JSON → CSV?", a: "Servește la transformarea datelor în format JSON în CSV tabular, pe care îl poți deschide direct în Excel, Google Sheets sau alte foi de calcul." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Procesarea are loc în întregime în browserul tău, datele tale nu părăsesc computerul." },
      { q: "Ce structură JSON acceptă?", a: "Așteaptă un array de obiecte (array of objects), unde cheile devin anteturile CSV. Ex: [{\"nume\": \"Ana\", \"varsta\": 25}]." },
      { q: "Ce se întâmplă cu obiectele imbricate?", a: "Obiectele și array-urile imbricate sunt automat convertite ca string JSON în celulă, astfel încât nu se pierd date." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este responsiv și funcționează în orice browser modern, inclusiv pe dispozitive mobile." },
      { q: "Pot alege delimitatorul punct și virgulă?", a: "Da, poți alege între virgulă, punct și virgulă și tab. Pentru Excel în limba română, punctul și virgula este cel mai potrivit." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea JSON-ului", description: "Lipește array-ul JSON în câmpul de introducere sau trage fișierul .json." },
        { title: "2. Selectarea delimiterului", description: "Alege caracterul separator CSV: virgulă, punct și virgulă sau tab." },
        { title: "3. Conversie", description: "Apasă butonul «Conversie» – tabelul CSV apare imediat în previzualizare." },
        { title: "4. Descărcarea rezultatului", description: "Copiază CSV-ul sau descarcă-l ca fișier .csv, pe care îl poți deschide și în Excel." },
      ],
      useCases: [
        { icon: "📈", title: "Raportare", description: "Transformarea datelor JSON primite de la API în CSV pentru crearea de rapoarte și grafice Excel." },
        { icon: "📧", title: "Export de date", description: "Aducerea datelor JSON exportate din aplicații web în formă tabulară pentru utilizatorii de business." },
        { icon: "🔄", title: "Integrarea sistemelor", description: "Transformarea răspunsurilor JSON de la API în CSV pentru sisteme legacy sau instrumente de import." },
        { icon: "📊", title: "Analiză de date în Excel", description: "Datele JSON pot fi analizate prin CSV în tabele pivot și grafice Excel." },
      ],
      formatComparison: {
        title: "Comparație JSON vs CSV",
        columns: ["Proprietate", "JSON", "CSV"],
        rows: [
          { feature: "Structură", values: ["Ierarhică, imbricabilă", "Plată, tabulară"] },
          { feature: "Lizibilitate", values: ["La nivel de cod, formatabilă", "Excelentă în tabele"] },
          { feature: "Gestionarea tipurilor", values: ["Număr, boolean, null, array", "Totul este text"] },
          { feature: "Dimensiunea fișierului", values: ["Mai mare (numele cheilor se repetă)", "Mai mică, mai compactă"] },
          { feature: "Suport", values: ["API, aplicație web", "Excel, Google Sheets, import DB"] },
        ],
      },
      aboutSection: {
        title: "Despre conversia JSON → CSV",
        paragraphs: [
          "Conversia JSON → CSV este cea mai frecventă transformare de format de date în dezvoltarea modernă. API-urile și aplicațiile web comunică în JSON, dar utilizatorii de business și analiștii lucrează în foi de calcul.",
          "În timpul transformării, cheile obiectelor JSON devin anteturile CSV, iar valorile sunt plasate în celulele rândurilor. Structurile imbricate apar automat ca string-uri JSON.",
          "Instrumentul este deosebit de util dacă trebuie să aduci regulat date JSON într-un format compatibil Excel pentru rapoarte, analize sau importuri de date.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Excel-ul românesc așteaptă punct și virgulă ca delimiter – alege această opțiune dacă deschizi fișierul în Excel." },
        { icon: "📋", tip: "Asigură-te că furnizezi un array de obiecte JSON, nu un singur obiect." },
        { icon: "🔑", tip: "Dacă obiectele au chei diferite, toate cheile unice apar ca anteturi, iar valorile lipsă devin celule goale." },
        { icon: "⚠️", tip: "Obiectele imbricate merită aplatizate (flatten) mai întâi, dacă dorești câmpurile lor în coloane separate." },
      ],
    },
  },

  // ═══ 3. TSV → CSV ══════════════════════════════════════════════════════
  "tsv-csv": {
    introText:
      "Convertorul TSV → CSV transformă fișierele de date separate prin tab în format CSV separat prin virgulă. Transformarea are loc în browser, fără încărcare pe server, astfel încât datele tale rămân în siguranță completă.",
    guide: [
      "1. Încarcă fișierul TSV sau lipește textul separat prin tab.",
      "2. Selectează delimiterul țintă (virgulă sau punct și virgulă).",
      "3. Apasă butonul «Conversie» – CSV-ul apare imediat.",
      "4. Descarcă fișierul .csv sau copiază rezultatul.",
    ],
    faq: [
      { q: "La ce este util convertorul TSV → CSV?", a: "Servește la transformarea fișierelor de date separate prin tab (TSV) în format CSV separat prin virgulă, care este suportat pe scară mai largă." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Care este diferența dintre TSV și CSV?", a: "TSV folosește tab-ul ca separator, CSV folosește virgula. CSV este suportat pe scară mai largă, dar în TSV nu trebuie să pui între ghilimele celulele care conțin virgule." },
      { q: "Gestionează ghilimelele?", a: "Da, dacă o celulă conține virgulă, este pusă automat între ghilimele în ieșirea CSV, pentru ca datele să nu fie deteriorate." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este responsiv și funcționează în orice browser modern, inclusiv pe dispozitive mobile." },
      { q: "Cum recunosc un fișier TSV?", a: "Extensia unui fișier TSV este de obicei .tsv sau .txt, iar coloanele sunt separate prin caractere tab. Într-un editor de text, tab-ul apare ca un spațiu mai mare." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea TSV-ului", description: "Trage fișierul TSV pe interfață sau lipește textul separat prin tab." },
        { title: "2. Setarea delimiterului țintă", description: "Alege dacă dorești virgulă sau punct și virgulă în ieșirea CSV." },
        { title: "3. Conversie", description: "Apasă butonul «Conversie» – rezultatul apare imediat." },
        { title: "4. Descărcare", description: "Descarcă fișierul .csv finalizat sau copiază-l în clipboard." },
      ],
      useCases: [
        { icon: "📋", title: "Export din baze de date", description: "Transformarea datelor exportate din baze de date în format TSV în CSV pentru foi de calcul și alte instrumente." },
        { icon: "📊", title: "Import Excel", description: "Conversia fișierelor TSV în CSV, pe care Excel și Google Sheets le deschid direct." },
        { icon: "🔄", title: "Schimb între sisteme", description: "Sisteme diferite necesită formate de delimiter diferite – conversia rezolvă compatibilitatea." },
      ],
      formatComparison: {
        title: "Comparație TSV vs CSV",
        columns: ["Proprietate", "TSV", "CSV"],
        rows: [
          { feature: "Separator", values: ["Tab (\\t)", "Virgulă (,) sau punct și virgulă (;)"] },
          { feature: "Ghilimele", values: ["Rar necesare", "Frecvent necesare (dacă celula conține virgulă)"] },
          { feature: "Suport", values: ["Cerc mai restrâns", "Pe scară largă (Excel, DB, API)"] },
          { feature: "Lizibilitate", values: ["Bună (coloane aliniate)", "Compactă, dar mai greu de citit"] },
          { feature: "Copiere din tabel", values: ["Copy-paste implicit", "Conversie manuală necesară"] },
        ],
      },
      aboutSection: {
        title: "Despre formatul TSV",
        paragraphs: [
          "TSV (Tab-Separated Values) este un format text simplu în care coloanele sunt separate prin caractere tab. Este folosit frecvent la exportul din baze de date și la copierea datelor tabulare.",
          "CSV (Comma-Separated Values) este cel mai răspândit format de date tabulare, suportat de aproape orice aplicație. Trecerea de la TSV la CSV îmbunătățește compatibilitatea cu Excel, Google Sheets și alte instrumente.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Datele copiate din foi de calcul sunt de obicei în format TSV – lipește-le direct în instrument." },
        { icon: "📋", tip: "Pentru Excel românesc, alege delimiterul punct și virgulă în loc de virgulă." },
        { icon: "⚠️", tip: "Verifică dacă datele tale sunt într-adevăr separate prin tab, nu prin spații multiple." },
      ],
    },
  },

  // ═══ 4. CSV → TSV ══════════════════════════════════════════════════════
  "csv-tsv": {
    introText:
      "Convertorul CSV → TSV transformă datele CSV separate prin virgulă în format TSV separat prin tab. Transformarea are loc în browser, fără încărcare pe server, iar rezultatul poate fi lipit direct în foi de calcul.",
    guide: [
      "1. Încarcă fișierul CSV sau lipește conținutul text.",
      "2. Verifică setarea delimiterului sursă (virgulă sau punct și virgulă).",
      "3. Apasă butonul «Conversie» – ieșirea TSV apare imediat.",
      "4. Copiază rezultatul sau descarcă-l ca fișier .tsv.",
    ],
    faq: [
      { q: "La ce este util convertorul CSV → TSV?", a: "Servește la transformarea fișierelor CSV în format TSV separat prin tab, ideal pentru importuri în baze de date și lipire în foi de calcul." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Procesarea are loc 100% în browserul tău, datele nu sunt trimise către un server." },
      { q: "De ce să folosesc TSV în loc de CSV?", a: "În TSV nu trebuie să pui între ghilimele celulele care conțin virgule, iar datele separate prin tab pot fi lipite direct în foi de calcul." },
      { q: "Gestionează CSV-ul cu punct și virgulă?", a: "Da, instrumentul recunoaște automat atât fișierele CSV separate prin virgulă, cât și cele separate prin punct și virgulă." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Păstrează ghilimelele?", a: "Ghilimelele sunt rar necesare în TSV. Instrumentul elimină ghilimelele inutile și le aplică doar dacă celula conține tab." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea CSV-ului", description: "Trage fișierul CSV sau lipește textul separat prin virgulă în câmpul de introducere." },
        { title: "2. Verificarea delimiterului sursă", description: "Asigură-te că instrumentul a recunoscut corect delimiterul CSV." },
        { title: "3. Conversie", description: "Apasă butonul «Conversie» – ieșirea TSV apare imediat." },
        { title: "4. Copierea rezultatului", description: "Copiază textul TSV direct într-o foaie de calcul sau descarcă-l ca fișier .tsv." },
      ],
      useCases: [
        { icon: "📋", title: "Lipire în foi de calcul", description: "Formatul TSV poate fi lipit direct în Excel sau Google Sheets, coloanele se separă automat." },
        { icon: "🗄️", title: "Import în baze de date", description: "Mai multe sisteme de gestionare a bazelor de date suportă nativ importul TSV, evitând problemele cu ghilimelele." },
        { icon: "🔬", title: "Procesarea datelor științifice", description: "Instrumentele de bioinformatică și cele științifice necesită frecvent format TSV ca intrare." },
      ],
      formatComparison: {
        title: "Comparație CSV vs TSV",
        columns: ["Proprietate", "CSV", "TSV"],
        rows: [
          { feature: "Separator", values: ["Virgulă (,) sau punct și virgulă (;)", "Tab (\\t)"] },
          { feature: "Ghilimele", values: ["Frecvent necesare", "Rar necesare"] },
          { feature: "Lipire în tabel", values: ["Import necesar", "Paste direct"] },
          { feature: "Dimensiunea fișierului", values: ["Mai mică", "Puțin mai mare (tab = 1 caracter)"] },
          { feature: "Compatibilitate", values: ["Pe scară largă", "Mai restrânsă, dar populară la baze de date"] },
        ],
      },
      aboutSection: {
        title: "Despre conversia CSV → TSV",
        paragraphs: [
          "Conversia CSV → TSV transformă datele separate prin virgulă în date separate prin tab. Avantajul formatului TSV este că caracterul tab apare rar în date, astfel încât apar mai puține probleme cu ghilimelele.",
          "TSV este deosebit de util când dorești să lipești date direct în foi de calcul (Excel, Google Sheets), deoarece aplicațiile organizează automat textul separat prin tab în coloane.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Formatul TSV este ideal dacă copiezi regulat date între foi de calcul și editoare de text." },
        { icon: "📋", tip: "Datele separate prin tab pot fi lipite direct în Excel – coloanele se separă automat." },
        { icon: "⚠️", tip: "Verifică dacă CSV-ul sursă este într-adevăr separat prin virgulă sau punct și virgulă, nu prin tab." },
      ],
    },
  },

  // ═══ 5. CSV ADATTISZTÍTÁS ══════════════════════════════════════════════
  "csv-tisztitas": {
    introText:
      "Instrumentul de curățare a datelor CSV elimină rândurile goale, înregistrările duplicate și spațiile inutile din fișierele CSV. Poți pune ordine în datele tale cu un singur clic, iar întreaga procesare are loc în browserul tău.",
    guide: [
      "1. Încarcă fișierul CSV sau lipește datele în câmpul de introducere.",
      "2. Bifează operațiunile de curățare dorite: rânduri goale, duplicate, spații albe.",
      "3. Apasă butonul «Curățare» – rezultatul apare în panoul de previzualizare.",
      "4. Verifică statisticile (numărul de rânduri eliminate) și descarcă fișierul curățat.",
    ],
    faq: [
      { q: "La ce este util instrumentul de curățare a datelor CSV?", a: "Servește la curățarea fișierelor CSV: ștergerea rândurilor goale, eliminarea înregistrărilor duplicate și normalizarea spațiilor inutile." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, datele nu sunt trimise către un server – niciun terț nu are acces la ele." },
      { q: "Ce operațiuni de curățare pot efectua?", a: "Ștergerea rândurilor goale, eliminarea rândurilor complet goale, filtrarea rândurilor duplicate, precum și eliminarea spațiilor inutile de la începutul și sfârșitul celulelor." },
      { q: "Cum recunoaște duplicatele?", a: "Două rânduri sunt considerate duplicate dacă tot conținutul celulelor lor este identic. Diferențele de spații albe sunt ignorate." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este responsiv și poate fi utilizat pe mobil și tabletă din orice browser modern." },
      { q: "Pot anula curățarea?", a: "Nu modificăm fișierul original – primești întotdeauna o versiune nouă, curățată. Fișierul original rămâne neschimbat pe computerul tău." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea CSV-ului", description: "Trage fișierul CSV sau lipește conținutul text în câmpul de introducere." },
        { title: "2. Selectarea opțiunilor de curățare", description: "Bifează operațiunile de curățare dorite: rânduri goale, duplicate, spații albe." },
        { title: "3. Rularea curățării", description: "Apasă butonul «Curățare» – statisticile și previzualizarea apar imediat." },
        { title: "4. Descărcarea rezultatului", description: "Verifică datele curățate, apoi descarcă fișierul sau copiază-l în clipboard." },
      ],
      useCases: [
        { icon: "🧹", title: "Curățarea datelor exportate", description: "Curățarea fișierelor CSV exportate din baze de date sau aplicații web de rândurile goale și duplicate." },
        { icon: "📊", title: "Pregătirea analizei", description: "Curățarea CSV-ului înainte de analiza datelor asigură că statisticile și graficele dau rezultate precise." },
        { icon: "🔄", title: "Normalizare înainte de import", description: "Curățarea datelor CSV înainte de importul într-o bază de date sau aplicație web." },
        { icon: "📧", title: "Curățarea listelor de e-mail", description: "Curățarea listelor de e-mail de intrările duplicate și goale înainte de trimiterea în masă." },
      ],
      aboutSection: {
        title: "Despre importanța curățării datelor",
        paragraphs: [
          "Curățarea datelor (data cleaning) înseamnă corectarea și normalizarea datelor brute. În cazul fișierelor CSV, cele mai frecvente probleme sunt rândurile goale, înregistrările duplicate și caracterele de spațiu alb inutile, care pot cauza erori în procesarea datelor.",
          "Datele curate sunt esențiale pentru analize precise, rapoarte și importuri în baze de date. Chiar și un singur rând duplicat sau eronat poate distorsiona statisticile și deciziile de business.",
          "Instrumentul nostru arată vizual câte rânduri a eliminat și ce modificări a efectuat, oferind astfel transparență completă asupra procesului.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Curățarea ar trebui să fie întotdeauna primul pas, înainte de a procesa sau converti datele mai departe." },
        { icon: "📊", tip: "Verifică statisticile – dacă au fost găsite multe duplicate, problema ar putea fi la sursa datelor." },
        { icon: "🔍", tip: "Folosește previzualizarea înainte și după curățare pentru a te asigura că rândurile corecte au fost eliminate." },
        { icon: "⚠️", tip: "Dacă filtrarea duplicatelor șterge prea mult, verifică dacă în date nu există rânduri care se repetă intenționat." },
      ],
    },
  },

  // ═══ 6. CSV FEJLÉCEK ÁTNEVEZÉSE ════════════════════════════════════════
  "fejlec-atnevezes": {
    introText:
      "Cu instrumentul de redenumire a anteturilor CSV poți edita vizual anteturile coloanelor CSV fără a modifica manual fișierul. Încarcă CSV-ul, redenumește anteturile și descarcă rezultatul – totul are loc în browser.",
    guide: [
      "1. Încarcă fișierul CSV – anteturile coloanelor apar automat.",
      "2. Apasă pe antetul pe care dorești să-l modifici și introdu noul nume.",
      "3. Apasă butonul «Salvare» – previzualizarea se actualizează cu noile anteturi.",
      "4. Descarcă fișierul CSV modificat.",
    ],
    faq: [
      { q: "La ce este util instrumentul de redenumire a anteturilor?", a: "Servește la redenumirea rapidă și vizuală a anteturilor coloanelor din fișierele CSV, fără a fi nevoie să cauți într-un editor de text." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Procesarea are loc exclusiv în browser, niciun fel de date nu părăsesc computerul tău." },
      { q: "Modifică rândurile de date?", a: "Nu, doar rândul de antet (primul rând) se modifică. Toate rândurile de date rămân neatinse." },
      { q: "Pot anula redenumirea?", a: "Da, fișierul original nu este modificat – primești întotdeauna un fișier nou de descărcat. De asemenea, poți anula modificările și din interfață." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul are o interfață responsivă și poate fi folosit confortabil și pe mobil." },
      { q: "Pot redenumi toate anteturile deodată?", a: "Da, toate anteturile pot fi editate din interfață. Previzualizarea se actualizează în timp real, astfel încât vezi rezultatul înainte de salvare." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea CSV-ului", description: "Trage fișierul CSV sau lipește conținutul text – anteturile apar automat." },
        { title: "2. Editarea anteturilor", description: "Apasă pe antetul pe care dorești să-l modifici și introdu noul nume în câmpul de text." },
        { title: "3. Verificarea previzualizării", description: "Previzualizarea arată în timp real anteturile redenumite împreună cu datele." },
        { title: "4. Descărcare", description: "Descarcă CSV-ul modificat sau copiază-l în clipboard." },
      ],
      useCases: [
        { icon: "🏷️", title: "Standardizarea anteturilor", description: "Unificarea anteturilor fișierelor CSV provenite din surse diferite înainte de import." },
        { icon: "🌐", title: "Localizare lingvistică", description: "Traducerea anteturilor din engleză în română sau invers pentru proiecte internaționale." },
        { icon: "🔧", title: "Compatibilitate API", description: "Redenumirea anteturilor pentru a corespunde numelor de câmpuri ale API-ului sau bazei de date." },
        { icon: "📊", title: "Pregătirea rapoartelor", description: "Setarea unor anteturi mai ușor de înțeles pentru prezentări și rapoarte." },
      ],
      aboutSection: {
        title: "Despre redenumirea anteturilor CSV",
        paragraphs: [
          "Primul rând al fișierelor CSV este de obicei rândul de antet (header), care conține numele coloanelor. Denumirea anteturilor este esențială pentru interpretarea, importul și procesarea datelor.",
          "Redenumirea anteturilor este frecvent necesară în cazul integrării datelor, migrării sistemelor sau pregătirii rapoartelor. Interfața de editare vizuală face acest proces mai rapid și mai sigur decât modificarea manuală într-un editor de text.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește anteturi fără diacritice, cu litere mici, dacă procesezi datele din cod." },
        { icon: "🔑", tip: "Evită spațiile și caracterele speciale în anteturi – folosește underscore (_) sau cratimă (-) în loc." },
        { icon: "📋", tip: "Verifică întotdeauna previzualizarea înainte de salvare pentru a te asigura de corectitudinea redenumirii." },
      ],
    },
  },

  // ═══ 7. CSV OSZLOPOK KIVÁLASZTÁSA ══════════════════════════════════════
  "oszlopok-kivalasztasa": {
    introText:
      "Cu instrumentul de selectare a coloanelor CSV poți marca cu checkbox coloanele de păstrat sau de eliminat. Poți filtra fișierul CSV pe o interfață vizuală simplă, iar procesarea are loc în întregime în browser.",
    guide: [
      "1. Încarcă fișierul CSV – lista coloanelor apare automat.",
      "2. Bifează coloanele de păstrat cu checkbox sau debifează-le pe cele inutile.",
      "3. Apasă butonul «Aplică» – previzualizarea se actualizează doar cu coloanele selectate.",
      "4. Descarcă fișierul CSV redus.",
    ],
    faq: [
      { q: "La ce este util instrumentul de selectare a coloanelor?", a: "Servește la păstrarea coloanelor necesare și eliminarea celor inutile din fișierele CSV, pe o interfață vizuală cu checkbox." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Procesarea are loc în browserul tău, datele nu sunt trimise către un server – protecția completă a datelor este asigurată." },
      { q: "Pot schimba ordinea coloanelor?", a: "Coloanele apar în rezultat în ordinea selectării. Poți modifica ordinea prin drag-and-drop." },
      { q: "Ce se întâmplă cu datele din coloanele neselectate?", a: "Coloanele neselectate și datele lor nu apar în fișierul rezultat. Fișierul original rămâne neschimbat." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este responsiv, iar checkbox-urile pot fi utilizate confortabil și pe mobil." },
      { q: "Există opțiuni de selectare rapidă?", a: "Da, cu butoanele «Selectează tot» și «Deselectează tot» poți gestiona rapid coloanele." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea CSV-ului", description: "Trage fișierul CSV sau lipește textul – coloanele sunt listate automat." },
        { title: "2. Selectarea coloanelor", description: "Bifează cu checkbox coloanele de păstrat sau debifează-le pe cele inutile." },
        { title: "3. Previzualizare", description: "Previzualizarea se actualizează în timp real doar cu coloanele selectate." },
        { title: "4. Salvarea rezultatului", description: "Descarcă noul CSV sau copiază-l în clipboard." },
      ],
      useCases: [
        { icon: "🔒", title: "Protecția datelor", description: "Eliminarea coloanelor sensibile (ex. date personale) din CSV înainte de partajare sau publicare." },
        { icon: "📉", title: "Reducerea dimensiunii fișierului", description: "Eliminarea coloanelor inutile pentru reducerea dimensiunii fișierului și a timpului de procesare." },
        { icon: "🎯", title: "Export de date țintit", description: "Păstrarea doar a coloanelor relevante pentru analize sau rapoarte specifice." },
        { icon: "🔄", title: "Pregătirea importului", description: "Filtrarea coloanelor fișierului CSV de importat conform cerințelor sistemului țintă." },
      ],
      aboutSection: {
        title: "Despre selectarea coloanelor",
        paragraphs: [
          "Fișierele CSV conțin frecvent mai multe coloane decât sunt necesare pentru o anumită sarcină. Selectarea coloanelor (column selection / column filtering) permite păstrarea doar a datelor relevante.",
          "Eliminarea coloanelor inutile nu doar reduce dimensiunea fișierului, ci îmbunătățește și protecția datelor – acest lucru este deosebit de important la partajarea fișierelor CSV care conțin date personale.",
          "Interfața vizuală cu checkbox face filtrarea coloanelor mai simplă și mai sigură decât soluțiile din linia de comandă sau programatice.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește butonul «Deselectează tot» dacă dorești să păstrezi doar câteva coloane din multe." },
        { icon: "🔒", tip: "Elimină întotdeauna coloanele care conțin date sensibile înainte de a partaja CSV-ul cu alții." },
        { icon: "📋", tip: "Previzualizarea te ajută să verifici dacă ai selectat coloanele corecte." },
        { icon: "🔄", tip: "Dacă dorești să modifici și ordinea coloanelor, reordonarea drag-and-drop te ajută." },
      ],
    },
  },

  // ═══ 8. CSV SOROK SZŰRÉSE ══════════════════════════════════════════════
  "sorok-szurese": {
    introText:
      "Cu instrumentul de filtrare a rândurilor CSV poți filtra rândurile CSV pe baza unor condiții: conține, egal, mai mare, mai mic, nu este gol și alți operatori. Întreaga procesare are loc în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Încarcă fișierul CSV – coloanele apar automat.",
      "2. Selectează coloana de filtrat și operatorul (ex. conține, egal, mai mare).",
      "3. Introdu valoarea de filtrare și apasă butonul «Filtrare».",
      "4. Verifică datele filtrate în previzualizare, apoi descarcă rezultatul.",
    ],
    faq: [
      { q: "La ce este util instrumentul de filtrare a rândurilor?", a: "Servește la filtrarea rândurilor din fișierele CSV pe baza diferitelor condiții: conținut textual, comparație numerică, verificarea valorilor goale." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Filtrarea are loc în întregime în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Ce operatori de filtrare pot folosi?", a: "Conține, nu conține, egal, diferit, mai mare decât, mai mic decât, gol, nu este gol – atât pentru câmpuri text, cât și numerice." },
      { q: "Pot aplica mai multe condiții simultan?", a: "Da, poți specifica mai multe condiții de filtrare, care sunt combinate cu logica ȘI (AND)." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este responsiv și poate fi folosit confortabil și pe mobil." },
      { q: "Ce dimensiuni de fișiere gestionează?", a: "Nu există limită pe server. Procesarea rulează într-un Web Worker, astfel încât fișierele cu mii de rânduri pot fi filtrate rapid." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea CSV-ului", description: "Trage fișierul CSV sau lipește textul – coloanele și datele se încarcă." },
        { title: "2. Specificarea condiției de filtrare", description: "Selectează coloana, operatorul și introdu valoarea de filtrare." },
        { title: "3. Executarea filtrării", description: "Apasă butonul «Filtrare» – rămân doar rândurile care îndeplinesc condiția." },
        { title: "4. Descărcarea rezultatului", description: "Verifică datele filtrate, apoi descarcă fișierul sau copiază rezultatul." },
      ],
      useCases: [
        { icon: "🔍", title: "Căutare în date", description: "Găsirea rapidă a rândurilor care conțin o anumită valoare în fișiere CSV mari, fără căutare manuală." },
        { icon: "📊", title: "Crearea subseturilor", description: "Extragerea unui subset specific din seturi mari de date pentru analize sau rapoarte." },
        { icon: "🧹", title: "Curățarea datelor", description: "Filtrarea rândurilor care conțin valori goale sau eronate înainte de procesarea ulterioară." },
        { icon: "📈", title: "Filtrare pe prag", description: "Filtrarea datelor numerice pe baza unui prag specificat (ex. vânzări > 10000)." },
      ],
      aboutSection: {
        title: "Despre filtrarea rândurilor CSV",
        paragraphs: [
          "Filtrarea rândurilor (row filtering) este una dintre cele mai fundamentale operațiuni de procesare a datelor, al cărei scop este selectarea rândurilor relevante și eliminarea celor inutile dintr-un set de date.",
          "Operatorii de filtrare permit specificarea condițiilor text (conține, egal) și numerice (mai mare, mai mic), precum și căutarea celulelor goale. Combinând acestea, poți crea condiții de filtrare complexe.",
          "Instrumentul arată rezultatul filtrării în timp real în panoul de previzualizare, astfel încât poți vedea imediat ce rânduri păstrează condiția.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Operatorul «conține» caută potrivire parțială – folosește operatorul «egal» pentru potrivire exactă." },
        { icon: "🔢", tip: "La filtrarea numerică, asigură-te că respectiva coloană conține într-adevăr numere, altfel se face comparație textuală." },
        { icon: "📋", tip: "La combinarea mai multor filtre, se aplică logica ȘI (AND) – toate condițiile trebuie îndeplinite." },
        { icon: "⚠️", tip: "Filtrarea nu modifică fișierul original – primești întotdeauna o versiune nouă, filtrată, ca rezultat." },
      ],
    },
  },

  // ═══ 9. CSV OSZLOP SZÉTVÁLASZTÁSA ══════════════════════════════════════
  "oszlop-szetvalasztas": {
    introText:
      "Instrumentul de separare a coloanelor CSV împarte o singură coloană în mai multe coloane pe baza unui delimiter specificat. Funcționează cu detectare automată a numărului de coloane, iar întreaga procesare are loc în browserul tău.",
    guide: [
      "1. Încarcă fișierul CSV și selectează coloana de separat.",
      "2. Introdu caracterul separator (ex. virgulă, cratimă, spațiu).",
      "3. Apasă butonul «Separare» – noile coloane apar în previzualizare.",
      "4. Descarcă fișierul CSV modificat cu noile coloane.",
    ],
    faq: [
      { q: "La ce este util instrumentul de separare a coloanelor?", a: "Servește la împărțirea unei singure coloane CSV în mai multe coloane pe baza delimiterului – ex. separarea «Nume Prenume» în două coloane distincte." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Procesarea are loc în întregime în browserul tău, datele nu părăsesc niciodată computerul tău." },
      { q: "Ce delimiteri pot folosi?", a: "Poți specifica orice caracter: spațiu, virgulă, cratimă, punct, slash, două puncte – sau chiar un separator cu mai multe caractere." },
      { q: "Ce se întâmplă dacă valorile au un număr diferit de segmente?", a: "Instrumentul se adaptează la valoarea cu cele mai multe segmente. Dacă o valoare are mai puține segmente, coloanele lipsă rămân goale." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este responsiv și complet funcțional pe mobil." },
      { q: "Se păstrează și coloana originală?", a: "Se poate configura dacă coloana originală rămâne alături de coloanele separate sau este eliminată." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea CSV-ului", description: "Trage fișierul CSV sau lipește conținutul text – coloanele apar." },
        { title: "2. Selectarea coloanei și delimiterului", description: "Selectează coloana de separat și introdu caracterul separator." },
        { title: "3. Separare", description: "Apasă butonul «Separare» – noile coloane apar imediat în previzualizare." },
        { title: "4. Descărcarea rezultatului", description: "Verifică rezultatul și descarcă fișierul CSV modificat." },
      ],
      useCases: [
        { icon: "👤", title: "Separarea numelor", description: "Separarea numelui complet în coloane de nume de familie și prenume pentru import în baze de date." },
        { icon: "📍", title: "Descompunerea adreselor", description: "Separarea câmpului de adresă combinat în coloane de cod poștal, oraș și stradă." },
        { icon: "📅", title: "Descompunerea datelor", description: "Separarea câmpului de dată (2024-01-15) în coloane de an, lună și zi pentru analize." },
        { icon: "🏷️", title: "Separarea etichetelor", description: "Separarea etichetelor (tag-urilor) delimitate prin virgulă în coloane individuale." },
      ],
      aboutSection: {
        title: "Despre separarea coloanelor",
        paragraphs: [
          "Separarea coloanelor (column split) este o operațiune frecventă de procesare a datelor, al cărei scop este împărțirea conținutului unei singure coloane în mai multe coloane de-a lungul unui caracter separator. Acest lucru este util în special când datele nu sunt normalizate corespunzător.",
          "Cel mai frecvent caz de utilizare este descompunerea numelor, adreselor sau datelor, dar orice coloană care conține un caracter separator regulat poate fi separată.",
          "Instrumentul detectează automat numărul de coloane pe baza valorii cu cele mai multe segmente, astfel încât nu trebuie să specifici dinainte în câte coloane să fie împărțite datele.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Verifică mai întâi previzualizarea – detectarea automată a numărului de coloane arată în câte părți se descompun datele." },
        { icon: "📋", tip: "Dacă delimiterul apare și în date (ex. nume cu virgulă), ia în considerare utilizarea unui separator mai unic." },
        { icon: "⚠️", tip: "În cazul unui număr diferit de segmente, valorile mai scurte primesc celule goale la sfârșit." },
        { icon: "🔄", tip: "După separare, merită să folosești instrumentul de selectare a coloanelor pentru a elimina coloana originală care a devenit inutilă." },
      ],
    },
  },

  // ═══ 10. CSV ÉRTÉKEK NORMALIZÁLÁSA ═════════════════════════════════════
  "ertekek-normalizalasa": {
    introText:
      "Instrumentul de normalizare a valorilor CSV normalizează coloanele numerice pe scala 0–1 (Min-Max) sau prin metoda z-score. Recunoaște automat coloanele numerice, iar întreaga procesare are loc în browserul tău.",
    guide: [
      "1. Încarcă fișierul CSV – instrumentul recunoaște automat coloanele numerice.",
      "2. Selectează coloanele de normalizat și metoda de normalizare (Min-Max sau Z-score).",
      "3. Apasă butonul «Normalizare» – rezultatul apare în previzualizare.",
      "4. Descarcă fișierul CSV cu datele normalizate.",
    ],
    faq: [
      { q: "La ce este util instrumentul de normalizare a valorilor?", a: "Servește la normalizarea coloanelor numerice pe o scală unitară (0–1 Min-Max sau Z-score), esențială pentru învățarea automată și analizele comparative." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Normalizarea are loc în întregime în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Care este diferența dintre normalizarea Min-Max și Z-score?", a: "Min-Max scalează valorile între 0 și 1 (cea mai mică devine 0, cea mai mare devine 1). Z-score măsoară abaterea de la medie în unități de deviație standard (medie = 0, deviație standard = 1)." },
      { q: "Când pe care să o folosesc?", a: "Min-Max: când ai nevoie de un interval cunoscut (ex. rețele neurale). Z-score: când valorile aberante sunt importante și presupui distribuție normală." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este responsiv și poate fi utilizat pe mobil din orice browser modern." },
      { q: "Se păstrează coloanele non-numerice?", a: "Da, coloanele text și alte coloane non-numerice rămân neschimbate, doar coloanele numerice selectate sunt normalizate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea CSV-ului", description: "Trage fișierul CSV – coloanele numerice sunt recunoscute automat." },
        { title: "2. Selectarea metodei și coloanelor", description: "Alege metoda de normalizare (Min-Max sau Z-score) și coloanele de normalizat." },
        { title: "3. Normalizare", description: "Apasă butonul «Normalizare» – rezultatul apare imediat în panoul de previzualizare." },
        { title: "4. Descărcarea rezultatului", description: "Verifică valorile normalizate, apoi descarcă fișierul." },
      ],
      useCases: [
        { icon: "🤖", title: "Pregătire pentru învățare automată", description: "Normalizarea caracteristicilor pentru antrenarea modelelor ML, astfel încât variabilele cu scale diferite să fie ponderate egal." },
        { icon: "📊", title: "Analiză comparativă", description: "Aducerea datelor cu unități de măsură diferite pe o scală unitară pentru comparabilitate." },
        { icon: "📈", title: "Vizualizare", description: "Normalizarea datelor cu ordine de mărime diferite pentru a putea fi reprezentate pe un singur grafic." },
        { icon: "🔬", title: "Cercetare științifică", description: "Normalizarea datelor de măsurare pentru compararea rezultatelor diferitelor experimente." },
      ],
      aboutSection: {
        title: "Despre normalizarea datelor",
        paragraphs: [
          "Normalizarea datelor înseamnă transformarea valorilor numerice pe o scală unitară. Acesta este un pas esențial în învățarea automată, analizele statistice și vizualizarea datelor, unde variabilele cu scale diferite pot distorsiona rezultatele.",
          "Normalizarea Min-Max mapează cea mai mică valoare la 0 și cea mai mare la 1, scalând liniar valorile intermediare. Avantajul este intervalul de ieșire cunoscut, dezavantajul este sensibilitatea la valori aberante.",
          "Normalizarea Z-score (scor standard) măsoară abaterea de la medie în unități de deviație standard. Avantajul este că gestionează valorile aberante și se aliniază la distribuția normală.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește normalizarea Min-Max dacă valorile trebuie să fie în intervalul 0 și 1 (ex. intrare pentru rețele neurale)." },
        { icon: "📊", tip: "Alege Z-score dacă datele au valori aberante (outliere) și presupui distribuție normală." },
        { icon: "⚠️", tip: "Normalizează doar coloanele cu adevărat numerice – codurile de categorie (ex. 1, 2, 3) nu necesită neapărat normalizare." },
        { icon: "🔢", tip: "Instrumentul recunoaște automat coloanele numerice, dar merită să verifici ca să nu fie incluse coloane de ID sau cod poștal." },
      ],
    },
  },

  // ═══ 11. TÖMEGES KONVERTÁLÁS ZIP ═══════════════════════════════════════
  "tomeges-konvertalas-zip": {
    introText:
      "Convertorul CSV→JSON în masă transformă mai multe fișiere CSV în format JSON simultan, iar rezultatele pot fi descărcate într-un singur fișier ZIP. Procesare batch în browser, fără încărcare pe server.",
    guide: [
      "1. Trage toate fișierele CSV de convertit în zona de încărcare.",
      "2. Verifică setările (delimiter, gestionarea anteturilor) – se aplică uniform pentru toate fișierele.",
      "3. Apasă butonul «Conversie» – procesarea pornește automat.",
      "4. Descarcă fișierul ZIP care conține toate rezultatele.",
    ],
    faq: [
      { q: "La ce este util convertorul în masă?", a: "Servește la conversia simultană a mai multor fișiere CSV în JSON, rezultatele putând fi descărcate într-un singur fișier ZIP – economie de timp la cantități mari de fișiere." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Procesarea tuturor fișierelor are loc în browserul tău, niciun fel de date nu sunt trimise către un server. ZIP-ul este creat tot în browser." },
      { q: "Câte fișiere pot încărca simultan?", a: "Nu există o limită strictă, dar viteza de procesare depinde de memoria browserului și de dimensiunea fișierelor. În general, câteva zeci de fișiere pot fi gestionate confortabil." },
      { q: "Se aplică aceleași setări pentru toate fișierele?", a: "Da, setările de delimiter și gestionare a anteturilor se aplică uniform pentru toate fișierele încărcate." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul funcționează și pe mobil, deși pentru cantități mari de fișiere recomandăm un browser desktop din motive de performanță." },
      { q: "Cu ce nume ajung fișierele în ZIP?", a: "Fiecare fișier JSON primește numele fișierului CSV original cu extensia .json (ex. date.csv → date.json)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea fișierelor", description: "Trage simultan toate fișierele CSV de convertit în zona de încărcare." },
        { title: "2. Setări", description: "Verifică setările de delimiter și gestionare a anteturilor – se aplică pentru toate fișierele." },
        { title: "3. Conversie batch", description: "Apasă butonul «Conversie» – procesarea avansează fișier cu fișier, statusul poate fi urmărit." },
        { title: "4. Descărcarea ZIP-ului", description: "Toate fișierele JSON pot fi descărcate într-o singură arhivă ZIP." },
      ],
      useCases: [
        { icon: "📁", title: "Migrarea datelor", description: "Conversia simultană a unui număr mare de fișiere CSV de date în JSON în timpul migrării sistemelor sau încărcării bazelor de date." },
        { icon: "⚡", title: "Procesare automatizată", description: "Conversia batch a exporturilor CSV regulate în format JSON pentru aplicații web." },
        { icon: "🗂️", title: "Arhivare", description: "Conversia fișierelor CSV în JSON și împachetarea în ZIP pentru arhivare structurată pe termen lung." },
        { icon: "🔄", title: "Integrarea sistemelor", description: "Transformarea fișierelor CSV din surse multiple într-un format JSON unitar pentru încărcare API." },
      ],
      aboutSection: {
        title: "Despre conversia în masă",
        paragraphs: [
          "Conversia batch a datelor permite procesarea mai multor fișiere simultan, în loc să fie convertite unul câte unul. Aceasta reprezintă o economie semnificativă de timp dacă trebuie să transformi regulat cantități mari de fișiere CSV în JSON.",
          "Instrumentul generează fișierul ZIP în browser, astfel încât nu este nevoie de un program separat de comprimare. ZIP-ul conține toate fișierele JSON convertite cu numele originale ale fișierelor.",
          "Procesarea are loc fișier cu fișier, iar progresul poate fi urmărit în timp real pe interfață. Dacă un fișier este eronat, acesta nu oprește procesarea celorlalte fișiere.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Asigură-te că toate fișierele CSV folosesc același delimiter, deoarece setarea este uniformă." },
        { icon: "📁", tip: "Fișierul ZIP este creat în browser – nu ai nevoie de un program separat de comprimare." },
        { icon: "⚠️", tip: "În cazul a foarte multe sau foarte mari fișiere, monitorizează utilizarea memoriei browserului." },
        { icon: "🔢", tip: "Fișierele sunt incluse în ZIP cu numele lor originale, doar extensia se schimbă din .csv în .json." },
      ],
    },
  },
};
