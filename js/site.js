(() => {
  const root = document.documentElement;
  const storageKey = "mystuff-cli:theme";
  const legacyTheme = localStorage.getItem("mystuff-learn:theme");
  const storedTheme = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const initialTheme =
    storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : legacyTheme === "light" || legacyTheme === "dark"
        ? legacyTheme
        : prefersDark
          ? "dark"
          : "light";

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem(storageKey, theme);
    const toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      );
    }
  };

  applyTheme(initialTheme);

  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  for (const form of document.querySelectorAll(".quiz")) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = [...form.querySelectorAll("input:checked")]
        .map((input) => input.value)
        .sort();
      const correct = JSON.parse(form.dataset.correct).sort();
      const ok = JSON.stringify(selected) === JSON.stringify(correct);
      form.classList.toggle("is-correct", ok);
      form.classList.toggle("is-wrong", !ok);
      form.querySelector(".feedback").textContent = ok ? "Correct." : "Not yet.";
    });
  }
})();
