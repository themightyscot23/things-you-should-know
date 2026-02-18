// js/app.js
// Application entry point — wires routes and initializes modules.

(function() {
  "use strict";

  // Initialize modules
  Gamification.init();
  UI.init();

  // Register routes
  Router.register("#home", function() {
    document.getElementById("screen-home").style.display = "block";
    UI.renderChapterGrid();
  });

  Router.register("#quiz", function(chapterId) {
    if (!chapterId || !CHAPTER_DATA[chapterId]) {
      Router.navigate("#home");
      return;
    }
    document.getElementById("screen-quiz").style.display = "block";
    QuizEngine.startSession(chapterId);
    var card = QuizEngine.getCurrentCard();
    if (card) {
      UI.renderCard(card, QuizEngine.getSessionInfo());
    } else {
      // No cards in this chapter
      UI.showToast("No Cards", "This chapter has no cards yet.", "");
      Router.navigate("#home");
    }
  });

  Router.register("#results", function() {
    document.getElementById("screen-results").style.display = "block";
    var session = QuizEngine.endSession();
    UI.renderResults(session);
  });

  Router.register("#stats", function() {
    document.getElementById("screen-stats").style.display = "block";
    UI.renderStats();
  });

  Router.register("#settings", function() {
    document.getElementById("screen-settings").style.display = "block";
    UI.renderSettings();
  });

  // Start the router
  Router.init();
})();
