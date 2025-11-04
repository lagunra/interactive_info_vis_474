registerSketch('sk15', function (p) {
  let table;
  let data = [];
  let dataLoaded = false;
  let animationProgress = 0; // for bar animation
  let hoveredBar = null;

  p.setup = function () {
    p.createCanvas(900, 500);
    p.textFont("Calisto");

    // Load 
    p.loadTable("nobel.csv", "csv", "header", function (t) {
      table = t;

      let femaleCounts = {};
      let maleCounts = {};

      for (let r = 0; r < table.getRowCount(); r++) {
        let year = p.int(table.getString(r, "year"));
        let sex = table.getString(r, "sex");
        if (!year || sex === "") continue;

        let decade = Math.floor(year / 10) * 10;
        if (sex === "Female") {
          femaleCounts[decade] = (femaleCounts[decade] || 0) + 1;
        } else if (sex === "Male") {
          maleCounts[decade] = (maleCounts[decade] || 0) + 1;
        }
      }

      let decades = Object.keys({ ...femaleCounts, ...maleCounts })
        .map(d => p.int(d))
        .sort((a, b) => a - b);

      for (let i = 0; i < decades.length; i++) {
        let d = decades[i];
        let female = femaleCounts[d] || 0;
        let male = maleCounts[d] || 0;
        data.push({ year: d, female: female, male: male });
      }

      dataLoaded = true;
    });
  };

  // Title and subtitle 
  function drawTitle(p, title, subtitle) {
    p.textAlign(p.CENTER, p.CENTER);

    //Title
    p.textSize(30);
    p.fill(30);
    p.textStyle(p.BOLD);
    p.text(title, p.width / 2, 40);

    //Subtitle
    p.textSize(13);
    p.fill(80);
    p.textStyle(p.NORMAL);
    p.text(subtitle, p.width / 2, 65);
  }


  p.draw = function () {
    p.background("#f0e7e8ea");

    let margin = 100;


    drawTitle(
      p,
      "How Has Gender Representation Among Nobel Laureates Changed Over Time?",
      "Nobel laureates are awarded in various categories such as Peace, Literature, and Sciences. They are individuals who have made significant contributions to humanity through their work. This visualization shows the number of male and female laureates by decade from 1901-2022."
    );

    p.translate(0, 50);

    animationProgress = p.lerp(animationProgress, 1, 0.05);

    let maxCount = 0;
    for (let i = 0; i < data.length; i++) {
      maxCount = Math.max(maxCount, data[i].female, data[i].male);
    }

    // axes
    p.stroke(0);
    p.line(margin, p.height - margin, p.width - margin, p.height - margin);
    p.line(margin, p.height - margin, margin, margin);

    // labels
    p.noStroke();
    p.fill(0);
    p.textSize(16);
    p.textAlign(p.CENTER);
    p.text("Number of Male and Female Nobel Laureates by Decade", p.width / 2, 40);
    p.textSize(12);
    p.text("Decade Awarded", p.width / 2, p.height - 30);

    p.push();
    p.translate(30, p.height / 2);
    p.rotate(-p.HALF_PI);
    p.text("Number of Laureates", 0, 0);
    p.pop();

    // y-axis ticks
    p.textSize(10);
    p.textAlign(p.RIGHT, p.CENTER);
    let step = Math.ceil(maxCount / 5);
    for (let y = 0; y <= maxCount; y += step) {
      let yPos = p.map(y, 0, maxCount, p.height - margin, margin);
      p.stroke(230);
      p.line(margin, yPos, p.width - margin, yPos);
      p.noStroke();
      p.fill(0);
      p.text(y, margin - 10, yPos);
    }

    // draw grouped bars
    let groupWidth = (p.width - 2 * margin) / data.length;
    let barWidth = groupWidth / 3;
    hoveredBar = null;

    for (let i = 0; i < data.length; i++) {
      let xGroup = margin + i * groupWidth;

      // female bar
      let femaleHeight = p.map(data[i].female, 0, maxCount, 0, p.height - 2 * margin) * animationProgress;
      let femaleX = xGroup;
      let femaleY = p.height - margin - femaleHeight;
      p.fill('#E75480');
      p.rect(femaleX, femaleY, barWidth, femaleHeight);

      // male bar
      let maleHeight = p.map(data[i].male, 0, maxCount, 0, p.height - 2 * margin) * animationProgress;
      let maleX = xGroup + barWidth + 5;
      let maleY = p.height - margin - maleHeight;
      p.fill('#4C6EF5');
      p.rect(maleX, maleY, barWidth, maleHeight);

      // hover
      if (p.mouseX > femaleX && p.mouseX < femaleX + barWidth &&
        p.mouseY > femaleY && p.mouseY < p.height - margin) {
        hoveredBar = { type: "Female", year: data[i].year, count: data[i].female, x: femaleX + barWidth / 2, y: femaleY };
      }
      if (p.mouseX > maleX && p.mouseX < maleX + barWidth &&
        p.mouseY > maleY && p.mouseY < p.height - margin) {
        hoveredBar = { type: "Male", year: data[i].year, count: data[i].male, x: maleX + barWidth / 2, y: maleY };
      }

      // decade label
      p.fill(0);
      p.textAlign(p.CENTER, p.TOP);
      p.text(data[i].year, xGroup + groupWidth / 2.2, p.height - margin + 8);
    }

    // legend
    p.fill('#E75480');
    p.rect(p.width - 200, margin - 30, 12, 12);
    p.fill(0);
    p.textAlign(p.LEFT, p.CENTER);
    p.text("Female Laureates", p.width - 180, margin - 25);

    p.fill('#4C6EF5');
    p.rect(p.width - 200, margin - 10, 12, 12);
    p.fill(0);
    p.text("Male Laureates", p.width - 180, margin - 5);

    // tooltip
    if (hoveredBar) {
      p.fill(255);
      p.stroke(0);
      p.rect(hoveredBar.x - 40, hoveredBar.y - 45, 80, 35, 5);
      p.noStroke();
      p.fill(0);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(`${hoveredBar.type}`, hoveredBar.x, hoveredBar.y - 35);
      p.text(`${hoveredBar.count} (${hoveredBar.year}s)`, hoveredBar.x, hoveredBar.y - 20);
    }
  };
});
