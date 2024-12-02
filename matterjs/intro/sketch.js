// Intro Matter.js
// Labeeb Farooqi
// November 21, 2024

const {Engine, Body, Bodies, Composite, Render, Runner} = Matter;

let engine;
let box;
let ground;

function setup() {
  createCanvas(windowHeight, windowWidth);
  engine = Engine.create();

  box = Bodies.rectangle(100, 100, 50, 50);
  Body.setAngularVelocity(box, 0.2);

  ground = Bodies.rectangle(windowWidth/2 , windowHeight - 100, windowWidth, 10, {isStatic: true});

  Composite.add(engine.world, [box, ground]);
}

function draw() {
  background(220);
  Engine.update(engine);


  push();
  rectMode(CENTER);
  let x = box.position.x;
  let y = box.position.y;
  let angle = box.angle;

  translate(x, y);
  rotate(angle);
  rect(0, 0, 50, 50);
  pop();

  let gp1 = ground.bounds.min.x;
  let gp2 = ground.bounds.min.y;
  let gp3 = ground.bounds.max.x;
  let gp4 = ground.bounds.max.y;

  rectMode(CORNERS);
  rect(gp1, gp2, gp3, gp4);
}


