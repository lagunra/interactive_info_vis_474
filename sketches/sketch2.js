// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let clockFont = "Calisto";
  let hourMessages = {};
  let setupHour = 7;
  let endHour = 23;
  let isSetup = true;
  let inputText = "";
  let currentMsg = "";
  let lastHour = -1;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    for (let h = 0; h < 24; h++) {
      hourMessages[h] = "⋆ ˚｡ You're doing great. Keep going! ˚｡⋆";
    }

    lastHour = p.hour();
    currentMsg = hourMessages[lastHour];
  };

  p.draw = function () {
    p.background(222, 203, 242);

    drawClock();

    if (isSetup) {
      drawSetupPrompt();
    } else {
      drawCurrentMessage();
      checkHourChange();
    }
  };

  function drawClock() {
    let hr = p.hour();
    let mn = p.minute();
    let noon = hr >= 12 ? " PM" : " AM";
    hr %= 12;
    if (hr === 0) hr = 12;
    if (mn < 10) mn = "0" + mn;

    p.push();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(p.width / 5);
    p.textFont(clockFont);
    p.fill(255, 182, 193);
    p.text(hr + ":" + mn + noon, p.width / 2 + 3, p.height / 2 + 3);
    p.fill("white");
    p.text(hr + ":" + mn + noon, p.width / 2, p.height / 2);
    p.pop();
  }

  function drawSetupPrompt() {
    let displayHour = setupHour % 12 === 0 ? 12 : setupHour % 12;
    let ampm = setupHour < 12 ? "AM" : "PM";

    p.push();
p.textAlign(p.CENTER, p.CENTER);
p.textFont(clockFont);
p.textSize(p.width / 40);
p.fill("white");

let currentHour = p.hour();
let greeting = "";

if (currentHour < 12) {
  greeting = "Good Morning! ✧";
} else if (currentHour < 17) {
  greeting = "Good Afternoon! ✧";
} else {
  greeting = "Good Evening! ✧";
}

p.text(
  greeting + "  What do you have at " + displayHour + ":00 " + ampm + "?",
  p.width / 2,
  p.height * 0.7
);
p.pop();


    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(p.width / 45);
    p.fill(255);
    p.text(inputText + "|", p.width / 2, p.height * 0.78);
    p.pop();
  }

  function drawCurrentMessage() {
    p.push();
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont(clockFont);
    p.textSize(p.width / 40);
    p.fill("white");
    p.text(currentMsg, p.width / 2, p.height * 0.75);
    p.pop();
  }

  function checkHourChange() {
    let nowHour = p.hour();
    if (nowHour !== lastHour) {
      lastHour = nowHour;
      currentMsg = hourMessages[nowHour];
    }
  }

  p.keyTyped = function () {
    if (!isSetup) return;
    if (p.key === "Enter") {
      if (inputText.trim() !== "") {
        hourMessages[setupHour] = inputText.trim() + " time! You got this! ୨୧";
      }
      inputText = "";
      setupHour++;
      if (setupHour > endHour) {
        isSetup = false;
        currentMsg = hourMessages[p.hour()];
      }
    } else if (p.key.length === 1) {
      p.textFont(clockFont);
      inputText += p.key;
    }
  };

  p.keyPressed = function () {
    if (p.keyCode === p.BACKSPACE && isSetup) {
      inputText = inputText.slice(0, -1);
      return false;
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
