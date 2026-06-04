/**
 * "Did You Know?" fact bank.
 * Each entry: { category, icon, fact, source? }
 * Categories: Science | Maths | History | Geography | GK
 */
module.exports = [
  // ── Science ──────────────────────────────────────────────────────────────
  {
    category: "Science",
    icon: "🧬",
    fact: "A teaspoon of neutron star material weighs about 10 million tonnes — more than all the humans on Earth combined!",
    source: "NASA",
  },
  {
    category: "Science",
    icon: "⚡",
    fact: "Lightning strikes Earth about 100 times every single second — that's over 8 million strikes per day!",
    source: "NOAA",
  },
  {
    category: "Science",
    icon: "🦷",
    fact: "Tooth enamel is the hardest substance your body produces — even harder than your bones.",
    source: "Dental Research Journal",
  },
  {
    category: "Science",
    icon: "🩸",
    fact: "Your body produces about 25 million new cells every second — roughly 2 billion per day!",
    source: "Cell Biology",
  },
  {
    category: "Science",
    icon: "🌊",
    fact: "Oceans cover 71% of Earth but 95% of them remain unexplored. We know more about the Moon's surface than our ocean floor.",
    source: "NOAA",
  },
  {
    category: "Science",
    icon: "🐙",
    fact: "Octopuses have three hearts, blue blood, and nine brains — one central brain and one in each arm!",
    source: "Marine Biology",
  },
  {
    category: "Science",
    icon: "🌡️",
    fact: "Hot water can freeze faster than cold water under certain conditions — this is called the Mpemba Effect.",
    source: "Physics Today",
  },
  {
    category: "Science",
    icon: "🦋",
    fact: "A butterfly can taste with its feet — it has taste sensors on its legs to help identify plants for laying eggs.",
  },
  {
    category: "Science",
    icon: "🌍",
    fact: "Earth is not perfectly round — it bulges at the equator and is slightly flattened at the poles, making it an oblate spheroid.",
    source: "NASA",
  },
  {
    category: "Science",
    icon: "🫀",
    fact: "Your heart beats around 100,000 times a day, pumping about 7,500 litres of blood through 96,000 km of blood vessels.",
    source: "BHF",
  },

  // ── Maths ─────────────────────────────────────────────────────────────────
  {
    category: "Maths",
    icon: "♾️",
    fact: "There are more possible games of chess than there are atoms in the observable universe — roughly 10^120 possible games!",
    source: "Claude Shannon (1950)",
  },
  {
    category: "Maths",
    icon: "🔢",
    fact: "If you shuffle a deck of 52 cards properly, the exact order you get has almost certainly never existed before in history.",
    source: "Combinatorics",
  },
  {
    category: "Maths",
    icon: "🌻",
    fact: "Sunflower seeds are arranged in a Fibonacci spiral pattern — one of the most efficient packing systems in nature.",
  },
  {
    category: "Maths",
    icon: "π",
    fact: "The digits of pi (π) never repeat and never end. Computers have calculated over 100 trillion digits so far!",
    source: "Google Cloud (2022)",
  },
  {
    category: "Maths",
    icon: "🐝",
    fact: "Honeybees instinctively build hexagonal cells — hexagons use the least wax while storing the most honey. Nature does maths!",
  },
  {
    category: "Maths",
    icon: "🌀",
    fact: "The Golden Ratio (≈1.618) appears in the nautilus shell, flower petals, the Milky Way, and even the human face.",
  },
  {
    category: "Maths",
    icon: "🎲",
    fact: "In a room of just 23 people, there's a 50% chance two of them share the same birthday. This is the famous Birthday Paradox!",
    source: "Probability Theory",
  },

  // ── History ──────────────────────────────────────────────────────────────
  {
    category: "History",
    icon: "🏛️",
    fact: "Cleopatra lived closer in time to the Moon landing (1969) than to the construction of the Great Pyramid of Giza.",
    source: "Timeline Facts",
  },
  {
    category: "History",
    icon: "📜",
    fact: "The Great Wall of China was built over 2,000 years by multiple dynasties — it is NOT visible from space with the naked eye.",
    source: "NASA",
  },
  {
    category: "History",
    icon: "🦕",
    fact: "Oxford University is older than the Aztec Empire. Teaching began there around 1096; the Aztec Empire was founded in 1428.",
    source: "Historical Records",
  },
  {
    category: "History",
    icon: "🏹",
    fact: "Ancient Egyptians used moldy bread as an antibiotic centuries before penicillin was officially discovered in 1928.",
    source: "Medical History",
  },
  {
    category: "History",
    icon: "📡",
    fact: "The fax machine was invented in 1843 — 33 years before the telephone! Alexander Bain patented it in Scotland.",
    source: "Patent Records",
  },
  {
    category: "History",
    icon: "🌏",
    fact: "India had the world's largest economy for 1,700 of the last 2,000 years — until the 1800s.",
    source: "Angus Maddison, OECD",
  },

  // ── Geography ────────────────────────────────────────────────────────────
  {
    category: "Geography",
    icon: "🏔️",
    fact: "Mount Everest is NOT the closest point to space! Chimborazo in Ecuador is the farthest point from Earth's centre due to the equatorial bulge.",
    source: "Geography Facts",
  },
  {
    category: "Geography",
    icon: "🌊",
    fact: "The Pacific Ocean is larger than all of Earth's landmasses combined — it covers about 165 million km².",
    source: "NOAA",
  },
  {
    category: "Geography",
    icon: "🇷🇺",
    fact: "Russia spans 11 time zones — if it were a continent, it would be the largest on Earth, bigger than Antarctica!",
  },
  {
    category: "Geography",
    icon: "🏝️",
    fact: "Canada has the world's longest coastline — over 202,000 km, more than the next 5 countries combined.",
    source: "World Atlas",
  },
  {
    category: "Geography",
    icon: "🌋",
    fact: "The Sahara Desert was green and lush just 6,000 years ago, supporting hippos, crocodiles, and ancient human settlements.",
    source: "Archaeological Evidence",
  },

  // ── GK ───────────────────────────────────────────────────────────────────
  {
    category: "GK",
    icon: "🎵",
    fact: "The song \"Happy Birthday to You\" was the most recognised song in the English language for decades — and was copyrighted until 2016!",
  },
  {
    category: "GK",
    icon: "🧠",
    fact: "Your brain generates enough electricity while you're awake to power a small LED bulb — about 20 watts.",
    source: "Neuroscience",
  },
  {
    category: "GK",
    icon: "🍯",
    fact: "Honey never spoils. Archaeologists found 3,000-year-old honey in Egyptian tombs — and it was still perfectly edible!",
    source: "Archaeology",
  },
  {
    category: "GK",
    icon: "🐘",
    fact: "Elephants are the only animals that cannot jump. They also mourn their dead and recognise themselves in mirrors.",
    source: "Animal Behaviour Studies",
  },
  {
    category: "GK",
    icon: "💤",
    fact: "Humans are the only animals that willingly delay sleep. Every other animal sleeps when tired — no alarm clocks needed!",
    source: "Sleep Science",
  },
  {
    category: "GK",
    icon: "🌙",
    fact: "A day on Venus is longer than its year. Venus takes 243 Earth days to rotate but only 225 days to orbit the Sun.",
    source: "NASA",
  },
  {
    category: "GK",
    icon: "🐋",
    fact: "A blue whale's heartbeat can be heard from 3 km away. Its heart is the size of a small car and beats just 8–10 times per minute.",
    source: "Marine Biology",
  },
];
