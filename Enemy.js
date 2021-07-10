///***Enemy***///

class Enemy {
  constructor(pos, radius) {
    this.pos = createVector(pos.x, pos.y);
    this.radius = radius;
    this.col = 30;
    this.show = function(col) {
      noStroke();
      fill(col, 100, 50);
      ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }
    this.update = function(velocity) {
      this.pos.add(velocity);
    }
  }
}