#!/usr/bin/env node
// Renders a "most students get this wrong" reveal card for Instagram feed.
// Picks a question from the quiz bank using a weekly rotation so each Friday
// shows a different question indefinitely.
//
// Output:
//   content/mistake/<YYYY-MM-DD>.png   — the 1080×1080 card
//   content/mistake/<YYYY-MM-DD>.json  — metadata used by the caption builder
//
// Usage:
//   node generators/generate-mistake-image.js            (today IST)
//   node generators/generate-mistake-image.js 2026-08-22

const fs   = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const QUIZZES = require("./quiz-bank.js");

const ROOT  = path.resolve(__dirname, "..");
const W = 1080, H = 1080;

// ── Date ──────────────────────────────────────────────────────────────────────
function istDateStr() {
  return new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 10);
}
const dateStr = process.argv[2] || istDateStr();

// ── Pick question — weekly rotation with "mistake" seed ──────────────────────
// Using a week-number seed means the same question runs all week if triggered
// multiple times, but rotates each week.
function pickQuestion() {
  const dateMs  = new Date(dateStr + "T00:00:00+05:30").getTime();
  const weekNum = Math.floor(dateMs / (7 * 86400000));
  // Mix with a prime offset so this never collides with the regular quiz rotation
  const seed = weekNum * 1009 + 31;
  return QUIZZES[seed % QUIZZES.length];
}

const Q = pickQuestion();

// ── Subject display name ──────────────────────────────────────────────────────
const SUBJECT_TAGS = {
  Mathematics: "Maths", English: "English", Science: "Science",
  History: "History", Geography: "Geography", "Computer Science": "CS",
};
const subjectTag = SUBJECT_TAGS[Q.subject] || Q.subject;

// ── "Trap" wrong answer — the one right before correct (looks like a near miss)
const trapIdx = Q.answer > 0 ? Q.answer - 1 : 1;

// ── Assets ────────────────────────────────────────────────────────────────────
const LOGO_LIGHT = "data:image/png;base64," +
  fs.readFileSync(path.join(ROOT, "public", "logo-light.png")).toString("base64");

const LETTERS = ["A", "B", "C", "D"];
const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ── Options HTML ──────────────────────────────────────────────────────────────
function optsHtml() {
  const longOpts = Q.options.some(o => o.length > 30);
  return Q.options.map((opt, i) => {
    const isCorrect = i === Q.answer;
    const isTrap    = i === trapIdx;
    const cls   = isCorrect ? "correct" : isTrap ? "trap" : "neutral";
    const badge = isCorrect
      ? `<span class="side-badge correct-badge">✅ Correct</span>`
      : isTrap
      ? `<span class="side-badge trap-badge">❌ Most choose</span>`
      : "";
    return `<div class="opt ${cls}">
        <span class="ltr">${LETTERS[i]}</span>
        <span class="opt-text" style="font-size:${longOpts ? "24px" : "27px"}">${esc(opt)}</span>
        ${badge}
      </div>`;
  }).join("\n      ");
}

const qFontSize = Q.question.length > 130 ? "32px" : Q.question.length > 90 ? "37px" : "42px";

// ── Card HTML ─────────────────────────────────────────────────────────────────
const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
body{background:#07000f;}
.card{
  width:${W}px;height:${H}px;
  background:linear-gradient(160deg,#180020 0%,#07000f 45%,#000b1a 100%);
  position:relative;overflow:hidden;
  display:flex;flex-direction:column;padding:62px;color:#fff;
}
.glow-r{position:absolute;width:520px;height:520px;border-radius:50%;
  background:radial-gradient(circle,rgba(220,38,38,.20),transparent 65%);
  top:-170px;right:-130px;pointer-events:none;}
.glow-l{position:absolute;width:400px;height:400px;border-radius:50%;
  background:radial-gradient(circle,rgba(124,58,237,.16),transparent 65%);
  bottom:-120px;left:-100px;pointer-events:none;}
/* Wordmark */
.wm{display:flex;align-items:center;gap:12px;font-size:26px;font-weight:800;}
.wm img{height:40px;} .wm .r{color:#FBB024;}
/* Eyebrow */
.eyebrow{
  font-size:19px;font-weight:800;color:#ef4444;letter-spacing:1.5px;
  text-transform:uppercase;margin-top:26px;
}
/* Subject badge */
.badge{
  display:inline-flex;align-items:center;
  background:rgba(124,58,237,.28);border:1.5px solid rgba(124,58,237,.6);
  color:#c4b5fd;font-size:17px;font-weight:600;
  padding:5px 16px;border-radius:100px;margin-top:10px;
}
/* Question */
.q{
  font-size:${qFontSize};font-weight:800;line-height:1.2;
  color:#fff;margin-top:20px;letter-spacing:-0.3px;
}
/* Options */
.opts{display:flex;flex-direction:column;gap:9px;margin-top:20px;}
.opt{
  display:flex;align-items:center;gap:14px;
  border-radius:14px;padding:12px 18px;
}
.ltr{
  width:48px;height:48px;border-radius:10px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-size:22px;font-weight:900;
}
.opt-text{flex:1;font-weight:600;}
.side-badge{font-size:14px;font-weight:700;white-space:nowrap;flex-shrink:0;}
/* Trap (wrong, most-chosen) */
.opt.trap{background:rgba(239,68,68,.14);border:1.5px solid rgba(239,68,68,.4);}
.opt.trap .ltr{background:#ef4444;color:#fff;}
.opt.trap .opt-text{color:#fca5a5;}
.trap-badge{color:#ef4444;}
/* Correct */
.opt.correct{background:rgba(16,185,129,.15);border:1.5px solid rgba(16,185,129,.45);}
.opt.correct .ltr{background:#10b981;color:#fff;}
.opt.correct .opt-text{color:#6ee7b7;}
.correct-badge{color:#10b981;}
/* Neutral */
.opt.neutral{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.10);}
.opt.neutral .ltr{background:rgba(255,255,255,.13);color:#9ca3af;}
.opt.neutral .opt-text{color:#6b7280;}
/* Explanation */
.expl{
  margin-top:16px;
  background:rgba(251,176,36,.10);border-left:4px solid #FBB024;
  border-radius:0 12px 12px 0;padding:13px 18px;
  font-size:20px;color:#fef3c7;line-height:1.45;
}
/* CTA */
.cta{margin-top:auto;padding-top:14px;font-size:21px;font-weight:700;color:rgba(255,255,255,.60);}
.cta .hl{color:#FBB024;}
</style></head><body>
<div class="card">
  <div class="glow-r"></div>
  <div class="glow-l"></div>

  <div class="wm">
    <img src="${LOGO_LIGHT}" alt="">
    <span>Olympiad</span><span class="r">Ready</span>
  </div>

  <div class="eyebrow">⚠️ Most students get this wrong!</div>
  <div class="badge">Class ${esc(String(Q.grade))} · ${esc(subjectTag)}</div>

  <div class="q">${esc(Q.question)}</div>

  <div class="opts">
    ${optsHtml()}
  </div>

  ${Q.explanation
    ? `<div class="expl">💡 ${esc(Q.explanation)}</div>`
    : ""}

  <div class="cta">
    Build exam confidence → <span class="hl">olympiadready.com</span>
  </div>
</div>
</body></html>`;

// ── Render ────────────────────────────────────────────────────────────────────
(async () => {
  const outDir = path.join(ROOT, "content", "mistake");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const page    = await browser.newPage({
    viewport: { width: W, height: H },
    deviceScaleFactor: 2,
  });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const imgPath = path.join(outDir, `${dateStr}.png`);
  await page.screenshot({ path: imgPath, clip: { x: 0, y: 0, width: W, height: H } });
  await browser.close();

  // Meta file — caption builder uses subject + grade
  const metaPath = path.join(outDir, `${dateStr}.json`);
  fs.writeFileSync(metaPath, JSON.stringify({
    grade:      Q.grade,
    subject:    Q.subject,
    subjectTag,
    questionSnippet: Q.question.slice(0, 80),
  }, null, 2), "utf8");

  console.log(`✅  mistake card → content/mistake/${dateStr}.png`);
})();
