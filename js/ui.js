// js/ui.js
// DOM rendering and interactions.

var UI = (function() {
  "use strict";

  // Cached DOM elements
  var _els = {};

  // Timer state
  var _timerInterval = null;
  var _timerSeconds = 0;
  var TIMER_DURATION = 15;

  // Card state
  var _cardLocked = false;

  function _cache() {
    _els.chapterGrid = document.getElementById("chapter-grid");
    _els.quizHeader = document.getElementById("quiz-header");
    _els.chapterTitle = document.getElementById("quiz-chapter-title");
    _els.quizProgress = document.getElementById("quiz-progress");
    _els.quizScore = document.getElementById("quiz-score");
    _els.flashcard = document.getElementById("flashcard");
    _els.frontContent = document.getElementById("card-front-content");
    _els.backContent = document.getElementById("card-back-content");
    _els.subcategory = document.getElementById("card-subcategory");
    _els.hint = document.getElementById("card-hint");
    _els.notes = document.getElementById("card-notes");
    _els.answerControls = document.getElementById("answer-controls");
    _els.answerInput = document.getElementById("answer-input");
    _els.btnSubmit = document.getElementById("btn-submit");
    _els.btnDontKnow = document.getElementById("btn-dont-know");
    _els.timerBar = document.getElementById("timer-bar");
    _els.timerFill = document.getElementById("timer-fill");
    _els.timerText = document.getElementById("timer-text");
    _els.btnBack = document.getElementById("btn-back");
    _els.resultsContent = document.getElementById("results-content");
    _els.statsContent = document.getElementById("stats-content");
    _els.settingsContent = document.getElementById("settings-content");
    _els.xpDisplay = document.getElementById("xp-display");
    _els.streakDisplay = document.getElementById("streak-display");
    _els.levelDisplay = document.getElementById("level-display");
    _els.toastContainer = document.getElementById("toast-container");
  }

  function _updateStatsBar() {
    var progress = Gamification.getProgress();
    _els.xpDisplay.innerHTML = "&#9889; " + progress.xp + " XP";
    _els.streakDisplay.innerHTML = "&#128293; " + progress.streak.current + " day" + (progress.streak.current !== 1 ? "s" : "");
    _els.levelDisplay.textContent = "Lvl " + progress.level;
  }

  // === Chapter Grid ===

  function renderChapterGrid() {
    var progress = Gamification.getProgress();
    var html = "";

    for (var i = 0; i < CHAPTERS_META.length; i++) {
      var ch = CHAPTERS_META[i];
      var data = CHAPTER_DATA[ch.id];
      var totalCards = data ? data.cards.length : 0;
      var chProgress = progress.chapterProgress[ch.id];
      var mastered = 0;

      if (chProgress && chProgress.cardHistory) {
        var ids = Object.keys(chProgress.cardHistory);
        for (var j = 0; j < ids.length; j++) {
          if (chProgress.cardHistory[ids[j]].correct >= 3) {
            mastered++;
          }
        }
      }

      var pct = totalCards > 0 ? Math.round((mastered / totalCards) * 100) : 0;

      html += '<div class="chapter-card" data-chapter="' + ch.id + '">'
        + '<div class="chapter-card-accent" style="background:' + ch.color + '"></div>'
        + '<div class="chapter-icon">' + ch.icon + '</div>'
        + '<div class="chapter-title">' + ch.title + '</div>'
        + '<div class="chapter-desc">' + ch.description + '</div>'
        + '<div class="chapter-progress">'
        + '  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:' + pct + '%;background:' + ch.color + '"></div></div>'
        + '  <span>' + pct + '%</span>'
        + '</div>'
        + '<div class="chapter-card-count">' + mastered + ' / ' + totalCards + ' mastered</div>'
        + '</div>';
    }

    _els.chapterGrid.innerHTML = html;

    // Attach click handlers
    var cards = _els.chapterGrid.querySelectorAll(".chapter-card");
    for (var k = 0; k < cards.length; k++) {
      cards[k].addEventListener("click", function() {
        Router.navigate("#quiz/" + this.getAttribute("data-chapter"));
      });
    }
  }

  // === Fuzzy Matching ===

  function _levenshtein(a, b) {
    var matrix = [];
    for (var i = 0; i <= b.length; i++) { matrix[i] = [i]; }
    for (var j = 0; j <= a.length; j++) { matrix[0][j] = j; }
    for (var i2 = 1; i2 <= b.length; i2++) {
      for (var j2 = 1; j2 <= a.length; j2++) {
        if (b.charAt(i2 - 1) === a.charAt(j2 - 1)) {
          matrix[i2][j2] = matrix[i2 - 1][j2 - 1];
        } else {
          matrix[i2][j2] = Math.min(
            matrix[i2 - 1][j2 - 1] + 1,
            matrix[i2][j2 - 1] + 1,
            matrix[i2 - 1][j2] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  function _normalize(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/[\u{1F000}-\u{1FFFF}]/gu, "")
      .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, "")
      .replace(/\s*\(.*?\)\s*/g, " ")
      .replace(/\s*\u2014.*$/g, "")
      .replace(/[^\w\s\u00C0-\u024F]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function _fuzzyMatch(userAnswer, expectedAnswer) {
    var a = _normalize(userAnswer);
    var b = _normalize(expectedAnswer);
    if (!a || !b) return false;
    if (a === b) return true;
    var maxLen = Math.max(a.length, b.length);
    if (maxLen === 0) return true;
    var distance = _levenshtein(a, b);
    var similarity = 1 - (distance / maxLen);
    return similarity >= 0.8;
  }

  function _getExpectedAnswer(card) {
    if (card.type === "fill-blank") {
      return { primary: card.answer, alternates: card.acceptAlso || [] };
    } else if (card.type === "multiple-choice") {
      return { primary: card.options[card.correctIndex], alternates: [] };
    } else {
      // term cards — use the back field
      return { primary: card.back, alternates: [] };
    }
  }

  // === Timer ===

  function _startTimer() {
    _timerSeconds = TIMER_DURATION;
    _els.timerBar.style.display = "flex";
    _els.timerFill.style.width = "100%";
    _els.timerFill.className = "timer-bar-fill";
    _els.timerText.textContent = _timerSeconds + "s";

    _timerInterval = setInterval(function() {
      _timerSeconds--;
      _els.timerText.textContent = _timerSeconds + "s";

      var pct = (_timerSeconds / TIMER_DURATION) * 100;
      _els.timerFill.style.width = pct + "%";

      if (_timerSeconds <= 5) {
        _els.timerFill.className = "timer-bar-fill timer-danger";
      } else if (_timerSeconds <= 10) {
        _els.timerFill.className = "timer-bar-fill timer-warning";
      }

      if (_timerSeconds <= 0) {
        _stopTimer();
        _onTimerExpire();
      }
    }, 1000);
  }

  function _stopTimer() {
    if (_timerInterval) {
      clearInterval(_timerInterval);
      _timerInterval = null;
    }
  }

  function _onTimerExpire() {
    if (_cardLocked) return;
    _cardLocked = true;
    _showResult(false);
  }

  // === Unified Answer Checking ===

  function _checkAnswer() {
    if (_cardLocked) return;

    var card = QuizEngine.getCurrentCard();
    if (!card) return;

    var userAnswer = _els.answerInput.value.trim();
    if (!userAnswer) return;

    _cardLocked = true;
    _stopTimer();

    var expected = _getExpectedAnswer(card);
    var correct = _fuzzyMatch(userAnswer, expected.primary);

    // Check alternates if primary didn't match
    if (!correct && expected.alternates.length > 0) {
      for (var i = 0; i < expected.alternates.length; i++) {
        if (_fuzzyMatch(userAnswer, expected.alternates[i])) {
          correct = true;
          break;
        }
      }
    }

    _showResult(correct);
  }

  function _giveUp() {
    if (_cardLocked) return;
    _cardLocked = true;
    _stopTimer();
    _showResult(false);
  }

  function _showResult(correct) {
    // Flip the card with colored border
    _els.flashcard.classList.add("flipped");
    _els.flashcard.classList.add(correct ? "answer-correct" : "answer-wrong");

    // Hide answer controls
    _els.answerControls.style.display = "none";
    _els.timerBar.style.display = "none";

    // Disable input
    _els.answerInput.disabled = true;

    // Submit result to quiz engine
    var result = correct ? "correct" : "wrong";
    QuizEngine.submitResult(result);

    // Auto-advance after delay (longer for wrong so user can read the answer)
    var delay = correct ? 1200 : 2000;
    setTimeout(function() {
      _advanceOrFinish();
    }, delay);
  }

  // === Card Rendering (unified for all card types) ===

  function renderCard(card, sessionInfo) {
    if (!card) return;

    _cardLocked = false;
    _stopTimer();

    // Reset flashcard visual state
    _els.flashcard.classList.remove("flipped", "answer-correct", "answer-wrong",
      "flash-correct", "flash-wrong");

    // Set content
    _els.subcategory.textContent = card.subcategory || "";
    _els.frontContent.textContent = card.front;
    _els.backContent.textContent = card.back;
    _els.hint.textContent = card.hint || "";
    _els.hint.classList.remove("visible");
    _els.notes.textContent = card.notes || "";

    // Update progress header
    if (sessionInfo) {
      _els.quizProgress.textContent = "Card " + sessionInfo.current + " / " + sessionInfo.total;
      _els.quizScore.textContent = "Score: " + sessionInfo.score;
    }

    // Show unified answer controls
    _els.answerControls.style.display = "flex";
    _els.answerInput.value = "";
    _els.answerInput.disabled = false;
    _els.answerInput.focus();

    // Timer mode check
    var settings = Gamification.getSettings();
    if (settings.timerMode) {
      _els.btnDontKnow.style.display = "none";
      _startTimer();
    } else {
      _els.btnDontKnow.style.display = "inline-block";
      _els.timerBar.style.display = "none";
    }
  }

  function _advanceOrFinish() {
    var next = QuizEngine.nextCard();
    if (next) {
      renderCard(next, QuizEngine.getSessionInfo());
    } else {
      Router.navigate("#results");
    }
  }

  // === Results Screen ===

  function renderResults(session) {
    if (!session) {
      _els.resultsContent.innerHTML = '<p>No session data.</p>';
      return;
    }

    var correct = 0, wrong = 0;
    for (var i = 0; i < session.results.length; i++) {
      if (session.results[i].result === "correct") correct++;
      else wrong++;
    }

    var total = session.results.length;
    var pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    var isPerfect = total > 0 && correct === total;

    var titleText = isPerfect ? "Perfect Score!" : pct >= 70 ? "Great Job!" : pct >= 40 ? "Keep Practicing!" : "Keep Going!";

    var html = '<div class="results-card">'
      + '<div class="results-title">' + titleText + '</div>'
      + '<div class="results-stats">'
      + '  <div class="results-stat"><div class="results-stat-value" style="color:var(--color-success)">' + correct + '</div><div class="results-stat-label">Correct</div></div>'
      + '  <div class="results-stat"><div class="results-stat-value" style="color:var(--color-danger)">' + wrong + '</div><div class="results-stat-label">Missed</div></div>'
      + '</div>'
      + '<div class="results-xp">+' + session.xpEarned + ' XP earned</div>'
      + '<div class="results-buttons">'
      + '  <button class="btn-primary" onclick="Router.navigate(\'#quiz/' + session.chapterId + '\')">Play Again</button>'
      + '  <button class="btn-secondary" onclick="Router.navigate(\'#home\')">Back to Chapters</button>'
      + '</div>'
      + '</div>';

    _els.resultsContent.innerHTML = html;
  }

  // === Stats Screen ===

  function renderStats() {
    var progress = Gamification.getProgress();
    var totalCards = 0;
    var totalMastered = 0;

    for (var i = 0; i < CHAPTERS_META.length; i++) {
      var ch = CHAPTERS_META[i];
      var data = CHAPTER_DATA[ch.id];
      if (data) totalCards += data.cards.length;
      var cp = progress.chapterProgress[ch.id];
      if (cp && cp.cardHistory) {
        var ids = Object.keys(cp.cardHistory);
        for (var j = 0; j < ids.length; j++) {
          if (cp.cardHistory[ids[j]].correct >= 3) totalMastered++;
        }
      }
    }

    var totalSessions = 0;
    var chapterKeys = Object.keys(progress.chapterProgress);
    for (var k = 0; k < chapterKeys.length; k++) {
      totalSessions += progress.chapterProgress[chapterKeys[k]].totalSessions || 0;
    }

    var html = '<h1>Your Stats</h1>';

    // Overview
    html += '<div class="stats-section"><h2>Overview</h2><div class="stats-grid">'
      + '<div class="stat-item"><div class="stat-item-value">' + progress.level + '</div><div class="stat-item-label">Level</div></div>'
      + '<div class="stat-item"><div class="stat-item-value">' + progress.xp + '</div><div class="stat-item-label">Total XP</div></div>'
      + '<div class="stat-item"><div class="stat-item-value">' + progress.streak.current + '</div><div class="stat-item-label">Current Streak</div></div>'
      + '<div class="stat-item"><div class="stat-item-value">' + progress.streak.longest + '</div><div class="stat-item-label">Longest Streak</div></div>'
      + '<div class="stat-item"><div class="stat-item-value">' + totalSessions + '</div><div class="stat-item-label">Sessions</div></div>'
      + '<div class="stat-item"><div class="stat-item-value">' + totalMastered + ' / ' + totalCards + '</div><div class="stat-item-label">Cards Mastered</div></div>'
      + '</div></div>';

    // Achievements
    var allAchievements = Gamification.getAllAchievements();
    html += '<div class="stats-section"><h2>Achievements</h2><div class="achievements-grid">';
    for (var a = 0; a < allAchievements.length; a++) {
      var ach = allAchievements[a];
      var unlocked = Gamification.isAchievementUnlocked(ach.id);
      html += '<div class="achievement-item' + (unlocked ? "" : " locked") + '">'
        + '<div class="achievement-icon">' + ach.icon + '</div>'
        + '<div class="achievement-info">'
        + '  <div class="achievement-title">' + ach.title + '</div>'
        + '  <div class="achievement-desc">' + ach.desc + '</div>'
        + '</div></div>';
    }
    html += '</div></div>';

    _els.statsContent.innerHTML = html;
  }

  // === Settings Screen ===

  function renderSettings() {
    var settings = Gamification.getSettings();

    var html = '<h1>Settings</h1>'
      + '<div class="settings-group"><h2>Quiz Settings</h2>'
      + '<div class="setting-row">'
      + '  <div><div class="setting-label">Cards per session</div><div class="setting-desc">How many cards in each quiz round</div></div>'
      + '  <div style="display:flex;align-items:center;gap:0.5rem"><input type="range" id="setting-cards" min="5" max="50" step="5" value="' + settings.cardsPerSession + '"><span id="setting-cards-val">' + settings.cardsPerSession + '</span></div>'
      + '</div>'
      + '<div class="setting-row">'
      + '  <div><div class="setting-label">Timer mode</div><div class="setting-desc">15-second countdown per card</div></div>'
      + '  <label class="toggle-switch">'
      + '    <input type="checkbox" id="setting-timer"' + (settings.timerMode ? ' checked' : '') + '>'
      + '    <span class="toggle-slider"></span>'
      + '  </label>'
      + '</div>'
      + '</div>'
      + '<div class="settings-group"><h2>Data</h2>'
      + '<div class="setting-row">'
      + '  <div><div class="setting-label">Reset all progress</div><div class="setting-desc">Clear XP, streaks, and card history</div></div>'
      + '  <button class="btn-wrong" id="btn-reset-progress">Reset</button>'
      + '</div>'
      + '</div>';

    _els.settingsContent.innerHTML = html;

    // Wire up settings controls
    var rangeEl = document.getElementById("setting-cards");
    var rangeVal = document.getElementById("setting-cards-val");
    rangeEl.addEventListener("input", function() {
      rangeVal.textContent = this.value;
      Gamification.updateSettings({ cardsPerSession: parseInt(this.value) });
    });

    document.getElementById("setting-timer").addEventListener("change", function() {
      Gamification.updateSettings({ timerMode: this.checked });
    });

    document.getElementById("btn-reset-progress").addEventListener("click", function() {
      if (confirm("Are you sure? This will erase all your progress, XP, streaks, and achievements.")) {
        Gamification.resetProgress();
        _updateStatsBar();
        showToast("Reset", "All progress has been cleared.", "");
      }
    });
  }

  // === Toast ===

  function showToast(title, desc, icon) {
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = '<div class="toast-icon">' + (icon || "") + '</div>'
      + '<div class="toast-text"><div class="toast-title">' + title + '</div>'
      + '<div class="toast-desc">' + desc + '</div></div>';
    _els.toastContainer.appendChild(toast);

    setTimeout(function() {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3500);
  }

  // === XP Float Animation ===

  function showXPFloat(amount) {
    if (amount <= 0) return; // Don't show float for 0 XP
    var el = document.createElement("div");
    el.className = "xp-float";
    el.textContent = "+" + amount + " XP";
    el.style.left = "50%";
    el.style.top = "50%";
    document.body.appendChild(el);
    setTimeout(function() {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1600);
  }

  // === Init ===

  function init() {
    _cache();
    _updateStatsBar();

    // Wire up quiz controls
    _els.btnBack.addEventListener("click", function() {
      _stopTimer();
      Router.navigate("#home");
    });

    _els.btnSubmit.addEventListener("click", _checkAnswer);

    _els.answerInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") _checkAnswer();
    });

    _els.btnDontKnow.addEventListener("click", _giveUp);
  }

  return {
    init: init,
    renderChapterGrid: renderChapterGrid,
    renderCard: renderCard,
    renderResults: renderResults,
    renderStats: renderStats,
    renderSettings: renderSettings,
    updateStatsBar: _updateStatsBar,
    showToast: showToast,
    showXPFloat: showXPFloat
  };
})();
