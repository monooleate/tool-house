<script lang="ts">
  import { onMount } from "svelte";

  type EccLevel = "L" | "M" | "Q" | "H";

  // Preset center icons — emoji rendered to canvas for max compatibility & zero asset weight.
  // Mix of fun and common picks: contact card, wifi, link, heart, music, location, phone, mail, gift, party.
  type Preset = { id: string; emoji: string; label: string; group: "comune" | "amuzante" };
  const PRESETS: Preset[] = [
    { id: "link",     emoji: "🔗", label: "Link",      group: "comune" },
    { id: "wifi",     emoji: "📶", label: "Wi-Fi",     group: "comune" },
    { id: "phone",    emoji: "📞", label: "Telefon",   group: "comune" },
    { id: "mail",     emoji: "✉️", label: "E-mail",    group: "comune" },
    { id: "card",     emoji: "💳", label: "Plată",     group: "comune" },
    { id: "location", emoji: "📍", label: "Locație",   group: "comune" },
    { id: "music",    emoji: "🎵", label: "Muzică",    group: "comune" },
    { id: "heart",    emoji: "❤️", label: "Inimă",     group: "comune" },
    // amuzante
    { id: "ghost",    emoji: "👻", label: "Fantomă",   group: "amuzante" },
    { id: "robot",    emoji: "🤖", label: "Robot",     group: "amuzante" },
    { id: "alien",    emoji: "👽", label: "Extraterestru", group: "amuzante" },
    { id: "rocket",   emoji: "🚀", label: "Rachetă",   group: "amuzante" },
    { id: "party",    emoji: "🎉", label: "Petrecere", group: "amuzante" },
    { id: "pizza",    emoji: "🍕", label: "Pizza",     group: "amuzante" },
    { id: "cat",      emoji: "🐱", label: "Pisică",    group: "amuzante" },
    { id: "unicorn",  emoji: "🦄", label: "Unicorn",   group: "amuzante" },
    { id: "skull",    emoji: "💀", label: "Cap mort",  group: "amuzante" },
    { id: "fire",     emoji: "🔥", label: "Foc",       group: "amuzante" },
    { id: "poo",      emoji: "💩", label: "Caca",      group: "amuzante" },
    { id: "smile",    emoji: "😎", label: "Cool",      group: "amuzante" },
  ];

  // Module shape — best practice: finder patterns always solid squares
  // (scanner reliability), only data modules are styled.
  type ModuleStyle = "square" | "dots" | "rounded";

  let value = $state<string>("https://instrumenteonline.ro");
  let ecc = $state<EccLevel>("H");
  let pixelSize = $state<number>(8);
  let margin = $state<number>(2);
  let darkColor = $state<string>("#000000");
  let lightColor = $state<string>("#ffffff");
  let moduleStyle = $state<ModuleStyle>("square");

  // Icon state
  let iconKind = $state<"none" | "preset" | "upload">("none");
  let presetId = $state<string>("link");
  let uploadDataUrl = $state<string>("");
  let uploadFileName = $state<string>("");
  let iconScale = $state<number>(0.22); // 22% of QR size — safe with H ECC

  let advancedOpen = $state<boolean>(true);
  let copied = $state<boolean>(false);

  let canvasEl: HTMLCanvasElement | undefined = $state();
  let svgString = $state<string>("");
  let QRCode: any = $state(null);
  let libError = $state<string>("");
  let renderError = $state<string>("");

  const validation = $derived.by((): { ok: boolean; msg: string } => {
    const v = value.trim();
    if (!v) return { ok: false, msg: "Introdu textul, URL-ul sau datele de codat." };
    // QR code v40 cu ECC H = ~1273 caractere alfanumerice; mai prudent ne oprim aici.
    if (v.length > 1500) return { ok: false, msg: `Prea lung (${v.length}). Limita practică: 1500 caractere.` };
    return { ok: true, msg: "" };
  });

  const eccCapacity: Record<EccLevel, { recover: string; capAlnum: number }> = {
    L: { recover: "~7%",  capAlnum: 4296 },
    M: { recover: "~15%", capAlnum: 3391 },
    Q: { recover: "~25%", capAlnum: 2420 },
    H: { recover: "~30%", capAlnum: 1852 },
  };

  onMount(async () => {
    try {
      const mod: any = await import("qrcode");
      QRCode = mod.default ?? mod;
    } catch (e) {
      libError = `Eroare la încărcarea librăriei QRCode: ${e instanceof Error ? e.message : String(e)}`;
    }
  });

  function drawIconOnCanvas(c: HTMLCanvasElement, callback?: () => void) {
    if (iconKind === "none") { callback?.(); return; }

    const ctx = c.getContext("2d");
    if (!ctx) { callback?.(); return; }

    const w = c.width;
    const iconBoxSize = Math.round(w * iconScale);
    const x = (w - iconBoxSize) / 2;
    const y = (w - iconBoxSize) / 2;
    const padding = Math.max(4, Math.round(iconBoxSize * 0.08));
    const radius = Math.round(iconBoxSize * 0.18);

    // White rounded background
    ctx.save();
    ctx.fillStyle = lightColor;
    roundRect(ctx, x - padding, y - padding, iconBoxSize + 2 * padding, iconBoxSize + 2 * padding, radius);
    ctx.fill();
    ctx.restore();

    if (iconKind === "preset") {
      const preset = PRESETS.find(p => p.id === presetId) ?? PRESETS[0];
      ctx.save();
      ctx.font = `${Math.round(iconBoxSize * 0.85)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(preset.emoji, w / 2, w / 2 + Math.round(iconBoxSize * 0.04));
      ctx.restore();
      callback?.();
      return;
    }

    if (iconKind === "upload" && uploadDataUrl) {
      const img = new Image();
      img.onload = () => {
        // Aspect-ratio fit
        const ratio = img.width / img.height;
        let dw = iconBoxSize, dh = iconBoxSize;
        if (ratio > 1) dh = iconBoxSize / ratio;
        else dw = iconBoxSize * ratio;
        const dx = (w - dw) / 2;
        const dy = (w - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
        callback?.();
      };
      img.onerror = () => callback?.();
      img.src = uploadDataUrl;
      return;
    }
    callback?.();
  }

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y,     x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x,     y + h, rr);
    ctx.arcTo(x,     y + h, x,     y,     rr);
    ctx.arcTo(x,     y,     x + w, y,     rr);
    ctx.closePath();
  }

  // Finder pattern detection — always render as solid squares for scan reliability.
  // The 3 corner finder patterns are 7×7 modules in top-left, top-right, bottom-left.
  function isInFinderPattern(row: number, col: number, size: number): boolean {
    return (row < 7 && col < 7)
      || (row < 7 && col >= size - 7)
      || (row >= size - 7 && col < 7);
  }

  function roundCanvasRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y,     x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x,     y + h, rr);
    ctx.arcTo(x,     y + h, x,     y,     rr);
    ctx.arcTo(x,     y,     x + w, y,     rr);
    ctx.closePath();
  }

  function renderMatrixToCanvas(canvas: HTMLCanvasElement, modules: { size: number; data: Uint8Array }) {
    const { size, data } = modules;
    const totalSize = (size + 2 * margin) * pixelSize;
    canvas.width = totalSize;
    canvas.height = totalSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = lightColor;
    ctx.fillRect(0, 0, totalSize, totalSize);
    ctx.fillStyle = darkColor;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!data[row * size + col]) continue;
        const x = (col + margin) * pixelSize;
        const y = (row + margin) * pixelSize;
        const useSquare = moduleStyle === "square" || isInFinderPattern(row, col, size);

        if (useSquare) {
          ctx.fillRect(x, y, pixelSize, pixelSize);
        } else if (moduleStyle === "dots") {
          const r = pixelSize / 2;
          ctx.beginPath();
          ctx.arc(x + r, y + r, r * 0.85, 0, Math.PI * 2);
          ctx.fill();
        } else if (moduleStyle === "rounded") {
          roundCanvasRect(ctx, x, y, pixelSize, pixelSize, pixelSize * 0.3);
          ctx.fill();
        }
      }
    }
  }

  function buildSvgFromMatrix(modules: { size: number; data: Uint8Array }): string {
    const { size, data } = modules;
    const totalSize = (size + 2 * margin) * pixelSize;
    const parts: string[] = [];
    parts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}" width="${totalSize}" height="${totalSize}" shape-rendering="crispEdges">`);
    parts.push(`<rect width="${totalSize}" height="${totalSize}" fill="${lightColor}"/>`);

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!data[row * size + col]) continue;
        const x = (col + margin) * pixelSize;
        const y = (row + margin) * pixelSize;
        const useSquare = moduleStyle === "square" || isInFinderPattern(row, col, size);

        if (useSquare) {
          parts.push(`<rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" fill="${darkColor}"/>`);
        } else if (moduleStyle === "dots") {
          const r = pixelSize / 2;
          parts.push(`<circle cx="${x + r}" cy="${y + r}" r="${r * 0.85}" fill="${darkColor}"/>`);
        } else if (moduleStyle === "rounded") {
          const radius = pixelSize * 0.3;
          parts.push(`<rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" rx="${radius}" ry="${radius}" fill="${darkColor}"/>`);
        }
      }
    }

    parts.push(injectIconNode(totalSize));
    parts.push(`</svg>`);
    return parts.join("");
  }

  function injectIconNode(W: number): string {
    if (iconKind === "none") return "";
    const iconSize = W * iconScale;
    const x = (W - iconSize) / 2;
    const pad = Math.max(2, iconSize * 0.08);
    const r = iconSize * 0.18;
    const bg = `<rect x="${x - pad}" y="${x - pad}" width="${iconSize + 2 * pad}" height="${iconSize + 2 * pad}" rx="${r}" ry="${r}" fill="${lightColor}"/>`;

    if (iconKind === "preset") {
      const preset = PRESETS.find(p => p.id === presetId) ?? PRESETS[0];
      const fontSize = iconSize * 0.85;
      return `${bg}<text x="${W / 2}" y="${W / 2 + fontSize * 0.34}" font-size="${fontSize}" text-anchor="middle" font-family='Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif'>${preset.emoji}</text>`;
    }
    if (iconKind === "upload" && uploadDataUrl) {
      return `${bg}<image href="${escapeXml(uploadDataUrl)}" x="${x}" y="${x}" width="${iconSize}" height="${iconSize}" preserveAspectRatio="xMidYMid meet"/>`;
    }
    return "";
  }

  function escapeXml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Render reactiv — folosim QRCode.create() pentru a obține matricea de module
  // și o desenăm manual cu stilul ales (square/dots/rounded).
  $effect(() => {
    if (!QRCode || !validation.ok || !canvasEl) return;
    renderError = "";
    const v = value.trim();

    let qr: { modules: { size: number; data: Uint8Array } };
    try {
      qr = QRCode.create(v, { errorCorrectionLevel: ecc });
    } catch (e) {
      renderError = e instanceof Error ? e.message : String(e);
      return;
    }

    renderMatrixToCanvas(canvasEl, qr.modules);
    drawIconOnCanvas(canvasEl);
    svgString = buildSvgFromMatrix(qr.modules);

    // referințe reactive — make Svelte track these dependencies
    void moduleStyle; void iconKind; void presetId; void uploadDataUrl; void iconScale; void margin; void pixelSize; void darkColor; void lightColor;
  });

  function onUpload(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      renderError = "Te rog, încarcă un fișier imagine (PNG/JPG/SVG/WebP).";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      renderError = "Imaginea este prea mare. Limită: 2 MB.";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      uploadDataUrl = String(reader.result || "");
      uploadFileName = file.name;
      iconKind = "upload";
    };
    reader.readAsDataURL(file);
  }

  function clearUpload() {
    uploadDataUrl = "";
    uploadFileName = "";
    if (iconKind === "upload") iconKind = "none";
  }

  function downloadPNG() {
    if (!canvasEl || !validation.ok) return;
    const a = document.createElement("a");
    a.download = `qr-${Date.now()}.png`;
    a.href = canvasEl.toDataURL("image/png");
    a.click();
  }

  function downloadSVG() {
    if (!svgString || !validation.ok) return;
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `qr-${Date.now()}.svg`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch {}
  }

  // Quick-fill template helpers
  function fillTemplate(kind: "url" | "wifi" | "vcard" | "geo" | "tel" | "mail") {
    if (kind === "url")   value = "https://instrumenteonline.ro";
    if (kind === "wifi")  value = "WIFI:T:WPA;S:NumeReteaWiFi;P:parolaTa123;;";
    if (kind === "vcard") value = "BEGIN:VCARD\nVERSION:3.0\nFN:Ion Popescu\nTEL:+40712345678\nEMAIL:ion@exemplu.ro\nEND:VCARD";
    if (kind === "geo")   value = "geo:44.4268,26.1025"; // București
    if (kind === "tel")   value = "tel:+40712345678";
    if (kind === "mail")  value = "mailto:contact@instrumenteonline.ro?subject=Salut";
  }
</script>

<div class="tool">
  {#if libError}
    <div class="error-banner" role="alert">{libError}</div>
  {/if}

  <!-- Input -->
  <div class="card input-card">
    <label class="label" for="qr-input">Conținut</label>
    <div class="input-row">
      <textarea
        id="qr-input"
        class="textarea"
        class:textarea--invalid={!validation.ok}
        bind:value
        rows="3"
        placeholder="https://exemplu.ro  •  text  •  WIFI:T:WPA;S:..  •  vCard"
        aria-invalid={!validation.ok}
        aria-describedby="qr-status"
        autocomplete="off"
      ></textarea>
      <button type="button" class="btn btn--ghost" onclick={copyValue} disabled={!value}>{copied ? "✓" : "📋"}</button>
    </div>

    <div class="templates">
      <span class="templates__label">Șabloane rapide:</span>
      <button type="button" class="chip" onclick={() => fillTemplate("url")}>🔗 URL</button>
      <button type="button" class="chip" onclick={() => fillTemplate("wifi")}>📶 Wi-Fi</button>
      <button type="button" class="chip" onclick={() => fillTemplate("vcard")}>👤 vCard</button>
      <button type="button" class="chip" onclick={() => fillTemplate("tel")}>📞 Telefon</button>
      <button type="button" class="chip" onclick={() => fillTemplate("mail")}>✉️ E-mail</button>
      <button type="button" class="chip" onclick={() => fillTemplate("geo")}>📍 GPS</button>
    </div>

    <div id="qr-status" class="status" class:status--ok={validation.ok} class:status--bad={!validation.ok}>
      {#if validation.ok}
        <span>✓ {value.trim().length} caractere · ECC {ecc} (rezistență {eccCapacity[ecc].recover}, capacitate {eccCapacity[ecc].capAlnum} alnum)</span>
      {:else}
        <span>⚠️ {validation.msg}</span>
      {/if}
    </div>
  </div>

  <!-- Icon center -->
  <fieldset class="card icon-card">
    <legend class="legend">Pictogramă centrală (opțional)</legend>

    <div class="icon-modes">
      <label class="mode-pill" class:mode-pill--active={iconKind === "none"}>
        <input type="radio" bind:group={iconKind} value="none" /> Fără pictogramă
      </label>
      <label class="mode-pill" class:mode-pill--active={iconKind === "preset"}>
        <input type="radio" bind:group={iconKind} value="preset" /> Galerie presetări
      </label>
      <label class="mode-pill" class:mode-pill--active={iconKind === "upload"}>
        <input type="radio" bind:group={iconKind} value="upload" /> Încarcă imagine
      </label>
    </div>

    {#if iconKind === "preset"}
      <div class="preset-section">
        <h4 class="preset-group-title">Comune</h4>
        <div class="preset-grid">
          {#each PRESETS.filter(p => p.group === "comune") as preset}
            <button
              type="button"
              class="preset-btn"
              class:preset-btn--active={presetId === preset.id}
              aria-pressed={presetId === preset.id}
              title={preset.label}
              onclick={() => (presetId = preset.id)}
            >
              <span class="preset-emoji" aria-hidden="true">{preset.emoji}</span>
              <span class="preset-label">{preset.label}</span>
            </button>
          {/each}
        </div>

        <h4 class="preset-group-title">Amuzante 🎈</h4>
        <div class="preset-grid">
          {#each PRESETS.filter(p => p.group === "amuzante") as preset}
            <button
              type="button"
              class="preset-btn"
              class:preset-btn--active={presetId === preset.id}
              aria-pressed={presetId === preset.id}
              title={preset.label}
              onclick={() => (presetId = preset.id)}
            >
              <span class="preset-emoji" aria-hidden="true">{preset.emoji}</span>
              <span class="preset-label">{preset.label}</span>
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if iconKind === "upload"}
      <div class="upload-section">
        <label class="upload-drop">
          <input type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" onchange={onUpload} />
          <span class="upload-drop__icon" aria-hidden="true">📤</span>
          <span class="upload-drop__text">
            {uploadFileName || "Click pentru a încărca o imagine (PNG, JPG, SVG, WebP — max 2 MB)"}
          </span>
        </label>
        {#if uploadDataUrl}
          <div class="upload-preview">
            <img src={uploadDataUrl} alt="Preview pictogramă" />
            <button type="button" class="btn btn--ghost btn--sm" onclick={clearUpload}>✕ Elimină</button>
          </div>
        {/if}
      </div>
    {/if}

    {#if iconKind !== "none"}
      <label class="adv-item adv-item--icon">
        <span>Mărime pictogramă: <strong>{Math.round(iconScale * 100)}%</strong></span>
        <input type="range" min="0.10" max="0.30" step="0.01" bind:value={iconScale} />
        <small class="hint">Recomandat 18-25% cu nivel ECC <strong>H</strong>. Scanează codul după export.</small>
      </label>
    {/if}
  </fieldset>

  <!-- Advanced settings (above preview for better discoverability) -->
  <details class="card advanced" bind:open={advancedOpen}>
    <summary>⚙️ Opțiuni avansate</summary>
    <div class="adv-grid">
      <div class="adv-item adv-item--full">
        <span>Stil module (forma punctelor)</span>
        <div class="style-chips">
          <button
            type="button"
            class="style-chip"
            class:style-chip--active={moduleStyle === "square"}
            aria-pressed={moduleStyle === "square"}
            onclick={() => (moduleStyle = "square")}
            title="Pătrate clasice — compatibilitate maximă"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <rect x="2"  y="2"  width="6" height="6" fill="currentColor"/>
              <rect x="9"  y="2"  width="6" height="6" fill="currentColor"/>
              <rect x="16" y="2"  width="6" height="6" fill="currentColor"/>
              <rect x="2"  y="9"  width="6" height="6" fill="currentColor"/>
              <rect x="16" y="9"  width="6" height="6" fill="currentColor"/>
              <rect x="2"  y="16" width="6" height="6" fill="currentColor"/>
              <rect x="9"  y="16" width="6" height="6" fill="currentColor"/>
              <rect x="16" y="16" width="6" height="6" fill="currentColor"/>
            </svg>
            <span>Pătrat</span>
          </button>
          <button
            type="button"
            class="style-chip"
            class:style-chip--active={moduleStyle === "dots"}
            aria-pressed={moduleStyle === "dots"}
            onclick={() => (moduleStyle = "dots")}
            title="Puncte rotunde — design modern"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <circle cx="5"  cy="5"  r="2.5" fill="currentColor"/>
              <circle cx="12" cy="5"  r="2.5" fill="currentColor"/>
              <circle cx="19" cy="5"  r="2.5" fill="currentColor"/>
              <circle cx="5"  cy="12" r="2.5" fill="currentColor"/>
              <circle cx="19" cy="12" r="2.5" fill="currentColor"/>
              <circle cx="5"  cy="19" r="2.5" fill="currentColor"/>
              <circle cx="12" cy="19" r="2.5" fill="currentColor"/>
              <circle cx="19" cy="19" r="2.5" fill="currentColor"/>
            </svg>
            <span>Puncte</span>
          </button>
          <button
            type="button"
            class="style-chip"
            class:style-chip--active={moduleStyle === "rounded"}
            aria-pressed={moduleStyle === "rounded"}
            onclick={() => (moduleStyle = "rounded")}
            title="Pătrate cu colțuri rotunjite"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <rect x="2"  y="2"  width="6" height="6" rx="2" fill="currentColor"/>
              <rect x="9"  y="2"  width="6" height="6" rx="2" fill="currentColor"/>
              <rect x="16" y="2"  width="6" height="6" rx="2" fill="currentColor"/>
              <rect x="2"  y="9"  width="6" height="6" rx="2" fill="currentColor"/>
              <rect x="16" y="9"  width="6" height="6" rx="2" fill="currentColor"/>
              <rect x="2"  y="16" width="6" height="6" rx="2" fill="currentColor"/>
              <rect x="9"  y="16" width="6" height="6" rx="2" fill="currentColor"/>
              <rect x="16" y="16" width="6" height="6" rx="2" fill="currentColor"/>
            </svg>
            <span>Rotunjit</span>
          </button>
        </div>
        <small class="hint">💡 Pătratele finder din colțuri rămân întotdeauna solide pentru fiabilitate maximă la scanare.</small>
      </div>
      <label class="adv-item">
        <span>Nivel corectare erori (ECC)</span>
        <select bind:value={ecc} class="select">
          <option value="L">L — recuperare {eccCapacity.L.recover}, capacitate maximă</option>
          <option value="M">M — recuperare {eccCapacity.M.recover}</option>
          <option value="Q">Q — recuperare {eccCapacity.Q.recover}</option>
          <option value="H">H — recuperare {eccCapacity.H.recover}, recomandat cu pictogramă</option>
        </select>
      </label>
      <label class="adv-item">
        <span>Mărime pixel: <strong>{pixelSize}px</strong></span>
        <input type="range" min="4" max="20" step="1" bind:value={pixelSize} />
      </label>
      <label class="adv-item">
        <span>Margine (quiet zone): <strong>{margin} module</strong></span>
        <input type="range" min="0" max="6" step="1" bind:value={margin} />
      </label>
      <label class="adv-item">
        <span>Culoare module</span>
        <input type="color" bind:value={darkColor} />
      </label>
      <label class="adv-item">
        <span>Fundal</span>
        <input type="color" bind:value={lightColor} />
      </label>
    </div>
  </details>

  <!-- Preview -->
  <div class="card preview-card" role="img" aria-label="Previzualizare cod QR">
    {#if !QRCode}
      <div class="placeholder">⏳ Se încarcă generatorul QR...</div>
    {:else if !validation.ok}
      <div class="placeholder placeholder--err">⚠️ Corectează conținutul pentru a vedea codul.</div>
    {:else}
      <canvas bind:this={canvasEl} class="qr-canvas"></canvas>
    {/if}
    {#if renderError}
      <p class="render-err">⚠️ {renderError}</p>
    {/if}
  </div>

  <!-- Download -->
  <div class="card download-card">
    <h3 class="legend">Descărcare</h3>
    <div class="dl-row">
      <button type="button" class="btn btn--primary" onclick={downloadPNG} disabled={!validation.ok}>⬇️ PNG</button>
      <button type="button" class="btn btn--outline" onclick={downloadSVG} disabled={!validation.ok || !svgString}>⬇️ SVG (vector)</button>
    </div>
    <p class="hint">SVG e ideal pentru tipar mare (afișe, panouri). PNG funcționează în orice aplicație.</p>
  </div>

  <p class="disclaimer">
    ℹ️ Codurile QR generate sunt 100% gratuite și fără urmărire. Pentru codare rezistentă cu pictogramă, recomandăm <strong>ECC nivel H</strong> și pictogramă sub 25% din suprafață.
    Testează scanarea cu telefonul înainte de tipar.
  </p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--r-lg, 12px);
    padding: var(--sp-5);
  }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0 0 var(--sp-3); padding: 0; }
  .label { display: block; font-size: .875rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }

  .input-row { display: flex; gap: var(--sp-2); align-items: stretch; }
  .textarea {
    flex: 1; min-height: 80px;
    font-family: var(--font-mono, monospace);
    font-size: .9375rem;
    background: var(--bg-input);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: var(--r-md, 8px);
    padding: var(--sp-3) var(--sp-4);
    resize: vertical;
  }
  .textarea:focus { outline: none; border-color: var(--cat-fejleszto); }
  .textarea--invalid { border-color: #e11d48; }

  .templates { display: flex; flex-wrap: wrap; gap: var(--sp-2); margin-top: var(--sp-3); align-items: center; }
  .templates__label { font-size: .8125rem; color: var(--text-muted); margin-right: var(--sp-1); }
  .chip {
    background: var(--bg-input);
    border: 1px solid var(--border);
    color: var(--text);
    padding: var(--sp-2) var(--sp-3);
    border-radius: 999px;
    font-size: .8125rem;
    cursor: pointer;
    transition: all var(--t-fast, 0.15s);
  }
  .chip:hover { border-color: var(--cat-fejleszto); color: var(--cat-fejleszto); }

  .status { margin-top: var(--sp-3); font-size: .8125rem; }
  .status--ok  { color: #059669; }
  .status--bad { color: #e11d48; }

  /* Icon modes */
  .icon-modes { display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: var(--sp-4); }
  .mode-pill {
    display: inline-flex; align-items: center; gap: var(--sp-2);
    padding: var(--sp-2) var(--sp-4);
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--bg-input);
    color: var(--text-muted);
    font-size: .875rem;
    cursor: pointer;
    transition: all var(--t-fast, 0.15s);
  }
  .mode-pill input { accent-color: var(--cat-fejleszto); }
  .mode-pill--active { border-color: var(--cat-fejleszto); color: var(--text); background: color-mix(in srgb, var(--cat-fejleszto) 10%, var(--bg-card)); }

  .preset-group-title { font-size: .8125rem; color: var(--text-muted); margin: var(--sp-3) 0 var(--sp-2); font-weight: 600; }
  .preset-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: var(--sp-2);
  }
  .preset-btn {
    display: flex; flex-direction: column; align-items: center; gap: var(--sp-1);
    padding: var(--sp-3) var(--sp-2);
    background: var(--bg-input);
    border: 2px solid var(--border);
    border-radius: var(--r-md, 8px);
    cursor: pointer;
    transition: all var(--t-fast, 0.15s);
  }
  .preset-btn:hover { border-color: var(--cat-fejleszto); transform: translateY(-1px); }
  .preset-btn--active {
    border-color: var(--cat-fejleszto);
    background: color-mix(in srgb, var(--cat-fejleszto) 12%, var(--bg-card));
  }
  .preset-emoji { font-size: 1.75rem; line-height: 1; }
  .preset-label { font-size: .6875rem; color: var(--text-muted); text-align: center; }

  /* Upload */
  .upload-drop {
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--sp-2);
    padding: var(--sp-6);
    border: 2px dashed var(--border);
    border-radius: var(--r-md, 8px);
    background: var(--bg-input);
    cursor: pointer;
    transition: all var(--t-fast, 0.15s);
    text-align: center;
  }
  .upload-drop:hover { border-color: var(--cat-fejleszto); }
  .upload-drop input[type="file"] { display: none; }
  .upload-drop__icon { font-size: 1.5rem; }
  .upload-drop__text { font-size: .875rem; color: var(--text-muted); }
  .upload-preview { display: flex; align-items: center; gap: var(--sp-3); margin-top: var(--sp-3); }
  .upload-preview img { width: 56px; height: 56px; object-fit: contain; background: white; border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: 4px; }

  /* Preview */
  .preview-card {
    min-height: 320px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    border-style: dashed;
    background: var(--bg-input);
    gap: var(--sp-3);
  }
  .qr-canvas { max-width: 100%; height: auto; image-rendering: pixelated; }
  .placeholder { color: var(--text-muted); font-size: .9375rem; padding: var(--sp-6); text-align: center; }
  .placeholder--err { color: #e11d48; }
  .render-err { color: #e11d48; font-size: .8125rem; margin: 0; }

  /* Download */
  .dl-row { display: flex; gap: var(--sp-3); flex-wrap: wrap; }
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: var(--sp-2);
    padding: var(--sp-3) var(--sp-5);
    border-radius: var(--r-md, 8px);
    font-weight: 600;
    font-size: .9375rem;
    cursor: pointer;
    transition: all var(--t-fast, 0.15s);
    border: 1px solid transparent;
  }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--sm { padding: var(--sp-2) var(--sp-3); font-size: .8125rem; }
  .btn--primary { background: var(--cat-fejleszto); color: white; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
  .btn--outline { background: transparent; border-color: var(--cat-fejleszto); color: var(--cat-fejleszto); }
  .btn--outline:hover:not(:disabled) { background: color-mix(in srgb, var(--cat-fejleszto) 12%, transparent); }
  .btn--ghost { background: var(--bg-input); border-color: var(--border); color: var(--text); padding: var(--sp-3) var(--sp-4); }
  .btn--ghost:hover:not(:disabled) { border-color: var(--cat-fejleszto); }
  .hint { margin: var(--sp-3) 0 0; font-size: .8125rem; color: var(--text-muted); }

  /* Advanced */
  .advanced > summary { cursor: pointer; font-weight: 600; color: var(--text); user-select: none; }
  .adv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--sp-4); margin-top: var(--sp-4); }
  .adv-item { display: flex; flex-direction: column; gap: var(--sp-2); font-size: .875rem; color: var(--text-muted); }
  .adv-item--icon { margin-top: var(--sp-4); }
  .adv-item--full { grid-column: 1 / -1; }

  .style-chips { display: flex; gap: var(--sp-2); flex-wrap: wrap; }
  .style-chip {
    display: inline-flex; align-items: center; gap: var(--sp-2);
    padding: var(--sp-2) var(--sp-3);
    background: var(--bg-input);
    border: 2px solid var(--border);
    border-radius: var(--r-md, 8px);
    color: var(--text-muted);
    cursor: pointer;
    transition: all var(--t-fast, 0.15s);
    font-size: .8125rem;
    font-weight: 500;
  }
  .style-chip:hover { border-color: var(--cat-fejleszto); color: var(--cat-fejleszto); }
  .style-chip--active {
    border-color: var(--cat-fejleszto);
    color: var(--cat-fejleszto);
    background: color-mix(in srgb, var(--cat-fejleszto) 12%, var(--bg-card));
  }
  .style-chip svg { display: block; }
  .adv-item input[type="color"] { height: 40px; width: 100%; border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; padding: 2px; background: var(--bg-input); }
  .adv-item input[type="range"] { accent-color: var(--cat-fejleszto); }
  .select { background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-3); font-size: .875rem; }

  .disclaimer {
    font-size: .8125rem;
    color: var(--text-muted);
    background: color-mix(in srgb, var(--cat-fejleszto) 6%, var(--bg-card));
    border: 1px solid color-mix(in srgb, var(--cat-fejleszto) 30%, var(--border));
    border-radius: var(--r-md, 8px);
    padding: var(--sp-3) var(--sp-4);
    margin: 0;
  }

  .error-banner {
    background: #fef2f2; color: #b91c1c;
    border: 1px solid #fecaca; border-radius: var(--r-md, 8px);
    padding: var(--sp-3) var(--sp-4); font-size: .875rem;
  }
</style>
