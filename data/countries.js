// data/countries.js
// World Countries, Capitals, and Flags

var CHAPTER_DATA = CHAPTER_DATA || {};

CHAPTER_DATA["countries"] = {
  subcategories: ["Europe", "Asia", "Africa", "Americas", "Oceania"],

  cards: [
    // --- Europe ---
    {
      id: "co-001",
      type: "term",
      subcategory: "Europe",
      front: "What is the capital of Austria?",
      back: "\ud83c\udde6\ud83c\uddf9 Vienna (Wien)",
      notes: "On the Danube river. Famous for classical music and coffee culture.",
      difficulty: 1
    },
    {
      id: "co-002",
      type: "term",
      subcategory: "Europe",
      front: "\ud83c\udde8\ud83c\udded Which country does this flag belong to?",
      back: "Switzerland",
      notes: "Capital: Bern. Known for neutrality, banking, chocolate, and watches.",
      difficulty: 1
    },
    {
      id: "co-003",
      type: "term",
      subcategory: "Europe",
      front: "What is the capital of Portugal?",
      back: "\ud83c\uddf5\ud83c\uddf9 Lisbon (Lisboa)",
      notes: "Westernmost capital in continental Europe.",
      difficulty: 1
    },
    {
      id: "co-004",
      type: "term",
      subcategory: "Europe",
      front: "What is the capital of the Netherlands?",
      back: "\ud83c\uddf3\ud83c\uddf1 Amsterdam",
      notes: "The government sits in The Hague, but Amsterdam is the constitutional capital.",
      difficulty: 1
    },
    {
      id: "co-005",
      type: "multiple-choice",
      subcategory: "Europe",
      front: "What is the capital of Poland?",
      options: ["Krakow", "Warsaw", "Gdansk", "Wroclaw"],
      correctIndex: 1,
      back: "\ud83c\uddf5\ud83c\uddf1 Warsaw (Warszawa)",
      difficulty: 1
    },
    {
      id: "co-006",
      type: "term",
      subcategory: "Europe",
      front: "What is the capital of Norway?",
      back: "\ud83c\uddf3\ud83c\uddf4 Oslo",
      difficulty: 1
    },
    {
      id: "co-007",
      type: "term",
      subcategory: "Europe",
      front: "What is the capital of Sweden?",
      back: "\ud83c\uddf8\ud83c\uddea Stockholm",
      notes: "Built on 14 islands connected by 57 bridges.",
      difficulty: 1
    },
    {
      id: "co-008",
      type: "term",
      subcategory: "Europe",
      front: "What is the capital of Czech Republic (Czechia)?",
      back: "\ud83c\udde8\ud83c\uddff Prague (Praha)",
      notes: "Known as 'The City of a Hundred Spires'.",
      difficulty: 2
    },
    {
      id: "co-009",
      type: "term",
      subcategory: "Europe",
      front: "What is the capital of Hungary?",
      back: "\ud83c\udded\ud83c\uddfa Budapest",
      notes: "Formed by uniting Buda and Pest, cities on opposite banks of the Danube.",
      difficulty: 1
    },
    {
      id: "co-010",
      type: "term",
      subcategory: "Europe",
      front: "What is the capital of Romania?",
      back: "\ud83c\uddf7\ud83c\uddf4 Bucharest (Bucure\u0219ti)",
      difficulty: 2
    },

    // --- Asia ---
    {
      id: "co-011",
      type: "term",
      subcategory: "Asia",
      front: "What is the capital of Japan?",
      back: "\ud83c\uddef\ud83c\uddf5 Tokyo",
      notes: "Most populous metropolitan area in the world.",
      difficulty: 1
    },
    {
      id: "co-012",
      type: "term",
      subcategory: "Asia",
      front: "What is the capital of South Korea?",
      back: "\ud83c\uddf0\ud83c\uddf7 Seoul",
      difficulty: 1
    },
    {
      id: "co-013",
      type: "multiple-choice",
      subcategory: "Asia",
      front: "What is the capital of Turkey?",
      options: ["Istanbul", "Ankara", "Izmir", "Antalya"],
      correctIndex: 1,
      back: "\ud83c\uddf9\ud83c\uddf7 Ankara (not Istanbul, which is the largest city)",
      difficulty: 2
    },
    {
      id: "co-014",
      type: "term",
      subcategory: "Asia",
      front: "What is the capital of Thailand?",
      back: "\ud83c\uddf9\ud83c\udded Bangkok (Krung Thep)",
      notes: "The full ceremonial name is the longest city name in the world.",
      difficulty: 1
    },
    {
      id: "co-015",
      type: "term",
      subcategory: "Asia",
      front: "What is the capital of Vietnam?",
      back: "\ud83c\uddfb\ud83c\uddf3 Hanoi",
      notes: "Ho Chi Minh City (Saigon) is larger but Hanoi is the capital.",
      difficulty: 2
    },
    {
      id: "co-016",
      type: "term",
      subcategory: "Asia",
      front: "What is the capital of India?",
      back: "\ud83c\uddee\ud83c\uddf3 New Delhi",
      difficulty: 1
    },

    // --- Africa ---
    {
      id: "co-017",
      type: "term",
      subcategory: "Africa",
      front: "What is the capital of Egypt?",
      back: "\ud83c\uddea\ud83c\uddec Cairo",
      notes: "Largest city in the Arab world and Africa.",
      difficulty: 1
    },
    {
      id: "co-018",
      type: "multiple-choice",
      subcategory: "Africa",
      front: "What is the capital of South Africa?",
      options: ["Johannesburg", "Cape Town", "Pretoria (administrative)", "Durban"],
      correctIndex: 2,
      back: "South Africa has three capitals: Pretoria (executive), Cape Town (legislative), Bloemfontein (judicial).",
      difficulty: 3
    },
    {
      id: "co-019",
      type: "term",
      subcategory: "Africa",
      front: "What is the capital of Nigeria?",
      back: "\ud83c\uddf3\ud83c\uddec Abuja",
      notes: "Lagos is larger but Abuja became the capital in 1991.",
      difficulty: 2
    },
    {
      id: "co-020",
      type: "term",
      subcategory: "Africa",
      front: "What is the capital of Kenya?",
      back: "\ud83c\uddf0\ud83c\uddea Nairobi",
      difficulty: 1
    },
    {
      id: "co-021",
      type: "term",
      subcategory: "Africa",
      front: "What is the capital of Morocco?",
      back: "\ud83c\uddf2\ud83c\udde6 Rabat",
      notes: "Casablanca is the largest city, but Rabat is the capital.",
      difficulty: 2
    },

    // --- Americas ---
    {
      id: "co-022",
      type: "term",
      subcategory: "Americas",
      front: "What is the capital of Brazil?",
      back: "\ud83c\udde7\ud83c\uddf7 Bras\u00edlia",
      notes: "Purpose-built as the capital in 1960. Not Rio or S\u00e3o Paulo.",
      difficulty: 1
    },
    {
      id: "co-023",
      type: "term",
      subcategory: "Americas",
      front: "What is the capital of Argentina?",
      back: "\ud83c\udde6\ud83c\uddf7 Buenos Aires",
      difficulty: 1
    },
    {
      id: "co-024",
      type: "term",
      subcategory: "Americas",
      front: "What is the capital of Canada?",
      back: "\ud83c\udde8\ud83c\udde6 Ottawa",
      notes: "Not Toronto or Montreal.",
      difficulty: 1
    },
    {
      id: "co-025",
      type: "term",
      subcategory: "Americas",
      front: "What is the capital of Mexico?",
      back: "\ud83c\uddf2\ud83c\uddfd Mexico City (Ciudad de M\u00e9xico)",
      notes: "One of the most populous cities in the world.",
      difficulty: 1
    },
    {
      id: "co-026",
      type: "term",
      subcategory: "Americas",
      front: "What is the capital of Peru?",
      back: "\ud83c\uddf5\ud83c\uddea Lima",
      difficulty: 1
    },
    {
      id: "co-027",
      type: "term",
      subcategory: "Americas",
      front: "What is the capital of Colombia?",
      back: "\ud83c\udde8\ud83c\uddf4 Bogot\u00e1",
      difficulty: 2
    },

    // --- Oceania ---
    {
      id: "co-028",
      type: "term",
      subcategory: "Oceania",
      front: "What is the capital of Australia?",
      back: "\ud83c\udde6\ud83c\uddfa Canberra",
      notes: "Not Sydney or Melbourne. Canberra was chosen as a compromise between the two rival cities.",
      difficulty: 1
    },
    {
      id: "co-029",
      type: "term",
      subcategory: "Oceania",
      front: "What is the capital of New Zealand?",
      back: "\ud83c\uddf3\ud83c\uddff Wellington",
      notes: "Auckland is the largest city, but Wellington is the capital.",
      difficulty: 2
    },
    {
      id: "co-030",
      type: "multiple-choice",
      subcategory: "Oceania",
      front: "What is the capital of Fiji?",
      options: ["Nadi", "Suva", "Lautoka", "Labasa"],
      correctIndex: 1,
      back: "\ud83c\uddeb\ud83c\uddef Suva, located on the island of Viti Levu",
      difficulty: 3
    }
  ]
};
