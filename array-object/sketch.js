// Objects and Arrays Assignment
// Labeeb Farooqi
// October 15, 2024
//
// Extra for Experts:
// - Used WEBGL

let shapes = [];
let player;
let gameOver = false;
let menu = true; // Menu state variable
let cameraControl;
let myFont;


let level = 1;
let levelTime = 30;
let levelTimer;
let spawnRate = 80;

function preload() {
  myFont = loadFont('font.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  initializeGame();
  cameraControl = createCamera();
}

function draw() {
  if (menu) {
    drawMenu();
  }
  else {
    background(200);
    setCameraPosition();
    drawGround();
    displayPlayer();
    movePlayer();
    updateArrow();
    checkCollisions();
    displayScore();
    displayLevel();

    if (gameOver) {
      displayGameOver();
    }
    updateLevelTimer();
  }
}

function initializeGame() {
  player = {
    x: 0,
    y: -20,
    z: 200,
    size: 40,
    speed: 5,
    color: 'blue',
    score: 0
  };

  levelTimer = millis();
}


function calculateAngleToCamera() {
  // I had to use AI for this
  let cameraPos = createVector(cameraControl.eyeX, cameraControl.eyeY, cameraControl.eyeZ);
  let angleToCamera = atan2(cameraPos.x, cameraPos.z);
  return angleToCamera;
}

function setCameraPosition() {
  cameraControl.lookAt(0, 0, 0);
  orbitControl();
}

function drawMenu() {
  background(50);
  textFont(myFont);
  textAlign(CENTER);
  fill(255);
  textSize(50);
  text('Shape Dodger 3D', 0, -100);
  textSize(30);
  text('Press ENTER to Start', 0, 0);
}

// Function to update the level timer and advance level if time has elapsed
function updateLevelTimer() {
  let elapsedTime = millis() - levelTimer;
  if (elapsedTime >= levelTime * 1000) {
    levelUp();
  }
}

// Function to draw the ground
function drawGround() {
  push();
  fill(100, 150, 100);
  rotateX(HALF_PI);
  plane(1000, 1000);
  pop();
}

// Function to display the player cube
function displayPlayer() {
  push();
  fill(player.color);
  translate(player.x, player.y, player.z);
  box(player.size);  // Player is represented by a cube
  pop();
}

// Spawn falling arrow objects
function spawnArrow() {
  let newSphere = {
    x: random(-width / 2, width / 2),
    y: -300,
    z: random(-300, 300),
    speedY: random(3, 7),
    size: random(10, 25)  // Random size for each sphere
  };
  shapes.push(newSphere);
}

// Update and render arrows
function updateArrow() {
  if (frameCount % spawnRate === 0 && !gameOver) {
    spawnArrow();
  }

  for (let i = shapes.length - 1; i >= 0; i--) {
    let sphere = shapes[i];
    sphere.y += sphere.speedY;

    // Remove spheres that touch platform
    if (sphere.y > 200) {
      shapes.splice(i, 1);
      player.score++;
    }
    else {
      push();
      translate(sphere.x, sphere.y, sphere.z);
      fill(200, 0, 200);
      sphere(sphere.size / 2);
      pop();
    }
  }
}

// Function to move the player
function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {  // A key for left
    player.x -= player.speed;  // Move left
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {  // D key for right
    player.x += player.speed;  // Move right
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {  // W key for forward
    player.z -= player.speed;  // Move forward
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {  // S key for back
    player.z += player.speed;  // Move back
  }

  // Constrain player movement within the bounds (X-axis for left-right movement)
  player.x = constrain(player.x, -width / 2 + player.size / 2, width / 2 - player.size / 2);

  // Constrain player movement within the bounds (Z-axis for back-forth movement)
  player.z = constrain(player.z, -300 + player.size / 2, 300 - player.size / 2);  // Updated bounds for Z
}

// Function to detect collision between player and a shape
function detectCollision(player, shape) {
  let playerHalfSize = player.size / 2;
  let shapeHalfSize = shape.size / 2;

  let xCollision = abs(player.x - shape.x) <= playerHalfSize + shapeHalfSize;
  let yCollision = abs(player.y - shape.y) <= playerHalfSize + shapeHalfSize;
  let zCollision = abs(player.z - shape.z) <= playerHalfSize + shapeHalfSize;

  return xCollision && yCollision && zCollision;
}

// Function to check collisions
function checkCollisions() {
  for (let shape of shapes) {
    if (detectCollision(player, shape)) {
      gameOver = true;
      break;
    }
  }
}


function displayScore() {
  push();
  rotateY(calculateAngleToCamera());
  fill(255);
  textSize(24);
  textAlign(LEFT);
  text(`Score: ${player.score}`, -width / 2 + 20, -height / 2 + 40);  //
  pop();
}

function displayLevel() {
  let elapsedSeconds = Math.floor((millis() - levelTimer) / 1000); // Calculate elapsed time in seconds
  let timeLeft = max(0, levelTime - elapsedSeconds); // Remaining time for the level

  push();
  fill(255);
  rotateY(calculateAngleToCamera());
  textSize(24);
  textAlign(RIGHT);
  text(`Level: ${level}`, width / 2 - 20, -height / 2 + 40);
  text(`Time Left: ${timeLeft} seconds`, width / 2 - 20, -height / 2 + 70);
  pop();
}

function levelUp() {
  if (level < 7) {
    level++;
    levelTimer = millis();
    spawnRate -= 30;
  }
}


function keyPressed() {
  if (menu && keyCode === ENTER) {
    menu = false;  // Start the game and exit the menu
    levelTimer = millis();  // Reset timer for the first level
  }
  else if (gameOver && keyCode === ENTER) {
    resetGame();  // Reset game state
  }
}

function displayGameOver() {
  background(0);
  textFont(myFont);
  textAlign(CENTER);
  fill(255);
  textSize(50);
  text('Game Over', 0, -100);
  textSize(30);
  text(`Final Score: ${player.score}`, 0, 0);
  text('Press ENTER to Restart', 0, 100);
}

function resetGame() {
  shapes = [];
  player.score = 0;
  player.x = 0;
  player.y = -40;
  player.z = 200;
  gameOver = false;
  level = 1;
  spawnRate = 120;
  levelTimer = millis();
}
