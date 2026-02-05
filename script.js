const missies = [
  "20 Jumping Jacks",
  "1 minuut planken",
  "15 Squats",
  "10 Push-ups",
  "30 sec sprinten",
  "Dans 1 minuut 💃",
  "20 Lunges",
  "15 Burpees"
];

const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const missieDiv = document.getElementById("missie");
const timerDiv = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const streakSpan = document.getElementById("streak");
const scoreSpan = document.getElementById("score");
const levelSpan = document.getElementById("level");

let rotation = 0;
const MAX = 5;
const COOLDOWN = 12 * 60 * 60 * 1000;

let data = JSON.parse(localStorage.getItem("miniMissies")) || {
  clicks: 0,
  lastReset: Date.now(),
  streak: 0,
  score: 0,
  lastDay: new Date().toDateString()
};

function save() {
  localStorage.setItem("miniMissies", JSON.stringify(data));
  updateUI();
}

function updateUI() {
  progressBar.style.width = `${(data.clicks / MAX) * 100}%`;
  streakSpan.textContent = data.streak;
  scoreSpan.textContent = data.score;
  levelSpan.textContent = Math.floor(data.score / 100) + 1;
  spinButton.disabled = data.clicks >= MAX;
}

function checkDay() {
  const today = new Date().toDateString();
  if (data.lastDay !== today) {
    data.streak = data.clicks > 0 ? data.streak + 1 : 0;
    data.clicks = 0;
    data.lastDay = today;
    data.lastReset = Date.now();
    save();
  }
}

spinButton.addEventListener("click", () => {
  checkDay();
  if (data.clicks >= MAX) return;

  rotation += Math.random() * 360 + 1440;
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    missieDiv.textContent = missies[Math.floor(Math.random() * missies.length)];
    data.clicks++;
    data.score += 20;
    data.lastReset = Date.now();
    save();
  }, 3000);
});

checkDay();
updateUI();
