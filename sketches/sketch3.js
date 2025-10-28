// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  let elapsedPaused = 0;
  let isRunning = false;
  const buttonW = 120;
  const buttonH = 45;
  let buttonY;

  // timer
  const TOTAL_TIME = 300 * 1000;
  let startTime;

  p.setup = function () {
    p.createCanvas(800, 800);
    p.noStroke();

    buttonY = p.height * 0.8;

    startTime = p.millis();
  };

  p.draw = function () {
    p.background(30, 30, 40);

    let elapsed = elapsedPaused;
    if (isRunning) {
      elapsed += p.millis() - startTime;
    }

    const remaining = p.max(TOTAL_TIME - elapsed, 0);
    const t = p.constrain(remaining / TOTAL_TIME, 0, 1);

    // candle
    const candleFullHeight = 400;
    const candleWidth = 250;
    const candleX = 400;
    const candleBottomY = p.height / 2 + candleFullHeight / 2;

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

    // timer text
    const secondsLeft = p.floor(remaining / 1000);
    const mm = p.nf(p.floor(secondsLeft / 60), 2);
    const ss = p.nf(secondsLeft % 60, 2);
    const label = mm + ":" + ss;

    p.noStroke();
    p.fill(255);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(24);
    p.text(label, candleX + candleWidth + 20, candleTopY + 10);

    // draw buttons
    drawButton(
      p.width / 2 - buttonW - 20,
      buttonY,
      "START",
      isRunning ? "#777" : "#FFFFFF"
    );

    drawButton(
      p.width / 2 + 20,
      buttonY,
      "STOP",
      !isRunning ? "#777" : "#FFFFFF"
    );
  };

  function drawButton(x, y, label, fillColor) {
    p.stroke(255);
    p.strokeWeight(2);
    p.fill(fillColor);
    p.rect(x, y, buttonW, buttonH, 12);

    p.noStroke();
    p.fill(20, 20, 30);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(20);
    p.text(label, x + buttonW / 2, y + buttonH / 2);
  }

  // start/pause buttons
  p.mousePressed = function () {
    const startBtnX = p.width / 2 - buttonW - 20;
    const stopBtnX = p.width / 2 + 20;
    const startBtnY = buttonY;
    const stopBtnY = buttonY;

    // START
    if (
      p.mouseX >= startBtnX &&
      p.mouseX <= startBtnX + buttonW &&
      p.mouseY >= startBtnY &&
      p.mouseY <= startBtnY + buttonH
    ) {
      if (!isRunning) {
        startTime = p.millis();
        isRunning = true;
      }
    }

    // STOP
    if (
      p.mouseX >= stopBtnX &&
      p.mouseX <= stopBtnX + buttonW &&
      p.mouseY >= stopBtnY &&
      p.mouseY <= stopBtnY + buttonH
    ) {
      if (isRunning) {
        elapsedPaused += p.millis() - startTime;
        isRunning = false;
      }
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    buttonY = p.height * 0.8;
  };

});
