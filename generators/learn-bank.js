/**
 * Learn Carousel Bank — each entry is one daily carousel (3–5 slides).
 * Picked deterministically by date → same date always shows same carousel.
 *
 * Pack structure:
 *   { id, subject, color, slides: [ { type, heading, items[] }, … ] }
 *
 * Slide types:
 *   "facts"   — items: { icon, text }
 *   "vocab"   — items: { wrong, right }
 *   "formula" — items: { n, label, formula }
 */

module.exports = [

  // ══════════════════════════════════════════════════════════════
  //  ENGLISH  (8 packs)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-e-001", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"facts", heading:"NOUNS",
        items:[
          { icon:"🏙️", text:"A noun names a person, place, thing or idea — e.g. teacher, Delhi, happiness" },
          { icon:"👥", text:"Common noun = general (city, river). Proper noun = specific (Mumbai, Ganga)" },
          { icon:"📦", text:"Collective noun = group (herd of cattle, flock of birds, team of players)" },
          { icon:"💭", text:"Abstract noun = something you cannot touch (love, courage, freedom, wisdom)" },
        ]},
      { type:"facts", heading:"VERBS",
        items:[
          { icon:"⚡", text:"A verb shows action or state of being — run, think, is, seems, become" },
          { icon:"🔁", text:"Transitive verb needs an object: 'She kicked the ball.' (ball = object)" },
          { icon:"🚫", text:"Intransitive verb has no object: 'He laughed.' / 'The baby slept.'" },
          { icon:"🤝", text:"Helping verbs: is, are, was, were, has, have, had, will, shall, may, can" },
        ]},
      { type:"facts", heading:"ADJECTIVES",
        items:[
          { icon:"🎨", text:"An adjective describes a noun: the tall building, a bright student, three dogs" },
          { icon:"📊", text:"Degrees: Positive (tall) → Comparative (taller) → Superlative (tallest)" },
          { icon:"🔢", text:"Numeral adjectives: cardinal (two books) and ordinal (the first chapter)" },
          { icon:"👉", text:"Demonstrative: this, that, these, those — point to specific nouns" },
        ]},
      { type:"facts", heading:"ADVERBS",
        items:[
          { icon:"⏱️", text:"Adverb of time: yesterday, soon, already, still, just, now, then" },
          { icon:"📍", text:"Adverb of place: here, there, somewhere, everywhere, outside, above" },
          { icon:"🎚️", text:"Adverb of degree: very, quite, rather, too, enough, almost, nearly" },
          { icon:"💡", text:"Most adverbs of manner end in -ly: quickly, silently, beautifully, carefully" },
        ]},
    ]
  },

  {
    id:"lc-e-002", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"facts", heading:"PREPOSITIONS OF TIME",
        items:[
          { icon:"📅", text:"IN — months, years, seasons: in January, in 2024, in winter, in the century" },
          { icon:"📆", text:"ON — specific days and dates: on Monday, on 15th August, on New Year's Day" },
          { icon:"⏰", text:"AT — exact time and special times: at 9 o'clock, at noon, at night, at midnight" },
          { icon:"⚠️", text:"Tricky: 'in the morning/afternoon/evening' but 'at night' — no 'in the night'" },
        ]},
      { type:"facts", heading:"PREPOSITIONS OF PLACE",
        items:[
          { icon:"📍", text:"IN — enclosed spaces: in the box, in India, in a room, in the water" },
          { icon:"🔝", text:"ON — surfaces and transport: on the table, on the bus, on the wall" },
          { icon:"🎯", text:"AT — specific points: at the door, at school, at the bus stop, at home" },
          { icon:"↕️", text:"ABOVE vs OVER: above = higher position. Over = directly above or covering." },
        ]},
      { type:"facts", heading:"DIRECTION PREPOSITIONS",
        items:[
          { icon:"➡️", text:"TO — movement towards: going to school, walking to the park" },
          { icon:"⬆️", text:"INTO — movement inside: jump into the pool, walk into the room" },
          { icon:"🔄", text:"THROUGH — movement across: drive through the tunnel, run through the forest" },
          { icon:"🚶", text:"ACROSS vs ALONG: across = from one side to other. Along = following a path." },
        ]},
      { type:"vocab", heading:"COMMON PREPOSITION ERRORS",
        items:[
          { wrong:"Discuss about the topic",      right:"Discuss the topic" },
          { wrong:"Married with her",             right:"Married to her" },
          { wrong:"Divide between three people",  right:"Divide among three people (3+)" },
          { wrong:"Superior than others",         right:"Superior to others" },
          { wrong:"Cope up with stress",          right:"Cope with stress" },
        ]},
    ]
  },

  {
    id:"lc-e-003", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"vocab", heading:"REPLACE 'VERY + FEELING'",
        items:[
          { wrong:"Very tired",   right:"Exhausted" },
          { wrong:"Very happy",   right:"Elated / Overjoyed" },
          { wrong:"Very angry",   right:"Furious / Livid" },
          { wrong:"Very sad",     right:"Devastated / Heartbroken" },
          { wrong:"Very scared",  right:"Terrified / Petrified" },
        ]},
      { type:"vocab", heading:"REPLACE 'VERY + SIZE/SPEED'",
        items:[
          { wrong:"Very big",     right:"Enormous / Gigantic" },
          { wrong:"Very small",   right:"Tiny / Minute" },
          { wrong:"Very fast",    right:"Rapid / Swift" },
          { wrong:"Very slow",    right:"Sluggish / Leisurely" },
          { wrong:"Very loud",    right:"Deafening / Thunderous" },
        ]},
      { type:"vocab", heading:"REPLACE 'VERY + QUALITY'",
        items:[
          { wrong:"Very good",      right:"Excellent / Outstanding" },
          { wrong:"Very bad",       right:"Terrible / Dreadful" },
          { wrong:"Very smart",     right:"Brilliant / Ingenious" },
          { wrong:"Very beautiful", right:"Stunning / Gorgeous" },
          { wrong:"Very important", right:"Crucial / Vital" },
        ]},
      { type:"vocab", heading:"REPLACE 'VERY + WEATHER'",
        items:[
          { wrong:"Very cold",    right:"Freezing / Icy" },
          { wrong:"Very hot",     right:"Scorching / Sweltering" },
          { wrong:"Very windy",   right:"Blustery / Gusty" },
          { wrong:"Very wet",     right:"Drenched / Soaked" },
          { wrong:"Very bright",  right:"Dazzling / Blazing" },
        ]},
    ]
  },

  {
    id:"lc-e-004", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"facts", heading:"THERE / THEIR / THEY'RE",
        items:[
          { icon:"📍", text:"THERE = a place or to introduce: 'Put it there.' / 'There is a cat.'" },
          { icon:"👨‍👩‍👧", text:"THEIR = belonging to them: 'Their books are on the shelf.'" },
          { icon:"🤝", text:"THEY'RE = they are: 'They're going to the market tomorrow.'" },
          { icon:"✅", text:"Trick: expand THEY'RE — if 'they are' fits, use they're. Otherwise check the others." },
        ]},
      { type:"facts", heading:"ITS / IT'S AND YOUR / YOU'RE",
        items:[
          { icon:"🐶", text:"ITS = belonging to it (no apostrophe): 'The dog wagged its tail.'" },
          { icon:"🔗", text:"IT'S = it is OR it has: 'It's raining.' / 'It's been a long day.'" },
          { icon:"📚", text:"YOUR = belonging to you: 'Is that your book?'" },
          { icon:"✅", text:"YOU'RE = you are: 'You're doing great!' Expand it to check." },
        ]},
      { type:"facts", heading:"AFFECT / EFFECT",
        items:[
          { icon:"🎬", text:"AFFECT = verb (action): 'The rain affected our plans.' (A = Action)" },
          { icon:"📦", text:"EFFECT = noun (result): 'The effect of the rain was flooding.' (E = End result)" },
          { icon:"💊", text:"Exception: Effect as a verb = to bring about: 'To effect change in society.'" },
          { icon:"✅", text:"Memory trick: RAVEN — Remember Affect Verb Effect Noun" },
        ]},
      { type:"facts", heading:"ACCEPT / EXCEPT AND MORE",
        items:[
          { icon:"✅", text:"ACCEPT = to receive or agree: 'She accepted the award with a smile.'" },
          { icon:"❌", text:"EXCEPT = excluding: 'Everyone came except Riya.'" },
          { icon:"📐", text:"PRINCIPAL = main or school head. PRINCIPLE = a rule or belief." },
          { icon:"📝", text:"STATIONERY = paper/pens. STATIONARY = not moving." },
        ]},
    ]
  },

  {
    id:"lc-e-005", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"formula", heading:"SIMPLE TENSES",
        items:[
          { n:1, label:"Simple Present",  formula:"Subject + V1 (+ s/es for he/she/it)" },
          { n:2, label:"Simple Past",     formula:"Subject + V2" },
          { n:3, label:"Simple Future",   formula:"Subject + will + V1" },
          { n:4, label:"Key tip",         formula:"3rd person singular gets -s/-es: 'She runs'" },
        ]},
      { type:"formula", heading:"CONTINUOUS TENSES",
        items:[
          { n:1, label:"Present Continuous", formula:"is/am/are + V-ing" },
          { n:2, label:"Past Continuous",    formula:"was/were + V-ing" },
          { n:3, label:"Future Continuous",  formula:"will be + V-ing" },
          { n:4, label:"Use for",            formula:"action happening at that exact moment" },
        ]},
      { type:"formula", heading:"PERFECT TENSES",
        items:[
          { n:1, label:"Present Perfect",  formula:"has/have + V3 (past participle)" },
          { n:2, label:"Past Perfect",     formula:"had + V3" },
          { n:3, label:"Future Perfect",   formula:"will have + V3" },
          { n:4, label:"Use for",          formula:"completed action before another action" },
        ]},
      { type:"facts", heading:"IRREGULAR VERB FORMS",
        items:[
          { icon:"📝", text:"go → went → gone    |    come → came → come" },
          { icon:"📝", text:"write → wrote → written   |   speak → spoke → spoken" },
          { icon:"📝", text:"take → took → taken   |   break → broke → broken" },
          { icon:"📝", text:"see → saw → seen   |   know → knew → known" },
          { icon:"📝", text:"teach → taught → taught   |   think → thought → thought" },
        ]},
    ]
  },

  {
    id:"lc-e-006", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"facts", heading:"SIMILE AND METAPHOR",
        items:[
          { icon:"🔗", text:"SIMILE: compares using 'like' or 'as' → 'She ran like the wind.'" },
          { icon:"✨", text:"METAPHOR: states one thing IS another → 'Life is a rollercoaster.'" },
          { icon:"📚", text:"More similes: as brave as a lion · as cold as ice · like a fish out of water" },
          { icon:"📚", text:"More metaphors: Time is money · The classroom was a zoo · Heart of stone" },
        ]},
      { type:"facts", heading:"PERSONIFICATION AND ALLITERATION",
        items:[
          { icon:"🎭", text:"PERSONIFICATION: gives human qualities to non-human things" },
          { icon:"🌙", text:"Examples: 'The wind whispered.' / 'The sun smiled.' / 'Stars danced.'" },
          { icon:"🔤", text:"ALLITERATION: same consonant sound at the start of nearby words" },
          { icon:"🐍", text:"Examples: 'Peter Piper picked peppers.' / 'She sells sea shells.'" },
        ]},
      { type:"facts", heading:"HYPERBOLE AND ONOMATOPOEIA",
        items:[
          { icon:"💥", text:"HYPERBOLE: extreme exaggeration for effect (not meant literally)" },
          { icon:"😂", text:"Examples: 'I've told you a million times.' / 'I could eat a horse.'" },
          { icon:"🔊", text:"ONOMATOPOEIA: words that sound like what they describe" },
          { icon:"🐝", text:"Examples: buzz, crash, sizzle, whisper, giggle, roar, splash, hiss" },
        ]},
      { type:"facts", heading:"OXYMORON AND IDIOMS",
        items:[
          { icon:"🔀", text:"OXYMORON: two contradictory words together — deafening silence · bittersweet" },
          { icon:"📝", text:"More: living dead · clearly confused · open secret · same difference" },
          { icon:"💬", text:"IDIOM: phrase where literal meaning does not equal actual meaning" },
          { icon:"📝", text:"'Piece of cake' = very easy · 'Break a leg' = good luck · 'It's raining cats and dogs' = heavy rain" },
        ]},
    ]
  },

  {
    id:"lc-e-007", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"facts", heading:"ACTIVE VOICE",
        items:[
          { icon:"🎬", text:"ACTIVE: Subject performs the action — 'Riya wrote the letter.' (direct, clear)" },
          { icon:"✅", text:"Active voice is preferred in writing — more direct and concise." },
          { icon:"📝", text:"Active examples: 'The dog chased the cat.' / 'She won the prize.'" },
          { icon:"💡", text:"Clue: the subject (doer) comes FIRST in an active sentence." },
        ]},
      { type:"facts", heading:"PASSIVE VOICE",
        items:[
          { icon:"🔄", text:"PASSIVE: Subject receives the action — 'The letter was written by Riya.'" },
          { icon:"🔧", text:"To convert: Object → Subject · add was/were/is/are + V3 · add 'by + doer'" },
          { icon:"📝", text:"Passive examples: 'The cat was chased by the dog.' / 'The prize was won by her.'" },
          { icon:"⚠️", text:"Clue: look for 'was/were + past participle' → it's passive voice." },
        ]},
      { type:"formula", heading:"ACTIVE TO PASSIVE — FORMULAS",
        items:[
          { n:1, label:"Present Simple",   formula:"is/are + V3" },
          { n:2, label:"Past Simple",      formula:"was/were + V3" },
          { n:3, label:"Future",           formula:"will be + V3" },
          { n:4, label:"Present Perfect",  formula:"has/have been + V3" },
          { n:5, label:"Infinitive",       formula:"to be + V3" },
        ]},
    ]
  },

  {
    id:"lc-e-008", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"facts", heading:"FULL STOP, COMMA, QUESTION MARK",
        items:[
          { icon:".", text:"FULL STOP — ends a declarative or imperative sentence. 'She went home.'" },
          { icon:"?", text:"QUESTION MARK — ends a direct question. 'Where are you going?'" },
          { icon:"!", text:"EXCLAMATION MARK — shows strong emotion. 'What a brilliant idea!'" },
          { icon:",", text:"COMMA — separates list items, clauses, and after introductory phrases." },
        ]},
      { type:"facts", heading:"APOSTROPHE, COLON AND SEMICOLON",
        items:[
          { icon:"'", text:"APOSTROPHE for possession: Riya's book · the children's toys · India's rivers" },
          { icon:"'", text:"APOSTROPHE for contraction: don't · can't · it's · they're · won't" },
          { icon:":", text:"COLON introduces a list or explanation: 'I need: milk, eggs, bread.'" },
          { icon:";", text:"SEMICOLON joins two related independent clauses: 'She studied; she passed.'" },
        ]},
      { type:"vocab", heading:"COMMON PUNCTUATION ERRORS",
        items:[
          { wrong:"Its a beautiful day",               right:"It's a beautiful day" },
          { wrong:"The childrens books",               right:"The children's books" },
          { wrong:"I like: apples bananas and grapes", right:"I like apples, bananas and grapes" },
          { wrong:"She is smart, she scored 100",      right:"She is smart; she scored 100" },
        ]},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  MATHEMATICS  (7 packs)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-m-001", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"formula", heading:"PERCENTAGE — BASICS",
        items:[
          { n:1, label:"% of a number",      formula:"(x ÷ 100) × n" },
          { n:2, label:"What % is x of y?",  formula:"(x ÷ y) × 100" },
          { n:3, label:"Find original value", formula:"val ÷ (% ÷ 100)" },
          { n:4, label:"% increase",          formula:"(increase ÷ original) × 100" },
          { n:5, label:"% decrease",          formula:"(decrease ÷ original) × 100" },
        ]},
      { type:"formula", heading:"PROFIT AND LOSS",
        items:[
          { n:1, label:"Profit",      formula:"SP − CP" },
          { n:2, label:"Loss",        formula:"CP − SP" },
          { n:3, label:"Profit %",    formula:"(Profit ÷ CP) × 100" },
          { n:4, label:"Loss %",      formula:"(Loss ÷ CP) × 100" },
          { n:5, label:"SP from P%",  formula:"CP × (1 + P/100)" },
          { n:6, label:"SP from L%",  formula:"CP × (1 − L/100)" },
        ]},
      { type:"formula", heading:"DISCOUNT AND TAX",
        items:[
          { n:1, label:"Discount",       formula:"MP − SP" },
          { n:2, label:"Discount %",     formula:"(Discount ÷ MP) × 100" },
          { n:3, label:"SP after disc.", formula:"MP × (1 − D%/100)" },
          { n:4, label:"Price with tax", formula:"Cost × (1 + Tax%/100)" },
        ]},
      { type:"facts", heading:"PERCENTAGE SHORTCUTS",
        items:[
          { icon:"⚡", text:"10% of any number: move decimal one place left. 10% of 450 = 45" },
          { icon:"⚡", text:"5%: halve the 10%. 5% of 450 = 22.5" },
          { icon:"⚡", text:"25%: divide by 4. 25% of 440 = 110" },
          { icon:"⚡", text:"50%: divide by 2. 50% of 380 = 190" },
          { icon:"⚡", text:"1%: move decimal two places left. 1% of 3500 = 35" },
        ]},
    ]
  },

  {
    id:"lc-m-002", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"facts", heading:"TYPES OF NUMBERS",
        items:[
          { icon:"1️⃣", text:"Natural numbers: 1, 2, 3, 4… (counting numbers, no zero)" },
          { icon:"0️⃣", text:"Whole numbers: 0, 1, 2, 3… (natural + zero)" },
          { icon:"➖", text:"Integers: …-3, -2, -1, 0, 1, 2, 3… (positive, zero, negative)" },
          { icon:"½", text:"Rational numbers: can be written as p/q where q is not 0" },
          { icon:"π", text:"Irrational numbers: cannot be expressed as p/q. E.g. sqrt2, pi, e" },
        ]},
      { type:"formula", heading:"DIVISIBILITY RULES",
        items:[
          { n:2, label:"Divisible by 2",   formula:"Last digit is 0, 2, 4, 6 or 8" },
          { n:3, label:"Divisible by 3",   formula:"Sum of digits is divisible by 3" },
          { n:4, label:"Divisible by 4",   formula:"Last 2 digits divisible by 4" },
          { n:5, label:"Divisible by 5",   formula:"Last digit is 0 or 5" },
          { n:9, label:"Divisible by 9",   formula:"Sum of digits is divisible by 9" },
          { n:11, label:"Divisible by 11", formula:"Alternating digit sum difference = 0 or 11" },
        ]},
      { type:"formula", heading:"LCM AND HCF",
        items:[
          { n:1, label:"HCF (GCD)",         formula:"Highest common factor of two numbers" },
          { n:2, label:"LCM",               formula:"Lowest common multiple of two numbers" },
          { n:3, label:"Key relationship",  formula:"LCM × HCF = Product of two numbers" },
          { n:4, label:"LCM by prime fact", formula:"Take highest power of each prime" },
          { n:5, label:"HCF by prime fact", formula:"Take lowest power of common primes" },
        ]},
      { type:"facts", heading:"NUMBER SHORTCUTS",
        items:[
          { icon:"⚡", text:"Sum of first n natural numbers: n(n+1) divided by 2" },
          { icon:"⚡", text:"Sum of first n odd numbers: n squared. e.g. 1+3+5+7 = 4^2 = 16" },
          { icon:"⚡", text:"Sum of squares formula: n(n+1)(2n+1) divided by 6" },
          { icon:"⚡", text:"A prime number has exactly 2 factors: 1 and itself. 1 is NOT prime." },
        ]},
    ]
  },

  {
    id:"lc-m-003", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"facts", heading:"TYPES OF ANGLES",
        items:[
          { icon:"📐", text:"Acute angle: less than 90 degrees" },
          { icon:"📐", text:"Right angle: exactly 90 degrees" },
          { icon:"📐", text:"Obtuse angle: between 90 and 180 degrees" },
          { icon:"📐", text:"Straight angle: exactly 180 degrees" },
          { icon:"📐", text:"Reflex angle: between 180 and 360 degrees" },
          { icon:"🔄", text:"Complete angle: exactly 360 degrees" },
        ]},
      { type:"formula", heading:"TRIANGLES",
        items:[
          { n:1, label:"Angle sum",           formula:"A + B + C = 180 degrees" },
          { n:2, label:"Area",                formula:"(1/2) x base x height" },
          { n:3, label:"Perimeter",           formula:"a + b + c" },
          { n:4, label:"Pythagoras theorem",  formula:"a² + b² = c²  (right triangle only)" },
          { n:5, label:"Equilateral area",    formula:"(sqrt3 / 4) × side²" },
        ]},
      { type:"formula", heading:"QUADRILATERALS AND CIRCLES",
        items:[
          { n:1, label:"Square area",       formula:"side²" },
          { n:2, label:"Rectangle area",    formula:"length × breadth" },
          { n:3, label:"Rhombus area",      formula:"(1/2) × d1 × d2 (diagonals)" },
          { n:4, label:"Trapezium area",    formula:"(1/2) × (a+b) × height" },
          { n:5, label:"Circle area",       formula:"pi × r²" },
          { n:6, label:"Circumference",     formula:"2 × pi × r" },
        ]},
      { type:"facts", heading:"GEOMETRY TIPS",
        items:[
          { icon:"📐", text:"Sum of angles in a triangle = 180 degrees. In a quadrilateral = 360 degrees." },
          { icon:"📐", text:"Exterior angle of a triangle = sum of the two non-adjacent interior angles." },
          { icon:"📐", text:"Pythagorean triples to memorise: 3-4-5, 5-12-13, 8-15-17, 7-24-25" },
          { icon:"📐", text:"Equilateral triangle: all 3 sides equal, all 3 angles = 60 degrees." },
        ]},
    ]
  },

  {
    id:"lc-m-004", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"formula", heading:"FRACTIONS — OPERATIONS",
        items:[
          { n:1, label:"Add/Subtract",      formula:"Make denominators equal, then operate on numerators" },
          { n:2, label:"Multiply",          formula:"(a/b) × (c/d) = (a×c) ÷ (b×d)" },
          { n:3, label:"Divide",            formula:"(a/b) ÷ (c/d) = (a/b) × (d/c)" },
          { n:4, label:"Mixed to improper", formula:"(whole × denom + numer) ÷ denom" },
          { n:5, label:"Simplify",          formula:"Divide numerator and denominator by their HCF" },
        ]},
      { type:"formula", heading:"DECIMALS AND CONVERSIONS",
        items:[
          { n:1, label:"Fraction to Decimal", formula:"Divide numerator by denominator" },
          { n:2, label:"Decimal to Fraction", formula:"Write over 10/100/1000, then simplify" },
          { n:3, label:"% to Decimal",        formula:"Divide by 100 (45% = 0.45)" },
          { n:4, label:"Decimal to %",        formula:"Multiply by 100 (0.7 = 70%)" },
          { n:5, label:"Fraction to %",       formula:"(Numerator ÷ Denominator) × 100" },
        ]},
      { type:"facts", heading:"FRACTION TIPS",
        items:[
          { icon:"💡", text:"Proper fraction: numerator less than denominator — e.g. 3/7" },
          { icon:"💡", text:"Improper fraction: numerator greater than denominator — e.g. 9/4" },
          { icon:"💡", text:"Equivalent fractions: 1/2 = 2/4 = 3/6 = 4/8 (multiply both by same number)" },
          { icon:"💡", text:"To compare fractions: cross multiply. 3/5 vs 4/7 → 21 vs 20 → 3/5 is greater" },
        ]},
    ]
  },

  {
    id:"lc-m-005", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"formula", heading:"ALGEBRAIC IDENTITIES",
        items:[
          { n:1, label:"(a+b)²",      formula:"a² + 2ab + b²" },
          { n:2, label:"(a-b)²",      formula:"a² - 2ab + b²" },
          { n:3, label:"(a+b)(a-b)",  formula:"a² - b²" },
          { n:4, label:"(a+b)³",      formula:"a³ + 3a²b + 3ab² + b³" },
          { n:5, label:"a³+b³",       formula:"(a+b)(a² - ab + b²)" },
          { n:6, label:"a³-b³",       formula:"(a-b)(a² + ab + b²)" },
        ]},
      { type:"formula", heading:"LINEAR EQUATIONS",
        items:[
          { n:1, label:"One variable",   formula:"ax + b = c  →  x = (c-b)/a" },
          { n:2, label:"Substitution",   formula:"Solve one equation for x, substitute in other" },
          { n:3, label:"Elimination",    formula:"Add/subtract equations to eliminate one variable" },
          { n:4, label:"Cross multiply", formula:"a/b = c/d  →  ad = bc" },
        ]},
      { type:"facts", heading:"ALGEBRA TIPS",
        items:[
          { icon:"🔑", text:"Golden rule: whatever you do to one side, do to the other side" },
          { icon:"🔑", text:"Moving terms: a term moves to other side with opposite sign (+ becomes -)" },
          { icon:"🔑", text:"Distributive law: a(b+c) = ab + ac. Always expand before solving." },
          { icon:"🔑", text:"Always verify your answer by substituting back into the equation." },
        ]},
    ]
  },

  {
    id:"lc-m-006", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"formula", heading:"MEAN, MEDIAN AND MODE",
        items:[
          { n:1, label:"Mean (Average)",   formula:"Sum of values ÷ Number of values" },
          { n:2, label:"Median (odd n)",   formula:"Middle value when data is sorted" },
          { n:3, label:"Median (even n)",  formula:"Average of two middle values" },
          { n:4, label:"Mode",             formula:"Most frequently occurring value" },
          { n:5, label:"Range",            formula:"Highest value - Lowest value" },
        ]},
      { type:"facts", heading:"MEDIAN AND MODE — TIPS",
        items:[
          { icon:"📋", text:"Step 1: Always SORT the data in ascending order before finding median or mode." },
          { icon:"📊", text:"A data set can have NO mode (all unique), ONE mode, or MULTIPLE modes." },
          { icon:"📐", text:"Median is NOT affected by very large or small extreme values — mean is!" },
          { icon:"💡", text:"Use MEAN for balanced data, MEDIAN when there are extreme values (outliers)." },
        ]},
      { type:"facts", heading:"AVERAGE — SOLVED EXAMPLES",
        items:[
          { icon:"📝", text:"Marks: 45, 60, 70, 80, 95. Mean = (45+60+70+80+95) ÷ 5 = 350 ÷ 5 = 70" },
          { icon:"📝", text:"Median of 45, 60, 70, 80, 95 (sorted, odd count) = middle value = 70" },
          { icon:"📝", text:"Data: 3, 5, 5, 7, 9. Mode = 5 (appears most often)" },
          { icon:"📝", text:"If mean of 5 numbers = 40, their sum = 40 × 5 = 200 (work backwards!)" },
        ]},
    ]
  },

  {
    id:"lc-m-007", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"formula", heading:"SIMPLE INTEREST",
        items:[
          { n:1, label:"Simple Interest (SI)",  formula:"(P × R × T) ÷ 100" },
          { n:2, label:"Amount (A)",            formula:"P + SI" },
          { n:3, label:"Principal (P)",         formula:"(SI × 100) ÷ (R × T)" },
          { n:4, label:"Rate (R)",              formula:"(SI × 100) ÷ (P × T)" },
          { n:5, label:"Time (T)",              formula:"(SI × 100) ÷ (P × R)" },
        ]},
      { type:"formula", heading:"COMPOUND INTEREST",
        items:[
          { n:1, label:"Amount (A)",         formula:"P × (1 + R/100)^n" },
          { n:2, label:"CI",                 formula:"A - P  or  P × (1 + R/100)^n - P" },
          { n:3, label:"CI half-yearly",     formula:"P × (1 + R/200)^(2n)" },
          { n:4, label:"CI quarterly",       formula:"P × (1 + R/400)^(4n)" },
          { n:5, label:"CI vs SI (2 years)", formula:"CI - SI = P × (R/100)²" },
        ]},
      { type:"facts", heading:"SI vs CI — KEY DIFFERENCES",
        items:[
          { icon:"📊", text:"SI: interest is calculated on the ORIGINAL principal every time (stays the same)." },
          { icon:"📈", text:"CI: interest is calculated on principal + previous interest (grows bigger each year)." },
          { icon:"💡", text:"For the same P, R, T — CI is always greater than SI (after year 1)." },
          { icon:"📝", text:"Example: P=₹1000, R=10%, T=2 years → SI=₹200, CI=₹210. Difference=₹10." },
        ]},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  SCIENCE  (6 packs)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-s-001", subject:"Science", color:"#10b981",
    slides:[
      { type:"facts", heading:"BODY SYSTEMS OVERVIEW",
        items:[
          { icon:"🦴", text:"Skeletal system: 206 bones in adults (babies have ~270). Gives shape and protects organs." },
          { icon:"💪", text:"Muscular system: 3 types — skeletal (voluntary), smooth (involuntary), cardiac (heart)" },
          { icon:"🫀", text:"Circulatory system: heart pumps ~100,000 times/day. Blood travels ~96,000 km of vessels." },
          { icon:"🧠", text:"Nervous system: brain + spinal cord = CNS. Nerves carry signals at up to 120 m/s." },
        ]},
      { type:"facts", heading:"DIGESTIVE SYSTEM",
        items:[
          { icon:"👄", text:"Digestion starts in the mouth — saliva contains amylase enzyme that breaks down starch." },
          { icon:"🫁", text:"Food travels: mouth → oesophagus → stomach → small intestine → large intestine" },
          { icon:"🧪", text:"Stomach: HCl acid kills germs and activates pepsin enzyme to digest proteins." },
          { icon:"🩸", text:"Small intestine (7-8 m long): most digestion and absorption of nutrients into blood." },
          { icon:"💧", text:"Large intestine: absorbs water. Undigested food becomes faeces and exits." },
        ]},
      { type:"facts", heading:"CIRCULATORY SYSTEM",
        items:[
          { icon:"🫀", text:"Heart has 4 chambers: 2 atria (receive blood) and 2 ventricles (pump blood)" },
          { icon:"🔴", text:"Arteries: carry oxygenated blood away from heart (except pulmonary artery)" },
          { icon:"🔵", text:"Veins: carry deoxygenated blood to heart (except pulmonary vein)" },
          { icon:"🩸", text:"Red blood cells carry oxygen. White blood cells fight infection. Platelets clot blood." },
        ]},
      { type:"facts", heading:"RESPIRATORY SYSTEM",
        items:[
          { icon:"🫁", text:"Lungs contain 300-500 million alveoli (tiny air sacs) for gas exchange." },
          { icon:"💨", text:"Inhale: oxygen enters blood via alveoli. Exhale: carbon dioxide leaves blood." },
          { icon:"🔬", text:"Diaphragm: a dome-shaped muscle below lungs that controls breathing." },
          { icon:"📊", text:"We breathe ~15-20 times per minute and take ~8 million breaths per year." },
        ]},
    ]
  },

  {
    id:"lc-s-002", subject:"Science", color:"#10b981",
    slides:[
      { type:"facts", heading:"PHOTOSYNTHESIS",
        items:[
          { icon:"🌿", text:"Equation: 6CO2 + 6H2O + light energy → C6H12O6 (glucose) + 6O2" },
          { icon:"☀️", text:"Happens in chloroplasts, using chlorophyll — the green pigment in leaves." },
          { icon:"🌡️", text:"Factors affecting rate: light intensity, CO2 concentration, temperature, water" },
          { icon:"🌙", text:"Respiration happens 24/7. Photosynthesis only happens in the presence of light." },
        ]},
      { type:"facts", heading:"PARTS OF A PLANT",
        items:[
          { icon:"🌱", text:"Roots: anchor the plant, absorb water and minerals from soil, store food" },
          { icon:"🪵", text:"Stem: supports the plant, transports water (xylem) and food (phloem)" },
          { icon:"🍃", text:"Leaves: site of photosynthesis. Stomata (tiny pores) allow gas exchange." },
          { icon:"🌸", text:"Flower: reproductive organ. Contains petals, sepals, stamens and pistil." },
          { icon:"🌰", text:"Seed: contains embryo and food store. Dispersed by wind, water, animals." },
        ]},
      { type:"facts", heading:"PLANT ADAPTATIONS",
        items:[
          { icon:"🌵", text:"Cactus (desert): thick waxy stem stores water, spines reduce water loss" },
          { icon:"🌊", text:"Water hyacinth (aquatic): spongy stems trap air for buoyancy" },
          { icon:"🏔️", text:"Pine tree (cold mountains): needle leaves reduce snow load and water loss" },
          { icon:"🌴", text:"Mangrove (coast): stilt roots for support in mud, aerial roots for oxygen" },
        ]},
    ]
  },

  {
    id:"lc-s-003", subject:"Science", color:"#10b981",
    slides:[
      { type:"facts", heading:"PLANETS OF THE SOLAR SYSTEM",
        items:[
          { icon:"☀️", text:"Order from Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune" },
          { icon:"🪐", text:"Largest planet: Jupiter (1,300 Earths fit inside). Smallest: Mercury." },
          { icon:"♨️", text:"Hottest planet: Venus (462 C) due to greenhouse effect — not Mercury!" },
          { icon:"💍", text:"Saturn's rings are ice and rock. It's the least dense planet — could float on water!" },
        ]},
      { type:"facts", heading:"THE MOON AND TIDES",
        items:[
          { icon:"🌕", text:"Moon orbits Earth in ~27.3 days. We always see the same side (synchronous rotation)." },
          { icon:"🌓", text:"Moon phases: New → Waxing Crescent → First Quarter → Full → Waning → Last Quarter → New" },
          { icon:"🌊", text:"High tide: ocean faces Moon (gravity pull). Low tide: when it faces away." },
          { icon:"🌑", text:"Solar eclipse: Moon between Earth and Sun. Lunar eclipse: Earth between Sun and Moon." },
        ]},
      { type:"facts", heading:"STARS AND THE UNIVERSE",
        items:[
          { icon:"⭐", text:"Our Sun is a medium-sized star (G-type yellow dwarf), ~4.6 billion years old." },
          { icon:"🌌", text:"Nearest star to Sun: Proxima Centauri, ~4.24 light years away." },
          { icon:"🔭", text:"A light year = distance light travels in one year = ~9.46 trillion km." },
          { icon:"🪐", text:"Our galaxy: Milky Way, a spiral galaxy with ~200-400 billion stars." },
          { icon:"💥", text:"Big Bang Theory: universe began ~13.8 billion years ago from a single hot point." },
        ]},
      { type:"facts", heading:"SPACE EXPLORATION FACTS",
        items:[
          { icon:"🚀", text:"First human in space: Yuri Gagarin (USSR), April 12, 1961." },
          { icon:"🌍", text:"First humans on Moon: Neil Armstrong and Buzz Aldrin, July 20, 1969 (Apollo 11)." },
          { icon:"🇮🇳", text:"First Indian in space: Rakesh Sharma, 1984. Chandrayaan-3 landed on Moon's south pole in 2023." },
          { icon:"🛸", text:"ISS (International Space Station) orbits Earth at ~400 km altitude, 16 times per day." },
        ]},
    ]
  },

  {
    id:"lc-s-004", subject:"Science", color:"#10b981",
    slides:[
      { type:"facts", heading:"NEWTON'S 3 LAWS OF MOTION",
        items:[
          { icon:"1️⃣", text:"1st Law — INERTIA: An object at rest stays at rest; in motion stays in motion unless a force acts on it." },
          { icon:"2️⃣", text:"2nd Law — FORCE: F = mass × acceleration. Greater force → greater acceleration." },
          { icon:"3️⃣", text:"3rd Law — ACTION-REACTION: Every action has an equal and opposite reaction." },
          { icon:"🌍", text:"Gravity: Earth pulls objects with g = 9.8 m/s². Weight = mass × g." },
        ]},
      { type:"facts", heading:"NEWTON'S LAWS — REAL EXAMPLES",
        items:[
          { icon:"🚗", text:"1st Law: You jerk forward when a car stops suddenly (your body resists the change)." },
          { icon:"⚽", text:"2nd Law: Same kick moves a tennis ball faster than a football (less mass → more acceleration)." },
          { icon:"🚀", text:"3rd Law: Rocket pushes gas downward → gas pushes rocket upward (launches it!)." },
          { icon:"🏃", text:"3rd Law: You push the ground backward while walking → ground pushes you forward." },
        ]},
      { type:"facts", heading:"FORCE — TYPES AND FACTS",
        items:[
          { icon:"🧲", text:"Contact forces: friction, tension, normal reaction, air resistance (objects touching)." },
          { icon:"🌍", text:"Non-contact forces: gravity, magnetic force, electrostatic force (act at a distance)." },
          { icon:"🛞", text:"Friction: opposes motion between surfaces. Useful (brakes) and a nuisance (machine wear)." },
          { icon:"📐", text:"Balanced forces → no change in motion. Unbalanced forces → change in speed or direction." },
        ]},
    ]
  },

  {
    id:"lc-s-005", subject:"Science", color:"#10b981",
    slides:[
      { type:"facts", heading:"STATES OF MATTER",
        items:[
          { icon:"🧊", text:"Solid: fixed shape and fixed volume. Particles tightly packed, vibrate in place." },
          { icon:"💧", text:"Liquid: fixed volume but NO fixed shape. Particles close but flow past each other." },
          { icon:"💨", text:"Gas: NO fixed shape or volume. Particles far apart, move freely and rapidly." },
          { icon:"🔥", text:"Plasma: 4th state — ionised gas at very high temperatures. Found in stars and lightning." },
        ]},
      { type:"facts", heading:"CHANGES OF STATE",
        items:[
          { icon:"🌡️", text:"Melting: solid → liquid (heat added). Freezing: liquid → solid (heat removed)." },
          { icon:"♨️", text:"Evaporation: liquid → gas (at surface, any temperature). Boiling: at specific temp throughout." },
          { icon:"❄️", text:"Condensation: gas → liquid (e.g. water droplets on cold glass)." },
          { icon:"🌨️", text:"Sublimation: solid → gas DIRECTLY (e.g. dry ice, camphor, naphthalene balls)." },
          { icon:"💡", text:"All changes of state are PHYSICAL — no new substance is formed." },
        ]},
      { type:"facts", heading:"MATTER — PARTICLE PROPERTIES",
        items:[
          { icon:"🔬", text:"Matter is made of tiny particles (atoms/molecules) that are always in motion." },
          { icon:"🔥", text:"Higher temperature = particles move FASTER. Heat gives them more energy." },
          { icon:"📦", text:"Solids: particles vibrate but stay in fixed positions — that's why solids keep their shape." },
          { icon:"🌬️", text:"Gases fill any container because particles spread out to use all available space." },
          { icon:"💧", text:"Liquids take the shape of their container but keep the same volume (particles still close)." },
        ]},
    ]
  },

  {
    id:"lc-s-006", subject:"Science", color:"#10b981",
    slides:[
      { type:"facts", heading:"ELECTRICITY — BASICS",
        items:[
          { icon:"⚡", text:"Electric current (I): flow of electric charge. Measured in Amperes (A)." },
          { icon:"🔋", text:"Voltage (V): electrical pressure (push) that drives current. Measured in Volts." },
          { icon:"🔌", text:"Resistance (R): opposition to current flow. Measured in Ohms (Ω)." },
          { icon:"📐", text:"Ohm's Law: V = I × R. So I = V/R and R = V/I." },
          { icon:"⚡", text:"Good conductors (low R): copper, silver, gold. Insulators (high R): rubber, plastic, glass." },
        ]},
      { type:"facts", heading:"SERIES vs PARALLEL CIRCUITS",
        items:[
          { icon:"➡️", text:"Series circuit: components in one single loop — same current flows through all." },
          { icon:"⚠️", text:"Series: if one bulb fails, ALL go out. Total resistance = R1 + R2 + R3" },
          { icon:"⑂", text:"Parallel circuit: components in separate branches — same voltage across each." },
          { icon:"✅", text:"Parallel: if one bulb fails, others still glow. Used in homes and buildings." },
          { icon:"🏠", text:"All home appliances are in parallel — they share 220V but have independent switches." },
        ]},
      { type:"facts", heading:"ELECTRICITY — EFFECTS AND USES",
        items:[
          { icon:"💡", text:"Heating effect: current through resistance generates heat (electric heater, toaster, iron)." },
          { icon:"🌟", text:"Lighting effect: very thin filament resists current → gets hot → glows (bulb)." },
          { icon:"🧲", text:"Magnetic effect: current through a wire creates a magnetic field (electromagnet)." },
          { icon:"⚗️", text:"Chemical effect: electric current through a liquid can split it into elements (electrolysis)." },
          { icon:"🔋", text:"Thermal power plants burn fuel → heat → steam → turbine → generator → electricity." },
        ]},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  HISTORY  (3 packs)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-h-001", subject:"History", color:"#8b5cf6",
    slides:[
      { type:"facts", heading:"INDUS VALLEY — CITIES AND LIFE",
        items:[
          { icon:"🏛️", text:"Flourished ~2600-1900 BCE. Major cities: Mohenjo-daro, Harappa, Dholavira, Lothal." },
          { icon:"🚿", text:"World's first urban planning: grid streets, covered drains, multi-storey brick houses." },
          { icon:"⚖️", text:"Standardised weights, measures, and brick sizes — signs of a very organised society." },
          { icon:"🚢", text:"Lothal had a dockyard — evidence of sea trade with Mesopotamia and Persian Gulf." },
        ]},
      { type:"facts", heading:"INDUS VALLEY — CULTURE AND DECLINE",
        items:[
          { icon:"🎨", text:"People made terracotta toys, bronze figurines, and beautiful jewellery (gold, shell, carnelian)." },
          { icon:"📜", text:"Indus script (~400 signs) found on seals — still UNDECIPHERED by modern scholars." },
          { icon:"🌾", text:"Farmed wheat, barley, cotton. Cotton was first cultivated in the world here." },
          { icon:"❓", text:"Decline ~1900 BCE — possible causes: climate change, river course shifts, floods, migrations." },
          { icon:"🔗", text:"No evidence of weapons of war or royal palaces — possibly a peaceful trading civilisation." },
        ]},
      { type:"facts", heading:"INDUS VALLEY — KEY FACTS",
        items:[
          { icon:"🌍", text:"Covered ~1.25 million km² — larger than ancient Egypt and Mesopotamia combined." },
          { icon:"👥", text:"Population estimated at over 5 million — one of the world's densest ancient civilisations." },
          { icon:"🔬", text:"Discovered in 1921-22 by archaeologists Daya Ram Sahni (Harappa) and R.D. Banerji (Mohenjo-daro)." },
          { icon:"💧", text:"Great Bath at Mohenjo-daro: possibly used for ritual bathing — 12m × 7m, waterproofed with bitumen." },
        ]},
    ]
  },

  {
    id:"lc-h-001b", subject:"History", color:"#8b5cf6",
    slides:[
      { type:"facts", heading:"MAURYAN EMPIRE — RISE",
        items:[
          { icon:"👑", text:"Founded by Chandragupta Maurya in 322 BCE with help of Chanakya (Kautilya)." },
          { icon:"📜", text:"Arthashastra: Chanakya's treatise on statecraft, economics, military and foreign policy." },
          { icon:"🌍", text:"First empire to unify most of the Indian subcontinent under one ruler." },
          { icon:"💰", text:"Trade network across India, Central Asia, and the Mediterranean. Major roads built." },
        ]},
      { type:"facts", heading:"EMPEROR ASHOKA THE GREAT",
        items:[
          { icon:"⚔️", text:"Kalinga War (261 BCE): most devastating conquest — 100,000 killed. Changed Ashoka forever." },
          { icon:"☸️", text:"Converted to Buddhism after seeing the destruction. Adopted the policy of Dhamma (righteousness)." },
          { icon:"🏛️", text:"Built 84,000 stupas, hospitals, rest houses, and wells across the empire." },
          { icon:"📜", text:"Rock edicts and pillar edicts across India spread messages of non-violence and tolerance." },
          { icon:"🦁", text:"Ashoka's lion capital at Sarnath = India's national emblem today. Dharma Chakra on flag." },
        ]},
      { type:"facts", heading:"MAURYAN EMPIRE — LEGACY",
        items:[
          { icon:"🏛️", text:"Pataliputra (modern Patna) was the Mauryan capital — one of the world's largest cities then." },
          { icon:"🌏", text:"Ashoka sent Buddhist missionaries to Sri Lanka, Nepal, Myanmar, Greece, Egypt." },
          { icon:"📚", text:"Mauryan art: polished sandstone pillars, rock-cut caves, terracotta figurines." },
          { icon:"📅", text:"Empire declined after Ashoka's death (232 BCE). Last king Brihadratha assassinated in 185 BCE." },
        ]},
    ]
  },

  {
    id:"lc-h-002", subject:"History", color:"#8b5cf6",
    slides:[
      { type:"facts", heading:"THE 1857 REVOLT",
        items:[
          { icon:"⚔️", text:"1857 Revolt (Sepoy Mutiny): First War of Indian Independence against British rule." },
          { icon:"🔫", text:"Immediate cause: Enfield rifle cartridges (rumoured greased with cow/pig fat)." },
          { icon:"👑", text:"Leaders: Mangal Pandey, Rani Lakshmibai (Jhansi), Nana Sahib, Bahadur Shah Zafar." },
          { icon:"📜", text:"After 1857: British Crown took direct control. East India Company rule ended." },
        ]},
      { type:"facts", heading:"FREEDOM MOVEMENT LEADERS",
        items:[
          { icon:"🕊️", text:"Mahatma Gandhi: led mass non-violent movements. Father of the Nation. Born Oct 2, 1869." },
          { icon:"🌹", text:"Jawaharlal Nehru: First PM of India. Led Indian National Congress." },
          { icon:"⚡", text:"Subhas Chandra Bose: formed INA (Indian National Army). Give me blood — I'll give you freedom." },
          { icon:"🏹", text:"Bhagat Singh: revolutionary executed in 1931. Symbol of youth nationalist movement." },
        ]},
      { type:"facts", heading:"KEY MOVEMENTS AND EVENTS",
        items:[
          { icon:"🧂", text:"Salt March (1930): Gandhi walked 386 km from Sabarmati to Dandi to protest salt tax." },
          { icon:"🚪", text:"Quit India Movement (1942): 'Do or Die' — Gandhi's call for immediate British withdrawal." },
          { icon:"🤝", text:"Non-Cooperation (1920): boycott of British goods, schools, courts. First mass movement." },
          { icon:"🇮🇳", text:"Independence: August 15, 1947. Constitution adopted January 26, 1950 (Republic Day)." },
        ]},
    ]
  },

  {
    id:"lc-h-003", subject:"History", color:"#8b5cf6",
    slides:[
      { type:"facts", heading:"WORLD WAR I — CAUSES",
        items:[
          { icon:"💥", text:"Assassination of Archduke Franz Ferdinand of Austria in Sarajevo (June 28, 1914) triggered the war." },
          { icon:"🤝", text:"Alliance system: Triple Entente (UK, France, Russia) vs Triple Alliance (Germany, Austria, Italy)." },
          { icon:"🏴", text:"Nationalism, imperialism, militarism, and the alliance system = 4 main causes of WW1." },
          { icon:"🌍", text:"Within weeks, most of Europe was at war — the first truly 'world' scale conflict." },
        ]},
      { type:"facts", heading:"WORLD WAR I — KEY EVENTS",
        items:[
          { icon:"🪖", text:"Trench warfare: soldiers lived in muddy trenches for years — brutal, slow, disease-ridden." },
          { icon:"⚗️", text:"First use of chemical weapons (chlorine gas, mustard gas) by Germany in 1915." },
          { icon:"🚢", text:"Sinking of RMS Lusitania (1915) and Zimmermann Telegram helped bring USA into the war (1917)." },
          { icon:"🕊️", text:"Armistice signed November 11, 1918 at 11:11 AM. Germany surrendered." },
          { icon:"📜", text:"Treaty of Versailles (1919): Germany blamed, forced to pay reparations, lost territory." },
        ]},
      { type:"facts", heading:"WORLD WAR II — KEY EVENTS",
        items:[
          { icon:"💣", text:"WW2 (1939-1945): Germany invaded Poland on Sept 1, 1939. Britain and France declared war." },
          { icon:"🔱", text:"Allies (UK, USA, USSR, France) vs Axis (Nazi Germany, Italy, Japan)." },
          { icon:"🏖️", text:"D-Day: June 6, 1944 — massive Allied landings in Normandy, France turned the tide." },
          { icon:"☢️", text:"USA dropped atomic bombs on Hiroshima (Aug 6) and Nagasaki (Aug 9), 1945. Japan surrendered." },
          { icon:"🕊️", text:"UN founded Oct 24, 1945 to prevent future wars. ~70-85 million died in WW2 total." },
        ]},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  GEOGRAPHY  (3 packs)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-g-001", subject:"Geography", color:"#ef4444",
    slides:[
      { type:"facts", heading:"INDIA — PHYSICAL FEATURES",
        items:[
          { icon:"🏔️", text:"Himalayas: youngest fold mountains. Kangchenjunga (8,586 m) is India's highest peak." },
          { icon:"🌾", text:"Northern Plains: formed by Indus, Ganga, Brahmaputra rivers. Most fertile, densely populated." },
          { icon:"🪨", text:"Deccan Plateau: ancient hard rock (Gondwanaland). Rich in minerals — coal, iron, manganese." },
          { icon:"🏖️", text:"Coastal plains: Western (narrow, steep) and Eastern (wider, deltaic) coasts." },
          { icon:"🌴", text:"Thar Desert (Rajasthan): largest hot desert in India. Annual rainfall less than 250 mm." },
        ]},
      { type:"facts", heading:"INDIA — MAJOR RIVERS",
        items:[
          { icon:"🌊", text:"Himalayan rivers: perennial (always flowing) — Ganga, Yamuna, Brahmaputra, Indus." },
          { icon:"🏜️", text:"Peninsular rivers: seasonal — Godavari, Krishna, Cauvery, Narmada, Tapti, Mahanadi." },
          { icon:"📏", text:"Longest river: Ganga (2,525 km). Brahmaputra is largest by water volume." },
          { icon:"⬇️", text:"Narmada and Tapti flow west to Arabian Sea. Most peninsular rivers flow east to Bay of Bengal." },
        ]},
      { type:"facts", heading:"INDIA — CLIMATE AND SEASONS",
        items:[
          { icon:"💨", text:"India has tropical monsoon climate. Four seasons: Winter, Summer, Monsoon, Retreating Monsoon." },
          { icon:"🌧️", text:"South-West Monsoon (June-Sept): brings 75-90% of India's annual rainfall." },
          { icon:"🌡️", text:"Coldest region: Drass, Ladakh (-45C in winter). Hottest: Rajasthan (50C in summer)." },
          { icon:"☔", text:"Wettest place on Earth: Mawsynram, Meghalaya (~11,871 mm/year rainfall)." },
        ]},
      { type:"facts", heading:"INDIA — STATES AND FACTS",
        items:[
          { icon:"🗺️", text:"India: 28 states + 8 Union Territories. Largest state: Rajasthan. Smallest: Goa." },
          { icon:"👨‍👩‍👧‍👦", text:"Most populous state: Uttar Pradesh. Least populous: Sikkim." },
          { icon:"🌲", text:"Longest coastline state: Gujarat (1,600 km). India's total coastline: ~7,516 km." },
          { icon:"🗻", text:"Highest capital: Leh (Ladakh, 3,524 m). Southernmost point: Indira Point, A&N Islands." },
        ]},
    ]
  },

  {
    id:"lc-g-002", subject:"Geography", color:"#ef4444",
    slides:[
      { type:"facts", heading:"CONTINENTS AND OCEANS",
        items:[
          { icon:"🌍", text:"7 Continents (largest to smallest): Asia, Africa, North America, South America, Antarctica, Europe, Australia." },
          { icon:"🌊", text:"5 Oceans (largest to smallest): Pacific, Atlantic, Indian, Southern, Arctic." },
          { icon:"🌐", text:"Pacific Ocean: largest and deepest (Mariana Trench, 11,034 m — deepest point on Earth)." },
          { icon:"🗺️", text:"Equator (0 degrees) divides Earth into Northern and Southern hemispheres." },
          { icon:"🧭", text:"Prime Meridian (0 degrees longitude) passes through Greenwich, UK." },
        ]},
      { type:"facts", heading:"WORLD MOUNTAINS AND DESERTS",
        items:[
          { icon:"🏔️", text:"Highest peak: Mt Everest (8,849 m), Nepal/Tibet. Part of the Himalayas." },
          { icon:"🏔️", text:"Longest mountain range: Andes (South America, 7,000 km)." },
          { icon:"🏜️", text:"Largest hot desert: Sahara (Africa, ~9.2 million km squared). Covers 31% of Africa." },
          { icon:"❄️", text:"Largest cold desert: Antarctic Desert (~14.2 million km squared) — often forgotten!" },
        ]},
      { type:"facts", heading:"WORLD RIVERS AND LAKES",
        items:[
          { icon:"🌊", text:"Longest river: Nile (Africa, 6,650 km). Amazon (S. America) is 2nd but largest by volume." },
          { icon:"🚤", text:"Amazon carries 20% of all river water flowing into the world's oceans." },
          { icon:"💧", text:"Largest freshwater lake: Lake Superior (North America, 82,103 km squared)." },
          { icon:"🏞️", text:"Deepest lake: Lake Baikal (Russia, 1,642 m). Contains 20% of world's fresh surface water." },
          { icon:"🧂", text:"Saltiest lake: Dead Sea (Israel/Jordan). So salty you float naturally — no fish can live there." },
        ]},
    ]
  },

  {
    id:"lc-g-003", subject:"Geography", color:"#ef4444",
    slides:[
      { type:"facts", heading:"NATURAL DISASTERS",
        items:[
          { icon:"🌋", text:"Volcano: magma from Earth's mantle erupts through a vent. Ring of Fire has 75% of world's volcanoes." },
          { icon:"🌏", text:"Earthquake: caused by movement of tectonic plates. Measured on Richter scale." },
          { icon:"🌊", text:"Tsunami: giant ocean wave triggered by underwater earthquake or landslide." },
          { icon:"🌀", text:"Cyclone (Indian Ocean), Typhoon (Pacific), Hurricane (Atlantic) — all the same phenomenon!" },
        ]},
      { type:"facts", heading:"CLIMATE ZONES",
        items:[
          { icon:"🔥", text:"Tropical: near equator (0-23.5 degrees). Hot and wet all year. E.g. Amazon, Congo rainforests." },
          { icon:"🌵", text:"Arid/Desert: 20-30 degrees N and S. Very little rain. E.g. Sahara, Thar, Arabian Desert." },
          { icon:"🌤️", text:"Temperate: 35-65 degrees N and S. Moderate climate with 4 seasons. Most of Europe, India's north." },
          { icon:"❄️", text:"Polar: above 66.5 degrees (Arctic Circle). Extremely cold, ice-covered most of year." },
          { icon:"🏔️", text:"Mountain (Alpine): cold due to altitude regardless of latitude. E.g. Himalayas, Alps, Andes." },
        ]},
      { type:"facts", heading:"ENVIRONMENT AND RESOURCES",
        items:[
          { icon:"⚡", text:"Renewable energy: solar, wind, hydro, geothermal, tidal — won't run out." },
          { icon:"🛢️", text:"Non-renewable: coal, oil, natural gas — formed over millions of years, finite supply." },
          { icon:"🌡️", text:"Global warming: rising CO2 levels trap heat → temperature rise → melting ice caps → sea level rise." },
          { icon:"♻️", text:"3 Rs: Reduce (use less), Reuse (use again), Recycle (process into new materials)." },
        ]},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  COMPUTER SCIENCE  (3 packs)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-cs-001", subject:"Computer Science", color:"#0f172a",
    slides:[
      { type:"formula", heading:"NUMBER SYSTEMS",
        items:[
          { n:1, label:"Decimal (Base 10)", formula:"Digits: 0-9. Value depends on position × 10^n" },
          { n:2, label:"Binary (Base 2)",   formula:"Digits: 0 and 1 only. Value = position × 2^n" },
          { n:3, label:"Octal (Base 8)",    formula:"Digits: 0-7. Group binary digits in 3s" },
          { n:4, label:"Hexadecimal (16)",  formula:"Digits: 0-9 and A-F. Group binary in 4s" },
        ]},
      { type:"facts", heading:"BINARY ↔ DECIMAL CONVERSION",
        items:[
          { icon:"🔢", text:"Binary to Decimal: multiply each bit by 2^(position) and add. Rightmost bit = 2^0 = 1." },
          { icon:"📝", text:"1011 in binary = 1×8 + 0×4 + 1×2 + 1×1 = 8+0+2+1 = 11 in decimal." },
          { icon:"🔄", text:"Decimal to Binary: repeatedly divide by 2, write remainders bottom-up." },
          { icon:"📝", text:"13 ÷ 2 = 6 R1 → 6 ÷ 2 = 3 R0 → 3 ÷ 2 = 1 R1 → 1 ÷ 2 = 0 R1 → binary: 1101" },
        ]},
      { type:"facts", heading:"NUMBER SYSTEM QUICK FACTS",
        items:[
          { icon:"💻", text:"Computers use BINARY (base 2) internally — all data is stored as 0s and 1s (bits)." },
          { icon:"📦", text:"1 bit = 0 or 1. 4 bits = 1 nibble. 8 bits = 1 byte. 1024 bytes = 1 KB." },
          { icon:"🎨", text:"Hexadecimal is used for colours in web design: #FF0000 = red (R=255, G=0, B=0)." },
          { icon:"🔡", text:"ASCII: each keyboard character has a binary code. 'A' = 65 decimal = 01000001 binary." },
        ]},
    ]
  },

  {
    id:"lc-cs-002", subject:"Computer Science", color:"#0f172a",
    slides:[
      { type:"facts", heading:"COMPUTER HARDWARE",
        items:[
          { icon:"🧠", text:"CPU (Central Processing Unit): brain of the computer. Executes instructions (GHz = clock speed)." },
          { icon:"💾", text:"RAM (Random Access Memory): temporary storage — lost when power is off. More RAM = faster multitasking." },
          { icon:"💿", text:"HDD/SSD: permanent storage for files. SSD (Solid State Drive) is much faster than HDD." },
          { icon:"🖥️", text:"Input devices: keyboard, mouse, scanner, microphone. Output: monitor, printer, speakers." },
        ]},
      { type:"facts", heading:"SOFTWARE — TYPES AND EXAMPLES",
        items:[
          { icon:"⚙️", text:"System software: manages hardware. Examples: Windows, macOS, Linux, Android, iOS." },
          { icon:"📱", text:"Application software: specific tasks. Examples: Chrome, Word, Photoshop, YouTube app." },
          { icon:"🛠️", text:"Utility software: maintenance. Examples: antivirus, disk cleaner, compression tools." },
          { icon:"🔓", text:"Open source software: code is public, anyone can modify it. Examples: Linux, Firefox, VLC." },
        ]},
      { type:"formula", heading:"MEMORY UNITS",
        items:[
          { n:1, label:"1 Bit",      formula:"Smallest unit of data — 0 or 1" },
          { n:2, label:"8 Bits",     formula:"= 1 Byte" },
          { n:3, label:"1024 Bytes", formula:"= 1 Kilobyte (KB)" },
          { n:4, label:"1024 KB",    formula:"= 1 Megabyte (MB)" },
          { n:5, label:"1024 MB",    formula:"= 1 Gigabyte (GB)" },
          { n:6, label:"1024 GB",    formula:"= 1 Terabyte (TB)" },
        ]},
    ]
  },

  {
    id:"lc-cs-003", subject:"Computer Science", color:"#0f172a",
    slides:[
      { type:"facts", heading:"INTERNET & NETWORKING",
        items:[
          { icon:"🌐", text:"Internet: global network of networks using TCP/IP protocol to communicate." },
          { icon:"🔗", text:"URL = Uniform Resource Locator (web address). HTTP = protocol. HTTPS = secure HTTP." },
          { icon:"📡", text:"IP address: unique address for each device on a network (like a postal address for computers)." },
          { icon:"📶", text:"Wi-Fi uses radio waves. Bluetooth uses short-range radio. 5G = 5th generation mobile network." },
        ]},
      { type:"facts", heading:"PROGRAMMING CONCEPTS",
        items:[
          { icon:"📝", text:"Algorithm: step-by-step instructions to solve a problem. Must be finite, clear, and correct." },
          { icon:"🔄", text:"Loop: repeat a set of instructions. FOR loop (fixed times), WHILE loop (while condition is true)." },
          { icon:"🔀", text:"Conditional: IF-ELSE. If condition is TRUE, run block A. Else run block B." },
          { icon:"📦", text:"Variable: a named container that stores a value. Its value can change during execution." },
          { icon:"🔧", text:"Function: reusable block of code. Avoids repeating the same code multiple times." },
        ]},
      { type:"facts", heading:"CYBERSECURITY & SAFE INTERNET",
        items:[
          { icon:"🔐", text:"Strong password: at least 12 characters, mix of letters, numbers and symbols. Never share it." },
          { icon:"🦠", text:"Computer virus: malicious software that replicates and damages files. Prevented by antivirus software." },
          { icon:"🎣", text:"Phishing: fake emails/websites that trick you into sharing personal info. Never click suspicious links." },
          { icon:"🔒", text:"HTTPS in a URL means the website connection is encrypted and safer for entering personal data." },
        ]},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  GK  (3 packs)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-gk-001", subject:"GK", color:"#f59e0b",
    slides:[
      { type:"facts", heading:"INDIA — NATIONAL SYMBOLS",
        items:[
          { icon:"🦚", text:"National Bird: Indian Peacock (Pavo cristatus) — designated 1963." },
          { icon:"🐯", text:"National Animal: Bengal Tiger — designated 1973 under Project Tiger." },
          { icon:"🪷", text:"National Flower: Lotus (Nelumbo nucifera) — symbol of purity and grace." },
          { icon:"🌳", text:"National Tree: Banyan (Ficus benghalensis) — symbolises unity and immortality." },
          { icon:"🐬", text:"National Aquatic Animal: River Dolphin (Gangetic Dolphin) — endangered species." },
        ]},
      { type:"facts", heading:"MORE NATIONAL SYMBOLS",
        items:[
          { icon:"🎵", text:"National Anthem: Jana Gana Mana by Rabindranath Tagore. Duration: 52 seconds." },
          { icon:"🎼", text:"National Song: Vande Mataram by Bankim Chandra Chattopadhyay." },
          { icon:"🏑", text:"National Sport: Field Hockey (India won 8 Olympic gold medals in hockey)." },
          { icon:"🥭", text:"National Fruit: Mango. National Vegetable: Pumpkin. National River: Ganga." },
          { icon:"🦢", text:"National Heritage Animal: Indian Elephant. National Reptile: King Cobra." },
        ]},
      { type:"facts", heading:"NATIONAL SYMBOLS — SIGNIFICANCE",
        items:[
          { icon:"🦁", text:"National Emblem: Lion Capital of Ashoka (Sarnath). Motto: 'Satyameva Jayate' (Truth alone triumphs)." },
          { icon:"🎨", text:"National Flag: tricolour — saffron (courage), white (truth), green (faith) + Ashoka Chakra (24 spokes)." },
          { icon:"📅", text:"Republic Day: 26 January. Independence Day: 15 August. National Calendar: Saka Calendar." },
          { icon:"⚖️", text:"National Currency Symbol: ₹ (Rupee). Designed by D. Udaya Kumar in 2010." },
        ]},
    ]
  },

  {
    id:"lc-gk-002", subject:"GK", color:"#f59e0b",
    slides:[
      { type:"facts", heading:"WORLD SCIENTISTS — PHYSICS",
        items:[
          { icon:"🍎", text:"Isaac Newton (1643-1727): Laws of Motion, Universal Gravitation, Calculus." },
          { icon:"⚛️", text:"Albert Einstein (1879-1955): Theory of Relativity, E=mc², Nobel Prize 1921." },
          { icon:"⚡", text:"Nikola Tesla: inventor of AC (alternating current) electrical system used worldwide today." },
          { icon:"🌈", text:"Max Planck: father of Quantum Theory. Marie Curie: discovered Polonium and Radium (2 Nobel Prizes)." },
        ]},
      { type:"facts", heading:"WORLD SCIENTISTS — LIFE SCIENCES",
        items:[
          { icon:"🧬", text:"Charles Darwin (1809-1882): Theory of Evolution by Natural Selection (Origin of Species, 1859)." },
          { icon:"🔬", text:"Louis Pasteur: germ theory of disease, pasteurisation, rabies vaccine." },
          { icon:"🩺", text:"Alexander Fleming (1928): discovered Penicillin — saved hundreds of millions of lives." },
          { icon:"🧬", text:"Watson and Crick (1953): discovered double-helix structure of DNA." },
          { icon:"💉", text:"Edward Jenner (1796): developed smallpox vaccine — father of immunology." },
        ]},
      { type:"facts", heading:"INDIAN SCIENTISTS",
        items:[
          { icon:"🔬", text:"C.V. Raman: Raman Effect (1928). First Asian Nobel Prize in Physics (1930)." },
          { icon:"🚀", text:"Vikram Sarabhai: father of Indian Space Programme (founded ISRO, 1969)." },
          { icon:"⚛️", text:"Homi J. Bhabha: father of India's nuclear programme. Founded TIFR." },
          { icon:"🔢", text:"Srinivasa Ramanujan: self-taught maths genius who contributed to infinite series and number theory." },
          { icon:"🎯", text:"APJ Abdul Kalam: father of India's missile programme. Agni, Prithvi missiles. 11th President." },
        ]},
    ]
  },

  {
    id:"lc-gk-004", subject:"GK", color:"#f59e0b",
    slides:[
      { type:"facts", heading:"OLYMPICS — KEY FACTS",
        items:[
          { icon:"🏅", text:"Modern Olympics began in Athens, Greece in 1896. Revived by Pierre de Coubertin." },
          { icon:"🔥", text:"Olympic flame is lit in Olympia, Greece and carried by relay to the host city." },
          { icon:"🌏", text:"Olympic motto: 'Faster, Higher, Stronger — Together' (Citius, Altius, Fortius — Communiter)." },
          { icon:"🥇", text:"Most Olympic gold medals ever: USA (gold) and overall. Michael Phelps: 23 golds (swimming)." },
        ]},
      { type:"facts", heading:"INDIA AT THE OLYMPICS",
        items:[
          { icon:"🇮🇳", text:"India's first Olympic medal: KD Jadhav won bronze in wrestling at 1952 Helsinki Olympics." },
          { icon:"🏑", text:"India dominated field hockey: won 8 gold medals from 1928 to 1980." },
          { icon:"🏹", text:"Abhinav Bindra: India's first individual Olympic gold (shooting, 10m air rifle, Beijing 2008)." },
          { icon:"🥊", text:"Paris 2024: India won 6 medals. Neeraj Chopra: silver in javelin (defending champion)." },
          { icon:"🤼", text:"Vinesh Phogat qualified for Paris final but was disqualified — became a major national conversation." },
        ]},
      { type:"facts", heading:"SPORTS WORLD RECORDS",
        items:[
          { icon:"⚡", text:"Fastest human: Usain Bolt (Jamaica) — 100m in 9.58 seconds (Berlin 2009). Still unbroken." },
          { icon:"🏊", text:"Fastest swimmer: Caeleb Dressel — 50m freestyle in 20.91 seconds." },
          { icon:"🏏", text:"Cricket: Sachin Tendulkar — 100 international centuries (51 Test, 49 ODI). Unmatched." },
          { icon:"⚽", text:"Football: Cristiano Ronaldo — most international goals (130+). Lionel Messi: 8 Ballon d'Or awards." },
        ]},
    ]
  },

  {
    id:"lc-gk-005", subject:"GK", color:"#f59e0b",
    slides:[
      { type:"facts", heading:"KEY INVENTIONS IN HISTORY",
        items:[
          { icon:"💡", text:"Light bulb: Thomas Edison (1879). Practical incandescent bulb that could last for hours." },
          { icon:"📞", text:"Telephone: Alexander Graham Bell (1876). First words spoken: 'Mr Watson, come here!'" },
          { icon:"✈️", text:"Aeroplane: Wright Brothers (Orville and Wilbur) at Kitty Hawk, USA, December 17, 1903." },
          { icon:"🖨️", text:"Printing press: Johannes Gutenberg (~1450 CE) — made books available to common people." },
        ]},
      { type:"facts", heading:"TECHNOLOGY MILESTONES",
        items:[
          { icon:"💻", text:"First computer: ENIAC (1945) — filled an entire room, weighed 30 tonnes, cost millions." },
          { icon:"🌐", text:"World Wide Web: invented by Tim Berners-Lee in 1989. First website: info.cern.ch." },
          { icon:"📱", text:"First iPhone: launched by Steve Jobs on January 9, 2007. Changed mobile computing forever." },
          { icon:"🤖", text:"Artificial Intelligence: term coined at Dartmouth Conference, 1956. ChatGPT launched in 2022." },
          { icon:"🛰️", text:"First satellite: Sputnik 1 (USSR, October 4, 1957). First object sent into Earth orbit." },
        ]},
      { type:"facts", heading:"INDIAN TECHNOLOGY ACHIEVEMENTS",
        items:[
          { icon:"🚀", text:"ISRO founded 1969 by Vikram Sarabhai. India's space agency on a fraction of NASA's budget." },
          { icon:"🌙", text:"Chandrayaan-3 (Aug 23, 2023): India became 4th country to land on Moon (south pole — a first)." },
          { icon:"🔴", text:"Mangalyaan (Mars Orbiter Mission, 2013): reached Mars orbit on first attempt. Only country to do so." },
          { icon:"🛸", text:"GSLV Mk III (LVM3): India's heaviest rocket. Can carry 4-tonne satellites to geostationary orbit." },
        ]},
    ]
  },

  {
    id:"lc-gk-006", subject:"GK", color:"#f59e0b",
    slides:[
      { type:"facts", heading:"INDIA'S GOVERNMENT — BASICS",
        items:[
          { icon:"🏛️", text:"India is a Sovereign, Socialist, Secular, Democratic Republic (Preamble words)." },
          { icon:"📜", text:"Constitution adopted: November 26, 1949 (Constitution Day). Enacted: January 26, 1950." },
          { icon:"📖", text:"Longest written constitution in the world. Original: 395 articles, 8 schedules, 22 parts." },
          { icon:"⚖️", text:"B.R. Ambedkar: Chairman of Drafting Committee. Called Father of the Indian Constitution." },
        ]},
      { type:"facts", heading:"THREE BRANCHES OF GOVERNMENT",
        items:[
          { icon:"📋", text:"Legislature (Parliament): makes laws. Rajya Sabha (Upper House) + Lok Sabha (Lower House)." },
          { icon:"⚙️", text:"Executive: implements laws. President → Prime Minister → Cabinet Ministers → Civil Services." },
          { icon:"⚖️", text:"Judiciary: interprets laws. Supreme Court → High Courts → District Courts." },
          { icon:"🔒", text:"Checks and balances: each branch limits the power of the others. No single body dominates." },
        ]},
      { type:"facts", heading:"FUNDAMENTAL RIGHTS & DUTIES",
        items:[
          { icon:"🗣️", text:"Right to Equality (Art 14-18), Right to Freedom (Art 19-22), Right to Education (Art 21A)." },
          { icon:"🛡️", text:"Right against Exploitation (Art 23-24), Cultural Rights (Art 29-30), Right to Constitutional Remedies (Art 32)." },
          { icon:"✅", text:"Fundamental Duties (Art 51A): respect national symbols, protect environment, promote harmony." },
          { icon:"🏛️", text:"Directive Principles of State Policy: not enforceable in court but guide government policy-making." },
        ]},
    ]
  },

  {
    id:"lc-gk-003", subject:"GK", color:"#f59e0b",
    slides:[
      { type:"facts", heading:"UNITED NATIONS — KEY FACTS",
        items:[
          { icon:"🕊️", text:"UN founded October 24, 1945 after WW2. HQ: New York. 193 member nations." },
          { icon:"🌍", text:"6 official UN languages: Arabic, Chinese, English, French, Russian, Spanish." },
          { icon:"🏛️", text:"Main organs: General Assembly, Security Council, Secretariat, ICJ, ECOSOC, Trusteeship Council." },
          { icon:"🔒", text:"Security Council: 5 permanent members (USA, UK, France, Russia, China) + 10 rotating members." },
          { icon:"🇮🇳", text:"India has been a non-permanent member of UN Security Council 8 times (most recently 2021-22)." },
        ]},
      { type:"facts", heading:"UN AGENCIES AND THEIR ROLES",
        items:[
          { icon:"🌍", text:"WHO: World Health Organization — global health, disease control. HQ: Geneva." },
          { icon:"📚", text:"UNESCO: Education, Science, Culture — designates World Heritage Sites. HQ: Paris." },
          { icon:"👶", text:"UNICEF: Children's rights, nutrition, education in developing nations. HQ: New York." },
          { icon:"🌾", text:"FAO: Food and Agriculture Organization — fights hunger worldwide. HQ: Rome." },
          { icon:"💰", text:"UNDP: UN Development Programme — reduces poverty and inequality globally." },
        ]},
      { type:"facts", heading:"OTHER MAJOR WORLD ORGANISATIONS",
        items:[
          { icon:"💵", text:"World Bank and IMF: financial institutions that support developing economies." },
          { icon:"🤝", text:"WTO (World Trade Organization): regulates international trade rules. HQ: Geneva." },
          { icon:"🛡️", text:"NATO: military alliance of 32 countries, mainly North America and Europe." },
          { icon:"🌏", text:"SAARC: South Asian association — India, Pakistan, Bangladesh, Nepal, Sri Lanka and more." },
          { icon:"🇮🇳", text:"G20: 20 major economies. India held G20 presidency in 2023 (New Delhi Summit)." },
        ]},
    ]
  },


  // ══════════════════════════════════════════════════════════════
  //  ENGLISH — additional packs (lc-e-009 to lc-e-012)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-e-009", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"facts", heading:"CONJUNCTIONS",
        items:[
          { icon:"🔗", text:"Coordinating (FANBOYS): For, And, Nor, But, Or, Yet, So — join equal clauses." },
          { icon:"↕️", text:"Subordinating: although, because, since, unless, until, when, while, if, after, before." },
          { icon:"📋", text:"Correlative pairs: either…or, neither…nor, not only…but also, both…and, whether…or." },
          { icon:"✅", text:"'Because' introduces reason. 'Although' introduces contrast. 'Unless' = 'if not'." },
        ]},
      { type:"facts", heading:"CONDITIONALS",
        items:[
          { icon:"0️⃣", text:"Zero conditional: always true. 'If water reaches 100°C, it boils.' (If + present, present)" },
          { icon:"1️⃣", text:"First conditional: real/possible future. 'If it rains, we will cancel.' (If + present, will)" },
          { icon:"2️⃣", text:"Second conditional: imaginary/unlikely. 'If I were rich, I would travel.' (If + past, would)" },
          { icon:"3️⃣", text:"Third conditional: impossible (past). 'If I had studied, I would have passed.' (If + past perfect, would have)" },
        ]},
      { type:"vocab", heading:"COMMON CONJUNCTION ERRORS",
        items:[
          { wrong:"Although she studied, but she failed",     right:"Although she studied, she failed" },
          { wrong:"Because he was tired, so he slept",        right:"Because he was tired, he slept" },
          { wrong:"Despite of the rain, we played",           right:"Despite the rain, we played" },
          { wrong:"Neither he or she came",                   right:"Neither he nor she came" },
        ]},
    ]
  },

  {
    id:"lc-e-010", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"facts", heading:"TYPES OF SENTENCES",
        items:[
          { icon:"💬", text:"Declarative: makes a statement. 'The sun rises in the east.' Ends with a full stop." },
          { icon:"❓", text:"Interrogative: asks a question. 'Where are you going?' Ends with a question mark." },
          { icon:"⚡", text:"Exclamatory: expresses strong feeling. 'What a surprise!' Ends with exclamation mark." },
          { icon:"👉", text:"Imperative: gives a command or request. 'Close the door please.' Subject (you) is implied." },
        ]},
      { type:"facts", heading:"SENTENCE STRUCTURE",
        items:[
          { icon:"🔹", text:"Simple sentence: one independent clause. 'She sang beautifully.'" },
          { icon:"🔸", text:"Compound sentence: two independent clauses joined by a conjunction. 'She sang and he played guitar.'" },
          { icon:"🔶", text:"Complex sentence: one main clause + one or more subordinate clauses. 'She sang while he played.'" },
          { icon:"💎", text:"Compound-complex: two independent + one subordinate clause. 'She sang and he played, while the audience cheered.'" },
        ]},
      { type:"vocab", heading:"DIRECT SPEECH TO INDIRECT SPEECH",
        items:[
          { wrong:"She said, 'I am tired.'",                right:"She said that she was tired." },
          { wrong:"He asked, 'Where do you live?'",         right:"He asked where I lived." },
          { wrong:"Teacher said, 'Complete your homework.'", right:"Teacher told us to complete our homework." },
          { wrong:"She said, 'I will come tomorrow.'",      right:"She said that she would come the next day." },
        ]},
    ]
  },

  {
    id:"lc-e-011", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"vocab", heading:"COMMON IDIOMS — ACTIONS",
        items:[
          { wrong:"Hit the sack",              right:"Go to sleep" },
          { wrong:"Under the weather",         right:"Feeling ill or unwell" },
          { wrong:"Bite the bullet",           right:"Endure a painful situation patiently" },
          { wrong:"Let the cat out of the bag", right:"Accidentally reveal a secret" },
          { wrong:"Beat around the bush",      right:"Avoid getting to the main point" },
        ]},
      { type:"vocab", heading:"COMMON IDIOMS — SUCCESS/FAILURE",
        items:[
          { wrong:"Hit the nail on the head",  right:"Say something exactly right" },
          { wrong:"Bite off more than you can chew", right:"Take on more than you can handle" },
          { wrong:"Once in a blue moon",       right:"Very rarely" },
          { wrong:"Go back to the drawing board", right:"Start something over from the beginning" },
          { wrong:"The ball is in your court", right:"It's your turn to take action or decide" },
        ]},
      { type:"facts", heading:"PROVERBS — MEANINGS",
        items:[
          { icon:"📖", text:"'Actions speak louder than words' — what you do matters more than what you say." },
          { icon:"📖", text:"'Every cloud has a silver lining' — every bad situation has something positive in it." },
          { icon:"📖", text:"'A stitch in time saves nine' — fix a problem early before it gets bigger." },
          { icon:"📖", text:"'Don't judge a book by its cover' — don't judge by appearances alone." },
          { icon:"📖", text:"'The pen is mightier than the sword' — writing and ideas are more powerful than violence." },
        ]},
    ]
  },

  {
    id:"lc-e-012", subject:"English", color:"#0EA5A4",
    slides:[
      { type:"facts", heading:"READING COMPREHENSION STRATEGIES",
        items:[
          { icon:"👀", text:"SKIM first: read headings, first/last sentences of each para to get the main idea quickly." },
          { icon:"🔍", text:"SCAN for answers: look for keywords from the question — don't re-read everything." },
          { icon:"📌", text:"Underline key words in questions BEFORE reading — then you know what to look for." },
          { icon:"✅", text:"For 'title' questions: find the CENTRAL theme, not just a detail mentioned in the passage." },
        ]},
      { type:"facts", heading:"ANSWERING COMPREHENSION QUESTIONS",
        items:[
          { icon:"1️⃣", text:"'What does the word X mean?' — find the word in context and choose the closest synonym." },
          { icon:"2️⃣", text:"'Give a title to the passage' — it should cover ALL the content, not just one part." },
          { icon:"3️⃣", text:"'What does the author suggest?' — look for words like 'should', 'must', 'important'." },
          { icon:"4️⃣", text:"Inference questions: the answer is not directly stated — read between the lines." },
        ]},
      { type:"facts", heading:"ESSAY & PARAGRAPH WRITING TIPS",
        items:[
          { icon:"📝", text:"Paragraph structure: Topic sentence → Supporting details → Example → Concluding sentence." },
          { icon:"🔗", text:"Transition words: First, Moreover, However, In addition, Therefore, As a result, In conclusion." },
          { icon:"✍️", text:"Good essay structure: Introduction (hook + thesis) → Body paragraphs → Conclusion (summary + insight)." },
          { icon:"⚠️", text:"Avoid: starting sentences with 'I think', repetition, vague words like 'nice', 'good', 'thing'." },
        ]},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  MATHEMATICS — additional packs (lc-m-008 to lc-m-012)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-m-008", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"formula", heading:"RATIO AND PROPORTION",
        items:[
          { n:1, label:"Ratio a:b",           formula:"= a/b (same units only)" },
          { n:2, label:"Proportion",          formula:"a:b = c:d  →  ad = bc (cross product)" },
          { n:3, label:"3rd proportional",    formula:"If a:b = b:x → x = b²/a" },
          { n:4, label:"Mean proportional",   formula:"Between a and b = √(a × b)" },
          { n:5, label:"Divide in ratio m:n", formula:"Parts = m/(m+n) × total  and  n/(m+n) × total" },
        ]},
      { type:"formula", heading:"UNITARY METHOD",
        items:[
          { n:1, label:"Direct proportion",   formula:"More of A → more of B (same direction)" },
          { n:2, label:"Inverse proportion",  formula:"More of A → less of B (opposite direction)" },
          { n:3, label:"Direct: find unit",   formula:"Value of 1 = given value ÷ given quantity" },
          { n:4, label:"Then multiply",       formula:"Required value = unit value × required quantity" },
        ]},
      { type:"facts", heading:"RATIO TIPS AND TRICKS",
        items:[
          { icon:"💡", text:"To compare ratios: convert to same denominator or find decimal equivalents." },
          { icon:"💡", text:"If A:B = 3:5 and B:C = 5:7, then A:B:C = 3:5:7 (B is the common link)." },
          { icon:"💡", text:"Compound ratio: A:B combined with C:D = AC:BD (multiply corresponding terms)." },
          { icon:"⚡", text:"Trick: if ratio is a:b, total must be a multiple of (a+b). E.g. ratio 3:5 → totals 8,16,24..." },
        ]},
    ]
  },

  {
    id:"lc-m-009", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"formula", heading:"SPEED, DISTANCE AND TIME",
        items:[
          { n:1, label:"Speed",            formula:"Distance ÷ Time" },
          { n:2, label:"Distance",         formula:"Speed × Time" },
          { n:3, label:"Time",             formula:"Distance ÷ Speed" },
          { n:4, label:"Average speed",    formula:"Total distance ÷ Total time (NOT average of speeds!)" },
          { n:5, label:"Convert km/h → m/s", formula:"Multiply by 5/18" },
          { n:6, label:"Convert m/s → km/h", formula:"Multiply by 18/5" },
        ]},
      { type:"formula", heading:"TRAINS AND BOATS",
        items:[
          { n:1, label:"Train crosses a pole",    formula:"Time = length of train ÷ speed" },
          { n:2, label:"Train crosses a platform", formula:"Time = (train + platform length) ÷ speed" },
          { n:3, label:"Two trains same dir.",     formula:"Relative speed = difference of speeds" },
          { n:4, label:"Two trains opposite dir.", formula:"Relative speed = sum of speeds" },
          { n:5, label:"Boat downstream",         formula:"Speed = boat speed + current speed" },
          { n:6, label:"Boat upstream",           formula:"Speed = boat speed − current speed" },
        ]},
      { type:"facts", heading:"SPEED/DISTANCE/TIME — TIPS",
        items:[
          { icon:"⚡", text:"Always check units! If speed in km/h and time in minutes, convert time to hours first." },
          { icon:"📐", text:"Average speed trap: if you travel equal DISTANCES at two speeds, use harmonic mean: 2ab/(a+b)." },
          { icon:"🚂", text:"For trains: the length of the train itself must be added to whatever it crosses." },
          { icon:"🚤", text:"Still water speed of boat = (downstream + upstream) ÷ 2. Current = (downstream − upstream) ÷ 2." },
        ]},
    ]
  },

  {
    id:"lc-m-010", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"formula", heading:"PROBABILITY — BASICS",
        items:[
          { n:1, label:"Probability (P)",      formula:"Favourable outcomes ÷ Total outcomes" },
          { n:2, label:"Range",                formula:"0 ≤ P(E) ≤ 1 always" },
          { n:3, label:"Certain event",        formula:"P = 1 (will definitely happen)" },
          { n:4, label:"Impossible event",     formula:"P = 0 (cannot happen)" },
          { n:5, label:"Complementary",        formula:"P(not E) = 1 − P(E)" },
          { n:6, label:"Sum of all outcomes",  formula:"Always = 1" },
        ]},
      { type:"facts", heading:"PROBABILITY WITH CARDS AND COINS",
        items:[
          { icon:"🃏", text:"Standard deck: 52 cards = 4 suits × 13 cards. Suits: Hearts, Diamonds (red), Clubs, Spades (black)." },
          { icon:"🎴", text:"Face cards: Jack, Queen, King (12 total). Aces: 4. Number cards (2-10): 36." },
          { icon:"🪙", text:"Fair coin: P(Head) = 1/2, P(Tail) = 1/2. Two tosses: 4 outcomes (HH, HT, TH, TT)." },
          { icon:"🎲", text:"Fair die (1-6): P(any number) = 1/6. P(even) = 3/6 = 1/2. P(prime) = 3/6 = 1/2 (2,3,5)." },
        ]},
      { type:"facts", heading:"PROBABILITY — COMMON MISTAKES",
        items:[
          { icon:"⚠️", text:"Each coin toss or dice roll is INDEPENDENT — previous results do not affect the next." },
          { icon:"⚠️", text:"P(A or B) = P(A) + P(B) ONLY if A and B are mutually exclusive (cannot happen together)." },
          { icon:"✅", text:"When drawing WITHOUT replacement: total outcomes reduce for each draw." },
          { icon:"✅", text:"Experimental probability approaches theoretical probability as number of trials increases." },
        ]},
    ]
  },

  {
    id:"lc-m-011", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"formula", heading:"MENSURATION — 3D SOLIDS",
        items:[
          { n:1, label:"Cube volume",         formula:"side³" },
          { n:2, label:"Cuboid volume",       formula:"l × b × h" },
          { n:3, label:"Cylinder volume",     formula:"π r² h" },
          { n:4, label:"Cone volume",         formula:"(1/3) π r² h" },
          { n:5, label:"Sphere volume",       formula:"(4/3) π r³" },
          { n:6, label:"Hemisphere volume",   formula:"(2/3) π r³" },
        ]},
      { type:"formula", heading:"SURFACE AREAS",
        items:[
          { n:1, label:"Cube total SA",       formula:"6 × side²" },
          { n:2, label:"Cuboid total SA",     formula:"2(lb + bh + lh)" },
          { n:3, label:"Cylinder curved SA",  formula:"2 π r h" },
          { n:4, label:"Cylinder total SA",   formula:"2 π r (r + h)" },
          { n:5, label:"Cone curved SA",      formula:"π r l  (l = slant height)" },
          { n:6, label:"Sphere SA",           formula:"4 π r²" },
        ]},
      { type:"facts", heading:"MENSURATION TIPS",
        items:[
          { icon:"💡", text:"Slant height of cone (l) = √(r² + h²). Calculate this before finding curved surface area." },
          { icon:"💡", text:"If a solid is melted and recast: volume stays the SAME. Only shape changes." },
          { icon:"💡", text:"Hollow cylinder: volume = π(R² − r²) × h where R = outer radius, r = inner radius." },
          { icon:"💡", text:"π ≈ 22/7 for simple calculations. Use 3.14 when more precision is needed." },
        ]},
    ]
  },

  {
    id:"lc-m-012", subject:"Mathematics", color:"#2563EB",
    slides:[
      { type:"facts", heading:"NUMBER PATTERNS",
        items:[
          { icon:"🔢", text:"Arithmetic sequence: constant difference. 2, 5, 8, 11, 14… (diff = 3). nth term = a + (n-1)d" },
          { icon:"🔢", text:"Geometric sequence: constant ratio. 2, 6, 18, 54… (ratio = 3). nth term = a × r^(n-1)" },
          { icon:"🔢", text:"Fibonacci: each term = sum of previous two. 1, 1, 2, 3, 5, 8, 13, 21, 34…" },
          { icon:"🔢", text:"Perfect squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225…" },
        ]},
      { type:"formula", heading:"ARITHMETIC PROGRESSION (AP)",
        items:[
          { n:1, label:"nth term (Tn)",     formula:"a + (n-1)d   (a=first term, d=common diff)" },
          { n:2, label:"Sum of n terms",   formula:"(n/2) × [2a + (n-1)d]" },
          { n:3, label:"Sum (alt form)",   formula:"(n/2) × (first + last term)" },
          { n:4, label:"Find 'd'",         formula:"Any term minus the previous term" },
          { n:5, label:"Find 'a'",         formula:"T1 = a (the very first term)" },
        ]},
      { type:"facts", heading:"PATTERN TIPS FOR OLYMPIADS",
        items:[
          { icon:"🎯", text:"Sum of first n natural numbers: n(n+1)/2. E.g. 1+2+...+100 = 100×101/2 = 5050." },
          { icon:"🎯", text:"Sum of first n odd numbers: n². E.g. 1+3+5+7+9 = 5² = 25." },
          { icon:"🎯", text:"Sum of first n even numbers: n(n+1). E.g. 2+4+6+8 = 4×5 = 20." },
          { icon:"🎯", text:"Triangular numbers: 1, 3, 6, 10, 15, 21… Formula: n(n+1)/2." },
        ]},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  SCIENCE — additional packs (lc-s-007 to lc-s-011)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-s-007", subject:"Science", color:"#10b981",
    slides:[
      { type:"facts", heading:"LIGHT — REFLECTION",
        items:[
          { icon:"🔦", text:"Law of reflection: angle of incidence = angle of reflection. Both measured from the normal." },
          { icon:"🪞", text:"Plane mirror image: virtual, erect, same size, laterally inverted, as far behind as object in front." },
          { icon:"🥣", text:"Concave mirror (converges light): used in torches, headlights, shaving mirrors, solar cookers." },
          { icon:"🚗", text:"Convex mirror (diverges light): always virtual, erect, diminished. Used in rear-view mirrors." },
        ]},
      { type:"facts", heading:"LIGHT — REFRACTION AND LENSES",
        items:[
          { icon:"🌊", text:"Refraction: bending of light when it passes from one medium to another (speed changes)." },
          { icon:"💧", text:"Light bends TOWARDS normal when going from less dense to more dense medium (e.g. air → water)." },
          { icon:"🔍", text:"Convex lens (converging): thicker in middle. Used in magnifying glass, cameras, human eye, projectors." },
          { icon:"👓", text:"Concave lens (diverging): thinner in middle. Used to correct short-sightedness (myopia)." },
        ]},
      { type:"facts", heading:"COLOURS AND SPECTRUM",
        items:[
          { icon:"🌈", text:"VIBGYOR: Violet, Indigo, Blue, Green, Yellow, Orange, Red — the 7 colours of visible light." },
          { icon:"☀️", text:"White light splits into VIBGYOR when passed through a glass prism (dispersion)." },
          { icon:"🌈", text:"Rainbow: sunlight refracts, reflects inside water droplets, then refracts again — produces spectrum." },
          { icon:"🔴", text:"Red light: longest wavelength, least bent. Violet: shortest wavelength, most bent." },
        ]},
    ]
  },

  {
    id:"lc-s-008", subject:"Science", color:"#10b981",
    slides:[
      { type:"facts", heading:"SOUND — PROPERTIES",
        items:[
          { icon:"🔊", text:"Sound is a longitudinal mechanical wave — needs a medium to travel (cannot travel in vacuum)." },
          { icon:"⚡", text:"Speed of sound: ~343 m/s in air (at 20°C). Faster in liquids, fastest in solids." },
          { icon:"🎵", text:"Frequency (Hz): number of vibrations per second. High frequency = high-pitched sound." },
          { icon:"📢", text:"Amplitude: height of wave = loudness. More amplitude → louder sound. Measured in decibels (dB)." },
        ]},
      { type:"facts", heading:"ECHO AND ULTRASOUND",
        items:[
          { icon:"🔁", text:"Echo: reflection of sound. Minimum distance for echo = 17.2 m (sound needs 0.1s gap to return)." },
          { icon:"🦇", text:"Ultrasound (>20,000 Hz): above human hearing range. Bats use it for echolocation." },
          { icon:"🏥", text:"Ultrasound uses in medicine: sonography/scans, breaking kidney stones (lithotripsy)." },
          { icon:"🚢", text:"SONAR: Sound Navigation And Ranging — measures ocean depth using ultrasound echoes." },
        ]},
      { type:"facts", heading:"HUMAN HEARING RANGE",
        items:[
          { icon:"👂", text:"Human hearing range: 20 Hz to 20,000 Hz (20 kHz). This narrows with age." },
          { icon:"🐕", text:"Infrasound (<20 Hz): below human range. Elephants, whales, and dogs detect it." },
          { icon:"🌍", text:"Earthquakes produce infrasound — animals may sense it and show unusual behaviour before quakes." },
          { icon:"🎸", text:"Musical note 'A' = 440 Hz. Humans speak typically between 85-255 Hz fundamental frequency." },
        ]},
    ]
  },

  {
    id:"lc-s-009", subject:"Science", color:"#10b981",
    slides:[
      { type:"facts", heading:"ACIDS, BASES AND SALTS",
        items:[
          { icon:"🧪", text:"Acid: tastes sour, turns blue litmus red, pH less than 7. Examples: HCl, H2SO4, vinegar, lemon juice." },
          { icon:"🧼", text:"Base: tastes bitter, feels soapy, turns red litmus blue, pH greater than 7. Examples: NaOH, lime water, baking soda." },
          { icon:"⚖️", text:"Neutral: pH = 7. Neither acid nor base. Examples: pure water, common salt solution." },
          { icon:"🧂", text:"Salt: formed when acid reacts with base (neutralisation). E.g. HCl + NaOH → NaCl + H2O." },
        ]},
      { type:"formula", heading:"pH SCALE",
        items:[
          { n:1, label:"pH 0-2",   formula:"Very strong acid (battery acid, stomach HCl)" },
          { n:2, label:"pH 3-4",   formula:"Weak acid (vinegar pH 3, tomato pH 4)" },
          { n:3, label:"pH 5-6",   formula:"Mildly acidic (coffee, rain water, urine)" },
          { n:4, label:"pH 7",     formula:"Neutral (pure water, salt solution)" },
          { n:5, label:"pH 8-10",  formula:"Mild base (blood pH 7.4, soap, baking soda)" },
          { n:6, label:"pH 11-14", formula:"Strong base (lime, bleach, drain cleaner)" },
        ]},
      { type:"facts", heading:"CHEMICAL VS PHYSICAL CHANGE",
        items:[
          { icon:"🔥", text:"Chemical change: new substance formed, irreversible. Burning, rusting, fermentation, cooking." },
          { icon:"💧", text:"Physical change: no new substance, reversible. Melting, boiling, cutting, dissolving sugar in water." },
          { icon:"🌡️", text:"Signs of chemical change: colour change, gas produced, heat/light released, precipitate formed." },
          { icon:"✅", text:"Rusting of iron: iron + oxygen + water → iron oxide (Fe2O3). Slowed by painting, galvanising." },
        ]},
    ]
  },

  {
    id:"lc-s-010", subject:"Science", color:"#10b981",
    slides:[
      { type:"facts", heading:"ECOSYSTEMS AND FOOD CHAINS",
        items:[
          { icon:"🌿", text:"Producers: plants make their own food via photosynthesis. Base of ALL food chains." },
          { icon:"🐛", text:"Primary consumers (herbivores): eat plants. E.g. deer, rabbit, caterpillar, grasshopper." },
          { icon:"🦊", text:"Secondary consumers (carnivores/omnivores): eat herbivores. E.g. frog, small bird, fox." },
          { icon:"🦅", text:"Tertiary consumers (top predators): eat secondary consumers. E.g. hawk, lion, shark." },
          { icon:"🍄", text:"Decomposers: fungi and bacteria break down dead matter — return nutrients to soil." },
        ]},
      { type:"facts", heading:"ECOSYSTEMS — KEY CONCEPTS",
        items:[
          { icon:"🕸️", text:"Food web: multiple food chains interconnected in an ecosystem. More realistic than a single chain." },
          { icon:"📊", text:"Pyramid of energy: energy decreases at each trophic level (~90% lost as heat at each step)." },
          { icon:"🌱", text:"Only ~10% of energy transfers to the next level — that's why food chains rarely exceed 4-5 levels." },
          { icon:"🦁", text:"Keystone species: removing them collapses the ecosystem. E.g. wolves in Yellowstone, bees globally." },
        ]},
      { type:"facts", heading:"BIODIVERSITY AND CONSERVATION",
        items:[
          { icon:"🌍", text:"India has about 8% of world's species on just 2.4% of land area — a biodiversity hotspot." },
          { icon:"🐯", text:"India's Project Tiger (1973): saved Bengal tiger from extinction. Now ~3,600+ tigers in India." },
          { icon:"🌊", text:"Coral reefs: cover less than 1% of ocean floor but support 25% of all marine species." },
          { icon:"♻️", text:"Threats to biodiversity: habitat destruction, pollution, invasive species, climate change, poaching." },
        ]},
    ]
  },

  {
    id:"lc-s-011", subject:"Science", color:"#10b981",
    slides:[
      { type:"facts", heading:"HUMAN DISEASES — TYPES",
        items:[
          { icon:"🦠", text:"Infectious diseases (communicable): spread from person to person. E.g. cold, flu, TB, COVID-19." },
          { icon:"🍔", text:"Non-infectious (non-communicable): cannot spread. E.g. diabetes, cancer, heart disease, asthma." },
          { icon:"🧫", text:"Bacterial diseases: TB, cholera, typhoid, plague. Treated with antibiotics." },
          { icon:"🦟", text:"Viral diseases: flu, cold, dengue, polio, AIDS. Antibiotics do NOT work — need antivirals/vaccines." },
        ]},
      { type:"facts", heading:"DISEASE VECTORS AND PREVENTION",
        items:[
          { icon:"🦟", text:"Mosquito-borne: malaria (Anopheles), dengue (Aedes aegypti), chikungunya (Aedes aegypti)." },
          { icon:"💧", text:"Waterborne diseases (contaminated water): cholera, typhoid, hepatitis A, dysentery." },
          { icon:"💉", text:"Vaccines: train the immune system using weakened/dead pathogens. Prevent, not cure." },
          { icon:"🧼", text:"Prevention: hand washing, boiling water, mosquito nets, clean sanitation, vaccination." },
        ]},
      { type:"facts", heading:"IMMUNITY AND VACCINES",
        items:[
          { icon:"🛡️", text:"Innate immunity: general defence present from birth — skin, mucus, white blood cells." },
          { icon:"🎯", text:"Adaptive immunity: specific defence against particular pathogens — develops after exposure." },
          { icon:"💉", text:"Edward Jenner (1796): first vaccine — cowpox material to protect against smallpox." },
          { icon:"🌍", text:"Smallpox: the only human disease completely eradicated (1980) through global vaccination." },
          { icon:"🇮🇳", text:"India's Universal Immunisation Programme covers polio, TB, hepatitis B, measles, tetanus and more." },
        ]},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  HISTORY — additional packs (lc-h-004 to lc-h-006)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-h-004", subject:"History", color:"#8b5cf6",
    slides:[
      { type:"facts", heading:"VEDIC AGE (~1500–600 BCE)",
        items:[
          { icon:"📜", text:"Early Vedic period: Aryans settled in Punjab. Main text: Rigveda (oldest Vedic text, ~1500 BCE)." },
          { icon:"📚", text:"4 Vedas: Rigveda (hymns), Samaveda (songs), Yajurveda (rituals), Atharvaveda (spells/herbs)." },
          { icon:"🏙️", text:"Later Vedic period: Aryans spread to Ganga plains. Kingdoms (Mahajanapadas) emerged." },
          { icon:"⚖️", text:"Varna system emerged: Brahmin (priests), Kshatriya (warriors), Vaishya (traders), Shudra (workers)." },
        ]},
      { type:"facts", heading:"GUPTA EMPIRE — GOLDEN AGE",
        items:[
          { icon:"👑", text:"Founded by Sri Gupta (~240 CE). Greatest ruler: Chandragupta II (Vikramaditya, 376–415 CE)." },
          { icon:"📐", text:"Aryabhata: calculated pi (π), explained solar/lunar eclipses, stated Earth rotates on its axis." },
          { icon:"🔢", text:"Brahmagupta: formulated rules for zero and negative numbers. Indian numerals spread to the world." },
          { icon:"📚", text:"Kalidasa: greatest Sanskrit poet. Works: Abhijnanashakuntalam, Meghaduta, Raghuvamsa." },
          { icon:"🏛️", text:"Ajanta Caves (2nd century BCE–5th century CE): Buddhist paintings at their artistic peak under Guptas." },
        ]},
      { type:"facts", heading:"BUDDHISM AND JAINISM",
        items:[
          { icon:"☸️", text:"Siddhartha Gautama (Buddha): born in Lumbini, Nepal. Attained enlightenment in Bodh Gaya under a pipal tree." },
          { icon:"🙏", text:"Four Noble Truths: life has suffering → cause is desire → end suffering → follow the Eightfold Path." },
          { icon:"⚡", text:"Mahavira (24th Tirthankara): born in Vaishali. Jain philosophy: non-violence (ahimsa) above all." },
          { icon:"🌍", text:"Both Buddhism and Jainism arose in 6th century BCE, challenged the rigid Varna system of Vedic religion." },
        ]},
    ]
  },

  {
    id:"lc-h-005", subject:"History", color:"#8b5cf6",
    slides:[
      { type:"facts", heading:"DELHI SULTANATE (1206–1526)",
        items:[
          { icon:"👑", text:"Founded by Qutb-ud-din Aibak in 1206. Five dynasties: Slave, Khalji, Tughlaq, Sayyid, Lodi." },
          { icon:"🕌", text:"Qutb Minar (Delhi): started by Qutb-ud-din Aibak, completed by Iltutmish. 73 m tall, UNESCO site." },
          { icon:"⚡", text:"Alauddin Khalji: market reforms, price control, military expansion, defeated Mongol invasions." },
          { icon:"🌍", text:"Ibn Battuta: Moroccan traveller who visited India during Muhammad bin Tughlaq's reign. Wrote detailed observations." },
        ]},
      { type:"facts", heading:"MUGHAL EMPIRE (1526–1857)",
        items:[
          { icon:"👑", text:"Founded by Babur after First Battle of Panipat (1526) — defeated Ibrahim Lodi using gunpowder." },
          { icon:"🏛️", text:"Akbar the Great (1556-1605): Din-i-Ilahi, Navratna, religious tolerance, centralised administration." },
          { icon:"🕌", text:"Shah Jahan: built Taj Mahal (1632-53) for wife Mumtaz. Also built Red Fort and Jama Masjid." },
          { icon:"⚔️", text:"Aurangzeb: last major Mughal emperor. Expanded empire but strict policies weakened it after his death." },
          { icon:"💰", text:"Mughal India: world's largest economy (~25% of global GDP) in the 17th century." },
        ]},
      { type:"facts", heading:"BATTLE OF PANIPAT (3 BATTLES)",
        items:[
          { icon:"⚔️", text:"First Battle (1526): Babur defeated Ibrahim Lodi → Founded Mughal Empire." },
          { icon:"⚔️", text:"Second Battle (1556): Akbar's forces (under Bairam Khan) defeated Hemu → Secured Mughal rule." },
          { icon:"⚔️", text:"Third Battle (1761): Ahmad Shah Durrani defeated Marathas → Weakened Maratha power." },
          { icon:"🗺️", text:"Panipat (in modern Haryana) is called 'the decisive battleground of India' — shaped history 3 times." },
        ]},
    ]
  },

  {
    id:"lc-h-006", subject:"History", color:"#8b5cf6",
    slides:[
      { type:"facts", heading:"PARTITION OF INDIA (1947)",
        items:[
          { icon:"🇮🇳", text:"August 14/15, 1947: British India divided into India and Pakistan at midnight." },
          { icon:"😢", text:"Largest mass migration in history: ~15 million people displaced. Estimated 200,000-2 million killed." },
          { icon:"📜", text:"Mountbatten Plan (June 1947): announced partition. Cyril Radcliffe drew the border in just 5 weeks." },
          { icon:"🤝", text:"Jawaharlal Nehru's Tryst with Destiny speech at midnight August 14-15, 1947 — iconic moment." },
        ]},
      { type:"facts", heading:"INTEGRATION OF PRINCELY STATES",
        items:[
          { icon:"🗺️", text:"At independence, 562 princely states existed. Sardar Vallabhbhai Patel integrated them into India." },
          { icon:"💪", text:"Patel called 'Iron Man of India' for his role in unifying India. Also first Deputy PM and Home Minister." },
          { icon:"🏔️", text:"Hyderabad: held out but 'Police Action' (Operation Polo, September 1948) forced accession." },
          { icon:"🏔️", text:"Kashmir: signed instrument of accession to India in October 1947 after Pakistani tribal invasion." },
        ]},
      { type:"facts", heading:"INDIA'S CONSTITUTION MAKERS",
        items:[
          { icon:"⚖️", text:"B.R. Ambedkar: Chairman of Drafting Committee. Also Dr of Law, Columbia & London. Father of Constitution." },
          { icon:"📜", text:"Constituent Assembly: 299 members, met for 2 years 11 months 18 days. 11 sessions held." },
          { icon:"🖊️", text:"Constitution is HANDWRITTEN and illustrated — 251 pages. Calligraphy by Prem Behari Narain Raizada." },
          { icon:"🌍", text:"India's Constitution is influenced by: UK (parliamentary system), USA (fundamental rights), Ireland (DPSP), Australia (joint sitting)." },
        ]},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  GEOGRAPHY — additional packs (lc-g-004 to lc-g-006)
  // ══════════════════════════════════════════════════════════════

  {
    id:"lc-g-004", subject:"Geography", color:"#ef4444",
    slides:[
      { type:"facts", heading:"LAYERS OF THE ATMOSPHERE",
        items:[
          { icon:"🌍", text:"Troposphere (0-12 km): where weather occurs. Temperature decreases with height. We live here." },
          { icon:"☀️", text:"Stratosphere (12-50 km): contains the OZONE LAYER. Temperature increases upward. Very dry." },
          { icon:"💫", text:"Mesosphere (50-80 km): meteorites burn up here. Coldest layer (−90°C at top)." },
          { icon:"🌡️", text:"Thermosphere (80-600 km): auroras occur here. Temperature rises steeply (up to 2000°C!)." },
          { icon:"🛸", text:"Exosphere: outermost layer merging into space. Satellites orbit in this region." },
        ]},
      { type:"facts", heading:"WEATHER AND CLIMATE",
        items:[
          { icon:"🌤️", text:"Weather: short-term atmospheric conditions at a place (daily). Climate: average weather over 30+ years." },
          { icon:"🌧️", text:"Types of rainfall: Convectional (equatorial), Orographic (mountains), Frontal (temperate)." },
          { icon:"🌀", text:"Tropical cyclone: intense low-pressure system over warm ocean. Winds exceed 120 km/h." },
          { icon:"⛅", text:"Monsoon: seasonal reversal of winds. India's SW monsoon arrives June-September bringing 75% of rainfall." },
        ]},
      { type:"facts", heading:"CLIMATE CHANGE FACTS",
        items:[
          { icon:"🌡️", text:"Earth has warmed ~1.1°C since pre-industrial times. Paris Agreement: limit to 1.5°C rise." },
          { icon:"🧊", text:"Arctic sea ice is melting: extent reduced by ~13% per decade since 1979 (NASA data)." },
          { icon:"🌊", text:"Sea level rise: glaciers melting + thermal expansion = ~3.7 mm rise per year globally." },
          { icon:"🌿", text:"Greenhouse gases: CO2, methane, nitrous oxide, water vapour trap heat in atmosphere." },
          { icon:"🇮🇳", text:"India pledged net-zero emissions by 2070 (COP26, Glasgow). 500 GW renewable energy target by 2030." },
        ]},
    ]
  },

  {
    id:"lc-g-005", subject:"Geography", color:"#ef4444",
    slides:[
      { type:"facts", heading:"INDIA'S AGRICULTURE",
        items:[
          { icon:"🌾", text:"India: 2nd largest agricultural producer in the world. 50%+ of workforce in agriculture." },
          { icon:"🌱", text:"Kharif crops (sown June, harvested Oct): rice, maize, cotton, sugarcane, groundnut, millet." },
          { icon:"❄️", text:"Rabi crops (sown Oct, harvested March): wheat, mustard, gram, peas, barley, linseed." },
          { icon:"🌈", text:"Zaid crops: grown between seasons (March-June). Watermelon, cucumber, musk melon, vegetables." },
        ]},
      { type:"facts", heading:"GREEN REVOLUTION",
        items:[
          { icon:"🌾", text:"Green Revolution (1960s-70s): introduction of high-yield variety (HYV) seeds. Led by MS Swaminathan." },
          { icon:"🚜", text:"Punjab and Haryana became India's 'grain bowls' — massive increase in wheat and rice production." },
          { icon:"📈", text:"India went from food-scarce (1960s) to self-sufficient in food grain (by 1980s) due to Green Revolution." },
          { icon:"⚠️", text:"Side effects: overuse of fertilisers/pesticides damaged soil and groundwater in Punjab." },
        ]},
      { type:"facts", heading:"IRRIGATION AND SOIL TYPES",
        items:[
          { icon:"💧", text:"Main irrigation types: canal (largest), wells and tubewells, tanks (especially Tamil Nadu, Andhra Pradesh)." },
          { icon:"🟤", text:"Alluvial soil: most fertile, found in Indo-Gangetic plains. Grows wheat, rice, sugarcane." },
          { icon:"⚫", text:"Black soil (Regur): Maharashtra and Deccan. Retains moisture, ideal for cotton. Called 'cotton soil'." },
          { icon:"🔴", text:"Red and Yellow soil: Odisha, Chhattisgarh, Tamil Nadu. Low fertility, needs fertiliser." },
          { icon:"🏔️", text:"Mountain soil: Himalayas, Northeast. Rich in humus, supports forests and tea plantations." },
        ]},
    ]
  },

  {
    id:"lc-g-006", subject:"Geography", color:"#ef4444",
    slides:[
      { type:"facts", heading:"INDIA'S MINERALS AND INDUSTRIES",
        items:[
          { icon:"⛏️", text:"Coal: India has 4th largest coal reserves. Major fields: Jharkhand (Jharia), West Bengal (Raniganj)." },
          { icon:"🔩", text:"Iron ore: Odisha and Chhattisgarh are largest producers. Bellary-Hospet (Karnataka) also major." },
          { icon:"🪙", text:"Mica: India is world's top producer. Used in electrical and electronics industry. Jharkhand leads." },
          { icon:"⛽", text:"Petroleum: Mumbai High (offshore), Gujarat, Rajasthan are main producing areas in India." },
        ]},
      { type:"facts", heading:"MAJOR INDUSTRIES",
        items:[
          { icon:"👕", text:"Cotton textile: oldest industry in India. Major centres: Mumbai (Manchester of India), Ahmedabad." },
          { icon:"🏭", text:"Iron and Steel: Jamshedpur (Tata Steel, 1907). Also Bhilai, Rourkela, Bokaro, Visakhapatnam." },
          { icon:"💻", text:"IT and Software: Bengaluru (Silicon Valley of India), Hyderabad, Pune, Chennai, Noida." },
          { icon:"💊", text:"Pharmaceutical: India is 'pharmacy of the world' — supplies 20% of global generic medicines." },
        ]},
      { type:"facts", heading:"TRANSPORT IN INDIA",
        items:[
          { icon:"🚂", text:"Indian Railways: one of world's largest networks. ~68,000 km track, 13,000+ trains daily." },
          { icon:"🛣️", text:"National Highways: ~1,40,000 km. NH 44 (Srinagar to Kanyakumari, ~3,745 km) is longest." },
          { icon:"✈️", text:"Largest airports: Indira Gandhi International (Delhi), Chhatrapati Shivaji (Mumbai)." },
          { icon:"🚢", text:"Major ports: Mumbai (largest), Kandla, Kolkata, Chennai, Kochi, JNPT (Jawaharlal Nehru Port, Navi Mumbai)." },
        ]},
    ]
  },

];
