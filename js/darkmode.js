const toggle = document.getElementById("darkmode-toggle");

function applyLabel() {
  const light = document.body.classList.contains("light-mode");
  toggle.textContent = light ? "🌙 Modo Escuro" : "☀️ Modo Claro";
  toggle.setAttribute("aria-pressed", String(light));
}

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}
applyLabel();

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-mode") ? "light" : "dark"
  );
  applyLabel();
});
