// Bouncing Balls Demo
// October 3. 2024

let theBall = {
  x: 200,
  y: 300,
  radius: 50,
  dx: 3,
  dy: 2
};


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(10);


  //move the ball
  theBall.x += theBall.dx;
  theBall.y += theBall.dy;

  //bonunce ball if needed
  if (theBall.x > width - theBall.radius|| theBall.x < 0 +theBall.radius) {
    theBall.dx *= -1;
  }

  if (theBall.y > height - theBall.radius || theBall.y < 0 + theBall.radius) {
    theBall.dy *= -1;
  }

  //show ball
  circle(theBall.x, theBall.y, theBall.radius);

}

function spawnBall(theX, theY) {
  let theBall = {
    x: theX,
    y: theY,
    radius: random(30, 60),
    dx: random(-5, 5),
    dy: random(-5, 5)
  };
}
