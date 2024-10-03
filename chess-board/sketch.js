let color;
let isBlack  = false;
let cellSize;

function setup() {
  createCanvas(400, 200);
  let cellSize = width / 8;

  if (width > height) {
    cellsSize = height/ 8;
  }

  else {
    cellSize = width/8;
  }
}

function draw() {
  background(220);

  let isBlack = false;

  for (y = 0; y <= 8; y+=height / 8) {
    for (x = 0; x <= 8; x+=2) {

      if (isBlack) {
        color = 'black';
      }

      if (!isBlack)
        color = 'white';

      isBlack = !isBlack;

      fill(color);
      square(x, y , cellSize);
    }
  }
    isBlack = !isBlack;
  }

