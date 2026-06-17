/**
 * Content bank for daily "Learn" Instagram cards.
 * Each entry is one 1080×1080 card posted once per day.
 *
 * Types:
 *   "formula" – numbered rows: { n, label, formula }
 *   "vocab"   – 2-column comparison: { wrong, right }
 *   "facts"   – emoji bullet list: { icon, text }
 *
 * Subjects: Mathematics | English | Science | GK | History | Geography
 */
module.exports = [

  // ── Mathematics ─────────────────────────────────────────────────────────
  { id:"ml-m-001", subject:"Mathematics", type:"formula", color:"#2563EB",
    heading:"PERCENTAGE\nFORMULAS",
    items:[
      { n:1, label:"% of a number", formula:"(x ÷ 100) × n" },
      { n:2, label:"% increase", formula:"(diff ÷ orig) × 100" },
      { n:3, label:"After x% increase", formula:"n × (1 + x/100)" },
      { n:4, label:"After x% decrease", formula:"n × (1 − x/100)" },
      { n:5, label:"x is what % of y?", formula:"(x ÷ y) × 100" },
      { n:6, label:"Find original value", formula:"val ÷ (1 ± x/100)" },
    ]},

  { id:"ml-m-002", subject:"Mathematics", type:"formula", color:"#2563EB",
    heading:"AREA\nFORMULAS",
    items:[
      { n:1, label:"Square", formula:"side²" },
      { n:2, label:"Rectangle", formula:"length × width" },
      { n:3, label:"Triangle", formula:"(base × height) ÷ 2" },
      { n:4, label:"Circle", formula:"π × radius²" },
      { n:5, label:"Parallelogram", formula:"base × height" },
      { n:6, label:"Trapezium", formula:"½ × (a + b) × h" },
    ]},

  { id:"ml-m-003", subject:"Mathematics", type:"formula", color:"#2563EB",
    heading:"PERIMETER\nFORMULAS",
    items:[
      { n:1, label:"Square", formula:"4 × side" },
      { n:2, label:"Rectangle", formula:"2 × (l + w)" },
      { n:3, label:"Triangle", formula:"a + b + c" },
      { n:4, label:"Circle (Circumference)", formula:"2 × π × r" },
      { n:5, label:"Parallelogram", formula:"2 × (a + b)" },
      { n:6, label:"Rhombus", formula:"4 × side" },
    ]},

  { id:"ml-m-004", subject:"Mathematics", type:"formula", color:"#2563EB",
    heading:"PROFIT & LOSS\nFORMULAS",
    items:[
      { n:1, label:"Profit", formula:"SP − CP" },
      { n:2, label:"Loss", formula:"CP − SP" },
      { n:3, label:"Profit %", formula:"(Profit ÷ CP) × 100" },
      { n:4, label:"Loss %", formula:"(Loss ÷ CP) × 100" },
      { n:5, label:"SP (with profit)", formula:"CP × (1 + P/100)" },
      { n:6, label:"SP (with loss)", formula:"CP × (1 − L/100)" },
    ]},

  { id:"ml-m-005", subject:"Mathematics", type:"formula", color:"#2563EB",
    heading:"SIMPLE &\nCOMPOUND INTEREST",
    items:[
      { n:1, label:"Simple Interest", formula:"(P × R × T) ÷ 100" },
      { n:2, label:"Amount (SI)", formula:"P + SI" },
      { n:3, label:"Compound Interest", formula:"P(1 + R/100)ⁿ − P" },
      { n:4, label:"Amount (CI)", formula:"P × (1 + R/100)ⁿ" },
      { n:5, label:"Rate (SI)", formula:"(SI × 100) ÷ (P × T)" },
      { n:6, label:"Time (SI)", formula:"(SI × 100) ÷ (P × R)" },
    ]},

  { id:"ml-m-006", subject:"Mathematics", type:"facts", color:"#2563EB",
    heading:"DIVISIBILITY\nRULES",
    items:[
      { icon:"⚡", text:"÷ 2: last digit is even (0,2,4,6,8)" },
      { icon:"⚡", text:"÷ 3: sum of all digits divisible by 3 (e.g. 123 → 6 ✓)" },
      { icon:"⚡", text:"÷ 4: last two digits divisible by 4 (e.g. 132 → 32 ÷ 4 ✓)" },
      { icon:"⚡", text:"÷ 5: last digit is 0 or 5" },
      { icon:"⚡", text:"÷ 6: divisible by both 2 AND 3" },
      { icon:"⚡", text:"÷ 9: sum of all digits divisible by 9 (e.g. 729 → 18 ✓)" },
      { icon:"⚡", text:"÷ 11: alternate digit difference = 0 or 11" },
    ]},

  { id:"ml-m-007", subject:"Mathematics", type:"formula", color:"#2563EB",
    heading:"VOLUME\nFORMULAS",
    items:[
      { n:1, label:"Cube", formula:"side³" },
      { n:2, label:"Cuboid", formula:"l × w × h" },
      { n:3, label:"Cylinder", formula:"π × r² × h" },
      { n:4, label:"Cone", formula:"(1/3) × π × r² × h" },
      { n:5, label:"Sphere", formula:"(4/3) × π × r³" },
      { n:6, label:"Hemisphere", formula:"(2/3) × π × r³" },
    ]},

  { id:"ml-m-008", subject:"Mathematics", type:"facts", color:"#2563EB",
    heading:"SQUARE ROOTS\nTO MEMORISE",
    items:[
      { icon:"√", text:"√4 = 2    √9 = 3    √16 = 4    √25 = 5" },
      { icon:"√", text:"√36 = 6    √49 = 7    √64 = 8    √81 = 9" },
      { icon:"√", text:"√100 = 10    √121 = 11    √144 = 12" },
      { icon:"√", text:"√169 = 13    √196 = 14    √225 = 15" },
      { icon:"√", text:"√256 = 16    √289 = 17    √324 = 18" },
      { icon:"√", text:"√361 = 19    √400 = 20    √625 = 25" },
    ]},

  { id:"ml-m-009", subject:"Mathematics", type:"formula", color:"#2563EB",
    heading:"SPEED, DISTANCE\n& TIME",
    items:[
      { n:1, label:"Speed", formula:"Distance ÷ Time" },
      { n:2, label:"Distance", formula:"Speed × Time" },
      { n:3, label:"Time", formula:"Distance ÷ Speed" },
      { n:4, label:"Average Speed", formula:"Total Dist ÷ Total Time" },
      { n:5, label:"km/h → m/s", formula:"× 5/18" },
      { n:6, label:"m/s → km/h", formula:"× 18/5" },
    ]},

  { id:"ml-m-010", subject:"Mathematics", type:"facts", color:"#2563EB",
    heading:"ANGLES &\nTRIANGLES",
    items:[
      { icon:"📐", text:"Sum of angles in a triangle = 180°" },
      { icon:"📐", text:"Sum of angles in a quadrilateral = 360°" },
      { icon:"📐", text:"Sum of interior angles of n-gon = (n−2) × 180°" },
      { icon:"📐", text:"Exterior angle = sum of two non-adjacent interior angles" },
      { icon:"📐", text:"Equilateral triangle: all sides equal, all angles = 60°" },
      { icon:"📐", text:"Pythagorean triples to know: 3-4-5, 5-12-13, 8-15-17" },
    ]},

  { id:"ml-m-011", subject:"Mathematics", type:"formula", color:"#2563EB",
    heading:"ALGEBRAIC\nIDENTITIES",
    items:[
      { n:1, label:"(a+b)²", formula:"a² + 2ab + b²" },
      { n:2, label:"(a−b)²", formula:"a² − 2ab + b²" },
      { n:3, label:"(a+b)(a−b)", formula:"a² − b²" },
      { n:4, label:"(a+b)³", formula:"a³ + 3a²b + 3ab² + b³" },
      { n:5, label:"a³ + b³", formula:"(a+b)(a² − ab + b²)" },
      { n:6, label:"a³ − b³", formula:"(a−b)(a² + ab + b²)" },
    ]},

  { id:"ml-m-012", subject:"Mathematics", type:"facts", color:"#2563EB",
    heading:"MULTIPLICATION\nTRICKS",
    items:[
      { icon:"⚡", text:"× 9: multiply by 10, subtract the number (46×9 = 460−46 = 414)" },
      { icon:"⚡", text:"× 11: sum adjacent digits, place between (27×11 = 2, 9, 7 = 297)" },
      { icon:"⚡", text:"× 25: divide by 4, then × 100 (48×25 = 12×100 = 1200)" },
      { icon:"⚡", text:"× 5: multiply by 10, then halve (46×5 = 460÷2 = 230)" },
      { icon:"⚡", text:"× 12: × 10 + double the number (8×12 = 80+16 = 96)" },
      { icon:"⚡", text:"Squaring 5s: 35² = 3×4 then 25 → 1225 (always ends in 25)" },
    ]},

  { id:"ml-m-013", subject:"Mathematics", type:"formula", color:"#2563EB",
    heading:"HCF & LCM\nQUICK RULES",
    items:[
      { n:1, label:"HCF", formula:"Highest Common Factor" },
      { n:2, label:"LCM", formula:"Lowest Common Multiple" },
      { n:3, label:"Key relation", formula:"HCF × LCM = a × b" },
      { n:4, label:"HCF method", formula:"Prime factors — lowest powers" },
      { n:5, label:"LCM method", formula:"Prime factors — highest powers" },
      { n:6, label:"Co-prime numbers", formula:"Two numbers with HCF = 1" },
    ]},

  { id:"ml-m-014", subject:"Mathematics", type:"formula", color:"#2563EB",
    heading:"RATIO &\nPROPORTION",
    items:[
      { n:1, label:"Ratio a : b", formula:"a ÷ b (simplify by HCF)" },
      { n:2, label:"Equivalent ratio", formula:"a:b = ka:kb" },
      { n:3, label:"Proportion (cross-mult)", formula:"a×d = b×c" },
      { n:4, label:"Mean proportion", formula:"b² = a × c → b = √(ac)" },
      { n:5, label:"Direct proportion", formula:"y ∝ x → y = kx" },
      { n:6, label:"Inverse proportion", formula:"y ∝ 1/x → xy = k" },
    ]},

  { id:"ml-m-015", subject:"Mathematics", type:"facts", color:"#2563EB",
    heading:"PRIME NUMBER\nFACTS",
    items:[
      { icon:"🔢", text:"2 is the ONLY even prime number" },
      { icon:"🔢", text:"1 is NOT prime — primes need exactly 2 factors" },
      { icon:"🔢", text:"Primes up to 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29" },
      { icon:"🔢", text:"To test if n is prime: check divisors only up to √n" },
      { icon:"🔢", text:"Twin primes: pairs differing by 2 (11 & 13, 17 & 19, 29 & 31)" },
      { icon:"🔢", text:"Every even number > 2 = sum of two primes (Goldbach's conjecture)" },
    ]},

  // ── English ─────────────────────────────────────────────────────────────
  { id:"ml-e-001", subject:"English", type:"vocab", color:"#0EA5A4",
    heading:"UPGRADE YOUR\nVOCABULARY",
    items:[
      { wrong:"Very tired", right:"Exhausted" },
      { wrong:"Very happy", right:"Elated" },
      { wrong:"Very sad", right:"Devastated" },
      { wrong:"Very angry", right:"Furious" },
      { wrong:"Very scared", right:"Terrified" },
      { wrong:"Very hungry", right:"Famished" },
      { wrong:"Very smart", right:"Brilliant" },
    ]},

  { id:"ml-e-002", subject:"English", type:"vocab", color:"#0EA5A4",
    heading:"POWER WORDS\nVOCABULARY",
    items:[
      { wrong:"Very big", right:"Enormous" },
      { wrong:"Very small", right:"Minute/Tiny" },
      { wrong:"Very fast", right:"Rapid/Swift" },
      { wrong:"Very slow", right:"Sluggish" },
      { wrong:"Very cold", right:"Freezing" },
      { wrong:"Very hot", right:"Scorching" },
      { wrong:"Very good", right:"Exceptional" },
    ]},

  { id:"ml-e-003", subject:"English", type:"vocab", color:"#0EA5A4",
    heading:"PRECISE WORDS\nVOCABULARY",
    items:[
      { wrong:"Very bad", right:"Terrible/Awful" },
      { wrong:"Very beautiful", right:"Stunning" },
      { wrong:"Very dirty", right:"Filthy" },
      { wrong:"Very clean", right:"Spotless/Pristine" },
      { wrong:"Very loud", right:"Deafening" },
      { wrong:"Very quiet", right:"Silent/Hushed" },
      { wrong:"Very old", right:"Ancient/Antique" },
    ]},

  { id:"ml-e-004", subject:"English", type:"facts", color:"#0EA5A4",
    heading:"ITS vs IT'S\n& THEIR TRAPS",
    items:[
      { icon:"✓", text:"it's = it is / it has → It's raining outside." },
      { icon:"✓", text:"its = belonging to it → The cat licked its paw." },
      { icon:"✓", text:"your = belonging to you → Is that your book?" },
      { icon:"✓", text:"you're = you are → You're doing great!" },
      { icon:"✓", text:"their = belonging to them → Their house is big." },
      { icon:"✓", text:"there = a place → Put it over there." },
      { icon:"✓", text:"they're = they are → They're coming soon." },
    ]},

  { id:"ml-e-005", subject:"English", type:"facts", color:"#0EA5A4",
    heading:"PREFIXES\nTO KNOW",
    items:[
      { icon:"📚", text:"UN- = not → unhappy, unkind, unusual" },
      { icon:"📚", text:"MIS- = wrongly → misuse, misread, misunderstand" },
      { icon:"📚", text:"PRE- = before → preview, predict, prehistoric" },
      { icon:"📚", text:"RE- = again → rewrite, redo, revisit" },
      { icon:"📚", text:"DIS- = not/opposite → disagree, dishonest, dislike" },
      { icon:"📚", text:"INTER- = between → international, interrupt" },
      { icon:"📚", text:"OVER- = too much → overflow, overdo, overload" },
    ]},

  { id:"ml-e-006", subject:"English", type:"facts", color:"#0EA5A4",
    heading:"SUFFIXES\nTO KNOW",
    items:[
      { icon:"📚", text:"-FUL = full of → hopeful, beautiful, peaceful" },
      { icon:"📚", text:"-LESS = without → helpless, careless, homeless" },
      { icon:"📚", text:"-TION = the act of → education, creation, solution" },
      { icon:"📚", text:"-ER / -OR = one who does → teacher, actor" },
      { icon:"📚", text:"-MENT = state of → enjoyment, improvement" },
      { icon:"📚", text:"-ABLE = capable of → readable, lovable, flexible" },
      { icon:"📚", text:"-LY = in a way → quickly, gently, honestly" },
    ]},

  { id:"ml-e-007", subject:"English", type:"facts", color:"#0EA5A4",
    heading:"SIMILE vs\nMETAPHOR",
    items:[
      { icon:"🔍", text:"SIMILE: comparison using 'like' or 'as'" },
      { icon:"🔍", text:"She runs like the wind. (simile)" },
      { icon:"🔍", text:"His voice was as smooth as velvet. (simile)" },
      { icon:"🔍", text:"METAPHOR: direct comparison — no like/as" },
      { icon:"🔍", text:"He is a lion on the field. (metaphor)" },
      { icon:"🔍", text:"Life is a rollercoaster. (metaphor)" },
      { icon:"🔍", text:"RULE → simile uses 'like/as'; metaphor says 'IS'" },
    ]},

  { id:"ml-e-008", subject:"English", type:"facts", color:"#0EA5A4",
    heading:"ACTIVE vs\nPASSIVE VOICE",
    items:[
      { icon:"✏️", text:"ACTIVE: subject performs the action" },
      { icon:"✏️", text:"She baked the cake. (active)" },
      { icon:"✏️", text:"PASSIVE: subject receives the action" },
      { icon:"✏️", text:"The cake was baked by her. (passive)" },
      { icon:"✏️", text:"Formula: Object + was/were + past participle + by + subject" },
      { icon:"✏️", text:"The letter was written by Rahul. (passive)" },
      { icon:"✏️", text:"TIP: look for 'was/were + past participle' → passive voice" },
    ]},

  { id:"ml-e-009", subject:"English", type:"vocab", color:"#0EA5A4",
    heading:"EMOTIONS\nVOCABULARY",
    items:[
      { wrong:"Very worried", right:"Anxious" },
      { wrong:"Very pleased", right:"Delighted" },
      { wrong:"Very surprised", right:"Astonished" },
      { wrong:"Very shy", right:"Timid/Bashful" },
      { wrong:"Very brave", right:"Courageous" },
      { wrong:"Very sorry", right:"Remorseful" },
      { wrong:"Very confused", right:"Bewildered" },
    ]},

  { id:"ml-e-010", subject:"English", type:"facts", color:"#0EA5A4",
    heading:"TENSES\nAT A GLANCE",
    items:[
      { icon:"⏰", text:"SIMPLE PRESENT: I eat / She eats (habit/truth)" },
      { icon:"⏰", text:"PRESENT CONTINUOUS: I am eating (happening now)" },
      { icon:"⏰", text:"SIMPLE PAST: I ate / She ate (completed action)" },
      { icon:"⏰", text:"PAST CONTINUOUS: I was eating (ongoing in past)" },
      { icon:"⏰", text:"SIMPLE FUTURE: I will eat (will happen)" },
      { icon:"⏰", text:"PRESENT PERFECT: I have eaten (recently completed)" },
      { icon:"⏰", text:"PAST PERFECT: I had eaten (before another past event)" },
    ]},

  { id:"ml-e-011", subject:"English", type:"facts", color:"#0EA5A4",
    heading:"IDIOMS\nYOU MUST KNOW",
    items:[
      { icon:"💬", text:"Once in a blue moon = very rarely" },
      { icon:"💬", text:"Break a leg = good luck" },
      { icon:"💬", text:"Hit the nail on the head = exactly right" },
      { icon:"💬", text:"Bite off more than you can chew = attempt too much" },
      { icon:"💬", text:"Let the cat out of the bag = reveal a secret" },
      { icon:"💬", text:"Under the weather = feeling unwell" },
      { icon:"💬", text:"A blessing in disguise = a good thing that seemed bad" },
    ]},

  { id:"ml-e-012", subject:"English", type:"facts", color:"#0EA5A4",
    heading:"FIGURES OF\nSPEECH",
    items:[
      { icon:"📖", text:"ALLITERATION: repeated consonant sounds → Peter Piper picked peppers" },
      { icon:"📖", text:"PERSONIFICATION: giving human traits to non-humans → The stars danced" },
      { icon:"📖", text:"ONOMATOPOEIA: words that sound like what they describe → buzz, crash" },
      { icon:"📖", text:"HYPERBOLE: extreme exaggeration → I've told you a million times!" },
      { icon:"📖", text:"OXYMORON: contradictory words together → bittersweet" },
      { icon:"📖", text:"IRONY: saying the opposite of what you mean" },
    ]},

  { id:"ml-e-013", subject:"English", type:"facts", color:"#0EA5A4",
    heading:"PARTS OF\nSPEECH",
    items:[
      { icon:"🗂️", text:"NOUN: naming word → Riya, school, happiness" },
      { icon:"🗂️", text:"PRONOUN: replaces noun → he, she, they, it, we" },
      { icon:"🗂️", text:"VERB: action/being word → run, think, is, was" },
      { icon:"🗂️", text:"ADJECTIVE: describes a noun → tall, red, clever" },
      { icon:"🗂️", text:"ADVERB: modifies a verb/adjective → quickly, very" },
      { icon:"🗂️", text:"CONJUNCTION: joins clauses → and, but, because" },
      { icon:"🗂️", text:"PREPOSITION: shows relation → in, on, under, beside" },
    ]},

  { id:"ml-e-014", subject:"English", type:"vocab", color:"#0EA5A4",
    heading:"COMMONLY CONFUSED\nWORDS",
    items:[
      { wrong:"Accept (to receive)", right:"Except (excluding)" },
      { wrong:"Affect (verb: influence)", right:"Effect (noun: result)" },
      { wrong:"Fewer (countable)", right:"Less (uncountable)" },
      { wrong:"Principal (main/head)", right:"Principle (a rule)" },
      { wrong:"Stationary (not moving)", right:"Stationery (paper/pens)" },
      { wrong:"Complement (complete)", right:"Compliment (praise)" },
    ]},

  { id:"ml-e-015", subject:"English", type:"facts", color:"#0EA5A4",
    heading:"DEGREES OF\nCOMPARISION",
    items:[
      { icon:"🔤", text:"POSITIVE: base form → tall (comparing no one)" },
      { icon:"🔤", text:"COMPARATIVE: comparing two → taller (add -er or 'more')" },
      { icon:"🔤", text:"SUPERLATIVE: comparing 3+ → tallest (add -est or 'most')" },
      { icon:"🔤", text:"Irregular: good → better → best" },
      { icon:"🔤", text:"Irregular: bad → worse → worst" },
      { icon:"🔤", text:"Irregular: many/much → more → most" },
      { icon:"🔤", text:"RULE: 1-syllable → -er/-est; 3+ syllables → more/most" },
    ]},

  // ── Science ─────────────────────────────────────────────────────────────
  { id:"ml-s-001", subject:"Science", type:"facts", color:"#10b981",
    heading:"AMAZING HUMAN\nBODY FACTS",
    items:[
      { icon:"🫀", text:"Heart beats ~100,000 times per day, pumping 7,500 L of blood" },
      { icon:"🧠", text:"Brain has ~86 billion neurons and generates ~20 watts of power" },
      { icon:"🦴", text:"Adults have 206 bones; babies are born with ~270 (fuse over time)" },
      { icon:"💪", text:"Body has 600+ muscles — the hardest working is the heart" },
      { icon:"👁️", text:"The human eye can distinguish ~10 million different colours" },
      { icon:"🫁", text:"Lungs breathe ~20,000 times per day, taking in ~8 L of air per min" },
    ]},

  { id:"ml-s-002", subject:"Science", type:"facts", color:"#10b981",
    heading:"PLANETS OF THE\nSOLAR SYSTEM",
    items:[
      { icon:"🪐", text:"Mercury: smallest, closest to Sun, no moons, extreme temperatures" },
      { icon:"🪐", text:"Venus: hottest planet (462°C), rotates backwards, no moons" },
      { icon:"🌍", text:"Earth: only known planet with life; 1 moon, 71% water surface" },
      { icon:"🔴", text:"Mars: Red Planet; two small moons (Phobos & Deimos)" },
      { icon:"🪐", text:"Jupiter: largest planet; Great Red Spot is a storm older than 350 years" },
      { icon:"🪐", text:"Saturn: 146 moons; rings made of ice and rock; least dense planet" },
    ]},

  { id:"ml-s-003", subject:"Science", type:"facts", color:"#10b981",
    heading:"PHOTOSYNTHESIS\nEXPLAINED",
    items:[
      { icon:"🌱", text:"Plants make food from sunlight, water (H₂O) and carbon dioxide (CO₂)" },
      { icon:"☀️", text:"Equation: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ (glucose) + 6O₂" },
      { icon:"🌿", text:"Chlorophyll in chloroplasts captures sunlight energy" },
      { icon:"🍃", text:"Stomata (tiny leaf pores) allow CO₂ in and release O₂ out" },
      { icon:"🌳", text:"Oxygen released is why forests are called 'lungs of the Earth'" },
      { icon:"🔬", text:"Photosynthesis only happens during daytime when light is available" },
    ]},

  { id:"ml-s-004", subject:"Science", type:"facts", color:"#10b981",
    heading:"STATES OF\nMATTER",
    items:[
      { icon:"🧊", text:"SOLID: fixed shape & volume; particles packed tightly (e.g. ice)" },
      { icon:"💧", text:"LIQUID: fixed volume, no fixed shape; particles mobile (e.g. water)" },
      { icon:"💨", text:"GAS: no fixed shape/volume; particles spread far apart (e.g. steam)" },
      { icon:"🔥", text:"PLASMA: 4th state; ionised gas found in stars & lightning" },
      { icon:"🌡️", text:"Melting: solid→liquid. Freezing: liquid→solid. Boiling: liquid→gas" },
      { icon:"❄️", text:"Sublimation: solid → gas directly (e.g. dry ice, naphthalene balls)" },
    ]},

  { id:"ml-s-005", subject:"Science", type:"facts", color:"#10b981",
    heading:"NEWTON'S LAWS\nOF MOTION",
    items:[
      { icon:"⚡", text:"1st Law (Inertia): object at rest stays at rest; in motion stays in motion — unless a net force acts" },
      { icon:"⚡", text:"2nd Law: Force = Mass × Acceleration (F = ma)" },
      { icon:"⚡", text:"3rd Law: For every action there is an equal & opposite reaction" },
      { icon:"🚗", text:"Example 1st Law: you lurch forward when a car stops suddenly" },
      { icon:"🚀", text:"Example 3rd Law: rocket pushes gas down → gas pushes rocket up" },
      { icon:"⚽", text:"Example 2nd Law: same force moves a light ball faster than a heavy one" },
    ]},

  { id:"ml-s-006", subject:"Science", type:"facts", color:"#10b981",
    heading:"FOOD CHAIN\n& NUTRITION",
    items:[
      { icon:"🌿", text:"Producers: plants make their own food via photosynthesis" },
      { icon:"🐛", text:"Primary Consumers (Herbivores): eat only plants (e.g. rabbits, deer)" },
      { icon:"🦊", text:"Secondary Consumers: eat primary consumers (e.g. fox, frog)" },
      { icon:"🦅", text:"Tertiary Consumers: eat secondary consumers (e.g. eagle, shark)" },
      { icon:"🍄", text:"Decomposers: break down dead matter → fungi and bacteria" },
      { icon:"☀️", text:"Energy flow: Sun → Producer → Herbivore → Carnivore → Decomposer" },
    ]},

  { id:"ml-s-007", subject:"Science", type:"facts", color:"#10b981",
    heading:"SOUND & LIGHT\nFAST FACTS",
    items:[
      { icon:"🔊", text:"Sound travels at ~340 m/s in air; CANNOT travel through vacuum" },
      { icon:"💡", text:"Light travels at 3 × 10⁸ m/s — the fastest speed in the universe" },
      { icon:"🌈", text:"White light splits into 7 colours through a prism: VIBGYOR" },
      { icon:"🔊", text:"Ultrasound: frequency > 20,000 Hz (used in medical scans & sonars)" },
      { icon:"💡", text:"Reflection: angle of incidence = angle of reflection" },
      { icon:"🔊", text:"Sound travels faster in water (1,484 m/s) than in air (340 m/s)" },
    ]},

  { id:"ml-s-008", subject:"Science", type:"facts", color:"#10b981",
    heading:"ELEMENTS YOU\nMUST KNOW",
    items:[
      { icon:"⚗️", text:"O (Oxygen) — atomic no. 8; most abundant in Earth's crust" },
      { icon:"⚗️", text:"H (Hydrogen) — atomic no. 1; lightest element in the universe" },
      { icon:"⚗️", text:"C (Carbon) — basis of all life; carbon-12 is reference for atomic mass" },
      { icon:"⚗️", text:"Fe (Iron) — symbol from Latin 'Ferrum'; Earth's core is molten iron" },
      { icon:"⚗️", text:"Au (Gold) — symbol from Latin 'Aurum'; doesn't corrode or rust" },
      { icon:"⚗️", text:"Na (Sodium) — symbol from 'Natrium'; used in table salt (NaCl)" },
    ]},

  { id:"ml-s-009", subject:"Science", type:"facts", color:"#10b981",
    heading:"THE WATER CYCLE\nEXPLAINED",
    items:[
      { icon:"☀️", text:"Evaporation: sun heats water bodies → becomes water vapour" },
      { icon:"🌿", text:"Transpiration: plants release water vapour through leaf stomata" },
      { icon:"☁️", text:"Condensation: water vapour cools → forms clouds and fog" },
      { icon:"🌧️", text:"Precipitation: water falls as rain, snow, sleet or hail" },
      { icon:"🌊", text:"Collection: water gathers in oceans, rivers, lakes, groundwater" },
      { icon:"🔄", text:"Earth's total water never changes — it just keeps cycling!" },
    ]},

  { id:"ml-s-010", subject:"Science", type:"facts", color:"#10b981",
    heading:"THE CELL: BASIC\nUNIT OF LIFE",
    items:[
      { icon:"🔬", text:"Cell Membrane: controls what enters and leaves the cell" },
      { icon:"🔬", text:"Nucleus: contains DNA — the 'control centre' of the cell" },
      { icon:"🔬", text:"Mitochondria: 'powerhouse' — produces energy (ATP) for the cell" },
      { icon:"🔬", text:"Chloroplast: found ONLY in plant cells; site of photosynthesis" },
      { icon:"🔬", text:"Cell Wall: found ONLY in plant cells; provides shape and strength" },
      { icon:"🔬", text:"Vacuole: larger in plant cells; stores water, nutrients, waste" },
    ]},

  { id:"ml-s-011", subject:"Science", type:"facts", color:"#10b981",
    heading:"ENERGY TYPES\n& EXAMPLES",
    items:[
      { icon:"⚡", text:"Kinetic: energy of motion (moving ball, flowing water, wind)" },
      { icon:"⚡", text:"Potential: stored energy (stretched spring, raised weight, a dam)" },
      { icon:"⚡", text:"Thermal: heat energy (boiling water, fire, the sun's warmth)" },
      { icon:"⚡", text:"Chemical: stored in bonds (food, fuels, batteries)" },
      { icon:"⚡", text:"Light: electromagnetic radiation (sunlight, laser, LED)" },
      { icon:"⚡", text:"Nuclear: from splitting (fission) or fusing (fusion) atoms" },
    ]},

  { id:"ml-s-012", subject:"Science", type:"facts", color:"#10b981",
    heading:"ANIMAL\nADAPTATIONS",
    items:[
      { icon:"🐪", text:"Camel: fat-storing humps; wide feet for sand; long eyelashes for dust" },
      { icon:"🐻‍❄️", text:"Polar Bear: thick fur & fat layer; white for camouflage on snow" },
      { icon:"🦅", text:"Eagle: eyesight 8× sharper than humans; hollow bones for flight" },
      { icon:"🦋", text:"Stick Insect: looks like a stick — camouflage from predators" },
      { icon:"🦈", text:"Shark: streamlined body; lateral line senses vibrations in water" },
      { icon:"🐸", text:"Frog: moist permeable skin to breathe through; webbed feet for swimming" },
    ]},

  // ── GK ───────────────────────────────────────────────────────────────────
  { id:"ml-gk-001", subject:"GK", type:"facts", color:"#f59e0b",
    heading:"INDIA FACTS\nEVERY STUDENT KNOWS",
    items:[
      { icon:"🇮🇳", text:"Capital: New Delhi  |  Currency: Indian Rupee (₹)" },
      { icon:"🇮🇳", text:"National Animal: Bengal Tiger  |  National Bird: Indian Peacock" },
      { icon:"🇮🇳", text:"National Flower: Lotus  |  National Fruit: Mango" },
      { icon:"🇮🇳", text:"National Tree: Banyan  |  National Aquatic Animal: River Dolphin" },
      { icon:"🇮🇳", text:"National Anthem: Jana Gana Mana (by Rabindranath Tagore)" },
      { icon:"🇮🇳", text:"National Song: Vande Mataram  |  National Sport: Field Hockey" },
    ]},

  { id:"ml-gk-002", subject:"GK", type:"facts", color:"#f59e0b",
    heading:"WORLD RECORD\nFAST FACTS",
    items:[
      { icon:"🌍", text:"Largest country by area: Russia (17.1 million km²)" },
      { icon:"🌍", text:"Most populous country: India (2023, surpassed China)" },
      { icon:"🌍", text:"Smallest country: Vatican City (0.44 km²)" },
      { icon:"🌊", text:"Largest ocean: Pacific (covers 30% of Earth's total surface)" },
      { icon:"🏙️", text:"Tallest building: Burj Khalifa, Dubai (828 m)" },
      { icon:"🌊", text:"Longest river: Nile, Africa (~6,650 km)" },
    ]},

  { id:"ml-gk-003", subject:"GK", type:"facts", color:"#f59e0b",
    heading:"IMPORTANT\nINVENTIONS",
    items:[
      { icon:"💡", text:"Electric Bulb: Thomas Edison (USA, 1879)" },
      { icon:"📞", text:"Telephone: Alexander Graham Bell (Scotland/USA, 1876)" },
      { icon:"✈️", text:"Aeroplane: Wright Brothers — Wilbur & Orville (USA, 1903)" },
      { icon:"📻", text:"Radio waves: Guglielmo Marconi (Italy, 1895)" },
      { icon:"💻", text:"World Wide Web: Tim Berners-Lee (UK/CERN, 1989)" },
      { icon:"🚂", text:"Steam Engine (improved): James Watt (Scotland, 1769)" },
    ]},

  { id:"ml-gk-004", subject:"GK", type:"facts", color:"#f59e0b",
    heading:"SI UNITS YOU\nMUST KNOW",
    items:[
      { icon:"📏", text:"Distance/Length: metre (m)" },
      { icon:"⚖️", text:"Mass: kilogram (kg); 1 kg = 1,000 g" },
      { icon:"⏱️", text:"Time: second (s); 1 hr = 3,600 s" },
      { icon:"🌡️", text:"Temperature: Kelvin (K); 0°C = 273 K" },
      { icon:"⚡", text:"Electric current: Ampere (A)" },
      { icon:"💡", text:"Force: Newton (N)  |  Energy: Joule (J)  |  Power: Watt (W)" },
    ]},

  { id:"ml-gk-005", subject:"GK", type:"facts", color:"#f59e0b",
    heading:"SPACE MISSION\nFAST FACTS",
    items:[
      { icon:"🚀", text:"First person in space: Yuri Gagarin (USSR, 12 April 1961)" },
      { icon:"🌙", text:"First person on the Moon: Neil Armstrong (Apollo 11, 20 July 1969)" },
      { icon:"🛰️", text:"First Indian in space: Rakesh Sharma (Soviet mission, 1984)" },
      { icon:"🛸", text:"Chandrayaan-1: India's first lunar mission (ISRO, 2008)" },
      { icon:"🛸", text:"Chandrayaan-3: first soft landing near Moon's south pole (2023)" },
      { icon:"🚀", text:"Mangalyaan: India reached Mars orbit in its FIRST attempt (2014)" },
    ]},

  { id:"ml-gk-006", subject:"GK", type:"facts", color:"#f59e0b",
    heading:"IMPORTANT\nINDIAN DAYS",
    items:[
      { icon:"🇮🇳", text:"26 January: Republic Day (Constitution came into effect, 1950)" },
      { icon:"🇮🇳", text:"15 August: Independence Day (India gained freedom, 1947)" },
      { icon:"🇮🇳", text:"2 October: Gandhi Jayanti (Birth of Mahatma Gandhi, 1869)" },
      { icon:"🌍", text:"5 June: World Environment Day" },
      { icon:"📚", text:"5 September: Teacher's Day (Birth of Dr. S. Radhakrishnan)" },
      { icon:"🔬", text:"28 February: National Science Day (Raman Effect discovered, 1928)" },
    ]},

  { id:"ml-gk-007", subject:"GK", type:"facts", color:"#f59e0b",
    heading:"CURRENCIES OF\nTHE WORLD",
    items:[
      { icon:"💰", text:"USA: Dollar ($)  |  UK: Pound (£)  |  Europe: Euro (€)" },
      { icon:"💰", text:"Japan: Yen (¥)  |  China: Yuan (¥)  |  South Korea: Won" },
      { icon:"💰", text:"India: Rupee (₹)  |  Pakistan: PKR  |  Bangladesh: Taka" },
      { icon:"💰", text:"Australia: AUD  |  Canada: CAD  |  Singapore: SGD" },
      { icon:"💰", text:"Russia: Ruble  |  UAE: Dirham  |  Saudi Arabia: Riyal" },
      { icon:"💰", text:"Brazil: Real  |  South Africa: Rand  |  Nigeria: Naira" },
    ]},

  { id:"ml-gk-008", subject:"GK", type:"facts", color:"#f59e0b",
    heading:"FAMOUS INDIAN\nSCIENTISTS",
    items:[
      { icon:"🔬", text:"C.V. Raman: Raman Effect; Nobel Prize in Physics (1930)" },
      { icon:"🔬", text:"Homi J. Bhabha: father of India's nuclear programme" },
      { icon:"🔬", text:"Vikram Sarabhai: father of Indian Space Programme (ISRO)" },
      { icon:"🔬", text:"APJ Abdul Kalam: missile scientist; 11th President of India" },
      { icon:"🔬", text:"Srinivasa Ramanujan: self-taught maths genius; infinite series" },
      { icon:"🔬", text:"Jagadish Chandra Bose: proved plants have life; radio antenna" },
    ]},

  { id:"ml-gk-009", subject:"GK", type:"facts", color:"#f59e0b",
    heading:"SPORTS &\nOLYMPICS FACTS",
    items:[
      { icon:"🏅", text:"Olympics held every 4 years; first modern Olympics: Athens 1896" },
      { icon:"🏅", text:"India's first individual Olympic gold: Abhinav Bindra (shooting, 2008)" },
      { icon:"🏏", text:"Cricket was an Olympic sport — at 1900 Paris Games!" },
      { icon:"⚽", text:"FIFA World Cup held every 4 years; Brazil has won the most (5 times)" },
      { icon:"🏸", text:"P.V. Sindhu is India's most decorated female Olympian" },
      { icon:"🏋️", text:"India won 7 medals at Paris Olympics 2024 — best modern tally" },
    ]},

  // ── History ─────────────────────────────────────────────────────────────
  { id:"ml-h-001", subject:"History", type:"facts", color:"#8b5cf6",
    heading:"KEY DATES IN\nINDIAN HISTORY",
    items:[
      { icon:"📅", text:"1526: Battle of Panipat — Babur defeated Ibrahim Lodi, founded Mughal Empire" },
      { icon:"📅", text:"1600: British East India Company established" },
      { icon:"📅", text:"1857: First War of Independence (Sepoy Mutiny)" },
      { icon:"📅", text:"1919: Jallianwala Bagh Massacre (13 April) by General Dyer" },
      { icon:"📅", text:"1942: Quit India Movement (8 August)" },
      { icon:"📅", text:"1947: India's Independence (15 August)" },
    ]},

  { id:"ml-h-002", subject:"History", type:"facts", color:"#8b5cf6",
    heading:"THE MUGHAL\nEMPERORS",
    items:[
      { icon:"👑", text:"Babur (1526–30): founder; won 1st Battle of Panipat (1526)" },
      { icon:"👑", text:"Humayun (1530–56): lost & regained throne; died on stairs" },
      { icon:"👑", text:"Akbar the Great (1556–1605): Navratnas, Din-i-Ilahi, religious tolerance" },
      { icon:"👑", text:"Jahangir (1605–27): patron of arts; married Nur Jahan" },
      { icon:"👑", text:"Shah Jahan (1628–58): built Taj Mahal, Red Fort, Jama Masjid" },
      { icon:"👑", text:"Aurangzeb (1658–1707): expanded empire; reimposed Jizya tax" },
    ]},

  { id:"ml-h-003", subject:"History", type:"facts", color:"#8b5cf6",
    heading:"ANCIENT\nCIVILISATIONS",
    items:[
      { icon:"🏛️", text:"Indus Valley Civilisation: 3300–1300 BCE; Harappa & Mohenjo-daro" },
      { icon:"🏛️", text:"Ancient Egypt: ~3100 BCE; pyramids, pharaohs, hieroglyphics" },
      { icon:"🏛️", text:"Mesopotamia (Iraq): cuneiform writing; Babylon; Code of Hammurabi" },
      { icon:"🏛️", text:"Ancient Greece: democracy, philosophy, Olympic Games (776 BCE)" },
      { icon:"🏛️", text:"Roman Empire: law, roads, calendar; fell 476 CE (Western Rome)" },
      { icon:"🏛️", text:"Maurya Empire (India): 322–185 BCE; Chandragupta, Emperor Ashoka" },
    ]},

  { id:"ml-h-004", subject:"History", type:"facts", color:"#8b5cf6",
    heading:"FREEDOM FIGHTERS\nOF INDIA",
    items:[
      { icon:"🇮🇳", text:"Mahatma Gandhi: non-violent resistance; Dandi March (1930)" },
      { icon:"🇮🇳", text:"Subhas Chandra Bose: founded Indian National Army (INA)" },
      { icon:"🇮🇳", text:"Bhagat Singh: revolutionary; hanged age 23 on 23 March 1931" },
      { icon:"🇮🇳", text:"Jawaharlal Nehru: first PM; 'Tryst with Destiny' speech (1947)" },
      { icon:"🇮🇳", text:"Rani Lakshmibai: queen of Jhansi; fought in 1857 rebellion" },
      { icon:"🇮🇳", text:"B.R. Ambedkar: drafted India's Constitution; championed equality" },
    ]},

  { id:"ml-h-005", subject:"History", type:"facts", color:"#8b5cf6",
    heading:"WORLD WAR II\nKEY FACTS",
    items:[
      { icon:"⚔️", text:"Duration: 1939–1945 (6 years)" },
      { icon:"⚔️", text:"Trigger: Germany invaded Poland on 1 September 1939" },
      { icon:"⚔️", text:"Allies: UK, USA, USSR, France vs. Axis: Germany, Japan, Italy" },
      { icon:"⚔️", text:"D-Day: 6 June 1944 — Allied landings in Normandy, France" },
      { icon:"⚔️", text:"Atomic bombs on Hiroshima (6 Aug) & Nagasaki (9 Aug 1945)" },
      { icon:"⚔️", text:"UN formed 24 October 1945 to prevent future global conflicts" },
    ]},

  { id:"ml-h-006", subject:"History", type:"facts", color:"#8b5cf6",
    heading:"GREAT RULERS\nOF HISTORY",
    items:[
      { icon:"👑", text:"Alexander the Great: conquered from Greece to India by age 32" },
      { icon:"👑", text:"Genghis Khan: founded Mongol Empire — largest contiguous land empire" },
      { icon:"👑", text:"Ashoka the Great: promoted Buddhism; built pillars across India" },
      { icon:"👑", text:"Cleopatra VII: last ruler of Ptolemaic Egypt; brilliant diplomat" },
      { icon:"👑", text:"Napoleon Bonaparte: reformed law, education, banking across Europe" },
      { icon:"👑", text:"Chandragupta Maurya: first ruler to unite the Indian subcontinent" },
    ]},

  { id:"ml-h-007", subject:"History", type:"facts", color:"#8b5cf6",
    heading:"INVENTIONS THAT\nCHANGED HISTORY",
    items:[
      { icon:"🔧", text:"Wheel: ~3500 BCE (Mesopotamia) — changed transport forever" },
      { icon:"🔧", text:"Printing Press: 1440 (Gutenberg) — spread knowledge & literacy" },
      { icon:"🔧", text:"Compass: ~11th century China — enabled global exploration" },
      { icon:"🔧", text:"Gunpowder: ~9th century China — transformed warfare" },
      { icon:"🔧", text:"Steam Engine (improved): 1769 (James Watt) — Industrial Revolution" },
      { icon:"🔧", text:"Vaccines: 1796 (Edward Jenner, smallpox) — saved billions of lives" },
    ]},

  { id:"ml-h-008", subject:"History", type:"facts", color:"#8b5cf6",
    heading:"FREEDOM MOVEMENT\nEVENTS",
    items:[
      { icon:"📅", text:"1905: Partition of Bengal by Curzon → mass protests (reversed 1911)" },
      { icon:"📅", text:"1920: Non-Cooperation Movement launched by Gandhi" },
      { icon:"📅", text:"1929: Lahore Session — Purna Swaraj (complete independence) declared" },
      { icon:"📅", text:"1930: Dandi March / Salt Satyagraha (12 March – 6 April)" },
      { icon:"📅", text:"1942: Quit India Movement (8 August) — 'Do or Die'" },
      { icon:"📅", text:"1947: Indian Independence; Constitution adopted 26 January 1950" },
    ]},

  // ── Geography ────────────────────────────────────────────────────────────
  { id:"ml-g-001", subject:"Geography", type:"facts", color:"#ef4444",
    heading:"CONTINENTS\n& OCEANS",
    items:[
      { icon:"🌍", text:"7 Continents: Asia, Africa, North America, South America, Antarctica, Europe, Australia" },
      { icon:"🌊", text:"5 Oceans: Pacific (largest), Atlantic, Indian, Southern, Arctic (smallest)" },
      { icon:"🌍", text:"Asia: largest continent (44 million km²); 60% of world's population" },
      { icon:"🌍", text:"Australia is both a continent AND a country" },
      { icon:"🌊", text:"Pacific Ocean is larger than all of Earth's landmasses combined!" },
      { icon:"🌍", text:"Antarctica: no permanent residents; not owned by any country" },
    ]},

  { id:"ml-g-002", subject:"Geography", type:"facts", color:"#ef4444",
    heading:"RIVERS OF\nINDIA",
    items:[
      { icon:"🏞️", text:"Ganga: India's national river; 2,525 km; originates at Gangotri glacier" },
      { icon:"🏞️", text:"Brahmaputra: originates in Tibet; one of world's widest rivers" },
      { icon:"🏞️", text:"Yamuna: major Ganga tributary; flows through Delhi and Agra" },
      { icon:"🏞️", text:"Godavari: 'Dakshina Ganga'; longest peninsular river (1,465 km)" },
      { icon:"🏞️", text:"Indus: originates in Tibet; gives India its name; flows via Pakistan" },
      { icon:"🏞️", text:"Kaveri: sacred South Indian river; flows through Karnataka & Tamil Nadu" },
    ]},

  { id:"ml-g-003", subject:"Geography", type:"facts", color:"#ef4444",
    heading:"MOUNTAINS\nOF THE WORLD",
    items:[
      { icon:"🏔️", text:"Mt. Everest (8,849 m): world's highest peak; Nepal/Tibet border" },
      { icon:"🏔️", text:"K2 (8,611 m): 2nd highest; Pakistan/China; called 'Savage Mountain'" },
      { icon:"🏔️", text:"Kangchenjunga (8,586 m): 3rd highest; India/Nepal border" },
      { icon:"🏔️", text:"Andes: longest mountain range (7,000 km); South America" },
      { icon:"🏔️", text:"Alps: Europe's highest range; Mont Blanc = 4,808 m (France)" },
      { icon:"🏔️", text:"Himalayas: 'abode of snow'; stretches across India, Nepal, Bhutan, China" },
    ]},

  { id:"ml-g-004", subject:"Geography", type:"facts", color:"#ef4444",
    heading:"CAPITALS OF\nASIAN COUNTRIES",
    items:[
      { icon:"🗺️", text:"India: New Delhi  |  China: Beijing  |  Japan: Tokyo" },
      { icon:"🗺️", text:"Pakistan: Islamabad  |  Bangladesh: Dhaka  |  Nepal: Kathmandu" },
      { icon:"🗺️", text:"Sri Lanka: Sri Jayawardenepura Kotte  |  Bhutan: Thimphu" },
      { icon:"🗺️", text:"Singapore: Singapore City  |  Malaysia: Kuala Lumpur  |  Thailand: Bangkok" },
      { icon:"🗺️", text:"UAE: Abu Dhabi  |  Saudi Arabia: Riyadh  |  Turkey: Ankara" },
      { icon:"🗺️", text:"South Korea: Seoul  |  North Korea: Pyongyang  |  Vietnam: Hanoi" },
    ]},

  { id:"ml-g-005", subject:"Geography", type:"facts", color:"#ef4444",
    heading:"DESERTS\nOF THE WORLD",
    items:[
      { icon:"🌵", text:"Sahara: world's largest HOT desert (9.2 million km²); N. Africa" },
      { icon:"🌵", text:"Antarctic Desert: world's LARGEST desert overall (14 million km²)" },
      { icon:"🌵", text:"Arabian Desert: 2nd largest hot desert (2.3 million km²)" },
      { icon:"🌵", text:"Gobi Desert: China & Mongolia; a cold desert with extreme temperature swings" },
      { icon:"🌵", text:"Thar Desert (Great Indian Desert): Rajasthan; ~200,000 km²" },
      { icon:"🌵", text:"Atacama (Chile): driest non-polar desert on Earth; almost no rainfall" },
    ]},

  { id:"ml-g-006", subject:"Geography", type:"facts", color:"#ef4444",
    heading:"CLIMATE ZONES\nOF EARTH",
    items:[
      { icon:"☀️", text:"Tropical (0°–23.5°): hot & wet all year; rainforests & savannas" },
      { icon:"🏜️", text:"Subtropical (23.5°–35°): hot summers, mild winters; deserts form here" },
      { icon:"🌿", text:"Temperate (35°–60°): 4 distinct seasons; most densely populated zone" },
      { icon:"❄️", text:"Subarctic (60°–75°): very cold winters; coniferous forests (taiga)" },
      { icon:"🧊", text:"Polar (75°–90°): extreme cold; tundra; minimal plant life" },
      { icon:"🌊", text:"Mediterranean: hot dry summers, mild wet winters (S. Europe)" },
    ]},

  { id:"ml-g-007", subject:"Geography", type:"facts", color:"#ef4444",
    heading:"INDIAN STATES\n& CAPITALS",
    items:[
      { icon:"🗺️", text:"Maharashtra → Mumbai / Nagpur  |  Gujarat → Gandhinagar" },
      { icon:"🗺️", text:"UP → Lucknow  |  Rajasthan → Jaipur  |  MP → Bhopal" },
      { icon:"🗺️", text:"Tamil Nadu → Chennai  |  Karnataka → Bengaluru" },
      { icon:"🗺️", text:"Kerala → Thiruvananthapuram  |  West Bengal → Kolkata" },
      { icon:"🗺️", text:"Punjab & Haryana → Chandigarh  |  Assam → Dispur" },
      { icon:"🗺️", text:"J&K: Srinagar (summer) / Jammu (winter)  |  HP → Shimla" },
    ]},

  { id:"ml-g-008", subject:"Geography", type:"facts", color:"#ef4444",
    heading:"NATURAL WONDERS\nOF THE WORLD",
    items:[
      { icon:"🌿", text:"Amazon Rainforest: largest tropical forest; 10% of all species on Earth" },
      { icon:"🐠", text:"Great Barrier Reef: world's largest coral reef; off Queensland, Australia" },
      { icon:"🏔️", text:"Grand Canyon: carved by the Colorado River over 5–6 million years; USA" },
      { icon:"🌊", text:"Victoria Falls: world's largest waterfall by width; Zambia/Zimbabwe border" },
      { icon:"🌋", text:"Paricutin: a volcano that grew from a cornfield in Mexico (1943)" },
      { icon:"🏔️", text:"Mount Everest: highest point on Earth (8,849 m); Nepal/Tibet border" },
    ]},

];
