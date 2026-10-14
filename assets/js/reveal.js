/* ============================================================
   REVEAL — one-shot scroll entrance for .reveal elements.
   The base stylesheet only hides these under html.js, so content
   is fully visible if this file never loads.
   ============================================================ */

(function () {
  "use strict";

  var items = document.querySelectorAll(".reveal");

  if (!items.length) {
    return;
  }

  var showAll = function () {
    items.forEach(function (item) {
      item.classList.add("is-in");
    });
  };

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reduced.matches || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, self) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-in");
        self.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
