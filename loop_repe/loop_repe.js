let disorderSlider;
let rangeSlider;
let focusX = 300;
let focusY = 300;

function setup() {
  createCanvas(600, 600);

  createSpan('Disorder: ');
  disorderSlider = createSlider(0, 30, 15, 1);

  createSpan('  Range: ');
  rangeSlider = createSlider(50, 350, 180, 10);
}

function draw() {
  // mouse
  if (mouseX >= 0 && mouseX < width &&
      mouseY >= 0 && mouseY < height) {
    focusX = mouseX;
    focusY = mouseY;
  }

  background(248);
  randomSeed(42);
  noFill();
  stroke(30, 50, 65);

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      let x = 60 + col * 50;
      let y = 60 + row * 50;

      let distance = dist(x + 19, y + 19, focusX, focusY);
      let influence = max(0, 1 - distance / rangeSlider.value());
      let disorder = disorderSlider.value() * influence;

      stroke(
  30 + 190 * influence,
  50 + 40 * influence,
  65 - 25 * influence
);
      fill(220, 90, 40, 70 * influence);
      for (let layer = 0; layer < 3; layer++) {
        let size = 38 - layer * 10;
        let dx = random(-disorder, disorder);
        let dy = random(-disorder, disorder);
        rect(x + layer * 5 + dx, y + layer * 5 + dy, size, size);
      }
    }
  }
}