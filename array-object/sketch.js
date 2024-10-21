// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//after certain scores more options get added
let bird;
let pipes = [];
let score = 0;
let gameState = 'menu'; // 'menu', 'settings', 'play', 'gameOver'
let volume = 0.5;
let brightness = 1;

function setup() {
  createCanvas(800, 600);
  bird = new Bird();
}

function draw() {
  background(220 * brightness);

  switch (gameState) {
    case 'menu':
      displayMenu();
      break;
    case 'settings':
      displaySettings();
      break;
    case 'play':
      runGame();
      break;
    case 'gameOver':
      displayGameOver();
      break;
  }
}

// Menu screen
function displayMenu() {
  textSize(40);
  fill(50);
  textAlign(CENTER);
  text('Flappy Bird', width / 2, height / 3);

  textSize(20);
  text('Press SPACE to Play', width / 2, height / 2);
  text('Press S for Settings', width / 2, height / 2 + 40);
}

function displaySettings() {
  textSize(30);
  fill(50);
  textAlign(CENTER);
  text('Settings', width / 2, height / 3);

  textSize(20);
  text(`Volume: ${int(volume * 100)}%`, width / 2, height / 2);
  text(`Brightness: ${int(brightness * 100)}%`, width / 2, height / 2 + 30);

  textSize(15);
  text('Use UP and DOWN arrows to adjust volume', width / 2, height / 2 + 70);
  text('Use LEFT and RIGHT arrows to adjust brightness', width / 2, height / 2 + 90);
  text('Press M to go back to Menu', width / 2, height / 2 + 130);
}

// Main game loop
function runGame() {
  bird.update();
  bird.show();

  if (frameCount % 100 === 0) {
    pipes.push(new Pipe());
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].hits(bird)) {
      gameState = 'gameOver';
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      score++;
    }
  }

  displayScore();
}

function displayScore() {
  fill(0);
  textSize(32);
  textAlign(LEFT);
  text(`Score: ${score}`, 10, 30);
}

function displayGameOver() {
  textSize(40);
  fill(255, 0, 0);
  textAlign(CENTER);
  text('Game Over', width / 2, height / 2);
  textSize(20);
  text('Press M to return to Menu', width / 2, height / 2 + 40);
}

// Bird object
class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
  }

  show() {
    fill(255, 204, 0);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

// Pipe object
class Pipe {
  constructor() {
    this.spacing = random(120, 180);
    this.top = random(height / 6, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 40;
    this.speed = 6;
    this.color = color(random(255), random(255), random(255));
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  show() {
    fill(this.color);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }
}

function keyPressed() {
  if (gameState === 'menu' && key === ' ') {
    gameState = 'play';
    score = 0;
    pipes = [];
    bird = new Bird();
  } else if (gameState === 'menu' && key === 'S') {
    gameState = 'settings';
  } else if (gameState === 'settings' && key === 'M') {
    gameState = 'menu';
  } else if (gameState === 'gameOver' && key === 'M') {
    gameState = 'menu';
  } else if (gameState === 'play' && key === ' ') {
    bird.up();
  }

  if (gameState === 'settings') {
    if (keyCode === UP_ARROW) {
      volume = min(volume + 0.1, 1);
    } else if (keyCode === DOWN_ARROW) {
      volume = max(volume - 0.1, 0);
    } else if (keyCode === RIGHT_ARROW) {
      brightness = min(brightness + 0.1, 1);
    } else if (keyCode === LEFT_ARROW) {
      brightness = max(brightness - 0.1, 0.1);
    }
  }
}
