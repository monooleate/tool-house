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
    introText: "HEIC (High Efficiency Image Container) este formatul implicit pentru imaginile iPhone și iPad. Deși oferă compresie excelentă, multe aplicații Windows, site-uri web și instrumente de editare nu-l pot deschide. Acest instrument convertește fișierele HEIC în JPG universal compatibil, direct în browser.",
    guide: ["1. Trage sau selectează fișierele HEIC în instrument.", "2. Instrumentul convertește automat fișierele cu calitate JPG de 90%.", "3. Descarcă JPG-ul sau arhiva ZIP."],
    faq: [
      { q: "De ce nu se deschide imaginea HEIC pe Windows?", a: "Windows nu include implicit un decodor HEIC." },
      { q: "Se pierde calitatea imaginii?", a: "Convertim cu calitate JPG de 90%, diferență aproame imperceptibilă." },
    ],
    content: {
      howToSteps: [
        { title: "Selectare fișier", description: "Trage fișierul HEIC în instrument sau dă clic pentru a răsfoi." },
        { title: "Conversie automată", description: "Decodificarea HEIC/HEIF se face cu WebAssembly, direct în browser." },
        { title: "Descărcare", description: "Un singur fișier: descarcă ca JPG. Mai multe fișiere: arhivă ZIP." },
      ],
      useCases: [
        { icon: "📱", title: "Partajare fotografii iPhone", description: "Fotografiile copiate de pe iPhone vin în format HEIC." },
        { icon: "💼", title: "CV și aplicații", description: "Sistemele HR accept de obicei JPG, nu HEIC." },
      ],
      aboutSection: {
        title: "Despre formatul HEIC",
        paragraphs: ["HEIC este formatul de imagine adoptat de Apple, bazat pe codecul video HEVC. Principalul avantaj: la aceeași calitate, dimensiunea fișierului este aproximativ la jumătate față de JPEG."],
      },
      tips: [{ icon: "💡", tip: "Conversia HEIC → JPG păstrează metadatele EXIF, inclusiv coordonatele GPS." }],
    },
  },

  "heic-png": {
    introText: "Convertorul HEIC → PNG transformă imaginile iPhone și iPad în format PNG fără pierderi, păstrând canalul alfa.",
    guide: ["1. Încarcă fișierul HEIC.", "2. Instrumentul convertește în PNG.", "3. Descarcă rezultatul."],
    faq: [{ q: "Când să aleg PNG în loc de JPG?", a: "Când ai nevoie de calitate fără pierderi sau de transparență." }],
    content: {
      howToSteps: [
        { title: "Încărcare fișier", description: "Selectează fișierul HEIC." },
        { title: "Conversie PNG", description: "Ieșire PNG fără pierderi cu canal alfa." },
        { title: "Descărcare", description: "Descarcă fișierul PNG." },
      ],
      useCases: [
        { icon: "🎨", title: "Editare grafică", description: "Format PNG necesar pentru editare fără pierderi." },
        { icon: "🌐", title: "Utilizare web", description: "PNG este unul dintre cele mai răspândite formate web." },
      ],
      aboutSection: { title: "Conversie HEIC → PNG", paragraphs: ["PNG aplică compresie fără pierderi, ideal pentru logo-uri și icoane."] },
    },
  },

  "jpg-avif": {
    introText: "AVIF (AV1 Image File Format) este cel mai modern format de imagine, suportat de toate browserele majore din 2025. Din imagini JPG poți genera AVIF cu până la 50% mai puțin spațiu.",
    guide: ["1. Încarcă fișierul JPG.", "2. Setează calitatea (1-63 CQ).", "3. Convertește și descarcă AVIF."],
    faq: [
      { q: "AVIF funcționează în toate browserele?", a: "Da, din 2025 Chrome, Firefox, Safari 16+, Edge toate suportă AVIF." },
      { q: "Cât spațiu se economisește?", a: "De obicei 40-50% față de JPEG la aceeași calitate." },
    ],
    content: {
      howToSteps: [
        { title: "Încărcare JPG", description: "Trage fișierele JPG – procesare în lot posibilă." },
        { title: "Setare calitate", description: "Valoarea CQ 30-40 este recomandată pentru web." },
        { title: "Descărcare AVIF", description: "Descarcă fișierul AVIF pentru utilizare pe site." },
      ],
      useCases: [
        { icon: "⚡", title: "Optimizare site", description: "AVIF este cea mai eficientă metodă de reducere a dimensiunii imaginilor." },
        { icon: "🛒", title: "Imagini produse e-commerce", description: "Reducere drastică a timpului de încărcare." },
      ],
      aboutSection: {
        title: "Despre formatul AVIF",
        paragraphs: ["AVIF se bazează pe codecul video AV1, este royalty-free și oferă cu 20-25% compresie mai bună decât WebP."],
      },
    },
  },

  "png-avif": {
    introText: "Convertește imagini PNG în format AVIF în browser, cu păstrarea completă a canalului alfa.",
    guide: ["1. Încarcă fișierul PNG.", "2. Alege modul: lossy sau lossless.", "3. Descarcă AVIF."],
    faq: [{ q: "AVIF păstrează transparența?", a: "Da, AVIF suportă complet canalul alfa." }],
    content: {
      howToSteps: [
        { title: "Încărcare PNG", description: "Selectează fișierul PNG." },
        { title: "Alegere mod", description: "Lossy (dimensiune mai mică) sau lossless." },
        { title: "Descărcare AVIF", description: "Descarcă rezultatul." },
      ],
      useCases: [
        { icon: "🖼️", title: "Elemente UI și icoane", description: "Optimizare elemente UI cu fundal transparent." },
        { icon: "🎨", title: "Logo-uri și grafică", description: "Exporturi vectoriale și logo-uri." },
      ],
      aboutSection: { title: "PNG vs AVIF", paragraphs: ["AVIF în mod lossless obține de obicei 10-20% dimensiune mai mică decât PNG."] },
    },
  },

  "kep-base64": {
    introText: "Codificarea Base64 permite integrarea directă a imaginilor în fișiere HTML sau CSS, fără cereri HTTP separate.",
    guide: ["1. Încarcă imaginea.", "2. Alege formatul de ieșire.", "3. Copiază codul generat."],
    faq: [{ q: "Când să folosesc Base64?", a: "Pentru imagini mici sub 50KB – icoane, logo-uri." }],
    content: {
      howToSteps: [
        { title: "Încărcare imagine", description: "JPG, PNG, WebP, SVG sau GIF." },
        { title: "Alegere format", description: "HTML img, CSS background-image sau Data URI brut." },
        { title: "Copiere", description: "Copiază codul generat." },
      ],
      useCases: [
        { icon: "📧", title: "Șabloane email", description: "Imaginile Base64 apar mereu în email." },
        { icon: "⚡", title: "Imagini above-the-fold", description: "Evitare cereri HTTP render-blocking." },
      ],
      aboutSection: { title: "Despre codificarea Base64", paragraphs: ["Base64 este o schemă de codificare care reprezintă date binare ca text ASCII."] },
    },
  },

  "kep-ico": {
    introText: "Generează fișier ICO favicon din PNG, JPG sau WebP în browser, conținând dimensiunile 16×16, 32×32 și 48×48 px.",
    guide: ["1. Încarcă imaginea sursă.", "2. Se generează automat dimensiunile.", "3. Descarcă favicon.ico."],
    faq: [{ q: "Ce dimensiune sursă să folosesc?", a: "Minim 64×64 px, ideal 512×512 px." }],
    content: {
      howToSteps: [
        { title: "Încărcare imagine", description: "PNG recomandat cu fundal transparent." },
        { title: "Generare ICO", description: "Dimensiuni 16×16, 32×32 și 48×48 px într-un singur fișier ICO." },
        { title: "Integrare", description: "Încarcă favicon.ico în directorul rădăcină." },
      ],
      useCases: [
        { icon: "🌐", title: "Favicon site", description: "Icoana din tab-ul browser-ului." },
        { icon: "🖥️", title: "Icoane Windows", description: "Icoane pentru aplicații desktop." },
      ],
      aboutSection: { title: "Despre formatul ICO", paragraphs: ["ICO este un format Windows care stochează mai multe dimensiuni ale imaginii într-un singur fișier."] },
    },
  },

  "atmeterezas-kb": {
    introText: "Setează dimensiunea țintă în KB – instrumentul găsește automat calitatea JPEG optimă prin căutare binară.",
    guide: ["1. Încarcă imaginea.", "2. Setează dimensiunea țintă în KB.", "3. Convertește și descarcă."],
    faq: [{ q: "Cât de precis este?", a: "±5% de dimensiunea țintă." }],
    content: {
      howToSteps: [
        { title: "Încărcare imagine", description: "JPG, PNG sau WebP." },
        { title: "Setare dimensiune", description: "Dimensiunea maximă acceptabilă în KB." },
        { title: "Optimizare", description: "Căutare binară pentru calitatea optimă." },
        { title: "Descărcare", description: "Descarcă JPG-ul la dimensiunea țintă." },
      ],
      useCases: [
        { icon: "💼", title: "Aplicații de angajare", description: "Sistemele HR au de obicei limită de 2MB." },
        { icon: "🏛️", title: "Formulare oficiale", description: "Portaluri guvernamentale cu limite stricte." },
      ],
      aboutSection: { title: "Cum funcționează redimensionarea la KB?", paragraphs: ["Algoritmul folosește căutare binară în intervalul de calitate JPEG 0.01-1.0."] },
    },
  },

  "gif-keszito": {
    introText: "Creează GIF-uri animate din imagini JPG, PNG sau WebP, direct în browser, fără server.",
    guide: ["1. Încarcă imaginile – acestea vor fi cadrele GIF-ului.", "2. Setează delay-ul și bucla.", "3. Generează și descarcă."],
    faq: [{ q: "Câte cadre pot adăuga?", a: "Maximum 100 imagini." }],
    content: {
      howToSteps: [
        { title: "Încărcare imagini", description: "Trage imaginile – ordinea încărcării = ordinea animației." },
        { title: "Setare timing", description: "Frame delay: 100ms ≈ 10fps." },
        { title: "Generare GIF", description: "Bibliotecã gifenc cuantizează și codifică cadrele." },
      ],
      useCases: [
        { icon: "😂", title: "GIF-uri reacție", description: "GIF-uri personalizate pentru Discord, Slack." },
        { icon: "🛍️", title: "Animație produs", description: "Prezentare produs din mai multe unghiuri." },
      ],
      aboutSection: { title: "Despre formatul GIF", paragraphs: ["GIF (Graphics Interchange Format) este standardul pentru imagini animate pe internet din 1987."] },
    },
  },

  "gif-webp-animalt": {
    introText: "WebP animat este alternativa modernă la GIF animat: la aceeași calitate, până la 80% dimensiune mai mică.",
    guide: ["1. Încarcă fișierul GIF.", "2. Setează calitatea.", "3. Convertește și descarcă WebP animat."],
    faq: [{ q: "Toate browserele redă WebP animat?", a: "Da, Chrome, Firefox, Safari 14+ și Edge." }],
    content: {
      howToSteps: [
        { title: "Încărcare GIF", description: "Selectează fișierul GIF animat." },
        { title: "Setare calitate", description: "80% recomandat." },
        { title: "Descărcare WebP", description: "Fișierul WebP animat poate fi folosit direct în HTML." },
      ],
      useCases: [
        { icon: "⚡", title: "Viteză site", description: "Înlocuiește GIF-urile cu WebP animat." },
        { icon: "📱", title: "Rețea mobilă", description: "Dimensiune mai mică = mai puțin trafic." },
      ],
      aboutSection: { title: "WebP animat vs GIF", paragraphs: ["WebP animat oferă compresie mult mai bună decât GIF, cu suport complet pentru canal alfa."] },
    },
  },

  "svg-png": {
    introText: "SVG este format vectorial care se afișează clar la orice dimensiune, dar nu toate programele îl suportă. Acest instrument convertește SVG în PNG sau JPG la rezoluția dorită.",
    guide: ["1. Încarcă fișierul SVG.", "2. Alege formatul de ieșire și lățimea.", "3. Descarcă imaginea rasterizată."],
    faq: [{ q: "Ce rezoluție să setez?", a: "Pentru ecrane Retina, 2× dimensiunea CSS." }],
    content: {
      howToSteps: [
        { title: "Încărcare SVG", description: "Selectează fișierul SVG." },
        { title: "Setări", description: "PNG sau JPG, și lățimea în pixeli." },
        { title: "Descărcare", description: "Descarcă imaginea rasterizată." },
      ],
      useCases: [
        { icon: "📧", title: "Email", description: "Clienții email blochează adesea SVG." },
        { icon: "📄", title: "Documente Word/PDF", description: "Inserare logo-uri în documente." },
      ],
      aboutSection: { title: "Despre rasterizarea SVG", paragraphs: ["SVG este un format vectorial bazat pe XML. În browser poate fi rasterizat cu Canvas API."] },
    },
  },

  "kep-collage": {
    introText: "Combină mai multe imagini într-o singură compoziție – orizontal, vertical sau în grilă.",
    guide: ["1. Încarcă imaginile (min. 2, max. 20).", "2. Alege aspectul și spațierea.", "3. Convertește și descarcă."],
    faq: [{ q: "Se pot combina imagini de dimensiuni diferite?", a: "Da – instrumentul ajustează automat dimensiunile." }],
    content: {
      howToSteps: [
        { title: "Încărcare imagini", description: "Încarcă imaginile de combinat." },
        { title: "Alegere aspect", description: "Orizontal, vertical sau grilă." },
        { title: "Descărcare", description: "Descarcă colajul în format PNG." },
      ],
      useCases: [
        { icon: "🛒", title: "Prezentare produs", description: "Produs din mai multe unghiuri într-o singură imagine." },
        { icon: "📱", title: "Colaj Instagram", description: "Combinare fotografii pentru social media." },
      ],
      aboutSection: { title: "Combinare imagini în browser", paragraphs: ["Canvas API permite alăturarea mai multor imagini pe un singur OffscreenCanvas."] },
    },
  },

  "szin-paletta": {
    introText: "Extrage culorile dominante dintr-o imagine în câteva secunde. Algoritmul analizează imaginea pe Canvas și returnează grupurile de culori dominante în format HEX, RGB și HSL.",
    guide: ["1. Încarcă imaginea.", "2. Setează numărul de culori (3-10).", "3. Copiază codurile HEX."],
    faq: [{ q: "Ce algoritm folosește?", a: "Algoritm median cut modificat, calculând medii de culoare pe zone." }],
    content: {
      howToSteps: [
        { title: "Încărcare imagine", description: "Încarcă imaginea pentru extragere paletă." },
        { title: "Setare culori", description: "Câte culori dominante dorești (3-10)." },
        { title: "Copiere", description: "Clic pe codul HEX pentru copiere." },
      ],
      useCases: [
        { icon: "🎨", title: "Design brand", description: "Compunerea paletei de culori din logo existent." },
        { icon: "🖥️", title: "Design UI/UX", description: "Extragerea temelor de culori din imagini." },
      ],
      aboutSection: { title: "Despre extragerea paletei", paragraphs: ["Imaginea este randată pe OffscreenCanvas la dimensiune redusă, apoi statistici la nivel de pixel determină grupurile dominante."] },
    },
  },

  "automatikus-vagas": {
    introText: "Elimină automat marginile albe sau unicolore de pe imagini. Analiza la nivel de pixel găsește limitele conținutului real.",
    guide: ["1. Încarcă imaginea.", "2. Setează culoarea de fundal și toleranța.", "3. Convertește și descarcă."],
    faq: [
      { q: "Funcționează și pe fundal non-alb?", a: "Da – cu selectorul de culoare poți seta orice culoare de fundal." },
      { q: "Ce este setarea de toleranță?", a: "Determină cât de apropiați pot fi pixelii de culoarea de fundal." },
    ],
    content: {
      howToSteps: [
        { title: "Încărcare imagine", description: "JPG, PNG sau WebP." },
        { title: "Setări", description: "Culoare fundal și toleranță (0-80)." },
        { title: "Descărcare", description: "Descarcă imaginea decupată în format PNG." },
      ],
      useCases: [
        { icon: "📷", title: "Documente scanate", description: "Eliminare automată a marginilor albe." },
        { icon: "🛒", title: "Fotografii produse webshop", description: "Uniformizarea imaginilor de produse." },
      ],
      aboutSection: { title: "Despre decuparea automată", paragraphs: ["Algoritmul scanează pixelii de la margini și găsește dreptunghiul minim de încadrare."] },
    },
  },

  "exif-terkep": {
    introText: "Știai că smartphone-ul tău scrie coordonatele GPS în fiecare fotografie? Acest instrument extrage locația din datele EXIF și o afișează pe hartă interactivă OpenStreetMap.",
    guide: ["1. Încarcă fotografia JPEG.", "2. Se extrag coordonatele GPS.", "3. Locația apare pe hartă interactivă."],
    faq: [
      { q: "Toate fotografiile conțin date GPS?", a: "Nu – doar dacă localizarea era activă la fotografiere." },
      { q: "Securitatea datelor?", a: "Totul se procesează în browser." },
    ],
    content: {
      howToSteps: [
        { title: "Încărcare JPEG", description: "Încarcă fotografia JPEG făcută cu smartphone-ul." },
        { title: "Analiză EXIF", description: "Biblioteca exifr extrage coordonatele GPS." },
        { title: "Afișare hartă", description: "Locația este marcată pe harta OpenStreetMap." },
      ],
      useCases: [
        { icon: "📍", title: "Identificare locație foto", description: "Determinarea locului unde au fost făcute fotografii vechi." },
        { icon: "🔒", title: "Verificare confidențialitate", description: "Verifică dacă imaginile conțin date GPS." },
      ],
      aboutSection: { title: "Despre datele GPS EXIF", paragraphs: ["Metadatele EXIF sunt stocate în headerul fișierelor JPEG. Smartphone-urile înregistrează implicit coordonatele GPS."] },
    },
  },

  "sprite-vagas": {
    introText: "Un sprite sheet este un singur fișier imagine mare care conține mai multe imagini mici într-o grilă uniformă. Acest instrument le taie și le exportă în ZIP.",
    guide: ["1. Încarcă sprite sheet-ul.", "2. Setează lățimea și înălțimea celulei.", "3. Instrumentul exportă automat."],
    faq: [
      { q: "Cu ce nume sunt exportate imaginile?", a: "sprite-00-00.png, sprite-00-01.png etc." },
      { q: "Funcționează cu sprite sheet-uri asimetrice?", a: "Da, dimensiunea celulei poate fi setată separat." },
    ],
    content: {
      howToSteps: [
        { title: "Încărcare sprite sheet", description: "Încarcă imaginea PNG/JPG/WebP sprite sheet." },
        { title: "Setare dimensiune celulă", description: "Setează dimensiunea unei celule sprite în pixeli." },
        { title: "Descărcare ZIP", description: "Descarcă arhiva ZIP cu toate sprite-urile." },
      ],
      useCases: [
        { icon: "🎮", title: "Dezvoltare jocuri", description: "Separarea cadrelor de animație și sprite-urilor de personaje." },
        { icon: "🖥️", title: "Seturi de icoane UI", description: "Procesarea sprite sheet-urilor de icoane." },
      ],
      aboutSection: { title: "Despre tăierea sprite sheet-urilor", paragraphs: ["Algoritmul calculează numărul de celule bazat pe dimensiunea grilei, apoi taie și exportă fiecare cadru."] },
    },
  },
};
