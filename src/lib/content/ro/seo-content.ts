import type { ContentMap } from "../types.ts";

// ═══ SEO – RO content (instrumente comune HU+RO) ══════════════════════════════
export const SEO_RO_CONTENT: ContentMap = {
  // ─── Generator meta tag ─────────────────────────────────────────────────────
  "meta-tag-generator": {
    introText:
      "Generatorul de meta tag-uri asamblează într-un singur loc cele mai importante meta tag-uri din secțiunea <head> a unei pagini web: titlul paginii (title), meta descrierea (description), URL-ul canonical, instrucțiunea de indexare robots, autorul, cuvintele cheie și culoarea theme-color. Completează câmpurile, iar codul HTML gata de folosit apare instantaneu în dreapta, gata de copiat cu un clic. Lângă title și description, un contor live îți arată dacă lungimea încape în spațiul afișat de motoarele de căutare. Totul rulează în browserul tău – nicio dată nu ajunge pe server.",
    guide: [
      "1. Scrie titlul paginii (title) și meta descrierea – contorul îți spune dacă lungimea este ideală.",
      "2. Adaugă URL-ul canonical pentru a evita problema conținutului duplicat.",
      "3. Alege regula de indexare robots (implicit index, follow) și completează câmpurile opționale.",
      "4. Copiază meta tag-urile generate și inserează-le în secțiunea <head> a paginii tale.",
    ],
    faq: [
      { q: "Ce este un meta tag și de ce contează?", a: "Meta tag-urile sunt elemente plasate în secțiunea <head> a paginii HTML, care oferă informații despre pagină motoarelor de căutare și browserelor. Title-ul și meta descrierea apar direct în rezultatele căutării, deci influențează puternic rata de clic; tag-urile canonical și robots controlează modul în care este indexată pagina." },
      { q: "Cât de lungi ar trebui să fie title și description?", a: "Google afișează de obicei un title de 50–60 de caractere și o meta descriere de 150–160 de caractere, restul fiind trunchiat. Contorul live al instrumentului marchează cu verde intervalul ideal, cu galben cazul limită și cu roșu textul prea lung." },
      { q: "La ce folosește URL-ul canonical?", a: "Tag-ul canonical le spune motoarelor de căutare care este versiunea oficială, principală a paginii. Este util când același conținut e disponibil pe mai multe URL-uri (de exemplu cu parametri, cu și fără www) – astfel eviți ca motoarele să îl trateze drept conținut duplicat." },
      { q: "Ce înseamnă valorile robots?", a: "„index” permite motorului să includă pagina în rezultate, „noindex” interzice acest lucru; „follow” permite urmărirea linkurilor, „nofollow” o interzice. Cea mai frecventă setare este „index, follow”, potrivită paginilor normale, publice." },
      { q: "Mai sunt necesare meta keywords?", a: "Tag-ul meta keywords este ignorat de Google ca factor de clasare de mulți ani, deci nu este obligatoriu. Unele motoare mai mici sau sisteme interne îl pot folosi, de aceea instrumentul îl oferă opțional, dar îl poți lăsa gol." },
      { q: "Datele introduse ajung pe vreun server?", a: "Nu. Întreaga generare rulează în browserul tău, prin JavaScript. Nici titlurile, nici URL-urile, nici alte date nu părăsesc dispozitivul – nimic nu este încărcat sau salvat." },
    ],
    content: {
      howToSteps: [
        { title: "1. Titlu și descriere", description: "Completează câmpurile title și meta description; contorul de caractere îți arată imediat dacă lungimea încape în spațiul afișat de motoarele de căutare." },
        { title: "2. Canonical și robots", description: "Adaugă URL-ul canonical al paginii și alege regula de indexare potrivită din meniul derulant." },
        { title: "3. Câmpuri suplimentare", description: "După nevoie, completează autorul, limba, cuvintele cheie sau culoarea theme-color – doar câmpurile completate ajung în rezultat." },
        { title: "4. Copiere și inserare", description: "Copiezi meta tag-urile gata făcute cu un clic și le inserezi în secțiunea <head> a paginii tale." },
      ],
      useCases: [
        { icon: "🌐", title: "Lansarea unei pagini noi", description: "Pentru o pagină statică sau un landing page, asamblezi rapid blocul complet și corect de meta tag-uri, fără a scrie cod manual." },
        { icon: "🔍", title: "Optimizare SEO", description: "Ajustarea title-ului și a descrierii afișate în rezultate, respectând lungimea corectă de caractere." },
        { icon: "📱", title: "Integrare cu browserul", description: "Meta tag-urile theme-color și viewport ajută la afișarea pe mobil și la colorarea interfeței browserului." },
        { icon: "🧑‍💻", title: "Șablon pentru dezvoltatori", description: "Generarea unui bloc de meta de pornire pentru șabloane CMS, sisteme de template-uri sau documentație." },
      ],
      formatComparison: {
        title: "Cele mai frecvente meta tag-uri",
        columns: ["Tag", "La ce folosește"],
        rows: [
          { feature: "title", values: ["Titlul paginii – linkul albastru din rezultat și eticheta filei de browser"] },
          { feature: "meta description", values: ["Rezumat scurt sub titlu, în rezultatul căutării"] },
          { feature: "link canonical", values: ["URL-ul principal al paginii, împotriva conținutului duplicat"] },
          { feature: "meta robots", values: ["Regula de indexare și urmărire (index/noindex, follow/nofollow)"] },
          { feature: "meta viewport", values: ["Afișare responsivă pe dispozitive mobile"] },
          { feature: "meta theme-color", values: ["Culoarea interfeței browserului pe mobil"] },
        ],
      },
      aboutSection: {
        title: "Meta tag-urile și optimizarea pentru motoarele de căutare",
        paragraphs: [
          "Meta tag-urile nu apar pe pagina în sine, dar sunt determinante: din ele află motorul de căutare despre ce este vorba în pagină și pe baza lor compune fragmentul afișat în lista de rezultate. Title-ul și meta descrierea sunt cele două elemente pe care utilizatorul le vede în motor înainte de a da clic – de aceea formularea lor bună crește direct rata de clic.",
          "Lungimea ideală a title-ului este de 50–60 de caractere, iar a meta descrierii de 150–160 de caractere. Dacă sunt mai lungi, Google le trunchiază, iar textul se poate întrerupe la mijlocul propoziției. Contorul live al instrumentului ajută exact la evitarea acestui lucru: codul de culoare arată imediat dacă textul încă încape în intervalul sigur.",
          "Tag-urile canonical și robots țin de SEO-ul tehnic. Canonical previne problema conținutului duplicat desemnând URL-ul oficial al paginii; tag-ul robots reglează dacă motorul indexează pagina și dacă urmărește linkurile de pe ea. Setarea lor corectă este adesea mai importantă decât orice element de conținut vizibil.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "Pune cel mai important cuvânt cheie la începutul title-ului – atât motoarele, cât și utilizatorii citesc mai întâi începutul textului." },
        { icon: "✍️", tip: "Meta descrierea nu trebuie să fie o înșiruire de cuvinte cheie, ci o propoziție atrăgătoare, care îndeamnă la acțiune – ea decide dacă se dă clic." },
        { icon: "🔗", tip: "Pentru URL-ul canonical dă întotdeauna adresa absolută, completă (https://…), nu o cale relativă." },
        { icon: "🚫", tip: "Folosește setarea „noindex” doar când chiar vrei să excluzi pagina din motor – de exemplu pentru pagini interne, de test sau de mulțumire." },
      ],
    },
  },

  // ─── Generator Open Graph ───────────────────────────────────────────────────
  "open-graph-generator": {
    introText:
      "Generatorul Open Graph asamblează meta tag-urile care stabilesc cum arată pagina ta atunci când este partajată pe Facebook, LinkedIn sau alte platforme sociale. Introduci titlul, descrierea, URL-ul paginii și imaginea de partajare, iar instrumentul îți arată instantaneu previzualizarea live a cardului și generează tag-urile og: gata de inserat. Astfel nu apare un fragment de text la întâmplare și o imagine nepotrivită, ci exact ce vrei tu. Totul rulează în browser, fără încărcare.",
    guide: [
      "1. Scrie titlul og:title și descrierea og:description.",
      "2. Adaugă URL-ul paginii (og:url) și adresa imaginii de partajare (og:image).",
      "3. Alege tipul (og:type) și verifică previzualizarea live Facebook/LinkedIn.",
      "4. Copiază tag-urile og: generate și inserează-le în secțiunea <head> a paginii.",
    ],
    faq: [
      { q: "Ce este Open Graph?", a: "Open Graph este un protocol introdus de Facebook care descrie prin meta tag-uri cum să apară o pagină la partajare: cu ce titlu, descriere și imagine. Azi majoritatea platformelor sociale (LinkedIn, WhatsApp, Slack, Discord) citesc aceste tag-uri." },
      { q: "Ce dimensiune trebuie să aibă og:image?", a: "Dimensiunea recomandată este 1200 × 630 pixeli (raport 1.91:1), care apare ca un card mare. Minimul este 200 × 200 pixeli, dar imaginile mici apar doar ca miniaturi. Imaginea trebuie să fie accesibilă public, cu URL complet." },
      { q: "De ce nu se actualizează imaginea la partajare?", a: "Platformele sociale rețin (cache) datele Open Graph. Dacă ai modificat imaginea sau textul, poți forța recitirea cu Facebook Sharing Debugger sau LinkedIn Post Inspector." },
      { q: "Este nevoie și de Twitter Card?", a: "X (Twitter) caută mai întâi propriile tag-uri twitter:, dar dacă acestea lipsesc, revine la tag-urile Open Graph. Pentru cea mai bună afișare merită să le dai pe amândouă – avem un generator separat de Twitter Card." },
      { q: "og:url trebuie să fie URL-ul canonical?", a: "Da, este recomandat să dai URL-ul oficial, canonical al paginii. Astfel toate partajările atribuie aprecierile aceluiași URL, indiferent de linkul cu parametri de pe care s-a partajat." },
      { q: "Datele ajung pe vreun server?", a: "Nu. Generarea tag-urilor și previzualizarea rulează în întregime în browserul tău – nicio dată sau imagine nu este încărcată." },
    ],
    content: {
      howToSteps: [
        { title: "1. Titlu și descriere", description: "Completează og:title și og:description – acestea apar pe cardul de partajare." },
        { title: "2. URL și imagine", description: "Adaugă og:url al paginii și URL-ul complet al imaginii og:image." },
        { title: "3. Tip și previzualizare", description: "Alege tipul og:type și verifică previzualizarea live Facebook/LinkedIn." },
        { title: "4. Copiere", description: "Copiezi tag-urile og: generate și le inserezi în secțiunea <head>." },
      ],
      useCases: [
        { icon: "📰", title: "Blog și articol", description: "La partajarea articolelor, titlul, descrierea și imaginea corecte cresc semnificativ rata de clic." },
        { icon: "🛍️", title: "Pagină de produs", description: "În magazin, numele produsului și imaginea creează un card de partajare atrăgător în social media." },
        { icon: "🚀", title: "Landing page", description: "La paginile de campanie, un card OG bine scris influențează direct performanța reclamei și a partajării." },
        { icon: "🔗", title: "Previzualizare link", description: "Și la linkurile lipite în WhatsApp, Slack, Discord, tag-urile OG dau previzualizarea frumoasă." },
      ],
      formatComparison: {
        title: "Cele mai frecvente tag-uri Open Graph",
        columns: ["Tag", "Rolul"],
        rows: [
          { feature: "og:title", values: ["Titlul cardului de partajare (bold)"] },
          { feature: "og:description", values: ["Descriere scurtă sub titlu"] },
          { feature: "og:image", values: ["Imaginea cardului (1200×630 px recomandat)"] },
          { feature: "og:url", values: ["URL-ul oficial al paginii"] },
          { feature: "og:type", values: ["Tipul conținutului (website, article…)"] },
          { feature: "og:site_name", values: ["Numele site-ului"] },
        ],
      },
      aboutSection: {
        title: "De ce este important Open Graph?",
        paragraphs: [
          "Când cineva partajează un link pe social media, platforma nu afișează tot conținutul paginii, ci un card: o imagine, un titlu și o descriere scurtă. Fără tag-uri Open Graph, platforma alege la întâmplare o imagine și un fragment de text de pe pagină – rezultatul e adesea urât, înșelător sau gol. Cu tag-urile OG stabilești exact ce vede utilizatorul.",
          "Acest lucru influențează direct rata de clic. Un titlu atrăgător și o imagine de calitate, relevantă, pot multiplica numărul de clicuri pe linkul partajat, comparativ cu o previzualizare seacă sau incompletă. Pentru site-urile care trăiesc din trafic social, aceasta este una dintre cele mai rentabile ajustări tehnice.",
          "Protocolul Open Graph a fost introdus de Facebook, dar a devenit practic un standard: LinkedIn, WhatsApp, Slack, Discord, Telegram și multe alte aplicații citesc aceste tag-uri pentru previzualizarea linkului. Un singur bloc OG bine scris îmbunătățește deci afișarea pe toate platformele.",
        ],
      },
      tips: [
        { icon: "🖼️", tip: "Folosește mereu o imagine de 1200×630 px – umple cardul mare și rămâne clară pe ecrane retina." },
        { icon: "🔗", tip: "og:image trebuie să fie mereu un URL absolut, accesibil public, nu o cale relativă." },
        { icon: "🔄", tip: "După schimbarea imaginii sau textului, rulează Facebook Sharing Debugger ca să se actualizeze cache-ul." },
        { icon: "✅", tip: "Dă toate cele patru elemente de bază (title, description, url, image) – fără ele cardul e incomplet." },
      ],
    },
  },

  // ─── Generator Twitter Card ─────────────────────────────────────────────────
  "twitter-card-generator": {
    introText:
      "Generatorul de Twitter Card asamblează meta tag-urile care stabilesc cum apare pagina ta atunci când un link este partajat pe X (fostul Twitter). Poți alege tipul cardului (imagine mare sau rezumat), poți adăuga titlul, descrierea, imaginea și conturile, iar instrumentul îți arată instantaneu previzualizarea live a cardului și tag-urile twitter: gata de inserat. Totul se întâmplă în browserul tău, fără încărcare.",
    guide: [
      "1. Alege tipul cardului: summary_large_image (imagine mare) sau summary (imagine mică).",
      "2. Scrie titlul twitter:title și descrierea twitter:description.",
      "3. Adaugă URL-ul imaginii și, opțional, conturile @ (site, creator).",
      "4. Copiază tag-urile twitter: generate și inserează-le în secțiunea <head> a paginii.",
    ],
    faq: [
      { q: "Care e diferența între tipurile de card?", a: "summary_large_image afișează o imagine mare, lată, deasupra titlului și descrierii – cel mai popular. summary afișează o miniatură mai mică, pătrată, lângă text. Pentru articole și conținut vizual este recomandat cardul cu imagine mare." },
      { q: "Am nevoie de Twitter Card dacă am deja Open Graph?", a: "X recunoaște și tag-urile Open Graph, deci partajarea funcționează și fără tag-urile twitter:. Cu propriile tag-uri twitter: controlezi însă mai precis tipul cardului și atribuirea autorului, deci merită să le adaugi." },
      { q: "Ce dimensiune trebuie să aibă twitter:image?", a: "Pentru cardul summary_large_image se recomandă minimum 300×157 px, ideal 1200×628 px, raport 2:1. Pentru cardul summary este nevoie de o imagine pătrată, minimum 144×144 px. Imaginea nu poate depăși 5 MB." },
      { q: "La ce folosesc twitter:site și twitter:creator?", a: "twitter:site este contul X al site-ului care publică (@site), iar twitter:creator este contul autorului concret (@autor). Acestea pot apărea pe card și ajută la identificarea brandului și a autorului." },
      { q: "Este obligatoriu semnul @ la nume?", a: "Formatul corect începe cu @. Instrumentul adaugă automat semnul @ dacă a fost omis, deci nu trebuie să te preocupe separat." },
      { q: "Datele ajung pe vreun server?", a: "Nu. Asamblarea cardului și previzualizarea rulează în întregime în browserul tău – nicio dată nu este încărcată." },
    ],
    content: {
      howToSteps: [
        { title: "1. Tipul cardului", description: "Alege tipul summary_large_image (imagine mare) sau summary (imagine mică)." },
        { title: "2. Text și imagine", description: "Completează titlul, descrierea și URL-ul imaginii – previzualizarea se actualizează instant." },
        { title: "3. Conturi", description: "Adaugă opțional conturile @ ale site-ului și autorului pentru atribuire." },
        { title: "4. Copiere", description: "Copiezi tag-urile twitter: și le inserezi în secțiunea <head>." },
      ],
      useCases: [
        { icon: "📰", title: "Partajarea unui articol", description: "Cu un card cu imagine mare, postările de blog sunt mult mai vizibile în cronologia X." },
        { icon: "🏢", title: "Prezența brandului", description: "Cu contul twitter:site, fiecare partajare se leagă de brandul tău, întărind recunoașterea." },
        { icon: "✍️", title: "Atribuirea autorului", description: "twitter:creator arată cine a scris conținutul, construind profilul de expert." },
        { icon: "📣", title: "Campanii", description: "La reclame și promoții, un card bine setat crește rata de clic." },
      ],
      formatComparison: {
        title: "Tag-urile Twitter Card",
        columns: ["Tag", "Rolul"],
        rows: [
          { feature: "twitter:card", values: ["Tipul cardului (summary / summary_large_image)"] },
          { feature: "twitter:title", values: ["Titlul cardului"] },
          { feature: "twitter:description", values: ["Descriere scurtă"] },
          { feature: "twitter:image", values: ["Imaginea cardului"] },
          { feature: "twitter:site", values: ["Contul X al site-ului (@)"] },
          { feature: "twitter:creator", values: ["Contul X al autorului (@)"] },
        ],
      },
      aboutSection: {
        title: "Twitter Cards pe scurt",
        paragraphs: [
          "Twitter Cards este sistemul X (Twitter) prin care un link partajat nu este doar un URL simplu, ci apare ca un card bogat, vizual: cu imagine, titlu și descriere. Fără tag-urile potrivite, linkul apare ca un text simplu, fără imagine și context, ceea ce este mult mai puțin atrăgător și mai greu de dat clic.",
          "X preferă propriile tag-uri din spațiul de nume twitter:, dar dacă acestea lipsesc, revine la tag-urile Open Graph. În practică, cea mai bună strategie este să dai ambele seturi: Open Graph acoperă Facebook, LinkedIn și majoritatea celorlalte platforme, iar tag-urile twitter: dau control precis pe X asupra tipului de card și a autorului.",
        ],
      },
      tips: [
        { icon: "🖼️", tip: "Pentru cardul cu imagine mare folosește o imagine de 1200×628 px, raport 2:1, pentru cea mai bună afișare." },
        { icon: "🔗", tip: "URL-ul imaginii trebuie să fie absolut și accesibil public, pe HTTPS." },
        { icon: "🤝", tip: "Adaugă și tag-urile Open Graph – astfel partajarea va arăta bine pe toate platformele." },
        { icon: "🔍", tip: "Înainte de publicare, verifică cardul cu propriul Card Validator al X." },
      ],
    },
  },

  // ─── Generator Schema FAQ (JSON-LD) ─────────────────────────────────────────
  "faq-schema-generator": {
    introText:
      "Generatorul de Schema FAQ creează date structurate JSON-LD de tip FAQPage, conform standardului schema.org, din perechi de întrebări și răspunsuri frecvente. Inserate în pagină, acestea permit Google și altor motoare să înțeleagă întrebările tale și chiar să le afișeze direct în rezultate, ca întrebări care se pot deschide. Adaugi întrebările și răspunsurile, iar instrumentul generează instantaneu codul JSON-LD valid, gata de copiat. Totul rulează în browserul tău, fără încărcare.",
    guide: [
      "1. Scrie prima întrebare și răspunsul aferent.",
      "2. Cu butonul «Adaugă întrebare» adaugi câte perechi dorești.",
      "3. Verifică codul JSON-LD care se actualizează live; încadrarea cu tag <script> se poate porni/opri.",
      "4. Copiază codul și inserează-l în HTML-ul paginii, acolo unde conținutul FAQ este și vizibil.",
    ],
    faq: [
      { q: "Ce este Schema FAQ?", a: "Schema FAQ (FAQPage) este un format de date structurate conform schema.org care le spune motoarelor de căutare că pe pagină se află perechi întrebare–răspuns. Pe baza ei, Google poate afișa un rezultat îmbogățit (rich result), cu întrebări care se pot deschide." },
      { q: "De ce în format JSON-LD?", a: "Google recomandă formatul JSON-LD pentru date structurate, deoarece se plasează separat de conținutul vizibil, într-un bloc <script>, și se întreține ușor. De aceea acest instrument generează JSON-LD." },
      { q: "Conținutul trebuie să apară și pe pagină?", a: "Da. Conform ghidurilor Google, întrebările și răspunsurile din datele structurate trebuie să apară și vizibil pe pagină, exact în aceeași formă. Nu genera o schemă FAQ fără un echivalent vizibil." },
      { q: "Câte întrebări pot adăuga?", a: "Tehnic nu există o limită dură, dar buna practică este de 3–10 întrebări relevante. Prea multe întrebări artificiale dăunează; concentrează-te pe întrebările reale ale utilizatorilor." },
      { q: "Unde inserez codul?", a: "Blocul generat <script type=\"application/ld+json\"> poate fi inserat în secțiunea <head> sau <body> a paginii. Poziția nu afectează funcționarea, atâta timp cât apare o singură dată pe pagină." },
      { q: "Datele ajung pe vreun server?", a: "Nu. Generarea JSON-LD are loc în întregime în browserul tău – întrebările și răspunsurile tale nu părăsesc dispozitivul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Întrebare–răspuns", description: "Completează prima pereche întrebare-răspuns în formularul din stânga." },
        { title: "2. Perechi suplimentare", description: "Adaugă câte întrebări sunt necesare; contorul arată câte sunt valide." },
        { title: "3. Format", description: "Alege dacă e nevoie de încadrarea cu tag <script> și verifică JSON-LD-ul live." },
        { title: "4. Inserare", description: "Copiază codul în HTML-ul paginii, acolo unde FAQ apare și vizibil." },
      ],
      useCases: [
        { icon: "🛒", title: "Magazin online", description: "Întrebări de livrare, plată și garanție ca date structurate, pentru un rezultat Google mai bogat." },
        { icon: "🏢", title: "Pagină de servicii", description: "Întrebări despre prețuri și proces, care pot apărea direct în motorul de căutare." },
        { icon: "📚", title: "Bază de cunoștințe", description: "Structurarea paginilor de ajutor și FAQ, ca să le înțeleagă motoarele și asistenții AI." },
        { icon: "🤖", title: "Vizibilitate AI", description: "Structura clară întrebare–răspuns ajută motoarele AI să îți citeze conținutul." },
      ],
      formatComparison: {
        title: "Structura schemei FAQPage",
        columns: ["Element", "Rolul"],
        rows: [
          { feature: "@type: FAQPage", values: ["Semnalează că pagina conține un FAQ"] },
          { feature: "mainEntity", values: ["Lista întrebărilor"] },
          { feature: "Question / name", values: ["Textul unei întrebări"] },
          { feature: "acceptedAnswer / text", values: ["Răspunsul la întrebare"] },
        ],
      },
      aboutSection: {
        title: "Datele structurate și rezultatele îmbogățite",
        paragraphs: [
          "Datele structurate sunt un strat destinat citirii automate, care clarifică pentru motoarele de căutare sensul conținutului. Tipul FAQPage comunică concret că pe pagină există perechi întrebare–răspuns. Pe baza lor, Google poate afișa un rezultat mai bogat decât linkul albastru obișnuit: întrebările se pot deschide direct în pagina de căutare, ocupă mai mult spațiu și pot aduce mai multe clicuri.",
          "JSON-LD este formatul recomandat de Google, deoarece se plasează independent de HTML-ul vizibil, într-un singur bloc script, și nu afectează aspectul paginii. O regulă importantă este însă că întrebările și răspunsurile din datele structurate trebuie să apară și vizibil pe pagină – conținutul ascuns sau existent doar în schemă contravine ghidurilor Google.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "Concentrează-te pe întrebări reale ale utilizatorilor – nu genera întrebări artificiale, cu aglomerare de cuvinte cheie." },
        { icon: "👁️", tip: "Textul din schemă trebuie să coincidă cu conținutul FAQ vizibil – este condiția Google." },
        { icon: "🔢", tip: "3–10 întrebări concise, bine formulate, sunt de regulă cele mai eficiente." },
        { icon: "🧪", tip: "După inserare, verifică codul cu Google Rich Results Test." },
      ],
    },
  },

  // ─── Generator robots.txt ───────────────────────────────────────────────────
  "robots-txt-generator": {
    introText:
      "Generatorul de robots.txt asamblează, cu ajutorul unui asistent, fișierul robots.txt al site-ului tău, care le spune roboților motoarelor de căutare ce părți pot parcurge și ce nu. Poți seta user-agent-ul, căile interzise (Disallow) și permise (Allow), valoarea crawl-delay și adresa sitemap-ului, ba chiar poți bloca boții AI cu un clic. Instrumentul îți arată instant fișierul gata făcut, pe care îl poți copia sau descărca. Totul rulează în browserul tău.",
    guide: [
      "1. Alege un șablon rapid (tot permis, WordPress, fără indexare) sau setează manual.",
      "2. Adaugă căile interzise (Disallow) și, după nevoie, cele permise (Allow).",
      "3. Scrie URL-ul sitemap și, opțional, valoarea crawl-delay; activează blocarea boților AI dacă vrei.",
      "4. Copiază sau descarcă fișierul robots.txt și pune-l în rădăcina site-ului.",
    ],
    faq: [
      { q: "Ce este robots.txt?", a: "robots.txt este un fișier text simplu din rădăcina site-ului (exemplu.ro/robots.txt) care le dă instrucțiuni roboților de căutare: ce căi pot parcurge și pe care nu. Majoritatea roboților serioși (Googlebot, Bingbot) îl respectă." },
      { q: "robots.txt protejează paginile confidențiale?", a: "Nu. robots.txt este doar o cerere, nu o restricție de acces. URL-urile interzise rămân accesibile dacă cineva le știe adresa, iar boții rău intenționați le pot ignora. Protejează conținutul confidențial cu parolă sau protecție pe server." },
      { q: "Care e diferența dintre Disallow și noindex?", a: "Disallow împiedică parcurgerea, dar pagina interzisă poate apărea totuși în rezultate (ca URL). Meta tag-ul noindex, în schimb, exclude explicit din indexare. Important: dacă interzici o pagină cu Disallow, Google nu vede nici măcar noindex-ul de pe ea." },
      { q: "Trebuie să blochez boții AI?", a: "Este o decizie personală. Dacă nu vrei ca modelele AI sau motoarele AI să folosească conținutul tău, poți bloca boții GPTBot, CCBot, Google-Extended și alții. Dacă vrei vizibilitate în motoarele AI, lasă-i permiși." },
      { q: "Unde se pune fișierul robots.txt?", a: "Întotdeauna în rădăcina site-ului, exact cu numele „robots.txt”: exemplu.ro/robots.txt. Fiecare subdomeniu are nevoie de fișier separat. Plasat într-un subdirector (exemplu.ro/folder/robots.txt) nu este valid." },
      { q: "Datele ajung pe vreun server?", a: "Nu. Asamblarea fișierului are loc în întregime în browserul tău – nimic nu este încărcat." },
    ],
    content: {
      howToSteps: [
        { title: "1. Șablon sau manual", description: "Pornește de la un șablon rapid sau setează user-agent-ul și regulile manual." },
        { title: "2. Căi", description: "Adaugă căile Disallow (interzise) și Allow (permise) în liste." },
        { title: "3. Sitemap și boți", description: "Scrie URL-ul sitemap și, după nevoie, activează blocarea boților AI." },
        { title: "4. Salvare", description: "Copiază sau descarcă fișierul și pune-l în rădăcina site-ului cu numele robots.txt." },
      ],
      useCases: [
        { icon: "🔒", title: "Ascunderea adminului", description: "Excluderea paginilor interne, de admin sau de coș din parcurgerea motoarelor." },
        { icon: "🗺️", title: "Semnalarea sitemap", description: "Indicarea URL-ului sitemap ajută motoarele să găsească toate paginile importante." },
        { icon: "🤖", title: "Gestionarea boților AI", description: "Decizia dacă crawlerele AI pot folosi conținutul tău, cu un singur clic." },
        { icon: "⚙️", title: "Configurare WordPress", description: "Șablon gata făcut pentru gestionarea corectă a folderelor tipice WordPress." },
      ],
      formatComparison: {
        title: "Principalele directive robots.txt",
        columns: ["Directivă", "Semnificație"],
        rows: [
          { feature: "User-agent", values: ["Pentru care robot se aplică regulile"] },
          { feature: "Disallow", values: ["Nu parcurge această cale"] },
          { feature: "Allow", values: ["Poate parcurge această cale (excepție)"] },
          { feature: "Crawl-delay", values: ["Așteptare între cereri (sec)"] },
          { feature: "Sitemap", values: ["URL-ul complet al sitemap.xml"] },
        ],
      },
      aboutSection: {
        title: "Cum funcționează robots.txt?",
        paragraphs: [
          "robots.txt este o înțelegere de curtoazie între site și roboții motoarelor de căutare. Când un robot vizitează un site, cere mai întâi fișierul robots.txt din rădăcină și verifică ce căi poate parcurge. Fișierul este format din blocuri user-agent: fiecare bloc spune ce reguli Disallow și Allow se aplică unui robot anume (sau tuturor, cu semnul *).",
          "Este important să îi înțelegi limitele. robots.txt nu este un instrument de securitate: este doar o cerere, pe care roboții binevoitori o respectă, dar care nu impune nimic. URL-urile interzise rămân accesibile public, deci conținutul sensibil nu trebuie protejat niciodată doar cu el. În plus, Disallow împiedică parcurgerea, dar nu neapărat indexarea – pentru asta există meta tag-ul noindex.",
          "Webul modern a adus o întrebare nouă: boții AI. Tot mai multe crawlere adună date pentru antrenarea modelelor de limbaj sau pentru motoarele AI. În robots.txt le poți permite sau bloca pe nume (de exemplu GPTBot, CCBot, Google-Extended), deci tu decizi dacă conținutul tău face parte din ecosistemul AI.",
        ],
      },
      tips: [
        { icon: "📍", tip: "Fișierul trebuie să fie mereu în rădăcină, exact cu numele robots.txt – într-un subdirector nu este valid." },
        { icon: "🗺️", tip: "Adaugă mereu linia sitemap – este unul dintre cele mai simple câștiguri SEO." },
        { icon: "⚠️", tip: "Nu bloca niciodată din greșeală întreg site-ul (Disallow: /) în producție – te poate exclude din motor." },
        { icon: "🔐", tip: "Nu ascunde conținut confidențial cu robots.txt – folosește parolă sau protecție pe server." },
      ],
    },
  },

  // ─── Generator UTM ──────────────────────────────────────────────────────────
  "utm-generator": {
    introText:
      "Generatorul de linkuri UTM construiește URL-uri de urmărire a campaniilor, cu care măsori exact de unde îți vin vizitatorii. Introduci URL-ul destinație și parametrii UTM (sursă, canal, campanie, cuvânt cheie, conținut), iar instrumentul asamblează instant linkul gata făcut, corect codat. Google Analytics, Plausible și majoritatea sistemelor de analiză citesc din acești parametri care reclamă, postare sau newsletter a adus traficul. Totul rulează în browserul tău, fără încărcare.",
    guide: [
      "1. Introdu URL-ul destinație către care îndrepți vizitatorul.",
      "2. Completează sursa (utm_source), canalul (utm_medium) și numele campaniei (utm_campaign).",
      "3. După nevoie, adaugă cuvântul cheie (utm_term) și varianta de conținut (utm_content).",
      "4. Copiază URL-ul de campanie gata făcut și folosește-l în reclamă, postare sau newsletter.",
    ],
    faq: [
      { q: "Ce este un parametru UTM?", a: "Parametrii UTM sunt etichete cu prefixul „utm_” adăugate la finalul URL-ului (de ex. ?utm_source=facebook&utm_medium=social), citite de sistemele de analiză. Cu ajutorul lor vezi exact din ce sursă, canal și campanie a venit un vizitator." },
      { q: "Care sunt cei trei parametri esențiali?", a: "utm_source (de unde: ex. google, newsletter), utm_medium (pe ce canal: ex. cpc, email, social) și utm_campaign (care campanie: ex. reducere_vara). Aceștia trei formează coloana vertebrală a măsurării; term și content sunt rafinări opționale." },
      { q: "Contează literele mari și mici?", a: "Da. Majoritatea sistemelor de analiză tratează separat „Facebook” și „facebook”, ceea ce împarte datele în două. Buna practică: folosește peste tot litere mici și ține-te de un sistem de denumire consecvent." },
      { q: "Pot folosi spații în parametri?", a: "Mai bine le eviți. În loc de spațiu folosește underscore sau cratimă (ex. reducere_vara). Instrumentul codează automat caracterele speciale, dar numele curate, necodate, sunt mai lizibile în rapoarte." },
      { q: "Parametrii UTM strică SEO-ul?", a: "Pe linkurile interne evită-i, fiindcă pot perturba măsurarea și pot crea URL-uri duplicate. Pentru campanii externe sunt inofensivi, mai ales dacă pagina are un tag canonical corect, care indică URL-ul de bază." },
      { q: "Datele ajung pe vreun server?", a: "Nu. Asamblarea linkului are loc în întregime în browserul tău – nicio dată nu este încărcată." },
    ],
    content: {
      howToSteps: [
        { title: "1. URL destinație", description: "Introdu URL-ul complet către care campania îndreaptă vizitatorul." },
        { title: "2. Parametri principali", description: "Completează source, medium și campaign – baza măsurării." },
        { title: "3. Rafinare", description: "După nevoie, adaugă term și content pentru o segmentare mai detaliată." },
        { title: "4. Copiere", description: "Copiezi URL-ul de campanie gata codat cu un singur clic." },
      ],
      useCases: [
        { icon: "📧", title: "Newsletter", description: "Marcarea linkurilor din newsletter, ca să vezi cât trafic și câte conversii aduc." },
        { icon: "📣", title: "Reclamă plătită", description: "Măsurarea precisă pe sursă și canal a campaniilor Google Ads și Facebook." },
        { icon: "📱", title: "Social media", description: "Urmărirea separată a performanței fiecărei platforme (Instagram, LinkedIn)." },
        { icon: "🤝", title: "Linkuri de la parteneri", description: "Identificarea traficului venit de pe site-uri colaboratoare cu marcaj de campanie unic." },
      ],
      formatComparison: {
        title: "Parametrii UTM",
        columns: ["Parametru", "Ce marchează", "Exemplu"],
        rows: [
          { feature: "utm_source", values: ["Sursa", "google, newsletter"] },
          { feature: "utm_medium", values: ["Canalul", "cpc, email, social"] },
          { feature: "utm_campaign", values: ["Numele campaniei", "reducere_vara_2026"] },
          { feature: "utm_term", values: ["Cuvânt cheie plătit", "adidasi"] },
          { feature: "utm_content", values: ["Varianta de conținut", "banner_sus"] },
        ],
      },
      aboutSection: {
        title: "De ce merită să folosești UTM?",
        paragraphs: [
          "Când vine trafic pe site-ul tău, analiza vede implicit doar atât: „social media” sau „referral” – dar nu și care postare, reclamă sau newsletter anume l-a adus. Parametrii UTM elimină acest punct orb: în fiecare link de campanie integrezi sursa, canalul și numele campaniei, astfel încât în raportul de analiză vezi exact ce funcționează și ce nu.",
          "Cheia succesului este consecvența. Deoarece sistemele tratează separat literele mari și mici, precum și denumirile diferite, o practică relaxată duce repede la date încurcate, imposibil de comparat. Merită să fixezi din start o convenție simplă – mereu litere mici, cuvinte separate prin underscore, nume de sursă și canal unificate – și să te ții de ea în fiecare campanie.",
          "Este important să folosești parametrii UTM doar pentru campanii externe, de intrare, nu pe linkurile din interiorul propriului site. UTM-urile interne pot suprascrie sursa originală în măsurare și distorsionează raportul. În plus, tag-ul canonical corect asigură că URL-urile cu parametri nu creează probleme de conținut duplicat în motor.",
        ],
      },
      tips: [
        { icon: "🔡", tip: "Folosește mereu litere mici – Facebook și facebook ar apărea ca două surse separate." },
        { icon: "📋", tip: "Fixează o convenție de denumire și ține-te de ea în fiecare campanie." },
        { icon: "🚫", tip: "Nu pune UTM pe linkurile interne – sunt doar pentru campanii externe, de intrare." },
        { icon: "🔗", tip: "Linkurile lungi le poți scurta cu un scurtător de URL, dar măsurarea funcționează la fel în fundal." },
      ],
    },
  },

  // ─── Eliminare parametri UTM ────────────────────────────────────────────────
  "utm-eltavolito": {
    introText:
      "Instrumentul de eliminare UTM curăță URL-urile de parametrii de urmărire a campaniilor și de tracking: de toate etichetele utm_*, precum și de fbclid, gclid, mc_cid și mulți alți parametri de urmărire. Lipești unul sau mai multe URL-uri și primești instant varianta curată, potrivită pentru partajare. Util când vrei să partajezi sau să salvezi curat un link primit dintr-o reclamă sau newsletter, fără coada inutilă de urmărire. Totul rulează în browserul tău.",
    guide: [
      "1. Lipește URL-urile, câte unul pe rând (inclusiv linkurile lungi cu parametri de tracking).",
      "2. Decide dacă elimini doar parametrii utm_* sau și toți parametrii de tracking (fbclid, gclid…).",
      "3. Citește URL-urile curate și numărul de parametri eliminați.",
      "4. Copiază rezultatul cu un clic.",
    ],
    faq: [
      { q: "Ce parametri elimină?", a: "Implicit toți parametrii cu prefixul utm_ (utm_source, utm_medium, utm_campaign, utm_term, utm_content). Dacă opțiunea de tracking este activă, și parametrii de urmărire frecvenți: fbclid, gclid, msclkid, mc_cid, yclid, igshid și mulți alții." },
      { q: "De ce merită eliminați?", a: "Parametrii de tracking strică linkul la partajare, pot distorsiona propria analiză (dacă ajung pe linkuri interne) și fac URL-ul inutil de lung. Un URL curat este mai scurt, mai de încredere și arată mai bine." },
      { q: "Eliminarea strică funcționarea paginii?", a: "Nu. Parametrii utm_ și de tracking servesc exclusiv măsurării – nu afectează conținutul și funcționarea paginii. URL-ul curat duce la aceeași pagină." },
      { q: "Păstrează parametrii importanți?", a: "Da. Elimină doar parametrii de tracking cunoscuți; parametrii funcționali (de ex. ?pagina=2, ?id=123, ?q=cautare) rămân neatinși." },
      { q: "Gestionează mai multe URL-uri deodată?", a: "Da, câte un URL pe rând. Procesează fiecare rând separat, iar rândurile invalide rămân neschimbate." },
      { q: "URL-urile ajung pe vreun server?", a: "Nu. Toată curățarea are loc în browserul tău – niciun URL nu părăsește dispozitivul." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea URL-urilor", description: "Lipește linkurile cu parametri de tracking, câte unul pe rând." },
        { title: "2. Alegerea modului", description: "Doar utm_* sau eliminarea tuturor parametrilor de tracking (fbclid, gclid…)." },
        { title: "3. Rezultat", description: "URL-urile curate apar instant, cu numărul de parametri eliminați." },
        { title: "4. Copiere", description: "Copiezi linkurile curățate cu un clic în clipboard." },
      ],
      useCases: [
        { icon: "🔗", title: "Partajare de linkuri", description: "Partajarea curată în social media a unui link primit dintr-o reclamă sau newsletter." },
        { icon: "📊", title: "Analiză curată", description: "Eliminarea UTM-urilor ajunse pe linkuri interne, ca să nu distorsioneze măsurarea traficului." },
        { icon: "🔖", title: "Marcaj", description: "Salvarea curată pentru mai târziu a URL-urilor lungi cu parametri de urmărire." },
        { icon: "🕵️", title: "Confidențialitate", description: "Eliminarea identificatorilor de clic (fbclid, gclid) care spun ceva despre tine." },
      ],
      formatComparison: {
        title: "Parametri eliminați frecvent",
        columns: ["Parametru", "De unde"],
        rows: [
          { feature: "utm_*", values: ["Urmărire generală a campaniilor"] },
          { feature: "fbclid", values: ["Facebook"] },
          { feature: "gclid, gbraid", values: ["Google Ads"] },
          { feature: "msclkid", values: ["Microsoft / Bing Ads"] },
          { feature: "mc_cid, mc_eid", values: ["Mailchimp"] },
          { feature: "igshid", values: ["Instagram"] },
        ],
      },
      aboutSection: {
        title: "Ce sunt parametrii de tracking?",
        paragraphs: [
          "Parametrii de tracking sunt etichete adăugate la finalul URL-ului, care nu afectează conținutul paginii, ci servesc unui scop de măsurare. Cei mai cunoscuți sunt parametrii cu prefixul utm_, pe care marketerii îi adaugă linkurilor pentru a măsura traficul campaniilor. În plus, fiecare platformă mare adaugă propriul identificator de clic la linkurile partajate: Facebook fbclid, Google gclid, Microsoft msclkid.",
          "Acești parametri sunt utili din perspectiva campaniei, dar pentru utilizator reprezintă adesea doar zgomot. Un link partajat plin de coadă de tracking este lung, urât și nesigur; în plus, dacă un astfel de link revine pe propriul site ca legătură internă, îți poate încurca propria analiză. Eliminarea lor dă un URL curat, neutru, care duce la aceeași pagină.",
        ],
      },
      tips: [
        { icon: "🧹", tip: "Înainte de a partaja un link de reclamă într-un mesaj privat, curăță-l – fbclid spune ceva despre tine." },
        { icon: "📊", tip: "Pe linkurile interne nu trebuie să ajungă niciodată UTM – dacă totuși se întâmplă, aici le elimini rapid." },
        { icon: "🔗", tip: "Parametrii funcționali (de ex. ?pagina=2) rămân, dispar doar cei de urmărire." },
        { icon: "🤝", tip: "Perechea sa este generatorul UTM: îl adaugi pentru campanie, îl elimini pentru partajare." },
      ],
    },
  },

  // ─── Normalizare URL ────────────────────────────────────────────────────────
  "url-normalizalo": {
    introText:
      "Normalizatorul de URL aduce URL-urile la o formă unitară, canonică: poate forța protocolul https, poate gestiona prefixul www și slash-ul final, aduce host-ul la litere mici, poate elimina fragmentul și poate sorta parametrii query. Lipești unul sau mai multe URL-uri, alegi regulile și primești instant varianta normalizată. Util când trebuie să unifici liste de URL-uri, să filtrezi duplicate sau să pregătești URL-uri canonice. Totul rulează în browserul tău.",
    guide: [
      "1. Lipește URL-urile, câte unul pe rând.",
      "2. Alege regulile de normalizare (https, www, slash final, fragment, sortare query).",
      "3. Citește URL-urile unificate.",
      "4. Copiază rezultatul cu un clic.",
    ],
    faq: [
      { q: "Ce este normalizarea URL?", a: "Normalizarea URL este aducerea URL-urilor la o formă unitară, canonică. Aceeași pagină poate fi accesibilă prin multe URL-uri (cu sau fără www, http sau https, cu sau fără slash final); normalizarea le aduce la o singură formă consecventă." },
      { q: "De ce este importantă în SEO?", a: "Motoarele de căutare pot trata variantele diferite de URL ca pagini separate, ceea ce creează conținut duplicat și împarte puterea linkurilor. URL-urile normalizate consecvent (și tag-urile canonical aferente) ajută la evitarea acestui lucru." },
      { q: "Ce reguli merită activate?", a: "Forțarea https și eliminarea fragmentului sunt aproape mereu utile. Gestionarea www și a slash-ului final depinde de forma pe care ai ales-o ca URL canonic al site-ului – esențială este consecvența." },
      { q: "Strică parametrii query?", a: "Nu. Păstrează parametrii query; opțiunea de sortare doar îi pune în ordine alfabetică, ca două URL-uri identice, dar cu ordine diferită, să primească aceeași formă." },
      { q: "Ce face cu portul inutil?", a: "Porturile standard (:80 la http, :443 la https) sunt eliminate automat, fiind redundante – URL-ul duce în același loc și fără ele." },
      { q: "URL-urile ajung pe vreun server?", a: "Nu. Toată normalizarea are loc în browserul tău – nicio dată nu este încărcată." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea URL-urilor", description: "Lipește URL-urile de normalizat, câte unul pe rând." },
        { title: "2. Reguli", description: "Activează regulile dorite: https, www, slash final, fragment, sortare query." },
        { title: "3. Rezultat", description: "URL-urile normalizate, unitare apar instant." },
        { title: "4. Copiere", description: "Copiezi rezultatul cu un clic în clipboard." },
      ],
      useCases: [
        { icon: "🔁", title: "Filtrare duplicate", description: "Unificarea listelor de URL-uri, ca adresele de fapt identice să devină la fel." },
        { icon: "🔗", title: "Pregătire canonical", description: "Producerea formei curate, canonice de URL necesare pentru tag-urile canonical." },
        { icon: "🧭", title: "Planificare redirect", description: "Unificarea URL-urilor destinație înainte de a scrie reguli de redirecționare." },
        { icon: "🗃️", title: "Curățare date", description: "Aducerea la o formă consecventă a URL-urilor din liste de export sau crawl." },
      ],
      formatComparison: {
        title: "Pași tipici de normalizare",
        columns: ["Pas", "Exemplu"],
        rows: [
          { feature: "Forțare https", values: ["http://… → https://…"] },
          { feature: "Litere mici host", values: ["Exemplu.RO → exemplu.ro"] },
          { feature: "Gestionare www", values: ["www.exemplu.ro → exemplu.ro"] },
          { feature: "Slash final", values: ["/pagina/ → /pagina"] },
          { feature: "Eliminare fragment", values: ["/pagina#sectiune → /pagina"] },
        ],
      },
      aboutSection: {
        title: "De ce e nevoie de normalizare?",
        paragraphs: [
          "Aceeași pagină web poate fi accesibilă, teoretic, prin nenumărate URL-uri. `http://Www.Exemplu.ro/Pagina/`, `https://exemplu.ro/pagina` și `https://exemplu.ro/pagina/?utm_source=x#top` pot duce în același loc, dar sunt șiruri de caractere diferite. Oamenii înțeleg ușor acest lucru, dar mașinile – motoarele de căutare, cache-urile, sistemele de analiză – le pot trata ca entități separate.",
          "Normalizarea aduce aceste variante la o singură formă canonică printr-un set de reguli deterministe: protocol și majuscule unitare, gestionare consecventă a www și a slash-ului, eliminarea părților inutile. Rezultatul: pagini identice primesc URL-uri identice, ceea ce este esențial pentru filtrarea duplicatelor, pentru tag-urile canonical corecte și pentru o măsurare curată.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "Decide o dată care e forma ta canonică (cu sau fără www, cu sau fără slash) și respect-o peste tot." },
        { icon: "🔒", tip: "Forțarea https este azi un standard – nu lăsa linkuri http în sistemul tău." },
        { icon: "🔗", tip: "URL-ul normalizat este punctul de plecare pentru tag-ul canonical – continuă cu generatorul Canonical." },
        { icon: "🧹", tip: "Pentru eliminarea parametrilor de tracking, folosește eliminatorul UTM înainte de normalizare." },
      ],
    },
  },

  // ─── Generator tag canonical ────────────────────────────────────────────────
  "canonical-epito": {
    introText:
      "Generatorul de tag canonical creează, din unul sau mai multe URL-uri, tag-urile HTML <link rel=\"canonical\"> potrivite, cu care marchezi versiunea oficială, principală a paginilor tale. Tag-ul canonical este unul dintre cele mai importante instrumente tehnice împotriva conținutului duplicat: le spune motoarelor de căutare care URL să îl indexeze, dacă același conținut e accesibil prin mai multe adrese. Lipești URL-urile și primești instant tag-urile gata de inserat. Totul rulează în browserul tău.",
    guide: [
      "1. Lipește URL-urile, câte unul pe rând – adrese complete, absolute (https://…).",
      "2. Instrumentul generează tag-urile canonical pentru fiecare rând.",
      "3. Verifică dacă toate URL-urile sunt absolute (avertismentul te anunță dacă nu).",
      "4. Copiază tag-urile și inserează-le în secțiunea <head> a paginilor.",
    ],
    faq: [
      { q: "Ce este un tag canonical?", a: "Tag-ul canonical (<link rel=\"canonical\">) este un element HTML din secțiunea <head> care le spune motoarelor de căutare care URL este versiunea oficială, principală a paginii. Dacă același conținut e accesibil prin mai multe URL-uri, canonical indică pe care să îl indexeze." },
      { q: "Când este nevoie de el?", a: "Când același conținut sau unul foarte asemănător e accesibil prin mai multe URL-uri: variante cu parametri (?utm_…, ?filtru=…), cu și fără www, http și https, sau același produs pe mai multe căi de categorie. Atunci canonical previne problema conținutului duplicat." },
      { q: "URL-ul absolut sau relativ e corect?", a: "Dă întotdeauna un URL absolut, complet (https://exemplu.ro/pagina/). Canonical relativ poate funcționa, dar e riscant și interpretabil greșit – instrumentul te avertizează dacă dai un URL non-absolut." },
      { q: "Fiecare pagină trebuie să indice spre sine?", a: "Da, buna practică este canonical auto-referențial: fiecare pagină indică spre propriul URL curat. Excepție face o pagină care e intenționat duplicatul alteia – atunci indică spre originală." },
      { q: "Unde se pune tag-ul?", a: "Tag-ul canonical se pune mereu în secțiunea <head> a paginii, de preferat sus. Pe fiecare pagină trebuie să fie exact un tag canonical." },
      { q: "URL-urile ajung pe vreun server?", a: "Nu. Generarea tag-urilor are loc în browserul tău – niciun URL nu este încărcat." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea URL-urilor", description: "Dă URL-urile absolute ale paginilor, câte unul pe rând." },
        { title: "2. Generare", description: "Instrumentul generează instant tag-urile canonical pentru fiecare URL." },
        { title: "3. Verificare", description: "Avertismentul semnalează dacă un URL nu e în formă absolută." },
        { title: "4. Inserare", description: "Copiază tag-urile în secțiunea <head> a paginilor." },
      ],
      useCases: [
        { icon: "🛒", title: "Magazin online", description: "Același produs pe mai multe căi de categorie – canonical indică spre URL-ul principal." },
        { icon: "🔗", title: "URL-uri cu parametri", description: "Canonicalizarea paginilor de listă cu filtre și sortări spre URL-ul de bază." },
        { icon: "📰", title: "Conținut sindicalizat", description: "Canonical al unui articol republicat altundeva indică spre sursa originală." },
        { icon: "🌐", title: "www și protocol", description: "Direcționarea variantelor cu www și de protocol spre o singură formă canonică." },
      ],
      formatComparison: {
        title: "Surse de duplicare unde ajută canonical",
        columns: ["Sursă", "Exemplu"],
        rows: [
          { feature: "Parametru tracking", values: ["/pagina?utm_source=newsletter"] },
          { feature: "Filtru / sortare", values: ["/lista?sort=pret&pagina=2"] },
          { feature: "Variantă www", values: ["www.exemplu.ro vs exemplu.ro"] },
          { feature: "Mai multe căi", values: ["/pantofi/sport/x și /reduceri/x"] },
        ],
      },
      aboutSection: {
        title: "Rolul tag-ului canonical",
        paragraphs: [
          "Conținutul duplicat este una dintre problemele tăcute ale optimizării pentru motoarele de căutare. Rareori este intenționat: cel mai adesea provine din faptul că site-ul servește tehnic același conținut prin mai multe URL-uri – cu parametri, cu și fără www, sau pe mai multe căi de navigare. Motoarele nu știu atunci care e versiunea oficială și pot împărți puterea de clasare între ele, sau pot indexa un URL greșit.",
          "Tag-ul canonical este cea mai curată soluție pentru aceasta: în secțiunea <head> a fiecărei pagini marchează care e URL-ul principal. Buna practică este canonical auto-referențial – fiecare pagină indică spre propriul URL curat –, cu excepția duplicatelor intenționate, care trimit spre originală. Este important ca tag-ul canonical să fie mereu un URL absolut, complet, și să fie în acord cu celelalte semnale ale site-ului (sitemap, linkuri interne, redirecționări).",
        ],
      },
      tips: [
        { icon: "🔗", tip: "Folosește mereu un URL absolut, pe https – canonical relativ e riscant." },
        { icon: "1️⃣", tip: "Pe fiecare pagină să fie exact un tag canonical – mai multe încurcă motorul." },
        { icon: "🪞", tip: "Implicit, fiecare pagină să indice spre sine (canonical auto-referențial)." },
        { icon: "🧭", tip: "URL-ul canonical să coincidă cu cel folosit în sitemap și în linkurile interne." },
      ],
    },
  },

  // ─── Optimizare nume fișier SEO ─────────────────────────────────────────────
  "fajlnev-optimalizalo": {
    introText:
      "Optimizatorul de nume de fișiere SEO transformă numele fișierelor – de obicei ale imaginilor – într-o formă prietenoasă cu motoarele și cu URL-urile: elimină diacriticele și caracterele speciale, înlocuiește spațiile cu cratimă (sau underscore) și aduce numele la litere mici, păstrând extensia. Lipești unul sau mai multe nume de fișiere și primești instant varianta curată, gata de încărcat. Numele descriptive, curate ajută motoarele să înțeleagă conținutul imaginii. Totul rulează în browserul tău.",
    guide: [
      "1. Lipește numele de fișiere, câte unul pe rând (împreună cu extensia).",
      "2. Alege separatorul (cratimă sau underscore) și litere mici.",
      "3. Citește numele de fișiere prietenoase cu SEO.",
      "4. Copiază rezultatul și redenumește fișierele înainte de încărcare.",
    ],
    faq: [
      { q: "De ce contează numele fișierului în SEO?", a: "Numele fișierului unei imagini este unul dintre semnalele din care motoarele deduc conținutul imaginii. Un nume descriptiv, curat (cana-ceramica-rosie.jpg) spune mult mai mult decât IMG_20260704.jpg și ajută la apariția în căutarea de imagini." },
      { q: "De ce trebuie eliminate diacriticele?", a: "Caracterele cu diacritice și speciale din numele fișierului (și deci din URL) pot cauza probleme de codare: browserele le transformă în %-codare, ceea ce dă un URL urât, lung și predispus la erori. Numele de fișier fără diacritice, ASCII, funcționează fiabil peste tot." },
      { q: "Cratimă sau underscore?", a: "Google recomandă cratima pentru separarea cuvintelor în numele de fișiere și URL-uri, fiindcă o interpretează ca separator de cuvinte. Underscore-ul îl tratează ca legătură. Din punct de vedere SEO, cratima este alegerea mai bună." },
      { q: "Păstrează extensia?", a: "Da. Extensia de după ultimul punct (.jpg, .png, .pdf) rămâne neatinsă, doar e adusă la litere mici – se optimizează partea de nume." },
      { q: "Gestionează mai multe nume?", a: "Da, câte unul pe rând. Ideal pentru pregătirea redenumirii unui set întreg de imagini înainte de încărcare." },
      { q: "Numele de fișiere ajung pe vreun server?", a: "Nu. Toată transformarea are loc în browserul tău – nimic nu este încărcat." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea numelor", description: "Dă numele de fișiere cu extensia, câte unul pe rând." },
        { title: "2. Setări", description: "Alege separatorul (- sau _) și litere mici." },
        { title: "3. Rezultat", description: "Numele prietenoase cu SEO, fără diacritice, apar instant." },
        { title: "4. Redenumire", description: "Copiază rezultatul și redenumește fișierele înainte de încărcare." },
      ],
      useCases: [
        { icon: "🖼️", title: "Încărcare imagini", description: "Optimizarea numelor imaginilor de produs și de blog pentru un rezultat mai bun în căutarea de imagini." },
        { icon: "🛒", title: "E-commerce", description: "Redenumirea în masă a fotografiilor de produs cu nume unitare, descriptive, prietenoase SEO." },
        { icon: "📄", title: "Fișiere descărcabile", description: "Curățarea numelor de PDF-uri și documente pentru un URL de descărcare frumos și funcțional." },
        { icon: "🌐", title: "Pagini statice", description: "Unificarea numelor de asset-uri la pregătirea unui site." },
      ],
      formatComparison: {
        title: "Exemple de transformare",
        columns: ["Original", "Optimizat"],
        rows: [
          { feature: "Cană de Vară (roșu).JPG", values: ["cana-de-vara-rosu.jpg"] },
          { feature: "Listă prețuri 2026 – final.PDF", values: ["lista-preturi-2026-final.pdf"] },
          { feature: "Copie imagine (1).png", values: ["copie-imagine-1.png"] },
        ],
      },
      aboutSection: {
        title: "De ce e important numele curat al fișierului?",
        paragraphs: [
          "Numele fișierului este un semnal SEO mic, dar real, mai ales la imagini. Când încarci o imagine, numele ei este una dintre primele informații din care motorul deduce conținutul – chiar înainte de textul alt. Un nume grăitor, precum `pled-lana-albastru.jpg`, dezvăluie mult mai mult decât un `DSC00417.jpg` și crește șansa ca imaginea să apară printre rezultatele Google Imagini.",
          "Curățenia tehnică e la fel de importantă. Numele de fișiere cu diacritice și caractere speciale se transformă în URL în codare procentuală (spațiul devine %20, ă devine %C4%83), ceea ce produce linkuri urâte, lungi și fragile. Numele de fișier fără diacritice, cu litere mici, separat prin cratime funcționează fiabil pe orice server, browser și la partajare – de aceea merită optimizat încă înainte de încărcare.",
        ],
      },
      tips: [
        { icon: "✍️", tip: "Folosește nume descriptive, care conțin cuvântul cheie – dar natural, nu aglomera." },
        { icon: "➖", tip: "Alege cratima ca separator de cuvinte, aceasta e tratată de Google drept limită de cuvânt." },
        { icon: "🔤", tip: "Litere mici peste tot – eviți astfel duplicatele cauzate de majuscule pe unele servere." },
        { icon: "🖼️", tip: "După numele bun, dă și textul alt descriptiv – cele două acționează împreună." },
      ],
    },
  },

  // ─── Generator text alt imagine ─────────────────────────────────────────────
  "alt-szoveg-sablon": {
    introText:
      "Generatorul de text alt creează în masă texte alternative pentru imagini dintr-un șablon și rânduri de date. Scrii un șablon cu substituenți {1}, {2}, dai datele pe rânduri (câmpuri separate prin virgulă), iar instrumentul înlocuiește valorile pentru fiecare rând. Rezultatul îl poți copia sau descărca drept CSV. Ideal pentru magazine online și seturi mari de imagini, unde trebuie create rapid texte alt descriptive, accesibile și prietenoase cu SEO pentru multe imagini similare. Totul rulează în browserul tău.",
    guide: [
      "1. Scrie șablonul cu substituenți, de ex. „{1} {2} – fotografie de produs pe fundal alb”.",
      "2. Dă rândurile de date, câte unul pe rând, cu câmpurile separate prin virgulă.",
      "3. Vezi textele alt generate în lista live.",
      "4. Copiază-le sau descarcă-le drept CSV pentru asocierea cu fișierele.",
    ],
    faq: [
      { q: "Ce este textul alt?", a: "Textul alt (atributul alt) este descrierea textuală a imaginii în HTML. Cititoarele de ecran îl citesc utilizatorilor cu deficiențe de vedere, iar motoarele înțeleg din el conținutul imaginii. Este important atât pentru accesibilitate, cât și pentru SEO." },
      { q: "Cum funcționează substituenții?", a: "În șablon, substituenții {1}, {2}, {3}… fac referire la câmpurile rândului de date: {1} e primul câmp separat prin virgulă, {2} al doilea și așa mai departe. Pentru fiecare rând înlocuiește valorile corespunzătoare." },
      { q: "Cum arată un text alt bun?", a: "Concis (de regulă sub 125 de caractere), descriptiv și care descrie conținutul real al imaginii în context. Nu o aglomerare de cuvinte cheie și nu începe cu „imagine cu…”. Și la generarea în masă, urmărește ca șablonul să dea o propoziție firească, cu sens." },
      { q: "La ce folosește exportul CSV?", a: "În CSV, fiecare câmp de intrare și textul alt generat apar în câte o coloană. Astfel le poți asocia ușor cu numele fișierelor, le poți importa într-o foaie de calcul sau în CMS-ul tău pentru încărcare în masă." },
      { q: "Fiecare imagine are nevoie de alt unic?", a: "Da, ideal. Șablonul ajută, dar rândurile de date fac unic fiecare text – un text alt complet identic pentru multe imagini nu e util nici utilizatorului, nici motorului." },
      { q: "Datele ajung pe vreun server?", a: "Nu. Toată generarea are loc în browserul tău – nicio dată nu este încărcată." },
    ],
    content: {
      howToSteps: [
        { title: "1. Șablon", description: "Scrie șablonul cu substituenți {1}, {2} pentru părțile variabile." },
        { title: "2. Rânduri de date", description: "Dă datele pe rânduri, cu câmpurile separate prin virgulă." },
        { title: "3. Previzualizare", description: "Textele alt înlocuite apar instant în listă." },
        { title: "4. Export", description: "Copiază textele sau descarcă-le drept CSV pentru asociere cu fișierele." },
      ],
      useCases: [
        { icon: "🛒", title: "Catalog magazin", description: "Generarea rapidă și unitară a textului alt pentru sute de fotografii de produs." },
        { icon: "♿", title: "Accesibilizare", description: "Dotarea unui set existent de imagini cu text alt descriptiv pentru cititoarele de ecran." },
        { icon: "📸", title: "Galerie foto", description: "Descrierea unitară, personalizată cu variabile, a imaginilor dintr-o galerie." },
        { icon: "📊", title: "Import CMS", description: "Producerea în masă a textelor alt în CSV pentru import în sistemul de conținut." },
      ],
      formatComparison: {
        title: "Șablon și rezultat",
        columns: ["Element", "Exemplu"],
        rows: [
          { feature: "Șablon", values: ["{1} {2} – fotografie de produs pe fundal alb"] },
          { feature: "Rând de date", values: ["Cană roșie, ceramică"] },
          { feature: "Rezultat", values: ["Cană roșie ceramică – fotografie de produs pe fundal alb"] },
        ],
      },
      aboutSection: {
        title: "Text alt: accesibilitate și SEO",
        paragraphs: [
          "Textul alt este unul dintre cele mai importante, dar adesea neglijate elemente ale web-ului. Rolul său principal este accesibilitatea: pentru utilizatorii cu deficiențe de vedere care folosesc un cititor de ecran, textul alt este singura modalitate de a afla ce reprezintă o imagine. Fără o descriere alt bine scrisă, imaginea pur și simplu nu există pentru ei sau apare doar ca un nume de fișier fără sens.",
          "În plus, textul alt este și un semnal SEO: motoarele înțeleg din el (împreună cu numele fișierului și textul din jur) conținutul imaginii, ceea ce influențează apariția în căutarea de imagini. La seturi mari de imagini – de exemplu fotografiile de produs ale unui magazin – scrierea manuală a textului alt cere mult timp. Abordarea bazată pe șablon și date accelerează acest lucru: un șablon bine scris și datele structurate dau împreună multe texte alt unice, dar consecvente, în câteva minute.",
        ],
      },
      tips: [
        { icon: "📏", tip: "Ține textul alt sub 125 de caractere – cititoarele de ecran atât citesc comod." },
        { icon: "🚫", tip: "Nu începe cu „imagine cu…” – din context se știe deja că e imagine." },
        { icon: "🎯", tip: "Șablonul să dea o propoziție firească, cu sens – nu doar cuvinte cheie înșiruite." },
        { icon: "🖼️", tip: "Imaginile decorative, fără conținut, să aibă alt gol (alt=\"\"), nu forța text pe ele." },
      ],
    },
  },

  // ─── Verificare robots.txt ──────────────────────────────────────────────────
  "robots-txt-ellenorzo": {
    introText:
      "Verificatorul de robots.txt îți arată dacă un anumit URL poate fi parcurs de robotul de căutare conform regulilor din robots.txt. Lipești conținutul robots.txt, dai user-agent-ul și URL-urile de testat, iar instrumentul îți spune pentru fiecare URL dacă parcurgerea este permisă și care regulă decide. Urmează logica Google „câștigă cea mai lungă regulă potrivită”, cu suport wildcard (*) și sfârșit de linie ($). Astfel poți depista excluderile accidentale încă înainte de lansare. Totul rulează în browserul tău.",
    guide: [
      "1. Lipește conținutul complet al robots.txt.",
      "2. Dă user-agent-ul (de ex. Googlebot) pentru care testezi.",
      "3. Scrie URL-urile sau căile de testat, câte una pe rând.",
      "4. Citește pentru fiecare URL: permis sau interzis, și pe baza cărei reguli.",
    ],
    faq: [
      { q: "Cum decide dacă un URL e permis?", a: "Conform regulii Google, câștigă cea mai lungă (cea mai specifică) regulă potrivită. Instrumentul examinează toate regulile Allow și Disallow din blocul user-agent-ului și aplică cea mai lungă potrivire; la lungime egală câștigă Allow." },
      { q: "Suportă wildcard și semnul $?", a: "Da. * marchează orice secvență de caractere (de ex. /*.pdf se potrivește oricărui PDF), iar $ fixează sfârșitul liniei (de ex. /*.php$ doar pentru URL-urile terminate în .php). Și motoarele moderne le interpretează astfel." },
      { q: "De ce nu descarcă singur robots.txt-ul?", a: "Instrumentul este client-side, rulează în browserul tău, deci nu poate descărca robots.txt-ul altor domenii (din cauza restricțiilor de securitate ale browserului). În schimb lipești conținutul – astfel poți testa și un robots.txt confidențial sau încă nelansat." },
      { q: "Care e diferența dintre user-agenți?", a: "robots.txt poate da reguli separate diferiților boți (Googlebot, Bingbot, GPTBot…). Instrumentul folosește blocul cel mai specific pentru user-agent-ul dat, sau blocul *, dacă nu există potrivire exactă." },
      { q: "Disallow înseamnă că nu se indexează?", a: "Nu. Disallow interzice parcurgerea, dar URL-ul interzis poate apărea totuși în rezultate (fără titlu). Pentru excluderea completă din indexare e nevoie de meta tag-ul noindex – dar acesta acționează doar dacă parcurgerea e permisă." },
      { q: "Datele ajung pe vreun server?", a: "Nu. Toată analiza are loc în browserul tău – nicio dată nu este încărcată." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea robots.txt", description: "Lipește conținutul complet al fișierului în câmpul de text." },
        { title: "2. User-agent", description: "Dă botul pentru care testezi (de ex. Googlebot)." },
        { title: "3. URL-uri", description: "Scrie URL-urile sau căile de testat, câte una pe rând." },
        { title: "4. Rezultat", description: "Pentru fiecare URL vezi: permis sau interzis, și regula decisivă." },
      ],
      useCases: [
        { icon: "🛡️", title: "Verificare înainte de lansare", description: "Confirmarea că un robots.txt nou nu exclude accidental paginile importante." },
        { icon: "🔍", title: "Depanare", description: "Aflarea motivului pentru care Google nu parcurge un anumit URL." },
        { icon: "🤖", title: "Reguli specifice botului", description: "Verificarea dacă un bot AI sau un anumit motor ajunge la conținut." },
        { icon: "📋", title: "Audit", description: "Confruntarea regulilor robots.txt existente cu structura reală de URL-uri." },
      ],
      formatComparison: {
        title: "Exemple de potrivire a regulilor",
        columns: ["Regulă", "Se potrivește la /admin/imagine.jpg"],
        rows: [
          { feature: "Disallow: /admin/", values: ["Da – interzis"] },
          { feature: "Allow: /admin/*.jpg", values: ["Da, mai lung – permis"] },
          { feature: "Disallow: /*.php$", values: ["Nu (nu se termină în .php)"] },
        ],
      },
      aboutSection: {
        title: "Cum interpretează Google robots.txt?",
        paragraphs: [
          "robots.txt pare simplu, dar rezolvarea conflictelor între reguli este adesea surprinzătoare. Când unui URL i se potrivesc mai multe reguli – de exemplu un Disallow general și un Allow mai specific –, motoarele nu decid după ordine, ci după specificitate: câștigă cea mai lungă regulă (care potrivește cele mai multe caractere). Dacă un Allow și un Disallow se potrivesc la fel de lung, Allow este mai puternic.",
          "La aceasta se adaugă cele două instrumente de potrivire a tiparelor: * înlocuiește orice secvență de caractere, iar $ fixează sfârșitul URL-ului. Cu ele se pot scrie reguli fine (de ex. „toate PDF-urile interzise, dar un folder permis”), al căror efect e greu de urmărit în minte. Acest instrument rulează exact această logică pe regulile lipite și pe URL-urile de test, așa că vezi încă înainte de lansare ce permite și ce interzice de fapt robots.txt-ul tău.",
        ],
      },
      tips: [
        { icon: "🧪", tip: "Înainte de lansarea unui robots.txt nou, testează cele mai importante URL-uri – un Disallow greșit costă scump." },
        { icon: "🎯", tip: "Nu uita: câștigă cea mai lungă regulă potrivită, nu ordinea." },
        { icon: "🤖", tip: "Testează pe mai mulți user-agenți, dacă ai reguli specifice botului." },
        { icon: "🔗", tip: "Pentru scrierea robots.txt folosește generatorul nostru, apoi testează-l aici." },
      ],
    },
  },

  // ─── Verificare URL-uri sitemap ─────────────────────────────────────────────
  "sitemap-url-ellenorzo": {
    introText:
      "Verificatorul de URL-uri sitemap citește conținutul unui sitemap XML lipit și listează URL-urile din el cu numărul total, precum și datele lastmod (ultima modificare) și priority (prioritate), dacă există. Recunoaște și sitemap-index-urile, care indică spre sub-sitemapuri. Astfel poți verifica rapid câte URL-uri sunt în sitemap-ul tău, dacă e bine formatat și ce conține – direct în browserul tău, fără încărcare.",
    guide: [
      "1. Lipește conținutul complet al sitemap-ului XML.",
      "2. Instrumentul listează instant URL-urile și numărul total.",
      "3. Vezi datele lastmod și priority, dacă sitemap-ul le conține.",
      "4. Copiază lista de URL-uri cu un clic.",
    ],
    faq: [
      { q: "Ce este un sitemap XML?", a: "Sitemap-ul XML este un fișier care enumeră URL-urile importante ale site-ului, ca motoarele să le găsească și să le parcurgă mai ușor. Poate conține și data ultimei modificări (lastmod) și prioritatea (priority) pentru fiecare URL." },
      { q: "Ce este un sitemap-index?", a: "Sitemap-index-ul este un sitemap care indică nu spre pagini, ci spre alte sitemapuri. Se folosește la site-uri mari, unde un singur sitemap nu ajunge (limita e 50 000 URL-uri sau 50 MB per fișier). Instrumentul recunoaște și semnalează dacă ai lipit un index." },
      { q: "De ce nu descarcă singur sitemap-ul?", a: "Instrumentul rulează în browserul tău, deci nu poate descărca sitemap-ul altor domenii (din cauza restricțiilor de securitate). Lipești conținutul – astfel poți verifica și un sitemap încă nelansat sau generat local." },
      { q: "Ce mărime de sitemap gestionează?", a: "Analiza rulează rapid în browserul tău, deci gestionează și sitemapuri cu mii de URL-uri. Lista afișată e derulabilă, iar numărul arată mereu cantitatea totală." },
      { q: "Ce înseamnă lastmod și priority?", a: "lastmod este data ultimei modificări a paginii – ajută motorul să decidă ce să reparcurgă. priority (0.0–1.0) indică importanța relativă a paginii în site, deși Google o ia azi mai puțin în considerare." },
      { q: "Datele ajung pe vreun server?", a: "Nu. Toată analiza are loc în browserul tău – sitemap-ul nu este încărcat." },
    ],
    content: {
      howToSteps: [
        { title: "1. Lipirea sitemap-ului", description: "Lipește conținutul complet al sitemap-ului XML în câmpul de text." },
        { title: "2. Analiză", description: "Instrumentul extrage și listează instant URL-urile cu numărul total." },
        { title: "3. Date", description: "Vezi valorile lastmod și priority, dacă apar." },
        { title: "4. Copiere", description: "Copiezi lista de URL-uri cu un clic în clipboard." },
      ],
      useCases: [
        { icon: "✅", title: "Validare sitemap", description: "Verificare rapidă dacă sitemap-ul e bine formatat și câte URL-uri conține." },
        { icon: "🔍", title: "Audit de conținut", description: "Trecerea în revistă într-un singur loc a listei de URL-uri destinate indexării." },
        { icon: "🗺️", title: "Desfacerea indexului", description: "În cazul unui sitemap-index, colectarea rapidă a adreselor sub-sitemapurilor." },
        { icon: "📊", title: "Export URL", description: "Copierea URL-urilor sitemap-ului pentru analiză suplimentară sau într-o foaie de calcul." },
      ],
      formatComparison: {
        title: "Elementele sitemap-ului",
        columns: ["Element", "Semnificație"],
        rows: [
          { feature: "<loc>", values: ["URL-ul paginii (obligatoriu)"] },
          { feature: "<lastmod>", values: ["Data ultimei modificări"] },
          { feature: "<priority>", values: ["Importanță relativă (0.0–1.0)"] },
          { feature: "<sitemap>", values: ["Sub-sitemap într-un index"] },
        ],
      },
      aboutSection: {
        title: "De ce este important sitemap-ul?",
        paragraphs: [
          "Sitemap-ul XML este harta site-ului pentru motoarele de căutare: enumeră URL-urile pe care proprietarul le consideră importante și vrea să le parcurgă. Este deosebit de util la site-uri mari, la pagini noi sau la conținut cu linkuri interne slabe, unde motorul ar găsi greu singur toate paginile. Trimiterea sitemap-ului în Search Console poate accelera descoperirea conținutului nou.",
          "Un sitemap bun este curat și actual: conține doar URL-uri canonice, cu status 200, chiar destinate indexării, iar lastmod reflectă real modificările. Un sitemap greșit sau învechit, în schimb, induce motorul în eroare. Acest instrument oferă o privire rapidă în conținutul sitemap-ului – câte URL-uri sunt în el, dacă e bine formatat, dacă e index sau sitemap simplu –, ca să depistezi problemele încă înainte de trimitere.",
        ],
      },
      tips: [
        { icon: "🧼", tip: "Sitemap-ul să conțină doar URL-uri de indexat, canonice, cu status 200 – nu noindex sau redirecționări." },
        { icon: "🔢", tip: "Un sitemap max. 50 000 URL-uri / 50 MB – peste, împarte-l pe un index." },
        { icon: "🗓️", tip: "lastmod să fie real – o dată falsă subminează încrederea motorului în sitemap-ul tău." },
        { icon: "🤖", tip: "Menționează URL-ul sitemap-ului și în robots.txt – generatorul nostru suportă asta." },
      ],
    },
  },
};
