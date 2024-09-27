/* eslint-disable quotes */
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Credits: https://editor.p5js.org/Apollo199999999/sketches/X0Y6tSIjJ
// Used the line(pmouseX, pmouseY, mouseX, mouseY) code


let penColor = 'black';
let penSize = 5;

//pallete squares size
let pltsize = 30;



function setup() {
  createCanvas(windowHeight, 550);
  background(255);
  createPallete();
}


function draw() {
  frameRate(120);
  //background(255);
  //noStroke();

  chooseColor();

  showPen();
  drawPen();

}



function showPen() {
  fill(penColor);
  if (mouseX >= 40) {
    noCursor();
    //circle(mouseX, mouseY,  penSize);

  }

  else if (mouseX < 38) {
    cursor();
  }
}


function drawPen() {
  if (mouseIsPressed && mouseX > 40) {
    stroke(penColor);
    strokeWeight(penSize);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}


// Change direction when the user scrolls the mouse wheel.
function mouseWheel(event) {
  if (event.delta < 0) {
    if (penSize >= 80) {
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
    if (penSize <= 1) {
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


//maybe use a select size key where they can type in the exact value
function keyToChangeSize() {
}


//when color from pallete is clicked on, color of pen changes
function chooseColor() {

  if (mouseIsPressed && mouseX > 5&&mouseX <= 30) {

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
  }
}

function pltBlock(x, y, size, color) {
  fill(color);
  square(x, y, size);
}

function createPallete() {
  //pallete area
  line (40, 0 , 40, 1000);
  fill('lightgray');
  rect(0, 0, 40, 1000);

  //black
  pltBlock(5, 5, pltsize, 'black');

  //gray
  pltBlock(5, 40, pltsize, 'gray');

  //white
  pltBlock(5, 75, pltsize, 'white');

  //red
  pltBlock(5, 110, pltsize, 'red');

  //orange
  pltBlock(5, 145, pltsize, 'orange');

  //yellow
  pltBlock(5, 180, pltsize, 'yellow');

  //lime
  pltBlock(5, 215, pltsize, 'lime');

  //green
  pltBlock(5, 250, pltsize, 'green');

  //turquoise
  pltBlock(5, 285, pltsize, 'turquoise');

  //sky blue
  pltBlock(5, 320, pltsize, 'skyblue');

  //blue
  pltBlock(5, 355, pltsize, 'royalblue');

  //darkblue
  pltBlock(5, 390, pltsize, 'darkblue');

  //violet
  pltBlock(5, 425, pltsize, 'indigo');

  //lavendar
  pltBlock(5, 460, pltsize, '#a392cb');

  //pink
  pltBlock(5, 495, pltsize, 'hotpink');
}


