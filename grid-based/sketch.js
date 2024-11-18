// Grid Based Assignment
// Labeeb Farooqi
// October 12, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cellSize = 40;
const ROWS = 13;
const COLS = 24;
const SPACING = 10;

let sounds = ["Bass", "Kick", "Snare", "HiHat Open", "HiHat Close", "Cymbal", "Tom Low", "Tom Mid", "Tom Hi", "Donk", "Rim Shot", "Clap", "Cowbell"];

let colors = [
  "#2196F3", "#9C27B0", "#E91E63", "#FF5722", "#4CAF50",
  "#FFEB3B", "#00BCD4", "#3F51B5", "#673AB7", "#03A9F4",
  "#FF9800", "#F44336", "#CDDC39"
];

let timer;
let tempoSlider;
let tempo;
let beatDuration;
let beatCounter = 0;
let lastBeatTime = 0;

let bass, kick, snare, hihatOpen, hihatClose, cymbal, tomLow, tomMid, tomHi, donk, rimShot, clap, cowbell;

function preload() {
  bass = loadSound('beats/bass-drum.wav');
  kick = loadSound('beats/kick.wav');
  snare = loadSound('beats/snare.wav');
  hihatOpen = loadSound('beats/hihat-open.wav');
  hihatClose = loadSound('beats/hihat-closed.wav');
  cymbal = loadSound('beats/cymbal.wav');
  tomLow = loadSound('beats/tom-low.wav');
  tomMid = loadSound('beats/tom-mid.wav');
  tomHi = loadSound('beats/tom-hi.wav');
  donk = loadSound('beats/donk.wav');
  rimShot = loadSound('beats/rim-shot.wav');
  clap = loadSound('beats/clap.wav');
  cowbell = loadSound('beats/cowbell.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateEmptyGrid(ROWS, COLS);
  Slider();
}

function draw() {
  tempo = tempoSlider.value();
  beatDuration = 60/tempo * 1000 / 4;
  background(70);
  displayGrid();
  displayLabels();
  loopBeat();
  indicator();
}

function playSounds(theSound) {
  if (theSound === sounds[0]) {
    bass.play();
  }
  else if (theSound === sounds[1]) {
    kick.play();
  }
  else if (theSound === sounds[2]) {
    snare.play();
  }
  else if (theSound === sounds[3]) {
    hihatOpen.play();
  }
  else if (theSound === sounds[4]) {
    hihatClose.play();
  }
  else if (theSound === sounds[5]) {
    cymbal.play();
  }
  else if (theSound === sounds[6]) {
    tomLow.play();
  }
  else if (theSound === sounds[7]) {
    tomMid.play();
  }
  else if (theSound === sounds[8]) {
    tomHi.play();
  }
  else if (theSound === sounds[9]) {
    donk.play();
  }
  else if (theSound === sounds[10]) {
    rimShot.play();
  }
  else if (theSound === sounds[11]) {
    clap.play();
  }
  else if (theSound === sounds[12]) {
    cowbell.play();
  }


}
function mousePressed() {
  //After struggling for a long time I used chatpgt to account for the
  //spacing between buttons to make sure they only toggle if directly
  //clicked on, not if clicked on the area around it.
  // I understand the code fully
  let xIndex = Math.floor((mouseX - 150) / (cellSize + SPACING));
  let yIndex = Math.floor((mouseY - 60) / (cellSize + SPACING));

  // Calculate the exact cell boundaries
  let cellX = xIndex * (cellSize + SPACING) + 150;
  let cellY = yIndex * (cellSize + SPACING) + 60;

  // Check if the mouse is within the button
  if (mouseX > cellX && mouseX < cellX + cellSize &&mouseY > cellY && mouseY < cellY + cellSize) {
    toggleCell(xIndex, yIndex);
  }
}

/*
function mouseDragged() {
  let xIndex = Math.floor((mouseX - 150) / (cellSize + SPACING));
  let yIndex = Math.floor((mouseY - 60) / (cellSize + SPACING));

  // Calculate the exact cell boundaries
  let cellX = xIndex * (cellSize + SPACING) + 150;
  let cellY = yIndex * (cellSize + SPACING) + 60;

  // Check if the mouse is within the cell and the cell is currently off
  if (mouseX > cellX && mouseX < cellX + cellSize &&
        mouseY > cellY && mouseY < cellY + cellSize) {
    if (xIndex >= 0 && xIndex < COLS && yIndex >= 0 && yIndex < ROWS) {
      if (grid[yIndex][xIndex] === 0) {
        grid[yIndex][xIndex] = 1;
        playSounds(sounds[yIndex]); // Play the sound when a cell is turned on
      }
    }
  }
}
  */

function loopBeat() {
  // Check if the required time interval has passed since the last beat
  if (millis() - lastBeatTime >= beatDuration) {
    lastBeatTime = millis(); // Update the last beat time
    beatCounter = (beatCounter + 1) % COLS;

    // Loop through each row in the grid
    for (let y = 0; y < ROWS; y++) {
      if (grid[y][beatCounter] === 1) {
        playSounds(sounds[y]); // Play the sound corresponding to the current row
      }
    }
  }
}

function indicator() {
  let xpos = beatCounter * (cellSize + SPACING) + 150;
  let ypos = 40;

  fill("red");
  noStroke();
  ellipse(xpos + cellSize / 2, 40, 15, 15); // Draw the red dot centered above the current beat
}

function toggleCell(x, y) {
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
      playSounds(sounds[y]);
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
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      //if tile equals 1 then show  appropriate color according to beat, if tile does  not equal 1 show white
      fill(grid[y][x] === 1 ? colors[y] : 240);

      stroke(0);

      let xpos = x * (cellSize + SPACING) + 150;
      let ypos = y * (cellSize + SPACING) + 60;
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

function Slider() {
  tempoSlider = createSlider(5, 240, 90, 5);
  tempoSlider.position (150, 770);
  tempoSlider.size(200);
}

function displayLabels() {
  // Sound labels
  fill(255);
  for (let y = 0; y < ROWS; y++) {
    textSize(20);
    text(sounds[y], 23, y * (cellSize + SPACING) + 87); // Offset for label alignment
  }

  // Tempo label
  textSize(20);
  fill("orange");
  text(`TEMPO: ${tempo}`, 150, 755);
}
