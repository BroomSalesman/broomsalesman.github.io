// Intro Matter.js
// Labeeb Farooqi
// November 21, 2024

const {Engine, Body, Bodies, Composite, Render, Runner} = Matter;

let engine;
let boxes = [];
let ground;

function setup() {
  createCanvas(windowHeight, windowWidth);
  engine = Engine.create();

  box = new Rect(100, 100, 50, 50);
  ground = new Ground(windowWidth/2, windowHeight - 100, windowWidth, 10);

}

function draw() {
  background(220);
  Engine.update(engine);

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }

  ground.display();
}

function mousePressed() {
  for (i = 0; i < 1000; i++) {
    boxes.push(new Rect(mouseX, mouseY, 20, 20));
  }
}


