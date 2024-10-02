/* eslint-disable quotes */
// Interactive Scene JS Paint
// Labeeb Farooqi
// September
//
// Extra for Experts:
// I programmed the scroll wheel to change the size of the pen.
//
// HOW TO TO USE:
// Press the X to clear the canvas (dont accidentally hover over it while drawing)
// Press the colors to switch colors
// Press + and - on your keyboard to fine tune the size of the pen
// Use the scroll wheel to make coarse changes to the size of the pen
//
// Credits: https://editor.p5js.org/Apollo199999999/sketches/X0Y6tSIjJ
// Used the line(pmouseX, pmouseY, mouseX, mouseY) to save my project


let penColor = 'black';
let penSize = 5;
let colors = ['black', 'gray', 'white', 'red', 'orange', 'yellow', 'lime', 'green', 'turquoise', 'skyblue', 'royalblue', 'darkblue', 'indigo', '#a392cb', 'hotpink'];

//pallete squares size
let pltsize = 30;



function setup() {
  createCanvas(700, 700);
  background(255);
}

function draw() {
  frameRate(300);

  // To create color selector, making it a function caused major problems with the stroke settings and coloring on menu
  fill(255);
  noStroke();
  rect(0, 0, 40, windowHeight);
  line(40, 0, 40, 100);

  for (i = 0; i < 15; i++) {
    stroke('black');
    strokeWeight(1);
    pltBlock(5, 5 + i*35, pltsize, colors[i]);
  }

  //clear canvas button
  strokeWeight(5);
  stroke('red');
  fill('white');
  square(5, 535, 30);

  strokeWeight(4);
  line(5, 535, 35, 535 + 30);
  line(35, 535, 5, 535 + 30);

 //divider between menu and canvas
  stroke('black');
  strokeWeight(1);
  line(40, 0, 40, 1000);


  //for choosing color and clearing
  pressButtons();
  keyTyped();
  showCursor();
  drawPen();
}



function showCursor() {
  if (mouseX >= 40) {
    cursor(CROSS);
  }

  else if (mouseX < 40) {
    cursor();
  }
}

//This is what "releases" the "ink" from the "pen"
function drawPen() {
  if (mouseIsPressed && mouseX > 40) {
    stroke(penColor);
    strokeWeight(penSize);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function keyTyped() {
  //This changes the pen size
    if (key === "=") {
      if (penSize > 80) {
        penSize = 0;
      }
      else {
      penSize += 1;
    }
      key = 'none';
    }
    if (key === "-") {

      if (penSize <= 0) {
        penSize = 80;
      }
      else {
      penSize -= 1;
    }
      key = 'none';
    }
  }

//changes size of the pen
function mouseWheel(event) {
  if (event.delta < 0) {
    if (penSize > 80) {
      penSize = 1;
    }

    if (penSize < 5) {
      penSize += 1;
    }

    else {
      penSize += 5;
    }
  }

  else {
    if (penSize < 1) {
      penSize = 80;
    }

    if (penSize <= 5) {
      penSize -= 1;
    }

    else {
      penSize -= 5;
    }
  }
}

//when color from pallete is clicked on, color of pen changes
function pressButtons() {

  if (mouseIsPressed && mouseX >= 5 && mouseX <= 35) {

    //blacked pressed
    if (mouseY > 5 && mouseY < 35) {
      penColor = 'black';
    }

    //gray pressed
    if (mouseY > 40 && mouseY < 70) {
      penColor = 'gray';
    }

    //white pressed
    if (mouseY > 75 && mouseY < 105) {
      penColor = 'white';
    }

    //red pressed
    if (mouseY > 110 && mouseY < 140) {
      penColor = 'red';
    }

    //orange pressed
    if (mouseY > 145 && mouseY < 175) {
      penColor = 'orange';
    }

    //yellow pressed
    if (mouseY > 180 && mouseY < 210) {
      penColor = 'yellow';
    }

    // lime pressed
    if (mouseY > 215 && mouseY < 245) {
      penColor = 'lime';
    }

    //green pressed
    if (mouseY > 250 && mouseY < 280) {
      penColor = 'green';
    }

    //turquoise pressed
    if (mouseY > 285 && mouseY < 315) {
      penColor = 'turquoise';
    }

    //skyblue pressed
    if (mouseY > 320 && mouseY < 350) {
      penColor = 'skyblue';
    }

    //blue pressed
    if (mouseY > 355 && mouseY < 385) {
      penColor = 'royalblue';
    }

    //darkblue pressed
    if (mouseY > 390 && mouseY < 420) {
      penColor = 'darkblue';
    }

    //purple pressed
    if (mouseY > 425 && mouseY < 455) {
      penColor = 'indigo';
    }

    //lavendar pressed
    if (mouseY > 460 && mouseY < 490) {
      penColor = '#a392cb';
    }

    //pink pressed
    if (mouseY > 495 && mouseY < 525) {
      penColor = 'hotpink';
    }
    //clear canvas
    if (mouseY > 535 && mouseY < 565) {
      clear();
      setup();
    }
  }
}
function pltBlock(x, y, size, color) {
  fill(color);
  square(x, y, size);
}

function createPalette() {
  line(40, height - 40, 40, 1000);
  for (i = 0; i < 15; i++) {
    pltBlock(5, 5 + i*35, pltsize, colors[i]);
  }
}


//I thought showing the original code compared to

//function createPallete() {
//  //pallete area
//  line (40, 0 , 40, 1000);
//  fill('lightgray');
//  rect(0, 0, 40, 1000);
//
//  //black
//  pltBlock(5, 5, pltsize, 'black');
//
//  //gray
//  pltBlock(5, 40, pltsize, 'gray');
//
//  //white
//  pltBlock(5, 75, pltsize, 'white');
//
//  //red
//  pltBlock(5, 110, pltsize, 'red');
//
//  //orange
//  pltBlock(5, 145, pltsize, 'orange');
//
//  //yellow
//  pltBlock(5, 180, pltsize, 'yellow');
//
//  //lime
//  pltBlock(5, 215, pltsize, 'lime');
//
//  //green
//  pltBlock(5, 250, pltsize, 'green');
//
//  //turquoise
//  pltBlock(5, 285, pltsize, 'turquoise');
//
//  //sky blue
//  pltBlock(5, 320, pltsize, 'skyblue');
//
//  //blue
//  pltBlock(5, 355, pltsize, 'royalblue');
//
//  //darkblue
//  pltBlock(5, 390, pltsize, 'darkblue');
//
//  //violet
//  pltBlock(5, 425, pltsize, 'indigo');
//
//  //lavendar
//  pltBlock(5, 460, pltsize, '#a392cb');
//
//  //pink
//  pltBlock(5, 495, pltsize, 'hotpink');
