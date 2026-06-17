#!/usr/bin/env node
// Renders a 1080×1080 "Learn" card for Instagram.
// Usage: node generators/generate-learn-image.js <YYYY-MM-DD>
// Output: content/learn/<YYYY-MM-DD>.png

const fs   = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const BANK = require("./learn-bank.js");

const ROOT    = path.resolve(__dirname, "..");
const dateStr = process.argv[2];

if (!dateStr) {
  console.error("Usage: generate-learn-image.js <YYYY-MM-DD>");
  process.exit(1);
}

function pickLearn() {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) h = (h * 31 + dateStr.charCodeAt(i)) >>> 0;
  return BANK[h % BANK.length];
}

const LOGO = "data:image/png;base64," +
  fs.readFileSync(path.join(ROOT, "public", "logo.png")).toString("base64");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const ITEM_COLORS = ["#2563EB","#7c3aed","#10b981","#ef4444","#f59e0b","#06b6d4","#ec4899"];

function htmlHead(color) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#222;}
    .card{
      width:1080px;height:1080px;position:relative;overflow:hidden;
      display:flex;flex-direction:column;padding:72px 80px;
      font-family:'Poppins',sans-serif;color:#0B1430;
      background:#FAFBFF;
    }
    .wm{position:absolute;bottom:-80px;right:-80px;width:560px;height:560px;opacity:.06;pointer-events:none;}
    .topbar{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;margin-bottom:32px;}
    .logo{height:88px;width:auto;display:block;}
    .badge{display:inline-flex;align-items:center;padding:10px 30px;border-radius:100px;
           font-weight:700;font-size:26px;color:#fff;flex-shrink:0;letter-spacing:.3px;}
    .title-section{flex-shrink:0;margin-bottom:30px;}
    .title{
      font-family:'Poppins',sans-serif;font-weight:900;font-size:62px;
      text-transform:uppercase;color:#0B1430;
      white-space:nowrap;letter-spacing:-1.5px;line-height:1;
    }
    .title-bar{height:6px;border-radius:3px;margin-top:14px;width:100%;background:${color};}
    .content{flex:1;display:flex;flex-direction:column;gap:16px;justify-content:center;overflow:hidden;}
    .footer{flex-shrink:0;padding-top:14px;}
    .url{font-size:26px;font-weight:600;color:#9ca3af;}

    /* ── Formula rows ── */
    .frow{display:flex;align-items:center;gap:20px;
          background:#fff;border:2px solid #e6eaf6;border-radius:18px;padding:16px 24px;}
    .fnum{flex:none;width:52px;height:52px;border-radius:12px;
          display:flex;align-items:center;justify-content:center;
          font-size:26px;font-weight:800;color:#fff;}
    .flbl{font-size:28px;font-weight:600;color:#0B1430;flex:1;}
    .fbox{background:#EFF4FF;border-radius:10px;
          padding:8px 18px;font-size:25px;font-weight:700;color:#2563EB;
          white-space:nowrap;font-family:'Courier New',monospace;}

    /* ── Vocab grid ── */
    .vhead-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:8px;flex-shrink:0;}
    .vh{padding:10px 16px;border-radius:12px;font-size:26px;font-weight:800;text-align:center;}
    .vno-h{background:#fee2e2;color:#991b1b;}
    .vyes-h{background:#dcfce7;color:#14532d;}
    .vgrid{display:flex;flex-direction:column;gap:10px;}
    .vrow{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
    .vcell{font-size:27px;padding:12px 18px;background:#fff;border:2px solid #e6eaf6;border-radius:12px;
           font-weight:500;line-height:1.25;}
    .vcell-no{color:#6b7280;border-left:5px solid #fca5a5;}
    .vcell-yes{color:#065f46;font-weight:700;border-left:5px solid #4ade80;}

    /* ── Facts rows ── */
    .fact{display:flex;align-items:flex-start;gap:18px;
          background:#fff;border:2px solid #e6eaf6;border-radius:18px;padding:15px 22px;}
    .ficon{font-size:32px;flex:none;line-height:1.25;}
    .ftext{font-size:26px;font-weight:500;color:#0B1430;line-height:1.35;}
  </style></head><body>`;
}

// ── Templates ────────────────────────────────────────────────────────────────

function formulaCard(item) {
  const title = esc(item.heading).replace(/\n/g, " ");
  const rows = item.items.map((r, i) => `
    <div class="frow">
      <div class="fnum" style="background:${ITEM_COLORS[i % ITEM_COLORS.length]}">${r.n}</div>
      <div class="flbl">${esc(r.label)}</div>
      <div class="fbox">${esc(r.formula)}</div>
    </div>`).join("");

  return `${htmlHead(item.color)}
  <div class="card">
    <img class="wm" src="${LOGO}" alt="">
    <div class="topbar">
      <img class="logo" src="${LOGO}" alt="OlympiadReady">
      <div class="badge" style="background:${item.color}">${esc(item.subject)}</div>
    </div>
    <div class="title-section">
      <div class="title">${title}</div>
      <div class="title-bar"></div>
    </div>
    <div class="content">${rows}</div>
    <div class="footer"><div class="url">olympiadready.com</div></div>
  </div></body></html>`;
}

function vocabCard(item) {
  const title = esc(item.heading).replace(/\n/g, " ");
  const rows = item.items.map(r => `
    <div class="vrow">
      <div class="vcell vcell-no">${esc(r.wrong)}</div>
      <div class="vcell vcell-yes">${esc(r.right)}</div>
    </div>`).join("");

  return `${htmlHead(item.color)}
  <div class="card">
    <img class="wm" src="${LOGO}" alt="">
    <div class="topbar">
      <img class="logo" src="${LOGO}" alt="OlympiadReady">
      <div class="badge" style="background:${item.color}">${esc(item.subject)}</div>
    </div>
    <div class="title-section">
      <div class="title">${title}</div>
      <div class="title-bar"></div>
    </div>
    <div class="content">
      <div class="vhead-row">
        <div class="vh vno-h">❌ Don't Say</div>
        <div class="vh vyes-h">✓ Say This</div>
      </div>
      <div class="vgrid">${rows}</div>
    </div>
    <div class="footer"><div class="url">olympiadready.com</div></div>
  </div></body></html>`;
}

function factsCard(item) {
  const title = esc(item.heading).replace(/\n/g, " ");
  const rows = item.items.map(r => `
    <div class="fact">
      <span class="ficon">${r.icon}</span>
      <span class="ftext">${esc(r.text)}</span>
    </div>`).join("");

  return `${htmlHead(item.color)}
  <div class="card">
    <img class="wm" src="${LOGO}" alt="">
    <div class="topbar">
      <img class="logo" src="${LOGO}" alt="OlympiadReady">
      <div class="badge" style="background:${item.color}">${esc(item.subject)}</div>
    </div>
    <div class="title-section">
      <div class="title">${title}</div>
      <div class="title-bar"></div>
    </div>
    <div class="content">${rows}</div>
    <div class="footer"><div class="url">olympiadready.com</div></div>
  </div></body></html>`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  const item = pickLearn();
  console.log(`[learn] ${item.id}: "${item.heading.replace(/\n/g," ")}"`);

  let html;
  if      (item.type === "formula") html = formulaCard(item);
  else if (item.type === "vocab")   html = vocabCard(item);
  else                              html = factsCard(item);

  const outDir = path.join(ROOT, "content", "learn");
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, `${dateStr}.png`);

  const browser = await chromium.launch();
  const page    = await browser.newPage({
    viewport: { width: 1080, height: 1080 },
    deviceScaleFactor: 2,
  });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: out, clip: { x:0, y:0, width:1080, height:1080 } });
  await browser.close();
  console.log("wrote " + path.relative(ROOT, out));
})();
