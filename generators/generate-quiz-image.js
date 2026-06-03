#!/usr/bin/env node
// Renders a single 1080×1080 quiz card.
// Usage: node generate-quiz-image.js <YYYY-MM-DD> <morning|evening> <question|answer>
//
// Picks the question from generators/quiz-bank.js using a deterministic
// rotation keyed on the date+slot, so the same date+slot always yields the
// same question (idempotent).

const fs   = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const QUIZZES = require("./quiz-bank.js");

const ROOT = path.resolve(__dirname, "..");

const [dateStr, slot, kind] = process.argv.slice(2);
if (!dateStr || !["morning","evening"].includes(slot) || !["question","answer"].includes(kind)) {
  console.error("Usage: generate-quiz-image.js <YYYY-MM-DD> <morning|evening> <question|answer>");
  process.exit(1);
}

const LETTERS = ["A","B","C","D"];

const THEMES = {
  Mathematics: { c1:"#2563EB", c2:"#1e3fae", tag:"Maths" },
  English:     { c1:"#0EA5A4", c2:"#0b6f6e", tag:"English" },
};
function themeOf(q) { return THEMES[q.subject] || THEMES.Mathematics; }

// Deterministic pick: hash (date, slot) → index. Different morning/evening on the same day.
function pickQuiz() {
  const seed = dateStr + "::" + slot;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  // Force morning=Maths, evening=English to mirror the social plan.
  const subjectFilter = slot === "morning" ? "Mathematics" : "English";
  const pool = QUIZZES.filter(q => q.subject === subjectFilter);
  return pool[h % pool.length];
}

const Q = pickQuiz();
const T = themeOf(Q);

// Logo: read from /public so the bot is self-contained.
const LOGO_DARK  = "data:image/png;base64," + fs.readFileSync(path.join(ROOT, "public", "logo.png")).toString("base64");
const LOGO_LIGHT = "data:image/png;base64," + fs.readFileSync(path.join(ROOT, "public", "logo-light.png")).toString("base64");

const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

function optionsHtml(reveal) {
  return Q.options.map((o, i) => {
    const correct = reveal && i === Q.answer;
    return `<div class="opt${correct?' correct':''}">
      <span class="ltr" style="background:${T.c1}">${LETTERS[i]}</span>
      <span>${esc(o)}</span>
      ${correct ? '<span class="tick">✓</span>' : ''}
    </div>`;
  }).join("");
}

function head() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
    body{background:#222;}
    .card{width:1080px;height:1080px;position:relative;overflow:hidden;display:flex;flex-direction:column;padding:80px;color:#0B1430;}
    .topbar{display:flex;align-items:center;justify-content:space-between;}
    .wm{display:flex;align-items:center;gap:14px;font-weight:900;font-size:34px;letter-spacing:-1px;}
    .wm img{height:56px;width:auto;display:block;}
    .wm .o{color:#0B1E5B;} .wm .r{color:#2563EB;}
    .badge{display:inline-flex;align-items:center;gap:10px;padding:12px 24px;border-radius:100px;font-weight:700;font-size:24px;color:#fff;}
    .eyebrow{font-weight:700;font-size:26px;text-transform:uppercase;letter-spacing:3px;margin-top:44px;}
    .q{font-size:50px;line-height:1.16;font-weight:800;letter-spacing:-1px;margin-top:20px;color:#0B1430;}
    .opts{display:flex;flex-direction:column;gap:16px;margin-top:34px;}
    .opt{display:flex;align-items:center;gap:24px;background:#F4F6FC;border:2px solid #e6eaf6;border-radius:20px;padding:22px 30px;font-size:35px;font-weight:600;color:#0B1430;}
    .opt .ltr{flex:none;width:64px;height:64px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:34px;color:#fff;}
    .opt.correct{background:#ECFDF3;border-color:#16a34a;}
    .opt.correct .ltr{background:#16a34a !important;}
    .opt.correct .tick{margin-left:auto;color:#16a34a;font-size:42px;font-weight:900;}
    .footer{margin-top:auto;display:flex;flex-direction:column;gap:6px;}
    .cta{font-size:32px;font-weight:800;color:#0B1430;}
    .cta .hl{color:#2563EB;}
    .sub{font-size:24px;color:#5b6480;font-weight:500;}
    .ansTag{font-size:28px;font-weight:800;letter-spacing:2px;text-transform:uppercase;}
    .ans .eyebrow{margin-top:40px;}
    .ans .q{font-size:42px;margin-top:16px;}
    .ans .opts{gap:14px;margin-top:30px;}
    .ans .opt{padding:18px 28px;font-size:31px;}
    .ans .opt .ltr{width:54px;height:54px;font-size:30px;}
    .expl{margin-top:26px;background:#F4F6FC;border-left:8px solid #2563EB;border-radius:16px;padding:24px 30px;font-size:28px;line-height:1.45;font-weight:500;color:#0B1430;}
    .blob{position:absolute;border-radius:50%;filter:blur(2px);opacity:.18;}
  </style></head><body>`;
}

function questionCard() {
  const slotWord = slot.charAt(0).toUpperCase() + slot.slice(1) + " Quiz";
  return `${head()}
  <div class="card" style="background:linear-gradient(170deg,#ffffff 0%, #f3f6ff 100%);">
    <div class="blob" style="width:520px;height:520px;background:${T.c1};top:-180px;right:-160px;"></div>
    <div class="topbar">
      <div class="wm"><img src="${LOGO_DARK}"><span class="o">Olympiad</span><span class="r">Ready</span></div>
      <div class="badge" style="background:${T.c1}">Class ${esc(Q.grade)} · ${esc(T.tag)}</div>
    </div>
    <div class="eyebrow" style="color:${T.c1}">⚡ ${esc(slotWord)} of the Day</div>
    <div class="q">${esc(Q.question)}</div>
    <div class="opts">${optionsHtml(false)}</div>
    <div class="footer">
      <div class="cta">Comment your answer 👇 <span class="hl">A, B, C or D</span></div>
      <div class="sub">Answer revealed tomorrow at 2 PM · olympiadready.com</div>
    </div>
  </div></body></html>`;
}

function answerCard() {
  return `${head()}
  <div class="card ans" style="background:linear-gradient(170deg,#0B1E5B 0%, #1e3fae 100%);color:#fff;">
    <div class="blob" style="width:560px;height:560px;background:${T.c1};bottom:-200px;left:-160px;opacity:.30;"></div>
    <div class="topbar">
      <div class="wm" style="color:#fff"><img src="${LOGO_LIGHT}"><span style="color:#fff">Olympiad</span><span style="color:#FBB024">Ready</span></div>
      <div class="badge" style="background:rgba(255,255,255,.18)">Class ${esc(Q.grade)} · ${esc(T.tag)}</div>
    </div>
    <div class="ansTag" style="color:#FBB024;margin-top:40px;">✅ The Answer (${slot})</div>
    <div class="q" style="color:#fff;">${esc(Q.question)}</div>
    <div class="opts">${optionsHtml(true)}</div>
    <div class="expl" style="background:rgba(255,255,255,.12);border-left-color:#FBB024;color:#eaf0ff;">
      ${esc(Q.explanation || "")}
    </div>
    <div class="footer" style="margin-top:34px;">
      <div class="cta" style="color:#fff;">Want 100s more at your level? <span style="color:#FBB024">Take Free Tests →</span></div>
      <div class="sub" style="color:#c5d3ff;">olympiadready.com</div>
    </div>
  </div></body></html>`;
}

(async () => {
  const outDir = path.join(ROOT, "content", "quizzes", dateStr);
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, `${slot}-${kind}.png`);

  const html = kind === "question" ? questionCard() : answerCard();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: out, clip: { x:0, y:0, width:1080, height:1080 } });
  await browser.close();
  console.log("wrote " + path.relative(ROOT, out));
})();
