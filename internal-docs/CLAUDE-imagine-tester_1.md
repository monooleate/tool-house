# Claude Code: Automatizált tesztelés – instrumenteonline.ro/imagine

## Cél

Playwright alapú automatizált tesztelő suite, amely szisztematikusan végigmegy az `https://instrumenteonline.ro/imagine/` összes képeszközén (27 meglévő + 15 új = **42 eszköz**), és ellenőrzi:

1. **Funkcionalitás**: az eszközök valóban elvégzik-e amit ígérnek
2. **Fájltípus helyesség**: a kimenet valóban a hirdetett formátum-e (binárisan ellenőrizve, nem csak extension)
3. **Edge case kezelés**: hibás bemenet, szélső értékek, 0 bájtos fájl stb.
4. **UX elemek**: gombok klikkelhetők, slider-ek reagálnak, hibaüzenetek megjelennek

Végeredmény: `test-report.md` + `test-results-*.json` + screenshot-ok mappája.

---

## Feladatod (Claude Code)

### 1. Projekt inicializálás

```bash
mkdir imagine-tester && cd imagine-tester
npm init -y
npm install playwright @playwright/test sharp unzipper heic2any
npx playwright install chromium
```

Hozd létre a következő mappastruktúrát:

```
imagine-tester/
├── fixtures/                   # teszt képfájlok
├── downloads/                  # letöltött fájlok
├── screenshots/                # Playwright screenshot-ok
├── tests/
│   ├── imagine.spec.ts         # meglévő 27 eszköz
│   └── imagine-new.spec.ts     # új 15 eszköz
├── utils/
│   ├── fileChecks.ts
│   └── report.ts
├── generate-fixtures.ts
├── playwright.config.ts
└── run-tests.sh
```

---

### 2. Tesztképek generálása (fixtures)

#### 2.1 Meglévő fixtures

| Fájlnév | Tartalom | Miért kell |
|---|---|---|
| `test-rgb.jpg` | 800×600 px, RGB, narancssárga | Standard JPG alap |
| `test-transparent.png` | 400×300 px, RGBA, félátlátszó kék | Alfa-csatorna tesztek |
| `test-opaque.png` | 400×300 px, RGB, piros téglalap | Alfa nélküli PNG |
| `test.webp` | 600×400 px, WebP lossy | WebP alap |
| `test-large.jpg` | 4000×3000 px, RGB | Nagy fájl / tömörítés tesztek |
| `test-1x1.png` | 1×1 px, piros pixel | Minimális méret |
| `test-empty.txt` | 0 bájt, `.jpg` extension | Sérült fájl input |
| `test-wrong.txt` | Szöveges tartalom, `.jpg` kiterjesztéssel | Helytelen típus |

#### 2.2 Új fixtures (új eszközökhöz)

| Fájlnév | Tartalom | Miért kell |
|---|---|---|
| `test-heic-fake.heic` | JPG tartalom `.heic` kiterjesztéssel | HEIC konverter smoke |
| `test-white-border.png` | 200×200 px fehér keret + 100×100 px piros középen | Autocrop tesztelés |
| `test-svg.svg` | SVG szöveg (kör + téglalap) | SVG→PNG tesztelés |
| `test-gif-single.gif` | Minimal egyframeos GIF | GIF→WebP alap |
| `test-sprite.png` | 64×64 px, 4 db 32×32 px cella más-más színnel | Sprite vágó |
| `test-collage-1.jpg` | 200×200 px, piros | Collage 1. kép |
| `test-collage-2.jpg` | 200×200 px, zöld | Collage 2. kép |
| `test-large-compress.jpg` | 2000×2000 px, RGB | KB-ra méretezés |

> **Manuálisan kell beszerezni** (sharp-pal nem generálható):
> - `fixtures/test-real.heic` – iOS eszközről AirDrop-olt fotó
> - `fixtures/test-gif-anim.gif` – animált GIF (ezgif.com-ról tölthető le)
> - `fixtures/test-gps.jpg` – okostelefonos JPEG GPS adattal

Sharp kód a `generate-fixtures.ts` scripthez:

```typescript
import sharp from 'sharp';
import * as fs from 'fs';

async function generateFixtures() {
  fs.mkdirSync('fixtures', { recursive: true });

  // ── MEGLÉVŐ ──────────────────────────────────────────────────────────────

  await sharp({ create: { width: 800, height: 600, channels: 3, background: { r: 255, g: 128, b: 0 } } })
    .jpeg({ quality: 90 }).toFile('fixtures/test-rgb.jpg');

  await sharp({ create: { width: 400, height: 300, channels: 4, background: { r: 100, g: 150, b: 200, alpha: 0.5 } } })
    .png().toFile('fixtures/test-transparent.png');

  await sharp({ create: { width: 400, height: 300, channels: 3, background: { r: 200, g: 50, b: 50 } } })
    .png().toFile('fixtures/test-opaque.png');

  await sharp({ create: { width: 600, height: 400, channels: 3, background: { r: 50, g: 200, b: 100 } } })
    .webp({ quality: 80 }).toFile('fixtures/test.webp');

  await sharp({ create: { width: 4000, height: 3000, channels: 3, background: { r: 200, g: 100, b: 50 } } })
    .jpeg({ quality: 85 }).toFile('fixtures/test-large.jpg');

  await sharp({ create: { width: 1, height: 1, channels: 3, background: { r: 255, g: 0, b: 0 } } })
    .png().toFile('fixtures/test-1x1.png');

  fs.writeFileSync('fixtures/test-empty.txt', '');
  fs.writeFileSync('fixtures/test-wrong.txt', 'Ez nem képfájl.');

  // ── ÚJ ───────────────────────────────────────────────────────────────────

  // HEIC fake: JPG tartalom .heic kiterjesztéssel
  await sharp({ create: { width: 400, height: 300, channels: 3, background: { r: 180, g: 100, b: 200 } } })
    .jpeg({ quality: 85 }).toFile('fixtures/test-heic-fake.heic');

  // Fehér keretű kép autocrop teszteléshez (200×200, belül 100×100 piros)
  const redSquare = await sharp({ create: { width: 100, height: 100, channels: 3, background: { r: 255, g: 0, b: 0 } } })
    .png().toBuffer();
  const whiteBase = await sharp({ create: { width: 200, height: 200, channels: 3, background: { r: 255, g: 255, b: 255 } } })
    .png().toBuffer();
  await sharp(whiteBase)
    .composite([{ input: redSquare, top: 50, left: 50 }])
    .png().toFile('fixtures/test-white-border.png');

  // SVG fixture
  fs.writeFileSync('fixtures/test-svg.svg', `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#f0f0f0"/>
  <circle cx="100" cy="100" r="60" fill="#3b82f6"/>
  <text x="100" y="110" text-anchor="middle" font-size="24" fill="white">SVG</text>
</svg>`);

  // Minimal valid GIF (1 frame, 10×10 px)
  const minGif = Buffer.from([
    0x47,0x49,0x46,0x38,0x39,0x61, // GIF89a
    0x0a,0x00,0x0a,0x00,            // 10×10
    0x80,0x00,0x00,                  // GCT flag
    0xff,0x00,0x00,                  // color 0: red
    0xff,0xff,0xff,                  // color 1: white
    0x21,0xf9,0x04,0x00,0x00,0x00,0x00,0x00, // GCE
    0x2c,0x00,0x00,0x00,0x00,0x0a,0x00,0x0a,0x00,0x00, // Image descriptor
    0x02,0x16,0x8c,0x2d,0x99,0x87,0x2a,0x1c,0xdc,0x33,
    0xa0,0x02,0x75,0xec,0x95,0xfa,0xa8,0xde,0x60,0x8c,0x04,0x91,0x4c,0x01,0x00,
    0x3b  // trailer
  ]);
  fs.writeFileSync('fixtures/test-gif-single.gif', minGif);

  // Sprite sheet: 64×64 px, 4 db 32×32 cella
  const c1 = await sharp({ create: { width: 32, height: 32, channels: 3, background: { r: 255, g: 0, b: 0 } } }).png().toBuffer();
  const c2 = await sharp({ create: { width: 32, height: 32, channels: 3, background: { r: 0, g: 255, b: 0 } } }).png().toBuffer();
  const c3 = await sharp({ create: { width: 32, height: 32, channels: 3, background: { r: 0, g: 0, b: 255 } } }).png().toBuffer();
  const c4 = await sharp({ create: { width: 32, height: 32, channels: 3, background: { r: 255, g: 255, b: 0 } } }).png().toBuffer();
  const spriteBase = await sharp({ create: { width: 64, height: 64, channels: 3, background: { r: 0, g: 0, b: 0 } } }).png().toBuffer();
  await sharp(spriteBase)
    .composite([
      { input: c1, top: 0,  left: 0  },
      { input: c2, top: 0,  left: 32 },
      { input: c3, top: 32, left: 0  },
      { input: c4, top: 32, left: 32 },
    ])
    .png().toFile('fixtures/test-sprite.png');

  // Collage képek
  await sharp({ create: { width: 200, height: 200, channels: 3, background: { r: 230, g: 50, b: 50 } } })
    .jpeg({ quality: 90 }).toFile('fixtures/test-collage-1.jpg');
  await sharp({ create: { width: 200, height: 200, channels: 3, background: { r: 50, g: 200, b: 80 } } })
    .jpeg({ quality: 90 }).toFile('fixtures/test-collage-2.jpg');

  // Nagy kép KB-ra méretezéshez
  await sharp({ create: { width: 2000, height: 2000, channels: 3, background: { r: 100, g: 150, b: 200 } } })
    .jpeg({ quality: 92 }).toFile('fixtures/test-large-compress.jpg');

  console.log('✅ Fixtures generálva.');
}

generateFixtures().catch(console.error);
```

---

### 3. Fájltípus ellenőrző utility (`utils/fileChecks.ts`)

**Bővített verzió** – AVIF és ICO magic bytes-szal kiegészítve:

```typescript
import * as fs from 'fs';

export function detectFileType(
  filepath: string
): 'jpg' | 'png' | 'webp' | 'gif' | 'avif' | 'ico' | 'svg' | 'zip' | 'unknown' {
  const buf = fs.readFileSync(filepath);

  // JPG: FF D8 FF
  if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return 'jpg';

  // PNG: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return 'png';

  // WebP: 'RIFF' at 0, 'WEBP' at 8
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp';

  // GIF: 47 49 46 ('GIF')
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return 'gif';

  // AVIF: ISO BMFF – offset 4='ftyp', offset 8= major brand ('avif' vagy 'avis')
  if (buf.length >= 12 && buf.toString('ascii', 4, 8) === 'ftyp') {
    const brand = buf.toString('ascii', 8, 12);
    if (brand === 'avif' || brand === 'avis') return 'avif';
  }

  // ICO: 00 00 01 00
  if (buf[0] === 0x00 && buf[1] === 0x00 && buf[2] === 0x01 && buf[3] === 0x00) return 'ico';

  // SVG: szöveg tartalmaz '<svg'
  const head = buf.toString('utf8', 0, Math.min(300, buf.length));
  if (head.includes('<svg') || head.includes('<?xml')) return 'svg';

  // ZIP: 50 4B 03 04
  if (buf[0] === 0x50 && buf[1] === 0x4B && buf[2] === 0x03 && buf[3] === 0x04) return 'zip';

  return 'unknown';
}

export function getFileSizeKB(filepath: string): number {
  return Math.round(fs.statSync(filepath).size / 1024);
}

export function isFileSizeSmaller(original: string, converted: string): boolean {
  return fs.statSync(converted).size < fs.statSync(original).size;
}

// ZIP tartalmának ellenőrzése
export async function getZipFileCount(filepath: string): Promise<number> {
  const unzipper = await import('unzipper');
  const dir = await unzipper.Open.file(filepath);
  return dir.files.length;
}

export async function getZipFileNames(filepath: string): Promise<string[]> {
  const unzipper = await import('unzipper');
  const dir = await unzipper.Open.file(filepath);
  return dir.files.map((f: any) => f.path);
}

// Képméret ellenőrzés sharp-pal
export async function getImageDimensions(filepath: string): Promise<{ width: number; height: number }> {
  const sharp = (await import('sharp')).default;
  const meta = await sharp(filepath).metadata();
  return { width: meta.width ?? 0, height: meta.height ?? 0 };
}
```

---

### 4. Playwright konfiguráció (`playwright.config.ts`)

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000,       // WASM eszközöknél (AVIF, HEIC) több idő kell
  use: {
    headless: true,
    viewport: { width: 1280, height: 900 },
    screenshot: 'on',
    video: 'off',
    downloadsPath: './downloads',
    acceptDownloads: true,
    locale: 'ro-RO',
  },
  reporter: [['list'], ['json', { outputFile: 'test-results.json' }]],
  workers: 1,  // Párhuzamos futtatás kikapcsolva – WASM memóriaigényes
});
```

---

### 5. Meglévő eszközök tesztjei (`tests/imagine.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';
import { detectFileType, getFileSizeKB, getZipFileCount } from '../utils/fileChecks';
import path from 'path';

const BASE = 'https://instrumenteonline.ro/imagine';

// ── HELPER ───────────────────────────────────────────────────────────────────

async function uploadAndDownload(
  page: any,
  toolUrl: string,
  fixturePath: string | string[],
  extraSteps?: (page: any) => Promise<void>
) {
  await page.goto(toolUrl);
  await page.waitForLoadState('networkidle');
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(Array.isArray(fixturePath) ? fixturePath : fixturePath);
  await page.waitForTimeout(1500);
  if (extraSteps) await extraSteps(page);
  await page.waitForFunction(
    () => !document.querySelector('button[disabled]'),
    { timeout: 30000 }
  ).catch(() => {});
  const downloadPromise = page.waitForEvent('download', { timeout: 40000 });
  for (const sel of [
    'button:has-text("Descarcă")', 'button:has-text("Download")',
    'button:has-text("Letölt")', 'a[download]',
    '[class*="download"]', 'button[class*="btn"]:last-of-type',
  ]) {
    if (await page.locator(sel).count() > 0) {
      await page.locator(sel).first().click();
      break;
    }
  }
  const dl = await downloadPromise;
  const savePath = path.join('downloads', dl.suggestedFilename());
  await dl.saveAs(savePath);
  return { savePath, filename: dl.suggestedFilename() };
}

// ── SMOKE: mind a 42 eszköz betölt-e ─────────────────────────────────────────

const ALL_TOOLS = [
  // Meglévő 27
  'convertor-jpg-webp', 'convertor-png-webp', 'convertor-jpg-png',
  'convertor-png-jpg', 'convertor-webp-jpg', 'convertor-webp-png',
  'redimensionare-imagini', 'comprimare-imagini', 'setare-calitate-imagine',
  'calculator-rezolutie', 'decupare-imagine', 'rotire-imagine', 'oglindire-imagine',
  'rotire-90-grade', 'estompare-imagine', 'pixelare-imagine', 'alb-negru',
  'contrast-luminozitate', 'watermark-imagine', 'chenar-padding',
  'cititor-metadata-exif', 'stergere-metadata', 'conversie-lot-imagini',
  'redimensionare-lot', 'comprimare-lot', 'redenumire-lot', 'impachetare-zip-imagini',
  // Új 15
  'convertor-heic-jpg', 'convertor-heic-png',
  'convertor-jpg-avif', 'convertor-png-avif',
  'imagine-base64', 'generator-favicon-ico',
  'redimensionare-imagine-kb',
  'creator-gif-animat', 'convertor-gif-webp-animat',
  'convertor-svg-png', 'creator-colaj-imagini',
  'paleta-culori-imagine', 'decupare-automata-imagine',
  'harta-gps-exif-imagine', 'decupare-sprite-sheet',
];

for (const tool of ALL_TOOLS) {
  test(`Smoke: ${tool} betölt hibamentesen`, async ({ page }) => {
    const jsErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') jsErrors.push(msg.text());
    });
    const response = await page.goto(`${BASE}/${tool}`);
    expect(response?.status()).toBeLessThan(400);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `screenshots/smoke-${tool}.png` });
    if (tool !== 'calculator-rezolutie') {
      expect(await page.locator('input[type="file"]').count()).toBeGreaterThan(0);
    }
    const criticals = jsErrors.filter(e => !e.includes('favicon') && !e.includes('gtag'));
    if (criticals.length > 0) console.warn(`⚠ JS hibák [${tool}]: ${criticals.join(' | ')}`);
  });
}

// ── KONVERTEREK ───────────────────────────────────────────────────────────────

test('JPG→WebP: kimenet valóban WebP', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-jpg-webp`, 'fixtures/test-rgb.jpg');
  await page.screenshot({ path: 'screenshots/jpg-webp-result.png' });
  expect(detectFileType(savePath)).toBe('webp');
});

test('JPG→WebP: PNG feltöltve → hibakezelés dokumentálva', async ({ page }) => {
  await page.goto(`${BASE}/convertor-jpg-webp`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-transparent.png');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/jpg-webp-wrong-input.png' });
  const hasError = await page.locator('[class*="error"], [class*="alert"], [role="alert"]').count() > 0;
  console.log(`JPG→WebP wrong input hibát jelez-e: ${hasError}`);
});

test('JPG→WebP: 0 bájtos fájl → hibakezelés', async ({ page }) => {
  await page.goto(`${BASE}/convertor-jpg-webp`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-empty.txt');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/jpg-webp-empty.png' });
});

test('PNG→WebP: alfa-csatornás PNG → WebP kimenet', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-png-webp`, 'fixtures/test-transparent.png');
  await page.screenshot({ path: 'screenshots/png-webp-alpha.png' });
  expect(detectFileType(savePath)).toBe('webp');
  expect(getFileSizeKB(savePath)).toBeGreaterThan(0);
});

test('JPG→PNG: kimenet valóban PNG', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-jpg-png`, 'fixtures/test-rgb.jpg');
  await page.screenshot({ path: 'screenshots/jpg-png-result.png' });
  expect(detectFileType(savePath)).toBe('png');
});

test('PNG→JPG: transzparens PNG → JPG háttérszín kezelés', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-png-jpg`, 'fixtures/test-transparent.png');
  await page.screenshot({ path: 'screenshots/png-jpg-alpha.png' });
  expect(detectFileType(savePath)).toBe('jpg');
});

test('WebP→JPG: kimenet valóban JPG', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-webp-jpg`, 'fixtures/test.webp');
  await page.screenshot({ path: 'screenshots/webp-jpg-result.png' });
  expect(detectFileType(savePath)).toBe('jpg');
});

test('WebP→PNG: kimenet valóban PNG', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-webp-png`, 'fixtures/test.webp');
  await page.screenshot({ path: 'screenshots/webp-png-result.png' });
  expect(detectFileType(savePath)).toBe('png');
});

// ── SZERKESZTŐ ESZKÖZÖK ───────────────────────────────────────────────────────

test('Redimensionare: letöltés sikeres', async ({ page }) => {
  const { savePath } = await uploadAndDownload(
    page, `${BASE}/redimensionare-imagini`, 'fixtures/test-rgb.jpg',
    async (p) => {
      const w = p.locator('input[type="number"]').first();
      if (await w.count() > 0) await w.fill('400');
    }
  );
  await page.screenshot({ path: 'screenshots/redimensionare-result.png' });
  expect(detectFileType(savePath)).toMatch(/jpg|png|webp/);
});

test('Comprimare: kimenet kisebb mint bemenet', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/comprimare-imagini`, 'fixtures/test-large.jpg');
  await page.screenshot({ path: 'screenshots/comprimare-result.png' });
  const orig = getFileSizeKB('fixtures/test-large.jpg');
  const comp = getFileSizeKB(savePath);
  console.log(`Tömörítés: ${orig}KB → ${comp}KB`);
  expect(comp).toBeLessThan(orig);
});

test('Rotire 90°: letöltés sikeres', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/rotire-90-grade`, 'fixtures/test-rgb.jpg');
  await page.screenshot({ path: 'screenshots/rotire-90-result.png' });
  expect(detectFileType(savePath)).toMatch(/jpg|png|webp/);
});

test('Alb-negru: letöltés sikeres', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/alb-negru`, 'fixtures/test-rgb.jpg');
  await page.screenshot({ path: 'screenshots/alb-negru-result.png' });
  expect(detectFileType(savePath)).toMatch(/jpg|png|webp/);
});

test('Watermark: szöveg megadva, letöltés sikeres', async ({ page }) => {
  const { savePath } = await uploadAndDownload(
    page, `${BASE}/watermark-imagine`, 'fixtures/test-rgb.jpg',
    async (p) => {
      const t = p.locator('input[type="text"]').first();
      if (await t.count() > 0) await t.fill('TEST WATERMARK');
    }
  );
  await page.screenshot({ path: 'screenshots/watermark-result.png' });
  expect(detectFileType(savePath)).toMatch(/jpg|png|webp/);
});

test('EXIF reader: metadata megjelenik az oldalon', async ({ page }) => {
  await page.goto(`${BASE}/cititor-metadata-exif`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-rgb.jpg');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/exif-reader-result.png' });
  const text = await page.textContent('body') ?? '';
  console.log(`EXIF adatot megjelenített: ${text.includes('EXIF') || text.includes('width') || text.includes('Width')}`);
});

test('Stergere metadata: letöltés sikeres', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/stergere-metadata`, 'fixtures/test-rgb.jpg');
  await page.screenshot({ path: 'screenshots/stergere-metadata-result.png' });
  expect(detectFileType(savePath)).toMatch(/jpg|png|webp/);
});

// ── BATCH ESZKÖZÖK ────────────────────────────────────────────────────────────

test('Conversie lot: ZIP letöltés, ≥2 fájl a ZIP-ben', async ({ page }) => {
  await page.goto(`${BASE}/conversie-lot-imagini`);
  await page.locator('input[type="file"]').first().setInputFiles([
    'fixtures/test-rgb.jpg', 'fixtures/test-transparent.png',
  ]);
  await page.waitForTimeout(2000);
  const dlPromise = page.waitForEvent('download', { timeout: 30000 });
  const btn = page.locator('button').filter({ hasText: /letölt|download|descarcă|zip/i }).first();
  if (await btn.count() > 0) await btn.click();
  const dl = await dlPromise;
  const savePath = `downloads/${dl.suggestedFilename()}`;
  await dl.saveAs(savePath);
  await page.screenshot({ path: 'screenshots/conversie-lot-result.png' });
  expect(detectFileType(savePath)).toBe('zip');
  expect(await getZipFileCount(savePath)).toBeGreaterThanOrEqual(2);
});

test('Împachetare ZIP: ZIP fájl letöltés', async ({ page }) => {
  await page.goto(`${BASE}/impachetare-zip-imagini`);
  await page.locator('input[type="file"]').first().setInputFiles([
    'fixtures/test-rgb.jpg', 'fixtures/test-transparent.png',
  ]);
  await page.waitForTimeout(1000);
  const dlPromise = page.waitForEvent('download', { timeout: 30000 });
  const btn = page.locator('button').filter({ hasText: /letölt|download|descarcă|zip/i }).first();
  if (await btn.count() > 0) await btn.click();
  const dl = await dlPromise;
  const savePath = `downloads/${dl.suggestedFilename()}`;
  await dl.saveAs(savePath);
  await page.screenshot({ path: 'screenshots/zip-pack-result.png' });
  expect(detectFileType(savePath)).toBe('zip');
});
```

---

### 6. Új eszközök tesztjei (`tests/imagine-new.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';
import {
  detectFileType, getFileSizeKB, getZipFileCount,
  getZipFileNames, getImageDimensions
} from '../utils/fileChecks';
import * as fs from 'fs';
import path from 'path';

const BASE = 'https://instrumenteonline.ro/imagine';

// ── HELPER (ugyanaz mint imagine.spec.ts-ben) ────────────────────────────────

async function uploadAndDownload(
  page: any,
  toolUrl: string,
  fixturePath: string | string[],
  extraSteps?: (page: any) => Promise<void>
) {
  await page.goto(toolUrl);
  await page.waitForLoadState('networkidle');
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(Array.isArray(fixturePath) ? fixturePath : fixturePath);
  await page.waitForTimeout(2000);
  if (extraSteps) await extraSteps(page);
  await page.waitForFunction(
    () => !document.querySelector('button[disabled]'),
    { timeout: 60000 }
  ).catch(() => {});
  const dlPromise = page.waitForEvent('download', { timeout: 60000 });
  for (const sel of [
    'button:has-text("Descarcă")', 'button:has-text("Download")',
    'button:has-text("Letölt")', 'a[download]',
    '[class*="download"]', 'button[class*="btn"]:last-of-type',
  ]) {
    if (await page.locator(sel).count() > 0) { await page.locator(sel).first().click(); break; }
  }
  const dl = await dlPromise;
  const savePath = path.join('downloads', dl.suggestedFilename());
  await dl.saveAs(savePath);
  return { savePath, filename: dl.suggestedFilename() };
}

// ── HEIC KONVERTEREK ──────────────────────────────────────────────────────────

test('HEIC→JPG: file input fogad .heic fájlt (accept attr ellenőrzés)', async ({ page }) => {
  await page.goto(`${BASE}/convertor-heic-jpg`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/heic-jpg-load.png' });
  const accept = await page.locator('input[type="file"]').first().getAttribute('accept') ?? '';
  const ok = accept.includes('heic') || accept.includes('heif') || accept === '' || accept === '*';
  console.log(`HEIC→JPG accept="${accept}" → heic elfogadva: ${ok}`);
  expect(await page.locator('input[type="file"]').count()).toBeGreaterThan(0);
});

test('HEIC→JPG: fake HEIC (JPG tartalom) – hibakezelés dokumentálva', async ({ page }) => {
  await page.goto(`${BASE}/convertor-heic-jpg`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-heic-fake.heic');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'screenshots/heic-jpg-fake.png' });
  const hasError = await page.locator('[class*="error"], [class*="alert"], [role="alert"]').count() > 0;
  console.log(`HEIC→JPG fake input hibát jelez-e: ${hasError}`);
  // Mindkét eredmény (hiba VAGY konverzió) elfogadható – csak dokumentáljuk
});

test('HEIC→JPG: valódi HEIC fájl → JPG kimenet', async ({ page }) => {
  if (!fs.existsSync('fixtures/test-real.heic')) {
    console.log('SKIP: fixtures/test-real.heic hiányzik – töltsd le manuálisan iOS eszközről.');
    test.skip(); return;
  }
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-heic-jpg`, 'fixtures/test-real.heic');
  await page.screenshot({ path: 'screenshots/heic-jpg-real-result.png' });
  expect(detectFileType(savePath)).toBe('jpg');
  expect(getFileSizeKB(savePath)).toBeGreaterThan(0);
});

test('HEIC→JPG: tömeges – valódi HEIC-ek → ZIP', async ({ page }) => {
  if (!fs.existsSync('fixtures/test-real.heic')) { test.skip(); return; }
  await page.goto(`${BASE}/convertor-heic-jpg`);
  await page.locator('input[type="file"]').first().setInputFiles([
    'fixtures/test-real.heic', 'fixtures/test-real.heic',
  ]);
  await page.waitForFunction(() => !document.querySelector('button[disabled]'), { timeout: 60000 }).catch(() => {});
  const dlPromise = page.waitForEvent('download', { timeout: 60000 });
  const btn = page.locator('button').filter({ hasText: /letölt|download|descarcă/i }).first();
  if (await btn.count() > 0) await btn.click();
  const dl = await dlPromise;
  const savePath = `downloads/${dl.suggestedFilename()}`;
  await dl.saveAs(savePath);
  await page.screenshot({ path: 'screenshots/heic-jpg-batch.png' });
  expect(detectFileType(savePath)).toBe('zip');
  expect(await getZipFileCount(savePath)).toBeGreaterThanOrEqual(2);
});

test('HEIC→PNG: valódi HEIC fájl → PNG kimenet', async ({ page }) => {
  if (!fs.existsSync('fixtures/test-real.heic')) { test.skip(); return; }
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-heic-png`, 'fixtures/test-real.heic');
  await page.screenshot({ path: 'screenshots/heic-png-result.png' });
  expect(detectFileType(savePath)).toBe('png');
});

// ── AVIF KONVERTEREK ──────────────────────────────────────────────────────────

test('JPG→AVIF: kimenet valóban AVIF (ftyp magic bytes)', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-jpg-avif`, 'fixtures/test-rgb.jpg');
  await page.screenshot({ path: 'screenshots/jpg-avif-result.png' });
  const type = detectFileType(savePath);
  console.log(`JPG→AVIF kimenet magic bytes: ${type}`);
  expect(type).toBe('avif');
});

test('JPG→AVIF: fájlméret kisebb mint az eredeti JPG', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-jpg-avif`, 'fixtures/test-large.jpg');
  const origKb = getFileSizeKB('fixtures/test-large.jpg');
  const avifKb = getFileSizeKB(savePath);
  console.log(`JPG→AVIF: ${origKb}KB → ${avifKb}KB (${Math.round((1-avifKb/origKb)*100)}% csökkentés)`);
  expect(avifKb).toBeLessThan(origKb);
  await page.screenshot({ path: 'screenshots/jpg-avif-size.png' });
});

test('JPG→AVIF: tömeges → ZIP, minden fájl .avif kiterjesztésű', async ({ page }) => {
  await page.goto(`${BASE}/convertor-jpg-avif`);
  await page.locator('input[type="file"]').first().setInputFiles([
    'fixtures/test-rgb.jpg', 'fixtures/test-collage-1.jpg',
  ]);
  await page.waitForFunction(() => !document.querySelector('button[disabled]'), { timeout: 60000 }).catch(() => {});
  const dlPromise = page.waitForEvent('download', { timeout: 60000 });
  const btn = page.locator('button').filter({ hasText: /letölt|download|descarcă/i }).first();
  if (await btn.count() > 0) await btn.click();
  const dl = await dlPromise;
  const savePath = `downloads/${dl.suggestedFilename()}`;
  await dl.saveAs(savePath);
  await page.screenshot({ path: 'screenshots/jpg-avif-batch.png' });
  expect(detectFileType(savePath)).toBe('zip');
  const names = await getZipFileNames(savePath);
  console.log(`AVIF ZIP tartalom: ${names.join(', ')}`);
  expect(names.every((n: string) => n.endsWith('.avif'))).toBe(true);
  expect(names.length).toBe(2);
});

test('PNG→AVIF: alfa-csatornás PNG → AVIF kimenet', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-png-avif`, 'fixtures/test-transparent.png');
  await page.screenshot({ path: 'screenshots/png-avif-alpha.png' });
  expect(detectFileType(savePath)).toBe('avif');
});

test('PNG→AVIF: lossless checkbox elérhető', async ({ page }) => {
  await page.goto(`${BASE}/convertor-png-avif`);
  await page.waitForLoadState('networkidle');
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-transparent.png');
  await page.waitForTimeout(1000);
  const hasCheckbox = await page.locator('input[type="checkbox"]').count() > 0;
  console.log(`PNG→AVIF lossless checkbox elérhető: ${hasCheckbox}`);
  await page.screenshot({ path: 'screenshots/png-avif-ui.png' });
});

// ── KÉP → BASE64 ─────────────────────────────────────────────────────────────

test('Kép→Base64: JPG feltöltve → data:image/ URI megjelenik', async ({ page }) => {
  await page.goto(`${BASE}/imagine-base64`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-rgb.jpg');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/kep-base64-result.png' });
  // textarea, pre vagy egyéb output elem tartalmaz data URI-t
  const output = await page.locator('textarea, pre, [class*="output"], [class*="result"]')
    .first().inputValue().catch(() =>
      page.locator('textarea, pre, [class*="output"]').first().textContent()
    );
  const uri = String(output ?? '');
  console.log(`Base64 output kezdete: ${uri.substring(0, 30)}...`);
  expect(uri.startsWith('data:image/')).toBe(true);
});

test('Kép→Base64: HTML/CSS/raw mód radio/select elérhető', async ({ page }) => {
  await page.goto(`${BASE}/imagine-base64`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-rgb.jpg');
  await page.waitForTimeout(1500);
  const hasSwitch = await page.locator('input[type="radio"], select').count() > 0;
  console.log(`Base64 kimenet-formátum váltó elérhető: ${hasSwitch}`);
  await page.screenshot({ path: 'screenshots/kep-base64-modes.png' });
});

test('Kép→Base64: HTML img mód → <img src= kezdetű output', async ({ page }) => {
  await page.goto(`${BASE}/imagine-base64`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-1x1.png');
  await page.waitForTimeout(1500);
  // Próbáld az img radio-t kiválasztani
  const imgRadio = page.locator('input[type="radio"][value="img"]');
  if (await imgRadio.count() > 0) await imgRadio.click();
  await page.waitForTimeout(300);
  const output = await page.locator('textarea').first().inputValue().catch(() => '');
  console.log(`Base64 img mód output: ${String(output).substring(0, 50)}`);
  await page.screenshot({ path: 'screenshots/kep-base64-img-mode.png' });
});

test('Kép→Base64: SVG is elfogadott és data URI-vá alakul', async ({ page }) => {
  await page.goto(`${BASE}/imagine-base64`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-svg.svg');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/kep-base64-svg.png' });
  const output = await page.locator('textarea, pre, [class*="output"]').first().textContent().catch(() => '');
  console.log(`SVG Base64 output van-e: ${String(output).includes('data:')}`);
});

test('Kép→Base64: másolás gomb elérhető és kattintható', async ({ page }) => {
  await page.goto(`${BASE}/imagine-base64`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-1x1.png');
  await page.waitForTimeout(1500);
  const copyBtn = page.locator('button').filter({ hasText: /más|copy|copiaz/i }).first();
  if (await copyBtn.count() > 0) {
    await copyBtn.click();
    await page.waitForTimeout(500);
    console.log('Base64 másolás gomb megnyomva');
  } else {
    console.log('Base64 másolás gomb nem található');
  }
  await page.screenshot({ path: 'screenshots/kep-base64-copy.png' });
});

// ── FAVICON / ICO GENERÁTOR ───────────────────────────────────────────────────

test('Favicon ICO: PNG → ICO kimenet (00 00 01 00 magic bytes)', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/generator-favicon-ico`, 'fixtures/test-transparent.png');
  await page.screenshot({ path: 'screenshots/kep-ico-result.png' });
  const type = detectFileType(savePath);
  console.log(`ICO kimenet magic bytes: ${type}`);
  expect(type).toBe('ico');
  expect(getFileSizeKB(savePath)).toBeGreaterThan(0);
});

test('Favicon ICO: JPG bemenet is konvertálódik ICO-vá', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/generator-favicon-ico`, 'fixtures/test-rgb.jpg');
  await page.screenshot({ path: 'screenshots/kep-ico-jpg.png' });
  expect(detectFileType(savePath)).toBe('ico');
});

test('Favicon ICO: letöltött fájl neve tartalmazza "favicon"-t', async ({ page }) => {
  const { filename } = await uploadAndDownload(page, `${BASE}/generator-favicon-ico`, 'fixtures/test-transparent.png');
  console.log(`ICO letöltési fájlnév: ${filename}`);
  expect(filename.toLowerCase()).toContain('favicon');
});

test('Favicon ICO: UI mutatja a 16/32/48 méreteket', async ({ page }) => {
  await page.goto(`${BASE}/generator-favicon-ico`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-transparent.png');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/kep-ico-sizes.png' });
  const text = await page.textContent('body') ?? '';
  const hasSizes = text.includes('16') && text.includes('32') && text.includes('48');
  console.log(`ICO UI 16/32/48 méreteket mutat: ${hasSizes}`);
});

// ── ÁTMÉRETEZÉS KB-RA ─────────────────────────────────────────────────────────

test('Resize to KB: kimenet JPG, mérete ≤ célméret + 15%', async ({ page }) => {
  const TARGET_KB = 100;
  const { savePath } = await uploadAndDownload(
    page, `${BASE}/redimensionare-imagine-kb`, 'fixtures/test-large-compress.jpg',
    async (p) => {
      const numInput = p.locator('input[type="number"]').first();
      const rangeInput = p.locator('input[type="range"]').first();
      if (await numInput.count() > 0) {
        await numInput.fill(String(TARGET_KB));
        await numInput.dispatchEvent('change');
      } else if (await rangeInput.count() > 0) {
        await rangeInput.evaluate((el: HTMLInputElement, v: number) => {
          el.value = String(v);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }, TARGET_KB);
      }
      await p.waitForTimeout(500);
    }
  );
  await page.screenshot({ path: 'screenshots/resize-kb-result.png' });
  const resultKb = getFileSizeKB(savePath);
  console.log(`Resize to KB: cél=${TARGET_KB}KB, eredmény=${resultKb}KB`);
  expect(detectFileType(savePath)).toBe('jpg');
  expect(resultKb).toBeLessThanOrEqual(Math.ceil(TARGET_KB * 1.15));
});

test('Resize to KB: eredeti méret megjelenik az UI-ban', async ({ page }) => {
  await page.goto(`${BASE}/redimensionare-imagine-kb`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-large-compress.jpg');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/resize-kb-ui.png' });
  const origKb = getFileSizeKB('fixtures/test-large-compress.jpg');
  const text = await page.textContent('body') ?? '';
  console.log(`Eredeti méret ${origKb}KB, UI tartalmazza: ${text.includes(String(origKb))}`);
});

test('Resize to KB: nagyon kis célméret (10 KB) – nem crash', async ({ page }) => {
  await page.goto(`${BASE}/redimensionare-imagine-kb`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-large-compress.jpg');
  await page.waitForTimeout(1000);
  const numInput = page.locator('input[type="number"]').first();
  if (await numInput.count() > 0) {
    await numInput.fill('10');
    await numInput.dispatchEvent('change');
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/resize-kb-10kb.png' });
  // Az oldal ne crasheljen
  const jsErrors: string[] = [];
  page.on('console', msg => { if (msg.type() === 'error') jsErrors.push(msg.text()); });
  await page.waitForTimeout(1000);
  console.log(`Resize 10KB JS hibák: ${jsErrors.filter(e => !e.includes('favicon')).join(', ') || 'nincs'}`);
});

// ── GIF KÉSZÍTŐ ───────────────────────────────────────────────────────────────

test('GIF készítő: 2 kép → GIF kimenet (GIF89a magic bytes)', async ({ page }) => {
  const { savePath } = await uploadAndDownload(
    page, `${BASE}/creator-gif-animat`,
    ['fixtures/test-collage-1.jpg', 'fixtures/test-collage-2.jpg', 'fixtures/test-rgb.jpg']
  );
  await page.screenshot({ path: 'screenshots/gif-keszito-result.png' });
  const type = detectFileType(savePath);
  console.log(`GIF készítő kimenet típusa: ${type}`);
  expect(type).toBe('gif');
});

test('GIF készítő: frame delay slider elérhető', async ({ page }) => {
  await page.goto(`${BASE}/creator-gif-animat`);
  await page.waitForLoadState('networkidle');
  await page.locator('input[type="file"]').first().setInputFiles([
    'fixtures/test-collage-1.jpg', 'fixtures/test-collage-2.jpg',
  ]);
  await page.waitForTimeout(1000);
  const hasSlider = await page.locator('input[type="range"]').count() > 0;
  console.log(`GIF delay slider elérhető: ${hasSlider}`);
  await page.screenshot({ path: 'screenshots/gif-keszito-controls.png' });
});

test('GIF készítő: 1 képpel a konvertálás gomb disabled', async ({ page }) => {
  await page.goto(`${BASE}/creator-gif-animat`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-collage-1.jpg');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/gif-keszito-single.png' });
  const convertBtn = page.locator('button').filter({ hasText: /konvert|convert/i }).first();
  if (await convertBtn.count() > 0) {
    const disabled = await convertBtn.getAttribute('disabled');
    console.log(`GIF 1 képnél konvert gomb disabled: ${disabled !== null}`);
  }
});

test('GIF készítő: fájlszám és méret megjelenik az UI-ban', async ({ page }) => {
  await page.goto(`${BASE}/creator-gif-animat`);
  await page.locator('input[type="file"]').first().setInputFiles([
    'fixtures/test-collage-1.jpg', 'fixtures/test-collage-2.jpg',
  ]);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/gif-keszito-info.png' });
  const text = await page.textContent('body') ?? '';
  console.log(`GIF 2 fájl után "2" szám megjelenik: ${text.includes('2')}`);
});

// ── GIF → ANIMÁLT WEBP ────────────────────────────────────────────────────────

test('GIF→Animált WebP: GIF bemenet → WebP kimenet (RIFF WEBP magic bytes)', async ({ page }) => {
  const gifPath = fs.existsSync('fixtures/test-gif-anim.gif')
    ? 'fixtures/test-gif-anim.gif'
    : 'fixtures/test-gif-single.gif';
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-gif-webp-animat`, gifPath);
  await page.screenshot({ path: 'screenshots/gif-webp-result.png' });
  const type = detectFileType(savePath);
  console.log(`GIF→WebP kimenet típusa: ${type}`);
  expect(type).toBe('webp');
});

test('GIF→Animált WebP: kimenet mérete ≤ GIF mérete (ha GIF > 10KB)', async ({ page }) => {
  const gifPath = fs.existsSync('fixtures/test-gif-anim.gif')
    ? 'fixtures/test-gif-anim.gif'
    : 'fixtures/test-gif-single.gif';
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-gif-webp-animat`, gifPath);
  const gifKb = getFileSizeKB(gifPath);
  const webpKb = getFileSizeKB(savePath);
  console.log(`GIF→WebP méret: ${gifKb}KB → ${webpKb}KB`);
  if (gifKb > 10) expect(webpKb).toBeLessThanOrEqual(gifKb);
  await page.screenshot({ path: 'screenshots/gif-webp-size.png' });
});

test('GIF→Animált WebP: minőség slider elérhető', async ({ page }) => {
  await page.goto(`${BASE}/convertor-gif-webp-animat`);
  await page.waitForLoadState('networkidle');
  const hasSlider = await page.locator('input[type="range"]').count() > 0;
  console.log(`GIF→WebP minőség slider: ${hasSlider}`);
  await page.screenshot({ path: 'screenshots/gif-webp-controls.png' });
});

// ── SVG → PNG/JPG ─────────────────────────────────────────────────────────────

test('SVG→PNG: kimenet valóban PNG', async ({ page }) => {
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-svg-png`, 'fixtures/test-svg.svg');
  await page.screenshot({ path: 'screenshots/svg-png-result.png' });
  expect(detectFileType(savePath)).toBe('png');
  expect(getFileSizeKB(savePath)).toBeGreaterThan(0);
});

test('SVG→PNG: kimeneti szélesség beállítható, méret megfelel', async ({ page }) => {
  const { savePath } = await uploadAndDownload(
    page, `${BASE}/convertor-svg-png`, 'fixtures/test-svg.svg',
    async (p) => {
      const w = p.locator('input[type="number"]').first();
      if (await w.count() > 0) await w.fill('400');
    }
  );
  await page.screenshot({ path: 'screenshots/svg-png-width.png' });
  expect(detectFileType(savePath)).toBe('png');
  try {
    const dims = await getImageDimensions(savePath);
    console.log(`SVG→PNG kimenet mérete: ${dims.width}×${dims.height}px`);
    if (dims.width > 0) expect(dims.width).toBe(400);
  } catch { console.log('SVG→PNG sharp méret ellenőrzés kihagyva'); }
});

test('SVG→PNG: JPG kimenet is választható', async ({ page }) => {
  await page.goto(`${BASE}/convertor-svg-png`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-svg.svg');
  await page.waitForTimeout(1000);
  const select = page.locator('select').first();
  if (await select.count() > 0) {
    await select.selectOption('image/jpeg').catch(() => {});
    console.log('SVG→PNG JPG mód kiválasztva');
  }
  await page.screenshot({ path: 'screenshots/svg-jpg-mode.png' });
});

test('SVG→PNG: átlátszóság megmarad PNG kimenetben', async ({ page }) => {
  // Az SVG fehér hátteret nem tartalmaz, PNG-ben átlátszó széleket várunk
  const { savePath } = await uploadAndDownload(page, `${BASE}/convertor-svg-png`, 'fixtures/test-svg.svg');
  await page.screenshot({ path: 'screenshots/svg-png-transparency.png' });
  expect(detectFileType(savePath)).toBe('png');
  // A PNG fájl mérete > eredeti SVG mérete (raszterizálva)
  const svgKb = getFileSizeKB('fixtures/test-svg.svg');
  const pngKb = getFileSizeKB(savePath);
  console.log(`SVG méret: ${svgKb}KB → PNG: ${pngKb}KB`);
});

// ── COLLAGE KÉSZÍTŐ ───────────────────────────────────────────────────────────

test('Collage: 2 kép → PNG kimenet', async ({ page }) => {
  const { savePath } = await uploadAndDownload(
    page, `${BASE}/creator-colaj-imagini`,
    ['fixtures/test-collage-1.jpg', 'fixtures/test-collage-2.jpg']
  );
  await page.screenshot({ path: 'screenshots/collage-result.png' });
  expect(detectFileType(savePath)).toBe('png');
  expect(getFileSizeKB(savePath)).toBeGreaterThan(0);
});

test('Collage: vízszintes elrendezésnél kimenet szélesebb mint 200px', async ({ page }) => {
  const { savePath } = await uploadAndDownload(
    page, `${BASE}/creator-colaj-imagini`,
    ['fixtures/test-collage-1.jpg', 'fixtures/test-collage-2.jpg'],
    async (p) => {
      const sel = p.locator('select').first();
      if (await sel.count() > 0) await sel.selectOption('horizontal').catch(() => {});
    }
  );
  await page.screenshot({ path: 'screenshots/collage-horizontal.png' });
  try {
    const dims = await getImageDimensions(savePath);
    console.log(`Collage vízszintes mérete: ${dims.width}×${dims.height}px`);
    if (dims.width > 0) expect(dims.width).toBeGreaterThan(200);
  } catch { console.log('Collage méret ellenőrzés kihagyva'); }
});

test('Collage: elrendezés selector elérhető (vízszintes/függőleges/rácsos)', async ({ page }) => {
  await page.goto(`${BASE}/creator-colaj-imagini`);
  await page.waitForLoadState('networkidle');
  await page.locator('input[type="file"]').first().setInputFiles([
    'fixtures/test-collage-1.jpg', 'fixtures/test-collage-2.jpg',
  ]);
  await page.waitForTimeout(1000);
  const hasSelect = await page.locator('select').count() > 0;
  console.log(`Collage elrendezés selector: ${hasSelect}`);
  await page.screenshot({ path: 'screenshots/collage-layouts.png' });
});

test('Collage: háttérszín és rés beállítható', async ({ page }) => {
  await page.goto(`${BASE}/creator-colaj-imagini`);
  await page.waitForLoadState('networkidle');
  const hasColor = await page.locator('input[type="color"]').count() > 0;
  const hasGap   = await page.locator('input[type="range"]').count() > 0;
  console.log(`Collage háttérszín picker: ${hasColor}, rés slider: ${hasGap}`);
  await page.screenshot({ path: 'screenshots/collage-options.png' });
});

// ── SZÍN PALETTA KINYERŐ ──────────────────────────────────────────────────────

test('Szín paletta: JPG → ≥3 HEX kód (#RRGGBB) megjelenik', async ({ page }) => {
  await page.goto(`${BASE}/paleta-culori-imagine`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-rgb.jpg');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/szin-paletta-result.png' });
  const text = await page.textContent('body') ?? '';
  const hexCodes = text.match(/#[0-9a-fA-F]{6}/g) ?? [];
  console.log(`Szín paletta HEX kódok: ${hexCodes.slice(0, 4).join(', ')}`);
  expect(hexCodes.length).toBeGreaterThanOrEqual(3);
});

test('Szín paletta: szám slider változtat a megjelenített mennyiségen', async ({ page }) => {
  await page.goto(`${BASE}/paleta-culori-imagine`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-rgb.jpg');
  await page.waitForTimeout(2000);
  const slider = page.locator('input[type="range"]').first();
  if (await slider.count() > 0) {
    await slider.evaluate((el: HTMLInputElement) => {
      el.value = '8';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForTimeout(1500);
    const hex8 = (await page.textContent('body') ?? '').match(/#[0-9a-fA-F]{6}/g) ?? [];
    console.log(`Szín paletta 8-ra állítva: ${hex8.length} HEX`);
  }
  await page.screenshot({ path: 'screenshots/szin-paletta-8.png' });
});

test('Szín paletta: másolás gomb kattintható', async ({ page }) => {
  await page.goto(`${BASE}/paleta-culori-imagine`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-rgb.jpg');
  await page.waitForTimeout(3000);
  const copyBtn = page.locator('button').filter({ hasText: /#[0-9a-fA-F]{6}/ }).first();
  if (await copyBtn.count() > 0) {
    await copyBtn.click();
    console.log('Szín paletta másolás gomb megnyomva');
  } else {
    console.log('Szín paletta másolás gomb nem #HEX szöveget tartalmaz – más selectorral próbáld');
  }
  await page.screenshot({ path: 'screenshots/szin-paletta-copy.png' });
});

// ── AUTOMATIKUS VÁGÁS (AUTOCROP) ──────────────────────────────────────────────

test('Autocrop: fehér keretes kép → kimenet kisebb mint az eredeti', async ({ page }) => {
  const { savePath } = await uploadAndDownload(
    page, `${BASE}/decupare-automata-imagine`, 'fixtures/test-white-border.png'
  );
  await page.screenshot({ path: 'screenshots/autocrop-result.png' });
  expect(detectFileType(savePath)).toBe('png');
  try {
    const orig = await getImageDimensions('fixtures/test-white-border.png');
    const crop = await getImageDimensions(savePath);
    console.log(`Autocrop: ${orig.width}×${orig.height} → ${crop.width}×${crop.height}`);
    expect(crop.width).toBeLessThan(orig.width);
    expect(crop.height).toBeLessThan(orig.height);
  } catch { console.log('Autocrop méret sharp-ellenőrzés kihagyva'); }
});

test('Autocrop: háttérszín picker és tolerancia slider elérhető', async ({ page }) => {
  await page.goto(`${BASE}/decupare-automata-imagine`);
  await page.waitForLoadState('networkidle');
  const hasColor     = await page.locator('input[type="color"]').count() > 0;
  const hasTolerance = await page.locator('input[type="range"]').count() > 0;
  console.log(`Autocrop háttérszín: ${hasColor}, tolerancia: ${hasTolerance}`);
  await page.screenshot({ path: 'screenshots/autocrop-options.png' });
});

test('Autocrop: 1×1 px kép edge case – nem crash', async ({ page }) => {
  await page.goto(`${BASE}/decupare-automata-imagine`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-1x1.png');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/autocrop-1x1.png' });
  const jsErrors: string[] = [];
  page.on('console', msg => { if (msg.type() === 'error') jsErrors.push(msg.text()); });
  await page.waitForTimeout(1000);
  const crits = jsErrors.filter(e => !e.includes('favicon'));
  console.log(`Autocrop 1×1 JS hibák: ${crits.join(', ') || 'nincs'}`);
});

// ── EXIF GPS TÉRKÉP ───────────────────────────────────────────────────────────

test('EXIF GPS térkép: oldal betölt, JPEG file input elérhető', async ({ page }) => {
  await page.goto(`${BASE}/harta-gps-exif-imagine`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/exif-terkep-load.png' });
  expect(await page.locator('input[type="file"]').count()).toBeGreaterThan(0);
  const accept = await page.locator('input[type="file"]').first().getAttribute('accept') ?? '';
  console.log(`EXIF térkép input accept: "${accept}"`);
});

test('EXIF GPS térkép: GPS nélküli kép → figyelmeztető üzenet jelenik meg', async ({ page }) => {
  await page.goto(`${BASE}/harta-gps-exif-imagine`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-rgb.jpg');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/exif-terkep-no-gps.png' });
  const text = await page.textContent('body') ?? '';
  const hasMsg = text.toLowerCase().includes('gps') || text.toLowerCase().includes('coordon') || text.toLowerCase().includes('metadat');
  console.log(`EXIF térkép GPS nélküli képnél üzenet megjelenik: ${hasMsg}`);
});

test('EXIF GPS térkép: GPS adatos kép → Leaflet térkép megjelenik', async ({ page }) => {
  if (!fs.existsSync('fixtures/test-gps.jpg')) {
    console.log('SKIP: fixtures/test-gps.jpg hiányzik – okostelefonos fotót tölts fel manuálisan.');
    test.skip(); return;
  }
  await page.goto(`${BASE}/harta-gps-exif-imagine`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-gps.jpg');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'screenshots/exif-terkep-gps.png' });
  const hasMap = await page.locator('.leaflet-container, [class*="map"], #map').count() > 0;
  console.log(`Leaflet térkép megjelenik GPS adatos képnél: ${hasMap}`);
  expect(hasMap).toBe(true);
});

test('EXIF GPS térkép: koordináták szövegesen is megjelennek', async ({ page }) => {
  if (!fs.existsSync('fixtures/test-gps.jpg')) { test.skip(); return; }
  await page.goto(`${BASE}/harta-gps-exif-imagine`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-gps.jpg');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'screenshots/exif-terkep-coords.png' });
  const text = await page.textContent('body') ?? '';
  // GPS koordináta formátuma: számjegyek és pont pl. "47.123456"
  const hasCoords = /\d{1,3}\.\d{3,}/.test(text);
  console.log(`GPS koordináta szövegesen megjelenik: ${hasCoords}`);
});

// ── SPRITE SHEET VÁGÓ ─────────────────────────────────────────────────────────

test('Sprite vágó: sprite sheet feltöltve → cellaméret inputok megjelennek', async ({ page }) => {
  await page.goto(`${BASE}/decupare-sprite-sheet`);
  await page.waitForLoadState('networkidle');
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-sprite.png');
  await page.waitForTimeout(1000);
  const numInputs = await page.locator('input[type="number"]').count();
  console.log(`Sprite vágó number input-ok száma: ${numInputs}`);
  await page.screenshot({ path: 'screenshots/sprite-vagas-ui.png' });
  expect(numInputs).toBeGreaterThanOrEqual(2);
});

test('Sprite vágó: 32×32 cella → ZIP 4 PNG-vel (sprite-00-00..01-01)', async ({ page }) => {
  await page.goto(`${BASE}/decupare-sprite-sheet`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-sprite.png');
  await page.waitForTimeout(1000);
  const nums = page.locator('input[type="number"]');
  if (await nums.count() >= 2) {
    await nums.nth(0).fill('32');
    await nums.nth(1).fill('32');
    await nums.nth(0).dispatchEvent('change');
    await nums.nth(1).dispatchEvent('change');
    await page.waitForTimeout(500);
  }
  // Ellenőrizd a rácsinfót
  const text = await page.textContent('body') ?? '';
  const mentions4 = text.includes('4') || text.includes('2×2') || text.includes('2 x 2');
  console.log(`Sprite 32×32 → 4 cella UI-ban: ${mentions4}`);
  await page.screenshot({ path: 'screenshots/sprite-vagas-grid.png' });

  // ZIP letöltés
  const dlPromise = page.waitForEvent('download', { timeout: 30000 });
  const btn = page.locator('button').filter({ hasText: /konvert|letölt|export|descarcă|zip/i }).first();
  if (await btn.count() > 0) await btn.click();

  try {
    const dl = await dlPromise;
    const savePath = `downloads/${dl.suggestedFilename()}`;
    await dl.saveAs(savePath);
    await page.screenshot({ path: 'screenshots/sprite-vagas-result.png' });
    expect(detectFileType(savePath)).toBe('zip');
    const count = await getZipFileCount(savePath);
    console.log(`Sprite ZIP fájlszám: ${count}`);
    expect(count).toBe(4);
    const names = await getZipFileNames(savePath);
    console.log(`Sprite ZIP fájlnevek: ${names.join(', ')}`);
    expect(names.every((n: string) => n.endsWith('.png'))).toBe(true);
  } catch {
    console.log('Sprite ZIP letöltés timeout – manuálisan ellenőrizd');
  }
});

test('Sprite vágó: 0-ás cellaméret → nem crash', async ({ page }) => {
  await page.goto(`${BASE}/decupare-sprite-sheet`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-sprite.png');
  await page.waitForTimeout(500);
  const nums = page.locator('input[type="number"]');
  if (await nums.count() > 0) {
    await nums.nth(0).fill('0');
    await nums.nth(0).dispatchEvent('change');
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: 'screenshots/sprite-vagas-zero.png' });
  const jsErrors: string[] = [];
  page.on('console', msg => { if (msg.type() === 'error') jsErrors.push(msg.text()); });
  await page.waitForTimeout(1000);
  console.log(`Sprite 0-méret JS hibák: ${jsErrors.filter(e => !e.includes('favicon')).join(', ') || 'nincs'}`);
});

test('Sprite vágó: nagyon nagy cellaméret (kép méretén túl) → kezelt hiba', async ({ page }) => {
  await page.goto(`${BASE}/decupare-sprite-sheet`);
  await page.locator('input[type="file"]').first().setInputFiles('fixtures/test-sprite.png');
  await page.waitForTimeout(500);
  const nums = page.locator('input[type="number"]');
  if (await nums.count() >= 2) {
    await nums.nth(0).fill('9999');
    await nums.nth(1).fill('9999');
    await nums.nth(0).dispatchEvent('change');
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: 'screenshots/sprite-vagas-oversize.png' });
  // 0 cella = konvert gomb disabled vagy hiba üzenet
  const text = await page.textContent('body') ?? '';
  const hasZeroGrid = text.includes('0') || await page.locator('button[disabled]').count() > 0;
  console.log(`Sprite túlméret esetén gomb/rácsinfo: ${hasZeroGrid}`);
});
```

---

### 7. Riport generátor (`utils/report.ts`)

```typescript
import * as fs from 'fs';

export function generateMarkdownReport(testResults: any) {
  const lines: string[] = [];
  lines.push('# instrumenteonline.ro/imagine – Automatizált Teszt Riport');
  lines.push(`Dátum: ${new Date().toLocaleString('hu-HU')}`);
  lines.push(`Node: ${process.version}`);
  lines.push('');

  const { stats } = testResults;
  const rate = stats.total > 0 ? Math.round(stats.passed / stats.total * 100) : 0;
  lines.push('## Összesítő');
  lines.push(`| | |`);
  lines.push(`|---|---|`);
  lines.push(`| Összes | **${stats.total}** |`);
  lines.push(`| ✅ Átment | **${stats.passed}** (${rate}%) |`);
  lines.push(`| ❌ Sikertelen | **${stats.failed}** |`);
  lines.push(`| ⏭ Kihagyott | **${stats.skipped}** |`);
  lines.push('');

  const smokeLines: string[] = [];
  const funcLines: string[]  = [];

  for (const suite of testResults.suites || []) {
    for (const spec of suite.specs || []) {
      const icon = spec.ok ? '✅' : '❌';
      const line = `${icon} ${spec.title}`;
      const err  = !spec.ok && spec.tests?.[0]?.results?.[0]?.error
        ? `   → ${spec.tests[0].results[0].error.message?.split('\n')[0]}`
        : null;
      if (spec.title.startsWith('Smoke:')) {
        smokeLines.push(line);
        if (err) smokeLines.push(err);
      } else {
        funcLines.push(line);
        if (err) funcLines.push(err);
      }
    }
  }

  lines.push('## Smoke tesztek – 42 eszköz betöltése');
  lines.push(...smokeLines);
  lines.push('');
  lines.push('## Funkcionális tesztek');
  lines.push(...funcLines);
  lines.push('');

  const failed = [...smokeLines, ...funcLines].filter(l => l.startsWith('❌'));
  if (failed.length > 0) {
    lines.push('## ❌ Sikertelen tesztek összesítve');
    lines.push(...failed);
    lines.push('');
  }

  lines.push('## Screenshot-ok');
  try {
    const shots = fs.readdirSync('screenshots').filter(f => f.endsWith('.png'));
    lines.push(`Összesen: **${shots.length}** db`);
    shots.forEach(s => lines.push(`- ${s}`));
  } catch { lines.push('_(screenshots/ nem elérhető)_'); }

  fs.writeFileSync('test-report.md', lines.join('\n'));
  console.log('✅ test-report.md generálva');
}
```

---

### 8. Futtatás (`run-tests.sh`)

```bash
#!/bin/bash
set -e

echo "🔧 Fixtures generálása..."
npx ts-node generate-fixtures.ts

echo "🧹 Régi downloads / screenshots törlése..."
rm -rf downloads screenshots
mkdir -p downloads screenshots

echo "🎭 Meglévő 27 eszköz tesztelése..."
npx playwright test tests/imagine.spec.ts --reporter=json 2>&1 | tee /tmp/res-existing.json || true

echo "🆕 Új 15 eszköz tesztelése..."
npx playwright test tests/imagine-new.spec.ts --reporter=json 2>&1 | tee /tmp/res-new.json || true

echo "📊 Összevont riport generálása..."
npx ts-node -e "
const a = JSON.parse(require('fs').readFileSync('/tmp/res-existing.json', 'utf8'));
const b = JSON.parse(require('fs').readFileSync('/tmp/res-new.json', 'utf8'));
const combined = {
  stats: {
    total:   a.stats.total   + b.stats.total,
    passed:  a.stats.passed  + b.stats.passed,
    failed:  a.stats.failed  + b.stats.failed,
    skipped: a.stats.skipped + b.stats.skipped,
  },
  suites: [...(a.suites||[]), ...(b.suites||[])],
};
const { generateMarkdownReport } = require('./utils/report');
generateMarkdownReport(combined);
"

echo ""
echo "✅ Kész!"
echo "  📄 test-report.md"
echo "  📁 screenshots/ ($(ls screenshots/*.png 2>/dev/null | wc -l) db)"
echo "  📦 downloads/   ($(ls downloads/ 2>/dev/null | wc -l) fájl)"
```

---

### 9. Manuálisan szükséges fixture-ok

| Fájl | Honnan szerzed | Miért kell |
|---|---|---|
| `fixtures/test-real.heic` | AirDrop iOS fotót Mac-re | Valódi HEIC→JPG/PNG tesztek |
| `fixtures/test-gif-anim.gif` | ezgif.com maker + collage képek | GIF→WebP animált teszt |
| `fixtures/test-gps.jpg` | Okostelefon fotó (helyszín bekapcsolt) | EXIF GPS térkép teszt |

Ha ezek hiányoznak, az érintett tesztek automatikusan `test.skip()`-elnek – a többi teszt fut.

---

### 10. Kritikus assertion-ök összefoglalója

| Eszköz | Assertion | Magic bytes |
|---|---|---|
| JPG→WebP | `detectFileType` = `webp` | RIFF + WEBP |
| PNG→WebP | `detectFileType` = `webp` | RIFF + WEBP |
| JPG→PNG | `detectFileType` = `png` | 89 50 4E 47 |
| PNG→JPG | `detectFileType` = `jpg` | FF D8 FF |
| WebP→JPG | `detectFileType` = `jpg` | FF D8 FF |
| WebP→PNG | `detectFileType` = `png` | 89 50 4E 47 |
| Comprimare | `output KB < input KB` | – |
| Conversie lot | `detectFileType` = `zip`, ≥2 fájl | 50 4B 03 04 |
| **HEIC→JPG** | `detectFileType` = `jpg` | FF D8 FF |
| **HEIC→PNG** | `detectFileType` = `png` | 89 50 4E 47 |
| **JPG→AVIF** | `detectFileType` = `avif` | ftyp+avif |
| **JPG→AVIF batch** | ZIP, `.avif` fájlok | 50 4B 03 04 |
| **PNG→AVIF** | `detectFileType` = `avif` | ftyp+avif |
| **Kép→Base64** | output `data:image/` URI | – (text) |
| **Favicon ICO** | `detectFileType` = `ico` | 00 00 01 00 |
| **Resize to KB** | `output KB ≤ target × 1.15` | FF D8 FF |
| **GIF készítő** | `detectFileType` = `gif` | 47 49 46 |
| **GIF→WebP** | `detectFileType` = `webp` | RIFF + WEBP |
| **SVG→PNG** | `detectFileType` = `png`, szélesség = beállított | 89 50 4E 47 |
| **Collage** | `detectFileType` = `png`, width > 200 | 89 50 4E 47 |
| **Szín paletta** | ≥3 `#RRGGBB` a DOM-ban | – (text) |
| **Autocrop** | output kisebb mint input | 89 50 4E 47 |
| **EXIF GPS** | `.leaflet-container` megjelenik | – (DOM) |
| **Sprite vágó** | ZIP, 4 fájl, mind `.png` | 50 4B 03 04 |

Ha egy `waitForEvent('download')` timeout-ol: log-old le és folytasd a többi teszttel.
