const toggle = document.getElementById("darkmode-toggle");

function applyLabel() {
  const dark = document.body.classList.contains("dark-mode");
  toggle.textContent = dark ? "☀️ Light mode" : "🌙 Dark mode";
  toggle.setAttribute("aria-pressed", String(dark));
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}
applyLabel();

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
  applyLabel();
});
