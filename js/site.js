(() => {
  const root = document.documentElement;
  const valid = { skin: ["clean", "brutalist", "nerd"], theme: ["system", "light", "dark"] };
  for (const key of Object.keys(valid)) {
    const stored = localStorage.getItem(`mystuff-learn:${key}`);
    const migrated = key === "skin" && stored === "standard" ? "clean" : stored;
    const value = valid[key].includes(migrated) ? migrated : key === "skin" ? "clean" : "system";
    root.dataset[key] = value;
    if (migrated !== stored) {
      localStorage.setItem(`mystuff-learn:${key}`, value);
    }
    const select = document.querySelector(`[data-pref="${key}"]`);
    if (select) {
      select.value = value;
      select.addEventListener("change", () => {
        root.dataset[key] = select.value;
        localStorage.setItem(`mystuff-learn:${key}`, select.value);
      });
    }
  }
  for (const form of document.querySelectorAll(".quiz")) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = [...form.querySelectorAll("input:checked")].map((input) => input.value).sort();
      const correct = JSON.parse(form.dataset.correct).sort();
      const ok = JSON.stringify(selected) === JSON.stringify(correct);
      form.classList.toggle("is-correct", ok);
      form.classList.toggle("is-wrong", !ok);
      form.querySelector(".feedback").textContent = ok ? "Correct." : "Not yet.";
    });
  }
})();
