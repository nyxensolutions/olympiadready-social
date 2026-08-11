#!/usr/bin/env node
// Builds a ~12s, 1080×1920 vertical MP4 Reel for a given date.
// Usage: node generate-reel.js <YYYY-MM-DD>
//
// 30 rotating reel scripts, picked by day-of-month % 30:
//   0 — Platform overview      "Still using old question banks?"
//   1 — Free vs Pro            "Start completely FREE"
//   2 — For parents            "Is your child ready?"
//   3 — AI Tutor               "Stuck on a problem at 11 PM?"
//   4 — How it works           "Olympiad gold in 4 steps"
//   5 — Problem → solution     "From boring to brilliant"
//   6 — Score story            "Watch your score climb"
//   7 — Subjects covered       "Every Olympiad subject in one place"
//   8 — Free tier hook         "5 free papers. No card."
//   9 — School pilot pitch     "Your school gets a free invite code"
//  10 — Comparison hook        "₹6,400 vs ₹129 — the maths every parent should see"
//  11 — Child social proof     "My friend got gold. I asked how."
//  12 — Parent WhatsApp bait   "Share this with every parent group"
//  13 — School urgency         "August is weeks away. Is your school ready?"
//  14 — Zero cost school       "Your school pays ₹0 to get started"
//  15 — #1 positioning         "The #1 platform serious Olympiad students use"
//  16 — Unlimited practice     "Never run out of questions. Ever."
//  17 — Free PDF downloads     "Download Olympiad papers as PDFs. Always free."
//  18 — Best questions         "Not all Olympiad questions are equal. Ours are the best."
//  19 — Free value stack       "Start practising right now. Free."
//  20 — Mock exam simulator    "Real Exam. Real Pressure."
//  21 — OMR practice workflow  "Practice exactly like exam day"
//  22 — Answer key deep-dive   "Know WHY you got it wrong"
//  23 — Badges & rewards       "Every paper earns you something"
//  24 — Leaderboard            "See your rank. Climb it."
//  25 — Spell Bee prep         "Spell Bee made easy — Class 1–12"
//  26 — Try without signup     "No login. Just practice."
//  27 — Olympiad tip: time     "Olympiad Tip: Beat the clock"
//  28 — Olympiad tip: strategy "Olympiad Tip: Smart approach to MCQs"
//  29 — Mistake review         "Your wrong answers are your secret weapon"
//
// Requires: ffmpeg on PATH, Playwright chromium installed.

const fs   = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { chromium } = require("playwright");

const ROOT    = path.resolve(__dirname, "..");
const dateStr = process.argv[2];
if (!dateStr) { console.error("Usage: generate-reel.js <YYYY-MM-DD>"); process.exit(1); }

// ── Assets ──────────────────────────────────────────────────────────
const LOGO_LIGHT = "data:image/png;base64," +
  fs.readFileSync(path.join(ROOT, "public", "logo-light.png")).toString("base64");

function loadImg(name) {
  const p = path.join(ROOT, "assets", "screenshots", name);
  if (!fs.existsSync(p)) { console.warn(`[warn] screenshot missing: ${name}`); return null; }
  return "data:image/png;base64," + fs.readFileSync(p).toString("base64");
}

const SS = {
  // app screenshots
  practice:       loadImg("practice.png"),
  mock:           loadImg("mock-exam.png"),
  explanation:    loadImg("explanation.png"),
  badges:         loadImg("badges.png"),
  pdf:            loadImg("pdf-download.png"),
  pricing:        loadImg("pricing.png"),
  aiTutor:        loadImg("ai_tutor.png"),
  // new product screenshots (July 2026)
  mockSimulator:  loadImg("mock-exam-simulator.png"),
  pdfDownloads:   loadImg("pdf-downloads-page.png"),
  practicePaper:  loadImg("practice-paper-pdf.png"),
  omrSheet:       loadImg("omr-answer-sheet.png"),
  answerKey:      loadImg("answer-key-explanations.png"),
  spellBee:       loadImg("spell-bee-prep.png"),
  subModal:       loadImg("subscription-modal.png"),
  leaderboard:    loadImg("leaderboard.png"),
  badgesRewards:  loadImg("badges-rewards.png"),
  tryNow:         loadImg("try-without-signup.png"),
  landingHero:    loadImg("landing-hero.png"),
  // promotional / marketing
  aiTutorPoster:  loadImg("promo-ai-tutor-poster.png"),
  aiRobotStudent: loadImg("promo-ai-robot-student.png"),
  certRewards:    loadImg("promo-certificates-rewards.png"),
  mascotTrophy:   loadImg("promo-mascot-trophy.jpeg"),
  sofSubjects:    loadImg("promo-sof-subjects.png"),
  videoThumb:     loadImg("promo-video-thumbnail.jpg"),
  // marketing slides
  slideAiIntro:   loadImg("slide-ai-tutor-intro.png"),
  slideFeatures:  loadImg("slide-exam-features.png"),
  slidePricing:   loadImg("slide-pricing.png"),
  // website
  websiteHome:    loadImg("website-homepage.png"),
  // school pilot
  schoolPilot:    loadImg("school-pilot-promo.png"),
  schoolPilotBadge: loadImg("school-pilot-badge.png"),
};

const W = 1080, H = 1920;

// ── Shared HTML shell ────────────────────────────────────────────────
const HEAD = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
body{background:#000;overflow:hidden;}
.s{width:${W}px;height:${H}px;position:relative;overflow:hidden;color:#fff;
   display:flex;flex-direction:column;justify-content:center;align-items:center;
   text-align:center;padding:72px 60px;}
.dark{background:radial-gradient(1400px 1100px at 50% -5%,#1a338f 0%,#0B1E5B 55%,#050f33 100%);}
.top{justify-content:flex-start;padding-top:160px;}
/* blobs */
.blob{position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;}
.b1{width:600px;height:600px;top:-200px;left:-200px;background:radial-gradient(circle,rgba(124,47,224,.35),transparent 65%);}
.b2{width:640px;height:640px;bottom:-200px;right:-200px;background:radial-gradient(circle,rgba(37,99,235,.40),transparent 65%);}
.b3{width:400px;height:400px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(251,176,36,.08),transparent 65%);}
/* wordmark */
.wm{position:absolute;top:56px;left:0;right:0;display:flex;align-items:center;
   gap:12px;justify-content:center;font-weight:800;font-size:32px;letter-spacing:-.5px;}
.wm img{height:46px;} .wm .r{color:#FBB024;}
/* pills */
.pill{display:inline-flex;align-items:center;gap:10px;background:rgba(251,176,36,.15);
  border:2px solid #FBB024;color:#FBB024;font-weight:700;font-size:22px;
  letter-spacing:2px;padding:12px 28px;border-radius:100px;text-transform:uppercase;}
.pill-w{display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,.12);
  border:2px solid rgba(255,255,255,.3);color:#fff;font-weight:700;font-size:22px;
  letter-spacing:1.5px;padding:12px 28px;border-radius:100px;text-transform:uppercase;}
.pill-g{display:inline-flex;align-items:center;gap:10px;background:rgba(34,197,94,.15);
  border:2px solid #22c55e;color:#22c55e;font-weight:700;font-size:22px;
  letter-spacing:1.5px;padding:12px 28px;border-radius:100px;text-transform:uppercase;}
/* headings */
h1{font-weight:900;letter-spacing:-2px;line-height:1.05;color:#fff;}
.g{color:#FBB024;} .b{color:#60a5fa;} .gr{color:#4ade80;}
.sub{color:#c5d0f0;font-weight:500;line-height:1.45;font-size:28px;}
/* browser card */
.card{background:#fff;border-radius:24px;overflow:hidden;
  box-shadow:0 32px 100px rgba(0,0,0,.6);width:92%;margin:0 auto;flex-shrink:0;}
.bar{background:#f1f3f9;padding:12px 18px;display:flex;align-items:center;
  gap:7px;border-bottom:1px solid #e2e6f0;}
.dot{width:11px;height:11px;border-radius:50%;}
.dr{background:#ff5f57;} .dy{background:#febc2e;} .dg{background:#28c840;}
.ubar{flex:1;background:#fff;border-radius:8px;padding:6px 14px;
  font-size:17px;color:#666;text-align:left;margin:0 10px;border:1px solid #dde1ec;}
.card img{width:100%;display:block;object-fit:cover;object-position:top center;}
/* feature bullets */
.feats{display:flex;flex-direction:column;gap:14px;width:90%;text-align:left;margin-top:20px;}
.feat{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,.08);
  border:1.5px solid rgba(255,255,255,.15);border-radius:16px;padding:16px 22px;
  font-size:26px;font-weight:600;}
.feat .ic{font-size:30px;flex:none;}
/* free/pro comparison */
.compare{display:flex;gap:16px;width:92%;margin-top:20px;}
.col{flex:1;border-radius:20px;padding:24px 20px;text-align:left;}
.col-free{background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.2);}
.col-pro{background:rgba(251,176,36,.12);border:2px solid #FBB024;}
.col-title{font-size:26px;font-weight:800;margin-bottom:14px;}
.col-item{font-size:22px;font-weight:500;color:#c5d0f0;margin-bottom:8px;
  display:flex;align-items:center;gap:10px;}
.col-item .ck{color:#4ade80;font-size:24px;}
.col-pro .col-item{color:#fff;}
.price{font-size:38px;font-weight:900;color:#FBB024;margin-top:12px;}
.price span{font-size:22px;font-weight:500;color:#c5d0f0;}
/* step card */
.steps{display:flex;flex-direction:column;gap:14px;width:92%;margin-top:20px;}
.step{display:flex;align-items:center;gap:20px;background:rgba(255,255,255,.07);
  border:1.5px solid rgba(255,255,255,.12);border-radius:18px;padding:18px 22px;text-align:left;}
.step-num{width:52px;height:52px;border-radius:50%;background:#2563EB;
  font-size:26px;font-weight:900;display:flex;align-items:center;justify-content:center;flex:none;}
.step-text{font-size:26px;font-weight:700;} .step-sub{font-size:20px;color:#a0b0d0;margin-top:2px;}
/* AI chat mock */
.chat{background:#fff;border-radius:24px;overflow:hidden;width:92%;
  box-shadow:0 32px 100px rgba(0,0,0,.6);text-align:left;}
.chat-hdr{background:#0B1E5B;padding:18px 22px;display:flex;align-items:center;gap:14px;}
.chat-hdr .av{width:44px;height:44px;border-radius:50%;background:#FBB024;
  display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;color:#0B1E5B;}
.chat-hdr .nm{font-size:22px;font-weight:800;color:#fff;}
.chat-hdr .st{font-size:17px;color:#a5b4d0;}
.chat-body{padding:20px;display:flex;flex-direction:column;gap:14px;background:#f4f6fc;}
.msg{max-width:82%;padding:14px 18px;border-radius:18px;font-size:22px;font-weight:500;line-height:1.4;color:#1a1a2e;}
.msg-u{align-self:flex-end;background:#2563EB;color:#fff;border-bottom-right-radius:4px;}
.msg-b{align-self:flex-start;background:#fff;border-bottom-left-radius:4px;
  box-shadow:0 2px 8px rgba(0,0,0,.08);}
.msg-b .tag{font-size:16px;font-weight:700;color:#2563EB;margin-bottom:4px;display:block;}
/* CTA */
.cta-btn{display:inline-flex;align-items:center;gap:14px;background:#FBB024;color:#0B1E5B;
  font-weight:900;font-size:38px;padding:26px 56px;border-radius:100px;
  text-transform:uppercase;letter-spacing:1px;box-shadow:0 16px 50px rgba(251,176,36,.4);}
.url-box{display:inline-flex;align-items:center;gap:16px;background:#fff;color:#0B1E5B;
  font-weight:800;font-size:44px;padding:26px 50px;border-radius:20px;
  box-shadow:0 20px 60px rgba(0,0,0,.4);letter-spacing:-1px;}
.globe{color:#2563EB;}
</style></head><body>`;
const FOOT = `</body></html>`;
const WM   = `<div class="wm"><img src="${LOGO_LIGHT}"><span>Olympiad</span><span class="r">Ready</span></div>`;
const BLOBS = `<div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>`;

// ── New visual styles for scripts 30–49 ─────────────────────────────
// Light cream (fresh/readable contrast)
const BG_LIGHT = `background:#eef2ff;`;
const WM_LIGHT = `<div class="wm"><img src="${LOGO_LIGHT}"><span style="color:#0B1E5B;">Olympiad</span><span style="color:#d97706;">Ready</span></div>`;
const H1_LIGHT = `color:#0B1E5B;`;
const SUB_LIGHT = `color:#3a4a6b;`;

// Deep green (science/nature topics)
const BG_GREEN = `background:radial-gradient(ellipse 1400px 1000px at 50% -5%,#065f46 0%,#022c22 60%,#011a15 100%);`;
const BLOBS_G  = `<div class="blob" style="width:600px;height:600px;top:-150px;left:-150px;background:radial-gradient(circle,rgba(16,185,129,.3),transparent 65%);filter:blur(60px);position:absolute;border-radius:50%;pointer-events:none;"></div><div class="blob" style="width:640px;height:640px;bottom:-150px;right:-150px;background:radial-gradient(circle,rgba(5,150,105,.35),transparent 65%);filter:blur(60px);position:absolute;border-radius:50%;pointer-events:none;"></div>`;
const G_PILL   = `display:inline-flex;align-items:center;gap:10px;background:rgba(16,185,129,.15);border:2px solid #10b981;color:#34d399;font-weight:700;font-size:22px;letter-spacing:1.5px;padding:12px 28px;border-radius:100px;text-transform:uppercase;`;
const G_HL     = `color:#34d399;`;

// Warm amber (urgency/motivation)
const BG_AMBER = `background:radial-gradient(ellipse 1400px 1000px at 50% -5%,#92400e 0%,#451a03 60%,#1c0a00 100%);`;
const BLOBS_A  = `<div class="blob" style="width:600px;height:600px;top:-150px;left:-150px;background:radial-gradient(circle,rgba(251,176,36,.25),transparent 65%);filter:blur(60px);position:absolute;border-radius:50%;pointer-events:none;"></div><div class="blob" style="width:640px;height:640px;bottom:-150px;right:-150px;background:radial-gradient(circle,rgba(217,119,6,.30),transparent 65%);filter:blur(60px);position:absolute;border-radius:50%;pointer-events:none;"></div>`;
const A_PILL   = `display:inline-flex;align-items:center;gap:10px;background:rgba(251,176,36,.15);border:2px solid #FBB024;color:#FBB024;font-weight:700;font-size:22px;letter-spacing:2px;padding:12px 28px;border-radius:100px;text-transform:uppercase;`;
const A_HL     = `color:#FBB024;`;

// Deep purple (tips/tricks)
const BG_PURPLE = `background:radial-gradient(ellipse 1400px 1000px at 50% -5%,#4c1d95 0%,#2e1065 60%,#0f0820 100%);`;
const BLOBS_P   = `<div class="blob" style="width:600px;height:600px;top:-150px;left:-150px;background:radial-gradient(circle,rgba(167,139,250,.30),transparent 65%);filter:blur(60px);position:absolute;border-radius:50%;pointer-events:none;"></div><div class="blob" style="width:640px;height:640px;bottom:-150px;right:-150px;background:radial-gradient(circle,rgba(139,92,246,.35),transparent 65%);filter:blur(60px);position:absolute;border-radius:50%;pointer-events:none;"></div>`;
const P_PILL   = `display:inline-flex;align-items:center;gap:10px;background:rgba(167,139,250,.15);border:2px solid #a78bfa;color:#c4b5fd;font-weight:700;font-size:22px;letter-spacing:1.5px;padding:12px 28px;border-radius:100px;text-transform:uppercase;`;
const P_HL     = `color:#c4b5fd;`;

// ── Helper: browser-frame card ───────────────────────────────────────
function card(src, urlLabel, imgH = 480) {
  const img = src
    ? `<img src="${src}" style="height:${imgH}px;object-fit:cover;object-position:top center;">`
    : `<div style="height:${imgH}px;background:#eef3ff;display:flex;align-items:center;
        justify-content:center;font-size:26px;color:#aaa;">screenshot unavailable</div>`;
  return `<div class="card">
    <div class="bar"><div class="dot dr"></div><div class="dot dy"></div><div class="dot dg"></div>
    <div class="ubar">olympiadready.com/${urlLabel}</div></div>${img}</div>`;
}

// ── Helper: plain image card (no browser bar) ────────────────────────
function imgCard(src, imgH = 520) {
  if (!src) return "";
  return `<div class="card"><img src="${src}" style="height:${imgH}px;object-fit:cover;object-position:top center;"></div>`;
}

// ── 6 reel scripts ───────────────────────────────────────────────────

// Script 0 — Platform overview
function script0() { return [
  // 1 Hook
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.slideAiIntro ? `<img src="${SS.slideAiIntro}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:top center;opacity:0.85;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 100px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.97) 0%,transparent 55%);">
      ${WM}
      <h1 style="font-size:92px;margin-top:16px;">Still using<br><span class="g">old question<br>banks?</span></h1>
      <p class="sub" style="margin-top:24px;font-size:27px;">There's a smarter, AI-powered way<br>to prepare for every Olympiad.</p>
    </div>
  </div>${FOOT}`,
  // 2 AI Practice
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">♾️ Unlimited AI Practice</div>
    <h1 style="font-size:80px;margin-bottom:10px;">Never run out of<br><span class="g">questions.</span></h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Fresh AI-generated questions for<br>IMO · NSO · IEO · NCO & more.</p>
    ${card(SS.practice, "practice", 490)}
  </div>${FOOT}`,
  // 3 Mock Exams
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📝 Full Mock Exams</div>
    <h1 style="font-size:86px;margin-bottom:10px;"><span class="g">Real exam.</span><br>Real timer.</h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">50-question papers · Countdown timer<br>Exact Olympiad pattern & scoring.</p>
    ${card(SS.mock, "mock-exams", 480)}
  </div>${FOOT}`,
  // 4 AI Explanation
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🧠 Instant AI Explanations</div>
    <h1 style="font-size:82px;margin-bottom:10px;">Understand<br>every <span class="g">answer.</span></h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Not just ✓ or ✗ — step-by-step<br>AI reasoning for every question.</p>
    ${card(SS.explanation, "results", 480)}
  </div>${FOOT}`,
  // 5 Badges
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🏆 Badges & Rewards</div>
    <h1 style="font-size:88px;margin-bottom:10px;">Practice.<br><span class="g">Earn. Level up.</span></h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Certificates · Leaderboard ranks<br>Real physical medals 🥇</p>
    ${card(SS.badges, "dashboard", 480)}
  </div>${FOOT}`,
  // 6 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:44px;">🚀 Free to start</div>
    <h1 style="font-size:96px;margin-bottom:32px;">Start prepping<br><span class="g">smarter</span><br>today.</h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:26px;">No download. No payment required.</p>
  </div>${FOOT}`,
];}

// Script 1 — Free vs Pro
function script1() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:36px;">✅ Start Completely FREE</div>
    <h1 style="font-size:96px;">Everything your<br>child needs.<br><span class="gr">Free.</span></h1>
    <p class="sub" style="margin-top:36px;">No credit card. No download.<br>Start practising in 30 seconds.</p>
  </div>${FOOT}`,
  // 2 Free features
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:24px;">🆓 Free Plan</div>
    <h1 style="font-size:82px;margin-bottom:28px;">What you get<br><span class="gr">for free.</span></h1>
    <div class="feats">
      <div class="feat"><span class="ic">📝</span><span>Free practice tests — all subjects</span></div>
      <div class="feat"><span class="ic">📄</span><span>Free PDF question paper downloads</span></div>
      <div class="feat"><span class="ic">🎯</span><span>1 free full mock exam per subject</span></div>
      <div class="feat"><span class="ic">🧠</span><span>AI explanations after every test</span></div>
      <div class="feat"><span class="ic">🏆</span><span>Badges, certificates & leaderboard</span></div>
    </div>
  </div>${FOOT}`,
  // 3 PDF downloads
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📥 Free PDF Downloads</div>
    <h1 style="font-size:82px;margin-bottom:10px;">Print &<br><span class="g">practise offline.</span></h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Question papers + OMR sheets +<br>Answer key with explanations. All free.</p>
    ${card(SS.pdf, "question-papers", 490)}
  </div>${FOOT}`,
  // 4 Free mock exam
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📝 Free Mock Exams</div>
    <h1 style="font-size:82px;margin-bottom:10px;"><span class="g">Real exam</span><br>experience.<br>Zero cost.</h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Timed. Scored. Explained.<br>Just like the actual Olympiad.</p>
    ${card(SS.mock, "mock-exams", 470)}
  </div>${FOOT}`,
  // 5 Go Pro
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:16px;">👑 Go Pro — Unlock Everything</div>
    <h1 style="font-size:72px;margin-bottom:16px;">Unlimited for<br><span class="g">just ₹129/mo.</span></h1>
    ${imgCard(SS.slidePricing, 340)}
    <div class="compare" style="margin-top:16px;">
      <div class="col col-free">
        <div class="col-title">Free</div>
        <div class="col-item"><span class="ck">✓</span> Practice tests</div>
        <div class="col-item"><span class="ck">✓</span> 1 mock exam</div>
        <div class="col-item"><span class="ck">✓</span> PDF downloads</div>
        <div class="col-item" style="color:#888;">✗ Level 2 prep</div>
        <div class="col-item" style="color:#888;">✗ Unlimited mocks</div>
      </div>
      <div class="col col-pro">
        <div class="col-title" style="color:#FBB024;">Pro 👑</div>
        <div class="col-item"><span class="ck">✓</span> Everything free</div>
        <div class="col-item"><span class="ck">✓</span> Unlimited mocks</div>
        <div class="col-item"><span class="ck">✓</span> Level 1 & 2 prep</div>
        <div class="col-item"><span class="ck">✓</span> AI Tutor access</div>
        <div class="col-item"><span class="ck">✓</span> Priority support</div>
        <div class="price">₹129 <span>/ month</span></div>
      </div>
    </div>
  </div>${FOOT}`,
  // 6 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:44px;">✅ No card needed to start</div>
    <h1 style="font-size:92px;margin-bottom:32px;">Try free.<br>Upgrade<br><span class="g">when ready.</span></h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:26px;">Trusted by 1L+ students · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 2 — For parents
function script2() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">👨‍👩‍👧 For Parents</div>
    <h1 style="font-size:90px;">Is your child<br>ready for their<br><span class="g">Olympiad?</span></h1>
    <p class="sub" style="margin-top:36px;">OlympiadReady gives them the tools<br>to walk in confident — not guessing.</p>
  </div>${FOOT}`,
  // 2 Practice by Olympiad
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🎯 Every Olympiad Covered</div>
    <h1 style="font-size:80px;margin-bottom:10px;">IMO. NSO. IEO.<br><span class="g">NCO. ISSO.</span><br>All of them.</h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Subject-wise, class-wise, level-wise.<br>AI generates the right questions every time.</p>
    ${card(SS.practice, "practice", 470)}
  </div>${FOOT}`,
  // 3 Free PDFs to print
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📄 Print & Practise</div>
    <h1 style="font-size:82px;margin-bottom:10px;">Download free<br><span class="g">question papers.</span></h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Question paper · OMR sheet · Answer key<br>with explanations. All printable. All free.</p>
    ${card(SS.pdf, "question-papers", 490)}
  </div>${FOOT}`,
  // 4 Track progress
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📊 Track Every Step</div>
    <h1 style="font-size:82px;margin-bottom:10px;">Watch their<br><span class="g">confidence grow.</span></h1>
    <div class="feats" style="margin-top:20px;">
      <div class="feat"><span class="ic">📈</span><span>Score trends after every test</span></div>
      <div class="feat"><span class="ic">🔍</span><span>Weak topics spotted automatically</span></div>
      <div class="feat"><span class="ic">🎖️</span><span>Badges & certificates to share</span></div>
      <div class="feat"><span class="ic">📤</span><span>Share progress with parents</span></div>
    </div>
  </div>${FOOT}`,
  // 5 Badges
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🏅 Earn Real Rewards</div>
    <h1 style="font-size:84px;margin-bottom:10px;">Badges.<br>Certificates.<br><span class="g">Physical medals.</span></h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Earn all 18 badges → receive a real<br>Olympiad medal shipped to your door 📦</p>
    ${imgCard(SS.certRewards || SS.badges, 470)}
  </div>${FOOT}`,
  // 6 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🚀 Free to start today</div>
    <h1 style="font-size:88px;margin-bottom:32px;">Give your child<br>the <span class="g">winning edge.</span></h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:26px;">No download · No credit card · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 3 — AI Tutor
function script3() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">🤖 Meet Your AI Tutor</div>
    <h1 style="font-size:88px;">Stuck on a<br>problem at<br><span class="g">11 PM?</span></h1>
    <p class="sub" style="margin-top:36px;">Your AI Olympiad tutor is awake.<br>Ask anything. Get instant clarity.</p>
  </div>${FOOT}`,
  // 2 AI Tutor poster
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">✨ OlympiadReady AI Tutor</div>
    <h1 style="font-size:80px;margin-bottom:24px;">Your personal<br><span class="g">Olympiad coach.</span><br>24 × 7.</h1>
    ${imgCard(SS.aiTutorPoster || SS.aiTutor, 560)}
  </div>${FOOT}`,
  // 3 Chat mock
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">💬 Ask Any Doubt</div>
    <h1 style="font-size:78px;margin-bottom:24px;">Just ask.<br><span class="g">Get explained.</span></h1>
    <div class="chat">
      <div class="chat-hdr">
        <div class="av">OR</div>
        <div><div class="nm">OlympiadReady AI Tutor</div><div class="st">● Online · Instant replies</div></div>
      </div>
      <div class="chat-body">
        <div class="msg msg-u">Why is the answer 49 and not 50 for the series 9,16,25,36,?</div>
        <div class="msg msg-b">
          <span class="tag">AI Tutor</span>
          Great question! The pattern is n² — so 9=3², 16=4², 25=5², 36=6². The next is 7² = <b>49</b>, not 50. Differences go +7, +9, +11, +13 ✓
        </div>
        <div class="msg msg-u">Oh! I see it now. Thank you!</div>
      </div>
    </div>
  </div>${FOOT}`,
  // 4 AI Explanation
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🧠 Explanations After Every Test</div>
    <h1 style="font-size:80px;margin-bottom:10px;">Don't just get<br>the answer.<br><span class="g">Understand it.</span></h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Step-by-step AI reasoning for<br>every question — right or wrong.</p>
    ${card(SS.explanation, "results", 470)}
  </div>${FOOT}`,
  // 5 Features
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🎓 Everything in One Place</div>
    <h1 style="font-size:82px;margin-bottom:28px;">Practice smarter.<br><span class="g">Score higher.</span></h1>
    <div class="feats">
      <div class="feat"><span class="ic">♾️</span><span>Unlimited AI practice questions</span></div>
      <div class="feat"><span class="ic">📝</span><span>Full mock exams with real timer</span></div>
      <div class="feat"><span class="ic">📄</span><span>Free printable PDF papers</span></div>
      <div class="feat"><span class="ic">🤖</span><span>AI Tutor — doubt clearing 24/7</span></div>
      <div class="feat"><span class="ic">🏆</span><span>Badges · Certificates · Medals</span></div>
    </div>
  </div>${FOOT}`,
  // 6 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🤖 AI Tutor included</div>
    <h1 style="font-size:92px;margin-bottom:32px;">Never study<br><span class="g">alone again.</span></h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:26px;">Free to start · AI-powered · Always on</p>
  </div>${FOOT}`,
];}

// Script 4 — How it works
function script4() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">⚡ 4 Steps to Olympiad Gold</div>
    <h1 style="font-size:96px;">From practice<br>to <span class="g">podium.</span></h1>
    <p class="sub" style="margin-top:36px;">Here's exactly how OlympiadReady<br>turns effort into results.</p>
  </div>${FOOT}`,
  // 2 Step 1
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">Step 1 of 4</div>
    <h1 style="font-size:84px;margin-bottom:24px;"><span class="g">Pick your</span><br>Olympiad,<br>subject & class.</h1>
    ${card(SS.practice, "practice", 500)}
  </div>${FOOT}`,
  // 3 Step 2
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">Step 2 of 4</div>
    <h1 style="font-size:84px;margin-bottom:24px;"><span class="g">Take a timed</span><br>AI-generated<br>mock exam.</h1>
    ${card(SS.mock, "mock-exams", 500)}
  </div>${FOOT}`,
  // 4 Step 3
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">Step 3 of 4</div>
    <h1 style="font-size:84px;margin-bottom:24px;"><span class="g">Review answers</span><br>with AI<br>explanations.</h1>
    ${card(SS.explanation, "results", 500)}
  </div>${FOOT}`,
  // 5 Step 4
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">Step 4 of 4</div>
    <h1 style="font-size:84px;margin-bottom:24px;"><span class="g">Track progress.</span><br>Earn badges.<br>Repeat.</h1>
    ${card(SS.badges, "dashboard", 500)}
  </div>${FOOT}`,
  // 6 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🏅 Your Olympiad journey starts here</div>
    <h1 style="font-size:92px;margin-bottom:32px;">4 steps.<br><span class="g">Zero excuses.</span></h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:26px;">Free · AI-powered · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 5 — Problem → Solution
function script5() { return [
  // 1 Hook — website homepage fills the frame
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.websiteHome ? `<img src="${SS.websiteHome}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:top center;opacity:0.88;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 90px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.95) 0%,transparent 100%);">
      ${WM}
      <h1 style="font-size:80px;margin-top:16px;">Still using<br><span class="g">the old way?</span></h1>
    </div>
  </div>${FOOT}`,
  // 2 Solution intro
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:36px;">✅ The Smarter Way</div>
    <h1 style="font-size:86px;">AI-powered prep.<br><span class="gr">Real results.</span></h1>
    <div class="feats" style="margin-top:32px;">
      <div class="feat"><span class="ic">♾️</span><span>Infinite fresh questions — no repeats</span></div>
      <div class="feat"><span class="ic">🎯</span><span>Calibrated to your class & level</span></div>
      <div class="feat"><span class="ic">📊</span><span>Tracks weak topics automatically</span></div>
    </div>
  </div>${FOOT}`,
  // 3 Free PDFs
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📄 No More Boring PDFs</div>
    <h1 style="font-size:80px;margin-bottom:10px;"><span class="g">Download fresh</span><br>papers every<br>single time.</h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">AI generates new questions each download.<br>Never the same paper twice.</p>
    ${card(SS.pdf, "question-papers", 470)}
  </div>${FOOT}`,
  // 4 Mock Exams
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🏟️ Simulate the Real Thing</div>
    <h1 style="font-size:82px;margin-bottom:10px;"><span class="g">Real exam.</span><br>Real pressure.<br>Real practice.</h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Timed mock exams with official Olympiad<br>pattern. Score predicted after each attempt.</p>
    ${card(SS.mock, "mock-exams", 470)}
  </div>${FOOT}`,
  // 5 AI Tutor
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🤖 AI Tutor — Always Available</div>
    <h1 style="font-size:80px;margin-bottom:24px;">Doubts cleared<br><span class="g">instantly.</span><br>Any topic.</h1>
    ${imgCard(SS.aiTutor, 540)}
  </div>${FOOT}`,
  // 6 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:40px;">🚀 From boring to brilliant</div>
    <h1 style="font-size:92px;margin-bottom:32px;">Make the<br><span class="gr">switch today.</span></h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:26px;">Free · No download · Trusted by 1L+ students</p>
  </div>${FOOT}`,
];}

// Script 6 — Score story (watch your score climb)
function script6() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">📈 Real Score Improvement</div>
    <h1 style="font-size:90px;">Watch your<br>score <span class="g">climb</span><br>week on week.</h1>
    <p class="sub" style="margin-top:36px;">OlympiadReady students improve<br>an average of 23% in 4 weeks.</p>
  </div>${FOOT}`,
  // 2 Practice
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📝 Step 1 — Practice Daily</div>
    <h1 style="font-size:86px;margin-bottom:10px;"><span class="g">10 questions.</span><br>10 minutes.<br>Every day.</h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Fresh AI-generated questions at<br>exactly your level — no repeats ever.</p>
    ${card(SS.practice, "practice", 490)}
  </div>${FOOT}`,
  // 3 Mock exam + score
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📊 Step 2 — Take Mock Exams</div>
    <h1 style="font-size:84px;margin-bottom:10px;"><span class="g">See your score</span><br>on a real<br>timed paper.</h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Full 50-question papers with a countdown<br>timer — exactly like the actual Olympiad.</p>
    ${card(SS.mock, "mock-exams", 480)}
  </div>${FOOT}`,
  // 4 AI Explanation
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🧠 Step 3 — Understand Every Error</div>
    <h1 style="font-size:82px;margin-bottom:10px;">Every wrong<br>answer has<br><span class="g">a lesson.</span></h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">AI explains exactly WHY you got it wrong<br>— step by step, every time.</p>
    ${card(SS.explanation, "results", 480)}
  </div>${FOOT}`,
  // 5 Badges / Progress
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🏆 Step 4 — Track & Earn</div>
    <h1 style="font-size:84px;margin-bottom:10px;"><span class="g">Badges. Ranks.</span><br>Physical<br>medals.</h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Earn all 18 badges → get a real Olympiad<br>medal delivered to your door 📦</p>
    ${card(SS.badges, "dashboard", 480)}
  </div>${FOOT}`,
  // 6 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🚀 Start your improvement today</div>
    <h1 style="font-size:92px;margin-bottom:32px;">Higher score.<br><span class="g">Starts here.</span></h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:26px;">Free to start · AI-powered · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 7 — Every Olympiad subject in one place
function script7() { return [
  // 1 Hook
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.sofSubjects ? `<img src="${SS.sofSubjects}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0.85;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 90px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.96) 0%,transparent 60%);">
      ${WM}
      <h1 style="font-size:84px;margin-top:16px;">Every Olympiad<br>subject in<br><span class="g">one place.</span></h1>
      <p class="sub" style="margin-top:20px;font-size:26px;">IMO. NSO. IEO. NCO. ISSO.<br>All covered. All AI-powered.</p>
    </div>
  </div>${FOOT}`,
  // 2 Maths
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">➕ Mathematics</div>
    <h1 style="font-size:88px;margin-bottom:28px;">Arithmetic.<br>Algebra.<br><span class="g">Geometry.</span></h1>
    <div class="feats">
      <div class="feat"><span class="ic">♾️</span><span>Unlimited AI-generated maths questions</span></div>
      <div class="feat"><span class="ic">📝</span><span>Full IMO & SOF Maths mock papers</span></div>
      <div class="feat"><span class="ic">🧠</span><span>Step-by-step AI solutions</span></div>
    </div>
  </div>${FOOT}`,
  // 3 Science
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">🔬 Science</div>
    <h1 style="font-size:88px;margin-bottom:28px;">Physics.<br>Chemistry.<br><span class="g">Biology.</span></h1>
    <div class="feats">
      <div class="feat"><span class="ic">🧬</span><span>NSO-style Science papers for every class</span></div>
      <div class="feat"><span class="ic">🌍</span><span>Conceptual + application questions</span></div>
      <div class="feat"><span class="ic">💡</span><span>Instant AI explanations after every answer</span></div>
    </div>
  </div>${FOOT}`,
  // 4 English
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">📖 English</div>
    <h1 style="font-size:80px;margin-bottom:28px;">Grammar.<br>Vocabulary.<br><span class="g">Comprehension.</span></h1>
    <div class="feats">
      <div class="feat"><span class="ic">✍️</span><span>IEO-style English papers — Class 1 to 12</span></div>
      <div class="feat"><span class="ic">📚</span><span>Vocabulary, idioms, grammar & more</span></div>
      <div class="feat"><span class="ic">🤖</span><span>AI explains every grammar rule</span></div>
    </div>
  </div>${FOOT}`,
  // 5 GK + CS
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">🌐 GK & Computer Science</div>
    <h1 style="font-size:82px;margin-bottom:28px;"><span class="g">General</span><br>Knowledge<br>& Coding.</h1>
    <div class="feats">
      <div class="feat"><span class="ic">🌏</span><span>History, Geography, Current Affairs, GK</span></div>
      <div class="feat"><span class="ic">💻</span><span>NCO/ISSO Computer Science papers</span></div>
      <div class="feat"><span class="ic">🏆</span><span>All-in-one subscription — ₹129/month</span></div>
    </div>
  </div>${FOOT}`,
  // 6 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🎯 Every subject. Every class.</div>
    <h1 style="font-size:88px;margin-bottom:32px;">One platform<br>for <span class="g">all</span> your<br>Olympiads.</h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:26px;">Free to start · No download needed</p>
  </div>${FOOT}`,
];}

// Script 8 — Free tier hook (parent audience) "5 free papers. No card."
function script8() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🎁 100% Free to Start</div>
    <h1 style="font-size:88px;">Your child gets<br><span class="g">5 free</span><br>Olympiad papers.</h1>
    <p class="sub" style="margin-top:36px;">No credit card. No catch.<br>Just pure Olympiad practice.</p>
  </div>${FOOT}`,
  // 2 What's included
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">📚 What You Get Free</div>
    <div class="feats">
      <div class="feat"><span class="ic">📄</span><span>15 practice papers — any subject, any class</span></div>
      <div class="feat"><span class="ic">🏅</span><span>SOF-aligned: IMO · NSO · IEO · IGKO</span></div>
      <div class="feat"><span class="ic">🧠</span><span>AI explains every wrong answer</span></div>
      <div class="feat"><span class="ic">❓</span><span>50,000+ questions in the bank</span></div>
    </div>
  </div>${FOOT}`,
  // 3 Pricing reveal
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">💰 After Your Free Papers</div>
    <h1 style="font-size:80px;margin-bottom:16px;">Just <span class="g">₹129</span><br>per subject<br>per month.</h1>
    <p class="sub" style="font-size:26px;">Less than <span style="text-decoration:line-through;color:#f87171;">one tutor hour</span>.<br>Unlimited papers. 24/7 AI help.</p>
  </div>${FOOT}`,
  // 4 SOF aligned proof
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:28px;">✅ SOF Aligned Content</div>
    <h1 style="font-size:84px;margin-bottom:10px;">Prep that <span class="g">actually<br>matches</span><br>the exam.</h1>
    <p class="sub" style="font-size:25px;margin-bottom:28px;">Every question mapped to SOF syllabus.<br>Class 1 to 12. All 9 subjects.</p>
    ${card(SS.practice, "practice", 460)}
  </div>${FOOT}`,
  // 5 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🚀 Start Free Today</div>
    <h1 style="font-size:90px;margin-bottom:32px;">5 free papers.<br><span class="g">Sign up now.</span></h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.in</div>
    <p class="sub" style="font-size:24px;">No credit card · Class 1–12 · All Olympiads</p>
  </div>${FOOT}`,
];}

// Script 9 — School pilot pitch (coordinator / principal audience)
function script9() { return [
  // 1 Hook — school pilot promo full-bleed
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.schoolPilotBadge ? `<img src="${SS.schoolPilotBadge}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0.92;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 100px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.97) 0%,transparent 50%);">
      ${WM}
      <h1 style="font-size:84px;margin-top:16px;">Free school<br>pilot — <span class="g">Olympiad<br>season is here.</span></h1>
    </div>
  </div>${FOOT}`,
  // 2 Solution — invite code
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:32px;">🎓 Free School Pilot</div>
    <h1 style="font-size:82px;margin-bottom:20px;">Your school gets<br>a unique<br><span class="g">invite code.</span></h1>
    <p class="sub" style="font-size:26px;">Students sign up, enter the code —<br>and get <span style="color:#4ade80;">free access</span> during the pilot.</p>
  </div>${FOOT}`,
  // 3 What students get
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📖 9 Subjects · Class 1–12</div>
    <div class="feats">
      <div class="feat"><span class="ic">❓</span><span>50,000+ SOF-aligned questions</span></div>
      <div class="feat"><span class="ic">🤖</span><span>AI-generated practice papers</span></div>
      <div class="feat"><span class="ic">🧠</span><span>AI explanations for every error</span></div>
      <div class="feat"><span class="ic">🏆</span><span>IMO · NSO · IEO · IGKO · Spell Bee</span></div>
    </div>
  </div>${FOOT}`,
  // 4 Dashboard for coordinators
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📊 Coordinator Dashboard</div>
    <h1 style="font-size:82px;margin-bottom:16px;">See who practiced.<br>See their <span class="g">scores.</span></h1>
    <p class="sub" style="font-size:26px;margin-bottom:28px;">Your school logo appears on<br>every student's dashboard.</p>
    ${card(SS.mock, "dashboard", 440)}
  </div>${FOOT}`,
  // 5 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">📧 Partner With Us</div>
    <h1 style="font-size:80px;margin-bottom:28px;">Get your school's<br><span class="g">pilot code</span><br>before August.</h1>
    <div class="steps" style="width:88%;">
      <div class="step"><div class="step-num">1</div><div><div class="step-text">Email us for your code</div><div class="step-sub">nyxencloud@gmail.com</div></div></div>
      <div class="step"><div class="step-num">2</div><div><div class="step-text">Share with your students</div><div class="step-sub">They sign up free</div></div></div>
      <div class="step"><div class="step-num">3</div><div><div class="step-text">30-day free pilot</div><div class="step-sub">No payment needed</div></div></div>
    </div>
  </div>${FOOT}`,
];}

// Script 10 — Comparison hook "₹6,400 vs ₹129" (viral parent audience)
function script10() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">💸 The Maths Every Parent Should See</div>
    <h1 style="font-size:92px;">₹<span style="color:#f87171;text-decoration:line-through;">6,400</span><br>vs<br>₹<span class="g">129</span></h1>
    <p class="sub" style="margin-top:28px;">Same goal: Olympiad gold medal.<br>Very different price tags.</p>
  </div>${FOOT}`,
  // 2 Before — tutor math
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">❌ The Old Way</div>
    <h1 style="font-size:76px;margin-bottom:20px;">Private tutor<br>₹<span style="color:#f87171;">800/hour</span><br>× 2 sessions/week</h1>
    <div class="feats" style="width:86%;">
      <div class="feat"><span class="ic">📅</span><span>8 sessions/month = <span style="color:#f87171;font-weight:800;">₹6,400</span></span></div>
      <div class="feat"><span class="ic">😴</span><span>Fixed schedule. Miss a class, pay anyway.</span></div>
      <div class="feat"><span class="ic">📚</span><span>Limited to one subject, one tutor's style.</span></div>
    </div>
  </div>${FOOT}`,
  // 3 After — OlympiadReady
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:28px;">✅ The Smarter Way</div>
    <h1 style="font-size:76px;margin-bottom:20px;">OlympiadReady<br><span class="g">₹129</span>/subject<br>per month</h1>
    <div class="feats" style="width:86%;">
      <div class="feat"><span class="ic">⏰</span><span>Practice anytime. 24/7. No schedule.</span></div>
      <div class="feat"><span class="ic">❓</span><span>Unlimited papers from 50,000+ questions.</span></div>
      <div class="feat"><span class="ic">🧠</span><span>AI explains every wrong answer instantly.</span></div>
    </div>
  </div>${FOOT}`,
  // 4 Split reveal
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="compare">
      <div class="col col-free">
        <div class="col-title" style="color:#f87171;">Tutor</div>
        <div class="col-item">₹6,400/month</div>
        <div class="col-item">Fixed schedule</div>
        <div class="col-item">1 subject</div>
        <div class="col-item">No AI help</div>
      </div>
      <div class="col col-pro">
        <div class="col-title" style="color:#FBB024;">OlympiadReady</div>
        <div class="col-item"><span class="ck">✓</span>₹129/month</div>
        <div class="col-item"><span class="ck">✓</span>Study anytime</div>
        <div class="col-item"><span class="ck">✓</span>9 subjects</div>
        <div class="col-item"><span class="ck">✓</span>24/7 AI tutor</div>
        <div class="price">₹129 <span>/month</span></div>
      </div>
    </div>
  </div>${FOOT}`,
  // 5 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🎁 First 15 Papers Free</div>
    <h1 style="font-size:86px;margin-bottom:32px;">Try it free.<br><span class="g">No card needed.</span></h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.in</div>
    <p class="sub" style="font-size:24px;">Class 1–12 · All SOF Olympiads · AI-powered</p>
  </div>${FOOT}`,
];}

// Script 11 — Child's POV social proof "My friend got gold. I asked how."
function script11() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">🥇 True Story</div>
    <h1 style="font-size:86px;">My friend got<br><span class="g">Olympiad gold.</span><br>I asked how.</h1>
    <p class="sub" style="margin-top:36px;">She wasn't smarter. She just practised<br>the right way — here's what she used.</p>
  </div>${FOOT}`,
  // 2 The secret
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:32px;">✅ The Answer: OlympiadReady</div>
    <h1 style="font-size:82px;margin-bottom:24px;">AI-generated<br>papers. Every<br><span class="g">single day.</span></h1>
    <div class="feats">
      <div class="feat"><span class="ic">♾️</span><span>Unlimited practice — never repeats</span></div>
      <div class="feat"><span class="ic">📝</span><span>Full timed mock exams</span></div>
      <div class="feat"><span class="ic">🧠</span><span>AI explains every wrong answer</span></div>
    </div>
  </div>${FOOT}`,
  // 3 Free to start
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:32px;">🎁 And It's Free to Start</div>
    <h1 style="font-size:88px;margin-bottom:20px;">5 free papers.<br><span class="gr">No card.</span><br>No catch.</h1>
    <p class="sub" style="font-size:26px;">Class 1–12 · IMO · NSO · IEO · IGKO<br>SOF-aligned content. AI-powered.</p>
  </div>${FOOT}`,
  // 4 Progress = results
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📈 Practice = Progress</div>
    <h1 style="font-size:82px;margin-bottom:24px;"><span class="g">10 questions</span><br>a day changes<br>everything.</h1>
    ${imgCard(SS.mascotTrophy || SS.badges, 520)}
  </div>${FOOT}`,
  // 5 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🚀 Start like she did</div>
    <h1 style="font-size:90px;margin-bottom:32px;">Your turn<br>to earn the<br><span class="g">gold medal.</span></h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:24px;">Free to start · No download · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 12 — Parent WhatsApp share bait "Every parent group needs this"
function script12() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">📲 Share With Every Parent</div>
    <h1 style="font-size:82px;">Every parent<br>in your<br><span class="g">school group</span><br>needs to see this.</h1>
  </div>${FOOT}`,
  // 2 The offer
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:28px;">🎁 5 Free Olympiad Papers</div>
    <h1 style="font-size:84px;margin-bottom:20px;">Your child gets<br><span class="gr">5 free</span><br>practice papers.</h1>
    <p class="sub" style="font-size:26px;">No registration fee. No credit card.<br>No catch whatsoever.</p>
  </div>${FOOT}`,
  // 3 What's covered
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📚 All SOF Olympiads Covered</div>
    <div class="feats">
      <div class="feat"><span class="ic">➕</span><span>IMO — Maths Olympiad</span></div>
      <div class="feat"><span class="ic">🔬</span><span>NSO — Science Olympiad</span></div>
      <div class="feat"><span class="ic">📖</span><span>IEO — English Olympiad</span></div>
      <div class="feat"><span class="ic">🌍</span><span>IGKO — General Knowledge</span></div>
      <div class="feat"><span class="ic">💻</span><span>NCO, ISSO & more — Class 1–12</span></div>
    </div>
  </div>${FOOT}`,
  // 4 Price comparison
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="compare" style="margin-top:0;">
      <div class="col col-free">
        <div class="col-title" style="color:#f87171;">Private Tutor</div>
        <div class="col-item">₹800/hour</div>
        <div class="col-item">Fixed timings</div>
        <div class="col-item">1 subject</div>
        <div class="col-item">No AI help</div>
        <div class="price" style="color:#f87171;">₹6,400 <span>/mo</span></div>
      </div>
      <div class="col col-pro">
        <div class="col-title" style="color:#FBB024;">OlympiadReady</div>
        <div class="col-item"><span class="ck">✓</span>Any time</div>
        <div class="col-item"><span class="ck">✓</span>9 subjects</div>
        <div class="col-item"><span class="ck">✓</span>24/7 AI tutor</div>
        <div class="col-item"><span class="ck">✓</span>Unlimited papers</div>
        <div class="price">₹129 <span>/mo</span></div>
      </div>
    </div>
    <p class="sub" style="margin-top:28px;font-size:24px;">5 papers free first. No card needed.</p>
  </div>${FOOT}`,
  // 5 CTA — share prompt
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">📤 Forward to Your Parent Group</div>
    <h1 style="font-size:86px;margin-bottom:28px;">Help another<br>parent's child<br><span class="g">prepare better.</span></h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:24px;">Free to start · SOF-aligned · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 13 — School urgency "August is weeks away. Is your school ready?"
function script13() { return [
  // 1 Hook
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.schoolPilot ? `<img src="${SS.schoolPilot}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0.90;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 100px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.97) 0%,transparent 50%);">
      ${WM}
      <h1 style="font-size:82px;margin-top:16px;">August<br>registrations<br>open <span class="g">in weeks.</span></h1>
      <p class="sub" style="margin-top:20px;font-size:26px;">Is your school's Olympiad preparation<br>already in place?</p>
    </div>
  </div>${FOOT}`,
  // 2 The gap
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">❌ The Usual Problem</div>
    <h1 style="font-size:82px;margin-bottom:24px;">Students register.<br>Then <span style="color:#f87171;">wonder</span><br>how to prepare.</h1>
    <div class="feats" style="width:86%;">
      <div class="feat"><span class="ic">🤔</span><span>No structured practice plan</span></div>
      <div class="feat"><span class="ic">📚</span><span>Relying on last year's books</span></div>
      <div class="feat"><span class="ic">😤</span><span>Teachers handling prep alone</span></div>
    </div>
  </div>${FOOT}`,
  // 3 Solution
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:28px;">✅ OlympiadReady School Pilot</div>
    <h1 style="font-size:80px;margin-bottom:20px;">One invite code.<br>Your entire<br><span class="g">school prepared.</span></h1>
    <p class="sub" style="font-size:26px;">Students sign up free · Coordinator tracks<br>scores · School branding on dashboard.</p>
  </div>${FOOT}`,
  // 4 What students get
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📖 50,000+ Questions · 9 Subjects</div>
    <div class="feats">
      <div class="feat"><span class="ic">🤖</span><span>AI-generated SOF-aligned practice</span></div>
      <div class="feat"><span class="ic">📝</span><span>Timed mock exams with scoring</span></div>
      <div class="feat"><span class="ic">🧠</span><span>Step-by-step AI explanations</span></div>
      <div class="feat"><span class="ic">🏆</span><span>Badges + certificates per student</span></div>
    </div>
  </div>${FOOT}`,
  // 5 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:32px;">📧 Claim Your School's Code Now</div>
    <h1 style="font-size:78px;margin-bottom:24px;">Don't let<br>August catch<br><span class="g">your school<br>unprepared.</span></h1>
    <div class="steps" style="width:88%;">
      <div class="step"><div class="step-num">1</div><div><div class="step-text">Email us today</div><div class="step-sub">nyxencloud@gmail.com</div></div></div>
      <div class="step"><div class="step-num">2</div><div><div class="step-text">Get your school code</div><div class="step-sub">Within 24 hours</div></div></div>
      <div class="step"><div class="step-num">3</div><div><div class="step-text">30-day free pilot starts</div><div class="step-sub">Zero payment needed</div></div></div>
    </div>
  </div>${FOOT}`,
];}

// Script 14 — Zero cost school "Your school pays ₹0"
function script14() { return [
  // 1 Hook
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.schoolPilotBadge ? `<img src="${SS.schoolPilotBadge}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0.90;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 100px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.97) 0%,transparent 50%);">
      ${WM}
      <h1 style="font-size:84px;margin-top:16px;">Your school<br>pays <span class="gr">₹0</span> to<br>get started.</h1>
      <p class="sub" style="margin-top:20px;font-size:26px;">30-day free pilot. No strings attached.</p>
    </div>
  </div>${FOOT}`,
  // 2 What the school gets
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🎓 Your School Gets</div>
    <div class="feats">
      <div class="feat"><span class="ic">🔑</span><span>Unique school invite code</span></div>
      <div class="feat"><span class="ic">🏫</span><span>School logo on every student's dashboard</span></div>
      <div class="feat"><span class="ic">📊</span><span>Coordinator view — who practiced, their scores</span></div>
      <div class="feat"><span class="ic">📣</span><span>OlympiadReady mention in school communications</span></div>
    </div>
  </div>${FOOT}`,
  // 3 What students get
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">👧 Every Student Gets</div>
    <div class="feats">
      <div class="feat"><span class="ic">❓</span><span>50,000+ SOF-aligned questions</span></div>
      <div class="feat"><span class="ic">🤖</span><span>AI-generated papers — unlimited</span></div>
      <div class="feat"><span class="ic">🧠</span><span>AI explanations after every test</span></div>
      <div class="feat"><span class="ic">🏅</span><span>Badges, certificates & leaderboard</span></div>
    </div>
  </div>${FOOT}`,
  // 4 Coordinator dashboard preview
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📊 See Every Student's Progress</div>
    <h1 style="font-size:80px;margin-bottom:16px;">Know who's<br><span class="g">practising.</span><br>Know who's not.</h1>
    <p class="sub" style="font-size:25px;margin-bottom:24px;">Real-time coordinator dashboard.<br>Share performance reports with parents.</p>
    ${card(SS.mock, "dashboard", 420)}
  </div>${FOOT}`,
  // 5 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">📧 One Email. That's All It Takes.</div>
    <h1 style="font-size:84px;margin-bottom:24px;">Be the school<br>that prepares<br><span class="g">students right.</span></h1>
    <div class="steps" style="width:88%;">
      <div class="step"><div class="step-num">✉</div><div><div class="step-text">nyxencloud@gmail.com</div><div class="step-sub">Subject: School Pilot — [Your School Name]</div></div></div>
    </div>
    <p class="sub" style="margin-top:28px;font-size:24px;">30-day free pilot · Class 1–12 · 9 subjects · ₹0 to start</p>
  </div>${FOOT}`,
];}

// ── Scripts 15–19: Platform positioning ────────────────────────────
function script15() { return [
  // 1 Hook — #1 positioning
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.mascotTrophy ? `<img src="${SS.mascotTrophy}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0.25;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 110px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.97) 0%,transparent 55%);">
      ${WM}
      <div class="pill" style="margin-bottom:28px;">🏆 India's Best Olympiad Prep</div>
      <h1 style="font-size:80px;margin-top:0;">The #1 platform<br>serious Olympiad<br>students <span class="g">use.</span></h1>
      <p class="sub" style="margin-top:20px;font-size:26px;">Here's exactly why. Swipe →</p>
    </div>
  </div>${FOOT}`,
  // 2 Why #1 — questions
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📚 Questions That Win Medals</div>
    <div class="feats">
      <div class="feat"><span class="ic">✅</span><span>50,000+ SOF-aligned questions</span></div>
      <div class="feat"><span class="ic">🤖</span><span>AI generates fresh papers — never repeats</span></div>
      <div class="feat"><span class="ic">🎯</span><span>Mapped to IMO, NSO, IEO, IGKO, NCO patterns</span></div>
      <div class="feat"><span class="ic">📈</span><span>Harder questions as your score improves</span></div>
    </div>
  </div>${FOOT}`,
  // 3 Why #1 — results
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:24px;">🥇 Built for Toppers</div>
    <h1 style="font-size:84px;margin-bottom:28px;">Other apps give<br>you content.<br>We give you <span class="g">results.</span></h1>
    <div class="feats" style="margin-top:0;">
      <div class="feat"><span class="ic">🧠</span><span>AI explanations after every answer</span></div>
      <div class="feat"><span class="ic">⏱</span><span>Real timed conditions — just like exam day</span></div>
      <div class="feat"><span class="ic">🏅</span><span>Track rank, badges & weak topics</span></div>
    </div>
  </div>${FOOT}`,
  // 4 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🚀 Start Free Today</div>
    <h1 style="font-size:88px;margin-bottom:28px;">Join the #1<br><span class="g">Olympiad prep</span><br>platform.</h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">5 free papers · No credit card · Class 1–12</p>
  </div>${FOOT}`,
];}

function script16() { return [
  // 1 Hook — unlimited practice
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.practice ? `<img src="${SS.practice}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0.20;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 110px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.97) 0%,transparent 55%);">
      ${WM}
      <div class="pill" style="margin-bottom:28px;">♾️ Unlimited Practice</div>
      <h1 style="font-size:78px;margin-top:0;">Your child will<br>never run out of<br>questions. <span class="g">Ever.</span></h1>
      <p class="sub" style="margin-top:20px;font-size:26px;">Here's how it works →</p>
    </div>
  </div>${FOOT}`,
  // 2 How AI generates
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🤖 Powered by AI</div>
    <h1 style="font-size:80px;margin-bottom:28px;">Every paper is<br><span class="g">freshly generated.</span><br>No repeats.</h1>
    <div class="feats" style="margin-top:0;">
      <div class="feat"><span class="ic">🎲</span><span>New questions every single session</span></div>
      <div class="feat"><span class="ic">📐</span><span>Difficulty adapts to your level</span></div>
      <div class="feat"><span class="ic">⏱</span><span>Timed exactly like the real exam</span></div>
    </div>
  </div>${FOOT}`,
  // 3 Volume stat
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:32px;">📊 The Numbers</div>
    <h1 style="font-size:72px;line-height:1.1;margin-bottom:28px;"><span class="g">50,000+</span><br>curated questions<br>+ AI-generated<br>unlimited papers</h1>
    <p class="sub" style="font-size:26px;">Most platforms give you 200. We give you infinite.</p>
  </div>${FOOT}`,
  // 4 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">♾️ Practice Without Limits</div>
    <h1 style="font-size:88px;margin-bottom:28px;">Start free.<br>Practice <span class="g">forever.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">AI-powered · SOF-aligned · Class 1–12</p>
  </div>${FOOT}`,
];}

function script17() { return [
  // 1 Hook — free PDFs
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.pdf ? `<img src="${SS.pdf}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0.22;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 110px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.97) 0%,transparent 55%);">
      ${WM}
      <div class="pill" style="margin-bottom:28px;">📄 Free PDF Downloads</div>
      <h1 style="font-size:78px;margin-top:0;">Download Olympiad<br>papers as PDFs.<br><span class="g">Always free.</span></h1>
      <p class="sub" style="margin-top:20px;font-size:26px;">Print. Practise offline. No paywall. →</p>
    </div>
  </div>${FOOT}`,
  // 2 What's inside the PDFs
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📄 What You Get in Every PDF</div>
    <div class="feats">
      <div class="feat"><span class="ic">❓</span><span>Full SOF-aligned question paper</span></div>
      <div class="feat"><span class="ic">✅</span><span>Answer key included</span></div>
      <div class="feat"><span class="ic">💡</span><span>AI explanations for every question</span></div>
      <div class="feat"><span class="ic">🖨️</span><span>Print-ready A4 format</span></div>
    </div>
  </div>${FOOT}`,
  // 3 Subjects
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:28px;">📚 All 9 Subjects</div>
    <h1 style="font-size:80px;margin-bottom:28px;">PDF papers for<br>every <span class="g">Olympiad</span><br>your child takes.</h1>
    <div class="feats" style="margin-top:0;">
      <div class="feat"><span class="ic">🔢</span><span>IMO · NSO · IEO · NCO · IGKO</span></div>
      <div class="feat"><span class="ic">🔤</span><span>Spell Bee · ISSO · Class 1–12</span></div>
    </div>
  </div>${FOOT}`,
  // 4 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">📥 Download Your Free PDFs</div>
    <h1 style="font-size:84px;margin-bottom:28px;">Print. Practise.<br><span class="g">Win.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">Free forever · No account needed to browse</p>
  </div>${FOOT}`,
];}

function script18() { return [
  // 1 Hook — best questions
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.sofSubjects ? `<img src="${SS.sofSubjects}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0.20;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 110px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.97) 0%,transparent 55%);">
      ${WM}
      <div class="pill" style="margin-bottom:28px;">🎯 Highest-Quality Questions</div>
      <h1 style="font-size:78px;margin-top:0;">Not all Olympiad<br>questions are<br><span class="g">equal.</span></h1>
      <p class="sub" style="margin-top:20px;font-size:26px;">Ours are the best. Here's why →</p>
    </div>
  </div>${FOOT}`,
  // 2 Quality proof
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🔬 How We Build Questions</div>
    <div class="feats">
      <div class="feat"><span class="ic">📋</span><span>Mapped to official SOF syllabus — not guesses</span></div>
      <div class="feat"><span class="ic">🧪</span><span>Each question tested for accuracy & clarity</span></div>
      <div class="feat"><span class="ic">🏆</span><span>Based on real past paper patterns</span></div>
      <div class="feat"><span class="ic">🤖</span><span>AI explanations reviewed for correctness</span></div>
    </div>
  </div>${FOOT}`,
  // 3 Differentiation
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:28px;">✅ OlympiadReady vs the Rest</div>
    <h1 style="font-size:76px;margin-bottom:28px;">Other platforms<br>copy & paste.<br>We <span class="g">craft questions</span><br>that win medals.</h1>
  </div>${FOOT}`,
  // 4 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🎯 Practice with the Best</div>
    <h1 style="font-size:84px;margin-bottom:28px;">50,000+ questions.<br><span class="g">Zero filler.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">SOF-aligned · Class 1–12 · Free to start</p>
  </div>${FOOT}`,
];}

function script19() { return [
  // 1 Hook — everything free to start
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.pricing ? `<img src="${SS.pricing}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0.18;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 110px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.97) 0%,transparent 55%);">
      ${WM}
      <div class="pill-g" style="margin-bottom:28px;">🆓 Free Practice Papers</div>
      <h1 style="font-size:78px;margin-top:0;">Start practising<br>for your Olympiad<br><span class="g">right now. Free.</span></h1>
      <p class="sub" style="margin-top:20px;font-size:26px;">No card. No catch. Here's everything you get →</p>
    </div>
  </div>${FOOT}`,
  // 2 Free value stack
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:24px;">🆓 What's Free — Forever</div>
    <div class="feats">
      <div class="feat"><span class="ic">📄</span><span>5 full practice papers — no card</span></div>
      <div class="feat"><span class="ic">📥</span><span>PDF downloads of every paper</span></div>
      <div class="feat"><span class="ic">🤖</span><span>AI explanations on all free papers</span></div>
      <div class="feat"><span class="ic">🧠</span><span>AI Tutor — ask anything, anytime</span></div>
    </div>
  </div>${FOOT}`,
  // 3 After free
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">💛 After Your Free Papers</div>
    <h1 style="font-size:80px;margin-bottom:28px;">Unlock <span class="g">unlimited</span><br>practice for less<br>than a snack.</h1>
    <div class="steps" style="width:88%;">
      <div class="step"><div class="step-num">₹</div><div><div class="step-text">₹129 / subject / month</div><div class="step-sub">Less than ₹5 per day · cancel any time</div></div></div>
      <div class="step"><div class="step-num">♾</div><div><div class="step-text">Unlimited AI-generated papers</div><div class="step-sub">Fresh questions every session · never repeats</div></div></div>
    </div>
  </div>${FOOT}`,
  // 4 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🆓 Claim Your Free Papers</div>
    <h1 style="font-size:84px;margin-bottom:28px;">5 free papers.<br><span class="g">Start today.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">No credit card · No download · Class 1–12</p>
  </div>${FOOT}`,
];}

// ── Scripts 20–29: Product deep-dives & Olympiad tips ───────────────

// Script 20 — Mock Exam Simulator "Real Exam. Real Pressure."
function script20() { return [
  // 1 Hook
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.mockSimulator ? `<img src="${SS.mockSimulator}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:top center;opacity:0.22;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 110px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.97) 0%,transparent 55%);">
      ${WM}
      <div class="pill" style="margin-bottom:28px;">📝 Mock Exam Mode</div>
      <h1 style="font-size:82px;margin-top:0;">Real Exam.<br>Real Pressure.<br><span class="g">Real Results.</span></h1>
      <p class="sub" style="margin-top:20px;font-size:26px;">Practice in exam conditions — before it counts →</p>
    </div>
  </div>${FOOT}`,
  // 2 What mock exams do
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🎯 Why Mock Exams Matter</div>
    <h1 style="font-size:80px;margin-bottom:24px;">Pressure is a<br>skill. <span class="g">Train it.</span></h1>
    <div class="feats" style="margin-top:0;">
      <div class="feat"><span class="ic">⏱</span><span>Full countdown timer — exactly like the real exam</span></div>
      <div class="feat"><span class="ic">📊</span><span>50-question papers matching Olympiad pattern</span></div>
      <div class="feat"><span class="ic">🧠</span><span>Instant AI explanations after every attempt</span></div>
      <div class="feat"><span class="ic">📈</span><span>Track score improvements over time</span></div>
    </div>
  </div>${FOOT}`,
  // 3 Screenshot card
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:20px;">📱 The OlympiadReady Experience</div>
    <h1 style="font-size:72px;margin-bottom:20px;">AI-Powered<br><span class="g">Adaptive Mock</span><br>Exams</h1>
    ${card(SS.mockSimulator, "mock-exams", 540)}
  </div>${FOOT}`,
  // 4 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">📝 Try a Mock Exam Free</div>
    <h1 style="font-size:88px;margin-bottom:28px;">Simulate your<br>Olympiad <span class="g">today.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">No card · Class 1–12 · All Olympiad subjects</p>
  </div>${FOOT}`,
];}

// Script 21 — OMR Practice Workflow "Practice exactly like exam day"
function script21() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">📋 The Complete Practice System</div>
    <h1 style="font-size:86px;">Practice exactly<br>like <span class="g">exam day.</span></h1>
    <p class="sub" style="margin-top:28px;font-size:26px;">Download. Print. Fill OMR. Check answers. Repeat.</p>
  </div>${FOOT}`,
  // 2 Step 1: Download PDF paper
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:20px;">Step 1 — Download the Paper</div>
    <h1 style="font-size:78px;margin-bottom:20px;"><span class="g">Full question</span><br>paper PDF.<br>Free to download.</h1>
    ${card(SS.practicePaper, "downloads", 560)}
  </div>${FOOT}`,
  // 3 Step 2: OMR sheet
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:20px;">Step 2 — Print & Fill the OMR Sheet</div>
    <h1 style="font-size:78px;margin-bottom:20px;">Practice on<br>a real <span class="g">OMR sheet.</span><br>Just like your exam.</h1>
    ${card(SS.omrSheet, "downloads", 560)}
  </div>${FOOT}`,
  // 4 Step 3: Answer key
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:20px;">Step 3 — Check with Answer Key</div>
    <h1 style="font-size:78px;margin-bottom:20px;">Detailed answers<br>+ <span class="g">step-by-step</span><br>AI explanations.</h1>
    ${card(SS.answerKey, "results", 560)}
  </div>${FOOT}`,
  // 5 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">📥 Download Free Papers</div>
    <h1 style="font-size:88px;margin-bottom:28px;">The full Olympiad<br>experience.<br><span class="g">At home.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:24px;">Paper + OMR + Answer Key · All subjects · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 22 — Answer Key & Explanations "Know WHY you got it wrong"
function script22() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">💡 The Secret to Improving Fast</div>
    <h1 style="font-size:88px;">Getting it wrong<br>is fine.<br><span class="g">Not knowing why</span><br>is the problem.</h1>
  </div>${FOOT}`,
  // 2 What explanations look like
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:20px;">🧠 Step-by-Step AI Explanations</div>
    <h1 style="font-size:80px;margin-bottom:20px;">Every answer<br>has a <span class="g">full<br>explanation.</span></h1>
    ${card(SS.answerKey, "results", 560)}
  </div>${FOOT}`,
  // 3 What you get
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📖 After Every Paper You Get:</div>
    <div class="feats">
      <div class="feat"><span class="ic">✅</span><span>Full answer key with correct options</span></div>
      <div class="feat"><span class="ic">🔍</span><span>Detailed explanation for every question</span></div>
      <div class="feat"><span class="ic">🧮</span><span>Step-by-step working for Math problems</span></div>
      <div class="feat"><span class="ic">📌</span><span>Topic tags — spot your weak areas fast</span></div>
    </div>
  </div>${FOOT}`,
  // 4 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">💡 Learn from Every Mistake</div>
    <h1 style="font-size:88px;margin-bottom:28px;">Practice smarter.<br><span class="g">Improve faster.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">AI explanations included · Free to start</p>
  </div>${FOOT}`,
];}

// Script 23 — Badges & Rewards "Every paper earns you something"
function script23() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">🏅 Earn While You Learn</div>
    <h1 style="font-size:92px;">Every paper<br>you complete<br>earns you <span class="g">something.</span></h1>
  </div>${FOOT}`,
  // 2 Badges showcase
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:20px;">🏆 18+ Badges to Earn</div>
    <h1 style="font-size:76px;margin-bottom:20px;">Sharpshooter.<br>Speed Demon.<br><span class="g">Mock Master.</span><br>Which one's next?</h1>
    ${card(SS.badgesRewards, "dashboard", 560)}
  </div>${FOOT}`,
  // 3 What you can earn
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🎯 Badges Worth Chasing</div>
    <div class="feats">
      <div class="feat"><span class="ic">🥇</span><span>First Step — complete your first paper</span></div>
      <div class="feat"><span class="ic">🎯</span><span>Perfect Score — 100% on any paper</span></div>
      <div class="feat"><span class="ic">🔥</span><span>3-Day Streak — practice 3 days in a row</span></div>
      <div class="feat"><span class="ic">📜</span><span>Digital Certificate — share on social media</span></div>
    </div>
  </div>${FOOT}`,
  // 4 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🏅 Start Earning Badges</div>
    <h1 style="font-size:84px;margin-bottom:28px;">Practice. Earn.<br><span class="g">Celebrate.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">18+ badges · Digital certificate · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 24 — Leaderboard "See your rank. Climb it."
function script24() { return [
  // 1 Hook
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.leaderboard ? `<img src="${SS.leaderboard}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:top center;opacity:0.20;">` : ""}
    <div style="position:relative;z-index:2;width:100%;padding:0 60px 110px;text-align:center;background:linear-gradient(to top,rgba(5,15,51,0.97) 0%,transparent 55%);">
      ${WM}
      <div class="pill" style="margin-bottom:28px;">🏆 Monthly Leaderboard</div>
      <h1 style="font-size:84px;margin-top:0;">Who's leading<br>this month?<br><span class="g">Could be you.</span></h1>
      <p class="sub" style="margin-top:20px;font-size:26px;">See your rank. Climb it. →</p>
    </div>
  </div>${FOOT}`,
  // 2 Leaderboard visual
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:20px;">📊 Monthly Top Scorers</div>
    <h1 style="font-size:78px;margin-bottom:20px;">Real students.<br>Real ranks.<br><span class="g">Real competition.</span></h1>
    ${card(SS.leaderboard, "leaderboard", 560)}
  </div>${FOOT}`,
  // 3 How to climb
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📈 How to Climb the Board</div>
    <div class="feats">
      <div class="feat"><span class="ic">📝</span><span>Complete more papers — every score counts</span></div>
      <div class="feat"><span class="ic">🎯</span><span>Accuracy matters — aim for 90%+</span></div>
      <div class="feat"><span class="ic">🔥</span><span>Daily streaks boost your rank faster</span></div>
      <div class="feat"><span class="ic">🥇</span><span>Top 3 get featured every month</span></div>
    </div>
  </div>${FOOT}`,
  // 4 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🏆 Claim Your Spot</div>
    <h1 style="font-size:84px;margin-bottom:28px;">The leaderboard<br>is live.<br><span class="g">Are you on it?</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">Monthly rankings · All subjects · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 25 — Spell Bee Prep "Spell Bee made easy — Class 1–12"
function script25() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">🔤 Spell Bee Prep</div>
    <h1 style="font-size:92px;">Spell Bee<br>is serious.<br>We make <span class="g">prep easy.</span></h1>
    <p class="sub" style="margin-top:28px;font-size:26px;">Topic-wise prep · Class 1–12 · Download & practise →</p>
  </div>${FOOT}`,
  // 2 Spell Bee page screenshot
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:20px;">📚 Complete Spell Bee Syllabus</div>
    <h1 style="font-size:78px;margin-bottom:20px;">Topic-wise<br>Spell Bee prep<br>for <span class="g">every class.</span></h1>
    ${card(SS.spellBee, "spell-bee", 560)}
  </div>${FOOT}`,
  // 3 What's inside
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🏆 Your Spell Bee Toolkit</div>
    <div class="feats">
      <div class="feat"><span class="ic">📖</span><span>Word lists topic-wise — Animals, Food, Space & more</span></div>
      <div class="feat"><span class="ic">📄</span><span>Downloadable practice sheets with answers</span></div>
      <div class="feat"><span class="ic">🎯</span><span>Difficulty levels — Foundation, Advanced, Champion</span></div>
      <div class="feat"><span class="ic">🔢</span><span>Class 1 to Class 12 covered</span></div>
    </div>
  </div>${FOOT}`,
  // 4 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🔤 Start Spell Bee Prep</div>
    <h1 style="font-size:84px;margin-bottom:28px;">Spell every word<br><span class="g">correctly.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">Free downloads · Class 1–12 · SOF Spell Bee aligned</p>
  </div>${FOOT}`,
];}

// Script 26 — Try Without Signup "No login. Just practice."
function script26() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:36px;">✅ Zero Friction</div>
    <h1 style="font-size:96px;">No login.<br>No download.<br><span class="g">Just practice.</span></h1>
    <p class="sub" style="margin-top:28px;font-size:26px;">Get a feel for OlympiadReady in 30 seconds →</p>
  </div>${FOOT}`,
  // 2 Try-now screenshot
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:20px;">👆 Try Before You Sign Up</div>
    <h1 style="font-size:80px;margin-bottom:20px;">Pick a subject.<br>Pick a class.<br><span class="g">Start practising.</span></h1>
    ${card(SS.tryNow, "try", 560)}
  </div>${FOOT}`,
  // 3 No barriers
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🚪 No Barriers to Entry</div>
    <div class="feats">
      <div class="feat"><span class="ic">🆓</span><span>Try instantly — no account required</span></div>
      <div class="feat"><span class="ic">📱</span><span>Works on phone, tablet, or laptop</span></div>
      <div class="feat"><span class="ic">📚</span><span>All 9 Olympiad subjects available to explore</span></div>
      <div class="feat"><span class="ic">🤖</span><span>Full AI explanations even on the free try</span></div>
    </div>
  </div>${FOOT}`,
  // 4 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🚀 Try It Right Now</div>
    <h1 style="font-size:88px;margin-bottom:28px;">30 seconds to<br>your first <span class="g">question.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">No account needed · No card · Instant access</p>
  </div>${FOOT}`,
];}

// Script 27 — Olympiad Tip: Time Management
function script27() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">⏱ Olympiad Tip #1</div>
    <h1 style="font-size:88px;">Students fail not<br>because they<br>don't know.<br>They <span class="g">run out of time.</span></h1>
  </div>${FOOT}`,
  // 2 The problem
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">📊 The Time Trap</div>
    <h1 style="font-size:84px;margin-bottom:28px;">IMO gives you<br><span class="g">60 minutes</span><br>for 50 questions.</h1>
    <p class="sub" style="font-size:28px;">That's <strong style="color:#FBB024;">72 seconds</strong> per question.<br>Can your child do it?</p>
  </div>${FOOT}`,
  // 3 The strategy
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:24px;">✅ The 3-Pass Strategy</div>
    <div class="steps" style="width:88%;">
      <div class="step"><div class="step-num">1</div><div><div class="step-text">First pass: answer what you know fast</div><div class="step-sub">Don't spend more than 60 seconds on any question</div></div></div>
      <div class="step"><div class="step-num">2</div><div><div class="step-text">Second pass: tackle the tricky ones</div><div class="step-sub">You now have more time per question</div></div></div>
      <div class="step"><div class="step-num">3</div><div><div class="step-text">Third pass: guess the remaining</div><div class="step-sub">No negative marking in most Olympiads</div></div></div>
    </div>
  </div>${FOOT}`,
  // 4 Practice tip
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">🏋️ Train It Daily</div>
    <h1 style="font-size:84px;margin-bottom:24px;">Time management<br>is a <span class="g">muscle.</span><br>Train it.</h1>
    <p class="sub" style="font-size:26px;">Use timed mock exams on OlympiadReady<br>to build speed under pressure.</p>
    <div class="url-box" style="margin-top:40px;"><span class="globe">🌐</span> olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 28 — Olympiad Tip: Smart Approach to MCQs
function script28() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">🎯 Olympiad Tip #2</div>
    <h1 style="font-size:84px;">The smartest<br>students don't<br>just guess.<br>They <span class="g">eliminate.</span></h1>
  </div>${FOOT}`,
  // 2 The MCQ trick
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">🔍 The Elimination Method</div>
    <h1 style="font-size:80px;margin-bottom:28px;">In a 4-option MCQ,<br>removing <span class="g">2 wrong</span><br>gives you 50-50.</h1>
    <p class="sub" style="font-size:26px;">Even if you're unsure, smart elimination<br>doubles your chance of getting it right.</p>
  </div>${FOOT}`,
  // 3 Steps
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:24px;">✅ Eliminate Like a Topper</div>
    <div class="feats">
      <div class="feat"><span class="ic">❌</span><span>Cross out options with obvious errors first</span></div>
      <div class="feat"><span class="ic">🔢</span><span>For Math: check if numbers are in the right range</span></div>
      <div class="feat"><span class="ic">🔬</span><span>For Science: units and logic often rule out 2 options</span></div>
      <div class="feat"><span class="ic">🎯</span><span>Never leave an answer blank — no negative marking!</span></div>
    </div>
  </div>${FOOT}`,
  // 4 Practice CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">💪 Sharpen This Skill Daily</div>
    <h1 style="font-size:84px;margin-bottom:24px;">Practice 1 paper<br>a day and this<br>becomes <span class="g">instinct.</span></h1>
    <div class="url-box" style="margin-top:36px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="margin-top:24px;font-size:24px;">Daily practice papers · AI explanations · Free to start</p>
  </div>${FOOT}`,
];}

// Script 29 — Mistake Review "Your wrong answers are your secret weapon"
function script29() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">🔍 The Improvement Secret</div>
    <h1 style="font-size:86px;">Your wrong<br>answers are<br>your <span class="g">secret<br>weapon.</span></h1>
  </div>${FOOT}`,
  // 2 Why mistakes matter
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">💡 Most students ignore mistakes.</div>
    <h1 style="font-size:84px;margin-bottom:24px;">Toppers<br><span class="g">study them.</span></h1>
    <p class="sub" style="font-size:26px;">Every mistake tells you exactly what to<br>practice next. That's the edge.</p>
  </div>${FOOT}`,
  // 3 How OlympiadReady helps
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:24px;">✅ What Happens After You Submit</div>
    <div class="feats">
      <div class="feat"><span class="ic">❌</span><span>See every question you got wrong, instantly</span></div>
      <div class="feat"><span class="ic">🧠</span><span>AI explains WHY the correct answer is right</span></div>
      <div class="feat"><span class="ic">📌</span><span>Topic tags highlight your weak areas</span></div>
      <div class="feat"><span class="ic">🔁</span><span>Retry similar questions until you master the concept</span></div>
    </div>
  </div>${FOOT}`,
  // 4 Answer key visual
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:20px;">📖 Detailed Answer Key & Explanations</div>
    <h1 style="font-size:78px;margin-bottom:20px;">Don't just see<br>the right answer.<br><span class="g">Understand it.</span></h1>
    ${card(SS.answerKey, "results", 540)}
  </div>${FOOT}`,
  // 5 CTA
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🔍 Turn Mistakes Into Wins</div>
    <h1 style="font-size:84px;margin-bottom:28px;">Start practising.<br><span class="g">Improve daily.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:25px;">AI explanations · Mistake tracking · Free to start</p>
  </div>${FOOT}`,
];}

// ── Scripts 30–49: New content types & visual styles ────────────────

// Script 30 — Quick Maths Challenge (LIGHT style)
function script30() { return [
  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${A_PILL}margin-bottom:36px;">⚡ 30-Second Challenge</div>
    <h1 style="font-size:90px;${H1_LIGHT}">Can you solve<br>this <span style="${A_HL}">Olympiad</span><br>question?</h1>
    <p style="font-size:28px;${SUB_LIGHT}margin-top:28px;">Tap to see the question →</p>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${A_PILL}margin-bottom:32px;">➕ IMO — Class 7</div>
    <h1 style="font-size:62px;${H1_LIGHT}line-height:1.2;">A train travels<br>240 km in 3 hours.<br>How long to cover<br><span style="${A_HL}">400 km</span> at the<br>same speed?</h1>
    <p style="font-size:26px;${SUB_LIGHT}margin-top:24px;">A) 4 hrs &nbsp; B) 5 hrs &nbsp; C) 4.5 hrs &nbsp; D) 6 hrs</p>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${G_PILL}margin-bottom:28px;">✅ Answer: B — 5 hours</div>
    <h1 style="font-size:72px;${H1_LIGHT}margin-bottom:28px;">Speed = 240÷3 = <span style="color:#059669;">80 km/h</span><br>Time = 400÷80 = <span style="color:#059669;">5 hours</span></h1>
    <div style="background:#fff;border-radius:20px;padding:28px 32px;width:90%;box-shadow:0 8px 30px rgba(0,0,0,.08);text-align:left;">
      <p style="font-size:22px;color:#0B1E5B;font-weight:700;margin-bottom:12px;">🧠 Key formula: Time = Distance ÷ Speed</p>
      <p style="font-size:20px;color:#4a5a7a;">Practise 100+ Speed-Distance questions on OlympiadReady — free!</p>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${A_PILL}margin-bottom:36px;">🚀 Want More Like This?</div>
    <h1 style="font-size:84px;${H1_LIGHT}margin-bottom:32px;">50,000+ Olympiad<br>questions.<br><span style="${A_HL}">Free to start.</span></h1>
    <div style="display:inline-flex;align-items:center;gap:16px;background:#0B1E5B;color:#fff;font-weight:800;font-size:40px;padding:24px 48px;border-radius:20px;">🌐 olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 31 — Quick Science Question (GREEN style)
function script31() { return [
  `${HEAD}<div class="s dark" style="${BG_GREEN}padding:72px 60px;">${BLOBS_G}${WM}
    <div style="${G_PILL}margin-bottom:36px;">🔬 Science Flashcard</div>
    <h1 style="font-size:90px;">NSO question.<br><span style="${G_HL}">Can you</span><br>get it right?</h1>
    <p class="sub" style="margin-top:28px;">Most Class 8 students get this wrong.</p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_GREEN}padding:72px 60px;">${BLOBS_G}${WM}
    <div style="${G_PILL}margin-bottom:32px;">🧬 NSO — Class 8</div>
    <h1 style="font-size:64px;line-height:1.2;margin-bottom:24px;">Which gas is<br>produced when<br>zinc reacts with<br><span style="${G_HL}">dilute sulphuric acid?</span></h1>
    <p class="sub" style="font-size:26px;">A) Oxygen &nbsp; B) Carbon dioxide<br>C) Hydrogen &nbsp; D) Nitrogen</p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_GREEN}padding:72px 60px;">${BLOBS_G}${WM}
    <div style="${G_PILL}margin-bottom:24px;">✅ Answer: C — Hydrogen</div>
    <h1 style="font-size:68px;line-height:1.2;margin-bottom:24px;">Zn + H₂SO₄ →<br>ZnSO₄ + <span style="${G_HL}">H₂↑</span></h1>
    <div class="feats" style="margin-top:0;">
      <div class="feat"><span class="ic">💡</span><span>Metals + dilute acids → Salt + Hydrogen</span></div>
      <div class="feat"><span class="ic">🔥</span><span>Hydrogen burns with a "pop" sound</span></div>
      <div class="feat"><span class="ic">📝</span><span>This reaction appears in NSO & NTSE every year</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_GREEN}padding:72px 60px;">${BLOBS_G}${WM}
    <div style="${G_PILL}margin-bottom:40px;">🌿 Master Science Olympiad</div>
    <h1 style="font-size:84px;margin-bottom:32px;">50+ NSO-style<br>Science papers.<br><span style="${G_HL}">All free to start.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 32 — Olympiad Tip #3: Read the question twice (PURPLE)
function script32() { return [
  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:36px;">🎯 Olympiad Tip #3</div>
    <h1 style="font-size:86px;">The mistake<br>that costs<br><span style="${P_HL}">easy marks</span><br>every exam.</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:28px;">⚠️ The Problem</div>
    <h1 style="font-size:82px;margin-bottom:24px;">Reading the<br>question <span style="${P_HL}">once</span><br>and rushing.</h1>
    <p class="sub" style="font-size:26px;">40% of Olympiad errors are from<br><strong style="color:#c4b5fd;">misreading</strong> — not lack of knowledge.</p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:24px;">✅ The Fix: Read It Twice</div>
    <div class="steps" style="width:88%;">
      <div class="step"><div class="step-num" style="background:#7c3aed;">1</div><div><div class="step-text">Read the question</div><div class="step-sub">Understand what is being asked</div></div></div>
      <div class="step"><div class="step-num" style="background:#7c3aed;">2</div><div><div class="step-text">Read it again — spot the trap</div><div class="step-sub">Look for: "NOT", "EXCEPT", "ALWAYS", "NEVER"</div></div></div>
      <div class="step"><div class="step-num" style="background:#7c3aed;">3</div><div><div class="step-text">Then look at the options</div><div class="step-sub">Never read options before finishing the question</div></div></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:36px;">💪 Build This Habit</div>
    <h1 style="font-size:82px;margin-bottom:28px;">Timed mock exams<br>train you to<br><span style="${P_HL}">read under pressure.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="margin-top:24px;font-size:24px;">Full timed papers · All Olympiads · Free to start</p>
  </div>${FOOT}`,
];}

// Script 33 — Olympiad Tip #4: Last 10 minutes (AMBER)
function script33() { return [
  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:36px;">⏰ Olympiad Tip #4</div>
    <h1 style="font-size:88px;">What to do<br>in the <span style="${A_HL}">last<br>10 minutes</span><br>of your exam.</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:24px;">🚦 The Final 10 Minutes</div>
    <div class="steps" style="width:88%;">
      <div class="step"><div class="step-num" style="background:#b45309;">1</div><div><div class="step-text">Stop attempting new hard questions</div><div class="step-sub">Switch fully to review mode</div></div></div>
      <div class="step"><div class="step-num" style="background:#b45309;">2</div><div><div class="step-text">Fill in every unanswered question</div><div class="step-sub">No negative marking = always guess</div></div></div>
      <div class="step"><div class="step-num" style="background:#b45309;">3</div><div><div class="step-text">Re-check your circled doubtful answers</div><div class="step-sub">Only change if you're now certain</div></div></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:28px;">🧠 The Science Behind This</div>
    <h1 style="font-size:78px;margin-bottom:24px;">Your first instinct<br>is right <span style="${A_HL}">80%</span><br>of the time.</h1>
    <p class="sub" style="font-size:26px;">Research shows changing answers<br>lowers your score on average.<br><strong style="color:#FBB024;">Trust your gut. Review. Don't re-do.</strong></p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:36px;">⏱ Train With Real Timers</div>
    <h1 style="font-size:84px;margin-bottom:28px;">OlympiadReady's<br>mock exams run<br><span style="${A_HL}">exact countdown</span><br>timers.</h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 34 — What toppers do differently (DARK)
function script34() { return [
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">🥇 Topper Habits</div>
    <h1 style="font-size:86px;">Rank 1<br>Olympiad<br>students do<br><span class="g">5 things</span> differently.</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📋 The Topper Playbook</div>
    <div class="feats">
      <div class="feat"><span class="ic">📅</span><span><strong>Daily</strong> — 10 questions, same time every day</span></div>
      <div class="feat"><span class="ic">❌</span><span><strong>Reviews</strong> every wrong answer within 24 hours</span></div>
      <div class="feat"><span class="ic">⏱</span><span><strong>Takes timed mocks</strong> — never untimed practice only</span></div>
      <div class="feat"><span class="ic">📖</span><span><strong>Reads explanations</strong>, not just the correct answer</span></div>
      <div class="feat"><span class="ic">🎯</span><span><strong>Focuses on weak topics</strong> — not favourite topics</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:32px;">💡 The Uncomfortable Truth</div>
    <h1 style="font-size:82px;margin-bottom:24px;">Toppers don't<br>study <span class="g">more.</span><br>They study<br><span class="g">smarter.</span></h1>
    <p class="sub" style="font-size:26px;">1 hour of focused, reviewed practice<br>beats 3 hours of passive reading.</p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">🚀 Start All 5 Habits Today</div>
    <h1 style="font-size:84px;margin-bottom:28px;">OlympiadReady<br>is built for<br><span class="g">this exact</span><br>system.</h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="margin-top:24px;font-size:24px;">Free to start · AI-powered · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 35 — August Olympiad urgency (AMBER)
function script35() { return [
  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:36px;">📅 August Is Olympiad Season</div>
    <h1 style="font-size:88px;">Registrations<br>are open.<br>Is your child<br><span style="${A_HL}">ready?</span></h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:28px;">📊 The Preparation Gap</div>
    <h1 style="font-size:80px;margin-bottom:24px;">Most students<br>register.<br>Few <span style="${A_HL}">prepare</span><br>the right way.</h1>
    <div class="feats" style="margin-top:0;">
      <div class="feat"><span class="ic">❌</span><span>Reading textbooks isn't Olympiad prep</span></div>
      <div class="feat"><span class="ic">❌</span><span>Solving last year's paper once isn't enough</span></div>
      <div class="feat"><span class="ic">✅</span><span>Daily timed practice with AI feedback is</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:24px;">⚡ Start Today — Not Tomorrow</div>
    <h1 style="font-size:80px;margin-bottom:20px;">Every week<br>of practice<br>adds <span style="${A_HL}">≈ 8–12%</span><br>to your score.</h1>
    <p class="sub" style="font-size:26px;">There are still weeks left.<br>Make every one of them count.</p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:36px;">🎯 Your Olympiad Coach is Ready</div>
    <h1 style="font-size:84px;margin-bottom:28px;">AI practice.<br>Timed mocks.<br><span style="${A_HL}">Starts free.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 36 — Spell Bee Prep (PURPLE)
function script36() { return [
  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:36px;">🐝 Spell Bee Season</div>
    <h1 style="font-size:90px;">Is your child<br>ready for<br><span style="${P_HL}">Spell Bee</span><br>Class 1–12?</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:24px;">📖 What Spell Bee Tests</div>
    <div class="feats">
      <div class="feat"><span class="ic">🔤</span><span>Correct spelling under time pressure</span></div>
      <div class="feat"><span class="ic">📚</span><span>Vocabulary — meaning, usage, antonyms</span></div>
      <div class="feat"><span class="ic">🔊</span><span>Phonics and word patterns</span></div>
      <div class="feat"><span class="ic">📝</span><span>Sentence correction & word forms</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:28px;">✅ How OlympiadReady Helps</div>
    <h1 style="font-size:80px;margin-bottom:24px;">Spell Bee papers<br>for every class.<br><span style="${P_HL}">AI-generated.</span><br>Unlimited.</h1>
    <p class="sub" style="font-size:25px;">Class 1 to 12 · SOF-aligned vocabulary lists<br>Timed word quizzes · Free to start</p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:36px;">🐝 Practise Spell Bee Today</div>
    <h1 style="font-size:86px;margin-bottom:28px;">Spelling.<br>Vocabulary.<br><span style="${P_HL}">All covered.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 37 — Parents: 3 questions to ask your child (LIGHT)
function script37() { return [
  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${A_PILL}margin-bottom:36px;">👨‍👩‍👧 For Parents</div>
    <h1 style="font-size:84px;${H1_LIGHT}">3 questions<br>to ask your<br>child <span style="${A_HL}">tonight</span><br>about Olympiad.</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${A_PILL}margin-bottom:28px;">❓ Question 1</div>
    <h1 style="font-size:76px;${H1_LIGHT}margin-bottom:20px;">"Have you taken<br>a <span style="${A_HL}">timed mock exam</span><br>in the last week?"</h1>
    <div style="background:#fff;border-radius:20px;padding:24px 28px;width:90%;box-shadow:0 4px 20px rgba(0,0,0,.06);">
      <p style="font-size:22px;color:#0B1E5B;font-weight:600;">Why it matters: Reading notes ≠ exam readiness. Timed practice is what builds speed and confidence.</p>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${A_PILL}margin-bottom:28px;">❓ Question 2 & 3</div>
    <h1 style="font-size:68px;${H1_LIGHT}margin-bottom:20px;">"What was your<br>score on your<br>last practice paper?"</h1>
    <h1 style="font-size:68px;${H1_LIGHT}margin-top:16px;">"Do you know<br><span style="${A_HL}">why</span> you got<br>the wrong ones wrong?"</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${A_PILL}margin-bottom:32px;">✅ Help Them Practice Right</div>
    <h1 style="font-size:82px;${H1_LIGHT}margin-bottom:28px;">Timed papers.<br>AI explanations.<br><span style="${A_HL}">Free to start.</span></h1>
    <div style="display:inline-flex;align-items:center;gap:16px;background:#0B1E5B;color:#fff;font-weight:800;font-size:38px;padding:24px 48px;border-radius:20px;">🌐 olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 38 — The one Maths formula (DARK)
function script38() { return [
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">➕ Olympiad Maths Secret</div>
    <h1 style="font-size:86px;">The <span class="g">one formula</span><br>that appears<br>in almost<br>every IMO paper.</span></h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">📐 The Formula</div>
    <h1 style="font-size:96px;margin-bottom:16px;letter-spacing:-2px;"><span class="g">a² + b²<br>= c²</span></h1>
    <p class="sub" style="font-size:26px;margin-bottom:28px;">Pythagoras' theorem. It appears in<br>geometry, mensuration, coordinate geometry,<br>and speed-distance problems.</p>
    <div class="feats" style="margin-top:0;">
      <div class="feat"><span class="ic">🔺</span><span>Right triangles · Diagonals · Heights</span></div>
      <div class="feat"><span class="ic">📐</span><span>Common triplets: 3-4-5 · 5-12-13 · 8-15-17</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:24px;">💡 Olympiad Trap Question</div>
    <h1 style="font-size:64px;line-height:1.2;margin-bottom:20px;">A ladder 10m long<br>leans against a wall.<br>Its foot is 6m from<br>the wall. How high<br>does it <span class="g">reach?</span></h1>
    <p class="sub" style="font-size:26px;">h² = 10² − 6² = 100 − 36 = 64 → <strong style="color:#4ade80;">h = 8m</strong></p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">🎯 Master Geometry</div>
    <h1 style="font-size:84px;margin-bottom:28px;">100+ geometry<br>questions.<br><span class="g">AI-explained.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 39 — Science concept 80% get wrong (GREEN)
function script39() { return [
  `${HEAD}<div class="s dark" style="${BG_GREEN}padding:72px 60px;">${BLOBS_G}${WM}
    <div style="${G_PILL}margin-bottom:36px;">🔬 Science Alert</div>
    <h1 style="font-size:86px;">The science<br>concept <span style="${G_HL}">80%</span><br>of students<br>get wrong.</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_GREEN}padding:72px 60px;">${BLOBS_G}${WM}
    <div style="${G_PILL}margin-bottom:24px;">⚡ Mass vs Weight</div>
    <h1 style="font-size:68px;line-height:1.2;margin-bottom:24px;">They are <span style="color:#f87171;">NOT</span><br>the same thing.</h1>
    <div class="feats" style="margin-top:0;">
      <div class="feat"><span class="ic">⚖️</span><span><strong>Mass</strong> = amount of matter. Unit: kg. Never changes.</span></div>
      <div class="feat"><span class="ic">🌍</span><span><strong>Weight</strong> = mass × gravity. Unit: Newton. Changes on Moon!</span></div>
      <div class="feat"><span class="ic">🌙</span><span>On the Moon, your mass stays the same but weight = 1/6th</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_GREEN}padding:72px 60px;">${BLOBS_G}${WM}
    <div style="${G_PILL}margin-bottom:24px;">🧪 Exam Question</div>
    <h1 style="font-size:64px;line-height:1.2;margin-bottom:20px;">A person weighs<br>600N on Earth.<br>What is their<br>weight on the Moon?<br>(g_moon = g/6)</h1>
    <p class="sub" style="font-size:28px;">Weight on Moon = 600 ÷ 6 = <strong style="${G_HL}">100 N</strong></p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_GREEN}padding:72px 60px;">${BLOBS_G}${WM}
    <div style="${G_PILL}margin-bottom:36px;">🔬 Master NSO Science</div>
    <h1 style="font-size:84px;margin-bottom:28px;">500+ NSO Science<br>questions with<br><span style="${G_HL}">AI explanations.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 40 — Try without signup (DARK)
function script40() { return [
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:36px;">⚡ No Login Needed</div>
    <h1 style="font-size:90px;">Try 5 Olympiad<br>questions <span class="gr">right now.</span><br>No signup.</h1>
    <p class="sub" style="margin-top:28px;">Seriously. Open the site. Tap Practice.<br>You're in. No account needed.</p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🚀 Here's What Happens</div>
    <div class="steps" style="width:88%;">
      <div class="step"><div class="step-num">1</div><div><div class="step-text">Go to olympiadready.com</div><div class="step-sub">Works on phone or laptop</div></div></div>
      <div class="step"><div class="step-num">2</div><div><div class="step-text">Pick your subject & class</div><div class="step-sub">IMO, NSO, IEO, IGKO and more</div></div></div>
      <div class="step"><div class="step-num">3</div><div><div class="step-text">Start practising instantly</div><div class="step-sub">AI explains every answer immediately</div></div></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:40px;">🎁 Completely Free to Start</div>
    <h1 style="font-size:88px;margin-bottom:32px;">Open it now.<br><span class="gr">Don't wait.</span></h1>
    <div class="url-box" style="margin-bottom:24px;"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="font-size:26px;">No download · No credit card · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 41 — Level 2 is where medals are decided (AMBER)
function script41() { return [
  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:36px;">🥇 The Secret Level</div>
    <h1 style="font-size:86px;">Level 2 is<br>where Olympiad<br><span style="${A_HL}">medals</span><br>are decided.</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:24px;">📊 Level 1 vs Level 2</div>
    <div class="compare">
      <div class="col col-free">
        <div class="col-title" style="font-size:22px;">Level 1</div>
        <div class="col-item" style="font-size:20px;">School-level exam</div>
        <div class="col-item" style="font-size:20px;">Multiple choice, 50 Qs</div>
        <div class="col-item" style="font-size:20px;">Qualify top 5–10%</div>
        <div class="col-item" style="font-size:20px;">Most students stop here</div>
      </div>
      <div class="col col-pro">
        <div class="col-title" style="color:#FBB024;font-size:22px;">Level 2 🏆</div>
        <div class="col-item" style="font-size:20px;"><span class="ck">✓</span>National level</div>
        <div class="col-item" style="font-size:20px;"><span class="ck">✓</span>Harder, fewer topics</div>
        <div class="col-item" style="font-size:20px;"><span class="ck">✓</span>Gold/Silver/Bronze</div>
        <div class="col-item" style="font-size:20px;"><span class="ck">✓</span>This is where prep matters most</div>
      </div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:28px;">📚 Level 2 Prep on OlympiadReady</div>
    <h1 style="font-size:80px;margin-bottom:24px;">Level 2 papers.<br>Harder concepts.<br><span style="${A_HL}">AI-powered</span><br>explanations.</h1>
    <p class="sub" style="font-size:26px;">Most platforms stop at Level 1.<br>We go all the way to the medal round.</p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_AMBER}padding:72px 60px;">${BLOBS_A}${WM}
    <div style="${A_PILL}margin-bottom:36px;">🎯 Aim Higher</div>
    <h1 style="font-size:84px;margin-bottom:28px;">Don't just<br>qualify Level 1.<br><span style="${A_HL}">Win Level 2.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 42 — Score improvement story (DARK)
function script42() { return [
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">📈 Real Progress</div>
    <h1 style="font-size:88px;">"My mock score<br>went from<br><span style="color:#f87171;">58%</span> to<br><span class="g">91%</span> in 4 weeks."</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🗓 Week by Week</div>
    <div class="steps" style="width:88%;">
      <div class="step"><div class="step-num" style="background:#ef4444;font-size:20px;">W1</div><div><div class="step-text">Score: 58% — started mock exams</div><div class="step-sub">Reviewed every wrong answer with AI</div></div></div>
      <div class="step"><div class="step-num" style="background:#f59e0b;font-size:20px;">W2</div><div><div class="step-text">Score: 67% — weak topics spotted</div><div class="step-sub">Focused only on those topics for 3 days</div></div></div>
      <div class="step"><div class="step-num" style="background:#22c55e;font-size:20px;">W3</div><div><div class="step-text">Score: 78% — speed improving</div><div class="step-sub">Timed mocks every alternate day</div></div></div>
      <div class="step"><div class="step-num" style="background:#3b82f6;font-size:20px;">W4</div><div><div class="step-text" style="color:#4ade80;">Score: 91% ✨</div><div class="step-sub">Consistent daily practice paid off</div></div></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:28px;">✅ The System That Got Them There</div>
    <div class="feats">
      <div class="feat"><span class="ic">📝</span><span>Daily timed mock exams on OlympiadReady</span></div>
      <div class="feat"><span class="ic">🧠</span><span>AI explanations for every wrong answer</span></div>
      <div class="feat"><span class="ic">🎯</span><span>Focused practice on weak topics only</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">🚀 Your Turn</div>
    <h1 style="font-size:88px;margin-bottom:28px;">Start week 1<br><span class="g">today.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="margin-top:24px;font-size:24px;">Free to start · AI-powered · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 43 — Quick English Grammar Trap (LIGHT)
function script43() { return [
  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${P_PILL}margin-bottom:36px;">📖 IEO Grammar Challenge</div>
    <h1 style="font-size:86px;${H1_LIGHT}">Which sentence<br>is <span style="${P_HL}">correct?</span><br>Most students<br>get this wrong.</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${P_PILL}margin-bottom:32px;">🔍 Spot the Error</div>
    <div style="background:#fff;border-radius:20px;padding:28px 32px;width:92%;box-shadow:0 8px 30px rgba(0,0,0,.08);text-align:left;margin-bottom:20px;">
      <p style="font-size:24px;color:#ef4444;font-weight:700;margin-bottom:8px;">A) ❌ "Neither of the boys have finished their work."</p>
      <p style="font-size:24px;color:#ef4444;font-weight:700;margin-bottom:8px;">B) ❌ "Each of the students are present today."</p>
      <p style="font-size:24px;color:#059669;font-weight:700;margin-bottom:8px;">C) ✅ "Neither of the boys has finished his work."</p>
      <p style="font-size:24px;color:#ef4444;font-weight:700;">D) ❌ "Each students are present today."</p>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${G_PILL}margin-bottom:24px;">✅ The Rule</div>
    <h1 style="font-size:72px;${H1_LIGHT}margin-bottom:20px;">"Neither" and "Each"<br>take a <span style="color:#059669;">singular verb.</span></h1>
    <div style="background:#fff;border-radius:20px;padding:24px 28px;width:92%;box-shadow:0 4px 20px rgba(0,0,0,.06);text-align:left;">
      <p style="font-size:21px;color:#0B1E5B;font-weight:600;margin-bottom:10px;">💡 Memory trick: Neither = Not either ONE → singular</p>
      <p style="font-size:21px;color:#4a5a7a;">Other indefinite pronouns also take singular: each, either, everyone, nobody, someone</p>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${P_PILL}margin-bottom:32px;">📖 Master IEO English</div>
    <h1 style="font-size:82px;${H1_LIGHT}margin-bottom:28px;">1000+ IEO-style<br>grammar questions.<br><span style="${P_HL}">AI-explained.</span></h1>
    <div style="display:inline-flex;align-items:center;gap:16px;background:#0B1E5B;color:#fff;font-weight:800;font-size:38px;padding:24px 48px;border-radius:20px;">🌐 olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 44 — 30-Day Olympiad Study Plan (DARK)
function script44() { return [
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">📅 The 30-Day Plan</div>
    <h1 style="font-size:86px;">How to go<br>from <span style="color:#f87171;">unprepared</span><br>to <span class="g">Olympiad-ready</span><br>in 30 days.</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🗓 Week 1 — Baseline</div>
    <div class="feats">
      <div class="feat"><span class="ic">📝</span><span>Take 1 full mock exam — don't prepare first</span></div>
      <div class="feat"><span class="ic">🔍</span><span>Identify your 3 weakest topics from the results</span></div>
      <div class="feat"><span class="ic">📚</span><span>Study ONLY those 3 topics for 3 days</span></div>
      <div class="feat"><span class="ic">🔁</span><span>Retake a mock — see if those topics improved</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🗓 Week 2–3 — Build Speed</div>
    <div class="feats">
      <div class="feat"><span class="ic">⏱</span><span>1 timed mock every 2 days</span></div>
      <div class="feat"><span class="ic">🧠</span><span>Read AI explanations for every wrong answer</span></div>
      <div class="feat"><span class="ic">🎯</span><span>10 targeted practice questions on weak spots daily</span></div>
      <div class="feat"><span class="ic">📈</span><span>Track score trend — it should go up each week</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🗓 Week 4 — Peak Prep</div>
    <div class="feats">
      <div class="feat"><span class="ic">🏁</span><span>Full mock exam every day (yes, every day)</span></div>
      <div class="feat"><span class="ic">⏰</span><span>Simulate real exam timing exactly</span></div>
      <div class="feat"><span class="ic">✅</span><span>Only review weak topics — don't add new ones</span></div>
      <div class="feat"><span class="ic">😴</span><span>Day 30: rest, revise formulas, sleep early</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">🚀 OlympiadReady Powers This Entire Plan</div>
    <h1 style="font-size:84px;margin-bottom:28px;">Mocks. Practice.<br>AI explanations.<br><span class="g">Day 1 is free.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 45 — Your child's dashboard (DARK)
function script45() { return [
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">📊 Inside Look</div>
    <h1 style="font-size:86px;">This is what your<br>child's Olympiad<br><span class="g">dashboard</span><br>looks like.</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:20px;">📈 Progress Dashboard</div>
    <h1 style="font-size:76px;margin-bottom:20px;">Every paper.<br>Every score.<br><span class="g">Every weak topic</span><br>— visible.</h1>
    ${card(SS.badges || SS.mock, "dashboard", 480)}
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">🏅 Badges Earned So Far</div>
    <div class="feats">
      <div class="feat"><span class="ic">🌟</span><span>First Paper — taken your first mock</span></div>
      <div class="feat"><span class="ic">🔥</span><span>7-Day Streak — practiced 7 days in a row</span></div>
      <div class="feat"><span class="ic">🧠</span><span>Subject Master — 90%+ in any subject</span></div>
      <div class="feat"><span class="ic">🏆</span><span>All 18 badges → physical medal shipped to you</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">🚀 Build Your Dashboard</div>
    <h1 style="font-size:88px;margin-bottom:28px;">Start practising.<br>Watch the <span class="g">numbers<br>grow.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 46 — IMO vs NSO vs IEO — which is right for your child? (LIGHT)
function script46() { return [
  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${A_PILL}margin-bottom:32px;">🎯 Parent's Guide</div>
    <h1 style="font-size:80px;${H1_LIGHT}">IMO vs NSO<br>vs IEO vs IGKO.<br><span style="${A_HL}">Which one</span><br>is right for<br>your child?</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${A_PILL}margin-bottom:24px;">➕ IMO — Maths</div>
    <h1 style="font-size:68px;${H1_LIGHT}margin-bottom:16px;">International<br>Maths Olympiad</h1>
    <div style="background:#fff;border-radius:20px;padding:24px 28px;width:92%;box-shadow:0 4px 20px rgba(0,0,0,.06);text-align:left;">
      <p style="font-size:22px;color:#0B1E5B;font-weight:700;margin-bottom:8px;">Best for: Students who love Maths</p>
      <p style="font-size:21px;color:#4a5a7a;margin-bottom:6px;">Topics: Arithmetic, Algebra, Geometry, Data handling</p>
      <p style="font-size:21px;color:#4a5a7a;">Classes: 1–12 · Two levels</p>
    </div>
    <div style="background:#fff;border-radius:20px;padding:24px 28px;width:92%;box-shadow:0 4px 20px rgba(0,0,0,.06);text-align:left;margin-top:16px;">
      <p style="font-size:22px;color:#0B1E5B;font-weight:700;margin-bottom:8px;">🔬 NSO — Best for: Science lovers</p>
      <p style="font-size:21px;color:#4a5a7a;">Physics, Chemistry, Biology · Classes 1–12</p>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${A_PILL}margin-bottom:24px;">📖 IEO & IGKO</div>
    <div style="background:#fff;border-radius:20px;padding:24px 28px;width:92%;box-shadow:0 4px 20px rgba(0,0,0,.06);text-align:left;margin-bottom:16px;">
      <p style="font-size:22px;color:#0B1E5B;font-weight:700;margin-bottom:8px;">📖 IEO — English lovers</p>
      <p style="font-size:21px;color:#4a5a7a;">Grammar, Vocabulary, Reading — Classes 1–12</p>
    </div>
    <div style="background:#fff;border-radius:20px;padding:24px 28px;width:92%;box-shadow:0 4px 20px rgba(0,0,0,.06);text-align:left;margin-bottom:16px;">
      <p style="font-size:22px;color:#0B1E5B;font-weight:700;margin-bottom:8px;">🌍 IGKO — Curious minds</p>
      <p style="font-size:21px;color:#4a5a7a;">General Knowledge, Current Affairs — Classes 1–10</p>
    </div>
    <div style="background:#fff;border-radius:20px;padding:24px 28px;width:92%;box-shadow:0 4px 20px rgba(0,0,0,.06);text-align:left;">
      <p style="font-size:22px;color:#0B1E5B;font-weight:700;margin-bottom:8px;">💻 NCO / ISSO — Tech kids</p>
      <p style="font-size:21px;color:#4a5a7a;">Computer Science, Coding — Classes 2–12</p>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s" style="${BG_LIGHT}padding:72px 60px;">${WM_LIGHT}
    <div style="${A_PILL}margin-bottom:32px;">✅ Prep for ALL of them</div>
    <h1 style="font-size:82px;${H1_LIGHT}margin-bottom:28px;">One platform.<br>Every Olympiad.<br><span style="${A_HL}">Free to start.</span></h1>
    <div style="display:inline-flex;align-items:center;gap:16px;background:#0B1E5B;color:#fff;font-weight:800;font-size:38px;padding:24px 48px;border-radius:20px;">🌐 olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 47 — Study smarter not harder (PURPLE)
function script47() { return [
  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:36px;">🎯 Olympiad Tip #5</div>
    <h1 style="font-size:86px;">Don't study<br><span style="${P_HL}">more.</span><br>Study<br><span style="${P_HL}">smarter.</span></h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:24px;">❌ What Doesn't Work</div>
    <div class="feats">
      <div class="feat"><span class="ic">❌</span><span>Reading the same chapter 5 times</span></div>
      <div class="feat"><span class="ic">❌</span><span>Highlighting everything in the textbook</span></div>
      <div class="feat"><span class="ic">❌</span><span>Solving only the questions you find easy</span></div>
      <div class="feat"><span class="ic">❌</span><span>Skipping timed practice until the last week</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:24px;">✅ What Actually Works</div>
    <div class="feats">
      <div class="feat"><span class="ic">✅</span><span>Take a test FIRST — then study the gaps</span></div>
      <div class="feat"><span class="ic">✅</span><span>Review wrong answers before moving on</span></div>
      <div class="feat"><span class="ic">✅</span><span>Practice under real timed conditions daily</span></div>
      <div class="feat"><span class="ic">✅</span><span>Spend 80% of time on weak topics, not strong ones</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark" style="${BG_PURPLE}padding:72px 60px;">${BLOBS_P}${WM}
    <div style="${P_PILL}margin-bottom:36px;">🧠 Built for Smart Studying</div>
    <h1 style="font-size:84px;margin-bottom:28px;">AI tracks your<br>weak topics.<br>You just <span style="${P_HL}">practice.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
  </div>${FOOT}`,
];}

// Script 48 — Failed first mock, then won (DARK)
function script48() { return [
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">💪 True Story</div>
    <h1 style="font-size:84px;">"I scored <span style="color:#f87171;">38%</span><br>on my first<br>mock exam."<br><span class="g">"Then I won<br>Rank 4 State."</span></h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:28px;">💡 What Changed</div>
    <h1 style="font-size:82px;margin-bottom:24px;">The score<br>didn't matter.<br>What I <span class="g">did next</span><br>did.</h1>
    <p class="sub" style="font-size:26px;">Instead of feeling bad, I opened the results<br>and read every single AI explanation.</p>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:24px;">📋 The Only System You Need</div>
    <div class="steps" style="width:88%;">
      <div class="step"><div class="step-num">1</div><div><div class="step-text">Take mock → see your score</div><div class="step-sub">Even 30% is useful data, not failure</div></div></div>
      <div class="step"><div class="step-num">2</div><div><div class="step-text">Read AI explanation for each mistake</div><div class="step-sub">Understand WHY, not just what</div></div></div>
      <div class="step"><div class="step-num">3</div><div><div class="step-text">Retake 3 days later</div><div class="step-sub">Watch the number go up</div></div></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:28px;">🥇 Your First Mock Is Not Your Last</div>
    <h1 style="font-size:84px;margin-bottom:28px;">Start today.<br>Score higher<br><span class="g">tomorrow.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="margin-top:24px;font-size:24px;">AI-powered · Free to start · Class 1–12</p>
  </div>${FOOT}`,
];}

// Script 49 — The PDF every Olympiad student needs (DARK)
function script49() { return [
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">📄 Free Download</div>
    <h1 style="font-size:84px;">The PDF every<br>Olympiad student<br>should <span class="g">download</span><br>right now.</h1>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:20px;">📥 What's Inside</div>
    <h1 style="font-size:76px;margin-bottom:16px;">Full question<br>paper + <span class="g">OMR sheet</span><br>+ answer key.</h1>
    ${card(SS.pdf || SS.practicePaper, "question-papers", 490)}
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:24px;">✅ Why Students Love This</div>
    <div class="feats">
      <div class="feat"><span class="ic">🖨️</span><span>Print it and practice with a real pen — just like exam day</span></div>
      <div class="feat"><span class="ic">✔️</span><span>Fill the OMR sheet — build the bubbling habit</span></div>
      <div class="feat"><span class="ic">📖</span><span>Detailed answer key explains every question</span></div>
      <div class="feat"><span class="ic">♾️</span><span>New AI-generated paper each download — no repeats</span></div>
    </div>
  </div>${FOOT}`,

  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:36px;">📥 Download Now — Always Free</div>
    <h1 style="font-size:88px;margin-bottom:28px;">Print. Practice.<br><span class="g">Win.</span></h1>
    <div class="url-box"><span class="globe">🌐</span> olympiadready.com</div>
    <p class="sub" style="margin-top:24px;font-size:25px;">Free PDF downloads · All Olympiads · Class 1–12</p>
  </div>${FOOT}`,
];}

// ── Pick script by day ───────────────────────────────────────────────
const SCRIPTS = [
  script0,  script1,  script2,  script3,  script4,
  script5,  script6,  script7,  script8,  script9,
  script10, script11, script12, script13, script14,
  script15, script16, script17, script18, script19,
  script20, script21, script22, script23, script24,
  script25, script26, script27, script28, script29,
  script30, script31, script32, script33, script34,
  script35, script36, script37, script38, script39,
  script40, script41, script42, script43, script44,
  script45, script46, script47, script48, script49,
];

// Use a fixed epoch so the cycle advances forward each day (not per-month)
const EPOCH   = new Date("2026-06-01");
const dayNum  = Math.floor((new Date(dateStr) - EPOCH) / 86400000);
const SCENES  = SCRIPTS[dayNum % SCRIPTS.length]();
console.log(`using script ${dayNum % SCRIPTS.length} (dayNum=${dayNum}, date=${dateStr})`);

// ── Render scenes via Playwright ────────────────────────────────────
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
    console.log(`  rendered scene ${i+1}/${SCENES.length}`);
  }
  await browser.close();

  // ── Music ──────────────────────────────────────────────────────────
  const musicDir = path.join(ROOT, "assets", "music");
  let musicFile  = null;
  if (fs.existsSync(musicDir)) {
    const tracks = fs.readdirSync(musicDir).filter(f => /\.(mp3|m4a|wav)$/i.test(f)).sort();
    if (tracks.length) {
      musicFile = path.join(musicDir, tracks[day % tracks.length]);
      console.log(`using music: ${path.basename(musicFile)}`);
    }
  }
  if (!musicFile) console.log("no music — building silent reel");

  // ── ffmpeg ─────────────────────────────────────────────────────────
  const N   = SCENES.length;
  const dur = 2.4;
  const z   = "z='min(zoom+0.0009\\,1.25)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'";
  const pre = `select=eq(n\\,0),scale=${W*2}:${H*2},zoompan=${z}:d=72:s=${W}x${H}:fps=30,setpts=PTS-STARTPTS`;

  const vFilters = Array.from({length: N}, (_,i) => `[${i}:v]${pre}[v${i}];`);
  const trans    = ["fade","slideleft","fade","slideleft","fade","fade"];
  let xchain = "", prev = "v0";
  for (let i = 1; i < N; i++) {
    const out = i === N-1 ? "v" : `x${i}`;
    xchain += `[${prev}][v${i}]xfade=transition=${trans[i-1]||"fade"}:duration=0.5:offset=${(i*dur-0.5).toFixed(1)}[${out}];`;
    prev = `x${i}`;
  }
  xchain = xchain.replace(/;$/, "");

  const totalDur   = (N * dur).toFixed(1);
  const audioFilt  = musicFile
    ? `;[${N}:a]atrim=0:${totalDur},asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.5,afade=t=out:st=${(N*dur-0.5).toFixed(1)}:d=0.5,volume=0.40,aformat=channel_layouts=stereo:sample_rates=44100[a]`
    : "";

  const filterFile = path.join(sceneDir, "filter.txt");
  fs.writeFileSync(filterFile, vFilters.join("") + xchain + audioFilt, "utf8");

  const out         = path.join(outDir, `${dateStr}.mp4`);
  const sceneInputs = Array.from({length: N}, (_,i) =>
    `-loop 1 -t ${dur} -i "${path.join(sceneDir, `scene-${i+1}.png`)}"`).join(" ");
  const musicInput  = musicFile ? `-i "${musicFile}"` : "";
  const audioMap    = musicFile ? `-map "[a]" -c:a aac -b:a 128k -ar 44100` : "";

  const cmd = [
    "ffmpeg -y", sceneInputs, musicInput,
    `-filter_complex_script "${filterFile}"`,
    `-map "[v]"`, audioMap,
    `-c:v libx264 -pix_fmt yuv420p -r 30 -t ${totalDur} -movflags +faststart`,
    `"${out}"`,
  ].filter(Boolean).join(" ");

  console.log("running ffmpeg…");
  execSync(cmd, { stdio: "inherit" });

  fs.rmSync(sceneDir, { recursive: true, force: true });
  console.log("wrote " + path.relative(ROOT, out));
})();
