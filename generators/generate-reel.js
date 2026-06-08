#!/usr/bin/env node
// Builds a ~12s, 1080×1920 vertical MP4 Reel for a given date.
// Usage: node generate-reel.js <YYYY-MM-DD>
//
// 6 scenes, each ~2s, showcasing real app features with screenshots:
//   1. Hook           — bold hook text
//   2. AI Practice    — practice/olympiad selector screenshot
//   3. Mock Exams     — mock exam setup screenshot
//   4. AI Explanation — answer review + AI explanation screenshot
//   5. Badges         — badges grid screenshot
//   6. CTA            — olympiadready.com call to action
//
// Requires ffmpeg on PATH (installed via apt-get in GitHub Actions workflow).

const fs   = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { chromium } = require("playwright");

const ROOT    = path.resolve(__dirname, "..");
const dateStr = process.argv[2];
if (!dateStr) { console.error("Usage: generate-reel.js <YYYY-MM-DD>"); process.exit(1); }

// ── Assets (base64 encoded so they work on any runner) ─────────────
const LOGO_LIGHT = "data:image/png;base64," +
  fs.readFileSync(path.join(ROOT, "public", "logo-light.png")).toString("base64");

function loadScreenshot(name) {
  const p = path.join(ROOT, "assets", "screenshots", name);
  if (!fs.existsSync(p)) return null;
  return "data:image/png;base64," + fs.readFileSync(p).toString("base64");
}

const SS_PRACTICE    = loadScreenshot("practice.png");
const SS_MOCK        = loadScreenshot("mock-exam.png");
const SS_EXPLANATION = loadScreenshot("explanation.png");
const SS_BADGES      = loadScreenshot("badges.png");

const W = 1080, H = 1920;

// ── Shared HTML boilerplate ─────────────────────────────────────────
const HEAD = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
body{background:#000;overflow:hidden;}
.s{width:${W}px;height:${H}px;position:relative;overflow:hidden;color:#fff;
   display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:72px 60px;}
.dark{background:radial-gradient(1400px 1100px at 50% -5%, #1a338f 0%, #0B1E5B 55%, #050f33 100%);}
.blob{position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;}
.b1{width:600px;height:600px;top:-200px;left:-200px;background:radial-gradient(circle,rgba(124,47,224,.35),transparent 65%);}
.b2{width:640px;height:640px;bottom:-200px;right:-200px;background:radial-gradient(circle,rgba(37,99,235,.40),transparent 65%);}
.b3{width:400px;height:400px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(251,176,36,.08),transparent 65%);}
.wm{position:absolute;top:56px;left:0;right:0;display:flex;align-items:center;gap:12px;justify-content:center;font-weight:800;font-size:32px;letter-spacing:-0.5px;}
.wm img{height:46px;}
.wm .r{color:#FBB024;}
.pill{display:inline-flex;align-items:center;gap:10px;background:rgba(251,176,36,0.15);border:2px solid #FBB024;
  color:#FBB024;font-weight:700;font-size:22px;letter-spacing:2px;padding:12px 28px;border-radius:100px;text-transform:uppercase;}
.pill-white{display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,0.12);border:2px solid rgba(255,255,255,0.3);
  color:#fff;font-weight:700;font-size:22px;letter-spacing:1.5px;padding:12px 28px;border-radius:100px;text-transform:uppercase;}
h1{font-weight:900;letter-spacing:-2px;line-height:1.05;color:#fff;}
.g{color:#FBB024;}
.b{color:#60a5fa;}
.sub{color:#c5d0f0;font-weight:500;line-height:1.45;font-size:30px;}
/* Browser frame card */
.card{background:#fff;border-radius:24px;overflow:hidden;
  box-shadow:0 32px 100px rgba(0,0,0,0.6);width:92%;margin:0 auto;}
.browser-bar{background:#f1f3f9;padding:12px 18px;display:flex;align-items:center;gap:7px;border-bottom:1px solid #e2e6f0;}
.dot{width:11px;height:11px;border-radius:50%;}
.dot-r{background:#ff5f57;}.dot-y{background:#febc2e;}.dot-g{background:#28c840;}
.url-bar{flex:1;background:#fff;border-radius:8px;padding:6px 14px;font-size:17px;color:#666;text-align:left;margin:0 10px;border:1px solid #dde1ec;}
.card img{width:100%;display:block;object-fit:cover;object-position:top center;}
/* Bullet list */
.bullets{display:flex;flex-direction:column;gap:14px;width:90%;text-align:left;margin-top:24px;}
.bullet{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,0.08);
  border:1.5px solid rgba(255,255,255,0.15);border-radius:16px;padding:16px 22px;font-size:26px;font-weight:600;}
.bullet .icon{font-size:30px;flex:none;}
/* CTA button */
.cta-btn{display:inline-flex;align-items:center;gap:14px;background:#FBB024;color:#0B1E5B;
  font-weight:900;font-size:38px;padding:26px 56px;border-radius:100px;
  text-transform:uppercase;letter-spacing:1px;box-shadow:0 16px 50px rgba(251,176,36,0.4);}
.url-box{display:inline-flex;align-items:center;gap:16px;background:#fff;color:#0B1E5B;
  font-weight:800;font-size:44px;padding:26px 50px;border-radius:20px;
  box-shadow:0 20px 60px rgba(0,0,0,0.4);letter-spacing:-1px;}
.url-box .globe{color:#2563EB;}
</style></head><body>`;
const FOOT = `</body></html>`;

const wm = `<div class="wm"><img src="${LOGO_LIGHT}"><span>Olympiad</span><span class="r">Ready</span></div>`;
const blobs = `<div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>`;

function browserCard(imgSrc, urlLabel, imgHeight = 480) {
  if (!imgSrc) {
    // Placeholder if screenshot missing
    return `<div class="card"><div class="browser-bar">
      <div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div>
      <div class="url-bar">olympiadready.com</div></div>
      <div style="height:${imgHeight}px;background:#eef3ff;display:flex;align-items:center;justify-content:center;font-size:28px;color:#aaa;">
        screenshot not found</div></div>`;
  }
  return `<div class="card">
    <div class="browser-bar">
      <div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div>
      <div class="url-bar">olympiadready.com/${urlLabel}</div>
    </div>
    <img src="${imgSrc}" style="height:${imgHeight}px;object-fit:cover;object-position:top center;">
  </div>`;
}

// ── Scene definitions ───────────────────────────────────────────────
const SCENES = [

  // Scene 1 — Hook
  `${HEAD}<div class="s dark">${blobs}${wm}
    <div class="pill" style="margin-bottom:40px;">⚡ India's #1 AI Olympiad Coach</div>
    <h1 style="font-size:100px;">Still using<br><span class="g">old question<br>banks?</span></h1>
    <p class="sub" style="margin-top:36px;font-size:34px;">There's a smarter way to prepare<br>for every school Olympiad.</p>
  </div>${FOOT}`,

  // Scene 2 — AI Practice
  `${HEAD}<div class="s dark" style="justify-content:flex-start;padding-top:160px;">${blobs}${wm}
    <div class="pill-white" style="margin-bottom:28px;">♾️ Unlimited AI Practice</div>
    <h1 style="font-size:82px;margin-bottom:10px;">Never run out of<br><span class="g">questions.</span></h1>
    <p class="sub" style="font-size:26px;margin-bottom:32px;">AI generates fresh exam-ready questions<br>for IMO, NSO, IEO, NCO & more.</p>
    ${browserCard(SS_PRACTICE, "practice", 500)}
  </div>${FOOT}`,

  // Scene 3 — Mock Exams
  `${HEAD}<div class="s dark" style="justify-content:flex-start;padding-top:160px;">${blobs}${wm}
    <div class="pill-white" style="margin-bottom:28px;">📝 Full Mock Exams</div>
    <h1 style="font-size:86px;margin-bottom:10px;"><span class="g">Real exam.</span><br>Real timer.</h1>
    <p class="sub" style="font-size:26px;margin-bottom:32px;">50-question papers · Countdown timer<br>Exact Olympiad pattern & scoring.</p>
    ${browserCard(SS_MOCK, "mock-exams", 480)}
  </div>${FOOT}`,

  // Scene 4 — AI Explanations
  `${HEAD}<div class="s dark" style="justify-content:flex-start;padding-top:160px;">${blobs}${wm}
    <div class="pill-white" style="margin-bottom:28px;">🧠 Instant AI Explanations</div>
    <h1 style="font-size:82px;margin-bottom:10px;">Understand<br>every <span class="g">answer.</span></h1>
    <p class="sub" style="font-size:26px;margin-bottom:32px;">Not just ✓ or ✗ — get step-by-step<br>AI reasoning for every question.</p>
    ${browserCard(SS_EXPLANATION, "results", 480)}
  </div>${FOOT}`,

  // Scene 5 — Badges & Progress
  `${HEAD}<div class="s dark" style="justify-content:flex-start;padding-top:160px;">${blobs}${wm}
    <div class="pill-white" style="margin-bottom:28px;">🏆 Badges & Rewards</div>
    <h1 style="font-size:88px;margin-bottom:10px;">Practice.<br><span class="g">Earn. Level up.</span></h1>
    <p class="sub" style="font-size:26px;margin-bottom:32px;">Certificates · Leaderboard ranks<br>and real physical medals 🥇</p>
    ${browserCard(SS_BADGES, "dashboard", 480)}
  </div>${FOOT}`,

  // Scene 6 — CTA
  `${HEAD}<div class="s dark">${blobs}${wm}
    <div class="pill" style="margin-bottom:44px;">🚀 Free to start</div>
    <h1 style="font-size:96px;margin-bottom:32px;">Start prepping<br><span class="g">smarter</span><br>today.</h1>
    <div class="url-box" style="margin-bottom:32px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:28px;">No download. No payment.<br>Just practice.</p>
  </div>${FOOT}`,

];

// ── Render scenes → PNG via Playwright ─────────────────────────────
(async () => {
  const outDir   = path.join(ROOT, "content", "reels");
  const sceneDir = path.join(ROOT, "tmp", `reel-${dateStr}`);
  fs.mkdirSync(outDir,   { recursive: true });
  fs.mkdirSync(sceneDir, { recursive: true });

  const browser = await chromium.launch();
  const page    = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

  for (let i = 0; i < SCENES.length; i++) {
    await page.setContent(SCENES[i], { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(sceneDir, `scene-${i+1}.png`), clip: { x:0, y:0, width:W, height:H } });
    console.log(`rendered scene ${i+1}/${SCENES.length}`);
  }
  await browser.close();

  // ── Pick a music track ──────────────────────────────────────────
  const musicDir = path.join(ROOT, "assets", "music");
  let musicFile  = null;
  if (fs.existsSync(musicDir)) {
    const tracks = fs.readdirSync(musicDir)
      .filter(f => /\.(mp3|m4a|wav)$/i.test(f))
      .sort();
    if (tracks.length) {
      const day = parseInt(dateStr.slice(-2), 10);
      musicFile = path.join(musicDir, tracks[day % tracks.length]);
      console.log(`using music: ${path.basename(musicFile)}`);
    }
  }
  if (!musicFile) console.log("no music in assets/music/ — building silent reel");

  // ── Build MP4 via ffmpeg ────────────────────────────────────────
  // Each scene: zoom-pan from center, 72 frames @ 30fps = 2.4s
  const z   = "z='min(zoom+0.0009\\,1.25)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'";
  const pre = `select=eq(n\\,0),scale=${W*2}:${H*2},zoompan=${z}:d=72:s=${W}x${H}:fps=30,setpts=PTS-STARTPTS`;

  const N = SCENES.length; // 6
  const vFilters = Array.from({length: N}, (_,i) => `[${i}:v]${pre}[v${i}];`);

  // Chain xfade transitions: fade / slideleft alternating
  const transitions = ["fade","slideleft","fade","slideleft","fade"];
  let xchain = "";
  let prev   = "v0";
  for (let i = 1; i < N; i++) {
    const out    = i === N-1 ? "v" : `x${i}`;
    const trans  = transitions[i-1] || "fade";
    const offset = (i * 2.4) - 0.5;
    xchain += `[${prev}][v${i}]xfade=transition=${trans}:duration=0.5:offset=${offset.toFixed(1)}[${out}];`;
    prev = `x${i}`;
  }
  // Remove trailing semicolon from last xfade
  xchain = xchain.replace(/;$/, "");

  const audioFilter = musicFile
    ? `;[${N}:a]atrim=0:${N*2.4},asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.5,afade=t=out:st=${N*2.4-0.5}:d=0.5,volume=0.40,aformat=channel_layouts=stereo:sample_rates=44100[a]`
    : "";

  const filterFile = path.join(sceneDir, "filter.txt");
  fs.writeFileSync(filterFile, vFilters.join("") + xchain + audioFilter, "utf8");

  const out         = path.join(outDir, `${dateStr}.mp4`);
  const sceneInputs = Array.from({length: N}, (_,i) =>
    `-loop 1 -t 2.4 -i "${path.join(sceneDir, `scene-${i+1}.png`)}"`
  ).join(" ");
  const musicInput = musicFile ? `-i "${musicFile}"` : "";
  const audioMap   = musicFile ? `-map "[a]" -c:a aac -b:a 128k -ar 44100` : "";
  const totalDuration = (N * 2.4).toFixed(1);

  const cmd = [
    `ffmpeg -y`,
    sceneInputs,
    musicInput,
    `-filter_complex_script "${filterFile}"`,
    `-map "[v]"`,
    audioMap,
    `-c:v libx264 -pix_fmt yuv420p -r 30`,
    `-t ${totalDuration}`,
    `-movflags +faststart`,
    `"${out}"`,
  ].filter(Boolean).join(" ");

  console.log("running ffmpeg…");
  execSync(cmd, { stdio: "inherit" });

  // Cleanup
  fs.rmSync(sceneDir, { recursive: true, force: true });
  console.log("wrote " + path.relative(ROOT, out));
})();
