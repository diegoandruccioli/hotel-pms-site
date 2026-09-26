// Runs before first paint (blocking, same-origin, so no CSP hash needed).
// Sets data-theme and data-contrast on <html> from the saved choice, else from the
// browser preferences. Language is never chosen from the browser; only appearance is.
(function () {
  var root = document.documentElement;

  function stored(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function media(query) {
    try {
      return matchMedia(query).matches;
    } catch (error) {
      return false;
    }
  }

  var theme = stored("theme");
  if (theme !== "light" && theme !== "dark") {
    theme = media("(prefers-color-scheme: dark)") ? "dark" : "light";
  }

  var contrast = stored("contrast");
  if (contrast !== "normal" && contrast !== "high") {
    contrast = media("(prefers-contrast: more)") ? "high" : "normal";
  }

  root.setAttribute("data-theme", theme);
  root.setAttribute("data-contrast", contrast);
})();
