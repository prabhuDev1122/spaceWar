/////////////////////////////////////////////////////////////////////***Enemy***///////////////////////////////////////////////////////////////////////

class Enemy {
  constructor(pos, radius, speedEnemy) {
    this.pos = createVector(pos.x, pos.y);
    this.dirVec = createVector(0, 0);
    this.radius = radius;
    this.col = 30;
    this.show = function(col) {
      noStroke();
      fill(col, 100, 50);
      ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }
    this.update = function(jetPos) {
      
      //#######Basic of the calc#######//
      
      //this.dirVec.x = jetPos.x - this.pos.x;
      //this.dirVec.y = jetPos.y - this.pos.y;
      //this.dirMag = Math.sqrt(this.dirVec.x * this.dirVec.x + this.dirVec.y * this.dirVec.y);
      //this.dirVec.x = (this.dirVec.x / this.dirMag);
      //this.dirVec.y = (this.dirVec.y / this.dirMag);
      
      //this.dirVec = p5.Vector.sub(jetPos, this.pos);
      //this.dirVec.normalize();
      //this.dirVec.mult(.5);
      
      this.dirVec = p5.Vector.sub(jetPos, this.pos).setMag(speedEnemy);
      this.pos.add(this.dirVec);
    }
  }
}
