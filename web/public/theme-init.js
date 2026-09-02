// Legacy static file — theme init now inlined via app/(site)/layout.tsx
// (lib/theme-init-script.ts). Kept for bookmarks; not loaded by the app.
(function () {
  try {
    var t = localStorage.getItem("stackgen-theme");
    document.documentElement.dataset.theme =
      t === "light" || t === "dark" ? t : "dark";
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
