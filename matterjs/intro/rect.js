class Rect {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;

    this.body = Bodies.rectangle(x, y, this.w, this.h);
    Body.setAngularVelocity(this.body, 0.2);
    Composite.add(engine.world, this.body);
  }



}
