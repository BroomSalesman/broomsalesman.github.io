// Grid Based Assignment
// Labeeb Farooqi
// October 12, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let grid;
let cellSize;
const GRID_SIZE  = 10;
colors = []


function setup() {

  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }

  else {
    createCanvas(windowHeight, windowHeight);
  }

  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowHeight);
  }

  else {
    resizeCanvas(windowHeight, windowWidth);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
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
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
}


function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill(colors[y]);
      }

      else {
        fill(240);
      }

      stroke('gray');
      square(x * cellSize, y * cellSize, cellSize);
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
