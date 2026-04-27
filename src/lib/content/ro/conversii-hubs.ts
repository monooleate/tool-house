// ============================================================
// CONVERSII SUB-HUBS (RO-only)
// 6 mértékegység-család gyűjtőoldala. Single source of truth.
// Minden konverter-tool ide van besorolva — a `toolUrl()` ezt
// használja a 3-szegmensű URL-hez (/conversii/{subcat}/{slug}/).
// ============================================================

export type ConversionSubcatSlug =
  | "lungime"
  | "masa"
  | "volum"
  | "suprafata"
  | "temperatura"
  | "densitate";

export interface ConversionSubcat {
  slug: ConversionSubcatSlug;
  label: string;
  icon: string;
  /** ≤ 160 char – meta description / sub-hub card description */
  description: string;
  /** 2-3 SEO bekezdés a sub-hub landing oldal intro-jához (RO) */
  intro: string[];
  /** Konverter-tool slug-ok (tool-registry) — ebbe a sub-hub-ba tartoznak */
  toolSlugs: string[];
  /** SEO kulcsszavak a sub-hub-ra */
  keywords: string[];
  /** 5-7 FAQ a sub-hub aljára */
  faq: { q: string; a: string }[];
  /** Sitemap lastmod */
  updatedAt: string;
}

export const CONVERSII_HUBS: ConversionSubcat[] = [
  {
    slug: "lungime",
    label: "Lungime",
    icon: "📏",
    description: "Convertoare de lungime: cm, m, km, inch, picioare. Formulă, exemple și răspunsuri rapide pentru valori uzuale.",
    intro: [
      "Convertoarele de lungime acoperă toate unitățile pe care le întâlnești zilnic — de la centimetri și metri din Sistemul Internațional, până la inch și picioare din unitățile anglo-saxone (utilizate la diagonale de ecran, înălțimi de profil sportiv și piese DIY).",
      "Fiecare convertor funcționează bidirecțional și afișează formula de conversie, astfel încât să înțelegi exact cum se face calculul. În plus, găsești zeci de pagini cu răspunsuri rapide pentru valorile cele mai căutate (de exemplu „170 cm în metri”, „32 inch în cm”).",
      "Util pentru: documente oficiale (înălțime în buletin/pașaport), achiziții online de monitoare și televizoare, profil medical sau sportiv, lucrări DIY și exerciții școlare la matematică.",
    ],
    toolSlugs: ["cm-metri", "km-metri", "cm-inch", "inch-cm", "picioare-cm"],
    keywords: [
      "convertor lungime",
      "transformare cm in metri",
      "convertor cm m",
      "cm in inch",
      "inch in cm",
      "kilometri in metri",
      "picioare in cm",
    ],
    faq: [
      {
        q: "Cum convertesc centimetri în metri?",
        a: "Împarte numărul de centimetri la 100. De exemplu: 170 cm ÷ 100 = 1,70 m. Formula: m = cm ÷ 100.",
      },
      {
        q: "Cât este 1 inch în centimetri?",
        a: "1 inch (țol) = 2,54 cm. Pentru a converti din inch în cm, înmulțește cu 2,54. Pentru invers, împarte la 2,54.",
      },
      {
        q: "Cum scriu înălțimea „5 picioare 9 inch” în centimetri?",
        a: "5 ft 9 in = 5 × 30,48 + 9 × 2,54 = 152,4 + 22,86 = 175,26 cm (≈ 175 cm).",
      },
      {
        q: "Câți metri are un kilometru?",
        a: "1 km = 1.000 m. La calculul invers: 1 m = 0,001 km. La maraton (42,195 km) = 42.195 m.",
      },
      {
        q: "Care este diagonala unui TV de 55 inch în centimetri?",
        a: "55 inch = 55 × 2,54 = 139,7 cm. Atenție: diagonala se măsoară colț la colț, nu lățimea ecranului.",
      },
      {
        q: "De ce unele convertoare arată 1 ft = 30,48 cm în loc de 30,5 cm?",
        a: "Definiția exactă (din 1959) este 1 ft = 30,48 cm (echivalent cu 12 inch × 2,54 cm). Rotunjirea la 30,5 cm pierde precizie la valori mari.",
      },
    ],
    updatedAt: "2026-04-27",
  },

  {
    slug: "masa",
    label: "Masă",
    icon: "⚖️",
    description: "Convertoare de masă: kg, grame, livre, tone. Formulă, tabel rapid și răspunsuri pentru valori uzuale.",
    intro: [
      "Convertoarele de masă (greutate) acoperă unitățile metrice (gram, kilogram, tonă) și unitățile anglo-saxone (livră / pound). Toate funcționează bidirecțional, cu formula afișată.",
      "Folosite zilnic la rețete culinare (rețete americane în pounds și ounces, rețete RO în grame și kilograme), la cântărirea greutății corporale (1 kg ≈ 2,205 livre) și la calculul tonajului în logistică și transport.",
      "Răspunsurile rapide acoperă valorile cele mai des căutate: 1 kg în grame, 70/80/100 kg în livre (greutate corporală), tone metrice convertite în kilograme pentru transport rutier și agricultură.",
    ],
    toolSlugs: ["kg-grame", "kg-livre", "tone-kg"],
    keywords: [
      "convertor masa",
      "convertor greutate",
      "kg in grame",
      "kg in livre",
      "tone in kg",
      "transformare kilograme",
    ],
    faq: [
      {
        q: "Cât este 1 kg în grame?",
        a: "1 kg = 1.000 g. Pentru rețete: 100 g = 0,1 kg, 500 g = 0,5 kg.",
      },
      {
        q: "Câte livre are 1 kg?",
        a: "1 kg = 2,2046 livre (lb / pounds). La greutatea corporală: 70 kg ≈ 154 lb, 80 kg ≈ 176 lb.",
      },
      {
        q: "Cât este 1 tonă metrică în kg?",
        a: "1 tonă metrică (t) = 1.000 kg. Atenție: tona scurtă (US) = 907,185 kg, tona lungă (UK) = 1.016 kg.",
      },
      {
        q: "Cum convertesc grame în kilograme rapid?",
        a: "Împarte la 1.000 (mută virgula 3 poziții la stânga). 250 g = 0,25 kg, 1.500 g = 1,5 kg.",
      },
      {
        q: "De ce kg în livre nu este exact 2,2?",
        a: "Definiția oficială (din 1959): 1 livră = 0,453592 kg, deci 1 kg = 2,20462 livre. Rotunjirea la 2,2 introduce eroare de ~0,2%.",
      },
    ],
    updatedAt: "2026-04-27",
  },

  {
    slug: "volum",
    label: "Volum",
    icon: "🥤",
    description: "Convertoare de volum: litri, mililitri, decilitri, m³, galon. Pentru rețete, consum apă/gaz și recipiente.",
    intro: [
      "Convertoarele de volum sunt indispensabile în bucătărie (rețete cu litri, mililitri, decilitri), la analiza facturii de utilități (m³ de apă sau gaz), precum și la conversii între sistemul metric și galoanele anglo-saxone (utile la auto sau benzină).",
      "1 litru = 1.000 ml = 10 dl = 0,001 m³. Galonul are două definiții: galon US = 3,785 litri, galon UK (imperial) = 4,546 litri — convertorul nostru le distinge clar.",
      "Răspunsurile rapide acoperă recipientele uzuale: 500 ml, 750 ml, 1 / 2 litri, 5 dl (smântână), 1.000 / 10.000 litri (rezervor), 5 / 10 / 20 galoane (bidoane US).",
    ],
    toolSlugs: ["litri-mililitri", "litri-decilitri", "litri-metri-cubi", "galon-litri"],
    keywords: [
      "convertor volum",
      "litri in ml",
      "litri in m3",
      "galon in litri",
      "decilitri in litri",
      "transformare volum",
    ],
    faq: [
      {
        q: "Câți ml are 1 litru?",
        a: "1 litru = 1.000 ml. Sticlele de apă uzuale: 500 ml = 0,5 l, 750 ml = 0,75 l, 1.500 ml = 1,5 l.",
      },
      {
        q: "Câți litri are 1 m³?",
        a: "1 m³ = 1.000 litri. Pe factura de apă, 1 m³ înseamnă o tonă de apă (1.000 kg).",
      },
      {
        q: "Câți litri are 1 galon?",
        a: "1 galon US = 3,785 litri, 1 galon UK (imperial) = 4,546 litri. Verifică sursa rețetei sau a recipientului!",
      },
      {
        q: "Cât este 1 dl în ml?",
        a: "1 decilitru = 100 ml = 0,1 litri. La rețete: 2 dl smântână = 200 ml.",
      },
      {
        q: "De ce 1 m³ are 1.000 litri?",
        a: "Pentru că 1 litru a fost definit ca volumul unui cub cu latura de 10 cm (1 dm³). Un cub cu latura 1 m conține 10 × 10 × 10 = 1.000 cuburi de 1 dm³.",
      },
    ],
    updatedAt: "2026-04-27",
  },

  {
    slug: "suprafata",
    label: "Suprafață",
    icon: "🟦",
    description: "Convertoare de suprafață: hectare, ari, metri pătrați. Pentru terenuri agricole și anunțuri imobiliare RO.",
    intro: [
      "Convertoarele de suprafață sunt esențiale pentru piața imobiliară din România, unde terenurile sunt anunțate frecvent în ari (1 ar = 100 m²) sau hectare (1 ha = 10.000 m² = 100 ari). Înțelegerea echivalențelor te ajută să compari oferte rapid.",
      "În agricultură, hectarul este unitatea standard: o parcelă de 1 ha are 10.000 m² (echivalent cu un teren de 100 × 100 m). În planificarea urbană și amenajări, metrul pătrat rămâne unitatea fundamentală.",
      "Răspunsurile rapide acoperă mărimile uzuale: 1 / 5 / 10 hectare (parcele agricole), 5 / 10 / 20 ari (terenuri intravilan), conversii inverse din m² în ari pentru loturile de casă.",
    ],
    toolSlugs: ["hectare-metri-patrati", "ari-metri-patrati"],
    keywords: [
      "convertor suprafata",
      "hectare in m2",
      "ari in m2",
      "1 hectar cati m2",
      "5 ari in mp",
      "imobiliar suprafata",
    ],
    faq: [
      {
        q: "Câți m² are 1 hectar?",
        a: "1 hectar (ha) = 10.000 m² = 100 ari. Echivalent cu un pătrat de 100 × 100 m.",
      },
      {
        q: "Câți m² are 1 ar?",
        a: "1 ar = 100 m². Un lot uzual la oraș (5 ari) are 500 m² — suficient pentru o casă cu curte mică.",
      },
      {
        q: "5 ari câți metri pătrați sunt?",
        a: "5 ari = 500 m². Este dimensiunea tipică a unui lot rezidențial intravilan în România.",
      },
      {
        q: "Câte hectare au 5.000 m²?",
        a: "5.000 m² = 0,5 ha = 50 ari. Echivalent cu jumătate de hectar — o parcelă agricolă mică.",
      },
      {
        q: "Care este diferența între ar și hectar?",
        a: "1 hectar (ha) = 100 ari = 10.000 m². Hectarul este folosit pentru terenuri mari (agricole), arul pentru terenuri intravilane (rezidențiale, comerciale).",
      },
    ],
    updatedAt: "2026-04-27",
  },

  {
    slug: "temperatura",
    label: "Temperatură",
    icon: "🌡️",
    description: "Convertor temperatură Celsius ↔ Fahrenheit. Formulă, tabel de referință și valori uzuale.",
    intro: [
      "Conversia între Celsius (°C) și Fahrenheit (°F) este utilă atunci când urmărești prognoze meteo americane, citești rețete americane (temperaturi de cuptor în °F) sau călătorești în SUA / UK.",
      "Formula directă: °F = °C × 9/5 + 32. Formula inversă: °C = (°F − 32) × 5/9. Punctele de referință: apa îngheață la 0 °C / 32 °F, fierbe la 100 °C / 212 °F, iar temperatura corpului uman este 37 °C / 98,6 °F.",
      "Răspunsurile rapide acoperă valorile cele mai căutate: 0 °C, 20 °C (cameră), 25 °C, 30 °C (vară), 37 °C (corp), 100 °C (fierbere), respectiv 32 °F, 70 °F (cameră US), 100 °F (febră), 212 °F, 350 °F (cuptor).",
    ],
    toolSlugs: ["celsius-fahrenheit"],
    keywords: [
      "convertor temperatura",
      "celsius in fahrenheit",
      "fahrenheit in celsius",
      "0 celsius in fahrenheit",
      "100 celsius",
      "37 grade celsius",
    ],
    faq: [
      {
        q: "Care este formula de conversie Celsius → Fahrenheit?",
        a: "°F = °C × 9/5 + 32. Exemplu: 20 °C × 9/5 + 32 = 36 + 32 = 68 °F.",
      },
      {
        q: "Cât este 100 °F în Celsius?",
        a: "100 °F = (100 − 32) × 5/9 = 37,8 °C. Aproximativ temperatura corpului uman cu febră ușoară.",
      },
      {
        q: "Cât este 350 °F în Celsius (cuptor)?",
        a: "350 °F = (350 − 32) × 5/9 ≈ 177 °C. Temperatura standard de coacere a prăjiturilor în rețete americane.",
      },
      {
        q: "La ce temperatură este aceeași valoare în °C și °F?",
        a: "La −40 grade: −40 °C = −40 °F. Acesta este singurul punct unde cele două scări coincid.",
      },
      {
        q: "De ce 0 °C ≠ 0 °F?",
        a: "Cele două scări au punct zero diferit. 0 °C = punctul de îngheț al apei, 0 °F = aproximativ cea mai joasă temperatură pe care Daniel Fahrenheit a putut-o produce în laboratorul său (1724).",
      },
    ],
    updatedAt: "2026-04-27",
  },

  {
    slug: "densitate",
    label: "Densitate",
    icon: "🧱",
    description: "Convertoare densitate materiale: beton, nisip, pietriș, balast. Greutate ↔ volum pentru construcții.",
    intro: [
      "Convertoarele de densitate sunt esențiale în construcții și amenajări: pe baza densității unui material, transformi greutatea (kg, tone) în volum (m³) și invers. Densitățile uzuale: beton = 2.400 kg/m³, nisip = 1.500 kg/m³, pietriș = 1.500 kg/m³, balast = 1.600 kg/m³.",
      "Folosite la calculul cantității de materiale pentru o lucrare: dacă șantierul are nevoie de 2 tone de beton, asta înseamnă ~0,83 m³ — știi exact câte camioane de transport trebuie să comanzi.",
      "În plus, convertorul kg/m³ ↔ g/cm³ este util în chimie, geologie și fizică (1.000 kg/m³ = 1 g/cm³ = densitatea apei).",
    ],
    toolSlugs: [
      "beton-greutate-volum",
      "nisip-greutate-volum",
      "pietris-greutate-volum",
      "balast-greutate-volum",
      "densitate-kg-m3-g-cm3",
    ],
    keywords: [
      "convertor densitate",
      "beton greutate volum",
      "nisip kg m3",
      "pietris densitate",
      "balast densitate",
      "kg m3 in g cm3",
    ],
    faq: [
      {
        q: "Care este densitatea betonului?",
        a: "Betonul standard armat: ~2.400 kg/m³. Beton ușor (cu argilă expandată): 1.600–1.800 kg/m³. Beton greu (cu agregate metalice): peste 3.000 kg/m³.",
      },
      {
        q: "Câte tone are 1 m³ de nisip?",
        a: "1 m³ de nisip uscat ≈ 1,5 tone (densitate ~1.500 kg/m³). Nisipul umed este mai greu (~1.700–1.900 kg/m³) datorită apei reținute.",
      },
      {
        q: "Cât pietriș îmi trebuie pentru o șapă de 2 m³?",
        a: "Densitatea pietrișului ≈ 1.500 kg/m³, deci 2 m³ × 1.500 = 3.000 kg = 3 tone. Comandă cu 5–10% surplus pentru pierderi.",
      },
      {
        q: "Cum convertesc kg/m³ în g/cm³?",
        a: "Împarte la 1.000. Exemplu: 2.400 kg/m³ (beton) = 2,4 g/cm³. Apa pură: 1.000 kg/m³ = 1 g/cm³.",
      },
      {
        q: "Care este diferența între pietriș, nisip și balast?",
        a: "Nisip = particule sub 4 mm (densitate 1.500 kg/m³). Pietriș = particule 4–63 mm. Balast = amestec de nisip și pietriș folosit în construcții (densitate ~1.600 kg/m³, ușor mai compact).",
      },
    ],
    updatedAt: "2026-04-27",
  },
];

// ─── Helper-ek ──────────────────────────────────────────────

/** Slug → ConversionSubcat objektum */
export function getConversionSubcat(slug: string): ConversionSubcat | undefined {
  return CONVERSII_HUBS.find(h => h.slug === slug);
}

/** Tool slug → annak sub-hub-ja (pl. "cm-metri" → "lungime") */
export function getSubcatForTool(toolSlug: string): ConversionSubcatSlug | undefined {
  for (const hub of CONVERSII_HUBS) {
    if (hub.toolSlugs.includes(toolSlug)) return hub.slug;
  }
  return undefined;
}

/** Sub-hub URL slug-ja a tool-okkal együtt */
export function getAllConversionToolSlugs(): string[] {
  return CONVERSII_HUBS.flatMap(h => h.toolSlugs);
}
