const form = document.getElementById("signup-form");
const nameInput = document.getElementById("hero-name");
const nameHint = document.getElementById("name-hint");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const confirmHint = document.getElementById("confirm-hint");
const fill = document.getElementById("strength-fill");
const strengthHint = document.getElementById("strength-hint");
const success = document.getElementById("success");

const LEGENDS = ["arthas", "gandalf", "aragorn", "geralt", "link", "zelda"];

const MESSAGES = [
  "Pick a password to forge your seal.",
  "Your password is as fragile as a level 1 goblin.",
  "A fine password for a soldier, but not yet for a hero.",
  "A strong seal. Few enemies will break it.",
  "Password forged in the flames of the ancient dragon!",
];

function strengthOf(value) {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  if (score <= 1) return 1;
  if (score === 2) return 2;
  if (score <= 4) return 3;
  return 4;
}

nameInput.addEventListener("input", () => {
  const value = nameInput.value.trim().toLowerCase();
  if (LEGENDS.includes(value)) {
    nameHint.textContent = "That name already belongs to a legend. Forge your own destiny.";
    nameHint.className = "hint lore";
  } else {
    nameHint.textContent = "";
    nameHint.className = "hint";
  }
});

password.addEventListener("input", () => {
  const level = strengthOf(password.value);
  fill.dataset.level = level;
  strengthHint.textContent = MESSAGES[level];
  checkMatch();
});

function checkMatch() {
  if (confirmInput.value && confirmInput.value !== password.value) {
    confirmInput.setCustomValidity("Seals do not match.");
    confirmHint.textContent = "The seals do not match. Try again, traveler.";
    confirmHint.className = "hint error";
  } else {
    confirmInput.setCustomValidity("");
    confirmHint.textContent = "";
    confirmHint.className = "hint";
  }
}
confirmInput.addEventListener("input", checkMatch);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const hero = nameInput.value.trim();
  success.textContent = `Welcome, ${hero}. Your legend begins now.`;
  success.hidden = false;
  form.reset();
  fill.dataset.level = 0;
  strengthHint.textContent = MESSAGES[0];
});
