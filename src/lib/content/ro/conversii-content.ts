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
};
