const currTime = document.getElementById("current-time");
let timeNum = +currTime.textContent;
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const allButtons = [
  ...document.getElementsByClassName("timer-control-button"),
].filter((element) => element.id.slice(0, 3) === "add");

let intervalId = 0;
let timerPlaying = false;

function timerAddSeconds(seconds) {
  return () => {
    currTime.textContent = +currTime.textContent + seconds;
  };
}

function timerReset() {
  timerPlaying = false;
  startButton.textContent = "Start";
  clearInterval(intervalId);
  currTime.textContent = 0;
}

function timerPlayPause() {
  if (timerPlaying) {
    timerPlaying = false;
    startButton.textContent = "Start";
    clearInterval(intervalId);
  } else {
    if (+currTime.textContent > 0) {
      timerPlaying = true;
      startButton.textContent = "Pause";
      intervalId = setInterval(timeOneSecond, 100);
    }
  }
}

function timeOneSecond() {
  currTime.textContent = +currTime.textContent - 1;
  if (+currTime.textContent === 0) {
    timerPlaying = false;
    startButton.textContent = "Start";
    clearInterval(intervalId);
  }
}

resetButton.addEventListener("click", timerReset);
startButton.addEventListener("click", timerPlayPause);
for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener(
    "click",
    timerAddSeconds(parseInt(allButtons[i].id.slice("4")))
  );
}

window.addEventListener("keydown", (key) => {
  console.log(key.code);
  switch (key.code) {
    case "keyS":
    case "keyP":
    case "Enter":
    case "Space":
      timerPlayPause();
      break;
    case "Digit1":
      timerAddSeconds(60)();
      break;
    case "Digit2":
      timerAddSeconds(120)();
      break;
    case "Digit3":
      timerAddSeconds(180)();
      break;
    case "Digit4":
      timerAddSeconds(240)();
      break;
    case "Digit5":
      timerAddSeconds(300)();
      break;
    case "Digit6":
      timerAddSeconds(360)();
      break;
    case "Digit7":
      timerAddSeconds(420)();
      break;
    case "Digit8":
      timerAddSeconds(480)();
      break;
    case "Digit9":
      timerAddSeconds(540)();
      break;
    case "Digit0":
      timerAddSeconds(600)();
      break;
    case "keyR":
    case "Backspace":
      timerReset();
      break;
    default:
      break;
  }
});
