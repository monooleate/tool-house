<script lang="ts">
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";

  // ─── Timing ─────────────────────────────────────────────
  const TOOL_SLUG = "slug-generator";
  const timing = getTimingConfig(TOOL_SLUG);

  const HU_MAP: Record<string, string> = {
    á:"a",Á:"a",é:"e",É:"e",í:"i",Í:"i",ó:"o",Ó:"o",ö:"o",Ö:"o",ő:"o",Ő:"o",ú:"u",Ú:"u",ü:"u",Ü:"u",ű:"u",Ű:"u",
  };

  function toSlug(str: string, sep: string): string {
    return str
      .split("").map((c) => HU_MAP[c] ?? c).join("")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s_-]/g, "")
      .trim()
      .replace(/[\s_]+/g, sep)
      .replace(new RegExp(`[${sep === "." ? "\\." : sep}]+`, "g"), sep);
  }

  let input  = "";
  let sep    = "-";
  let lines  = false;
  let copied = false;

  let isConverting = false;
  let isDone = false;
  let convertBtnRef: ConvertButton;

  $: slugResult = lines
    ? input.split("\n").filter(l => l.trim()).map(l => toSlug(l, sep)).join("\n")
    : toSlug(input, sep);

  $: canConvert = input.trim().length > 0;

  // ─── ConvertButton callbacks ──────────────────────────────
  function doConvert() {
    // Slug already generated reactively — just mark done
    isConverting = false;
    isDone = true;
  }

  async function doDownload() {
    // "Download" = copy to clipboard
    try {
      await navigator.clipboard.writeText(slugResult);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {}
  }

  // Reset when input changes
  $: if (input || sep) {
    isDone = false;
    isConverting = false;
    if (convertBtnRef) convertBtnRef.reset();
  }

  const EXAMPLES = [
    "Hogyan optimalizálj képeket WebP-re?",
    "10 legjobb SEO eszköz 2025-ben",
    "Ingyenes online képkonvertáló",
  ];
</script>

<div class="slug-tool">
  <div class="card settings-card">
    <div class="settings-row">
      <span class="label">Elválasztó karakter</span>
      <div class="sep-opts">
        {#each [["-","Kötőjel (-)"],["_","Alulvonás (_)"],[".", "Pont (.)"]] as [v, l]}
          <label class="sep-opt">
            <input type="radio" name="sep" value={v} bind:group={sep} />
            <span>{l}</span>
          </label>
        {/each}
      </div>
    </div>
    <label class="checkbox-label">
      <input type="checkbox" bind:checked={lines} />
      Több sor feldolgozása egyszerre
    </label>
  </div>

  <div class="io-grid">
    <div class="io-pane">
      <label class="label" for="slug-input">Szöveg</label>
      <textarea id="slug-input" class="textarea" rows={lines ? 6 : 3}
        placeholder="pl. Hogyan optimalizálj képeket WebP-re?"
        bind:value={input}
      ></textarea>
      <div class="examples">
        <span class="examples__label">Példák:</span>
        {#each EXAMPLES as ex}
          <button class="btn btn--ghost btn--sm" on:click={() => (input = ex)}>{ex.slice(0,30)}…</button>
        {/each}
      </div>
    </div>

    <div class="io-pane">
      <div class="output-header">
        <span class="label">Slug eredmény</span>
        {#if copied}
          <span class="copied-badge">✓ Másolva!</span>
        {/if}
      </div>
      <div class="slug-output" class:slug-output--empty={!slugResult}>
        {#if slugResult}
          <pre class="slug-pre">{slugResult}</pre>
        {:else}
          <span class="slug-placeholder">A slug itt jelenik meg…</span>
        {/if}
      </div>
      {#if slugResult}
        <div class="slug-meta">
          {slugResult.split("\n").length > 1 ? slugResult.split("\n").length + " slug generálva" : slugResult.length + " karakter"}
        </div>
      {/if}
    </div>
  </div>

  <!-- Ad slot: konvertálás előtti ablak -->
  <AdSlot show={timing.showAdSlot} slot="before-convert" />

  <!-- ConvertButton: Slug generálás → Másolás vágólapra -->
  {#if canConvert}
    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      {canConvert}
      {isConverting}
      {isDone}
      onConvert={doConvert}
      onDownload={doDownload}
      convertLabel="Slug generálás"
      downloadLabel="Másolás vágólapra"
    />
  {/if}

  <!-- Ad slot: letöltés előtti ablak -->
  <AdSlot show={timing.showAdSlot} slot="before-download" />
</div>

<style>
.slug-tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.settings-row { display: flex; flex-direction: column; gap: var(--sp-2); }
.sep-opts { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
.sep-opt { display: flex; align-items: center; gap: var(--sp-2); cursor: pointer; font-size: .9rem; color: var(--text-muted); }
.sep-opt input { accent-color: var(--accent); }
.checkbox-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .9rem; color: var(--text-muted); cursor: pointer; }
.checkbox-label input { accent-color: var(--accent); width: 16px; height: 16px; }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); }
@media (max-width: 640px) { .io-grid { grid-template-columns: 1fr; } }
.io-pane { display: flex; flex-direction: column; gap: var(--sp-3); }
.examples { display: flex; flex-wrap: wrap; gap: var(--sp-2); align-items: center; }
.examples__label { font-family: var(--font-mono); font-size: .72rem; color: var(--text-subtle); text-transform: uppercase; }
.output-header { display: flex; align-items: center; justify-content: space-between; }
.copied-badge { font-family: var(--font-mono); font-size: .8rem; color: var(--accent); font-weight: 700; }
.slug-output { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); min-height: 90px; padding: var(--sp-4); display: flex; align-items: flex-start; }
.slug-output--empty { align-items: center; justify-content: center; }
.slug-placeholder { color: var(--text-subtle); font-size: .875rem; }
.slug-pre { font-family: var(--font-mono); font-size: .9rem; color: var(--accent); white-space: pre-wrap; word-break: break-all; margin: 0; background: none; border: none; padding: 0; }
.slug-meta { font-family: var(--font-mono); font-size: .75rem; color: var(--text-subtle); }
</style>
