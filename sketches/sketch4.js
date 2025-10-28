// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(800, 600);
    p.noStroke();
  };

  p.draw = function () {
    p.background(245, 240, 230);

    //shelf
    const shelfY = p.height * 0.7;
    p.fill(139, 90, 43);
    p.rect(50, shelfY, p.width - 100, 40, 5);

    // books
    const books = [
      { w: 40, h: 180, c: '#9E87C0' },
      { w: 30, h: 150, c: '#9E8015' },
      { w: 50, h: 200, c: '#97A0F7' },
      { w: 35, h: 160, c: '#D7AAA8' },
      { w: 45, h: 190, c: '#2F5ACA' },
      { w: 30, h: 140, c: '#CBA4DF' },
      { w: 40, h: 170, c: '#bdb2ff' },
      { w: 25, h: 130, c: '#566539' }
    ];

    let x = 100;
    for (let b of books) {
      const y = shelfY - b.h;
      p.fill(b.c);
      p.rect(x, y, b.w, b.h);

      //spine
      p.fill(0, 40);
      p.rect(x + b.w - 4, y, 4, b.h);

      x += b.w + 10;
    }
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
