let song;
let arrows = [];
let arrowSpeed = 5;
let arrowKeys = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
let beatInterval = 600; // Adjust this to sync with the song's beat

let lastArrowTime = 0;
let gameStarted = false;
let score = 0;
let gameOver = false;
let feedbackText = '';

function preload() {
  song = loadSound('Port Antonio [ ezmp3.cc ].mp3');
}

function setup() {
  createCanvas(700, 600);
  textSize(32);
  textAlign(CENTER, CENTER);

  let startButton = createButton('Start Game');
  startButton.position(width / 2 - 40, height / 2 + 50);
  startButton.mousePressed(startGame);
}

function draw() {
  background(50);

  if (!gameStarted) {
    fill(255);
    text("Press Start to Begin", width / 2, height / 2);
    return;
  }

  updateArrows(); // Add this to spawn arrows based on the beat interval

  // Draw arrows
  for (let i = arrows.length - 1; i >= 0; i--) {
    arrows[i].update();
    arrows[i].display();
    if (arrows[i].y > height) {
      arrows.splice(i, 1);
      gameOver = true; // End game if an arrow reaches the bottom
    }
  }

  fill(255);
  text("Score: " + score, width / 2, 30);

  if (gameOver) {
    fill('red');
    text('Game Over!', width / 2, height / 2);
    noLoop();
  }

  // Display feedback
  fill(255);
  text(feedbackText, width / 2, height - 40);
}

function startGame() {
  song.play();
  gameStarted = true;
  lastArrowTime = millis();
  loop();
}

function keyPressed() {
  let correct = false;

  for (let i = arrows.length - 1; i >= 0; i--) {
    if (arrows[i].matchesKey(keyCode) && abs(arrows[i].y - height + 100) < 50) {
      arrows.splice(i, 1);
      score++;
      correct = true;
      break;
    }
  }

  feedbackText = correct ? 'Great!' : 'Miss!';
  setTimeout(() => feedbackText = '', 500); // Clear feedback after a short delay
}

class Arrow {
  constructor(direction) {
    this.direction = direction;
    this.x = direction === 'LEFT' ? width / 4 :
             direction === 'DOWN' ? width / 2 - 50 :
             direction === 'UP' ? width / 2 + 50 : width * 3 / 4;
    this.y = 0;
  }

  update() {
    this.y += arrowSpeed;
  }

  display() {
    fill(255);
    if (this.direction === 'UP') {
      triangle(this.x, this.y, this.x - 20, this.y + 40, this.x + 20, this.y + 40);
    } else if (this.direction === 'DOWN') {
      triangle(this.x, this.y + 40, this.x - 20, this.y, this.x + 20, this.y);
    } else if (this.direction === 'LEFT') {
      triangle(this.x, this.y, this.x + 40, this.y - 20, this.x + 40, this.y + 20);
    } else if (this.direction === 'RIGHT') {
      triangle(this.x + 40, this.y, this.x, this.y - 20, this.x, this.y + 20);
    }
  }

  matchesKey(key) {
    return (this.direction === 'UP' && key === UP_ARROW) ||
           (this.direction === 'DOWN' && key === DOWN_ARROW) ||
           (this.direction === 'LEFT' && key === LEFT_ARROW) ||
           (this.direction === 'RIGHT' && key === RIGHT_ARROW);
  }
}

function spawnArrow() {
  let randomDirection = random(arrowKeys);
  arrows.push(new Arrow(randomDirection));
}

function updateArrows() {
  if (millis() - lastArrowTime > beatInterval) {
    spawnArrow();
    lastArrowTime = millis();
  }
}
