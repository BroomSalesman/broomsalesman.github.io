// Traffic Light
// September 24, 2024

//starts at red so green is  first color shown
const lightStates = [['white', 'white','red'], ['green', 'white', 'white' ], ['white', 'yellow', 'white']];
let sequenceIndice = 0;
let timer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let timer = 1000; //switch to 5000 after done
}

function draw() {
  background(220);
  trafficLights();
  drawOutLineOfLights();
}


function drawOutLineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights

  fill(lightStates[sequenceIndice][0]);
  ellipse(width/2, height/2 - 65, 50, 50);

  fill(lightStates[sequenceIndice][1]);
  ellipse(width/2, height/2, 50, 50);

  fill(lightStates[sequenceIndice][2]);
  ellipse(width/2, height/2 + 65, 50, 50);
}


function trafficLights() {

  if (millis() > timer) {
    sequenceIndice += 1;
    console.log('dont wait')
  }
  else {
    console.log('wait');
  }

  if (sequenceIndice >= 3) {
    sequenceIndice = 0;
}
}
