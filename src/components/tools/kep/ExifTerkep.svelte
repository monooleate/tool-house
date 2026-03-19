<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { ui } from "../../../lib/ui-labels.ts";
  import { onDestroy } from "svelte";

  let file: File | null = null;
  let gpsData: { lat: number; lon: number; alt?: number } | null = null;
  let exifData: Record<string, string> = {};
  let mapContainer: HTMLDivElement;
  let leafletMap: any = null;
  let noGps = false;

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    gpsData = null;
    noGps = false;
    exifData = {};
    if (leafletMap) { leafletMap.remove(); leafletMap = null; }
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
        exifData = {
          "GPS": `${gpsData.lat.toFixed(6)}, ${gpsData.lon.toFixed(6)}`,
          ...(gpsData.alt ? { "Magasság": `${Math.round(gpsData.alt)} m` } : {}),
          ...(result.Make ? { "Gyártó": result.Make } : {}),
          ...(result.Model ? { "Modell": result.Model } : {}),
          ...(result.DateTimeOriginal ? { "Dátum": new Date(result.DateTimeOriginal).toLocaleString("hu-HU") } : {}),
        };
        // Wait for DOM update then init map
        setTimeout(() => initMap(), 100);
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

    const L = (await import("leaflet")).default;

    // Load leaflet CSS via link element
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    leafletMap = L.map(mapContainer).setView([gpsData.lat, gpsData.lon], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(leafletMap);

    L.marker([gpsData.lat, gpsData.lon])
      .addTo(leafletMap)
      .bindPopup(`${gpsData.lat.toFixed(6)}, ${gpsData.lon.toFixed(6)}`)
      .openPopup();
  }

  onDestroy(() => {
    if (leafletMap) leafletMap.remove();
  });
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <p class="settings-hint">JPEG EXIF GPS</p>
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/jpeg" multiple={false} maxSizeMB={50}
    label={ui.dragImageFor} sublabel="JPEG -- Max. 50 MB" on:files={handleFiles} />
</div>

{#if noGps}
  <div class="tool-warning card">
    <p>{ui.noGpsData ?? "Ebben a képben nincs GPS adat. Próbálj egy okostelefonnal készített, szerkesztetlen fotót."}</p>
  </div>
{/if}

{#if gpsData}
  <div class="exif-data card">
    {#each Object.entries(exifData) as [key, val]}
      <div class="exif-row"><strong>{key}:</strong> {val}</div>
    {/each}
  </div>
  <div bind:this={mapContainer} class="exif-map"></div>
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-3); }
.settings-hint { font-size: 0.85rem; color: var(--text-muted); }
.dropzone-wrap { margin-bottom: var(--sp-5); }
.tool-warning { padding: var(--sp-4); margin: var(--sp-4) 0; color: var(--warning, #dd6b20); }
.exif-data { padding: var(--sp-4); margin: var(--sp-4) 0; }
.exif-row { padding: var(--sp-2) 0; font-size: 0.9rem; border-bottom: 1px solid var(--border); }
.exif-row:last-child { border-bottom: none; }
.exif-map { height: 400px; border-radius: var(--r-md); margin-top: var(--sp-4); border: 1px solid var(--border); }
</style>
