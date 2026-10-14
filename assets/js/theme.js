/* ============================================================
   THEME — light/dark toggle with persistence.
   The initial theme is applied by an inline script in <head> so
   the page never flashes the wrong palette.
   ============================================================ */

(function () {
  "use strict";

  var root = document.documentElement;
  var button = document.querySelector("[data-theme-toggle]");

  if (!button) {
    return;
  }

  var LIGHT = "light";
  var DARK = "dark";
  var STORAGE_KEY = "ak-theme";
  var THEME_COLORS = { light: "#f4f1ea", dark: "#0c0c0d" };

  function currentTheme() {
    return root.getAttribute("data-theme") === LIGHT ? LIGHT : DARK;
  }

  function paint(theme) {
    if (theme === LIGHT) {
      root.setAttribute("data-theme", LIGHT);
    } else {
      root.removeAttribute("data-theme");
    }

    button.setAttribute("aria-pressed", String(theme === LIGHT));
    button.setAttribute(
      "aria-label",
      theme === LIGHT ? "Switch to dark theme" : "Switch to light theme",
    );

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", THEME_COLORS[theme]);
    }
  }

  paint(currentTheme());

  button.addEventListener("click", function () {
    var next = currentTheme() === LIGHT ? DARK : LIGHT;
    paint(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      /* storage disabled — the toggle still works for this visit */
    }
  });
})();
