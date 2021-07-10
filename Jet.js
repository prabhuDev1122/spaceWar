//jet///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Jet {
  constructor(x, y, s, maxAmmo) {
    this.pos = createVector(x, y);
    this.head = createVector(12 + s, 0);
    this.radius = 2 * (s + 10);
    this.show = function(ang, amm) {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(ang);
      noFill();
      //fill(120, 30, 10);
      stroke(120, 30, 30);
      strokeWeight(2);
      ellipse(3, 0, this.radius, this.radius);
      beginShape();
      fill(24, 150, 50);
      noStroke();
      vertex(-2 - s, -5 - s); //left
      vertex(this.head.x, this.head.y); //head
      vertex(-2 - s, 4 + s); //right
      vertex(0, 0); //back
      vertex(-1 - s, -4 - s); //back left
      endShape();
      var ammo = map(amm, maxAmmo, 0, 360, 0);
      var col = map(ammo, 0, 360, 0, 120);
      noFill();
      stroke(col, 100, 50);
      strokeWeight(3);
      arc(3, 0, this.radius, this.radius, 0, ammo, OPEN);
      stroke(0, 100, 50);
      strokeWeight(3);
      point(s + 13, 0);
      pop();
    }
    //////***jet update***///////
    this.update = function(vel) {
      this.pos.add(vel);
    }
  }
}