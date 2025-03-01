// Perlin Noise Ball
// October 7, 2024

let x;
let y;
let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);

  x = noise(time) * width;
  y = noise(time + 100) * height;

  //fill(random(255), random(255), random(255));
  circle(x, y, 50);
  time = 0.01;
}
