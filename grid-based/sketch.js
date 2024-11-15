// Grid Based Assignment
// Labeeb Farooqi
// October 12, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cellSize = 40;
const ROWS = 13;
const COLS = 16;
const SPACING = 10;

let labels = ["Bass", "Kick", "Snare", "HiHat Open", "HiHat Closed", "Cymbal", "Tom Low", "Tom Mid", "Tom Hi", "Donk", "Rim Shot", "Clap", "Cowbell"]

// Updated color array using hex values
let colors = [
  "#2196F3", "#9C27B0", "#E91E63", "#FF5722", "#4CAF50",
  "#FFEB3B", "#00BCD4", "#3F51B5", "#673AB7", "#03A9F4",
  "#FF9800", "#F44336", "#CDDC39"
];

function setup() {
  createCanvas(windowHeight, windowHeight);
  grid = generateEmptyGrid(ROWS, COLS);
}


function draw() {
  background(50);
  displayGrid();
  displayLabels();
}

function mousePressed() {
  //After struggling for a long time I used chatpgt to account for the
  //spacing between buttons to make sure they only toggle if directly
  //clicked on, not if clicked on the area around it.
  let xIndex = Math.floor((mouseX - 100) / (cellSize + SPACING));
  let yIndex = Math.floor((mouseY - 40) / (cellSize + SPACING));

  // Calculate the exact cell boundaries
  let cellX = xIndex * (cellSize + SPACING) + 100;
  let cellY = yIndex * (cellSize + SPACING) + 40;

  // Check if the mouse is within the actual cell area (excluding spacing)
  if (
    mouseX > cellX && mouseX < cellX + cellSize &&
    mouseY > cellY && mouseY < cellY + cellSize
  ) {
    toggleCell(xIndex, yIndex);
  }
}

function toggleCell(x, y) {
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    //I was curious if there are one liners in  js like there are in python, and I came across this if else one liner. If grid[y][x] equals 0, turn it into 1. Otherwise, turn it into 0.
    grid[y][x] = grid[y][x] === 0 ? 1 : 0;
  }
}

function keyPressed() {
  if (key === 'e') {
    grid = generateEmptyGrid(ROWS, COLS);
  }
}

function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      fill(grid[y][x] === 1 ? colors[y] : 240); // Use color from the row-specific color list

      stroke(0);

      let xpos = x * (cellSize + SPACING) + 100
      let ypos = y * (cellSize + SPACING) + 40
      rect(xpos, ypos, cellSize, cellSize, 3);
    }
  }
}

function generateEmptyGrid(rows, cols) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function displayLabels() {
    // Draw row labels
    fill(255);
    for (let y = 0; y < ROWS; y++) {
      text(labels[y], 23, y * (cellSize + SPACING) + 62); // Offset for label alignment
    }
}
