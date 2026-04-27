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
};
