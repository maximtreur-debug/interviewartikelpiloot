// ---------------- MISSIES ----------------
const missies = [
  "20 squats + 15 push-ups",
  "30 jumping jacks + 20 sit-ups",
  "Plank 1 minuut",
  "15 burpees",
  "Ren op de plek 2 minuten",
  "20 lunges per been",
  "Sprint 100 meter of 5 rondjes",
  "High knees 1 minuut",
  "10 burpees + 20 squats",
  "Mini circuit: 15 jumping jacks, 10 push-ups, 10 squats"
];

// ---------------- ELEMENTEN ----------------
const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const missieDiv = document.getElementById("missie");
const timerDiv = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const streakDiv = document.getElementById("streak");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

// ---------------- CANVAS ----------------
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ---------------- DATA ----------------
const MAX = 5;
const COOLDOWN = 12 * 60 * 60 * 1000;
let rotation = 0;

let data = JSON.parse(localStorage.getItem("miniMissies")) || {
  clicks: 0,
  lastReset: Date.now(),
  streak: 0,
  lastDay: new Date().toDateString()
};

// ---------------- DAG & STREAK ----------------
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

// ---------------- OPSLAAN ----------------
function save() {
  localStorage.setItem("miniMissies", JSON.stringify(data));
  updateUI();
}

// ---------------- UI ----------------
function updateUI() {
  progressBar.style.width = `${(data.clicks / MAX) * 100}%`;
  streakDiv.textContent = `🔥 Streak: ${data.streak}`;
  spinButton.disabled = data.clicks >= MAX;
}

// ---------------- TIMER ----------------
function startTimer() {
  const interval = setInterval(() => {
    const left = data.lastReset + COOLDOWN - Date.now();
    if (left <= 0) {
      clearInterval(interval);
      data.clicks = 0;
      save();
      timerDiv.textContent = "";
      return;
    }
    const h = Math.floor(left / 3600000);
    const m = Math.floor((left % 3600000) / 60000);
    const s = Math.floor((left % 60000) / 1000);
    timerDiv.textContent = `Nieuw rad over ${h}u ${m}m ${s}s`;
  }, 1000);
}

// ---------------- CONFETTI ----------------
const particles = [];
for (let i = 0; i < 150; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    c: `hsl(${Math.random() * 360}, 70%, 50%)`
  });
}

function confetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += 3;
    if (p.y > canvas.height) p.y = -10;
  });
  requestAnimationFrame(confetti);
}
confetti();

// ---------------- RAD ----------------
spinButton.addEventListener("click", () => {
  checkDay();
  if (data.clicks >= MAX) return;

  rotation += Math.random() * 360 + 1440;
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    missieDiv.textContent = missies[Math.floor(Math.random() * missies.length)];
    data.clicks++;
    data.lastReset = Date.now();
    save();
    if (data.clicks >= MAX) startTimer();
  }, 3000);
});

// ---------------- START ----------------
checkDay();
updateUI();
if (data.clicks >= MAX) startTimer();
