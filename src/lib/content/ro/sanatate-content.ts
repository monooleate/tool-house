import type { ContentMap } from "../types.ts";

// Health RO content – Fázis 6
// ⚠️  faq[] tömb a single source of truth — a markdown frontmatter
//     faqPageSchema.mainEntity tömbnek pontosan ezeket a Q+A-kat kell
//     tartalmaznia (Google Rich Results követelmény).
export const SANATATE_RO_CONTENT: ContentMap = {
  "calculator-imc": {
    introText:
      "Calculatorul IMC (Indice de Masă Corporală, BMI în engleză) folosește clasificarea oficială OMS pentru adulți peste 18 ani: subponderal sub 18,5 · greutate normală 18,5–25 · supraponderal 25–30 · obezitate gradul I 30–35 · gradul II 35–40 · gradul III peste 40. Output-ul include valoarea IMC, categoria color-coded, greutatea ideală corespunzătoare înălțimii și o bară gradient cu marker live.",
    guide: [
      "1. Selectează sexul (informativ — IMC clasic nu folosește sex în formulă).",
      "2. Introdu înălțimea în cm și greutatea în kg.",
      "3. Vezi IMC-ul calculat instant + categoria WHO + greutatea ideală + diferența.",
    ],
    faq: [
      { q: "Ce este IMC și cum se calculează?", a: "IMC (Indice de Masă Corporală) este raportul dintre greutate și pătratul înălțimii: IMC = greutate (kg) / înălțime² (m²). De exemplu, pentru 75 kg și 1,75 m: IMC = 75 / (1,75 × 1,75) = 24,5 kg/m², adică greutate normală." },
      { q: "Care sunt categoriile IMC conform OMS?", a: "Sub 18,5 = subponderal · 18,5–24,9 = greutate normală · 25–29,9 = supraponderal · 30–34,9 = obezitate gradul I · 35–39,9 = obezitate gradul II · peste 40 = obezitate gradul III (morbidă). Pragurile sunt valabile pentru adulți peste 18 ani, indiferent de sex." },
      { q: "Este IMC potrivit pentru sportivi?", a: "Nu pe deplin. IMC nu distinge între masă musculară și grasă. Un culturist cu 90 kg și 1,80 m are IMC 27,8 (supraponderal pe scara WHO), dar procentul de grăsime poate fi sub 10%. Pentru sportivi, măsurători complementare sunt: procent grăsime (DEXA, plicometru), circumferința taliei și raportul talie/șold." },
      { q: "Care este greutatea ideală pentru înălțimea mea?", a: "Greutatea ideală corespunde unui IMC între 18,5 și 24,9. Formula: min = 18,5 × înălțime² (m), max = 24,9 × înălțime² (m). Exemplu: la 1,70 m, greutatea ideală = 53,5–72 kg." },
      { q: "Calculatorul este valid pentru copii?", a: "NU. La copii și adolescenți (2–17 ani), IMC se interpretează prin percentile pe baza vârstei și sexului (CDC sau WHO LMS), nu pe pragurile fixe pentru adulți. Pentru pediatrie, consultă medicul pediatru — un calculator IMC pediatric separat va fi disponibil în viitor." },
    ],
    content: {
      howToSteps: [
        { title: "1. Selectează sexul", description: "Pentru context (IMC clasic WHO nu diferențiază pe sex în formulă)." },
        { title: "2. Introdu înălțimea și greutatea", description: "În cm respectiv kg, virgulă sau punct ca separator decimal." },
        { title: "3. Interpretează rezultatul", description: "IMC valoric + categorie WHO + greutate ideală corespunzătoare." },
      ],
      useCases: [
        { icon: "🏥", title: "Screening medical", description: "Evaluare rapidă în cabinetul medicului de familie sau farmacie." },
        { icon: "💪", title: "Plan fitness", description: "Punct de pornire pentru un program de slăbire sau menținere." },
        { icon: "📊", title: "Monitorizare lunară", description: "Urmăriți evoluția greutății în timp pentru a evalua progresul." },
        { icon: "🥗", title: "Consultanță nutrițională", description: "Date inițiale pentru o consultație cu nutriționist autorizat." },
      ],
      aboutSection: {
        title: "Despre IMC și clasificarea OMS",
        paragraphs: [
          "Indicele de Masă Corporală (IMC) a fost dezvoltat de matematicianul belgian Adolphe Quetelet în secolul XIX (sub denumirea de „Quetelet Index”). În 1972, fiziologul Ancel Keys l-a redenumit BMI (Body Mass Index) și l-a propus ca metric pentru studii populaționale. OMS l-a adoptat oficial în 1995 ca instrument de screening al stării nutriționale a adulților.",
          "În România, IMC este folosit de medicii de familie ca indicator inițial pentru evaluarea riscului metabolic. Asociația Română Diabet și Boli Metabolice (ARDBM) îl recomandă în diagnosticarea precoce a obezității, alături de circumferința taliei (peste 102 cm la bărbați / 88 cm la femei = risc cardiometabolic ridicat).",
          "Limitări recunoscute: IMC nu măsoară procentul de grăsime, distribuția adipozității (visceral vs subcutanat), masa musculară sau densitatea osoasă. Pentru o evaluare completă, sunt utile: bioimpedanță (BIA), DEXA, raport talie/șold și analiza compoziției corporale.",
        ],
      },
    },
  },

  "greutate-ideala": {
    introText:
      "Calculator de greutate ideală cu 4 formule științifice paralele: Devine (1974) — standard farmaceutic; Robinson (1983) — actualizare modernă; Miller (1983) — pentru constituții slabe; Hamwi (1964) — referință istorică. Output: 4 valori comparative + media + abaterea standard + intervalul IMC normal pentru înălțimea ta.",
    guide: [
      "1. Selectează sexul — toate cele 4 formule au constante diferite pentru bărbați și femei.",
      "2. Introdu înălțimea în cm.",
      "3. Vezi cele 4 formule afișate paralel + media aritmetică + abatere standard.",
    ],
    faq: [
      { q: "Care formulă de greutate ideală este cea mai precisă?", a: "Nu există un consens absolut. Formula Devine (1974) este cea mai folosită în farmacologie clinică pentru calculul dozelor. Robinson (1983) este o actualizare modernă mai realistă pentru populația contemporană. Miller dă valori mai mici (potrivit pentru constituții slabe), iar Hamwi este referința istorică folosită în dietetică. Cea mai bună abordare: calculează toate 4 și ia media." },
      { q: "Ce constante folosesc cele 4 formule?", a: "Toate convertesc înălțimea în inch peste 5 ft (152,4 cm), apoi: Devine = 50 (B) sau 45,5 (F) + 2,3 × inch · Robinson = 52 / 49 + 1,9 / 1,7 × inch · Miller = 56,2 / 53,1 + 1,41 / 1,36 × inch · Hamwi = 48 / 45,5 + 2,7 / 2,2 × inch." },
      { q: "Cât diferă rezultatele celor 4 formule?", a: "Pentru un bărbat de 1,75 m: Devine ≈ 70,5 kg · Robinson ≈ 68,1 kg · Miller ≈ 68,1 kg · Hamwi ≈ 72,8 kg. Abaterea standard este ~2 kg, deci toate dau valori într-un interval similar. Diferența majoră este la înălțimi mari (peste 1,90 m), unde Hamwi crește mai rapid." },
      { q: "Greutatea ideală depinde de constituția corpului?", a: "Da, parțial. Constituția osoasă și masa musculară pot varia greutatea optimă cu ±10%. O persoană cu oase masive și musculatură dezvoltată va avea o greutate ideală peste valorile formulelor; invers pentru constituții fine. Pentru evaluare exactă: măsurarea circumferinței încheieturii mâinii (sub 16 cm = constituție slabă, 16–18 = medie, peste 18 = robustă)." },
      { q: "De ce formulele folosesc inch și nu cm direct?", a: "Toate cele 4 formule au fost dezvoltate în SUA, unde sistemul imperial (inch, lb) este standard. Conversia internă cm → inch este necesară pentru a păstra constantele originale validate științific. Formula corectă: inch = (cm − 152,4) / 2,54, unde 152,4 cm reprezintă 5 ft." },
    ],
    content: {
      howToSteps: [
        { title: "1. Sex", description: "Bărbat sau femeie — toate cele 4 formule au constante diferite per sex." },
        { title: "2. Înălțime în cm", description: "Conversia internă în inch peste 5 ft se face automat." },
        { title: "3. Comparare", description: "4 cards paralele cu media și abaterea standard a celor 4 valori." },
      ],
      useCases: [
        { icon: "💊", title: "Dozaj medicamente", description: "Formula Devine este standard farmaceutic pentru calculul dozelor în spitale." },
        { icon: "🏋️", title: "Antrenament fizic", description: "Țintă realistă pentru programele de slăbire sau câștig de masă." },
        { icon: "🥗", title: "Plan alimentar", description: "Bază pentru calculul caloriilor zilnice (necesar caloric proporțional cu greutatea ideală)." },
        { icon: "🩺", title: "Evaluare clinică", description: "Screening simplu în cabinetul medicului de familie sau nutriționist." },
      ],
      aboutSection: {
        title: "Despre formulele de greutate ideală",
        paragraphs: [
          "Conceptul de „greutate ideală” a evoluat în ultimele 6 decenii. În anii '60, Hamwi (Universitatea Ohio State) a propus prima formulă liniară simplă pentru utilizare clinică. Devine (1974) a rafinat-o pentru farmacologie, recunoscând că dozajul medicamentelor se calculează mai bine pe greutatea ideală decât pe cea reală (mai ales la pacienți obezi).",
          "Robinson (1983) a actualizat constantele pe baza datelor populaționale moderne, dând valori mai mici și mai realiste decât Hamwi (care tindea să supraestimeze greutatea pentru înălțimi mari). Miller (1983) a propus o variantă pentru constituții slabe, cu coeficienți mai mici.",
          "În practica medicală modernă, „greutatea ideală” este înlocuită treptat de termeni mai utili clinic: greutatea sănătoasă (interval IMC 18,5–24,9) sau greutatea funcțională (cea care permite performanță fizică optimă). Cele 4 formule rămân utile ca punct de pornire în consilierea nutrițională.",
        ],
      },
    },
  },

  "calculator-calorii": {
    introText:
      "Calculator de calorii zilnice cu formula Mifflin-St Jeor (1990) — cea mai precisă pentru populația modernă, conform American Dietetic Association. Calculează BMR (metabolism bazal), TDEE (consum total zilnic) cu 5 niveluri de activitate și sugerează aport pentru 3 obiective: slăbire (TDEE − 500), menținere și masă musculară (TDEE + 300), plus distribuție macro (proteine 2 g/kg, grăsimi 25%, carbohidrați restul) cu donut chart.",
    guide: [
      "1. Selectează sexul — formula Mifflin diferă cu +5 (B) sau −161 (F).",
      "2. Introdu vârsta, înălțimea și greutatea.",
      "3. Alege nivelul de activitate (5 trepte 1.2 → 1.9) și obiectivul (slăbire/menținere/masă).",
    ],
    faq: [
      { q: "Care este formula Mifflin-St Jeor?", a: "BMR (Basal Metabolic Rate) = 10 × greutate(kg) + 6,25 × înălțime(cm) − 5 × vârstă(ani) + 5 (bărbați) sau − 161 (femei). Apoi TDEE = BMR × factor activitate. Mifflin-St Jeor a fost validat în 1990 și este recomandat de Academy of Nutrition and Dietetics ca standard." },
      { q: "Ce diferență e între BMR și TDEE?", a: "BMR (Basal Metabolic Rate) = caloriile pe care le ardezi în repaus complet, doar pentru funcțiile vitale (respirație, circulație, temperatură). TDEE (Total Daily Energy Expenditure) = BMR + activitate (mers, sport, muncă). TDEE este aportul caloric pentru menținerea greutății; BMR este pragul minim teoretic." },
      { q: "Cât trebuie să mănânc ca să slăbesc?", a: "Pentru slăbire sănătoasă, aport zilnic = TDEE − 500 kcal, ceea ce duce la o pierdere de ~0,5 kg/săpt. (un kg de grăsime = 7700 kcal). Sub 1200 kcal/zi nu este recomandat fără supraveghere medicală — riscul de pierdere musculară și carențe nutriționale crește semnificativ." },
      { q: "Care este distribuția macro recomandată?", a: "Acest calculator folosește: proteine 2 g/kg corp (suport pentru masă musculară activă), grăsimi 25% din kcal totale (necesar hormonal), carbohidrați restul (energie pentru creier și sport). Pentru cetogenice / Paleo / sport extrem, raporturile diferă — consultă un nutriționist autorizat." },
      { q: "Mifflin-St Jeor e mai precisă decât Harris-Benedict?", a: "Da. Formula Harris-Benedict (1919) a fost dezvoltată pe o populație mai sedentară și subestimează BMR-ul cu 5–10% pentru populația modernă. Studiile din anii '90 au arătat că Mifflin-St Jeor are o eroare medie de doar 3% versus Harris-Benedict 8%. De aceea este recomandată ca standard în prezent." },
    ],
    content: {
      howToSteps: [
        { title: "1. Sex + date", description: "Sex, vârstă, înălțime, greutate — toate intră în formula Mifflin-St Jeor." },
        { title: "2. Activitate", description: "5 niveluri de la sedentar (×1.2) la extrem (×1.9)." },
        { title: "3. Obiectiv", description: "Slăbire (−500), Menținere (0), Masă musculară (+300) kcal/zi." },
      ],
      useCases: [
        { icon: "📉", title: "Plan slăbire", description: "Deficit moderat 500 kcal/zi pentru pierdere ~0,5 kg/săpt." },
        { icon: "⚖️", title: "Menținere greutate", description: "Aport egal cu TDEE pentru greutate stabilă pe termen lung." },
        { icon: "💪", title: "Masă musculară", description: "Surplus 300 kcal/zi pentru câștig lent, calitativ — minimal grăsime adăugată." },
        { icon: "🏃", title: "Pregătire sportivă", description: "Aport caloric calibrat pentru antrenamente intense." },
      ],
      aboutSection: {
        title: "Despre BMR, TDEE și formula Mifflin-St Jeor",
        paragraphs: [
          "BMR (Basal Metabolic Rate) reprezintă consumul energetic al corpului în repaus complet — caloriile arse pentru a menține respirația, circulația sangvină, temperatura corporală și activitatea cerebrală. Reprezintă 60–75% din TDEE-ul unei persoane sedentare. Factorii care influențează BMR: masa musculară (mai mare → BMR mai mare), vârsta (scade ~2% per decadă după 30 ani), sexul (bărbații au BMR cu ~10% mai mare la aceeași dimensiune corporală).",
          "TDEE (Total Daily Energy Expenditure) include BMR + termogeneza (caloriile arse pentru digestie, ~10% TDEE) + activitatea fizică structurată (sport) + NEAT (Non-Exercise Activity Thermogenesis — mers, fidgeting, gesturi). Factorul de activitate Mifflin variază între 1.2 (sedentar total) și 1.9 (sportiv profesionist + muncă fizică).",
          "Distribuția macro recomandată în acest calculator (P 2 g/kg, F 25%, C restul) este o țintă moderată potrivită pentru oameni cu activitate fizică regulată. Pentru obiective specifice (cetogenic, vegetarian strict, performanță sportivă extremă, recuperare post-operatorie), raporturile trebuie ajustate de un nutriționist autorizat (membru al Asociației Române Nutriționiștilor sau Colegiul Dieteticienilor din România).",
        ],
      },
    },
  },

  "calculator-sarcina": {
    introText:
      "Calculatorul de sarcină estimează data probabilă a nașterii (DPN) folosind regula Naegele: prima zi a ultimei menstruații (UM) + 280 de zile (40 de săptămâni), ajustată pentru lungimea ciclului. Poți calcula alternativ din data concepției (+ 266 de zile). Afișează și săptămâna de sarcină curentă (împlinită + zile), trimestrul și reperele importante. Are caracter strict informativ și NU înlocuiește consultul medical.",
    guide: [
      "1. Alege metoda: «Ultima menstruație» (cea mai uzuală) sau «Data concepției».",
      "2. Introdu data; la modul UM poți ajusta lungimea ciclului (implicit 28 de zile).",
      "3. Vezi instant data probabilă a nașterii, săptămâna de sarcină, trimestrul și zilele rămase.",
    ],
    faq: [
      { q: "Cum se calculează data probabilă a nașterii?", a: "Regula Naegele: DPN = prima zi a ultimei menstruații + 280 de zile (40 de săptămâni). Echivalent, se adaugă 1 an, se scad 3 luni și se adaugă 7 zile. Pentru cicluri diferite de 28 de zile, se ajustează cu diferența (ex. ciclu de 30 de zile → +2 zile). Din data concepției, se adaugă 266 de zile." },
      { q: "În ce săptămână de sarcină sunt?", a: "Săptămâna de sarcină se numără de la prima zi a ultimei menstruații (vârsta gestațională), nu de la concepție. Astfel, în momentul ovulației ești deja „în săptămâna 2”. Calculatorul afișează săptămânile împlinite + zilele (ex. «12 săpt + 3 zile»)." },
      { q: "Cât de exactă este data probabilă a nașterii?", a: "Este o estimare: doar ~4% dintre bebeluși se nasc exact la DPN. Majoritatea nașterilor au loc în intervalul 37–42 de săptămâni. Ecografia de prim trimestru (săpt. 11–13) oferă cea mai precisă datare. Folosește acest calculator orientativ, nu ca dată garantată." },
      { q: "Care sunt cele trei trimestre?", a: "Trimestrul 1: săptămânile 1–13. Trimestrul 2: săptămânile 14–27. Trimestrul 3: săptămânile 28–40 (până la naștere). Fiecare trimestru are repere medicale specifice (ecografii, analize, teste de screening)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Metoda", description: "Ultima menstruație (UM) sau data concepției." },
        { title: "2. Data + ciclu", description: "Date-picker; la UM, lungimea ciclului ajustabilă (20–45 zile)." },
        { title: "3. Rezultat", description: "DPN, săptămâna de sarcină, trimestrul și reperele." },
      ],
      useCases: [
        { icon: "🤰", title: "Urmărirea sarcinii", description: "Vezi rapid în ce săptămână și trimestru te afli." },
        { icon: "📅", title: "Planificare", description: "Estimează data nașterii pentru concediu și pregătiri." },
        { icon: "🩺", title: "Pregătire pentru control", description: "Reper între consultațiile obstetricale." },
        { icon: "👶", title: "Repere de dezvoltare", description: "Anticipează ecografiile și testele importante." },
      ],
      aboutSection: {
        title: "Despre calculul sarcinii și regula Naegele",
        paragraphs: [
          "Regula Naegele, formulată de obstetricianul german Franz Karl Naegele în secolul XIX, este metoda standard de estimare a datei nașterii. Pornește de la prezumția unui ciclu menstrual regulat de 28 de zile cu ovulație în ziua 14. Durata medie a sarcinii numărată de la prima zi a ultimei menstruații este de 280 de zile (40 de săptămâni), deși gestația reală de la concepție este de circa 266 de zile (38 de săptămâni).",
          "Vârsta gestațională se exprimă în săptămâni împlinite plus zile (ex. «28 + 4»). Acest mod de numărare, recomandat de OMS și folosit în obstetrică, explică de ce o femeie este considerată „în săptămâna a 2-a” chiar în momentul concepției. Datarea cea mai precisă se obține prin ecografia de prim trimestru, care poate corecta DPN calculată din ultima menstruație.",
          "Acest calculator are caracter pur informativ. Estimările privind data nașterii, săptămâna și trimestrul nu înlocuiesc evaluarea medicală. Pentru monitorizarea sarcinii, interpretarea analizelor și orice decizie medicală, adresează-te medicului obstetrician sau moașei.",
        ],
      },
    },
  },

  "calculator-alcoolemie": {
    introText:
      "Calculatorul de alcoolemie estimează concentrația de alcool în sânge (g/L, echivalent ‰) cu formula Widmark, pe baza sexului, greutății corporale, băuturilor consumate și timpului scurs. Rezultatul este STRICT ESTIMATIV și depinde de mulți factori individuali (metabolism, alimentație, medicamente). NU este o bază pentru a decide dacă poți conduce — în România, conducerea cu orice alcoolemie este interzisă.",
    guide: [
      "1. Alege sexul și introdu greutatea (kg).",
      "2. Adaugă băuturile consumate (bere, vin, tărie) și orele scurse de la consum.",
      "3. Vezi estimarea alcoolemiei (g/L), vârful teoretic și timpul aproximativ de eliminare.",
    ],
    faq: [
      { q: "Ce este formula Widmark?", a: "Formula Widmark estimează alcoolemia: BAC (g/L) = A / (r × m) − β × t, unde A = gramele de alcool pur, r = factorul de distribuție (≈0,68 la bărbați, 0,55 la femei), m = masa corporală (kg), β = rata de eliminare (~0,15 g/L pe oră), t = orele de la consum." },
      { q: "Cât de exactă este estimarea?", a: "Este doar o aproximare. Valoarea reală poate diferi semnificativ în funcție de metabolism, dacă ai mâncat, medicamente, starea ficatului, ritmul consumului și alți factori. Singura măsură exactă o dă etilotestul/analiza de sânge." },
      { q: "Cât durează să se elimine alcoolul?", a: "Organismul elimină în medie ~0,15 g/L pe oră (interval 0,1–0,2). De exemplu, o alcoolemie de 0,6 g/L scade la 0 în aproximativ 4 ore. Nu există metodă reală de a „grăbi” eliminarea (cafeaua, dușul rece etc. nu ajută)." },
      { q: "Care este limita legală la volan în România?", a: "Conducerea cu o alcoolemie de până la 0,8 g/L este contravenție, iar peste 0,8 g/L este infracțiune (Codul Rutier). Practic, singura variantă sigură și legală pentru a conduce este 0,00 g/L." },
    ],
    content: {
      howToSteps: [
        { title: "1. Sex + greutate", description: "Intră în factorul de distribuție Widmark." },
        { title: "2. Băuturi + timp", description: "Bere/vin/tărie și orele scurse de la consum." },
        { title: "3. Estimare", description: "Alcoolemie acum, vârf teoretic și timp de eliminare." },
      ],
      useCases: [
        { icon: "📚", title: "Educație", description: "Înțelegerea modului în care alcoolul este eliminat în timp." },
        { icon: "⏱️", title: "Estimare orientativă", description: "Cât timp ar putea dura eliminarea, ca informație generală." },
        { icon: "🧪", title: "Curiozitate științifică", description: "Aplicarea formulei Widmark pe date proprii." },
        { icon: "⚠️", title: "Conștientizare", description: "Cât de repede crește alcoolemia după câteva băuturi." },
      ],
      aboutSection: {
        title: "Despre alcoolemie și formula Widmark",
        paragraphs: [
          "Alcoolemia (concentrația de alcool în sânge) se exprimă în România în grame de alcool pur per litru de sânge (g/L), echivalent cu promile (‰). Formula Widmark, dezvoltată de cercetătorul suedez Erik Widmark în anii 1920, rămâne baza estimărilor: alcoolemia depinde de cantitatea de alcool consumată, de masa corporală și de factorul de distribuție care diferă între bărbați și femei (din cauza proporției diferite de apă din organism).",
          "Eliminarea alcoolului se face aproape liniar, cu o rată medie de 0,15 g/L pe oră, prin metabolizare hepatică. Niciun „truc” (cafea, duș rece, mâncare după consum) nu accelerează acest proces. Important: această estimare nu poate fi folosită ca dovadă sau ca temei pentru a conduce. În România, conducerea unui vehicul cu orice nivel de alcoolemie este interzisă, iar peste 0,8 g/L constituie infracțiune.",
        ],
      },
    },
  },

  "puls-zone-antrenament": {
    introText:
      "Calculatorul de puls determină pulsul maxim (formula clasică 220 − vârstă și formula mai precisă Tanaka) și cele 5 zone de antrenament prin metoda Karvonen, folosind pulsul de repaus. Fiecare zonă (încălzire, ardere grăsimi, aerob, anaerob, maxim) are un interval de bătăi pe minut adaptat la tine. Util pentru alergare, ciclism și fitness.",
    guide: [
      "1. Introdu vârsta.",
      "2. Opțional, adaugă pulsul de repaus (măsurat dimineața) pentru zone calculate prin metoda Karvonen, mai exactă.",
      "3. Vezi pulsul maxim și intervalele (bpm) ale celor 5 zone de antrenament.",
    ],
    faq: [
      { q: "Cum se calculează pulsul maxim?", a: "Formula clasică este 220 − vârstă. O formulă mai precisă pentru populația generală este Tanaka: 208 − 0,7 × vârstă. De exemplu, la 30 de ani: clasic 190 bpm, Tanaka 187 bpm." },
      { q: "Ce este metoda Karvonen?", a: "Metoda Karvonen folosește rezerva de puls (RP = puls maxim − puls de repaus) pentru zone personalizate: puls țintă = RP × intensitate% + puls de repaus. Este mai exactă decât simplul procent din pulsul maxim, deoarece ține cont de condiția ta fizică." },
      { q: "Care zonă arde cel mai mult grăsime?", a: "Zona 2 (60–70%) este numită „zona de ardere a grăsimilor”, deoarece la intensitate moderată organismul folosește un procent mai mare de grăsimi ca sursă de energie. Pentru consum caloric total mai mare, zonele superioare ard mai multe calorii absolute." },
      { q: "Cum îmi măsor pulsul de repaus?", a: "Măsoară-ți pulsul dimineața, imediat după trezire, înainte de a te ridica din pat, timp de 60 de secunde. Un puls de repaus tipic este 60–80 bpm; la sportivi poate fi 40–60 bpm." },
    ],
    content: {
      howToSteps: [
        { title: "1. Vârsta", description: "Determină pulsul maxim (220 − vârstă și Tanaka)." },
        { title: "2. Puls de repaus", description: "Opțional, pentru zone Karvonen personalizate." },
        { title: "3. Zonele", description: "5 intervale de antrenament în bpm." },
      ],
      useCases: [
        { icon: "🏃", title: "Alergare", description: "Antrenament pe zone pentru rezistență și viteză." },
        { icon: "🚴", title: "Ciclism", description: "Controlul intensității pe baza pulsului." },
        { icon: "🔥", title: "Ardere grăsimi", description: "Menținerea în zona 2 pentru consum optim de grăsimi." },
        { icon: "❤️", title: "Sănătate cardio", description: "Antrenament aerob în siguranță, evitând suprasolicitarea." },
      ],
      aboutSection: {
        title: "Despre pulsul maxim și zonele de antrenament",
        paragraphs: [
          "Pulsul maxim este cea mai mare frecvență cardiacă pe care o poate atinge inima în efort. Formula clasică 220 − vârstă este simplă, dar are o eroare relativ mare; formula Tanaka (208 − 0,7 × vârstă), validată în 2001, este mai exactă pentru populația generală. Cea mai precisă valoare se obține printr-un test de efort supravegheat medical.",
          "Antrenamentul pe zone de puls permite dozarea corectă a efortului: zonele joase (1–2) dezvoltă rezistența de bază și ard grăsimi, zonele medii (3) îmbunătățesc capacitatea aerobă, iar zonele înalte (4–5) cresc viteza și pragul anaerob. Metoda Karvonen personalizează aceste intervale folosind pulsul de repaus, oferind ținte mai relevante decât simplul procent din pulsul maxim.",
        ],
      },
    },
  },
};
