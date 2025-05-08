const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Grainy noise texture
function drawNoise() {
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const shade = Math.random() * 40;
    data[i] = data[i + 1] = data[i + 2] = shade;
    data[i + 3] = 10; // Very light transparency
  }
  ctx.putImageData(imageData, 0, 0);
}

// Blob class
class Blob {
  constructor(x, y, radius, color) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.5 + Math.random() * 0.2;
  }

  update(mouse) {
    this.angle += this.speed * 0.01;
    this.x = this.baseX + Math.cos(this.angle) * 80;
    this.y = this.baseY + Math.sin(this.angle) * 80;

    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 150) {
      const effect = Math.sin((150 - dist) / 150 * Math.PI) * 20;
      this.radius = this.baseRadius + effect;
    } else {
      this.radius = this.baseRadius;
    }
  }

  draw(ctx) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 10, this.x, this.y, this.radius);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  init() {
    this.baseRadius = this.radius;
  }
}

// Setup blobs
const blobs = [
  new Blob(width * 0.3, height * 0.4, 150, 'rgba(255, 100, 0, 0.6)'),
  new Blob(width * 0.5, height * 0.6, 130, 'rgba(255, 140, 0, 0.5)')
];
blobs.forEach(b => b.init());

const mouse = { x: -9999, y: -9999 };
canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
canvas.addEventListener('mouseleave', () => {
  mouse.x = -9999;
  mouse.y = -9999;
});

// Animation loop
function animate() {
  ctx.clearRect(0, 0, width, height);

  blobs.forEach(blob => {
    blob.update(mouse);
    blob.draw(ctx);
  });

  drawNoise();
  requestAnimationFrame(animate);
}

animate();











// Tile Image reveal effect





const imageUrl = 'image.jpg'; // Replace with your image
  const imageBox = document.getElementById('imageBox');
  const revealText = document.getElementById('revealText');

  const tileHeight = 20;
  const totalHeight = 500;
  const numTiles = totalHeight / tileHeight;

  for (let i = 0; i < numTiles; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.style.top = `${i * tileHeight}px`;
    tile.style.height = `${tileHeight}px`;
    tile.style.backgroundImage = `url(${imageUrl})`;
    tile.style.backgroundPosition = `center -${i * tileHeight}px`;
    tile.style.transitionDelay = `${i * 0.05}s`;
    imageBox.appendChild(tile);
  }

  revealText.addEventListener('click', () => {
    imageBox.classList.toggle('revealed');
  });