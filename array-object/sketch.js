// Objects and Arrays Assignment
// Labeeb Farooqi
// October 15, 2024
//
// Extra for Experts:
// - 3D arrows flying from different angles, organized and cleaned code structure.

let shapes = [];
let player;
let gameOver = false;
let menu = true; // Menu state variable
let cameraControl;
let myFont;

// Level and timer variables
let level = 1;
let levelTime = 60; // 60 seconds
let levelTimer = 0; // Timer to track level time
let spawnRate = 120; // Initial spawn rate (frames)

function preload() {
  myFont = loadFont('font.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);  // Ensure WebGL mode is active
  initializeGame();  // Initialize game settings
  cameraControl = createCamera();  // Initialize camera control
}

function draw() {
  if (menu) {
    drawMenu();  // Display the main menu
  } else {
    background(200);
    setCameraPosition();  // Set camera perspective
    drawGround();  // Draw the ground
    displayPlayer();  // Display the player
    movePlayer();  // Handle player movement
    updateShapes();  // Update falling shapes
    checkCollisions();  // Check for collisions
    displayScore();  // Display the score
    displayLevel();  // Display the current level and timer

    if (gameOver) {
      displayGameOver();  // Display game over screen
    }

    // Update level timer
    levelTimer++;
    if (levelTimer >= frameRate() * levelTime) {
      levelUp();  // Increase level after the timer runs out
    }
  }
}

// Function to initialize game settings
function initializeGame() {
  player = {
    x: 0,
    y: -40,  // Adjusted y position to lift the player below the ground plane
    z: 200,
    size: 40,
    speed: 5,
    color: 'blue',
    score: 0
  };
}

// Function to set camera position
function setCameraPosition() {
  cameraControl.setPosition(0, -400, 1000);  // Zoomed out camera position
  cameraControl.lookAt(0, 0, 0);
  orbitControl();  // Enable mouse orbit control
}

// Function to display the main menu
function drawMenu() {
  background(50);  // Dark background for the menu
  textFont(myFont);
  textAlign(CENTER);
  fill(255);
  textSize(50);
  text('Shape Dodger 3D', 0, -100);  // Title
  textSize(30);
  text('Press ENTER to Start', 0, 0);  // Instructions
}

// Function to draw the ground
function drawGround() {
  push();
  fill(100, 150, 100);  // Ground color
  rotateX(HALF_PI);  // Rotate to horizontal
  plane(1000, 1000);  // Smaller plane size
  pop();
}

// Function to display the player cube
function displayPlayer() {
  push();
  fill(player.color);
  translate(player.x, player.y, player.z);  // Use y position
  box(player.size);  // Player is represented by a cube
  pop();
}

// Function to spawn falling objects
function spawnFallingObjects() {
  let newShape = {
    x: random(-width / 2, width / 2),
    y: -300,
    z: random(-300, 300),
    size: random(20, 50),
    speedY: random(3, 7),
    type: random() > 0.5 ? 'box' : 'sphere',  // Randomly use box or sphere
    color: color(random(255), random(255), random(255))
  };
  shapes.push(newShape);  // Add new shape to the array
}

// Function to update shapes
function updateShapes() {
  // Call spawn function continuously if the game is not over
  if (!gameOver && frameCount % spawnRate === 0) {  // Spawn shapes based on spawn rate
    spawnFallingObjects();  // Spawn falling objects
  }

  for (let i = shapes.length - 1; i >= 0; i--) {
    let shape = shapes[i];
    shape.y += shape.speedY;  // Move the shape downward

    // Remove shapes that fall below the ground
    if (shape.y > 200) {
      shapes.splice(i, 1);  // Remove the shape
      player.score++;  // Increment score for dodging a shape
    } else {
      // Render the shape
      push();
      translate(shape.x, shape.y, shape.z);
      fill(shape.color);
      if (shape.type === 'box') {
        box(shape.size);  // Render a cube
      } else {
        sphere(shape.size / 2);  // Render a sphere
      }
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

  // Constrain player movement within the bounds (horizontal)
  player.x = constrain(player.x, -width / 2 + player.size / 2, width / 2 - player.size / 2);

  // Constrain z movement within bounds
  player.z = constrain(player.z, -300 + player.size / 2, 300 - player.size / 2);
}

// Function to check collisions
function checkCollisions() {
  for (let shape of shapes) {
    let d = dist(player.x, player.z, shape.x, shape.z);  // Calculate distance

    // Check for collision (simple bounding box collision)
    if (d < (player.size / 2 + shape.size / 2) && shape.y + shape.size / 2 > player.z) {
      gameOver = true;  // Set game over state
      break;  // Exit loop on first collision
    }
  }
}

// Function to display score
function displayScore() {
  push();
  fill(255);
  textSize(24);
  textAlign(LEFT);
  text(`Score: ${player.score}`, -width / 2 + 20, -height / 2 + 40);  // Display score
  pop();
}

// Function to display current level and timer
function displayLevel() {
  push();
  fill(255);
  textSize(24);
  textAlign(RIGHT);
  text(`Level: ${level}`, width / 2 - 20, -height / 2 + 40);  // Display level
  text(`Time Left: ${levelTime - Math.floor(levelTimer / frameRate())} seconds`, width / 2 - 20, -height / 2 + 70);  // Display timer
  pop();
}

// Function to display game over screen
function displayGameOver() {
  background(0);  // Black background for game over
  textFont(myFont);
  textAlign(CENTER);
  fill(255);
  textSize(50);
  text('Game Over', 0, -100);  // Game over message
  textSize(30);
  text(`Final Score: ${player.score}`, 0, 0);  // Final score
  text('Press ENTER to Restart', 0, 100);  // Restart instruction
}

// Function to increase level
function levelUp() {
  if (level < 5) {
    level++;
    levelTimer = 0; // Reset the level timer
    spawnRate = max(30, spawnRate - 20); // Increase spawn rate
  }
}

// Start the game from the menu when the ENTER key is pressed
function keyPressed() {
  if (menu && keyCode === ENTER) {
    menu = false;  // Start the game and exit the menu
  } else if (gameOver && keyCode === ENTER) {
    resetGame();  // Reset game state
  }
}

// Function to reset game state
function resetGame() {
  shapes = [];  // Clear shapes array
  player.score = 0;  // Reset score
  player.x = 0;  // Reset player position
  player.y = -40;  // Reset vertical position
  player.z = 200;  // Reset z position
  gameOver = false;  // Reset game over state
}
