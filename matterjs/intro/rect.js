class Rect {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;

    this.body = Bodies.rectangle(x, y, this.w, this.h);
    Body.setAngularVelocity(this.body, 0.2);
    Composite.add(engine.world, this.body);
  }

  display() {
    push();
    rectMode(CENTER);
    let x = this.body.position.x;
    let y = this.body.position.y;
    let angle = this.body.angle;

    translate(x, y);
    rotate(angle);
    rect(0, 0, this.w, this.h);
    pop();
  }


}
