(function () {
  // Default must match layout.tsx SSR `data-theme="dark"` so empty storage
  // does not flip cream→dark (or the reverse) across hydration.
  try {
    var t = localStorage.getItem("stackgen-theme");
    document.documentElement.dataset.theme =
      t === "light" || t === "dark" ? t : "dark";
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
