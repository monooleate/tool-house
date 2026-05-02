<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { ui } from "../../../lib/ui-labels.ts";
  import { onDestroy } from "svelte";

  const LANG = (typeof import.meta !== "undefined" && (import.meta as any).env?.PUBLIC_SITE_LANG) || "hu";
  const isRO = LANG === "ro";

  const T = isRO
    ? {
        gps: "GPS",
        altitude: "Altitudine",
        make: "Producător",
        model: "Model",
        date: "Data",
        openInMaps: "Deschide în Google Maps",
        copyCoords: "Copiază coordonatele",
        copied: "Copiat!",
      }
    : {
        gps: "GPS",
        altitude: "Magasság",
        make: "Gyártó",
        model: "Modell",
        date: "Dátum",
        openInMaps: "Megnyitás Google Maps-ben",
        copyCoords: "Koordináták másolása",
        copied: "Másolva!",
      };

  let file: File | null = null;
  let gpsData: { lat: number; lon: number; alt?: number } | null = null;
  let exifData: Record<string, string> = {};
  let mapContainer: HTMLDivElement;
  let leafletMap: any = null;
  let noGps = false;
  let coordCopied = false;

  const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  const ICON_URL = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
  const ICON_RETINA = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
  const SHADOW_URL = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

  function loadLeafletCss(): Promise<void> {
    return new Promise(resolve => {
      const existing = document.querySelector('link[data-leaflet="1"]') as HTMLLinkElement | null;
      if (existing) {
        if ((existing as any)._loaded) resolve();
        else existing.addEventListener("load", () => resolve(), { once: true });
        return;
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      link.setAttribute("data-leaflet", "1");
      link.addEventListener("load", () => { (link as any)._loaded = true; resolve(); }, { once: true });
      link.addEventListener("error", () => resolve(), { once: true });
      document.head.appendChild(link);
    });
  }

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    gpsData = null;
    noGps = false;
    exifData = {};
    if (leafletMap) {
      leafletMap.remove();
      leafletMap = null;
    }
    if (!file) return;

    try {
      const exifr = (await import("exifr")).default;
      const result = await exifr.parse(file, { gps: true });

      if (result?.latitude && result?.longitude) {
        gpsData = {
          lat: result.latitude,
          lon: result.longitude,
          alt: result.GPSAltitude,
        };
        const dateLocale = isRO ? "ro-RO" : "hu-HU";
        exifData = {
          [T.gps]: `${gpsData.lat.toFixed(6)}, ${gpsData.lon.toFixed(6)}`,
          ...(gpsData.alt ? { [T.altitude]: `${Math.round(gpsData.alt)} m` } : {}),
          ...(result.Make ? { [T.make]: result.Make } : {}),
          ...(result.Model ? { [T.model]: result.Model } : {}),
          ...(result.DateTimeOriginal ? { [T.date]: new Date(result.DateTimeOriginal).toLocaleString(dateLocale) } : {}),
        };
        // Wait for DOM update then init map
        setTimeout(() => initMap(), 50);
      } else {
        noGps = true;
      }
    } catch (e) {
      console.error(e);
      noGps = true;
    }
  }

  async function initMap() {
    if (!gpsData || !mapContainer) return;

    // Bevárjuk a Leaflet CSS-t — különben a tile-ek és a marker pozíciója rossz lesz
    await loadLeafletCss();

    const L = (await import("leaflet")).default;

    // A Leaflet default marker ikon URL-t bundler nem találja meg — explicit beállítás
    const DefaultIcon = L.icon({
      iconUrl: ICON_URL,
      iconRetinaUrl: ICON_RETINA,
      shadowUrl: SHADOW_URL,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    (L.Marker.prototype as any).options.icon = DefaultIcon;

    leafletMap = L.map(mapContainer, { scrollWheelZoom: false }).setView([gpsData.lat, gpsData.lon], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(leafletMap);

    L.marker([gpsData.lat, gpsData.lon], { icon: DefaultIcon })
      .addTo(leafletMap)
      .bindPopup(`${gpsData.lat.toFixed(6)}, ${gpsData.lon.toFixed(6)}`)
      .openPopup();

    // Konténer méret változhat (CSS load utáni reflow miatt) — érvényesítsük
    requestAnimationFrame(() => {
      if (leafletMap) leafletMap.invalidateSize();
    });
    setTimeout(() => {
      if (leafletMap) leafletMap.invalidateSize();
    }, 250);
  }

  async function copyCoords() {
    if (!gpsData) return;
    try {
      await navigator.clipboard.writeText(`${gpsData.lat.toFixed(6)}, ${gpsData.lon.toFixed(6)}`);
      coordCopied = true;
      setTimeout(() => (coordCopied = false), 1800);
    } catch {}
  }

  $: mapsUrl = gpsData
    ? `https://www.google.com/maps?q=${gpsData.lat.toFixed(6)},${gpsData.lon.toFixed(6)}`
    : "#";

  onDestroy(() => {
    if (leafletMap) leafletMap.remove();
  });
</script>

<div class="exif-tool">
  <div class="tool-settings card">
    <h2 class="tool-settings__title">{ui.settings}</h2>
    <p class="settings-hint">JPEG EXIF GPS</p>
  </div>

  <div class="dropzone-wrap">
    <Dropzone
      accept="image/jpeg"
      multiple={false}
      maxSizeMB={50}
      label={ui.dragImageFor}
      sublabel="JPEG -- Max. 50 MB"
      on:files={handleFiles}
    />
  </div>

  {#if noGps}
    <div class="tool-warning card">
      <p>{ui.noGpsData ?? "Ebben a képben nincs GPS adat. Próbálj egy okostelefonnal készített, szerkesztetlen fotót."}</p>
    </div>
  {/if}

  {#if gpsData}
    <div class="exif-grid">
      <div class="exif-data card">
        {#each Object.entries(exifData) as [key, val]}
          <div class="exif-row">
            <span class="exif-key">{key}</span>
            <span class="exif-val">{val}</span>
          </div>
        {/each}
        <div class="exif-actions">
          <button class="btn btn--outline btn--sm" on:click={copyCoords}>
            {coordCopied ? `✓ ${T.copied}` : T.copyCoords}
          </button>
          <a class="btn btn--ghost btn--sm" href={mapsUrl} target="_blank" rel="noopener noreferrer">
            {T.openInMaps}
          </a>
        </div>
      </div>
      <div bind:this={mapContainer} class="exif-map" aria-label="map"></div>
    </div>
  {/if}
</div>

<style>
.exif-tool { display: flex; flex-direction: column; gap: var(--sp-5); }

.tool-settings { padding: var(--sp-4); }
.tool-settings__title { font-size: 1rem; margin: 0 0 var(--sp-2); }
.settings-hint { font-size: 0.85rem; color: var(--text-muted); margin: 0; }

.tool-warning {
  padding: var(--sp-4);
  color: var(--warning, #dd6b20);
  background: var(--accent-subtle);
  border-left: 3px solid var(--warning, #dd6b20);
}

.exif-grid {
  display: grid;
  grid-template-columns: minmax(260px, 360px) 1fr;
  gap: var(--sp-5);
  align-items: stretch;
}
@media (max-width: 900px) {
  .exif-grid { grid-template-columns: 1fr; }
}

.exif-data {
  padding: var(--sp-4);
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  min-width: 0;
}
.exif-row {
  display: flex;
  justify-content: space-between;
  gap: var(--sp-3);
  padding: var(--sp-2) 0;
  font-size: 0.9rem;
  border-bottom: 1px solid var(--border);
}
.exif-row:last-of-type { border-bottom: none; }
.exif-key { color: var(--text-muted); font-weight: 500; }
.exif-val { color: var(--text); font-family: var(--font-mono); font-size: .85rem; word-break: break-all; text-align: right; }

.exif-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  margin-top: var(--sp-3);
  padding-top: var(--sp-3);
  border-top: 1px solid var(--border);
}

.exif-map {
  position: relative;
  height: 460px;
  min-height: 320px;
  border-radius: var(--r-md);
  border: 1px solid var(--border);
  overflow: hidden;
  background: var(--bg-input);
}
@media (max-width: 900px) {
  .exif-map { height: 360px; }
}

/* Leaflet kontroll-elemek a sötét/világos témához igazítva */
.exif-map :global(.leaflet-control-attribution) {
  background: rgba(255, 255, 255, 0.85);
  font-size: .7rem;
}
:global([data-theme="dark"]) .exif-map :global(.leaflet-control-attribution) {
  background: rgba(0, 0, 0, 0.65);
  color: #e5e7eb;
}
:global([data-theme="dark"]) .exif-map :global(.leaflet-control-attribution a) {
  color: #93c5fd;
}
</style>
