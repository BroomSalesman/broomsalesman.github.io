// Grid Based Assignment
// Labeeb Farooqi
// November 12, 2024
//
// Extra for Experts:
// - Exporting as audio files

let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  let distance = dist(mouseX, mouseY);

  translate(width/2, height/2);
  rotate(angle);
  rect(0, 0, 100, 50);

  angle += 1;
}
