// Bouncing Balls Demo
// October 3. 2024

let theBall = {
  x: 200,
  y: 300,
  radius: 50,
};


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(10);

  //show ball
  circle(theBall.x, theBall.y, theBall.radius);
}
