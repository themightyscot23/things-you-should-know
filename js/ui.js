// js/ui.js
// DOM rendering and interactions.

var UI = (function() {
  "use strict";

  // Cached DOM elements
  var _els = {};

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
    _els.termControls = document.getElementById("term-controls");
    _els.selfGrade = document.getElementById("self-grade");
    _els.mcControls = document.getElementById("mc-controls");
    _els.mcOptions = document.getElementById("mc-options");
    _els.fillControls = document.getElementById("fill-controls");
    _els.fillInput = document.getElementById("fill-input");
    _els.btnReveal = document.getElementById("btn-reveal");
    _els.btnHint = document.getElementById("btn-hint");
    _els.btnBack = document.getElementById("btn-back");
    _els.btnCorrect = document.getElementById("btn-correct");
    _els.btnClose = document.getElementById("btn-close");
    _els.btnWrong = document.getElementById("btn-wrong");
    _els.btnSubmitAnswer = document.getElementById("btn-submit-answer");
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

  // === Flashcard Rendering ===

  var _currentCardType = "term";
  var _cardRevealed = false;

  function renderCard(card, sessionInfo) {
    if (!card) return;

    _cardRevealed = false;
    _currentCardType = card.type || "term";

    // Reset flashcard state
    _els.flashcard.classList.remove("flipped", "flash-correct", "flash-wrong", "flash-close");

    // Set content
    _els.subcategory.textContent = card.subcategory || "";
    _els.frontContent.textContent = card.front;
    _els.backContent.textContent = card.back;
    _els.hint.textContent = card.hint || "";
    _els.hint.classList.remove("visible");
    _els.notes.textContent = card.notes || "";

    // Update progress
    if (sessionInfo) {
      _els.quizProgress.textContent = "Card " + sessionInfo.current + " / " + sessionInfo.total;
      _els.quizScore.textContent = "Score: " + sessionInfo.score;
    }

    // Show/hide controls based on card type
    _els.termControls.style.display = "none";
    _els.selfGrade.style.display = "none";
    _els.mcControls.style.display = "none";
    _els.fillControls.style.display = "none";

    if (_currentCardType === "term") {
      _els.termControls.style.display = "flex";
    } else if (_currentCardType === "multiple-choice") {
      _renderMCOptions(card);
      _els.mcControls.style.display = "flex";
    } else if (_currentCardType === "fill-blank") {
      _els.fillControls.style.display = "flex";
      _els.fillInput.value = "";
      _els.fillInput.className = "";
      _els.fillInput.focus();
    }
  }

  function _renderMCOptions(card) {
    var html = "";
    for (var i = 0; i < card.options.length; i++) {
      html += '<button class="mc-option" data-index="' + i + '">' + card.options[i] + '</button>';
    }
    _els.mcOptions.innerHTML = html;

    var btns = _els.mcOptions.querySelectorAll(".mc-option");
    for (var j = 0; j < btns.length; j++) {
      btns[j].addEventListener("click", function() {
        if (this.classList.contains("mc-disabled")) return;
        _handleMCSelect(parseInt(this.getAttribute("data-index")), card);
      });
    }
  }

  function _handleMCSelect(selectedIndex, card) {
    var btns = _els.mcOptions.querySelectorAll(".mc-option");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.add("mc-disabled");
      if (i === card.correctIndex) {
        btns[i].classList.add("mc-correct");
      }
      if (i === selectedIndex && i !== card.correctIndex) {
        btns[i].classList.add("mc-wrong");
      }
    }

    // Flip card to show back
    _els.flashcard.classList.add("flipped");
    _cardRevealed = true;

    var result = selectedIndex === card.correctIndex ? "correct" : "wrong";
    _flashFeedback(result);

    // Auto-advance after a delay
    setTimeout(function() {
      QuizEngine.submitResult(result);
      _advanceOrFinish();
    }, 1500);
  }

  function _handleFillSubmit() {
    var card = QuizEngine.getCurrentCard();
    if (!card) return;

    var userAnswer = _els.fillInput.value.trim();
    if (!userAnswer) return;

    var correct = userAnswer.toLowerCase() === card.answer.toLowerCase();
    if (!correct && card.acceptAlso) {
      for (var i = 0; i < card.acceptAlso.length; i++) {
        if (userAnswer.toLowerCase() === card.acceptAlso[i].toLowerCase()) {
          correct = true;
          break;
        }
      }
    }

    // Check "close" — simple Levenshtein-like check (character overlap)
    var isClose = false;
    if (!correct) {
      var overlap = _charOverlap(userAnswer.toLowerCase(), card.answer.toLowerCase());
      if (overlap > 0.6) isClose = true;
    }

    _els.fillInput.classList.add(correct ? "fill-correct" : "fill-wrong");
    _els.flashcard.classList.add("flipped");
    _cardRevealed = true;

    if (correct) {
      _flashFeedback("correct");
      setTimeout(function() {
        QuizEngine.submitResult("correct");
        _advanceOrFinish();
      }, 1200);
    } else if (isClose) {
      _flashFeedback("close");
      // Show self-grade for close answers
      _els.fillControls.style.display = "none";
      _els.selfGrade.style.display = "flex";
    } else {
      _flashFeedback("wrong");
      setTimeout(function() {
        QuizEngine.submitResult("wrong");
        _advanceOrFinish();
      }, 1500);
    }
  }

  function _charOverlap(a, b) {
    if (!a || !b) return 0;
    var matches = 0;
    var longer = a.length > b.length ? a : b;
    var shorter = a.length > b.length ? b : a;
    for (var i = 0; i < shorter.length; i++) {
      if (longer.indexOf(shorter[i]) !== -1) matches++;
    }
    return matches / longer.length;
  }

  function _advanceOrFinish() {
    var next = QuizEngine.nextCard();
    if (next) {
      renderCard(next, QuizEngine.getSessionInfo());
    } else {
      Router.navigate("#results");
    }
  }

  function revealCard() {
    if (_cardRevealed) return;
    _els.flashcard.classList.add("flipped");
    _cardRevealed = true;
    _els.termControls.style.display = "none";
    _els.selfGrade.style.display = "flex";
  }

  function showHint() {
    _els.hint.classList.add("visible");
  }

  function _flashFeedback(type) {
    _els.flashcard.classList.add("flash-" + type);
    setTimeout(function() {
      _els.flashcard.classList.remove("flash-" + type);
    }, 800);
  }

  function gradeCard(result) {
    _flashFeedback(result);
    QuizEngine.submitResult(result);

    setTimeout(function() {
      _advanceOrFinish();
    }, 400);
  }

  // === Results Screen ===

  function renderResults(session) {
    if (!session) {
      _els.resultsContent.innerHTML = '<p>No session data.</p>';
      return;
    }

    var correct = 0, close = 0, wrong = 0;
    for (var i = 0; i < session.results.length; i++) {
      if (session.results[i].result === "correct") correct++;
      else if (session.results[i].result === "close") close++;
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
      + '  <div class="results-stat"><div class="results-stat-value" style="color:var(--color-close)">' + close + '</div><div class="results-stat-label">Almost</div></div>'
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
    _els.btnReveal.addEventListener("click", revealCard);
    _els.btnHint.addEventListener("click", showHint);
    _els.btnBack.addEventListener("click", function() { Router.navigate("#home"); });

    _els.btnCorrect.addEventListener("click", function() { gradeCard("correct"); });
    _els.btnClose.addEventListener("click", function() { gradeCard("close"); });
    _els.btnWrong.addEventListener("click", function() { gradeCard("wrong"); });

    _els.btnSubmitAnswer.addEventListener("click", _handleFillSubmit);
    _els.fillInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") _handleFillSubmit();
    });

    // Flashcard click to flip (for term cards only when not yet revealed)
    _els.flashcard.addEventListener("click", function() {
      if (_currentCardType === "term" && !_cardRevealed) {
        revealCard();
      }
    });
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
