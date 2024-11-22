// Intro Matter.js
// Labeeb Farooqi
// November 21, 2024

const {Engine, Body, Bodies, Composite, Render, Runner} = Matter;

let engine;
let render;
let runner;
let box;
let ground;

function setup() {
  noCanvas();
  engine = Engine.create();
  render = Render.create( {
    element: document.body,
    engine: engine,
    options: {
      width: windowWidth,
      height: windowHeight
    }
  });

  box = Bodies.rectangle(100, 100, 50, 50);
  ground = Bodies.rectangle(windowWidth/2 , windowHeight - 100, windowWidth, 10, {isStatic: true});

  Composite.add(engine.world, [box, ground]);

  Render.run(render);

  runner = Runner.create();

  Runner.run(runner, engine);
}


