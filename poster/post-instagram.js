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
const { uploadVideo } = require("./lib/youtube");
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
    const GIT = `git -c user.name="ig-bot" -c user.email="nyxencloud@gmail.com"`;
    execSync(`${GIT} commit -m "${message}"`, { cwd: ROOT, stdio: "inherit" });
    execSync(`${GIT} pull --rebase origin ${BRANCH}`, { cwd: ROOT, stdio: "inherit" });
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
  // Posts answer slide(s) for YESTERDAY's quiz(zes).
  // With the reduced schedule (morning quiz Mon/Wed/Fri, evening quiz Fri only)
  // most days only have one answer slide — posted as a single image, not a carousel.
  const yesterday = istYesterdayString();
  const slotKey = `${yesterday}-answers`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  // Only reveal answers for quizzes that were actually posted yesterday.
  const morningPosted = alreadyPosted(`${yesterday}-morning`);
  const eveningPosted = alreadyPosted(`${yesterday}-evening`);
  if (!morningPosted && !eveningPosted) {
    log(`SKIPPED — neither ${yesterday}-morning nor ${yesterday}-evening was posted. No answers to reveal.`);
    return;
  }

  const slideFiles = [];
  if (morningPosted) slideFiles.push(await ensureQuizImage(yesterday, "morning", "answer"));
  if (eveningPosted) slideFiles.push(await ensureQuizImage(yesterday, "evening", "answer"));
  await commitContent(`content: answers for ${yesterday}`);

  const caption = captions.buildAnswersCarousel(yesterday);
  const urls    = slideFiles.map(rawUrlFor);
  log(`answer URL(s) (${urls.length}):\n  ${urls.join("\n  ")}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");

  // Single answer slide → image post; two slides → carousel
  let mediaId;
  if (urls.length === 1) {
    mediaId = await postImage({ imageUrl: urls[0], caption });
  } else {
    mediaId = await postCarousel({ imageUrls: urls, caption });
  }
  record({ slotKey, type: urls.length > 1 ? "carousel" : "image", igMediaId: mediaId,
           files: slideFiles.map(f => path.relative(ROOT, f)) });
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

  // ── Instagram ──────────────────────────────────────────────────
  const mediaId = await postReel({ videoUrl: url, caption });
  log(`✅ posted ig media ${mediaId}`);

  // ── YouTube Shorts ─────────────────────────────────────────────
  let ytVideoId = null;
  if (process.env.YT_CLIENT_ID && process.env.YT_CLIENT_SECRET && process.env.YT_REFRESH_TOKEN) {
    try {
      const ytMeta = captions.buildYouTubeShort(date);
      log(`uploading to YouTube: "${ytMeta.title}"`);
      ytVideoId = await uploadVideo(mp4, ytMeta);
      log(`✅ uploaded to YouTube: https://youtube.com/shorts/${ytVideoId}`);
    } catch (e) {
      log(`⚠️  YouTube upload failed (Instagram post succeeded): ${e.message}`);
    }
  } else {
    log("YouTube secrets not set — skipping YouTube upload");
  }

  record({ slotKey, type: "reel", igMediaId: mediaId, ytVideoId, file: path.relative(ROOT, mp4) });
  await commitContent(`state: recorded ${slotKey}`);
}

async function ensureDyk(dateStr, slot) {
  const file = path.join(ROOT, "content", "dyk", `${dateStr}-${slot}.png`);
  if (fs.existsSync(file)) { log(`using existing ${path.relative(ROOT, file)}`); return file; }
  log(`generating ${path.relative(ROOT, file)} …`);
  execSync(`node generators/generate-dyk-image.js ${dateStr} ${slot}`, { cwd: ROOT, stdio: "inherit" });
  if (!fs.existsSync(file)) fail(`generator did not produce ${file}`);
  return file;
}

async function runDykMorning() {
  const date = istDateString();
  const slotKey = `${date}-dyk-morning`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const img = await ensureDyk(date, "morning");
  await commitContent(`content: DYK morning for ${date}`);

  const caption = captions.buildDyk(date, "morning");
  const url = rawUrlFor(img);
  log(`image URL: ${url}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");
  const mediaId = await postImage({ imageUrl: url, caption });
  record({ slotKey, type: "image", igMediaId: mediaId, file: path.relative(ROOT, img) });
  log(`✅ posted ig media ${mediaId}`);
  await commitContent(`state: recorded ${slotKey}`);
}

async function runDykEvening() {
  const date = istDateString();
  const slotKey = `${date}-dyk-evening`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const img = await ensureDyk(date, "evening");
  await commitContent(`content: DYK evening for ${date}`);

  const caption = captions.buildDyk(date, "evening");
  const url = rawUrlFor(img);
  log(`image URL: ${url}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");
  const mediaId = await postImage({ imageUrl: url, caption });
  record({ slotKey, type: "image", igMediaId: mediaId, file: path.relative(ROOT, img) });
  log(`✅ posted ig media ${mediaId}`);
  await commitContent(`state: recorded ${slotKey}`);
}

async function ensureLearnSlides(dateStr) {
  const metaFile = path.join(ROOT, "content", "learn", `${dateStr}-meta.json`);
  const slide1   = path.join(ROOT, "content", "learn", `${dateStr}-slide-1.png`);
  if (fs.existsSync(metaFile) && fs.existsSync(slide1)) {
    log(`using existing learn slides for ${dateStr}`);
  } else {
    log(`generating learn carousel for ${dateStr} …`);
    execSync(`node generators/generate-learn-image.js ${dateStr}`, { cwd: ROOT, stdio: "inherit" });
    if (!fs.existsSync(metaFile)) fail(`generator did not produce meta file ${metaFile}`);
  }
  const meta = JSON.parse(fs.readFileSync(metaFile, "utf8"));
  const slidePaths = [];
  for (let i = 1; i <= meta.slideCount; i++) {
    const f = path.join(ROOT, "content", "learn", `${dateStr}-slide-${i}.png`);
    if (!fs.existsSync(f)) fail(`missing slide ${i}: ${f}`);
    slidePaths.push(f);
  }
  return { slidePaths, meta };
}

async function runLearn() {
  const date = istDateString();
  const slotKey = `${date}-learn`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const { slidePaths, meta } = await ensureLearnSlides(date);
  await commitContent(`content: learn carousel (${meta.subject}, ${meta.slideCount} slides) for ${date}`);

  const caption = captions.buildLearn(date, meta.subject);
  const urls = slidePaths.map(rawUrlFor);
  log(`carousel URLs (${urls.length} slides):\n  ${urls.join("\n  ")}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");
  const mediaId = await postCarousel({ imageUrls: urls, caption });
  record({ slotKey, type: "carousel", igMediaId: mediaId, subject: meta.subject,
           files: slidePaths.map(f => path.relative(ROOT, f)) });
  log(`✅ posted ig media ${mediaId}`);
  await commitContent(`state: recorded ${slotKey}`);
}

async function ensureBlogSlides(dateStr) {
  const metaFile = path.join(ROOT, "content", "blog", `${dateStr}-meta.json`);
  const slide1   = path.join(ROOT, "content", "blog", `${dateStr}-slide-1.png`);
  if (fs.existsSync(metaFile) && fs.existsSync(slide1)) {
    log(`using existing blog slides for ${dateStr}`);
  } else {
    log(`generating blog carousel for ${dateStr} …`);
    execSync(`node generators/generate-blog-image.js ${dateStr}`, { cwd: ROOT, stdio: "inherit" });
    if (!fs.existsSync(metaFile)) fail(`generator did not produce meta file ${metaFile}`);
  }
  const meta = JSON.parse(fs.readFileSync(metaFile, "utf8"));
  const slidePaths = [];
  for (let i = 1; i <= meta.slideCount; i++) {
    const f = path.join(ROOT, "content", "blog", `${dateStr}-slide-${i}.png`);
    if (!fs.existsSync(f)) fail(`missing slide ${i}: ${f}`);
    slidePaths.push(f);
  }
  return { slidePaths, meta };
}

async function runBlog() {
  const date = istDateString();
  const slotKey = `${date}-blog`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const { slidePaths, meta } = await ensureBlogSlides(date);
  await commitContent(`content: blog carousel for ${date} — ${meta.title}`);

  const caption = captions.buildBlog(date, meta);
  const urls = slidePaths.map(rawUrlFor);
  log(`carousel URLs (${urls.length} slides):\n  ${urls.join("\n  ")}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");
  const mediaId = await postCarousel({ imageUrls: urls, caption });
  record({ slotKey, type: "carousel", igMediaId: mediaId, slug: meta.slug,
           files: slidePaths.map(f => path.relative(ROOT, f)) });
  log(`✅ posted ig media ${mediaId}`);
  await commitContent(`state: recorded ${slotKey}`);
}

async function runHandwrittenCarousel() {
  const date    = istDateString();
  const slotKey = `${date}-handwritten-carousel`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const manifestFile = path.join(ROOT, "content", "handwritten", `${date}.json`);
  if (!fs.existsSync(manifestFile)) {
    log(`No handwritten carousel manifest for ${date} — nothing to post.`);
    return;
  }

  const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));

  // Stage queue.json (marked posted by generator) before committing
  execSync("git add social-content/handwritten/queue.json", { cwd: ROOT, stdio: "ignore" });
  await commitContent(`content: handwritten carousel for ${date} — ${manifest.topic}`);

  const urls    = manifest.slides.map(rel => `${RAW}/${rel}`);
  const caption = manifest.caption;
  log(`carousel URLs (${urls.length} slides):\n  ${urls.join("\n  ")}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");

  const mediaId = await postCarousel({ imageUrls: urls, caption });
  log(`✅ posted ig media ${mediaId}`);

  record({ slotKey, type: "carousel", igMediaId: mediaId,
           topic: manifest.topic, files: manifest.slides });
  await commitContent(`state: recorded ${slotKey}`);
}

async function runHandwrittenReel() {
  const date    = istDateString();
  const slotKey = `${date}-handwritten-reel`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const mp4         = path.join(ROOT, "content", "reels", `${date}-handwritten.mp4`);
  const captionFile = path.join(ROOT, "content", "reels", `${date}-handwritten.txt`);

  if (!fs.existsSync(mp4)) {
    log(`No handwritten reel for ${date} — nothing to post.`);
    return;
  }

  // Stage queue.json (marked posted by the generator) so it doesn't block
  // the pull --rebase inside commitContent with "unstaged changes" error.
  execSync("git add social-content/handwritten/queue.json", { cwd: ROOT, stdio: "ignore" });

  // Commit the generated MP4 + caption + updated queue.json to GitHub FIRST
  // so the raw.githubusercontent.com URL exists when Instagram fetches it.
  await commitContent(`content: handwritten reel for ${date}`);

  const caption = fs.existsSync(captionFile)
    ? fs.readFileSync(captionFile, "utf8").trim()
    : `Study notes reel for ${date}`;

  const url = rawUrlFor(mp4);
  log(`video URL: ${url}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");

  const mediaId = await postReel({ videoUrl: url, caption });
  log(`✅ posted ig media ${mediaId}`);

  record({ slotKey, type: "reel", igMediaId: mediaId, file: path.relative(ROOT, mp4) });
  await commitContent(`state: recorded ${slotKey}`);
}

// ── Handwritten one-pager (posted as a Reel) ──────────────────────────────────
// The PNG is committed to content/handwritten-onepager/<YYYY-MM-DD>.png by you
// before the Monday workflow fires. The handler converts it to a short MP4 using
// ffmpeg (7 sec, 9:16, slow Ken Burns zoom), commits the video, then posts as a
// Reel via the Graph API — same posting path as handwritten-reel.
// An optional <YYYY-MM-DD>.json beside the PNG can override the caption
// (fields: topic, grade, caption_hook, caption, hashtags).
async function runHandwrittenOnepager() {
  const date    = istDateString();
  const slotKey = `${date}-handwritten-onepager`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const img         = path.join(ROOT, "content", "handwritten-onepager", `${date}.png`);
  const captionFile = path.join(ROOT, "content", "handwritten-onepager", `${date}.json`);
  const mp4         = path.join(ROOT, "content", "handwritten-onepager", `${date}.mp4`);

  if (!fs.existsSync(img)) {
    log(`No handwritten one-pager for ${date} — nothing to post.`);
    return;
  }

  // Convert PNG → short MP4 reel (9:16 portrait, 7 seconds, subtle zoom-in)
  if (!fs.existsSync(mp4)) {
    log(`converting ${path.relative(ROOT, img)} → reel MP4 …`);
    execSync(
      `ffmpeg -y -loop 1 -i "${img}" ` +
      `-vf "scale=1080:1920:force_original_aspect_ratio=decrease,` +
      `pad=1080:1920:(ow-iw)/2:(oh-ih)/2,` +
      `zoompan=z='min(zoom+0.0004,1.06)':d=175:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920,` +
      `fps=30" ` +
      `-c:v libx264 -t 7 -pix_fmt yuv420p "${mp4}"`,
      { cwd: ROOT, stdio: "inherit" }
    );
    if (!fs.existsSync(mp4)) fail(`ffmpeg did not produce ${mp4}`);
  } else {
    log(`using existing ${path.relative(ROOT, mp4)}`);
  }

  const meta    = fs.existsSync(captionFile) ? JSON.parse(fs.readFileSync(captionFile, "utf8")) : {};
  const caption = captions.buildOnepagerReel(date, meta);

  // Commit the MP4 to GitHub FIRST so the raw.githubusercontent.com URL
  // is accessible when Instagram fetches it.
  await commitContent(`content: one-pager reel for ${date}${meta.topic ? ` — ${meta.topic}` : ""}`);

  const url = rawUrlFor(mp4);
  log(`video URL: ${url}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");

  const mediaId = await postReel({ videoUrl: url, caption });
  log(`✅ posted ig media ${mediaId}`);

  record({ slotKey, type: "reel", igMediaId: mediaId,
           topic: meta.topic || "", file: path.relative(ROOT, mp4) });
  await commitContent(`state: recorded ${slotKey}`);
}

// ── Mistake series ─────────────────────────────────────────────────────────────
// Auto-generates a "most students get this wrong" reveal card from the quiz bank.
// No manual assets required — Playwright renders the card on the fly.
async function runMistake() {
  const date    = istDateString();
  const slotKey = `${date}-mistake`;
  if (alreadyPosted(slotKey)) return log(`skipped — ${slotKey} already posted`);

  const imgPath  = path.join(ROOT, "content", "mistake", `${date}.png`);
  const metaPath = path.join(ROOT, "content", "mistake", `${date}.json`);

  if (!fs.existsSync(imgPath)) {
    log(`generating mistake card for ${date} …`);
    execSync(`node generators/generate-mistake-image.js ${date}`, { cwd: ROOT, stdio: "inherit" });
    if (!fs.existsSync(imgPath)) fail(`generator did not produce ${imgPath}`);
  } else {
    log(`using existing ${path.relative(ROOT, imgPath)}`);
  }

  const meta    = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, "utf8")) : {};
  const caption = captions.buildMistake(date, meta);
  await commitContent(`content: mistake card for ${date}`);

  const url = rawUrlFor(imgPath);
  log(`image URL: ${url}`);

  if (DRY) return log("DRY_RUN — skipping Graph API call");

  const mediaId = await postImage({ imageUrl: url, caption });
  log(`✅ posted ig media ${mediaId}`);

  record({ slotKey, type: "image", igMediaId: mediaId,
           subject: meta.subject || "", file: path.relative(ROOT, imgPath) });
  await commitContent(`state: recorded ${slotKey}`);
}

// ── main ───────────────────────────────────────────────────────────
const HANDLERS = {
  morning: runMorning,
  evening: runEvening,
  "noon-answers": runNoonAnswers,
  reel: runReel,
  "dyk-morning": runDykMorning,
  "dyk-evening": runDykEvening,
  learn: runLearn,
  blog: runBlog,
  "handwritten-carousel": runHandwrittenCarousel,
  "handwritten-reel": runHandwrittenReel,
  "handwritten-onepager": runHandwrittenOnepager,
  mistake: runMistake,
};

(async () => {
  if (!SLOT || !HANDLERS[SLOT]) {
    fail(`Unknown slot "${SLOT}". Expected one of: ${Object.keys(HANDLERS).join(", ")}`);
  }
  try { await HANDLERS[SLOT](); }
  catch (e) { fail(e.stack || e.message); }
})();
