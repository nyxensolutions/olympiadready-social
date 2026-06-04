#!/usr/bin/env node
/**
 * One-time import: copies pre-generated quiz images from the main repo's
 * marketing/daily-quizzes/ into this bot repo's content/quizzes/ with the
 * naming convention the bot expects.
 *
 * Source: ../OlympiadReadySolutions/marketing/daily-quizzes/<date>/
 *   morning-maths-question.png  → morning-question.png
 *   morning-maths-answer.png    → morning-answer.png
 *   evening-english-question.png → evening-question.png
 *   evening-english-answer.png  → evening-answer.png
 *
 * Usage:
 *   node scripts/import-premade-quizzes.js
 *   node scripts/import-premade-quizzes.js --source /absolute/path/to/daily-quizzes
 */

const fs   = require("fs");
const path = require("path");

// ── Paths ───────────────────────────────────────────────────────────────────
const ROOT   = path.resolve(__dirname, "..");
const SOURCE = (() => {
  const idx = process.argv.indexOf("--source");
  if (idx !== -1 && process.argv[idx + 1]) return path.resolve(process.argv[idx + 1]);
  // Default: sibling repo layout on the dev machine
  return path.resolve(
    ROOT,
    "..",
    "..",
    "OlympiadReady",
    "OlympiadReadySolutions",
    "marketing",
    "daily-quizzes"
  );
})();

const DEST = path.join(ROOT, "content", "quizzes");

// ── Rename map ───────────────────────────────────────────────────────────────
const MAP = {
  "morning-maths-question.png":   "morning-question.png",
  "morning-maths-answer.png":     "morning-answer.png",
  "evening-english-question.png": "evening-question.png",
  "evening-english-answer.png":   "evening-answer.png",
};

// ── Main ─────────────────────────────────────────────────────────────────────
if (!fs.existsSync(SOURCE)) {
  console.error(`Source folder not found: ${SOURCE}`);
  console.error("Pass --source /absolute/path if your layout differs.");
  process.exit(1);
}

const dates = fs.readdirSync(SOURCE)
  .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d))
  .sort();

if (!dates.length) {
  console.error("No date folders found in source.");
  process.exit(1);
}

let copied = 0, skipped = 0, missing = 0;

for (const date of dates) {
  const srcDir  = path.join(SOURCE, date);
  const destDir = path.join(DEST, date);
  fs.mkdirSync(destDir, { recursive: true });

  for (const [srcName, destName] of Object.entries(MAP)) {
    const srcFile  = path.join(srcDir, srcName);
    const destFile = path.join(destDir, destName);

    if (!fs.existsSync(srcFile)) {
      console.warn(`  MISSING  ${date}/${srcName}`);
      missing++;
      continue;
    }

    if (fs.existsSync(destFile)) {
      console.log(`  EXISTS   ${date}/${destName}  (skip)`);
      skipped++;
      continue;
    }

    fs.copyFileSync(srcFile, destFile);
    console.log(`  COPIED   ${date}/${srcName} → ${destName}`);
    copied++;
  }
}

console.log(`\nDone. Copied: ${copied}  Skipped (already present): ${skipped}  Missing in source: ${missing}`);
console.log(`\nNext steps:`);
console.log(`  git add content/quizzes`);
console.log(`  git commit -m "chore: import pre-generated quiz images for ${dates[0]} – ${dates[dates.length - 1]}"`);
console.log(`  git push`);
