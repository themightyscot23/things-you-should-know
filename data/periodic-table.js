// data/periodic-table.js
// Periodic Table elements and common minerals

var CHAPTER_DATA = CHAPTER_DATA || {};

CHAPTER_DATA["periodic"] = {
  subcategories: ["Elements - Basics", "Elements - Symbols", "Element Properties", "Minerals & Rocks"],

  cards: [
    // --- Elements - Basics ---
    {
      id: "pt-001",
      type: "term",
      subcategory: "Elements - Basics",
      front: "What is the lightest element?",
      back: "Hydrogen (H) \u2014 Atomic number 1",
      notes: "Makes up about 75% of the universe's elemental mass.",
      difficulty: 1
    },
    {
      id: "pt-002",
      type: "term",
      subcategory: "Elements - Basics",
      front: "What element has the symbol 'Au'?",
      back: "Gold (Aurum)",
      notes: "Atomic number 79. From Latin 'aurum' meaning 'shining dawn'.",
      difficulty: 1
    },
    {
      id: "pt-003",
      type: "term",
      subcategory: "Elements - Basics",
      front: "What element has the symbol 'Fe'?",
      back: "Iron (Ferrum)",
      notes: "Atomic number 26. Most common element on Earth by mass.",
      difficulty: 1
    },
    {
      id: "pt-004",
      type: "term",
      subcategory: "Elements - Basics",
      front: "What element has the symbol 'Ag'?",
      back: "Silver (Argentum)",
      notes: "Atomic number 47. Argentina is named after this element.",
      difficulty: 1
    },
    {
      id: "pt-005",
      type: "term",
      subcategory: "Elements - Basics",
      front: "What element has the symbol 'Cu'?",
      back: "Copper (Cuprum)",
      notes: "Atomic number 29. One of the first metals used by humans.",
      difficulty: 1
    },
    {
      id: "pt-006",
      type: "term",
      subcategory: "Elements - Basics",
      front: "What element has the symbol 'Pb'?",
      back: "Lead (Plumbum)",
      notes: "Atomic number 82. The word 'plumbing' comes from its Latin name.",
      difficulty: 2
    },
    {
      id: "pt-007",
      type: "term",
      subcategory: "Elements - Basics",
      front: "What element has the symbol 'Sn'?",
      back: "Tin (Stannum)",
      notes: "Atomic number 50. Used in bronze (tin + copper alloy).",
      difficulty: 2
    },

    // --- Elements - Symbols ---
    {
      id: "pt-008",
      type: "multiple-choice",
      subcategory: "Elements - Symbols",
      front: "What is the chemical symbol for Sodium?",
      options: ["So", "Na", "Sd", "S"],
      correctIndex: 1,
      back: "Na (from Latin 'Natrium'). Atomic number 11.",
      difficulty: 1
    },
    {
      id: "pt-009",
      type: "multiple-choice",
      subcategory: "Elements - Symbols",
      front: "What is the chemical symbol for Potassium?",
      options: ["Po", "Pt", "K", "P"],
      correctIndex: 2,
      back: "K (from Latin 'Kalium'). Atomic number 19.",
      difficulty: 2
    },
    {
      id: "pt-010",
      type: "fill-blank",
      subcategory: "Elements - Symbols",
      front: "The chemical symbol for Tungsten is ___",
      answer: "W",
      acceptAlso: ["w"],
      back: "W (from German 'Wolfram'). Atomic number 74. Highest melting point of any element.",
      difficulty: 2
    },
    {
      id: "pt-011",
      type: "term",
      subcategory: "Elements - Symbols",
      front: "What is the chemical symbol for Mercury?",
      back: "Hg (from Latin 'Hydrargyrum' meaning 'liquid silver')",
      notes: "Atomic number 80. Only metal that is liquid at room temperature.",
      difficulty: 2
    },

    // --- Element Properties ---
    {
      id: "pt-012",
      type: "term",
      subcategory: "Element Properties",
      front: "What are the noble gases?",
      back: "Helium, Neon, Argon, Krypton, Xenon, Radon",
      notes: "Group 18. Characterized by very low reactivity due to full outer electron shells.",
      difficulty: 2
    },
    {
      id: "pt-013",
      type: "multiple-choice",
      subcategory: "Element Properties",
      front: "Which element is the best conductor of electricity?",
      options: ["Gold", "Copper", "Silver", "Aluminum"],
      correctIndex: 2,
      back: "Silver is the best electrical conductor, followed by copper, then gold.",
      difficulty: 2
    },
    {
      id: "pt-014",
      type: "term",
      subcategory: "Element Properties",
      front: "What is the most abundant element in the Earth's crust?",
      back: "Oxygen (about 46% by mass)",
      notes: "Followed by Silicon (28%), Aluminum (8%), and Iron (5%).",
      difficulty: 2
    },
    {
      id: "pt-015",
      type: "term",
      subcategory: "Element Properties",
      front: "What is the densest naturally occurring element?",
      back: "Osmium (22.59 g/cm\u00b3)",
      notes: "Atomic number 76. Slightly denser than iridium.",
      difficulty: 3
    },
    {
      id: "pt-016",
      type: "term",
      subcategory: "Element Properties",
      front: "Which element has the highest melting point?",
      back: "Tungsten (W) \u2014 3,422\u00b0C (6,192\u00b0F)",
      notes: "This is why it's used in light bulb filaments.",
      difficulty: 2
    },

    // --- Minerals & Rocks ---
    {
      id: "pt-017",
      type: "term",
      subcategory: "Minerals & Rocks",
      front: "What is quartz made of?",
      back: "Silicon dioxide (SiO\u2082)",
      notes: "Second most abundant mineral in Earth's crust. Comes in many varieties including amethyst and citrine.",
      difficulty: 1
    },
    {
      id: "pt-018",
      type: "term",
      subcategory: "Minerals & Rocks",
      front: "What mineral is the hardest on the Mohs scale?",
      back: "Diamond (hardness 10)",
      notes: "Made of pure carbon. Mohs scale runs from 1 (talc) to 10 (diamond).",
      difficulty: 1
    },
    {
      id: "pt-019",
      type: "term",
      subcategory: "Minerals & Rocks",
      front: "What is feldspar and why does it matter?",
      back: "A group of rock-forming minerals. The most abundant mineral group in Earth's crust (~60%).",
      notes: "Used in ceramics, glass-making, and as a mild abrasive.",
      difficulty: 2
    },
    {
      id: "pt-020",
      type: "term",
      subcategory: "Minerals & Rocks",
      front: "What is bauxite?",
      back: "The primary ore of aluminum",
      notes: "Formed from the weathering of rocks in tropical climates. Major producers: Australia, Guinea, Brazil.",
      difficulty: 2
    },
    {
      id: "pt-021",
      type: "term",
      subcategory: "Minerals & Rocks",
      front: "What mineral is commonly called 'fool's gold'?",
      back: "Pyrite (iron sulfide, FeS\u2082)",
      notes: "Has a metallic luster and pale gold color that resembles gold.",
      difficulty: 1
    },
    {
      id: "pt-022",
      type: "multiple-choice",
      subcategory: "Minerals & Rocks",
      front: "Which mineral is the primary ore of copper?",
      options: ["Hematite", "Chalcopyrite", "Galena", "Bauxite"],
      correctIndex: 1,
      back: "Chalcopyrite (CuFeS\u2082) is the most important copper ore mineral.",
      difficulty: 2
    },
    {
      id: "pt-023",
      type: "term",
      subcategory: "Minerals & Rocks",
      front: "What are the three types of rocks?",
      back: "Igneous, Sedimentary, Metamorphic",
      notes: "Igneous: from cooled magma. Sedimentary: from compressed sediment. Metamorphic: transformed by heat/pressure.",
      difficulty: 1
    },
    {
      id: "pt-024",
      type: "term",
      subcategory: "Minerals & Rocks",
      front: "What is lithium commonly mined from?",
      back: "Brine deposits (salt flats) and spodumene (a mineral in pegmatite rocks)",
      notes: "Major sources: Chile, Australia, Argentina. Critical for batteries.",
      difficulty: 2
    },
    {
      id: "pt-025",
      type: "term",
      subcategory: "Minerals & Rocks",
      front: "What is mica and what is it used for?",
      back: "A group of sheet silicate minerals. Used as electrical insulation, in cosmetics, and construction.",
      notes: "Can be split into very thin transparent sheets. Name from Latin 'micare' (to glitter).",
      difficulty: 2
    }
  ]
};
