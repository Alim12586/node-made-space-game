// Select the canvas and set up context
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');

// Game variables
let spaceship = { x: 375, y: 550, width: 50, height: 20 };
let bullets = [];
let enemies = [];
let score = 0;

// Key states
let keys = {};

// Event listeners for key presses
document.addEventListener('keydown', (e) => (keys[e.key] = true));
document.addEventListener('keyup', (e) => (keys[e.key] = false));

// Create enemies
function spawnEnemies() {
  for (let i = 0; i < 5; i++) {
    enemies.push({ x: i * 150 + 50, y: 50, width: 40, height: 20 });
  }
}

// Draw spaceship
function drawSpaceship() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

// Draw bullets
function drawBullets() {
  ctx.fillStyle = 'red';
  bullets.forEach((bullet) => {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    bullet.y -= 5; // Move bullet up
  });
  bullets = bullets.filter((bullet) => bullet.y > 0); // Remove off-screen bullets
}

// Draw enemies
function drawEnemies() {
  ctx.fillStyle = 'green';
  enemies.forEach((enemy) => {
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    enemy.y += 1; // Move enemy down
  });
  enemies = enemies.filter((enemy) => enemy.y < canvas.height); // Remove off-screen enemies
}

// Check collisions
function checkCollisions() {
  bullets.forEach((bullet, bIndex) => {
    enemies.forEach((enemy, eIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        bullets.splice(bIndex, 1); // Remove bullet
        enemies.splice(eIndex, 1); // Remove enemy
        score += 10; // Increase score
      }
    });
  });
}

// Update spaceship position
function updateSpaceship() {
  if (keys['ArrowLeft'] && spaceship.x > 0) spaceship.x -= 5;
  if (keys['ArrowRight'] && spaceship.x < canvas.width - spaceship.width) spaceship.x += 5;
  if (keys[' ']) {
    // Fire bullet
    bullets.push({ x: spaceship.x + 20, y: spaceship.y, width: 10, height: 20 });
    keys[' '] = false; // Prevent continuous firing
  }
}

// Display score
function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  drawSpaceship();
  drawBullets();
  drawEnemies();
  checkCollisions();
  updateSpaceship();
  drawScore();
  requestAnimationFrame(gameLoop); // Loop
}

// Initialize game
spawnEnemies();
gameLoop();