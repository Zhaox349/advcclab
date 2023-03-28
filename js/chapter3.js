let eggImg;
let handImg;
let barImg;

let egg = {
  x: null,
  y: null,
  vy: 0,
  isThrow: false, // 是否抛起
  isFall: false, // 是否下落
};
let hand = {
  x: null,
  y: null,
};

let intensity = {
  _add: 1,
  show: false,
  x: 0,
  y: 0,
  power: 0,

  isRun: 0,
};

let currentViewSize = {
  height: 0,
  width: 0,
};

function preload() {
  eggImg = loadImage("assets/whiteegg.png");
  handImg = loadImage("assets/hand2.png");
  barImg = loadImage("assets/bar.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 创建画布
  background("#FFE3C1");
  imageMode(CENTER);
  // rectMode(CENTER);
  noStroke();

  currentViewSize.height = height;
  currentViewSize.width = width;
}

function draw() {
  background("#FFE3C1");

  const currentMousePos = createVector(mouseX, mouseY);

  if (currentMousePos.x > 400 && currentMousePos.x < width - 300) {
    hand.x = currentMousePos.x;
  }
  hand.y = height - 150;

  if (!egg.isFall && !egg.isThrow) {
    egg.x = hand.x - 120;
    egg.y = hand.y - 40;
  }

  intensity.x = hand.x - 300;
  intensity.y = hand.y;

  image(handImg, hand.x, hand.y, 602, 353);
  image(eggImg, egg.x, egg.y, 133, 170);

  if (mouseIsPressed === true) {
    if (egg.isFall == false && egg.isThrow == false) {
      intensity.show = true;
      intensity.isRun = 1;
      intensity.power += intensity._add;
      if (intensity.power >= 100) {
        intensity._add = -1;
      }
      if (intensity.power <= 0) {
        intensity._add = 1;
      }
      // 画力度条
      push();
      translate(intensity.x - 50, intensity.y - 115);

      image(barImg, 0, 0, 20, 230);

      const yoffset = map(intensity.power, 100, 0, -115, 115);
      triangle(-20, 0 + yoffset, 0, 10 + yoffset, -20, 20 + yoffset);
      pop();
    }
  }

  if (egg.isThrow) {
    throwEgg();
    if (egg.vy > -0.9) {
      egg.isThrow = false;
      egg.isFall = true;
      egg.vy = 2;
    }
  } else if (egg.isFall) {
    fallEgg();
  }

  if (egg.isFall) {
    // 在一定范围内才算接住
    if (egg.x >= mouseX - 120 - 60 && egg.x <= mouseX - 120 + 60) {
      // 接住了
      if (egg.y >= height - 190) {
        egg.vy = 0;
        egg.isFall = false;
        egg.isThrow = false;
        location.href = "chapter5.html";
      }
    } else {
      // 没接住，继续玩
      if (egg.y >= height) {
        egg.isFall = false;
        egg.isThrow = false;
        egg.vy = 0;
      }
    }
  }
}

function mousePressed() {}

function mouseReleased() {
  if (egg.isFall == false && egg.isThrow == false) {
    intensity.show = false;
    egg.vy = int(map(intensity.power, 0, 100, -1, -15));

    if (intensity.isRun == 1) {
      egg.isThrow = true;
      throwEgg();
      intensity.isRun = 0;
    }
  }
}

function throwEgg() {
  egg.y += egg.vy;
  egg.vy *= 0.987;
}

function fallEgg() {
  egg.y += egg.vy;
  egg.vy *= 1.03;
}
