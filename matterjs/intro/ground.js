class Ground {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;

    this.ground = Bodies.rectangle(x, y, this.w, this.h, {isStatic: true});
    Composite.add(engine.world, this.ground)
  }

  display() {
    push();
    rectMode(CENTER);
    let x = this.ground.position.x;
    let y = this.ground.position.y;
    translate(x, y);
    rect(0, 0, this.w, this.h);
    pop();
  }


}
