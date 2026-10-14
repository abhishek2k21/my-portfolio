/* ============================================================
   NAV — mobile menu + active-section highlighting
   ============================================================ */

(function () {
  "use strict";

  /* ---------- mobile menu ---------- */

  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.getElementById("site-nav");
  var DESKTOP = "(min-width: 861px)";

  if (toggle && nav) {
    var openMenu = function () {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    var closeMenu = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* any link tap inside the panel closes it */
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) {
        return;
      }
      if (nav.contains(event.target) || toggle.contains(event.target)) {
        return;
      }
      closeMenu();
    });

    var wide = window.matchMedia(DESKTOP);
    if (wide.addEventListener) {
      wide.addEventListener("change", function (event) {
        if (event.matches) {
          closeMenu();
        }
      });
    }
  }

  /* ---------- active section ---------- */

  var links = Array.prototype.slice.call(
    document.querySelectorAll(".nav__link[href^='#']"),
  );

  if (!links.length) {
    return;
  }

  var sections = [];

  links.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    var section = document.getElementById(id);
    if (section) {
      sections.push({ id: id, el: section, link: link });
    }
  });

  if (!sections.length) {
    return;
  }

  var OFFSET = 96;
  var frame = null;

  function highlight() {
    frame = null;

    var y = window.scrollY;
    var active = null;

    sections.forEach(function (entry) {
      var top = entry.el.getBoundingClientRect().top + y;
      if (top - OFFSET <= y) {
        active = entry;
      }
    });

    /* at the very bottom of the page, force the last item */
    var atBottom =
      window.innerHeight + y >= document.documentElement.scrollHeight - 2;
    if (atBottom) {
      active = sections[sections.length - 1];
    }

    sections.forEach(function (entry) {
      if (entry === active) {
        entry.link.setAttribute("aria-current", "true");
      } else {
        entry.link.removeAttribute("aria-current");
      }
    });
  }

  function onScroll() {
    if (frame === null) {
      frame = window.requestAnimationFrame(highlight);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  highlight();
})();
