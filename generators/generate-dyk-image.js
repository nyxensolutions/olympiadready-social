#!/usr/bin/env node
/**
 * Generates a 1080×1080 "Did You Know?" card.
 *
 * Usage:
 *   node generate-dyk-image.js <YYYY-MM-DD> <morning|evening>
 *
 * Output:
 *   content/dyk/<YYYY-MM-DD>-<morning|evening>.png
 *
 * Images are picked deterministically by date+slot from doyouknow/
 * No background removal needed — the card background matches the photo bg.
 */

const fs   = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT   = path.resolve(__dirname, "..");
const FACTS  = require("./dyk-bank.js");

const [dateStr, slot] = process.argv.slice(2);
if (!dateStr || !["morning","evening"].includes(slot)) {
  console.error("Usage: generate-dyk-image.js <YYYY-MM-DD> <morning|evening>");
  process.exit(1);
}

// ── Image catalogue ───────────────────────────────────────────────────────────
// side: "left"  → photo on LEFT,  fact text on RIGHT
// side: "right" → photo on RIGHT, fact text on LEFT
// bg: dominant background colour of the photo (used as card base colour)
// pos: CSS object-position for the <img>
const ALL_IMAGES = [
  { file:"left1.jpg",  side:"left",  bg:"#e0e0e0", pos:"35% top"    },
  { file:"left2.jpg",  side:"left",  bg:"#dadada", pos:"center top"  },
  { file:"left3.JPG",  side:"left",  bg:"#f2f2f2", pos:"40% top"    },
  { file:"right1.jpg", side:"right", bg:"#282828", pos:"center top"  },
  { file:"right2.jpg", side:"right", bg:"#f5f5f5", pos:"center top"  },
  { file:"right3.jpg", side:"right", bg:"#a8cde0", pos:"80% center" },
  { file:"right4.JPG", side:"right", bg:"#f2d4a4", pos:"center top"  },
  { file:"right5.jpg", side:"right", bg:"#f5c200", pos:"center top"  },
  { file:"right6.JPG", side:"right", bg:"#a8c8e8", pos:"center top"  },
];

// ── Deterministic picks ──────────────────────────────────────────────────────
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function pickFact() {
  const h = hash(dateStr + "::dyk::" + slot);
  return FACTS[h % FACTS.length];
}

function pickImage() {
  // FORCE_IMG=filename.jpg env var lets you preview a specific image (dev only)
  if (process.env.FORCE_IMG) {
    return ALL_IMAGES.find(i => i.file === process.env.FORCE_IMG) || ALL_IMAGES[0];
  }
  const h = hash(dateStr + "::dyk-img::" + slot);
  return ALL_IMAGES[h % ALL_IMAGES.length];
}

const FACT  = pickFact();
const IMG   = pickImage();

// ── Assets ──────────────────────────────────────────────────────────────────
const LOGO_DARK  = "data:image/png;base64," +
  fs.readFileSync(path.join(ROOT, "public", "logo.png")).toString("base64");

// Load the chosen photo as base64
const imgExt  = IMG.file.split(".").pop().toLowerCase();
const mimeMap = { jpg:"jpeg", jpeg:"jpeg", png:"png", webp:"webp" };
const mime    = "image/" + (mimeMap[imgExt] || "jpeg");
const photoB64 = fs.readFileSync(
  path.join(ROOT, "doyouknow", IMG.file)
).toString("base64");
const PHOTO_URL = `data:${mime};base64,${photoB64}`;

const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

// ── Category colours ─────────────────────────────────────────────────────────
const CAT_COLORS = {
  Science:   { accent:"#059669", pill:"rgba(5,150,105,.12)",  text:"#059669"  },
  Maths:     { accent:"#2563EB", pill:"rgba(37,99,235,.12)",  text:"#2563EB"  },
  History:   { accent:"#b45309", pill:"rgba(180,83,9,.12)",   text:"#b45309"  },
  Geography: { accent:"#0891b2", pill:"rgba(8,145,178,.12)",  text:"#0891b2"  },
  GK:        { accent:"#7c3aed", pill:"rgba(124,58,237,.12)", text:"#7c3aed"  },
};
const cat = CAT_COLORS[FACT.category] || CAT_COLORS.GK;

// ── Layout helpers ───────────────────────────────────────────────────────────
const isLeft  = IMG.side === "left";  // photo on left,  text on right
const isRight = IMG.side === "right"; // photo on right, text on left

// Text panel width: 640px, photo panel fills its side
// Diagonal: text panel edge leans into photo side by ~60px
const TEXT_W  = 660;   // px – width of the white text panel div
const DIAG    = 64;    // px – how far the diagonal leans
const PHOTO_W = 1080 - TEXT_W + DIAG + 20; // slight overlap behind diagonal

// clip-path for the white text panel
// left-person → text on RIGHT → diagonal on LEFT edge
// right-person → text on LEFT → diagonal on RIGHT edge
const textClip = isLeft
  ? `polygon(${DIAG}px 0%, 100% 0%, 100% 100%, 0% 100%)`   // text right, diagonal left edge
  : `polygon(0% 0%, 100% 0%, calc(100% - ${DIAG}px) 100%, 0% 100%)`; // text left, diagonal right edge

const textPanelLeft  = isLeft  ? (1080 - TEXT_W) : 0;
const photoPanelLeft = isLeft  ? 0 : (TEXT_W - DIAG - 20);
const photoPanelW    = PHOTO_W;

// For the accent diagonal line sitting on the cut edge
const diagLineLeft   = isLeft
  ? (1080 - TEXT_W - 4)       // left edge of text panel
  : (TEXT_W - DIAG - 4);       // right edge of text panel

// ── Card HTML ────────────────────────────────────────────────────────────────
function buildCard() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800;900;1000&family=Poppins:wght@500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  *{ margin:0; padding:0; box-sizing:border-box; }
  body{ background:#111; }

  /* ── card shell ── */
  .card{
    width:1080px; height:1080px;
    position:relative; overflow:hidden;
    background:${IMG.bg};           /* card bg = photo bg → seamless blend */
  }

  /* ── photo panel ── */
  .photo-panel{
    position:absolute;
    top:0; bottom:0;
    left:${photoPanelLeft}px;
    width:${photoPanelW}px;
    z-index:1;
    overflow:hidden;
  }
  .photo-panel img{
    width:100%; height:100%;
    object-fit:cover;
    object-position:${IMG.pos};
    display:block;
  }
  /* soft fade at the boundary so photo merges into the diagonal */
  .photo-fade{
    position:absolute; top:0; bottom:0;
    width:120px;
    ${isLeft ? "right:0" : "left:0"};
    background:linear-gradient(${isLeft ? "to right" : "to left"},
      transparent, ${IMG.bg} 80%);
    z-index:2;
  }

  /* ── white text panel ── */
  .text-panel{
    position:absolute;
    top:0; bottom:0;
    left:${textPanelLeft}px;
    width:${TEXT_W}px;
    background:linear-gradient(155deg, #ffffff 0%, #f4f7ff 100%);
    clip-path:${textClip};
    z-index:3;
  }

  /* ── decorative diagonal accent stripe ── */
  .diag-stripe{
    position:absolute;
    top:-40px; bottom:-40px;
    left:${diagLineLeft}px;
    width:7px;
    background:linear-gradient(180deg, #2563EB 0%, #FBB024 55%, #2563EB 100%);
    transform:rotate(${isLeft ? "-3.2deg" : "3.2deg"});
    transform-origin:center;
    z-index:6;
    border-radius:4px;
    opacity:.85;
  }

  /* ── content inside text panel ── */
  .content{
    position:absolute;
    top:0; bottom:0;
    left:${textPanelLeft + (isLeft ? DIAG + 12 : 0)}px;
    width:${TEXT_W - DIAG - 12}px;
    z-index:10;
    display:flex;
    flex-direction:column;
    padding:52px 52px 44px ${isLeft ? 52 : 52}px;
  }

  /* ── logo ── */
  .logo{
    display:flex; align-items:center; gap:12px;
    font-family:'Poppins',sans-serif;
    font-weight:900; font-size:28px; letter-spacing:-0.5px;
  }
  .logo img{ height:42px; width:auto; }
  .logo .o{ color:#0B1E5B; }
  .logo .r{ color:#2563EB; }

  /* ── category pill ── */
  .cat-pill{
    display:inline-flex; align-items:center; gap:8px;
    background:${cat.pill};
    color:${cat.accent};
    padding:8px 20px;
    border-radius:100px;
    font-family:'Poppins',sans-serif;
    font-size:19px; font-weight:700;
    letter-spacing:.5px; text-transform:uppercase;
    margin-top:30px;
    align-self:flex-start;
  }

  /* ── "Did You Know?" headline ── */
  .headline{
    font-family:'Fredoka One', cursive;
    font-size:82px;
    line-height:1.0;
    letter-spacing:0.5px;
    margin-top:14px;
    color:#0B1E5B;
  }
  .headline span{ color:#2563EB; }

  /* ── fact card ── */
  .fact-card{
    flex:1;
    margin-top:20px;
    background:#fff;
    border-radius:24px;
    border-left:7px solid ${cat.accent};
    box-shadow:0 6px 32px rgba(11,30,91,.09), 0 2px 8px rgba(11,30,91,.05);
    padding:22px 28px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    overflow:hidden;
  }
  .fact-icon{
    font-size:44px;
    line-height:1;
    margin-bottom:12px;
    display:block;
  }
  .fact-text{
    font-family:'Nunito', sans-serif;
    font-size:40px;
    font-weight:800;
    line-height:1.32;
    color:#0B1430;
    letter-spacing:-0.2px;
  }
  .fact-source{
    margin-top:14px;
    font-family:'Poppins', sans-serif;
    font-size:18px;
    font-weight:600;
    color:#8a93b0;
    letter-spacing:.3px;
  }

  /* ── footer ── */
  .footer{
    margin-top:20px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
  }
  .follow-text{
    font-family:'Nunito', sans-serif;
    font-size:22px; font-weight:800;
    color:#0B1E5B;
    line-height:1.2;
  }
  .follow-text span{ color:#2563EB; }
  .url-pill{
    flex:none;
    background:#0B1E5B;
    color:#fff;
    padding:10px 22px;
    border-radius:100px;
    font-family:'Poppins',sans-serif;
    font-size:18px; font-weight:700;
    white-space:nowrap;
  }

  /* ── subtle blobs on text panel for depth ── */
  .blob{
    position:absolute;
    border-radius:50%;
    pointer-events:none;
    z-index:4;
  }
  .b1{
    width:260px; height:260px;
    background:${cat.accent};
    opacity:.06;
    top:-80px;
    left:${isLeft ? 300 : -80}px;
  }
  .b2{
    width:180px; height:180px;
    background:#FBB024;
    opacity:.08;
    bottom:-50px;
    left:${isLeft ? 280 : 60}px;
  }
</style>
</head><body>
<div class="card">

  <!-- photo panel (fills its side, bg colour matches photo) -->
  <div class="photo-panel">
    <img src="${PHOTO_URL}" alt="">
    <div class="photo-fade"></div>
  </div>

  <!-- white text panel -->
  <div class="text-panel"></div>

  <!-- subtle blobs on text side -->
  <div class="blob b1"></div>
  <div class="blob b2"></div>

  <!-- diagonal accent stripe -->
  <div class="diag-stripe"></div>

  <!-- content -->
  <div class="content">
    <!-- logo -->
    <div class="logo">
      <img src="${LOGO_DARK}">
      <span class="o">Olympiad</span><span class="r">Ready</span>
    </div>

    <!-- category -->
    <div class="cat-pill">${esc(FACT.icon)} ${esc(FACT.category)}</div>

    <!-- headline -->
    <div class="headline">Did You<br><span>Know?</span></div>

    <!-- fact -->
    <div class="fact-card">
      <div class="fact-text">${esc(FACT.fact)}</div>
      ${FACT.source ? `<div class="fact-source">— ${esc(FACT.source)}</div>` : ""}
    </div>

    <!-- footer -->
    <div class="footer">
      <div class="follow-text">A <span>new fact</span> every morning &amp; evening 🌟</div>
      <div class="url-pill">olympiadready.com</div>
    </div>
  </div>

</div>
</body></html>`;
}

// ── Render ───────────────────────────────────────────────────────────────────
(async () => {
  const outDir  = path.join(ROOT, "content", "dyk");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${dateStr}-${slot}.png`);

  const html    = buildCard();
  const browser = await chromium.launch();
  const page    = await browser.newPage({
    viewport:        { width: 1080, height: 1080 },
    deviceScaleFactor: 2,
  });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: outFile, clip: { x:0, y:0, width:1080, height:1080 } });
  await browser.close();

  console.log("wrote " + path.relative(ROOT, outFile));
  console.log(`  image: ${IMG.file}  (${IMG.side} side)`);
  console.log(`  fact:  ${FACT.category} — ${FACT.fact.slice(0,60)}...`);
})();
