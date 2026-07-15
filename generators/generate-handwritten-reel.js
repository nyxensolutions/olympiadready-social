#!/usr/bin/env node
// Assembles handwritten educational images into a Reel MP4.
// Reads the next unposted batch from social-content/handwritten/queue.json,
// converts the slides to 1080x1920, concatenates them with a fade transition,
// and writes the output to content/reels/YYYY-MM-DD-handwritten.mp4
//
// Usage: node generate-handwritten-reel.js [YYYY-MM-DD]
//   - If date is provided, posts the batch scheduled for that date.
//   - If omitted, posts today's batch (based on queue.json scheduled dates).

const fs        = require("fs");
const path      = require("path");
const { execSync } = require("child_process");

const ROOT      = path.resolve(__dirname, "..");
const QUEUE     = path.join(ROOT, "social-content", "handwritten", "queue.json");
const BATCHES   = path.join(ROOT, "social-content", "handwritten", "batches");
const OUT_DIR   = path.join(ROOT, "content", "reels");
const TMP_DIR   = path.join(ROOT, "tmp", "handwritten");

const W = 1080, H = 1920;
const SLIDE_DURATION = 4.0;   // seconds each image is shown
const FADE_DURATION  = 0.5;   // seconds for fade between slides

const targetDate = process.argv[2] || new Date().toISOString().slice(0, 10);
console.log(`target date: ${targetDate}`);

// ── Load queue ───────────────────────────────────────────────────────────────
const queue = JSON.parse(fs.readFileSync(QUEUE, "utf8"));

const batch = queue.batches.find(b => b.scheduled === targetDate && !b.posted);
if (!batch) {
  console.log(`No unposted batch scheduled for ${targetDate}. Nothing to do.`);
  process.exit(0);
}

const batchDir = path.join(BATCHES, batch.folder);
const meta     = JSON.parse(fs.readFileSync(path.join(batchDir, "meta.json"), "utf8"));

// ── Find slides ──────────────────────────────────────────────────────────────
const slides = meta.slides
  .map(s => path.join(batchDir, s))
  .filter(s => {
    if (!fs.existsSync(s)) { console.warn(`[warn] missing slide: ${s}`); return false; }
    return true;
  });

if (slides.length === 0) {
  console.error(`No slides found in ${batchDir}. Add images named ${meta.slides.join(", ")}.`);
  process.exit(1);
}

console.log(`batch: ${batch.folder} | topic: ${meta.topic} | slides: ${slides.length}`);

// ── Build ffmpeg command ─────────────────────────────────────────────────────
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

const N   = slides.length;
const out = path.join(OUT_DIR, `${targetDate}-handwritten.mp4`);

// Scale each image to 1080x1920, preserving aspect ratio with black padding
const scale = `scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=black`;

const inputs      = slides.map(s => `-loop 1 -t ${SLIDE_DURATION} -i "${s}"`).join(" ");
const vFilters    = slides.map((_, i) => `[${i}:v]${scale}[v${i}];`).join("");

let xchain = "", prev = "v0";
for (let i = 1; i < N; i++) {
  const out_label = i === N - 1 ? "v" : `x${i}`;
  const offset    = (i * SLIDE_DURATION - FADE_DURATION).toFixed(1);
  xchain += `[${prev}][v${i}]xfade=transition=fade:duration=${FADE_DURATION}:offset=${offset}[${out_label}];`;
  prev = `x${i}`;
}
xchain = xchain.replace(/;$/, "");

const totalDur = (N * SLIDE_DURATION).toFixed(1);

const filterFile = path.join(TMP_DIR, `filter-${targetDate}.txt`);
fs.writeFileSync(filterFile, vFilters + xchain, "utf8");

const cmd = [
  "ffmpeg -y",
  inputs,
  `-filter_complex_script "${filterFile}"`,
  `-map "[v]"`,
  `-c:v libx264 -pix_fmt yuv420p -r 30 -t ${totalDur} -movflags +faststart`,
  `"${out}"`,
].join(" ");

console.log("running ffmpeg…");
execSync(cmd, { stdio: "inherit" });
fs.rmSync(filterFile, { force: true });

// ── Write caption file for the poster script ─────────────────────────────────
const captionFile = path.join(OUT_DIR, `${targetDate}-handwritten.txt`);
fs.writeFileSync(captionFile, `${meta.caption}\n\n${meta.hashtags}`, "utf8");

// ── Mark batch as posted in queue ────────────────────────────────────────────
batch.posted = true;
fs.writeFileSync(QUEUE, JSON.stringify(queue, null, 2), "utf8");

console.log(`done → ${path.relative(ROOT, out)}`);
console.log(`caption → ${path.relative(ROOT, captionFile)}`);
