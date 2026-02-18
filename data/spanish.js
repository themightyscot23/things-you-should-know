// data/spanish.js
// Spanish Learning flashcards
// To add a card: copy an existing object, change the id and fields, save, refresh.
// To fix a mistake: find the card by id or question text, edit the field, save.

var CHAPTER_DATA = CHAPTER_DATA || {};

CHAPTER_DATA["spanish"] = {
  subcategories: ["Greetings", "Common Phrases", "Numbers", "Food & Drink", "Travel", "Grammar"],

  cards: [
    // --- Greetings ---
    {
      id: "es-001",
      type: "term",
      subcategory: "Greetings",
      front: "How do you say 'Good morning' in Spanish?",
      back: "Buenos d\u00edas",
      hint: "Think 'good days'",
      notes: "Used from sunrise until around noon",
      difficulty: 1
    },
    {
      id: "es-002",
      type: "term",
      subcategory: "Greetings",
      front: "How do you say 'Good afternoon' in Spanish?",
      back: "Buenas tardes",
      notes: "Used from noon until sunset",
      difficulty: 1
    },
    {
      id: "es-003",
      type: "term",
      subcategory: "Greetings",
      front: "How do you say 'Good night' in Spanish?",
      back: "Buenas noches",
      notes: "Used as both a greeting and farewell in the evening",
      difficulty: 1
    },
    {
      id: "es-004",
      type: "term",
      subcategory: "Greetings",
      front: "What does '\u00bfC\u00f3mo est\u00e1s?' mean?",
      back: "How are you? (informal)",
      hint: "Common everyday greeting",
      difficulty: 1
    },
    {
      id: "es-005",
      type: "term",
      subcategory: "Greetings",
      front: "What is the formal way to ask 'How are you?' in Spanish?",
      back: "\u00bfC\u00f3mo est\u00e1 usted?",
      notes: "Use 'usted' with elders, strangers, or in formal settings",
      difficulty: 2
    },

    // --- Common Phrases ---
    {
      id: "es-006",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'Thank you' in Spanish?",
      back: "Gracias",
      difficulty: 1
    },
    {
      id: "es-007",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'Please' in Spanish?",
      back: "Por favor",
      difficulty: 1
    },
    {
      id: "es-008",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'Excuse me' or 'Sorry' in Spanish?",
      back: "Perd\u00f3n / Disculpe",
      notes: "Perd\u00f3n is more casual, Disculpe is more formal",
      difficulty: 1
    },
    {
      id: "es-009",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'I don't understand' in Spanish?",
      back: "No entiendo",
      difficulty: 1
    },
    {
      id: "es-010",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'Do you speak English?' in Spanish?",
      back: "\u00bfHabla ingl\u00e9s?",
      difficulty: 1
    },
    {
      id: "es-011",
      type: "term",
      subcategory: "Common Phrases",
      front: "What does 'Me llamo...' mean?",
      back: "My name is...",
      hint: "Literally 'I call myself...'",
      difficulty: 1
    },

    // --- Numbers ---
    {
      id: "es-012",
      type: "term",
      subcategory: "Numbers",
      front: "Count from 1 to 5 in Spanish",
      back: "Uno, dos, tres, cuatro, cinco",
      difficulty: 1
    },
    {
      id: "es-013",
      type: "term",
      subcategory: "Numbers",
      front: "Count from 6 to 10 in Spanish",
      back: "Seis, siete, ocho, nueve, diez",
      difficulty: 1
    },
    {
      id: "es-014",
      type: "multiple-choice",
      subcategory: "Numbers",
      front: "What is 'veinte' in English?",
      options: ["Twelve", "Twenty", "Thirty", "Fifteen"],
      correctIndex: 1,
      back: "Twenty (20)",
      difficulty: 1
    },
    {
      id: "es-015",
      type: "term",
      subcategory: "Numbers",
      front: "How do you say 100 in Spanish?",
      back: "Cien",
      notes: "Cien for exactly 100, ciento for 101-199 (ciento uno, etc.)",
      difficulty: 2
    },

    // --- Food & Drink ---
    {
      id: "es-016",
      type: "term",
      subcategory: "Food & Drink",
      front: "How do you say 'water' in Spanish?",
      back: "Agua",
      hint: "Think 'aqua'",
      difficulty: 1
    },
    {
      id: "es-017",
      type: "term",
      subcategory: "Food & Drink",
      front: "How do you say 'beer' in Spanish?",
      back: "Cerveza",
      difficulty: 1
    },
    {
      id: "es-018",
      type: "term",
      subcategory: "Food & Drink",
      front: "How do you say 'The bill, please' in Spanish?",
      back: "La cuenta, por favor",
      difficulty: 1
    },
    {
      id: "es-019",
      type: "fill-blank",
      subcategory: "Food & Drink",
      front: "Yo quiero un caf\u00e9, por _____.",
      answer: "favor",
      acceptAlso: ["Favor"],
      back: "favor \u2014 'I would like a coffee, please.'",
      difficulty: 1
    },

    // --- Travel ---
    {
      id: "es-020",
      type: "term",
      subcategory: "Travel",
      front: "How do you say 'Where is the bathroom?' in Spanish?",
      back: "\u00bfD\u00f3nde est\u00e1 el ba\u00f1o?",
      difficulty: 1
    },
    {
      id: "es-021",
      type: "term",
      subcategory: "Travel",
      front: "How do you say 'How much does it cost?' in Spanish?",
      back: "\u00bfCu\u00e1nto cuesta?",
      difficulty: 1
    },
    {
      id: "es-022",
      type: "term",
      subcategory: "Travel",
      front: "How do you ask for directions to the train station in Spanish?",
      back: "\u00bfD\u00f3nde est\u00e1 la estaci\u00f3n de tren?",
      difficulty: 2
    },

    // --- Grammar ---
    {
      id: "es-023",
      type: "multiple-choice",
      subcategory: "Grammar",
      front: "Which is the correct conjugation of 'ser' (to be) for 'we'?",
      options: ["Somos", "Semos", "Samos", "Seremos"],
      correctIndex: 0,
      back: "Somos \u2014 'Nosotros somos estudiantes' (We are students)",
      difficulty: 2
    },
    {
      id: "es-024",
      type: "fill-blank",
      subcategory: "Grammar",
      front: "Yo ___ estudiante. (I am a student, using 'ser')",
      answer: "soy",
      acceptAlso: ["Soy"],
      back: "soy \u2014 first person singular of 'ser'",
      difficulty: 2
    },
    {
      id: "es-025",
      type: "term",
      subcategory: "Grammar",
      front: "What is the difference between 'ser' and 'estar'?",
      back: "Ser = permanent/identity traits. Estar = temporary states/locations.",
      notes: "Ser: 'Soy alto' (I am tall). Estar: 'Estoy cansado' (I am tired).",
      difficulty: 2
    }
  ]
};
