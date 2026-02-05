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

knop.addEventListener('click', () => {
  const index = Math.floor(Math.random() * missies.length);
  missieDiv.textContent = missies[index];
});
