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

  // ── More Science ─────────────────────────────────────────────────────────
  {
    category: "Science",
    icon: "🌡️",
    fact: "A lightning bolt is 5 times hotter than the surface of the Sun — reaching around 30,000 Kelvin (vs ~5,778 K for the Sun's surface).",
    source: "NOAA",
  },
  {
    category: "Science",
    icon: "🐌",
    fact: "Snails can sleep for up to 3 years during periods of drought or extreme cold, slowing their metabolism to survive.",
  },
  {
    category: "Science",
    icon: "🐝",
    fact: "Bees can recognise human faces using the same technique humans use — they process face parts holistically. Scientists confirmed this in 2010.",
    source: "Journal of Experimental Biology",
  },
  {
    category: "Science",
    icon: "🦦",
    fact: "Sea otters hold hands while sleeping so they don't drift apart from each other — this behaviour is called a 'raft'.",
  },
  {
    category: "Science",
    icon: "🦐",
    fact: "The Mantis Shrimp has 16 types of colour receptors in its eyes — compared to just 3 in humans. It can see ultraviolet and infrared light.",
    source: "Marine Biology",
  },
  {
    category: "Science",
    icon: "🌟",
    fact: "There are more stars in the universe than grains of sand on ALL of Earth's beaches — an estimated 2 × 10²⁴ stars!",
    source: "University of Hawaii, 2003",
  },
  {
    category: "Science",
    icon: "👃",
    fact: "The human nose can detect over 1 trillion different smells — far more than the 10,000 scientists used to believe.",
    source: "Science, 2014",
  },
  {
    category: "Science",
    icon: "🦈",
    fact: "Sharks are older than trees. Sharks have existed for ~450 million years; trees only appeared ~350 million years ago.",
    source: "Palaeontology",
  },
  {
    category: "Science",
    icon: "🐧",
    fact: "Male Emperor Penguins stand huddled in Antarctica for 65 days to keep their eggs warm during winter, not eating the entire time.",
    source: "National Geographic",
  },
  {
    category: "Science",
    icon: "🧠",
    fact: "Your brain is more active at night than during the day. Neurons fire more intensely during sleep, consolidating memories.",
    source: "Neuroscience",
  },
  {
    category: "Science",
    icon: "🫁",
    fact: "If you spread out your lungs flat they would cover the size of a tennis court — about 70 square metres of surface area.",
    source: "Physiology",
  },
  {
    category: "Science",
    icon: "🦠",
    fact: "Your body contains about 38 trillion bacteria — almost equal to the number of human cells. Most live in your gut.",
    source: "Cell, 2016",
  },
  {
    category: "Science",
    icon: "🐸",
    fact: "A wood frog can survive being completely frozen solid during winter. It stops breathing & its heart stops — then thaws and hops away in spring.",
  },
  {
    category: "Science",
    icon: "🌊",
    fact: "The pressure at the deepest part of the ocean (Mariana Trench, ~11 km deep) is over 1,000 times the pressure at sea level.",
    source: "NOAA",
  },
  {
    category: "Science",
    icon: "🪲",
    fact: "Dung beetles are the strongest animals on Earth relative to their size — they can pull 1,141 times their own body weight.",
    source: "Biology Letters, 2010",
  },

  // ── More Maths ───────────────────────────────────────────────────────────
  {
    category: "Maths",
    icon: "🔢",
    fact: "111,111,111 × 111,111,111 = 12,345,678,987,654,321. The digits count up to 9 and back down — a beautiful number pattern!",
  },
  {
    category: "Maths",
    icon: "🎲",
    fact: "On a standard dice (plural: dice), opposite faces always add up to 7. One faces six, two faces five, three faces four.",
  },
  {
    category: "Maths",
    icon: "🔢",
    fact: "The number GOOGOL is 10 to the power of 100 — a 1 followed by 100 zeroes. Google named itself after this number.",
  },
  {
    category: "Maths",
    icon: "♾️",
    fact: "If you counted every number from 1 to 1 billion (one per second, without stopping), it would take over 31 years.",
  },
  {
    category: "Maths",
    icon: "🌻",
    fact: "Young Gauss (age ~9) was told to add 1+2+3…+100. He instantly answered 5,050 by pairing: 1+100, 2+99, 3+98… (50 pairs of 101).",
    source: "Mathematical history",
  },
  {
    category: "Maths",
    icon: "🇮🇳",
    fact: "Zero (0) was invented in India. The mathematician Aryabhata used it in 498 CE, and Brahmagupta defined its rules in 628 CE.",
    source: "History of Mathematics",
  },
  {
    category: "Maths",
    icon: "📐",
    fact: "A Möbius strip has only ONE surface and ONE edge. Cut it down the middle and you get one big loop — not two separate ones!",
  },
  {
    category: "Maths",
    icon: "🌀",
    fact: "Fractal patterns repeat at every scale. Zoom into a coastline, a fern leaf, or a snowflake — the same jagged pattern appears forever.",
  },
  {
    category: "Maths",
    icon: "🎯",
    fact: "The number pi (π) appears not just in circles — it shows up in probability, waves, statistics, and even the distribution of prime numbers.",
  },
  {
    category: "Maths",
    icon: "🔺",
    fact: "A triangle is the most stable geometric shape. That's why engineers use triangles in bridges, cranes, and roof trusses.",
  },

  // ── More History ─────────────────────────────────────────────────────────
  {
    category: "History",
    icon: "🏛️",
    fact: "The Great Wall of China took over 1,000 years to build across multiple dynasties. In total, more than 1 million workers laboured on it.",
    source: "UNESCO",
  },
  {
    category: "History",
    icon: "👑",
    fact: "Napoleon Bonaparte was not short! He was 5 feet 7 inches (~170 cm) — average height for a Frenchman of his era. The 'short' story was British propaganda.",
    source: "Historical Records",
  },
  {
    category: "History",
    icon: "🏛️",
    fact: "The Great Pyramid of Giza was the tallest man-made structure on Earth for 3,800 years (until Lincoln Cathedral in 1311 CE).",
  },
  {
    category: "History",
    icon: "🔬",
    fact: "Ancient Egyptians used fingerprinting as a signature on legal documents as far back as 3000 BCE — long before modern forensic science.",
    source: "Forensic History",
  },
  {
    category: "History",
    icon: "📚",
    fact: "Mahatma Gandhi never won the Nobel Peace Prize, despite being nominated five times (1937, 1938, 1939, 1947, 1948). The Nobel Committee later called this an omission.",
    source: "Nobel Prize Committee",
  },
  {
    category: "History",
    icon: "🏛️",
    fact: "The shortest war in history lasted just 38–45 minutes — the Anglo-Zanzibar War of 1896, fought between Britain and the Sultanate of Zanzibar.",
    source: "Guinness World Records",
  },
  {
    category: "History",
    icon: "🦕",
    fact: "Oxford University is older than the Aztec Empire. Teaching at Oxford began around 1096 CE; the Aztec Empire was founded in 1428 CE.",
    source: "Historical Records",
  },
  {
    category: "History",
    icon: "🏹",
    fact: "The ancient Romans used crushed mouse brains as toothpaste, and Egyptians used a mixture of ox hoof ashes and burnt eggshells.",
    source: "Medical History",
  },
  {
    category: "History",
    icon: "📖",
    fact: "The world's oldest novel is considered to be 'The Tale of Genji', written by Japanese noblewoman Murasaki Shikibu around 1000 CE.",
    source: "Literary History",
  },
  {
    category: "History",
    icon: "🇮🇳",
    fact: "India had the world's largest economy for approximately 1,700 of the last 2,000 years — until the 1800s under British rule.",
    source: "Angus Maddison, OECD",
  },

  // ── More Geography ───────────────────────────────────────────────────────
  {
    category: "Geography",
    icon: "🌋",
    fact: "Mount Olympus on Mars (Olympus Mons) is 3 times taller than Mount Everest — rising 21.9 km above the Martian surface.",
    source: "NASA",
  },
  {
    category: "Geography",
    icon: "🌍",
    fact: "Africa is larger than the USA, Europe, China, India, Japan, and Mexico — all combined! Africa covers 30.4 million km².",
    source: "World Atlas",
  },
  {
    category: "Geography",
    icon: "🏖️",
    fact: "The Dead Sea is so salty (34% salinity vs 3.5% for normal seawater) that you float effortlessly without swimming.",
  },
  {
    category: "Geography",
    icon: "🍁",
    fact: "Canada has more lakes than all other countries combined — over 60% of the world's lakes are in Canada.",
    source: "World Atlas",
  },
  {
    category: "Geography",
    icon: "🌊",
    fact: "The Maldives is the world's lowest-lying country, with an average elevation of just 1.5 metres above sea level.",
    source: "Geography Facts",
  },
  {
    category: "Geography",
    icon: "🌏",
    fact: "Australia is wider than the Moon! Australia's east-west span is about 4,000 km; the Moon's diameter is only 3,476 km.",
  },
  {
    category: "Geography",
    icon: "🌿",
    fact: "The Amazon Rainforest produces about 20% of the world's oxygen and is home to approximately 10% of all species on Earth.",
    source: "WWF",
  },
  {
    category: "Geography",
    icon: "🌊",
    fact: "Lake Baikal in Russia is the world's deepest lake (1,642 m) and contains about 20% of Earth's entire surface fresh water.",
    source: "UNESCO",
  },
  {
    category: "Geography",
    icon: "🗾",
    fact: "Japan has over 6,800 islands — most of them uninhabited. Only about 430 are permanently populated.",
    source: "Japanese Coast Guard",
  },
  {
    category: "Geography",
    icon: "🌵",
    fact: "The Sahara Desert was green and lush just 6,000 years ago, supporting hippos, crocodiles, and human farming communities.",
    source: "Archaeological Evidence",
  },

  // ── More GK ──────────────────────────────────────────────────────────────
  {
    category: "GK",
    icon: "📚",
    fact: "The most translated book in the world is the Bible — available in over 3,600 languages. The second most translated is Pinocchio!",
    source: "UBS",
  },
  {
    category: "GK",
    icon: "👁️",
    fact: "The average person blinks about 17 times per minute — around 10,000 times per day. Each blink lasts about 150–400 milliseconds.",
    source: "Ophthalmology Research",
  },
  {
    category: "GK",
    icon: "🐟",
    fact: "Goldfish can remember things for up to 3 months — the '3-second memory' myth is completely false! They can be trained to press levers.",
    source: "Animal Behaviour",
  },
  {
    category: "GK",
    icon: "🗼",
    fact: "The Eiffel Tower can be up to 15 cm taller in summer — metal expands when it heats up, making the tower visibly taller on hot days.",
    source: "Physics",
  },
  {
    category: "GK",
    icon: "🦉",
    fact: "A group of owls is called a 'parliament'. A group of flamingos is a 'flamboyance', and a group of crows is a 'murder'.",
  },
  {
    category: "GK",
    icon: "🚶",
    fact: "The average person will walk about 160,000 km in their lifetime — roughly 4 times around the Earth's equator!",
    source: "Health Research",
  },
  {
    category: "GK",
    icon: "🔊",
    fact: "Sound travels about 4 times faster through water than through air — about 1,484 m/s in water vs 343 m/s in air.",
    source: "Physics",
  },
  {
    category: "GK",
    icon: "🍊",
    fact: "Oranges are not the richest source of Vitamin C — bell peppers, kiwifruit, and broccoli all contain more Vitamin C per gram.",
    source: "Nutrition Science",
  },
  {
    category: "GK",
    icon: "🐝",
    fact: "Honey is the only natural food that never spoils. Archaeologists found 3,000-year-old honey in Egyptian tombs — still edible!",
    source: "Archaeology",
  },
  {
    category: "GK",
    icon: "🌙",
    fact: "On the Moon, you would weigh about 1/6th of your Earth weight — the Moon's gravity is only 1.62 m/s² vs Earth's 9.8 m/s².",
    source: "NASA",
  },

  // ── Technology ───────────────────────────────────────────────────────────
  {
    category: "Technology",
    icon: "🖱️",
    fact: "The first computer mouse was made of wood! Douglas Engelbart invented it in 1964 — it was a wooden block with one button.",
    source: "Computer History Museum",
  },
  {
    category: "Technology",
    icon: "🌐",
    fact: "The world's first website is still live today at info.cern.ch. Tim Berners-Lee launched it on 6 August 1991.",
    source: "CERN",
  },
  {
    category: "Technology",
    icon: "🔍",
    fact: "Google processes over 8.5 billion searches every single day — that's roughly 99,000 searches every second.",
    source: "Google Statistics, 2023",
  },
  {
    category: "Technology",
    icon: "🚀",
    fact: "Your smartphone has more computing power than the computers that guided Apollo 11 to the Moon in 1969. The Moon mission ran on 4 KB of RAM!",
    source: "NASA",
  },
  {
    category: "Technology",
    icon: "📧",
    fact: "Email was invented before the World Wide Web. Ray Tomlinson sent the first electronic mail in 1971; the WWW was created in 1991.",
    source: "Computer History Museum",
  },
  {
    category: "Technology",
    icon: "🦠",
    fact: "The first computer virus (Creeper, 1971) wasn't malicious — it just displayed 'I'M THE CREEPER, CATCH ME IF YOU CAN!' across network machines.",
    source: "Computing History",
  },
  {
    category: "Technology",
    icon: "💾",
    fact: "About 90% of all data in the world was created in just the last 2 years. Over 2.5 quintillion bytes of data are generated every day.",
    source: "Forbes, 2023",
  },
  {
    category: "Technology",
    icon: "📸",
    fact: "The first Instagram photo was posted by co-founder Kevin Systrom on 16 July 2010 — it was a picture of a dog at a taco stand.",
    source: "Instagram History",
  },
  {
    category: "Technology",
    icon: "💻",
    fact: "There are over 700 programming languages in existence — though only about 20-30 are widely used today. The oldest still-in-use is COBOL (1959).",
    source: "TIOBE Index",
  },
  {
    category: "Technology",
    icon: "@",
    fact: "The @ symbol in email addresses was chosen by Ray Tomlinson in 1971 because it was 'not commonly used' in names, making it a perfect separator.",
    source: "Ray Tomlinson",
  },

  // ── Science — batch 2 ────────────────────────────────────────────────────
  {
    category: "Science",
    icon: "🌈",
    fact: "A rainbow is actually a full circle — you only see a semicircle because the ground gets in the way. From an aeroplane you can sometimes see the whole ring!",
    source: "Optics",
  },
  {
    category: "Science",
    icon: "🧲",
    fact: "If you cut a magnet in half, you don't get a north pole and a south pole — you get two smaller magnets, each with their own north and south!",
    source: "Physics",
  },
  {
    category: "Science",
    icon: "🌙",
    fact: "The Moon is slowly drifting away from Earth at about 3.8 cm per year — roughly the speed at which your fingernails grow.",
    source: "NASA",
  },
  {
    category: "Science",
    icon: "🦴",
    fact: "Babies are born with around 270 bones, but adults have only 206. Bones fuse together as we grow — most by age 25.",
    source: "Anatomy",
  },
  {
    category: "Science",
    icon: "💧",
    fact: "Water is the only natural substance found in all three states — solid, liquid, and gas — at temperatures common on Earth's surface.",
  },
  {
    category: "Science",
    icon: "🌞",
    fact: "The Sun accounts for 99.86% of all the mass in our solar system. Everything else — all 8 planets, moons, asteroids — makes up just 0.14%.",
    source: "NASA",
  },
  {
    category: "Science",
    icon: "🧪",
    fact: "Oxygen was discovered independently by Carl Scheele (1772) and Joseph Priestley (1774) — but Antoine Lavoisier named it and explained its role in combustion.",
    source: "Chemistry History",
  },
  {
    category: "Science",
    icon: "🐬",
    fact: "Dolphins sleep with one eye open and one half of their brain at a time — a process called unihemispheric sleep that keeps them alert to danger.",
    source: "Marine Biology",
  },
  {
    category: "Science",
    icon: "⚗️",
    fact: "Glass is neither a solid nor a liquid — it is an amorphous solid. Old window panes appear thicker at the bottom due to old manufacturing methods, not because glass 'flows'.",
    source: "Materials Science",
  },
  {
    category: "Science",
    icon: "🦟",
    fact: "Mosquitoes are the deadliest animals on Earth — responsible for more than 1 million human deaths per year through the diseases they carry.",
    source: "WHO",
  },

  // ── Maths — batch 2 ──────────────────────────────────────────────────────
  {
    category: "Maths",
    icon: "🔁",
    fact: "The number 142857 is called a cyclic number — multiply it by 1 through 6 and you get the same digits rearranged: 142857 × 2 = 285714, × 3 = 428571…",
  },
  {
    category: "Maths",
    icon: "🎂",
    fact: "The number 1729 is called the Hardy-Ramanujan number. Ramanujan instantly recognised it as the smallest number expressible as the sum of two cubes in two different ways: 1³+12³ = 9³+10³.",
    source: "Mathematical History",
  },
  {
    category: "Maths",
    icon: "♾️",
    fact: "There are different sizes of infinity. The infinity of real numbers is provably larger than the infinity of whole numbers — Georg Cantor proved this in 1874.",
    source: "Set Theory",
  },
  {
    category: "Maths",
    icon: "🗺️",
    fact: "The Four Colour Theorem states that any map can be coloured using at most 4 colours so no two adjacent regions share the same colour. It took until 1976 to prove — using a computer!",
    source: "Graph Theory",
  },
  {
    category: "Maths",
    icon: "🔢",
    fact: "Zero is the only number that is neither positive nor negative. It was one of India's greatest gifts to mathematics — formalised by Brahmagupta in 628 CE.",
    source: "History of Mathematics",
  },

  // ── History — batch 2 ────────────────────────────────────────────────────
  {
    category: "History",
    icon: "🏺",
    fact: "Ancient Greeks invented the alarm clock around 250 BCE. Ctesibius of Alexandria built a water clock (clepsydra) that used a whistle to wake people at a set time.",
    source: "Ancient History",
  },
  {
    category: "History",
    icon: "⚔️",
    fact: "The Mongol Empire was the largest contiguous land empire in history, covering 24 million km² at its peak — about 16% of Earth's total land area.",
    source: "Historical Records",
  },
  {
    category: "History",
    icon: "🇮🇳",
    fact: "India invented the game of Chess (Chaturanga) around 600 CE. It then spread to Persia, the Arab world, and eventually Europe — where the modern rules evolved.",
    source: "History of Games",
  },
  {
    category: "History",
    icon: "🏛️",
    fact: "Ancient Romans had fast food restaurants called 'thermopolia' — street counters with built-in clay pots for keeping food warm. Over 80 have been found in Pompeii alone.",
    source: "Roman History",
  },
  {
    category: "History",
    icon: "📜",
    fact: "The Magna Carta (1215) was the first document to limit the power of an English king — King John was forced to sign it by rebellious barons. It laid foundations for modern democracy.",
    source: "British History",
  },
  {
    category: "History",
    icon: "🌍",
    fact: "The Berlin Wall fell on 9 November 1989 after standing for 28 years. It had divided East and West Berlin since 1961 and became a global symbol of the Cold War.",
    source: "Modern History",
  },

  // ── Geography — batch 2 ──────────────────────────────────────────────────
  {
    category: "Geography",
    icon: "🌊",
    fact: "Norway has the world's longest fjord — the Sognefjord stretches 204 km inland and reaches depths of over 1,300 metres.",
    source: "Geography",
  },
  {
    category: "Geography",
    icon: "🏔️",
    fact: "Antarctica is the highest continent on Earth by average elevation (~2,300 m). It also holds 90% of the world's ice and 70% of its fresh water.",
    source: "Geography",
  },
  {
    category: "Geography",
    icon: "🇧🇷",
    fact: "Brazil is so large it shares a border with every South American country except Chile and Ecuador — 10 out of 12 neighbouring countries.",
    source: "World Atlas",
  },
  {
    category: "Geography",
    icon: "🌵",
    fact: "Antarctica is technically a desert — it receives less than 200 mm of precipitation per year, making it drier than the Sahara.",
    source: "Geography",
  },
  {
    category: "Geography",
    icon: "🗻",
    fact: "India is home to 9 of the world's 14 mountains over 8,000 metres, all in the Himalayas and Karakoram range.",
    source: "Geography",
  },

  // ── GK — batch 2 ─────────────────────────────────────────────────────────
  {
    category: "GK",
    icon: "🎮",
    fact: "The video game industry is now larger than the global film and music industries combined — generating over $180 billion per year worldwide.",
    source: "Industry Reports, 2023",
  },
  {
    category: "GK",
    icon: "🐜",
    fact: "Ants never sleep. They take hundreds of short power naps (about 1 minute each) throughout the day instead of one long sleep like humans.",
    source: "Entomology",
  },
  {
    category: "GK",
    icon: "🌡️",
    fact: "The coldest natural temperature ever recorded on Earth was −89.2°C at the Soviet Vostok Station in Antarctica on 21 July 1983.",
    source: "WMO",
  },
  {
    category: "GK",
    icon: "📱",
    fact: "More people on Earth have access to a mobile phone than to a flush toilet. As of 2023, there are more active mobile phones than humans on the planet.",
    source: "UN Reports",
  },
  {
    category: "GK",
    icon: "🦁",
    fact: "A lion's roar can be heard from up to 8 km away. Lions roar to communicate territory boundaries and to locate other members of their pride.",
    source: "National Geographic",
  },

  // ── Technology — batch 2 ─────────────────────────────────────────────────
  {
    category: "Technology",
    icon: "🤖",
    fact: "The word 'Robot' was first used in a 1920 Czech play called R.U.R. by Karel Čapek. It comes from the Czech word 'robota' meaning forced labour.",
    source: "Etymology",
  },
  {
    category: "Technology",
    icon: "🛰️",
    fact: "There are over 8,000 tonnes of space debris orbiting Earth — including defunct satellites, rocket stages, and fragments from collisions.",
    source: "ESA, 2023",
  },
  {
    category: "Technology",
    icon: "💡",
    fact: "Thomas Edison didn't invent the light bulb — he improved it. Humphry Davy created the first electric arc lamp in 1802, nearly 80 years before Edison's patent.",
    source: "Science History",
  },
  {
    category: "Technology",
    icon: "🔋",
    fact: "The first rechargeable battery was invented by French physicist Gaston Planté in 1859 — a lead-acid battery, the same basic technology still used in cars today.",
    source: "Technology History",
  },
  {
    category: "Technology",
    icon: "🌐",
    fact: "If you put all the data on the internet onto DVDs and stacked them up, the stack would reach from Earth to the Moon — and back — more than 300 times.",
    source: "Data Statistics, 2023",
  },
];
