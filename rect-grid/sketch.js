// Rectangle Grid
// Labeeb Farooqi
// Oct 28, 2024

const CELL_SIZE = 10;
let grid;
let rows;
let cols;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

}

function draw() {
  background(220);
}



function generateRandomGrid(cols, rows) {
  for (y = 0; y < cols; y++) {

    for (x = 0; x < rows; x++) {

    }
  }

}
