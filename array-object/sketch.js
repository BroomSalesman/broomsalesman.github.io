let world;
let marbles = [];
let marbleBodies = [];
let numMarbles = 50; // Number of marbles
let radiusMin = 10;
let radiusMax = 20;
let ground;

function setup() {
  createCanvas(800, 600, WEBGL);

  // Initialize cannon.js physics world
  world = new CANNON.World();
  world.gravity.set(0, 0, -9.82); // Set gravity to simulate downward pull
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;

  // Create a ground plane in the physics world
  let groundShape = new CANNON.Plane();
  let groundMaterial = new CANNON.Material();
  ground = new CANNON.Body({
    mass: 0, // Ground doesn't move, so mass is 0
    material: groundMaterial
  });
  ground.addShape(groundShape);
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Rotate to be horizontal
  world.addBody(ground);

  // Create marbles
  for (let i = 0; i < numMarbles; i++) {
    let radius = random(radiusMin, radiusMax);
    let x = random(-width / 4, width / 4);
    let y = random(-height / 4, height / 4);
    let z = random(50, 300);

    // Create marble's physical body in cannon.js
    let marbleShape = new CANNON.Sphere(radius);
    let marbleMaterial = new CANNON.Material();
    let marbleBody = new CANNON.Body({
      mass: 1, // Mass of the marble
      position: new CANNON.Vec3(x, y, z),
      shape: marbleShape,
      material: marbleMaterial
    });
    marbleBody.linearDamping = 0.1; // Reduce speed gradually to simulate friction
    world.addBody(marbleBody);

    // Store marble data for rendering
    marbleBodies.push(marbleBody);
    marbles.push({
      radius: radius,
      color: [random(255), random(255), random(255)]
    });
  }
}

function draw() {
  background(200);
  orbitControl(); // Allow mouse control to orbit the camera

  // Step the physics simulation forward
  world.step(1 / 60);

  // Draw the ground plane
  push();
  translate(0, 0, 0);
  rotateX(HALF_PI);
  fill(150);
  plane(width, height);
  pop();

  // Render each marble
  for (let i = 0; i < marbles.length; i++) {
    let marble = marbles[i];
    let marbleBody = marbleBodies[i];

    push();
    translate(marbleBody.position.x, marbleBody.position.y, marbleBody.position.z);
    fill(marble.color);
    noStroke();
    sphere(marble.radius);
    pop();
  }
}
