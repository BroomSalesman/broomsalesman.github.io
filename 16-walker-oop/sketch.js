// Walker OOP Demo
// November 12, 2024

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.radius = 5;
    this.color = theColor;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50){
      //downn
      this.y += this.speed;
    }
    else if (choice < 75) {
      //left
      this.x -= this.speed;
    }
    else {
      //right
      this.x += this.speed;
    }
  }
}

let winston;
let radia;

function setup() {
  createCanvas(windowWidth, windowHeight);
  winston = new Walker(width/2, height/2, 'red');
  radia = new Walker(200, 300, "blue");
}

function draw() {
  winston.move();
  radia.move();

  winston.display();
  radia.display();

}
