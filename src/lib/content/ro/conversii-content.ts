import type { ContentMap } from "../types.ts";

// Unit converter RO content – Fázis 1 pilot entry-k
export const CONVERSII_RO_CONTENT: ContentMap = {
  "cm-metri": {
    introText:
      "Convertorul nostru transformă instantaneu centimetri în metri și invers, cu precizie și fără întârzieri. Este bidirecțional: scrii într-un câmp, rezultatul apare imediat în celălalt.",
    guide: [
      "1. Scrie valoarea în centimetri sau în metri.",
      "2. Rezultatul se calculează automat, în timp real.",
      "3. Poți copia rezultatul cu un singur clic.",
    ],
    faq: [
      { q: "Câți metri are un centimetru?", a: "1 centimetru = 0,01 metri. Formula este simplă: metri = centimetri ÷ 100." },
      { q: "Câți centimetri are un metru?", a: "1 metru = 100 centimetri. Formula: centimetri = metri × 100." },
      { q: "Care este formula de conversie?", a: "Pentru a transforma cm în m, împarte la 100. Pentru a transforma m în cm, înmulțește cu 100." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu valoarea", description: "Scrie o valoare în centimetri sau metri în oricare câmp al convertorului." },
        { title: "2. Vezi rezultatul", description: "Rezultatul apare automat, în timp real, fără a reîncărca pagina." },
        { title: "3. Copiază dacă ai nevoie", description: "Un clic pe butonul «Copiază» mută rezultatul în clipboard." },
      ],
      useCases: [
        { icon: "📏", title: "Construcții și DIY", description: "Planuri arhitecturale, dimensiuni de mobilă, lucrări de amenajare." },
        { icon: "🎓", title: "Școală", description: "Probleme de matematică la clasele gimnaziale, conversii rapide la teme." },
        { icon: "✂️", title: "Croitorie", description: "Tipare, măsurători de țesături, ajustări." },
      ],
      aboutSection: {
        title: "Despre conversia cm ↔ metri",
        paragraphs: [
          "Centimetrul și metrul sunt unități de măsură din Sistemul Internațional (SI). Relația dintre ele este fixă: un metru are exact 100 de centimetri. Această conversie apare frecvent în viața de zi cu zi – de la măsurarea înălțimii, la lucrări DIY, croitorie sau construcții.",
          "Convertorul rulează complet în browserul tău: nici o valoare nu ajunge pe server, iar rezultatul este afișat instant, fără reîncărcarea paginii.",
        ],
      },
    },
  },
  "km-metri": {
    introText:
      "Transformă kilometri în metri și invers cu un convertor bidirecțional rapid. Util pentru distanțe rutiere, alergări, ciclism și cursuri școlare.",
    guide: [
      "1. Scrie valoarea în kilometri sau în metri.",
      "2. Rezultatul apare automat în celălalt câmp.",
      "3. Copiază rezultatul dacă ai nevoie să-l folosești în altă parte.",
    ],
    faq: [
      { q: "Câți metri are un kilometru?", a: "1 kilometru = 1.000 metri. Formula: metri = kilometri × 1000." },
      { q: "Câți kilometri sunt 500 de metri?", a: "500 de metri = 0,5 kilometri. Formula: km = metri ÷ 1000." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu valoarea", description: "Scrie o valoare în kilometri sau metri." },
        { title: "2. Vezi rezultatul", description: "Conversia apare instant, în celălalt câmp." },
        { title: "3. Copiază", description: "Un clic și valoarea este în clipboard." },
      ],
      useCases: [
        { icon: "🏃", title: "Sport și fitness", description: "Calcul distanțe alergare, ciclism, înot." },
        { icon: "🚗", title: "Planificare traseu", description: "Conversie viteze și distanțe rutiere." },
        { icon: "📐", title: "Probleme școlare", description: "Exerciții clasice cu viteză, distanță, timp." },
      ],
      aboutSection: {
        title: "Despre conversia km ↔ metri",
        paragraphs: [
          "Kilometrul este un multiplu al metrului, unitatea fundamentală pentru distanțe în Sistemul Internațional. Prefixul «kilo-» înseamnă o mie, deci 1 km = 1000 m.",
          "Conversia este folosită la curse, transporturi, planificarea traseelor și la probleme de matematică clasice (viteză = distanță / timp).",
        ],
      },
    },
  },
  "mile-kilometri": {
    introText:
      "Transformă mile în kilometri și invers cu un convertor bidirecțional rapid. Mila internațională (terestră) este egală cu 1,609344 km. Util pentru distanțe rutiere din SUA/UK, alergare, aviație și conversia valorilor de pe hărți sau aplicații de fitness.",
    guide: [
      "1. Scrie valoarea în mile sau în kilometri.",
      "2. Rezultatul apare automat în celălalt câmp.",
      "3. Folosește butoanele cu distanțe uzuale pentru valori frecvente.",
    ],
    faq: [
      { q: "Câți kilometri are o milă?", a: "1 milă (internațională/terestră) = 1,609344 km. Formula: km = mile × 1,609344." },
      { q: "Cum convertesc kilometri în mile?", a: "Împarte numărul de kilometri la 1,609344 (sau înmulțește cu 0,621371). De exemplu: 10 km ÷ 1,609344 ≈ 6,21 mile." },
      { q: "Mila terestră este la fel cu mila marină?", a: "Nu. Mila terestră (statute mile) = 1,609 km, folosită pe uscat. Mila marină (nautical mile) = 1,852 km, folosită în navigație. Acest convertor folosește mila terestră." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu valoarea", description: "Scrie o valoare în mile sau în kilometri." },
        { title: "2. Vezi rezultatul", description: "Conversia apare instant, în celălalt câmp." },
        { title: "3. Distanțe uzuale", description: "Butoane rapide pentru 1, 5, 10, maraton, 100 mile." },
      ],
      useCases: [
        { icon: "🚗", title: "Condus în străinătate", description: "Conversia distanțelor de pe indicatoare (SUA, UK)." },
        { icon: "🏃", title: "Sport și fitness", description: "Aplicații care afișează distanțe în mile (alergare, ciclism)." },
        { icon: "✈️", title: "Călătorii", description: "Distanțe de zbor și itinerarii afișate în mile." },
      ],
      aboutSection: {
        title: "Despre conversia mile ↔ km",
        paragraphs: [
          "Mila internațională (statute mile) este definită exact ca 1.609,344 metri, adică 1,609344 km. Este unitatea principală de distanță pe uscat în Statele Unite și Regatul Unit, în timp ce restul lumii folosește kilometrul (sistemul metric).",
          "Conversia este utilă la condusul în străinătate, la aplicațiile de fitness importate, în aviație și în interpretarea distanțelor de pe hărțile anglo-saxone. Pentru viteză, vezi și convertorul km/h ↔ m/s ↔ mph.",
        ],
      },
    },
  },
  "km-h-m-s": {
    introText:
      "Convertor de viteză între cele mai folosite unități: kilometri pe oră (km/h), metri pe secundă (m/s), mile pe oră (mph) și noduri (knots). Editezi orice câmp, iar celelalte se recalculează instant. Util la fizică, condus, sport, navigație și aviație.",
    guide: [
      "1. Scrie viteza într-una dintre unități (km/h, m/s, mph sau noduri).",
      "2. Celelalte trei valori se actualizează automat.",
      "3. Folosește butoanele cu viteze uzuale (oraș, autostradă) pentru valori frecvente.",
    ],
    faq: [
      { q: "Cum convertesc km/h în m/s?", a: "Împarte valoarea în km/h la 3,6. De exemplu: 36 km/h ÷ 3,6 = 10 m/s. Pentru invers, înmulțește m/s cu 3,6." },
      { q: "Cât este 100 km/h în mph?", a: "100 km/h × 0,621371 ≈ 62,14 mph. Formula: mph = km/h × 0,621371 (sau km/h ÷ 1,609344)." },
      { q: "Ce înseamnă un nod (knot)?", a: "1 nod = 1 milă marină pe oră = 1,852 km/h ≈ 0,5144 m/s. Este unitatea standard de viteză în navigație și aviație." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu viteza", description: "Scrie valoarea într-una dintre cele 4 unități." },
        { title: "2. Conversie simultană", description: "Celelalte unități se recalculează instant." },
        { title: "3. Viteze uzuale", description: "Butoane rapide: mers, oraș, drum național, autostradă." },
      ],
      useCases: [
        { icon: "📐", title: "Fizică", description: "Probleme cu viteză, distanță și timp în m/s (SI)." },
        { icon: "🚗", title: "Condus", description: "Conversia limitelor de viteză între km/h și mph." },
        { icon: "⛵", title: "Navigație și aviație", description: "Viteze exprimate în noduri." },
      ],
      aboutSection: {
        title: "Despre conversia vitezei",
        paragraphs: [
          "Viteza se exprimă în unități diferite în funcție de context: km/h în viața de zi cu zi și pe indicatoarele rutiere europene, m/s în fizică (unitatea SI), mph în SUA și Regatul Unit, iar nodul în navigație și aviație. Relația de bază: 1 m/s = 3,6 km/h.",
          "Conversiile uzuale: 1 mph = 1,609344 km/h, iar 1 nod = 1,852 km/h. Pentru a trece de la km/h la m/s împarți la 3,6 — operația cel mai des întâlnită în problemele de fizică din gimnaziu și liceu.",
        ],
      },
    },
  },
  "octeti": {
    introText:
      "Convertorul de mărime a datelor transformă între bit, octet (B), KB, MB, GB și TB, cu două moduri: zecimal (1 KB = 1000 B, folosit de producători) și binar (1 KiB = 1024 B, folosit de sistemele de operare). Editezi orice câmp, iar restul se recalculează instant. Util pentru spațiu de stocare, fișiere și planuri de date.",
    guide: [
      "1. Alege modul: zecimal (1000) sau binar (1024).",
      "2. Scrie valoarea într-una dintre unități (bit, B, KB/KiB, MB/MiB…).",
      "3. Celelalte unități se actualizează automat.",
    ],
    faq: [
      { q: "Câți MB are 1 GB?", a: "În sistem zecimal: 1 GB = 1000 MB. În sistem binar: 1 GiB = 1024 MiB. Producătorii folosesc de obicei zecimal, sistemele de operare binar." },
      { q: "Care e diferența dintre KB și KiB?", a: "KB (kilobyte) = 1000 de octeți (zecimal, SI). KiB (kibibyte) = 1024 de octeți (binar). Diferența crește cu fiecare nivel: la TB/TiB ajunge la ~10%." },
      { q: "De ce un disc de 1 TB are mai puțin spațiu real?", a: "Producătorul îl etichetează zecimal (1 TB = 10¹² octeți), dar Windows îl afișează binar (1 TiB = 2⁴⁰ octeți). 10¹² / 2⁴⁰ ≈ 0,909, deci 1 TB apare ca ~931 GiB." },
      { q: "Câți biți are un octet?", a: "Un octet (byte) are 8 biți. Pentru a converti octeți în biți se înmulțește cu 8, iar invers se împarte la 8." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul", description: "Zecimal (1000) sau binar (1024)." },
        { title: "2. Introdu valoarea", description: "Într-una dintre unitățile afișate." },
        { title: "3. Conversie simultană", description: "Toate celelalte unități se actualizează." },
      ],
      useCases: [
        { icon: "💾", title: "Spațiu de stocare", description: "Compară capacitatea discurilor (zecimal vs binar)." },
        { icon: "📱", title: "Planuri de date", description: "Estimează consumul de date mobile în MB/GB." },
        { icon: "📁", title: "Mărimi fișiere", description: "Conversia rapidă a dimensiunilor de fișiere." },
        { icon: "🖥️", title: "Informatică", description: "Exerciții despre biți, octeți și multipli." },
      ],
      aboutSection: {
        title: "Despre unitățile de mărime a datelor",
        paragraphs: [
          "Unitatea de bază a informației digitale este bitul (0 sau 1), iar octetul (byte) grupează 8 biți. Multiplii se exprimă în două convenții: cea zecimală (SI), unde 1 KB = 1000 octeți, și cea binară, unde 1 KiB = 1024 octeți. Standardul IEC a introdus prefixele binare (KiB, MiB, GiB) tocmai pentru a elimina ambiguitatea.",
          "În practică, producătorii de discuri și SSD-uri folosesc convenția zecimală (mai avantajoasă la marketing), în timp ce sistemele de operare precum Windows afișează valori binare. De aici provine diferența percepută: un disc de „1 TB” apare ca aproximativ 931 GiB. Acest convertor afișează ambele moduri pentru comparație corectă.",
        ],
      },
    },
  },
  "cm-inch": {
    introText:
      "Transformă centimetri în inch (țoli) și invers. Ideal pentru diagonale ecran TV, monitoare, laptopuri, haine importate sau proiecte DIY.",
    guide: [
      "1. Scrie valoarea în cm sau în inch.",
      "2. Rezultatul apare imediat în celălalt câmp.",
      "3. Copiază valoarea dacă este nevoie.",
    ],
    faq: [
      { q: "Câți cm are un inch?", a: "1 inch = 2,54 cm. Este o valoare exactă, definită prin standard internațional." },
      { q: "Câți inch sunt 50 cm?", a: "50 cm ≈ 19,69 inch. Formula: inch = cm ÷ 2,54." },
      { q: "Ce diagonală are un TV de 55 inch?", a: "55 inch ≈ 139,7 cm (diagonala ecranului, nu lățimea)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu valoarea", description: "Scrie în cm sau inch." },
        { title: "2. Rezultat instant", description: "Conversia apare în timp real." },
        { title: "3. Copiază", description: "Un clic pe butonul de copiere." },
      ],
      useCases: [
        { icon: "📺", title: "Diagonale ecran", description: "TV, monitoare, laptopuri și telefoane sunt măsurate în inch." },
        { icon: "🔧", title: "DIY și unelte", description: "Țevi, șuruburi, dimensiuni americane." },
        { icon: "👕", title: "Haine importate", description: "Mărimi din SUA și UK." },
      ],
      aboutSection: {
        title: "Despre conversia cm ↔ inch",
        paragraphs: [
          "Inch-ul (țolul) este o unitate imperială de măsură folosită în special în Statele Unite și Marea Britanie. 1 inch este definit exact ca 2,54 cm. Această valoare a fost standardizată internațional în 1959.",
          "Cel mai frecvent folosim inch-ul pentru diagonale de ecrane (TV, monitoare, laptopuri, telefoane), dimensiuni de șuruburi și țevi, sau la importul de haine din SUA/UK.",
        ],
      },
    },
  },
  "kg-grame": {
    introText:
      "Transformă kilograme în grame și invers, instantaneu. Util la rețete culinare, dozare farmaceutică, școală și poștă.",
    guide: [
      "1. Scrie valoarea în kg sau grame.",
      "2. Rezultatul apare automat în celălalt câmp.",
      "3. Copiază valoarea cu un clic.",
    ],
    faq: [
      { q: "Câte grame are un kilogram?", a: "1 kilogram = 1.000 grame. Prefixul «kilo-» înseamnă o mie." },
      { q: "Câte kilograme sunt 250 de grame?", a: "250 g = 0,25 kg. Formula: kg = grame ÷ 1000." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu cantitatea", description: "Scrie în kg sau grame." },
        { title: "2. Vezi rezultatul", description: "Apare instant în celălalt câmp." },
        { title: "3. Copiază", description: "Clipboard disponibil într-un clic." },
      ],
      useCases: [
        { icon: "🍞", title: "Gătit", description: "Rețete, cântărire ingrediente." },
        { icon: "💊", title: "Farmacie", description: "Conversie între g, mg, kg." },
        { icon: "📦", title: "Poștă", description: "Greutate colete și tarife." },
      ],
      aboutSection: {
        title: "Despre conversia kg ↔ grame",
        paragraphs: [
          "Gramul și kilogramul sunt unități fundamentale de masă în Sistemul Internațional. Relația: 1 kg = 1000 g. Această conversie apare în mod constant în gătit, ambalaje alimentare și industrie.",
          "În comerțul românesc, cantitățile mici se exprimă de obicei în grame (100 g, 250 g, 500 g), iar cele mari în kilograme. La farmacie, dozele sunt adesea în miligrame (1 g = 1000 mg).",
        ],
      },
    },
  },
  "litri-mililitri": {
    introText:
      "Transformă litri în mililitri și invers. Util pentru rețete, dozare medicamente, laborator și consum zilnic de lichide.",
    guide: [
      "1. Scrie valoarea în litri sau mililitri.",
      "2. Rezultatul apare instant în celălalt câmp.",
      "3. Copiază dacă ai nevoie.",
    ],
    faq: [
      { q: "Câți mililitri are un litru?", a: "1 litru = 1.000 mililitri. Formula: ml = litri × 1000." },
      { q: "Câți litri sunt 500 ml?", a: "500 ml = 0,5 litri. Formula: litri = ml ÷ 1000." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu volumul", description: "Scrie în litri sau mililitri." },
        { title: "2. Vezi rezultatul", description: "Conversia apare imediat." },
        { title: "3. Copiază", description: "Salvare în clipboard cu un clic." },
      ],
      useCases: [
        { icon: "🍳", title: "Bucătărie", description: "Rețete internaționale în ml, lichide." },
        { icon: "💧", title: "Hidratare", description: "Urmărirea consumului zilnic de apă." },
        { icon: "🧪", title: "Laborator", description: "Soluții, dozări precise." },
      ],
      aboutSection: {
        title: "Despre conversia litri ↔ ml",
        paragraphs: [
          "Litrul și mililitrul sunt unități de volum. 1 litru = 1000 ml = 1 decimetru cub (dm³). Un ml este exact 1 cm³ (centimetru cub).",
          "Conversia este esențială în bucătărie (rețete internaționale exprimate în ml), la farmacie (siropuri, soluții) și la calcule de consum (apă, suc, carburant).",
        ],
      },
    },
  },
  "celsius-fahrenheit": {
    introText:
      "Transformă grade Celsius în grade Fahrenheit și invers. Include formula oficială și un tabel de referință cu temperaturi cheie.",
    guide: [
      "1. Scrie temperatura în °C sau în °F.",
      "2. Rezultatul apare automat în cealaltă scară.",
      "3. Consultă tabelul de referință pentru puncte-cheie.",
    ],
    faq: [
      { q: "Care este formula Celsius → Fahrenheit?", a: "°F = °C × 9/5 + 32. Exemplu: 20°C × 1,8 + 32 = 68°F." },
      { q: "Care este formula Fahrenheit → Celsius?", a: "°C = (°F − 32) × 5/9. Exemplu: (100 − 32) × 5/9 ≈ 37,8°C." },
      { q: "Cât este 100°F în Celsius?", a: "100°F ≈ 37,8°C – aproape temperatura corpului uman." },
      { q: "Cât este 0°C în Fahrenheit?", a: "0°C = 32°F. Acesta este punctul de îngheț al apei." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu temperatura", description: "Scrie valoarea în °C sau °F." },
        { title: "2. Vezi conversia", description: "Apare automat în cealaltă scară." },
        { title: "3. Consultă reperele", description: "Tabelul de referință arată puncte-cheie (îngheț, fierbere, corp uman)." },
      ],
      useCases: [
        { icon: "🌡️", title: "Meteo internațional", description: "Prognoze din SUA în °F, restul lumii în °C." },
        { icon: "🍳", title: "Cuptor", description: "Rețete americane folosesc °F." },
        { icon: "🏥", title: "Sănătate", description: "Termometre digitale, febră." },
      ],
      aboutSection: {
        title: "Despre conversia Celsius ↔ Fahrenheit",
        paragraphs: [
          "Scara Celsius este folosită în majoritatea țărilor lumii, inclusiv în România. Scara Fahrenheit este folosită predominant în SUA. Punctul de îngheț al apei este 0°C = 32°F, iar punctul de fierbere este 100°C = 212°F.",
          "Diferența între cele două scări este atât la zero cât și la pas: un grad Celsius = 1,8 grade Fahrenheit. Formula exactă pentru conversie este °F = °C × 9/5 + 32 (sau invers, °C = (°F − 32) × 5/9).",
          "Reține un reper util: temperatura corpului uman, 37°C, corespunde la 98,6°F.",
        ],
      },
    },
  },

  // ─── Fázis 4 (set complet de unități) ────────────────────────────────────
  "picioare-cm": {
    introText:
      "Convertorul picioare + țoli ↔ centimetri transformă instantaneu măsuri din sistem imperial (5'10\") în sistem metric. Util pentru înălțime, profiluri sportive (NBA, fotbal american), aviație și haine importate.",
    guide: [
      "1. Introdu picioarele (ft) și țolii (in) — sau direct cm.",
      "2. Toate cele 3 câmpuri se sincronizează în timp real.",
      "3. Folosește presets pentru înălțimi uzuale (5'4\", 5'9\", 6'0\").",
    ],
    faq: [
      { q: "Cât este 5'10\" în cm?", a: "5 picioare și 10 țoli = (5 × 12 + 10) × 2,54 = 70 × 2,54 = 177,8 cm." },
      { q: "Cât este 6 picioare în cm?", a: "6 ft × 12 in × 2,54 = 182,88 cm. Aproximativ 1,83 m." },
      { q: "Care este formula?", a: "cm = (picioare × 12 + țoli) × 2,54. Inversa: total țoli = cm / 2,54, picioare = floor(total/12), țoli = total − picioare × 12." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu picioarele și țolii", description: "Notația 5'10\" înseamnă 5 picioare + 10 țoli." },
        { title: "2. Vezi rezultatul în cm", description: "Conversia apare automat în câmpul cm." },
        { title: "3. Sau pornește de la cm", description: "Modifici cm → se calculează picioare + țoli." },
      ],
      useCases: [
        { icon: "📏", title: "Înălțimi", description: "Profil sportiv, profil dating, fișe medicale internaționale." },
        { icon: "🏀", title: "NBA / sport", description: "Jucători măsurați în 6'2\", 7'0\" — convertit în metri pentru audiență RO." },
        { icon: "✈️", title: "Aviație", description: "Altitudini și înălțimi piloți măsurate în picioare." },
      ],
      aboutSection: {
        title: "Despre sistemul imperial: picioare și țoli",
        paragraphs: [
          "Sistemul imperial de măsură (US customary) folosește picioare și țoli pentru înălțimi și lungimi mici. 1 picior = 12 țoli = 30,48 cm; 1 țol = 2,54 cm exact. Această definiție a fost standardizată internațional în 1959.",
          "În țările anglofone (SUA, UK), înălțimea unei persoane se exprimă mereu în formatul picioare'țoli\" (apostrof + ghilimele). Exemplu: 5'10\" = cinci picioare și zece țoli = 177,8 cm. În aviație și marină, distanțele verticale (altitudini, adâncimi) se folosesc tot în picioare, indiferent de țară.",
        ],
      },
    },
  },
  "inch-cm": {
    introText:
      "Convertor bidirecțional inch (țoli) ↔ centimetri. Optimizat pentru diagonale ecran (laptop, monitor, TV) și măsurători DIY.",
    guide: [
      "1. Introdu valoarea în inch sau cm.",
      "2. Rezultatul apare instant în celălalt câmp.",
      "3. Folosește presets pentru diagonale standard (13\", 24\", 55\").",
    ],
    faq: [
      { q: "Cât este 1 inch în cm?", a: "1 inch = 2,54 cm exact (definit prin standard internațional din 1959)." },
      { q: "Cât este 27 inch în cm?", a: "27 × 2,54 = 68,58 cm. Diagonala unui monitor 27\" tipic." },
      { q: "Cum convertesc cm în inch?", a: "Împarte cm la 2,54. Exemplu: 50 cm ÷ 2,54 ≈ 19,69 inch." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu inch sau cm", description: "Oricare câmp acceptă valoarea." },
        { title: "2. Vezi conversia instant", description: "Celălalt câmp se actualizează automat." },
        { title: "3. Folosește presets", description: "Click pe diagonale uzuale pentru încărcare rapidă." },
      ],
      useCases: [
        { icon: "💻", title: "Diagonale ecran", description: "Laptop 13\"/15,6\", monitor 24\"/27\", TV 55\"/65\"." },
        { icon: "📱", title: "Telefoane și tablete", description: "iPhone 6,1\", iPad 10\" — măsurat tot în inch." },
        { icon: "🔧", title: "DIY și unelte", description: "Țevi, șuruburi, dimensiuni americane." },
      ],
      aboutSection: {
        title: "Despre inch (țol)",
        paragraphs: [
          "Inch-ul (țolul în română) este unitatea imperială standard pentru lungimi mici. 1 inch = 2,54 cm — această valoare a fost adoptată internațional în 1959 prin acordul \"international yard and pound\". Înainte exista variația britanică ușor diferită (inch englezesc), dar diferența era sub 0,002 cm și nu mai are relevanță practică.",
          "Inch-ul este folosit predominant pentru a exprima diagonale de ecrane (TV, monitor, laptop, telefon, tabletă), dimensiuni de pneuri, țevi (1\", 1/2\", 3/4\"), șuruburi imperiale (1/4\"-20) și DIY-ul american.",
        ],
      },
    },
  },
  "kg-livre": {
    introText:
      "Convertor kg ↔ livre (pounds, lb) cu presets pentru greutate corporală uzuală. 1 kg = 2,205 lb (1 lb = 0,4536 kg).",
    guide: [
      "1. Introdu greutatea în kg sau lb.",
      "2. Rezultatul apare automat în celălalt câmp.",
      "3. Folosește presets pentru greutăți tipice (50–100 kg).",
    ],
    faq: [
      { q: "Cât este 70 kg în livre?", a: "70 × 2,20462 ≈ 154,32 lb. Greutate corporală obișnuită pentru un bărbat adult." },
      { q: "Cât este 1 livre în kg?", a: "1 lb = 0,45359 kg ≈ 0,454 kg. Reciproca: 1 kg ≈ 2,205 lb." },
      { q: "Care e diferența între lb și lbs?", a: "lb este abrevierea oficială (libra), lbs este pluralul informal (pounds). Ambele înseamnă același lucru în practică." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu greutatea", description: "În câmpul kg sau în câmpul livre." },
        { title: "2. Vezi conversia", description: "Apare instant în celălalt câmp." },
        { title: "3. Sau alege un preset", description: "Click pe 70 kg, 80 kg etc. pentru încărcare rapidă." },
      ],
      useCases: [
        { icon: "🏋️", title: "Fitness și greutăți", description: "Echipamente sportive importate au valori în lb." },
        { icon: "✈️", title: "Bagaj avioane SUA", description: "Limita de bagaj exprimată în pounds (de obicei 50 lb)." },
        { icon: "📦", title: "Colete internaționale", description: "Tarifare poștă SUA per pound." },
      ],
      aboutSection: {
        title: "Despre livre (pound)",
        paragraphs: [
          "Livra (pound, simbol lb) este unitatea de masă din sistemul imperial folosită în SUA și UK. 1 lb = 0,45359237 kg exact. Numele provine din latinescul \"libra pondo\" (\"o livre după greutate\"), de unde și abrevierea lb.",
          "În viața de zi cu zi din SUA, livrele sunt folosite pentru greutate corporală (un bărbat adult medie 180 lb ≈ 82 kg), greutate alimente la cumpărături (1 lb steak), bagaj la avioane (limita 50 lb la cargo), și echipamente sportive (haltere de 45 lb, 25 lb).",
        ],
      },
    },
  },
  "tone-kg": {
    introText:
      "Convertor tone metrice ↔ kg cu presets pentru vehicule de transport (camion, TIR, vagon CFR). 1 tonă = 1.000 kg = 1.000.000 g.",
    guide: [
      "1. Introdu valoarea în tone sau kg.",
      "2. Rezultatul apare instant.",
      "3. Folosește presets pentru clase de vehicule.",
    ],
    faq: [
      { q: "Câte kg are 1 tonă?", a: "1 tonă metrică = 1.000 kg. Prefixul \"kilo-\" în fața tonei nu se folosește; pentru cantități mai mari se folosesc kilotone (1 kt = 1.000 t)." },
      { q: "Câte tone are un camion?", a: "Depinde: camionetă ~1 t, camion mic 3,5 t (categorie B), camion 7,5 t (categorie C1), TIR 12–24 t." },
      { q: "Care e diferența între tonă metrică și \"short ton\"?", a: "Tonă metrică = 1.000 kg (sistem SI). Short ton = 907,18 kg (SUA). Long ton = 1.016,05 kg (UK). În Europa se folosește mereu tona metrică." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu cantitatea", description: "În tone sau kg." },
        { title: "2. Vezi conversia", description: "Apare instant în celălalt câmp." },
        { title: "3. Folosește presets", description: "Click pe TIR (12 t), camion (7,5 t) etc." },
      ],
      useCases: [
        { icon: "🚚", title: "Transport rutier", description: "Categorii vehicul după tonaj (B, C1, C, CE)." },
        { icon: "🏗️", title: "Construcții", description: "Comenzi materiale, capacitate macara, betoniere." },
        { icon: "🌾", title: "Agricultură", description: "Producții cereale, capacitate buncăr combine." },
      ],
      aboutSection: {
        title: "Despre tona metrică",
        paragraphs: [
          "Tona metrică este unitatea de masă din Sistemul Internațional, egală cu 1.000 kg. Spre deosebire de unitățile imperiale (short ton = 907 kg, long ton = 1.016 kg), tona metrică este standard în întreaga lume cu excepția SUA.",
          "În România, categoria de permis auto se diferențiază după tonaj: B până la 3.500 kg (3,5 t), C1 până la 7.500 kg (7,5 t), C peste 7.500 kg, CE pentru ansambluri (cap tractor + remorcă). Limita de tonaj la trecerea peste poduri se exprimă mereu în tone.",
        ],
      },
    },
  },
  "hectare-metri-patrati": {
    introText:
      "Convertor hectare ↔ metri pătrați cu presets pentru parcele agricole RO. 1 hectar = 10.000 m² = 100 ari.",
    guide: [
      "1. Introdu suprafața în ha sau m².",
      "2. Rezultatul apare automat.",
      "3. Folosește presets pentru ferme tipice (5 ha, 10 ha, 50 ha).",
    ],
    faq: [
      { q: "Câți metri pătrați are 1 hectar?", a: "1 ha = 10.000 m² (100 m × 100 m). Echivalent: 100 ari." },
      { q: "Cât este 5 hectare în m²?", a: "5 × 10.000 = 50.000 m²." },
      { q: "Care e diferența între hectar și pogon?", a: "Pogonul vechi românesc avea ~5.012 m² (jumătate de hectar). Astăzi termenul \"pogon\" e folosit informal ca sinonim pentru hectar (1 ha)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu suprafața", description: "În hectare sau m²." },
        { title: "2. Vezi conversia", description: "Apare instant în celălalt câmp." },
        { title: "3. Folosește presets", description: "Click pe categoriile de fermă pentru încărcare rapidă." },
      ],
      useCases: [
        { icon: "🌾", title: "Agricultură", description: "Suprafețe parcele, subvenții APIA per hectar." },
        { icon: "🌳", title: "Silvicultură", description: "Suprafețe păduri, fond forestier." },
        { icon: "🏞️", title: "Cadastru", description: "Înregistrare terenuri agricole în Cartea Funciară." },
      ],
      aboutSection: {
        title: "Despre hectar",
        paragraphs: [
          "Hectarul (ha) este unitatea uzuală pentru suprafețe agricole, egală cu un pătrat de 100 m × 100 m, adică 10.000 m². Numele provine din \"hecto\" (100) + \"ar\" (unitatea de bază = 100 m²).",
          "În România, hectarul este referința pentru suprafețele agricole în sistemul APIA (subvenții pe hectar), pentru proprietățile rurale și pentru raportările statistice (recoltă pe hectar). Pentru terenurile mai mici (loturi de casă, vii, livezi de vânzare), se folosește mai des arul (1 ar = 100 m²).",
        ],
      },
    },
  },
  "ari-metri-patrati": {
    introText:
      "Convertor ari ↔ m² uzual la anunțuri imobiliare RO (lot 5 ari, casă + curte). 1 ar = 100 m². 1 hectar = 100 ari.",
    guide: [
      "1. Introdu valoarea în ari sau m².",
      "2. Rezultatul apare instant.",
      "3. Folosește presets pentru loturi imobiliare uzuale.",
    ],
    faq: [
      { q: "Câți m² are 1 ar?", a: "1 ar = 100 m² (un pătrat de 10 m × 10 m)." },
      { q: "Cât este 5 ari în m²?", a: "5 × 100 = 500 m². O suprafață uzuală pentru casă + curte în România." },
      { q: "Câte ari are 1 hectar?", a: "1 ha = 100 ari = 10.000 m²." },
      { q: "De ce se folosește arul în RO?", a: "În anunțurile imobiliare românești, terenurile mici (sub 1 ha) sunt exprimate uzual în ari pentru lizibilitate (mai ușor de scris \"5 ari\" decât \"500 m²\")." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu suprafața", description: "În ari sau m²." },
        { title: "2. Vezi conversia", description: "Apare instant." },
        { title: "3. Folosește presets", description: "Click pe loturile uzuale (3 ari, 5 ari, 10 ari)." },
      ],
      useCases: [
        { icon: "🏠", title: "Imobiliar", description: "Anunțuri vânzare casă + teren, exprimate în ari." },
        { icon: "🌳", title: "Vii și livezi", description: "Suprafețe sub 1 ha sunt măsurate de obicei în ari." },
        { icon: "📋", title: "Cadastru", description: "Înregistrare loturi mici în Cartea Funciară." },
      ],
      aboutSection: {
        title: "Despre ar",
        paragraphs: [
          "Arul (a) este o unitate de suprafață veche, definită ca un pătrat de 10 m × 10 m = 100 m². A fost introdus în Sistemul Metric în 1795. Astăzi este considerat o unitate \"derivată tolerată\" — recomandarea SI este să folosim m² sau ha, dar arul rămâne în uz pentru cantități între 100 m² și 10.000 m².",
          "În RO, arul este standardul de facto pentru anunțurile imobiliare cu loturi sub 1 hectar. \"Casă cu 5 ari curte\" este o formulare uzuală, mai compactă decât echivalentul \"500 m²\". 100 ari = 1 hectar — relația e ușor de reținut.",
        ],
      },
    },
  },
  "pogon-metri-patrati": {
    introText:
      "Convertor pogon ↔ metri pătrați pentru terenuri agricole din România. Valoarea uzuală este 1 pogon = 5.000 m² (aproximativ jumătate de hectar). Pogonul a fost folosit mai ales în Țara Românească; în Muntenia, valoarea istorică este 5.011,79 m².",
    guide: [
      "1. Introdu valoarea în pogoane sau m².",
      "2. Rezultatul apare instant în celălalt câmp.",
      "3. Folosește valorile uzuale (1, 2, 5, 10 pogoane).",
    ],
    faq: [
      { q: "Cât este un pogon în metri pătrați?", a: "Valoarea uzuală este 1 pogon = 5.000 m² (≈ ½ hectar). Varianta istorică munteană este 5.011,79 m². Pentru acte oficiale, verifică valoarea locală." },
      { q: "Câte pogoane are un hectar?", a: "La valoarea uzuală de 5.000 m²/pogon, 1 hectar (10.000 m²) = 2 pogoane." },
      { q: "Pogonul este la fel în toată țara?", a: "Nu. Pogonul a variat în funcție de regiune și epocă. Cel muntean = 5.011,79 m², dar în uzul curent se folosește rotunjit 5.000 m². În Moldova s-au folosit alte unități (falcea)." },
      { q: "Mai este folosit pogonul oficial?", a: "Nu în acte oficiale (acolo se folosesc m² și hectare), dar pogonul rămâne foarte răspândit în limbajul agricol curent." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu suprafața", description: "În pogoane sau m²." },
        { title: "2. Vezi conversia", description: "Apare instant (1 pogon = 5.000 m²)." },
        { title: "3. Valori uzuale", description: "Click pe 1, 2, 5, 10 pogoane." },
      ],
      useCases: [
        { icon: "🌾", title: "Terenuri agricole", description: "Suprafețe de teren arabil exprimate tradițional în pogoane." },
        { icon: "🍇", title: "Vii și livezi", description: "Pogonul era folosit istoric și pentru vii." },
        { icon: "📋", title: "Tranzacții", description: "Conversia rapidă pogon ↔ m² pentru vânzări de teren." },
      ],
      aboutSection: {
        title: "Despre pogon",
        paragraphs: [
          "Pogonul este o unitate de suprafață tradițională românească, folosită mai ales în Țara Românească (Muntenia) pentru terenuri agricole. Valoarea sa a variat în timp și pe regiuni, dar este în general egală cu aproximativ jumătate de hectar. În uzul curent se folosește valoarea rotunjită de 5.000 m².",
          "Valoarea istorică munteană era de 5.011,79 m² (1.296 stânjeni pătrați). Deși nu mai este o unitate oficială (actele folosesc m² și hectare), pogonul rămâne foarte prezent în limbajul agricol și în tranzacțiile informale de teren. Pentru documente cadastrale, suprafața trebuie exprimată în m².",
        ],
      },
    },
  },
  "jugar-metri-patrati": {
    introText:
      "Convertor jugăr (iugăr) ↔ metri pătrați și hectare, pentru terenuri din Transilvania și Banat. Jugărul cadastral (de origine austriacă) = 5.754,64 m² (≈ 0,5755 ha). Varianta ardelenească tradițională este 5.775 m².",
    guide: [
      "1. Introdu valoarea în jugăre sau m².",
      "2. Rezultatul apare instant, plus echivalentul în hectare.",
      "3. Folosește valorile uzuale (1, 2, 5, 10 jugăre).",
    ],
    faq: [
      { q: "Cât este un jugăr în metri pătrați?", a: "Jugărul cadastral = 5.754,64 m² (≈ 0,5755 ha). Varianta ardelenească tradițională este 5.775 m². Pentru acte oficiale, verifică tipul de jugăr menționat." },
      { q: "Ce înseamnă jugăr cadastral?", a: "Jugărul cadastral provine din sistemul de măsurători austriac (1.600 stânjeni pătrați) și valorează 5.754,64 m². A fost folosit în Transilvania, parte a Imperiului Austro-Ungar." },
      { q: "Câte jugăre are un hectar?", a: "La jugărul cadastral (5.754,64 m²), 1 hectar (10.000 m²) ≈ 1,74 jugăre. Invers, 1 jugăr ≈ 0,5755 ha." },
      { q: "Jugăr și iugăr sunt același lucru?", a: "Da. „Iugăr” și „jugăr” sunt variante ortografice ale aceleiași unități de suprafață folosite în Transilvania și Banat." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu suprafața", description: "În jugăre sau m²." },
        { title: "2. Vezi conversia", description: "Plus echivalentul în hectare." },
        { title: "3. Valori uzuale", description: "Click pe 1, 2, 5, 10 jugăre." },
      ],
      useCases: [
        { icon: "🌾", title: "Terenuri în Transilvania", description: "Suprafețe agricole exprimate tradițional în jugăre." },
        { icon: "📜", title: "Documente vechi", description: "Acte și cărți funciare istorice din zona ardeleană." },
        { icon: "📋", title: "Tranzacții", description: "Conversia jugăr ↔ m²/ha pentru vânzări de teren." },
      ],
      aboutSection: {
        title: "Despre jugăr (iugăr)",
        paragraphs: [
          "Jugărul (sau iugărul) este o unitate de suprafață tradițională folosită în Transilvania și Banat, regiuni aflate istoric sub administrație austro-ungară. Reprezenta, conform tradiției, suprafața pe care o puteau ara doi boi într-o zi. Jugărul cadastral, standardizat în sistemul austriac, valorează 5.754,64 m² (1.600 stânjeni pătrați), adică aproximativ 0,5755 hectare.",
          "Există și varianta ardelenească tradițională, ușor mai mare (5.775 m²). Deși nu mai este o unitate oficială, jugărul apare frecvent în documentele cadastrale vechi și în limbajul curent din Ardeal. La fel ca pogonul în sudul țării, jugărul rămâne un reper cultural pentru suprafețele de teren.",
        ],
      },
    },
  },
  "litri-decilitri": {
    introText:
      "Convertor litri ↔ decilitri cu presets pentru rețete RO (smântână 2 dl, lapte 5 dl, bere 5 dl). 1 litru = 10 decilitri.",
    guide: [
      "1. Introdu volumul în litri sau decilitri.",
      "2. Rezultatul apare instant în celălalt câmp.",
      "3. Folosește presets pentru cantități uzuale în bucătărie.",
    ],
    faq: [
      { q: "Câți dl are 1 litru?", a: "1 litru = 10 decilitri = 100 cl = 1.000 ml." },
      { q: "Cât este 5 dl în litri?", a: "5 dl = 0,5 l (jumătate de litru) — porția uzuală de bere sau bidonul de lapte mic." },
      { q: "Cât este 1 dl în ml?", a: "1 dl = 100 ml. Adesea folosit ca unitate intermediară între ml și l." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu volumul", description: "În litri sau decilitri." },
        { title: "2. Vezi rezultatul", description: "Apare instant în celălalt câmp." },
        { title: "3. Folosește presets", description: "Click pe smântână 2 dl, lapte 5 dl etc." },
      ],
      useCases: [
        { icon: "🍳", title: "Rețete", description: "Cărțile de bucate RO folosesc des dl (smântână, lapte, vin)." },
        { icon: "🍺", title: "Băuturi", description: "Halba de bere standard = 5 dl." },
        { icon: "🥛", title: "Produse lactate", description: "Bidon lapte mic = 5 dl, smântână = 2 dl." },
      ],
      aboutSection: {
        title: "Despre decilitru",
        paragraphs: [
          "Decilitrul (dl) este o unitate de volum egală cu 1/10 dintr-un litru, adică 100 ml sau 100 cm³. Prefixul \"deci-\" înseamnă \"a zecea parte\". Deși decilitrul nu este unitate de bază în SI (recomandarea oficială este să folosim litri sau ml), rămâne foarte util pentru cantitățile între 100 ml și 1.000 ml.",
          "În bucătăria românească tradițională, decilitrul este unitatea preferată pentru lichide într-o rețetă. Expresii uzuale: \"2 dl smântână\", \"5 dl lapte\", \"3 dl ulei\". În baruri și restaurante, vinul este servit în pahare de 1 dl (un \"deci\") sau 2 dl.",
        ],
      },
    },
  },
  "litri-metri-cubi": {
    introText:
      "Convertor litri ↔ metri cubi cu presets pentru consum apă/gaz (factură lunară RO). 1 m³ = 1.000 litri.",
    guide: [
      "1. Introdu volumul în litri sau m³.",
      "2. Rezultatul apare instant.",
      "3. Folosește presets pentru consumuri tipice (apă/gaz lunar).",
    ],
    faq: [
      { q: "Câți litri are 1 m³?", a: "1 m³ = 1.000 litri = 1.000 dm³. Un metru cub = un cub cu latura de 1 metru." },
      { q: "Cât consumă o familie/lună?", a: "Apă: 4–8 m³/persoană/lună (consum mediu RO). Gaz: 30–80 m³/lună (variază mult cu sezonul)." },
      { q: "Cum se citește contorul de apă?", a: "Contoarele de apă afișează metri cubi (m³) cu zecimale. 12,345 m³ = 12.345 litri consumați total." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu valoarea", description: "În litri sau m³." },
        { title: "2. Vezi conversia", description: "Apare instant în celălalt câmp." },
        { title: "3. Folosește presets", description: "Click pe consumuri tipice apartament/casă." },
      ],
      useCases: [
        { icon: "💧", title: "Facturi apă", description: "Tarif RO 5–8 lei/m³ (apă rece + canalizare)." },
        { icon: "🔥", title: "Facturi gaz", description: "Consum afișat în m³ pe contor și factură." },
        { icon: "🏊", title: "Bazine și piscine", description: "Volum tipic piscină familială: 30–50 m³ = 30.000–50.000 l." },
      ],
      aboutSection: {
        title: "Despre metrul cub",
        paragraphs: [
          "Metrul cub (m³) este unitatea SI pentru volum, egală cu un cub de 1 m × 1 m × 1 m. Echivalentul în litri este exact 1.000, pentru că 1 dm³ = 1 litru și 1 m³ = 1.000 dm³.",
          "În România, metrul cub este unitatea oficială pentru contoarele de apă (tarif lei/m³) și gaz (subvenții, comparare distribuitori). Cunoscând consumul în m³ și prețul unitar, factura totală se calculează direct. Pentru comparații, 1 m³ apă = aproximativ 13 căzi pline (la 75 l fiecare).",
        ],
      },
    },
  },
  "galon-litri": {
    introText:
      "Convertor galon US (3,785 l) sau UK (4,546 l) ↔ litri. Util la consum auto, prețuri carburant import, rețete americane.",
    guide: [
      "1. Selectează tipul (US sau UK gal).",
      "2. Introdu valoarea în galoane sau litri.",
      "3. Rezultatul apare automat.",
    ],
    faq: [
      { q: "Care e diferența între US și UK gallon?", a: "1 US gal = 3,785 l (sistem american). 1 UK gal (\"imperial gallon\") = 4,546 l. Diferența ~20%, contează pentru consum auto importat." },
      { q: "Cât este 1 galon în litri?", a: "1 US gal = 3,78541 l. 1 UK gal = 4,54609 l. În SUA toate prețurile carburant sunt per US gal." },
      { q: "Cum convertesc consum mpg în l/100 km?", a: "L/100 km = 235,21 / mpg (US). Exemplu: 30 mpg = 235,21/30 ≈ 7,84 l/100 km." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege US sau UK", description: "Toggle deasupra inputului." },
        { title: "2. Introdu valoarea", description: "În galoane sau litri." },
        { title: "3. Vezi conversia", description: "Recalculează automat la schimbare." },
      ],
      useCases: [
        { icon: "🚗", title: "Auto importat SUA", description: "Specificații rezervor și consum în US gal." },
        { icon: "🛢️", title: "Prețuri carburant", description: "Compară $/gal cu lei/l (consideră curs valutar)." },
        { icon: "🍳", title: "Rețete americane", description: "Conversii la rețete cu măsurători US (ex. 1 gal lapte)." },
      ],
      aboutSection: {
        title: "Despre galon",
        paragraphs: [
          "Galonul este o unitate imperială de volum cu două definiții diferite: galonul US (3,78541 l) și galonul imperial UK (4,54609 l). Diferența de ~20% are origini istorice — galonul US derivă din \"queen Anne wine gallon\" (1707), iar cel imperial din \"imperial gallon\" definit în UK în 1824.",
          "În SUA, toate prețurile carburant la pompă sunt per US gallon. Pentru a compara $/gal american cu prețul RO în lei/l: împarte prețul în $/gal la 3,785 ca să obții $/l, apoi convertește cu cursul leu/dolar. În UK, deși sistemul oficial este metric, oamenii încă folosesc imperial gallon în conversații despre consum auto (\"40 miles per gallon\").",
        ],
      },
    },
  },
  "beton-greutate-volum": {
    introText:
      "Convertor beton greutate ↔ volum (densitate medie ρ = 2.400 kg/m³). Mod Greutate→Volum sau Volum→Greutate, presets pentru construcții (sac 25 kg, m³, camion).",
    guide: [
      "1. Alege modul (greutate→volum sau invers).",
      "2. Introdu valoarea în câmpul corespunzător.",
      "3. Folosește presets pentru cantități uzuale construcții.",
    ],
    faq: [
      { q: "Câte kg are 1 m³ de beton?", a: "Aproximativ 2.400 kg pentru beton uzual (ciment + nisip + pietriș + apă). Beton armat ~2.500 kg/m³." },
      { q: "Câți m³ sunt 1.000 kg de beton?", a: "1.000 / 2.400 ≈ 0,417 m³ ≈ 417 litri." },
      { q: "Variază densitatea betonului?", a: "Da: 2.200–2.500 kg/m³ în funcție de compoziție. Beton ușor (cu agregate ușoare) sub 2.000 kg/m³, beton armat ~2.500 kg/m³." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul", description: "Tab Greutate→Volum sau Volum→Greutate." },
        { title: "2. Introdu valoarea", description: "În kg sau m³." },
        { title: "3. Folosește presets", description: "Click pe sac 25 kg, 1 m³ etc." },
      ],
      useCases: [
        { icon: "🧱", title: "Construcții", description: "Comenzi beton la șantier (m³ → kg pentru transport)." },
        { icon: "🏗️", title: "Fundații și plăci", description: "Calcul volum betonare, planificare livrare." },
        { icon: "🔧", title: "DIY", description: "Sac mic ciment 25 kg ≈ 0,01 m³ beton finit." },
      ],
      aboutSection: {
        title: "Despre densitatea betonului",
        paragraphs: [
          "Betonul obișnuit are o densitate medie de 2.400 kg/m³, format din ciment (10–15%), nisip (25–30%), pietriș (40–45%) și apă (15–20%). Variațiile densității sunt determinate de tipul de agregat folosit și de prezența armăturii metalice.",
          "Tipuri principale: beton uzual (2.400 kg/m³), beton armat (2.500 kg/m³ — datorită oțelului care are 7.850 kg/m³), beton ușor cu agregate poroase (1.600–2.000 kg/m³, folosit la pereți non-portanți pentru a reduce greutatea), beton greu cu baritină sau magnetit (3.500–5.000 kg/m³, folosit la ecranare radiologică).",
        ],
      },
    },
  },
  // ─── Fázis 4 cleanup: convertoare densitate construcții ───────────────────
  "nisip-greutate-volum": {
    introText:
      "Convertor nisip greutate ↔ volum (densitate medie ρ = 1.500 kg/m³, valoare standard pentru nisip de râu uscat). Mod Greutate→Volum sau Volum→Greutate, presets construcții (sac, m³, basculantă, camion). Util la șantier, betonare, rostuire, rețete pentru tencuieli.",
    guide: [
      "1. Alege modul (greutate→volum sau invers).",
      "2. Introdu valoarea în câmpul corespunzător.",
      "3. Folosește presets pentru cantități uzuale construcții.",
    ],
    faq: [
      { q: "Câte kg are 1 m³ de nisip?", a: "Aproximativ 1.500 kg pentru nisip de râu uscat (valoarea standard). Variază 1.400–1.700 kg/m³ în funcție de umiditate, granulometrie și origine (râu, mare, cariera)." },
      { q: "Câți m³ sunt 1.000 kg de nisip?", a: "1.000 / 1.500 ≈ 0,667 m³ ≈ 667 litri. Aceasta este cantitatea uzuală pentru o roabă mare sau o sub-comandă." },
      { q: "De ce variază densitatea nisipului?", a: "Nisipul uscat ~1.400–1.500 kg/m³, nisipul umed ajunge la 1.500–1.600 kg/m³ (apa adăugată), nisipul compactat la 1.600–1.700 kg/m³. Tipul (râu vs cariera) și granulometria (fin 0-2 mm vs grosier 2-4 mm) influențează valoarea." },
      { q: "Câte tone încape într-un camion?", a: "Camionetă 3,5 t poate încărca ~2,3 m³ nisip; camion mediu 7,5 t → ~5 m³; basculantă 12 t → ~8 m³. Pentru rezervă (5–10%) comandă rotunjit la m³ întreg." },
      { q: "Cât nisip îmi trebuie pentru o tencuială?", a: "Pentru tencuială standard 2 cm grosime: ~30 l/m² = 0,03 m³/m² = 45 kg/m². Pentru o cameră de 25 m² perete: ~750 kg = 0,5 m³ nisip + ciment + apă." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul", description: "Tab Greutate→Volum sau Volum→Greutate, în funcție de ce ai." },
        { title: "2. Introdu valoarea", description: "În kg sau m³. Acceptă atât virgulă, cât și punct ca separator zecimal." },
        { title: "3. Folosește presets", description: "Click pe sac, roabă, big-bag, camion etc. pentru încărcare rapidă." },
      ],
      useCases: [
        { icon: "🏗️", title: "Construcții", description: "Comenzi nisip pentru fundații, betonare, rostuire pavaje." },
        { icon: "🧱", title: "Tencuieli și mortar", description: "Calcul cantitate pentru pereți tencuiți, șape, mortar zidărie." },
        { icon: "🚚", title: "Transport și logistică", description: "Capacitate camioane, încărcare basculante, comenzi big-bag." },
        { icon: "🏖️", title: "Amenajări", description: "Cutii cu nisip pentru copii, plaje artificiale, paturi pentru pavaj." },
      ],
      aboutSection: {
        title: "Despre densitatea nisipului",
        paragraphs: [
          "Nisipul este un agregat natural folosit masiv în construcții — în beton (alături de pietriș și ciment), în mortar (cu var și apă), la rostuirea pavajelor și ca strat de bază sub plăci de beton. Densitatea depinde de tipul nisipului (râu, mare, cariera), granulometria (fin 0-2 mm vs grosier 2-4 mm) și umiditate.",
          "Pentru calcule rapide, în RO se folosește valoarea standard de 1.500 kg/m³ pentru nisipul de râu uscat. Această valoare apare în toate normele de proiectare (NE 012:2010 pentru beton, C 17-82 pentru mortare). Pentru calcule de transport sau facturare, această valoare medie este suficient de precisă (eroare ±5–7%).",
          "Atenție la umiditate: nisipul stocat în aer liber, după ploaie, poate adăuga 5–15% greutate prin apă reținută între granule (efectul «bulk swelling»). Pentru transport, contează greutatea reală, nu doar volumul — un camion de 8 m³ poate ajunge la 12,8 t cu nisip umed, depășind limita de 12 t a unei basculante!",
        ],
      },
    },
  },

  "pietris-greutate-volum": {
    introText:
      "Convertor pietriș greutate ↔ volum (densitate medie ρ = 1.500 kg/m³ pentru pietriș uscat 4-32 mm, valoare standard în construcții RO). Mod bidirecțional, presets pentru saci, big-bag, basculante și camioane.",
    guide: [
      "1. Alege modul (greutate→volum sau invers).",
      "2. Introdu valoarea în câmpul corespunzător.",
      "3. Folosește presets pentru cantități uzuale.",
    ],
    faq: [
      { q: "Câte kg are 1 m³ de pietriș?", a: "Aproximativ 1.500 kg pentru pietriș uscat 4-32 mm (valoarea standard). Variază 1.400–1.700 kg/m³ în funcție de granulometrie și umiditate (pietriș fin ~1.500, pietriș concasat ~1.600, pietriș umed ~1.700 kg/m³)." },
      { q: "Câți m³ sunt 1.000 kg de pietriș?", a: "1.000 / 1.500 ≈ 0,667 m³ ≈ 667 litri. Pentru un calcul rapid: 1 tonă pietriș ≈ 0,67 m³." },
      { q: "Care este diferența între pietriș și sortul 4-8 sau 16-32?", a: "Sorturile sunt clase de granulometrie standardizate (NE 012-1:2007). 4-8 mm = pietriș mărgăritar (rostuire, dale), 8-16 mm = pietriș mediu (beton uzual), 16-32 mm = pietriș grosier (beton armat, fundații). Densitatea variază în jurul 1.500 kg/m³ pentru toate sorturile." },
      { q: "Câte tone de pietriș îmi trebuie pentru 1 m³ de beton?", a: "Pentru beton C20/25 standard: ~1.000 kg pietriș (0,67 m³) + 700 kg nisip + 300 kg ciment + 180 l apă pe m³ beton finit. Cantitatea de pietriș este aproximativ 50% din masa betonului." },
      { q: "Cât pietriș încape într-o basculantă?", a: "Basculantă 8 t poate încărca ~5,3 m³ pietriș (limita oficială). Basculantă 12 t → ~8 m³. Pentru cantități mai mari, se folosesc autobasculante de 16 t (~10,5 m³) sau camioane articulate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul", description: "Tab Greutate→Volum sau Volum→Greutate." },
        { title: "2. Introdu valoarea", description: "În kg sau m³, virgulă sau punct ca separator." },
        { title: "3. Folosește presets", description: "Click pe sac, big-bag, basculantă etc. pentru încărcare rapidă." },
      ],
      useCases: [
        { icon: "🏗️", title: "Beton și fundații", description: "Comandă pietriș pentru beton C20/25, fundații, plăci, stâlpi." },
        { icon: "🛣️", title: "Drumuri și pavaje", description: "Strat de bază sub asfalt, sub-pavaj, șanțuri de drenaj." },
        { icon: "🌳", title: "Amenajări exterioare", description: "Alei cu pietriș, drenaje grădină, paturi pentru pomi fructiferi." },
        { icon: "💧", title: "Drenaje", description: "Pietriș filtrant pentru drenaje, bazine de stocare apă pluvială." },
      ],
      aboutSection: {
        title: "Despre densitatea pietrișului",
        paragraphs: [
          "Pietrișul este un agregat natural rezultat din eroziunea râurilor, de obicei rotunjit (râuri/lacuri) sau concasat din roci dure (cariera). În construcții se folosește masiv în beton (40–45% din masa betonului uzual) și ca strat de drenaj sau de bază pentru pavaje și drumuri.",
          "Densitatea de 1.500 kg/m³ este valoarea de referință pentru pietrișul uscat în vrac — adică nu compactat, cu spații între granule. Densitatea reală a granulelor de piatră este mult mai mare (~2.700 kg/m³, ca o piatră compactă), dar la calculul cantității folosite în construcții, contează densitatea în vrac (cu spații).",
          "Sortul (granulometria) influențează ușor densitatea: pietrișul mărgăritar 4-8 mm are densitate ~1.450–1.500 kg/m³, sortul 8-16 mm ~1.500–1.550 kg/m³, sortul grosier 16-32 mm ~1.500–1.600 kg/m³. Pentru calcule de comandă, se folosește mereu valoarea medie de 1.500 kg/m³.",
        ],
      },
    },
  },

  "balast-greutate-volum": {
    introText:
      "Convertor balast greutate ↔ volum (densitate medie ρ = 1.600 kg/m³, amestec natural nisip + pietriș). Util la fundații, drumuri, sub-pavaj, beton de balast — cu presets construcții (big-bag, basculantă, camion).",
    guide: [
      "1. Alege modul (greutate→volum sau invers).",
      "2. Introdu valoarea în câmpul corespunzător.",
      "3. Folosește presets pentru cantități uzuale.",
    ],
    faq: [
      { q: "Câte kg are 1 m³ de balast?", a: "Aproximativ 1.600 kg pentru balast natural amestec uscat. Variază 1.500–1.700 kg/m³ în funcție de proporția nisip/pietriș (mai mult pietriș = mai dens) și umiditate." },
      { q: "Câți m³ sunt 1.000 kg de balast?", a: "1.000 / 1.600 = 0,625 m³ ≈ 625 litri. Pentru o regulă rapidă: 1 tonă balast ≈ 0,6 m³." },
      { q: "Care este diferența între balast și sub-balast?", a: "Balastul este amestecul natural nisip+pietriș (granulometrie 0-63 mm). Sub-balastul are granulometrie mai fină (0-31,5 mm) și se folosește ca strat intermediar la drumuri. Balastul concasat (din cariera) este mai uniform și se folosește la beton de balast." },
      { q: "Câte tone de balast îmi trebuie pentru o platformă auto?", a: "Pentru o platformă 5×3 m cu strat de 20 cm: 5 × 3 × 0,20 = 3 m³ → 4.800 kg balast (3 × 1.600). Adaugă 5–10% pentru compactare/pierderi → comandă 5,3 t (≈ 3,3 m³)." },
      { q: "Cât balast încape într-un camion 12 t?", a: "Un camion de 12 t poate încărca ~7,5 m³ balast (12.000 ÷ 1.600). Pentru cantități mai mari, autobasculante 16 t = 10 m³, articulate 24 t = 15 m³." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul", description: "Tab Greutate→Volum sau Volum→Greutate." },
        { title: "2. Introdu valoarea", description: "În kg sau m³, virgulă sau punct ca separator." },
        { title: "3. Folosește presets", description: "Click pe big-bag, basculantă, camion pentru încărcare rapidă." },
      ],
      useCases: [
        { icon: "🛣️", title: "Drumuri", description: "Strat de bază pentru drumuri, alei, parcări — sub-balast 0-31,5 mm." },
        { icon: "🏠", title: "Fundații case", description: "Strat de balast compactat sub plăcile de beton ale fundațiilor." },
        { icon: "🚗", title: "Platforme auto", description: "Platforme parcare, alei mașină, drumuri private cu strat de 20 cm balast compactat." },
        { icon: "🏗️", title: "Beton de balast", description: "Beton C8/10 sau C12/15 cu balast în loc de pietriș+nisip separat (rețetă mai economică)." },
      ],
      aboutSection: {
        title: "Despre densitatea balastului",
        paragraphs: [
          "Balastul (în maghiară «sóder», în limba franceză «tout-venant») este amestecul natural de nisip și pietriș, scos din albia râurilor sau din cariere. Densitatea de 1.600 kg/m³ reflectă proporția tipică ~40% nisip + 60% pietriș, cu densități individuale de 1.500 kg/m³ fiecare, dar cu mai puține spații între granule (nisipul umple golurile pietrișului).",
          "În RO, balastul se folosește la 4 categorii principale: (1) **strat de bază drumuri** — sub-balast compactat la 95% Proctor; (2) **fundații case** — strat de 20–30 cm sub plăci, drenaj și uniformizare; (3) **beton de balast** — clase joase C8/10, C12/15 pentru fundații simple, șape; (4) **platforme auto/industriale** — strat compactat de 20–40 cm pentru a transmite încărcările.",
          "Atenție la umiditate: balastul stocat în aer liber poate adăuga 8–15% greutate prin apă reținută. La transport, asta înseamnă diferența între o basculantă încărcată legal (12 t) și una supraîncărcată (13,5 t = amenzi). La șantier, se acceptă uzual o densitate de calcul 1.700 kg/m³ pentru balast umed proaspăt livrat.",
        ],
      },
    },
  },

  "densitate-kg-m3-g-cm3": {
    introText:
      "Convertor densitate între kg/m³ și g/cm³ cu tabel materiale uzuale (apă, oțel, aluminiu, beton, lemn, aur). 1 g/cm³ = 1.000 kg/m³.",
    guide: [
      "1. Introdu densitatea în kg/m³ sau g/cm³.",
      "2. Rezultatul apare instant.",
      "3. Click pe materialele uzuale pentru încărcare automată.",
    ],
    faq: [
      { q: "Care e relația kg/m³ ↔ g/cm³?", a: "1 g/cm³ = 1.000 kg/m³. Înmulțește cu 1.000 pentru a converti g/cm³ în kg/m³, împarte la 1.000 pentru direcția opusă." },
      { q: "Care e densitatea apei?", a: "Apa pură la 4 °C are densitatea de exact 1.000 kg/m³ = 1 g/cm³ (definiție istorică a kilogramului)." },
      { q: "Care e densitatea oțelului?", a: "Oțel: ~7.850 kg/m³ = 7,85 g/cm³ (variază 7.700–8.030 după aliaj)." },
      { q: "Care material e mai dens, aurul sau plumbul?", a: "Aurul (19.300 kg/m³) e aproape de două ori mai dens decât plumbul (11.340 kg/m³). De aici vine expresia \"greu ca aurul\"." },
    ],
    content: {
      howToSteps: [
        { title: "1. Introdu densitatea", description: "În kg/m³ sau g/cm³." },
        { title: "2. Vezi conversia", description: "Apare instant în celălalt câmp." },
        { title: "3. Folosește tabelul", description: "Click pe materialul dorit pentru încărcare automată." },
      ],
      useCases: [
        { icon: "🏗️", title: "Construcții", description: "Calcul greutate structuri din volum (oțel, beton, aluminiu)." },
        { icon: "🔬", title: "Laborator chimie", description: "Identificare substanțe după densitate." },
        { icon: "✈️", title: "Inginerie", description: "Selecție materiale după raport rezistență/densitate." },
      ],
      aboutSection: {
        title: "Despre densitate",
        paragraphs: [
          "Densitatea (notată ρ, \"rho\") este masa per unitatea de volum: ρ = m/V. Unitatea SI este kg/m³, dar g/cm³ este uzual pentru materiale solide pentru că dă valori mai \"prietenoase\" (1–20 în loc de 1.000–20.000).",
          "Conversia este simplă: 1 g/cm³ = 1.000 kg/m³. De ce? Pentru că 1 g = 0,001 kg și 1 cm³ = 0,000001 m³. Raportul gramelor și al cm³ ne dă 0,001 / 0,000001 = 1.000.",
          "Câteva valori de reținut: aer (1,2 kg/m³), lemn de pin (500 kg/m³), apă (1.000 kg/m³), beton (2.400 kg/m³), aluminiu (2.700 kg/m³), oțel (7.850 kg/m³), aur (19.300 kg/m³). Materialele cu densitate sub 1 g/cm³ plutesc pe apă (lemn, ulei), cele peste 1 g/cm³ se scufundă (metale, sticlă).",
        ],
      },
    },
  },
};
