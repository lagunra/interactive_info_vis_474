// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {

  p.setup = function () {
    p.createCanvas(800, 600);
    p.noStroke();
  };

  p.draw = function () {

    p.background(245, 240, 230);

    const shelfY_hours = p.height * 0.30;
    const shelfY_minutes = p.height * 0.55;
    const shelfY_seconds = p.height * 0.80;

    drawShelfPlank(shelfY_hours);
    drawShelfPlank(shelfY_minutes);
    drawShelfPlank(shelfY_seconds);

    let hr = p.hour() % 12;
    if (hr === 0) hr = 12;
    const mn = p.minute();
    const sc = p.second();


    drawBooks(shelfY_hours, hr, 12);   // hours shelf
    drawBooks(shelfY_minutes, mn, 60); // minutes shelf
    drawBooks(shelfY_seconds, sc, 60); // seconds shelf


  };

  function drawShelfPlank(y) {
    p.fill(139, 90, 43);
    p.rect(50, y, p.width - 100, 40, 5);
    drawPlant(y);
  }

  function drawPlant(shelfY) {
    //pot
    const potWidth = 60;
    const potHeight = 40;
    const potX = p.width - 150;
    const potY = shelfY - potHeight;

    p.fill(200, 100, 100);
    p.rect(potX, potY, potWidth, potHeight, 5);

    p.fill(180, 80, 80);
    p.rect(potX, potY, potWidth, 10, 5);
  }

  function drawBooks(shelfY, count, maxCount) {
    const leftMargin = 100;
    const rightMargin = 100;
    const usableWidth = p.width - leftMargin - rightMargin;
    const bookSpacing = 4;
    const bookW = usableWidth / maxCount - bookSpacing;

    const palette = [
      '#9E87C0',
      '#9E8015',
      '#97A0F7',
      '#D7AAA8',
      '#2F5ACA',
      '#CBA4DF',
      '#bdb2ff',
      '#566539'
    ];

    let x = leftMargin;
    for (let i = 0; i < count; i++) {
      const c = palette[i % palette.length];

      let h = 90;

      if (i % 2 === 0) {
        h -= 5;
      } else {
        h += 5;
      }

      const yTop = shelfY - h;

      p.fill(c);
      p.rect(x, yTop, bookW, h);

      // spine
      p.fill(0, 40);
      p.rect(x + bookW - 3, yTop, 3, h);

      x += bookW + bookSpacing;
    }

  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
