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
