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
    this.r = 255;
    this.g = 255;
    this.b = 0;
    this.opacity = 255;
  }

  display() {
    noStroke()
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.size);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  update() {
    //move
    this.x += this.dx;
    this.y += this.dyj

    //fade away over time
    this.opacity--;
  }

  isDead() {
    return this.opacity <= 0;
  }
}

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let firework of theFireworks) {
    if (firework.isDead()) {
      //delete it
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index, 1);
    }
    firework.update();
    firework.display();
  }
}

function mousePressed() {
  for (let i = 0; i < 50; i++) {
    let someFirework =  new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}

