import type { ContentMap } from "../types.ts";

export const FEJLESZTO_RO_CONTENT: ContentMap = {
  // ═══ NUMĂRĂTOR DE CUVINTE ȘI CARACTERE (HU+RO bilingual) ═══════════════════
  "szoszamlalo": {
    introText:
      "Numărătorul de cuvinte și caractere îți arată în timp real din câte cuvinte, caractere, propoziții și paragrafe este format textul tău, pe măsură ce scrii sau lipești. Calculează și timpul estimat de citire și de vorbire și îți arată cum se încadrează conținutul în limitele uzuale (titlu SEO, meta description, X/Twitter). Util deopotrivă pentru elevi, copywriteri, specialiști SEO și administratori de social media – fără instalare și fără cont.",
    guide: [
      "1. Lipește sau scrie textul în câmpul de introducere – numărătoarea se actualizează instantaneu, în timp ce tastezi.",
      "2. Citește indicatorii principali: cuvinte, caractere (cu și fără spații), propoziții, paragrafe, rânduri.",
      "3. Verifică panoul de limite: barele arată dacă textul se încadrează în 60 / 160 / 280 de caractere.",
      "4. Copiază statistica cu un clic sau golește câmpul și începe un text nou.",
    ],
    faq: [
      { q: "Care e diferența între numărul de caractere cu și fără spații?", a: "Valoarea cu spații include toate caracterele, inclusiv spațiile, taburile și rândurile noi – aceasta este folosită la limitele de pe Twitter/X și SMS. Valoarea fără spații numără doar caracterele vizibile, utilă în anumite sarcini tipografice și de tipar." },
      { q: "Cum se calculează timpul de citire?", a: "Timpul de citire se bazează pe numărul de cuvinte, la o viteză medie de 200 de cuvinte pe minut – ritmul cititorului adult obișnuit. Timpul de vorbire folosește 130 de cuvinte pe minut, ritmul confortabil și clar al unui prezentator (prezentare, scenariu video)." },
      { q: "Numără corect caracterele cu diacritice românești?", a: "Da. Literele cu diacritice (ă, â, î, ș, ț) contează ca un singur caracter, la fel ca un emoji. Numărătorul le tratează corect la nivel de Unicode, astfel că rezultatul coincide cu ce afișează Word sau platformele de social media." },
      { q: "Care este lungimea ideală pentru titlu SEO și meta description?", a: "Google afișează de obicei circa 60 de caractere din titlu și circa 155–160 din meta description; peste această limită, textul este trunchiat în rezultate. Panoul îți marchează aceste praguri, ca să nu fii nevoit să numeri separat." },
      { q: "Textul meu ajunge pe vreun server?", a: "Nu. Întreaga procesare rulează în browserul tău, cu JavaScript – textul introdus nu părăsește niciodată dispozitivul. La reîncărcarea paginii nu rămâne nimic, deci îl poți folosi în siguranță și pentru conținut confidențial sau nepublicat." },
      { q: "La ce folosește lista celor mai frecvente cuvinte?", a: "Îți arată ce cuvinte se repetă cel mai des în text (excluzând cuvintele de legătură și articolele). Este util pentru verificarea densității cuvintelor-cheie la textele SEO și pentru depistarea repetițiilor inutile la scris." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea textului", description: "Lipește din clipboard sau scrie direct textul în câmp. Numărătoarea urmărește tastarea în timp real." },
        { title: "2. Citirea indicatorilor", description: "Cardurile evidențiate arată numărul de cuvinte și caractere, iar dedesubt propozițiile, paragrafele și rândurile." },
        { title: "3. Verificarea limitelor", description: "Barele din panoul de limite arată dacă textul se încadrează în titlu SEO (60), meta description (160) și X (280)." },
        { title: "4. Copierea statisticii", description: "Cu un clic copiezi în clipboard toți indicatorii, sau golești câmpul pentru un text nou." },
      ],
      useCases: [
        { icon: "🔍", title: "Texte meta SEO", description: "La scrierea titlului și a meta description vezi imediat dacă textul se încadrează în limita afișată de Google." },
        { icon: "📱", title: "Social media", description: "Urmărirea în timp real a limitei de 280 de caractere la o postare X/Twitter, bio sau text de reclamă." },
        { icon: "🎓", title: "Eseuri și lucrări", description: "Pentru elevi și studenți, când tema cere un număr exact de cuvinte sau caractere (de ex. minim 500 de cuvinte)." },
        { icon: "🎙️", title: "Discurs și scenariu video", description: "Timpul estimat de vorbire ajută la încadrarea unei prezentări sau a unui clip în intervalul de timp dat." },
      ],
      formatComparison: {
        title: "Limite uzuale de caractere și cuvinte",
        columns: ["Loc / câmp", "Limită", "Observație"],
        rows: [
          { feature: "Titlu SEO (Google)", values: ["~60 caractere", "Peste, se trunchiază în rezultate"] },
          { feature: "Meta description", values: ["~155–160 caractere", "Lungimea ideală a descrierii"] },
          { feature: "Postare X / Twitter", values: ["280 caractere", "Linkurile contează scurtate"] },
          { feature: "SMS (1 mesaj)", values: ["160 caractere", "Peste, se împarte în mai multe SMS-uri"] },
          { feature: "Caption Instagram", values: ["~2200 caractere", "Dar primele ~125 se văd fără „mai mult”"] },
        ],
      },
      aboutSection: {
        title: "De ce contează numărul de cuvinte și caractere?",
        paragraphs: [
          "Numărul exact de cuvinte și caractere nu este, în multe sarcini, o chestiune estetică, ci o cerință concretă. În optimizarea pentru motoarele de căutare, lungimea titlului și a meta description decide dacă întregul mesaj apare în lista de rezultate sau trunchiat. Pe platformele de social media și în SMS există limite stricte de caractere, iar temele școlare și universitare impun adesea un număr minim sau maxim de cuvinte.",
          "Numărarea cuvintelor are o bază simplă: textul este împărțit în grupuri de caractere care nu conțin spații, iar numărul acestora este returnat – exact aceeași logică pe care o folosesc Word, Google Docs și majoritatea editoarelor de text. La caractere trebuie deosebită valoarea cu spații de cea fără spații: majoritatea limitelor online (Twitter, SMS) includ și spațiile.",
          "Estimarea timpului de citire și de vorbire pornește de la numărul de cuvinte. Viteza medie de citire în gând este de circa 200–250 de cuvinte pe minut; ritmul confortabil și ușor de urmărit al unui vorbitor este mai lent, în jur de 130 de cuvinte pe minut. Aceste estimări ajută la încadrarea timpului de citire al unui articol sau a duratei unei prezentări, înainte de a scrie textul complet.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ține titlul SEO sub 60 de caractere, iar meta description între 155 și 160 – astfel întregul text apare în rezultatul Google." },
        { icon: "⌨️", tip: "Numărătorul se actualizează live în timp ce tastezi, deci nu trebuie să apeși niciun buton pentru rezultat." },
        { icon: "🔒", tip: "Textul rămâne în browserul tău – poți lipi liniștit și conținut confidențial sau încă nepublicat." },
        { icon: "📊", tip: "Cu lista celor mai frecvente cuvinte depistezi rapid repetițiile inutile dintr-un text." },
      ],
    },
  },

  // ═══ CONVERTOR BAZE NUMERICE (HU+RO bilingual) ════════════════════════════
  "szamrendszer-valto": {
    introText:
      "Convertorul de baze numerice transformă în timp real numere întregi între bazele binară (2), octală (8), zecimală (10) și hexazecimală (16) – scrii în oricare câmp, iar restul se actualizează instantaneu. Poți alege și o bază personalizată (2–36), iar conversia folosește BigInt, astfel că valorile peste 64 de biți (adrese mari de memorie, măști de biți) rămân exacte. Util pentru programatori, studenți și oricine are nevoie să schimbe rapid baza numerică – fără instalare, direct în browser.",
    guide: [
      "1. Scrie numărul în oricare câmp (binar, octal, zecimal sau hexazecimal).",
      "2. Valorile din celelalte baze se actualizează automat, instantaneu.",
      "3. Pentru o bază personalizată (2–36), alege baza din lista derulantă.",
      "4. Copiază orice rezultat cu butonul de lângă rând.",
    ],
    faq: [
      { q: "Între ce baze numerice convertește?", a: "Instantaneu între cele patru cele mai frecvente: binar (2), octal (8), zecimal (10) și hexazecimal (16). În plus, poți alege orice bază personalizată între 2 și 36." },
      { q: "Ce numere poate gestiona?", a: "Oricât de mari. Conversia folosește aritmetică BigInt, deci valorile peste limita de 32 sau 64 de biți (adrese hexazecimale mari, măști de biți lungi) rămân exacte, fără erori de rotunjire." },
      { q: "Ce înseamnă cifrele A–F din hexazecimal?", a: "În baza 16 există 16 cifre: 0–9, apoi A=10, B=11, C=12, D=13, E=14, F=15. Astfel, o cifră hexazecimală codifică exact 4 biți (un „nibble”)." },
      { q: "Recunoaște prefixele (0x, 0b)?", a: "Da, prefixele 0x (hex), 0b (binar) și 0o (octal) sunt recunoscute și ignorate, deci poți lipi liniștit valori copiate din codul sursă." },
      { q: "La ce folosește afișarea lungimii în biți?", a: "Arată câți biți sunt necesari pentru a reprezenta numărul (de la cel mai semnificativ bit 1). Util pentru alegerea tipului de date: încape valoarea în 8, 16, 32 sau 64 de biți." },
      { q: "Numărul introdus ajunge pe vreun server?", a: "Nu. Întreaga conversie are loc în browserul tău, cu JavaScript – niciun fel de date nu părăsește dispozitivul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introducerea numărului", description: "Scrie valoarea în câmpul oricărei baze – nu trebuie să decizi dinainte baza de pornire." },
        { title: "2. Conversie în timp real", description: "Celelalte câmpuri (binar, octal, zecimal, hexazecimal) se actualizează imediat la valoarea introdusă." },
        { title: "3. Bază personalizată", description: "Pentru o bază între 2 și 36, alege numărul dorit din lista bazei personalizate." },
        { title: "4. Copierea rezultatului", description: "Cu butonul de lângă rând copiezi în clipboard valoarea oricărei baze." },
      ],
      useCases: [
        { icon: "💻", title: "Programare", description: "Interpretarea rapidă a adreselor hexazecimale de memorie, a codurilor de culoare (#RRGGBB) sau a măștilor de biți în zecimal și binar." },
        { icon: "🎓", title: "Învățare", description: "La informatică, pentru înțelegerea bazelor numerice și a conversiei – vezi simultan toate cele patru forme." },
        { icon: "🔧", title: "Rețele și hardware", description: "Conversia măștilor de subrețea IP, a valorilor de registru și a flag-urilor între binar și hexazecimal." },
        { icon: "🔢", title: "Operații pe biți", description: "Forma binară și lungimea în biți ajută la planificarea și verificarea operațiilor pe biți (AND, OR, shift)." },
      ],
      formatComparison: {
        title: "Cele patru baze numerice frecvente",
        columns: ["Bază numerică", "Bază", "Cifre", "Exemplu (255)"],
        rows: [
          { feature: "Binar", values: ["2", "0–1", "11111111"] },
          { feature: "Octal", values: ["8", "0–7", "377"] },
          { feature: "Zecimal", values: ["10", "0–9", "255"] },
          { feature: "Hexazecimal", values: ["16", "0–9, A–F", "FF"] },
        ],
      },
      aboutSection: {
        title: "Bazele numerice pe scurt",
        paragraphs: [
          "Baza numerică stabilește câte cifre diferite folosim și care este baza valorilor de poziție. În sistemul zecimal (baza 10) de zi cu zi există zece cifre (0–9), însă calculatoarele folosesc sistemul binar, fiindcă cele două stări ale comutatoarelor din circuite (0 și 1) corespund direct biților.",
          "Sistemul hexazecimal (baza 16) este limbajul de confort al programării: o cifră hexazecimală codifică exact patru biți, deci un octet (8 biți) se scrie întotdeauna cu două cifre hexazecimale. De aceea vedem hexazecimal la adresele de memorie, codurile de culoare și codurile de eroare. Sistemul octal (baza 8) supraviețuiește azi mai ales la permisiunile de fișiere Unix (de ex. 755).",
          "Conversia exprimă mereu același număr cu o altă notație: valoarea 255 este „255” în zecimal, „11111111” în binar și „FF” în hexazecimal – dar toate trei reprezintă aceeași cantitate. Datorită aritmeticii BigInt, acest instrument păstrează precizia chiar și la numere foarte mari, acolo unde conversia clasică în virgulă mobilă ar greși.",
        ],
      },
      tips: [
        { icon: "💡", tip: "O cifră hexazecimală = 4 biți, două cifre hexazecimale = 1 octet. E cel mai rapid mod de a reține legătura hex–binar." },
        { icon: "🎨", tip: "Codurile de culoare de tip #FF8800 sunt de fapt trei octeți hexazecimali (roșu, verde, albastru) – aici îi poți descompune în zecimal." },
        { icon: "🔒", tip: "Numărul introdus rămâne în browserul tău, nimic nu ajunge pe server – poți folosi și valori confidențiale." },
        { icon: "📏", tip: "Privește lungimea în biți: dacă depășește 8, valoarea nu mai încape într-un octet; peste 32 e nevoie de un tip pe 64 de biți." },
      ],
    },
  },

  // ═══ CONVERTOR TIMESTAMP UNIX (HU+RO bilingual) ═══════════════════════════
  "unix-timestamp": {
    introText:
      "Convertorul de timestamp Unix transformă marcajele de timp măsurate în secunde (sau milisecunde) de la 1970 într-o dată lizibilă și invers. Afișează ora locală, UTC, formatul ISO 8601, ziua săptămânii și timpul relativ („acum 3 zile”, „peste 2 ore”). Sus, timestamp-ul curent rulează live. Pentru programatori care lucrează cu câmpuri de bază de date, răspunsuri API sau fișiere de log – fără instalare, direct în browser.",
    guide: [
      "1. Timestamp → dată: introdu marcajul de timp și alege dacă este în secunde sau milisecunde.",
      "2. Butonul „Acum” introduce timestamp-ul curent – rezultatul apare imediat (local, UTC, ISO, relativ).",
      "3. Dată → timestamp: alege data și ora în câmp și citești timestamp-ul corespunzător.",
      "4. Copiază orice rezultat cu un singur clic.",
    ],
    faq: [
      { q: "Ce este un timestamp Unix?", a: "Marcajul de timp Unix este numărul de secunde scurse de la 1 ianuarie 1970, 00:00:00 UTC (așa-numitul „epoch”). Identifică un moment printr-un singur număr întreg, independent de fus orar, motiv pentru care e folosit de baze de date, API-uri, loguri și limbaje de programare." },
      { q: "Care e diferența între secunde și milisecunde?", a: "Timestamp-ul Unix clasic se măsoară în secunde și are în prezent 10 cifre. JavaScript (Date.now()) și multe sisteme moderne folosesc însă milisecunde, adică 13 cifre. În instrument poți comuta unitatea pe care ai introdus-o." },
      { q: "În ce fus orar afișează rezultatul?", a: "Afișează simultan ora din fusul orar local al browserului tău și ora UTC. Deoarece timestamp-ul este în sine independent de fus orar, vezi imediat ambele perspective, fără confuzii." },
      { q: "Ce înseamnă formatul ISO 8601?", a: "ISO 8601 este formatul text standard al datelor, lizibil deopotrivă de oameni și de mașini (de ex. 2025-06-15T14:26:40.000Z). Litera Z de la final indică faptul că valoarea este în UTC. Este formatul așteptat de majoritatea API-urilor." },
      { q: "La ce folosește timpul relativ?", a: "Timpul relativ exprimă în cuvinte distanța față de momentul curent: „acum 3 zile”, „peste 2 ore”. Util pentru interpretarea rapidă a intrărilor de log sau a datelor de expirare." },
      { q: "Momentul introdus ajunge pe vreun server?", a: "Nu. Toate conversiile au loc în browserul tău, cu JavaScript – nici timestamp-ul, nici data nu părăsesc dispozitivul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alegerea direcției", description: "Timestamp → dată sau dată → timestamp – cele două secțiuni sunt separate și se folosesc independent." },
        { title: "2. Introducerea valorii", description: "La timestamp scrie numărul și alege unitatea secunde/milisecunde; la dată folosește câmpul de dată și oră." },
        { title: "3. Citirea rezultatului", description: "Apar ora locală, UTC, ISO 8601, ziua săptămânii și timpul relativ – toate deodată, live." },
        { title: "4. Copierea", description: "Copiezi orice rezultat cu butonul de alături." },
      ],
      useCases: [
        { icon: "🗄️", title: "Câmpuri de bază de date", description: "Interpretarea rapidă a coloanelor created_at / updated_at și a altor timestamp-uri în date lizibile la depanare." },
        { icon: "🔌", title: "Răspunsuri API", description: "Conversia instantanee a valorilor epoch din JSON (adesea în milisecunde) în timp uman." },
        { icon: "📋", title: "Fișiere de log", description: "Compararea timestamp-urilor din logurile de server și aplicație cu ora locală și UTC la analiza incidentelor." },
        { icon: "⏰", title: "Date de expirare", description: "Verificarea expirării token-urilor, intrărilor de cache sau sarcinilor cron – când expiră și cât mai e până atunci." },
      ],
      formatComparison: {
        title: "Formate de marcaj de timp",
        columns: ["Format", "Exemplu", "Caracteristică"],
        rows: [
          { feature: "Unix secunde", values: ["1750000000", "10 cifre, Unix clasic"] },
          { feature: "Unix milisecunde", values: ["1750000000000", "13 cifre, JavaScript Date.now()"] },
          { feature: "ISO 8601", values: ["2025-06-15T14:26:40Z", "Text standard, cu UTC"] },
          { feature: "UTC lizibil", values: ["15 Jun 2025 14:26:40 GMT", "Perspectivă umană, în UTC"] },
        ],
      },
      aboutSection: {
        title: "Timpul Unix pe scurt",
        paragraphs: [
          "Timpul Unix (numit și timp epoch sau timp POSIX) măsoară timpul printr-un singur număr întreg: câte secunde au trecut de la miezul nopții de 1 ianuarie 1970 (UTC). Puterea acestei soluții stă în simplitate – fără fus orar, fără ora de vară, fără probleme la limita de lună sau an, doar un număr care crește continuu, ușor de calculat și de comparat.",
          "Tocmai de aceea timestamp-ul este limba comună a timpului în informatică: bazele de date stochează astfel momentul creării înregistrărilor, API-urile semnalează astfel expirarea, iar sistemele de versionare și logurile înregistrează astfel evenimentele. Când e nevoie de citire umană, numărul se convertește într-o dată în fusul orar dorit – exact ce face acest instrument.",
          "Există două capcane frecvente. Prima este unitatea: secunde (10 cifre) sau milisecunde (13 cifre) – ușor de greșit, de aceea instrumentul le tratează separat. A doua este fusul orar: același timestamp arată o oră diferită în perspectiva locală și în cea UTC, dar marchează exact același moment. Instrumentul afișează ambele perspective simultan, ca să nu existe confuzii.",
        ],
      },
      tips: [
        { icon: "🔢", tip: "10 cifre = secunde, 13 cifre = milisecunde. Dacă rezultatul e greșit (dată din 1970 sau foarte îndepărtată), schimbă unitatea." },
        { icon: "🌍", tip: "Timestamp-ul este independent de fus orar; diferența afișată între local și UTC ține doar de perspectivă, nu de valoarea stocată." },
        { icon: "📌", tip: "ISO 8601 este cel mai sigur format pentru schimbul de date – neambiguu, sortabil și înțeles de orice sistem modern." },
        { icon: "🔒", tip: "Momentele rămân în browserul tău; poți converti în siguranță și timestamp-uri din loguri confidențiale." },
      ],
    },
  },

  // ═══ 1. FORMATARE JSON ═════════════════════════════════════════════════════
  "json-formazas": {
    introText:
      "Instrumentul de formatare JSON îți permite să transformi datele JSON compacte într-un format frumos și ușor de citit, cu un singur clic. Adaugă indentare, separări de rânduri și evidențiere a sintaxei pentru o vizualizare clară. Un instrument indispensabil pentru dezvoltatori, testeri și specialiști care lucrează cu API-uri.",
    guide: [
      "1. Lipește textul JSON de formatat în editorul din stânga sau trage un fișier .json.",
      "2. Selectează dimensiunea indentării dorite (2 sau 4 spații, tab).",
      "3. Apasă butonul «Formatare» – rezultatul apare imediat în partea dreaptă.",
      "4. Copiază rezultatul în clipboard sau descarcă-l ca fișier .json.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la formatarea datelor JSON pentru lizibilitate (prettify): adaugă indentare și separări de rânduri la JSON-ul compactat, facilitând vizualizarea structurii datelor." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Ce opțiuni de indentare pot alege?", a: "Poți alege între 2 spații, 4 spații sau tab. Cea mai răspândită convenție este indentarea cu 2 spații." },
      { q: "Ce se întâmplă dacă lipesc un JSON invalid?", a: "Instrumentul validează intrarea în timp real și semnalează eroarea de sintaxă cu un chenar roșu, indicând linia și poziția." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Pierd date la formatare?", a: "Nu. Operația prettify adaugă exclusiv caractere whitespace (spații, separări de rânduri, tab-uri) – structura datelor și valorile rămân neatinse." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea JSON-ului", description: "Lipește textul JSON brut sau compactat în câmpul de introducere, sau trage un fișier .json." },
        { title: "2. Setări de formatare", description: "Selectează nivelul de indentare: 2 spații, 4 spații sau tab." },
        { title: "3. Pornirea formatării", description: "Apasă butonul «Formatare» – rezultatul apare imediat cu evidențierea sintaxei." },
        { title: "4. Copierea rezultatului", description: "Copiază JSON-ul formatat în clipboard sau descarcă-l ca fișier." },
      ],
      useCases: [
        { icon: "🔍", title: "Analiza răspunsurilor API", description: "Poți transforma răspunsul JSON compactat primit de la API într-un format lizibil, pentru a înțelege mai ușor structura datelor." },
        { icon: "🐛", title: "Depanare (debug)", description: "În JSON-ul formatat este mult mai ușor să găsești valorile eronate, câmpurile lipsă sau problemele de structură." },
        { icon: "📝", title: "Crearea documentației", description: "Poți insera exemple JSON formatate lizibil în documentație, README sau mesaje Slack." },
        { icon: "⚙️", title: "Fișiere de configurare", description: "Poți face fișierele de config JSON (package.json, tsconfig.json) ușor de vizualizat și editat." },
      ],
      formatComparison: {
        title: "Comparație JSON vs YAML vs XML",
        columns: ["Proprietate", "JSON", "YAML", "XML"],
        rows: [
          { feature: "Lizibilitate", values: ["Bună", "Excelentă", "Medie"] },
          { feature: "Dimensiune fișier", values: ["Medie", "Mică", "Mare (din cauza tag-urilor)"] },
          { feature: "Comentarii", values: ["Nu suportă", "Da (#)", "Da (<!-- -->)"] },
          { feature: "Validare schemă", values: ["JSON Schema", "Nu are încorporat", "XSD/DTD"] },
          { feature: "Utilizare", values: ["API, config", "Config, CI/CD", "SOAP, config"] },
        ],
      },
      aboutSection: {
        title: "Despre formatul JSON",
        paragraphs: [
          "JSON (JavaScript Object Notation) este un format ușor de schimb de date bazat pe text, popularizat de Douglas Crockford la începutul anilor 2000. Deși se bazează pe sintaxa JavaScript, este independent de limbaj – practic fiecare limbaj de programare modern îl suportă nativ.",
          "JSON se bazează pe două structuri fundamentale: colecția de perechi cheie-valoare (obiect) și lista ordonată de valori (array). Valorile pot fi string-uri, numere, boolean (adevărat/fals), null, obiecte sau array-uri – acestea pot fi imbricate în orice combinație.",
          "Formatarea (prettify) îmbunătățește lizibilitatea JSON-ului prin adăugarea indentării și separărilor de rând, fără a modifica conținutul datelor. Minificarea este operația inversă: elimină whitespace-ul inutil pentru a obține o dimensiune mai mică a fișierului.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește indentare de 2 spații – aceasta este cea mai răspândită convenție pentru fișierele JSON." },
        { icon: "🔑", tip: "Cheile JSON trebuie să fie întotdeauna între ghilimele duble – ghilimele simple sunt o eroare de sintaxă." },
        { icon: "⚠️", tip: "JSON nu suportă comentarii. Dacă ai nevoie de adnotări, ia în considerare utilizarea YAML sau JSON5." },
        { icon: "📋", tip: "JSON-ul formatat este excelent pentru code review-uri și documentație." },
      ],
    },
  },

  // ═══ 2. MINIFICARE JSON ══════════════════════════════════════════════════
  "json-minimalas": {
    introText:
      "Minificatorul JSON elimină spațiile, separările de rânduri și indentările inutile din datele JSON, obținând astfel dimensiunea minimă a fișierului. Ideal pentru build-uri de producție, optimizarea răspunsurilor API și reducerea traficului de rețea.",
    guide: [
      "1. Lipește textul JSON formatat în câmpul de introducere.",
      "2. Apasă butonul «Minificare».",
      "3. Rezultatul apare pe o singură linie, fără whitespace inutil.",
      "4. Verifică procentul de reducere a dimensiunii, apoi copiază sau descarcă rezultatul.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la reducerea dimensiunii fișierelor JSON prin eliminarea whitespace-ului inutil (spații, separări de rânduri, tab-uri) – ideal pentru build-uri de producție." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Cu cât va fi mai mic JSON-ul?", a: "Reducerea depinde de nivelul de formatare – de obicei se obține o reducere de 20–40% prin eliminarea whitespace-ului." },
      { q: "Poate fi reconvertit JSON-ul minificat?", a: "Da, cu instrumentul nostru de formatare JSON (prettify) poți oricând să-l reconvertești într-un format lizibil." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Minificarea modifică datele?", a: "Nu. Sunt eliminate exclusiv caracterele whitespace – conținutul datelor, structura și valorile rămân exact la fel." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea JSON-ului", description: "Lipește textul JSON formatat sau brut în câmpul de introducere." },
        { title: "2. Minificare", description: "Apasă butonul «Minificare» pentru eliminarea whitespace-ului." },
        { title: "3. Verificarea reducerii", description: "Verifică diferența procentuală între dimensiunea originală și cea minificată." },
        { title: "4. Exportul rezultatului", description: "Copiază JSON-ul minificat sau descarcă-l ca fișier .json." },
      ],
      useCases: [
        { icon: "🚀", title: "Deploy în producție", description: "Optimizarea dimensiunii răspunsurilor API și fișierelor de configurare pentru încărcare mai rapidă." },
        { icon: "📡", title: "Reducerea traficului de rețea", description: "Un payload JSON mai mic necesită mai puțină lățime de bandă – important pentru aplicații mobile și conexiuni lente." },
        { icon: "💾", title: "Economisirea spațiului de stocare", description: "La stocarea unor cantități mari de date JSON, minificarea poate rezulta în economii semnificative de spațiu." },
        { icon: "⚡", title: "Build pipeline", description: "Minificarea poate fi integrată în procesul de build pentru proiecte frontend și backend." },
      ],
      formatComparison: {
        title: "Comparație JSON vs YAML vs XML",
        columns: ["Proprietate", "JSON", "YAML", "XML"],
        rows: [
          { feature: "Lizibilitate", values: ["Bună", "Excelentă", "Medie"] },
          { feature: "Dimensiune fișier", values: ["Medie", "Mică", "Mare (din cauza tag-urilor)"] },
          { feature: "Comentarii", values: ["Nu suportă", "Da (#)", "Da (<!-- -->)"] },
          { feature: "Validare schemă", values: ["JSON Schema", "Nu are încorporat", "XSD/DTD"] },
          { feature: "Utilizare", values: ["API, config", "Config, CI/CD", "SOAP, config"] },
        ],
      },
      aboutSection: {
        title: "De ce merită să minifici JSON-ul?",
        paragraphs: [
          "Minificarea JSON înseamnă eliminarea whitespace-ului inutil (spații, tab-uri, separări de rânduri) din datele JSON. Rezultatul este un fișier funcțional identic, dar cu o dimensiune mult mai mică, care poate fi transmis mai rapid prin rețea.",
          "În mediul de producție, JSON-ul minificat poate fi cu 20–40% mai mic decât varianta formatată. Aceasta înseamnă economii semnificative de lățime de bandă, mai ales la răspunsuri JSON mari (de ex. răspunsuri API, exporturi de date).",
          "Este important de menționat că minificarea nu este compresie: se elimină doar caracterele whitespace. Combinată cu compresia gzip sau brotli, se poate obține o reducere și mai mare a dimensiunii.",
        ],
      },
      tips: [
        { icon: "📊", tip: "Verifică întotdeauna procentul de reducere – dacă este minim, JSON-ul era deja compactat." },
        { icon: "🔄", tip: "JSON-ul minificat poate fi oricând reformatat cu instrumentul prettify – datele nu sunt afectate." },
        { icon: "🗜️", tip: "Pentru compresie maximă, combină minificarea JSON cu compresia gzip sau brotli pe server." },
      ],
    },
  },

  // ═══ 3. VALIDARE JSON ═══════════════════════════════════════════════════
  "json-ellenorzes": {
    introText:
      "Validatorul JSON verifică sintaxa JSON în timp real și semnalează erorile cu numărul exact al liniei și poziției. Instrument ideal pentru verificarea fișierelor de configurare, validarea răspunsurilor API și verificarea rapidă după editarea manuală.",
    guide: [
      "1. Lipește textul JSON de verificat în câmpul de introducere.",
      "2. Validarea are loc automat, în timp real, pe măsură ce tastezi.",
      "3. Dacă JSON-ul este valid, primești o indicație verde. Dacă este eronat, problema este semnalată cu chenar roșu și mesaj de eroare.",
      "4. Corectează eroarea pe linia indicată, iar validatorul actualizează imediat rezultatul.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la verificarea corectitudinii sintactice a datelor JSON – arată dacă JSON-ul este valid și, dacă nu, indică exact unde se află eroarea." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Ce erori recunoaște?", a: "Recunoaște virgule lipsă, ghilimele lipsă, paranteze de închidere lipsă, valori invalide, trailing comma și orice altă eroare de sintaxă JSON." },
      { q: "Suportă formatul JSON5 sau JSONC?", a: "Nu, validatorul verifică sintaxa JSON standard conform RFC 8259. Comentariile și trailing comma sunt considerate erori conform standardului." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Arată locul exact al erorii?", a: "Da, mesajul de eroare conține numărul liniei și poziția caracterului unde se află eroarea de sintaxă." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea JSON-ului", description: "Lipește textul JSON de verificat în câmpul de introducere." },
        { title: "2. Validare automată", description: "Validatorul analizează JSON-ul în timp real pe măsură ce tastezi." },
        { title: "3. Interpretarea erorii", description: "Dacă JSON-ul este eronat, mesajul de eroare arată numărul liniei și poziția." },
        { title: "4. Corecție și reverificare", description: "Corectează eroarea, iar validatorul actualizează imediat rezultatul." },
      ],
      useCases: [
        { icon: "✅", title: "Verificarea fișierelor config", description: "Verificarea sintaxei package.json, tsconfig.json și altor fișiere de configurare înainte de deploy." },
        { icon: "🔌", title: "Validarea răspunsurilor API", description: "Verificarea rapidă a structurii și sintaxei răspunsurilor JSON primite de la API." },
        { icon: "📝", title: "Verificare după editare manuală", description: "După modificarea manuală a unui fișier JSON, validatorul semnalează imediat dacă ai introdus accidental o eroare." },
        { icon: "🎓", title: "Învățare și educație", description: "Pentru învățarea sintaxei JSON, vezi imediat care este eroarea și unde se află." },
      ],
      formatComparison: {
        title: "Comparație JSON vs YAML vs XML",
        columns: ["Proprietate", "JSON", "YAML", "XML"],
        rows: [
          { feature: "Lizibilitate", values: ["Bună", "Excelentă", "Medie"] },
          { feature: "Dimensiune fișier", values: ["Medie", "Mică", "Mare (din cauza tag-urilor)"] },
          { feature: "Comentarii", values: ["Nu suportă", "Da (#)", "Da (<!-- -->)"] },
          { feature: "Validare schemă", values: ["JSON Schema", "Nu are încorporat", "XSD/DTD"] },
          { feature: "Utilizare", values: ["API, config", "Config, CI/CD", "SOAP, config"] },
        ],
      },
      aboutSection: {
        title: "Despre validarea JSON",
        paragraphs: [
          "Validarea JSON înseamnă verificarea corectitudinii sintactice a textului JSON conform standardului RFC 8259. Într-un JSON valid, toate string-urile trebuie să fie între ghilimele duble, cheile sunt string-uri, iar valorile pot fi string-uri, numere, boolean, null, obiecte sau array-uri.",
          "Cele mai frecvente erori de sintaxă JSON: virgulă lipsă sau în plus (trailing comma), ghilimele simple în loc de duble, paranteză de închidere lipsă, valori undefined sau NaN, și utilizarea comentariilor (JSON nu suportă comentarii).",
          "Validarea în timp real semnalează eroarea imediat pe măsură ce tastezi, ceea ce accelerează semnificativ depanarea. Numărul exact al liniei și poziției te ajută să găsești și să corectezi problema în câteva secunde.",
        ],
      },
      tips: [
        { icon: "🔍", tip: "Dacă mesajul de eroare indică sfârșitul fișierului, probabil lipsește o virgulă sau o paranteză de închidere pe un rând anterior." },
        { icon: "💡", tip: "JSON nu permite trailing comma (virgulă după ultimul element) – aceasta este cea mai frecventă eroare la editarea manuală." },
        { icon: "📏", tip: "Folosește un formatator JSON după validare – indentarea frumoasă ajută la vizualizarea structurii." },
        { icon: "⚠️", tip: "Obiectele JavaScript nu sunt neapărat JSON valid: cheile JSON trebuie să fie întotdeauna între ghilimele duble." },
      ],
    },
  },

  // ═══ 4. VALIDARE YAML ═══════════════════════════════════════════════════
  "yaml-ellenorzes": {
    introText:
      "Validatorul YAML verifică sintaxa YAML în timp real și te ajută să identifici problemele cu mesaje detaliate de eroare. Deosebit de util pentru verificarea pipeline-urilor CI/CD, fișierelor Docker Compose și configurațiilor Kubernetes.",
    guide: [
      "1. Lipește textul YAML în câmpul de introducere sau trage un fișier .yaml/.yml.",
      "2. Validarea pornește automat pe măsură ce tastezi.",
      "3. În cazul unui YAML valid, primești o indicație verde. La erori, mesajul arată linia și poziția.",
      "4. Corectează eroarea, iar validatorul reverifică imediat.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la verificarea corectitudinii sintactice a fișierelor YAML – deosebit de util pentru validarea fișierelor de configurare (Docker, Kubernetes, CI/CD)." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Ce versiuni YAML suportă?", a: "Validatorul urmează standardul YAML 1.2 cu ajutorul bibliotecii js-yaml, cea mai răspândită implementare YAML." },
      { q: "Recunoaște erorile de indentare?", a: "Da, YAML este extrem de sensibil la indentare. Validatorul arată exact dacă găsește o indentare inconsistentă (de ex. tab și spații amestecate)." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Care este diferența între validarea YAML și JSON?", a: "Validarea YAML verifică sintaxa bazată pe indentare, ancorele, string-urile multi-linie și tipurile specifice YAML, în timp ce validarea JSON examinează structura bazată pe paranteze." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea YAML-ului", description: "Lipește textul YAML sau trage fișierul .yaml/.yml în câmpul de introducere." },
        { title: "2. Verificare automată", description: "Validatorul analizează sintaxa YAML în timp real pe măsură ce tastezi." },
        { title: "3. Interpretarea erorii", description: "La erori, mesajul conține numărul liniei și descrierea erorii." },
        { title: "4. Corectarea erorii", description: "Corectează eroarea semnalată, iar rezultatul se actualizează imediat." },
      ],
      useCases: [
        { icon: "🐳", title: "Validare Docker Compose", description: "Verificarea sintaxei fișierelor docker-compose.yml înainte de pornirea containerelor." },
        { icon: "☸️", title: "Manifest Kubernetes", description: "Verificarea rapidă a fișierelor YAML de deployment, service și ingress K8s." },
        { icon: "🔄", title: "Pipeline CI/CD", description: "Validarea configurațiilor de pipeline GitHub Actions, GitLab CI, CircleCI înainte de deploy." },
        { icon: "⚙️", title: "Configurare aplicații", description: "Verificarea fișierelor config bazate pe YAML: Spring Boot, Ansible, Helm Chart și altele." },
      ],
      formatComparison: {
        title: "Comparație YAML vs JSON vs TOML",
        columns: ["Proprietate", "YAML", "JSON", "TOML"],
        rows: [
          { feature: "Lizibilitate", values: ["Excelentă", "Bună", "Bună"] },
          { feature: "Comentarii", values: ["Da (#)", "Nu", "Da (#)"] },
          { feature: "Sensibil la indentare", values: ["Da", "Nu", "Nu"] },
          { feature: "String multi-linie", values: ["Nativ (|, >)", "Nu", "Da (\"\"\")" ] },
          { feature: "Utilizare", values: ["Config, CI/CD, K8s", "API, config", "Config (Cargo, pyproject)"] },
        ],
      },
      aboutSection: {
        title: "Despre formatul YAML",
        paragraphs: [
          "YAML (YAML Ain't Markup Language) este un format de serializare a datelor ușor de citit pentru oameni. Sintaxa bazată pe indentare permite descrierea clară a datelor ierarhice fără perechi de paranteze.",
          "YAML este extrem de sensibil la whitespace: pentru indentare trebuie folosite exclusiv spații (tab-urile nu sunt permise), iar elementele de pe același nivel trebuie să aibă aceeași indentare. Aceasta este cea mai frecventă sursă de erori.",
          "YAML a devenit în ultimii ani unul dintre cele mai importante formate în lumea DevOps: manifestele Kubernetes, fișierele Docker Compose, pipeline-urile CI/CD și playbook-urile Ansible folosesc toate YAML.",
        ],
      },
      tips: [
        { icon: "🔑", tip: "Nu folosi niciodată tab-uri pentru indentarea YAML – exclusiv spații. Whitespace-ul amestecat este cea mai frecventă eroare." },
        { icon: "📐", tip: "Folosește o indentare consistentă: indentarea cu 2 spații este convenția cea mai acceptată." },
        { icon: "💡", tip: "String-urile YAML nu necesită obligatoriu ghilimele, dar la caractere speciale (de ex. :, #, @) sunt recomandate." },
        { icon: "✅", tip: "Validează întotdeauna fișierul YAML înainte de deploy – chiar și o mică eroare de indentare poate face configurația nefuncțională." },
      ],
    },
  },

  // ═══ 5. FORMATARE YAML ════════════════════════════════════════════════════
  "yaml-formazas": {
    introText:
      "Instrumentul de formatare YAML uniformizează indentarea și structura fișierelor YAML. Normalizează whitespace-ul, ordonează cheile și unifică stilul – astfel toți membrii echipei pot lucra cu fișiere YAML în format identic.",
    guide: [
      "1. Lipește textul YAML de formatat în câmpul de introducere.",
      "2. Selectează dimensiunea indentării dorite (2 sau 4 spații).",
      "3. Apasă butonul «Formatare» – rezultatul apare cu indentare normalizată.",
      "4. Copiază rezultatul sau descarcă-l ca fișier .yaml.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la normalizarea indentării și formatării fișierelor YAML – asigură un stil consistent și uniform pentru configurațiile YAML." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Formatarea modifică datele?", a: "Nu, formatarea modifică exclusiv whitespace-ul și aranjamentul – conținutul datelor rămâne neatins." },
      { q: "Cum gestionează comentariile?", a: "Comentariile YAML (#) sunt păstrate în timpul formatării, poziționate corespunzător structurii reformatate." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Când merită să folosesc formatarea YAML?", a: "Înainte de code review, pentru asigurarea unui stil uniform în lucrul de echipă sau când trebuie unificate fișiere YAML din surse diferite." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea YAML-ului", description: "Lipește textul YAML de formatat în câmpul de introducere." },
        { title: "2. Setarea indentării", description: "Selectează dimensiunea indentării dorite: 2 sau 4 spații." },
        { title: "3. Pornirea formatării", description: "Apasă butonul «Formatare» pentru normalizare." },
        { title: "4. Exportul rezultatului", description: "Copiază YAML-ul formatat sau descarcă-l ca fișier." },
      ],
      useCases: [
        { icon: "👥", title: "Uniformizare în echipă", description: "Asigură-te că toți membrii echipei folosesc fișiere YAML cu același stil – evitând diff-urile inutile." },
        { icon: "📋", title: "Pregătire code review", description: "YAML-ul formatat este mai ușor de verificat în code review, permițându-ți să te concentrezi pe modificările esențiale." },
        { icon: "🔧", title: "Ordonarea configurațiilor vechi", description: "Reorganizarea fișierelor YAML mai vechi cu indentare inconsistentă într-un format uniform." },
        { icon: "📝", title: "Documentație", description: "Poți crea exemple YAML frumoase și lizibile pentru documentație și materiale educaționale." },
      ],
      aboutSection: {
        title: "Importanța formatării YAML",
        paragraphs: [
          "Formatarea YAML este esențială deoarece limbajul YAML este sensibil la indentare: whitespace-ul nu este doar o chestiune estetică, ci o parte integrantă a structurii. Un fișier YAML cu indentare greșită poate rezulta într-o structură de date complet diferită.",
          "Formatarea consistentă este deosebit de importantă în lucrul de echipă: dacă toată lumea folosește același stil de indentare, diff-urile din sistemul de versionare arată exclusiv modificările esențiale, nu diferențele de whitespace.",
          "Formatorul YAML utilizează biblioteca js-yaml pentru operațiile de parse și serialize, ceea ce asigură conformitatea cu standardul YAML 1.2.",
        ],
      },
      tips: [
        { icon: "📐", tip: "Indentarea cu 2 spații este cea mai răspândită convenție pentru fișierele YAML – în special în lumea DevOps." },
        { icon: "🔄", tip: "Înainte de formatare, validează întotdeauna YAML-ul – un YAML eronat nu poate fi formatat corect." },
        { icon: "👥", tip: "Configurează .editorconfig în proiectul tău, astfel încât fișierele YAML să fie întotdeauna create cu indentare consistentă." },
      ],
    },
  },

  // ═══ 6. FORMATARE XML ═════════════════════════════════════════════════════
  "xml-formazas": {
    introText:
      "Instrumentul de formatare XML (prettify) aduce datele tale XML într-un format clar, cu indentare frumoasă. Normalizează indentările și separările de rânduri, făcând documentele mai ușor de citit și editat. Ideal pentru vizualizarea răspunsurilor SOAP, fișierelor de configurare și exporturilor de date.",
    guide: [
      "1. Lipește textul XML în câmpul de introducere sau trage un fișier .xml.",
      "2. Selectează dimensiunea indentării (2 sau 4 spații, tab).",
      "3. Apasă butonul «Formatare» pentru afișarea rezultatului.",
      "4. Copiază XML-ul formatat sau descarcă-l ca fișier.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la formatarea documentelor XML pentru lizibilitate: adaugă indentări și separări de rânduri la XML-ul pe o singură linie sau compactat." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Gestionează secțiunile CDATA și comentariile?", a: "Da, formatorul păstrează conținutul secțiunilor CDATA și comentariile XML, normalizând indentarea în jurul lor." },
      { q: "Ce se întâmplă dacă lipesc un XML invalid?", a: "Formatorul semnalează dacă XML-ul nu este well-formed – mesajul de eroare conține numărul liniei problematice." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Formatarea modifică conținutul XML?", a: "Nu, sunt modificate exclusiv whitespace-ul și indentarea – elementele, atributele și conținutul textual rămân neatinse." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea XML-ului", description: "Lipește textul XML în câmpul de introducere sau trage un fișier .xml." },
        { title: "2. Selectarea indentării", description: "Alege dimensiunea de indentare dorită: 2 spații, 4 spații sau tab." },
        { title: "3. Formatare", description: "Apasă butonul «Formatare» – rezultatul apare frumos indentat." },
        { title: "4. Copierea rezultatului", description: "Copiază în clipboard sau descarcă ca fișier .xml." },
      ],
      useCases: [
        { icon: "🔌", title: "Citirea răspunsurilor SOAP", description: "Aducerea răspunsurilor XML pe o singură linie primite de la servicii web SOAP într-un format vizualizabil." },
        { icon: "⚙️", title: "Fișiere de configurare", description: "Formatarea pentru lizibilitate a fișierelor Maven pom.xml, Spring XML config și altele înainte de editare." },
        { icon: "📊", title: "Exporturi de date", description: "Vizualizarea și verificarea exporturilor de date în format XML (de ex. extrase bancare, facturi)." },
        { icon: "🐛", title: "Depanare", description: "Depanarea XML-ului compactat este mult mai eficientă în vizualizare formatată cu indentare." },
      ],
      formatComparison: {
        title: "Comparație XML vs JSON vs YAML",
        columns: ["Proprietate", "XML", "JSON", "YAML"],
        rows: [
          { feature: "Lizibilitate", values: ["Medie", "Bună", "Excelentă"] },
          { feature: "Dimensiune fișier", values: ["Mare (din cauza tag-urilor)", "Medie", "Mică"] },
          { feature: "Validare schemă", values: ["XSD/DTD", "JSON Schema", "Nu are încorporat"] },
          { feature: "Namespace-uri", values: ["Da (xmlns)", "Nu", "Nu"] },
          { feature: "Utilizare", values: ["SOAP, enterprise, RSS", "API, config", "Config, CI/CD"] },
        ],
      },
      aboutSection: {
        title: "Despre formatul XML",
        paragraphs: [
          "XML (Extensible Markup Language) este un limbaj de marcare dezvoltat de W3C în 1998 pentru descrierea structurată a datelor. Principalul său avantaj este flexibilitatea: poți defini propriile nume de elemente și atribute, pe care le poți valida cu ajutorul schemelor XSD sau DTD.",
          "XML este utilizat pe scară largă și astăzi: servicii web SOAP, feed-uri RSS, grafice SVG, documente Office (OOXML), layout-uri Android și formatul de bază al multor sisteme enterprise. Deși în API-urile web moderne JSON a preluat rolul principal, XML rămâne indispensabil în multe industrii.",
          "Formatarea XML normalizează whitespace-ul documentului conform ierarhiei tag-urilor. Formatorul păstrează declarația XML, comentariile și conținutul secțiunilor CDATA.",
        ],
      },
      tips: [
        { icon: "📝", tip: "Verifică întotdeauna că XML-ul este well-formed înainte de formatare – un XML eronat nu poate fi formatat." },
        { icon: "🏷️", tip: "Elementele fără conținut (self-closing) de ex.: <br/> – formatorul le gestionează corect." },
        { icon: "💡", tip: "Dacă lucrezi cu fișiere XML foarte mari, ia în considerare utilizarea unui editor XML dedicat." },
        { icon: "🔍", tip: "În XML-ul formatat este mai ușor să găsești tag-urile de închidere lipsă și problemele de structură." },
      ],
    },
  },

  // ═══ 7. MINIFICARE XML ═══════════════════════════════════════════════════
  "xml-minimalas": {
    introText:
      "Minificatorul XML elimină whitespace-ul inutil, separările de rânduri și comentariile din documentele XML, minimizând dimensiunea fișierului. Deosebit de util pentru optimizarea mesajelor SOAP, feed-urilor RSS și răspunsurilor API bazate pe XML.",
    guide: [
      "1. Lipește textul XML formatat în câmpul de introducere.",
      "2. Alege dacă și comentariile să fie șterse.",
      "3. Apasă butonul «Minificare».",
      "4. Verifică procentul de reducere a dimensiunii, apoi copiază sau descarcă rezultatul.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la reducerea dimensiunii documentelor XML: elimină whitespace-ul inutil, separările de rânduri și, opțional, comentariile." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Se șterg și comentariile?", a: "Opțional. Poți configura dacă comentariile să fie păstrate sau șterse – implicit, comentariile sunt eliminate pentru reducere maximă." },
      { q: "Cu cât poate scădea dimensiunea XML-ului?", a: "Minificarea XML produce de obicei o reducere de 30–60%, deoarece din fișierele deja mari din cauza numelor tag-urilor, se poate elimina mult whitespace." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Poate fi reconvertit XML-ul minificat?", a: "Da, cu instrumentul de formatare XML (prettify) poți oricând să-l reformatezi într-un format lizibil cu indentare." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea XML-ului", description: "Lipește textul XML formatat în câmpul de introducere." },
        { title: "2. Setări", description: "Alege dacă și comentariile să fie șterse în timpul minificării." },
        { title: "3. Minificare", description: "Apasă butonul «Minificare» pentru eliminarea whitespace-ului." },
        { title: "4. Descărcarea rezultatului", description: "Verifică reducerea dimensiunii și copiază sau descarcă rezultatul." },
      ],
      useCases: [
        { icon: "📡", title: "Optimizare SOAP", description: "Reducerea dimensiunii mesajelor SOAP XML pentru transfer mai rapid prin rețea." },
        { icon: "📰", title: "Comprimarea feed-urilor RSS", description: "Optimizarea dimensiunii fișierelor RSS și Atom feed pentru reducerea traficului serverului." },
        { icon: "💾", title: "Economisirea spațiului de stocare", description: "La stocarea unor cantități mari de date XML, minificarea eliberează spațiu semnificativ." },
        { icon: "⚡", title: "Build pipeline", description: "Minificarea automată a fișierelor de configurare XML ca parte a procesului de build." },
      ],
      aboutSection: {
        title: "Despre minificarea XML",
        paragraphs: [
          "Minificarea XML înseamnă eliminarea caracterelor whitespace responsabile de lizibilitatea documentului XML. Aceasta include indentările (spații și tab-uri), separările de rânduri între tag-uri și, opțional, comentariile XML.",
          "Dimensiunea documentelor XML este oricum mai mare decât a echivalentelor JSON din cauza numelor tag-urilor. Minificarea este deosebit de eficientă pentru XML, deoarece indentarea reprezintă o parte semnificativă din dimensiunea totală a fișierului.",
          "Este important de menționat că minificarea XML nu modifică conținutul datelor: elementele, atributele, conținutul textual și secțiunile CDATA rămân neatinse.",
        ],
      },
      tips: [
        { icon: "🗜️", tip: "Aplicarea combinată a minificării XML cu compresia gzip/brotli oferă cea mai eficientă reducere a dimensiunii." },
        { icon: "⚠️", tip: "Ai grijă că anumite procesoare XML pot considera whitespace-ul ca fiind semnificativ – verifică funcționarea XML-ului minificat." },
        { icon: "📊", tip: "Verifică procentul de reducere – pentru XML, de obicei se poate obține o economie de 30–60%." },
      ],
    },
  },

  // ═══ 8. VALIDARE XML ════════════════════════════════════════════════════
  "xml-ellenorzes": {
    introText:
      "Validatorul XML verifică dacă documentul XML este well-formed (bine format): dacă structura tag-urilor, elementele de închidere și sintaxa atributelor sunt corecte. Utilizează DOMParser-ul încorporat al browserului pentru verificare în timp real.",
    guide: [
      "1. Lipește textul XML în câmpul de introducere.",
      "2. Validarea are loc automat.",
      "3. Dacă XML-ul este well-formed, primești o indicație verde. Dacă este eronat, mesajul de eroare arată problema.",
      "4. Corectează eroarea la locul indicat.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la verificarea well-formedness a documentelor XML: examinează dacă fiecare tag are perechea de închidere, dacă atributele și structura sunt corecte." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Validează și pe baza unei scheme XSD?", a: "Nu, acest instrument verifică well-formedness (sintaxa). Pentru validare cu schemă XSD sau DTD este nevoie de un instrument XML dedicat." },
      { q: "Ce erori recunoaște?", a: "Tag de închidere lipsă, nume de tag-uri care nu corespund, sintaxă eronată a atributelor, atribute duplicate, caractere speciale nescapate și alte probleme de sintaxă." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Care este diferența între XML well-formed și valid?", a: "XML-ul well-formed este corect din punct de vedere sintactic (structură corectă a tag-urilor). XML-ul valid, în plus, corespunde unei scheme XSD/DTD. Acest instrument verifică well-formedness." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea XML-ului", description: "Lipește textul XML de verificat în câmpul de introducere." },
        { title: "2. Validare automată", description: "Validatorul verifică sintaxa în timp real cu ajutorul DOMParser." },
        { title: "3. Interpretarea rezultatului", description: "XML-ul well-formed primește indicație verde; XML-ul eronat apare cu indicație roșie și mesaj de eroare." },
        { title: "4. Corectarea erorii", description: "Corectează eroarea semnalată, iar verificarea rulează automat din nou." },
      ],
      useCases: [
        { icon: "🔌", title: "Integrare SOAP", description: "Verificarea sintaxei mesajelor SOAP XML înainte de apelul serviciului web." },
        { icon: "📱", title: "Layout Android", description: "Verificarea sintaxei fișierelor XML de layout Android înainte de build." },
        { icon: "📄", title: "Validare SVG", description: "Verificarea rapidă a sintaxei fișierelor SVG (care sunt bazate pe XML)." },
        { icon: "🏗️", title: "Configurare build", description: "Validarea Maven pom.xml și altor fișiere de configurare build." },
      ],
      aboutSection: {
        title: "Despre validarea XML",
        paragraphs: [
          "Validarea XML poate avea loc pe două niveluri. Primul nivel este well-formedness: XML-ul este corect din punct de vedere sintactic? Fiecare tag de deschidere are perechea de închidere, atributele sunt între ghilimele și nu există încrucișări de elemente.",
          "Al doilea nivel este validarea schemei: XML-ul corespunde unei scheme XSD (XML Schema Definition) sau DTD (Document Type Definition) predefinite? Acest instrument realizează verificarea de primul nivel, well-formedness.",
          "API-ul DOMParser încorporat al browserului oferă o modalitate fiabilă și rapidă de verificare a sintaxei XML. Dacă XML-ul este eronat, parser-ul returnează un element parsererror cu descrierea detaliată a erorii.",
        ],
      },
      tips: [
        { icon: "🏷️", tip: "Numele tag-urilor XML sunt case-sensitive: <Name> și <name> sunt două elemente diferite." },
        { icon: "⚠️", tip: "Atributele XML trebuie să fie întotdeauna între ghilimele (\" sau ') – spre deosebire de HTML, aceasta este obligatorie." },
        { icon: "🔤", tip: "Caracterele speciale (&, <, >, \", ') trebuie scrise întotdeauna ca entități XML: &amp;, &lt;, &gt;, &quot;, &apos;." },
        { icon: "🔍", tip: "Dacă mesajul de eroare indică sfârșitul fișierului, probabil unui element anterior îi lipsește tag-ul de închidere." },
      ],
    },
  },

  // ═══ 9. FORMATARE HTML ════════════════════════════════════════════════════
  "html-formazas": {
    introText:
      "Instrumentul de formatare HTML (beautify) face lizibil codul HTML compactat sau cu indentare greșită. Normalizează indentările, gestionează elementele void și uniformizează structura. Ideal pentru dezvoltatori și webmasteri care editează cod sursă HTML.",
    guide: [
      "1. Lipește codul HTML de formatat în câmpul de introducere.",
      "2. Selectează dimensiunea indentării (2 sau 4 spații).",
      "3. Apasă butonul «Formatare» pentru afișarea rezultatului.",
      "4. Copiază HTML-ul formatat sau descarcă-l ca fișier.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la formatarea codului HTML pentru lizibilitate: adaugă indentări și separări de rânduri consistente, făcând codul mai ușor de vizualizat și editat." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Cum gestionează elementele void?", a: "Elementele void (br, hr, img, input etc.) sunt gestionate corect – acestea nu au tag de închidere, iar formatorul nu adaugă unul inutil." },
      { q: "Modifică funcționarea HTML-ului?", a: "Nu, formatarea modifică exclusiv whitespace-ul și indentarea – structura HTML și randarea rămân neschimbate." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Formatează și CSS-ul și JavaScript-ul încorporat?", a: "Instrumentul normalizează în principal indentarea tag-urilor HTML. Conținutul blocurilor style și script încorporate este formatat la nivel de bază." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea HTML-ului", description: "Lipește codul HTML în câmpul de introducere sau trage un fișier .html." },
        { title: "2. Setarea indentării", description: "Selectează dimensiunea indentării dorite: 2 sau 4 spații." },
        { title: "3. Formatare", description: "Apasă butonul «Formatare» pentru înfrumusețarea HTML-ului." },
        { title: "4. Exportul rezultatului", description: "Copiază HTML-ul formatat sau descarcă-l ca fișier." },
      ],
      useCases: [
        { icon: "🌐", title: "Editarea paginilor web", description: "Transformarea codului sursă al paginilor web minificate sau cu indentare greșită în format lizibil înainte de editare." },
        { icon: "📧", title: "Template-uri email", description: "Formatarea template-urilor HTML pentru email, care sunt adesea generate cu cod foarte compactat." },
        { icon: "📋", title: "Code review", description: "Codul HTML formatat este mai ușor de verificat în procesul de code review." },
        { icon: "🎓", title: "Învățare", description: "La învățarea HTML, indentarea frumoasă ajută la înțelegerea ierarhiei de imbricare a tag-urilor." },
      ],
      aboutSection: {
        title: "Despre formatarea HTML",
        paragraphs: [
          "HTML (HyperText Markup Language) este limbajul de marcare fundamental al paginilor web. Formatarea (beautify) îmbunătățește lizibilitatea codului HTML prin adăugarea de indentări și separări de rânduri consistente, fără a modifica structura documentului sau randarea acestuia.",
          "La formatarea HTML trebuie acordată atenție specială elementelor void (img, br, hr, input, meta, link), care nu au tag de închidere, precum și tratamentului diferit al elementelor inline și block.",
          "Codul HTML bine formatat nu este doar mai lizibil, ci facilitează și mentenanța și lucrul în echipă. Indentarea consistentă ajută la identificarea rapidă a problemelor de structură și a tag-urilor de închidere lipsă.",
        ],
      },
      tips: [
        { icon: "📐", tip: "Indentarea cu 2 spații este cea mai răspândită convenție HTML – majoritatea editorilor și linter-elor o recomandă." },
        { icon: "🏷️", tip: "Elementele void (br, img, hr, input) nu au tag de închidere – nu adăuga unul inutil." },
        { icon: "💡", tip: "Folosește formatarea înainte de code review, astfel încât în diff să apară doar modificările esențiale." },
      ],
    },
  },

  // ═══ 10. MINIFICARE HTML ════════════════════════════════════════════════
  "html-minimalas": {
    introText:
      "Minificatorul HTML elimină whitespace-ul inutil, separările de rânduri și comentariile HTML din cod, reducând dimensiunea fișierului. Ideal pentru build-uri de producție, unde timpii de încărcare mai rapizi și utilizarea mai mică a lățimii de bandă sunt obiectivul.",
    guide: [
      "1. Lipește codul HTML în câmpul de introducere.",
      "2. Selectează opțiunile de minificare (ștergere comentarii, comprimare whitespace).",
      "3. Apasă butonul «Minificare».",
      "4. Verifică procentul de reducere a dimensiunii și copiază rezultatul.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la reducerea dimensiunii codului HTML: elimină whitespace-ul inutil, separările de rânduri și comentariile, accelerând încărcarea paginii." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Afectează aspectul paginii web?", a: "În majoritatea cazurilor, nu. Eliminarea whitespace-ului nu afectează randarea browserului, cu excepția cazului în care CSS-ul se bazează pe proprietatea pre/white-space." },
      { q: "Se șterg și comentariile condiționale?", a: "În timpul minificării, toate comentariile HTML sunt eliminate. Dacă ai nevoie de comentarii condiționale IE, folosește modul selectiv." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Cu cât se reduce dimensiunea fișierului?", a: "De obicei se obține o reducere de 10–30% cu minificarea HTML, în funcție de nivelul de formatare al codului și cantitatea de comentarii." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea HTML-ului", description: "Lipește codul HTML de minificat în câmpul de introducere." },
        { title: "2. Selectarea opțiunilor", description: "Alege dacă și comentariile și atributele inutile să fie șterse." },
        { title: "3. Minificare", description: "Apasă butonul «Minificare» pentru reducerea dimensiunii." },
        { title: "4. Exportul rezultatului", description: "Verifică procentul de reducere și copiază sau descarcă rezultatul." },
      ],
      useCases: [
        { icon: "🚀", title: "Build de producție", description: "Optimizarea dimensiunii fișierelor HTML pe site-ul web în producție pentru timpi de încărcare mai rapizi." },
        { icon: "📈", title: "Îmbunătățirea Core Web Vitals", description: "Fișier HTML mai mic = valori mai rapide First Contentful Paint și Largest Contentful Paint." },
        { icon: "📧", title: "Comprimarea HTML-ului email", description: "Reducerea dimensiunii template-urilor HTML pentru email, unde limita de dimensiune este un criteriu important." },
        { icon: "⚡", title: "Optimizare CDN", description: "HTML-ul minificat necesită mai puțin spațiu CDN și mai puțină lățime de bandă." },
      ],
      aboutSection: {
        title: "Despre minificarea HTML",
        paragraphs: [
          "Minificarea HTML înseamnă reducerea dimensiunii codului sursă HTML prin eliminarea whitespace-ului inutil, separărilor de rânduri, indentărilor și comentariilor. Rezultatul este un document funcțional identic, pe care browserul îl randează exact la fel.",
          "Minificarea HTML face parte din optimizarea performanței frontend. Combinată cu minificarea CSS și JavaScript, se poate obține o îmbunătățire semnificativă a timpului de încărcare a paginii, ceea ce influențează direct experiența utilizatorului și optimizarea pentru motoarele de căutare.",
          "Este important de menționat că minificarea nu este compresie. Combinată cu compresia gzip sau brotli pe server, se obține cea mai mare eficiență: minificarea elimină caracterele inutile, iar compresia codifică mai eficient modelele repetitive.",
        ],
      },
      tips: [
        { icon: "📊", tip: "Combină minificarea HTML cu minificarea CSS și JS pentru îmbunătățirea maximă a performanței." },
        { icon: "⚠️", tip: "Verifică HTML-ul minificat – anumite trucuri CSS cu white-space se bazează pe whitespace-ul inline." },
        { icon: "🔄", tip: "HTML-ul minificat poate fi oricând reformatat cu instrumentul de formatare HTML (beautify)." },
      ],
    },
  },

  // ═══ 11. FORMATARE CSS ════════════════════════════════════════════════════
  "css-formazas": {
    introText:
      "Instrumentul de formatare CSS (beautify) face lizibil codul CSS compactat sau cu indentare greșită. Normalizează indentările, separă selectorii și proprietățile, asigurând un stil consistent. Ideal pentru dezvoltatori care editează sau revizuiesc cod CSS.",
    guide: [
      "1. Lipește codul CSS în câmpul de introducere.",
      "2. Selectează dimensiunea indentării (2 sau 4 spații).",
      "3. Apasă butonul «Formatare».",
      "4. Copiază CSS-ul formatat sau descarcă-l ca fișier .css.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la formatarea codului CSS compactat sau cu indentare greșită: asigură separare pe rânduri per proprietate, indentare consistentă și separarea selectorilor." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Ordonează proprietățile CSS alfabetic?", a: "Opțional. Poți alege să păstreze ordinea originală sau să aranjeze declarațiile în ordine alfabetică." },
      { q: "Gestionează media queries și nesting?", a: "Da, formatorul gestionează corect blocurile @media, @keyframes, @supports și alte at-rule, precum și sintaxa CSS nesting." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Modifică funcționarea CSS-ului?", a: "Nu. Formatarea adaugă exclusiv whitespace și separări de rânduri – regulile CSS și efectul lor rămân neschimbate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea CSS-ului", description: "Lipește codul CSS în câmpul de introducere sau trage un fișier .css." },
        { title: "2. Setări de formatare", description: "Selectează dimensiunea indentării și ordonarea opțională a proprietăților." },
        { title: "3. Formatare", description: "Apasă butonul «Formatare» pentru înfrumusețarea CSS-ului." },
        { title: "4. Exportul rezultatului", description: "Copiază CSS-ul formatat sau descarcă-l ca fișier." },
      ],
      useCases: [
        { icon: "🎨", title: "Editare CSS", description: "Transformarea CSS-ului minificat în format lizibil înainte de editare și modificare." },
        { icon: "📋", title: "Code review", description: "Codul CSS formatat consistent este mai ușor de vizualizat și revizuit." },
        { icon: "🔍", title: "Depanare", description: "Este greu să cauți erori în CSS-ul compactat – formatarea face acest lucru mult mai ușor." },
        { icon: "📝", title: "Documentație", description: "Poți crea fragmente de cod CSS frumoase și lizibile pentru documentație și tutoriale." },
      ],
      aboutSection: {
        title: "Despre formatarea CSS",
        paragraphs: [
          "CSS (Cascading Style Sheets) este limbajul de stiluri care definește aspectul vizual al paginilor web. Formatarea CSS servește la îmbunătățirea lizibilității: fiecare proprietate este pusă pe un rând separat, selectorii sunt clar separați, iar indentarea reflectă ierarhia regulilor.",
          "CSS-ul bine formatat nu este doar mai lizibil, ci facilitează și mentenanța. Este mai ușor să găsești proprietățile aparținând unui selector, să recunoști regulile duplicate și problemele de specificitate.",
          "CSS-ul modern devine din ce în ce mai complex: custom properties (variabile CSS), nesting, container queries și alte funcționalități au crescut importanța formatării. Stilul consistent ajută la vizualizarea foilor de stil complexe.",
        ],
      },
      tips: [
        { icon: "📐", tip: "Indentarea cu 2 spații este cea mai răspândită convenție CSS, dar și 4 spații este populară." },
        { icon: "🔑", tip: "Merită să ordonezi proprietățile alfabetic – aceasta facilitează găsirea unei proprietăți specifice." },
        { icon: "💡", tip: "După formatare, folosește un linter CSS (de ex. Stylelint) pentru verificarea respectării celor mai bune practici." },
      ],
    },
  },

  // ═══ 12. MINIFICARE CSS ═════════════════════════════════════════════════
  "css-minimalas": {
    introText:
      "Minificatorul CSS elimină whitespace-ul inutil, separările de rânduri și comentariile din codul CSS, minimizând dimensiunea fișierului. Un instrument esențial pentru optimizarea performanței frontend, care produce încărcare mai rapidă a paginilor și utilizare mai mică a lățimii de bandă.",
    guide: [
      "1. Lipește codul CSS în câmpul de introducere.",
      "2. Apasă butonul «Minificare».",
      "3. Verifică procentul de reducere a dimensiunii.",
      "4. Copiază CSS-ul minificat sau descarcă-l ca fișier.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la reducerea dimensiunii fișierelor CSS: elimină comentariile, whitespace-ul și separările de rânduri inutile, rezultând o dimensiune mai mică a fișierului." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Afectează aspectul paginii web?", a: "Nu. Minificarea elimină exclusiv whitespace-ul și comentariile – regulile CSS și efectul lor sunt exact identice cu originalul." },
      { q: "Cu cât va fi mai mic CSS-ul?", a: "De obicei se obține o reducere de 20–40%, în funcție de nivelul de formatare al codului și cantitatea de comentarii." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Poate fi reconvertit CSS-ul minificat?", a: "Da, cu instrumentul nostru de formatare CSS (beautify) poți oricând să-l reconvertești într-un format lizibil." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea CSS-ului", description: "Lipește codul CSS în câmpul de introducere sau trage un fișier .css." },
        { title: "2. Minificare", description: "Apasă butonul «Minificare» pentru eliminarea whitespace-ului și comentariilor." },
        { title: "3. Verificarea dimensiunii", description: "Verifică diferența dintre dimensiunea originală și cea minificată." },
        { title: "4. Exportul rezultatului", description: "Copiază CSS-ul minificat sau descarcă-l ca fișier .css." },
      ],
      useCases: [
        { icon: "🚀", title: "Deploy în producție", description: "Minimizarea dimensiunii fișierelor CSS pe site-ul web în producție pentru încărcare mai rapidă." },
        { icon: "📈", title: "Core Web Vitals", description: "CSS mai mic = First Contentful Paint mai rapid, valori LCP și CLS mai bune." },
        { icon: "📱", title: "Optimizare mobilă", description: "Pe rețeaua mobilă, un fișier CSS mai mic produce o încărcare observabil mai rapidă." },
        { icon: "⚡", title: "Build pipeline", description: "Minificarea CSS poate fi automatizată în procesul de build (Webpack, Vite, Rollup)." },
      ],
      aboutSection: {
        title: "Despre minificarea CSS",
        paragraphs: [
          "Minificarea CSS înseamnă reducerea dimensiunii fișierelor de stiluri prin eliminarea whitespace-ului inutil, separărilor de rânduri, indentărilor și comentariilor. Rezultatul este o foaie de stil funcțional identică, pe care browserul o interpretează la fel.",
          "Minificarea CSS este unul dintre pașii fundamentali ai optimizării performanței frontend. Combinată cu minificarea HTML și JavaScript, precum și cu compresia gzip/brotli, se poate obține o îmbunătățire semnificativă a timpului de încărcare.",
          "Instrumentele moderne de build (Webpack, Vite, Rollup) minifică automat CSS-ul la build-ul de producție. Acest instrument online este util când vrei să minifici rapid un fragment CSS fără a configura un build pipeline.",
        ],
      },
      tips: [
        { icon: "🗜️", tip: "Prin combinarea minificării CSS cu compresia gzip/brotli se poate obține o reducere de 80–90% a dimensiunii." },
        { icon: "📊", tip: "Verifică procentul de reducere – dacă este minim, CSS-ul era deja compactat." },
        { icon: "🔄", tip: "Păstrează întotdeauna CSS-ul original formatat în sistemul de versionare – versiunea minificată să fie produsă de build pipeline." },
      ],
    },
  },

  // ═══ 13. FORMATARE JAVASCRIPT ═════════════════════════════════════════════
  "js-formazas": {
    introText:
      "Instrumentul de formatare JavaScript (beautify) face lizibil codul JavaScript compactat sau cu indentare greșită. Normalizează indentările, separările de rânduri și structurile la nivel de bloc. Ideal pentru decompilarea codului minificat, code review și depanare.",
    guide: [
      "1. Lipește codul JavaScript în câmpul de introducere.",
      "2. Selectează dimensiunea indentării (2 sau 4 spații).",
      "3. Apasă butonul «Formatare» pentru afișarea rezultatului.",
      "4. Copiază codul JS formatat sau descarcă-l ca fișier.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la formatarea codului JavaScript compactat sau cu indentare greșită: asigură indentare consistentă, separări de rânduri și aranjament la nivel de bloc." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Gestionează sintaxa JavaScript modernă?", a: "Da, instrumentul gestionează și sintaxa modernă ES6+: arrow function, template literal, destructuring, async/await și alte elemente moderne ale limbajului." },
      { q: "Formatează și cod TypeScript?", a: "Instrumentul este optimizat în principal pentru JavaScript. Sintaxa specifică TypeScript (adnotări de tip, interface) este gestionată la nivel de bază." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Modifică funcționarea codului?", a: "Nu. Formatarea modifică exclusiv whitespace-ul – logica și funcționarea codului rămân complet neschimbate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea JavaScript-ului", description: "Lipește codul JavaScript în câmpul de introducere sau trage un fișier .js." },
        { title: "2. Setări de formatare", description: "Selectează dimensiunea indentării: 2 spații, 4 spații sau tab." },
        { title: "3. Formatare", description: "Apasă butonul «Formatare» pentru înfrumusețarea codului." },
        { title: "4. Exportul rezultatului", description: "Copiază JS-ul formatat sau descarcă-l ca fișier." },
      ],
      useCases: [
        { icon: "🔍", title: "Decompilarea codului minificat", description: "Transformarea codului JavaScript minificat din producție în format lizibil pentru depanare sau analiză." },
        { icon: "📋", title: "Code review", description: "Codul formatat consistent este mai ușor de vizualizat și revizuit." },
        { icon: "🐛", title: "Depanare", description: "Este aproape imposibil să cauți erori în cod compactat – formatarea este un pas esențial." },
        { icon: "🎓", title: "Învățare", description: "La învățarea JavaScript, indentarea frumoasă ajută la înțelegerea structurii programului și a fluxului de control." },
      ],
      aboutSection: {
        title: "Despre formatarea JavaScript",
        paragraphs: [
          "JavaScript este cel mai important limbaj de programare al web-ului. Formatarea (beautify) îmbunătățește lizibilitatea codului: fiecare instrucțiune este pusă pe un rând separat, indentarea blocurilor ({...}) este consistentă, iar unitățile logice sunt clar separate.",
          "În ecosistemul JavaScript modern, Prettier și ESLint asigură formatarea automată în timpul dezvoltării. Acest instrument online este util când vrei să formatezi rapid un fragment de cod fără configurarea unui build pipeline sau editor.",
          "Codul bine formatat nu este doar mai lizibil, ci facilitează și depanarea. Indentarea consistentă face vizibilă imediat structura blocurilor, ramificările condiționale și buclele.",
        ],
      },
      tips: [
        { icon: "📐", tip: "Indentarea cu 2 spații este cea mai răspândită convenție JavaScript (Google, Airbnb style guide)." },
        { icon: "💡", tip: "La codul minificat din producție, formatarea este primul pas pentru reverse engineering." },
        { icon: "🔧", tip: "Pentru proiecte pe termen lung, merită să configurezi Prettier pentru formatare automată." },
      ],
    },
  },

  // ═══ 14. MINIFICARE JAVASCRIPT ══════════════════════════════════════════
  "js-minimalas": {
    introText:
      "Minificatorul JavaScript elimină whitespace-ul inutil, separările de rânduri și comentariile din codul JavaScript. Unul dintre cei mai importanți pași ai build-ului de producție, care reduce semnificativ dimensiunea fișierului și accelerează încărcarea paginii.",
    guide: [
      "1. Lipește codul JavaScript în câmpul de introducere.",
      "2. Apasă butonul «Minificare».",
      "3. Verifică procentul de reducere a dimensiunii.",
      "4. Copiază codul minificat sau descarcă-l ca fișier .js.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la reducerea dimensiunii codului JavaScript: elimină comentariile, whitespace-ul și separările de rânduri, asigurând o dimensiune mai mică pentru mediul de producție." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Realizează redenumirea variabilelor (mangling)?", a: "Acest instrument realizează eliminarea whitespace-ului și comentariilor. Pentru redenumirea variabilelor (mangling) și eliminarea codului mort, este nevoie de un instrument de build dedicat (Terser, esbuild)." },
      { q: "Modifică funcționarea codului?", a: "Nu. Eliminarea whitespace-ului și comentariilor nu afectează comportamentul de execuție al JavaScript-ului – codul funcționează exact la fel." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Cu cât se reduce dimensiunea fișierului?", a: "Eliminarea whitespace-ului și comentariilor produce de obicei o reducere de 20–50%. Cu redenumirea variabilelor (mangling), aceasta poate ajunge la 60–70%." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea JavaScript-ului", description: "Lipește codul JavaScript în câmpul de introducere sau trage un fișier .js." },
        { title: "2. Minificare", description: "Apasă butonul «Minificare» pentru eliminarea whitespace-ului și comentariilor." },
        { title: "3. Verificarea dimensiunii", description: "Verifică diferența procentuală între dimensiunea originală și cea minificată." },
        { title: "4. Exportul rezultatului", description: "Copiază codul minificat sau descarcă-l ca fișier .js." },
      ],
      useCases: [
        { icon: "🚀", title: "Build de producție", description: "Minimizarea dimensiunii fișierelor JavaScript pe site-ul web în producție." },
        { icon: "📈", title: "Optimizarea performanței", description: "Fișier JS mai mic = încărcare mai rapidă, valori Core Web Vitals mai bune și experiență de utilizare îmbunătățită." },
        { icon: "📱", title: "Optimizare mobilă", description: "Pe rețeaua mobilă, fiecare kilobyte contează – JS-ul minificat se încarcă observabil mai rapid." },
        { icon: "💰", title: "Reducerea costurilor CDN", description: "Dimensiunea mai mică a fișierului înseamnă mai puțin trafic CDN, ceea ce produce economii de costuri." },
      ],
      aboutSection: {
        title: "Despre minificarea JavaScript",
        paragraphs: [
          "Minificarea JavaScript înseamnă reducerea dimensiunii codului sursă prin eliminarea caracterelor inutile. Aceasta include caracterele whitespace, separările de rânduri, indentările și comentariile, care ajută dezvoltarea dar nu sunt necesare la execuție.",
          "Minificarea are mai multe niveluri: pe lângă nivelul de bază (eliminarea whitespace-ului/comentariilor), instrumentele avansate realizează și redenumirea variabilelor (mangling), eliminarea codului mort și scope hoisting. Acest instrument online oferă minificarea la nivel de bază.",
          "Minificarea JavaScript este unul dintre cei mai importanți pași de optimizare a performanței în dezvoltarea web modernă. Webpack, Vite și alte instrumente de build o realizează automat la build-ul de producție, dar pentru minificare ad-hoc, acest instrument online este o alegere excelentă.",
        ],
      },
      tips: [
        { icon: "🗜️", tip: "Prin combinarea minificării cu compresia gzip/brotli se poate obține o reducere de 85–95% a dimensiunii." },
        { icon: "📋", tip: "Păstrează întotdeauna codul original formatat – versiunea minificată este greu de citit și editat." },
        { icon: "🔧", tip: "Pentru proiecte mai serioase, folosește Terser sau esbuild, care realizează și redenumirea variabilelor." },
      ],
    },
  },

  // ═══ 15. CODIFICATOR/DECODIFICATOR BASE64 ══════════════════════════════
  "base64-kodolo-dekodolo": {
    introText:
      "Instrumentul de codificare și decodificare Base64 îți permite codificarea textelor în format Base64 și reconversia lor. Funcționează în timp real cu suport complet UTF-8. Util pentru dezvoltatori în gestionarea token-urilor API, atașamentelor de email și a data URI-urilor.",
    guide: [
      "1. Selectează operația: codificare (encode) sau decodificare (decode).",
      "2. Lipește textul sau string-ul Base64 în câmpul de introducere.",
      "3. Rezultatul apare în timp real în câmpul de ieșire.",
      "4. Copiază rezultatul în clipboard cu un singur clic.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la codificarea textelor în format Base64 și reconversia string-urilor Base64 (decodificare) – util pentru API-uri, email-uri și transfer de date." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Base64 este criptare?", a: "Nu! Base64 este codificare, nu criptare. Oricine poate reconverti textul original. Pentru protecția datelor sensibile, folosește criptare (de ex. AES)." },
      { q: "Suportă caractere românești cu diacritice?", a: "Da, instrumentul are suport complet UTF-8, astfel încât caracterele românești cu diacritice (ă, â, î, ș, ț) sunt codificate și decodificate corect." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "De ce crește dimensiunea după codificarea Base64?", a: "Codificarea Base64 mărește datele originale cu aproximativ 33%, deoarece mapează 3 bytes de intrare pe 4 caractere ASCII. Acesta este prețul reprezentării datelor binare în formă textuală." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea operației", description: "Alege dacă dorești să codifici (encode) sau să decodifici (decode)." },
        { title: "2. Lipirea textului", description: "Lipește textul original (pentru codificare) sau string-ul Base64 (pentru decodificare)." },
        { title: "3. Rezultat în timp real", description: "Rezultatul apare imediat pe măsură ce tastezi, în câmpul de ieșire." },
        { title: "4. Copiere", description: "Copiază rezultatul în clipboard cu un singur clic." },
      ],
      useCases: [
        { icon: "🔑", title: "Autentificare API", description: "Codificarea Base64 a header-elor HTTP Basic Authentication (în format username:password)." },
        { icon: "🖼️", title: "Data URI", description: "Încorporarea imaginilor mici ca data URI Base64 în HTML sau CSS." },
        { icon: "📧", title: "Atașamente email", description: "În atașamentele de email, codificarea MIME Base64 este formatul standard de transfer." },
        { icon: "🔧", title: "Token-uri JWT", description: "Decodificarea payload-ului JWT (JSON Web Token), care este codificat în format Base64url." },
      ],
      formatComparison: {
        title: "Comparație Base64 vs URL encoding vs HTML entity",
        columns: ["Proprietate", "Base64", "URL encoding", "HTML entity"],
        rows: [
          { feature: "Scop", values: ["Binar → text", "Caractere URL-safe", "Caractere HTML-safe"] },
          { feature: "Modificare dimensiune", values: ["+33%", "Variabil (+)", "Variabil (+)"] },
          { feature: "Utilizare", values: ["Email, JWT, data URI", "Parametri URL", "Conținut HTML"] },
          { feature: "Reversibil", values: ["Da", "Da", "Da"] },
          { feature: "Criptare", values: ["Nu", "Nu", "Nu"] },
        ],
      },
      aboutSection: {
        title: "Despre codificarea Base64",
        paragraphs: [
          "Base64 este o schemă de codificare binar-text care reprezintă datele binare în formă textuală folosind 64 de caractere ASCII. Caracterele utilizate sunt: A–Z, a–z, 0–9, + și /, completate de caracterul de padding =.",
          "Scopul inițial al codificării Base64 a fost de a transmite date binare (imagini, fișiere) prin protocoale textuale (email, HTTP). Este utilizată pe scară largă și astăzi: token-urile JWT, HTTP Basic Auth, data URI-urile și atașamentele email MIME folosesc toate Base64.",
          "Este important de înțeles că Base64 nu este nici criptare, nici compresie: datele originale pot fi reconvertite de oricine, iar output-ul este cu aproximativ 33% mai mare decât originalul. Pentru protecția datelor sensibile, folosește întotdeauna criptare.",
        ],
      },
      tips: [
        { icon: "⚠️", tip: "Base64 NU este criptare – nu-l folosi pentru protecția parolelor sau datelor sensibile." },
        { icon: "📏", tip: "Output-ul Base64 este cu aproximativ 33% mai mare decât originalul – aceasta este o comportare normală și așteptată." },
        { icon: "🔗", tip: "Pentru Base64 folosit în URL-uri, aplică varianta Base64url: - în loc de + și _ în loc de /." },
        { icon: "💡", tip: "Pentru imagini mici (< 1-2 KB), data URI Base64 poate fi mai eficient decât o cerere HTTP separată." },
      ],
    },
  },

  // ═══ 16. CODIFICATOR/DECODIFICATOR URL ═════════════════════════════════
  "url-kodolo-dekodolo": {
    introText:
      "Instrumentul de codificare și decodificare URL îți permite codificarea textelor în format URL-safe (percent encoding) și reconversia lor. Poți alege între modurile encodeURIComponent și encodeURI. Ideal pentru gestionarea parametrilor URL, query string-urilor și apelurilor API.",
    guide: [
      "1. Selectează operația: codificare (encode) sau decodificare (decode).",
      "2. Selectează modul: encodeURIComponent (parametru) sau encodeURI (URL complet).",
      "3. Lipește textul în câmpul de introducere.",
      "4. Rezultatul apare în timp real – copiază-l cu un singur clic.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la codificarea caracterelor speciale din URL-uri în format percent encoding (%XX) și la reconversia lor – esențial pentru gestionarea corectă a parametrilor URL." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Care este diferența între encodeURI și encodeURIComponent?", a: "encodeURI codifică URL-ul complet, dar păstrează caracterele de structură URL (://?#). encodeURIComponent codifică totul și este destinat valorilor parametrilor URL." },
      { q: "Gestionează caracterele românești cu diacritice?", a: "Da, caracterele cu diacritice (ă, â, î, ș, ț etc.) sunt codificate ca secvențe de bytes UTF-8 în format percent encoding, de ex. ă → %C4%83." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "De ce este necesară codificarea URL?", a: "Standardul URL permite doar anumite caractere ASCII. Caracterele speciale (&, =, ?, spațiu, diacritice) fără codificare produc URL-uri eronate sau sunt interpretate greșit." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea operației și modului", description: "Alege operația de codificare/decodificare și modul encodeURI/encodeURIComponent." },
        { title: "2. Lipirea textului", description: "Lipește textul de codificat sau string-ul URL-encoded de decodificat." },
        { title: "3. Rezultat în timp real", description: "Rezultatul apare imediat pe măsură ce tastezi." },
        { title: "4. Copiere", description: "Copiază rezultatul cu un singur clic." },
      ],
      useCases: [
        { icon: "🔗", title: "Parametri URL", description: "Codificarea corectă a parametrilor query string, astfel încât caracterele speciale să nu perturbe structura URL-ului." },
        { icon: "🔌", title: "Apeluri API", description: "Codificarea parametrilor URL ai endpoint-urilor API REST pentru asigurarea transferului corect al datelor." },
        { icon: "🔍", title: "Interogări de căutare", description: "Codificarea URL a interogărilor de căutare pentru transmiterea corectă în URL-urile motoarelor de căutare." },
        { icon: "🐛", title: "Depanare", description: "Decodificarea string-urilor URL-encoded pentru citirea textului original în timpul depanării." },
      ],
      aboutSection: {
        title: "Despre codificarea URL (percent encoding)",
        paragraphs: [
          "Codificarea URL (percent encoding) conform standardului RFC 3986 reprezintă caracterele non-ASCII și speciale în format %XX, unde XX este valoarea hexadecimală a byte-ilor UTF-8 ai caracterului. De exemplu, spațiul este %20, iar semnul & este %26.",
          "JavaScript oferă două funcții încorporate pentru codificarea URL: encodeURI() servește la codificarea URL-ului complet (păstrează caracterele ://?#&=), în timp ce encodeURIComponent() este ideală pentru codificarea valorii unui singur parametru URL (codifică totul).",
          "Codificarea URL este esențială pentru funcționarea corectă a web-ului: fără ea, caracterele speciale (de ex. & sau = într-o valoare de parametru) ar fi interpretate greșit și ar perturba structura URL-ului.",
        ],
      },
      tips: [
        { icon: "🔑", tip: "Pentru valorile parametrilor URL, folosește întotdeauna encodeURIComponent, nu encodeURI." },
        { icon: "💡", tip: "Spațiul în URL este %20 (encodeURIComponent) sau + (form data) – cunoaște diferența." },
        { icon: "⚠️", tip: "Nu codifica niciodată dublu: dacă textul este deja codificat, nu-l codifica din nou înainte de decodificare." },
        { icon: "🌐", tip: "Browserele moderne codifică automat caracterele cu diacritice în URL, dar la apelurile API merită să codifici explicit." },
      ],
    },
  },

  // ═══ 17. CODIFICATOR/DECODIFICATOR HTML ENTITY ═════════════════════════
  "html-entity-kodolo-dekodolo": {
    introText:
      "Instrumentul de codificare și decodificare HTML entity îți permite codificarea caracterelor speciale HTML (&, <, >, \", ') în formă de entitate și reconversia lor. Esențial pentru prevenirea atacurilor XSS și afișarea corectă a conținutului HTML.",
    guide: [
      "1. Selectează operația: codificare (escape) sau decodificare (unescape).",
      "2. Lipește textul în câmpul de introducere.",
      "3. Rezultatul apare în timp real în câmpul de ieșire.",
      "4. Copiază rezultatul cu un singur clic.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la codificarea caracterelor speciale HTML (< > & \" ') în formă de entitate și la reconversia lor – esențial pentru afișarea sigură a conținutului HTML." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da. Întreaga procesare are loc în browserul tău, niciun fel de date nu sunt trimise către un server." },
      { q: "Ce caractere codifică?", a: "Entitățile HTML de bază: & → &amp;, < → &lt;, > → &gt;, \" → &quot;, ' → &#39;. Opțional, toate caracterele non-ASCII pot fi codificate ca entități numerice." },
      { q: "De ce este importantă codificarea HTML entity?", a: "Pentru prevenirea atacurilor XSS (Cross-Site Scripting): dacă codifici input-ul utilizatorului ca entitate, codul HTML/JS inserat nu se execută, ci apare ca text." },
      { q: "Pot să-l folosesc pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern." },
      { q: "Care este diferența între entitățile named și numeric?", a: "Entitatea named este mai lizibilă (&amp;, &lt;), entitatea numerică este mai universală (&#38;, &#60;). Ambele produc același rezultat în browser." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea operației", description: "Alege operația de codificare (escape) sau decodificare (unescape)." },
        { title: "2. Lipirea textului", description: "Lipește textul HTML de codificat sau string-ul care conține entități." },
        { title: "3. Rezultat în timp real", description: "Rezultatul apare imediat pe măsură ce tastezi." },
        { title: "4. Copiere", description: "Copiază rezultatul în clipboard cu un singur clic." },
      ],
      useCases: [
        { icon: "🛡️", title: "Protecție XSS", description: "Codificarea HTML entity a input-ului utilizatorului pentru prevenirea atacurilor Cross-Site Scripting." },
        { icon: "📝", title: "Exemple de cod în HTML", description: "Afișarea fragmentelor de cod HTML pe pagina web: caracterele < și > apar ca entitate, nu ca tag-uri HTML." },
        { icon: "📧", title: "Ascunderea adresei email", description: "Ascunderea adreselor de email în formă de HTML entity pe pagina web împotriva boturilor de spam." },
        { icon: "🔧", title: "Conținut CMS", description: "Afișarea corectă a caracterelor speciale în WordPress, Joomla și alte sisteme CMS prin codificarea cu entități." },
      ],
      formatComparison: {
        title: "Comparație Base64 vs URL encoding vs HTML entity",
        columns: ["Proprietate", "HTML entity", "URL encoding", "Base64"],
        rows: [
          { feature: "Scop", values: ["Caractere HTML-safe", "Caractere URL-safe", "Binar → text"] },
          { feature: "Format", values: ["&amp; sau &#38;", "%26", "String Base64"] },
          { feature: "Utilizare", values: ["Conținut HTML", "Parametri URL", "Email, JWT, data URI"] },
          { feature: "Securitate", values: ["Protecție XSS", "Protecție URL injection", "Nu are scop de securitate"] },
          { feature: "Reversibil", values: ["Da", "Da", "Da"] },
        ],
      },
      aboutSection: {
        title: "Despre codificarea HTML entity",
        paragraphs: [
          "Codificarea HTML entity înseamnă înlocuirea caracterelor cu semnificație specială în HTML cu referințe de entitate. Cele cinci caractere de bază: & (ampersand), < (mai mic), > (mai mare), \" (ghilimele) și ' (apostrof) – fără entitate, acestea ar perturba parser-ul HTML.",
          "Există două tipuri de entități: entitatea named (de ex. &amp;, &lt;, &copy;) și entitatea numerică (de ex. &#38;, &#60;, &#169;). Entitățile named sunt mai lizibile, dar nu toate caracterele au varianta named – entitatea numerică este mai universală.",
          "Codificarea HTML entity este una dintre cele mai importante practici de securitate în dezvoltarea web. Fără codificarea cu entități a input-ului utilizatorului, atacurile XSS (Cross-Site Scripting) ar permite executarea de cod JavaScript malițios pe pagina web.",
        ],
      },
      tips: [
        { icon: "🛡️", tip: "Codifică întotdeauna input-ul utilizatorului ca HTML entity înainte de afișare – aceasta este baza protecției XSS." },
        { icon: "📝", tip: "La exemplele de cod HTML, scrie întotdeauna caracterele < și > în formă &lt; și &gt;." },
        { icon: "💡", tip: "Entitățile named sunt mai lizibile (&amp;), dar entitățile numerice (&#38;) sunt suportate mai universal." },
        { icon: "⚠️", tip: "Nu confunda codificarea HTML entity cu codificarea URL – servesc scopuri diferite." },
      ],
    },
  },

  // ═══ FÁZIS 8 (a): GENERATOR COD DE BARE ═══════════════════════════════════
  "generator-cod-bare": {
    introText:
      "Generator de coduri de bare online care suportă cele mai utilizate 4 standarde: EAN-13 (retail european), CODE-128 (universal), UPC-A (retail SUA/Canada) și ITF-14 (unități logistice). Validare automată a cifrei de control (modulo-10), export SVG vectorial sau PNG raster, totul în browser fără server.",
    guide: [
      "1. Selectează formatul potrivit (EAN-13 pentru retail RO, CODE-128 pentru intern, ITF-14 pentru cartoane).",
      "2. Introdu valoarea — pentru EAN-13/UPC-A/ITF-14 se poate omite ultima cifră (control), care se calculează automat.",
      "3. Verifică previzualizarea live și statusul de validare (lungime, format, cifră de control).",
      "4. Personalizează grosimea liniei, înălțimea, culorile (opțional, în meniul avansat).",
      "5. Descarcă rezultatul ca SVG (recomandat pentru tipar) sau PNG (pentru web și aplicații).",
    ],
    faq: [
      { q: "Care este diferența între EAN-13 și UPC-A?", a: "EAN-13 (European Article Number) are 13 cifre și este standardul retail în Europa (inclusiv România). UPC-A (Universal Product Code) are 12 cifre și se folosește în SUA și Canada. Cele două sunt compatibile la scanare — un EAN-13 cu prefix 0 este echivalent cu un UPC-A." },
      { q: "Ce este CODE-128 și când se folosește?", a: "CODE-128 este un standard alfanumeric foarte compact, capabil să codeze toate cele 128 caractere ASCII (litere, cifre, simboluri). Se folosește în logistică, depozite, etichete interne și aplicații unde valoarea nu este un cod GS1 standardizat." },
      { q: "Cum se calculează cifra de control EAN-13?", a: "Se aplică o sumă ponderată modulo 10: cifrele de pe poziții impare (de la dreapta, fără cifra de control) se înmulțesc cu 1, cele pare cu 3. Suma totală se modulo 10, iar diferența până la 10 dă cifra de control. Algoritmul e identic pentru UPC-A (11+1) și ITF-14 (13+1)." },
      { q: "La ce folosește ITF-14?", a: "ITF-14 (Interleaved 2 of 5, 14 cifre) se folosește pentru ambalaje secundare și terțiare — cartoane comerciale, bax-uri, paleți. Codifică Global Trade Item Number (GTIN-14) și se tipărește direct pe carton fără hârtie albă suplimentară." },
      { q: "Ce este standardul GS1?", a: "GS1 este organizația globală non-profit care administrează standardele de identificare a produselor (EAN, UPC, GTIN, GLN, SSCC). Pentru a vinde un produs cu cod EAN/UPC unic la nivel mondial, e necesar un prefix companie alocat de GS1 din țara respectivă (în România: GS1 Romania, gs1ro.org)." },
      { q: "Pot folosi codurile generate aici pentru produse comerciale?", a: "Pentru uz personal, prototipare, testare sau coduri interne răspunsul este da. Pentru distribuție comercială cu produse fizice (în supermarketuri, online retail) e nevoie de licențierea oficială GS1, care îți alocă un prefix companie unic — astfel codurile tale nu se vor suprapune cu ale altor producători." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege formatul", description: "EAN-13 pentru retail RO, CODE-128 pentru intern, UPC-A pentru export SUA, ITF-14 pentru cartoane." },
        { title: "2. Introdu valoarea", description: "Pentru EAN-13/UPC-A/ITF-14 poți omite cifra de control — calculatorul o adaugă automat." },
        { title: "3. Verifică validarea", description: "Statusul live arată lungimea, validitatea și cifra de control calculată." },
        { title: "4. Personalizează vizualul", description: "Grosime linii, înălțime, culori — în meniul avansat." },
        { title: "5. Descarcă", description: "SVG vectorial pentru tipar profesional sau PNG pentru web și aplicații." },
      ],
      useCases: [
        { icon: "🏷️", title: "Etichete pentru depozit",      description: "Generează rapid coduri CODE-128 pentru rafturi, bin-uri, articole interne — fără licență GS1." },
        { icon: "📦", title: "Cartoane comerciale (ITF-14)",   description: "Codifică GTIN-14 direct pe ambalajul secundar pentru aprovizionare retail." },
        { icon: "🛒", title: "Prototipare produse retail",     description: "Testează design-ul de etichetă cu EAN-13/UPC-A înainte de comanda finală la tipografie." },
        { icon: "🧾", title: "Bonuri și facturi",              description: "Adaugă coduri CODE-128 pentru numere de bon scanabile cu cititor." },
      ],
      aboutSection: {
        title: "Despre standardele GS1 și verificarea cifrei de control",
        paragraphs: [
          "Standardele EAN/UPC/ITF (numite în GS1 GTIN — Global Trade Item Number) folosesc o cifră de control calculată cu o sumă ponderată modulo 10. Această cifră protejează împotriva erorilor de transcriere — dacă un singur digit este greșit la introducere manuală, suma de control nu mai dă 0 modulo 10, iar codul e respins.",
          "EAN-13 are 13 cifre: 3 (prefix țară/regiune) + 9 (cod articol) + 1 (control). Prefixele 590-599 sunt alocate Poloniei, 594 României. UPC-A are 12 cifre: 11 (cod articol) + 1 (control), fără prefix de țară explicit.",
          "ITF-14 (Interleaved 2 of 5) codifică 14 cifre prin alternarea benzilor late și înguste, fiind extrem de tolerant la imprimare directă pe carton ondulat — motivul pentru care e standardul logistic universal.",
        ],
      },
      tips: [
        { icon: "✅", tip: "Pentru EAN-13/UPC-A/ITF-14 introdu doar cifrele fără ultima — calculatorul completează cifra de control automat." },
        { icon: "🖨️", tip: "Pentru tipar pe ambalaj, exportă SVG — scalabil fără pierdere la orice dimensiune." },
        { icon: "📐", tip: "Înălțimea standard pentru EAN-13 este ~25-30 mm la 100% scale; păstrează rapoartele pentru scanare optimă." },
        { icon: "🌐", tip: "Pentru distribuție comercială fizică, înregistrează un prefix GS1 oficial (gs1ro.org pentru România)." },
      ],
    },
  },

  // ═══ FÁZIS 8 (b): GENERATOR COD QR ════════════════════════════════════════
  "generator-cod-qr": {
    introText:
      "Generator de coduri QR online cu pictogramă în centru: alege dintr-o galerie de presetări (Wi-Fi, vCard, link, plus 12 emoji amuzante) sau încarcă propria imagine. Suportă 3 stiluri de module (pătrat, puncte, rotunjit), șabloane rapide pentru URL, vCard, parolă Wi-Fi, geo-locație, telefon și e-mail. Export PNG + SVG vectorial, nivel de corectare a erorilor (ECC) configurabil, fără tracking.",
    guide: [
      "1. Introdu textul, URL-ul sau datele structurate (Wi-Fi, vCard) — sau folosește un șablon rapid.",
      "2. Activează „Galerie presetări” pentru pictogramă centrală sau „Încarcă imagine” pentru logo propriu.",
      "3. În meniul „Opțiuni avansate” (deschis automat) alege stilul modulelor: pătrat clasic, puncte rotunde sau pătrate rotunjite. Finder patterns-urile rămân întotdeauna pătrate pentru fiabilitate maximă la scanare.",
      "4. Reglează mărimea pictogramei (recomandat 18-25% cu nivel ECC H), culorile, mărimea pixelului și marginea quiet zone.",
      "5. Descarcă PNG (raster) sau SVG (vectorial pentru tipar). Testează scanarea cu telefonul înainte de finalizare.",
    ],
    faq: [
      { q: "Cum funcționează corectarea erorilor (ECC) într-un cod QR?", a: "Codul QR utilizează codarea Reed-Solomon pentru a permite recuperarea informației chiar dacă o parte din cod este deteriorată sau acoperită. Există 4 niveluri: L (~7% recuperare), M (~15%), Q (~25%) și H (~30%). Nivelul H permite o pictogramă în centru (până la ~25% din suprafață) fără pierdere de scanabilitate." },
      { q: "De ce ECC nivel H este recomandat când adaug o pictogramă?", a: "Pictograma centrală acoperă fizic o parte din modulele de date. Nivelul H tolerează ~30% pierdere, deci o pictogramă de 18-25% (cu margine albă) e încă scanabilă fără erori. La nivel L, aceeași pictogramă ar face codul ilizibil." },
      { q: "Ce este o capsulă vCard într-un cod QR?", a: "vCard (RFC 6350) este un format text standardizat pentru contacte. Un QR cu vCard permite scanarea cu telefonul și salvarea instantanee în agendă (nume, telefon, e-mail, adresă, organizație). Începe cu BEGIN:VCARD, conține câmpuri FN, TEL, EMAIL, etc., și se închide cu END:VCARD." },
      { q: "Cum se codează o rețea Wi-Fi într-un QR?", a: "Formatul WIFI:T:WPA;S:NumeReteaWiFi;P:parolaTa;; este standardul de-facto. T este tipul de criptare (WPA/WEP/nopass), S este SSID-ul rețelei, P parola. Telefoanele Android scanează nativ și se conectează cu un singur tap; iOS suportă acest format din iOS 11." },
      { q: "Care este capacitatea maximă a unui cod QR?", a: "QR de versiune 40 (cea mai mare) acceptă maxim 4296 caractere alfanumerice la ECC nivel L, dar doar 1852 la nivel H. Pentru utilizare practică (cititor mobil, distanță de scanare normală), recomandăm sub 500 caractere și ECC ≥ M pentru fiabilitate." },
      { q: "Pot scana codul QR generat aici cu orice telefon?", a: "Da. Standardul QR (ISO/IEC 18004) este deschis și suportat nativ de camerele Android și iOS din ultimii 7 ani, plus de toate aplicațiile populare (Google Lens, Apple Camera). Codurile generate respectă specificațiile, fără proprietar." },
    ],
    content: {
      howToSteps: [
        { title: "1. Pune conținutul",       description: "URL, text simplu, vCard, parolă Wi-Fi, telefon, e-mail sau geo-locație. Folosește butoanele șablon pentru completare rapidă." },
        { title: "2. Adaugă pictogramă",     description: "Galerie cu 8 presetări comune (Wi-Fi, vCard, link, ❤️) plus 12 amuzante (🤖 👽 🚀 🦄 ...) sau încarcă logo PNG/SVG." },
        { title: "3. Alege stilul modulelor", description: "Pătrat clasic, puncte rotunde sau rotunjite — finder patterns-urile rămân pătrate pentru scanare optimă." },
        { title: "4. Setează ECC",           description: "Nivel H (30% recuperare) este recomandat când codul are pictogramă. Nivel L permite mai multe date." },
        { title: "5. Personalizează vizualul", description: "Culoare module, fundal, mărime pixel, margine quiet zone — în meniul avansat." },
        { title: "6. Descarcă",              description: "PNG pentru web și aplicații, SVG pentru tipar profesional. Testează scanarea înainte de tipar definitiv." },
      ],
      useCases: [
        { icon: "📶", title: "Wi-Fi pentru oaspeți",   description: "Generează un QR cu parola Wi-Fi printat pe etichetă — oaspeții se conectează scanând, fără să introducă parola." },
        { icon: "👤", title: "Carte de vizită digitală", description: "vCard QR pe spatele cărții de vizită clasice — un singur scan adaugă contactul în agenda telefonului." },
        { icon: "🍽️", title: "Meniu restaurant",      description: "QR pe masă cu URL spre meniul digital — pictogramă cu 🍕 sau logo propriu pentru personalizare." },
        { icon: "🎟️", title: "Bilete și evenimente",  description: "QR pentru check-in la evenimente cu logo discret — distinge-ți biletele și previi falsificarea simplă." },
      ],
      aboutSection: {
        title: "Despre codurile QR și pictograma centrală",
        paragraphs: [
          "Codul QR (Quick Response Code) a fost inventat în 1994 de compania japoneză Denso Wave pentru urmărirea pieselor auto. Spre deosebire de codurile de bare 1D (EAN, CODE-128), QR este un cod 2D — codează informația în două dimensiuni, ceea ce-i permite o densitate de date mult mai mare (până la 7089 cifre sau 4296 caractere alfanumerice).",
          "Robustețea codului QR vine din corectarea erorilor Reed-Solomon: codul include redundanță configurabilă (7-30%), permițând recuperarea informației chiar dacă o parte e deteriorată, murdară sau — în cazul nostru — acoperită cu o pictogramă centrală.",
          "Pentru a păstra scanabilitatea cu pictogramă în centru, recomandăm: (1) ECC nivel H (toleranță 30%), (2) pictograma sub 25% din suprafața totală a codului, (3) fundal alb (sau de culoarea light) în spatele pictogramei pentru contrast, (4) testarea scanării cu cel puțin două telefoane diferite înainte de tipar comercial.",
        ],
      },
      tips: [
        { icon: "🛡️", tip: "Folosește mereu ECC nivel H când adaugi pictogramă — codul rezistă la pierderea a 30% din suprafață." },
        { icon: "📏", tip: "Mărimea pictogramei să nu depășească 25% din lățimea codului — peste asta scanarea devine nefiabilă." },
        { icon: "🎯", tip: "Testează codul cu cel puțin 2 telefoane (Android + iOS) înainte de tipar masiv." },
        { icon: "📱", tip: "Pentru tipărire pe afișe, folosește SVG — scalează fără pierdere la dimensiuni mari." },
      ],
    },
  },

  // ═══ GENERATOR DE PAROLE ════════════════════════════════════════════════════
  "generator-parola": {
    introText:
      "Generator de parole sigure care funcționează 100% local, în browserul tău, folosind generatorul criptografic crypto.getRandomValues() — nicio parolă nu este trimisă, salvată sau înregistrată pe vreun server. Alege dintre patru moduri: parolă aleatorie (entropie maximă), frază de acces memorabilă din cuvinte, parolă pronunțabilă (ușor de rostit la telefon) sau cod PIN numeric. Reglează lungimea, tipurile de caractere (litere mici, mari, cifre, simboluri), exclude caracterele ambigue și generează mai multe variante deodată. Indicatorul de tărie îți arată entropia în biți și timpul estimat de spargere în timp real.",
    guide: [
      "1. Alege tipul parolei: Aleatorie, Frază de acces, Pronunțabilă sau Cod PIN.",
      "2. Reglează lungimea cu glisorul și bifează tipurile de caractere dorite (mici, mari, cifre, simboluri).",
      "3. Opțional: exclude caracterele ambigue (I, l, 1, O, 0) și cere cel puțin un caracter din fiecare tip pentru robustețe.",
      "4. Alege câte variante să fie generate simultan (1–12) și urmărește indicatorul de tărie și entropia în biți.",
      "5. Copiază parola dorită cu un clic (sau „Copiază tot”) și apasă „Regenerează” pentru un set nou. Reîncărcarea paginii șterge totul definitiv.",
    ],
    faq: [
      { q: "Cât de sigure sunt parolele generate aici?", a: "Parolele sunt generate cu crypto.getRandomValues(), generatorul de numere aleatorii criptografic al browserului, folosind eșantionare cu respingere (rejection sampling) pentru a evita orice bias statistic. Totul rulează local: nicio parolă nu părăsește dispozitivul tău, nu este transmisă prin rețea și nu este stocată. Reîncărcarea paginii elimină definitiv parolele afișate." },
      { q: "Ce înseamnă entropia măsurată în biți?", a: "Entropia exprimă imprevizibilitatea parolei. Se calculează ca lungime × log₂(numărul de simboluri posibile). O parolă de 16 caractere din toate cele 4 tipuri (~90 simboluri) are circa 104 biți de entropie. Sub 28 de biți parola e foarte slabă; peste 60 de biți e puternică, iar peste 128 de biți e considerată practic de nespart cu tehnologia actuală." },
      { q: "Parolă aleatorie sau frază de acces — ce să aleg?", a: "O frază de acces din 4–6 cuvinte aleatorii (de exemplu Munte-Soare-Floare-42) oferă entropie ridicată și este mult mai ușor de memorat decât un șir de caractere haotic. Pentru conturile pe care le scrii rar și le stochezi într-un manager de parole, alege modul aleatoriu cu lungime mare. Pentru o parolă-master pe care o tastezi des, fraza de acces e alegerea practică." },
      { q: "De ce să exclud caracterele ambigue?", a: "Caracterele I (i mare), l (L mic), 1 (cifra unu), O (o mare) și 0 (cifra zero) se confundă vizual ușor, mai ales la fonturi fără serife sau pe hârtie tipărită. Dacă transcrii parola manual sau o dictezi, excluderea lor reduce erorile. Pierderea de entropie este neglijabilă la lungimi de 14+ caractere." },
      { q: "Câte caractere ar trebui să aibă o parolă bună?", a: "Recomandarea curentă (NIST SP 800-63B) este minim 12 caractere, ideal 16 sau mai mult pentru conturi importante. Lungimea contează mai mult decât complexitatea: o parolă lungă din litere mici e mai greu de spart decât una scurtă cu simboluri. Pentru o frază de acces, 4 cuvinte sunt minimul rezonabil, 6 fiind recomandate pentru conturi critice." },
      { q: "Pot folosi același generator pentru coduri PIN?", a: "Da. Modul „Cod PIN” produce secvențe pur numerice de 4–12 cifre, generate criptografic — fără tipare previzibile precum 1234, 0000 sau ani de naștere. Este ideal pentru carduri bancare, seifuri, telefoane sau lacăte digitale. Reține că un PIN de 4 cifre are doar ~13 biți de entropie, deci folosește 6+ cifre acolo unde sistemul permite." },
      { q: "Ce este timpul de spargere afișat?", a: "Este o estimare a duratei necesare pentru a ghici parola printr-un atac de tip brute-force offline, presupunând 10¹¹ (o sută de miliarde) de încercări pe secundă — capacitatea aproximativă a unui cluster GPU modern atacând un hash rapid. În medie, atacatorul găsește parola după ce parcurge jumătate din spațiul posibil, de aceea estimarea folosește jumătate din numărul total de combinații." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul",          description: "Aleatorie (entropie maximă), Frază de acces (memorabilă), Pronunțabilă (ușor de rostit) sau Cod PIN (numeric)." },
        { title: "2. Setează lungimea",      description: "Glisorul reglează numărul de caractere sau de cuvinte. Mai lung = exponențial mai sigur." },
        { title: "3. Alege caracterele",     description: "Bifează litere mici, mari, cifre și simboluri. Exclude opțional caracterele ambigue I/l/1/O/0." },
        { title: "4. Garantează diversitatea", description: "Opțiunea „cel puțin unul din fiecare tip” asigură că parola respectă politicile de complexitate ale site-urilor." },
        { title: "5. Generează în lot",       description: "Produce până la 12 variante simultan și alege-o pe cea care îți place — toate sunt la fel de sigure." },
        { title: "6. Copiază în siguranță",   description: "Un clic copiază parola; „Copiază tot” le ia pe toate. Reîncărcarea paginii le șterge definitiv." },
      ],
      useCases: [
        { icon: "🔐", title: "Conturi online",        description: "Parole unice și lungi pentru e-mail, banking și rețele sociale — stocate într-un manager de parole." },
        { icon: "💬", title: "Parolă-master memorabilă", description: "O frază de acces din 5–6 cuvinte pentru managerul de parole sau criptarea de disc — ușor de reținut, greu de spart." },
        { icon: "🗣️", title: "Parole dictate la telefon", description: "Modul pronunțabil produce parole care se rostesc clar, fără confuzii de litere, pentru suport tehnic." },
        { icon: "🔢", title: "Coduri PIN sigure",      description: "PIN-uri de 6+ cifre fără tipare previzibile pentru carduri, seifuri sau dispozitive IoT." },
      ],
      formatComparison: {
        title: "Tipuri de parole comparate",
        columns: ["Mod", "Memorabilitate", "Entropie tipică", "Caz de utilizare ideal"],
        rows: [
          { feature: "Aleatorie (16)",    values: ["Scăzută", "~104 biți", "Conturi în manager de parole"] },
          { feature: "Frază de acces (5)", values: ["Ridicată", "~58 biți", "Parolă-master, criptare disc"] },
          { feature: "Pronunțabilă (12)",  values: ["Medie", "~46 biți", "Dictare verbală, conturi temporare"] },
          { feature: "Cod PIN (6)",        values: ["Ridicată", "~20 biți", "Carduri, seifuri, dispozitive"] },
        ],
      },
      aboutSection: {
        title: "Despre parolele sigure și entropie",
        paragraphs: [
          "O parolă este sigură nu pentru că pare complicată, ci pentru că este imprevizibilă. Măsura matematică a acestei imprevizibilități este entropia, exprimată în biți: fiecare bit adăugat dublează numărul de încercări necesare pentru a o ghici. Formula este simplă — entropie = lungime × log₂(număr de simboluri posibile). De aceea o parolă lungă din litere mici poate fi mai sigură decât una scurtă presărată cu simboluri.",
          "Cheia securității reale este aleatoriul de calitate. Acest generator folosește crypto.getRandomValues() — sursa de entropie criptografică a browserului — combinată cu eșantionare cu respingere pentru a elimina biasul modulo, astfel încât fiecare caracter are exact aceeași probabilitate de apariție. Metodele naive bazate pe Math.random() nu oferă garanții criptografice și nu trebuie folosite pentru parole.",
          "Recomandările moderne (NIST SP 800-63B) pun accent pe lungime, nu pe reguli arbitrare de complexitate: minim 12 caractere, fără expirare forțată periodică și fără reguli care duc la tipare previzibile (Parola1!). Combină acest generator cu un manager de parole, activează autentificarea în doi pași (2FA) și nu reutiliza niciodată aceeași parolă pe mai multe site-uri — astfel, o singură breșă nu compromite toate conturile tale.",
        ],
      },
      tips: [
        { icon: "📏", tip: "Lungimea bate complexitatea: 16 caractere din litere mici sunt mai sigure decât 8 caractere cu simboluri." },
        { icon: "🗄️", tip: "Folosește un manager de parole — generează lung și aleatoriu, nu trebuie să memorezi nimic." },
        { icon: "🔁", tip: "Nu reutiliza niciodată o parolă. O breșă pe un site nu trebuie să-ți expună celelalte conturi." },
        { icon: "🛡️", tip: "Activează autentificarea în doi pași (2FA) acolo unde e disponibilă — chiar și o parolă spartă rămâne insuficientă." },
      ],
    },
  },

  // ─── Vizualizator JSON ──────────────────────────────────────────────────────
  "json-viewer": {
    introText:
      "Vizualizatorul JSON afișează datele JSON într-o vedere arborescentă restrângibilă, cu evidențierea sintaxei, ca structurile adânc imbricate să fie ușor de parcurs. Lipești JSON-ul și primești imediat un arbore interactiv: obiectele și tablourile le poți restrânge, cheile și valorile le vezi colorate după tip, iar calea oricărui element o poți copia cu un clic. Pentru răsfoirea rapidă a răspunsurilor API mari și a fișierelor de configurare. Totul rulează în browserul tău.",
    guide: [
      "1. Lipește datele JSON în câmpul de text.",
      "2. Parcurge arborele: restrânge sau extinde obiectele și tablourile cu butonul ▶/▼.",
      "3. Folosește butoanele „Extinde/Restrânge tot” pentru întregul arbore.",
      "4. Dă clic pe un rând pentru a copia calea lui (ex. date.stoc.buc).",
    ],
    faq: [
      { q: "Prin ce diferă de formatarea JSON?", a: "Formatarea dă JSON text, indentat; vizualizatorul e un arbore interactiv, unde restrângi ramurile, vezi tipurile colorate și copiezi căile. La JSON mari și adânci, arborele e mult mai clar." },
      { q: "Ce mărime de JSON gestionează?", a: "Afișarea are loc în browserul tău, deci gestionează și fișiere mari. La JSON foarte mari, restrângerea ajută la vedere de ansamblu – ramurile restrânse nu se randează." },
      { q: "Ce înseamnă culorile?", a: "Cheile apar cu o culoare de accent, textele cu verde, numerele cu mov, valorile logice cu portocaliu, iar null cu roșu. Astfel recunoști rapid tipurile de date." },
      { q: "Cum copiez calea unei valori?", a: "Dă clic pe rândul dorit, iar instrumentul copiază în clipboard calea JavaScript (ex. utilizatori[0].nume), pe care o poți folosi direct în codul tău." },
      { q: "JSON-ul ajunge pe vreun server?", a: "Nu. Întreaga procesare și afișare are loc în browserul tău – datele tale nu părăsesc dispozitivul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea JSON", description: "Lipește datele JSON de afișat." },
        { title: "2. Parcurgere", description: "Restrânge sau extinde ramurile cu butonul ▶/▼." },
        { title: "3. Arbore complet", description: "Cu „Extinde/Restrânge tot” gestionezi arborele dintr-o dată." },
        { title: "4. Copiere cale", description: "Dă clic pe un rând pentru a copia calea lui în clipboard." },
      ],
      useCases: [
        { icon: "🔌", title: "Răspunsuri API", description: "Vedere de ansamblu rapidă a răspunsurilor API mari, adânc imbricate, la dezvoltare și depanare." },
        { icon: "⚙️", title: "Configurație", description: "Explorarea și verificarea structurii unor JSON de configurare complexe." },
        { icon: "🧭", title: "Căutare cale", description: "Găsirea și copierea căii exacte a unei valori adânci, pentru cod." },
        { icon: "🐛", title: "Depanare", description: "Depistarea rapidă a câmpurilor anormale sau lipsă în vederea arborescentă." },
      ],
      formatComparison: {
        title: "Elementele arborelui",
        columns: ["Element", "Aspect"],
        rows: [
          { feature: "Obiect { }", values: ["Ramură restrângibilă, cu număr de copii"] },
          { feature: "Tablou [ ]", values: ["Ramură restrângibilă, cu număr de elemente"] },
          { feature: "Text / număr", values: ["Valoare colorată după tip"] },
          { feature: "Cale", values: ["Copiabilă în clipboard la clic"] },
        ],
      },
      aboutSection: {
        title: "De ce e utilă vederea arborescentă?",
        paragraphs: [
          "JSON este formatul de date al web-ului modern – API-uri, configurații, schimb de date, toate folosesc JSON. Problema e că JSON-ul real e adesea adânc imbricat și lung: într-un text simplu, formatat, e greu să găsești un câmp anume sau să înțelegi structura. Vederea arborescentă răspunde la asta: restrângi ramurile, ca să te concentrezi doar pe partea care te interesează.",
          "Colorarea după tip și copierea căii accelerează suplimentar munca. Când trebuie să faci referire la o valoare adâncă în cod, e suficient să dai clic și ai calea exactă. Toate acestea funcționează în browser, instant, fără trimitere de date – deci poți examina liniștit și răspunsuri API confidențiale.",
        ],
      },
      tips: [
        { icon: "🌳", tip: "La un JSON mare, restrânge întâi toate ramurile, apoi extinde țintit ce te interesează." },
        { icon: "🧭", tip: "Copierea căii e cel mai rapid mod de a face referire la un câmp în cod." },
        { icon: "🎨", tip: "După culori vezi dintr-o privire dacă o valoare e text, număr sau logică." },
        { icon: "🔒", tip: "Poți răsfoi liniștit și răspunsuri API confidențiale – totul rămâne local." },
      ],
    },
  },

  // ─── Convertor JSON ↔ XML ───────────────────────────────────────────────────
  "json-xml": {
    introText:
      "Convertorul JSON ↔ XML transformă datele în ambele direcții: din JSON face XML, sau din XML face JSON, cu valori implicite rezonabile. Alegi direcția, lipești datele și primești imediat rezultatul convertit, indentat. Util când trebuie să dai XML unui sistem bazat pe JSON, sau când vrei să procesezi ca JSON răspunsul unui API XML vechi. Totul rulează în browserul tău, fără server.",
    guide: [
      "1. Alege direcția: JSON → XML sau XML → JSON.",
      "2. Lipește datele sursă în câmpul din stânga.",
      "3. Citește rezultatul convertit în dreapta.",
      "4. Copiază-l în clipboard cu un clic.",
    ],
    faq: [
      { q: "După ce reguli convertește?", a: "Din cheile obiectului rezultă elemente XML, valorile primitive devin conținut text. La XML → JSON, din elementele repetate cu același nume rezultă un tablou, iar numerele și valorile logice sunt recunoscute. Este convenția cea mai răspândită, rezonabilă." },
      { q: "De ce nu e mereu perfectă conversia?", a: "Modelul de date al JSON și al XML diferă: XML cunoaște atribute, spații de nume și conținut mixt ordonat, pe care JSON nu le are. De aceea conversia dus-întors poate fi ușor cu pierderi – instrumentul optimizează pentru structurile simple, frecvente." },
      { q: "Gestionează tablourile?", a: "Da. La JSON → XML, dintr-un tablou rezultă elemente repetate cu același nume; la XML → JSON, din elementele frate cu același nume se formează un tablou." },
      { q: "Există element rădăcină?", a: "XML trebuie să aibă un singur element rădăcină. Dacă JSON-ul conține o singură cheie de nivel superior, aceasta e folosită ca rădăcină; altfel se adaugă o rădăcină `root`." },
      { q: "Datele ajung pe vreun server?", a: "Nu. Întreaga conversie are loc în browserul tău – datele tale nu părăsesc dispozitivul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Direcție", description: "Alege: JSON → XML sau XML → JSON." },
        { title: "2. Sursă", description: "Lipește datele de convertit." },
        { title: "3. Rezultat", description: "Datele convertite, indentate, apar instant." },
        { title: "4. Copiere", description: "Copiezi rezultatul în clipboard." },
      ],
      useCases: [
        { icon: "🔄", title: "Integrare de sisteme", description: "Conectarea unei aplicații bazate pe JSON cu un sistem vechi care așteaptă XML." },
        { icon: "📡", title: "API-uri vechi", description: "Transformarea răspunsurilor API XML în JSON pentru procesare mai ușoară." },
        { icon: "📄", title: "Migrare date", description: "Transferul datelor între două sisteme cu formate diferite." },
        { icon: "🧪", title: "Date de test", description: "Producerea rapidă a unei variante XML dintr-un JSON existent, pentru testare." },
      ],
      formatComparison: {
        title: "Reguli de conversie",
        columns: ["JSON", "XML"],
        rows: [
          { feature: "{ \"a\": 1 }", values: ["<a>1</a>"] },
          { feature: "[ element repetat ]", values: ["<tag>…</tag><tag>…</tag>"] },
          { feature: "număr / logic", values: ["conținut text (recunoscut la revenire)"] },
        ],
      },
      aboutSection: {
        title: "JSON și XML: două lumi de date",
        paragraphs: [
          "JSON și XML sunt cele două mari formate de schimb de date structurate. JSON este concis, ușor de citit și alegerea implicită a web-ului modern; XML este mai vechi, mai verbos, dar cu posibilități structurale mai bogate (atribute, spații de nume, validare cu schemă). În multe integrări trebuie construită o punte între cele două – de exemplu, un serviciu modern trebuie să comunice cu un sistem XML de întreprindere.",
          "Baza conversiei este o mapare simplă: cheile obiectului devin elemente, valorile devin text, repetițiile devin tablou sau elemente repetate. Deoarece cele două modele de date nu se suprapun perfect, conversia dus-întors poate fi cu pierderi în cazurile limită; pentru structurile simple, de zi cu zi, oferă însă o soluție rapidă și de încredere.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "Păstrează structura simplă – datele plate, clare, se convertesc cel mai bine." },
        { icon: "🔁", tip: "După conversia dus-întors, verifică mereu rezultatul, mai ales la atribute." },
        { icon: "📐", tip: "La JSON → XML, o singură cheie de nivel superior dă cel mai curat element rădăcină." },
        { icon: "🔍", tip: "Rezultatul îl poți verifica mai departe cu vizualizatorul JSON sau un formator XML." },
      ],
    },
  },

  // ─── Generator JSON Schema ──────────────────────────────────────────────────
  "json-schema": {
    introText:
      "Generatorul de JSON Schema produce automat schema (draft-07) dintr-un exemplu JSON. Lipești un exemplu tipic de date, iar instrumentul construiește schema prin inferența tipurilor: recunoaște textele, numerele (întregi sau zecimale), valorile logice, obiectele și tablourile, și opțional marchează fiecare câmp ca obligatoriu. Schema este potrivită pentru validare, documentare sau ca bază de contract API. Totul rulează în browserul tău.",
    guide: [
      "1. Lipește un exemplu tipic de date JSON.",
      "2. Decide dacă fiecare câmp să fie obligatoriu (required).",
      "3. Citește schema JSON generată (draft-07).",
      "4. Copiaz-o și folosește-o pentru validare sau documentare.",
    ],
    faq: [
      { q: "Ce este JSON Schema?", a: "JSON Schema este un standard prin care se descrie structura așteptată a unor date JSON: ce câmpuri, cu ce tip, care sunt obligatorii. Se poate folosi pentru validarea datelor (dacă respectă formatul) și pentru documentare." },
      { q: "Ce versiune generează?", a: "Versiunea draft-07, cea mai larg suportată. Schema conține referința $schema, tipurile, câmpurile properties ale obiectelor și, opțional, lista required." },
      { q: "Cum gestionează tablourile?", a: "Tipul tabloului este dedus din primul element (items). Dacă elementele tabloului au structură uniformă, schema e precisă; la tablouri mixte merită rafinată ulterior." },
      { q: "De ce e totul obligatoriu implicit?", a: "Dintr-un exemplu nu reiese care câmpuri sunt opționale, deci valoarea implicită sigură e ca fiecare câmp observat să fie obligatoriu. Cu comutatorul o poți dezactiva, dacă vrei o schemă mai laxă." },
      { q: "Datele ajung pe vreun server?", a: "Nu. Generarea schemei are loc în browserul tău – datele exemplu nu părăsesc dispozitivul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Exemplu", description: "Lipește un exemplu reprezentativ de date JSON." },
        { title: "2. Obligativitate", description: "Setează dacă fiecare câmp să fie required." },
        { title: "3. Schemă", description: "Schema JSON generată (draft-07) apare instant." },
        { title: "4. Utilizare", description: "Copiaz-o pentru validare sau documentare." },
      ],
      useCases: [
        { icon: "✅", title: "Validare", description: "Verificarea datelor de intrare pe baza schemei – respectă formatul așteptat?" },
        { icon: "📘", title: "Documentare", description: "Descrierea formală, citibilă de mașină, a unui API sau a unei structuri de date." },
        { icon: "🤝", title: "Contract API", description: "Schema e o bază comună între backend și frontend, sau între două servicii." },
        { icon: "🧪", title: "Testare", description: "Pe baza schemei se pot genera date de test valide și invalide." },
      ],
      formatComparison: {
        title: "Inferența tipurilor",
        columns: ["Valoare exemplu", "Tip schemă"],
        rows: [
          { feature: "42", values: ["integer"] },
          { feature: "3.14", values: ["number"] },
          { feature: "\"text\"", values: ["string"] },
          { feature: "[ … ]", values: ["array (items din primul element)"] },
        ],
      },
      aboutSection: {
        title: "De ce merită să folosești JSON Schema?",
        paragraphs: [
          "Pe măsură ce o structură de date e folosită în tot mai multe locuri, devine tot mai important să fie definită precis: ce câmpuri există, cu ce tip, ce e obligatoriu. JSON Schema oferă un răspuns standard, citibil de mașină. Având o schemă, poți valida automat datele de intrare, poți documenta API-ul și poți preveni erorile din format.",
          "Scrierea manuală a schemei e o muncă migăloasă și plictisitoare, mai ales la structuri mari. Acest instrument o accelerează: pornind de la un exemplu real de date, construiește scheletul schemei, pe care apoi mai trebuie doar să îl rafinezi (câmpuri opționale, tipare, limite). Astfel ajungi în câteva minute de la date brute la o schemă utilizabilă.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "Dă un exemplu reprezentativ – cu toate câmpurile posibile, ca schema să fie completă." },
        { icon: "🔧", tip: "Schema generată e un punct de plecare – rafineaz-o cu câmpuri opționale și limite (min, max, pattern)." },
        { icon: "📋", tip: "Cu comutatorul required reglezi cât de strictă să fie schema." },
        { icon: "🧩", tip: "La tablouri mixte schema ia primul element ca model – verifică dacă tabloul e eterogen." },
      ],
    },
  },

  // ─── Decodor JWT ────────────────────────────────────────────────────────────
  "jwt-dekoder": {
    introText:
      "Decodorul JWT face lizibil conținutul unui JSON Web Token: decodează base64url partea header și payload și le afișează ca JSON formatat, evidențiind expirarea (exp), momentul emiterii (iat) și începutul valabilității (nbf) – ca dată citibilă, cu status. Important: instrumentul NU verifică semnătura (pentru asta ar fi nevoie de cheia secretă) – doar decodează, ceea ce face conținutul tokenului vizibil pentru oricine. Totul rulează în browserul tău, tokenul nu ajunge pe server.",
    guide: [
      "1. Lipește tokenul JWT (cele trei părți separate prin punct).",
      "2. Citește header și payload decodate, ca JSON formatat.",
      "3. Verifică expirarea (exp) – instrumentul semnalează dacă tokenul a expirat.",
      "4. Copiază conținutul header sau payload, dacă e nevoie.",
    ],
    faq: [
      { q: "Ce este un JWT?", a: "JWT (JSON Web Token) este un format de token compact, folosit frecvent pentru autentificare și autorizare. Este format din trei părți: header (algoritm), payload (date, claim-uri) și signature (semnătură), separate prin puncte." },
      { q: "Verifică semnătura?", a: "Nu. Pentru verificarea semnăturii ar fi nevoie de cheia secretă sau publică a serverului, care nu e disponibilă aici. Instrumentul doar decodează – a face payload-ul lizibil nu înseamnă a dovedi autenticitatea tokenului." },
      { q: "E sigur să lipesc un token?", a: "Aici da, fiindcă decodarea are loc integral în browserul tău, tokenul nu ajunge nicăieri. Important de știut însă: payload-ul JWT NU e criptat, ci doar codat base64 – oricine obține tokenul îi poate citi conținutul." },
      { q: "Ce înseamnă expirarea (exp)?", a: "Claim-ul exp este un timestamp Unix până când tokenul e valid. Instrumentul îl transformă în dată citibilă și semnalează dacă tokenul a expirat deja. Tokenurile expirate sunt respinse de servere." },
      { q: "Tokenul ajunge pe vreun server?", a: "Nu. Întreaga decodare are loc în browserul tău, prin JavaScript – tokenul nu părăsește dispozitivul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea tokenului", description: "Lipește JWT-ul complet (header.payload.signature)." },
        { title: "2. Conținut", description: "Citește header și payload decodate ca JSON." },
        { title: "3. Expirare", description: "Verifică claim-urile exp/iat/nbf ca dată citibilă." },
        { title: "4. Copiere", description: "Copiază conținutul header sau payload." },
      ],
      useCases: [
        { icon: "🔐", title: "Autentificare", description: "Verificarea conținutului unui token de autentificare la dezvoltare." },
        { icon: "🐛", title: "Depanare", description: "De ce respinge serverul tokenul? A expirat, sau payload-ul e greșit?" },
        { icon: "🕵️", title: "Autorizare", description: "Verificarea rapidă a claim-urilor de autorizare (role, scope) din payload." },
        { icon: "⏱️", title: "Expirare", description: "Citirea rapidă a valabilității unui token, în formă lizibilă." },
      ],
      formatComparison: {
        title: "Cele trei părți ale JWT",
        columns: ["Parte", "Conținut"],
        rows: [
          { feature: "Header", values: ["Algoritm și tip de token"] },
          { feature: "Payload", values: ["Claim-uri: sub, exp, iat, role…"] },
          { feature: "Signature", values: ["Semnătură (verificabilă cu cheia secretă)"] },
        ],
      },
      aboutSection: {
        title: "Cum e construit un JWT?",
        paragraphs: [
          "JSON Web Token este format din trei părți separate prin punct. Prima e header-ul, care descrie algoritmul semnăturii. A doua e payload-ul, care conține datele efective (claim-urile): cine e utilizatorul, până când e valid tokenul, ce drepturi are. A treia e signature, semnătura primelor două părți cu o cheie secretă – aceasta garantează că tokenul nu a fost falsificat.",
          "Este important de înțeles: header-ul și payload-ul sunt doar codate base64url, NU criptate. Asta înseamnă că oricine are acces la token îi poate citi conținutul – de aceea nu pune niciodată date sensibile (parolă, secret) în payload. Semnătura nu ascunde conținutul, ci împiedică falsificarea. Acest instrument face lizibil conținutul codat, dar nu examinează validitatea semnăturii.",
        ],
      },
      tips: [
        { icon: "⚠️", tip: "Payload-ul nu e secret – nu pune niciodată parolă sau date sensibile în el." },
        { icon: "⏱️", tip: "Dacă serverul dă 401, verifică întâi expirarea (exp) aici." },
        { icon: "🔏", tip: "Decodarea nu e autentificare – verificarea semnăturii să se facă mereu pe server." },
        { icon: "🔒", tip: "Tokenul e în siguranță aici (decodare locală), dar în general tratează-l cu grijă." },
      ],
    },
  },

  // ─── Generator UUID ─────────────────────────────────────────────────────────
  "uuid-generator": {
    introText:
      "Generatorul de UUID creează identificatori unici aleatorii (UUID v4) – individual sau în loturi de până la o mie. Generarea folosește sursa de numere aleatoare criptografic sigură a browserului (Web Crypto API), astfel încât identificatorii sunt practic fără coliziuni. Poți alege format cu majuscule, fără cratime sau între ghilimele, și poți copia totul cu un clic. Pentru chei de bază de date, testare și orice loc unde e nevoie de un identificator unic. Totul rulează în browserul tău.",
    guide: [
      "1. Setează câte UUID-uri vrei (1–1000).",
      "2. Alege formatul: majuscule, fără cratime, între ghilimele.",
      "3. Cu butonul „Regenerează” obții un set nou.",
      "4. Copiază toate UUID-urile în clipboard.",
    ],
    faq: [
      { q: "Ce este UUID v4?", a: "UUID (Universally Unique Identifier) este un identificator de 128 de biți. Varianta v4 e aleatoare: majoritatea biților sunt umpluți dintr-o sursă aleatoare, astfel încât șansa de coliziune a două UUID-uri generate e practic nulă, chiar și fără coordonare centrală." },
      { q: "Cât de unice sunt?", a: "Un UUID v4 conține 122 de biți aleatori – atât de multe valori posibile, încât chiar la multe miliarde de generări, șansa de coliziune e neglijabilă. De aceea se poate folosi și în sisteme distribuite, fără alocare centrală de identificatori." },
      { q: "E sigură sursa aleatoare?", a: "Da. Instrumentul folosește Web Crypto API (crypto.randomUUID / getRandomValues), care e criptografic sigură. E mai puternică decât Math.random() și potrivită și pentru identificatori sensibili din punct de vedere al securității." },
      { q: "La ce folosesc opțiunile de format?", a: "Forma fără cratime e mai compactă (32 de caractere), cea cu majuscule se potrivește unor sisteme, iar cea între ghilimele se inserează direct în cod sau într-o listă. Alege forma potrivită sistemului țintă." },
      { q: "UUID-urile ajung pe vreun server?", a: "Nu. Generarea are loc integral în browserul tău – identificatorii nu sunt încărcați." },
    ],
    content: {
      howToSteps: [
        { title: "1. Cantitate", description: "Setează câte UUID-uri vrei (1–1000)." },
        { title: "2. Format", description: "Alege: majuscule, fără cratime, între ghilimele." },
        { title: "3. Generare", description: "Cu butonul „Regenerează” obții un set nou." },
        { title: "4. Copiere", description: "Copiezi toate UUID-urile cu un clic." },
      ],
      useCases: [
        { icon: "🗄️", title: "Cheie de bază de date", description: "Chei primare, unde e nevoie de un identificator distribuit, fără coliziuni." },
        { icon: "🧪", title: "Date de test", description: "Generarea în masă de identificatori unici pentru testare și dezvoltare." },
        { icon: "🔗", title: "Corelare", description: "Identificatori de cerere sau tranzacție pentru logare și urmărire." },
        { icon: "📁", title: "Nume de fișiere", description: "Generarea de nume unice, fără coliziuni, de fișiere sau resurse." },
      ],
      formatComparison: {
        title: "Opțiuni de format",
        columns: ["Opțiune", "Exemplu"],
        rows: [
          { feature: "De bază", values: ["f47ac10b-58cc-4372-a567-0e02b2c3d479"] },
          { feature: "Fără cratime", values: ["f47ac10b58cc4372a5670e02b2c3d479"] },
          { feature: "Majuscule", values: ["F47AC10B-58CC-4372-A567-0E02B2C3D479"] },
        ],
      },
      aboutSection: {
        title: "La ce folosește UUID-ul?",
        paragraphs: [
          "Identificatorul unic e una dintre pietrele de temelie ale dezvoltării software: înregistrărilor de bază de date, fișierelor, cererilor, utilizatorilor le trebuie o cheie garantat unică. Numărul incremental clasic (auto-increment) e simplu, dar necesită coordonare centrală – într-un sistem distribuit, unde mai multe servere generează simultan identificatori, ar apărea coliziuni. UUID-ul rezolvă asta: conține suficient aleatoriu ca să rămână unic fără coordonare.",
          "UUID-ul v4 (aleatoriu) e varianta cea mai răspândită. Este esențial ca aleatoriul să fie de bună calitate: o sursă slabă ar face identificatorii predictibili și predispuși la coliziuni. De aceea acest instrument folosește Web Crypto API criptografic sigură a browserului – aceeași sursă folosită și la generarea cheilor de securitate.",
        ],
      },
      tips: [
        { icon: "🔑", tip: "Ca cheie de bază de date, UUID v4 e ideal în medii distribuite, cu mai multe servere." },
        { icon: "📏", tip: "Forma fără cratime economisește spațiu în URL-uri și nume de fișiere." },
        { icon: "🔒", tip: "Datorită sursei Web Crypto, identificatorii nu sunt predictibili – un avantaj de securitate." },
        { icon: "📋", tip: "Pentru inserare în cod, activează formatul cu ghilimele." },
      ],
    },
  },

  // ─── Interpretor cron ───────────────────────────────────────────────────────
  "cron-ertelmezo": {
    introText:
      "Interpretorul de expresii cron face inteligibile programările cron: pe fiecare câmp (minut, oră, zi, lună, ziua săptămânii) arată ce înseamnă valoarea respectivă și calculează momentele concrete ale următoarelor execuții. Lipești expresia cron sau alegi un șablon și vezi imediat când se va executa sarcina. Ajută la evitarea programărilor greșite – nu trebuie să descifrezi în minte semnificația stelelor și numerelor. Totul rulează în browserul tău.",
    guide: [
      "1. Lipește expresia cron (5 câmpuri) sau alege un șablon.",
      "2. Citește explicația pe câmpuri (minut, oră, zi, lună, ziua săptămânii).",
      "3. Vezi momentele concrete ale următoarelor execuții.",
      "4. Modifică expresia până obții programarea dorită.",
    ],
    faq: [
      { q: "Ce este o expresie cron?", a: "Cron este un format de programare format din cinci câmpuri: minut, oră, ziua lunii, luna și ziua săptămânii. Cu ele se stabilește când să ruleze o sarcină repetitivă – de exemplu în fiecare zi lucrătoare la ora 9 dimineața." },
      { q: "Ce înseamnă simbolurile?", a: "* (steaua) înseamnă „oricare”; un număr indică o valoare concretă; A-B un interval (ex. 1-5); */N un pas (fiecare al N-lea); iar A,B o listă. Instrumentul le interpretează pe toate și le arată în limbaj natural." },
      { q: "Cum calculează următoarele execuții?", a: "Pornind de la momentul curent, parcurge minutele care urmează și le selectează pe cele care se potrivesc tuturor celor cinci câmpuri. Afișează primele câteva potriviri ca date concrete." },
      { q: "Ce fus orar folosește?", a: "Fusul orar local al browserului tău (al dispozitivului). Dacă cron rulează pe un server, ajustează mental la fusul serverului – multe servere lucrează în UTC." },
      { q: "Datele ajung pe vreun server?", a: "Nu. Interpretarea și calculul au loc integral în browserul tău – nimic nu este încărcat." },
    ],
    content: {
      howToSteps: [
        { title: "1. Expresie", description: "Lipește expresia cron sau alege un șablon." },
        { title: "2. Explicație", description: "Citește ce înseamnă fiecare din cele cinci câmpuri." },
        { title: "3. Execuții", description: "Vezi momentele concrete ale următoarelor execuții." },
        { title: "4. Rafinare", description: "Modifică până obții programarea dorită." },
      ],
      useCases: [
        { icon: "⏰", title: "Sarcină programată", description: "Verificarea programării unui cron job înainte de lansare." },
        { icon: "🐛", title: "Depanare", description: "De ce nu a rulat sarcina? Explicația pe câmpuri și execuțiile ajută." },
        { icon: "📚", title: "Învățare", description: "Înțelegerea sintaxei cron pe exemple concrete și șabloane." },
        { icon: "🔧", title: "Mentenanță", description: "Descifrarea rapidă a sensului unei intrări crontab moștenite." },
      ],
      formatComparison: {
        title: "Câmpurile cron",
        columns: ["Câmp", "Interval"],
        rows: [
          { feature: "Minut", values: ["0–59"] },
          { feature: "Oră", values: ["0–23"] },
          { feature: "Zi (lună)", values: ["1–31"] },
          { feature: "Lună", values: ["1–12"] },
          { feature: "Ziua săptămânii", values: ["0–6 (0 = duminică)"] },
        ],
      },
      aboutSection: {
        title: "Logica programării cron",
        paragraphs: [
          "Cron este programatorul clasic al lumii Unix: cu cinci câmpuri simple se poate descrie aproape orice tipar repetitiv. Prețul conciziei e însă lizibilitatea – `0 9 * * 1-5` nu dezvăluie la prima vedere că înseamnă „în fiecare zi lucrătoare la ora 9 dimineața”. Iar o greșeală de tastare poate duce ușor la rularea sarcinii la ora greșită sau deloc.",
          "Acest instrument face transparentă expresia cron din două direcții. Pe de o parte, explică pe fiecare câmp ce înseamnă valoarea; pe de altă parte, calculează concret momentele următoarelor execuții, astfel încât, în loc să înțelegi sintaxa, vezi pur și simplu rezultatul. Împreună, cele două fac verificarea programării fiabilă chiar înainte de lansare.",
        ],
      },
      tips: [
        { icon: "🧪", tip: "Înainte de lansare, verifică mereu următoarele execuții – o stea tastată greșit poate costa scump." },
        { icon: "🌍", tip: "Nu uita fusul orar: serverul tău rulează probabil în UTC, nu în ora ta locală." },
        { icon: "📋", tip: "La o intrare crontab necunoscută, explicația pe câmpuri clarifică rapid sensul." },
        { icon: "⭐", tip: "Sintaxa de pas */N (ex. */15) e o sursă frecventă de neînțelegeri – aici îi verifici efectul." },
      ],
    },
  },
};
