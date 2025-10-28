// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
    p.noStroke();
  };

  p.draw = function () {
    p.background(30, 30, 40);

    // candle body
    p.fill(255, 240, 200);
    p.rect(180, 180, 40, 150, 10);

    // wick
    p.fill(50);
    p.rect(198, 160, 4, 20);

    // flame (outer)
    p.fill(255, 180, 0);
    p.ellipse(200, 140, 25, 35);

    // flame (inner)
    p.fill(255, 255, 150);
    p.ellipse(200, 140, 12, 20);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

});
