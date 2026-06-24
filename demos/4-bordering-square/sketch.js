// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let sideLength = 40;

let x = 0;
let y = 0;

let speed = 5;

let state;


function setup() {
  createCanvas(400, 400);
}

function draw() {

  background(220);

  moveSquare();
  square(x, y, sideLength);

}

function moveSquare() {
  if (state === 'right') {
    x += speed;
    if (x >= width - sideLength) {
      state = 'down';
    }
  }

  if (state === 'down') {
    y -= speed;

    if (y >= height - sideLength) {
      state = 'left';
    }
  }

  if (state === 'left') {
    x -= speed;

    if (x <= 0) {
      state = 'up';
      }
    }
  if (state === 'up') {
    y += speed;

    if (y <= 0) {
      state = 'right';
    }
  }

}
