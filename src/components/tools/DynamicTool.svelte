<script lang="ts">
  // ============================================================
  // DynamicTool.svelte
  // Wrapper that dynamically imports and renders a tool component
  // by name. Used by the [category]/[slug].astro dynamic route.
  // ============================================================
  import { onMount } from "svelte";

  export let componentName: string = "";
  export let componentProps: Record<string, unknown> = {};

  let ToolComponent: any = null;
  let loading = true;
  let error = false;

  // Component import map – same structure as the file system
  const COMPONENT_IMPORTS: Record<string, () => Promise<any>> = {
    // KÉP
    JpgWebpTool: () => import("../tools/kep/JpgWebpTool.svelte"),
    PngWebpTool: () => import("../tools/kep/PngWebpTool.svelte"),
    ImageConvertTool: () => import("../tools/shared/ImageConvertTool.svelte"),
    AtmererezesTool: () => import("../tools/kep/AtmererezesTool.svelte"),
    ForgatoTool: () => import("../tools/kep/ForgatoTool.svelte"),
    LevagoTool: () => import("../tools/kep/LevagoTool.svelte"),
    TukrozesTool: () => import("../tools/kep/TukrozesTool.svelte"),
    "90FokosForgatoTool": () => import("../tools/kep/90FokosForgatoTool.svelte"),
    ElmosasTool: () => import("../tools/kep/ElmosasTool.svelte"),
    PixelatesTool: () => import("../tools/kep/PixelatesTool.svelte"),
    FeketeFeherTool: () => import("../tools/kep/FeketeFeherTool.svelte"),
    KontrasztFenyeroTool: () => import("../tools/kep/KontrasztFenyeroTool.svelte"),
    VizjelTool: () => import("../tools/kep/VizjelTool.svelte"),
    KeretPaddingTool: () => import("../tools/kep/KeretPaddingTool.svelte"),
    FelbontasKiszamoloTool: () => import("../tools/kep/FelbontasKiszamoloTool.svelte"),
    MetadataMegjelenitesTool: () => import("../tools/kep/MetadataMegjelenitesTool.svelte"),
    MetadataTorleseTool: () => import("../tools/kep/MetadataTorleseTool.svelte"),
    TomegesKonvertalasTool: () => import("../tools/kep/TomegesKonvertalasTool.svelte"),
    TomegesAtmererezesTool: () => import("../tools/kep/TomegesAtmererezesTool.svelte"),
    TomegesTomoritesTool: () => import("../tools/kep/TomegesTomoritesTool.svelte"),
    TomegesZipLetoltesTool: () => import("../tools/kep/TomegesZipLetoltesTool.svelte"),
    TomegesAtnevezesTool: () => import("../tools/kep/TomegesAtnevezesTool.svelte"),
    // KÉP – új eszközök
    HeicJpgTool:       () => import("../tools/kep/HeicJpgTool.svelte"),
    HeicPngTool:       () => import("../tools/kep/HeicPngTool.svelte"),
    JpgAvifTool:       () => import("../tools/kep/JpgAvifTool.svelte"),
    PngAvifTool:       () => import("../tools/kep/PngAvifTool.svelte"),
    KepBase64Tool:     () => import("../tools/kep/KepBase64Tool.svelte"),
    KepIcoTool:        () => import("../tools/kep/KepIcoTool.svelte"),
    AtmeterezesKbTool: () => import("../tools/kep/AtmeterezesKbTool.svelte"),
    GifKeszito:        () => import("../tools/kep/GifKeszito.svelte"),
    GifWebpAnimalt:    () => import("../tools/kep/GifWebpAnimalt.svelte"),
    SvgPngTool:        () => import("../tools/kep/SvgPngTool.svelte"),
    KepCollage:        () => import("../tools/kep/KepCollage.svelte"),
    SzinPaletta:       () => import("../tools/kep/SzinPaletta.svelte"),
    AutomatikusVagas:  () => import("../tools/kep/AutomatikusVagas.svelte"),
    ExifTerkep:        () => import("../tools/kep/ExifTerkep.svelte"),
    SpriteVago:        () => import("../tools/kep/SpriteVago.svelte"),
    // PDF
    PdfMergeTool: () => import("../tools/pdf/PdfMergeTool.svelte"),
    PdfSplitTool: () => import("../tools/pdf/PdfSplitTool.svelte"),
    PdfOldalakKivalasztasaTool: () => import("../tools/pdf/PdfOldalakKivalasztasaTool.svelte"),
    PdfOldalakSorrendjeTool: () => import("../tools/pdf/PdfOldalakSorrendjeTool.svelte"),
    PdfOldalakForgatasaTool: () => import("../tools/pdf/PdfOldalakForgatasaTool.svelte"),
    PdfOldalakTorleseTool: () => import("../tools/pdf/PdfOldalakTorleseTool.svelte"),
    PdfKeppeTool: () => import("../tools/pdf/PdfKeppeTool.svelte"),
    KepekPdfbeTool: () => import("../tools/pdf/KepekPdfbeTool.svelte"),
    PdfInfoTool: () => import("../tools/pdf/PdfInfoTool.svelte"),
    PdfCompressTool: () => import("../tools/pdf/PdfCompressTool.svelte"),
    PdfWatermarkTool: () => import("../tools/pdf/PdfWatermarkTool.svelte"),
    PdfPageNumbersTool: () => import("../tools/pdf/PdfPageNumbersTool.svelte"),
    PdfExtractTextTool: () => import("../tools/pdf/PdfExtractTextTool.svelte"),
    PdfSignTool: () => import("../tools/pdf/PdfSignTool.svelte"),
    PdfPasswordProtectTool: () => import("../tools/pdf/PdfPasswordProtectTool.svelte"),
    PdfPasswordRemoveTool: () => import("../tools/pdf/PdfPasswordRemoveTool.svelte"),
    PdfRedactTool: () => import("../tools/pdf/PdfRedactTool.svelte"),
    // ADAT
    CsvJsonTool: () => import("../tools/adat/CsvJsonTool.svelte"),
    JsonCsvTool: () => import("../tools/adat/JsonCsvTool.svelte"),
    DelimiterConvertTool: () => import("../tools/adat/DelimiterConvertTool.svelte"),
    CsvTisztitasTool: () => import("../tools/adat/CsvTisztitasTool.svelte"),
    FejlecAtnevezesTool: () => import("../tools/adat/FejlecAtnevezesTool.svelte"),
    OszlopKivalasztasTool: () => import("../tools/adat/OszlopKivalasztasTool.svelte"),
    SorokSzureseTool: () => import("../tools/adat/SorokSzureseTool.svelte"),
    OszlopSzetvalasztasTool: () => import("../tools/adat/OszlopSzetvalasztasTool.svelte"),
    ErtekekNormalizalasaTool: () => import("../tools/adat/ErtekekNormalizalasaTool.svelte"),
    TomegesKonvertalasZipTool: () => import("../tools/adat/TomegesKonvertalasZipTool.svelte"),
    // SZÖVEG
    SlugGeneratorTool: () => import("../tools/szoveg/SlugGeneratorTool.svelte"),
    TextTransformTool: () => import("../tools/shared/TextTransformTool.svelte"),
    KarakterCsereTool: () => import("../tools/szoveg/KarakterCsereTool.svelte"),
    KeresesCsereTool: () => import("../tools/szoveg/KeresesCsereTool.svelte"),
    RegexCsereTool: () => import("../tools/szoveg/RegexCsereTool.svelte"),
    // FEJLESZTŐ
    JsonFormazasTool: () => import("../tools/fejleszto/JsonFormazasTool.svelte"),
    JsonMinimalasTool: () => import("../tools/fejleszto/JsonMinimalasTool.svelte"),
    JsonEllenorzesTool: () => import("../tools/fejleszto/JsonEllenorzesTool.svelte"),
    CodeFormatterTool: () => import("../tools/shared/CodeFormatterTool.svelte"),
    Base64Tool: () => import("../tools/fejleszto/Base64Tool.svelte"),
    UrlKodoloTool: () => import("../tools/fejleszto/UrlKodoloTool.svelte"),
    HtmlEntityTool: () => import("../tools/fejleszto/HtmlEntityTool.svelte"),
    // MARKDOWN
    MarkdownHtmlTool: () => import("../tools/markdown/MarkdownHtmlTool.svelte"),
    MarkdownViewerTool: () => import("../tools/markdown/MarkdownViewerTool.svelte"),
    // HTML
    HtmlTextTool: () => import("../tools/html/HtmlTextTool.svelte"),
    HtmlMinTool: () => import("../tools/html/HtmlMinTool.svelte"),
    // EXCEL
    XlsxCsvTool: () => import("../tools/excel/XlsxCsvTool.svelte"),
    XlsxJsonTool: () => import("../tools/excel/XlsxJsonTool.svelte"),
    CsvXlsxTool: () => import("../tools/excel/CsvXlsxTool.svelte"),
    XlsxMegtekinteTool: () => import("../tools/excel/XlsxMegtekinteTool.svelte"),
    // FÁJL
    ZipKeszitoTool: () => import("../tools/fajl/ZipKeszitoTool.svelte"),
    ZipKibontoTool: () => import("../tools/fajl/ZipKibontoTool.svelte"),
    HashTool: () => import("../tools/fajl/HashTool.svelte"),
    FajlInfoTool: () => import("../tools/fajl/FajlInfoTool.svelte"),
    // SEO
    TitleMetaHosszTool: () => import("../tools/seo/TitleMetaHosszTool.svelte"),
    // CONVERSII (RO-only)
    UnitConverter:           () => import("../tools/shared/UnitConverter.svelte"),
    CmMeterCalculator:       () => import("../tools/conversii/CmMeterCalculator.svelte"),
    KmMeterCalculator:       () => import("../tools/conversii/KmMeterCalculator.svelte"),
    RulerConverter:          () => import("../tools/conversii/RulerConverter.svelte"),
    KgGramCalculator:        () => import("../tools/conversii/KgGramCalculator.svelte"),
    LiterMlCalculator:       () => import("../tools/conversii/LiterMlCalculator.svelte"),
    ThermometerConverter:    () => import("../tools/conversii/ThermometerConverter.svelte"),
    // CALCULATOR (RO-only) – Fázis 2
    ProcentCalculator:           () => import("../tools/calculator/ProcentCalculator.svelte"),
    EcuatieGradDoiCalculator:    () => import("../tools/calculator/EcuatieGradDoiCalculator.svelte"),
    EcuatieExponentialaCalculator: () => import("../tools/calculator/EcuatieExponentialaCalculator.svelte"),
    MedieCalculator:             () => import("../tools/calculator/MedieCalculator.svelte"),
    RegulaDeTreiCalculator:      () => import("../tools/calculator/RegulaDeTreiCalculator.svelte"),
    NumereRomaneCalculator:      () => import("../tools/calculator/NumereRomaneCalculator.svelte"),
    CmmdcCmmmcCalculator:        () => import("../tools/calculator/CmmdcCmmmcCalculator.svelte"),
    FractiiCalculator:           () => import("../tools/calculator/FractiiCalculator.svelte"),
    CombinatoricaCalculator:     () => import("../tools/calculator/CombinatoricaCalculator.svelte"),
    // GEOMETRIE (RO-only) – Fázis 3
    TriunghiDreptCalculator:     () => import("../tools/geometrie/TriunghiDreptCalculator.svelte"),
    FunctiiTrigCalculator:       () => import("../tools/geometrie/FunctiiTrigCalculator.svelte"),
    RadianiGradeCalculator:      () => import("../tools/geometrie/RadianiGradeCalculator.svelte"),
    CercCalculator:              () => import("../tools/geometrie/CercCalculator.svelte"),
    DreptunghiCalculator:        () => import("../tools/geometrie/DreptunghiCalculator.svelte"),
    // CONVERSII (RO-only) – Fázis 4 (set complet de unități)
    MileKmCalculator:            () => import("../tools/conversii/MileKmCalculator.svelte"),
    VitezaCalculator:            () => import("../tools/conversii/VitezaCalculator.svelte"),
    DateMarimeCalculator:        () => import("../tools/conversii/DateMarimeCalculator.svelte"),
    FootCmCalculator:            () => import("../tools/conversii/FootCmCalculator.svelte"),
    InchCmCalculator:            () => import("../tools/conversii/InchCmCalculator.svelte"),
    KgLivreCalculator:           () => import("../tools/conversii/KgLivreCalculator.svelte"),
    ToneKgCalculator:            () => import("../tools/conversii/ToneKgCalculator.svelte"),
    HectareCalculator:           () => import("../tools/conversii/HectareCalculator.svelte"),
    AriCalculator:               () => import("../tools/conversii/AriCalculator.svelte"),
    LitriDlCalculator:           () => import("../tools/conversii/LitriDlCalculator.svelte"),
    LitriM3Calculator:           () => import("../tools/conversii/LitriM3Calculator.svelte"),
    GalonLitriCalculator:        () => import("../tools/conversii/GalonLitriCalculator.svelte"),
    BetonCalculator:             () => import("../tools/conversii/BetonCalculator.svelte"),
    DensitateCalculator:         () => import("../tools/conversii/DensitateCalculator.svelte"),
    // CONVERSII (RO-only) – Fázis 4 cleanup (3 convertoare densitate construcții)
    NisipCalculator:             () => import("../tools/conversii/NisipCalculator.svelte"),
    PietrisCalculator:           () => import("../tools/conversii/PietrisCalculator.svelte"),
    BalastCalculator:            () => import("../tools/conversii/BalastCalculator.svelte"),
    // CALCULATOR (RO-only) – Fázis 4 cleanup (consum combustibil mutat din conversii)
    ConsumCombustibilCalculator: () => import("../tools/calculator/ConsumCombustibilCalculator.svelte"),
    // FINANTE (RO-only) – Fázis 5
    TvaCalculator:               () => import("../tools/finante/TvaCalculator.svelte"),
    CreditCalculator:            () => import("../tools/finante/CreditCalculator.svelte"),
    DobandaCompusaCalculator:    () => import("../tools/finante/DobandaCompusaCalculator.svelte"),
    ReducereCalculator:          () => import("../tools/finante/ReducereCalculator.svelte"),
    MarjaCalculator:             () => import("../tools/finante/MarjaCalculator.svelte"),
    SalariuOraCalculator:        () => import("../tools/finante/SalariuOraCalculator.svelte"),
    // SANATATE (RO-only) – Fázis 6
    ImcCalculator:               () => import("../tools/sanatate/ImcCalculator.svelte"),
    GreutateIdealaCalculator:    () => import("../tools/sanatate/GreutateIdealaCalculator.svelte"),
    CaloriiCalculator:           () => import("../tools/sanatate/CaloriiCalculator.svelte"),
    SarcinaCalculator:           () => import("../tools/sanatate/SarcinaCalculator.svelte"),
    AlcoolemieCalculator:        () => import("../tools/sanatate/AlcoolemieCalculator.svelte"),
    PulsZoneCalculator:          () => import("../tools/sanatate/PulsZoneCalculator.svelte"),
    // TIMP (RO-only) – Fázis 7
    DiferentaDateCalculator:     () => import("../tools/timp/DiferentaDateCalculator.svelte"),
    CraciunCountdown:            () => import("../tools/timp/CraciunCountdown.svelte"),
    RevelionCountdown:           () => import("../tools/timp/RevelionCountdown.svelte"),
    PastiCountdown:              () => import("../tools/timp/PastiCountdown.svelte"),
    ZiuaNationalaCountdown:      () => import("../tools/timp/ZiuaNationalaCountdown.svelte"),
    MartisorCountdown:           () => import("../tools/timp/MartisorCountdown.svelte"),
    ZiuaFemeiiCountdown:         () => import("../tools/timp/ZiuaFemeiiCountdown.svelte"),
    DragobeteCountdown:          () => import("../tools/timp/DragobeteCountdown.svelte"),
    AnotimpCountdown:            () => import("../tools/timp/AnotimpCountdown.svelte"),
    ZiNastereCountdown:          () => import("../tools/timp/ZiNastereCountdown.svelte"),
    CountdownGenerator:          () => import("../tools/timp/CountdownGenerator.svelte"),
    CateZileAmCalculator:        () => import("../tools/timp/CateZileAmCalculator.svelte"),
    BacalaureatCountdown:        () => import("../tools/timp/BacalaureatCountdown.svelte"),
    // FEJLESZTO (RO-only barcode + QR) – Fázis 8
    CodBareGenerator:            () => import("../tools/fejleszto/CodBareGenerator.svelte"),
    CodQrGenerator:              () => import("../tools/fejleszto/CodQrGenerator.svelte"),
  };

  onMount(async () => {
    if (!componentName || !COMPONENT_IMPORTS[componentName]) {
      loading = false;
      error = true;
      return;
    }
    try {
      const mod = await COMPONENT_IMPORTS[componentName]();
      ToolComponent = mod.default;
    } catch (e) {
      console.error(`Failed to load component: ${componentName}`, e);
      error = true;
    }
    loading = false;
  });
</script>

{#if loading}
  <div class="tool-loading">
    <div class="tool-loading__spinner"></div>
  </div>
{:else if ToolComponent}
  <svelte:component this={ToolComponent} {...componentProps} />
{:else if error}
  <div class="tool-error">
    <p>Component could not be loaded.</p>
  </div>
{/if}

<style>
  .tool-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }
  .tool-loading__spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--border, #ddd);
    border-top-color: var(--accent, #333);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
