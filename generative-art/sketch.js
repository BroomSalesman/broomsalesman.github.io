// Generative Art
// October 4th, 2024

const TILE_SIZE = 4;
let theTiles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let y = 0; y < height; y += TILE_SIZE){
    for (let x= 0; x < width; x += TILE_SIZE) {
      let someTile = spawnTile(x, y);
      theTiles.push(someTile);
    }
  }
}

function draw() {
  background(255);

  for (let myTile of theTiles) {
    strokeWeight(myTile.weight);
    fill(myTile.red, myTile.green, myTile.blue);
    elli(myTile.x1, myTile.y1, myTile.x2, myTile.y2);
    quad(myTile.x1*-1, myTyle.y1, my)
  }
}

function spawnTile(x, y) {
  let tile;

  let choice = random(100);

  if (choice > 50) {
    //negative slope
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y - TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y + TILE_SIZE/2,
      red: random(255),
      green: random(255),
      blue: random(255),
      weight: random(2),
    };
  }

  else {
    //positive slope
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y + TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y - TILE_SIZE/2,
      red: random(255),
      green: random(255),
      blue: random(255),
      weight: random(2),
    };
  }

  return tile;
}
