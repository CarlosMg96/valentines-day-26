// Efecto de corazones flotando en el fondo
document.addEventListener('DOMContentLoaded', function createFloatingHearts() {
  const heartColors = ['#FF6F91', '#deb0d0', '#ffe066', '#e1aaff', '#ff9f1c', '#ff4d6d', '#ffb3c6', '#d0f4de'];
  const numHearts = 18;
  const container = document.createElement('div');
  container.className = 'floating-hearts-bg';
  document.body.appendChild(container);

  for (let i = 0; i < numHearts; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = (Math.random() * 6) + 's';
    heart.style.animationDuration = (5 + Math.random() * 6) + 's';
    heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.textContent = '❤';
    container.appendChild(heart);
  }
});