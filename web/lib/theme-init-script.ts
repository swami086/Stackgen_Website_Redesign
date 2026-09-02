/** Pre-hydration theme IIFE — keep in sync with layout SSR `data-theme="dark"`. */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("stackgen-theme");document.documentElement.dataset.theme=t==="light"||t==="dark"?t:"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;
