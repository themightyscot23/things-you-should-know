# 🧠 Things You Should Know

A gamified flashcard quiz app built by Timothy with [Claude Code](https://claude.ai) — designed around topics that fascinate me and keep my brain sharp. 🎯

**Feel free to learn alongside me!** Try the quizzes, suggest new chapters, or tell me if something's too easy or too hard. Pull requests with new cards are always welcome. 🤝

---

## 📚 Chapters

| | Chapter | What You'll Learn |
|---|---|---|
| 🇪🇸 | **Spanish** | Greetings, phrases, numbers, food, travel, grammar |
| 🇫🇷 | **French** | Essential vocabulary, expressions, and conjugation |
| 🇧🇷 | **Brazilian Portuguese** | Practical phrases to actually get around in Brazil |
| 🌍 | **World Countries & Capitals** | Geography, capitals, and flags across every continent |
| ⚗️ | **Periodic Table & Minerals** | Elements, symbols, properties, and rocks from the earth |
| 📜 | **World History** | Major events from ancient civilizations to the 20th century |

---

## 🚀 How to Run

**Option 1** — Just open it:
```
Open index.html in your browser. That's it.
```

**Option 2** — Local server (if you prefer):
```bash
python3 serve.py
```

No dependencies. No build step. No cloud. Works offline. ✈️

---

## 🎮 Gamification

- ⚡ **XP** — Earn points for every card, even the ones you get wrong (effort counts!)
- 📈 **Levels** — Watch yourself climb from novice to professor
- 🔥 **Streaks** — Come back daily and keep the fire going
- 🏆 **Achievements** — 12 milestones to unlock
- 🔄 **Smart repetition** — Cards you struggle with show up more often

---

## ✏️ Adding & Editing Content

The quiz data lives in simple files inside `data/`. Anyone can edit them.

**Add a card** — Open the relevant file (e.g. `data/spanish.js`), copy an existing card, change the fields, save. Done.

**Add a whole chapter** — Create a new file in `data/`, register it in `data/chapters.js`, add a `<script>` tag in `index.html`.

**Fix a mistake** — Find the card, edit the text, save. You can even do this from GitHub's web editor without cloning the repo. 🖊️

Every card looks like this:
```js
{
  id: "es-001",
  type: "term",
  subcategory: "Greetings",
  front: "How do you say 'Good morning' in Spanish?",
  back: "Buenos días",
  hint: "Think 'good days'",
  notes: "Used from sunrise until around noon",
  difficulty: 1
}
```

Card types: `term` (flip to reveal), `multiple-choice`, and `fill-blank`.

---

## 💡 Inspiration

Inspired by my many teachers across the years and some great learning platforms — primarily [Duolingo](https://duolingo.com) 🦉 and [Sporcle](https://sporcle.com) 🏅. If those two had a baby that lived in a single HTML file, this would be it.

---

## 🛠️ Built With

Vanilla HTML, CSS, and JavaScript. No frameworks, no npm, no build tools. Designed to be pulled from GitHub and run anywhere — laptop, tablet, phone, airplane. 🌐

Built with the help of [Claude Code](https://claude.ai) ✨

---

*Got ideas for new chapters? Think a question is wrong? Open an issue or a PR — let's learn together.* 🎓
