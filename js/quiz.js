// js/quiz.js
// Quiz engine — card selection, session management, answer evaluation.

var QuizEngine = (function() {
  "use strict";

  var _state = {
    chapterId: null,
    cards: [],
    currentIndex: 0,
    results: [],
    score: 0,
    xpEarned: 0,
    sessionStartTime: null,
    ended: false
  };

  // Weighted random sampling — cards you've gotten wrong appear more often
  function _selectCards(chapterId) {
    var data = CHAPTER_DATA[chapterId];
    if (!data || !data.cards || data.cards.length === 0) return [];

    var allCards = data.cards;
    var settings = Gamification.getSettings();
    var count = Math.min(settings.cardsPerSession, allCards.length);
    var progress = Gamification.getProgress();
    var chapterHistory = (progress.chapterProgress[chapterId] || {}).cardHistory || {};

    // Assign weights
    var weighted = [];
    for (var i = 0; i < allCards.length; i++) {
      var card = allCards[i];
      var history = chapterHistory[card.id];
      var weight = 3; // default: never seen

      if (history) {
        var totalCorrect = history.correct || 0;
        var totalWrong = history.wrong || 0;

        if (totalCorrect >= 3 && totalWrong === 0) {
          weight = 0.3; // mastered
        } else if (totalCorrect >= 3) {
          weight = 0.5; // mostly mastered but has had mistakes
        } else if (totalWrong > totalCorrect) {
          weight = 3; // struggling
        } else {
          weight = 1; // seen and making progress
        }
      }

      weighted.push({ card: card, weight: weight });
    }

    // Weighted random selection
    var selected = [];
    var remaining = weighted.slice();

    for (var j = 0; j < count && remaining.length > 0; j++) {
      var totalWeight = 0;
      for (var k = 0; k < remaining.length; k++) {
        totalWeight += remaining[k].weight;
      }

      var rand = Math.random() * totalWeight;
      var cumulative = 0;
      for (var m = 0; m < remaining.length; m++) {
        cumulative += remaining[m].weight;
        if (rand <= cumulative) {
          selected.push(remaining[m].card);
          remaining.splice(m, 1);
          break;
        }
      }
    }

    // Shuffle selected cards
    for (var s = selected.length - 1; s > 0; s--) {
      var r = Math.floor(Math.random() * (s + 1));
      var temp = selected[s];
      selected[s] = selected[r];
      selected[r] = temp;
    }

    return selected;
  }

  return {
    startSession: function(chapterId) {
      _state.chapterId = chapterId;
      _state.cards = _selectCards(chapterId);
      _state.currentIndex = 0;
      _state.results = [];
      _state.score = 0;
      _state.xpEarned = 0;
      _state.ended = false;
      _state.sessionStartTime = Date.now();

      // Update chapter title in header
      for (var i = 0; i < CHAPTERS_META.length; i++) {
        if (CHAPTERS_META[i].id === chapterId) {
          var titleEl = document.getElementById("quiz-chapter-title");
          if (titleEl) titleEl.textContent = CHAPTERS_META[i].title;
          break;
        }
      }
    },

    getCurrentCard: function() {
      if (_state.currentIndex >= _state.cards.length) return null;
      return _state.cards[_state.currentIndex];
    },

    getSessionInfo: function() {
      return {
        current: _state.currentIndex + 1,
        total: _state.cards.length,
        score: _state.score,
        chapterId: _state.chapterId
      };
    },

    submitResult: function(result) {
      var card = _state.cards[_state.currentIndex];
      if (!card) return;

      _state.results.push({
        cardId: card.id,
        result: result
      });

      // Calculate XP — correct earns points, wrong earns nothing
      var xp = 0;
      if (result === "correct") { xp = 10; _state.score++; }

      _state.xpEarned += xp;

      // Record in gamification
      Gamification.recordCardResult(_state.chapterId, card.id, result);
      Gamification.addXP(xp);
      UI.updateStatsBar();
      UI.showXPFloat(xp);
    },

    nextCard: function() {
      _state.currentIndex++;
      if (_state.currentIndex >= _state.cards.length) {
        return null;
      }
      return _state.cards[_state.currentIndex];
    },

    endSession: function() {
      var correct = 0;
      for (var i = 0; i < _state.results.length; i++) {
        if (_state.results[i].result === "correct") correct++;
      }

      var total = _state.results.length;
      var isPerfect = total > 0 && correct === total;

      // Guard against double-ending (e.g. navigating to #results twice)
      if (!_state.ended) {
        _state.ended = true;

        // Session completion bonus
        if (total > 0) {
          var bonus = 25;
          if (isPerfect) bonus += 50;
          _state.xpEarned += bonus;
          Gamification.addXP(bonus);
        }

        // Record session and perfect score
        Gamification.recordSession(_state.chapterId);
        if (isPerfect) Gamification.unlockAchievement("perfect-session");
        UI.updateStatsBar();

        // Check achievements
        var newAchievements = Gamification.checkAchievements();
        for (var a = 0; a < newAchievements.length; a++) {
          UI.showToast(newAchievements[a].title, newAchievements[a].desc, newAchievements[a].icon);
        }
      }

      return {
        chapterId: _state.chapterId,
        results: _state.results,
        score: _state.score,
        xpEarned: _state.xpEarned,
        isPerfect: isPerfect
      };
    }
  };
})();
