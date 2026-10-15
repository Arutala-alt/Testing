const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const themeButton = document.querySelector(".theme-toggle");
const themeLabel = themeButton.querySelector(".theme-toggle-label");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let savedTheme = null;

try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch {
  savedTheme = null;
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(isDark));
  themeButton.setAttribute("aria-label", `Aktifkan tema ${isDark ? "terang" : "gelap"}`);
  themeLabel.textContent = `Tema ${isDark ? "terang" : "gelap"}`;
  themeMeta.setAttribute("content", isDark ? "#121a16" : "#f6f5f0");
}

applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

themeButton.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  savedTheme = nextTheme;
  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch {
    // The current page can still use the selected theme when storage is unavailable.
  }
});

systemTheme.addEventListener("change", (event) => {
  if (!savedTheme) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  navigation.classList.toggle("is-open", isOpen);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});
