import type { ContentMap } from "../types.ts";

export const SZOVEG_RO_CONTENT: ContentMap = {
  // ═══ 1. SLUG GENERÁTOR ════════════════════════════════════════════════════
  "slug-generator": {
    introText:
      "Generatorul de slug transformă orice text cu diacritice sau caractere speciale într-un format prietenos pentru URL-uri. Elimină diacriticele, convertește la litere mici, înlocuiește spațiile cu cratime și șterge caracterele speciale, oferindu-ți URL-uri curate, optimizate pentru SEO, cu un singur clic.",
    guide: [
      "1. Introdu sau lipește textul din care dorești să generezi un slug.",
      "2. Instrumentul elimină automat diacriticele, convertește la litere mici și înlocuiește spațiile cu cratime.",
      "3. Verifică rezultatul și, dacă este necesar, modifică textul de intrare.",
      "4. Copiază slug-ul generat în clipboard cu un singur clic.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Transformă orice text într-un format slug prietenos pentru URL-uri: elimină diacriticele, convertește la litere mici, înlocuiește spațiile cu cratime și șterge caracterele speciale." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Gestionează caracterele cu diacritice?", a: "Da, toate caracterele cu diacritice (ă, â, î, ș, ț și altele) sunt convertite corect la echivalentele lor fără diacritice." },
      { q: "Ce format de slug generează?", a: "Un slug cu litere mici, separat prin cratime, care conține doar litere ASCII, cifre și cratime – acesta este cel mai răspândit format de slug pentru URL-uri." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "De ce este important un slug bun pentru SEO?", a: "Motoarele de căutare favorizează URL-urile lizibile, care conțin cuvinte-cheie. Un slug curat îmbunătățește clasarea în rezultatele căutărilor și experiența utilizatorului." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introducerea textului", description: "Introdu sau lipește textul din care dorești să creezi un slug." },
        { title: "2. Transformare automată", description: "Instrumentul generează slug-ul în timp real: elimină diacriticele, convertește la litere mici și adaugă cratime." },
        { title: "3. Verificarea rezultatului", description: "Verifică slug-ul generat și, dacă este necesar, ajustează textul de intrare." },
        { title: "4. Copiere", description: "Copiază slug-ul generat în clipboard folosind butonul de copiere." },
      ],
      useCases: [
        { icon: "🌐", title: "URL-uri optimizate pentru SEO", description: "Generarea de slug-uri curate și lizibile pentru articole de blog, pagini de produse și categorii." },
        { icon: "📝", title: "Conținut CMS", description: "Generare automată de slug-uri din titluri pentru WordPress, Ghost sau alte sisteme CMS." },
        { icon: "🗂️", title: "Nume de fișiere", description: "Transformă numele de fișiere cu diacritice în nume sigure, compatibile ASCII." },
        { icon: "🔗", title: "Linkuri de ancoră", description: "Generează identificatori fără diacritice pentru linkurile de navigare din interiorul paginii (ancore)." },
      ],
      aboutSection: {
        title: "Importanța slug-urilor și a URL-urilor",
        paragraphs: [
          "Slug-ul este partea din URL care identifică conținutul paginii în limbaj uman. Un slug bun este scurt, descriptiv și ușor de citit – de exemplu, «calculator-credit-ipotecar» este mult mai informativ decât un identificator aleatoriu.",
          "Pentru conținut în limba română, este deosebit de important să eliminați diacriticele din URL-uri, deoarece caracterele cu diacritice apar codificate în bara de adrese a browserului (de exemplu, %C8%99), ceea ce afectează lizibilitatea și performanța SEO.",
          "Motoarele de căutare iau în considerare și cuvintele-cheie din slug la clasare. Un slug bine ales îmbunătățește aspectul rezultatelor de căutare și crește rata de click.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Păstrează slug-ul scurt și la obiect – un slug de 3-5 cuvinte este ideal." },
        { icon: "🔑", tip: "Folosește cuvinte-cheie în slug pentru o performanță SEO mai bună." },
        { icon: "⚠️", tip: "Evită conjuncțiile și articolele inutile (și, sau, un, o) în slug." },
        { icon: "🔗", tip: "Schimbarea slug-ului pentru paginile existente necesită o redirecționare 301 de la URL-ul vechi." },
      ],
    },
  },

  // ═══ 2. SOROK RENDEZÉSE ═══════════════════════════════════════════════════
  "sorok-rendezese": {
    introText:
      "Instrumentul de sortare a liniilor de text aranjează liniile textului în ordine alfabetică (sau inversă). Suportă sortarea corectă a caracterelor cu diacritice, sortarea insensibilă la majuscule/minuscule și sortarea numerică.",
    guide: [
      "1. Lipește liniile de text pe care dorești să le sortezi în câmpul de introducere.",
      "2. Selectează modul de sortare: ABC (A-Z), invers (Z-A) sau numeric.",
      "3. Apasă butonul «Sortare» – rezultatul apare imediat.",
      "4. Copiază liniile sortate în clipboard.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la sortarea alfabetică a liniilor de text – ideal pentru sortarea listelor, numelor, cuvintelor și rândurilor de date." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Sortează corect caracterele cu diacritice?", a: "Da, sortarea ține cont de ordinea alfabetului, astfel încât caracterele cu diacritice sunt plasate corect." },
      { q: "Pot sorta în ordine inversă?", a: "Da, poți alege între ordinea A-Z (crescătoare) și Z-A (descrescătoare), precum și sortarea numerică pentru liniile care încep cu numere." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "Face diferență între majuscule și minuscule?", a: "Este configurabil: poți alege sortare sensibilă sau insensibilă la majuscule/minuscule." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea liniilor", description: "Lipește liniile de text pe care dorești să le sortezi în câmpul de introducere." },
        { title: "2. Selectarea modului de sortare", description: "Alege sortarea ABC (A-Z), inversă (Z-A) sau numerică." },
        { title: "3. Pornirea sortării", description: "Apasă butonul «Sortare» pentru rezultatul instantaneu." },
        { title: "4. Copierea rezultatului", description: "Copiază textul sortat în clipboard." },
      ],
      useCases: [
        { icon: "📋", title: "Sortarea listelor de nume", description: "Sortarea alfabetică a listelor de elevi, listelor de invitați sau listelor de contacte." },
        { icon: "📦", title: "Sortarea importurilor în fișiere", description: "Organizarea instrucțiunilor de import din fișierele de cod în ordine alfabetică pentru o mai bună claritate." },
        { icon: "🗃️", title: "Sortarea rândurilor de date", description: "Sortarea liniilor din fișiere CSV, TSV sau fișiere text simple." },
        { icon: "📝", title: "Organizarea listelor", description: "Sortarea rapidă în ordine alfabetică a listelor de cumpărături, listelor de sarcini și altor enumerări." },
      ],
      aboutSection: {
        title: "Despre sortarea liniilor de text",
        paragraphs: [
          "Sortarea liniilor de text este una dintre cele mai frecvent utilizate operațiuni de procesare a textului. Ordinea alfabetică facilitează căutarea, vizualizarea și gestionarea organizată a datelor – fie că este vorba de liste de nume, glosare sau fișiere de cod.",
          "Este deosebit de important ca sortarea să gestioneze corect caracterele cu diacritice. Conform ordinii corecte a alfabetului, de exemplu, «ă» vine după «a», dar înainte de «b», iar «ș» și «ț» au pozițiile lor specifice.",
          "Sortarea numerică ordonează pe baza numerelor de la începutul liniilor, ceea ce este util pentru liste numerotate, numere de versiune sau date de măsurare.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește modul insensibil la majuscule/minuscule dacă elementele cu litere mari nu trebuie să fie plasate primele." },
        { icon: "🔢", tip: "Pentru liniile care încep cu numere, alege sortarea numerică – altfel «10» va fi plasat înainte de «2»." },
        { icon: "🔄", tip: "Sortarea inversă (Z-A) este utilă dacă dorești să începi verificarea de la sfârșitul listei." },
        { icon: "📋", tip: "Poți combina cu instrumentul de eliminare a duplicatelor: mai întâi sortează, apoi filtrează duplicatele." },
      ],
    },
  },

  // ═══ 3. ISMÉTLŐDŐ SOROK TÖRLÉSE ══════════════════════════════════════════
  "ismetlodok-torlese": {
    introText:
      "Instrumentul de eliminare a liniilor duplicate filtrează liniile repetate din textul tău și păstrează doar liniile unice. Suportă compararea insensibilă la majuscule/minuscule și păstrarea ordinii originale.",
    guide: [
      "1. Lipește textul din care dorești să elimini liniile duplicate.",
      "2. Alege dacă compararea să fie sensibilă sau insensibilă la majuscule/minuscule.",
      "3. Apasă butonul «Eliminare duplicate».",
      "4. În rezultat rămân doar liniile unice – copiază-le în clipboard.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la eliminarea liniilor repetate (duplicate) din text, astfel încât să rămână doar liniile unice." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Păstrează ordinea originală?", a: "Da, păstrează liniile unice în ordinea primei apariții și elimină repetițiile ulterioare." },
      { q: "Face diferență între majuscule și minuscule?", a: "Este configurabil: poți alege comparare sensibilă sau insensibilă la majuscule/minuscule. În al doilea caz, de exemplu, «Măr» și «măr» sunt considerate identice." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "Afișează câte duplicate a găsit?", a: "Da, instrumentul arată numărul de linii originale, numărul de duplicate găsite și numărul de linii unice." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea textului", description: "Lipește textul din care dorești să elimini liniile duplicate." },
        { title: "2. Configurarea opțiunilor", description: "Alege sensibilitatea la majuscule/minuscule și alte opțiuni." },
        { title: "3. Eliminarea duplicatelor", description: "Apasă butonul – instrumentul filtrează repetițiile." },
        { title: "4. Copierea rezultatului", description: "Copiază rezultatul care conține doar liniile unice." },
      ],
      useCases: [
        { icon: "📧", title: "Curățarea listelor de e-mail", description: "Eliminarea adreselor duplicate dintr-o listă de e-mailuri, astfel încât fiecare adresă să apară o singură dată." },
        { icon: "📊", title: "Curățarea datelor", description: "Filtrarea liniilor duplicate din fișiere CSV sau text înainte de analiză." },
        { icon: "📝", title: "Analiza fișierelor de log", description: "Filtrarea intrărilor de log repetate pentru a păstra doar mesajele de eroare unice." },
        { icon: "🔗", title: "Deduplicarea listelor de URL-uri", description: "Eliminarea duplicatelor din listele de URL-uri generate de crawlere web sau exporturi." },
      ],
      aboutSection: {
        title: "Despre eliminarea liniilor duplicate",
        paragraphs: [
          "Eliminarea liniilor duplicate (deduplicarea) este o operațiune fundamentală de procesare a textului, care filtrează liniile cu conținut identic și păstrează doar elementele unice. Este deosebit de utilă la curățarea listelor și pregătirea datelor.",
          "Instrumentul funcționează pe baza primei apariții: dacă o linie apare de mai multe ori, prima apariție este păstrată, iar repetițiile ulterioare sunt eliminate. Astfel, ordinea originală este menținută.",
          "Modul insensibil la majuscule/minuscule este deosebit de util atunci când datele de intrare conțin formatări inconsistente – de exemplu, când același nume apare atât cu literă mare, cât și cu literă mică.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Sortează liniile în ordine alfabetică înainte de deduplicare, dacă dorești să vezi repetițiile una lângă alta." },
        { icon: "🔍", tip: "Folosește modul insensibil la majuscule/minuscule dacă datele tale au formatare inconsistentă." },
        { icon: "📊", tip: "Verifică statisticile: instrumentul arată câte duplicate a găsit și a eliminat." },
        { icon: "⚠️", tip: "Atenție la spațiile de la sfârșitul liniilor – două linii altfel identice pot fi considerate diferite din cauza unui spațiu suplimentar." },
      ],
    },
  },

  // ═══ 4. ÜRES SOROK TÖRLÉSE ════════════════════════════════════════════════
  "ures-sorok-torlese": {
    introText:
      "Instrumentul de eliminare a liniilor goale șterge liniile goale inutile din textul tău. Poți configura să elimine toate liniile goale sau să reducă liniile goale consecutive la o singură linie goală, astfel încât textul să rămână curat și lizibil.",
    guide: [
      "1. Lipește textul din care dorești să elimini liniile goale.",
      "2. Selectează modul: eliminarea tuturor liniilor goale sau simplificarea liniilor goale duble.",
      "3. Apasă butonul «Eliminare».",
      "4. Copiază textul curățat în clipboard.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la eliminarea liniilor goale inutile din text, obținând astfel un format mai curat și compact." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Ce se consideră o linie goală?", a: "O linie goală este o linie care nu conține nimic, conține doar spații sau doar tabulaturi. Instrumentul recunoaște și elimină toate cele trei tipuri." },
      { q: "Pot păstra liniile goale care separă paragrafele?", a: "Da, poți alege modul care reduce liniile goale consecutive la o singură linie goală, păstrând structura paragrafelor." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "Câte linii goale a eliminat?", a: "Instrumentul afișează numărul de linii originale și cel al liniilor din rezultat, astfel încât poți vedea exact câte linii goale au fost șterse." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea textului", description: "Lipește textul din care dorești să elimini liniile goale." },
        { title: "2. Selectarea modului", description: "Alege dacă să elimine toate liniile goale sau doar să simplifice liniile goale duble consecutive." },
        { title: "3. Eliminarea liniilor goale", description: "Apasă butonul pentru eliminarea liniilor goale." },
        { title: "4. Copierea rezultatului", description: "Copiază textul curățat." },
      ],
      useCases: [
        { icon: "📄", title: "Curățarea textului", description: "Eliminarea liniilor goale inutile apărute după copierea și lipirea din documente." },
        { icon: "💻", title: "Formatarea codului", description: "Eliminarea liniilor goale inutile din codul sursă pentru un cod mai compact și mai clar." },
        { icon: "📋", title: "Comprimarea listelor", description: "Transformarea listelor presărate cu linii goale în liste compacte pentru o procesare mai simplă." },
        { icon: "📧", title: "Pregătirea e-mailurilor", description: "Eliminarea liniilor goale inutile din textele de e-mail pentru un aspect mai profesional." },
      ],
      aboutSection: {
        title: "Despre eliminarea liniilor goale",
        paragraphs: [
          "Liniile goale inutile apar frecvent la copierea textelor, la conversie sau la concatenarea din surse diferite. Acestea afectează lizibilitatea și măresc inutil lungimea textului.",
          "Instrumentul oferă două moduri: eliminarea tuturor liniilor goale (curățarea cea mai intensivă) și reducerea liniilor goale consecutive la o singură linie goală (cu păstrarea structurii paragrafelor).",
          "Eliminarea liniilor goale este adesea primul pas în procesul de curățare a textului, care poate fi urmat de alte operațiuni precum eliminarea duplicatelor sau curățarea spațiilor albe (whitespace).",
        ],
      },
      tips: [
        { icon: "💡", tip: "Dacă dorești să păstrezi separarea paragrafelor, folosește modul «simplificarea liniilor goale consecutive»." },
        { icon: "🔍", tip: "Liniile care conțin doar spații sunt considerate și ele goale – instrumentul le recunoaște." },
        { icon: "📋", tip: "Combină cu instrumentul de curățare whitespace pentru un text complet curat." },
        { icon: "⚡", tip: "Funcționează instantaneu chiar și pentru texte mari, deoarece procesarea are loc în browser." },
      ],
    },
  },

  // ═══ 5. WHITESPACE TISZTÍTÁS ══════════════════════════════════════════════
  "whitespace-tisztitas": {
    introText:
      "Instrumentul de curățare whitespace elimină spațiile, tabulaturile și alte caractere invizibile inutile din textul tău. Normalizează spațiile din interiorul liniilor, șterge spațiile de la sfârșitul liniilor și uniformizează caracterele whitespace.",
    guide: [
      "1. Lipește textul de curățat în câmpul de introducere.",
      "2. Selectează opțiunile de curățare dorite (spații la sfârșit de linie, spații duble, tabulaturi).",
      "3. Apasă butonul «Curățare».",
      "4. Copiază textul curățat în clipboard.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la eliminarea și normalizarea caracterelor whitespace inutile (spații, tabulaturi, caractere invizibile)." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Ce înseamnă whitespace?", a: "Whitespace este un termen generic pentru spații, tabulaturi, spații la sfârșit de linie, spații care nu permit întreruperea liniei (nbsp) și alte caractere Unicode invizibile." },
      { q: "Ce opțiuni de curățare oferă?", a: "Eliminarea spațiilor de la sfârșit de linie, reducerea spațiilor consecutive la un singur spațiu, înlocuirea tabulaturilor cu spații și normalizarea caracterelor Unicode whitespace speciale." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "Modifică conținutul textului?", a: "Nu, cuvintele și conținutul textului rămân intacte – doar caracterele whitespace inutile sunt eliminate sau normalizate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea textului", description: "Lipește textul de curățat în câmpul de introducere." },
        { title: "2. Selectarea opțiunilor", description: "Bifează opțiunile de curățare dorite: spații la sfârșit de linie, spații duble, tabulaturi etc." },
        { title: "3. Curățare", description: "Apasă butonul «Curățare» pentru normalizarea whitespace-ului." },
        { title: "4. Copierea rezultatului", description: "Copiază textul curățat." },
      ],
      useCases: [
        { icon: "💻", title: "Curățarea codului", description: "Eliminarea spațiilor de la sfârșit de linie (trailing whitespace) și a indentării inconsistente din codul sursă pentru îmbunătățirea calității codului." },
        { icon: "📄", title: "Pregătirea documentelor", description: "Curățarea textelor înainte de publicare – caracterele invizibile nu vor perturba formatarea." },
        { icon: "📊", title: "Curățarea datelor", description: "Eliminarea spațiilor inutile din fișierele de date, care pot cauza comparări sau procesări eronate." },
        { icon: "📋", title: "Conținut web", description: "Curățarea textelor copiate de pe pagini web de spațiile care nu permit întreruperea liniei și alte caractere ascunse." },
      ],
      aboutSection: {
        title: "Despre caracterele whitespace",
        paragraphs: [
          "Caracterele whitespace reprezintă totalitatea caracterelor invizibile de formatare a textului: spații, tabulaturi, spații de la sfârșit de linie și caractere Unicode whitespace speciale (de exemplu, spațiul care nu permite întreruperea liniei, em-spațiu, spațiu ideografic).",
          "Whitespace-ul inutil cauzează frecvent probleme: erori la compararea string-urilor, diferențe neașteptate de formatare, dimensiune crescută a fișierelor și modificări inutile în diff-urile git. Textul poate părea vizual identic, în timp ce caracterele ascunse provoacă diferențe.",
          "Normalizarea whitespace-ului este un pas important în procesul de curățare a datelor, iar majoritatea editoarelor de text și IDE-urilor oferă funcționalități similare pentru eliminarea automată a spațiilor de la sfârșit de linie.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Spațiile de la sfârșit de linie (trailing whitespace) sunt cel mai frecvent whitespace inutil – merită mereu eliminate." },
        { icon: "🔍", tip: "Spațiul care nu permite întreruperea liniei (nbsp) arată vizual identic cu un spațiu normal, dar este un caracter Unicode diferit – instrumentul îl recunoaște." },
        { icon: "⚙️", tip: "Pentru dezvoltatori: configurează-ți editorul să elimine automat trailing whitespace la salvare." },
        { icon: "📋", tip: "Textul copiat de pe pagini web conține frecvent whitespace Unicode ascuns – merită întotdeauna curățat." },
      ],
    },
  },

  // ═══ 6. ÉKEZETEK ELTÁVOLÍTÁSA ═════════════════════════════════════════════
  "ekezetek-eltavolitasa": {
    introText:
      "Instrumentul de eliminare a diacriticelor înlocuiește toate caracterele cu diacritice (ă, â, î, ș, ț etc.) cu echivalentele lor fără diacritice. Perfect pentru crearea URL-urilor, numelor de fișiere, numelor de utilizator și textelor compatibile ASCII.",
    guide: [
      "1. Lipește textul cu diacritice în câmpul de introducere.",
      "2. Instrumentul recunoaște și elimină automat toate diacriticele.",
      "3. Verifică rezultatul – conținutul textului rămâne neschimbat, doar diacriticele dispar.",
      "4. Copiază textul fără diacritice în clipboard.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la eliminarea caracterelor cu diacritice: ă→a, â→a, î→i, ș→s, ț→t și alte transformări similare." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Gestionează toate caracterele cu diacritice?", a: "Da, toate literele cu diacritice, inclusiv ă, â, î, ș, ț (și echivalentele lor cu majusculă) sunt transformate corect." },
      { q: "Elimină diacriticele și din alte limbi?", a: "Da, datorită normalizării Unicode, gestionează și caracterele cu diacritice din alte limbi (de exemplu, ñ→n, č→c, ö→o)." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "Operațiunea este reversibilă?", a: "Nu, eliminarea diacriticelor este unidirecțională: textul original cu diacritice nu poate fi restaurat automat, de aceea este recomandat să păstrezi și originalul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea textului cu diacritice", description: "Lipește textul cu diacritice în câmpul de introducere." },
        { title: "2. Conversie automată", description: "Instrumentul elimină în timp real toate diacriticele din text." },
        { title: "3. Verificarea rezultatului", description: "Verifică dacă transformarea corespunde așteptărilor tale." },
        { title: "4. Copiere", description: "Copiază textul fără diacritice în clipboard." },
      ],
      useCases: [
        { icon: "🌐", title: "Crearea URL-urilor și slug-urilor", description: "Generarea de URL-uri și slug-uri fără diacritice din texte în limba română pentru site-uri web și bloguri." },
        { icon: "📁", title: "Nume de fișiere", description: "Transformă numele de fișiere cu diacritice în nume compatibile ASCII, evitând problemele de codificare." },
        { icon: "👤", title: "Nume de utilizator", description: "Crearea numelor de utilizator fără diacritice din nume românești pentru sistemele de înregistrare." },
        { icon: "🔎", title: "Căutare și indexare", description: "Crearea versiunii fără diacritice a textelor pentru indexuri de căutare, astfel încât atât căutarea cu diacritice, cât și cea fără să funcționeze." },
      ],
      aboutSection: {
        title: "Diacriticele și Unicode",
        paragraphs: [
          "Limba română folosește mai multe caractere cu diacritice: ă, â, î, ș, ț. Acestea pot fi reprezentate în setul de caractere Unicode ca puncte de cod independente sau sub forma literei de bază + semnul diacritic combinat.",
          "Eliminarea diacriticelor (diacritics stripping) se bazează pe normalizarea Unicode: textul este descompus în forma NFD (Normalization Form Decomposition), apoi semnele diacritice combinate sunt eliminate, rămânând doar caracterele ASCII de bază.",
          "Această operațiune este deosebit de importantă în informatică, unde multe sisteme (sisteme de fișiere, URL-uri, adrese de e-mail, unele baze de date) nu suportă sau suportă limitat caracterele cu diacritice.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Eliminarea diacriticelor nu este reversibilă – păstrează întotdeauna și textul original cu diacritice." },
        { icon: "🔗", tip: "La crearea URL-urilor și slug-urilor, eliminarea diacriticelor este primul pas – apoi înlocuiește spațiile cu cratime." },
        { icon: "🌍", tip: "Instrumentul elimină diacriticele nu doar din română, ci și din alte limbi (de exemplu, franceză, cehă, maghiară)." },
        { icon: "⚠️", tip: "Atenție: după transformarea ă→a și â→a, textul nu mai este întotdeauna neambiguu – trebuie interpretat din context." },
      ],
    },
  },

  // ═══ 7. SPECIÁLIS KARAKTEREK TÖRLÉSE ══════════════════════════════════════
  "specialis-karakterek-torlese": {
    introText:
      "Instrumentul de eliminare a caracterelor speciale șterge caracterele speciale nedorite din text, păstrând literele, cifrele și semnele de punctuație selectate. Ideal pentru curățarea datelor, pregătirea numelor de fișiere și procesarea textului.",
    guide: [
      "1. Lipește textul din care dorești să elimini caracterele speciale.",
      "2. Selectează ce tipuri de caractere să fie păstrate (litere, cifre, spații, semne de punctuație).",
      "3. Apasă butonul «Eliminare».",
      "4. Copiază textul curățat în clipboard.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la eliminarea caracterelor speciale (simboluri, caractere de control, semne de punctuație nedorite), păstrând literele și cifrele." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Ce caractere elimină?", a: "Orice caracter care nu face parte din categoriile de păstrat: de exemplu @, #, $, %, &, * etc. Tu alegi categoriile de păstrat." },
      { q: "Păstrează caracterele cu diacritice?", a: "Da, categoria de litere include și caracterele cu diacritice (ă, â, î, ș, ț). Diacriticele pot fi eliminate separat doar cu instrumentul de eliminare a diacriticelor." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "Pot să-l folosesc pentru curățarea numelor de fișiere?", a: "Da, pentru curățarea numelor de fișiere selectează păstrarea literelor, cifrelor, cratimei și punctului – aceasta asigură un nume compatibil cu sistemul de fișiere." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea textului", description: "Lipește textul din care dorești să elimini caracterele speciale." },
        { title: "2. Selectarea caracterelor de păstrat", description: "Bifează tipurile pe care dorești să le păstrezi: litere, cifre, spații, semne de punctuație." },
        { title: "3. Eliminarea caracterelor speciale", description: "Apasă butonul pentru eliminarea caracterelor nedorite." },
        { title: "4. Copierea rezultatului", description: "Copiază textul curățat." },
      ],
      useCases: [
        { icon: "📁", title: "Curățarea numelor de fișiere", description: "Eliminarea caracterelor nesuportate de sistemul de fișiere din numele fișierelor pentru salvare sigură." },
        { icon: "📊", title: "Pregătirea importului de date", description: "Curățarea datelor din surse externe înainte de importul în baza de date." },
        { icon: "🔍", title: "Curățarea textului de căutare", description: "Curățarea expresiilor de căutare ale utilizatorilor de caracterele speciale pentru rezultate de căutare mai bune." },
        { icon: "📱", title: "SMS și notificări push", description: "Pregătirea textelor pentru trimiterea prin SMS, unde anumite caractere speciale nu sunt suportate." },
      ],
      aboutSection: {
        title: "Despre gestionarea caracterelor speciale",
        paragraphs: [
          "Caracterele speciale este un termen generic pentru toate caracterele care nu sunt litere și nu sunt cifre. Aici intră semnele de punctuație, simbolurile, caracterele de control și diferitele caractere Unicode speciale.",
          "În procesarea textului, filtrarea caracterelor speciale este adesea necesară: la numele fișierelor din cauza limitărilor sistemului de fișiere, la baze de date pentru prevenirea SQL injection, la URL-uri din cauza cerințelor de codificare, iar la SMS-uri din cauza limitărilor setului de caractere.",
          "Instrumentul este configurabil flexibil: tu decizi ce tipuri de caractere să păstrezi și pe care să le elimini, obținând astfel un rezultat exact conform nevoilor tale.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru nume de fișiere, păstrează literele, cifrele, cratima, underscore-ul și punctul." },
        { icon: "🔍", tip: "Verifică rezultatul – în anumite contexte ai nevoie de unele semne de punctuație (de exemplu, @ pentru adresele de e-mail)." },
        { icon: "⚠️", tip: "Eliminarea nu poate fi anulată – dacă nu ești sigur ce caracter trebuie păstrat, testează mai întâi pe o mostră mică." },
        { icon: "🔗", tip: "Combină cu instrumentul de eliminare a diacriticelor și cu cel de curățare whitespace pentru un proces complet de curățare a textului." },
      ],
    },
  },

  // ═══ 8. KARAKTER CSERE ════════════════════════════════════════════════════
  "karaktercsere": {
    introText:
      "Instrumentul de înlocuire caractere (find/replace) efectuează căutare și înlocuire simplă de text. Introdu textul de căutat și textul de înlocuire, iar instrumentul înlocuiește instantaneu toate aparițiile. Soluție rapidă și simplă pentru înlocuirea de bază a textului.",
    guide: [
      "1. Lipește textul în câmpul de introducere.",
      "2. Introdu textul de căutat în câmpul «Căutare».",
      "3. Introdu textul de înlocuire în câmpul «Înlocuire» (lăsat gol efectuează ștergerea).",
      "4. Apasă butonul «Înlocuire» – toate aparițiile sunt înlocuite instantaneu.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la căutare și înlocuire simplă de text (find and replace): înlocuiește toate aparițiile cu textul specificat." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Face diferență între majuscule și minuscule?", a: "Implicit nu face diferență (case-insensitive). Dacă ai nevoie de potrivire exactă, folosește instrumentul «Căutare și înlocuire (case-sensitive)»." },
      { q: "Pot înlocui cu text gol (ștergere)?", a: "Da, dacă lași câmpul de înlocuire gol, toate aparițiile textului căutat sunt șterse din text." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "Câte înlocuiri efectuează?", a: "Înlocuiește toate aparițiile din text și afișează numărul de înlocuiri." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea textului", description: "Lipește textul în care dorești să efectuezi înlocuirea." },
        { title: "2. Specificarea textului de căutat", description: "Introdu textul căutat în câmpul «Căutare»." },
        { title: "3. Specificarea textului de înlocuire", description: "Introdu textul de înlocuire sau lasă-l gol pentru ștergere." },
        { title: "4. Efectuarea înlocuirii", description: "Apasă butonul «Înlocuire» – toate potrivirile sunt înlocuite." },
      ],
      useCases: [
        { icon: "📝", title: "Editarea textului", description: "Înlocuirea rapidă a fragmentelor de text repetitive în documente, de exemplu schimbarea numelui companiei, a datei sau a unei expresii." },
        { icon: "💻", title: "Modificarea codului", description: "Înlocuirea numelor de variabile sau funcții în codul sursă folosind căutare și înlocuire simplă." },
        { icon: "📊", title: "Transformarea datelor", description: "Înlocuirea separatorilor în datele CSV, de exemplu punct și virgulă cu virgulă sau tabulatură cu spațiu." },
        { icon: "🔄", title: "Conversia formatului", description: "Transformarea rapidă a formatului textului, de exemplu schimbarea formatului de dată sau uniformizarea unităților de măsură." },
      ],
      aboutSection: {
        title: "Despre operațiunea de căutare și înlocuire",
        paragraphs: [
          "Căutarea și înlocuirea (find and replace) este una dintre cele mai fundamentale și frecvent utilizate operațiuni de editare a textului. Instrumentul găsește toate aparițiile expresiei de căutare în text și le înlocuiește cu textul specificat.",
          "Înlocuirea simplă de caractere nu folosește expresii regulate – caută exact textul pe care l-ai introdus. Aceasta este mai sigură și mai simplă decât regex, deoarece nu trebuie să te preocupi de escaparea caracterelor speciale.",
          "Dacă specifici un text de înlocuire gol, instrumentul funcționează ca ștergere: elimină toate aparițiile textului căutat. Aceasta este utilă pentru eliminarea rapidă a cuvintelor, caracterelor sau fragmentelor de text inutile.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Dacă textul căutat conține caractere speciale (de exemplu punct, paranteză), aici nu este necesară escaparea." },
        { icon: "🔍", tip: "Verifică numărul de înlocuiri în rezultat pentru a te asigura de funcționarea corectă." },
        { icon: "⚠️", tip: "Atenție la potrivirile parțiale: de exemplu, căutarea «sau» va găsi o potrivire și în cuvântul «sauteză»." },
        { icon: "🔄", tip: "Dacă ai nevoie de înlocuire sensibilă la majuscule/minuscule, folosește instrumentul «Căutare și înlocuire (case-sensitive)»." },
      ],
    },
  },

  // ═══ 9. KERESÉS ÉS CSERE (CASE-SENSITIVE) ════════════════════════════════
  "kereses-csere": {
    introText:
      "Instrumentul de căutare și înlocuire (case-sensitive) efectuează înlocuiri precise, sensibile la majuscule și minuscule. Înlocuiește doar atunci când textul căutat se potrivește literă cu literă, inclusiv majusculele și minusculele. Ideal pentru editare precisă.",
    guide: [
      "1. Lipește textul în câmpul de introducere.",
      "2. Introdu textul de căutat exact așa cum apare în text (majusculele și minusculele contează).",
      "3. Introdu textul de înlocuire în câmpul «Înlocuire».",
      "4. Apasă butonul «Înlocuire» – doar potrivirile exacte sunt înlocuite.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la căutare și înlocuire sensibilă la majuscule/minuscule (case-sensitive), unde literele textului căutat trebuie să se potrivească exact." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Care este diferența față de înlocuirea simplă de caractere?", a: "Înlocuirea simplă de caractere nu este sensibilă la majuscule/minuscule (de exemplu, «Măr» = «măr»), în timp ce acest instrument înlocuiește doar potrivirile exacte." },
      { q: "Pot folosi expresii regulate?", a: "Nu, acest instrument efectuează căutare simplă de text. Pentru căutare regex, folosește instrumentul «Căutare și înlocuire regex»." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "Pot doar să șterg, fără înlocuire?", a: "Da, dacă lași câmpul de înlocuire gol, toate potrivirile exacte ale textului căutat sunt șterse." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea textului", description: "Lipește textul în care dorești să efectuezi înlocuirea exactă." },
        { title: "2. Specificarea expresiei de căutare", description: "Introdu textul căutat exact, cu majuscule și minuscule." },
        { title: "3. Specificarea textului de înlocuire", description: "Specifică textul de înlocuire sau lasă-l gol pentru ștergerea textului căutat." },
        { title: "4. Efectuarea înlocuirii exacte", description: "Apasă butonul «Înlocuire» – doar potrivirile literă cu literă sunt înlocuite." },
      ],
      useCases: [
        { icon: "💻", title: "Înlocuirea numelor de variabile în cod", description: "Înlocuirea precisă a numelor de variabile camelCase în codul sursă, unde diferența între majuscule/minuscule este critică." },
        { icon: "📝", title: "Înlocuirea numelor proprii", description: "Înlocuirea selectivă a numelor proprii cu majusculă inițială, lăsând neatinse aparițiile cu litere mici." },
        { icon: "🏷️", title: "Înlocuirea tag-urilor HTML/XML", description: "Înlocuirea precisă a numelor de tag-uri, unde diferența între majuscule/minuscule are semnificație." },
        { icon: "📋", title: "Înlocuirea numelor de constante", description: "Înlocuirea precisă a constantelor cu MAJUSCULE fără a afecta aparițiile cu litere mici." },
      ],
      aboutSection: {
        title: "Despre căutarea sensibilă la majuscule/minuscule",
        paragraphs: [
          "Căutarea și înlocuirea case-sensitive (sensibilă la majuscule/minuscule) înseamnă că fiecare literă a textului căutat trebuie să se potrivească exact – inclusiv majusculele și minusculele. Astfel, căutarea «Măr» nu găsește o potrivire pentru «măr» sau «MĂR».",
          "Acest mod este deosebit de important în codul de programare, unde diferența între majuscule și minuscule contează: «myVariable» și «myvariable» sunt două variabile complet diferite. La fel, este important și pentru numele proprii și constante.",
          "Dacă nu este necesară diferențierea între majuscule și minuscule, folosește mai bine instrumentul simplu de înlocuire a caracterelor, care găsește și înlocuiește ambele forme.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește acest instrument dacă lucrezi cu cod și diferențierea majusculelor/minusculelor în numele variabilelor este importantă." },
        { icon: "🔍", tip: "Verifică numărul de înlocuiri – dacă este mai mic decât te așteptai, diferența de majuscule/minuscule poate fi cauza." },
        { icon: "⚠️", tip: "La caracterele cu diacritice contează și majusculele/minusculele: «Ă» nu se potrivește cu «ă»." },
        { icon: "🔄", tip: "Dacă dorești să înlocuiești același text în mai multe forme de scriere, efectuează înlocuirea de mai multe ori, cu căutări diferite." },
      ],
    },
  },

  // ═══ 10. REGEX KERESÉS ÉS CSERE ══════════════════════════════════════════
  "regex-kereses-csere": {
    introText:
      "Instrumentul de căutare și înlocuire regex folosește expresii regulate pentru potrivirea și înlocuirea modelelor de text. Este capabil să caute și să transforme modele complexe de text care nu pot fi rezolvate cu căutare simplă de text.",
    guide: [
      "1. Lipește textul în câmpul de introducere.",
      "2. Introdu expresia regulată în câmpul «Căutare» (de exemplu, \\d+ pentru căutarea numerelor).",
      "3. Introdu modelul de înlocuire (de exemplu, $1 pentru inserarea primului grup).",
      "4. Apasă butonul «Înlocuire» – toate potrivirile regex sunt înlocuite.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la căutare și înlocuire cu expresii regulate (regex) – pentru căutarea și transformarea modelelor complexe de text care nu pot fi rezolvate cu find/replace simplu." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Ce sintaxă regex folosește?", a: "Folosește sintaxa expresiilor regulate JavaScript (ECMAScript regex). Suportă grupuri, clase de caractere, cuantificatori și expresii lookahead/lookbehind." },
      { q: "Cum fac referire la grupuri în textul de înlocuire?", a: "Cu notațiile $1, $2, $3 etc. poți face referire la grupurile din paranteze ale modelului de căutare. $& desemnează întreaga potrivire." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "Ce se întâmplă dacă regex-ul este invalid?", a: "Instrumentul semnalează în timp real erorile de sintaxă regex și ajută la corectare cu un mesaj de eroare." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea textului", description: "Lipește textul în care dorești să efectuezi căutare și înlocuire regex." },
        { title: "2. Specificarea modelului regex", description: "Introdu expresia regulată în câmpul de căutare și selectează flag-urile (g, i, m)." },
        { title: "3. Specificarea modelului de înlocuire", description: "Specifică textul de înlocuire – poți folosi referințe de grup $1, $2." },
        { title: "4. Efectuarea înlocuirii", description: "Apasă butonul «Înlocuire» – toate potrivirile regex sunt înlocuite." },
      ],
      useCases: [
        { icon: "📊", title: "Transformarea formatului datelor", description: "Transformarea formatului datelor calendaristice, numerelor de telefon, codurilor poștale folosind grupuri regex." },
        { icon: "💻", title: "Refactorizarea codului", description: "Transformarea în masă a apelurilor de funcții, importurilor sau structurilor din codul sursă prin potrivire de modele." },
        { icon: "📝", title: "Normalizarea textului", description: "Extragerea și transformarea adreselor de e-mail, URL-urilor sau altor texte cu model din texte mari." },
        { icon: "🔄", title: "Transformare în masă", description: "Transformarea rapidă a modelelor de text repetitive, de exemplu modificarea tag-urilor HTML sau rearanjarea coloanelor CSV." },
      ],
      aboutSection: {
        title: "Despre expresiile regulate",
        paragraphs: [
          "Expresiile regulate (regex) sunt un limbaj formal pentru descrierea modelelor de text. Cu ajutorul lor poți specifica modele complexe de căutare care potrivesc nu doar text exact, ci și categorii de caractere, repetiții și poziții.",
          "Regex-ul JavaScript este cea mai răspândită implementare pe web. Suportă clase de caractere (\\d, \\w, \\s), cuantificatori (*, +, ?), grupuri (()), alternative (|) și expresii lookahead/lookbehind.",
          "Notațiile $1, $2 utilizabile în textul de înlocuire fac referire la grupurile din paranteze ale modelului de căutare. Aceasta permite rearanjarea, extragerea și reformatarea părților de text.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Începe cu un model simplu și extinde-l treptat – astfel este mai ușor să găsești eroarea dacă nu obții rezultatul așteptat." },
        { icon: "🔍", tip: "Folosește abrevierile \\d (cifră), \\w (caracter de cuvânt) și \\s (whitespace) pentru un regex mai concis." },
        { icon: "⚠️", tip: "Caracterele speciale regex (. * + ? ( ) [ ] { } | \\ ^) trebuie escapate cu backslash dacă le cauți literal." },
        { icon: "📋", tip: "Testează regex-ul pe o mostră mică înainte de a-l rula pe un text mare – un regex greșit poate produce un rezultat neașteptat." },
      ],
    },
  },

  // ═══ 11. KISBETŰ/NAGYBETŰ KONVERTÁLÁS ════════════════════════════════════
  "kisbetu-nagybetu": {
    introText:
      "Instrumentul de conversie majuscule/minuscule transformă textul cu un singur clic în litere mici, LITERE MARI, Prima Literă Majusculă sau Format De Titlu. Suportă caracterele cu diacritice românești și afișează instantaneu rezultatul.",
    guide: [
      "1. Lipește textul de transformat în câmpul de introducere.",
      "2. Selectează modul de conversie dorit: litere mici, LITERE MARI, Propoziție sau Titlu.",
      "3. Transformarea are loc instantaneu.",
      "4. Copiază rezultatul în clipboard.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la transformarea majusculelor și minusculelor textului: convertește între formatele litere mici (lowercase), LITERE MARI (uppercase), Început de propoziție și Titlu (title case)." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Gestionează corect literele cu diacritice?", a: "Da, conversiile ă↔Ă, â↔Â, î↔Î, ș↔Ș, ț↔Ț sunt toate corecte." },
      { q: "Ce înseamnă «Format de titlu» (title case)?", a: "Transformă prima literă a fiecărui cuvânt în majusculă, restul rămânând minuscule: «acesta este un titlu» → «Acesta Este Un Titlu»." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "Conversia afectează cifrele și semnele de punctuație?", a: "Nu, cifrele și semnele de punctuație rămân neschimbate – doar caracterele literale sunt transformate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea textului", description: "Lipește textul de transformat în câmpul de introducere." },
        { title: "2. Selectarea modului", description: "Alege conversia dorită: litere mici, LITERE MARI, Propoziție sau Titlu." },
        { title: "3. Conversie automată", description: "Transformarea are loc instantaneu, rezultatul apare în timp real." },
        { title: "4. Copierea rezultatului", description: "Copiază textul transformat în clipboard." },
      ],
      useCases: [
        { icon: "📧", title: "Normalizarea adreselor de e-mail", description: "Convertirea adreselor de e-mail la litere mici pentru format uniform – adresele de e-mail nu sunt sensibile la majuscule/minuscule." },
        { icon: "🏷️", title: "Formatarea titlurilor", description: "Transformarea titlurilor articolelor de blog, articolelor și prezentărilor într-un Format De Titlu uniform." },
        { icon: "💻", title: "Crearea constantelor", description: "Generarea textului cu LITERE MARI pentru nume de variabile sau constante în codul sursă." },
        { icon: "📋", title: "Uniformizarea datelor", description: "Aducerea datelor text din surse diferite la un format uniform de majuscule/minuscule." },
      ],
      aboutSection: {
        title: "Despre conversia majuscule/minuscule",
        paragraphs: [
          "Conversia majuscule/minuscule (case conversion) reprezintă transformarea literelor textului conform unor reguli specifice. Cele patru moduri cele mai frecvente sunt: litere mici (lowercase), LITERE MARI (uppercase), Început de propoziție cu majusculă (sentence case) și Format De Titlu (title case).",
          "Limba română prezintă provocări speciale pentru conversie: gestionarea corectă a caracterelor cu diacritice (ă, â, î, ș, ț) și a perechilor lor cu majusculă (Ă, Â, Î, Ș, Ț) este critică pentru o transformare precisă.",
          "În procesarea datelor, convertirea la litere mici (lowercase) este cel mai răspândit pas de normalizare: înainte de comparări, căutări și sortări, textul este adesea convertit la litere mici pentru o gestionare uniformă.",
        ],
      },
      tips: [
        { icon: "💡", tip: "La compararea adreselor de e-mail, convertește mereu la litere mici – standardul de e-mail nu face diferență între majuscule și minuscule." },
        { icon: "📝", tip: "Formatul de titlu (title case) este perfect pentru titlurile blogurilor, dar ai grijă să nu transformi inutil în majuscule articolele și conjuncțiile." },
        { icon: "🔄", tip: "Conversia este reversibilă, dar modelul original de majuscule/minuscule nu poate fi restaurat – «iPhone» convertit la litere mici devine «iphone», cu litere mari «IPHONE»." },
        { icon: "⚡", tip: "Funcționează instantaneu cu orice lungime de text, deoarece procesarea are loc în browser." },
      ],
    },
  },

  // ═══ 12. CASE KONVERTER ═══════════════════════════════════════════════════
  "case-konverter": {
    introText:
      "Case converterul transformă textul între diferite formate de convenții de denumire din programare: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE și dot.case. Un instrument indispensabil pentru dezvoltatori pentru conversia numelor de variabile și funcții.",
    guide: [
      "1. Introdu sau lipește textul (cuvinte, expresii sau denumiri existente).",
      "2. Selectează formatul dorit: camelCase, PascalCase, snake_case, kebab-case etc.",
      "3. Transformarea are loc instantaneu, rezultatul apare în timp real.",
      "4. Copiază textul convertit în clipboard.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la transformarea textului în diferite convenții de denumire din programare: între formatele camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE și dot.case." },
      { q: "Datele mele sunt în siguranță?", a: "Da. Toată procesarea are loc în browserul tău, nicio informație nu este trimisă către un server." },
      { q: "Ce formate suportă?", a: "camelCase (JavaScript), PascalCase (clase TypeScript), snake_case (Python), kebab-case (CSS/URL), CONSTANT_CASE (constante) și dot.case." },
      { q: "Recunoaște formatul existent?", a: "Da, instrumentul recunoaște automat formatul intrării (camelCase, snake_case etc.) și convertește de acolo în formatul dorit." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsive și funcționează în orice browser modern." },
      { q: "Gestionează caracterele cu diacritice?", a: "Da, dar în convențiile de denumire din programare sunt recomandate în general caracterele ASCII fără diacritice – dacă este necesar, combină cu instrumentul de eliminare a diacriticelor." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introducerea textului", description: "Introdu textul de convertit – poate fi separat prin spații, cratime, underscore-uri sau separare camelCase." },
        { title: "2. Selectarea formatului", description: "Alege formatul țintă: camelCase, PascalCase, snake_case, kebab-case etc." },
        { title: "3. Conversie automată", description: "Rezultatul apare în timp real în formatul selectat." },
        { title: "4. Copiere", description: "Copiază textul convertit în clipboard cu un singur clic." },
      ],
      useCases: [
        { icon: "💻", title: "Conversia numelor de variabile", description: "Poți converti variabilele camelCase JavaScript în snake_case Python, sau invers, la schimbarea limbajului." },
        { icon: "🏗️", title: "Nume de clase și tipuri", description: "Poți genera nume de clase PascalCase din descrieri textuale pentru proiecte TypeScript, C# sau Java." },
        { icon: "🌐", title: "Nume CSS și URL", description: "Poți converti numele claselor CSS și slug-urile URL în format kebab-case." },
        { icon: "🔧", title: "Chei de configurare", description: "Transformarea variabilelor de mediu și constantelor în format CONSTANT_CASE pentru respectarea convențiilor." },
      ],
      aboutSection: {
        title: "Despre convențiile de denumire în programare",
        paragraphs: [
          "Convențiile de denumire (naming conventions) reglementează modul în care denumim variabilele, funcțiile, clasele și alte elemente de program. Cele mai răspândite convenții sunt: camelCase (JavaScript, Java), PascalCase (C#, clase TypeScript), snake_case (Python, Ruby) și kebab-case (CSS, slug-uri URL).",
          "Convențiile nu sunt doar o chestiune estetică: utilizarea lor consecventă îmbunătățește lizibilitatea codului, ajută la lucrul în echipă, iar unele limbaje (de exemplu, Python PEP 8) prescriu explicit formatul de utilizat.",
          "Case converterul recunoaște formatul curent al intrării (cuvinte separate prin spații, cratime, underscore-uri sau litere mari), le descompune în cuvinte, apoi construiește rezultatul conform convenției selectate.",
        ],
      },
      tips: [
        { icon: "💡", tip: "În JavaScript, camelCase este convenția pentru variabile, PascalCase pentru clase și CONSTANT_CASE pentru constante." },
        { icon: "🐍", tip: "În Python, snake_case este convenția pentru variabile și funcții, PascalCase pentru clase, iar SCREAMING_SNAKE_CASE pentru constante." },
        { icon: "🌐", tip: "Pentru clasele CSS și URL-uri, kebab-case este cel mai potrivit format." },
        { icon: "📋", tip: "Dacă trebuie să convertești mai multe elemente, specifică-le linie cu linie pentru procesare în lot." },
      ],
    },
  },
};
