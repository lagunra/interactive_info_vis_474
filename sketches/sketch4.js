// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(800, 600);
    p.noStroke();

  };

  p.draw = function () {
    p.background(245, 240, 230);

    //shelf
    const shelfYs = [
      p.height * 0.3,
      p.height * 0.6,
      p.height * 0.9
    ];

    // books for each shelf
    const shelfBooks = [
      // top shelf
      [
        { w: 40, h: 135, c: '#9E87C0' },
        { w: 30, h: 120, c: '#9E8015' },
        { w: 50, h: 115, c: '#97A0F7' },
        { w: 35, h: 130, c: '#D7AAA8' },
        { w: 45, h: 125, c: '#2F5ACA' },
        { w: 30, h: 110, c: '#CBA4DF' },
        { w: 40, h: 135, c: '#bdb2ff' },
        { w: 25, h: 100, c: '#566539' }
      ],

      // middle shelf
      [
        { w: 35, h: 135, c: '#2F5ACA' },
        { w: 40, h: 125, c: '#9E87C0' },
        { w: 25, h: 135, c: '#566539' },
        { w: 45, h: 115, c: '#CBA4DF' },
        { w: 30, h: 130, c: '#9E8015' },
        { w: 40, h: 135, c: '#97A0F7' },
        { w: 30, h: 115, c: '#D7AAA8' }
      ],

      // bottom shelf
      [
        { w: 50, h: 115, c: '#97A0F7' },
        { w: 30, h: 135, c: '#9E8015' },
        { w: 40, h: 135, c: '#bdb2ff' },
        { w: 25, h: 110, c: '#566539' },
        { w: 45, h: 115, c: '#2F5ACA' },
        { w: 30, h: 135, c: '#CBA4DF' },
        { w: 35, h: 125, c: '#D7AAA8' }
      ]
    ];


    // shelves and books
    for (let i = 0; i < shelfYs.length; i++) {
      const shelfY = shelfYs[i];

      //shelf
      p.fill(139, 90, 43);
      p.rect(50, shelfY, p.width - 100, 40, 5);

      // books
      let x = 100;
      for (let b of shelfBooks[i]) {
        const y = shelfY - b.h;
        p.fill(b.c);
        p.rect(x, y, b.w, b.h);

        // spine
        p.fill(0, 40);
        p.rect(x + b.w - 4, y, 4, b.h);

        x += b.w + 10;
      }
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
