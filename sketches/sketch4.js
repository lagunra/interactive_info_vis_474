// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {

  p.setup = function () {
    p.createCanvas(800, 600);
    p.noStroke();
  };

  p.draw = function () {

    p.background(245, 240, 230);

    const shelfY = p.height * 0.6;

    p.fill(139, 90, 43);
    p.rect(50, shelfY, p.width - 100, 40, 5);

    const currentSeconds = p.second();

    const totalBooks = currentSeconds;

    const leftMargin = 100;
    const rightMargin = 100;
    const usableWidth = p.width - leftMargin - rightMargin;

    const maxCount = 60;       
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
    for (let i = 0; i < totalBooks; i++) {
      const c = palette[i % palette.length];

      p.randomSeed(p.frameCount);
      const h = p.random(80, 135);
      const yTop = shelfY - h;

      // book
      p.fill(c);
      p.rect(x, yTop, bookW, h);

      // spine
      p.fill(0, 40);
      p.rect(x + bookW - 3, yTop, 3, h);

      x += bookW + bookSpacing;
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
