class Dasboard {
  constructor(x, y) {
    this.prop = createVector(x, y);
    var r = 1;
    var x1, x2, y1, y2;
    var value = 0;
    this.frame = function() {
      translate(this.prop.x, this.prop.y);
      fill(200, 100, 50, .4);
      stroke(200, 100, 100, .4);
      strokeWeight(2);
      rect(0, 0, width - 1, 120, 20);
    }
    this.textUI = function(x, y, data) {
      noStroke();
      fill(0, 100, 100);
      textSize(10);
      text("Bullets: " + data, x, y);
    }
    this.speedometer = function(a, b, val) {
      this.pos = createVector(a, b);
      noFill();
      for (var i = 0; i < 100 * r; i++) {
        stroke(160, 95, 100 - i * (1 / (r * 2)));
        ellipse(this.pos.x, this.pos.y, i, i);
      }
      var r1 = 95 - i * (1 / (r * 2));
      var r2 = 85 - i * (1 / (r * 2));
      var frq = 22.5;
      push();
      translate(this.pos.x, this.pos.y);
      //meterReading
      fill(0, 100, 100);
      rectMode(CENTER);
      stroke(1, 100, 0, .3);
      strokeWeight(2);
      rect(0, 30, 30, 15, 20);
      noStroke();
      fill(0, -10, 0, .8);
      textSize(8);
      textFont('inconsolata');
      textAlign(CENTER);
      text("Speed", 0, 13);
      noStroke();
      fill(0, -10, 0, .8);
      textSize(7);
      textFont('inconsolata');
      textAlign(CENTER);
      text("km/h", 0, 20);
      //meter window
      var speed = map(val.toFixed(0), 0, 270, 0, 120);
      noStroke();
      fill(0, -10, 0, .8);
      textSize(12);
      textFont('inconsolata');
      textAlign(CENTER);
      text(speed.toFixed(0), 0, 34);
      //section 
      rotate(135);
      for (var angle = 0; angle < 13; angle++) {
        x1 = r1 * cos(angle * frq);
        y1 = r1 * sin(angle * frq);
        x2 = r2 * cos(angle * frq);
        y2 = r2 * sin(angle * frq);
        stroke(100);
        strokeWeight(2);
        line(x1, y1, x2, y2);
      }
      //outer acr
      noFill();
      stroke(220, 100, 50, .4);
      strokeWeight(4);
      arc(0, 0, 147 - i * (1 / (r * 2)), 147 - i * (1 / (r * 2)), 0, 360, OPEN);
      //inner arc
      noFill();
      stroke(280, 100, 50, .3);
      strokeWeight(4);
      arc(0, 0, 90 - i * (1 / (r * 2)), 90 - i * (1 / (r * 2)), 0, 270, OPEN);
      pop();
      //speedometer hand
      push();
      translate(this.pos.x, this.pos.y);
      rotate(90 + value);
      stroke(0, 100, 50);
      strokeWeight(4);
      line(-5, -5, 20, 20);
      //speedometer center dot
      fill(0, 100, 50);
      noStroke();
      ellipse(0, 0, 7, 7);
      value = val;
      pop();
    }
  }
}