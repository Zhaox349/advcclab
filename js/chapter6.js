let targetList = [];

let basketImg;
let halloweenImg;
let whiteeggImg;
let liquidImg;

let second = 31;

let bulletList = [];

let flightBullterList = [];

let liquidList = [];

function preload() {
  basketImg = loadImage("assets/basket.png");
  halloweenImg = loadImage("assets/halloween.png");
  whiteeggImg = loadImage("assets/whiteegg.png");
  liquidImg = loadImage("assets/liquid.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#FFB36D");
  imageMode(CENTER);

  init();
}

function init() {
  second = 31;
  targetList = [];
  bulletList = [];
  flightBullterList = [];
  liquidList = [];

  for (let i = 0; i < 5; i++) {
    targetList.push(new Target(random(width), random(height)));
  }

  let columCount = 1;
  for (let i = 0; i < 12; i++) {
    const w = 34;
    const h = 43;
    if (i == 6) {
      columCount = 1;
    }

    if (i < 6) {
      bulletList.push({
        left: 31 + columCount * w + columCount * 8,
        bottom: 78 + h / 2,
      });
      columCount++;
    } else {
      bulletList.push({
        left: 31 + columCount * w + columCount * 8,
        bottom: 28 + h / 2,
      });
      columCount++;
    }
  }
}

function draw() {
  background("#FFB36D");
  noStroke();
  fill(255);

  image(halloweenImg, 85, 56, 121, 121);

  push();
  for (let i = 0; i < bulletList.length; i++) {
    const b = bulletList[i];
    image(whiteeggImg, b.left, height - b.bottom, 34, 43);
  }

  pop();

  textSize(55);
  fill("#FF0000");
  text(second, 148, 80);

  image(basketImg, width / 2, height - 509 / 2, 509, 509);

  for (let item of targetList) {
    item.update();
    item.draw();
  }
  targetList = targetList.filter((i) => i.alive);

  for (let f of flightBullterList) {
    f.draw();
    f.update();
    f.isHit();
  }

  for (let l of liquidList) {
    image(liquidImg, l.x, l.y);
  }

  flightBullterList = flightBullterList.filter((i) => i.alive);

  push();
  stroke("#ff0000");
  strokeWeight(5);
  const p = createVector(width / 2, height - 509 / 2);
  const target = createVector(mouseX - p.x, mouseY - p.y);
  translate(p.x, p.y);
  let currentVec = createVector(0, 0);
  let stepVec = target.copy().div(50);
  for (let i = 1; i <= 50; i++) {
    const nextPos = currentVec.copy().add(stepVec);
    if (i % 2 == 0) {
      line(currentVec.x, currentVec.y, nextPos.x, nextPos.y);
    }
    currentVec.add(stepVec);
  }
  pop();

  push();
  translate(mouseX, mouseY);
  stroke("#ff0000");
  strokeWeight(5);
  noFill();
  ellipse(0, 0, 80);
  line(-60, 0, 60, 0);
  line(0, -60, 0, 60);
  pop();

  if (frameCount % 60 == 0) {
    if (second > 0) {
      second--;

      if (targetList.length <= 0) {
        // 下一页
        location.href = "chapter7.html";
      }
    }

    if (second == 0) {
      if (targetList.length > 0) {
        // 没通过继续玩

        init();
      } else {
        // 下一页
        location.href = "chapter7.html";
      }
    }
  }
}

class Target {
  constructor(x, y) {
    this.x = int(x);
    this.y = int(y);

    this.xAdd = random(-1, 1);
    this.yAdd = random(-1, 1);

    this.alive = true;
  }

  update() {
    if (this.x >= width - 60) {
      this.xAdd *= -1;
    }
    if (this.x <= 60) {
      this.xAdd *= -1;
    }
    if (this.y >= height - 60) {
      this.yAdd *= -1;
    }
    if (this.y <= 60) {
      this.yAdd *= -1;
    }

    this.x += this.xAdd;

    this.y += this.yAdd;
  }

  draw() {
    push();
    noFill();
    stroke(255);
    strokeWeight(10);
    ellipse(this.x, this.y, 100);
    ellipse(this.x, this.y, 70);
    ellipse(this.x, this.y, 40);
    ellipse(this.x, this.y, 10);
    pop();
  }
}

function mousePressed() {
  bulletList.shift();
  if (bulletList.length > 0) {
    flightBullterList.push(new Bullet(mouseX, mouseY));
  }
}

class Bullet {
  constructor(x, y) {
    this.startPos = createVector(width / 2, height - 509 / 2);
    this.targetPos = createVector(x - this.startPos.x, y - this.startPos.y);

    this.stepVec = this.targetPos.copy().normalize().mult(4);

    this.alive = true;
  }

  draw() {
    push();
    translate(this.startPos.x, this.startPos.y);
    rotate(frameCount / 6);
    image(whiteeggImg, 0, 0, 34, 43);
    pop();
  }

  update() {
    this.startPos.add(this.stepVec);
  }

  isHit() {
    for (let t of targetList) {
      const tPos = createVector(t.x, t.y);
      if (this.startPos.dist(tPos) < 50) {
        this.alive = false;
        t.alive = false;
        liquidList.push({
          x: this.startPos.x,
          y: this.startPos.y,
        });
      }
    }
  }
}
