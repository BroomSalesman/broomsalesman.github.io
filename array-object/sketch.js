let player;
let obstacles = [];
let trackWidth = 300;
let laneWidth = 100;
let numLanes = 3;
let gravity = 1;
let jumpStrength = -15;
let speed = 5;
let score = 0;

function setup() {
  createCanvas(800, 600);
  player = createPlayer();
}

function draw() {
  background(135, 206, 250); // Sky blue background

  // Update and draw track
  drawTrack();
  generateObstacles();
  handleObstacles();

  // Update and draw player
  updatePlayer();
  displayPlayer();

  displayScore();
}

// Function to create player object
function createPlayer() {
  return {
    x: laneWidth / 2,
    y: height - 50,
    size: 50,
    velocityY: 0,
    lane: 1,
    isJumping: false,
  };
}

// Function to draw the track with lanes
function drawTrack() {
  for (let i = 0; i < numLanes; i++) {
    stroke(255);
    line(i * laneWidth, 0, i * laneWidth, height);
  }
}

// Update player position with jumping and gravity
function updatePlayer() {
  if (player.isJumping) {
    player.velocityY += gravity;
    player.y += player.velocityY;

    // Check if player lands on the ground
    if (player.y >= height - 50) {
      player.y = height - 50;
      player.velocityY = 0;
      player.isJumping = false;
    }
  }
}

// Display the player as a rectangle (simplified for now)
function displayPlayer() {
  fill(255, 0, 0);
  rect(player.lane * laneWidth + laneWidth / 2 - player.size / 2, player.y, player.size, player.size);
}

// Handle key input for lane-switching and jumping
function keyPressed() {
  if (keyCode === LEFT_ARROW && player.lane > 0) {
    player.lane -= 1;
  }
  if (keyCode === RIGHT_ARROW && player.lane < numLanes - 1) {
    player.lane += 1;
  }
  if (key === ' ' && !player.isJumping) {
    player.isJumping = true;
    player.velocityY = jumpStrength;
  }
}

// Generate obstacles randomly in lanes
function generateObstacles() {
  if (frameCount % 60 === 0) {
    let obstacle = {
      x: width,
      y: height - 50,
      lane: floor(random(numLanes)),
      size: 40
    };
    obstacles.push(obstacle);
  }
}

// Move and display obstacles, check for collisions
function handleObstacles() {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obstacle = obstacles[i];
    obstacle.x -= speed; // Move the obstacle left

    // Draw the obstacle as a black rectangle
    fill(0);
    rect(obstacle.x + obstacle.lane * laneWidth, obstacle.y, obstacle.size, obstacle.size);

    // Check for collision with the player
    if (
      player.lane === obstacle.lane &&
      player.y + player.size > obstacle.y &&
      player.y < obstacle.y + obstacle.size &&
      abs(player.lane * laneWidth + laneWidth / 2 - obstacle.x) < player.size / 2
    ) {
      console.log("Collision detected! Game Over.");
      noLoop(); // Stop the game loop
    }

    // Remove the obstacle if it goes off-screen
    if (obstacle.x < -obstacle.size) {
      obstacles.splice(i, 1);
      score++;
    }
  }
}

// Display the score at the top of the screen
function displayScore() {
  fill(0);
  textSize(24);
  text(`Score: ${score}`, 10, 30);
}
