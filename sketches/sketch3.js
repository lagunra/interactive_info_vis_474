// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {

  // timer
  const TOTAL_TIME = 300 * 1000;
  let startTime;

  p.setup = function () {
    p.createCanvas(800, 800);
    p.noStroke();
    startTime = p.millis();
  };

  p.draw = function () {
    p.background(30, 30, 40);

    const elapsed = p.millis() - startTime;
    const remaining = p.max(TOTAL_TIME - elapsed, 0);
    const t = p.constrain(remaining / TOTAL_TIME, 0, 1);

    // candle
    const candleFullHeight = 150;
    const candleWidth = 40;
    const candleX = 180;
    const candleBottomY = 330;

    const candleCurrentHeight = candleFullHeight * t;
    const candleTopY = candleBottomY - candleCurrentHeight;

  
    p.fill(255, 240, 200);
    p.stroke(230, 210, 170);
    p.strokeWeight(2);
    p.rect(candleX, candleTopY, candleWidth, candleCurrentHeight, 10);

    // wick/flame
    if (remaining > 0) {
      const wickWidth = 4;
      const wickHeight = 20;
      const wickX = candleX + candleWidth / 2 - wickWidth / 2;
      const wickY = candleTopY - wickHeight;

      p.noStroke();
      p.fill(50);
      p.rect(wickX, wickY, wickWidth, wickHeight, 2);

      const flameCX = candleX + candleWidth / 2;
      const flameCY = wickY - 20;

      p.fill(255, 180, 0);
      p.ellipse(flameCX, flameCY, 25, 35);

      p.fill(250, 213, 165);
      p.ellipse(flameCX, flameCY, 12, 20);
    } else {
      p.noStroke();
      p.fill(255);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(32);
      p.text("⋆ ˚｡⋆ Done! ⋆ ˚｡⋆ ", candleX + candleWidth / 2, candleTopY - 40);
    }

    // timer
    const secondsLeft = p.floor(remaining / 1000);
    const mm = p.nf(p.floor(secondsLeft / 60), 2);
    const ss = p.nf(secondsLeft % 60, 2);
    const label = mm + ":" + ss;

    p.noStroke();
    p.fill(255);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(24);
    p.text(label, candleX + candleWidth + 20, candleTopY + 10);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

});
