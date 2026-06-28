#!/usr/bin/env node
// Renders 1080×1080 blog-recap carousel slides for Instagram.
// Design: dark navy editorial — visually distinct from white quiz/learn/DYK cards.
// Slide 1: hook headline. Slide 2: key takeaways. Slide 3: CTA.
// Usage:  node generators/generate-blog-image.js <YYYY-MM-DD>
// Output: content/blog/<YYYY-MM-DD>-slide-1.png … -slide-3.png
//         content/blog/<YYYY-MM-DD>-meta.json  (slug, slideCount)

const fs   = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const BANK = require("./blog-bank.js");

const ROOT    = path.resolve(__dirname, "..");
const dateStr = process.argv[2];

if (!dateStr) {
  console.error("Usage: generate-blog-image.js <YYYY-MM-DD>");
  process.exit(1);
}

function pickPost() {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) h = (h * 31 + dateStr.charCodeAt(i)) >>> 0;
  return BANK[h % BANK.length];
}

// Light logo for dark background cards
const LOGO_LIGHT = "data:image/png;base64," +
  fs.readFileSync(path.join(ROOT, "public", "logo-light.png")).toString("base64");

const esc = (s) => String(s)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

// ── Shared CSS head — dark editorial design ───────────────────────────────────
function head(color) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
    body{background:#000;}

    /* ── card shell — dark navy ── */
    .card{
      width:1080px;height:1080px;position:relative;overflow:hidden;
      display:flex;flex-direction:column;
      padding:52px 72px 56px;
      background:#050F33;
      color:#F0F4FF;
    }
    /* subtle radial glow from accent color */
    .glow{
      position:absolute;border-radius:50%;
      width:680px;height:680px;
      background:${color};
      opacity:0.08;
      top:-200px;right:-200px;
      filter:blur(0px);
      pointer-events:none;
    }

    /* ── topbar ── */
    .topbar{
      display:flex;align-items:center;justify-content:space-between;
      flex-shrink:0;position:relative;z-index:2;
      padding-bottom:36px;
      border-bottom:1.5px solid rgba(255,255,255,0.10);
    }
    .wordmark{display:flex;align-items:center;gap:16px;}
    .wordmark img{height:54px;width:auto;display:block;}
    .wm-text{font-weight:900;font-size:34px;letter-spacing:-1px;line-height:1;}
    .wm-text .o{color:#F0F4FF;}
    .wm-text .r{color:${color};}
    .slide-ctr{font-size:22px;font-weight:600;color:rgba(255,255,255,0.35);}

    /* ── content area ── */
    .content{flex:1;display:flex;flex-direction:column;position:relative;z-index:2;}

    /* ── hook slide ── */
    .hook-body{flex:1;display:flex;flex-direction:column;justify-content:center;padding-top:48px;}
    .hook-pill{
      display:inline-flex;align-items:center;gap:12px;
      background:rgba(255,255,255,0.08);
      border:1px solid rgba(255,255,255,0.14);
      border-radius:100px;padding:12px 28px;
      font-size:24px;font-weight:700;color:rgba(255,255,255,0.65);
      width:fit-content;
    }
    .hook-pill-dot{width:10px;height:10px;border-radius:50%;background:${color};flex-shrink:0;}
    .hook-headline{
      font-size:72px;line-height:1.06;font-weight:900;
      letter-spacing:-2px;color:#F0F4FF;
      margin-top:36px;
    }
    .hook-headline em{color:${color};font-style:normal;}
    .hook-sub{
      font-size:32px;font-weight:500;
      color:rgba(255,255,255,0.55);
      margin-top:28px;line-height:1.4;
    }
    .hook-swipe{
      margin-top:48px;font-size:26px;font-weight:700;
      color:${color};display:flex;align-items:center;gap:10px;
    }

    /* ── takeaway slide ── */
    .ta-eyebrow{
      margin-top:40px;font-size:22px;font-weight:700;
      text-transform:uppercase;letter-spacing:4px;
      color:${color};
    }
    .ta-title{
      font-size:46px;line-height:1.1;font-weight:900;
      letter-spacing:-1px;color:#F0F4FF;
      margin-top:10px;
    }
    .ta-rule{
      height:2px;border-radius:1px;
      background:linear-gradient(to right,${color},transparent);
      margin:24px 0;
    }
    .fact-list{display:flex;flex-direction:column;gap:18px;flex:1;justify-content:center;}
    .fact-row{
      display:flex;align-items:flex-start;gap:24px;
      background:rgba(255,255,255,0.05);
      border:1px solid rgba(255,255,255,0.10);
      border-radius:20px;padding:22px 30px;
    }
    .fact-icon{font-size:38px;flex:none;line-height:1.2;margin-top:2px;}
    .fact-text{font-size:28px;font-weight:500;color:#E8EEFF;line-height:1.42;}
    .footer-ta{
      flex-shrink:0;padding-top:22px;
      display:flex;align-items:center;justify-content:space-between;
    }
    .footer-url{font-size:22px;font-weight:600;color:rgba(255,255,255,0.30);}
    .footer-swipe{font-size:22px;font-weight:800;color:${color};}

    /* ── CTA slide ── */
    .cta-body{
      flex:1;display:flex;flex-direction:column;
      justify-content:center;align-items:center;text-align:center;
      padding-top:40px;
    }
    .cta-icon{font-size:96px;margin-bottom:28px;}
    .cta-headline{
      font-size:64px;font-weight:900;line-height:1.08;
      letter-spacing:-2px;color:#F0F4FF;
    }
    .cta-headline em{color:${color};font-style:normal;}
    .cta-blog-url{
      font-size:26px;font-weight:600;
      color:rgba(255,255,255,0.50);
      margin-top:22px;line-height:1.4;
      max-width:860px;
    }
    .cta-pill{
      margin-top:48px;
      display:inline-flex;align-items:center;padding:22px 64px;
      border-radius:100px;font-weight:800;font-size:30px;
      color:#050F33;background:${color};
    }
    .cta-tagline{
      margin-top:22px;font-size:22px;font-weight:600;
      color:rgba(255,255,255,0.28);
    }
  </style></head><body>`;
}

function topbarHtml(slideNum) {
  return `
    <div class="topbar">
      <div class="wordmark">
        <img src="${LOGO_LIGHT}" alt="">
        <div class="wm-text"><span class="o">Olympiad</span><span class="r">Ready</span></div>
      </div>
      <div class="slide-ctr">${slideNum} / 3</div>
    </div>`;
}

// ── Slide 1: Hook ─────────────────────────────────────────────────────────────
function hookSlide(post) {
  // Split hook at first sentence for emphasis
  const hookParts = post.hook.split(/(\.)\s+/);
  const hookHtml  = esc(post.hook)
    .replace(/&amp;/g, "&amp;")  // keep entities
    .replace(/([\w\s,]+)(—|is where|is when|is the|doesn't|isn't|are)/i,
      (_, a, b) => `${a}<em>${b}</em>`);

  return `${head(post.color)}
  <div class="card">
    <div class="glow"></div>
    ${topbarHtml(1)}
    <div class="content">
      <div class="hook-body">
        <div class="hook-pill">
          <div class="hook-pill-dot"></div>
          Blog Recap
        </div>
        <div class="hook-headline">${esc(post.hook)}</div>
        <div class="hook-sub">${esc(post.title)}</div>
        <div class="hook-swipe">Swipe for key points →</div>
      </div>
    </div>
  </div></body></html>`;
}

// ── Slide 2: Key Takeaways ────────────────────────────────────────────────────
function takeawaySlide(post) {
  const items = post.slides.map(s => `
    <div class="fact-row">
      <span class="fact-icon">${s.icon}</span>
      <span class="fact-text">${esc(s.text)}</span>
    </div>`).join("");

  return `${head(post.color)}
  <div class="card">
    <div class="glow"></div>
    ${topbarHtml(2)}
    <div class="content">
      <div class="ta-eyebrow">✦ Key Takeaways</div>
      <div class="ta-title">${esc(post.title)}</div>
      <div class="ta-rule"></div>
      <div class="fact-list">${items}</div>
      <div class="footer-ta">
        <div class="footer-url">olympiadready.com/blog</div>
        <div class="footer-swipe">Read the full guide →</div>
      </div>
    </div>
  </div></body></html>`;
}

// ── Slide 3: CTA ──────────────────────────────────────────────────────────────
function ctaSlide(post) {
  return `${head(post.color)}
  <div class="card">
    <div class="glow"></div>
    ${topbarHtml(3)}
    <div class="content">
      <div class="cta-body">
        <div class="cta-icon">📖</div>
        <div class="cta-headline">Read the <em>full guide</em><br>on our blog</div>
        <div class="cta-blog-url">olympiadready.com/blog/${esc(post.slug)}</div>
        <div class="cta-pill">Practice Free Today</div>
        <div class="cta-tagline">olympiadready.com · free for all students</div>
      </div>
    </div>
  </div></body></html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  const post   = pickPost();
  const slides = [
    hookSlide(post),
    takeawaySlide(post),
    ctaSlide(post),
  ];
  console.log(`[blog] ${post.id}: "${post.title}" — 3 slides`);

  const outDir = path.join(ROOT, "content", "blog");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();

  for (let i = 0; i < slides.length; i++) {
    const slideNum = i + 1;
    const page = await browser.newPage({
      viewport: { width: 1080, height: 1080 },
      deviceScaleFactor: 2,
    });
    await page.setContent(slides[i], { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    const outFile = path.join(outDir, `${dateStr}-slide-${slideNum}.png`);
    await page.screenshot({ path: outFile, clip: { x: 0, y: 0, width: 1080, height: 1080 } });
    await page.close();
    console.log(`  slide ${slideNum}/3: ${path.relative(ROOT, outFile)}`);
  }

  await browser.close();

  const meta = { slug: post.slug, title: post.title, color: post.color,
                 audience: post.audience, slideCount: 3 };
  fs.writeFileSync(path.join(outDir, `${dateStr}-meta.json`), JSON.stringify(meta, null, 2));
  console.log(`[blog] done — 3 slides for "${post.title}"`);
})();
