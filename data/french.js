// data/french.js
// French Learning flashcards

var CHAPTER_DATA = CHAPTER_DATA || {};

CHAPTER_DATA["french"] = {
  subcategories: ["Greetings", "Common Phrases", "Numbers", "Food & Drink", "Travel", "Grammar"],

  cards: [
    // --- Greetings ---
    {
      id: "fr-001",
      type: "term",
      subcategory: "Greetings",
      front: "How do you say 'Hello' in French?",
      back: "Bonjour",
      notes: "Literally 'good day'. Used from morning until evening.",
      difficulty: 1
    },
    {
      id: "fr-002",
      type: "term",
      subcategory: "Greetings",
      front: "How do you say 'Good evening' in French?",
      back: "Bonsoir",
      difficulty: 1
    },
    {
      id: "fr-003",
      type: "term",
      subcategory: "Greetings",
      front: "How do you say 'Goodbye' in French?",
      back: "Au revoir",
      hint: "Literally 'until we see again'",
      difficulty: 1
    },
    {
      id: "fr-004",
      type: "term",
      subcategory: "Greetings",
      front: "What does 'Comment allez-vous?' mean?",
      back: "How are you? (formal)",
      notes: "Use 'Comment vas-tu?' for informal",
      difficulty: 1
    },
    {
      id: "fr-005",
      type: "term",
      subcategory: "Greetings",
      front: "What does 'Enchanté(e)' mean?",
      back: "Nice to meet you / Pleased to meet you",
      notes: "Add the 'e' if you are female: enchantée",
      difficulty: 1
    },

    // --- Common Phrases ---
    {
      id: "fr-006",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'Thank you' in French?",
      back: "Merci",
      difficulty: 1
    },
    {
      id: "fr-007",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'Thank you very much' in French?",
      back: "Merci beaucoup",
      difficulty: 1
    },
    {
      id: "fr-008",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'Please' in French?",
      back: "S'il vous pla\u00eet",
      notes: "Informal: S'il te pla\u00eet",
      difficulty: 1
    },
    {
      id: "fr-009",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'Excuse me' in French?",
      back: "Excusez-moi",
      difficulty: 1
    },
    {
      id: "fr-010",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'I don't understand' in French?",
      back: "Je ne comprends pas",
      difficulty: 1
    },
    {
      id: "fr-011",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'Do you speak English?' in French?",
      back: "Parlez-vous anglais?",
      difficulty: 1
    },
    {
      id: "fr-012",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'My name is...' in French?",
      back: "Je m'appelle...",
      hint: "Literally 'I call myself...'",
      difficulty: 1
    },
    {
      id: "fr-013",
      type: "term",
      subcategory: "Common Phrases",
      front: "How do you say 'Yes' and 'No' in French?",
      back: "Oui / Non",
      difficulty: 1
    },

    // --- Numbers ---
    {
      id: "fr-014",
      type: "term",
      subcategory: "Numbers",
      front: "Count from 1 to 5 in French",
      back: "Un, deux, trois, quatre, cinq",
      difficulty: 1
    },
    {
      id: "fr-015",
      type: "term",
      subcategory: "Numbers",
      front: "Count from 6 to 10 in French",
      back: "Six, sept, huit, neuf, dix",
      difficulty: 1
    },
    {
      id: "fr-016",
      type: "multiple-choice",
      subcategory: "Numbers",
      front: "What is 'vingt' in English?",
      options: ["Twelve", "Twenty", "Thirty", "Forty"],
      correctIndex: 1,
      back: "Twenty (20)",
      difficulty: 1
    },
    {
      id: "fr-017",
      type: "term",
      subcategory: "Numbers",
      front: "How do the French say 70, 80, and 90?",
      back: "Soixante-dix (60+10), quatre-vingts (4\u00d720), quatre-vingt-dix (4\u00d720+10)",
      notes: "Belgian and Swiss French use septante, huitante/octante, nonante instead",
      difficulty: 3
    },

    // --- Food & Drink ---
    {
      id: "fr-018",
      type: "term",
      subcategory: "Food & Drink",
      front: "How do you say 'water' in French?",
      back: "L'eau",
      difficulty: 1
    },
    {
      id: "fr-019",
      type: "term",
      subcategory: "Food & Drink",
      front: "How do you say 'coffee' in French?",
      back: "Le caf\u00e9",
      difficulty: 1
    },
    {
      id: "fr-020",
      type: "term",
      subcategory: "Food & Drink",
      front: "How do you say 'bread' in French?",
      back: "Le pain",
      difficulty: 1
    },
    {
      id: "fr-021",
      type: "term",
      subcategory: "Food & Drink",
      front: "How do you say 'The bill, please' in French?",
      back: "L'addition, s'il vous pla\u00eet",
      difficulty: 1
    },

    // --- Travel ---
    {
      id: "fr-022",
      type: "term",
      subcategory: "Travel",
      front: "How do you say 'Where is...?' in French?",
      back: "O\u00f9 est...?",
      difficulty: 1
    },
    {
      id: "fr-023",
      type: "term",
      subcategory: "Travel",
      front: "How do you say 'How much does it cost?' in French?",
      back: "Combien \u00e7a co\u00fbte?",
      difficulty: 1
    },
    {
      id: "fr-024",
      type: "term",
      subcategory: "Travel",
      front: "How do you ask 'Where is the train station?' in French?",
      back: "O\u00f9 est la gare?",
      difficulty: 2
    },

    // --- Grammar ---
    {
      id: "fr-025",
      type: "term",
      subcategory: "Grammar",
      front: "What are the French subject pronouns?",
      back: "Je, tu, il/elle/on, nous, vous, ils/elles",
      notes: "Vous is both formal singular and plural 'you'",
      difficulty: 2
    },
    {
      id: "fr-026",
      type: "multiple-choice",
      subcategory: "Grammar",
      front: "What does 'Je suis' mean?",
      options: ["I have", "I am", "I go", "I want"],
      correctIndex: 1,
      back: "Je suis = I am (\u00eatre = to be)",
      difficulty: 1
    },
    {
      id: "fr-027",
      type: "fill-blank",
      subcategory: "Grammar",
      front: "J'___ un livre. (I have a book)",
      answer: "ai",
      acceptAlso: ["Ai"],
      back: "ai \u2014 'J'ai' = I have (avoir = to have)",
      difficulty: 2
    }
  ]
};
