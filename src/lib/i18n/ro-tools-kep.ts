// ============================================================
// Romanian translations for KÉP (image) category tools
// Slug-uri localizate în română pentru URL-uri.
// Textul user-facing este tradus în română naturală, SEO-optimizat.
// ============================================================

export const KEP_RO: Record<string, { slug: string; title: string; h1: string; description: string; keywords: string[] }> = {

  // ─── Format conversions ────────────────────────────────────

  "jpg-webp": {
    slug: "convertor-jpg-webp",
    title: "Convertor JPG → WebP | Gratuit, online",
    h1: "Convertor JPG → WebP",
    description: "Convertește imagini JPG/PNG în format WebP în browser – fără server. Calitate ajustabilă, procesare în lot cu export ZIP.",
    keywords: ["jpg webp", "convertor imagini", "webp converter", "convertor online gratuit", "jpg în webp"],
  },

  "png-webp": {
    slug: "convertor-png-webp",
    title: "Convertor PNG → WebP | Online gratuit",
    h1: "Convertor PNG → WebP",
    description: "Convertește imagini PNG în WebP cu păstrarea canalului alfa. Mod lossless și lossy, procesare în browser fără server.",
    keywords: ["png webp", "png to webp", "convertor png", "webp lossless", "convertor imagini online"],
  },

  "jpg-png": {
    slug: "convertor-jpg-png",
    title: "Convertor JPG → PNG | Online gratuit",
    h1: "Convertor JPG → PNG",
    description: "Convertește imagini JPG în format PNG fără pierderi, direct în browser. Fundal transparent, procesare în lot.",
    keywords: ["jpg png", "jpeg png", "jpg to png", "convertor jpg png", "conversie imagini online"],
  },

  "png-jpg": {
    slug: "convertor-png-jpg",
    title: "Convertor PNG → JPG | Online gratuit",
    h1: "Convertor PNG → JPG",
    description: "Convertește imagini PNG în JPG cu setare calitate și alegere culoare fundal. În browser, fără server.",
    keywords: ["png jpg", "png to jpg", "convertor png jpeg", "conversie png jpg online"],
  },

  "webp-jpg": {
    slug: "convertor-webp-jpg",
    title: "Convertor WebP → JPG | Online gratuit",
    h1: "Convertor WebP → JPG",
    description: "Reconvertește imagini WebP în format JPG cu setare calitate. În browser, fără server, procesare în lot.",
    keywords: ["webp jpg", "webp to jpg", "convertor webp jpeg", "reconversie webp"],
  },

  "webp-png": {
    slug: "convertor-webp-png",
    title: "Convertor WebP → PNG | Online gratuit",
    h1: "Convertor WebP → PNG",
    description: "Reconvertește imagini WebP în format PNG fără pierderi, cu păstrarea canalului alfa. În browser, fără server.",
    keywords: ["webp png", "webp to png", "convertor webp png", "reconversie webp lossless"],
  },

  // ─── Resize & compress ─────────────────────────────────────

  "atmeretezes": {
    slug: "redimensionare-imagini",
    title: "Redimensionare imagini online | Gratuit, fără server",
    h1: "Redimensionare imagini",
    description: "Redimensionează imagini după pixeli sau procent, cu păstrarea proporțiilor. Procesare în lot cu export ZIP, în browser.",
    keywords: ["redimensionare imagine", "resize image online", "redimensionare poză", "micșorare imagine", "modificare dimensiune imagine"],
  },

  "tomorites": {
    slug: "comprimare-imagini",
    title: "Comprimare imagini online | JPG PNG WebP",
    h1: "Comprimare imagini online",
    description: "Comprimă imagini JPG, PNG și WebP cu pierdere minimă de calitate. În browser, fără server, procesare în lot.",
    keywords: ["comprimare imagine", "compress image", "compresor imagini online", "comprimare jpg", "comprimare png", "comprimare webp"],
  },

  "minoseg-allitas": {
    slug: "setare-calitate-imagine",
    title: "Setare calitate imagine online | Quality slider",
    h1: "Setare calitate imagine",
    description: "Ajustează valoarea quality pentru imagini JPG/WebP pentru optimizarea dimensiunii fișierului. Previzualizare în timp real.",
    keywords: ["calitate imagine", "jpg quality", "setare calitate imagine", "reducere calitate jpeg", "webp quality"],
  },

  "felbontas-kiszamolo": {
    slug: "calculator-rezolutie",
    title: "Calculator rezoluție imagine – DPI/PPI online",
    h1: "Calculator rezoluție imagine",
    description: "Calculator DPI și dimensiune pixeli pentru tipărire și ecran. Conversie inch, cm, mm cu rezultat în timp real.",
    keywords: ["calculator rezoluție", "calcul dpi", "calculator ppi", "pixel cm", "dimensiune tipărire", "calcul dpi online"],
  },

  // ─── Crop, rotate, flip ────────────────────────────────────

  "levagas": {
    slug: "decupare-imagine",
    title: "Decupare imagine online (crop) | Gratuit",
    h1: "Decupare imagine",
    description: "Decupează imagini la dimensiuni sau proporții personalizate, în browser. Previzualizare și coordonate precise în pixeli.",
    keywords: ["decupare imagine", "crop online", "tăiere imagine", "crop imagine online gratuit"],
  },

  "forgatas": {
    slug: "rotire-imagine",
    title: "Rotire imagine online | Gratuit, fără server",
    h1: "Rotire imagine",
    description: "Rotește imagini la unghi liber sau în pași de 90°, în browser. Cu previzualizare, fără server.",
    keywords: ["rotire imagine", "rotate image online", "rotire poză", "rotire imagine online gratuit"],
  },

  "tukrozes": {
    slug: "oglindire-imagine",
    title: "Oglindire imagine online (flip) | Gratuit",
    h1: "Oglindire imagine",
    description: "Oglindire orizontală și verticală în browser, fără server. Previzualizare, descărcare cu un singur clic.",
    keywords: ["oglindire imagine", "flip image online", "oglindire orizontală", "flip imagine online gratuit"],
  },

  "90-fokos-forgatas": {
    slug: "rotire-90-grade",
    title: "Rotire imagine 90° | Instrument rapid online",
    h1: "Rotire imagine la 90°",
    description: "Rotire rapidă la 90° stânga sau dreapta cu un singur clic. Procesare în lot, în browser.",
    keywords: ["rotire 90 grade", "rotate 90 online", "rotire imagine 90 grade", "rotire rapidă imagine"],
  },

  // ─── Filters & effects ─────────────────────────────────────

  "elmosas": {
    slug: "estompare-imagine",
    title: "Estompare imagine (Gaussian blur) online | Gratuit",
    h1: "Estompare imagine",
    description: "Filtru Gaussian blur pentru imagini cu intensitate ajustabilă. Previzualizare, în browser, fără server.",
    keywords: ["estompare imagine", "blur online", "gaussian blur imagine", "bluraj imagine", "blur image online gratuit"],
  },

  "pixelates": {
    slug: "pixelare-imagine",
    title: "Pixelare imagine online | Cenzură, pixel art",
    h1: "Pixelare imagine",
    description: "Efect pixel art și cenzură pentru imagini cu dimensiune pixel ajustabilă. În browser, fără server.",
    keywords: ["pixelare online", "cenzură imagine", "pixelare imagine", "efect pixel art", "mozaic imagine online"],
  },

  "fekete-feher": {
    slug: "alb-negru",
    title: "Conversie alb-negru online | Grayscale",
    h1: "Conversie imagine alb-negru",
    description: "Transformă imagini color în tonuri de gri cu Canvas API, în browser. Previzualizare, procesare în lot.",
    keywords: ["imagine alb negru", "grayscale online", "conversie alb negru", "black and white image online"],
  },

  "kontraszt-fenyero": {
    slug: "contrast-luminozitate",
    title: "Contrast și luminozitate imagine online",
    h1: "Ajustare contrast și luminozitate",
    description: "Modifică contrastul și luminozitatea imaginilor cu slidere și previzualizare în timp real. În browser, fără server.",
    keywords: ["ajustare contrast", "setare luminozitate", "brightness contrast online", "luminozitate imagine", "contrast imagine online"],
  },

  // ─── Watermark & border ────────────────────────────────────

  "vizjel": {
    slug: "watermark-imagine",
    title: "Adaugă watermark pe imagini online | Gratuit",
    h1: "Adaugă watermark",
    description: "Aplică watermark text pe imagini cu setare poziție, font și transparență. În browser, fără server.",
    keywords: ["watermark online", "watermark imagine", "adăugare watermark", "watermark image online", "filigran imagine"],
  },

  "keret-padding": {
    slug: "chenar-padding",
    title: "Adaugă chenar și padding la imagini online",
    h1: "Adaugă chenar și padding",
    description: "Adaugă chenar colorat în jurul imaginilor cu setare dimensiune și culoare. În browser, fără server.",
    keywords: ["chenar imagine", "padding imagine", "border image online", "adăugare chenar", "ramă imagine online"],
  },

  // ─── Metadata ──────────────────────────────────────────────

  "metadata-megjelenites": {
    slug: "cititor-metadata-exif",
    title: "Cititor EXIF metadata online | Informații imagine",
    h1: "Afișare EXIF/metadata imagine",
    description: "Afișează date EXIF din JPG: dată, coordonate GPS, model cameră, diafragmă, viteză obturator. În browser, fără server.",
    keywords: ["cititor exif", "afișare metadata", "date exif", "informații imagine", "exif viewer online", "date cameră imagine"],
  },

  "metadata-torles": {
    slug: "stergere-metadata",
    title: "Ștergere EXIF metadata imagine | Protecția datelor",
    h1: "Ștergere metadata imagine",
    description: "Elimină EXIF și metadata din imagini pentru confidențialitate. Ștergere GPS, info cameră în browser, fără server.",
    keywords: ["ștergere exif", "eliminare metadata", "exif remove online", "ștergere metadata imagine", "ștergere date gps imagine"],
  },

  // ─── Batch operations ──────────────────────────────────────

  "tomeges-konvertalas": {
    slug: "conversie-lot-imagini",
    title: "Conversie imagini în lot online | Batch convert",
    h1: "Conversie imagini în lot",
    description: "Convertește zeci de imagini simultan între diferite formate, cu export ZIP. În browser, fără server.",
    keywords: ["conversie în lot", "bulk image convert", "convertor imagini lot", "batch convert imagini online"],
  },

  "tomeges-atmeretezes": {
    slug: "redimensionare-lot",
    title: "Redimensionare imagini în lot | Batch resize",
    h1: "Redimensionare imagini în lot",
    description: "Redimensionează mai multe imagini simultan cu aceiași parametri, descărcare ZIP. În browser, fără server.",
    keywords: ["batch resize", "redimensionare în lot", "bulk resize image", "redimensionare lot imagini online"],
  },

  "tomeges-tomorites": {
    slug: "comprimare-lot",
    title: "Comprimare imagini în lot | Batch compress",
    h1: "Comprimare imagini în lot",
    description: "Comprimă mai multe imagini simultan cu setare calitate, descărcare ZIP. În browser, fără server.",
    keywords: ["batch compress", "comprimare în lot", "bulk compress image", "comprimare lot imagini online"],
  },

  "tomeges-atnevezes": {
    slug: "redenumire-lot",
    title: "Redenumire imagini în lot | Batch rename",
    h1: "Redenumire imagini în lot",
    description: "Redenumește fișiere imagine în lot după șablon (ex. 'produs-{001}.jpg'), descărcare ZIP. În browser.",
    keywords: ["batch rename image", "redenumire în lot", "redenumire masivă imagini", "redenumire imagini șablon"],
  },

  "tomeges-zip-letoltes": {
    slug: "impachetare-zip-imagini",
    title: "Împachetare imagini în ZIP online | Batch ZIP",
    h1: "Împachetare imagini în ZIP",
    description: "Împachetează imaginile încărcate într-o arhivă ZIP cu un singur clic. În browser, fără server.",
    keywords: ["zip imagini", "batch download zip", "împachetare imagini zip", "images to zip online"],
  },
};
