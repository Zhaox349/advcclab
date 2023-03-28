let img1;
let img2;
let img3;

let fireGif;

let scene = 1;

let progressNumber = 0;

let timer;

function preload() {
  img1 = loadImage("assets/pan1.png");
  img2 = loadImage("assets/pan2.png");
  img3 = loadImage("assets/pan3.png");

  fireGif = loadGif("assets/fire.gif");
}

function setup() {
  let cnv = createCanvas(windowWidth / 2, windowHeight);
  cnv.parent("container");

  imageMode(CENTER);
}

function draw() {
  background("#FFD8AB");
  if (scene == 1) {
    image(img1, width / 1.6, height / 2, img1.width * 0.6, img1.height * 0.6);

    const scene2Dom = document.getElementsByClassName("scene2");
    for (let i = 0; i < scene2Dom.length; i++) {
      scene2Dom.item(i).setAttribute("style", "display: none");
    }
  } else if (scene == 2) {
    const scene2Dom = document.getElementsByClassName("scene2");
    for (let i = 0; i < scene2Dom.length; i++) {
      scene2Dom.item(i).setAttribute("style", "display: unset");
    }

    if (frameCount % 60 == 0) {
      let v = int(random(5, 9));
      if (progressNumber - v > 0) {
        progressNumber -= v;
      } else if (progressNumber - v <= 0) {
        progressNumber = 0;
      }
    }

    if (progressNumber >= 100) {
      scene = 3;
    }

    const cursorDom = document.getElementById("pcursor");
    cursorDom.setAttribute("style", `left: ${449 * (progressNumber / 100)}px`);

    if (progressNumber > 50) {
      image(img3, width / 1.6, height / 2, img3.width * 0.6, img3.height * 0.6);
    } else {
      image(img2, width / 1.6, height / 2, img2.width * 0.6, img2.height * 0.6);
    }
  } else if (scene == 3) {
    if (fireGif.loaded()) {
      image(fireGif, 200, height / 2, 300, 300);
    }
    image(img3, width / 1.6, height / 2, img3.width * 0.6, img3.height * 0.6);

    if (fireGif.loaded()) {
      image(fireGif, 200, height / 1.3, 200, 200);
    }

    if (fireGif.loaded()) {
      image(fireGif, width / 1.4, height / 1.2, 200, 200);
    }

    if (!timer) {
      timer = setTimeout(() => {
        location.href = "chapter4.html";
      }, 2000);
    }
  }

  document.getElementById("button1").onclick = () => {
    if (scene < 2) {
      scene++;
    }
  };
}

function keyPressed() {
  if (scene === 2) {
    if (keyCode == 32) {
      let addV = int(random(2, 5));
      if (progressNumber + addV < 100) {
        progressNumber += addV;
      } else if (progressNumber + addV > 100) {
        progressNumber = 100;
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth / 2, windowHeight);
}
