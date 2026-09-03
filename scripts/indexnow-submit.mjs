// IndexNow bulk submit — konvertalo.hu
// Usage: node scripts/indexnow-submit.mjs
// Notifies Bing/Yandex (IndexNow protocol) that the listed URLs changed.
// The key file must be live at https://konvertalo.hu/<KEY>.txt before running.

const KEY = "3f1a55c5e4f3296e9b3a22ef8a589d01";
const HOST = "konvertalo.hu";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const urlList = [
  // Homepage + category hubs (title / hub meta description)
  "https://konvertalo.hu/",
  "https://konvertalo.hu/pdf/",
  "https://konvertalo.hu/excel/",
  "https://konvertalo.hu/fajl/",
  "https://konvertalo.hu/html/",
  "https://konvertalo.hu/adat/",
  "https://konvertalo.hu/markdown/",
  "https://konvertalo.hu/szinek/",
  // Tool pages — meta description expanded to 150-160 chars
  "https://konvertalo.hu/fejleszto/base64-kodolo-dekodolo/",
  "https://konvertalo.hu/excel/csv-xlsx/",
  "https://konvertalo.hu/pdf/kepek-pdfbe/",
  "https://konvertalo.hu/fajl/zip-keszito/",
  "https://konvertalo.hu/fajl/fajl-informacio/",
  "https://konvertalo.hu/excel/xlsx-json/",
  "https://konvertalo.hu/szoveg/whitespace-tisztitas/",
  "https://konvertalo.hu/szoveg/ures-sorok-torlese/",
  "https://konvertalo.hu/fejleszto/xml-formazas/",
  "https://konvertalo.hu/pdf/oldalak-kivalasztasa/",
  "https://konvertalo.hu/fajl/zip-kibonto/",
  "https://konvertalo.hu/html/html-szovegge/",
  "https://konvertalo.hu/kep/90-fokos-forgatas/",
  "https://konvertalo.hu/adat/csv-tsv/",
  "https://konvertalo.hu/adat/sorok-szurese/",
  "https://konvertalo.hu/adat/oszlop-szetvalasztas/",
  "https://konvertalo.hu/fejleszto/xml-ellenorzes/",
  "https://konvertalo.hu/pdf/oldalak-sorrendje/",
  "https://konvertalo.hu/adat/tsv-csv/",
  "https://konvertalo.hu/pdf/oldalak-torlese/",
  // Earlier this session — content/keyword changes
  "https://konvertalo.hu/pdf/szetbontas/",
  "https://konvertalo.hu/pdf/osszeillesztes/",
  "https://konvertalo.hu/kep/atmeretezes/",
  "https://konvertalo.hu/pdf/tomoritese/",
];

const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
const text = await res.text();
console.log(`IndexNow ${res.status} ${res.statusText}`);
console.log(`Submitted ${urlList.length} URLs for ${HOST}`);
if (text.trim()) console.log("Response body:", text.trim());
// 200/202 = accepted; 403 = key file not reachable; 422 = URL/host mismatch
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
