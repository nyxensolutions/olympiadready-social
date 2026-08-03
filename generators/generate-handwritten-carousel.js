#!/usr/bin/env node
// Prepares handwritten study-note slides for carousel posting.
// Reads the next unposted batch from social-content/handwritten/queue.json,
// resolves slide paths, and writes a manifest to content/handwritten/YYYY-MM-DD.json.
// No ffmpeg required — slides post as static images via postCarousel.
//
// Usage: node generate-handwritten-carousel.js [YYYY-MM-DD]

const fs   = require("fs");
const path = require("path");

const ROOT    = path.resolve(__dirname, "..");
const QUEUE   = path.join(ROOT, "social-content", "handwritten", "queue.json");
const BATCHES = path.join(ROOT, "social-content", "handwritten", "batches");
const OUT_DIR = path.join(ROOT, "content", "handwritten");

const targetDate = process.argv[2] || new Date().toISOString().slice(0, 10);
console.log(`target date: ${targetDate}`);

const queue = JSON.parse(fs.readFileSync(QUEUE, "utf8"));
const batch = queue.batches.find(b => b.scheduled === targetDate && !b.posted);
if (!batch) {
  console.log(`No unposted batch scheduled for ${targetDate}. Nothing to do.`);
  process.exit(0);
}

const batchDir = path.join(BATCHES, batch.folder);
const meta     = JSON.parse(fs.readFileSync(path.join(batchDir, "meta.json"), "utf8"));

const slides = meta.slides
  .map(s => path.join(batchDir, s))
  .filter(s => {
    if (!fs.existsSync(s)) { console.warn(`[warn] missing slide: ${s}`); return false; }
    return true;
  });

if (slides.length === 0) {
  console.error(`No slides found in ${batchDir}. Expected: ${meta.slides.join(", ")}`);
  process.exit(1);
}

console.log(`batch: ${batch.folder} | topic: ${meta.topic} | slides: ${slides.length}`);

fs.mkdirSync(OUT_DIR, { recursive: true });

const manifest = {
  date:        targetDate,
  batchFolder: batch.folder,
  topic:       meta.topic,
  slides:      slides.map(s => path.relative(ROOT, s).replace(/\\/g, "/")),
  caption:     `${meta.caption}\n\n${meta.hashtags}`,
};

const outFile = path.join(OUT_DIR, `${targetDate}.json`);
fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2));

batch.posted = true;
fs.writeFileSync(QUEUE, JSON.stringify(queue, null, 2));

console.log(`done → ${path.relative(ROOT, outFile)}`);
