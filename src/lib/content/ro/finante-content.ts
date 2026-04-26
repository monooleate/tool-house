import type { ContentMap } from "../types.ts";

// Finance RO content – Fázis 5
// ⚠️  faq[] tömb a single source of truth — a markdown frontmatter
//     faqPageSchema.mainEntity tömbnek pontosan ezeket a Q+A-kat kell
//     tartalmaznia (Google Rich Results követelmény).
export const FINANTE_RO_CONTENT: ContentMap = {
  "calculator-tva": {
    introText:
      "Calculatorul de TVA acoperă toate cele 3 cote oficiale din România (19% standard, 9% pentru alimente, medicamente, hoteluri și cărți, 5% pentru locuințe sociale, manuale și lemne) și 3 moduri de calcul: net→brut, brut→net și extragere TVA dintr-o sumă. Util pentru facturare, contabilitate și verificarea bonurilor fiscale.",
    guide: [
      "1. Alege cota TVA aplicabilă (19%, 9% sau 5%).",
      "2. Selectează modul: Net→Brut (adaugi TVA), Brut→Net (scoți TVA) sau Extragere TVA dintr-o sumă brută.",
      "3. Introdu suma în lei — rezultatul apare instant.",
    ],
    faq: [
      { q: "Care sunt cotele de TVA în România?", a: "Cota standard este 19% (majoritatea bunurilor și serviciilor). Cota redusă 9% se aplică la alimente, medicamente, cazare hoteluri și cărți. Cota super-redusă 5% se aplică la locuințe sociale, manuale școlare și lemne de foc." },
      { q: "Cum scot TVA dintr-o sumă cu TVA inclus?", a: "Pentru cota 19%: TVA = brut × 0,1597 (sau brut × 19/119). Pentru 9%: TVA = brut × 0,0826. Pentru 5%: TVA = brut × 0,0476. Bază impozabilă = brut − TVA." },
      { q: "Cât face TVA 19% la 1000 lei net?", a: "TVA = 1000 × 0,19 = 190 lei. Total brut = 1190 lei." },
      { q: "Ce se schimbă cu reforma fiscală 2026?", a: "Există în discuție unificarea cotelor reduse (9% și 5%) într-o cotă unică, posibil 11%, dar până la publicarea în Monitorul Oficial cotele rămân 19%/9%/5%. Verifică anaf.ro înainte de facturile importante." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege cota", description: "Cele 3 cote RO: 19% standard, 9% redusă, 5% super-redusă." },
        { title: "2. Alege modul", description: "Net→Brut, Brut→Net sau Extragere TVA dintr-o sumă cu TVA inclus." },
        { title: "3. Introdu suma", description: "Rezultatul (TVA, net, brut) apare instant cu formula afișată." },
      ],
      useCases: [
        { icon: "🧾", title: "Facturare", description: "Calculează TVA pentru facturi B2B și B2C cu cota corectă." },
        { icon: "🛒", title: "Verificare bonuri", description: "Extrage TVA-ul dintr-un bon fiscal pentru raportare." },
        { icon: "📊", title: "Contabilitate", description: "Convertește între bază impozabilă și sumă cu TVA." },
        { icon: "🏪", title: "Comerț", description: "Calculează prețul de raft pornind de la prețul de achiziție net." },
      ],
      aboutSection: {
        title: "Despre TVA în România",
        paragraphs: [
          "Taxa pe Valoarea Adăugată (TVA) este reglementată prin Legea 227/2015 (Codul fiscal) și directiva europeană 2006/112/CE. România aplică un sistem cu trei cote: cota standard de 19% (introdusă în 2017, după reducerea de la 24%), cota redusă de 9% pentru produse esențiale și cota super-redusă de 5% pentru categoriile sociale.",
          "Pragul de înregistrare ca plătitor de TVA în România este de 300.000 lei cifră de afaceri pe 12 luni consecutive. Sub acest plafon, firmele sunt neplătitoare de TVA și nu colectează/deduc TVA. Reforma fiscală în discuție pentru 2026 ar putea modifica atât cotele cât și pragul de înregistrare — verifică ANAF pentru actualizări.",
        ],
      },
    },
  },

  "calculator-credit": {
    introText:
      "Calculator credit anuitar care folosește formula standard de rată fixă (R = P × r / (1 − (1 + r)⁻ⁿ)). Include preset-uri cu rate dobândă tipice 2026 pentru BCR, BRD, Raiffeisen și ING, plus durate uzuale (10–30 ani) pentru ipotecar și prima casă.",
    guide: [
      "1. Selectează banca (sau «Personalizat» pentru rată proprie).",
      "2. Introdu suma împrumutată, rata anuală (% DAE) și durata (ani).",
      "3. Vezi rata lunară, totalul plătit și totalul dobândă pe perioadă.",
    ],
    faq: [
      { q: "Cum se calculează rata lunară la credit anuitar?", a: "Se folosește formula R = P × r / (1 − (1 + r)⁻ⁿ), unde P = suma împrumutată, r = rata lunară (anuală/12) și n = numărul de luni. Rata rămâne constantă, dar componenta de dobândă scade lunar, iar componenta de capital crește." },
      { q: "Ce este DAE și de ce diferă de rata dobânzii?", a: "DAE (Dobânda Anuală Efectivă) include rata dobânzii plus toate comisioanele obligatorii (analiză, administrare, asigurare). Două credite cu aceeași dobândă pot avea DAE diferite din cauza comisioanelor. Solicită mereu DAE pentru comparație corectă." },
      { q: "Cât plătesc pentru un credit de 250.000 lei pe 25 ani la 7,5%?", a: "Rata lunară ≈ 1.847 lei. Total plătit pe 25 ani ≈ 554.100 lei, din care dobândă ≈ 304.100 lei (peste 121% din suma împrumutată)." },
      { q: "Ce este IRCC și cum afectează creditul?", a: "IRCC (Indicele de Referință pentru Creditele Consumatorilor) este indicatorul calculat trimestrial de BNR pentru creditele cu dobândă variabilă. Înlocuiește vechiul ROBOR la creditele noi. La un credit IRCC + 4%, rata se ajustează trimestrial cu IRCC publicat." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege banca", description: "Preset-uri cu rate uzuale BCR/BRD/Raiffeisen/ING sau setezi manual." },
        { title: "2. Introdu suma și durata", description: "Suma în lei, durata în ani, rata în % DAE." },
        { title: "3. Vezi rata lunară", description: "Plus totalul plătit și totalul dobândă pe perioadă." },
      ],
      useCases: [
        { icon: "🏠", title: "Credit ipotecar", description: "Cumpărare apartament/casă cu credit pe 25–30 ani." },
        { icon: "🏡", title: "Prima Casă", description: "Verifică rata cu dobândă subvenționată pentru programul guvernamental." },
        { icon: "🚗", title: "Credit auto", description: "Pentru durate mai scurte (3–7 ani) și sume 30.000–150.000 lei." },
        { icon: "📊", title: "Refinanțare", description: "Compară rata curentă cu rata unui credit nou pentru a decide refinanțarea." },
      ],
      aboutSection: {
        title: "Despre creditul anuitar în RO",
        paragraphs: [
          "Creditul anuitar (cu rată fixă lunară) este structura standard pentru creditele ipotecare în România. Spre deosebire de creditul cu rată descrescătoare (rate egale de capital + dobândă variabilă), anuitatea este predictibilă și ușor de bugetat: aceeași sumă plătită lunar pe toată durata.",
          "Pe primii ani, peste 70% din rată este dobândă, iar capitalul rambursat este mic. Asta explică de ce o rambursare anticipată în primii 5 ani este foarte avantajoasă (reduci dobânda totală semnificativ). După jumătatea perioadei, raportul se inversează: capitalul devine majoritar.",
        ],
      },
    },
  },

  "dobanda-compusa": {
    introText:
      "Calculator de dobândă compusă cu formula A = P × (1 + r/n)^(n·t), care permite simularea capitalizării anuale, semestriale, trimestriale, lunare sau zilnice. Suportă și depuneri lunare suplimentare — util pentru depozite la termen, titluri de stat (Tezaur) sau investiții ETF.",
    guide: [
      "1. Introdu suma inițială (P), rata anuală (%) și durata în ani.",
      "2. Alege frecvența capitalizării (anual, lunar, zilnic etc.).",
      "3. Opțional: adaugă o depunere lunară pentru a vedea efectul economisirii regulate.",
    ],
    faq: [
      { q: "Care este formula dobânzii compuse?", a: "A = P × (1 + r/n)^(n·t), unde A = suma finală, P = suma inițială, r = rata anuală (zecimală), n = numărul de capitalizări pe an, t = numărul de ani." },
      { q: "Care este diferența între dobândă simplă și compusă?", a: "Dobânda simplă se calculează doar pe principalul inițial (I = P × r × t). Dobânda compusă reinvestește dobânda câștigată, generând «dobândă la dobândă». Pe termen lung, diferența este uriașă: la 10.000 lei, 7%, 30 ani, simplă = 21.000 lei, compusă = 76.123 lei." },
      { q: "Cât crește 10.000 lei la 6,5% anual capitalizat lunar timp de 10 ani?", a: "A = 10.000 × (1 + 0,065/12)^(12×10) ≈ 19.116 lei. Câștig dobândă ≈ 9.116 lei (≈ 91% randament total)." },
      { q: "Cum afectează frecvența capitalizării rezultatul?", a: "Capitalizarea mai deasă crește ușor randamentul: la 10.000 lei, 6%, 10 ani → anual = 17.908 lei, lunar = 18.194 lei, zilnic = 18.221 lei. Diferența max anual→zilnic e ~1,8%." },
    ],
    content: {
      howToSteps: [
        { title: "1. Setează parametrii", description: "Sumă inițială, rată anuală (%) și durată în ani." },
        { title: "2. Alege frecvența", description: "Anual, semestrial, trimestrial, lunar sau zilnic." },
        { title: "3. Adaugă depuneri lunare (opțional)", description: "Simulează economisirea regulată tip «pay yourself first»." },
      ],
      useCases: [
        { icon: "💼", title: "Depozite bancare", description: "Compară randamentul dintre depozite la termen 6/12 luni." },
        { icon: "🏛️", title: "Titluri de stat Tezaur", description: "Calculează randamentul programelor cu maturitate 1/3/5 ani." },
        { icon: "📈", title: "Investiții ETF/acțiuni", description: "Estimează valoarea unui portofoliu pe baza unui randament mediu istoric (S&P 500 ≈ 9%/an)." },
        { icon: "🎓", title: "Educație financiară", description: "Vezi puterea matematică a economisirii pe termen lung — efectul «bulgăre de zăpadă»." },
      ],
      aboutSection: {
        title: "Despre dobânda compusă",
        paragraphs: [
          "Dobânda compusă este principiul fundamental al investițiilor pe termen lung. Albert Einstein a numit-o «a opta minune a lumii»: cei care o înțeleg, o câștigă; cei care n-o înțeleg, o plătesc. Diferența vine din faptul că dobânda câștigată se reinvestește și generează la rândul ei dobândă — un proces exponențial.",
          "Regula 72 este o aproximare utilă: pentru a afla în câți ani se dublează banii, împarți 72 la rata anuală în %. La 6%, banii se dublează în 12 ani. La 9%, în 8 ani. La 12%, în 6 ani. Calculatorul folosește formula exactă, nu aproximarea.",
          "În România, atenție la 2 factori: impozitul pe dobânzi (10% din 2025) și inflația (~5% RO 2026). Randamentul real net = rata nominală − inflația − impozit. Un depozit la 6% într-un an cu inflație 5% și impozit 10% = randament real ≈ 0,4%. Pentru a câștiga real, ai nevoie de instrumente cu randament peste inflație.",
        ],
      },
    },
  },

  "calculator-reducere": {
    introText:
      "Calculator de reducere bidirecțional pentru comerț, e-commerce și verificare oferte Black Friday. Modul «forward» calculează prețul redus și economia, iar modul «reverse» pornește de la prețul redus pentru a afla prețul original — esențial pentru a verifica autenticitatea reducerilor afișate (legea RO 363/2007 obligă comercianții să folosească cel mai mic preț din ultimele 30 de zile ca referință).",
    guide: [
      "1. Alege modul: Preț original → Preț redus, sau Preț redus → Preț original (verificare BF).",
      "2. Introdu valoarea în lei și procentul de reducere.",
      "3. Vezi prețul rezultat și suma economisită.",
    ],
    faq: [
      { q: "Cum calculez prețul după o reducere de 30%?", a: "Înmulțești prețul cu 0,7 (sau cu 1 − 30/100). Exemplu: 500 lei × 0,7 = 350 lei. Economisești 150 lei." },
      { q: "Cum verific dacă o reducere Black Friday este reală?", a: "Folosește modul «Preț redus → Preț original»: introdu prețul afișat după reducere și procentul anunțat. Calculatorul îți spune prețul «original» implicat. Compară-l cu prețul real istoric (poți folosi extensii precum Honey sau pagini de istorice prețuri RO precum Compari.ro)." },
      { q: "Care este legea reducerilor în România?", a: "Legea 363/2007 obligă ca prețul de referință folosit pentru o reducere afișată să fie cel mai mic preț practicat în ultimele 30 de zile. Reducerile false (preț «original» umflat artificial) sunt sancționabile cu amendă de la 5.000 la 20.000 lei." },
      { q: "Două reduceri succesive de 20% și 30% înseamnă reducere totală de 50%?", a: "NU. 100 → −20% → 80 → −30% → 56. Reducerea efectivă este 44%, nu 50%. Reducerile compuse se înmulțesc (0,8 × 0,7 = 0,56), nu se adună." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul", description: "Forward (preț original → preț redus) sau Reverse (preț redus → preț original)." },
        { title: "2. Introdu valorile", description: "Preț (lei) și procent reducere." },
        { title: "3. Vezi rezultatul", description: "Preț final și sumă economisită." },
      ],
      useCases: [
        { icon: "🛍️", title: "Black Friday", description: "Verifică dacă reducerea anunțată e reală sau prețul original a fost umflat." },
        { icon: "🎄", title: "Reduceri sezoniere", description: "Calculează prețul după reducerile de Crăciun, Paști, soldări de iarnă." },
        { icon: "💼", title: "B2B și negociere", description: "Determină rapid prețul după o discount oferit clienților fideli." },
        { icon: "🛒", title: "E-commerce", description: "Setezi prețuri promo pe magazinul online, cunoscând marja netă rămasă." },
      ],
      aboutSection: {
        title: "Despre reducerile comerciale",
        paragraphs: [
          "În România, transparența reducerilor este reglementată prin Legea 363/2007 privind combaterea practicilor incorecte ale comercianților. Conform acesteia, prețul de referință pentru o reducere afișată trebuie să fie cel mai mic preț practicat în ultimele 30 de zile. Comerciantul care afișează «−50%» dar a urcat prețul înainte cu 50% riscă amenzi.",
          "În practică, un mod simplu de verificare este: după o reducere reală, prețul de catalog rămâne mai mic decât majoritatea prețurilor istorice. Dacă prețul «redus» Black Friday este aproape de prețul mediu pe an, reducerea e practic falsă. Folosește modul «reverse» pentru a face calculul.",
        ],
      },
    },
  },

  "marja-adaos": {
    introText:
      "Convertor între adaos comercial (markup) și marjă brută (margin) — două concepte des confundate, dar fundamental diferite. Adaosul se calculează raportat la cost (profit/cost × 100), iar marja se calculează raportat la prețul de vânzare (profit/vânzare × 100). Util pentru e-commerce, retail și calcule de pricing.",
    guide: [
      "1. Alege modul: «Cost + Adaos%» (calculezi prețul pornind de la adaos) sau «Cost + Marjă%» (pornind de la marjă).",
      "2. Introdu costul de achiziție (lei) și procentul.",
      "3. Vezi prețul de vânzare, profitul brut și valoarea echivalentă a celuilalt indicator (marjă ↔ adaos).",
    ],
    faq: [
      { q: "Care este diferența între adaos și marjă?", a: "Adaosul (markup) = profit / cost × 100, raportat la costul de achiziție. Marja (margin) = profit / vânzare × 100, raportat la prețul de vânzare. Pentru același profit absolut, adaosul este mereu mai mare decât marja." },
      { q: "Adaos 50% înseamnă marjă 50%?", a: "NU. Cost 100 lei + adaos 50% = vânzare 150 lei → marjă = 50/150 = 33,3%. Confuzia este sursa multor erori în pricing și raportări financiare." },
      { q: "Care este formula de conversie adaos → marjă?", a: "marjă = adaos / (1 + adaos/100). Exemplu: adaos 25% → marjă = 25 / 1,25 = 20%. Și invers: adaos = marjă / (1 − marjă/100). Exemplu: marjă 30% → adaos = 30 / 0,7 ≈ 42,86%." },
      { q: "Care indicator se folosește în contabilitatea RO?", a: "În raportările financiare standard (P&L, situații anuale) se folosește marja brută (gross margin), pentru că este raportată la cifra de afaceri. În retail și negocieri B2B se folosește adesea adaosul, pentru că reflectă procentul peste costul de achiziție." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul", description: "Cost + Adaos% sau Cost + Marjă%." },
        { title: "2. Introdu valorile", description: "Cost (lei) și procent." },
        { title: "3. Vezi rezultatele", description: "Preț vânzare, profit brut și conversia adaos↔marjă." },
      ],
      useCases: [
        { icon: "🛒", title: "E-commerce pricing", description: "Setezi prețul de raft pornind de la costul de achiziție și marja țintă." },
        { icon: "📊", title: "Raportare financiară", description: "Calculează marja brută pentru P&L, conform IFRS sau OMFP 1802." },
        { icon: "🤝", title: "Negocieri B2B", description: "Convertește între adaos și marjă pentru a înțelege puterea de negociere." },
        { icon: "🏬", title: "Retail și import", description: "Calculează prețul final pornind de la costul FOB + transport + taxe." },
      ],
      aboutSection: {
        title: "Despre marjă vs adaos comercial",
        paragraphs: [
          "Confuzia între marjă și adaos este una dintre cele mai costisitoare erori în pricing. Un comerciant care își propune o marjă de 30% dar aplică adaos 30% va avea de fapt o marjă de doar 23,1% — pierderi importante la volume mari.",
          "Adaosul are sens când perspectiva este «cât adaug peste cost» (perspectivă de cumpărător/comerciant la achiziție). Marja are sens când perspectiva este «ce procent din cifra de afaceri este profit» (perspectivă financiară). Cele două sunt egale doar când profitul este zero.",
          "În e-commerce-ul românesc, calculul se complică cu TVA (19% standard) și taxa pe profit (16%). Marjă brută înainte de TVA = 30% poate să devină marjă netă după impozite ≈ 17–20%, în funcție de cheltuielile de operare.",
        ],
      },
    },
  },

  "calculator-salariu-ora": {
    introText:
      "Convertor simplu de salariu lunar (brut) în salariu orar, zilnic, săptămânal și anual, pentru ore de lucru flexibile. Folosește norma RO standard (40 h/săptămână × 21 zile lucrătoare ≈ 168 ore/lună) sau ajustezi pentru part-time. Util pentru freelanceri, studenți, oameni care evaluează oferte de muncă.",
    guide: [
      "1. Introdu salariul lunar brut (lei).",
      "2. Setează orele pe săptămână (40 = full-time RO standard).",
      "3. Numărul zilelor lucrătoare/lună (21 = mediu RO 2026, dar variază 19–23).",
    ],
    faq: [
      { q: "Care este norma de muncă în România?", a: "Conform Codului Muncii (Legea 53/2003), norma standard este 40 ore/săptămână și 8 ore/zi. Pe lună, norma medie este 168 ore (40 h × 4,2 săptămâni) sau aproximativ 21 zile lucrătoare × 8 h." },
      { q: "Cum convertesc 5.000 lei brut/lună în lei/oră?", a: "5.000 lei / 168 ore = 29,76 lei/oră brut. Pentru salariul net, trebuie să scazi CAS 25%, CASS 10% și impozit 10% — rezultatul net ≈ 18,8 lei/oră." },
      { q: "Care este salariul minim brut în RO 2026?", a: "Salariul minim brut pe economie este 4.050 lei/lună (din ianuarie 2026), echivalent ≈ 24,11 lei/oră brut la norma de 168 h/lună." },
      { q: "Acest calculator include impozitele?", a: "NU. Acesta este doar un convertor brut: salariu lunar → orar/zilnic/săptămânal. Pentru salariu NET (după CAS, CASS, impozit), folosește un calculator de salarizare dedicat, actualizat la Codul fiscal RO 2026." },
    ],
    content: {
      howToSteps: [
        { title: "1. Salariu lunar", description: "În lei brut (înainte de impozite și contribuții)." },
        { title: "2. Ore săptămânale", description: "40 = full-time. 30 = part-time 6h. 20 = part-time 4h." },
        { title: "3. Zile lucrătoare", description: "Variază 19–23 luna, în medie 21 zile/lună RO." },
      ],
      useCases: [
        { icon: "💻", title: "Freelancing", description: "Convertești ofertă lunară în tarif orar pentru a compara cu rate de freelance." },
        { icon: "🎓", title: "Studenți", description: "Compari joburi part-time pe oră vs lună." },
        { icon: "📋", title: "Oferte de muncă", description: "Evaluezi rapid oferta primită — câți lei/oră faci la salariul propus." },
        { icon: "🌍", title: "Comparație internațională", description: "Compari rata orară RO cu jobs internaționale (USD/h sau EUR/h)." },
      ],
      aboutSection: {
        title: "Despre conversia salariu lunar → orar",
        paragraphs: [
          "În România, salariile se exprimă tradițional pe lună (brut), spre deosebire de SUA și UK unde rata orară este standard. Conversia este utilă în mai multe contexte: freelancing internațional (clienți care plătesc/oră), comparare oferte job, evaluarea unei propuneri de outsourcing.",
          "Norma legală RO este 40 ore/săptămână (Codul Muncii art. 112). Sub 40 ore = part-time, peste 48 ore (cu ore suplimentare) = limită maximă legală conform Directivei UE 2003/88. Orele suplimentare se plătesc cu spor de minimum 75% (Codul Muncii art. 122) pentru zile lucrătoare, 100% pentru duminică/sărbători legale.",
          "Atenție la calculul salariului net: din salariul brut se scad CAS 25% (pensie), CASS 10% (sănătate) și impozit 10% (pe baza venitului impozabil, după deducerea contribuțiilor). Pentru un salariu brut de 5.000 lei, netul rezultat este ≈ 3.150 lei.",
        ],
      },
    },
  },
};
