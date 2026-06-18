#!/usr/bin/env node
// Renders 1080×1080 "Learn" carousel slides for Instagram.
// Visual design matches the quiz card system (same topbar, Poppins, gradient bg).
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

const LOGO_DARK  = "data:image/png;base64," +
  fs.readFileSync(path.join(ROOT, "public", "logo.png")).toString("base64");

const esc = (s) => String(s)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

// Per-subject second color (dark shade of the main color)
const SHADE = {
  "#0EA5A4": "#0b6f6e",
  "#2563EB": "#1e3fae",
  "#10b981": "#065f46",
  "#8b5cf6": "#5b21b6",
  "#ef4444": "#991b1b",
  "#f59e0b": "#92400e",
};
function shade(color) { return SHADE[color] || "#1a2a5e"; }

// ── Shared HTML head — quiz-card DNA ─────────────────────────────────────────
function head(color) {
  const c2 = shade(color);
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
    body{background:#222;}

    /* ── card shell ── */
    .card{
      width:1080px;height:1080px;position:relative;overflow:hidden;
      display:flex;flex-direction:column;padding:68px 80px 60px;
      background:linear-gradient(170deg,#ffffff 0%,#f3f6ff 100%);
      color:#0B1430;
    }
    .blob{position:absolute;border-radius:50%;filter:blur(2px);opacity:.15;
          width:560px;height:560px;background:${color};top:-190px;right:-160px;}

    /* ── topbar (quiz style) ── */
    .topbar{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
    .wordmark{display:flex;align-items:center;gap:12px;font-weight:900;font-size:32px;letter-spacing:-1px;}
    .wordmark img{height:52px;width:auto;display:block;}
    .wordmark .o{color:#0B1E5B;}
    .wordmark .r{color:#2563EB;}
    .topright{display:flex;flex-direction:column;align-items:flex-end;gap:5px;}
    .badge{display:inline-flex;align-items:center;padding:10px 26px;border-radius:100px;
           font-weight:700;font-size:23px;color:#fff;background:${color};}
    .slide-ctr{font-size:20px;font-weight:600;color:#9ca3af;}

    /* ── title block ── */
    .eyebrow{font-weight:700;font-size:22px;text-transform:uppercase;letter-spacing:3px;
             color:${color};margin-top:32px;}
    .title{font-size:clamp(38px,5.2vw,56px);line-height:1.08;font-weight:900;letter-spacing:-1.5px;
           color:#0B1430;margin-top:10px;text-transform:uppercase;}
    .divider{height:5px;border-radius:3px;width:100%;background:${color};margin-top:16px;}

    /* ── content area ── */
    .content{flex:1;display:flex;flex-direction:column;gap:0;justify-content:center;
             padding-top:22px;}

    /* ── FACTS layout ── */
    .fact-list{display:flex;flex-direction:column;gap:16px;}
    .fact-row{
      display:flex;align-items:flex-start;gap:20px;
      background:#fff;border:2px solid #e8ecf8;border-radius:20px;
      padding:18px 26px;
    }
    .fact-icon{font-size:34px;flex:none;line-height:1.2;margin-top:2px;}
    .fact-text{font-size:27px;font-weight:500;color:#0B1430;line-height:1.38;}

    /* ── VOCAB layout ── */
    .vocab-headers{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px;}
    .vh{padding:10px 16px;border-radius:14px;font-size:24px;font-weight:800;text-align:center;}
    .vh-no{background:#fee2e2;color:#991b1b;}
    .vh-yes{background:#dcfce7;color:#14532d;}
    .vocab-rows{display:flex;flex-direction:column;gap:11px;}
    .vocab-pair{display:grid;grid-template-columns:1fr 1fr;gap:11px;}
    .vc{font-size:27px;padding:14px 20px;background:#fff;border:2px solid #e8ecf8;border-radius:14px;
        font-weight:500;line-height:1.2;}
    .vc-no{color:#6b7280;border-left:6px solid #fca5a5;}
    .vc-yes{color:#065f46;font-weight:700;border-left:6px solid #4ade80;}

    /* ── FORMULA layout ── */
    .formula-list{display:flex;flex-direction:column;gap:13px;}
    .fml-row{
      display:flex;align-items:center;gap:20px;
      background:#fff;border:2px solid #e8ecf8;border-radius:20px;
      padding:16px 24px;
    }
    .fml-num{
      flex:none;width:50px;height:50px;border-radius:13px;
      display:flex;align-items:center;justify-content:center;
      font-size:24px;font-weight:800;color:#fff;background:${color};
    }
    .fml-label{font-size:27px;font-weight:600;color:#0B1430;flex:1;}
    .fml-box{
      background:#EFF4FF;border-radius:12px;
      padding:8px 20px;font-size:24px;font-weight:700;color:${color};
      white-space:nowrap;font-family:'Courier New',monospace;flex:none;
    }

    /* ── footer ── */
    .footer{flex-shrink:0;padding-top:14px;display:flex;align-items:center;justify-content:space-between;}
    .footer-url{font-size:23px;font-weight:600;color:#9ca3af;}
    .footer-swipe{font-size:22px;font-weight:800;color:${color};}
  </style></head><body>`;
}

// ── Topbar helper ─────────────────────────────────────────────────────────────
function topbarHtml(pack, slideNum, totalSlides) {
  return `
    <div class="topbar">
      <div class="wordmark">
        <img src="${LOGO_DARK}" alt="">
        <span class="o">Olympiad</span><span class="r">Ready</span>
      </div>
      <div class="topright">
        <div class="badge">${esc(pack.subject)}</div>
        <div class="slide-ctr">${slideNum} / ${totalSlides}</div>
      </div>
    </div>`;
}

function titleHtml(slide, pack) {
  const heading = esc(slide.heading).replace(/\n/g, " ");
  return `
    <div class="eyebrow">📖 Learn with OlympiadReady</div>
    <div class="title">${heading}</div>
    <div class="divider"></div>`;
}

function footerHtml(pack, slideNum, totalSlides) {
  const isLast = slideNum === totalSlides;
  if (isLast) {
    return `<div class="footer"><div class="footer-url">olympiadready.com</div><div class="footer-url" style="color:#0B1430;font-weight:700;">Follow for daily lessons 📚</div></div>`;
  }
  return `<div class="footer"><div class="footer-url">olympiadready.com</div><div class="footer-swipe">Swipe for more →</div></div>`;
}

// ── Slide HTML builders ───────────────────────────────────────────────────────

function factsSlide(pack, slide, slideNum, totalSlides) {
  const items = slide.items.map(r => `
    <div class="fact-row">
      <span class="fact-icon">${r.icon}</span>
      <span class="fact-text">${esc(r.text)}</span>
    </div>`).join("");

  return `${head(pack.color)}
  <div class="card">
    <div class="blob"></div>
    ${topbarHtml(pack, slideNum, totalSlides)}
    ${titleHtml(slide, pack)}
    <div class="content">
      <div class="fact-list">${items}</div>
    </div>
    ${footerHtml(pack, slideNum, totalSlides)}
  </div></body></html>`;
}

function vocabSlide(pack, slide, slideNum, totalSlides) {
  const pairs = slide.items.map(r => `
    <div class="vocab-pair">
      <div class="vc vc-no">${esc(r.wrong)}</div>
      <div class="vc vc-yes">${esc(r.right)}</div>
    </div>`).join("");

  return `${head(pack.color)}
  <div class="card">
    <div class="blob"></div>
    ${topbarHtml(pack, slideNum, totalSlides)}
    ${titleHtml(slide, pack)}
    <div class="content">
      <div class="vocab-headers">
        <div class="vh vh-no">❌ Don't Say</div>
        <div class="vh vh-yes">✓ Say This</div>
      </div>
      <div class="vocab-rows">${pairs}</div>
    </div>
    ${footerHtml(pack, slideNum, totalSlides)}
  </div></body></html>`;
}

function formulaSlide(pack, slide, slideNum, totalSlides) {
  const NUM_COLORS = ["#2563EB","#7c3aed","#10b981","#ef4444","#f59e0b","#06b6d4","#ec4899"];
  const rows = slide.items.map((r, i) => `
    <div class="fml-row">
      <div class="fml-num" style="background:${NUM_COLORS[i % NUM_COLORS.length]}">${r.n}</div>
      <div class="fml-label">${esc(r.label)}</div>
      <div class="fml-box">${esc(r.formula)}</div>
    </div>`).join("");

  return `${head(pack.color)}
  <div class="card">
    <div class="blob"></div>
    ${topbarHtml(pack, slideNum, totalSlides)}
    ${titleHtml(slide, pack)}
    <div class="content">
      <div class="formula-list">${rows}</div>
    </div>
    ${footerHtml(pack, slideNum, totalSlides)}
  </div></body></html>`;
}

function buildSlideHtml(pack, slide, slideNum, totalSlides) {
  if      (slide.type === "formula") return formulaSlide(pack, slide, slideNum, totalSlides);
  else if (slide.type === "vocab")   return vocabSlide(pack, slide, slideNum, totalSlides);
  else                               return factsSlide(pack, slide, slideNum, totalSlides);
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  const pack  = pickPack();
  const total = pack.slides.length;
  console.log(`[learn] ${pack.id}: ${pack.subject} — ${total} slides`);

  const outDir = path.join(ROOT, "content", "learn");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();

  for (let i = 0; i < total; i++) {
    const slideNum = i + 1;
    const slide    = pack.slides[i];
    const html     = buildSlideHtml(pack, slide, slideNum, total);

    const page = await browser.newPage({
      viewport: { width: 1080, height: 1080 },
      deviceScaleFactor: 2,
    });
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    const outFile = path.join(outDir, `${dateStr}-slide-${slideNum}.png`);
    await page.screenshot({ path: outFile, clip: { x:0, y:0, width:1080, height:1080 } });
    await page.close();
    console.log(`  slide ${slideNum}/${total}: ${path.relative(ROOT, outFile)}`);
  }

  await browser.close();

  const meta = { subject: pack.subject, color: pack.color, slideCount: total };
  fs.writeFileSync(path.join(outDir, `${dateStr}-meta.json`), JSON.stringify(meta, null, 2));
  console.log(`[learn] done — ${total} slides for ${pack.subject}`);
})();
