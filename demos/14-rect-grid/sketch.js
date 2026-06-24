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
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        fill('black');
      }
      else {
        fill('white')
      }
      rect(x * CELL_SIZE*2, y * CELL_SIZE, CELL_SIZE * 2, CELL_SIZE);
    }
  }
}


function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (y = 0; y < cols; y++) {
    newGrid.push([]);
    for (x = 0; x < rows; x++) {
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}
