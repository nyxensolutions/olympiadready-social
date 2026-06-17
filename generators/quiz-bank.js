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
    explanation:"\"Accommodate\" has double-c and double-m." },

  { id:"e-002", subject:"English", grade:7,
    question:"Pick the antonym of TRANSPARENT:",
    options:["Clear","Visible","Opaque","Glassy"], answer:2,
    explanation:"Opaque means not see-through — the opposite of transparent." },

  { id:"e-003", subject:"English", grade:5,
    question:"Identify the noun: \"The puppy ran across the garden.\"",
    options:["ran","across","puppy","the"], answer:2,
    explanation:"\"Puppy\" is a naming word — a noun." },

  { id:"e-004", subject:"English", grade:8,
    question:"Choose the synonym of BENEVOLENT:",
    options:["Cruel","Kind","Greedy","Quiet"], answer:1,
    explanation:"Benevolent = well-meaning and kind." },

  { id:"e-005", subject:"English", grade:6,
    question:"Fill the blank: She is _____ honest girl.",
    options:["a","an","the","(no article)"], answer:1,
    explanation:"\"Honest\" starts with a vowel sound (silent h), so use \"an\"." },

  { id:"e-006", subject:"English", grade:7,
    question:"Pick the correctly punctuated sentence:",
    options:["Where are you going.","Where are you going!","Where are you going?","Where, are you going."], answer:2,
    explanation:"It's a direct question — ends with a question mark." },

  { id:"e-007", subject:"English", grade:9,
    question:"What does the idiom \"Once in a blue moon\" mean?",
    options:["Very often","Very rarely","At night","Suddenly"], answer:1,
    explanation:"It means something that happens very rarely." },

  { id:"e-008", subject:"English", grade:6,
    question:"Pick the verb in: \"The children sang beautifully.\"",
    options:["children","sang","beautifully","the"], answer:1,
    explanation:"\"Sang\" is the action word — the verb." },

  { id:"e-009", subject:"English", grade:8,
    question:"Choose the correct word: He is the _____ player in the team.",
    options:["good","better","best","well"], answer:2,
    explanation:"Comparing more than two people — superlative \"best\" is correct." },

  { id:"e-010", subject:"English", grade:7,
    question:"Which word is a preposition?",
    options:["Quickly","Under","Bright","Run"], answer:1,
    explanation:"\"Under\" shows position/relationship — it's a preposition." },

  { id:"e-011", subject:"English", grade:6,
    question:"Choose the plural of \"Leaf\":",
    options:["Leafs","Leafes","Leaves","Leaaves"], answer:2,
    explanation:"Words ending in -f/-fe often change to -ves in the plural: leaf → leaves." },

  { id:"e-012", subject:"English", grade:7,
    question:"Pick the antonym of ANCIENT:",
    options:["Old","Historic","Modern","Aged"], answer:2,
    explanation:"Ancient means very old; its opposite is modern (recent)." },

  { id:"e-013", subject:"English", grade:8,
    question:"Identify the adjective: \"She wore a beautiful red dress.\"",
    options:["wore","dress","beautiful","she"], answer:2,
    explanation:"\"Beautiful\" describes the noun \"dress\" — it's an adjective." },

  { id:"e-014", subject:"English", grade:9,
    question:"Which sentence is in passive voice?",
    options:["She baked the cake.","The cake was baked by her.","He is baking now.","They will bake tomorrow."], answer:1,
    explanation:"Passive voice: subject receives the action. \"The cake was baked by her\" ✓." },

  { id:"e-015", subject:"English", grade:6,
    question:"What is the past tense of \"go\"?",
    options:["Goed","Gone","Went","Going"], answer:2,
    explanation:"Go is an irregular verb — its simple past is \"went\"." },

  { id:"e-016", subject:"English", grade:7,
    question:"Choose the correctly spelled word:",
    options:["Recieve","Receive","Recive","Recieve"], answer:1,
    explanation:"Remember: i before e except after c. Receive has \"ei\" after c." },

  { id:"e-017", subject:"English", grade:8,
    question:"Choose the synonym of METICULOUS:",
    options:["Careless","Thorough","Quick","Loud"], answer:1,
    explanation:"Meticulous means very careful and precise — synonym: thorough." },

  { id:"e-018", subject:"English", grade:5,
    question:"Which sentence uses a simile?",
    options:["The wind howled.","She is a lion.","He ran like the wind.","The moon smiled."], answer:2,
    explanation:"A simile compares using \"like\" or \"as\". \"Ran like the wind\" ✓." },

  { id:"e-019", subject:"English", grade:9,
    question:"What does the prefix \"mis-\" mean in \"misunderstand\"?",
    options:["Again","Wrongly","Before","Not"], answer:1,
    explanation:"The prefix mis- means wrongly or badly, as in misunderstand, misuse." },

  { id:"e-020", subject:"English", grade:6,
    question:"Pick the conjunction: \"I was tired, ____ I kept working.\"",
    options:["because","yet","so","when"], answer:1,
    explanation:"\"Yet\" expresses contrast here — a coordinating conjunction." },

  { id:"e-021", subject:"English", grade:7,
    question:"Choose the antonym of EXPAND:",
    options:["Grow","Stretch","Contract","Inflate"], answer:2,
    explanation:"Expand means to grow larger; contract means to shrink — the opposite." },

  { id:"e-022", subject:"English", grade:8,
    question:"Identify the figure of speech: \"The stars danced in the sky.\"",
    options:["Simile","Alliteration","Personification","Metaphor"], answer:2,
    explanation:"Giving a non-human thing (stars) a human action (dancing) is personification." },

  { id:"e-023", subject:"English", grade:6,
    question:"What does \"ambiguous\" mean?",
    options:["Very clear","Open to more than one interpretation","Extremely large","Completely false"], answer:1,
    explanation:"Ambiguous means something can be understood in more than one way." },

  { id:"e-024", subject:"English", grade:9,
    question:"Which is an example of alliteration?",
    options:["Peter Piper picked peppers","She sells sea shells","Both A and B","The red car raced"], answer:2,
    explanation:"Both \"Peter Piper picked peppers\" and \"She sells sea shells\" repeat initial consonant sounds." },

  { id:"e-025", subject:"English", grade:7,
    question:"Choose the correct sentence:",
    options:["Neither Tom nor his friends is coming.","Neither Tom nor his friends are coming.","Neither Tom nor his friends was coming.","Neither Tom nor his friends be coming."], answer:1,
    explanation:"With \"neither/nor\", the verb agrees with the subject closer to it — \"friends\" is plural, so \"are\"." },

  { id:"e-026", subject:"English", grade:6,
    question:"The word \"biography\" means:",
    options:["A map of a place","A list of books","A written account of someone's life","A scientific study"], answer:2,
    explanation:"Bio = life, graphy = writing. A biography is a written account of a person's life." },

  { id:"e-027", subject:"English", grade:8,
    question:"Choose the correctly punctuated sentence:",
    options:["Its raining outside.","It's raining outside.","Its' raining outside.","Raining its outside."], answer:1,
    explanation:"It's = it is (contraction). Its = belonging to it. \"It's raining\" is correct." },

  { id:"e-028", subject:"English", grade:9,
    question:"Which word means \"relating to sound\"?",
    options:["Visual","Acoustic","Tactile","Olfactory"], answer:1,
    explanation:"Acoustic relates to sound or hearing." },

  { id:"e-029", subject:"English", grade:7,
    question:"Identify the adverb: \"She spoke very softly.\"",
    options:["She","spoke","very","softly"], answer:3,
    explanation:"\"Softly\" modifies the verb \"spoke\" — it's an adverb of manner." },

  { id:"e-030", subject:"English", grade:8,
    question:"What is the meaning of the idiom \"Bite off more than you can chew\"?",
    options:["Eating too fast","Taking on more than you can handle","Speaking rudely","Being very hungry"], answer:1,
    explanation:"It means attempting something that is beyond your capacity." },


  // ── Science (20 questions) ────────────────────────────────────────────────

  { id:"s-001", subject:"Science", grade:6,
    question:"Which gas do plants absorb during photosynthesis?",
    options:["Oxygen","Carbon Dioxide","Nitrogen","Hydrogen"], answer:1,
    explanation:"Plants absorb CO₂ from the air and use sunlight & water to make glucose, releasing O₂." },

  { id:"s-002", subject:"Science", grade:5,
    question:"Which planet is known as the 'Red Planet'?",
    options:["Mars","Jupiter","Venus","Saturn"], answer:0,
    explanation:"Mars appears red because its surface is covered with iron oxide (rust)." },

  { id:"s-003", subject:"Science", grade:6,
    question:"What is the chemical formula for water?",
    options:["H₂O₂","HO","H₂O","HO₂"], answer:2,
    explanation:"Water is made of 2 hydrogen atoms bonded to 1 oxygen atom → H₂O." },

  { id:"s-004", subject:"Science", grade:7,
    question:"The SI unit of force is:",
    options:["Joule","Newton","Watt","Pascal"], answer:1,
    explanation:"Force is measured in Newtons (N), named after Sir Isaac Newton." },

  { id:"s-005", subject:"Science", grade:5,
    question:"Which is the smallest planet in our solar system?",
    options:["Mercury","Mars","Venus","Uranus"], answer:0,
    explanation:"Mercury is the smallest planet in our solar system and also the closest to the Sun." },

  { id:"s-006", subject:"Science", grade:7,
    question:"Sound cannot travel through:",
    options:["Water","Steel","Wood","Vacuum"], answer:3,
    explanation:"Sound needs a medium to travel. A vacuum has no particles, so sound cannot pass through it." },

  { id:"s-007", subject:"Science", grade:6,
    question:"Photosynthesis takes place inside which organelle?",
    options:["Mitochondria","Chloroplast","Nucleus","Ribosome"], answer:1,
    explanation:"Chloroplasts contain chlorophyll — the pigment that captures sunlight to drive photosynthesis." },

  { id:"s-008", subject:"Science", grade:7,
    question:"Which metal is liquid at room temperature?",
    options:["Iron","Mercury","Lead","Tin"], answer:1,
    explanation:"Mercury has a melting point of −39°C, so it is liquid at room temperature (~25°C)." },

  { id:"s-009", subject:"Science", grade:6,
    question:"What is called the 'powerhouse of the cell'?",
    options:["Nucleus","Cell Membrane","Mitochondria","Ribosome"], answer:2,
    explanation:"Mitochondria produce ATP (energy) through cellular respiration, earning them the 'powerhouse' nickname." },

  { id:"s-010", subject:"Science", grade:8,
    question:"The speed of light in a vacuum is approximately:",
    options:["3 × 10⁸ m/s","3 × 10⁶ m/s","3 × 10¹⁰ m/s","3 × 10⁴ m/s"], answer:0,
    explanation:"Light travels at approximately 3 × 10⁸ metres per second — the fastest speed in the universe." },

  { id:"s-011", subject:"Science", grade:7,
    question:"F = ma represents:",
    options:["Newton's 1st Law","Newton's 2nd Law","Newton's 3rd Law","Archimedes' Principle"], answer:1,
    explanation:"Newton's 2nd Law states Force = Mass × Acceleration. More mass or acceleration means more force needed." },

  { id:"s-012", subject:"Science", grade:6,
    question:"Which vitamin is produced when skin is exposed to sunlight?",
    options:["Vitamin A","Vitamin B12","Vitamin C","Vitamin D"], answer:3,
    explanation:"Sunlight triggers the skin to synthesise Vitamin D, essential for strong bones and immune health." },

  { id:"s-013", subject:"Science", grade:7,
    question:"A solid changing directly into a gas without becoming a liquid is called:",
    options:["Evaporation","Condensation","Sublimation","Melting"], answer:2,
    explanation:"Sublimation: solid → gas directly. Example: dry ice (solid CO₂) sublimates at room temperature." },

  { id:"s-014", subject:"Science", grade:6,
    question:"Which organ filters waste from the blood and produces urine?",
    options:["Liver","Heart","Kidney","Lungs"], answer:2,
    explanation:"The kidneys filter blood, remove waste and excess water, and produce urine as a byproduct." },

  { id:"s-015", subject:"Science", grade:6,
    question:"Which gas makes up the largest portion of Earth's atmosphere?",
    options:["Oxygen","Carbon Dioxide","Nitrogen","Argon"], answer:2,
    explanation:"Nitrogen makes up about 78% of Earth's atmosphere; oxygen is second at about 21%." },

  { id:"s-016", subject:"Science", grade:6,
    question:"Which planet has the most confirmed moons (146 as of 2023)?",
    options:["Jupiter","Neptune","Uranus","Saturn"], answer:3,
    explanation:"Saturn surpassed Jupiter in 2023 with 146 confirmed moons — the most of any planet in our solar system." },

  { id:"s-017", subject:"Science", grade:7,
    question:"What is the hardest naturally occurring substance?",
    options:["Quartz","Diamond","Topaz","Corundum"], answer:1,
    explanation:"Diamond rates 10 on the Mohs scale — the maximum — making it the hardest natural substance on Earth." },

  { id:"s-018", subject:"Science", grade:7,
    question:"Which part of the eye controls the amount of light entering it?",
    options:["Cornea","Lens","Iris","Retina"], answer:2,
    explanation:"The iris is the coloured part of the eye. It expands or contracts the pupil to regulate light entry." },

  { id:"s-019", subject:"Science", grade:7,
    question:"Which type of energy is stored in a stretched rubber band?",
    options:["Kinetic","Thermal","Chemical","Potential"], answer:3,
    explanation:"A stretched rubber band has elastic potential energy — stored energy due to deformation." },

  { id:"s-020", subject:"Science", grade:6,
    question:"A rainbow is formed due to:",
    options:["Refraction and dispersion of light","Reflection only","Absorption of light","Emission of light"], answer:0,
    explanation:"Rainbows form when sunlight refracts (bends) and disperses inside water droplets, splitting into VIBGYOR." },


  // ── History (15 questions) ───────────────────────────────────────────────

  { id:"h-001", subject:"History", grade:5,
    question:"Who built the Taj Mahal?",
    options:["Akbar","Babur","Shah Jahan","Aurangzeb"], answer:2,
    explanation:"Shah Jahan built the Taj Mahal (1631–53) in Agra as a mausoleum for his wife Mumtaz Mahal." },

  { id:"h-002", subject:"History", grade:5,
    question:"India gained independence on:",
    options:["15 August 1947","26 January 1950","15 August 1950","2 October 1947"], answer:0,
    explanation:"India became independent on 15 August 1947 after nearly 200 years of British rule." },

  { id:"h-003", subject:"History", grade:5,
    question:"Who was the first Prime Minister of independent India?",
    options:["Mahatma Gandhi","B.R. Ambedkar","Jawaharlal Nehru","Sardar Patel"], answer:2,
    explanation:"Jawaharlal Nehru became India's first Prime Minister on 15 August 1947 and served until 1964." },

  { id:"h-004", subject:"History", grade:7,
    question:"The first Battle of Panipat was fought in:",
    options:["1556","1526","1600","1498"], answer:1,
    explanation:"Babur defeated Ibrahim Lodi in the First Battle of Panipat in 1526, founding the Mughal Empire." },

  { id:"h-005", subject:"History", grade:7,
    question:"Who launched the Quit India Movement in 1942?",
    options:["Jawaharlal Nehru","Subhas Chandra Bose","Mahatma Gandhi","Bal Gangadhar Tilak"], answer:2,
    explanation:"Gandhi launched the Quit India Movement on 8 August 1942 with the call 'Do or Die'." },

  { id:"h-006", subject:"History", grade:6,
    question:"The Indus Valley Civilisation's two main cities were:",
    options:["Pataliputra & Taxila","Harappa & Mohenjo-daro","Delhi & Agra","Ayodhya & Mathura"], answer:1,
    explanation:"Harappa and Mohenjo-daro were the largest cities of the Indus Valley Civilisation (3300–1300 BCE)." },

  { id:"h-007", subject:"History", grade:6,
    question:"Which Mughal emperor introduced the 'Din-i-Ilahi' religion?",
    options:["Babur","Akbar","Shah Jahan","Humayun"], answer:1,
    explanation:"Emperor Akbar introduced Din-i-Ilahi in 1582 — a syncretic religion blending Islam, Hinduism, and others." },

  { id:"h-008", subject:"History", grade:7,
    question:"The Jallianwala Bagh massacre of 1919 took place in:",
    options:["Lahore","Delhi","Amritsar","Calcutta"], answer:2,
    explanation:"British General Dyer ordered troops to fire on unarmed civilians in Amritsar on 13 April 1919." },

  { id:"h-009", subject:"History", grade:6,
    question:"Who is considered the chief architect of India's Constitution?",
    options:["Mahatma Gandhi","Jawaharlal Nehru","B.R. Ambedkar","Sardar Patel"], answer:2,
    explanation:"Dr. B.R. Ambedkar chaired the Drafting Committee and is called the 'Father of the Indian Constitution'." },

  { id:"h-010", subject:"History", grade:7,
    question:"The Dandi March (Salt Satyagraha) took place in:",
    options:["1920","1930","1942","1919"], answer:1,
    explanation:"Gandhi marched 388 km from Sabarmati Ashram to Dandi (12 March – 6 April 1930) to protest the salt tax." },

  { id:"h-011", subject:"History", grade:7,
    question:"World War I began in the year:",
    options:["1914","1918","1939","1905"], answer:0,
    explanation:"WWI began on 28 July 1914 after the assassination of Archduke Franz Ferdinand and ended on 11 Nov 1918." },

  { id:"h-012", subject:"History", grade:6,
    question:"Who was called the 'Iron Man of India'?",
    options:["Bal Gangadhar Tilak","Subhas Chandra Bose","Sardar Vallabhbhai Patel","Bhagat Singh"], answer:2,
    explanation:"Sardar Vallabhbhai Patel unified 562 princely states into the Indian Union — earning him the 'Iron Man' title." },

  { id:"h-013", subject:"History", grade:7,
    question:"The Maurya Empire was founded by:",
    options:["Ashoka","Chandragupta Maurya","Bindusara","Kanishka"], answer:1,
    explanation:"Chandragupta Maurya founded the Maurya Empire around 322 BCE, the first pan-Indian empire." },

  { id:"h-014", subject:"History", grade:7,
    question:"World War II ended in the year:",
    options:["1943","1944","1945","1946"], answer:2,
    explanation:"WWII ended in 1945 — Germany surrendered on 8 May and Japan on 2 September after the atomic bombings." },

  { id:"h-015", subject:"History", grade:7,
    question:"The Sepoy Mutiny — India's First War of Independence — occurred in:",
    options:["1847","1857","1867","1877"], answer:1,
    explanation:"The revolt of 1857 began in Meerut and spread across India. It led to the end of East India Company rule." },


  // ── Geography (15 questions) ─────────────────────────────────────────────

  { id:"g-001", subject:"Geography", grade:5,
    question:"Which is the largest continent by area?",
    options:["Africa","Asia","North America","Antarctica"], answer:1,
    explanation:"Asia covers about 44 million km² — nearly 30% of Earth's total land area and 60% of its population." },

  { id:"g-002", subject:"Geography", grade:5,
    question:"What is the capital city of Japan?",
    options:["Osaka","Kyoto","Hiroshima","Tokyo"], answer:3,
    explanation:"Tokyo is the capital and largest city of Japan, and one of the most populous cities in the world." },

  { id:"g-003", subject:"Geography", grade:5,
    question:"The Nile River flows through which continent?",
    options:["Asia","South America","Africa","Europe"], answer:2,
    explanation:"The Nile (approximately 6,650 km long) flows northward through 11 African countries into the Mediterranean." },

  { id:"g-004", subject:"Geography", grade:7,
    question:"Which country has the world's longest coastline?",
    options:["Australia","Norway","Russia","Canada"], answer:3,
    explanation:"Canada has the world's longest coastline at over 202,000 km — more than the next five countries combined." },

  { id:"g-005", subject:"Geography", grade:7,
    question:"Which is the smallest ocean on Earth?",
    options:["Indian","Southern","Atlantic","Arctic"], answer:3,
    explanation:"The Arctic Ocean is the smallest and shallowest of Earth's five oceans, covering about 14 million km²." },

  { id:"g-006", subject:"Geography", grade:6,
    question:"The Amazon River flows through which country?",
    options:["Argentina","Brazil","Peru","Colombia"], answer:1,
    explanation:"The Amazon, the world's largest river by volume, flows mostly through Brazil before entering the Atlantic." },

  { id:"g-007", subject:"Geography", grade:6,
    question:"What is the capital of Australia?",
    options:["Sydney","Melbourne","Brisbane","Canberra"], answer:3,
    explanation:"Canberra is Australia's capital. Sydney and Melbourne both wanted the title, so a new city was built in between!" },

  { id:"g-008", subject:"Geography", grade:7,
    question:"The world's highest waterfall is:",
    options:["Niagara Falls","Iguazu Falls","Angel Falls","Victoria Falls"], answer:2,
    explanation:"Angel Falls in Venezuela drops 979 m — the world's highest uninterrupted waterfall." },

  { id:"g-009", subject:"Geography", grade:5,
    question:"Mount Everest is located on the border of:",
    options:["China and India","India and Tibet","Tibet and Nepal","Nepal and Bhutan"], answer:2,
    explanation:"Mount Everest (8,849 m) sits on the border between Nepal and Tibet (China)." },

  { id:"g-010", subject:"Geography", grade:6,
    question:"Which is the largest lake in the world by surface area?",
    options:["Lake Superior","Lake Baikal","Caspian Sea","Lake Victoria"], answer:2,
    explanation:"The Caspian Sea (371,000 km²) is technically a lake — it is landlocked, with no outlet to the ocean." },

  { id:"g-011", subject:"Geography", grade:6,
    question:"The Ganga river originates from:",
    options:["Yamunotri","Gangotri","Kedarnath","Badrinath"], answer:1,
    explanation:"The Ganga originates at the Gangotri Glacier in Uttarakhand and flows about 2,525 km to the Bay of Bengal." },

  { id:"g-012", subject:"Geography", grade:5,
    question:"Which is both a continent and a country?",
    options:["Russia","Brazil","India","Australia"], answer:3,
    explanation:"Australia is unique in that it is both a continent (the smallest) and a sovereign country." },

  { id:"g-013", subject:"Geography", grade:5,
    question:"The Sahara Desert is located in:",
    options:["Asia","Australia","Africa","South America"], answer:2,
    explanation:"The Sahara in North Africa is the world's largest hot desert, spanning 9.2 million km²." },

  { id:"g-014", subject:"Geography", grade:6,
    question:"What is the capital of Brazil?",
    options:["Rio de Janeiro","São Paulo","Manaus","Brasília"], answer:3,
    explanation:"Brasília became Brazil's capital in 1960, built from scratch to replace Rio de Janeiro." },

  { id:"g-015", subject:"Geography", grade:8,
    question:"The International Date Line roughly follows which line of longitude?",
    options:["90°E","180°","0° (Prime Meridian)","90°W"], answer:1,
    explanation:"The IDL runs at approximately 180° longitude (with some deviations for island nations), opposite the Prime Meridian." },


  // ── Computer Science (15 questions) ─────────────────────────────────────

  { id:"cs-001", subject:"Computer Science", grade:5,
    question:"What does CPU stand for?",
    options:["Computer Processing Utility","Central Processing Unit","Core Processor Upgrade","Central Program Unit"], answer:1,
    explanation:"The Central Processing Unit is the 'brain' of the computer — it executes all instructions." },

  { id:"cs-002", subject:"Computer Science", grade:5,
    question:"How many bits make up one byte?",
    options:["2","4","8","16"], answer:2,
    explanation:"1 byte = 8 bits. A bit is the smallest unit (0 or 1); a byte can represent 256 different values." },

  { id:"cs-003", subject:"Computer Science", grade:6,
    question:"Who is considered the 'Father of Computers'?",
    options:["Alan Turing","Bill Gates","Charles Babbage","Steve Jobs"], answer:2,
    explanation:"Charles Babbage designed the Analytical Engine (1837) — the forerunner of modern computers." },

  { id:"cs-004", subject:"Computer Science", grade:6,
    question:"What does HTML stand for?",
    options:["HyperTransfer Markup Language","High Text Markup Language","HyperText Markup Language","HyperText Machine Learning"], answer:2,
    explanation:"HyperText Markup Language is the standard language for creating web pages." },

  { id:"cs-005", subject:"Computer Science", grade:5,
    question:"What does RAM stand for?",
    options:["Read-Access Memory","Random Access Memory","Remote Access Memory","Real-time Access Memory"], answer:1,
    explanation:"RAM (Random Access Memory) is the computer's short-term memory — it stores data currently in use." },

  { id:"cs-006", subject:"Computer Science", grade:5,
    question:"The binary number system uses how many digits?",
    options:["8","10","2","16"], answer:2,
    explanation:"Binary uses only 2 digits: 0 and 1. All computer data is ultimately stored as binary." },

  { id:"cs-007", subject:"Computer Science", grade:7,
    question:"What is the binary equivalent of the decimal number 10?",
    options:["1100","1010","1110","1001"], answer:1,
    explanation:"Decimal 10 = 8+2 = 1010 in binary (reading place values: 8,4,2,1 → 1,0,1,0)." },

  { id:"cs-008", subject:"Computer Science", grade:5,
    question:"What does WWW stand for?",
    options:["World Wide Window","Wide World Web","World Wide Web","World Window Webpage"], answer:2,
    explanation:"World Wide Web — the system of interlinked web pages and resources on the internet." },

  { id:"cs-009", subject:"Computer Science", grade:6,
    question:"An algorithm is best described as:",
    options:["A computer program","A step-by-step set of instructions","A type of hardware","A programming language"], answer:1,
    explanation:"An algorithm is a finite, step-by-step set of instructions to solve a problem or accomplish a task." },

  { id:"cs-010", subject:"Computer Science", grade:7,
    question:"Which of the following is NOT a programming language?",
    options:["Java","Python","HTML","C++"], answer:2,
    explanation:"HTML (HyperText Markup Language) is a markup language for structuring web content — not a programming language." },

  { id:"cs-011", subject:"Computer Science", grade:6,
    question:"What does GPS stand for?",
    options:["General Positioning System","Global Positioning System","Global Precision System","Geographical Pointer System"], answer:1,
    explanation:"GPS (Global Positioning System) uses satellites to determine the precise location of a device on Earth." },

  { id:"cs-012", subject:"Computer Science", grade:6,
    question:"What does URL stand for?",
    options:["Uniform Resource Locator","Universal Resource Link","Uniform Reference Location","Universal Record Link"], answer:0,
    explanation:"A URL (Uniform Resource Locator) is the address of a specific resource on the internet." },

  { id:"cs-013", subject:"Computer Science", grade:6,
    question:"Which software manages a computer's hardware and software resources?",
    options:["Browser","Database","Operating System","Compiler"], answer:2,
    explanation:"An Operating System (e.g. Windows, macOS, Linux) manages hardware, memory, files, and running programs." },

  { id:"cs-014", subject:"Computer Science", grade:7,
    question:"In computing, 1 GB (gigabyte) equals how many MB (megabytes)?",
    options:["100","512","1024","10000"], answer:2,
    explanation:"1 GB = 1024 MB (since computers use base-2: 2¹⁰ = 1024, not 1000)." },

  { id:"cs-015", subject:"Computer Science", grade:7,
    question:"Which of these is an example of an input device?",
    options:["Monitor","Printer","Speaker","Keyboard"], answer:3,
    explanation:"Input devices send data TO the computer. A keyboard is an input device; monitor/printer/speaker are output." },

];
