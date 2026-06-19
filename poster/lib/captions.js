// Caption defaults + per-day overrides.
//
// Overrides:
//   content/quizzes/<YYYY-MM-DD>/captions.json
//     { "morning": { "caption": "...", "hashtags": "#a #b" },
//       "evening": { "caption": "...", "hashtags": "#a #b" } }
//   content/quizzes/<YYYY-MM-DD>/answers.json   (for the 2 PM carousel)
//     { "caption": "...", "hashtags": "..." }
//   content/reels/<YYYY-MM-DD>.json
//     { "caption": "...", "hashtags": "..." }

const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..", "..");

// ── Audience-specific hashtag sets ──────────────────────────────────────────
// General feed / quiz
const TAGS_FEED  = "#OlympiadReady #SOFOlympiad #DailyQuiz #OlympiadPrep #IndianStudents #BrainTeaser #EdTech #QuizTime #IMO #NSO #IEO #MathOlympiad #Class1to12";
// Reel base (platform/general)
const TAGS_REEL  = "#OlympiadReady #Olympiad #SOFOlympiad #AILearning #OlympiadPrep #EdTech #IndianStudents #FreePractice #MathOlympiad #NSO #IEO #Class1to12 #Reels";
// Answer reveals
const TAGS_ANSW  = "#OlympiadReady #SOFOlympiad #AnswersRevealed #DailyQuiz #OlympiadPrep #IndianStudents #EdTech #IMO #NSO #IEO";
// Did you know
const TAGS_DYK   = "#OlympiadReady #DidYouKnow #FunFacts #AmazingFacts #LearnSomethingNew #EdTech #IndianStudents #CuriousMind #InterestingFacts #KidsFacts #SchoolStudents";
// Learn carousels
const TAGS_LEARN = "#OlympiadReady #LearnWithOlympiadReady #DailyLearning #StudyTips #SOFOlympiad #EdTech #KidsEducation #IndianStudents #OlympiadPrep #SchoolStudents #Class1to12 #LearningIsFun";
// Audience-targeted hashtag sets
const TAGS_PARENTS  = "#OlympiadReady #IndianParents #ParentsOfIndia #SOFOlympiad #OlympiadPrep #SchoolParents #KidsEducation #AffordableEducation #SmartParenting #IndianMoms #IMO #NSO #IEO";
const TAGS_SCHOOLS  = "#OlympiadReady #IndianSchools #SchoolCoordinator #OlympiadSchool #SOFOlympiad #TeacherLife #SchoolEducation #OlympiadPrep #EdTech #AcademicExcellence #IndianEducation #CBSESchools";
const TAGS_KIDS     = "#OlympiadReady #KidsOfIndia #StudentLife #OlympiadKids #SOFOlympiad #StudyMotivation #IndianStudents #SchoolLife #OlympiadPrep #MathOlympiad #KidsSports #GoldMedal";

function readJsonOrNull(p) {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return null; }
}

function buildMorningQuiz(dateStr) {
  const override = readJsonOrNull(path.join(ROOT, "content", "quizzes", dateStr, "captions.json"))?.morning;
  if (override?.caption) {
    return override.caption + "\n\n" + (override.hashtags || TAGS_FEED);
  }
  return [
    "Morning brain warm-up 🧠",
    "",
    "Drop your answer in the comments 👇 — A, B, C or D.",
    "We reveal the answer in tomorrow's carousel ✅",
    "",
    "Unlimited AI-generated practice → olympiadready.com (link in bio)",
    "",
    TAGS_FEED,
  ].join("\n");
}

function buildEveningQuiz(dateStr) {
  const override = readJsonOrNull(path.join(ROOT, "content", "quizzes", dateStr, "captions.json"))?.evening;
  if (override?.caption) {
    return override.caption + "\n\n" + (override.hashtags || TAGS_FEED);
  }
  return [
    "Evening challenge 🌙",
    "",
    "One quick question before you wind down. Comment A, B, C or D 👇",
    "Answer drops tomorrow afternoon ✅",
    "",
    "Free practice, all day → olympiadready.com",
    "",
    TAGS_FEED,
  ].join("\n");
}

function buildAnswersCarousel(answeredDateStr) {
  const override = readJsonOrNull(path.join(ROOT, "content", "quizzes", answeredDateStr, "answers.json"));
  if (override?.caption) {
    return override.caption + "\n\n" + (override.hashtags || TAGS_ANSW);
  }
  return [
    "Yesterday's answers are in ✅",
    "",
    "Swipe → for the morning and evening reveals with explanations.",
    "How many did you get right? Let us know 👇",
    "",
    "Tomorrow's quizzes drop at 7 AM & 7 PM IST. Follow so you don't miss them.",
    "",
    "Unlimited practice at olympiadready.com",
    "",
    TAGS_ANSW,
  ].join("\n");
}

function buildReel(dateStr) {
  const override = readJsonOrNull(path.join(ROOT, "content", "reels", `${dateStr}.json`));
  if (override?.caption) {
    return override.caption + "\n\n" + (override.hashtags || TAGS_REEL);
  }
  // 15-entry pool — one per reel script (day % 15 keeps caption in sync with visual).
  const pool = [
    // 0 — Platform overview
    `Smarter Olympiad prep, powered by AI ✨\n\nInfinite practice. Real exam patterns. Badges. Physical medals.\n\nStart free → olympiadready.com\n\n${TAGS_REEL}`,
    // 1 — Free vs Pro
    `Everything your child needs — completely free to start ✅\n\nFree practice tests, free PDF downloads, free mock exams.\nAfter free papers: just ₹129/subject/month.\n\nNo credit card. No download. → olympiadready.com\n\n${TAGS_PARENTS}`,
    // 2 — For parents
    `Is your child ready for their Olympiad? 🎯\n\nOlympiadReady prepares students for IMO, NSO, IEO, NCO & more.\nAI questions · Timed mocks · Progress tracking · Real rewards.\n\nFree to start → olympiadready.com\n\n${TAGS_PARENTS}`,
    // 3 — AI Tutor
    `Stuck on a problem at 11 PM? 🤖\n\nYour OlympiadReady AI Tutor is awake.\nAsk anything. Get step-by-step clarity. Any topic. Any time.\n\nFree AI Tutor → olympiadready.com\n\n${TAGS_REEL}`,
    // 4 — How it works
    `Olympiad prep in 4 simple steps 🏅\n\n1️⃣ Pick your Olympiad & class\n2️⃣ Take an AI timed mock exam\n3️⃣ Review with AI explanations\n4️⃣ Track progress & earn badges\n\nStart free → olympiadready.com\n\n${TAGS_REEL}`,
    // 5 — From boring to brilliant
    `Stop studying from the same old PDFs 📄\n\nOlympiadReady generates fresh AI-powered Olympiad papers every time.\nNo repeats. No guessing. No boring static content.\n\nMake the switch → olympiadready.com\n\n${TAGS_REEL}`,
    // 6 — Score story
    `Watch your child's score climb week on week 📈\n\n10 minutes of daily practice → consistent score improvement.\nFull mock exams · AI analysis · Weak topic detection.\n\nFree to start → olympiadready.com\n\n${TAGS_PARENTS}`,
    // 7 — All subjects
    `Every Olympiad subject in one place 📚\n\nIMO · NSO · IEO · NCO · IGKO · Spell Bee · ISSO\nAll AI-powered. All SOF-aligned. Class 1–12.\n\nolympiadready.com\n\n${TAGS_REEL}`,
    // 8 — Free tier hook
    `15 free Olympiad papers. No credit card. No catch. 🎁\n\nSOF-aligned practice for IMO, NSO, IEO & IGKO — Class 1–12.\nAI explains every wrong answer.\n\nSign up free → olympiadready.com\n\n${TAGS_PARENTS}`,
    // 9 — School pilot
    `Schools: your students deserve better than YouTube videos and old books. 🏫\n\nOlympiadReady gives your school a free pilot:\n✅ Unique invite code\n✅ Coordinator dashboard\n✅ School branding\n✅ 50,000+ SOF-aligned questions\n\nEmail us: nyxencloud@gmail.com\n\n${TAGS_SCHOOLS}`,
    // 10 — Price comparison
    `Private tutor: ₹6,400/month. OlympiadReady: ₹129/month. 💸\n\nUnlimited papers. 24/7 AI explanations. 9 subjects. No fixed schedule.\n\nFirst 15 papers completely free → olympiadready.com\n\n${TAGS_PARENTS}`,
    // 11 — Child social proof
    `My friend got Olympiad gold. I asked how. 🥇\n\nShe practised with OlympiadReady — AI papers, timed mocks, instant explanations.\nStarted free. Upgraded later.\n\nYour turn → olympiadready.com\n\n${TAGS_KIDS}`,
    // 12 — Parent WhatsApp bait
    `Save this and share it in your parent group 📲\n\n15 free Olympiad papers for every child.\nIMO · NSO · IEO · IGKO · Class 1–12\nNo credit card. No download.\n\nolympiadready.com — share with every Olympiad parent you know!\n\n${TAGS_PARENTS}`,
    // 13 — School urgency
    `Olympiad registrations open in August ⏰\n\nIs your school's preparation already in place?\n\nOlympiadReady offers a free 30-day school pilot:\n📧 Email nyxencloud@gmail.com to claim your school's invite code before August.\n\n50,000+ questions · 9 subjects · Class 1–12 · AI-powered.\n\n${TAGS_SCHOOLS}`,
    // 14 — Zero cost school
    `Your school pays ₹0 to get started. 🏫\n\nFree 30-day pilot → unique school code → students prep free → coordinator tracks progress.\n\nNo payment. No commitment. Just better Olympiad results.\n\n📧 nyxencloud@gmail.com\n\n${TAGS_SCHOOLS}`,
  ];
  const day = parseInt(dateStr.slice(-2), 10);
  return pool[day % pool.length];
}

function buildDyk(dateStr, slot) {
  // slot: "morning" | "evening"
  const override = readJsonOrNull(path.join(ROOT, "content", "dyk", `${dateStr}-${slot}.json`));
  if (override?.caption) {
    return override.caption + "\n\n" + (override.hashtags || TAGS_DYK);
  }
  const pool = [
    "Did you know this? 🤯\n\nEvery day we share a mind-blowing fact — science, history, maths, and more.\n\nFollow so you never miss one 👆\n\nolympiadready.com — where curiosity meets practice.",
    "Something surprising to brighten your day 💡\n\nDrop a 🤯 in the comments if this blew your mind!\n\nMore daily facts + free Olympiad practice → olympiadready.com",
    "The world is full of amazing things 🌍\n\nShare this with a friend who'd love it 👇\n\nFree daily quizzes & mock exams → olympiadready.com",
    "Facts that make you go WOW 😲\n\nLearning doesn't have to be boring — follow for a new fact every morning & evening!\n\nolympiadready.com",
  ];
  const day = parseInt(dateStr.slice(-2), 10);
  return pool[day % pool.length] + "\n\n" + TAGS_DYK;
}

// YouTube Shorts metadata — title + description + tags, rotates with reel script.
// Matches the 6 reel scripts in generate-reel.js (day % 6).
function buildYouTubeShort(dateStr) {
  const TAGS = [
    "OlympiadReady", "Olympiad", "Shorts", "AILearning", "EdTech",
    "OlympiadPrep", "IMO", "NSO", "IEO", "MathOlympiad", "IndiaOlympiad",
    "SchoolOlympiad", "FreePractice", "MockExam", "AITutor",
  ];

  const day = parseInt(dateStr.slice(-2), 10);
  const DESC_FOOTER = `\n\n✅ Free practice tests & mock exams\n📄 Free PDF question paper downloads\n🧠 AI explanations after every answer\n🤖 AI Tutor — doubt clearing 24/7\n🏆 Badges, certificates & physical medals\n👑 Unlimited access from ₹129/mo\n\n🌐 Start free → olympiadready.com\n\n#OlympiadReady #Shorts #Olympiad #AILearning #EdTech #OlympiadPrep #FreePractice`;

  const scripts = [
    { title: "Still Using Old Question Banks? Try This Instead 🚀 | OlympiadReady #Shorts", description: "India's #1 AI-powered Olympiad coach. Unlimited practice questions, full mock exams, instant AI explanations, and real badges — all free to start!" + DESC_FOOTER },
    { title: "Everything Your Child Needs — Completely FREE ✅ | OlympiadReady #Shorts", description: "Free practice tests, free PDF downloads, free mock exams — and unlimited everything from just ₹129/mo. No credit card needed to start!" + DESC_FOOTER },
    { title: "Is Your Child Ready for Their Olympiad? 🎯 | OlympiadReady #Shorts", description: "OlympiadReady prepares students for IMO, NSO, IEO, NCO & more. AI-generated questions, printable PDFs, progress tracking and real rewards." + DESC_FOOTER },
    { title: "Meet Your AI Olympiad Tutor 🤖 — Doubts Cleared 24/7 | OlympiadReady #Shorts", description: "Stuck on a problem at 11 PM? Your OlympiadReady AI Tutor explains every concept instantly — any topic, any time, step by step." + DESC_FOOTER },
    { title: "Olympiad Prep in 4 Simple Steps 🏅 | OlympiadReady #Shorts", description: "Pick your Olympiad → Take a timed AI mock exam → Review with AI explanations → Track progress & earn badges. Start free today!" + DESC_FOOTER },
    { title: "From Boring PDFs to Brilliant Results ✨ | OlympiadReady #Shorts", description: "Stop studying from static PDFs. OlympiadReady generates fresh, AI-powered Olympiad papers every time — no repeats, no guessing." + DESC_FOOTER },
    { title: "Watch Your Child's Score Climb Every Week 📈 | OlympiadReady #Shorts", description: "10 minutes of daily AI practice → consistent Olympiad score improvement. Full mock exams, instant AI analysis, weak topic detection. Free to start!" + DESC_FOOTER },
    { title: "Every Olympiad Subject in One Place 📚 | OlympiadReady #Shorts", description: "IMO, NSO, IEO, NCO, IGKO, Spell Bee — all covered, all AI-powered, all SOF-aligned. Class 1–12. Free to start!" + DESC_FOOTER },
    { title: "15 Free Olympiad Papers — No Credit Card 🎁 | OlympiadReady #Shorts", description: "Your child gets 15 free SOF-aligned practice papers to start. No catch. AI explains every wrong answer. Class 1–12 · IMO · NSO · IEO · IGKO." + DESC_FOOTER },
    { title: "Free Olympiad Prep for Your Entire School 🏫 | OlympiadReady #Shorts", description: "Schools get a free 30-day pilot — unique invite code, coordinator dashboard, school branding. Students prep free. Email nyxencloud@gmail.com" + DESC_FOOTER },
    { title: "₹6,400 vs ₹129 — The Maths Every Parent Should See 💸 | OlympiadReady #Shorts", description: "Private tutor costs ₹6,400/month for one subject. OlympiadReady: ₹129/month for 9 subjects, unlimited papers, 24/7 AI tutor. Try free first!" + DESC_FOOTER },
    { title: "My Friend Got Olympiad Gold. Here's How She Prepared 🥇 | OlympiadReady #Shorts", description: "AI-generated papers daily. Timed mock exams. Instant explanations for every wrong answer. 15 free papers to start. No credit card needed." + DESC_FOOTER },
    { title: "Share This With Every Parent Group 📲 | OlympiadReady #Shorts", description: "15 free Olympiad papers for every child. IMO · NSO · IEO · IGKO · Class 1–12. No credit card. No download. Just pure Olympiad practice!" + DESC_FOOTER },
    { title: "August Olympiad Season Is Coming — Is Your School Ready? ⏰ | OlympiadReady #Shorts", description: "OlympiadReady school pilot: free 30-day access, coordinator dashboard, 50,000+ SOF-aligned questions. Email nyxencloud@gmail.com before August." + DESC_FOOTER },
    { title: "Your School Pays ₹0 to Get Started 🏫 | OlympiadReady #Shorts", description: "Free school pilot: unique invite code → students prep free → coordinator tracks scores → school branding on dashboard. Email nyxencloud@gmail.com" + DESC_FOOTER },
  ];

  const s = scripts[day % 15];
  return { title: s.title, description: s.description, tags: TAGS, categoryId: "27" };
}

function buildLearn(dateStr, subject) {
  const override = readJsonOrNull(path.join(ROOT, "content", "learn", `${dateStr}.json`));
  if (override?.caption) {
    return override.caption + "\n\n" + (override.hashtags || TAGS_LEARN);
  }
  const sub = subject || "Today's topic";
  const pool = [
    // 0 — save & revise
    `📖 ${sub} — today's carousel is here!\n\nSwipe through all the slides and save this for quick revision before your Olympiad. 🧠\n\nWant to test what you just learned? Unlimited AI practice, free to start → olympiadready.com\n\n${TAGS_LEARN}`,
    // 1 — parent hook
    `🎓 Daily ${sub} lesson for your child!\n\nShare this carousel with them — 3 slides, 3 minutes, one important topic mastered. 💡\n\nFull Olympiad practice with AI explanations → olympiadready.com\n\n${TAGS_PARENTS} ${TAGS_LEARN}`,
    // 2 — classmate share
    `📚 ${sub} — swipe to learn it right!\n\nTag a classmate who needs to see this → they'll thank you before exam day 😄\n\nFree AI-powered Olympiad practice → olympiadready.com\n\n${TAGS_KIDS} ${TAGS_LEARN}`,
    // 3 — follow CTA
    `💡 ${sub} in a quick carousel!\n\nWe post a new learn carousel every day at 1:30 PM IST. Follow so you never miss one!\n\n50,000+ practice questions + AI explanations at olympiadready.com\n\n${TAGS_LEARN}`,
    // 4 — school hook
    `🏫 Today's ${sub} carousel — perfect for classroom revision!\n\nCoordinators: share our daily carousels with students for free bite-sized prep.\n\nInterested in a free school pilot? Email nyxencloud@gmail.com\n\n${TAGS_SCHOOLS} ${TAGS_LEARN}`,
    // 5 — save for exam
    `⭐ Save this! ${sub} — key concepts in one carousel.\n\nThe best students revise daily, not the night before. Build that habit here. 📈\n\nPractice what you learned → free tests at olympiadready.com\n\n${TAGS_LEARN}`,
  ];
  const day = parseInt(dateStr.slice(-2), 10);
  return pool[day % pool.length];
}

// ── Reel captions — extended pool matching all 15 scripts ───────────────────
// Reference copies for manual use / override JSONs. buildReel() includes all of these inline.
const REEL_POOL_EXTRA = [
  // script 8 — free tier hook
  `15 free Olympiad papers. No credit card. No catch. 🎁\n\nSOF-aligned practice for IMO, NSO, IEO & IGKO — Class 1–12.\nAI explains every wrong answer.\n\nSign up free → olympiadready.com\n\n${TAGS_PARENTS}`,
  // script 9 — school pilot
  `Schools: your students deserve better than YouTube videos and old books. 🏫\n\nOlympiadReady gives your school a free pilot — unique invite code, student dashboard, school branding.\n\n9 subjects · Class 1–12 · 50,000+ questions · AI-powered.\n\nEmail us: nyxencloud@gmail.com\n\n${TAGS_SCHOOLS}`,
  // script 10 — comparison
  `Private tutor: ₹6,400/month. OlympiadReady: ₹129/month. 💸\n\nUnlimited papers. 24/7 AI explanations. 50,000+ questions. 9 subjects.\n\nFirst 15 papers completely free → olympiadready.com\n\n${TAGS_PARENTS}`,
  // script 11 — child social proof
  `My friend got Olympiad gold. I asked how. 🥇\n\nShe practised with OlympiadReady every day. AI papers, timed mocks, instant explanations.\n\nYour turn → olympiadready.com\n\n${TAGS_KIDS}`,
  // script 12 — parent share bait
  `Save this and share it in your parent group 📲\n\n15 free Olympiad papers for every child. No card. No download.\nIMO · NSO · IEO · IGKO · Class 1–12\n\nolympiadready.com\n\n${TAGS_PARENTS}`,
  // script 13 — school urgency
  `Olympiad registrations open in August ⏰\n\nIs your school ready?\n\nFree 30-day pilot → unique school code → students prep free → coordinator tracks scores.\n\n📧 nyxencloud@gmail.com\n\n${TAGS_SCHOOLS}`,
  // script 14 — zero cost school
  `Your school pays ₹0 to get started. 🏫\n\nFree pilot · School branding · Coordinator dashboard · 50,000+ questions.\n\n📧 nyxencloud@gmail.com | Subject: School Pilot — [Your School Name]\n\n${TAGS_SCHOOLS}`,
];

// ── WhatsApp / parent group messages ────────────────────────────────────────
const WHATSAPP_POSTS = {
  // Version A — casual parent-to-parent
  casual: `Found this for Olympiad prep — OlympiadReady (olympiadready.com). Gives 15 free practice papers to start, no card needed. SOF-aligned for IMO, NSO, IEO — Class 1–12. AI explains every wrong answer. After free papers it's only ₹129/subject/month. Worth trying!`,

  // Version B — includes pricing comparison
  detailed: `Sharing this for anyone whose kids are doing SOF Olympiads 👇\n\nOlympiadReady (olympiadready.com) — 15 free practice papers, then ₹129/subject/month. Compare that to a private tutor at ₹800/hour × 2 sessions = ₹6,400/month for just one subject.\n\n50,000+ questions, AI explanations, Class 1–12, all 9 Olympiad subjects. No credit card to start. Share this with every parent whose child is appearing in an Olympiad this year.`,

  // Version C — school pilot focus
  schoolPilot: `For school coordinators/principals — OlympiadReady is offering a free pilot before Olympiad season.\n\nYour school gets a unique invite code → students sign up free → coordinator dashboard shows who practised & their scores → school logo on every student's dashboard.\n\n9 subjects, Class 1–12, 50,000+ SOF-aligned questions, AI explanations.\n\nEmail nyxencloud@gmail.com (Subject: School Pilot — [School Name]) before August registrations open.`,

  // Version D — child / student message
  childMessage: `Hey! Found this for Olympiad practice — OlympiadReady (olympiadready.com). 15 free papers to start, no card needed. AI explains every wrong answer — super helpful when you're stuck. Works for IMO, NSO, IEO, IGKO, Spell Bee, Class 1–12. Try it!`,
};

// ── Instagram feed captions — 7 angles ──────────────────────────────────────
const CAPTION_ANGLES = [
  // Angle 1 — 15 free papers (for parents)
  `15 free Olympiad practice papers. No credit card. No catch. 🎁\n\nEvery child deserves a real shot at the gold — so we made it free to start.\n\n✅ 50,000+ SOF-aligned questions\n✅ AI explanations after every answer\n✅ Class 1–12 · IMO · NSO · IEO · IGKO\n\nLink in bio → olympiadready.com\n\n${TAGS_PARENTS}`,

  // Angle 2 — price comparison (for parents)
  `₹800/hour tutor × 8 sessions = ₹6,400/month for one subject. 💸\n\nOlympiadReady: ₹129/subject/month.\nUnlimited papers. 24/7 AI explanations. No fixed schedule. No missed classes.\n\nThe maths is simple. Try it free first → olympiadready.com\n\n${TAGS_PARENTS}`,

  // Angle 3 — AI explanations (for students)
  `50,000+ questions. AI that explains every single wrong answer. 🧠\n\nNo more guessing why you got it wrong.\nNo more staring at an answer key with zero context.\nJust clear, step-by-step AI guidance — every time.\n\nFree to start → olympiadready.com\n\n${TAGS_KIDS}`,

  // Angle 4 — school pilot (for schools/coordinators)
  `Schools: give your students free Olympiad prep — we'll handle the rest. 🏫\n\nOlympiadReady school pilot (before August):\n🔑 Unique invite code for your school\n📊 Coordinator dashboard — track every student's progress\n🏫 Your school logo on every dashboard\n\n9 subjects · Class 1–12 · 50,000+ questions · AI-powered\n\n📧 nyxencloud@gmail.com\n\n${TAGS_SCHOOLS}`,

  // Angle 5 — August urgency (for parents)
  `Olympiad registrations open in August. ⏰\n\nIs your child already practising?\nSOF Olympiads (IMO, NSO, IEO, IGKO) need consistent prep — not last-minute cramming.\n\n15 free papers to start. No excuses. → olympiadready.com\n\n${TAGS_PARENTS}`,

  // Angle 6 — child social proof (for kids + parents)
  `Every gold medalist practised more than everyone else. 🥇\n\nThe difference isn't talent. It's consistent, structured practice.\n\nAI-generated papers · Timed mocks · Instant explanations · Badges & certificates\n\n15 papers free → olympiadready.com\n\n${TAGS_KIDS}`,

  // Angle 7 — school urgency (for coordinators)
  `August Olympiad registrations are around the corner. 📅\n\nDon't let your students walk in unprepared.\n\nOlympiadReady free school pilot:\n✅ 30-day free access for all your students\n✅ No payment — zero cost to the school\n✅ Coordinator sees who's practising\n\n📧 nyxencloud@gmail.com before spots fill up.\n\n${TAGS_SCHOOLS}`,
];

module.exports = {
  buildMorningQuiz, buildEveningQuiz, buildAnswersCarousel,
  buildReel, buildDyk, buildYouTubeShort, buildLearn,
  WHATSAPP_POSTS, CAPTION_ANGLES, REEL_POOL_EXTRA,
  TAGS_PARENTS, TAGS_SCHOOLS, TAGS_KIDS,
};
