#!/usr/bin/env node
// Builds a ~10s, 1080×1920 vertical MP4 Reel for a given date.
// Usage: node generate-reel.js <YYYY-MM-DD>
//
// Scene plan (each ~2s, crossfaded):
//   1. Brand hook  — "India's First AI Olympiad Prep"
//   2. Morning quiz card preview
//   3. Evening quiz card preview
//   4. Value     — "Take Free Tests"
//   5. CTA       — olympiadready.com
//
// Requires ffmpeg on PATH (preinstalled on GitHub Actions ubuntu runners).

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const dateStr = process.argv[2];
if (!dateStr) { console.error("Usage: generate-reel.js <YYYY-MM-DD>"); process.exit(1); }

const LOGO_LIGHT = "data:image/png;base64," + fs.readFileSync(path.join(ROOT, "public", "logo-light.png")).toString("base64");

const W = 1080, H = 1920;

const HEAD = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
  body{background:#000;}
  .s{width:${W}px;height:${H}px;position:relative;overflow:hidden;color:#fff;
     display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:90px;}
  .dark{background:radial-gradient(1400px 1000px at 50% -10%, #1a338f 0%, #0B1E5B 55%, #050f33 100%);}
  .light{background:linear-gradient(160deg,#ffffff 0%, #eef3ff 100%);color:#0B1430;}
  .blob{position:absolute;border-radius:50%;filter:blur(2px);}
  .b1{width:520px;height:520px;top:-150px;left:-150px;background:radial-gradient(circle,rgba(124,47,224,.40),transparent 65%);}
  .b2{width:580px;height:580px;bottom:-180px;right:-150px;background:radial-gradient(circle,rgba(37,99,235,.45),transparent 65%);}
  .wm{position:absolute;top:60px;left:0;right:0;display:flex;align-items:center;gap:14px;justify-content:center;font-weight:800;font-size:36px;letter-spacing:-1px;}
  .wm img{height:54px;} .wm .r{color:#FBB024;}
  .pill{display:inline-flex;align-items:center;gap:14px;background:#FBB024;color:#0B1E5B;font-weight:800;
    font-size:24px;letter-spacing:2px;padding:14px 32px;border-radius:100px;text-transform:uppercase;}
  h1{font-weight:900;letter-spacing:-2px;line-height:1.05;}
  .g{color:#FBB024;} .b{color:#2563EB;}
  .sub{color:#cdd9ff;font-weight:400;line-height:1.4;font-size:32px;max-width:90%;}
  .light .sub{color:#5b6480;}
  .url{display:inline-flex;align-items:center;gap:20px;background:#fff;color:#0B1E5B;font-weight:800;
    font-size:46px;padding:28px 50px;border-radius:24px;box-shadow:0 16px 50px rgba(0,0,0,.4);letter-spacing:-1px;}
  .url .globe{color:#2563EB;}
  .cta{display:inline-flex;align-items:center;gap:16px;background:#FBB024;color:#0B1E5B;font-weight:900;
    font-size:34px;padding:22px 46px;border-radius:100px;text-transform:uppercase;letter-spacing:1px;}
  .qcard{background:#fff;color:#0B1430;border-radius:30px;padding:44px;width:92%;box-shadow:0 22px 60px rgba(0,0,0,.4);text-align:left;}
  .qtag{font-size:22px;font-weight:800;letter-spacing:2px;color:#2563EB;text-transform:uppercase;}
  .qq{font-size:40px;font-weight:800;margin:18px 0 22px;line-height:1.15;}
  .opt{display:flex;align-items:center;gap:18px;background:#F4F6FC;border:2px solid #e6eaf6;border-radius:16px;
    padding:16px 22px;font-size:30px;font-weight:600;margin-bottom:12px;}
  .opt .ltr{width:48px;height:48px;border-radius:12px;background:#2563EB;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;flex:none;}
</style></head><body>`;
const FOOT = `</body></html>`;
const wm = `<div class="wm"><img src="${LOGO_LIGHT}"><span>Olympiad</span><span class="r">Ready</span></div>`;
const blobs = `<div class="blob b1"></div><div class="blob b2"></div>`;

function teaserCard(slotLabel, subject) {
  return `<div class="qcard">
    <div class="qtag">⚡ ${slotLabel} · ${subject}</div>
    <div class="qq">A brand-new Olympiad-level question is live on our feed.</div>
    <div class="opt"><span class="ltr">A</span><span>Comment</span></div>
    <div class="opt"><span class="ltr">B</span><span>your</span></div>
    <div class="opt"><span class="ltr">C</span><span>answer</span></div>
    <div class="opt"><span class="ltr">D</span><span>👇</span></div>
  </div>`;
}

const SCENES = [
  // 1
  `${HEAD}<div class="s dark">${blobs}${wm}
    <div class="pill">India's First · AI Olympiad Prep</div>
    <h1 style="font-size:108px;margin-top:36px;">Smarter prep.<br><span class="g">Real results.</span></h1>
    <p class="sub" style="margin-top:32px;">For IMO, NSO, IEO &amp; every major school Olympiad.</p>
  </div>${FOOT}`,

  // 2
  `${HEAD}<div class="s dark">${blobs}${wm}
    <h1 style="font-size:78px;">Today's <span class="g">morning</span> quiz is live 🧠</h1>
    ${teaserCard("Morning Quiz","Mathematics")}
  </div>${FOOT}`,

  // 3
  `${HEAD}<div class="s dark">${blobs}${wm}
    <h1 style="font-size:78px;">And an <span class="g">evening</span> one too 🌙</h1>
    ${teaserCard("Evening Quiz","English")}
  </div>${FOOT}`,

  // 4
  `${HEAD}<div class="s light">
    <div class="wm" style="color:#0B1E5B;"><img src="${LOGO_LIGHT}"><span>Olympiad</span><span class="r">Ready</span></div>
    <div class="pill">Free to start</div>
    <h1 style="font-size:96px;margin-top:36px;color:#0B1430;">Take <span class="b">Free Tests</span><br>in 30 seconds.</h1>
    <p class="sub" style="margin-top:30px;">No download. No payment.</p>
  </div>${FOOT}`,

  // 5
  `${HEAD}<div class="s dark">${blobs}${wm}
    <h1 style="font-size:88px;">Start prepping <span class="g">smarter</span><br>today.</h1>
    <div class="url" style="margin-top:48px;"><span class="globe">🌐</span> olympiadready.com</div>
    <div class="cta" style="margin-top:40px;">Take Free Tests →</div>
  </div>${FOOT}`,
];

(async () => {
  const outDir = path.join(ROOT, "content", "reels");
  const sceneDir = path.join(ROOT, "tmp", `reel-${dateStr}`);
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(sceneDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  for (let i = 0; i < SCENES.length; i++) {
    await page.setContent(SCENES[i], { waitUntil: "networkidle" });
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(sceneDir, `scene-${i+1}.png`), clip: { x:0, y:0, width:W, height:H } });
  }
  await browser.close();

  // Build the MP4 via ffmpeg. Same filter graph as marketing/Videos.
  const z = "z='min(zoom+0.0009\\,1.25)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'";
  const pre = `select=eq(n\\,0),scale=${W*2}:${H*2},zoompan=${z}:d=72:s=${W}x${H}:fps=30,setpts=PTS-STARTPTS`;
  const filter = [
    `[0:v]${pre}[v0];`,`[1:v]${pre}[v1];`,`[2:v]${pre}[v2];`,`[3:v]${pre}[v3];`,`[4:v]${pre}[v4];`,
    `[v0][v1]xfade=transition=fade:duration=0.5:offset=1.9[x1];`,
    `[x1][v2]xfade=transition=slideleft:duration=0.5:offset=3.8[x2];`,
    `[x2][v3]xfade=transition=fade:duration=0.5:offset=5.7[x3];`,
    `[x3][v4]xfade=transition=smoothup:duration=0.5:offset=7.6[v]`,
  ].join("");
  const filterFile = path.join(sceneDir, "filter.txt");
  fs.writeFileSync(filterFile, filter, "utf8");

  const out = path.join(outDir, `${dateStr}.mp4`);
  const inputs = [1,2,3,4,5].map(i => `-loop 1 -t 2.4 -i "${path.join(sceneDir, `scene-${i}.png`)}"`).join(" ");
  const cmd = `ffmpeg -y ${inputs} -filter_complex_script "${filterFile}" -map "[v]" -c:v libx264 -pix_fmt yuv420p -r 30 -movflags +faststart "${out}"`;
  execSync(cmd, { stdio: "inherit" });

  // Cleanup intermediates
  fs.rmSync(sceneDir, { recursive: true, force: true });

  console.log("wrote " + path.relative(ROOT, out));
})();
