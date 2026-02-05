const missies = [
  "Spring 10 keer op en neer!",
  "Doe 15 squats!",
  "Loop 5 minuten rond!",
  "Maak een mini-dansje van 20 seconden!",
  "Doe 10 push-ups!",
  "Strek je armen en benen gedurende 1 minuut!",
  "Ren op de plek voor 1 minuut!",
  "Doe 10 jumping jacks!",
  "Doe een plank van 30 seconden!",
  "Drink een groot glas water en rek je daarna uit!"
];

const missieDiv = document.getElementById('missie');
const knop = document.getElementById('nieuweMissie');
const timerDiv = document.getElementById('timer');

// LocalStorage keys
const storageKey = 'miniMissies';
const maxClicks = 5;
const cooldownHours = 12;

// Laad data uit localStorage
let data = JSON.parse(localStorage.getItem(storageKey)) || {
  clicks: 0,
  lastReset: Date.now()
};

// Reset elke dag of na 12 uur cooldown
function checkReset() {
  const now = Date.now();
  if (data.clicks >= maxClicks && now - data.lastReset >= cooldownHours * 60 * 60 * 1000) {
    data.clicks = 0;
    data.lastReset = now;
    updateLocalStorage();
  }
}
checkReset();

// Update LocalStorage
function updateLocalStorage() {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

// Timer functie
function startCooldown() {
  knop.disabled = true;
  const endTime = data.lastReset + cooldownHours * 60 * 60 * 1000;
  
  const interval = setInterval(() => {
    const now = Date.now();
    let diff = endTime - now;

    if (diff <= 0) {
      clearInterval(interval);
      timerDiv.textContent = "";
      data.clicks = 0;
      data.lastReset = Date.now();
      updateLocalStorage();
      knop.disabled = false;
      missieDiv.textContent = "Klik op de knop voor je missie!";
      return;
    }

    const hours = Math.floor(diff / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);

    timerDiv.textContent = `Nieuwe missie beschikbaar over ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

// Nieuwe missie
knop.addEventListener('click', () => {
  checkReset();
  if (data.clicks < maxClicks) {
    const index = Math.floor(Math.random() * missies.length);
    missieDiv.textContent = missies[index];
    data.clicks += 1;
    data.lastReset = Date.now();
    updateLocalStorage();

    if (data.clicks >= maxClicks) {
      startCooldown();
    }
  }
});

// Start cooldown timer als max clicks bereikt
if (data.clicks >= maxClicks) {
  startCooldown();
}
