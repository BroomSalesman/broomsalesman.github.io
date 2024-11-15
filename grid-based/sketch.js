// Grid Based Assignment
// Labeeb Farooqi
// October 12, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let grid;
let cellSize = 40
const ROWS = 16;
const COLS = 13;
const SPACING = 10

colors = [100, 200, 50, 100, 230, 140, 180, 20, 50, 90, 20, 30, 140]


function setup() {

  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }

  else {
    createCanvas(windowHeight, windowHeight);
  }

  cellSize = height/COLS/2;
  grid = generateEmptyGrid(ROWS,  COLS);
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowHeight);
  }

  else {
    resizeCanvas(windowHeight, windowWidth);
  }
  cellSize = height/COLS/2;
}

function draw() {
  background(5);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize + SPACING);
  let y = Math.floor(mouseY/cellSize + SPACING);

  //toggle self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else {
      grid[y][x] = 0;
    }
  }
}



function keyPressed() {
  if (key === 'e') {
    grid = generateEmptyGrid(ROWS, COLS);
  }
}


function displayGrid() {
  for (let y = 0; y < COLS; y++) {
    for (let x = 0; x < ROWS; x++) {
      if (grid[y][x] === 1) {
        fill(colors[y]);
      }

      else {
        fill(240);
      }

      stroke('gray');
      square(x * (cellSize + SPACING) + 100,  y * (cellSize + SPACING) + 40, cellSize);
    }
  }
}


function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([1]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}
