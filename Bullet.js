/////***bullet***/////
class Bullet {
  constructor(mouth, vel) {
    this.pos = createVector(mouth.x, mouth.y);
    this.vel = vel;
    this.radius = 1;
    this.length = 10;
    this.dead = false;
    this.show = function(ang) {
      push();
      translate(0, 0);
      stroke(0,100,50);
      strokeWeight(1);
      var dx = this.pos.x + this.length * cos(this.vel.heading());
      var dy = this.pos.y + this.length * sin(this.vel.heading());
      line(this.pos.x, this.pos.y, dx, dy);
      //fill(150);
      //ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
      pop();
    }
    this.update = function() {
      this.pos.add(this.vel);
      if (this.pos.x >= width || this.pos.x <= 0 || this.pos.y >= height || this.pos.y <= 0) {
        this.dead = true;
      }
    }
  }
}
