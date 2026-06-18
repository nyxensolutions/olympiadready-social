#!/usr/bin/env node
// Renders 1080×1080 "Learn" carousel slides for Instagram.
// Usage: node generators/generate-learn-image.js <YYYY-MM-DD>
// Output: content/learn/<YYYY-MM-DD>-slide-1.png … -slide-N.png
//         content/learn/<YYYY-MM-DD>-meta.json  (subject, slideCount)

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

function pickPack() {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) h = (h * 31 + dateStr.charCodeAt(i)) >>> 0;
  return BANK[h % BANK.length];
}

const LOGO = "data:image/png;base64," +
  fs.readFileSync(path.join(ROOT, "public", "logo.png")).toString("base64");

const esc = (s) => String(s)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

const ITEM_COLORS = ["#2563EB","#7c3aed","#10b981","#ef4444","#f59e0b","#06b6d4","#ec4899"];

// ── CSS shared across all slides ─────────────────────────────────────────────
function htmlHead(color) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#222;}
    .card{
      width:1080px;height:1080px;position:relative;overflow:hidden;
      display:flex;flex-direction:column;padding:62px 80px 56px;
      font-family:'Poppins',sans-serif;color:#0B1430;
      background:#FAFBFF;
    }
    .wm{position:absolute;bottom:-80px;right:-80px;width:560px;height:560px;opacity:.06;pointer-events:none;}
    .topbar{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;margin-bottom:28px;}
    .logo{height:80px;width:auto;display:block;}
    .topright{display:flex;flex-direction:column;align-items:flex-end;gap:6px;}
    .badge{display:inline-flex;align-items:center;padding:8px 26px;border-radius:100px;
           font-weight:700;font-size:24px;color:#fff;letter-spacing:.3px;}
    .slide-ctr{font-size:21px;font-weight:600;color:#9ca3af;text-align:right;}
    .title-section{flex-shrink:0;margin-bottom:26px;}
    .title{
      font-family:'Poppins',sans-serif;font-weight:900;font-size:58px;
      text-transform:uppercase;color:#0B1430;
      white-space:nowrap;letter-spacing:-1.5px;line-height:1;
    }
    .title-bar{height:6px;border-radius:3px;margin-top:12px;width:100%;background:${color};}
    .content{flex:1;display:flex;flex-direction:column;gap:14px;justify-content:center;overflow:hidden;}
    .footer{flex-shrink:0;padding-top:12px;display:flex;align-items:center;justify-content:space-between;}
    .url{font-size:24px;font-weight:600;color:#9ca3af;}
    .swipe{font-size:22px;font-weight:700;color:${color};}

    /* ── Formula rows ── */
    .frow{display:flex;align-items:center;gap:18px;
          background:#fff;border:2px solid #e6eaf6;border-radius:16px;padding:14px 22px;}
    .fnum{flex:none;width:48px;height:48px;border-radius:11px;
          display:flex;align-items:center;justify-content:center;
          font-size:24px;font-weight:800;color:#fff;}
    .flbl{font-size:26px;font-weight:600;color:#0B1430;flex:1;}
    .fbox{background:#EFF4FF;border-radius:10px;
          padding:7px 16px;font-size:23px;font-weight:700;color:#2563EB;
          white-space:nowrap;font-family:'Courier New',monospace;}

    /* ── Vocab grid ── */
    .vhead-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:6px;flex-shrink:0;}
    .vh{padding:9px 14px;border-radius:11px;font-size:24px;font-weight:800;text-align:center;}
    .vno-h{background:#fee2e2;color:#991b1b;}
    .vyes-h{background:#dcfce7;color:#14532d;}
    .vgrid{display:flex;flex-direction:column;gap:9px;}
    .vrow{display:grid;grid-template-columns:1fr 1fr;gap:9px;}
    .vcell{font-size:25px;padding:11px 16px;background:#fff;border:2px solid #e6eaf6;border-radius:11px;
           font-weight:500;line-height:1.25;}
    .vcell-no{color:#6b7280;border-left:5px solid #fca5a5;}
    .vcell-yes{color:#065f46;font-weight:700;border-left:5px solid #4ade80;}

    /* ── Facts rows ── */
    .fact{display:flex;align-items:flex-start;gap:16px;
          background:#fff;border:2px solid #e6eaf6;border-radius:16px;padding:13px 20px;}
    .ficon{font-size:30px;flex:none;line-height:1.25;}
    .ftext{font-size:24px;font-weight:500;color:#0B1430;line-height:1.35;}
  </style></head><body>`;
}

// ── Slide builder helpers ─────────────────────────────────────────────────────

function topbar(pack, slideNum, totalSlides) {
  return `
    <div class="topbar">
      <img class="logo" src="${LOGO}" alt="OlympiadReady">
      <div class="topright">
        <div class="badge" style="background:${pack.color}">${esc(pack.subject)}</div>
        <div class="slide-ctr">${slideNum} / ${totalSlides}</div>
      </div>
    </div>`;
}

function footer(pack, isLast) {
  const right = isLast
    ? `<div class="url">olympiadready.com</div>`
    : `<div class="swipe">Swipe for more →</div>`;
  return `<div class="footer"><div class="url">olympiadready.com</div>${right}</div>`;
}

function formulaSlide(pack, slide, slideNum, totalSlides) {
  const title = esc(slide.heading).replace(/\n/g, " ");
  const rows = slide.items.map((r, i) => `
    <div class="frow">
      <div class="fnum" style="background:${ITEM_COLORS[i % ITEM_COLORS.length]}">${r.n}</div>
      <div class="flbl">${esc(r.label)}</div>
      <div class="fbox">${esc(r.formula)}</div>
    </div>`).join("");
  return `${htmlHead(pack.color)}
  <div class="card">
    <img class="wm" src="${LOGO}" alt="">
    ${topbar(pack, slideNum, totalSlides)}
    <div class="title-section">
      <div class="title">${title}</div>
      <div class="title-bar"></div>
    </div>
    <div class="content">${rows}</div>
    ${footer(pack, slideNum === totalSlides)}
  </div></body></html>`;
}

function vocabSlide(pack, slide, slideNum, totalSlides) {
  const title = esc(slide.heading).replace(/\n/g, " ");
  const rows = slide.items.map(r => `
    <div class="vrow">
      <div class="vcell vcell-no">${esc(r.wrong)}</div>
      <div class="vcell vcell-yes">${esc(r.right)}</div>
    </div>`).join("");
  return `${htmlHead(pack.color)}
  <div class="card">
    <img class="wm" src="${LOGO}" alt="">
    ${topbar(pack, slideNum, totalSlides)}
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
    ${footer(pack, slideNum === totalSlides)}
  </div></body></html>`;
}

function factsSlide(pack, slide, slideNum, totalSlides) {
  const title = esc(slide.heading).replace(/\n/g, " ");
  const rows = slide.items.map(r => `
    <div class="fact">
      <span class="ficon">${r.icon}</span>
      <span class="ftext">${esc(r.text)}</span>
    </div>`).join("");
  return `${htmlHead(pack.color)}
  <div class="card">
    <img class="wm" src="${LOGO}" alt="">
    ${topbar(pack, slideNum, totalSlides)}
    <div class="title-section">
      <div class="title">${title}</div>
      <div class="title-bar"></div>
    </div>
    <div class="content">${rows}</div>
    ${footer(pack, slideNum === totalSlides)}
  </div></body></html>`;
}

function buildSlideHtml(pack, slide, slideNum, totalSlides) {
  if      (slide.type === "formula") return formulaSlide(pack, slide, slideNum, totalSlides);
  else if (slide.type === "vocab")   return vocabSlide(pack, slide, slideNum, totalSlides);
  else                               return factsSlide(pack, slide, slideNum, totalSlides);
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  const pack = pickPack();
  const total = pack.slides.length;
  console.log(`[learn] ${pack.id}: ${pack.subject} — ${total} slides`);

  const outDir = path.join(ROOT, "content", "learn");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const outPaths = [];

  for (let i = 0; i < total; i++) {
    const slideNum = i + 1;
    const slide = pack.slides[i];
    const html  = buildSlideHtml(pack, slide, slideNum, total);

    const page = await browser.newPage({
      viewport: { width: 1080, height: 1080 },
      deviceScaleFactor: 2,
    });
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    const outFile = path.join(outDir, `${dateStr}-slide-${slideNum}.png`);
    await page.screenshot({ path: outFile, clip: { x:0, y:0, width:1080, height:1080 } });
    await page.close();

    outPaths.push(outFile);
    console.log(`  wrote slide ${slideNum}/${total}: ${path.relative(ROOT, outFile)}`);
  }

  await browser.close();

  // Write meta so the poster knows subject and slide count without re-parsing the bank
  const meta = { subject: pack.subject, color: pack.color, slideCount: total };
  fs.writeFileSync(path.join(outDir, `${dateStr}-meta.json`), JSON.stringify(meta, null, 2));
  console.log(`[learn] done — ${total} slides for ${pack.subject}`);
})();
