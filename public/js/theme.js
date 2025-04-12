document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const htmlEl = document.documentElement;

  if (!toggleBtn) return;

  const applyTheme = (theme) => {
    htmlEl.setAttribute("data-bs-theme", theme);

    if (theme === "dark") {
      toggleBtn.textContent = "☀️ Light Theme";
      toggleBtn.classList.remove("btn-outline-dark");
      toggleBtn.classList.add("btn-outline-light");
    } else {
      toggleBtn.textContent = "🌙 Dark Theme";
    }
  };

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  toggleBtn.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-bs-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
});
