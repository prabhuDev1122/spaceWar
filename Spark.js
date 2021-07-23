//sparkling////
class Spark {
  constructor(pos, radius, velocity) {
    this.pos = createVector(pos.x, pos.y);
    this.radius = radius;
    this.velocity = velocity;
    this.alpha = 70;
    this.show = function() {
      noStroke();
      fill(20, 100, this.alpha);
      ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }
    this.update = function() {
      this.alpha -= 5;
      this.pos.add(this.velocity)
    }
    this.dead = function() {
      if (this.alpha <= 1) {
        return true;
      }
    }
  }
}