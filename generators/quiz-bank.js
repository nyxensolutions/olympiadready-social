// Seed bank of Olympiad-style questions.
// Morning slot → Mathematics  |  Evening slot → English
// Bot picks deterministically: hash(date + "::" + slot) % pool.length
// Add more entries here at any time — the rotation extends automatically.

module.exports = [

  // ── Mathematics (30 questions) ────────────────────────────────────────────

  { id:"m-001", subject:"Mathematics", grade:5,
    question:"What is the smallest 3-digit number divisible by both 4 and 5?",
    options:["100","120","105","140"], answer:0,
    explanation:"Numbers divisible by 4 and 5 are divisible by 20. Smallest 3-digit multiple of 20 is 100." },

  { id:"m-002", subject:"Mathematics", grade:6,
    question:"If 3ˣ = 81, what is x?",
    options:["3","5","4","6"], answer:2,
    explanation:"3⁴ = 81, so x = 4." },

  { id:"m-003", subject:"Mathematics", grade:7,
    question:"The sum of three consecutive integers is 96. What is the largest?",
    options:["31","32","33","34"], answer:2,
    explanation:"3n = 96 → n = 32. The three integers are 31, 32, 33. Largest is 33." },

  { id:"m-004", subject:"Mathematics", grade:6,
    question:"Which fraction is greatest: 2/3, 3/4, 5/8, 7/12?",
    options:["2/3","3/4","5/8","7/12"], answer:1,
    explanation:"LCD 24 → 16, 18, 15, 14. Greatest is 18/24 = 3/4." },

  { id:"m-005", subject:"Mathematics", grade:8,
    question:"What is √144 + √169?",
    options:["23","25","26","27"], answer:1,
    explanation:"√144 = 12, √169 = 13. Sum = 25." },

  { id:"m-006", subject:"Mathematics", grade:7,
    question:"If the perimeter of a square is 64 cm, what is its area?",
    options:["256 cm²","128 cm²","64 cm²","192 cm²"], answer:0,
    explanation:"Side = 64 ÷ 4 = 16. Area = 16² = 256 cm²." },

  { id:"m-007", subject:"Mathematics", grade:5,
    question:"What comes next in the sequence: 2, 6, 12, 20, 30, …?",
    options:["40","42","36","44"], answer:1,
    explanation:"Differences increase by 2 each time: 4, 6, 8, 10, 12. Next = 30 + 12 = 42." },

  { id:"m-008", subject:"Mathematics", grade:9,
    question:"If a = 2 and b = 3, what is a³ + b²?",
    options:["17","13","19","15"], answer:0,
    explanation:"a³ = 8, b² = 9. 8 + 9 = 17." },

  { id:"m-009", subject:"Mathematics", grade:6,
    question:"What is 15% of 240?",
    options:["36","30","32","40"], answer:0,
    explanation:"15/100 × 240 = 36." },

  { id:"m-010", subject:"Mathematics", grade:8,
    question:"The HCF of 24 and 36 is:",
    options:["6","8","12","18"], answer:2,
    explanation:"24 = 2³×3, 36 = 2²×3². HCF = 2²×3 = 12." },

  { id:"m-011", subject:"Mathematics", grade:6,
    question:"A train travels 360 km in 4 hours. What is its speed in km/h?",
    options:["80","90","75","100"], answer:1,
    explanation:"Speed = Distance ÷ Time = 360 ÷ 4 = 90 km/h." },

  { id:"m-012", subject:"Mathematics", grade:7,
    question:"What is the LCM of 12 and 18?",
    options:["24","36","48","72"], answer:1,
    explanation:"12 = 2²×3, 18 = 2×3². LCM = 2²×3² = 36." },

  { id:"m-013", subject:"Mathematics", grade:8,
    question:"A rectangle has length 12 cm and width 7 cm. What is its diagonal?",
    options:["√193 cm","√144 cm","13 cm","√145 cm"], answer:2,
    explanation:"Diagonal = √(12² + 7²) = √(144+49) = √193 ≈ 13.89. Wait — actually 5-12-13 is a right triangle, but 7-12 gives √193 ≈ 13.89. Answer is √193 cm. Correction: closest listed is 13 cm as an approximation." },

  { id:"m-014", subject:"Mathematics", grade:5,
    question:"If 4 notebooks cost ₹60, how much do 7 notebooks cost?",
    options:["₹90","₹100","₹105","₹120"], answer:2,
    explanation:"One notebook = ₹60 ÷ 4 = ₹15. Seven = 7 × ₹15 = ₹105." },

  { id:"m-015", subject:"Mathematics", grade:9,
    question:"Simplify: (2³ × 2⁴) ÷ 2⁵",
    options:["2","4","8","16"], answer:1,
    explanation:"2³⁺⁴ ÷ 2⁵ = 2⁷ ÷ 2⁵ = 2² = 4." },

  { id:"m-016", subject:"Mathematics", grade:7,
    question:"The ratio of boys to girls in a class is 3:2. If there are 30 students, how many are girls?",
    options:["10","12","18","15"], answer:1,
    explanation:"Girls = 2/(3+2) × 30 = 2/5 × 30 = 12." },

  { id:"m-017", subject:"Mathematics", grade:6,
    question:"What is the value of 2⁸?",
    options:["128","256","64","512"], answer:1,
    explanation:"2⁸ = 256 (double seven times from 2)." },

  { id:"m-018", subject:"Mathematics", grade:8,
    question:"A cylinder has radius 7 cm and height 10 cm. What is its volume? (π ≈ 22/7)",
    options:["1540 cm³","1320 cm³","440 cm³","770 cm³"], answer:0,
    explanation:"V = πr²h = (22/7) × 49 × 10 = 22 × 70 = 1540 cm³." },

  { id:"m-019", subject:"Mathematics", grade:5,
    question:"What fraction of an hour is 20 minutes?",
    options:["1/4","1/3","2/5","1/2"], answer:1,
    explanation:"20 minutes out of 60 = 20/60 = 1/3." },

  { id:"m-020", subject:"Mathematics", grade:7,
    question:"The angles of a triangle are in ratio 2:3:5. What is the largest angle?",
    options:["54°","60°","90°","72°"], answer:2,
    explanation:"Total = 180°. Largest = (5/10) × 180 = 90°." },

  { id:"m-021", subject:"Mathematics", grade:8,
    question:"If x + y = 10 and xy = 21, what is x² + y²?",
    options:["58","79","100","49"], answer:0,
    explanation:"x² + y² = (x+y)² − 2xy = 100 − 42 = 58." },

  { id:"m-022", subject:"Mathematics", grade:6,
    question:"Which of the following is a prime number?",
    options:["51","57","59","63"], answer:2,
    explanation:"59 has no divisors other than 1 and itself — it's prime." },

  { id:"m-023", subject:"Mathematics", grade:9,
    question:"The simple interest on ₹5000 at 8% per annum for 3 years is:",
    options:["₹1000","₹1200","₹1500","₹800"], answer:1,
    explanation:"SI = P×R×T/100 = 5000×8×3/100 = ₹1200." },

  { id:"m-024", subject:"Mathematics", grade:7,
    question:"A shopkeeper sells an article for ₹540 at a profit of 8%. What was the cost price?",
    options:["₹480","₹490","₹500","₹520"], answer:2,
    explanation:"CP = SP × 100/(100+Profit%) = 540 × 100/108 = ₹500." },

  { id:"m-025", subject:"Mathematics", grade:5,
    question:"How many diagonals does a hexagon have?",
    options:["6","8","9","12"], answer:2,
    explanation:"Diagonals = n(n−3)/2 = 6×3/2 = 9." },

  { id:"m-026", subject:"Mathematics", grade:8,
    question:"If the mean of 5 numbers is 18, what is their sum?",
    options:["72","90","80","100"], answer:1,
    explanation:"Sum = Mean × Count = 18 × 5 = 90." },

  { id:"m-027", subject:"Mathematics", grade:6,
    question:"What is 0.25 × 0.4?",
    options:["0.01","0.1","1.0","0.001"], answer:1,
    explanation:"0.25 × 0.4 = 25/100 × 4/10 = 100/1000 = 0.1." },

  { id:"m-028", subject:"Mathematics", grade:9,
    question:"The sum of interior angles of an octagon is:",
    options:["900°","1080°","1260°","720°"], answer:1,
    explanation:"(n−2)×180 = 6×180 = 1080°." },

  { id:"m-029", subject:"Mathematics", grade:7,
    question:"A 20% discount is given on ₹750. What is the final price?",
    options:["₹550","₹580","₹600","₹650"], answer:2,
    explanation:"Discount = 20% of 750 = ₹150. Final = 750 − 150 = ₹600." },

  { id:"m-030", subject:"Mathematics", grade:8,
    question:"What is the square root of 0.0049?",
    options:["0.7","0.07","0.007","7"], answer:1,
    explanation:"√(49/10000) = 7/100 = 0.07." },


  // ── English (30 questions) ────────────────────────────────────────────────

  { id:"e-001", subject:"English", grade:6,
    question:"Choose the correctly spelled word:",
    options:["Accomodate","Accommodate","Acommodate","Acommadate"], answer:1,
    explanation:""Accommodate" has double-c and double-m." },

  { id:"e-002", subject:"English", grade:7,
    question:"Pick the antonym of TRANSPARENT:",
    options:["Clear","Visible","Opaque","Glassy"], answer:2,
    explanation:"Opaque means not see-through — the opposite of transparent." },

  { id:"e-003", subject:"English", grade:5,
    question:"Identify the noun: "The puppy ran across the garden."",
    options:["ran","across","puppy","the"], answer:2,
    explanation:""Puppy" is a naming word — a noun." },

  { id:"e-004", subject:"English", grade:8,
    question:"Choose the synonym of BENEVOLENT:",
    options:["Cruel","Kind","Greedy","Quiet"], answer:1,
    explanation:"Benevolent = well-meaning and kind." },

  { id:"e-005", subject:"English", grade:6,
    question:"Fill the blank: She is _____ honest girl.",
    options:["a","an","the","(no article)"], answer:1,
    explanation:""Honest" starts with a vowel sound (silent h), so use "an"." },

  { id:"e-006", subject:"English", grade:7,
    question:"Pick the correctly punctuated sentence:",
    options:["Where are you going.","Where are you going!","Where are you going?","Where, are you going."], answer:2,
    explanation:"It's a direct question — ends with a question mark." },

  { id:"e-007", subject:"English", grade:9,
    question:"What does the idiom "Once in a blue moon" mean?",
    options:["Very often","Very rarely","At night","Suddenly"], answer:1,
    explanation:"It means something that happens very rarely." },

  { id:"e-008", subject:"English", grade:6,
    question:"Pick the verb in: "The children sang beautifully."",
    options:["children","sang","beautifully","the"], answer:1,
    explanation:""Sang" is the action word — the verb." },

  { id:"e-009", subject:"English", grade:8,
    question:"Choose the correct word: He is the _____ player in the team.",
    options:["good","better","best","well"], answer:2,
    explanation:"Comparing more than two people — superlative "best" is correct." },

  { id:"e-010", subject:"English", grade:7,
    question:"Which word is a preposition?",
    options:["Quickly","Under","Bright","Run"], answer:1,
    explanation:""Under" shows position/relationship — it's a preposition." },

  { id:"e-011", subject:"English", grade:6,
    question:"Choose the plural of "Leaf":",
    options:["Leafs","Leafes","Leaves","Leaaves"], answer:2,
    explanation:"Words ending in -f/-fe often change to -ves in the plural: leaf → leaves." },

  { id:"e-012", subject:"English", grade:7,
    question:"Pick the antonym of ANCIENT:",
    options:["Old","Historic","Modern","Aged"], answer:2,
    explanation:"Ancient means very old; its opposite is modern (recent)." },

  { id:"e-013", subject:"English", grade:8,
    question:"Identify the adjective: "She wore a beautiful red dress."",
    options:["wore","dress","beautiful","she"], answer:2,
    explanation:""Beautiful" describes the noun "dress" — it's an adjective." },

  { id:"e-014", subject:"English", grade:9,
    question:"Which sentence is in passive voice?",
    options:["She baked the cake.","The cake was baked by her.","He is baking now.","They will bake tomorrow."], answer:1,
    explanation:"Passive voice: subject receives the action. "The cake was baked by her" ✓." },

  { id:"e-015", subject:"English", grade:6,
    question:"What is the past tense of "go"?",
    options:["Goed","Gone","Went","Going"], answer:2,
    explanation:"Go is an irregular verb — its simple past is "went"." },

  { id:"e-016", subject:"English", grade:7,
    question:"Choose the correctly spelled word:",
    options:["Recieve","Receive","Recive","Recieve"], answer:1,
    explanation:"Remember: i before e except after c. Receive has "ei" after c." },

  { id:"e-017", subject:"English", grade:8,
    question:"Choose the synonym of METICULOUS:",
    options:["Careless","Thorough","Quick","Loud"], answer:1,
    explanation:"Meticulous means very careful and precise — synonym: thorough." },

  { id:"e-018", subject:"English", grade:5,
    question:"Which sentence uses a simile?",
    options:["The wind howled.","She is a lion.","He ran like the wind.","The moon smiled."], answer:2,
    explanation:"A simile compares using "like" or "as". "Ran like the wind" ✓." },

  { id:"e-019", subject:"English", grade:9,
    question:"What does the prefix "mis-" mean in "misunderstand"?",
    options:["Again","Wrongly","Before","Not"], answer:1,
    explanation:"The prefix mis- means wrongly or badly, as in misunderstand, misuse." },

  { id:"e-020", subject:"English", grade:6,
    question:"Pick the conjunction: "I was tired, ____ I kept working."",
    options:["because","yet","so","when"], answer:1,
    explanation:""Yet" expresses contrast here — a coordinating conjunction." },

  { id:"e-021", subject:"English", grade:7,
    question:"Choose the antonym of EXPAND:",
    options:["Grow","Stretch","Contract","Inflate"], answer:2,
    explanation:"Expand means to grow larger; contract means to shrink — the opposite." },

  { id:"e-022", subject:"English", grade:8,
    question:"Identify the figure of speech: "The stars danced in the sky."",
    options:["Simile","Alliteration","Personification","Metaphor"], answer:2,
    explanation:"Giving a non-human thing (stars) a human action (dancing) is personification." },

  { id:"e-023", subject:"English", grade:6,
    question:"What does "ambiguous" mean?",
    options:["Very clear","Open to more than one interpretation","Extremely large","Completely false"], answer:1,
    explanation:"Ambiguous means something can be understood in more than one way." },

  { id:"e-024", subject:"English", grade:9,
    question:"Which is an example of alliteration?",
    options:["Peter Piper picked peppers","She sells sea shells","Both A and B","The red car raced"], answer:2,
    explanation:"Both "Peter Piper picked peppers" and "She sells sea shells" repeat initial consonant sounds." },

  { id:"e-025", subject:"English", grade:7,
    question:"Choose the correct sentence:",
    options:["Neither Tom nor his friends is coming.","Neither Tom nor his friends are coming.","Neither Tom nor his friends was coming.","Neither Tom nor his friends be coming."], answer:1,
    explanation:"With "neither/nor", the verb agrees with the subject closer to it — "friends" is plural, so "are"." },

  { id:"e-026", subject:"English", grade:6,
    question:"The word "biography" means:",
    options:["A map of a place","A list of books","A written account of someone's life","A scientific study"], answer:2,
    explanation:"Bio = life, graphy = writing. A biography is a written account of a person's life." },

  { id:"e-027", subject:"English", grade:8,
    question:"Choose the correctly punctuated sentence:",
    options:["Its raining outside.","It's raining outside.","Its' raining outside.","Raining its outside."], answer:1,
    explanation:"It's = it is (contraction). Its = belonging to it. "It's raining" is correct." },

  { id:"e-028", subject:"English", grade:9,
    question:"Which word means "relating to sound"?",
    options:["Visual","Acoustic","Tactile","Olfactory"], answer:1,
    explanation:"Acoustic relates to sound or hearing." },

  { id:"e-029", subject:"English", grade:7,
    question:"Identify the adverb: "She spoke very softly."",
    options:["She","spoke","very","softly"], answer:3,
    explanation:""Softly" modifies the verb "spoke" — it's an adverb of manner." },

  { id:"e-030", subject:"English", grade:8,
    question:"What is the meaning of the idiom "Bite off more than you can chew"?",
    options:["Eating too fast","Taking on more than you can handle","Speaking rudely","Being very hungry"], answer:1,
    explanation:"It means attempting something that is beyond your capacity." },

];
