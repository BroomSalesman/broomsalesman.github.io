//  Character Grid
// Labeeb Farooqi
// October 29, 2024


let grid;
let cellSize;
const GRID_SIZE  = 20;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 3;
let thePlayer = {
  x: 0,
  y: 0,
};

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

function mouseisPressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE;
    }
    else if (grid[y][x] === IMPASSIBLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}


function keyPressed() {
  if (key === 'r') {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === 'e') {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
}


function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill('black');
      }

      else {
        fill('white');
      }

      stroke('gray');
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //make it 1 half the time, a 0 half the time
      if (random(100) < 50) {
        newGrid[y].push(IMPASSIBLE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}


function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}
