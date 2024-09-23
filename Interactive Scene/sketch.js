// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let pencolor;
let pensize = 5;

//pallete squares size
pltsize = 30;


function setup() {
  createCanvas(1000, 1000);
}


function draw() {
  background(255);
  noCursor();
  createPallete();
  coloringPen();
  chooseColor();

}




//Placeholder for colors in the pallete



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

//when color from pallete is clicked on, color of pen changes
function chooseColor() {

  if (mouseIsPressed && (mouseX > 5)&&(mouseX <= 30)) {

    //blacked pressed
    if (mouseY > 5 && mouseY < 35) {
      pencolor = 'black';
    }

    //gray pressed
    if (mouseY > 40 && mouseY < 70) {
      pencolor = 'gray';
    }

    //white pressed
    if (mouseY > 75 && mouseY < 105) {
      pencolor = 'white';
    }

    //red pressed
    if (mouseY > 110 && mouseY < 140) {
      pencolor = 'red';
    }

    //orange pressed
    if (mouseY > 145 && mouseY < 175) {
      pencolor = 'orange';
    }

    //yellow pressed
    if (mouseY > 180 && mouseY < 210) {
      pencolor = 'yellow';
    }

    // lime pressed
    if (mouseY > 215 && mouseY < 245) {
      pencolor = 'lime';
    }

    //green pressed
    if (mouseY > 250 && mouseY < 280) {
      pencolor = 'green';
    }

    //turquoise pressed
    if (mouseY > 285 && mouseY < 315) {
      pencolor = 'turquoise';
  }

    //skyblue pressed
    if (mouseY > 320 && mouseY < 350) {
      pencolor = 'skyblue';
    }

    //blue pressed
    if (mouseY > 355 && mouseY < 385) {
      pencolor = 'royalblue';
    }

    //darkblue pressed
    if (mouseY > 390 && mouseY < 420) {
      pencolor = 'darkblue';
    }

    //purple pressed
    if (mouseY > 425 && mouseY < 455) {
    pencolor = 'indigo';
  }

    //lavendar pressed
    if (mouseY > 460 && mouseY < 490) {
      pencolor = '#a392cb';
    }

  //pink pressed
    if (mouseY > 495 && mouseY < 525) {
      pencolor = 'hotpink';
    }
  }
}

function coloringPen() {
  circle(mouseX, mouseY,  pensize);
}

function drawPen() {
  if (mouseIsPressed()) {
    fill(pencolor);
    stroke(0);
    circle(mouseX, mouseY, pensize);
  }

}

function chooseSize() {

}




