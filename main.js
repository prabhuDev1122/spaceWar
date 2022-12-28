var js, dasboard;
var velVect;
var x, y, score = 0;
var jet, d, singleGunPoint, doubleGunPoint;
var jetSize = .3;
var singleShot = [];
var mouse = [];
var flameParticles = [];
var enemy = [];
var sparkBlast = [];
var newAmmo = [];
var ammo = 360;
var maxAmmo = 0;
var health = 100;

//android api
function setup() {
  //createCanvas(displayWidth, displayHeight);
  createCanvas(displayWidth, displayHeight - 90);
  //🕹️🕹️🕹️🕹️created
  js = new JoyStick(200, 700, 90);
  jet = new Jet(width / 2, height / 2, jetSize, ammo);

  dasboard = new Dasboard(0, 0);
  angleMode(DEGREES);
  colorMode(HSL);
  maxAmmo = ammo;
  velVect = p5.Vector(0, 0);
  //velVect = createVector(0, 0);
}

function preload() {
  fireSound_0 = loadSound("lib/sound/laser.mp3");
  blast = loadSound("lib/sound/GunShot.mp3");
  bulletGain = loadSound("lib/sound/bulletGain.wav");
  fireSound_1 = loadSound("lib/sound//LaserShot.wav");
}

//distance 
function distance(a, b) {
  var dx = a.pos.x - b.pos.x;
  var dy = a.pos.y - b.pos.y;
  var dis = Math.sqrt(dx * dx + dy * dy);
  return dis;
}

addEventListener('touchstart', event => {
  x = event.touches[0].clientX;
  y = event.touches[0].clientY;
});

addEventListener('touchmove', event => {
  x = event.touches[0].clientX;
  y = event.touches[0].clientY;
});

setInterval(() => {
  var posi = createVector(random(width), random(height)); //{ x: random(width), y: random(100, height) };
  //enemy.push(new Enemy(posi,size,speed));
  enemy.push(new Enemy(posi, 20, .51));
}, 3000);

setInterval(() => {
  newAmmo.push(new Enemy({ x: random(width), y: random(100, height) }, 20));
}, 31000);

//creating bullets
setInterval(() => {
  var vel = velVect.normalize();
  var bulletVector = velVect.mult(js.speed + 10);
  singleGunPoint = { x: jet.pos.x + ((jetSize + 10) * cos(js.angle)), y: jet.pos.y + ((jetSize + 10) * sin(js.angle)) };
  //singleGunPoint = { x: jet.pos.x + ((jetSize + 10) * cos(d.angle -45)), y: jet.pos.y + ((jetSize + 10) * sin(d.angle - 45)) };
  if (mouseIsPressed && ammo > 1) {
    if (ammo > 0) {
      ammo -= 1;
    } else if (ammo <= 0) {
      ammo = 0;
    }
    singleShot.push(new Bullet(singleGunPoint, bulletVector));
    fireSound_1.setVolume(1);
    //fireSound_1.play();
  }
}, 100);


//generating jetFlame 🔥🔥🔥
setInterval(() => {
  for (var i = 0; i < 1; i++) {
    var vel = createVector((-.05) * velVect.x + random(-0.1, 0.1), (-.05) * velVect.y + random(-.1, .1));
    var thruster = { x: jet.pos.x + ((jetSize - 5) * cos(js.angle)), y: jet.pos.y + ((jetSize - 5) * sin(js.angle)) };
    flameParticles.push(new Spark(thruster, random(5), vel));
  }
}, 100)

function draw() {
  background(0);
  js.joystick(x, y); //JoyStick create
  velVect = js.newVect;
  flameParticles.forEach((flame, flameIndex) => {
    flame.show();
    flame.update();
    if (flame.dead()) {
      flameParticles.splice(flameIndex, 1);
    }
  });
  //show newAmmos
  newAmmo.forEach((newAmmo) => {
    newAmmo.show(100);
  });

  sparkBlast.forEach((spark, sparkIndex) => {
    spark.show();
    spark.update();
    if (spark.dead()) {
      sparkBlast.splice(sparkIndex, 1);
    }
  });

  singleShot.forEach((bullet, bulletIndex) => {
    bullet.show();
    bullet.update();
    if (bullet.dead) {
      singleShot.splice(bulletIndex, 1); //destroy bullets
    }
  });

  newAmmo.forEach((newAmmos, bulletInd) => {
    if (distance(newAmmos, jet) <= (newAmmos.radius + jet.radius) / 2) {
      newAmmo.splice(bulletInd, 1);
      ammo += 100;
      if (ammo > maxAmmo) {
        ammo = 360;
      }
      bulletGain.setVolume(1);
      //bulletGain.play();
    }
  });

  //bullets show/update/destroy
  enemy.forEach((enemies) => {
    enemies.show(300);
    enemies.update(jet.pos);
  });

  //destroy enemies with bullet
  enemy.forEach((enemies, enemyInd) => {
    singleShot.forEach((bullet, bulletInd) => {
      if (distance(bullet, enemies) <= (bullet.radius + enemies.radius) / 2) {
        for (var i = 0; i < 25; i++) {
          var vel = p5.Vector.random2D();
          sparkBlast.push(new Spark(bullet.pos, random(3), vel.mult(random(2.5))));
        }
        enemy.splice(enemyInd, 1);
        score += 1;
        singleShot.splice(bulletInd, 1);
        //blast.setVolume(1);
        //blast.play();
      }

    });
  });

  //destroy enimies collision with jet
  enemy.forEach((enemies, enemyInd) => {
    if (distance(jet, enemies) <= (jet.radius + enemies.radius) / 2) {
      enemy.splice(enemyInd, 1);
      
    }
  });

  jet.show(js.angle, ammo); //jet show/update
  jet.update(velVect.mult(js.speed));
  //dasboard.frame();
  //dasboard.speedometer(60, 60, js.speed * 90);
  dasboard.textUI("Health:   ", 150, 40, health + '%');
  dasboard.textUI("Bullets:  ", 150, 50, ammo);
  dasboard.textUI("Score:    ", 150, 60, score);
  dasboard.textUI("Enemies:  ", 150, 70, enemy.length);
}