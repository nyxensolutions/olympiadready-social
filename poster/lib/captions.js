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

module.exports = { buildMorningQuiz, buildEveningQuiz, buildAnswersCarousel, buildReel, buildDyk, buildYouTubeShort };
