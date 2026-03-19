import type { ContentMap } from "../types.ts";

export const KEP_RO_CONTENT: ContentMap = {
  // ═══ 1. JPG → WEBP ═══════════════════════════════════════════════════════
  "jpg-webp": {
    introText:
      "Instrumentul nostru de conversie JPG în WebP îți permite să transformi imaginile JPEG în formatul modern WebP cu un singur clic. WebP oferă fișiere cu 25-35% mai mici la aceeași calitate vizuală, ceea ce înseamnă încărcare mai rapidă a paginilor web.",
    guide: [
      "1. Trage sau selectează fișierul/fișierele JPG pe care dorești să le convertești.",
      "2. Setează calitatea dorită (1–100) – valoarea implicită de 80 oferă un echilibru bun.",
      "3. Apasă butonul «Conversie» – fișierul WebP este generat instant în browserul tău.",
      "4. Descarcă imaginea WebP rezultată sau continuă cu alte fișiere.",
    ],
    faq: [
      { q: "La ce este utilă conversia JPG → WebP?", a: "Formatul WebP produce fișiere semnificativ mai mici decât JPG, menținând practic aceeași calitate a imaginii. Pe site-uri web, aceasta înseamnă încărcare mai rapidă și consum redus de lățime de bandă." },
      { q: "Este sigură conversia?", a: "Da, absolut. Conversia are loc exclusiv în browserul tău – niciun byte din imaginile tale nu ajunge pe vreun server." },
      { q: "Ce calitate ar trebui să aleg?", a: "Pentru imagini web, valoarea între 75–85 este ideală: reducere semnificativă a dimensiunii cu pierdere de calitate aproape imperceptibilă. Pentru arhive foto, se recomandă 90+." },
      { q: "Câte imagini pot converti simultan?", a: "Nu există limită – poți procesa zeci de imagini simultan, deoarece conversia are loc în browserul tău." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este complet responsiv și funcționează în orice browser modern, inclusiv pe dispozitive mobile." },
      { q: "Toate browserele acceptă WebP?", a: "Da, din 2024 toate browserele moderne (Chrome, Firefox, Safari, Edge) acceptă pe deplin formatul WebP." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea fișierului JPG", description: "Trage imaginea JPG/JPEG în zona de încărcare sau apasă butonul de selectare a fișierului." },
        { title: "2. Setarea calității", description: "Ajustează calitatea WebP dorită cu ajutorul cursorului (1–100). O valoare mai mică produce un fișier mai mic, dar calitate mai scăzută." },
        { title: "3. Conversie și descărcare", description: "Apasă butonul de conversie, apoi descarcă fișierul WebP generat. Reducerea dimensiunii este vizibilă imediat." },
      ],
      useCases: [
        { icon: "🌐", title: "Optimizarea site-ului web", description: "Folosind imagini WebP, poți reduce timpul de încărcare al site-ului cu până la 30% față de JPG." },
        { icon: "📱", title: "Aplicații mobile", description: "Dimensiuni mai mici ale imaginilor înseamnă mai puțin trafic de date și încărcare mai rapidă pentru utilizatorii mobili." },
        { icon: "📧", title: "Campanii de email", description: "Cu imagini de dimensiuni mai mici, șabloanele de newsletter se încarcă mai rapid." },
        { icon: "🛒", title: "Imagini pentru magazin online", description: "Convertind sute de imagini de produse, poți economisi spațiu semnificativ de stocare și lățime de bandă." },
      ],
      aboutSection: {
        title: "Despre formatele JPG și WebP",
        paragraphs: [
          "JPEG (JPG) este unul dintre cele mai răspândite formate de imagine, standardizat în 1992. Utilizează compresie cu pierderi, oferind un echilibru bun între dimensiunea fișierului și calitatea imaginii, dar formatul modern WebP îl depășește și în acest aspect.",
          "WebP a fost dezvoltat de Google în 2010 și este acum acceptat de toate browserele majore. Oferă atât compresie cu pierderi, cât și fără pierderi, și acceptă transparența (canal alfa) și animațiile – toate la o dimensiune mai mică a fișierului.",
          "Conversia JPG → WebP este recomandată în special pentru imaginile de pe site-uri web și aplicații, unde dimensiunea mai mică a fișierului are impact direct asupra vitezei de încărcare, experienței utilizatorului și optimizării pentru motoarele de căutare (SEO).",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru utilizare web, calitatea între 75–85 este ideală – diferență aproape imperceptibilă față de JPG, dar fișier semnificativ mai mic." },
        { icon: "📊", tip: "Urmărește reducerea dimensiunii după conversie: o economie de 25–35% este complet normală pentru conversia JPG → WebP." },
        { icon: "🖼️", tip: "Pentru fotografii, merită o calitate mai mare (85+), iar pentru grafice, una mai mică (60–75)." },
        { icon: "⚡", tip: "Google PageSpeed Insights recomandă în mod explicit utilizarea formatului WebP pentru un scor mai bun de performanță." },
      ],
      formatComparison: {
        title: "Comparație JPG vs WebP",
        columns: ["Proprietate", "JPG", "WebP"],
        rows: [
          { feature: "Tip de compresie", values: ["Cu pierderi", "Cu pierderi + fără pierderi"] },
          { feature: "Dimensiune medie a fișierului", values: ["Mai mare", "Cu 25–35% mai mică"] },
          { feature: "Transparență (alfa)", values: ["Nu acceptă", "Acceptă"] },
          { feature: "Animație", values: ["Nu acceptă", "Acceptă"] },
          { feature: "Suport în browsere", values: ["Universal", "Toate browserele moderne"] },
        ],
      },
    },
  },

  // ═══ 2. PNG → WEBP ═══════════════════════════════════════════════════════
  "png-webp": {
    introText:
      "Convertește imaginile PNG în format WebP pentru dimensiuni mai mici ale fișierelor, păstrând în același timp transparența. WebP produce fișiere cu 40-60% mai mici decât PNG, chiar și în cazul compresiei fără pierderi.",
    guide: [
      "1. Trage sau selectează fișierul/fișierele PNG pe care dorești să le convertești.",
      "2. Alege tipul de compresie: fără pierderi (calitate perfectă) sau cu pierderi (fișier mai mic).",
      "3. Apasă butonul «Conversie» – fișierul WebP este generat instant în browser.",
      "4. Descarcă rezultatul sau continuă conversia altor imagini.",
    ],
    faq: [
      { q: "La ce este utilă conversia PNG → WebP?", a: "Formatul WebP produce fișiere semnificativ mai mici decât PNG, păstrând în același timp transparența și – în modul fără pierderi – calitatea perfectă a imaginii." },
      { q: "Este sigură conversia?", a: "Da, procesarea are loc în întregime în browserul tău. Nicio dată nu părăsește computerul tău." },
      { q: "Se păstrează transparența?", a: "Da, formatul WebP acceptă pe deplin canalul alfa, astfel încât transparența din PNG este păstrată." },
      { q: "Ce compresie ar trebui să aleg?", a: "Dacă ai nevoie de calitate pixel-perfect (logo-uri, iconițe), alege modul fără pierderi. Pentru fotografii și imagini web, modul cu pierderi oferă fișiere mai mici." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul funcționează în orice browser modern, inclusiv pe dispozitive mobile." },
      { q: "Există limită de dimensiune a fișierului?", a: "Nu există limită pe server, deoarece conversia are loc local. Viteza de procesare depinde de performanța computerului tău." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea fișierului PNG", description: "Trage imaginea PNG în zona de încărcare sau apasă butonul de selectare." },
        { title: "2. Selectarea modului de compresie", description: "Alege conversia fără pierderi (lossless) sau cu pierderi (lossy) conform nevoilor tale." },
        { title: "3. Conversie și descărcare", description: "Pornește conversia, apoi descarcă fișierul WebP generat. Transparența este păstrată automat." },
      ],
      useCases: [
        { icon: "🎨", title: "Logo-uri și iconițe", description: "Poți stoca logo-uri și iconițe cu fundal transparent în WebP, la dimensiuni mai mici, fără pierdere de calitate." },
        { icon: "🌐", title: "Viteza site-ului", description: "Trecerea de la PNG la WebP reduce drastic dimensiunea imaginilor, accelerând încărcarea paginii." },
        { icon: "🎮", title: "Elemente UI", description: "Elementele de interfață utilizator (butoane, grafice de fundal) pot fi comprimate eficient în WebP." },
        { icon: "📊", title: "Infografice", description: "Infograficele care conțin text și grafice vor fi semnificativ mai mici în format WebP." },
      ],
      aboutSection: {
        title: "Despre formatele PNG și WebP",
        paragraphs: [
          "PNG (Portable Network Graphics) este un format cu compresie fără pierderi care garantează imagini de calitate perfectă cu suport pentru transparență. Dezavantajul este dimensiunea relativ mare a fișierului, în special în cazul fotografiilor.",
          "WebP combină avantajele PNG (transparență, mod fără pierderi) cu algoritmi moderni de compresie, obținând fișiere cu 40-60% mai mici la aceeași calitate. Datorită dezvoltării de către Google, se integrează optim în ecosistemul web.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru logo-uri și iconițe, alege modul fără pierderi pentru a păstra muchiile perfecte." },
        { icon: "🔍", tip: "Pentru fotografii, modul cu pierderi poate aduce o reducere de până la 70% a dimensiunii, cu o pierdere acceptabilă de calitate." },
        { icon: "📦", tip: "Dacă ai multe fișiere PNG, convertește-le pe toate simultan – browserul le procesează în paralel." },
      ],
      formatComparison: {
        title: "Comparație PNG vs WebP",
        columns: ["Proprietate", "PNG", "WebP"],
        rows: [
          { feature: "Tip de compresie", values: ["Fără pierderi", "Fără pierderi + cu pierderi"] },
          { feature: "Dimensiune medie a fișierului", values: ["Mare", "Cu 40–60% mai mică"] },
          { feature: "Transparență (alfa)", values: ["Acceptă", "Acceptă"] },
          { feature: "Adâncime de culoare", values: ["Până la 48 biți", "Până la 32 biți"] },
          { feature: "Suport în browsere", values: ["Universal", "Toate browserele moderne"] },
        ],
      },
    },
  },

  // ═══ 3. JPG → PNG ════════════════════════════════════════════════════════
  "jpg-png": {
    introText:
      "Transformă imaginile JPG în format PNG atunci când ai nevoie de calitate fără pierderi sau de fundal transparent. Conversia se realizează în câteva secunde, direct în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Trage sau selectează fișierul JPG/JPEG.",
      "2. Apasă butonul «Conversie».",
      "3. Descarcă fișierul PNG generat – calitatea imaginii este păstrată perfect.",
    ],
    faq: [
      { q: "La ce este utilă conversia JPG → PNG?", a: "Dacă trebuie să editezi în continuare imaginea JPG sau dorești să o păstrezi într-un format fără pierderi, PNG asigură că la salvările ulterioare calitatea nu se deteriorează." },
      { q: "Este sigură conversia?", a: "Da, toată procesarea are loc în browser – imaginile tale nu ajung pe niciun server." },
      { q: "Fișierul PNG va fi mai mare decât JPG?", a: "Da, de obicei fișierul PNG este mai mare, deoarece folosește compresie fără pierderi. În schimb, calitatea rămâne perfectă și la editări ulterioare." },
      { q: "Pot obține fundal transparent?", a: "Conversia în sine nu face fundalul transparent, dar formatul PNG acceptă transparența, astfel încât ulterior poți elimina fundalul cu un editor." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul funcționează în orice browser modern, pe mobil și desktop." },
      { q: "Se pierde calitatea la conversie?", a: "Nu, conversia JPG → PNG este fără pierderi: calitatea originală a fișierului JPG este păstrată integral (dar pierderea anterioară de calitate din compresia JPG nu poate fi recuperată)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea imaginii JPG", description: "Trage fișierul JPEG/JPG în zona de încărcare sau folosește butonul de selectare." },
        { title: "2. Pornirea conversiei", description: "Apasă butonul de conversie – procesarea are loc instant în browserul tău." },
        { title: "3. Descărcarea PNG", description: "Descarcă fișierul PNG generat. Calitatea imaginii rămâne neschimbată." },
      ],
      useCases: [
        { icon: "✏️", title: "Editare de imagini", description: "Formatul PNG este ideal pentru editări ulterioare, deoarece la salvare calitatea nu se deteriorează." },
        { icon: "🏷️", title: "Logo-uri și grafice", description: "Dacă dorești să creezi un logo sau o grafică din JPG, formatul PNG oferă o bază mai bună pentru gestionarea transparenței." },
        { icon: "🖨️", title: "Tipărire", description: "Pentru imprimare, formatul PNG fără pierderi asigură o calitate mai bună." },
        { icon: "📋", title: "Inserare în documente", description: "Inserat în prezentări și documente, PNG-ul păstrează muchiile clare și textul." },
      ],
      aboutSection: {
        title: "De ce să convertești din JPG în PNG?",
        paragraphs: [
          "Compresia cu pierderi a JPG deteriorează calitatea imaginii la fiecare salvare. Dacă editezi și salvezi o imagine JPG de mai multe ori, pierderea de calitate se acumulează. Convertind în PNG, poți opri acest proces.",
          "Formatul PNG folosește compresie fără pierderi, astfel încât, indiferent de câte salvări și editări, calitatea originală este păstrată. În plus, acceptă transparența (canal alfa), ceea ce este esențial pentru lucrări grafice.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Dacă planifici editări ulterioare, convertește întâi în PNG – astfel eviți pierderea cumulativă de calitate a JPG." },
        { icon: "⚠️", tip: "Pierderea anterioară de calitate din compresia JPG nu poate fi recuperată prin conversia în PNG." },
        { icon: "📁", tip: "Reține că fișierele PNG sunt mai mari – pentru publicare web, WebP este o alegere mai bună." },
      ],
      formatComparison: {
        title: "Comparație JPG vs PNG",
        columns: ["Proprietate", "JPG", "PNG"],
        rows: [
          { feature: "Tip de compresie", values: ["Cu pierderi", "Fără pierderi"] },
          { feature: "Dimensiune fișier", values: ["Mai mică", "Mai mare"] },
          { feature: "Transparență", values: ["Nu acceptă", "Acceptă"] },
          { feature: "Salvări multiple", values: ["Calitatea se deteriorează", "Calitatea se păstrează"] },
          { feature: "Utilizare optimă", values: ["Fotografii pe web", "Grafice, editare"] },
        ],
      },
    },
  },

  // ═══ 4. PNG → JPG ════════════════════════════════════════════════════════
  "png-jpg": {
    introText:
      "Convertește imaginile PNG în format JPG pentru dimensiuni mai mici ale fișierelor. Ideal atunci când dorești să partajezi fotografii sau să le încarci pe web, iar transparența nu este necesară. Conversia se realizează în browser, instantaneu.",
    guide: [
      "1. Trage sau selectează fișierul/fișierele PNG.",
      "2. Setează calitatea JPG dorită cu ajutorul cursorului (1–100).",
      "3. Alege culoarea de fundal pentru zonele transparente (implicit alb).",
      "4. Apasă butonul «Conversie», apoi descarcă fișierul JPG.",
    ],
    faq: [
      { q: "La ce este utilă conversia PNG → JPG?", a: "Dacă imaginile PNG sunt prea mari pentru email, încărcare web sau rețele sociale, formatul JPG produce fișiere semnificativ mai mici." },
      { q: "Este sigură conversia?", a: "Da, conversia are loc exclusiv în browserul tău. Nicio imagine nu ajunge pe server." },
      { q: "Ce se întâmplă cu fundalul transparent?", a: "JPG nu acceptă transparența, astfel că zonele transparente vor fi umplute cu culoarea de fundal aleasă (implicit alb)." },
      { q: "Ce calitate ar trebui să aleg?", a: "Pentru utilizare web 80–90, pentru rețele sociale 85–95, pentru imprimare 95–100 este valoarea recomandată." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul funcționează perfect în orice browser modern și pe dispozitive mobile." },
      { q: "Pot converti mai multe fișiere simultan?", a: "Da, poți procesa mai multe fișiere PNG simultan – conversia se realizează în paralel în browserul tău." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea fișierului PNG", description: "Trage imaginea PNG în zona de încărcare sau apasă butonul de selectare." },
        { title: "2. Setarea calității și a culorii de fundal", description: "Ajustează calitatea JPG și alege culoarea de fundal pentru zonele transparente." },
        { title: "3. Conversie", description: "Apasă butonul de conversie – fișierul JPG este generat în câteva secunde." },
        { title: "4. Descărcare", description: "Descarcă fișierul JPG generat sau continuă conversia altor imagini." },
      ],
      useCases: [
        { icon: "📧", title: "Atașamente email", description: "Fișierele JPG sunt mult mai mici, astfel pot fi trimise și primite mai rapid prin email." },
        { icon: "📱", title: "Rețele sociale", description: "Majoritatea platformelor sociale preferă JPG pentru încărcare și afișare mai rapidă." },
        { icon: "💾", title: "Economie de spațiu", description: "Convertind colecții mari de fotografii PNG în JPG, poți elibera spațiu semnificativ de stocare." },
        { icon: "🌐", title: "Încărcare web", description: "Pentru bloguri și magazine online, formatul JPG este cel mai larg acceptat." },
      ],
      aboutSection: {
        title: "De ce să convertești din PNG în JPG?",
        paragraphs: [
          "Compresia fără pierderi a formatului PNG asigură o calitate excelentă, dar dimensiunea fișierului – în special pentru fotografii – poate fi de câteva ori mai mare decât JPG. Dacă nu ai nevoie de transparență, JPG este o alegere mai eficientă.",
          "Compresia cu pierderi a JPG a fost optimizată special pentru fotografii: elimină detalii aproape imperceptibile pentru ochi, obținând fișiere cu până la 80% mai mici. Aceasta înseamnă încărcare mai rapidă, cerințe de stocare mai mici și performanță web mai bună.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru fotografii, calitatea 85 este cel mai bun compromis între dimensiunea fișierului și calitatea imaginii." },
        { icon: "🎨", tip: "Dacă dorești să schimbi fundalul transparent cu altă culoare decât alb, folosește selectorul de culoare de fundal." },
        { icon: "⚠️", tip: "La grafice cu linii subțiri și text, compresia JPG poate produce artefacte – în acest caz folosește calitate ridicată (95+)." },
        { icon: "📊", tip: "Din comparația dimensiunii fișierului înainte și după conversie, poți vedea economia realizată." },
      ],
      formatComparison: {
        title: "Comparație PNG vs JPG",
        columns: ["Proprietate", "PNG", "JPG"],
        rows: [
          { feature: "Tip de compresie", values: ["Fără pierderi", "Cu pierderi"] },
          { feature: "Dimensiune fișier (fotografii)", values: ["Mare", "Mică"] },
          { feature: "Transparență", values: ["Acceptă", "Nu acceptă"] },
          { feature: "Utilizare optimă", values: ["Grafice, logo-uri", "Fotografii, imagini web"] },
          { feature: "Număr de culori", values: ["Până la 16 milioane + alfa", "Până la 16 milioane"] },
        ],
      },
    },
  },

  // ═══ 5. WEBP → JPG ═══════════════════════════════════════════════════════
  "webp-jpg": {
    introText:
      "Convertește imaginile WebP în format JPG atunci când ai nevoie de compatibilitate mai largă. Formatul JPG este acceptat de orice dispozitiv, software și platformă. Conversia se realizează în câteva secunde, direct în browserul tău.",
    guide: [
      "1. Trage sau selectează fișierul/fișierele WebP.",
      "2. Setează calitatea JPG cu ajutorul cursorului (1–100).",
      "3. Apasă butonul «Conversie».",
      "4. Descarcă imaginea JPG generată.",
    ],
    faq: [
      { q: "La ce este utilă conversia WebP → JPG?", a: "Când dorești să deschizi o imagine WebP cu un program sau dispozitiv care nu acceptă WebP, sau când ai nevoie de format JPG pentru încărcare sau imprimare." },
      { q: "Este sigură conversia?", a: "Da, întregul proces se desfășoară în browserul tău. Nicio imagine nu ajunge pe server sau la terți." },
      { q: "Va crește dimensiunea fișierului?", a: "Formatul JPG comprimă eficient fotografiile, astfel că creșterea dimensiunii fișierului este de obicei minimă, în special la calitate de 80-85." },
      { q: "Ce se întâmplă cu părțile transparente?", a: "JPG nu acceptă transparența – zonele transparente vor fi umplute cu culoarea de fundal alb." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este disponibil în orice browser modern, pe mobil și desktop." },
      { q: "Câte imagini pot converti?", a: "Nu există limită, deoarece procesarea are loc în browserul tău. Poți converti mai multe imagini succesiv sau simultan." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea fișierului WebP", description: "Trage imaginea WebP în zona de încărcare sau apasă butonul de selectare." },
        { title: "2. Setarea calității JPG", description: "Alege nivelul de compresie dorit – o valoare mai mare înseamnă calitate mai bună, dar fișier mai mare." },
        { title: "3. Conversie și descărcare", description: "Pornește conversia, apoi descarcă fișierul JPG generat." },
      ],
      useCases: [
        { icon: "🖨️", title: "Imprimare", description: "Majoritatea tipografiilor și serviciilor de imprimare acceptă format JPG sau PDF." },
        { icon: "📂", title: "Compatibilitate software", description: "Editoarele de imagini mai vechi nu acceptă întotdeauna WebP – cu JPG ești în siguranță." },
        { icon: "📤", title: "Încărcare pe platforme", description: "Unele platforme, formulare și sisteme nu acceptă încă formatul WebP." },
        { icon: "🤝", title: "Partajare", description: "JPG este formatul de imagine universal acceptat, pe care oricine îl poate deschide." },
      ],
      aboutSection: {
        title: "De ce să convertești din WebP în JPG?",
        paragraphs: [
          "Deși WebP este un format modern excelent, compatibilitatea nu este întotdeauna garantată. Sisteme de operare mai vechi, editoare de imagini, software de imprimare și anumite platforme online nu acceptă WebP.",
          "JPG a devenit cel mai răspândit format de imagine din lume în ultimii peste 30 de ani. Practic orice dispozitiv, software și platformă îl poate gestiona – conversia asigură astfel compatibilitate maximă.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Dacă convertești doar pentru compatibilitate, folosește calitate de 90+ pentru a păstra calitatea imaginii cât mai bine." },
        { icon: "⚠️", tip: "Dacă imaginea WebP conține transparență, ia în considerare conversia în PNG în loc de JPG." },
        { icon: "📊", tip: "Pentru imprimare, folosește întotdeauna calitate de 95-100." },
      ],
      formatComparison: {
        title: "Comparație WebP vs JPG",
        columns: ["Proprietate", "WebP", "JPG"],
        rows: [
          { feature: "Eficiența compresiei", values: ["Excelentă", "Bună"] },
          { feature: "Compatibilitate", values: ["Browsere moderne", "Universală"] },
          { feature: "Transparență", values: ["Acceptă", "Nu acceptă"] },
          { feature: "Suport în editoare", values: ["Limitat", "Aproape orice software"] },
          { feature: "Suport pentru imprimare", values: ["Limitat", "Complet"] },
        ],
      },
    },
  },

  // ═══ 6. WEBP → PNG ═══════════════════════════════════════════════════════
  "webp-png": {
    introText:
      "Convertește imaginile WebP în format PNG, păstrând transparența și calitatea fără pierderi. Formatul PNG este acceptat de aproape orice editor de imagini și platformă, asigurând astfel compatibilitatea.",
    guide: [
      "1. Trage sau selectează fișierul/fișierele WebP.",
      "2. Apasă butonul «Conversie».",
      "3. Transparența este păstrată automat în PNG.",
      "4. Descarcă fișierul PNG generat.",
    ],
    faq: [
      { q: "La ce este utilă conversia WebP → PNG?", a: "Când dorești să folosești imaginea WebP cu fundal transparent într-un software care nu gestionează WebP, sau când ai nevoie de un format fără pierderi pentru editare." },
      { q: "Este sigură conversia?", a: "Da, toată procesarea are loc în browserul tău – imaginile tale nu ajung pe niciun server." },
      { q: "Se păstrează transparența?", a: "Da, formatul PNG acceptă pe deplin canalul alfa, astfel încât transparența din WebP este păstrată perfect." },
      { q: "Fișierul PNG va fi mai mare?", a: "Da, compresia fără pierderi a PNG produce fișiere mai mari decât WebP. Acesta este prețul compatibilității și calității maxime." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este complet responsiv și disponibil în orice browser modern." },
      { q: "Pot converti mai multe imagini simultan?", a: "Da, poți procesa mai multe fișiere WebP simultan – conversia se realizează în paralel." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea fișierului WebP", description: "Trage imaginea WebP în zona de încărcare sau folosește butonul de selectare a fișierului." },
        { title: "2. Pornirea conversiei", description: "Apasă butonul de conversie – PNG-ul este generat instant în browser." },
        { title: "3. Descărcarea PNG", description: "Descarcă fișierul PNG generat – transparența și calitatea sunt păstrate perfect." },
      ],
      useCases: [
        { icon: "✏️", title: "Editare de imagini", description: "PNG-ul este acceptat de orice editor de imagini (Photoshop, GIMP, Canva), astfel poți prelucra imaginea cu ușurință." },
        { icon: "🎨", title: "Lucrări grafice", description: "Elementele cu fundal transparent (logo-uri, iconițe) sunt gestionate de orice software grafic în format PNG." },
        { icon: "📱", title: "Dezvoltare de aplicații", description: "Pentru aplicații mobile și desktop, formatul PNG are o compatibilitate mai largă." },
        { icon: "🖨️", title: "Imprimare", description: "În formatul PNG fără pierderi poți asigura calitatea de imprimare." },
      ],
      aboutSection: {
        title: "De ce să convertești din WebP în PNG?",
        paragraphs: [
          "WebP este un format modern, dar multe editoare de imagini, software-uri grafice și sisteme mai vechi nu îl acceptă. Conversia în PNG asigură compatibilitate largă, păstrând în același timp calitatea fără pierderi și transparența.",
          "PNG este deosebit de ideal dacă dorești să editezi imaginea în continuare: datorită compresiei fără pierderi, calitatea originală este păstrată indiferent de câte salvări și modificări efectuezi.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Dacă nu ai nevoie de transparență și dimensiunea fișierului contează, ia în considerare conversia în JPG în loc de PNG." },
        { icon: "🎨", tip: "PNG este ideal pentru elemente grafice, logo-uri și iconițe, unde muchiile clare sunt importante." },
        { icon: "📁", tip: "Fișierele PNG sunt mai mari decât WebP – în cazul unui număr mare de imagini, gândește-te la cerințele de stocare." },
      ],
      formatComparison: {
        title: "Comparație WebP vs PNG",
        columns: ["Proprietate", "WebP", "PNG"],
        rows: [
          { feature: "Compresie", values: ["Cu pierderi + fără pierderi", "Fără pierderi"] },
          { feature: "Dimensiune fișier", values: ["Mai mică", "Mai mare"] },
          { feature: "Transparență", values: ["Acceptă", "Acceptă"] },
          { feature: "Suport în editoare", values: ["Limitat", "Universal"] },
          { feature: "Animație", values: ["Acceptă", "Nu (APNG limitat)"] },
        ],
      },
    },
  },

  // ═══ 7. REDIMENSIONARE IMAGINE ════════════════════════════════════════════
  "atmeretezes": {
    introText:
      "Redimensionează imaginile cu precizie la pixel, la lățimea și înălțimea dorite. Acceptă păstrarea proporțiilor, setarea de dimensiuni personalizate și redimensionarea procentuală. Toată procesarea are loc în browserul tău.",
    guide: [
      "1. Trage sau selectează imaginea de redimensionat (JPG, PNG, WebP).",
      "2. Introdu lățimea și înălțimea dorite în pixeli, sau alege o dimensiune prestabilită.",
      "3. Decide dacă dorești să păstrezi proporțiile (recomandat).",
      "4. Apasă butonul «Redimensionare», apoi descarcă rezultatul.",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Servește la modificarea lățimii și înălțimii imaginilor: potrivit pentru ajustarea pozelor de profil pentru rețele sociale, imagini pentru site-uri web sau dimensiuni pentru imprimare." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, procesarea imaginii are loc în întregime în browserul tău – nicio imagine nu ajunge pe server." },
      { q: "Ce formate acceptă?", a: "Poți redimensiona imagini în format JPG, PNG și WebP. Formatul de ieșire corespunde celui de intrare." },
      { q: "Se pierde calitatea la redimensionare?", a: "La micșorare, pierderea de calitate este minimă. La mărire, imaginea se poate estompa – o imagine mai mare nu poate fi produsă fără pierderi dintr-una mai mică." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este complet responsiv și disponibil în orice browser modern, inclusiv pe dispozitive mobile." },
      { q: "Pot păstra proporțiile?", a: "Da, implicit proporțiile sunt blocate: la introducerea unei laturi, cealaltă se calculează automat pentru a evita distorsiunea imaginii." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea în zona de încărcare sau apasă butonul de selectare a fișierului." },
        { title: "2. Specificarea dimensiunii", description: "Introdu lățimea și înălțimea dorite în pixeli. Activează blocarea proporțiilor dacă nu dorești distorsionarea imaginii." },
        { title: "3. Redimensionare", description: "Apasă butonul de redimensionare – rezultatul apare imediat în previzualizare." },
        { title: "4. Descărcare", description: "Descarcă imaginea redimensionată în formatul original." },
      ],
      useCases: [
        { icon: "📱", title: "Rețele sociale", description: "Creează poza de profil, coperta sau postarea de dimensiuni perfecte pentru orice platformă (Facebook, Instagram, LinkedIn)." },
        { icon: "🌐", title: "Imagini pentru site web", description: "Optimizează dimensiunea imaginilor pentru încărcare mai rapidă – nu încărca o imagine de 4000px într-un spațiu de 800px." },
        { icon: "📧", title: "Atașamente email", description: "Reduce dimensiunea imaginii pentru ca atașamentul email să nu depășească limita de dimensiune." },
        { icon: "🖨️", title: "Imprimare", description: "Setează dimensiunea în pixeli a imaginii conform dimensiunii și rezoluției de imprimare dorite." },
      ],
      aboutSection: {
        title: "Despre redimensionarea imaginilor",
        paragraphs: [
          "Redimensionarea imaginii înseamnă modificarea numărului de pixeli al imaginii. La micșorare, pixelii în exces sunt eliminați, iar la mărire, pixeli noi sunt interpolați din cei existenți. Redimensionarea afectează atât dimensiunea fișierului, cât și calitatea afișării.",
          "Raportul de aspect este raportul dintre lățime și înălțime. Dacă nu păstrăm raportul de aspect original la redimensionare, imaginea se va distorsiona – de aceea merită să păstrezi mereu blocarea proporțiilor activată.",
          "Browserele moderne folosesc algoritmi de interpolare de înaltă calitate, astfel încât redimensionarea în browser oferă rezultate profesionale.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Păstrează mereu proporțiile, cu excepția cazului în care dorești intenționat să distorsionezi imaginea." },
        { icon: "📏", tip: "Dimensiuni pentru rețele sociale: copertă Facebook 820×312, postare Instagram 1080×1080, banner LinkedIn 1584×396." },
        { icon: "⚠️", tip: "Mărirea unei imagini mici va produce pierdere de calitate – pe cât posibil, micșorează mereu din originalul mai mare." },
        { icon: "🔢", tip: "Cu redimensionarea procentuală poți micșora sau mări proporțional imaginea față de dimensiunea originală." },
      ],
    },
  },

  // ═══ 8. COMPRIMARE IMAGINE ════════════════════════════════════════════════
  "tomorites": {
    introText:
      "Comprimă imaginile la dimensiunea minimă posibilă a fișierului, menținând o calitate acceptabilă. Instrumentul gestionează formate JPG, PNG și WebP, iar compresia se realizează în întregime în browserul tău.",
    guide: [
      "1. Trage sau selectează imaginile pe care dorești să le comprimi.",
      "2. Setează nivelul de compresie cu ajutorul cursorului (valoare mai mică = fișier mai mic).",
      "3. Apasă butonul «Comprimare» – previzualizarea și reducerea dimensiunii apar imediat.",
      "4. Descarcă imaginea comprimată sau continuă cu următorul fișier.",
    ],
    faq: [
      { q: "La ce este utilă comprimarea imaginilor?", a: "Compresia imaginilor reduce dimensiunea fișierului, ceea ce înseamnă site-uri web mai rapide, atașamente email mai mici și cerințe de stocare mai reduse." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, compresia are loc exclusiv în browserul tău – imaginile tale nu ajung pe niciun server." },
      { q: "Ce reducere de dimensiune pot obține?", a: "În funcție de nivelul de compresie și tipul imaginii, se poate obține o reducere de 30–80%. Pentru fotografii, 40–60% este tipic." },
      { q: "Se pierde vizibil calitatea?", a: "La compresie medie (calitate 60–80) diferența este aproape imperceptibilă cu ochiul liber. La compresie puternică (sub 30) pot apărea artefacte vizibile." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul funcționează în orice browser modern, pe mobil și desktop." },
      { q: "Ce formate acceptă?", a: "Poți comprima imagini în format JPG, PNG și WebP. Formatul de ieșire corespunde celui de intrare." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea imaginii", description: "Trage imaginea pe care dorești să o comprimi sau folosește butonul de selectare. JPG, PNG și WebP sunt acceptate." },
        { title: "2. Setarea nivelului de compresie", description: "Mută cursorul pentru a obține echilibrul dorit între calitate și dimensiune. Previzualizarea se actualizează imediat." },
        { title: "3. Comprimare și descărcare", description: "Apasă butonul de comprimare, verifică rezultatul în previzualizare, apoi descarcă fișierul." },
      ],
      useCases: [
        { icon: "🌐", title: "Accelerarea site-ului", description: "Imaginile comprimate duc la încărcare mai rapidă a paginii și un scor mai bun Google PageSpeed." },
        { icon: "📧", title: "Atașamente email", description: "Reduce dimensiunea imaginii pentru ca email-ul să nu depășească limita de dimensiune a furnizorului (de obicei 25 MB)." },
        { icon: "💾", title: "Economie de spațiu", description: "Pe servicii cloud (Google Drive, OneDrive), imaginile comprimate ocupă mai puțin spațiu." },
        { icon: "📱", title: "Gestionare conținut mobil", description: "Imagini mai mici se încarcă mai rapid pe rețele mobile, îmbunătățind experiența utilizatorului." },
      ],
      aboutSection: {
        title: "Despre comprimarea imaginilor",
        paragraphs: [
          "Comprimarea imaginilor este arta reducerii dimensiunii fișierului: scopul este fișierul cât mai mic posibil, menținând o calitate vizuală acceptabilă. Cele două tipuri principale de compresie sunt cu pierderi (lossy) și fără pierderi (lossless).",
          "Compresia cu pierderi elimină detalii mai puțin perceptibile pentru ochiul uman, obținând o reducere semnificativă a dimensiunii. Compresia fără pierderi comprimă datele prin metode matematice fără pierdere de calitate, dar reducerea dimensiunii este mai mică.",
          "Algoritmii moderni de compresie funcționează extrem de eficient: dimensiunea unei fotografii tipice poate fi redusă cu 50–70% fără diferențe perceptibile cu ochiul liber.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru imagini web, calitatea de 70–80 este cel mai bun compromis: diferență aproape imperceptibilă, dar reducere semnificativă a dimensiunii." },
        { icon: "🔍", tip: "Folosește previzualizarea pentru a verifica calitatea după comprimare – mărește pentru a vedea detaliile." },
        { icon: "📊", tip: "Fotografiile se comprimă mai eficient în format JPG decât PNG. Ia în considerare și schimbarea formatului." },
        { icon: "⚡", tip: "Pentru magazine online, comprimă imaginile produselor la calitate 80 – clienții nu vor observa diferența, dar site-ul va fi mult mai rapid." },
      ],
    },
  },

  // ═══ 9. AJUSTARE CALITATE IMAGINE ═════════════════════════════════════════
  "minoseg-allitas": {
    introText:
      "Ajustează calitatea de compresie a imaginilor, controlând fin echilibrul dintre calitate și dimensiunea fișierului. Cu previzualizare în timp real poți vedea rezultatul înainte de a descărca. Toată procesarea are loc în browserul tău.",
    guide: [
      "1. Încarcă imaginea (JPG, PNG sau WebP).",
      "2. Setează nivelul de calitate cu ajutorul cursorului (1–100).",
      "3. Urmărește în previzualizare schimbarea calității și evoluția dimensiunii fișierului în timp real.",
      "4. Când ești mulțumit, descarcă rezultatul.",
    ],
    faq: [
      { q: "La ce este utilă ajustarea calității?", a: "Permite setarea precisă a compromisului între calitatea imaginii și dimensiunea fișierului – oferă un control mai fin decât simpla compresie." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, procesarea are loc exclusiv în browserul tău, nicio dată nu părăsește computerul." },
      { q: "Care este diferența între compresie și ajustarea calității?", a: "Ajustarea calității oferă un control mai fin: cu previzualizare în timp real poți vedea diferența și tu decizi exact ce nivel de calitate este potrivit." },
      { q: "Ce valoare de calitate este ideală?", a: "90–100: arhivă, imprimare. 75–89: utilizare web. 50–74: imagini de previzualizare. Sub 50: schițe, miniaturi." },
      { q: "Pot folosi pe mobil?", a: "Da, instrumentul funcționează perfect în orice browser modern și pe dispozitive mobile." },
      { q: "Acceptă și PNG?", a: "Da, poți ajusta calitatea imaginilor în format JPG, PNG și WebP." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea în zona de încărcare sau apasă butonul de selectare. JPG, PNG și WebP sunt acceptate." },
        { title: "2. Ajustarea calității", description: "Folosește cursorul pentru a seta nivelul de calitate dorit. Previzualizarea în timp real arată imediat rezultatul." },
        { title: "3. Comparare", description: "Compară imaginea originală cu cea modificată în previzualizare și verifică reducerea dimensiunii fișierului." },
        { title: "4. Descărcare", description: "Dacă ești mulțumit de rezultat, descarcă imaginea la calitatea dorită." },
      ],
      useCases: [
        { icon: "🎯", title: "Optimizare precisă", description: "Pentru dezvoltatori web care doresc să controleze exact calitatea imaginii și dimensiunea fișierului." },
        { icon: "📸", title: "Export fotografii", description: "Pentru fotografi care pregătesc imagini de calitate diferită pentru diverse scopuri (web, imprimare, rețele sociale)." },
        { icon: "🔬", title: "Comparare calitate", description: "Poți compara vizual rezultatele diferitelor niveluri de calitate înainte de a lua o decizie." },
        { icon: "📊", title: "Pregătirea optimizării în masă", description: "Experimentează cu diferite setări înainte de a procesa un număr mare de imagini." },
      ],
      aboutSection: {
        title: "Despre calitatea imaginii și compresie",
        paragraphs: [
          "Calitatea imaginilor digitale este determinată de nivelul de compresie. Scala de calitate variază de la 1 la 100, unde 100 este cea mai bună calitate (fișier cel mai mare) și 1 este compresia cea mai puternică (fișier cel mai mic). Pentru majoritatea scopurilor, intervalul 70–85 este ideal.",
          "Pierderea de calitate nu este lineară: reducând de la 100 la 80, dimensiunea fișierului poate scădea cu până la 60%, în timp ce diferența vizuală este abia perceptibilă. Reducând de la 80 la 50, deteriorarea calității devine din ce în ce mai vizibilă.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Intervalul 75–85 oferă echilibrul ideal pentru majoritatea utilizărilor web." },
        { icon: "🔍", tip: "Mărește imaginea în previzualizare pentru a examina și detaliile fine după compresie." },
        { icon: "📊", tip: "Urmărește schimbarea dimensiunii fișierului: cea mai mare economie este în intervalul 100→80, cu diferență vizuală minimă." },
      ],
    },
  },

  // ═══ 10. CALCULATOR REZOLUȚIE IMAGINE ══════════════════════════════════════
  "felbontas-kiszamolo": {
    introText:
      "Calculează rezoluția imaginii (DPI/PPI) pe baza dimensiunii în pixeli și a dimensiunii de imprimare, sau invers: află cât de mare va fi imaginea imprimată la o anumită rezoluție. Un instrument indispensabil pentru designeri și specialiști în tipografie.",
    guide: [
      "1. Introdu lățimea și înălțimea imaginii în pixeli, sau încarcă o imagine pentru citire automată.",
      "2. Specifică dimensiunea de imprimare dorită (cm sau inch) sau DPI-ul țintă.",
      "3. Calculatorul determină instant valoarea lipsă (DPI, dimensiune pixeli sau dimensiune imprimare).",
    ],
    faq: [
      { q: "La ce este util acest instrument?", a: "Calculează la ce rezoluție poate fi imprimată o imagine cu o anumită dimensiune în pixeli, sau ce dimensiune în pixeli este necesară pentru un tipar cu o anumită dimensiune și rezoluție." },
      { q: "Este sigură imaginea încărcată?", a: "Da, datele imaginii sunt citite exclusiv de browser – nu ajung pe server. Calculatorul folosește imaginea doar pentru a stabili dimensiunea în pixeli." },
      { q: "Ce este DPI?", a: "DPI (Dots Per Inch) este unitatea de măsură a rezoluției de imprimare: arată câte puncte de imagine se află pe o secțiune de un inch (2,54 cm). Pentru imprimare se recomandă 300 DPI." },
      { q: "Ce DPI este necesar pentru imprimare?", a: "Pentru imprimare profesională 300 DPI, pentru imprimare acasă 150–200 DPI, iar pentru postere mari (privite de la distanță) 72–150 DPI este suficient." },
      { q: "Pot folosi pe mobil?", a: "Da, calculatorul este disponibil în orice browser modern și pe dispozitive mobile." },
      { q: "Care este diferența între DPI și PPI?", a: "PPI (Pixels Per Inch) indică rezoluția ecranului, iar DPI rezoluția de imprimare. În practică, sunt adesea folosiți ca sinonime." },
    ],
    content: {
      howToSteps: [
        { title: "1. Specificarea dimensiunii în pixeli", description: "Introdu lățimea și înălțimea imaginii în pixeli, sau încarcă o imagine pentru citire automată." },
        { title: "2. Parametri de imprimare", description: "Specifică dimensiunea de imprimare dorită (cm sau inch) sau valoarea DPI/PPI țintă." },
        { title: "3. Citirea rezultatului", description: "Calculatorul afișează instant valoarea calculată: DPI, dimensiune în pixeli sau dimensiune de imprimare." },
      ],
      useCases: [
        { icon: "🖨️", title: "Pregătire pentru imprimare", description: "Verifică dacă imaginea ta are rezoluție suficientă pentru dimensiunea de imprimare dorită." },
        { icon: "📐", title: "Design grafic", description: "Calculează dimensiunea în pixeli necesară pentru postere, pliante, cărți de vizită." },
        { icon: "📸", title: "Imprimare fotografii", description: "Află la ce dimensiune poți imprima fotografiile la calitate de 300 DPI." },
        { icon: "🖼️", title: "Design pentru tablou canvas", description: "Poți calcula rezoluția necesară a imaginii pentru dimensiunea dorită a tabloului canvas." },
      ],
      aboutSection: {
        title: "Despre rezoluția imaginilor",
        paragraphs: [
          "Rezoluția imaginii determină nivelul de detaliu al imaginii. La imagini digitale, dimensiunea în pixeli (ex. 3000×2000 pixeli) definește rezoluția, iar la imprimare, DPI (Dots Per Inch) arată cât de dens sunt plasate punctele de imagine.",
          "Calitatea de imprimare depinde de combinația dimensiunii în pixeli și a dimensiunii fizice: o imagine de 3000×2000 pixeli la 300 DPI produce un tipar de 25,4×16,9 cm de calitate excelentă, dar la 72 DPI aceeași imagine produce un tipar de 105,8×70,6 cm, dar de calitate mai slabă.",
          "Formula este simplă: Dimensiune imprimare (inch) = Dimensiune pixeli / DPI. Din aceasta, orice valoare poate fi calculată dacă o cunoaștem pe celelalte două.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru imprimare profesională, țintește mereu 300 DPI. Pentru imprimare acasă, 150-200 DPI este suficient." },
        { icon: "📏", tip: "La postere mari (privite de la distanță) și 72-150 DPI oferă calitate acceptabilă." },
        { icon: "🔢", tip: "Formula: DPI = Dimensiune pixeli / Dimensiune imprimare (inch). 1 inch = 2,54 cm." },
      ],
    },
  },

  // ═══ 11. DECUPARE IMAGINE ═════════════════════════════════════════════════
  "levagas": {
    introText:
      "Decupează porțiunea dorită a imaginii la dimensiuni personalizate sau cu raport de aspect prestabilit. Ideal pentru imagini de rețele sociale, poze de profil și orice fel de decupare. Editarea se realizează în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Încarcă imaginea (JPG, PNG sau WebP).",
      "2. Marchează zona de decupare cu mouse-ul sau alege un raport de aspect prestabilit.",
      "3. Ajustează selecția prin tragere și redimensionare.",
      "4. Apasă butonul «Decupare», apoi descarcă rezultatul.",
    ],
    faq: [
      { q: "La ce este utilă decuparea imaginii?", a: "Poți evidenția o porțiune a imaginii, elimina marginile inutile sau decupa imaginea la raportul de aspect dorit (ex. pătrat pentru postare Instagram)." },
      { q: "Este sigur din punct de vedere al datelor mele?", a: "Da, editarea imaginii are loc exclusiv în browserul tău – nicio dată nu ajunge pe server." },
      { q: "Ce rapoarte de aspect pot alege?", a: "Pe lângă decuparea liberă, sunt disponibile rapoarte prestabilite: 1:1 (pătrat), 16:9 (ecran lat), 4:3, 3:2 și raport personalizat." },
      { q: "Cât de mare va fi imaginea decupată?", a: "Dimensiunea în pixeli a imaginii decupate depinde de dimensiunea zonei selectate. Instrumentul afișează dimensiunea curentă a decupării în pixeli." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul funcționează și pe ecran tactil și este disponibil în orice browser modern." },
      { q: "În ce format primesc imaginea decupată?", a: "Imaginea decupată poate fi descărcată în formatul original (JPG, PNG sau WebP), păstrând calitatea originală." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea sau apasă butonul de selectare. Formatele JPG, PNG și WebP sunt acceptate." },
        { title: "2. Selectarea zonei de decupare", description: "Trage cu mouse-ul zona de decupare dorită sau alege un raport de aspect prestabilit din meniul derulant." },
        { title: "3. Ajustarea selecției", description: "Mută și redimensionează cadrul de selecție pentru poziționarea exactă." },
        { title: "4. Decupare și descărcare", description: "Apasă butonul de decupare, apoi descarcă rezultatul în formatul original." },
      ],
      useCases: [
        { icon: "📱", title: "Rețele sociale", description: "Decupează în formă pătrată pentru postare Instagram, 16:9 pentru miniatură YouTube sau alt raport specific platformei." },
        { icon: "👤", title: "Poze de profil", description: "Decupează porțiunea potrivită din fotografie pentru a obține poza de profil perfectă." },
        { icon: "🛒", title: "Fotografii de produs", description: "Poți crea imagini de produs cu dimensiuni și proporții uniforme pentru magazinul tău online." },
        { icon: "🎨", title: "Lucrări grafice", description: "Decupează detaliul necesar dintr-o imagine mai mare pentru prezentare, banner sau orice material vizual." },
      ],
      aboutSection: {
        title: "Despre decuparea imaginilor",
        paragraphs: [
          "Decuparea (crop) este una dintre cele mai frecvent utilizate operațiuni de editare a imaginilor: elimină porțiunile inutile ale imaginii, evidențiind conținutul esențial. De la îmbunătățirea compoziției până la ajustarea dimensiunilor pentru rețele sociale, are numeroase utilizări.",
          "Decuparea nu implică pierdere de calitate: pixelii din zona selectată rămân neschimbați. Rezoluția imaginii decupate depinde de dimensiunea zonei selectate – cu cât zona decupată este mai mare, cu atât rezoluția rezultatului va fi mai mare.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește rapoartele de aspect prestabilite pentru dimensiunile exacte ale platformelor de rețele sociale." },
        { icon: "📐", tip: "Regula treimilor: plasează elementele principale ale imaginii la intersecțiile liniilor de treimi pentru o compoziție mai bună." },
        { icon: "🔍", tip: "Mărește imaginea înainte de decupare pentru a poziționa selecția mai precis." },
        { icon: "📱", tip: "Pe ecran tactil, poți mări prin gest de ciupire (pinch) și poți muta selecția cu degetul." },
      ],
    },
  },

  // ═══ 12. ROTIRE IMAGINE ═══════════════════════════════════════════════════
  "forgatas": {
    introText:
      "Rotește imaginile la orice unghi sau în pași exacți de 90°. Cu rotire la unghi liber poți seta orice înclinare, iar culoarea de fundal este la alegere. Procesarea se realizează în întregime în browserul tău.",
    guide: [
      "1. Încarcă imaginea pe care dorești să o rotești (JPG, PNG sau WebP).",
      "2. Setează unghiul de rotire cu ajutorul cursorului sau introdu o valoare exactă.",
      "3. Alege culoarea de fundal pentru zonele goale care apar la rotirea la unghi liber.",
      "4. Apasă butonul «Rotire», apoi descarcă rezultatul.",
    ],
    faq: [
      { q: "La ce este utilă rotirea imaginii?", a: "Servește la îndreptarea fotografiilor înclinate, la crearea de compoziții creative sau pur și simplu la schimbarea orientării imaginii." },
      { q: "Este sigură procesarea?", a: "Da, rotirea are loc exclusiv în browserul tău – imaginea nu ajunge pe server." },
      { q: "La ce unghi pot roti imaginea?", a: "Între 0° și 360°, la orice unghi, chiar și cu precizie zecimală. Rotirea la 90°, 180° și 270° este fără pierderi." },
      { q: "Ce se întâmplă cu colțurile la rotirea la unghi liber?", a: "Zonele goale rezultate din rotire sunt umplute cu culoarea de fundal aleasă. La PNG, poți alege și fundal transparent." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul funcționează perfect în orice browser modern și pe dispozitive mobile." },
      { q: "Se schimbă dimensiunea imaginii la rotire?", a: "La rotirea de 90°, lățimea și înălțimea se inversează. La rotirea la unghi liber, dimensiunea imaginii poate crește pentru a cuprinde întregul conținut rotit." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea în zona de încărcare sau apasă butonul de selectare." },
        { title: "2. Setarea unghiului de rotire", description: "Folosește cursorul sau introdu unghiul exact. Previzualizarea se actualizează în timp real." },
        { title: "3. Rotire și descărcare", description: "Apasă butonul de rotire, apoi descarcă imaginea generată." },
      ],
      useCases: [
        { icon: "📸", title: "Îndreptarea fotografiilor înclinate", description: "La fotografierea din mână, o ușoară înclinare este frecventă – poți îndrepta cu o rotire de câteva grade." },
        { icon: "🎨", title: "Compoziție creativă", description: "Poți obține un efect dinamic prin rotirea intenționată a imaginii." },
        { icon: "📱", title: "Corectarea orientării", description: "Poți roti o imagine portret în landscape sau invers." },
        { icon: "🖼️", title: "Documente scanate", description: "Poți îndrepta documentele și imaginile scanate înclinat." },
      ],
      aboutSection: {
        title: "Despre rotirea imaginilor",
        paragraphs: [
          "Rotirea imaginii înseamnă rotirea imaginii în jurul unui punct central. Rotirea în pași de 90° este fără pierderi, deoarece pixelii se rearanjează simplu. La rotirea la unghi liber este necesară interpolarea, ceea ce implică o modificare minimă de calitate.",
          "Rotirea este deosebit de utilă la corectarea fotografiilor înclinate, la îndreptarea documentelor scanate și în lucrări grafice creative.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru fotografii înclinate, de obicei o rotire de 1–5° este suficientă pentru îndrepare." },
        { icon: "🔄", tip: "Pentru rotire de 90°, folosește butonul dedicat pentru un rezultat mai precis și fără pierderi." },
        { icon: "🎨", tip: "În format PNG poți alege fundal transparent pentru zonele goale rezultate din rotire." },
      ],
    },
  },

  // ═══ 13. OGLINDIRE IMAGINE ════════════════════════════════════════════════
  "tukrozes": {
    introText:
      "Oglindește imaginile orizontal sau vertical cu un singur clic. Oglindirea este o operațiune fără pierderi care păstrează calitatea completă a imaginii. Procesarea are loc în browserul tău.",
    guide: [
      "1. Încarcă imaginea pe care dorești să o oglindești.",
      "2. Alege direcția oglindirii: orizontală (stânga-dreapta) sau verticală (sus-jos).",
      "3. Previzualizarea arată imediat rezultatul.",
      "4. Descarcă imaginea oglindită.",
    ],
    faq: [
      { q: "La ce este utilă oglindirea imaginii?", a: "Servește la inversarea imaginii în oglindă a unui selfie, la crearea de compoziții simetrice sau la schimbarea direcției imaginii." },
      { q: "Este sigură procesarea?", a: "Da, oglindirea are loc în browserul tău, nicio dată nu ajunge pe server." },
      { q: "Care este diferența între oglindirea orizontală și verticală?", a: "Oglindirea orizontală inversează stânga și dreapta imaginii (ca într-o oglindă). Oglindirea verticală întoarce imaginea cu susul în jos." },
      { q: "Se pierde calitatea la oglindire?", a: "Nu, oglindirea este o operațiune fără pierderi – pixelii sunt doar rearanjați, nu se modifică." },
      { q: "Funcționează pe mobil?", a: "Da, este disponibil în orice browser modern și pe dispozitive mobile." },
      { q: "Pot combina cu rotirea?", a: "Oglindirea și rotirea sunt operațiuni independente. Imaginea oglindită poate fi ulterior rotită liber." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea sau apasă butonul de selectare a fișierului." },
        { title: "2. Alegerea direcției de oglindire", description: "Apasă butonul de oglindire orizontală sau verticală. Previzualizarea se actualizează imediat." },
        { title: "3. Descărcare", description: "Descarcă imaginea oglindită în formatul și calitatea originale." },
      ],
      useCases: [
        { icon: "🤳", title: "Corectare selfie", description: "Camera selfie a telefonului creează o imagine în oglindă – prin oglindire poți restabili direcția naturală." },
        { icon: "🎨", title: "Design simetric", description: "Poți crea elemente grafice și modele simetrice prin oglindire." },
        { icon: "🖼️", title: "Ajustarea compoziției", description: "Prin inversarea direcției imaginii poți îmbunătăți echilibrul vizual." },
        { icon: "📐", title: "Șabloane de design", description: "Prin oglindirea unui singur element poți crea șabloane și cadre simetrice." },
      ],
      aboutSection: {
        title: "Despre oglindirea imaginilor",
        paragraphs: [
          "Oglindirea (flip) imaginii înseamnă rearanjarea pixelilor în direcție de oglindă. La oglindirea orizontală, stânga și dreapta se inversează, iar la cea verticală, partea de sus și cea de jos. Operațiunea este complet fără pierderi.",
          "Oglindirea este o operațiune frecvent utilizată la corectarea selfie-urilor, la crearea de grafice simetrice și la experimentarea cu compoziția.",
        ],
      },
      tips: [
        { icon: "💡", tip: "La oglindirea selfie-urilor, ai grijă la inscripții – și ele se oglindesc și pot deveni ilizibile." },
        { icon: "🔄", tip: "Dublă oglindire în aceeași direcție restabilește imaginea originală." },
        { icon: "📸", tip: "Dacă compoziția fotografiei nu îți place, încearcă oglindirea orizontală – poate schimba surprinzător de mult." },
      ],
    },
  },

  // ═══ 14. ROTIRE IMAGINE LA 90° ════════════════════════════════════════════
  "90-fokos-forgatas": {
    introText:
      "Rotește imaginile exact cu 90° la dreapta sau la stânga cu un singur clic. Rotirea de 90° este o operațiune fără pierderi care păstrează perfect calitatea imaginii. Ideal pentru comutarea între orientarea portret și landscape.",
    guide: [
      "1. Încarcă imaginea pe care dorești să o rotești.",
      "2. Apasă butonul «90° dreapta» sau «90° stânga».",
      "3. Dacă este necesar, continuă rotirea la 180° sau 270°.",
      "4. Descarcă imaginea rotită.",
    ],
    faq: [
      { q: "La ce este utilă rotirea de 90°?", a: "Poți transforma o imagine portret în landscape sau invers, sau poți corecta direcția fotografiilor orientate greșit." },
      { q: "Este sigură procesarea?", a: "Da, rotirea are loc în browserul tău – nicio imagine nu ajunge pe server." },
      { q: "Este fără pierderi rotirea de 90°?", a: "Da, rotirea de 90° este exactă la nivel de pixel: pixelii sunt pur și simplu rearanjați, fără pierdere de calitate." },
      { q: "Cum pot roti la 180°?", a: "Apasă de două ori butonul de rotire de 90° și imaginea se va roti cu 180°." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este complet responsiv și disponibil în orice browser modern." },
      { q: "Se schimbă dimensiunea fișierului?", a: "Dimensiunea fișierului rămâne practic neschimbată, deoarece rotirea de 90° nu necesită recompresie." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea în zona de încărcare sau apasă butonul de selectare." },
        { title: "2. Alegerea direcției de rotire", description: "Apasă butonul 90° dreapta (CW) sau 90° stânga (CCW)." },
        { title: "3. Descărcare", description: "Descarcă imaginea rotită – calitatea și dimensiunea fișierului rămân neschimbate." },
      ],
      useCases: [
        { icon: "📱", title: "Corectarea fotografiilor de telefon", description: "Poți corecta cu un singur clic direcția fotografiilor mobile orientate greșit." },
        { icon: "📄", title: "Rotirea documentelor", description: "Poți corecta rapid documentele scanate sau orientate greșit." },
        { icon: "🖥️", title: "Schimbarea orientării", description: "Poți transforma o imagine landscape în portret sau invers." },
        { icon: "📸", title: "Organizarea fotografiilor", description: "La organizarea albumelor, poți corecta rapid direcția imaginilor rotite." },
      ],
      aboutSection: {
        title: "Despre rotirea de 90°",
        paragraphs: [
          "Rotirea de 90° este cea mai frecvent utilizată operațiune de rotire: inversează lățimea și înălțimea imaginii, în timp ce pixelii sunt păstrați perfect. Este singurul mod de rotire care este garantat fără pierderi.",
          "Camerele și telefoanele moderne stochează orientarea în datele EXIF, dar nu toate software-urile le interpretează corect. Rotirea de 90° oferă o soluție definitivă pentru problemele de orientare.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Rotirea de 90° este fără pierderi – folosește-o fără grijă, calitatea nu se deteriorează." },
        { icon: "🔄", tip: "Pentru rotire de 180°, apasă de două ori butonul de 90°." },
        { icon: "📸", tip: "Dacă trebuie să rotești multe fotografii, folosește opțiunea de rotire în masă." },
      ],
    },
  },

  // ═══ 15. ESTOMPARE IMAGINE ════════════════════════════════════════════════
  "elmosas": {
    introText:
      "Aplică efect de estompare Gaussian blur pe imaginile tale, fie pe întreaga imagine, fie doar pe o zonă selectată. Ideal pentru estomparea fundalului, ascunderea datelor sensibile și efecte artistice. Procesarea are loc în browserul tău.",
    guide: [
      "1. Încarcă imaginea pe care dorești să o estompezi.",
      "2. Setează intensitatea estompării (raza) cu ajutorul cursorului.",
      "3. Alege dacă dorești să estompezi întreaga imagine sau doar o zonă selectată.",
      "4. Apasă butonul «Estompare», apoi descarcă rezultatul.",
    ],
    faq: [
      { q: "La ce este utilă estomparea imaginii?", a: "Pentru estomparea fundalului (efect de tip portret), ascunderea informațiilor sensibile sau crearea de efecte artistice de blur." },
      { q: "Este sigură procesarea?", a: "Da, estomparea are loc în browserul tău – imaginea nu ajunge pe server." },
      { q: "Ce este Gaussian blur?", a: "Gaussian blur este un filtru matematic care mediază valorile pixelilor cu pixelii vecini, producând o estompare moale și naturală." },
      { q: "Pot estompa doar o parte din imagine?", a: "Da, poți selecta zona pe care dorești să o estompezi, iar doar aceasta va fi estompată, restul imaginii rămânând intact." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este disponibil în orice browser modern și pe dispozitive mobile." },
      { q: "Poate fi anulată estomparea?", a: "Nu, estomparea este o operațiune permanentă – detaliile originale nu pot fi recuperate. Păstrează mereu imaginea originală." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea sau apasă butonul de selectare a fișierului." },
        { title: "2. Setarea estompării", description: "Ajustează intensitatea estompării cu ajutorul cursorului. O rază mai mare înseamnă estompare mai puternică." },
        { title: "3. Estompare și descărcare", description: "Apasă butonul de estompare, apoi descarcă rezultatul." },
      ],
      useCases: [
        { icon: "👤", title: "Fundal de portret", description: "Cu fundal estompat poți evidenția subiectul portretului, obținând un efect de adâncime de câmp similar DSLR." },
        { icon: "🔒", title: "Date sensibile", description: "Poți folosi estomparea pentru a ascunde date personale, fețe sau numere de înmatriculare." },
        { icon: "🎨", title: "Efect artistic", description: "Poți crea imagini cu atmosferă onirică și moale prin estompare puternică." },
        { icon: "🖼️", title: "Imagini de fundal", description: "Din fotografii estompate poți crea imagini de fundal excelente pentru desktop și mobil." },
      ],
      aboutSection: {
        title: "Despre estomparea imaginilor",
        paragraphs: [
          "Gaussian blur este una dintre cele mai fundamentale operațiuni de procesare a imaginilor: cu ajutorul unei funcții matematice (curba Gauss), mediază pixelii, producând o estompare moale și naturală. Intensitatea estompării se setează cu parametrul rază (radius).",
          "Estomparea poate fi utilizată în numeroase scopuri practice și creative: prin estomparea fundalului putem evidenția subiectul principal, prin ascunderea datelor sensibile protejăm viața privată, și poate fi aplicată și ca efect artistic.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru ascunderea datelor sensibile, folosește estompare puternică (rază 20+) – estomparea slabă poate fi inversată." },
        { icon: "🎨", tip: "Pentru imagini de fundal, o rază de 10–15 este de obicei suficientă pentru un efect plăcut și moale." },
        { icon: "⚠️", tip: "Păstrează mereu imaginea originală – estomparea nu poate fi anulată." },
      ],
    },
  },

  // ═══ 16. PIXELARE IMAGINE ═════════════════════════════════════════════════
  "pixelates": {
    introText:
      "Pixelează imaginile pentru cenzurare sau pentru crearea de efecte stil pixel art. Poți selecta întreaga imagine sau doar o anumită zonă. Procesarea are loc în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Încarcă imaginea pe care dorești să o pixelezi.",
      "2. Setează valoarea dimensiunii pixelului – o valoare mai mare produce pixelare mai grosieră.",
      "3. Selectează zona de pixelat sau aplică pe întreaga imagine.",
      "4. Apasă butonul «Pixelare», apoi descarcă rezultatul.",
    ],
    faq: [
      { q: "La ce este utilă pixelarea?", a: "Este potrivită atât pentru cenzurarea datelor sensibile (fețe, numere de înmatriculare), cât și pentru crearea de efecte stil pixel art retro." },
      { q: "Este sigură procesarea?", a: "Da, toată procesarea are loc în browserul tău – imaginea nu ajunge pe server." },
      { q: "Care este diferența între pixelare și estompare?", a: "Pixelarea descompune imaginea în blocuri pătrate (efect retro), în timp ce estomparea creează tranziții moale și continue." },
      { q: "Cât de sigură este cenzurarea?", a: "Pixelarea puternică (dimensiuni mari de bloc) este practic imposibil de inversat. Cu blocuri mici, conținutul ar putea fi ghicit." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este disponibil în orice browser modern și pe dispozitive mobile." },
      { q: "Pot crea pixel art din imaginile mele?", a: "Da, prin pixelarea întregii imagini poți crea imagini stil pixel art retro din orice fotografie." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea sau selecteaz-o cu butonul de selectare." },
        { title: "2. Setarea dimensiunii pixelului", description: "Ajustează dimensiunea blocului de pixeli – blocuri mai mari produc pixelare mai puternică." },
        { title: "3. Pixelare și descărcare", description: "Aplică pixelarea, verifică previzualizarea, apoi descarcă rezultatul." },
      ],
      useCases: [
        { icon: "🔒", title: "Cenzurare", description: "Ascunderea eficientă a fețelor, numerelor de înmatriculare și datelor personale prin pixelare." },
        { icon: "🎮", title: "Pixel art", description: "Poți crea grafice stil retro, pixelat, din orice fotografie sau imagine." },
        { icon: "📱", title: "Rețele sociale", description: "Poți crea postări unice cu efecte creative de pixelare." },
        { icon: "🖼️", title: "Imagini de previzualizare", description: "Ascunderea conținutului în imagini de previzualizare – pixelarea indică existența conținutului, dar nu îl dezvăluie." },
      ],
      aboutSection: {
        title: "Despre pixelarea imaginilor",
        paragraphs: [
          "Pixelarea reprezintă reducerea rezoluției imaginii prin împărțirea în blocuri: fiecare bloc primește o singură culoare, bazată pe media pixelilor originali. Rezultatul este aspectul caracteristic cu grilă de pătrate, retro.",
          "Pentru cenzurare, pixelarea este mai fiabilă decât estomparea, deoarece medierea pe blocuri distruge mai multe informații. În scopuri creative, stilul pixel art evocă nostalgia jocurilor pe 8 biți.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru cenzurare, se recomandă o dimensiune de bloc de cel puțin 15–20 pixeli pentru o ascundere sigură." },
        { icon: "🎮", tip: "Pentru efect de pixel art, experimentează cu dimensiuni de bloc de 8–12 pixeli pentru cel mai bun efect retro." },
        { icon: "⚠️", tip: "Pixelarea este o operațiune permanentă – păstrează mereu imaginea originală." },
      ],
    },
  },

  // ═══ 17. CONVERSIE ALB-NEGRU ══════════════════════════════════════════════
  "fekete-feher": {
    introText:
      "Transformă imaginile color în varianta alb-negru (grayscale) cu un singur clic. Ajustează contrastul și luminozitatea pentru rezultatul monocrom perfect. Procesarea se realizează în întregime în browserul tău.",
    guide: [
      "1. Încarcă imaginea color.",
      "2. Instrumentul o transformă automat în alb-negru.",
      "3. Ajustează rezultatul cu ajutorul cursoarelor de contrast și luminozitate.",
      "4. Descarcă imaginea alb-negru.",
    ],
    faq: [
      { q: "La ce este utilă conversia alb-negru?", a: "Pentru crearea de fotografii artistice alb-negru, curățarea documentelor, reducerea costurilor de imprimare și obținerea unui efect vizual dramatic." },
      { q: "Este sigură procesarea?", a: "Da, conversia are loc în browserul tău – nicio dată nu ajunge pe server." },
      { q: "Cum funcționează conversia grayscale?", a: "Instrumentul calculează tonul de gri din valorile RGB ale pixelilor colorați, ținând cont de sensibilitatea diferită a ochiului uman la culori." },
      { q: "Se pot restabili culorile?", a: "Nu, conversia alb-negru este permanentă – informația de culoare se pierde. Păstrează mereu imaginea color originală." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este disponibil în orice browser modern și pe dispozitive mobile." },
      { q: "Ce formate acceptă?", a: "Poți transforma în alb-negru imagini în format JPG, PNG și WebP." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii color", description: "Trage imaginea sau folosește butonul de selectare. Formatele JPG, PNG și WebP sunt acceptate." },
        { title: "2. Aplicarea grayscale", description: "Instrumentul transformă automat imaginea în alb-negru în previzualizare." },
        { title: "3. Ajustare fină și descărcare", description: "Ajustează contrastul și luminozitatea, apoi descarcă imaginea generată." },
      ],
      useCases: [
        { icon: "📸", title: "Fotografii artistice", description: "Poți crea fotografii alb-negru clasice și dramatice din orice imagine color." },
        { icon: "🖨️", title: "Pregătire pentru imprimare", description: "Poți converti în prealabil imaginile pentru imprimare alb-negru, asigurând rezultatul dorit." },
        { icon: "📄", title: "Documente", description: "Curățarea documentelor scanate și îmbunătățirea lizibilității prin conversie grayscale." },
        { icon: "🎨", title: "Elemente de design", description: "Poți crea elemente grafice monocrome pentru site-uri web și materiale tipărite." },
      ],
      aboutSection: {
        title: "Despre conversia alb-negru",
        paragraphs: [
          "Conversia grayscale transformă imaginea color în tonuri de gri. Conversia profesională ține cont de sensibilitatea diferită a ochiului uman: canalul verde este ponderat mai mult decât cel roșu sau albastru.",
          "Tradiția artistică a fotografiei alb-negru datează din epoca analogică. Imaginile monocrome direcționează atenția spre forme, texturi și contraste, creând un efect dramatic și atemporal.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Creșterea contrastului face imaginea alb-negru mai dramatică – experimentează." },
        { icon: "📸", tip: "Imaginile cu texturi și modele puternice arată deosebit de bine în alb-negru." },
        { icon: "⚠️", tip: "Culorile se pierd – salvează originalul dacă ai putea avea nevoie de el mai târziu." },
      ],
    },
  },

  // ═══ 18. AJUSTARE CONTRAST ȘI LUMINOZITATE ═══════════════════════════════
  "kontraszt-fenyero": {
    introText:
      "Ajustează contrastul și luminozitatea imaginilor cu previzualizare în timp real. Poți lumina fotografii întunecate, corecta imagini supraexpuse sau obține efecte creative. Procesarea are loc în browserul tău.",
    guide: [
      "1. Încarcă imaginea pe care dorești să o editezi.",
      "2. Mută cursorul de luminozitate pentru a seta nivelul dorit de lumină.",
      "3. Ajustează contrastul pentru a evidenția sau atenua detaliile.",
      "4. Descarcă imaginea modificată.",
    ],
    faq: [
      { q: "La ce este utilă ajustarea contrastului și luminozității?", a: "Pentru corectarea fotografiilor întunecate sau supraexpuse, evidențierea detaliilor și intensificarea impactului vizual al imaginii." },
      { q: "Este sigură procesarea?", a: "Da, toate operațiunile au loc în browserul tău – imaginea nu ajunge pe server." },
      { q: "Care este diferența dintre contrast și luminozitate?", a: "Luminozitatea modifică nivelul general de lumină al imaginii, iar contrastul reglează diferența dintre zonele întunecate și cele luminoase." },
      { q: "Se pot ajusta ambele simultan?", a: "Da, cele două cursoare funcționează independent, iar previzualizarea arată ambele modificări în timp real." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este complet responsiv și disponibil în orice browser modern." },
      { q: "Ce formate acceptă?", a: "Poți ajusta contrastul și luminozitatea imaginilor în format JPG, PNG și WebP." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea sau apasă butonul de selectare. JPG, PNG și WebP sunt acceptate." },
        { title: "2. Modificarea setărilor", description: "Folosește cursoarele de luminozitate și contrast. Previzualizarea se actualizează în timp real." },
        { title: "3. Descărcare", description: "Dacă ești mulțumit de rezultat, descarcă imaginea modificată." },
      ],
      useCases: [
        { icon: "📸", title: "Corectare fotografii", description: "Corecția rapidă a fotografiilor subexpuse sau supraexpuse prin ajustarea luminozității." },
        { icon: "📄", title: "Documente", description: "Îmbunătățirea lizibilității documentelor scanate palide prin creșterea contrastului." },
        { icon: "🌅", title: "Fotografii de atmosferă", description: "Poți obține un efect dramatic prin creșterea contrastului sau o atmosferă moale prin scăderea lui." },
        { icon: "🛒", title: "Fotografii de produs", description: "Luminarea imaginilor de produs și îmbunătățirea contrastului pentru un aspect mai bun." },
      ],
      aboutSection: {
        title: "Despre contrast și luminozitate",
        paragraphs: [
          "Luminozitatea (brightness) reglează nivelul general de lumină al imaginii: creșterea ei produce o imagine mai luminoasă, iar scăderea, una mai întunecată. Contrastul determină diferența dintre cele mai luminoase și cele mai întunecate zone.",
          "Prin ajustarea combinată a celor doi parametri poți obține un rezultat echilibrat și profesional. La fotografii întunecate, merită mai întâi să crești luminozitatea, apoi să evidențiezi detaliile cu ajutorul contrastului.",
        ],
      },
      tips: [
        { icon: "💡", tip: "La fotografii întunecate, crește mai întâi luminozitatea, apoi ajustează contrastul." },
        { icon: "📊", tip: "Contrastul prea ridicat poate produce pierdere de detalii în zonele foarte întunecate și foarte luminoase." },
        { icon: "🔍", tip: "Folosește previzualizarea pentru verificarea imediată a efectului setărilor." },
      ],
    },
  },

  // ═══ 19. ADĂUGARE FILIGRAN ════════════════════════════════════════════════
  "vizjel": {
    introText:
      "Adaugă filigran (watermark) pe imagini sub formă de text sau imagine, pentru protecția drepturilor de autor. Setează poziția, dimensiunea și transparența filigranului. Procesarea se realizează în întregime în browserul tău.",
    guide: [
      "1. Încarcă imaginea pe care dorești să adaugi filigranul.",
      "2. Alege tipul de filigran: text sau imagine.",
      "3. Setează poziția, dimensiunea, transparența și rotația.",
      "4. Apasă butonul «Aplicare», apoi descarcă imaginea cu filigran.",
    ],
    faq: [
      { q: "La ce este util filigranul?", a: "Filigranul protejează drepturile de autor indicând proprietarul imaginii. Descurajează utilizarea neautorizată." },
      { q: "Este sigură procesarea?", a: "Da, adăugarea filigranului are loc în browserul tău – imaginea nu ajunge pe server." },
      { q: "Ce tip de filigran pot adăuga?", a: "Poți adăuga atât filigran text (ex. numele tău, site-ul web), cât și filigran imagine (ex. logo-ul tău)." },
      { q: "Unde pot plasa filigranul?", a: "Poziția filigranului este liber configurabilă: colțuri, centru sau model repetat pe întreaga imagine." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este disponibil în orice browser modern și pe dispozitive mobile." },
      { q: "Poate fi eliminat filigranul ulterior?", a: "Filigranul este «gravat» în imagine – eliminarea este posibilă doar cu imaginea originală fără filigran. De aceea este un instrument eficient de protecție." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea sau apasă butonul de selectare." },
        { title: "2. Configurarea filigranului", description: "Alege filigranul de tip text sau imagine, setează poziția și transparența." },
        { title: "3. Aplicare și descărcare", description: "Verifică previzualizarea, apoi descarcă imaginea cu filigran." },
      ],
      useCases: [
        { icon: "📸", title: "Portofoliu foto", description: "Protejează-ți fotografiile cu filigran când le prezinți în portofoliul tău online." },
        { icon: "🏢", title: "Conținut corporativ", description: "Plasarea logo-ului companiei ca filigran pe materiale de marketing și imagini de prezentare." },
        { icon: "🛒", title: "Catalog de produse", description: "Protecția fotografiilor de produs împotriva utilizării neautorizate cu filigran." },
        { icon: "🎨", title: "Imagini de previzualizare", description: "Poți crea previzualizări de rezoluție scăzută cu filigran pentru clienți, înainte de livrarea imaginilor finale." },
      ],
      aboutSection: {
        title: "Despre filigrane",
        paragraphs: [
          "Filigranul (watermark) este un text sau logo semi-transparent plasat pe imagine, care indică proprietarul drepturilor de autor. În era digitală, filigranul este una dintre cele mai simple și eficiente metode de protecție a imaginilor.",
          "Un filigran bun este suficient de vizibil pentru a descuraja utilizarea neautorizată, dar nu perturbă excesiv vizualizarea imaginii. Setarea corectă a transparenței, dimensiunii și poziției este esențială.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Setează transparența între 30–50%: suficient de vizibil, dar nu deranjant." },
        { icon: "📐", tip: "Un filigran mic plasat în colț este mai puțin deranjant, dar mai ușor de decupat." },
        { icon: "🔄", tip: "Filigranul cu model repetat (tiled) este mai greu de eliminat decât cel cu un singur punct." },
      ],
    },
  },

  // ═══ 20. ADĂUGARE CHENAR ȘI PADDING ═══════════════════════════════════════
  "keret-padding": {
    introText:
      "Adaugă chenar și margine interioară (padding) la imagini. Poți alege un chenar unicolor, efect de umbră sau pur și simplu spațiu în jurul imaginii. Editarea se realizează în întregime în browserul tău.",
    guide: [
      "1. Încarcă imaginea la care dorești să adaugi chenar.",
      "2. Setează grosimea, culoarea și stilul chenarului.",
      "3. Specifică dimensiunea marginii interioare (padding), dacă este necesar.",
      "4. Descarcă imaginea cu chenar.",
    ],
    faq: [
      { q: "La ce este utilă adăugarea chenarului și padding-ului?", a: "Pentru încadrarea estetică a imaginilor, formatarea postărilor pe rețele sociale și adăugarea marginilor de imprimare." },
      { q: "Este sigură procesarea?", a: "Da, editarea imaginii are loc în browserul tău – nicio dată nu ajunge pe server." },
      { q: "Care este diferența dintre chenar și padding?", a: "Chenarul (border) apare pe marginea imaginii cu culoare și grosime specificate. Padding-ul este spațiul gol dintre imagine și chenar." },
      { q: "Ce culori de chenar pot alege?", a: "Poți alege orice culoare cu selectorul de culori sau poți introduce un cod HEX. Fundalul transparent este posibil pentru PNG." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este disponibil în orice browser modern și pe dispozitive mobile." },
      { q: "Se schimbă dimensiunea imaginii?", a: "Da, prin adăugarea chenarului și a padding-ului, dimensiunea finală a imaginii crește cu valorile specificate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea sau apasă butonul de selectare." },
        { title: "2. Setarea chenarului", description: "Alege grosimea chenarului, culoarea și dimensiunea marginii interioare." },
        { title: "3. Descărcare", description: "Verifică previzualizarea, apoi descarcă imaginea cu chenar." },
      ],
      useCases: [
        { icon: "📱", title: "Rețele sociale", description: "Poți crea imagini cu chenar uniform pentru postări pe Instagram și Facebook." },
        { icon: "🖼️", title: "Pregătire galerie", description: "Poți adăuga chenare estetice pentru imagini imprimate și galerii digitale." },
        { icon: "📊", title: "Prezentări", description: "Imaginile de prezentare devin mai profesionale cu chenar și margine." },
        { icon: "🎨", title: "Elemente de design", description: "Completată cu o margine albă sau colorată, o fotografie simplă devine element de design." },
      ],
      aboutSection: {
        title: "Despre adăugarea chenarului și padding-ului",
        paragraphs: [
          "Chenarul imaginii separă vizual imaginea de mediul înconjurător, evidențiind conținutul. Marginea interioară (padding) conferă aerisire compoziției, în timp ce chenarul (border) adaugă un element vizual accentuat.",
          "Alegerea corectă a chenarului și marginii poate îmbunătăți considerabil impresia generală a imaginii. Pentru design minimalist, un chenar subțire și o margine albă generoasă, iar pentru efect dramatic, un chenar gros și contrastant.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Padding alb și chenar gri subțire oferă un aspect clasic, de galerie." },
        { icon: "📱", tip: "Pentru postări Instagram, un chenar alb uniform creează un aspect coerent al feed-ului." },
        { icon: "🎨", tip: "Experimentează cu armonia dintre culorile chenarului și culorile dominante ale imaginii pentru cel mai bun efect." },
      ],
    },
  },

  // ═══ 21. VIZUALIZARE METADATA EXIF ════════════════════════════════════════
  "metadata-megjelenites": {
    introText:
      "Vizualizează metadatele EXIF și alte informații încorporate în imagini: tip de cameră, expunere, coordonate GPS, dată și multe altele. Citirea datelor are loc în browserul tău, imaginea nu ajunge pe server.",
    guide: [
      "1. Încarcă imaginea ale cărei metadate dorești să le vizualizezi.",
      "2. Instrumentul citește și afișează automat toate metadatele disponibile.",
      "3. Parcurge diferitele categorii: cameră, expunere, GPS, software etc.",
    ],
    faq: [
      { q: "La ce este utilă vizualizarea metadatelor?", a: "Poți afla cu ce cameră, cu ce setări și când a fost realizată imaginea, și dacă conține coordonate GPS." },
      { q: "Este sigură procesarea?", a: "Da, citirea metadatelor are loc în browserul tău – imaginea nu părăsește computerul." },
      { q: "Ce sunt datele EXIF?", a: "EXIF (Exchangeable Image File Format) sunt datele tehnice încorporate de camerele digitale în fișierul imagine: model cameră, timp de expunere, ISO, diafragmă, GPS etc." },
      { q: "Toate imaginile conțin metadate?", a: "Majoritatea fotografiilor realizate cu camere și telefoane conțin date EXIF. Unele software-uri și platforme sociale le elimină." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este disponibil în orice browser modern și pe dispozitive mobile." },
      { q: "Pot edita metadatele?", a: "Acest instrument servește doar pentru vizualizare. Pentru ștergerea metadatelor, folosește instrumentul de ștergere metadata." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea sau apasă butonul de selectare. Imaginile în format JPG conțin cele mai multe date EXIF." },
        { title: "2. Vizualizarea metadatelor", description: "Instrumentul citește și afișează automat toate metadatele disponibile, organizate pe categorii." },
        { title: "3. Parcurgerea datelor", description: "Examinează datele de cameră, expunere, GPS și alte informații din fiecare categorie." },
      ],
      useCases: [
        { icon: "📸", title: "Analiza fotografiilor", description: "Află cu ce setări a fost realizată o fotografie reușită, pentru a le putea reproduce." },
        { icon: "🔒", title: "Protecția datelor", description: "Verifică dacă imaginea pe care dorești să o partajezi conține coordonate GPS sensibile." },
        { icon: "📅", title: "Gestionarea fișierelor", description: "Poți ordona și organiza fotografiile pe baza datei și orei de realizare." },
        { icon: "🔍", title: "Verificarea autenticității", description: "Metadatele ajută la stabilirea momentului și instrumentului cu care a fost realizată o imagine." },
      ],
      aboutSection: {
        title: "Despre metadatele imaginilor",
        paragraphs: [
          "Imaginile digitale nu conțin doar pixeli: metadatele încorporate în fișier (EXIF, IPTC, XMP) poartă numeroase informații despre circumstanțele realizării imaginii, setările camerei și chiar locația exactă a realizării.",
          "Datele EXIF pot fi utile fotografilor pentru studierea setărilor, dar pot reprezenta și un risc pentru protecția datelor: coordonatele GPS pot dezvălui locația exactă a realizării. Merită verificate și, dacă este necesar, șterse înainte de partajare.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Înainte de partajare, verifică mereu dacă imaginea conține coordonate GPS." },
        { icon: "📸", tip: "Ca fotograf, studiază datele EXIF ale imaginilor reușite pentru a progresa." },
        { icon: "🔒", tip: "Dacă găsești date sensibile, folosește instrumentul de ștergere metadata pentru partajare sigură." },
      ],
    },
  },

  // ═══ 22. ȘTERGERE METADATA IMAGINE ════════════════════════════════════════
  "metadata-torles": {
    introText:
      "Șterge metadatele EXIF și alte informații încorporate în imagini (coordonate GPS, date cameră, dată etc.) pentru protecția vieții private. Procesarea are loc în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Încarcă imaginea ale cărei metadate dorești să le ștergi.",
      "2. Instrumentul afișează metadatele disponibile înainte de ștergere.",
      "3. Apasă butonul «Ștergere metadate».",
      "4. Descarcă imaginea curățată.",
    ],
    faq: [
      { q: "La ce este utilă ștergerea metadatelor?", a: "Elimină datele personale încorporate în imagine (locație GPS, date cameră) pentru partajare online sigură." },
      { q: "Este sigură procesarea?", a: "Da, ștergerea metadatelor are loc în browserul tău – imaginea nu ajunge pe server." },
      { q: "Ce date șterge instrumentul?", a: "Date EXIF (cameră, expunere, GPS), date IPTC (drepturi de autor, descriere) și date XMP sunt toate eliminate." },
      { q: "Se deteriorează calitatea imaginii?", a: "Nu, ștergerea metadatelor nu afectează pixelii imaginii – calitatea vizuală rămâne neschimbată." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este disponibil în orice browser modern și pe dispozitive mobile." },
      { q: "Pot fi recuperate datele șterse?", a: "Nu, ștergerea este permanentă. Dacă ai nevoie de metadate, salvează și fișierul original înainte de ștergere." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea sau apasă butonul de selectare. Instrumentul afișează metadatele curente." },
        { title: "2. Ștergerea metadatelor", description: "Apasă butonul de ștergere – toate metadatele încorporate sunt eliminate." },
        { title: "3. Descărcarea imaginii curățate", description: "Descarcă imaginea curățată de metadate pentru partajare sigură." },
      ],
      useCases: [
        { icon: "🔒", title: "Protecția datelor", description: "Eliminarea coordonatelor GPS din fotografii înainte de partajarea online." },
        { icon: "📱", title: "Rețele sociale", description: "Curăță fotografiile de metadate personale înainte de încărcarea pe platforme sociale." },
        { icon: "📧", title: "Trimitere sigură", description: "Eliminarea metadatelor imaginilor trimise prin email pentru protecția vieții private." },
        { icon: "🏢", title: "Utilizare comercială", description: "Ștergerea metadatelor imaginilor corporative pentru ascunderea informațiilor despre cameră și software de concurență." },
      ],
      aboutSection: {
        title: "Despre ștergerea metadatelor",
        paragraphs: [
          "Metadatele imaginilor pot conține numeroase informații personale: localizare GPS exactă, dată și oră de realizare, tipul camerei, ba chiar și numele proprietarului. La partajarea online, aceste date pot fi citite de oricine.",
          "Ștergerea metadatelor este un pas simplu, dar eficient în protejarea vieții private digitale. Este deosebit de importantă pentru fotografiile realizate acasă, la locul de muncă sau în locuri vizitate frecvent.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Înainte de partajare, merită mereu să ștergi coordonatele GPS din fotografii." },
        { icon: "📸", tip: "Dacă, în calitate de fotograf, păstrarea setărilor este importantă, salvează fișierul original înainte de ștergere." },
        { icon: "🔒", tip: "Acordă atenție deosebită datelor GPS ale fotografiilor realizate acasă și la locul de muncă." },
      ],
    },
  },

  // ═══ 23. CONVERSIE ÎN MASĂ A IMAGINILOR ═══════════════════════════════════
  "tomeges-konvertalas": {
    introText:
      "Convertește simultan sute de imagini în formatul dorit (JPG, PNG, WebP). Procesarea în masă are loc în paralel în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Trage sau selectează toate imaginile pe care dorești să le convertești.",
      "2. Alege formatul țintă (JPG, PNG sau WebP).",
      "3. Setează calitatea și alte opțiuni.",
      "4. Pornește conversia, apoi descarcă rezultatele individual sau într-un fișier ZIP.",
    ],
    faq: [
      { q: "La ce este utilă conversia în masă?", a: "Dacă trebuie să convertești multe imagini simultan în alt format, de exemplu toate PNG-urile dintr-un folder în WebP." },
      { q: "Este sigură procesarea?", a: "Da, fiecare imagine este procesată în browserul tău – niciun fișier nu ajunge pe server." },
      { q: "Câte imagini poate procesa simultan?", a: "Nu există limită strictă, viteza de procesare depinde de performanța computerului tău și de dimensiunea imaginilor." },
      { q: "Între ce formate pot converti?", a: "Poți converti în orice direcție între formatele JPG, PNG și WebP." },
      { q: "Funcționează pe mobil?", a: "Da, deși pentru un număr mare de imagini, procesarea pe desktop este mai rapidă." },
      { q: "Pot descărca rezultatul într-un fișier ZIP?", a: "Da, poți descărca imaginile convertite ambalate într-un singur fișier ZIP." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea imaginilor", description: "Trage toate imaginile de convertit sau selectează-le cu butonul de selectare." },
        { title: "2. Format și setări", description: "Alege formatul țintă și setează calitatea. Setarea se aplică tuturor imaginilor." },
        { title: "3. Conversie și descărcare", description: "Pornește conversia în masă, apoi descarcă rezultatele în ZIP sau individual." },
      ],
      useCases: [
        { icon: "🌐", title: "Migrare site web", description: "Conversia în masă a imaginilor site-ului în format WebP pentru încărcare mai rapidă." },
        { icon: "📂", title: "Organizarea arhivei", description: "Convertirea colecțiilor vechi de imagini într-un format unitar pentru gestionare mai ușoară." },
        { icon: "🛒", title: "Magazin online", description: "Conversia simultană a sute de imagini de produs în formatul dorit." },
        { icon: "📸", title: "Export fotografii", description: "Conversia seriilor de fotografii într-un format unitar pentru publicare sau partajare." },
      ],
      aboutSection: {
        title: "Despre conversia în masă a imaginilor",
        paragraphs: [
          "Conversia în masă permite transformarea multor imagini în alt format printr-o singură operațiune. Procesarea în browser exploatează capacitățile multi-core ale procesoarelor moderne pentru procesare paralelă.",
          "Conversia în masă economisește timp și energie: în loc să convertești imaginile una câte una, setezi parametrii și sistemul le procesează automat pe toate.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Cu setări de calitate uniforme, asiguri un rezultat consistent pentru toate imaginile." },
        { icon: "📦", tip: "Folosește descărcarea ZIP dacă convertești multe imagini – gestionarea este mai ușoară." },
        { icon: "⚡", tip: "Pe desktop, procesarea în masă este semnificativ mai rapidă decât pe mobil." },
      ],
    },
  },

  // ═══ 24. REDIMENSIONARE ÎN MASĂ ═══════════════════════════════════════════
  "tomeges-atmeretezes": {
    introText:
      "Redimensionează simultan mai multe imagini la aceeași dimensiune sau proporție. Ideal pentru dimensionarea uniformă a imaginilor de site web, fotografiilor de produs și conținutului pentru rețele sociale. Procesarea are loc în browserul tău.",
    guide: [
      "1. Trage sau selectează imaginile de redimensionat.",
      "2. Specifică dimensiunea dorită în pixeli sau procente.",
      "3. Alege modul de gestionare a proporțiilor (păstrare, decupare, umplere).",
      "4. Pornește redimensionarea, apoi descarcă rezultatele.",
    ],
    faq: [
      { q: "La ce este utilă redimensionarea în masă?", a: "Dacă trebuie să aduci multe imagini simultan la aceeași dimensiune, de exemplu imagini de produs pentru magazin online sau fotografii de galerie." },
      { q: "Este sigură procesarea?", a: "Da, redimensionarea are loc în browserul tău – imaginile nu ajung pe server." },
      { q: "Pot păstra proporțiile?", a: "Da, poți alege între modurile de păstrare a proporțiilor, decupare (crop) și umplere (padding)." },
      { q: "Ce formate de imagine acceptă?", a: "Imaginile în format JPG, PNG și WebP pot fi redimensionate." },
      { q: "Funcționează pe mobil?", a: "Da, deși pentru un număr mare de imagini de dimensiuni mari, procesarea pe desktop este mai rapidă." },
      { q: "Câte imagini pot procesa simultan?", a: "Nu există limită strictă – viteza depinde de performanța computerului tău." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea imaginilor", description: "Trage toate imaginile de redimensionat sau selectează-le cu butonul de selectare." },
        { title: "2. Setarea dimensiunii", description: "Specifică lățimea și înălțimea țintă în pixeli. Alege modul de gestionare a proporțiilor." },
        { title: "3. Redimensionare și descărcare", description: "Pornește procesarea, apoi descarcă rezultatele în ZIP sau individual." },
      ],
      useCases: [
        { icon: "🛒", title: "Magazin online", description: "Aducerea sute de imagini de produs la dimensiuni uniforme pentru un aspect consistent." },
        { icon: "🌐", title: "Site web", description: "Dimensionarea uniformă a fotografiilor de galerie și blog pentru încărcare rapidă." },
        { icon: "📱", title: "Rețele sociale", description: "Dimensionarea uniformă a seriilor de imagini pentru postări pe Instagram, Facebook sau LinkedIn." },
        { icon: "📧", title: "Newsletter", description: "Dimensionarea imaginilor de newsletter la lățime uniformă pentru un aspect perfect." },
      ],
      aboutSection: {
        title: "Despre redimensionarea în masă",
        paragraphs: [
          "Redimensionarea în masă permite aducerea multor imagini la aceeași dimensiune cu o singură setare. Aceasta este deosebit de utilă la pregătirea imaginilor pentru magazine online, galerii și conținut pentru rețele sociale.",
          "Gestionarea proporțiilor este esențială: în modul de păstrare, imaginea nu se distorsionează, dar s-ar putea să nu umple exact dimensiunea dorită. Modul de decupare (crop) umple complet dimensiunea, dar poate tăia din marginile imaginii.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru fotografii de produs, modul de decupare (crop) asigură dimensiuni perfect uniforme." },
        { icon: "📏", tip: "Pentru fotografii de galerie, se recomandă păstrarea proporțiilor pentru a evita distorsiunea." },
        { icon: "📦", tip: "Folosește descărcarea ZIP pentru o gestionare mai ușoară a fișierelor." },
      ],
    },
  },

  // ═══ 25. COMPRIMARE ÎN MASĂ ═══════════════════════════════════════════════
  "tomeges-tomorites": {
    introText:
      "Comprimă simultan dimensiunea mai multor imagini cu o singură setare. Ideal pentru optimizarea imaginilor de pe site-uri web, magazine online și campanii de email. Procesarea are loc în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Trage sau selectează imaginile de comprimat.",
      "2. Setează nivelul de compresie cu ajutorul cursorului.",
      "3. Pornește compresia în masă.",
      "4. Descarcă imaginile comprimate individual sau într-un fișier ZIP.",
    ],
    faq: [
      { q: "La ce este utilă compresia în masă?", a: "Dacă trebuie să optimizezi simultan multe imagini din punct de vedere al dimensiunii fișierului, de exemplu toate imaginile unui site web." },
      { q: "Este sigură procesarea?", a: "Da, compresia are loc în browserul tău – nicio imagine nu ajunge pe server." },
      { q: "Ce reducere de dimensiune pot obține?", a: "În funcție de tipul imaginii și nivelul de compresie, o reducere de 30–70% este de obicei realizabilă." },
      { q: "Ce formate acceptă?", a: "Imaginile în format JPG, PNG și WebP pot fi comprimate." },
      { q: "Funcționează pe mobil?", a: "Da, deși pentru compresia unui număr mare de imagini se recomandă desktop." },
      { q: "Se aplică aceeași compresie tuturor imaginilor?", a: "Da, nivelul de compresie setat se aplică uniform tuturor imaginilor selectate." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea imaginilor", description: "Trage toate imaginile de comprimat sau selectează-le cu butonul de selectare." },
        { title: "2. Setarea nivelului de compresie", description: "Ajustează echilibrul dorit între calitate și dimensiune cu ajutorul cursorului." },
        { title: "3. Comprimare și descărcare", description: "Pornește compresia în masă, apoi descarcă rezultatele." },
      ],
      useCases: [
        { icon: "🌐", title: "Optimizare site web", description: "Compresia simultană a tuturor imaginilor site-ului pentru încărcare mai rapidă." },
        { icon: "🛒", title: "Magazin online", description: "Compresia simultană a sute de imagini de produs pentru reducerea lățimii de bandă." },
        { icon: "📧", title: "Marketing prin email", description: "Compresia imaginilor de newsletter pentru încărcare mai rapidă a email-urilor și livrabilitate mai bună." },
        { icon: "💾", title: "Economie de spațiu", description: "Prin compresia colecțiilor de fotografii poți elibera spațiu semnificativ de stocare." },
      ],
      aboutSection: {
        title: "Despre compresia în masă a imaginilor",
        paragraphs: [
          "Compresia în masă permite optimizarea simultană a dimensiunii multor fișiere imagine, în loc să le procesezi una câte una. Procesarea paralelă exploatează performanța browserelor moderne.",
          "Nivelul de compresie uniform asigură calitate consistentă pentru toate imaginile. Pentru utilizare web, calitatea de 70–80 este cel mai bun compromis între dimensiune și calitate.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru site-uri web, calitatea de 70–80 este ideală – reducere semnificativă a dimensiunii, pierdere minimă de calitate." },
        { icon: "📊", tip: "După comprimare, verifică economia totală în rezumat." },
        { icon: "📦", tip: "Cu descărcarea ZIP, primești toate imaginile comprimate într-un singur fișier." },
      ],
    },
  },

  // ═══ 26. REDENUMIRE ÎN MASĂ ═══════════════════════════════════════════════
  "tomeges-atnevezes": {
    introText:
      "Redenumește simultan mai multe fișiere imagine conform unei convenții de denumire uniforme. Folosește numerotare, dată, prefix sau model personalizat. Procesarea are loc în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Trage sau selectează imaginile pe care dorești să le redenumești.",
      "2. Specifică modelul de redenumire (ex. «produs-{numar}» sau «{data}-{nume}»).",
      "3. Vizualizează previzualizarea noilor nume de fișiere.",
      "4. Descarcă fișierele redenumite.",
    ],
    faq: [
      { q: "La ce este utilă redenumirea în masă?", a: "Dacă trebuie să denumești uniform multe fișiere imagine, de exemplu fotografii de produs, fotografii de album sau materiale de arhivă." },
      { q: "Este sigură procesarea?", a: "Da, redenumirea fișierelor are loc în browserul tău – nicio imagine nu ajunge pe server." },
      { q: "Ce modele de redenumire sunt disponibile?", a: "Numerotare, dată, prefix, sufix, text personalizat și combinații ale acestora." },
      { q: "Se modifică conținutul imaginii?", a: "Nu, redenumirea modifică exclusiv numele fișierului – calitatea și conținutul imaginii rămân neschimbate." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul este disponibil în orice browser modern și pe dispozitive mobile." },
      { q: "Pot vedea în avans noile nume?", a: "Da, lista de previzualizare arată numele originale și cele noi înainte de descărcare." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea imaginilor", description: "Trage imaginile sau selectează-le cu butonul de selectare." },
        { title: "2. Setarea modelului de denumire", description: "Specifică modelul de redenumire: prefix, număr de ordine, dată și alte elemente pot fi combinate." },
        { title: "3. Previzualizare și descărcare", description: "Verifică noile nume de fișiere în previzualizare, apoi descarcă fișierele redenumite." },
      ],
      useCases: [
        { icon: "🛒", title: "Fotografii de produs", description: "Poți da o convenție de denumire uniformă imaginilor de produs (ex. «produs-001-fata.jpg»)." },
        { icon: "📸", title: "Albume foto", description: "Poți ordona fotografiile de evenimente cu nume uniforme bazate pe dată și număr de ordine." },
        { icon: "📂", title: "Organizarea arhivei", description: "Poți înlocui numele vechi și dezordonate cu nume uniforme și ușor de căutat." },
        { icon: "🌐", title: "Nume SEO-friendly", description: "Redenumirea imaginilor site-ului cu nume de fișiere descriptive, optimizate pentru motoarele de căutare." },
      ],
      aboutSection: {
        title: "Despre redenumirea în masă",
        paragraphs: [
          "Redenumirea în masă a fișierelor asigură o convenție de denumire sistematizată și uniformă pentru un număr mare de fișiere imagine. Denumirea uniformă facilitează căutarea, sortarea și arhivarea.",
          "Modelele de redenumire pot fi combinate flexibil: prin numerotare (001, 002...), dată, prefix și sufix personalizat poți realiza o gestionare profesională a fișierelor.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește un prefix descriptiv (ex. «produs-», «eveniment-»), astfel încât conținutul să reiasă din numele fișierului." },
        { icon: "🔢", tip: "La numerotare, completează cu zerouri (001, 002) pentru sortare corectă." },
        { icon: "🌐", tip: "Pentru SEO, folosește nume de fișiere descriptive, cu cratime, fără diacritice." },
      ],
    },
  },

  // ═══ 27. AMBALARE IMAGINI ÎN ZIP ══════════════════════════════════════════
  "tomeges-zip-letoltes": {
    introText:
      "Ambalează imaginile într-un singur fișier ZIP pentru partajare și arhivare mai ușoară. Crearea fișierului ZIP are loc în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Trage sau selectează imaginile de ambalat în ZIP.",
      "2. Opțional, specifică numele fișierului ZIP.",
      "3. Apasă butonul «Creare ZIP».",
      "4. Descarcă fișierul ZIP generat.",
    ],
    faq: [
      { q: "La ce este utilă ambalarea ZIP?", a: "Pentru ambalarea mai multor imagini într-un singur fișier, ceea ce facilitează partajarea, trimiterea prin email și arhivarea." },
      { q: "Este sigură procesarea?", a: "Da, fișierul ZIP este creat în browserul tău – nicio imagine nu ajunge pe server." },
      { q: "ZIP-ul comprimă imaginile?", a: "Formatul ZIP aplică o compresie ușoară, dar pentru imagini (care sunt deja comprimate), reducerea dimensiunii este minimă. Scopul principal este ambalarea." },
      { q: "Există limită de dimensiune?", a: "Nu există limită pe server, deoarece procesarea are loc local. Limita de memorie a browserului este singura restricție." },
      { q: "Funcționează pe mobil?", a: "Da, deși pentru un număr mare de imagini, crearea ZIP-ului pe desktop este mai rapidă." },
      { q: "Ce formate de imagine pot ambala?", a: "Poți ambala orice format de imagine (JPG, PNG, WebP, GIF, BMP etc.) într-un singur ZIP." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea imaginilor", description: "Trage imaginile de ambalat sau selectează-le cu butonul de selectare." },
        { title: "2. Configurarea fișierului ZIP", description: "Specifică un nume pentru fișierul ZIP și verifică lista de conținut." },
        { title: "3. Creare ZIP și descărcare", description: "Apasă butonul de creare ZIP, apoi descarcă pachetul generat." },
      ],
      useCases: [
        { icon: "📧", title: "Trimitere prin email", description: "Poți trimite multe imagini într-un singur atașament ZIP, în loc să le atașezi individual." },
        { icon: "💾", title: "Arhivare", description: "Arhivarea ordonată a colecțiilor de fotografii și proiectelor în fișiere ZIP." },
        { icon: "🤝", title: "Partajare", description: "Poți livra materialul vizual clienților și colegilor într-un singur fișier descărcabil." },
        { icon: "☁️", title: "Încărcare în cloud", description: "Este mai ușor să încarci un singur fișier ZIP pe servicii cloud decât multe imagini separate." },
      ],
      aboutSection: {
        title: "Despre ambalarea ZIP",
        paragraphs: [
          "ZIP este cel mai răspândit format de ambalare a fișierelor: reunește mai multe fișiere într-o singură arhivă comprimată. Orice sistem de operare și dispozitiv îl gestionează nativ, astfel că partajarea este fără probleme.",
          "În cazul fișierelor imagine, efectul de reducere a dimensiunii prin compresie ZIP este minim (deoarece imaginile sunt deja comprimate), dar avantajul ambalării constă în gestionarea și partajarea ușoară.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Dă un nume descriptiv fișierului ZIP (ex. «proiect-foto-2024.zip») pentru identificare mai ușoară." },
        { icon: "📂", tip: "Dacă ambalezi multe imagini, redenumește-le mai întâi uniform pentru o mai bună organizare." },
        { icon: "📧", tip: "Pentru email, urmărește limita de dimensiune a atașamentului – dacă ZIP-ul este prea mare, împarte-l în părți mai mici." },
      ],
    },
  },

  // ── NOI INSTRUMENTE IMAGINE – CONȚINUT SEO ──────────────────

  "heic-jpg": {
    introText: "Convertește fișierele HEIC de pe iPhone și iPad în format JPG universal compatibil, direct în browserul tău, fără încărcare pe server. HEIC oferă compresie excelentă, dar multe aplicații Windows, site-uri web și editoare de imagini nu îl pot deschide – conversia în JPG rezolvă instant această problemă.",
    guide: [
      "1. Trage sau selectează fișierele HEIC pe care dorești să le convertești în JPG.",
      "2. Instrumentul decodifică automat formatul HEIC folosind WebAssembly, direct în browser.",
      "3. Setează calitatea JPG dorită (implicit 90%) pentru echilibrul optim între calitate și dimensiune.",
      "4. Descarcă fișierul JPG individual sau toate fișierele convertite într-o arhivă ZIP.",
    ],
    faq: [
      { q: "De ce nu se deschide imaginea HEIC pe Windows?", a: "Windows nu include implicit un decodor HEIC/HEVC. Pentru a deschide fișierele HEIC, trebuie să instalezi extensia HEIF din Microsoft Store sau să convertești imaginile în JPG cu acest instrument." },
      { q: "Se pierde calitatea imaginii la conversia HEIC în JPG?", a: "Conversia se face implicit cu calitate JPG de 90%, ceea ce produce o diferență aproape imperceptibilă cu ochiul liber. Pentru calitate maximă, poți seta valoarea la 95-100." },
      { q: "Este sigură conversia HEIC în JPG online?", a: "Da, absolut. Conversia are loc exclusiv în browserul tău prin WebAssembly – nicio imagine nu părăsește computerul și nu ajunge pe vreun server." },
      { q: "Pot converti mai multe fișiere HEIC simultan?", a: "Da, poți încărca mai multe fișiere HEIC simultan. Toate sunt procesate în paralel în browser, iar rezultatele pot fi descărcate într-o singură arhivă ZIP." },
      { q: "Se păstrează datele EXIF la conversia HEIC în JPG?", a: "Da, metadatele EXIF (inclusiv data, setările camerei și coordonatele GPS) sunt păstrate în fișierul JPG rezultat." },
      { q: "Funcționează conversia HEIC pe mobil?", a: "Da, instrumentul funcționează în orice browser modern, inclusiv pe dispozitive mobile Android, unde fișierele HEIC primite de la utilizatori iPhone pot fi convertite direct." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea fișierelor HEIC", description: "Trage fișierele HEIC în zona de încărcare sau apasă butonul de selectare. Poți încărca mai multe fișiere simultan pentru conversie în masă." },
        { title: "2. Decodificare automată HEIC", description: "Instrumentul decodifică automat formatul HEIC/HEIF folosind tehnologia WebAssembly, direct în browserul tău, fără a trimite date pe server." },
        { title: "3. Setarea calității JPG", description: "Ajustează calitatea de ieșire JPG cu ajutorul cursorului (1-100). Valoarea implicită de 90% oferă un echilibru excelent între calitate și dimensiunea fișierului." },
        { title: "4. Descărcare JPG", description: "Descarcă fișierul JPG convertit individual sau, în cazul mai multor fișiere, descarcă-le pe toate într-o arhivă ZIP." },
      ],
      useCases: [
        { icon: "📱", title: "Partajare fotografii iPhone", description: "Fotografiile realizate pe iPhone sunt implicit în format HEIC. Convertește-le în JPG pentru a le partaja cu utilizatori Windows, Android sau pentru încărcare pe platforme web." },
        { icon: "💼", title: "CV-uri și aplicații de angajare", description: "Sistemele HR și portalurile de recrutare acceptă de obicei doar format JPG sau PNG. Convertește fotografiile HEIC de pe iPhone pentru a le atașa fără probleme." },
        { icon: "🌐", title: "Încărcare pe site-uri web", description: "Multe platforme CMS, bloguri și magazine online nu acceptă formatul HEIC. Conversia în JPG asigură compatibilitate universală." },
        { icon: "🖨️", title: "Imprimare fotografii", description: "Serviciile de imprimare foto și tipografiile acceptă format JPG. Convertește fotografiile HEIC de pe iPhone înainte de a le trimite la imprimare." },
      ],
      aboutSection: {
        title: "Despre formatul HEIC și conversia în JPG",
        paragraphs: [
          "HEIC (High Efficiency Image Container) este formatul de imagine adoptat de Apple începând cu iOS 11, bazat pe codecul video HEVC (H.265). Principalul avantaj al HEIC este compresia superioară: la aceeași calitate vizuală, dimensiunea fișierului este aproximativ la jumătate față de JPEG, ceea ce economisește spațiu semnificativ pe dispozitivele Apple.",
          "Cu toate acestea, compatibilitatea HEIC rămâne limitată: Windows nu include implicit un decodor HEIC, multe editoare de imagini, platforme web și sisteme de gestionare a conținutului nu îl acceptă. Conversia în JPG rezolvă această problemă, transformând imaginile într-un format universal acceptat.",
          "Instrumentul nostru utilizează tehnologia WebAssembly pentru decodificarea HEIC direct în browser, fără a necesita instalarea vreunui software suplimentar. Procesul este rapid, sigur și complet privat – nicio imagine nu părăsește computerul tău.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Conversia HEIC → JPG păstrează metadatele EXIF, inclusiv coordonatele GPS – dacă nu dorești acest lucru, șterge metadatele după conversie." },
        { icon: "📊", tip: "La calitate JPG de 90%, dimensiunea fișierului rezultat este de obicei similară sau chiar mai mică decât originalul HEIC." },
        { icon: "📱", tip: "Pe iPhone, poți dezactiva formatul HEIC din Setări → Cameră → Formate → Cel mai compatibil, dar vei pierde avantajul economiei de spațiu." },
        { icon: "⚡", tip: "Pentru conversie în masă a albumelor foto de pe iPhone, încarcă toate fișierele simultan și descarcă rezultatele în ZIP." },
      ],
      formatComparison: {
        title: "Comparație HEIC vs JPG",
        columns: ["Proprietate", "HEIC", "JPG"],
        rows: [
          { feature: "Tip de compresie", values: ["Cu pierderi (HEVC)", "Cu pierderi (DCT)"] },
          { feature: "Dimensiune medie fișier", values: ["Mai mică (~50%)", "Mai mare"] },
          { feature: "Compatibilitate", values: ["Apple, browsere noi", "Universală"] },
          { feature: "Transparență (alfa)", values: ["Acceptă", "Nu acceptă"] },
          { feature: "Suport software", values: ["Limitat", "Aproape orice software"] },
        ],
      },
    },
  },

  "heic-png": {
    introText: "Convertește imaginile HEIC de pe iPhone și iPad în format PNG fără pierderi, păstrând canalul alfa și calitatea maximă a imaginii. Ideal pentru editare grafică ulterioară, logo-uri și situații în care transparența este necesară. Conversia se realizează direct în browser.",
    guide: [
      "1. Trage sau selectează fișierele HEIC pe care dorești să le convertești în PNG.",
      "2. Instrumentul decodifică automat formatul HEIC folosind WebAssembly în browser.",
      "3. Imaginea este convertită în PNG fără pierderi, cu păstrarea completă a canalului alfa.",
      "4. Descarcă fișierul PNG individual sau toate fișierele convertite într-o arhivă ZIP.",
    ],
    faq: [
      { q: "Când ar trebui să aleg PNG în loc de JPG pentru conversia HEIC?", a: "Alege PNG când ai nevoie de calitate fără pierderi pentru editare ulterioară, când imaginea conține transparență (canal alfa) sau când dorești să păstrezi detaliile perfecte ale imaginii originale." },
      { q: "Este sigură conversia HEIC în PNG online?", a: "Da, conversia are loc exclusiv în browserul tău prin WebAssembly. Nicio imagine nu părăsește computerul tău și nu ajunge pe vreun server extern." },
      { q: "Fișierul PNG va fi mai mare decât HEIC?", a: "Da, PNG folosește compresie fără pierderi, astfel că fișierul rezultat va fi semnificativ mai mare decât originalul HEIC. Acesta este prețul calității perfecte." },
      { q: "Se păstrează transparența din fișierele HEIC?", a: "Da, formatul PNG acceptă pe deplin canalul alfa, iar transparența din imaginile HEIC este păstrată integral în fișierul PNG rezultat." },
      { q: "Pot converti mai multe fișiere HEIC în PNG simultan?", a: "Da, poți încărca mai multe fișiere HEIC simultan. Toate sunt procesate în paralel, iar rezultatele pot fi descărcate într-o arhivă ZIP." },
      { q: "Funcționează conversia HEIC în PNG pe Android?", a: "Da, instrumentul funcționează în orice browser modern, inclusiv pe dispozitive Android, unde poți converti fișierele HEIC primite de la utilizatori iPhone." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectarea fișierelor HEIC", description: "Trage fișierele HEIC în zona de încărcare sau apasă butonul de selectare. Sunt acceptate fișierele cu extensia .heic și .heif." },
        { title: "2. Decodificare automată", description: "Instrumentul decodifică formatul HEIC/HEIF folosind WebAssembly direct în browser, fără a trimite date pe server. Canalul alfa este păstrat automat." },
        { title: "3. Conversie în PNG fără pierderi", description: "Imaginea este convertită în format PNG cu compresie fără pierderi, păstrând fiecare pixel și detaliu al imaginii originale." },
        { title: "4. Descărcare rezultat", description: "Descarcă fișierul PNG individual sau, în cazul mai multor fișiere, descarcă-le pe toate într-o arhivă ZIP organizată." },
      ],
      useCases: [
        { icon: "🎨", title: "Editare grafică profesională", description: "Formatul PNG fără pierderi este ideal pentru editare ulterioară în Photoshop, GIMP sau Canva – calitatea nu se deteriorează la salvări repetate." },
        { icon: "🌐", title: "Utilizare web cu transparență", description: "PNG este formatul standard pentru imagini web cu fundal transparent – logo-uri, iconițe și elemente UI." },
        { icon: "🖨️", title: "Pregătire pentru imprimare", description: "Formatul PNG fără pierderi asigură calitatea maximă necesară pentru materiale tipărite profesionale." },
        { icon: "📱", title: "Compatibilitate multi-platformă", description: "Convertește fotografiile HEIC de pe iPhone în PNG pentru partajare universală cu utilizatori Windows, Linux și Android." },
      ],
      aboutSection: {
        title: "Despre conversia HEIC în PNG",
        paragraphs: [
          "HEIC (High Efficiency Image Container) este formatul de imagine implicit pe dispozitivele Apple. Deși oferă compresie excelentă, compatibilitatea sa este limitată. Conversia în PNG rezolvă această problemă, oferind un format universal acceptat cu calitate fără pierderi.",
          "PNG (Portable Network Graphics) folosește compresie fără pierderi, ceea ce înseamnă că niciun detaliu al imaginii nu se pierde în procesul de conversie. În plus, PNG acceptă pe deplin canalul alfa (transparență), ceea ce îl face ideal pentru logo-uri, grafice și elemente de interfață.",
          "Instrumentul nostru utilizează WebAssembly pentru decodificarea rapidă a formatului HEIC direct în browser. Procesul este complet privat și nu necesită instalarea vreunui software suplimentar pe computer.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Alege PNG în loc de JPG atunci când ai nevoie de calitate fără pierderi sau de transparență – pentru simplă partajare, JPG este mai eficient ca dimensiune." },
        { icon: "📊", tip: "Fișierele PNG rezultate vor fi mai mari decât originalele HEIC – ia în considerare spațiul de stocare disponibil." },
        { icon: "🎨", tip: "PNG este formatul ideal pentru editare ulterioară, deoarece salvările repetate nu deteriorează calitatea imaginii." },
        { icon: "⚠️", tip: "Dacă nu ai nevoie de transparență sau de calitate fără pierderi, conversia HEIC → JPG produce fișiere mult mai mici." },
      ],
      formatComparison: {
        title: "Comparație HEIC vs PNG",
        columns: ["Proprietate", "HEIC", "PNG"],
        rows: [
          { feature: "Tip de compresie", values: ["Cu pierderi (HEVC)", "Fără pierderi"] },
          { feature: "Dimensiune fișier", values: ["Foarte mică", "Mare"] },
          { feature: "Transparență (alfa)", values: ["Acceptă", "Acceptă"] },
          { feature: "Compatibilitate", values: ["Apple, browsere noi", "Universală"] },
          { feature: "Calitate la salvări repetate", values: ["Se deteriorează", "Se păstrează perfect"] },
        ],
      },
    },
  },

  "jpg-avif": {
    introText: "Convertește imaginile JPG în formatul AVIF de ultimă generație, care oferă o compresie cu până la 50% mai eficientă decât JPEG. AVIF este acceptat de toate browserele majore și reprezintă viitorul imaginilor web. Conversia se realizează direct în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Trage sau selectează fișierele JPG pe care dorești să le convertești în AVIF.",
      "2. Setează calitatea de compresie (valoarea CQ) – 30-40 este recomandat pentru utilizare web.",
      "3. Instrumentul codifică imaginea în format AVIF folosind WebAssembly direct în browser.",
      "4. Descarcă fișierul AVIF rezultat sau toate fișierele convertite într-o arhivă ZIP.",
    ],
    faq: [
      { q: "AVIF funcționează în toate browserele moderne?", a: "Da, începând cu 2025 toate browserele majore acceptă AVIF: Chrome 85+, Firefox 93+, Safari 16+, Edge 85+. Acoperirea globală depășește 95% din utilizatorii de internet." },
      { q: "Cât spațiu se economisește cu conversia JPG în AVIF?", a: "De obicei 40-50% față de JPEG la aceeași calitate percepută. AVIF este cu 20-25% mai eficient decât WebP și cu 50% mai eficient decât JPEG tradițional." },
      { q: "Este sigură conversia JPG în AVIF online?", a: "Da, absolut. Conversia are loc exclusiv în browserul tău prin WebAssembly – nicio imagine nu părăsește computerul tău." },
      { q: "Ce calitate CQ ar trebui să setez pentru AVIF?", a: "Pentru utilizare web, CQ 30-40 oferă cel mai bun echilibru. Pentru fotografii de înaltă calitate, CQ 20-30. Valori mai mici = calitate mai bună dar fișier mai mare." },
      { q: "Pot converti mai multe fișiere JPG în AVIF simultan?", a: "Da, procesarea în lot este acceptată. Încarcă toate fișierele JPG simultan și descarcă rezultatele în arhivă ZIP." },
      { q: "De ce este AVIF mai bun decât WebP?", a: "AVIF oferă compresie cu 20-25% mai eficientă decât WebP, acceptă HDR și gamă largă de culori (WCG), și este complet fără licență (royalty-free)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea fișierelor JPG", description: "Trage fișierele JPG în zona de încărcare sau apasă butonul de selectare. Procesarea în lot este posibilă pentru conversie rapidă a mai multor imagini." },
        { title: "2. Setarea calității AVIF", description: "Ajustează valoarea CQ (Constant Quality) cu ajutorul cursorului. Valori recomandate: 20-30 pentru calitate înaltă, 30-40 pentru web, 40-50 pentru miniaturi." },
        { title: "3. Conversie AVIF în browser", description: "Instrumentul codifică imaginea în format AVIF folosind WebAssembly direct în browser. Procesul poate dura câteva secunde pentru imagini mari." },
        { title: "4. Descărcare rezultat", description: "Descarcă fișierul AVIF convertit. Compară dimensiunea cu originalul JPG pentru a vedea economia realizată." },
      ],
      useCases: [
        { icon: "⚡", title: "Optimizare viteza site-ului", description: "AVIF este cea mai eficientă metodă de reducere a dimensiunii imaginilor web. Google PageSpeed recomandă formate de nouă generație precum AVIF." },
        { icon: "🛒", title: "Imagini produse e-commerce", description: "Reducere drastică a timpului de încărcare pentru magazine online cu sute de imagini de produs, îmbunătățind conversia și experiența utilizatorului." },
        { icon: "📱", title: "Experiență mobilă optimă", description: "Fișiere AVIF mai mici înseamnă încărcare mai rapidă pe rețele mobile 4G/5G și consum redus de date pentru utilizatori." },
        { icon: "🎯", title: "Scor SEO și Core Web Vitals", description: "Imaginile AVIF îmbunătățesc metricile LCP (Largest Contentful Paint) și CLS, contribuind la un scor mai bun în Google PageSpeed Insights." },
      ],
      aboutSection: {
        title: "Despre formatul AVIF și conversia din JPG",
        paragraphs: [
          "AVIF (AV1 Image File Format) este cel mai modern format de imagine disponibil, bazat pe codecul video AV1 dezvoltat de Alliance for Open Media (Google, Mozilla, Apple, Microsoft). Este complet fără licență (royalty-free) și oferă compresie semnificativ mai eficientă decât JPEG sau WebP.",
          "Avantajele tehnice ale AVIF includ: suport pentru HDR (High Dynamic Range), gamă largă de culori (Wide Color Gamut), canal alfa pentru transparență și adâncime de culoare de până la 12 biți. Toate browserele majore acceptă AVIF din 2025.",
          "Conversia JPG în AVIF poate reduce dimensiunea fișierului cu 40-50% la aceeași calitate percepută, ceea ce are impact direct asupra vitezei de încărcare a site-ului, consumului de lățime de bandă și experienței utilizatorului.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru utilizare web, CQ 30-40 oferă cel mai bun echilibru între calitate și dimensiune – testează cu câteva imagini înainte de conversie în masă." },
        { icon: "📊", tip: "AVIF poate reduce dimensiunea fișierului cu 40-50% față de JPG – verifică economia pentru fiecare imagine în rezumatul de conversie." },
        { icon: "⚡", tip: "Codificarea AVIF este mai lentă decât WebP sau JPG – fii răbdător cu imaginile mari, procesul poate dura câteva secunde." },
        { icon: "🌐", tip: "Folosește tag-ul HTML <picture> cu AVIF ca sursă principală și JPG ca fallback pentru compatibilitate maximă." },
      ],
      formatComparison: {
        title: "Comparație JPG vs AVIF",
        columns: ["Proprietate", "JPG", "AVIF"],
        rows: [
          { feature: "Eficiența compresiei", values: ["Standard", "Cu 40-50% mai eficient"] },
          { feature: "Transparență (alfa)", values: ["Nu acceptă", "Acceptă"] },
          { feature: "HDR / Gamă largă de culori", values: ["Nu acceptă", "Acceptă"] },
          { feature: "Adâncime de culoare", values: ["8 biți", "Până la 12 biți"] },
          { feature: "Compatibilitate", values: ["Universală", "Toate browserele moderne (95%+)"] },
        ],
      },
    },
  },

  "png-avif": {
    introText: "Convertește imaginile PNG în formatul AVIF de nouă generație, păstrând complet canalul alfa (transparență). AVIF oferă fișiere cu 30-60% mai mici decât PNG, atât în mod cu pierderi cât și fără pierderi. Procesarea se realizează direct în browserul tău.",
    guide: [
      "1. Trage sau selectează fișierele PNG pe care dorești să le convertești în AVIF.",
      "2. Alege modul de compresie: cu pierderi (lossy) pentru dimensiune minimă sau fără pierderi (lossless) pentru calitate perfectă.",
      "3. Ajustează calitatea de compresie conform nevoilor tale – previzualizarea arată imediat rezultatul.",
      "4. Descarcă fișierul AVIF rezultat sau toate fișierele într-o arhivă ZIP.",
    ],
    faq: [
      { q: "AVIF păstrează transparența din fișierele PNG?", a: "Da, AVIF acceptă pe deplin canalul alfa (transparență). Zonele transparente din PNG sunt păstrate integral în fișierul AVIF rezultat." },
      { q: "Care este diferența între modul lossy și lossless la AVIF?", a: "Modul cu pierderi (lossy) produce fișiere mult mai mici, cu pierdere minimă de calitate. Modul fără pierderi (lossless) păstrează fiecare pixel, dar economia de spațiu este mai mică (10-20% față de PNG)." },
      { q: "Este sigură conversia PNG în AVIF online?", a: "Da, conversia are loc exclusiv în browserul tău. Nicio imagine nu părăsește computerul tău și nu este trimisă pe vreun server." },
      { q: "Cât de mult se reduce dimensiunea fișierului?", a: "În mod lossy, reducerea este de 50-70% față de PNG. În mod lossless, reducerea este de 10-20%. Economia exactă depinde de conținutul imaginii." },
      { q: "Toate browserele acceptă AVIF cu transparență?", a: "Da, din 2025 toate browserele majore (Chrome, Firefox, Safari 16+, Edge) acceptă pe deplin AVIF, inclusiv cu canal alfa." },
      { q: "Când ar trebui să aleg AVIF în loc de WebP pentru PNG-uri?", a: "AVIF oferă compresie cu 20-25% mai eficientă decât WebP și acceptă HDR și gamă largă de culori. Este alegerea optimă pentru performanță web maximă." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea fișierelor PNG", description: "Trage fișierele PNG în zona de încărcare sau apasă butonul de selectare. Transparența (canalul alfa) este detectată și păstrată automat." },
        { title: "2. Alegerea modului de compresie", description: "Selectează între modul cu pierderi (lossy) pentru dimensiune minimă sau fără pierderi (lossless) pentru calitate pixel-perfect. Modul lossy este recomandat pentru web." },
        { title: "3. Ajustarea calității", description: "Folosește cursorul pentru a seta calitatea dorită. Previzualizarea arată imediat rezultatul și dimensiunea estimată a fișierului." },
        { title: "4. Descărcare AVIF", description: "Descarcă fișierul AVIF convertit individual sau într-o arhivă ZIP pentru conversie în masă." },
      ],
      useCases: [
        { icon: "🖼️", title: "Elemente UI și iconițe web", description: "Optimizează elementele de interfață cu fundal transparent – butoane, iconițe și grafice – reducând drastic dimensiunea fără a pierde transparența." },
        { icon: "🎨", title: "Logo-uri și grafică de brand", description: "Convertește logo-urile și elementele grafice din PNG în AVIF pentru încărcare mai rapidă pe site-uri web, menținând calitatea și transparența." },
        { icon: "🌐", title: "Optimizare performanță web", description: "Înlocuiește imaginile PNG mari de pe site cu AVIF pentru îmbunătățirea semnificativă a Core Web Vitals și a scorului PageSpeed." },
        { icon: "📱", title: "Aplicații mobile și PWA", description: "Folosește AVIF cu transparență în aplicații web progresive pentru încărcare rapidă și consum redus de date mobile." },
      ],
      aboutSection: {
        title: "Despre conversia PNG în AVIF",
        paragraphs: [
          "PNG (Portable Network Graphics) este standardul pentru imagini fără pierderi cu transparență, dar produce fișiere mari. AVIF (AV1 Image File Format) este alternativa modernă care oferă compresie semnificativ mai eficientă, atât cu pierderi cât și fără pierderi, cu suport complet pentru canal alfa.",
          "În modul fără pierderi, AVIF obține de obicei fișiere cu 10-20% mai mici decât PNG echivalent. În modul cu pierderi, reducerea poate ajunge la 50-70%, cu pierdere vizuală minimă – ideal pentru imagini web unde performanța este prioritară.",
          "AVIF acceptă adâncime de culoare de până la 12 biți, HDR și gamă largă de culori (WCG), ceea ce îl face superior atât PNG-ului cât și WebP-ului din punct de vedere tehnic. Toate browserele majore îl acceptă complet din 2025.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru logo-uri și iconițe cu transparență, modul lossy cu calitate medie oferă o reducere de 50-70% fără pierdere vizibilă." },
        { icon: "📊", tip: "Modul lossless AVIF este mai eficient decât PNG – economisești 10-20% fără nicio pierdere de calitate." },
        { icon: "🌐", tip: "Folosește tag-ul HTML <picture> cu AVIF ca sursă primară și PNG ca fallback pentru browsere mai vechi." },
        { icon: "⚡", tip: "Codificarea AVIF necesită mai mult timp de procesare decât PNG – pentru imagini mari, fii răbdător." },
      ],
      formatComparison: {
        title: "Comparație PNG vs AVIF",
        columns: ["Proprietate", "PNG", "AVIF"],
        rows: [
          { feature: "Compresie fără pierderi", values: ["Standard", "Cu 10-20% mai eficient"] },
          { feature: "Compresie cu pierderi", values: ["Nu acceptă", "Acceptă (reducere 50-70%)"] },
          { feature: "Transparență (alfa)", values: ["Acceptă", "Acceptă"] },
          { feature: "HDR / Gamă largă de culori", values: ["Limitat", "Acceptă complet"] },
          { feature: "Compatibilitate", values: ["Universală", "Toate browserele moderne (95%+)"] },
        ],
      },
    },
  },

  "kep-base64": {
    introText: "Codifică imaginile în format Base64 pentru integrare directă în codul HTML, CSS sau JavaScript, fără cereri HTTP separate. Ideal pentru iconițe mici, logo-uri și imagini critice above-the-fold. Codificarea se realizează instant în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Trage sau selectează imaginea pe care dorești să o codifici în Base64 (JPG, PNG, WebP, SVG sau GIF).",
      "2. Alege formatul de ieșire: tag HTML <img>, proprietate CSS background-image sau Data URI brut.",
      "3. Previzualizează codul generat și dimensiunea rezultată în caractere.",
      "4. Copiază codul Base64 generat cu un singur clic pentru a-l integra în proiectul tău.",
    ],
    faq: [
      { q: "Când ar trebui să folosesc codificarea Base64 pentru imagini?", a: "Base64 este ideal pentru imagini mici sub 50KB – iconițe, logo-uri, placeholder-uri și imagini critice above-the-fold. Pentru imagini mari, fișierele separate sunt mai eficiente." },
      { q: "Este sigură codificarea Base64 online?", a: "Da, codificarea are loc exclusiv în browserul tău. Imaginea nu părăsește computerul și nu este trimisă pe vreun server." },
      { q: "Crește dimensiunea fișierului la codificarea Base64?", a: "Da, codificarea Base64 mărește dimensiunea cu aproximativ 33% față de fișierul binar original. De aceea este recomandată doar pentru imagini mici." },
      { q: "Care este diferența între formatele de ieșire (HTML, CSS, Data URI)?", a: "Tag-ul HTML <img> se inserează direct în HTML. CSS background-image se folosește în foi de stil. Data URI brut poate fi utilizat în JavaScript sau în orice alt context." },
      { q: "Imaginile Base64 afectează performanța site-ului?", a: "Pentru imagini mici (<10KB), Base64 poate îmbunătăți performanța prin eliminarea cererilor HTTP. Pentru imagini mari, efectul este negativ deoarece mărește dimensiunea HTML/CSS." },
      { q: "Funcționează imaginile Base64 în toate browserele?", a: "Da, Data URI-urile Base64 sunt acceptate de toate browserele moderne și de majoritatea clienților de email." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea în zona de încărcare sau apasă butonul de selectare. Sunt acceptate formatele JPG, PNG, WebP, SVG și GIF." },
        { title: "2. Alegerea formatului de ieșire", description: "Selectează formatul dorit: tag HTML <img> pentru inserare directă în pagini web, CSS background-image pentru foi de stil, sau Data URI brut pentru utilizare în JavaScript." },
        { title: "3. Previzualizare cod", description: "Verifică codul Base64 generat și dimensiunea rezultată. Compară cu dimensiunea originală a fișierului pentru a evalua eficiența." },
        { title: "4. Copiere cod", description: "Apasă butonul de copiere pentru a transfera codul Base64 în clipboard, gata de integrat în proiectul tău web." },
      ],
      useCases: [
        { icon: "📧", title: "Șabloane de email HTML", description: "Imaginile Base64 sunt afișate corect în email-uri fără a necesita hosting extern. Ideal pentru logo-uri și iconițe în semnătura de email sau newsletter." },
        { icon: "⚡", title: "Imagini critice above-the-fold", description: "Integrarea imaginilor mici direct în HTML elimină cererile HTTP render-blocking, accelerând afișarea inițială a paginii." },
        { icon: "🎨", title: "Aplicații single-page (SPA)", description: "Integrarea iconițelor și elementelor grafice mici direct în codul JavaScript sau CSS al aplicațiilor React, Vue sau Angular." },
        { icon: "📄", title: "Documente HTML autonome", description: "Crearea de fișiere HTML care conțin toate imaginile integrate, fără dependențe externe – ideal pentru rapoarte și prezentări offline." },
      ],
      aboutSection: {
        title: "Despre codificarea Base64 a imaginilor",
        paragraphs: [
          "Base64 este o schemă de codificare care transformă datele binare (precum fișierele imagine) în text ASCII. Rezultatul poate fi integrat direct în codul HTML, CSS sau JavaScript sub formă de Data URI (data:image/png;base64,...), eliminând necesitatea unui fișier imagine separat.",
          "Avantajul principal al Base64 este reducerea numărului de cereri HTTP: în loc să descarce fișierul imagine separat, browserul îl decodifică direct din codul sursă. Aceasta poate accelera semnificativ încărcarea paginii pentru imagini mici.",
          "Dezavantajul este creșterea dimensiunii cu aproximativ 33% și imposibilitatea caching-ului separat al imaginii. De aceea, Base64 este recomandat doar pentru imagini mici (sub 10-50KB) precum iconițe, logo-uri și placeholder-uri.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește Base64 doar pentru imagini sub 10KB – peste această limită, fișierele separate sunt mai eficiente datorită caching-ului browserului." },
        { icon: "📊", tip: "Codificarea Base64 mărește dimensiunea cu ~33% – o imagine de 30KB devine ~40KB în Base64." },
        { icon: "📧", tip: "Pentru email-uri HTML, Base64 este adesea singura modalitate de a garanta afișarea imaginilor, deoarece multe clienți de email blochează imaginile externe." },
        { icon: "⚡", tip: "Combină Base64 cu CSS sprites pentru iconițe inline – elimini toate cererile HTTP pentru elementele grafice mici." },
      ],
    },
  },

  "kep-ico": {
    introText: "Generează fișier ICO favicon profesional din orice imagine PNG, JPG sau WebP, direct în browser. Fișierul ICO rezultat conține automat dimensiunile standard 16x16, 32x32 și 48x48 px, gata de integrat pe site-ul tău web. Nu necesită software suplimentar.",
    guide: [
      "1. Trage sau selectează imaginea sursă (PNG recomandat cu fundal transparent, minim 64x64 px).",
      "2. Instrumentul generează automat toate dimensiunile standard (16x16, 32x32, 48x48 px) într-un singur fișier ICO.",
      "3. Previzualizează favicon-ul la diferite dimensiuni pentru a verifica lizibilitatea.",
      "4. Descarcă fișierul favicon.ico și încarcă-l în directorul rădăcină al site-ului tău.",
    ],
    faq: [
      { q: "Ce dimensiune ar trebui să aibă imaginea sursă pentru favicon?", a: "Minim 64x64 pixeli, ideal 512x512 px. O imagine sursă mai mare produce favicon-uri mai clare și mai detaliate la toate dimensiunile." },
      { q: "Este sigură generarea favicon-ului online?", a: "Da, procesarea are loc exclusiv în browserul tău. Imaginea nu părăsește computerul și nu este trimisă pe vreun server." },
      { q: "Ce format de imagine sursă este recomandat?", a: "PNG cu fundal transparent este recomandat pentru cele mai bune rezultate. JPG și WebP sunt de asemenea acceptate, dar nu acceptă transparență." },
      { q: "Cum integrez favicon.ico pe site-ul meu?", a: "Încarcă fișierul favicon.ico în directorul rădăcină al site-ului tău și adaugă în <head>: <link rel='icon' href='/favicon.ico'>. Browserele caută automat favicon.ico în rădăcina domeniului." },
      { q: "Ce dimensiuni conține fișierul ICO generat?", a: "Fișierul ICO conține trei dimensiuni standard: 16x16 px (tab browser), 32x32 px (bara de favorite) și 48x48 px (scurtături desktop Windows)." },
      { q: "Funcționează generatorul de favicon pe mobil?", a: "Da, instrumentul funcționează în orice browser modern. Totuși, pentru dispozitive mobile ai nevoie și de fișiere PNG separate (apple-touch-icon de 180x180 px)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii sursă", description: "Trage imaginea în zona de încărcare sau apasă butonul de selectare. PNG cu fundal transparent este recomandat. Dimensiunea ideală: 512x512 px sau mai mare." },
        { title: "2. Generare automată dimensiuni", description: "Instrumentul redimensionează automat imaginea la 16x16, 32x32 și 48x48 pixeli și le combină într-un singur fișier ICO multi-dimensiune." },
        { title: "3. Previzualizare favicon", description: "Verifică cum arată favicon-ul la diferite dimensiuni. Asigură-te că logo-ul sau iconița este lizibilă și la dimensiunea cea mai mică (16x16 px)." },
        { title: "4. Descărcare și integrare", description: "Descarcă fișierul favicon.ico și încarcă-l în directorul rădăcină al site-ului. Adaugă tag-ul <link> corespunzător în secțiunea <head> a paginilor HTML." },
      ],
      useCases: [
        { icon: "🌐", title: "Favicon pentru site web", description: "Creează iconița care apare în tab-ul browserului, în bara de favorite și în rezultatele de căutare – element esențial al identității vizuale a oricărui site." },
        { icon: "🖥️", title: "Icoane aplicații Windows", description: "Formatul ICO este standardul pentru icoane de aplicații desktop Windows – scurtături, meniu Start și bara de taskuri." },
        { icon: "🏢", title: "Branding profesional", description: "Un favicon personalizat consolidează identitatea de brand și oferă un aspect profesional site-ului tău web." },
        { icon: "🔍", title: "Vizibilitate în rezultatele de căutare", description: "Favicon-ul apare lângă rezultatele de căutare Google, îmbunătățind rata de clic (CTR) și recunoașterea brandului." },
      ],
      aboutSection: {
        title: "Despre formatul ICO și favicon-uri",
        paragraphs: [
          "ICO (Icon) este un format de fișier dezvoltat de Microsoft care poate stoca mai multe versiuni ale aceleiași imagini la dimensiuni diferite într-un singur fișier. Aceasta permite browserelor și sistemului de operare să aleagă automat dimensiunea optimă pentru fiecare context de utilizare.",
          "Favicon-ul (favorite icon) este iconița asociată unui site web, afișată în tab-ul browserului, bara de favorite, istoricul de navigare și în rezultatele de căutare Google. Deși browserele moderne acceptă și favicon-uri PNG, formatul ICO rămâne standardul universal acceptat.",
          "Pentru o implementare completă a favicon-urilor, pe lângă fișierul ICO, se recomandă și generarea de fișiere PNG separate pentru dispozitive Apple (apple-touch-icon 180x180 px) și Android (192x192 px și 512x512 px pentru manifest.json).",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește o imagine simplă și contrastantă ca sursă – detaliile fine se pierd la dimensiunea de 16x16 pixeli." },
        { icon: "🎨", tip: "PNG cu fundal transparent produce cele mai bune rezultate – favicon-ul se va integra natural pe orice culoare de tab." },
        { icon: "📏", tip: "Testează lizibilitatea favicon-ului la dimensiunea minimă de 16x16 px înainte de publicare." },
        { icon: "🌐", tip: "Plasează fișierul favicon.ico în directorul rădăcină al domeniului – browserele îl caută automat la /favicon.ico." },
      ],
    },
  },

  "atmeterezas-kb": {
    introText: "Redimensionează imaginile la o dimensiune exactă în KB – instrumentul găsește automat calitatea JPEG optimă prin algoritm de căutare binară. Ideal pentru formulare online, aplicații de angajare și portaluri oficiale cu limite stricte de dimensiune. Procesarea se realizează în browser.",
    guide: [
      "1. Trage sau selectează imaginea pe care dorești să o redimensionezi (JPG, PNG sau WebP).",
      "2. Specifică dimensiunea maximă dorită în kilobytes (KB) – de exemplu 200KB, 500KB sau 2MB.",
      "3. Instrumentul ajustează automat calitatea JPEG prin căutare binară pentru a obține dimensiunea țintă cu precizie de ±5%.",
      "4. Descarcă imaginea optimizată la dimensiunea exactă dorită.",
    ],
    faq: [
      { q: "Cât de precis este instrumentul de redimensionare la KB?", a: "Algoritmul de căutare binară obține rezultate cu precizie de ±5% față de dimensiunea țintă specificată. De exemplu, pentru o țintă de 200KB, rezultatul va fi între 190-210KB." },
      { q: "Este sigură procesarea imaginii?", a: "Da, întreaga procesare are loc în browserul tău. Imaginea nu părăsește computerul și nu este trimisă pe vreun server extern." },
      { q: "Ce formate de imagine acceptă instrumentul?", a: "Poți încărca imagini în format JPG, PNG sau WebP. Rezultatul este întotdeauna un fișier JPEG optimizat la dimensiunea dorită." },
      { q: "Cum funcționează algoritmul de căutare binară?", a: "Instrumentul testează iterativ diferite niveluri de calitate JPEG (între 0.01 și 1.0), înjumătățind intervalul la fiecare pas, până când găsește calitatea optimă care produce dimensiunea cea mai apropiată de țintă." },
      { q: "Ce dimensiune țintă ar trebui să setez?", a: "Depinde de cerințele platformei: aplicații HR - de obicei 2MB, portaluri guvernamentale - 500KB-1MB, formulare online - verifică cerințele specifice ale fiecărui site." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul funcționează în orice browser modern, inclusiv pe dispozitive mobile, ceea ce este util pentru trimiterea fotografiilor direct de pe telefon." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea în zona de încărcare sau apasă butonul de selectare. Sunt acceptate formatele JPG, PNG și WebP de orice dimensiune." },
        { title: "2. Specificarea dimensiunii țintă", description: "Introdu dimensiunea maximă dorită în kilobytes (KB). Poți specifica valori precum 100KB, 200KB, 500KB sau 2048KB (2MB) conform cerințelor platformei." },
        { title: "3. Optimizare automată", description: "Algoritmul de căutare binară testează iterativ diferite calități JPEG pentru a găsi setarea optimă care produce dimensiunea cea mai apropiată de țintă, cu precizie de ±5%." },
        { title: "4. Descărcare rezultat", description: "Descarcă imaginea JPEG optimizată la dimensiunea exactă dorită. Verifică dimensiunea finală afișată pentru confirmare." },
      ],
      useCases: [
        { icon: "💼", title: "Aplicații de angajare și CV-uri", description: "Sistemele HR și portalurile de recrutare impun de obicei o limită de 1-2MB pentru fotografii. Redimensionează imaginea exact la limita cerută." },
        { icon: "🏛️", title: "Formulare și portaluri oficiale", description: "Portalurile guvernamentale, aplicațiile de pașaport și formularele oficiale au limite stricte de dimensiune – acest instrument asigură conformitatea." },
        { icon: "📧", title: "Atașamente email cu dimensiune limitată", description: "Mulți furnizori de email limitează atașamentele la 25MB. Optimizează imaginile pentru a se încadra în limită, menținând calitatea maximă posibilă." },
        { icon: "🌐", title: "Încărcare pe platforme cu restricții", description: "Forumuri, platforme educaționale și sisteme CMS cu limite de dimensiune a fișierelor – redimensionează exact la cerința platformei." },
      ],
      aboutSection: {
        title: "Despre redimensionarea imaginilor la dimensiune exactă în KB",
        paragraphs: [
          "Redimensionarea la o dimensiune exactă în KB este necesară atunci când o platformă sau un formular online impune o limită strictă de dimensiune a fișierului. Simpla comprimare nu garantează atingerea unei dimensiuni specifice, deoarece rezultatul depinde de conținutul imaginii.",
          "Instrumentul nostru rezolvă această problemă prin algoritmul de căutare binară: testează iterativ diferite niveluri de calitate JPEG, înjumătățind intervalul la fiecare pas, până când găsește calitatea optimă care produce fișierul cel mai mare posibil sub limita specificată.",
          "Această abordare asigură calitatea maximă posibilă în cadrul dimensiunii impuse – nu comprimi mai mult decât este necesar, păstrând astfel cea mai bună calitate vizuală compatibilă cu restricția de dimensiune.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Setează dimensiunea țintă cu puțin sub limita platformei (ex. 1900KB în loc de 2000KB) pentru a compensa variațiile minime." },
        { icon: "📊", tip: "Precizia de ±5% înseamnă că pentru o țintă de 200KB, rezultatul va fi între 190-210KB – suficient de precis pentru majoritatea cerințelor." },
        { icon: "📱", tip: "Ideal pentru trimiterea fotografiilor direct de pe telefon – nu mai trebuie să transferi imaginea pe computer pentru redimensionare." },
        { icon: "⚠️", tip: "Dacă dimensiunea țintă este foarte mică (sub 50KB), calitatea imaginii poate scădea vizibil – ia în considerare și redimensionarea dimensiunilor în pixeli." },
      ],
    },
  },

  "gif-keszito": {
    introText: "Creează GIF-uri animate din imagini JPG, PNG sau WebP, direct în browserul tău, fără încărcare pe server. Setează viteza animației, ordinea cadrelor și numărul de repetări. Ideal pentru meme-uri, prezentări de produse și conținut de rețele sociale.",
    guide: [
      "1. Trage sau selectează imaginile care vor deveni cadrele animației GIF (JPG, PNG sau WebP).",
      "2. Aranjează ordinea cadrelor prin glisare și setează durata fiecărui cadru (frame delay).",
      "3. Configurează opțiunile animației: buclă infinită sau număr specific de repetări, dimensiune de ieșire.",
      "4. Generează GIF-ul animat și descarcă rezultatul.",
    ],
    faq: [
      { q: "Câte cadre (imagini) pot adăuga într-un GIF?", a: "Poți adăuga până la 100 de imagini ca cadre de animație. Pentru GIF-uri mai lungi, ia în considerare conversia într-un fișier video." },
      { q: "Este sigură crearea GIF-ului online?", a: "Da, întreaga procesare are loc în browserul tău. Imaginile nu părăsesc computerul și nu sunt trimise pe vreun server." },
      { q: "Ce viteză de animație ar trebui să setez?", a: "Delay de 100ms per cadru = ~10fps (natural). Delay de 50ms = ~20fps (rapid, fluid). Delay de 200-500ms = slideshow lent. Experimentează cu diferite viteze." },
      { q: "Pot schimba ordinea cadrelor după încărcare?", a: "Da, poți rearanja ordinea cadrelor prin glisare (drag & drop) în lista de previzualizare înainte de generarea GIF-ului." },
      { q: "Ce dimensiune va avea GIF-ul rezultat?", a: "Dimensiunea fișierului GIF depinde de numărul de cadre, dimensiunea imaginilor și complexitatea conținutului. GIF-urile cu multe culori și detalii sunt mai mari." },
      { q: "Funcționează creatorul de GIF pe mobil?", a: "Da, instrumentul funcționează în orice browser modern, inclusiv pe dispozitive mobile. Poți crea GIF-uri direct din fotografiile de pe telefon." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginilor", description: "Trage imaginile în zona de încărcare sau apasă butonul de selectare. Ordinea încărcării determină ordinea inițială a cadrelor de animație. Sunt acceptate JPG, PNG și WebP." },
        { title: "2. Aranjare cadre și setare timing", description: "Rearanjează ordinea cadrelor prin glisare. Setează delay-ul per cadru (100ms = ~10fps, 50ms = ~20fps) și alege între buclă infinită sau număr limitat de repetări." },
        { title: "3. Configurare dimensiune de ieșire", description: "Alege dimensiunea de ieșire a GIF-ului. Dimensiuni mai mici produc fișiere mai mici și încărcare mai rapidă, dar cu mai puține detalii." },
        { title: "4. Generare și descărcare GIF", description: "Apasă butonul de generare. Biblioteca gifenc cuantizează culorile și codifică cadrele. Descarcă GIF-ul animat rezultat." },
      ],
      useCases: [
        { icon: "😂", title: "GIF-uri de reacție și meme-uri", description: "Creează GIF-uri personalizate de reacție pentru Discord, Slack, WhatsApp și alte platforme de mesagerie." },
        { icon: "🛍️", title: "Prezentare produse din mai multe unghiuri", description: "Combină fotografii ale unui produs din diferite unghiuri într-o animație GIF pentru magazine online și listări de produse." },
        { icon: "📊", title: "Prezentări și tutoriale", description: "Creează secvențe animate pas-cu-pas pentru tutoriale, prezentări și materiale educaționale." },
        { icon: "📱", title: "Conținut pentru rețele sociale", description: "Generează GIF-uri atractive pentru postări pe rețele sociale – conținutul animat atrage mai multă atenție decât imaginile statice." },
      ],
      aboutSection: {
        title: "Despre crearea GIF-urilor animate",
        paragraphs: [
          "GIF (Graphics Interchange Format) este cel mai vechi și mai răspândit format de imagine animată pe internet, introdus în 1987. Deși tehnologic limitat la 256 de culori per cadru, rămâne standardul universal pentru animații scurte datorită compatibilității sale universale.",
          "Formatul GIF funcționează prin stocarea mai multor cadre (frames) într-un singur fișier, fiecare cu o durată de afișare specificată. Cadrele sunt afișate secvențial, creând iluzia de mișcare. Animația poate fi setată să se repete la infinit sau un număr specific de ori.",
          "Instrumentul nostru folosește biblioteca gifenc pentru cuantizarea culorilor (reducerea la paleta de 256 culori) și codificarea eficientă a cadrelor, direct în browser prin WebAssembly.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește imagini cu dimensiuni identice pentru cele mai bune rezultate – diferențele de dimensiune pot produce artefacte vizuale." },
        { icon: "📏", tip: "Redimensionează imaginile sursă la 400-600px lățime înainte de creare – GIF-urile mari produc fișiere foarte mari." },
        { icon: "🎨", tip: "GIF-urile funcționează cel mai bine cu grafice simple și culori puține. Fotografiile cu multe detalii pot pierde calitate din cauza limitei de 256 culori." },
        { icon: "⚡", tip: "Pentru animații mai fluide, folosește delay de 50ms (20fps). Pentru slideshow-uri, 500-1000ms per cadru este mai potrivit." },
      ],
    },
  },

  "gif-webp-animalt": {
    introText: "Convertește GIF-urile animate în format WebP animat pentru o reducere de dimensiune de până la 80%, menținând calitatea vizuală. WebP animat este alternativa modernă la GIF, acceptată de toate browserele majore. Conversia se realizează direct în browserul tău.",
    guide: [
      "1. Trage sau selectează fișierul GIF animat pe care dorești să-l convertești în WebP animat.",
      "2. Setează calitatea de compresie WebP (recomandat 80%) pentru echilibrul optim între calitate și dimensiune.",
      "3. Instrumentul procesează toate cadrele animației, păstrând timing-ul și bucla originale.",
      "4. Descarcă fișierul WebP animat rezultat, gata de utilizat pe site-ul tău.",
    ],
    faq: [
      { q: "Toate browserele redau WebP animat?", a: "Da, din 2024 toate browserele majore acceptă pe deplin WebP animat: Chrome, Firefox, Safari 14+, Edge. Acoperirea globală depășește 95%." },
      { q: "Cât de mult se reduce dimensiunea la conversia GIF în WebP animat?", a: "Reducerea tipică este de 40-80% față de GIF-ul original. Animațiile cu multe culori beneficiază cel mai mult, deoarece WebP acceptă paleta completă de 16 milioane de culori." },
      { q: "Este sigură conversia GIF în WebP animat online?", a: "Da, întreaga procesare are loc în browserul tău. Fișierul GIF nu părăsește computerul și nu este trimis pe vreun server." },
      { q: "Se păstrează animația originală?", a: "Da, timing-ul cadrelor, numărul de repetări (buclă) și toate proprietățile animației sunt păstrate în fișierul WebP animat rezultat." },
      { q: "WebP animat acceptă transparență?", a: "Da, spre deosebire de GIF care acceptă doar transparență binară (pixel complet transparent sau opac), WebP animat acceptă canal alfa complet cu 256 niveluri de transparență." },
      { q: "Pot folosi WebP animat în HTML?", a: "Da, WebP animat funcționează ca orice imagine în HTML: <img src='animatie.webp'>. Nu necesită JavaScript sau plugin-uri speciale." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea fișierului GIF", description: "Trage fișierul GIF animat în zona de încărcare sau apasă butonul de selectare. Instrumentul detectează automat animația și numărul de cadre." },
        { title: "2. Setarea calității WebP", description: "Ajustează calitatea de compresie cu ajutorul cursorului. Valoarea recomandată de 80% oferă un echilibru excelent. Calitate mai mică = fișier mai mic." },
        { title: "3. Procesare animație", description: "Instrumentul convertește fiecare cadru al animației GIF în format WebP, păstrând timing-ul original, ordinea cadrelor și setarea de repetare." },
        { title: "4. Descărcare WebP animat", description: "Descarcă fișierul WebP animat rezultat. Compară dimensiunea cu GIF-ul original pentru a vedea economia realizată." },
      ],
      useCases: [
        { icon: "⚡", title: "Optimizare viteză site web", description: "Înlocuiește GIF-urile de pe site cu WebP animat pentru încărcare de 2-5 ori mai rapidă. Impact semnificativ asupra Core Web Vitals și scorului PageSpeed." },
        { icon: "📱", title: "Economie trafic mobil", description: "Fișiere WebP animate cu 40-80% mai mici înseamnă consum redus de date mobile și încărcare mai rapidă pentru utilizatorii pe 4G/5G." },
        { icon: "🛒", title: "Animații produse în magazine online", description: "Convertește prezentările animate de produse din GIF în WebP animat pentru o experiență de cumpărare mai rapidă și fluidă." },
        { icon: "💬", title: "Chat și mesagerie web", description: "Optimizează sticker-urile animate și emoji-urile GIF pentru aplicații de chat web, reducând lățimea de bandă pentru toți utilizatorii." },
      ],
      aboutSection: {
        title: "Despre conversia GIF în WebP animat",
        paragraphs: [
          "GIF animat, deși universal acceptat, utilizează tehnologie de compresie din 1987 cu limitări semnificative: paletă de maximum 256 de culori per cadru, transparență doar binară (fără semi-transparență) și dimensiuni mari ale fișierelor.",
          "WebP animat, dezvoltat de Google, rezolvă toate aceste limitări: acceptă 16 milioane de culori, canal alfa complet cu 256 niveluri de transparență și compresie modernă care produce fișiere cu 40-80% mai mici la aceeași calitate vizuală.",
          "Conversia GIF în WebP animat este una dintre cele mai eficiente optimizări pentru viteza site-urilor web. Pentru compatibilitate maximă, poți folosi tag-ul HTML <picture> cu WebP animat ca sursă principală și GIF ca fallback.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Calitatea de 80% oferă cel mai bun echilibru – reduce dimensiunea cu 50-70% față de GIF, cu diferență vizuală aproape imperceptibilă." },
        { icon: "📊", tip: "GIF-urile cu fotografii sau gradienți beneficiază cel mai mult de conversie, deoarece WebP nu are limita de 256 culori." },
        { icon: "🌐", tip: "Folosește <picture> cu WebP animat ca sursă primară și GIF ca fallback: <picture><source srcset='anim.webp' type='image/webp'><img src='anim.gif'></picture>" },
        { icon: "⚡", tip: "Pe site-uri cu multe animații, conversia GIF → WebP animat poate reduce cu 50%+ dimensiunea totală a paginii." },
      ],
      formatComparison: {
        title: "Comparație GIF animat vs WebP animat",
        columns: ["Proprietate", "GIF animat", "WebP animat"],
        rows: [
          { feature: "Culori per cadru", values: ["Maximum 256", "16 milioane (24 biți)"] },
          { feature: "Transparență", values: ["Binară (da/nu)", "Canal alfa complet (256 niveluri)"] },
          { feature: "Dimensiune fișier", values: ["Mare", "Cu 40-80% mai mică"] },
          { feature: "Calitate vizuală", values: ["Limitată de paleta de culori", "Excelentă"] },
          { feature: "Compatibilitate", values: ["Universală", "Toate browserele moderne (95%+)"] },
        ],
      },
    },
  },

  "svg-png": {
    introText: "Convertește fișierele SVG vectoriale în imagini PNG sau JPG rasterizate la rezoluția dorită, direct în browser. Ideal atunci când ai nevoie de imagini bitmap din grafice vectoriale pentru email, documente, rețele sociale sau platforme care nu acceptă SVG.",
    guide: [
      "1. Trage sau selectează fișierul SVG pe care dorești să-l convertești în PNG sau JPG.",
      "2. Alege formatul de ieșire (PNG pentru transparență sau JPG pentru dimensiune mai mică) și specifică lățimea dorită în pixeli.",
      "3. Previzualizează rezultatul rasterizat și verifică calitatea la dimensiunea aleasă.",
      "4. Descarcă imaginea rasterizată în formatul selectat.",
    ],
    faq: [
      { q: "Ce rezoluție ar trebui să setez la conversia SVG în PNG?", a: "Pentru afișare standard pe web: lățimea CSS dorită. Pentru ecrane Retina/HiDPI: 2x dimensiunea CSS (ex. pentru afișare la 200px, setează 400px). Pentru imprimare: calculează dimensiunea necesară la 300 DPI." },
      { q: "Este sigură conversia SVG în PNG online?", a: "Da, rasterizarea se realizează exclusiv în browserul tău folosind Canvas API. Fișierul SVG nu părăsește computerul și nu este trimis pe vreun server." },
      { q: "Care este diferența între conversia în PNG și JPG?", a: "PNG păstrează transparența (canal alfa) și oferă calitate fără pierderi – ideal pentru logo-uri și grafice. JPG produce fișiere mai mici dar nu acceptă transparență – potrivit pentru fotografii și imagini de fundal." },
      { q: "De ce nu pot folosi SVG direct peste tot?", a: "Multe platforme nu acceptă SVG: clienții de email, documente Word/PowerPoint, anumite CMS-uri și rețele sociale. Conversia în PNG/JPG asigură compatibilitate universală." },
      { q: "Se pierde calitatea la conversia SVG în PNG?", a: "Nu, dacă setezi o rezoluție suficient de mare. SVG este vectorial și poate fi rasterizat la orice dimensiune fără pierdere de calitate. Alege o lățime potrivită pentru scopul utilizării." },
      { q: "Funcționează cu orice fișier SVG?", a: "Da, instrumentul acceptă orice fișier SVG valid, inclusiv cele cu gradienți, filtre, text și animații. Elementele animate sunt capturate în starea lor inițială." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea fișierului SVG", description: "Trage fișierul SVG în zona de încărcare sau apasă butonul de selectare. Instrumentul citește și previzualizează automat graficul vectorial." },
        { title: "2. Alegerea formatului și dimensiunii", description: "Selectează formatul de ieșire (PNG pentru transparență sau JPG pentru dimensiune mai mică). Specifică lățimea dorită în pixeli – înălțimea se calculează automat păstrând proporțiile." },
        { title: "3. Previzualizare rezultat", description: "Verifică imaginea rasterizată în previzualizare. Pentru ecrane Retina, folosește 2x dimensiunea de afișare CSS pentru claritate maximă." },
        { title: "4. Descărcare imagine rasterizată", description: "Descarcă imaginea PNG sau JPG rasterizată, gata de utilizat în email, documente, prezentări sau pe rețele sociale." },
      ],
      useCases: [
        { icon: "📧", title: "Email-uri și newsletter-uri", description: "Majoritatea clienților de email (Gmail, Outlook, Yahoo) blochează sau nu afișează corect fișierele SVG. Convertește logo-urile și graficele în PNG pentru email-uri impecabile." },
        { icon: "📄", title: "Documente Word, PowerPoint și PDF", description: "Inserează logo-uri și grafice vectoriale în documente Office și PDF-uri prin convertirea lor în PNG la rezoluția dorită." },
        { icon: "📱", title: "Rețele sociale și platforme online", description: "Facebook, Instagram și alte platforme nu acceptă SVG. Convertește graficele în PNG sau JPG pentru postări și avatare." },
        { icon: "🖨️", title: "Materiale tipărite", description: "Convertește grafice SVG în PNG la rezoluție înaltă (300 DPI) pentru utilizare în broșuri, cărți de vizită și alte materiale tipărite." },
      ],
      aboutSection: {
        title: "Despre conversia SVG în imagini rasterizate",
        paragraphs: [
          "SVG (Scalable Vector Graphics) este un format vectorial bazat pe XML care descrie graficele prin forme matematice (linii, curbe, poligoane). Avantajul principal al SVG este scalabilitatea perfectă – imaginea rămâne clară la orice dimensiune, de la iconiță de 16px la banner de 4000px.",
          "Cu toate acestea, nu toate platformele și aplicațiile acceptă SVG. Rasterizarea (conversia în pixeli) transformă graficul vectorial într-o imagine bitmap (PNG sau JPG) la o rezoluție specificată. Browserul realizează acest proces folosind Canvas API, randând SVG-ul la dimensiunea dorită și exportând pixelii rezultați.",
          "La alegerea rezoluției, ia în considerare scopul utilizării: pentru web standard, lățimea de afișare CSS este suficientă. Pentru ecrane Retina (2x) sau imprimare (300 DPI), mărește rezoluția corespunzător pentru claritate maximă.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru ecrane Retina/HiDPI, setează lățimea la 2x dimensiunea de afișare CSS (ex. 400px pentru afișare la 200px)." },
        { icon: "🎨", tip: "Alege PNG dacă SVG-ul are fundal transparent – JPG va umple transparența cu alb." },
        { icon: "🖨️", tip: "Pentru imprimare la 300 DPI, calculează: lățime în cm × 118 = lățime în pixeli (ex. 10cm = 1180px)." },
        { icon: "📏", tip: "SVG-urile pot fi rasterizate la orice dimensiune fără pierdere – nu te limita la dimensiunea originală de afișare." },
      ],
      formatComparison: {
        title: "Comparație SVG vs PNG",
        columns: ["Proprietate", "SVG", "PNG"],
        rows: [
          { feature: "Tip", values: ["Vectorial (forme matematice)", "Raster (pixeli)"] },
          { feature: "Scalabilitate", values: ["Perfectă la orice dimensiune", "Pierdere de calitate la mărire"] },
          { feature: "Transparență", values: ["Acceptă", "Acceptă"] },
          { feature: "Compatibilitate", values: ["Limitată (web, editoare)", "Universală"] },
          { feature: "Editare ulterioară", values: ["Ca grafic vectorial", "Ca imagine bitmap"] },
        ],
      },
    },
  },

  "kep-collage": {
    introText: "Combină mai multe imagini într-o singură compoziție vizuală – orizontal, vertical sau în grilă. Ideal pentru prezentări de produse, colaje foto pentru rețele sociale și comparații vizuale. Crearea colajului se realizează direct în browserul tău, fără încărcare pe server.",
    guide: [
      "1. Trage sau selectează imaginile pe care dorești să le combini (minim 2, maxim 20 imagini).",
      "2. Alege aspectul dorit: orizontal (alăturare pe linie), vertical (stivuire) sau grilă (matrice).",
      "3. Configurează spațierea dintre imagini și culoarea de fundal a spațiilor.",
      "4. Descarcă colajul generat în format PNG.",
    ],
    faq: [
      { q: "Se pot combina imagini de dimensiuni diferite?", a: "Da, instrumentul ajustează automat dimensiunile imaginilor pentru a se potrivi aspectului ales. Imaginile sunt redimensionate proporțional pentru un rezultat armonios." },
      { q: "Este sigură crearea colajului online?", a: "Da, întreaga procesare are loc în browserul tău. Imaginile nu părăsesc computerul și nu sunt trimise pe vreun server extern." },
      { q: "Câte imagini pot adăuga într-un colaj?", a: "Poți combina între 2 și 20 de imagini într-un singur colaj. Pentru grilă, instrumentul calculează automat aranjamentul optim." },
      { q: "Pot schimba ordinea imaginilor în colaj?", a: "Da, poți rearanja ordinea imaginilor prin glisare (drag & drop) în lista de previzualizare înainte de generarea colajului." },
      { q: "Ce formate de imagine acceptă?", a: "Poți încărca imagini în format JPG, PNG și WebP. Rezultatul este un fișier PNG de înaltă calitate." },
      { q: "Funcționează creatorul de colaje pe mobil?", a: "Da, instrumentul funcționează în orice browser modern, inclusiv pe dispozitive mobile. Ideal pentru crearea rapidă de colaje din fotografiile de pe telefon." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginilor", description: "Trage imaginile în zona de încărcare sau apasă butonul de selectare. Poți adăuga între 2 și 20 de imagini în format JPG, PNG sau WebP." },
        { title: "2. Alegerea aspectului", description: "Selectează aspectul dorit: orizontal (imagini aliniate pe o linie), vertical (imagini stivuite una sub alta) sau grilă (matrice cu rânduri și coloane)." },
        { title: "3. Configurare spațiere și fundal", description: "Setează spațierea (gap) dintre imagini în pixeli și alege culoarea de fundal pentru spațiile dintre imagini. Poți rearanja ordinea prin glisare." },
        { title: "4. Generare și descărcare colaj", description: "Instrumentul combină imaginile pe un OffscreenCanvas și generează colajul în format PNG. Descarcă rezultatul final." },
      ],
      useCases: [
        { icon: "🛒", title: "Prezentare produse e-commerce", description: "Combină fotografii ale unui produs din mai multe unghiuri într-o singură imagine de prezentare pentru magazine online și listări de produse." },
        { icon: "📱", title: "Colaje pentru rețele sociale", description: "Creează colaje atractive pentru postări pe Instagram, Facebook și Pinterest – combină momente dintr-un eveniment sau călătorie." },
        { icon: "📊", title: "Comparații vizuale înainte/după", description: "Combină imagini alăturate pentru comparații vizuale – renovări, transformări, rezultate design sau editări foto." },
        { icon: "🎨", title: "Portofolii și mood boards", description: "Creează planse de prezentare (mood boards) și pagini de portofoliu combinând mai multe lucrări într-o singură imagine." },
      ],
      aboutSection: {
        title: "Despre crearea colajelor foto în browser",
        paragraphs: [
          "Colajul foto este o compoziție vizuală care combină mai multe imagini într-o singură imagine. Este un instrument versatil folosit în design, marketing, rețele sociale și prezentări – de la simple combinări de fotografii până la compoziții creative complexe.",
          "Instrumentul nostru utilizează Canvas API (OffscreenCanvas) pentru a combina imaginile direct în browser. Imaginile sunt redimensionate automat pentru a se potrivi aspectului ales, cu păstrarea proporțiilor originale. Rezultatul este un fișier PNG de înaltă calitate.",
          "Cele trei moduri de aranjare acoperă majoritatea nevoilor: orizontal (ideal pentru comparații și panorame), vertical (pentru stories și listări), și grilă (pentru colaje foto și prezentări de produse).",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folosește imagini cu proporții similare pentru un colaj echilibrat – diferențele mari de dimensiune pot produce rezultate nearmonioase." },
        { icon: "📏", tip: "Spațierea de 5-10px între imagini oferă un aspect curat și profesional. Spațiere de 0px creează o îmbinare fără cusătură." },
        { icon: "🎨", tip: "Alege o culoare de fundal albă sau gri deschis pentru spații – se potrivește cu majoritatea imaginilor și oferă un aspect curat." },
        { icon: "📱", tip: "Pentru postări Instagram, aspectul grilă 3x1 sau 2x2 funcționează cel mai bine în feed." },
      ],
    },
  },

  "szin-paletta": {
    introText: "Extrage automat culorile dominante dintr-o imagine și generează o paletă de culori profesională cu coduri HEX, RGB și HSL. Ideal pentru designeri, dezvoltatori web și creatori de conținut care doresc să creeze scheme de culori armonioase din imagini existente.",
    guide: [
      "1. Trage sau selectează imaginea din care dorești să extragi culorile dominante.",
      "2. Setează numărul de culori dorite în paletă (între 3 și 10 culori).",
      "3. Instrumentul analizează automat imaginea și generează paleta de culori dominante.",
      "4. Copiază codurile de culoare (HEX, RGB sau HSL) cu un singur clic pentru utilizare în proiectele tale.",
    ],
    faq: [
      { q: "Ce algoritm folosește instrumentul pentru extragerea culorilor?", a: "Instrumentul utilizează un algoritm median cut modificat: imaginea este randată pe OffscreenCanvas la dimensiune redusă, apoi datele pixelilor sunt analizate statistic pentru a determina grupurile de culori dominante." },
      { q: "Este sigură analiza imaginii online?", a: "Da, analiza are loc exclusiv în browserul tău. Imaginea nu părăsește computerul și nu este trimisă pe vreun server." },
      { q: "Câte culori pot extrage dintr-o imagine?", a: "Poți seta numărul de culori între 3 și 10. Pentru paleta de brand, 4-5 culori sunt de obicei suficiente. Pentru proiecte de design complexe, 8-10 culori oferă mai multă flexibilitate." },
      { q: "Ce formate de cod de culoare sunt disponibile?", a: "Fiecare culoare este disponibilă în trei formate: HEX (#FF5733), RGB (rgb(255, 87, 51)) și HSL (hsl(14, 100%, 60%)). Poți copia orice format cu un singur clic." },
      { q: "Ce formate de imagine acceptă instrumentul?", a: "Poți încărca imagini în format JPG, PNG, WebP și GIF. Toate formatele sunt analizate pe OffscreenCanvas." },
      { q: "Funcționează extragerea paletei de culori pe mobil?", a: "Da, instrumentul funcționează în orice browser modern, inclusiv pe dispozitive mobile. Poți extrage palete direct din fotografiile de pe telefon." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea în zona de încărcare sau apasă butonul de selectare. Sunt acceptate formatele JPG, PNG, WebP și GIF." },
        { title: "2. Setarea numărului de culori", description: "Alege câte culori dominante dorești în paletă (3-10). Un număr mai mic produce culori mai distinctive, un număr mai mare oferă nuanțe mai subtile." },
        { title: "3. Generare automată a paletei", description: "Algoritmul median cut analizează pixelii imaginii și identifică grupurile de culori dominante, generând paleta cu codurile HEX, RGB și HSL." },
        { title: "4. Copiere coduri de culoare", description: "Apasă pe orice cod de culoare (HEX, RGB sau HSL) pentru a-l copia în clipboard, gata de utilizat în CSS, Figma, Photoshop sau orice alt instrument de design." },
      ],
      useCases: [
        { icon: "🎨", title: "Design de brand și identitate vizuală", description: "Extrage paleta de culori din logo-ul sau materialele existente ale brandului pentru a crea o identitate vizuală coerentă pe toate canalele." },
        { icon: "🖥️", title: "Design UI/UX și web", description: "Generează teme de culori din imagini de referință sau fotografii de produs pentru a crea interfețe web armonioase și atractive vizual." },
        { icon: "📸", title: "Editare și post-procesare foto", description: "Analizează tonurile predominante ale fotografiilor pentru a aplica gradarea culorilor (color grading) sau pentru a crea filtre personalizate." },
        { icon: "🏠", title: "Design interior și modă", description: "Extrage palete de culori din fotografii de inspirație pentru proiecte de design interior, modă sau artă." },
      ],
      aboutSection: {
        title: "Despre extragerea paletei de culori din imagini",
        paragraphs: [
          "Extragerea paletei de culori este procesul de identificare a culorilor dominante dintr-o imagine. Algoritmul median cut funcționează prin împărțirea recursivă a spațiului de culori al imaginii în grupuri, selectând culorile cele mai reprezentative din fiecare grup.",
          "Procesul tehnic: imaginea este randată pe OffscreenCanvas la o dimensiune redusă (pentru performanță), apoi datele RGB ale fiecărui pixel sunt analizate. Algoritmul sortează pixelii pe axele de culoare și le împarte în grupuri (buckets), calculând culoarea medie a fiecărui grup.",
          "Rezultatul sunt culorile dominante exprimate în trei formate standard: HEX (pentru CSS și design web), RGB (pentru design digital) și HSL (pentru manipularea intuitivă a nuanței, saturației și luminozității).",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru o paletă de brand, extrage 4-5 culori și alege o culoare primară, una secundară și una de accent." },
        { icon: "🎨", tip: "Folosește codurile HEX direct în CSS: color: #FF5733; sau background-color: #2C3E50;." },
        { icon: "📸", tip: "Fotografii cu compoziții cromatice puternice produc palete mai interesante decât imagini cu culori neutre." },
        { icon: "🖥️", tip: "Verifică contrastul culorilor extrase pentru accesibilitate web (WCAG) – culorile dintr-o paletă nu sunt neapărat suficient de contrastante între ele." },
      ],
    },
  },

  "automatikus-vagas": {
    introText: "Elimină automat marginile albe sau unicolore de pe imagini prin analiza la nivel de pixel. Algoritmul detectează limitele conținutului real și decupează marginile inutile. Ideal pentru documente scanate, fotografii de produse și curățarea imaginilor. Procesarea se realizează în browser.",
    guide: [
      "1. Trage sau selectează imaginea de la care dorești să elimini marginile inutile (JPG, PNG sau WebP).",
      "2. Setează culoarea de fundal de detectat (alb implicit) și toleranța de culoare (0-80).",
      "3. Instrumentul analizează pixelii de la margini și găsește automat dreptunghiul minim de încadrare a conținutului.",
      "4. Descarcă imaginea decupată automat în format PNG.",
    ],
    faq: [
      { q: "Funcționează decuparea automată și pe fundal non-alb?", a: "Da, cu selectorul de culoare poți seta orice culoare de fundal pentru detectare – negru, gri, orice nuanță. Algoritmul compară pixelii marginali cu culoarea specificată." },
      { q: "Ce este setarea de toleranță și cum o ajustez?", a: "Toleranța (0-80) determină cât de apropiați pot fi pixelii de culoarea de fundal pentru a fi considerați parte din margine. Toleranță 0 = potrivire exactă. Toleranță 20-30 = acceptă variații ușoare (umbre, zgomot). Toleranță mai mare = decupare mai agresivă." },
      { q: "Este sigură procesarea imaginii?", a: "Da, analiza și decuparea au loc exclusiv în browserul tău. Imaginea nu părăsește computerul și nu este trimisă pe vreun server." },
      { q: "Ce se întâmplă dacă imaginea nu are margini unicolore?", a: "Dacă marginile conțin conținut variat, algoritmul va decupa minim sau deloc. Rezultatul depinde de cât de uniform este fundalul marginal." },
      { q: "În ce format primesc imaginea decupată?", a: "Imaginea decupată este exportată în format PNG, păstrând calitatea originală și, dacă există, transparența." },
      { q: "Funcționează pe mobil?", a: "Da, instrumentul funcționează în orice browser modern, inclusiv pe dispozitive mobile, ceea ce este util pentru curățarea rapidă a fotografiilor scanate cu telefonul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea imaginii", description: "Trage imaginea în zona de încărcare sau apasă butonul de selectare. Sunt acceptate formatele JPG, PNG și WebP. Instrumentul afișează dimensiunile originale." },
        { title: "2. Configurarea culorii de fundal și toleranței", description: "Selectează culoarea de fundal pe care algoritmul trebuie să o detecteze (alb implicit). Ajustează toleranța (0-80) – valori mai mari acceptă variații mai mari de culoare." },
        { title: "3. Detectare automată a limitelor conținutului", description: "Algoritmul scanează pixelii de la toate cele patru margini ale imaginii, găsind dreptunghiul minim care încadrează tot conținutul non-fundal." },
        { title: "4. Descărcare imagine decupată", description: "Descarcă imaginea decupată automat în format PNG. Compară dimensiunile cu originalul pentru a vedea marginile eliminate." },
      ],
      useCases: [
        { icon: "📷", title: "Documente și facturi scanate", description: "Eliminează automat marginile albe ale documentelor, facturilor și chitanțelor scanate pentru un aspect mai curat și dimensiuni mai mici ale fișierului." },
        { icon: "🛒", title: "Fotografii de produse pentru e-commerce", description: "Uniformizează imaginile de produse eliminând marginile inconsistente – toate fotografiile de produs vor avea aceleași proporții." },
        { icon: "🎨", title: "Curățare grafice și logo-uri", description: "Elimină spațiul alb în exces din jurul logo-urilor, graficelor și elementelor de design exportate din instrumente de design." },
        { icon: "📱", title: "Capturi de ecran și screenshoturi", description: "Decupează automat marginile inutile din capturi de ecran pentru prezentări, documentație și tutoriale mai curate." },
      ],
      aboutSection: {
        title: "Despre decuparea automată a marginilor",
        paragraphs: [
          "Decuparea automată (auto-crop sau auto-trim) este procesul de eliminare a marginilor unicolore dintr-o imagine prin detectarea automată a limitelor conținutului real. Algoritmul scanează pixelii de la toate cele patru margini și găsește dreptunghiul minim de încadrare (bounding box).",
          "Procesul tehnic: imaginea este citită pe Canvas, apoi algoritmul parcurge pixelii de la fiecare margine (sus, jos, stânga, dreapta), comparând valoarea fiecărui pixel cu culoarea de fundal specificată. Toleranța determină cât de mare poate fi diferența de culoare pentru ca un pixel să fie considerat încă parte din fundal.",
          "Această funcție este deosebit de utilă pentru procesarea în masă a imaginilor – documente scanate cu margini inconsistente, fotografii de produs cu fundal alb de dimensiuni variate și grafice exportate cu spațiu în exces.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Pentru documente scanate, toleranța de 15-25 funcționează cel mai bine – acceptă ușoarele variații de alb ale hârtiei." },
        { icon: "🎨", tip: "Pentru fundal negru sau colorat, schimbă culoarea de fundal din selector – nu te limita la detectarea albului." },
        { icon: "⚠️", tip: "Toleranță prea mare poate elimina și conținut de la marginile imaginii – începe cu valori mici și crește gradual." },
        { icon: "📏", tip: "Verifică previzualizarea înainte de descărcare pentru a te asigura că nu s-a decupat conținut important de la margini." },
      ],
    },
  },

  "exif-terkep": {
    introText: "Extrage coordonatele GPS din metadatele EXIF ale fotografiilor și afișează locația pe o hartă interactivă OpenStreetMap. Descoperă exact unde au fost realizate fotografiile tale – direct în browserul tău, fără a trimite date pe vreun server. Ideal pentru organizarea albumelor foto și verificarea confidențialității.",
    guide: [
      "1. Trage sau selectează fotografia JPEG din care dorești să extragi locația GPS.",
      "2. Instrumentul citește automat metadatele EXIF și extrage coordonatele GPS (latitudine și longitudine).",
      "3. Locația este afișată pe o hartă interactivă OpenStreetMap cu un marker precis.",
      "4. Poți naviga pe hartă, mări/micșora și vizualiza detalii despre locație.",
    ],
    faq: [
      { q: "Toate fotografiile conțin date de localizare GPS?", a: "Nu, doar fotografiile realizate cu serviciile de localizare activate. Majoritatea smartphone-urilor înregistrează implicit coordonatele GPS, dar această funcție poate fi dezactivată. Unele rețele sociale și aplicații de mesagerie șterg datele GPS la partajare." },
      { q: "Este sigură analiza locației din fotografii online?", a: "Da, absolut. Citirea metadatelor EXIF și afișarea pe hartă au loc exclusiv în browserul tău. Fotografia nu părăsește computerul și nu este trimisă pe vreun server." },
      { q: "Ce se întâmplă dacă fotografia nu conține date GPS?", a: "Instrumentul va afișa un mesaj indicând că nu au fost găsite coordonate GPS în metadatele EXIF. Aceasta poate însemna că localizarea era dezactivată la fotografiere sau că datele GPS au fost șterse ulterior." },
      { q: "Cât de precise sunt coordonatele GPS din fotografii?", a: "Precizia depinde de dispozitivul cu care a fost realizată fotografia. Smartphone-urile moderne oferă de obicei precizie de 3-10 metri în aer liber. În interioare, precizia poate fi mai scăzută." },
      { q: "Ce formate de imagine acceptă instrumentul?", a: "Instrumentul acceptă în principal fișiere JPEG/JPG, care sunt formatul standard pentru stocarea datelor EXIF. Fotografiile PNG și WebP pot conține și ele metadate, dar formatul JPEG este cel mai comun." },
      { q: "Pot verifica mai multe fotografii simultan?", a: "Poți încărca fotografii una câte una pentru a verifica locația GPS a fiecăreia. Este ideal pentru verificarea confidențialității înainte de partajarea online." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea fotografiei", description: "Trage fotografia JPEG în zona de încărcare sau apasă butonul de selectare. Fotografiile realizate cu smartphone-ul sau camera digitală conțin de obicei date GPS în metadatele EXIF." },
        { title: "2. Extragerea coordonatelor GPS", description: "Biblioteca exifr citește headerul EXIF al fișierului JPEG și extrage coordonatele GPS (latitudine și longitudine) împreună cu alte metadate disponibile (dată, cameră, altitudine)." },
        { title: "3. Afișare pe hartă interactivă", description: "Coordonatele GPS sunt afișate ca marker pe o hartă interactivă OpenStreetMap. Poți naviga, mări/micșora și explora zona din jurul locației fotografierii." },
        { title: "4. Vizualizare detalii locație", description: "Pe lângă hartă, instrumentul afișează coordonatele exacte (latitudine/longitudine), adresa aproximativă și alte metadate GPS disponibile (altitudine, direcție)." },
      ],
      useCases: [
        { icon: "📍", title: "Identificarea locației fotografiilor vechi", description: "Redescoperă unde ai făcut fotografii din vacanțe, excursii sau evenimente – coordonatele GPS te duc exact la locul fotografierii." },
        { icon: "🔒", title: "Verificare confidențialitate înainte de partajare", description: "Verifică dacă fotografiile pe care dorești să le partajezi online conțin coordonate GPS care dezvăluie adresa de acasă, locul de muncă sau alte locații sensibile." },
        { icon: "🗺️", title: "Organizarea albumelor foto pe hartă", description: "Vizualizează pe hartă locațiile fotografiilor pentru a organiza albumele pe bază de locație – ideal pentru amintiri din călătorii." },
        { icon: "📷", title: "Documentare foto profesională", description: "Fotojurnaliștii și fotografii profesioniști pot verifica și documenta locația exactă a fotografiilor pentru metadatele editoriale." },
      ],
      aboutSection: {
        title: "Despre datele GPS din metadatele EXIF",
        paragraphs: [
          "Metadatele EXIF (Exchangeable Image File Format) sunt informații tehnice înregistrate automat de camerele digitale și smartphone-uri în headerul fișierelor JPEG. Printre aceste date se numără și coordonatele GPS – latitudine, longitudine și, uneori, altitudine – care indică locația exactă unde a fost realizată fotografia.",
          "Majoritatea smartphone-urilor moderne înregistrează implicit coordonatele GPS în fiecare fotografie, cu precizie de 3-10 metri. Aceasta este o funcție utilă pentru organizarea albumelor foto, dar poate reprezenta un risc pentru confidențialitate dacă fotografiile sunt partajate online fără ștergerea prealabilă a metadatelor.",
          "Instrumentul nostru utilizează biblioteca exifr pentru citirea rapidă și precisă a metadatelor EXIF direct în browser, iar coordonatele GPS sunt afișate pe hartă interactivă OpenStreetMap. Întregul proces este privat – nicio dată nu părăsește computerul tău.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Verifică mereu coordonatele GPS ale fotografiilor realizate acasă sau la locul de muncă înainte de a le partaja online." },
        { icon: "🔒", tip: "Dacă găsești date GPS sensibile, folosește instrumentul de ștergere metadate pentru a le elimina înainte de partajare." },
        { icon: "📱", tip: "Pe smartphone, poți dezactiva înregistrarea GPS din setările camerei, dar vei pierde funcția de organizare pe bază de locație." },
        { icon: "🗺️", tip: "Folosește harta interactivă pentru a explora zona din jurul locației – mărește pentru detalii sau micșorează pentru context." },
      ],
    },
  },

  "sprite-vagas": {
    introText: "Taie automat sprite sheet-urile în imagini individuale și le exportă într-o arhivă ZIP organizată. Setează dimensiunea celulei în pixeli, iar instrumentul calculează grila și extrage fiecare sprite separat. Ideal pentru dezvoltarea de jocuri, procesarea seturilor de icoane și extragerea cadrelor de animație.",
    guide: [
      "1. Trage sau selectează fișierul sprite sheet (PNG, JPG sau WebP) pe care dorești să-l tai.",
      "2. Specifică lățimea și înălțimea unei celule sprite în pixeli (de exemplu, 32x32, 64x64, 128x128).",
      "3. Instrumentul calculează automat grila și afișează previzualizarea tuturor sprite-urilor individuale.",
      "4. Descarcă arhiva ZIP cu toate sprite-urile exportate, denumite sistematic (sprite-00-00.png, sprite-00-01.png etc.).",
    ],
    faq: [
      { q: "Cu ce nume sunt exportate sprite-urile individuale?", a: "Sprite-urile sunt denumite sistematic pe baza poziției în grilă: sprite-00-00.png (rând 0, coloană 0), sprite-00-01.png (rând 0, coloană 1), sprite-01-00.png (rând 1, coloană 0) etc." },
      { q: "Funcționează cu sprite sheet-uri asimetrice?", a: "Da, lățimea și înălțimea celulei pot fi setate separat. De exemplu, poți tăia celule de 64x32 pixeli sau orice altă combinație de dimensiuni." },
      { q: "Este sigură procesarea sprite sheet-ului online?", a: "Da, tăierea se realizează exclusiv în browserul tău. Fișierul sprite sheet nu părăsește computerul și nu este trimis pe vreun server." },
      { q: "Ce se întâmplă dacă dimensiunea imaginii nu se divide exact la dimensiunea celulei?", a: "Instrumentul taie câte celule complete încap în imagine. Pixelii rămași de la margini (care nu formează o celulă completă) sunt ignorați." },
      { q: "Ce formate de sprite sheet acceptă instrumentul?", a: "Sunt acceptate sprite sheet-uri în format PNG (recomandat pentru transparență), JPG și WebP. Sprite-urile individuale sunt exportate în format PNG." },
      { q: "Funcționează tăierea sprite sheet-urilor pe mobil?", a: "Da, instrumentul funcționează în orice browser modern, inclusiv pe dispozitive mobile, deși procesarea sprite sheet-urilor foarte mari este mai rapidă pe desktop." },
    ],
    content: {
      howToSteps: [
        { title: "1. Încărcarea sprite sheet-ului", description: "Trage fișierul sprite sheet în zona de încărcare sau apasă butonul de selectare. Sunt acceptate formatele PNG (recomandat), JPG și WebP." },
        { title: "2. Setarea dimensiunii celulei", description: "Specifică lățimea și înălțimea unei celule sprite în pixeli. Instrumentul calculează automat numărul de rânduri și coloane pe baza dimensiunii imaginii." },
        { title: "3. Previzualizare grilă și sprite-uri", description: "Verifică grila calculată și previzualizarea sprite-urilor individuale. Asigură-te că dimensiunea celulei se potrivește cu grila efectivă a sprite sheet-ului." },
        { title: "4. Descărcare arhivă ZIP", description: "Descarcă arhiva ZIP cu toate sprite-urile individuale exportate ca fișiere PNG separate, denumite sistematic pe baza poziției în grilă." },
      ],
      useCases: [
        { icon: "🎮", title: "Dezvoltare jocuri video", description: "Extrage cadrele de animație ale personajelor, sprite-urile de obiecte și elementele de nivel din sprite sheet-uri pentru motoare de joc precum Unity, Godot sau Phaser." },
        { icon: "🖥️", title: "Procesarea seturilor de icoane", description: "Extrage iconițe individuale din sprite sheet-uri de icoane pentru utilizare în interfețe web, aplicații mobile sau materiale de design." },
        { icon: "🎨", title: "Animație și motion design", description: "Separarea cadrelor de animație din sprite sheet-uri pentru editare individuală, reordonare sau conversie în alte formate de animație." },
        { icon: "📦", title: "Extragere resurse din jocuri", description: "Extrage și organizează resurse grafice din sprite sheet-uri existente pentru modding, documentare sau analiză de game art." },
      ],
      aboutSection: {
        title: "Despre tăierea sprite sheet-urilor",
        paragraphs: [
          "Un sprite sheet (sau texture atlas) este o singură imagine care conține mai multe grafice (sprite-uri) aranjate într-o grilă uniformă. Această tehnică este folosită pe scară largă în dezvoltarea de jocuri video și aplicații web pentru a reduce numărul de cereri HTTP și a optimiza randarea.",
          "Instrumentul nostru funcționează prin calcularea numărului de celule pe baza dimensiunii imaginii și a dimensiunii celulei specificate. Algoritmul parcurge grila rând cu rând, decupând fiecare celulă cu Canvas API și exportând-o ca fișier PNG individual.",
          "Fișierele exportate sunt denumite sistematic (sprite-rr-cc.png, unde rr = rândul și cc = coloana), ceea ce facilitează identificarea și utilizarea lor în proiecte de dezvoltare. Toate sprite-urile sunt ambalate într-o singură arhivă ZIP pentru descărcare convenabilă.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Verifică dimensiunile sprite sheet-ului și asigură-te că se divide exact la dimensiunea celulei – pixelii rămași vor fi ignorați." },
        { icon: "📏", tip: "Dimensiuni comune de sprite: 16x16, 32x32, 64x64, 128x128 pixeli. Pentru jocuri pixel art, 16x16 sau 32x32 sunt cele mai frecvente." },
        { icon: "🎮", tip: "Folosește format PNG ca sursă pentru a păstra transparența (canal alfa) – esențial pentru sprite-uri de jocuri cu fundal transparent." },
        { icon: "📂", tip: "Denumirea sistematică (sprite-00-00.png) facilitează importul automat în motoare de joc și instrumente de animație." },
      ],
    },
  },
};
