let targetList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#FFB36D");

  for (let i = 0; i < 1; i++) {
    targetList.push(new Target(random(width), random(height)));
  }
}

function draw() {
  background("#FFB36D");

  noStroke();
  fill(255);
  ellipse(width / 2, height - 40, 50, 80);

  for (let item of targetList) {
    item.update();
    item.draw();
  }

  push();
  stroke(255);
  strokeWeight(5);
  const point = createVector(width / 2, height - 40);
  const target = createVector(mouseX - point.x, mouseY - point.y);
  translate(point.x, point.y);
  let currentVec = createVector(0, 0);
  let stepVec = target.copy().div(10);
  for (let i = 1; i < 11; i++) {
    stroke(i % 2 == 0 ? "#FFB36D" : "#fff");
    line(currentVec.x, currentVec.y, target.x, target.y);
    currentVec.add(stepVec);
  }

  pop();

  push();
  translate(mouseX, mouseY);
  stroke("#f10");
  strokeWeight(5);
  noFill();
  ellipse(0, 0, 80);
  line(-50, 0, 50, 0);
  line(0, -50, 0, 50);
  pop();
}

class Target {
  constructor(x, y) {
    this.x = int(x);
    this.y = int(y);

    this.xAdd = 1;
    this.yAdd = 1;
  }

  update() {
    if (this.x >= width - 50) {
      this.xAdd *= -1;
    }
    if (this.x <= 50) {
      this.xAdd *= -1;
    }
    if (this.y >= height - 50) {
      this.yAdd *= -1;
    }
    if (this.y <= 50) {
      this.yAdd *= -1;
    }

    console.log(this.x, this.y, this.xAdd, this.yAdd);

    this.x += this.xAdd;

    this.y += this.xAdd;
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
