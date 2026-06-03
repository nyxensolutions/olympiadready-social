#!/usr/bin/env node
// Single entry-point. Called by GitHub Actions with a slot name:
//   node poster/post-instagram.js morning
//   node poster/post-instagram.js evening
//   node poster/post-instagram.js noon-answers
//   node poster/post-instagram.js reel
//
// Behaviour:
//   1. Compute today's IST date (or yesterday for answers).
//   2. Look for expected files in content/. If missing → auto-generate.
//   3. Build the public raw.githubusercontent URL for each file.
//   4. Compose caption (defaults or override JSON).
//   5. Post via Graph API.
//   6. Record in state/posted.json.
//
// DRY_RUN=1 to skip the actual API call (logs + generates only).

const fs   = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { postImage, postCarousel, postReel } = require("./lib/graph");
const { istDateString, istYesterdayString } = require("./lib/dateist");
const { alreadyPosted, record } = require("./lib/state");
const captions = require("./lib/captions");

const ROOT       = path.resolve(__dirname, "..");
const REPO_OWNER = process.env.GITHUB_REPOSITORY_OWNER || "nyxensolutions";
const REPO_NAME  = (process.env.GITHUB_REPOSITORY || "nyxensolutions/olympiadready-social").split("/").pop();
const BRANCH     = process.env.GITHUB_REF_NAME || "main";
const RAW        = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}`;

const SLOT = process.argv[2];
const DRY  = process.env.DRY_RUN === "1";

function log(msg) { console.log(`[${SLOT}] ${msg}`); }
function fail(msg) { console.error(`[${SLOT}] ERROR: ${msg}`); process.exit(1); }

async function ensureQuizImage(dateStr, slot, kind) {
  // slot: "morning" | "evening" ;  kind: "question" | "answer"
  const file = path.join(ROOT, "content", "quizzes", dateStr, `${slot}-${kind}.png`);
  if (fs.existsSync(file)) { log(`using existing ${path.relative(ROOT, file)}`); return file; }
  log(`generating ${path.relative(ROOT, file)} …`);
  execSync(`node generators/generate-quiz-image.js ${dateStr} ${slot} ${kind}`, { cwd: ROOT, stdio: "inherit" });
  if (!fs.existsSync(file)) fail(`generator did not produce ${file}`);
  return file;
}

async function ensureReel(dateStr) {
  const file = path.join(ROOT, "content", "reels", `${dateStr}.mp4`);
  if (fs.existsSync(file)) { log(`using existing ${path.relative(ROOT, file)}`); return file; }
  log(`generating ${path.relative(ROOT, file)} …`);
  execSync(`node generators/generate-reel.js ${dateStr}`, { cwd: ROOT, stdio: "inherit" });
  if (!fs.existsSync(file)) fail(`generator did not produce ${file}`);
  return file;
}

function commitContent(message) {
  // Commit any newly-generated content back to the repo so it's visible
  // in the public raw URL the Graph API will fetch in a second.
  try {
    execSync(`git add content/ state/`, { cwd: ROOT, stdio: "ignore" });
    const changed = execSync(`git diff --cached --name-only`, { cwd: ROOT }).toString().trim();
    if (!changed) { log("no content changes to commit"); return; }
    execSync(`git -c user.name="ig-bot" -c user.email="bot@olympiadready.com" commit -m "${message}"`, { cwd: ROOT, stdio: "inherit" });
    execSync(`git push origin HEAD:${BRANCH}`, { cwd: ROOT, stdio: "inherit" });
    log("pushed content to GitHub — waiting 15s for raw URLs to propagate");
    return new Promise(r => setTimeout(r, 15_000));
  } catch (e) {
    fail(`git commit/push failed: ${e.message}`);
  }
}

function rawUrlFor(absFile) {
  const rel = path.relative(ROOT, absFile).replace(/\\/g, "/");
  return `${RAW}/${rel}`;
}

// ── slot handlers ──────────────────────────────────────────────────
async function runMorning() {
  const date = istDateString();
  const slotKey = `${date}-morning`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const img = await ensureQuizImage(date, "morning", "question");
  await commitContent(`content: morning quiz for ${date}`);

  const caption = captions.buildMorningQuiz(date);
  const url = rawUrlFor(img);
  log(`image URL: ${url}`);
  log(`caption preview:\n${caption.split("\n").slice(0, 3).join("\n")}\n…`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");
  const mediaId = await postImage({ imageUrl: url, caption });
  record({ slotKey, type: "image", igMediaId: mediaId, file: path.relative(ROOT, img) });
  log(`✅ posted ig media ${mediaId}`);
  await commitContent(`state: recorded ${slotKey}`);
}

async function runEvening() {
  const date = istDateString();
  const slotKey = `${date}-evening`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const img = await ensureQuizImage(date, "evening", "question");
  await commitContent(`content: evening quiz for ${date}`);

  const caption = captions.buildEveningQuiz(date);
  const url = rawUrlFor(img);
  log(`image URL: ${url}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");
  const mediaId = await postImage({ imageUrl: url, caption });
  record({ slotKey, type: "image", igMediaId: mediaId, file: path.relative(ROOT, img) });
  log(`✅ posted ig media ${mediaId}`);
  await commitContent(`state: recorded ${slotKey}`);
}

async function runNoonAnswers() {
  // Carousel of YESTERDAY's morning-answer + evening-answer.
  const yesterday = istYesterdayString();
  const slotKey = `${yesterday}-answers`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const a1 = await ensureQuizImage(yesterday, "morning", "answer");
  const a2 = await ensureQuizImage(yesterday, "evening", "answer");
  await commitContent(`content: answers for ${yesterday}`);

  const caption = captions.buildAnswersCarousel(yesterday);
  const urls = [rawUrlFor(a1), rawUrlFor(a2)];
  log(`carousel URLs:\n  ${urls.join("\n  ")}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");
  const mediaId = await postCarousel({ imageUrls: urls, caption });
  record({ slotKey, type: "carousel", igMediaId: mediaId, files: urls });
  log(`✅ posted ig media ${mediaId}`);
  await commitContent(`state: recorded ${slotKey}`);
}

async function runReel() {
  const date = istDateString();
  const slotKey = `${date}-reel`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const mp4 = await ensureReel(date);
  await commitContent(`content: reel for ${date}`);

  const caption = captions.buildReel(date);
  const url = rawUrlFor(mp4);
  log(`video URL: ${url}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");
  const mediaId = await postReel({ videoUrl: url, caption });
  record({ slotKey, type: "reel", igMediaId: mediaId, file: path.relative(ROOT, mp4) });
  log(`✅ posted ig media ${mediaId}`);
  await commitContent(`state: recorded ${slotKey}`);
}

// ── main ───────────────────────────────────────────────────────────
const HANDLERS = {
  morning: runMorning,
  evening: runEvening,
  "noon-answers": runNoonAnswers,
  reel: runReel,
};

(async () => {
  if (!SLOT || !HANDLERS[SLOT]) {
    fail(`Unknown slot "${SLOT}". Expected one of: ${Object.keys(HANDLERS).join(", ")}`);
  }
  try { await HANDLERS[SLOT](); }
  catch (e) { fail(e.stack || e.message); }
})();
