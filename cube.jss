// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const carWidth = 40;
const carHeight = 60;
let carX = (canvas.width - carWidth) / 2;
let carY = canvas.height - carHeight - 20;
let carSpeed = 5;
let leftPressed = false;
let rightPressed = false;
let obstacles = [];
let score = 0;
let gameOver = false;

// Key event listeners for car movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = true;
    if (e.key === 'ArrowRight') rightPressed = true;
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = false;
    if (e.key === 'ArrowRight') rightPressed = false;
});

// Car object
function drawCar() {
    ctx.fillStyle = 'Pink';
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

// Generate random obstacles
function generateObstacles() {
    if (Math.random() < 0.03) {
        const obstacleWidth = 40 + Math.random() * 60;
        const obstacleX = Math.random() * (canvas.width - obstacleWidth);
        obstacles.push({
            x: obstacleX,
            y: -60,
            width: obstacleWidth,
            height: 60,
            speed: 3 + Math.random() * 2
        });
    }
}

// Draw obstacles and check for collisions
function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        ctx.fillStyle = 'purple';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        obstacle.y += obstacle.speed;

        // Collision detection
        if (
            carX < obstacle.x + obstacle.width &&
            carX + carWidth > obstacle.x &&
            carY < obstacle.y + obstacle.height &&
            carY + carHeight > obstacle.y
        ) {
            gameOver = true;
        }

        if (obstacle.y > canvas.height) {
            obstacles.splice(i, 1);
            score++;
        }
    }
}

// Update the game state
function update() {
    if (gameOver) {
        // Set the font size and style
        ctx.fillStyle = 'black';
        ctx.font = '60px Arial';
        const text = 'Game Over! Score: ' + score;
        
        // Measure the text width and height to center it
        const textWidth = ctx.measureText(text).width;
        const textHeight = 60; // font size is 60px, so the height is roughly that

        // Center the text both horizontally and vertically
        const x = (canvas.width - textWidth) / 2;
        const y = (canvas.height - textHeight) / 2;

        // Display the "Game Over" message
        ctx.fillText(text, x, y);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move car
    if (leftPressed && carX > 0) {
        carX -= carSpeed;
    }
    if (rightPressed && carX < canvas.width - carWidth) {
        carX += carSpeed;
    }

    generateObstacles();
    drawCar();
    drawObstacles();

    // Display the score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    requestAnimationFrame(update);
}

// Start the game loop
update();
