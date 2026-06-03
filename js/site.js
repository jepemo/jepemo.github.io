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

  const learningViewRoot = document.querySelector("[data-learning-view-root]");
  if (learningViewRoot) {
    const viewStorageKey = "mystuff-cli:learning-view";
    const views = [
      ...learningViewRoot.querySelectorAll("[data-learning-view]"),
    ];
    const buttons = [
      ...learningViewRoot.querySelectorAll("[data-learning-view-button]"),
    ];
    const viewNames = new Set(views.map((view) => view.dataset.learningView));
    const defaultView = viewNames.has("classifications")
      ? "classifications"
      : views[0]?.dataset.learningView;
    const storedView = localStorage.getItem(viewStorageKey);
    const hashView = window.location.hash.replace(/^#/, "");

    const setLearningView = (viewName, syncUrl = false) => {
      if (!viewNames.has(viewName)) {
        return;
      }

      for (const view of views) {
        view.hidden = view.dataset.learningView !== viewName;
      }

      for (const button of buttons) {
        const isActive = button.dataset.learningViewButton === viewName;
        button.setAttribute("aria-pressed", String(isActive));
      }

      localStorage.setItem(viewStorageKey, viewName);

      if (syncUrl) {
        const url = new URL(window.location);
        url.hash = viewName === defaultView ? "" : viewName;
        history.replaceState(null, "", url);
      }
    };

    setLearningView(
      viewNames.has(hashView)
        ? hashView
        : viewNames.has(storedView)
          ? storedView
          : defaultView,
    );

    for (const button of buttons) {
      button.addEventListener("click", () => {
        setLearningView(button.dataset.learningViewButton, true);
      });
    }

    window.addEventListener("hashchange", () => {
      const nextView = window.location.hash.replace(/^#/, "");
      if (viewNames.has(nextView)) {
        setLearningView(nextView);
      }
    });
  }

  const readModeToggle = document.querySelector("[data-read-mode-toggle]");
  if (readModeToggle) {
    const readModeStorageKey = "mystuff-cli:read-mode";

    const setReadMode = (enabled) => {
      if (enabled) {
        root.dataset.readMode = "on";
      } else {
        delete root.dataset.readMode;
      }

      localStorage.setItem(readModeStorageKey, enabled ? "on" : "off");
      readModeToggle.setAttribute("aria-pressed", String(enabled));
      readModeToggle.setAttribute(
        "aria-label",
        enabled ? "Exit read mode" : "Enter read mode",
      );
      readModeToggle.textContent = enabled ? "EXIT" : "READ";
    };

    setReadMode(localStorage.getItem(readModeStorageKey) === "on");

    readModeToggle.addEventListener("click", () => {
      setReadMode(root.dataset.readMode !== "on");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && root.dataset.readMode === "on") {
        setReadMode(false);
      }
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
