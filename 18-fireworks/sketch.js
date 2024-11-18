// Fireworks Simulation
// Labeeb Farooqi
// November 18, 2024

const NUMBER_OF_FIREWORKS_PER_CLICK = 200;



class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.size = 5;
    this.r = 50;
    this.g = random(255);
    this.b = random(255);
  }

  display() {
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.size);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let firework of theFireworks) {
    firework.move();
    firework.display();
  }
}

function mousePressed() {
  for (let i = 0; i < 50; i++) {
    let someFirework =  new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}

