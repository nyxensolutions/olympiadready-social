#!/usr/bin/env node
// Builds a ~12s, 1080×1920 vertical MP4 Reel for a given date.
// Usage: node generate-reel.js <YYYY-MM-DD>
//
// 15 rotating reel scripts, picked by day-of-month % 15:
//   0 — Platform overview      "Still using old question banks?"
//   1 — Free vs Pro            "Start completely FREE"
//   2 — For parents            "Is your child ready?"
//   3 — AI Tutor               "Stuck on a problem at 11 PM?"
//   4 — How it works           "Olympiad gold in 4 steps"
//   5 — Problem → solution     "From boring to brilliant"
//   6 — Score story            "Watch your score climb"
//   7 — Subjects covered       "Every Olympiad subject in one place"
//   8 — Free tier hook         "15 free papers. No card."
//   9 — School pilot pitch     "Your school gets a free invite code"
//  10 — Comparison hook        "₹6,400 vs ₹129 — the maths every parent should see"
//  11 — Child social proof     "My friend got gold. I asked how."
//  12 — Parent WhatsApp bait   "Share this with every parent group"
//  13 — School urgency         "August is weeks away. Is your school ready?"
//  14 — Zero cost school       "Your school pays ₹0 to get started"
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
  practice:    loadImg("practice.png"),
  mock:        loadImg("mock-exam.png"),
  explanation: loadImg("explanation.png"),
  badges:      loadImg("badges.png"),
  pdf:         loadImg("pdf-download.png"),
  pricing:     loadImg("pricing.png"),
  aiTutor:     loadImg("ai-tutor.png"),
  boring:      loadImg("boring.png"),
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
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">⚡ India's #1 AI Olympiad Coach</div>
    <h1 style="font-size:100px;">Still using<br><span class="g">old question<br>banks?</span></h1>
    <p class="sub" style="margin-top:36px;">There's a smarter, AI-powered way<br>to prepare for every Olympiad.</p>
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
    <div class="pill" style="margin-bottom:24px;">👑 Go Pro — Unlock Everything</div>
    <h1 style="font-size:80px;margin-bottom:24px;">Unlimited for<br><span class="g">just ₹129/mo.</span></h1>
    <div class="compare">
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
    ${card(SS.badges, "dashboard", 470)}
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
    ${imgCard(SS.aiTutor, 560)}
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

// Script 5 — Problem → Solution (uses Boring.png)
function script5() { return [
  // 1 Hook — Boring.png fills the frame
  `${HEAD}<div class="s dark" style="padding:0;justify-content:flex-end;">${BLOBS}
    ${SS.boring ? `<img src="${SS.boring}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0.92;">` : ""}
    <div style="position:relative;z-index:2;padding:0 60px 100px;text-align:center;">
      <div class="wm" style="position:static;margin-bottom:20px;">${`<img src="${LOGO_LIGHT}"><span style="color:#fff;">Olympiad</span><span class="r">Ready</span>`}</div>
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
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">📚 All Subjects. One Platform.</div>
    <h1 style="font-size:88px;">Every Olympiad<br>subject in<br><span class="g">one place.</span></h1>
    <p class="sub" style="margin-top:36px;">IMO. NSO. IEO. NCO. ISSO.<br>All covered. All AI-powered.</p>
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

// Script 8 — Free tier hook (parent audience) "15 free papers. No card."
function script8() { return [
  // 1 Hook
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill" style="margin-bottom:40px;">🎁 100% Free to Start</div>
    <h1 style="font-size:88px;">Your child gets<br><span class="g">15 free</span><br>Olympiad papers.</h1>
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
    <h1 style="font-size:90px;margin-bottom:32px;">15 free papers.<br><span class="g">Sign up now.</span></h1>
    <div class="url-box" style="margin-bottom:28px;"><span class="globe">🌐</span> olympiadready.in</div>
    <p class="sub" style="font-size:24px;">No credit card · Class 1–12 · All Olympiads</p>
  </div>${FOOT}`,
];}

// Script 9 — School pilot pitch (coordinator / principal audience)
function script9() { return [
  // 1 Hook — the problem
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">🏫 For Schools & Coordinators</div>
    <h1 style="font-size:84px;">Students prepping<br>with <span style="color:#f87171;">YouTube videos</span><br>&amp; old books?</h1>
    <p class="sub" style="margin-top:32px;">There's a structured, SOF-aligned<br>solution — and it's free for your school.</p>
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
    <h1 style="font-size:88px;margin-bottom:20px;">15 free papers.<br><span class="gr">No card.</span><br>No catch.</h1>
    <p class="sub" style="font-size:26px;">Class 1–12 · IMO · NSO · IEO · IGKO<br>SOF-aligned content. AI-powered.</p>
  </div>${FOOT}`,
  // 4 Progress = results
  `${HEAD}<div class="s dark top">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:24px;">📈 Practice = Progress</div>
    <h1 style="font-size:82px;margin-bottom:24px;"><span class="g">10 questions</span><br>a day changes<br>everything.</h1>
    ${card(SS.badges, "dashboard", 520)}
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
    <div class="pill-g" style="margin-bottom:28px;">🎁 15 Free Olympiad Papers</div>
    <h1 style="font-size:84px;margin-bottom:20px;">Your child gets<br><span class="gr">15 free</span><br>practice papers.</h1>
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
    <p class="sub" style="margin-top:28px;font-size:24px;">15 papers free first. No card needed.</p>
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
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-w" style="margin-bottom:36px;">⏰ Olympiad Season Alert</div>
    <h1 style="font-size:82px;">August<br>registrations<br>open <span class="g">in weeks.</span></h1>
    <p class="sub" style="margin-top:32px;">Is your school's Olympiad preparation<br>already in place?</p>
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
  `${HEAD}<div class="s dark">${BLOBS}${WM}
    <div class="pill-g" style="margin-bottom:36px;">🏫 For School Coordinators</div>
    <h1 style="font-size:84px;">Your school<br>pays <span class="gr">₹0</span> to<br>get started.</h1>
    <p class="sub" style="margin-top:32px;">We run a free 30-day pilot for schools<br>before Olympiad season. No strings attached.</p>
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

// ── Pick script by day ───────────────────────────────────────────────
const SCRIPTS = [script0, script1, script2, script3, script4, script5, script6, script7, script8, script9, script10, script11, script12, script13, script14];
const day     = parseInt(dateStr.slice(-2), 10);
const SCENES  = SCRIPTS[day % SCRIPTS.length]();
console.log(`using script ${day % SCRIPTS.length} (day=${day})`);

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
