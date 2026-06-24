// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);


  rect(width/3, height - 30, width, height - 30);

  push();
  translate(200, 200);
  rotate(mouseX);
  fill('yellow');
  square(0, 0, 50);
  pop();
}
