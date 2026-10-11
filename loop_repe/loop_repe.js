let disorderSlider;
let rangeSlider;
let focusX;
let focusY;
const cellSize = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  focusX = width / 2;
  focusY = height / 2;

  const controls = createDiv();
  controls.position(12, 12, 'fixed');
  controls.style('z-index', '1');
  controls.style('background', 'rgba(248, 248, 248, 0.9)');
  controls.style('padding', '8px 12px');

  createSpan('Disorder: ').parent(controls);
  disorderSlider = createSlider(0, 30, 15, 1);
  disorderSlider.parent(controls);

  createElement('br').parent(controls);
  createSpan('Range: ').parent(controls);
  rangeSlider = createSlider(50, 350, 180, 10);
  rangeSlider.parent(controls);
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

  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {

      let distance = dist(x + cellSize / 2, y + cellSize / 2, focusX, focusY);
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
        rect(x + 6 + layer * 5 + dx, y + 6 + layer * 5 + dy, size, size);
      }
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
