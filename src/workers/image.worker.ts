// ============================================================
// IMAGE WORKER
// Kepfeldolgozas Web Workerben -- Canvas API alapu
// Uzenet tipusok: convert, resize, rotate, flip, crop, filter,
//                 watermark, border, metadata-strip
// ============================================================

export interface ConvertMessage {
  type: "convert";
  id: string;
  buffer: ArrayBuffer;
  filename: string;
  outputFormat: "image/webp" | "image/jpeg" | "image/png";
  outputExt?: string;       // explicit extension override (e.g. "png")
  quality: number;          // 0-1
  maxWidth?: number;
  maxHeight?: number;
}

export interface ResizeMessage {
  type: "resize";
  id: string;
  buffer: ArrayBuffer;
  filename: string;
  width: number;
  height: number;
  outputFormat: "image/webp" | "image/jpeg" | "image/png";
  quality: number;
}

export interface RotateMessage {
  type: "rotate";
  id: string;
  buffer: ArrayBuffer;
  filename: string;
  angle: number;
  outputFormat: "image/webp" | "image/jpeg" | "image/png";
  quality: number;
}

export interface FlipMessage {
  type: "flip";
  id: string;
  buffer: ArrayBuffer;
  filename: string;
  direction: "horizontal" | "vertical";
  outputFormat: "image/webp" | "image/jpeg" | "image/png";
  quality: number;
}

export interface CropMessage {
  type: "crop";
  id: string;
  buffer: ArrayBuffer;
  filename: string;
  x: number;
  y: number;
  cropWidth: number;
  cropHeight: number;
  outputFormat: "image/webp" | "image/jpeg" | "image/png";
  quality: number;
}

export interface FilterMessage {
  type: "filter";
  id: string;
  buffer: ArrayBuffer;
  filename: string;
  filter: string;
  outputFormat: "image/webp" | "image/jpeg" | "image/png";
  quality: number;
}

export interface WatermarkMessage {
  type: "watermark";
  id: string;
  buffer: ArrayBuffer;
  filename: string;
  text: string;
  position: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  fontSize: number;
  opacity: number;
  color: string;
  outputFormat: "image/webp" | "image/jpeg" | "image/png";
  quality: number;
}

export interface BorderMessage {
  type: "border";
  id: string;
  buffer: ArrayBuffer;
  filename: string;
  borderSize: number;
  borderColor: string;
  outputFormat: "image/webp" | "image/jpeg" | "image/png";
  quality: number;
}

export interface MetadataStripMessage {
  type: "metadata-strip";
  id: string;
  buffer: ArrayBuffer;
  filename: string;
  outputFormat: "image/webp" | "image/jpeg" | "image/png";
  quality: number;
}

export interface WorkerResult {
  id: string;
  filename: string;
  outputFilename: string;
  buffer: ArrayBuffer;
  originalSize: number;
  outputSize: number;
  savingPercent: number;
  elapsedMs: number;
}

export interface WorkerError {
  id: string;
  filename: string;
  error: string;
}

// --- Worker logic -------------------------------------------------------

function mimeToExt(mime: string): string {
  const map: Record<string, string> = {
    "image/webp": "webp",
    "image/jpeg": "jpg",
    "image/png": "png",
  };
  return map[mime] ?? "bin";
}

function replaceExt(filename: string, ext: string): string {
  return filename.replace(/\.[^.]+$/, "") + "." + ext;
}

function buildResult(
  id: string,
  filename: string,
  outputFormat: string,
  buffer: ArrayBuffer,
  outputBuffer: ArrayBuffer,
  t0: number,
  outputExt?: string,
): WorkerResult {
  return {
    id,
    filename,
    outputFilename: replaceExt(filename, outputExt ?? mimeToExt(outputFormat)),
    buffer: outputBuffer,
    originalSize: buffer.byteLength,
    outputSize: outputBuffer.byteLength,
    savingPercent: Math.round(
      ((buffer.byteLength - outputBuffer.byteLength) / buffer.byteLength) * 100,
    ),
    elapsedMs: Math.round(performance.now() - t0),
  };
}

// --- convert ------------------------------------------------------------

async function convertImage(msg: ConvertMessage): Promise<WorkerResult> {
  const t0 = performance.now();

  const blob = new Blob([msg.buffer], { type: "image/jpeg" });
  const bitmap = await createImageBitmap(blob);

  let w = bitmap.width;
  let h = bitmap.height;

  if (msg.maxWidth && w > msg.maxWidth) {
    h = Math.round((h * msg.maxWidth) / w);
    w = msg.maxWidth;
  }
  if (msg.maxHeight && h > msg.maxHeight) {
    w = Math.round((w * msg.maxHeight) / h);
    h = msg.maxHeight;
  }

  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const outputBlob = await canvas.convertToBlob({
    type: msg.outputFormat,
    quality: msg.quality,
  });

  const outputBuffer = await outputBlob.arrayBuffer();

  return buildResult(msg.id, msg.filename, msg.outputFormat, msg.buffer, outputBuffer, t0, msg.outputExt);
}

// --- resize -------------------------------------------------------------

async function resizeImage(msg: ResizeMessage): Promise<WorkerResult> {
  const t0 = performance.now();
  const blob = new Blob([msg.buffer]);
  const bitmap = await createImageBitmap(blob);
  const canvas = new OffscreenCanvas(msg.width, msg.height);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, msg.width, msg.height);
  bitmap.close();
  const outputBlob = await canvas.convertToBlob({ type: msg.outputFormat, quality: msg.quality });
  const outputBuffer = await outputBlob.arrayBuffer();
  return buildResult(msg.id, msg.filename, msg.outputFormat, msg.buffer, outputBuffer, t0);
}

// --- rotate -------------------------------------------------------------

async function rotateImage(msg: RotateMessage): Promise<WorkerResult> {
  const t0 = performance.now();
  const blob = new Blob([msg.buffer]);
  const bitmap = await createImageBitmap(blob);
  const rad = (msg.angle * Math.PI) / 180;
  const sin = Math.abs(Math.sin(rad));
  const cos = Math.abs(Math.cos(rad));
  const w = Math.round(bitmap.width * cos + bitmap.height * sin);
  const h = Math.round(bitmap.width * sin + bitmap.height * cos);
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext("2d")!;
  ctx.translate(w / 2, h / 2);
  ctx.rotate(rad);
  ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
  bitmap.close();
  const outputBlob = await canvas.convertToBlob({ type: msg.outputFormat, quality: msg.quality });
  const outputBuffer = await outputBlob.arrayBuffer();
  return buildResult(msg.id, msg.filename, msg.outputFormat, msg.buffer, outputBuffer, t0);
}

// --- flip ---------------------------------------------------------------

async function flipImage(msg: FlipMessage): Promise<WorkerResult> {
  const t0 = performance.now();
  const blob = new Blob([msg.buffer]);
  const bitmap = await createImageBitmap(blob);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d")!;
  if (msg.direction === "horizontal") {
    ctx.translate(bitmap.width, 0);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(0, bitmap.height);
    ctx.scale(1, -1);
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const outputBlob = await canvas.convertToBlob({ type: msg.outputFormat, quality: msg.quality });
  const outputBuffer = await outputBlob.arrayBuffer();
  return buildResult(msg.id, msg.filename, msg.outputFormat, msg.buffer, outputBuffer, t0);
}

// --- crop ---------------------------------------------------------------

async function cropImage(msg: CropMessage): Promise<WorkerResult> {
  const t0 = performance.now();
  const blob = new Blob([msg.buffer]);
  const bitmap = await createImageBitmap(blob, msg.x, msg.y, msg.cropWidth, msg.cropHeight);
  const canvas = new OffscreenCanvas(msg.cropWidth, msg.cropHeight);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const outputBlob = await canvas.convertToBlob({ type: msg.outputFormat, quality: msg.quality });
  const outputBuffer = await outputBlob.arrayBuffer();
  return buildResult(msg.id, msg.filename, msg.outputFormat, msg.buffer, outputBuffer, t0);
}

// --- filter -------------------------------------------------------------

async function filterImage(msg: FilterMessage): Promise<WorkerResult> {
  const t0 = performance.now();
  const blob = new Blob([msg.buffer]);
  const bitmap = await createImageBitmap(blob);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d")!;
  ctx.filter = msg.filter;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const outputBlob = await canvas.convertToBlob({ type: msg.outputFormat, quality: msg.quality });
  const outputBuffer = await outputBlob.arrayBuffer();
  return buildResult(msg.id, msg.filename, msg.outputFormat, msg.buffer, outputBuffer, t0);
}

// --- watermark ----------------------------------------------------------

async function watermarkImage(msg: WatermarkMessage): Promise<WorkerResult> {
  const t0 = performance.now();
  const blob = new Blob([msg.buffer]);
  const bitmap = await createImageBitmap(blob);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0);

  ctx.globalAlpha = msg.opacity;
  ctx.fillStyle = msg.color;
  ctx.font = `${msg.fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let x = bitmap.width / 2;
  let y = bitmap.height / 2;
  const pad = 20;
  const tw = ctx.measureText(msg.text).width;

  if (msg.position === "top-left") {
    x = pad + tw / 2;
    y = pad + msg.fontSize / 2;
  } else if (msg.position === "top-right") {
    x = bitmap.width - pad - tw / 2;
    y = pad + msg.fontSize / 2;
  } else if (msg.position === "bottom-left") {
    x = pad + tw / 2;
    y = bitmap.height - pad - msg.fontSize / 2;
  } else if (msg.position === "bottom-right") {
    x = bitmap.width - pad - tw / 2;
    y = bitmap.height - pad - msg.fontSize / 2;
  }

  ctx.fillText(msg.text, x, y);
  ctx.globalAlpha = 1;
  bitmap.close();

  const outputBlob = await canvas.convertToBlob({ type: msg.outputFormat, quality: msg.quality });
  const outputBuffer = await outputBlob.arrayBuffer();
  return buildResult(msg.id, msg.filename, msg.outputFormat, msg.buffer, outputBuffer, t0);
}

// --- border -------------------------------------------------------------

async function borderImage(msg: BorderMessage): Promise<WorkerResult> {
  const t0 = performance.now();
  const blob = new Blob([msg.buffer]);
  const bitmap = await createImageBitmap(blob);
  const w = bitmap.width + msg.borderSize * 2;
  const h = bitmap.height + msg.borderSize * 2;
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = msg.borderColor;
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bitmap, msg.borderSize, msg.borderSize);
  bitmap.close();
  const outputBlob = await canvas.convertToBlob({ type: msg.outputFormat, quality: msg.quality });
  const outputBuffer = await outputBlob.arrayBuffer();
  return buildResult(msg.id, msg.filename, msg.outputFormat, msg.buffer, outputBuffer, t0);
}

// --- Main message listener ----------------------------------------------

type WorkerMessage =
  | ConvertMessage
  | ResizeMessage
  | RotateMessage
  | FlipMessage
  | CropMessage
  | FilterMessage
  | WatermarkMessage
  | BorderMessage
  | MetadataStripMessage;

self.addEventListener("message", async (event: MessageEvent<WorkerMessage>) => {
  const msg = event.data;

  try {
    let result: WorkerResult;
    switch (msg.type) {
      case "convert":
        result = await convertImage(msg);
        break;
      case "resize":
        result = await resizeImage(msg);
        break;
      case "rotate":
        result = await rotateImage(msg);
        break;
      case "flip":
        result = await flipImage(msg);
        break;
      case "crop":
        result = await cropImage(msg);
        break;
      case "filter":
        result = await filterImage(msg);
        break;
      case "watermark":
        result = await watermarkImage(msg);
        break;
      case "border":
        result = await borderImage(msg);
        break;
      case "metadata-strip":
        result = await convertImage({ ...msg, type: "convert" } as ConvertMessage);
        break;
      default:
        return;
    }
    self.postMessage({ type: "result", ...result }, [result.buffer]);
  } catch (err) {
    self.postMessage({
      type: "error",
      id: msg.id,
      filename: msg.filename,
      error: err instanceof Error ? err.message : String(err),
    });
  }
});
