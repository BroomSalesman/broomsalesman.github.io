// Objects and Arrays Assignment
// Labeeb Farooqi
// October 15, 2024
//
// Extra for Experts:
// - Used WEBGL to create

let balls = [];
let player;
let gameOver = false;
let menu = true;
let cameraControl;
let myFont;
const PLANE_WIDTH = 1000;
const PLANE_LENGTH = 1000;


let level = 1;
let levelTime = 30;
let levelTimer;
let spawnRate = 75;

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
    spawnBallWarning();
    renderBall();
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
    color: '#4B4B91',
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

// Function to update the level timer and increase difficulty level once timer has reached max
function updateLevelTimer() {
  let elapsedTime = millis() - levelTimer;
  if (elapsedTime >= levelTime * 1000) {
    levelUp();
  }
}


function drawGround() {
  push();
  noStroke();
  fill(100, 150, 100);
  rotateX(HALF_PI);
  plane(PLANE_WIDTH, PLANE_LENGTH);
  pop();
}

// Function to display the player (the cube)
function displayPlayer() {
  push();
  fill(player.color);
  translate(player.x, player.y, player.z);
  box(player.size);
  pop();
}

// Pushes information about the new ball to an array which is accessed by the rendering function
function spawnBall() {
  let newBall = {
    x: random(-PLANE_WIDTH/ 2, PLANE_WIDTH/ 2),
    y: -300,
    z: random(-PLANE_LENGTH/2, PLANE_LENGTH/2),
    speedY: random(6, 9),
    size: 17
  };
  balls.push(newBall);
}

function spawnBallWarning() {
  for (let ball of balls) {
    push();
    noStroke();

    translate(ball.x, 0, ball.z)
    cylinder(ball.size, 3);
    pop()
  }
}

// Render and update ball position
function renderBall() {
  if (frameCount % spawnRate === 0 && !gameOver) {
    spawnBall();
  }

  for (let ball of balls) {
    ball.y += ball.speedY;

    // Remove spheres that touch platform
    if (ball.y > 0) {
      let theIndex = balls.indexOf(ball)
      balls.splice(theIndex, 1);
      player.score++;
    }
    else {
      lights();
      push();
      noStroke();
      translate(ball.x, ball.y, ball.z);
      fill(255);
      specularMaterial(50);
      shininess(200);
      sphere(ball.size);
      pop();
    }
  }
}

// Function to move the player
function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {  // A key
    player.x -= player.speed;  // Move left
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D key
    player.x += player.speed;  // Move right
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // W key
    player.z -= player.speed;  // Move forward
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // S
    player.z += player.speed;  // Move back
  }

  // Constrain left and right movments
  player.x = constrain(player.x, -500 / 2 + player.size / 2, 500 / 2 - player.size / 2);

  // Constrain back and forth movement within 900 units
  player.z = constrain(player.z, -450 + player.size / 2, 450 - player.size / 2);
}

// Function to detect collision between player and the falling balls
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
  for (let shape of balls) {
    if (detectCollision(player, shape)) {
      gameOver = true;
    }
  }
}


function displayScore() {
  push();
  rotateY(calculateAngleToCamera());
  fill(255);
  textSize(24);
  textAlign(LEFT);
  text(`Score: ${player.score}`, -width / 2 + 20, -height / 2 + 40);
  pop();
}

function displayLevel() {
  let elapsedSeconds = Math.floor((millis() - levelTimer) / 1000); // Calculate the milliseconds in seconds
  let timeLeft = max(0, levelTime - elapsedSeconds); // Remaining time before difficulty level increases

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
    menu = false;
    levelTimer = millis();
  }

  else if (menu === false && key === " ") {

  }

  else if (gameOver && keyCode === ENTER) {
    resetGame();
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
  balls = [];
  player.score = 0;
  player.x = 0;
  player.y = -20;
  player.z = 200;
  gameOver = false;
  level = 1;
  spawnRate = 120;
  levelTimer = millis();
}

