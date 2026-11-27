// Loaded in <head> so the right theme is set before the first paint.
(function () {
  var KEY = "karma-theme";
  var root = document.documentElement;

  var saved = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch (e) {}
  var prefersDark =
    window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  root.classList.toggle("dark", saved ? saved === "dark" : prefersDark);

  // Tiny pixel-art icons, one string per row ("#" = filled pixel).
  var SUN = [
    "....#....",
    ".#.....#.",
    "...###...",
    "..#####..",
    "#.#####.#",
    "..#####..",
    "...###...",
    ".#.....#.",
    "....#....",
  ];
  var MOON = [
    "...###...",
    ".####....",
    ".###.....",
    "###......",
    "###......",
    "###.....#",
    ".###...##",
    ".#######.",
    "...####..",
  ];

  function pixelSvg(rows) {
    var rects = "";
    rows.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        if (row[x] === "#")
          rects += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
      }
    });
    return (
      '<svg viewBox="0 0 ' + rows[0].length + " " + rows.length +
      '" fill="currentColor" shape-rendering="crispEdges" aria-hidden="true">' +
      rects + "</svg>"
    );
  }

  function sync() {
    var toggle = document.getElementById("tog");
    if (!toggle) return;
    var isDark = root.classList.contains("dark");
    var label = isDark ? "Switch to light mode" : "Switch to dark mode";
    toggle.innerHTML = pixelSvg(isDark ? SUN : MOON);
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
  }

  window.toggleDark = function () {
    var isDark = root.classList.toggle("dark");
    try {
      localStorage.setItem(KEY, isDark ? "dark" : "light");
    } catch (e) {}
    sync();
  };

  document.addEventListener("DOMContentLoaded", sync);
})();
