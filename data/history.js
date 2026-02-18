// data/history.js
// Major events of world history

var CHAPTER_DATA = CHAPTER_DATA || {};

CHAPTER_DATA["history"] = {
  subcategories: ["Ancient World", "Medieval Period", "Early Modern", "Modern Era", "20th Century"],

  cards: [
    // --- Ancient World ---
    {
      id: "hi-001",
      type: "term",
      subcategory: "Ancient World",
      front: "When and where did the earliest known writing system develop?",
      back: "Around 3400\u20133200 BCE in Sumer (Mesopotamia, modern-day Iraq)",
      notes: "Called cuneiform. Pressed into clay tablets with a reed stylus.",
      difficulty: 2
    },
    {
      id: "hi-002",
      type: "term",
      subcategory: "Ancient World",
      front: "When was the Great Pyramid of Giza built?",
      back: "Around 2560 BCE, during the reign of Pharaoh Khufu",
      notes: "Remained the tallest man-made structure for over 3,800 years.",
      difficulty: 1
    },
    {
      id: "hi-003",
      type: "term",
      subcategory: "Ancient World",
      front: "What was the Roman Republic and when did it end?",
      back: "A government system in Rome (509\u201327 BCE) where elected officials ruled. Ended when Augustus became the first emperor.",
      difficulty: 2
    },
    {
      id: "hi-004",
      type: "multiple-choice",
      subcategory: "Ancient World",
      front: "In what year did the Western Roman Empire fall?",
      options: ["330 CE", "410 CE", "476 CE", "527 CE"],
      correctIndex: 2,
      back: "476 CE, when Germanic chieftain Odoacer deposed Emperor Romulus Augustulus.",
      difficulty: 2
    },
    {
      id: "hi-005",
      type: "term",
      subcategory: "Ancient World",
      front: "What was the Silk Road?",
      back: "A network of trade routes connecting China to the Mediterranean (c. 130 BCE\u20131453 CE)",
      notes: "Facilitated trade in silk, spices, metals, and ideas. Spread religions, technology, and diseases.",
      difficulty: 1
    },

    // --- Medieval Period ---
    {
      id: "hi-006",
      type: "term",
      subcategory: "Medieval Period",
      front: "What was the Black Death and when did it occur?",
      back: "A plague pandemic (bubonic plague) that peaked in Europe from 1347\u20131353",
      notes: "Killed an estimated 30\u201360% of Europe's population. Caused by Yersinia pestis bacteria, spread by fleas on rats.",
      difficulty: 1
    },
    {
      id: "hi-007",
      type: "term",
      subcategory: "Medieval Period",
      front: "What were the Crusades?",
      back: "A series of religious wars (1096\u20131291) sanctioned by the Latin Church to recapture the Holy Land",
      notes: "There were at least 9 major Crusades. Had lasting impact on Christian-Muslim relations.",
      difficulty: 2
    },
    {
      id: "hi-008",
      type: "term",
      subcategory: "Medieval Period",
      front: "What was the Magna Carta and when was it signed?",
      back: "A charter of rights signed in 1215 by King John of England",
      notes: "Limited the power of the monarchy and established that no one is above the law. Foundation of constitutional governance.",
      difficulty: 2
    },
    {
      id: "hi-009",
      type: "term",
      subcategory: "Medieval Period",
      front: "When did the Ottoman Empire capture Constantinople?",
      back: "1453, under Sultan Mehmed II",
      notes: "Marked the end of the Byzantine (Eastern Roman) Empire. The city was renamed Istanbul.",
      difficulty: 2
    },

    // --- Early Modern ---
    {
      id: "hi-010",
      type: "term",
      subcategory: "Early Modern",
      front: "When did Columbus reach the Americas?",
      back: "1492, landing in the Bahamas",
      notes: "Funded by Queen Isabella I of Spain. Led to widespread European colonization of the Americas.",
      difficulty: 1
    },
    {
      id: "hi-011",
      type: "term",
      subcategory: "Early Modern",
      front: "What was the Protestant Reformation and who started it?",
      back: "A religious reform movement starting in 1517 when Martin Luther posted his 95 Theses in Wittenberg",
      notes: "Challenged Catholic Church practices like the sale of indulgences. Led to the creation of Protestant churches.",
      difficulty: 2
    },
    {
      id: "hi-012",
      type: "term",
      subcategory: "Early Modern",
      front: "When did the French Revolution begin?",
      back: "1789, with the storming of the Bastille on July 14",
      notes: "Led to the end of the French monarchy, the Reign of Terror, and eventually Napoleon's rise.",
      difficulty: 1
    },
    {
      id: "hi-013",
      type: "term",
      subcategory: "Early Modern",
      front: "When was the American Declaration of Independence signed?",
      back: "July 4, 1776",
      notes: "Written primarily by Thomas Jefferson. Declared independence from Great Britain.",
      difficulty: 1
    },

    // --- Modern Era ---
    {
      id: "hi-014",
      type: "term",
      subcategory: "Modern Era",
      front: "What was the Industrial Revolution?",
      back: "The transition to machine manufacturing and factory systems, starting c. 1760 in Britain",
      notes: "Transformed economies from agrarian to industrial. Key innovations: steam engine, spinning jenny, railways.",
      difficulty: 1
    },
    {
      id: "hi-015",
      type: "term",
      subcategory: "Modern Era",
      front: "When did World War I take place?",
      back: "1914\u20131918",
      notes: "Triggered by the assassination of Archduke Franz Ferdinand. Called 'The Great War'. ~20 million dead.",
      difficulty: 1
    },
    {
      id: "hi-016",
      type: "term",
      subcategory: "Modern Era",
      front: "When did World War II take place?",
      back: "1939\u20131945",
      notes: "Began with Germany's invasion of Poland. Ended with the atomic bombings of Hiroshima and Nagasaki. ~70\u201385 million dead.",
      difficulty: 1
    },
    {
      id: "hi-017",
      type: "multiple-choice",
      subcategory: "Modern Era",
      front: "In what year did the Berlin Wall fall?",
      options: ["1987", "1989", "1991", "1993"],
      correctIndex: 1,
      back: "November 9, 1989. Led to German reunification in 1990.",
      difficulty: 1
    },

    // --- 20th Century ---
    {
      id: "hi-018",
      type: "term",
      subcategory: "20th Century",
      front: "What was the Cold War?",
      back: "A geopolitical rivalry between the US and Soviet Union (c. 1947\u20131991)",
      notes: "Characterized by nuclear arms race, proxy wars, space race, and ideological competition. Ended with the dissolution of the USSR.",
      difficulty: 1
    },
    {
      id: "hi-019",
      type: "term",
      subcategory: "20th Century",
      front: "When did humans first land on the Moon?",
      back: "July 20, 1969 \u2014 Apollo 11 mission",
      notes: "Neil Armstrong and Buzz Aldrin walked on the Moon. Michael Collins orbited above.",
      difficulty: 1
    },
    {
      id: "hi-020",
      type: "term",
      subcategory: "20th Century",
      front: "What was the Partition of India?",
      back: "The 1947 division of British India into India and Pakistan upon independence",
      notes: "Caused one of the largest mass migrations in history (~15 million people displaced) and widespread communal violence.",
      difficulty: 2
    },
    {
      id: "hi-021",
      type: "term",
      subcategory: "20th Century",
      front: "When did the Soviet Union dissolve?",
      back: "December 26, 1991",
      notes: "Marked the end of the Cold War. Led to 15 independent republics including Russia, Ukraine, and the Baltic states.",
      difficulty: 1
    },
    {
      id: "hi-022",
      type: "term",
      subcategory: "20th Century",
      front: "What was apartheid in South Africa?",
      back: "A system of racial segregation enforced by law from 1948 to 1991",
      notes: "Nelson Mandela was imprisoned for 27 years fighting it. He became South Africa's first Black president in 1994.",
      difficulty: 1
    }
  ]
};
