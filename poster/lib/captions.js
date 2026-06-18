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

const TAGS_FEED  = "#OlympiadReady #Olympiad #DailyQuiz #LearningIsFun #BrainTeaser #OnlineLearning #EdTech #QuizTime";
const TAGS_REEL  = "#OlympiadReady #Olympiad #Reels #LearningPlatform #AILearning #UnlimitedLearning #EdTech #Shorts";
const TAGS_ANSW  = "#OlympiadReady #Olympiad #AnswersRevealed #DailyQuiz #LearningIsFun #EdTech";
const TAGS_DYK   = "#OlympiadReady #DidYouKnow #FunFacts #DidYouKnowFacts #AmazingFacts #LearnSomethingNew #EdTech #CuriousMind #InterestingFacts";
const TAGS_LEARN = "#OlympiadReady #LearnWithOlympiadReady #DailyLearning #StudyTips #Olympiad #EdTech #KidsEducation #LearningIsFun #SchoolStudents #OlympiadPrep";

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
  // Rotates by day-of-month so the Reel caption varies even on auto.
  const pool = [
    "Smarter Olympiad prep, powered by AI ✨\n\nInfinite practice. Real exam patterns. Mastery tracking.\n\nStart free → olympiadready.com",
    "Watch scores climb week on week 📈\n\nDaily quizzes, full mock exams, instant explanations.\n\nFree to start → olympiadready.com",
    "Never run out of questions ♾️\n\nAI generates fresh, level-perfect Olympiad practice on demand.\n\nTry it free → olympiadready.com",
    "Real Olympiad practice. Real progress.\n\nMock exams, badges, leaderboards & more.\n\nolympiadready.com",
  ];
  const day = parseInt(dateStr.slice(-2), 10);
  return pool[day % pool.length] + "\n\n" + TAGS_REEL;
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
    {
      title: "Still Using Old Question Banks? Try This Instead 🚀 | OlympiadReady #Shorts",
      description: "India's #1 AI-powered Olympiad coach. Unlimited practice questions, full mock exams, instant AI explanations, and real badges — all free to start!" + DESC_FOOTER,
    },
    {
      title: "Everything Your Child Needs — Completely FREE ✅ | OlympiadReady #Shorts",
      description: "Free practice tests, free PDF downloads, free mock exams — and unlimited everything from just ₹129/mo. No credit card needed to start!" + DESC_FOOTER,
    },
    {
      title: "Is Your Child Ready for Their Olympiad? 🎯 | OlympiadReady #Shorts",
      description: "OlympiadReady prepares students for IMO, NSO, IEO, NCO & more. AI-generated questions, printable PDFs, progress tracking and real rewards." + DESC_FOOTER,
    },
    {
      title: "Meet Your AI Olympiad Tutor 🤖 — Doubts Cleared 24/7 | OlympiadReady #Shorts",
      description: "Stuck on a problem at 11 PM? Your OlympiadReady AI Tutor explains every concept instantly — any topic, any time, step by step." + DESC_FOOTER,
    },
    {
      title: "Olympiad Prep in 4 Simple Steps 🏅 | OlympiadReady #Shorts",
      description: "Pick your Olympiad → Take a timed AI mock exam → Review with AI explanations → Track progress & earn badges. Start free today!" + DESC_FOOTER,
    },
    {
      title: "From Boring PDFs to Brilliant Results ✨ | OlympiadReady #Shorts",
      description: "Stop studying from static PDFs. OlympiadReady generates fresh, AI-powered Olympiad papers every time — no repeats, no guessing." + DESC_FOOTER,
    },
  ];

  const s = scripts[day % scripts.length];
  return { title: s.title, description: s.description, tags: TAGS, categoryId: "27" };
}

function buildLearn(dateStr) {
  const override = readJsonOrNull(path.join(ROOT, "content", "learn", `${dateStr}.json`));
  if (override?.caption) {
    return override.caption + "\n\n" + (override.hashtags || TAGS_LEARN);
  }
  const pool = [
    "Level up your knowledge! 📚\n\nEvery day we share a learn card — formulas, vocabulary, science facts, history, geography & GK — everything you need for Olympiad revision.\n\nSave this card and practise more at olympiadready.com 🎯",
    "Something to learn today 🧠\n\nOlympiadReady daily learn cards cover Maths, English, Science, History, Geography & GK — one card at a time.\n\nInfinite AI practice & mock exams → olympiadready.com",
    "Smart revision in one card ✨\n\nSave this, share it with a classmate, and test yourself before your next exam!\n\nUnlimited Olympiad practice, free to start → olympiadready.com",
    "Your daily brain boost 💡\n\nFollow us for a new learn card every day at 1:30 PM IST — bite-sized knowledge across all Olympiad subjects.\n\nAI-powered Olympiad prep → olympiadready.com",
  ];
  const day = parseInt(dateStr.slice(-2), 10);
  return pool[day % pool.length] + "\n\n" + TAGS_LEARN;
}

// ── Reel captions — extended pool matching 11 scripts ───────────────────────
// Used in buildReel() pool (overrides the 4-item pool above when script >= 4).
const REEL_POOL_EXTRA = [
  // script 8 — free tier hook
  "15 free Olympiad papers. No credit card. No catch. 🎁\n\nSOF-aligned practice for IMO, NSO, IEO & IGKO — Class 1–12.\nAI explains every wrong answer.\n\nSign up free → olympiadready.in",
  // script 9 — school pilot
  "Schools: your students deserve better than YouTube videos and old books. 🏫\n\nOlympiadReady gives your school a free pilot — unique invite code, student dashboard, school branding.\n\n9 subjects · Class 1–12 · 50,000+ questions · AI-powered.\n\nEmail us: nyxencloud@gmail.com",
  // script 10 — comparison
  "Private tutor: ₹6,400/month. OlympiadReady: ₹129/month. 💸\n\nUnlimited papers. 24/7 AI explanations. 50,000+ questions. 9 subjects.\n\nFirst 15 papers completely free → olympiadready.in",
];

// ── WhatsApp / parent group messages ────────────────────────────────────────
const WHATSAPP_POSTS = {
  // Version A — casual parent-to-parent
  casual: `Found this app for Olympiad prep — OlympiadReady (olympiadready.in). Gives 15 free practice papers to start, no card needed. SOF-aligned for IMO/NSO/IEO, Class 1–12. AI explains every wrong answer. After the free papers it's only ₹129/subject/month. Worth trying!`,

  // Version B — includes pricing comparison
  detailed: `Sharing this for anyone whose kids are doing SOF Olympiads 👇\n\nOlympiadReady (olympiadready.in) — 15 free practice papers to start, then ₹129/subject/month. Compare that to a private tutor at ₹800/hour × 2 sessions = ₹6,400/month for just one subject.\n\nApp has 50,000+ questions, AI explanations, Class 1–12, all 9 Olympiad subjects. No credit card to start.`,

  // Version C — school pilot focus
  schoolPilot: `For school parents/coordinators — OlympiadReady is offering a free pilot for schools.\n\nSchool gets a unique invite code → students sign up free → coordinator can see who practiced & their scores.\n\n9 subjects, Class 1–12, SOF-aligned. Email nyxencloud@gmail.com to request your school's code before Olympiad season (August).`,
};

// ── Instagram captions — 5 angles ───────────────────────────────────────────
const TAGS_FREE   = "#OlympiadReady #SOFOlympiad #IMO #NSO #IEO #FreePractice #OlympiadPrep #IndianStudents #Class1to12 #EdTech";
const TAGS_PRICE  = "#OlympiadReady #OlympiadPrep #IndianParents #AffordableEducation #SOFOlympiad #MathOlympiad #EdTech #SmartLearning";
const TAGS_AI     = "#OlympiadReady #AILearning #OlympiadPrep #SOFOlympiad #IndianStudents #EdTech #MathOlympiad #SmartPrep";
const TAGS_SCHOOL = "#OlympiadReady #SchoolOlympiad #SOFOlympiad #IndianSchools #OlympiadPrep #TeacherLife #EdTech #AcademicExcellence";
const TAGS_AUG    = "#OlympiadReady #OlympiadSeason #SOFOlympiad #IMO #NSO #IEO #OlympiadPrep #IndianStudents #MathOlympiad #AugustOlympiad";

const CAPTION_ANGLES = [
  // Angle 1 — 15 free papers
  `15 free Olympiad practice papers. No credit card. No catch. 🎁\n\nWe believe every child deserves a shot at the gold — so we made it free to start.\n50,000+ SOF-aligned questions · AI explanations · Class 1–12.\n\nLink in bio → olympiadready.in\n\n${TAGS_FREE}`,

  // Angle 2 — price comparison
  `₹800/hour tutor × 8 sessions = ₹6,400/month for one subject. 💸\n\nOlympiadReady: ₹129/subject/month.\nUnlimited papers. 24/7 AI explanations. No fixed schedule.\n\nThe maths is simple. Try it free first → olympiadready.in\n\n${TAGS_PRICE}`,

  // Angle 3 — 50,000 questions + AI
  `50,000+ questions. AI that explains every single wrong answer. 🧠\n\nNo more guessing why you got it wrong.\nNo more staring at an answer key with no explanation.\nJust clear, step-by-step AI guidance — every time.\n\nFree to start → olympiadready.in\n\n${TAGS_AI}`,

  // Angle 4 — school pilot
  `Schools: your students can get free access to OlympiadReady. 🏫\n\nWe're partnering with schools before Olympiad season.\nYour school gets a unique invite code → students sign up free → you see their progress.\n\nEmail us: nyxencloud@gmail.com\n\n${TAGS_SCHOOL}`,

  // Angle 5 — August season
  `Olympiad registrations open in August. ⏰\n\nIs your child already practising?\nSOF Olympiads (IMO, NSO, IEO, IGKO) need consistent preparation — not last-minute cramming.\n\n15 free papers to start. No excuses. → olympiadready.in\n\n${TAGS_AUG}`,
];

module.exports = {
  buildMorningQuiz, buildEveningQuiz, buildAnswersCarousel,
  buildReel, buildDyk, buildYouTubeShort, buildLearn,
  WHATSAPP_POSTS, CAPTION_ANGLES, REEL_POOL_EXTRA,
};
