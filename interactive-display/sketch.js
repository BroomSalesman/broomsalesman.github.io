// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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
