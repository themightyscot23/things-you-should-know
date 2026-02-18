// js/router.js
// Minimal hash-based router — no dependencies.

var Router = (function() {
  "use strict";

  var _routes = {};

  function _handleHashChange() {
    var hash = window.location.hash || "#home";
    var parts = hash.split("/");
    var route = parts[0];
    var param = parts.slice(1).join("/") || null;

    // Hide all screens
    var screens = document.querySelectorAll(".screen");
    for (var i = 0; i < screens.length; i++) {
      screens[i].style.display = "none";
    }

    if (_routes[route]) {
      _routes[route](param);
    } else {
      _routes["#home"]();
    }
  }

  return {
    register: function(hash, handler) {
      _routes[hash] = handler;
    },

    init: function() {
      window.addEventListener("hashchange", _handleHashChange);
      _handleHashChange();
    },

    navigate: function(hash) {
      window.location.hash = hash;
    }
  };
})();
