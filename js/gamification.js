// js/gamification.js
// XP, levels, streaks, achievements, and localStorage persistence.

var Gamification = (function() {
  "use strict";

  var STORAGE_KEY = "tysk_progress";
  var SETTINGS_KEY = "tysk_settings";

  var ACHIEVEMENTS = [
    { id: "first-session",   title: "First Steps",       desc: "Complete your first quiz session",               icon: "\ud83c\udfaf" },
    { id: "streak-3",        title: "On a Roll",          desc: "Maintain a 3-day streak",                        icon: "\ud83d\udd25" },
    { id: "streak-7",        title: "Week Warrior",       desc: "Maintain a 7-day streak",                        icon: "\ud83d\udcaa" },
    { id: "streak-30",       title: "Unstoppable",        desc: "Maintain a 30-day streak",                       icon: "\ud83c\udfc6" },
    { id: "perfect-session", title: "Perfect Score",      desc: "Get 100% correct in a session",                  icon: "\u2b50" },
    { id: "level-5",         title: "Scholar",            desc: "Reach Level 5",                                  icon: "\ud83d\udcda" },
    { id: "level-10",        title: "Professor",          desc: "Reach Level 10",                                 icon: "\ud83c\udf93" },
    { id: "cards-100",       title: "Centurion",          desc: "Study 100 total cards",                          icon: "\ud83d\udcaf" },
    { id: "cards-500",       title: "Knowledge Seeker",   desc: "Study 500 total cards",                          icon: "\ud83e\udde0" },
    { id: "all-chapters",    title: "Renaissance Mind",   desc: "Complete at least one session in every chapter",  icon: "\ud83c\udf1f" },
    { id: "spanish-all",     title: "Hola Amigo",         desc: "Study every Spanish card at least once",         icon: "\ud83c\uddea\ud83c\uddf8" },
    { id: "french-all",      title: "Tr\u00e8s Bien",     desc: "Study every French card at least once",          icon: "\ud83c\uddeb\ud83c\uddf7" }
  ];

  var _progress = null;
  var _settings = null;

  function _defaultProgress() {
    return {
      version: 1,
      xp: 0,
      level: 1,
      streak: { current: 0, longest: 0, lastSessionDate: null },
      achievements: [],
      chapterProgress: {}
    };
  }

  function _defaultSettings() {
    return {
      cardsPerSession: 20
    };
  }

  function _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_progress));
    } catch(e) {
      console.warn("Failed to save progress:", e);
    }
  }

  function _saveSettings() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(_settings));
    } catch(e) {
      console.warn("Failed to save settings:", e);
    }
  }

  function _load() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        _progress = JSON.parse(stored);
        // Ensure all expected fields exist (forward compat)
        if (!_progress.chapterProgress) _progress.chapterProgress = {};
        if (!_progress.achievements) _progress.achievements = [];
        if (!_progress.streak) _progress.streak = { current: 0, longest: 0, lastSessionDate: null };
      } else {
        _progress = _defaultProgress();
      }
    } catch(e) {
      console.warn("Failed to load progress, resetting:", e);
      _progress = _defaultProgress();
    }

    try {
      var storedSettings = localStorage.getItem(SETTINGS_KEY);
      if (storedSettings) {
        _settings = JSON.parse(storedSettings);
      } else {
        _settings = _defaultSettings();
      }
    } catch(e) {
      _settings = _defaultSettings();
    }
  }

  function _calcLevel(xp) {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  }

  function _todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function _daysBetween(dateStr1, dateStr2) {
    if (!dateStr1 || !dateStr2) return Infinity;
    var d1 = new Date(dateStr1 + "T00:00:00");
    var d2 = new Date(dateStr2 + "T00:00:00");
    return Math.round(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
  }

  function _updateStreak() {
    var today = _todayStr();
    var last = _progress.streak.lastSessionDate;

    if (last === today) {
      // Already counted today
      return;
    }

    var gap = _daysBetween(last, today);

    if (gap === 1) {
      // Consecutive day
      _progress.streak.current++;
    } else if (gap > 1 || last === null) {
      // Streak broken or first session
      _progress.streak.current = 1;
    }

    if (_progress.streak.current > _progress.streak.longest) {
      _progress.streak.longest = _progress.streak.current;
    }

    _progress.streak.lastSessionDate = today;
  }

  function _getTotalCardsStudied() {
    var total = 0;
    var chapters = Object.keys(_progress.chapterProgress);
    for (var i = 0; i < chapters.length; i++) {
      total += _progress.chapterProgress[chapters[i]].cardsStudied || 0;
    }
    return total;
  }

  function _allCardsStudiedInChapter(chapterId) {
    var data = CHAPTER_DATA[chapterId];
    if (!data) return false;
    var cp = _progress.chapterProgress[chapterId];
    if (!cp || !cp.cardHistory) return false;
    for (var i = 0; i < data.cards.length; i++) {
      if (!cp.cardHistory[data.cards[i].id]) return false;
    }
    return true;
  }

  return {
    init: function() {
      _load();
    },

    getProgress: function() {
      return _progress;
    },

    getSettings: function() {
      return _settings;
    },

    updateSettings: function(changes) {
      for (var key in changes) {
        if (changes.hasOwnProperty(key)) {
          _settings[key] = changes[key];
        }
      }
      _saveSettings();
    },

    addXP: function(amount) {
      _progress.xp += amount;
      _progress.level = _calcLevel(_progress.xp);
      _save();
    },

    recordCardResult: function(chapterId, cardId, result) {
      if (!_progress.chapterProgress[chapterId]) {
        _progress.chapterProgress[chapterId] = {
          totalSessions: 0,
          cardsStudied: 0,
          cardHistory: {}
        };
      }

      var cp = _progress.chapterProgress[chapterId];
      if (!cp.cardHistory[cardId]) {
        cp.cardHistory[cardId] = { correct: 0, close: 0, wrong: 0, lastSeen: null };
        cp.cardsStudied++;
      }

      var ch = cp.cardHistory[cardId];
      if (result === "correct") ch.correct++;
      else if (result === "close") ch.close++;
      else ch.wrong++;
      ch.lastSeen = _todayStr();

      _save();
    },

    recordSession: function(chapterId) {
      if (!_progress.chapterProgress[chapterId]) {
        _progress.chapterProgress[chapterId] = {
          totalSessions: 0,
          cardsStudied: 0,
          cardHistory: {}
        };
      }
      _progress.chapterProgress[chapterId].totalSessions++;
      _updateStreak();
      _save();
    },

    checkAchievements: function() {
      var newlyUnlocked = [];

      var checks = [
        { id: "first-session", test: function() {
          var chapters = Object.keys(_progress.chapterProgress);
          for (var i = 0; i < chapters.length; i++) {
            if (_progress.chapterProgress[chapters[i]].totalSessions > 0) return true;
          }
          return false;
        }},
        { id: "streak-3", test: function() { return _progress.streak.current >= 3; }},
        { id: "streak-7", test: function() { return _progress.streak.current >= 7; }},
        { id: "streak-30", test: function() { return _progress.streak.current >= 30; }},
        { id: "level-5", test: function() { return _progress.level >= 5; }},
        { id: "level-10", test: function() { return _progress.level >= 10; }},
        { id: "cards-100", test: function() { return _getTotalCardsStudied() >= 100; }},
        { id: "cards-500", test: function() { return _getTotalCardsStudied() >= 500; }},
        { id: "all-chapters", test: function() {
          for (var i = 0; i < CHAPTERS_META.length; i++) {
            var cp = _progress.chapterProgress[CHAPTERS_META[i].id];
            if (!cp || cp.totalSessions === 0) return false;
          }
          return true;
        }},
        { id: "spanish-all", test: function() { return _allCardsStudiedInChapter("spanish"); }},
        { id: "french-all", test: function() { return _allCardsStudiedInChapter("french"); }}
      ];

      // Note: "perfect-session" is checked inline in QuizEngine.endSession

      for (var i = 0; i < checks.length; i++) {
        var check = checks[i];
        if (!this.isAchievementUnlocked(check.id) && check.test()) {
          _progress.achievements.push({ id: check.id, unlockedAt: new Date().toISOString() });
          // Find the achievement definition
          for (var j = 0; j < ACHIEVEMENTS.length; j++) {
            if (ACHIEVEMENTS[j].id === check.id) {
              newlyUnlocked.push(ACHIEVEMENTS[j]);
              break;
            }
          }
        }
      }

      if (newlyUnlocked.length > 0) _save();
      return newlyUnlocked;
    },

    isAchievementUnlocked: function(id) {
      for (var i = 0; i < _progress.achievements.length; i++) {
        if (_progress.achievements[i].id === id) return true;
      }
      return false;
    },

    unlockAchievement: function(id) {
      if (this.isAchievementUnlocked(id)) return;
      _progress.achievements.push({ id: id, unlockedAt: new Date().toISOString() });
      _save();
      // Show toast for it
      for (var i = 0; i < ACHIEVEMENTS.length; i++) {
        if (ACHIEVEMENTS[i].id === id) {
          UI.showToast(ACHIEVEMENTS[i].title, ACHIEVEMENTS[i].desc, ACHIEVEMENTS[i].icon);
          break;
        }
      }
    },

    getAllAchievements: function() {
      return ACHIEVEMENTS;
    },

    resetProgress: function() {
      _progress = _defaultProgress();
      _save();
    }
  };
})();
