import type { ContentMap } from "../types.ts";

// Time/countdown RO content – Fázis 7
// ⚠️  faq[] tömb a single source of truth — a markdown frontmatter
//     faqPageSchema.mainEntity tömbnek pontosan ezeket a Q+A-kat kell
//     tartalmaznia (Google Rich Results követelmény).
export const TIMP_RO_CONTENT: ContentMap = {
  "diferenta-date": {
    introText:
      "Calculatorul de diferență între date oferă 3 moduri: «Diferență» (zile, săptămâni, luni, ani între 2 date), «Zile lucrătoare» (exclude weekend-uri și sărbători legale RO conform Codului Muncii art. 139) și «Adunare/Scădere» (calculează data rezultată din adăugarea/scăderea unor zile). Suport pentru toate cele 13 sărbători legale RO + sărbătorile mobile (Vinerea Mare, Paști, Rusalii) calculate cu algoritmul Meeus.",
    guide: [
      "1. Alege modul: Diferență, Zile lucrătoare sau Adunare/Scădere.",
      "2. Pentru Diferență/Lucrătoare: introdu data de început și data de sfârșit.",
      "3. Pentru Adunare/Scădere: introdu data de pornire și numărul de zile, alege ➕ sau ➖.",
    ],
    faq: [
      { q: "Cum se calculează zilele lucrătoare în România?", a: "Pornind de la totalul zilelor calendaristice între cele 2 date, scădem zilele de weekend (sâmbătă + duminică) și sărbătorile legale conform Codului Muncii art. 139. În 2026 sunt ~13 sărbători legale, ceea ce înseamnă ~250-252 zile lucrătoare/an pentru un program standard L–V." },
      { q: "Ce sărbători legale există în România în 2026?", a: "Sărbătorile fixe: 1-2 ianuarie (Anul Nou), 24 ianuarie (Unirea Principatelor), 1 mai (Ziua Muncii), 1 iunie (Ziua Copilului), 15 august (Adormirea Maicii Domnului), 30 noiembrie (Sf. Andrei), 1 decembrie (Ziua Națională), 25-26 decembrie (Crăciun). Sărbătorile mobile: Vinerea Mare, Paștele și a 2-a zi de Paști, Rusalii și a 2-a zi de Rusalii." },
      { q: "De ce diferă diferența «exactă» de cea în zile?", a: "Diferența exactă (X ani, Y luni, Z zile) folosește calendarul real (lunile au 28-31 zile, anii bisecți au 366). Diferența în zile e numărul total de zile calendaristice. Convertirea în săptămâni/luni/ani folosește valori medii (7 zile/săpt., 30,44 zile/lună, 365,25 zile/an)." },
      { q: "Cum calculez data peste 90 de zile?", a: "Folosește modul «Adunare/Scădere»: introdu data de pornire (sau lasă „azi”), pune 90 la numărul de zile și apasă butonul ➕ Adaugă. Calculatorul îți arată data rezultată plus ziua săptămânii (luni, marți, etc.)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alege modul", description: "Diferență, Zile lucrătoare sau Adunare/Scădere." },
        { title: "2. Introdu datele", description: "Date-picker pentru data/datele relevante + (opțional) număr zile." },
        { title: "3. Vezi rezultatul", description: "Diferența exactă, totalul în diverse unități sau data rezultată." },
      ],
      useCases: [
        { icon: "📋", title: "Termen de plată", description: "Calculează scadența unei facturi (ex. 30 zile lucrătoare după emitere)." },
        { icon: "🏖️", title: "Concediu", description: "Câte zile concediu efectiv (lucrătoare) între 2 date." },
        { icon: "📅", title: "Termen contractual", description: "Verifică data limită contractuală cu adunare de zile." },
        { icon: "🎯", title: "Planificare evenimente", description: "Câte săptămâni/luni rămân până la un eveniment important." },
      ],
      aboutSection: {
        title: "Despre calculul diferenței între date",
        paragraphs: [
          "În România, Codul Muncii (Legea 53/2003 art. 139) listează cele 13-15 sărbători legale anuale, dintre care 8 sunt fixe pe calendar și 5-7 sunt mobile (legate de Paștele ortodox). Calculul corect al zilelor lucrătoare este esențial pentru contracte, concediu legal de odihnă, scadențe contractuale și raportări HR.",
          "Algoritmul Meeus pentru Paștele ortodox folosește calendarul iulian, apoi se adaugă 13 zile pentru a obține data în calendarul gregorian (valabil pentru anii 1900-2099). Vinerea Mare = Paști − 2 zile, A doua zi de Paști = Paști + 1 zi, Rusalii = Paști + 49 zile, A doua zi de Rusalii = Paști + 50 zile.",
        ],
      },
    },
  },

  "craciun-numaratoare": {
    introText:
      "Numărătoarea inversă până la Crăciun (25 decembrie) afișează în timp real zile, ore, minute și secunde rămase, cu o animație discretă de ninsoare. Crăciunul în România este sărbătoare legală pe 25 și 26 decembrie (Codul Muncii art. 139). Include butoane de partajare pentru Facebook, X, WhatsApp și copy-link.",
    guide: [
      "1. Pagina detectează automat data curentă și calculează zilele rămase până la 25 decembrie.",
      "2. Vizualizează ceasul live (zile/ore/minute/secunde) cu progress-bar prin anul calendaristic.",
      "3. Distribuie pagina prietenilor cu butoanele de share (Facebook / X / WhatsApp / Copiază link).",
    ],
    faq: [
      { q: "Câte zile mai sunt până la Crăciun?", a: "Numărătoarea de mai sus arată exact câte zile, ore, minute și secunde mai sunt până la 25 decembrie, ora 00:00. Se actualizează la fiecare secundă (no refresh necesar)." },
      { q: "Crăciunul este sărbătoare legală în România?", a: "Da. Conform Codului Muncii (Legea 53/2003 art. 139), atât 25 decembrie cât și 26 decembrie sunt zile nelucrătoare cu plată — bucurându-te de minim 2 zile libere consecutive (sau mai multe dacă coincid cu un weekend)." },
      { q: "Care sunt tradițiile RO de Crăciun?", a: "În România, Crăciunul include colindele tradiționale (Steaua, Plugușorul, Sorcova), masa de Ajun (postul ține până în seara de 24 dec), porcul de Crăciun, sarmalele, cozonacul și pomul de Crăciun decorat. Moș Crăciun aduce cadouri în noaptea de 24 spre 25." },
      { q: "Pot partaja această numărătoare?", a: "Da. Folosește butoanele de share (Facebook, X, WhatsApp, Copiază link) pentru a distribui pagina. Linkul nu conține informații personale — oricine îl deschide va vedea aceeași numărătoare către aceeași dată țintă." },
    ],
    content: {
      howToSteps: [
        { title: "1. Vezi numărătoarea live", description: "Zile/ore/minute/secunde până la 25 decembrie 00:00." },
        { title: "2. Urmărește progresul", description: "Bara de progres arată cât din anul calendaristic a trecut." },
        { title: "3. Distribuie", description: "Facebook · X · WhatsApp · sau copiază link." },
      ],
      useCases: [
        { icon: "🎁", title: "Planificare cadouri", description: "Câte zile mai ai pentru a găsi cadourile perfecte." },
        { icon: "✈️", title: "Călătorie acasă", description: "Numărătoare până la concediul de Crăciun și călătoria spre familie." },
        { icon: "🎄", title: "Decor", description: "Plan pentru când să decorezi bradul (tradiția: 6 dec / Sf. Nicolae sau Ajunul)." },
        { icon: "📢", title: "Marketing sezonier", description: "Lansare campanii Black Friday → Crăciun pentru e-commerce." },
      ],
      aboutSection: {
        title: "Despre Crăciunul ortodox în România",
        paragraphs: [
          "Crăciunul în România se sărbătorește pe 25 decembrie (calendar gregorian, ca în restul Europei creștine occidentale și a majorității lumii ortodoxe în prezent), spre deosebire de unele biserici ortodoxe care încă folosesc calendarul iulian (Crăciun pe 7 ianuarie — Rusia, Serbia, Etiopia).",
          "Postul Crăciunului durează 40 de zile (15 noiembrie − 24 decembrie). Tradițiile precreștine se împletesc cu cele creștine: colindele de Crăciun, ursul, capra, sorcova. Ajunul (24 dec) este ziua marii pregătiri culinare, iar 25 dec este ziua centrală a sărbătorii.",
        ],
      },
    },
  },

  "revelion-numaratoare": {
    introText:
      "Numărătoarea inversă până la Revelion (1 ianuarie, ora 00:00) afișează în timp real zile, ore, minute și secunde rămase, cu o animație de artificii. La miezul nopții, în România se aud clopotele bisericilor și se urează „La mulți ani!”. Include butoane de partajare pentru Facebook, X, WhatsApp.",
    guide: [
      "1. Pagina calculează automat secunda exactă până la 1 ianuarie, ora 00:00.",
      "2. Vizualizează ceasul live (zile/ore/minute/secunde) cu progress-bar prin anul curent.",
      "3. La miezul nopții pe 31 decembrie → 1 ianuarie, mesajul „La mulți ani!” apare automat.",
    ],
    faq: [
      { q: "Când se schimbă anul exact?", a: "Numărătoarea țintește 1 ianuarie ora 00:00 ora locală (ora României, EET/EEST). La acest moment, se afișează automat mesajul „La mulți ani!”. Pentru România, fusul orar este UTC+2 iarna (EET) și UTC+3 vara (EEST), dar Revelionul este iarna deci UTC+2." },
      { q: "Revelionul este sărbătoare legală în RO?", a: "Da. 1 și 2 ianuarie sunt sărbători legale conform Codului Muncii (Legea 53/2003 art. 139). Practic, zilele 31 decembrie (după-amiază), 1 ianuarie și 2 ianuarie sunt nelucrătoare — bucurându-te de un mini-vacanțe de 3+ zile (cu weekend-uri eventuale)." },
      { q: "De ce se aud clopotele bisericilor la miezul nopții?", a: "Tradiția aceasta vine din ortodoxie: clopotele bisericilor anunță trecerea în noul an, simbolizând binecuvântare pentru perioada următoare. În București și marile orașe, focurile de artificii și concertele publice (ex. la Universitate) sunt evenimente populare." },
      { q: "Pot folosi această numărătoare în orice fus orar?", a: "Da. Numărătoarea folosește ora locală a vizitatorului (preluată din browser), deci dacă o accesezi din altă țară, va arăta secunda exactă până la 1 ianuarie ora 00:00 fusul TĂU. Nu este fixă pentru ora României." },
    ],
    content: {
      howToSteps: [
        { title: "1. Numărătoare live", description: "Până la 1 ianuarie 00:00 ora locală." },
        { title: "2. Animație de artificii", description: "Subtle, nu blochează atenția — doar atmosferă festivă." },
        { title: "3. Distribuie", description: "Facebook · X · WhatsApp · copiază link." },
      ],
      useCases: [
        { icon: "🥂", title: "Petreceri Revelion", description: "Numărătoare proiectată live la petrecerea de acasă sau la club." },
        { icon: "📺", title: "Live streaming", description: "Integrare în transmisii live de Revelion (cu OBS browser source)." },
        { icon: "🎯", title: "Planificare 2027", description: "Cu cât rămâne mai puțin, cu atât mai concret planifici obiectivele anului următor." },
        { icon: "📲", title: "Mesaje de Anul Nou", description: "Distribuie linkul în grupurile WhatsApp pe 31 decembrie." },
      ],
      aboutSection: {
        title: "Despre Revelion în România",
        paragraphs: [
          "Revelionul (din franc. réveillon = trezirea) este sărbătoarea trecerii în Anul Nou, celebrată în România cu petreceri în familie sau cu prietenii, mese festive (cozonac, sarmale, friptură de porc), focuri de artificii, dans și televizoare deschise pe canalele cu reviste speciale (TVR, Pro TV).",
          "Tradiții superstițioase: îmbracă haine noi (= an nou, viață nouă), bea șampanie la miezul nopții (= prosperitate), nu plătește datorii pe 1 ianuarie (= să nu plătești tot anul), pune monede în ghetuțe (= bani toată anul).",
          "În practică, numărătoarea pentru 1 ianuarie 2027 ora 00:00 (ora României) poate fi distribuită în noiembrie-decembrie 2026 pentru a crea atmosferă pe rețelele sociale.",
        ],
      },
    },
  },

  "pasti-numaratoare": {
    introText:
      "Numărătoarea inversă până la Paștele ortodox folosește algoritmul Meeus pe calendarul iulian, apoi se adaugă 13 zile pentru conversia în calendarul gregorian. Paștele este sărbătoare mobilă — data variază între 4 aprilie și 8 mai (calendar gregorian) în funcție de echinocțiul de primăvară și ciclul lunar.",
    guide: [
      "1. Pagina detectează automat data Paștelui ortodox pentru anul curent (sau anul următor, dacă a trecut).",
      "2. Vizualizează ceasul live (zile/ore/minute/secunde) + bara de progres prin anul liturgic.",
      "3. La miezul nopții de Paști, mesajul „Hristos a înviat!” apare automat.",
    ],
    faq: [
      { q: "De ce diferă Paștele ortodox de Paștele catolic?", a: "Biserica Ortodoxă folosește calendarul iulian pentru calculul Paștelui (regula de la Conciliul de la Niceea, 325), apoi convertește data în calendar gregorian adăugând 13 zile (1900-2099). Biserica Catolică folosește direct calendarul gregorian. Diferența între cele 2 date variază: 0, 1, 4 sau 5 săptămâni." },
      { q: "Cum se calculează data Paștelui ortodox?", a: "Algoritmul Meeus (anonim, secolul XIX): a = an mod 4, b = an mod 7, c = an mod 19, d = (19c+15) mod 30, e = (2a+4b−d+34) mod 7, lună = floor((d+e+114)/31), zi = (d+e+114) mod 31 + 1. Rezultat în calendar iulian; adaugi 13 zile pentru gregorian." },
      { q: "Care sunt sărbătorile legate de Paști în RO?", a: "Vinerea Mare (Paști − 2 zile), Paștele (zi de duminică), A doua zi de Paști (Paști + 1, sărbătoare legală), Rusalii (Paști + 49 zile, duminică), A doua zi de Rusalii (Paști + 50, sărbătoare legală). Toate sunt zile nelucrătoare conform Codului Muncii art. 139." },
      { q: "De ce este Paștele sărbătoare mobilă?", a: "Conform Conciliului de la Niceea (325 d.Hr.), Paștele se sărbătorește în prima duminică după prima lună plină de după echinocțiul de primăvară (~21 martie). Combinația ciclului lunar (29,5 zile) cu cel solar duce la fluctuația datei între ~22 martie și ~25 aprilie pentru calendarul gregorian." },
    ],
    content: {
      howToSteps: [
        { title: "1. Numărătoare live", description: "Până la Duminica Paștelui ortodox." },
        { title: "2. Algoritm Meeus", description: "Calendar iulian → gregorian (+13 zile pentru anii 1900-2099)." },
        { title: "3. Distribuie", description: "Facebook · X · WhatsApp · copiază link." },
      ],
      useCases: [
        { icon: "🍳", title: "Planificare ouă", description: "Câte zile pentru a vopsi ouăle (tradiția: Joia Mare, cu 3 zile înainte)." },
        { icon: "✈️", title: "Concediu de primăvară", description: "Planifică călătoria de vacanță pe perioada Paștelui (luni nelucrătoare)." },
        { icon: "🛐", title: "Pregătire spirituală", description: "Numărătoare pentru postul Paștelui (40 zile + Săptămâna Patimilor)." },
        { icon: "🎁", title: "Cadouri", description: "Cumpărăturile pentru cadouri și miel pe perioada premergătoare." },
      ],
      aboutSection: {
        title: "Despre Paștele ortodox și algoritmul Meeus",
        paragraphs: [
          "Paștele ortodox este cea mai importantă sărbătoare a Bisericii Ortodoxe Române, prăznuind învierea lui Iisus Hristos. Calculul datei urmează regulile Conciliului de la Niceea (325 d.Hr.): prima duminică după prima lună plină de după echinocțiul de primăvară, cu prevederea că nu poate cădea înaintea Paștelui evreiesc (Pesach).",
          "Algoritmul Meeus, publicat în „Astronomical Algorithms” (Jean Meeus, 1991), este versiunea modernă a calculului „Computus” și produce data corectă a Paștelui pentru calendarul iulian. Adăugarea celor 13 zile pentru calendarul gregorian este valabilă pentru perioada 1900-2099 (în 2100 va deveni 14 zile datorită regulii de bisect a anilor cu 00).",
          "Postul Paștelui (Postul Mare) durează 7 săptămâni înainte de Paști. Săptămâna Patimilor (ultima săptămână) este perioada de pregătire spirituală maximă, culminând cu Vinerea Mare (sărbătoare legală în RO din 2018) și învierea de sâmbătă spre duminică.",
        ],
      },
    },
  },

  "zi-de-nastere": {
    introText:
      "Numărătoarea inversă până la următoarea zi de naștere personală: introduci data ta de naștere, calculatorul determină automat aniversarea următoare și afișează zilele/orele/minutele/secundele rămase. Plus: calculează vârsta exactă (ani trecuți + ziua exactă) și totalul zilelor trăite. Link partajabil cu prietenii (?data=YYYY-MM-DD).",
    guide: [
      "1. Introdu data ta de naștere (zi/lună/an).",
      "2. Vezi numărătoarea inversă până la următoarea aniversare + vârsta actuală exactă.",
      "3. Copiază linkul partajabil pentru a-l trimite prietenilor (data ta este encodată în URL).",
    ],
    faq: [
      { q: "Cum se calculează vârsta exactă?", a: "Calculatorul scade ziua/luna/anul nașterii din data curentă, ajustând pentru cazurile în care ziua sau luna nașterii nu a venit încă în anul curent. Rezultatul: ani împliniți + luni + zile (ex: 27 ani, 3 luni, 12 zile)." },
      { q: "Ce se întâmplă dacă m-am născut în 29 februarie?", a: "Pentru cei născuți pe 29 februarie (an bisect), aniversarea se sărbătorește tehnic doar la fiecare 4 ani. În anii non-bisecți, multe persoane aleg fie 28 februarie, fie 1 martie ca dată de aniversare. Calculatorul nostru tratează 29 februarie ca dată validă; în anii non-bisecți țintește spre 1 martie automat." },
      { q: "Cum partajez această numărătoare cu prietenii?", a: "După ce introduci data ta de naștere, butonul „Copiază link partajabil” copiază în clipboard URL-ul cu parametrul ?data=YYYY-MM-DD encodat. Oricine deschide linkul vede aceeași numărătoare către aniversarea ta — fără să trebuiască să introducă data manual." },
      { q: "Datele mele sunt salvate undeva?", a: "Nu. Calculatorul rulează 100% în browserul tău (client-side). Data ta de naștere nu se trimite la server, nu se salvează în baze de date și nu se folosește pentru tracking. Apare doar în URL dacă ai folosit funcția de share." },
    ],
    content: {
      howToSteps: [
        { title: "1. Date-picker", description: "Introdu ziua, luna și anul nașterii." },
        { title: "2. Numărătoare live", description: "Zile/ore/minute/secunde până la următoarea aniversare." },
        { title: "3. Share link", description: "URL cu data encodată — partajabil cu prietenii." },
      ],
      useCases: [
        { icon: "🎂", title: "Pregătirea petrecerii", description: "Câte zile pentru a comanda tortul, a invita prietenii, a aranja sala." },
        { icon: "🎁", title: "Lista de cadouri", description: "Începe să pregătești dorințele cu lunile înainte." },
        { icon: "👨‍👩‍👧", title: "Aniversare copil", description: "Setează data nașterii copilului — apare exact câte zile mai are până la aniversare." },
        { icon: "📲", title: "Distribuire grup", description: "Trimite linkul în grupul de prieteni — toți văd aceeași numărătoare." },
      ],
      aboutSection: {
        title: "Despre aniversări și planificare",
        paragraphs: [
          "Cercetările în psihologie pozitivă (Sonja Lyubomirsky, „The How of Happiness”) arată că anticiparea unui eveniment plăcut poate aduce mai multă fericire decât evenimentul însuși. Numărătoarea inversă spre o aniversare amplifică sentimentul anticipativ și menține motivația pe parcursul săptămânilor / lunilor.",
          "Pentru copii, mai ales la vârste mici (3-7 ani), o numărătoare vizuală spre ziua de naștere ajută la dezvoltarea conceptului de timp și răbdare. Pune linkul vizibil pe frigider sau ca tab fixat în browser-ul familiei.",
        ],
      },
    },
  },

  "generator-numaratoare": {
    introText:
      "Generator de numărătoare inversă personalizată: alegi numele evenimentului, data și ora țintă, plus un emoji reprezentativ. URL-ul rezultat conține toate parametrii encoded (?nume=Concert&data=2026-09-15T20:00&emoji=🎵), perfect pentru a-l distribui prin WhatsApp, e-mail sau rețele sociale. Cealaltă persoană vede aceeași numărătoare fără să configureze nimic.",
    guide: [
      "1. Introdu numele evenimentului (ex. „Concert Rock”, „Vacanță Grecia”, „Lansare aplicație”).",
      "2. Selectează data și ora exactă (countdown la secundă).",
      "3. Alege un emoji din presetări sau lasă cel default.",
      "4. Apasă „Copiază link partajabil” pentru a obține URL-ul cu toți parametrii encoded.",
    ],
    faq: [
      { q: "Pot crea o numărătoare pentru orice eveniment?", a: "Da — generatorul este complet flexibil. Concerte, lansări de produse, vacanțe, nunți, aniversări, deadline-uri profesionale, evenimente sportive, expoziții. Singura limitare: data trebuie să fie în viitor (calculatorul afișează „A sosit ziua!” când ajunge la 0)." },
      { q: "Cum funcționează linkul partajabil?", a: "URL-ul include 3 parametri în query string: ?nume=NumeEveniment&data=YYYY-MM-DDTHH:MM&emoji=🎵. Toți sunt URL-encoded automat (pentru a evita probleme cu spațiile sau caracterele speciale). Oricine deschide linkul vede aceeași numărătoare." },
      { q: "Pot folosi în prezentări sau pe ecrane publice?", a: "Da. Numărătoarea este responsive (se adaptează la orice dimensiune ecran), are contrast bun pentru proiectoare, animație discretă (nu distrage atenția). Folosește browser-ul în mod fullscreen (F11) pentru cea mai bună experiență live." },
      { q: "Datele se salvează pe server?", a: "Nu. Toate datele rămân în browser și în URL-ul partajat. Nu există backend, nu există baze de date, nu există tracking. Singura informație care „pleacă” de la tine este URL-ul pe care îl copiezi și îl trimiți manual." },
    ],
    content: {
      howToSteps: [
        { title: "1. Setează evenimentul", description: "Nume, dată, oră, emoji." },
        { title: "2. Vezi numărătoarea live", description: "Zile/ore/minute/secunde + bara progres." },
        { title: "3. Distribuie linkul", description: "URL encoded — perfect pentru WhatsApp, e-mail, social media." },
      ],
      useCases: [
        { icon: "🎵", title: "Concert / festival", description: "Numărătoare pentru bilete + intrare — distribuibilă în grupul de prieteni." },
        { icon: "🚀", title: "Lansare produs", description: "Plan de lansare pentru produs sau aplicație + countdown public." },
        { icon: "💒", title: "Nuntă", description: "Numărătoare pentru ziua nunții — link pentru invitați și familie." },
        { icon: "📈", title: "Deadline profesional", description: "Termen limită pentru un proiect / livrabil — afișat ca dashboard echipă." },
      ],
      aboutSection: {
        title: "Despre numărătorile partajabile",
        paragraphs: [
          "Numărătorile partajabile prin URL sunt un pattern UX folosit de multe servicii online (Doodle, Calendly, Eventbrite, Bandsintown). Avantajul: zero friction pentru destinatari (nu trebuie să se înregistreze, să descarce app, să creeze cont). Doar deschid linkul.",
          "Pentru evenimente importante, recomandarea: scurtează URL-ul cu un serviciu (bit.ly, tinyurl) pentru a-l face mai ușor de partajat verbal sau de notat pe afișe. URL-urile lungi cu parametri encoded sunt funcționale dar greu de citit/scris.",
          "Pe rețelele sociale, când partajezi linkul, Facebook / X / WhatsApp generează un preview automatic dacă pagina are Open Graph metadata bune (acest site are). Imaginea OG, titlul și descrierea apar în feed.",
        ],
      },
    },
  },

  "cate-zile-am": {
    introText:
      "Calculator de vârstă în timp real: introduci data nașterii și vezi exact câte zile, ore, minute și secunde ai trăit. Ceasul se actualizează la fiecare secundă (no refresh necesar). Plus: mérföldkövek matematice — 10 000 zile (~27,4 ani), 1 milion de minute (~1,9 ani), 1 miliard de secunde (~31,7 ani). Ceasul perfect pentru reflecție personală sau prezentări creative.",
    guide: [
      "1. Introdu data ta de naștere (calendar/picker).",
      "2. Vezi vârsta exactă: ani împliniți, luni și zile + totalul în secunde / minute / ore / zile.",
      "3. Verifică mérföldkövek-ul: când vei împlini 10 000 zile, 1 miliard de secunde etc.",
    ],
    faq: [
      { q: "Cum se calculează exact vârsta în zile?", a: "Calculatorul scade momentul nașterii (data + ora 00:00:00) din momentul curent (preluat din ceasul browserului). Diferența în milisecunde se împarte pe (1000 × 60 × 60 × 24) pentru a obține zile întregi. Restul devine ore, minute, secunde." },
      { q: "Ce înseamnă „1 miliard de secunde”?", a: "Aproximativ 31,7 ani — un mérföldkő interesant dacă te apropii de 30. Concret: 1 000 000 000 / (60 × 60 × 24 × 365,25) = 31,69 ani. Sărbătoarea acestui prag este o tradiție tot mai populară în mediul online." },
      { q: "De ce 10 000 de zile?", a: "10 000 zile = 27,38 ani — un mérföldkő mai puțin folosit dar foarte concret. Persoane care au împlinit 10 000 zile au o conștiință acută a faptului că timpul este limitat și concret măsurabil. Există chiar comunități online dedicate sărbătoririi acestei zile." },
      { q: "Datele mele sunt private?", a: "Da. Calculatorul rulează 100% client-side în browserul tău. Data nașterii nu se trimite niciodată la server, nu există tracking, nu există cookies legate de această dată. Dacă vrei să partajezi linkul cu data ta, poți folosi parametrul ?data=YYYY-MM-DD în URL." },
    ],
    content: {
      howToSteps: [
        { title: "1. Date-picker", description: "Introdu data nașterii (zi/lună/an)." },
        { title: "2. Ceas live", description: "Zile/ore/minute/secunde — actualizat la fiecare secundă." },
        { title: "3. Mérföldkövek", description: "Vezi care sunt atinse și câte mai lipsesc până la următorul." },
      ],
      useCases: [
        { icon: "🎂", title: "Aniversări speciale", description: "Sărbătorește 10 000 zile, 1 miliard de secunde — alternative la aniversările obișnuite." },
        { icon: "📊", title: "Reflecție personală", description: "Conștientizarea timpului ca resursă finită, motivație pentru proiecte." },
        { icon: "🎁", title: "Cadou inedit", description: "Pune linkul cu data nașterii prietenului ca felicitare neobișnuită." },
        { icon: "📚", title: "Educație matematică", description: "Pentru copii — exemplu concret de conversie unități timp și calcule." },
      ],
      aboutSection: {
        title: "Despre măsurarea timpului trăit",
        paragraphs: [
          "Conceptul de „câte zile am trăit” are rădăcini în filozofia stoică (Seneca, Marcus Aurelius) — conștientizarea finitudinii vieții ca motivator pentru a trăi conștient și cu sens. „Memento mori” („amintește-ți că ești muritor”) este o tradiție meditativă veche de 2000 de ani.",
          "În epoca modernă, mérföldkövek-ul „10 000 de zile” a fost popularizat în comunitățile online de productivitate și self-improvement. Tim Urban (Wait But Why) a publicat infografice virale despre numărul aproximativ de săptămâni dintr-o viață medie (~4000), făcând conceptul vizibil și emoțional.",
          "Speranța de viață medie în România (2024 INS) este 76,4 ani (78,6 femei, 73,8 bărbați) — aproximativ 27 800 zile. Deci un bărbat de 30 ani are deja la jumătate trăit. Reflecția este personală, dar matematica este obiectivă.",
        ],
      },
    },
  },

  "bacalaureat-numaratoare": {
    introText:
      "Numărătoarea inversă până la examenul de Bacalaureat (sesiunea de vară RO) — calculat ca a 3-a luni din iunie, ziua tipică de început pentru proba de limba română. Mesaje motivaționale dinamice în funcție de zile rămase: ultim sprint sub 7 zile, perioada de pregătire intensă sub 30 zile, plan structurat sub 90 zile. Plus: calcul ore de studiu efectiv (4h/zi).",
    guide: [
      "1. Pagina detectează automat anul curent și calculează data BAC (a 3-a luni din iunie).",
      "2. Vizualizează zilele rămase + mesajul motivațional adaptat la perioadă.",
      "3. Folosește numărul orelor de studiu efective ca țintă realistă (4h/zi este sustenabil).",
    ],
    faq: [
      { q: "Când este Bacalaureatul în România în 2026?", a: "Sesiunea de vară începe tipic în a 3-a luni din iunie (15-22 iunie, în funcție de an). Calendarul oficial complet (cu probele scrise și orale) se publică de Ministerul Educației la începutul anului școlar. Sesiunea de toamnă se desfășoară în august (probele scrise) și septembrie (orale)." },
      { q: "Câte ore trebuie să studiez pentru BAC?", a: "Pe baza experienței profesorilor, 4 ore de studiu efectiv pe zi (concentrat, fără distragere) este norma sustenabilă pentru perioada de pregătire intensă (ultimele 3 luni). Sub 90 de zile rămase = ~360 ore de studiu efectiv, suficient pentru recapitularea materiei." },
      { q: "Care este structura BAC RO?", a: "Probele obligatorii: Ed = Limba și literatura română (scris + oral), Eb = Limba maternă (pentru minorități), Ec = Matematică sau Istorie (în funcție de profil real/uman), Ed = Probă la alegere din profil. Plus: 2 probe de competențe (digitale + comunicare RO/limba străină)." },
      { q: "Ce înseamnă promovarea la BAC?", a: "Pentru promovare: media generală minim 6,00 (calculată ca media aritmetică a celor 4 probe scrise) ȘI nicio notă sub 5,00 la nicio probă scrisă. Probele de competențe sunt cu calificativ (Excelent / Avansat / Experimentat / Utilizator) — nu se pun la media." },
    ],
    content: {
      howToSteps: [
        { title: "1. Numărătoare live", description: "Până la a 3-a luni din iunie (data tipică de start)." },
        { title: "2. Mesaj motivațional", description: "Adaptat dinamic la zilele rămase: 7d / 30d / 90d / 90+d." },
        { title: "3. Plan studiu", description: "Calcul ore studiu efective la 4h/zi sustenabil." },
      ],
      useCases: [
        { icon: "📚", title: "Plan recapitulare", description: "Împarte materia pe săptămâni — recapitulare structurată per modul." },
        { icon: "📊", title: "Simulări", description: "Programează simulările de BAC la intervale regulate (1 lună / 3 săpt. / 1 săpt.)." },
        { icon: "💪", title: "Motivație", description: "Numărătoarea vizuală și mesajele dinamice menținmotivația în zilele grele." },
        { icon: "👨‍👩‍👧", title: "Suport părinți", description: "Părinții pot urmări progresul și ajusta sprijinul (mai puțin presiune cu cât mai aproape)." },
      ],
      aboutSection: {
        title: "Despre Bacalaureatul în România",
        paragraphs: [
          "Bacalaureatul este examenul de absolvire a liceului în România, instituționalizat din 1925. Trecerea în 2010 la Bacalaureatul „cu camere de supraveghere” a redus drastic frauda și a scăzut promovarea la sesiunea de vară de la ~80% la ~62-70% în primii ani — semn al rigorozității. Ratele recente (2023-2024): ~73-75% promovare după ambele sesiuni.",
          "Strategia recomandată de profesori: pregătire începută cu 9 luni înainte (septembrie clasa a 12-a), 1-2 ore/zi în primul semestru, 3-4 ore/zi după Crăciun, 5-6 ore/zi în ultima lună. Ultimele 7 zile = revizuire ușoară, somn bun, fără materie nouă. Ziua de examen: somn de 8 ore, mic dejun protein, intrarea cu 30 min mai devreme.",
          "Examenele de competențe (digitale, comunicare în RO și limba străină) sunt în general probele cele mai accesibile (peste 90% calificative bune sau excelente). Probele scrise rămân provocarea principală, în special Matematica la profilul real (programa M_mate-info este cea mai dificilă din toate).",
        ],
      },
    },
  },
};
