// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let clockFont;
  p.preload = function () {
    clockFont = 'Calisto';
  }
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
   
  };

  p.draw = function () {
    p.background(222,203,242);
    p.clock();
  }

  p.clock = function () {
    let hr = p.hour();
    let mn = p.minute();
    let noon = hr >= 12 ? " PM" : " AM";
    hr %= 12;
    if (hr === 0) hr = 12;
    if (mn < 10) mn = "0" + mn;

    p.push();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(p.width / 10);
    p.textFont(clockFont);
    p.fill(255, 182, 193); 
    p.text(hr + ":" + mn + noon, p.width / 2 + 3, p.height / 2 + 3);
    p.fill('white'); 
    p.text(hr + ":" + mn + noon, p.width / 2, p.height / 2);
    p.pop();
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
