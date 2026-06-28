#!/usr/bin/env node
// Renders 1080×1080 blog-recap carousel slides for Instagram.
// Design: same quiz-card DNA (Poppins, white gradient, topbar with logo).
// Slide 1: hook headline. Slides 2–N: key takeaway cards. Last slide: CTA.
// Usage:  node generators/generate-blog-image.js <YYYY-MM-DD>
// Output: content/blog/<YYYY-MM-DD>-slide-1.png … -slide-N.png
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

const LOGO_DARK = "data:image/png;base64," +
  fs.readFileSync(path.join(ROOT, "public", "logo.png")).toString("base64");

const esc = (s) => String(s)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

const SHADE = {
  "#0EA5A4": "#0b6f6e",
  "#2563EB": "#1e3fae",
  "#10b981": "#065f46",
  "#8b5cf6": "#5b21b6",
  "#ef4444": "#991b1b",
  "#f59e0b": "#92400e",
};
function shade(color) { return SHADE[color] || "#1a2a5e"; }

// ── Shared CSS head ────────────────────────────────────────────────────────────
function head(color) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
    body{background:#222;}
    .card{
      width:1080px;height:1080px;position:relative;overflow:hidden;
      display:flex;flex-direction:column;padding:68px 80px 60px;
      background:linear-gradient(170deg,#ffffff 0%,#f3f6ff 100%);
      color:#0B1430;
    }
    .blob{position:absolute;border-radius:50%;filter:blur(2px);opacity:.15;
          width:560px;height:560px;background:${color};top:-190px;right:-160px;}

    /* topbar */
    .topbar{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
    .wordmark{display:flex;align-items:center;gap:12px;font-weight:900;font-size:32px;letter-spacing:-1px;}
    .wordmark img{height:52px;width:auto;display:block;}
    .wordmark .o{color:#0B1E5B;}
    .wordmark .r{color:#2563EB;}
    .topright{display:flex;flex-direction:column;align-items:flex-end;gap:5px;}
    .badge{display:inline-flex;align-items:center;padding:10px 26px;border-radius:100px;
           font-weight:700;font-size:22px;color:#fff;background:${color};}
    .slide-ctr{font-size:20px;font-weight:600;color:#9ca3af;}

    /* hook slide */
    .hook-content{flex:1;display:flex;flex-direction:column;justify-content:center;}
    .hook-eyebrow{font-size:22px;font-weight:700;text-transform:uppercase;letter-spacing:3px;
                  color:${color};margin-top:32px;}
    .hook-headline{font-size:clamp(42px,5.6vw,62px);line-height:1.06;font-weight:900;
                   letter-spacing:-1.5px;color:#0B1430;margin-top:14px;}
    .hook-sub{font-size:27px;font-weight:500;color:#475569;margin-top:22px;line-height:1.4;}
    .hook-divider{height:5px;border-radius:3px;width:100%;background:${color};margin-top:24px;}
    .hook-swipe{font-size:22px;font-weight:800;color:${color};margin-top:18px;}

    /* takeaway slides */
    .eyebrow{font-weight:700;font-size:22px;text-transform:uppercase;letter-spacing:3px;
             color:${color};margin-top:32px;}
    .slide-title{font-size:clamp(32px,4.2vw,44px);line-height:1.1;font-weight:900;
                 letter-spacing:-1px;color:#0B1430;margin-top:8px;}
    .divider{height:5px;border-radius:3px;width:100%;background:${color};margin-top:14px;}
    .fact-list{display:flex;flex-direction:column;gap:16px;margin-top:22px;flex:1;justify-content:center;}
    .fact-row{
      display:flex;align-items:flex-start;gap:20px;
      background:#fff;border:2px solid #e8ecf8;border-radius:20px;
      padding:20px 28px;
    }
    .fact-icon{font-size:36px;flex:none;line-height:1.2;margin-top:2px;}
    .fact-text{font-size:26px;font-weight:500;color:#0B1430;line-height:1.4;}

    /* CTA slide */
    .cta-content{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;
                 text-align:center;gap:0;}
    .cta-emoji{font-size:90px;margin-bottom:20px;}
    .cta-headline{font-size:52px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;color:#0B1430;}
    .cta-headline span{color:${color};}
    .cta-sub{font-size:26px;font-weight:500;color:#475569;margin-top:18px;line-height:1.4;max-width:840px;}
    .cta-pill{margin-top:36px;display:inline-flex;align-items:center;padding:18px 52px;
              border-radius:100px;font-weight:800;font-size:28px;color:#fff;background:${color};}
    .cta-url{margin-top:20px;font-size:22px;font-weight:600;color:#9ca3af;}

    /* footer */
    .footer{flex-shrink:0;padding-top:14px;display:flex;align-items:center;justify-content:space-between;}
    .footer-url{font-size:23px;font-weight:600;color:#9ca3af;}
    .footer-swipe{font-size:22px;font-weight:800;color:${color};}
  </style></head><body>`;
}

function topbarHtml(post, slideNum, totalSlides) {
  return `
    <div class="topbar">
      <div class="wordmark">
        <img src="${LOGO_DARK}" alt="">
        <span class="o">Olympiad</span><span class="r">Ready</span>
      </div>
      <div class="topright">
        <div class="badge">${esc(post.tag)}</div>
        <div class="slide-ctr">${slideNum} / ${totalSlides}</div>
      </div>
    </div>`;
}

// ── Slide 1: Hook ─────────────────────────────────────────────────────────────
function hookSlide(post, totalSlides) {
  return `${head(post.color)}
  <div class="card">
    <div class="blob"></div>
    ${topbarHtml(post, 1, totalSlides)}
    <div class="hook-content">
      <div class="hook-eyebrow">📰 Blog Recap</div>
      <div class="hook-headline">${esc(post.hook)}</div>
      <div class="hook-sub">${esc(post.title)}</div>
      <div class="hook-divider"></div>
      <div class="hook-swipe">Swipe for the key points →</div>
    </div>
  </div></body></html>`;
}

// ── Slide 2: Key Takeaways ────────────────────────────────────────────────────
function takeawaySlide(post, totalSlides) {
  const items = post.slides.map(s => `
    <div class="fact-row">
      <span class="fact-icon">${s.icon}</span>
      <span class="fact-text">${esc(s.text)}</span>
    </div>`).join("");

  return `${head(post.color)}
  <div class="card">
    <div class="blob"></div>
    ${topbarHtml(post, 2, totalSlides)}
    <div class="eyebrow">✨ Key Takeaways</div>
    <div class="slide-title">${esc(post.title)}</div>
    <div class="divider"></div>
    <div class="fact-list">${items}</div>
    <div class="footer">
      <div class="footer-url">olympiadready.com/blog</div>
      <div class="footer-swipe">Read the full guide →</div>
    </div>
  </div></body></html>`;
}

// ── Slide 3: CTA ──────────────────────────────────────────────────────────────
function ctaSlide(post, totalSlides) {
  return `${head(post.color)}
  <div class="card">
    <div class="blob"></div>
    ${topbarHtml(post, 3, totalSlides)}
    <div class="cta-content">
      <div class="cta-emoji">📖</div>
      <div class="cta-headline">Read the <span>full guide</span><br>on our blog</div>
      <div class="cta-sub">olympiadready.com/blog/${esc(post.slug)}</div>
      <div class="cta-pill">Practice Free Today</div>
      <div class="cta-url">olympiadready.com · free for all students</div>
    </div>
  </div></body></html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  const post  = pickPost();
  const slides = [
    hookSlide(post, 3),
    takeawaySlide(post, 3),
    ctaSlide(post, 3),
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
