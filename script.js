// const currTime = document.getElementById("current-time");
// let timeNum = +currTime.textContent;
// const resetButton = document.getElementById("reset");
// const startButton = document.getElementById("start");
// const allButtons = [
//   ...document.getElementsByClassName("timer-control-button"),
// ].filter((element) => element.id.slice(0, 3) === "add");

// let intervalId = 0;
// let timerPlaying = false;

// function timerAddSeconds(seconds) {
//   return () => {
//     currTime.textContent = +currTime.textContent + seconds;
//   };
// }

// function timerReset() {
//   timerPlaying = false;
//   startButton.textContent = "Start";
//   clearInterval(intervalId);
//   currTime.textContent = 0;
// }

// function timerPlayPause() {
//   if (timerPlaying) {
//     timerPlaying = false;
//     startButton.textContent = "Start";
//     clearInterval(intervalId);
//   } else {
//     if (+currTime.textContent > 0) {
//       timerPlaying = true;
//       startButton.textContent = "Pause";
//       intervalId = setInterval(timeOneSecond, 100);
//     }
//   }
// }

// function timeOneSecond() {
//   currTime.textContent = +currTime.textContent - 1;
//   if (+currTime.textContent === 0) {
//     timerPlaying = false;
//     startButton.textContent = "Start";
//     clearInterval(intervalId);
//   }
// }

// resetButton.addEventListener("click", timerReset);
// startButton.addEventListener("click", timerPlayPause);
// for (let i = 0; i < allButtons.length; i++) {
//   allButtons[i].addEventListener(
//     "click",
//     timerAddSeconds(parseInt(allButtons[i].id.slice("4")))
//   );
// }

// window.addEventListener("keydown", (key) => {
//   console.log(key.code);
//   switch (key.code) {
//     case "keyS":
//     case "keyP":
//     case "Enter":
//     case "Space":
//       timerPlayPause();
//       break;
//     case "Digit1":
//       timerAddSeconds(60)();
//       break;
//     case "Digit2":
//       timerAddSeconds(120)();
//       break;
//     case "Digit3":
//       timerAddSeconds(180)();
//       break;
//     case "Digit4":
//       timerAddSeconds(240)();
//       break;
//     case "Digit5":
//       timerAddSeconds(300)();
//       break;
//     case "Digit6":
//       timerAddSeconds(360)();
//       break;
//     case "Digit7":
//       timerAddSeconds(420)();
//       break;
//     case "Digit8":
//       timerAddSeconds(480)();
//       break;
//     case "Digit9":
//       timerAddSeconds(540)();
//       break;
//     case "Digit0":
//       timerAddSeconds(600)();
//       break;
//     case "keyR":
//     case "Backspace":
//       timerReset();
//       break;
//     default:
//       break;
//   }
// });

// ===== DOM Element Selectors =====
const currentTimeEl = document.getElementById("current-time");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const addTimeButtons = document.querySelectorAll(".add-time");

// ===== Timer State =====
let currentTime = 0; // in seconds
let countdownInterval = null;
let isPaused = false;

// ===== Utility Functions =====

// Update the display in MM:SS format
function updateDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  currentTimeEl.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

// Add time from a clicked button
function handleAddTimeClick(event) {
  const addedTime = parseInt(event.target.dataset.time);
  currentTime += addedTime;
  updateDisplay();
  console.log(`Added ${addedTime}s. New time: ${currentTime}s`);
}

// Start the countdown
function startCountdown() {
  if (countdownInterval !== null || currentTime <= 0) return;

  countdownInterval = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay();
    } else {
      clearInterval(countdownInterval);
      countdownInterval = null;
      console.log("Countdown finished!");
    }
  }, 1000);
}

// Toggle pause/resume state
function togglePause() {
  if (!isPaused) {
    clearInterval(countdownInterval);
    countdownInterval = null;
    pauseButton.textContent = "Resume";
    isPaused = true;
    console.log("Timer paused");
  } else {
    startCountdown();
    pauseButton.textContent = "Pause";
    isPaused = false;
    console.log("Timer resumed");
  }
}

// Reset the timer
function resetTimer() {
  clearInterval(countdownInterval);
  countdownInterval = null;
  currentTime = 0;
  isPaused = false;
  pauseButton.textContent = "Pause"; // corrected from "Paused"
  updateDisplay();
  console.log("Timer reset");
}

// Handle keyboard shortcuts
function handleKeyboardShortcut(e) {
  if (e.key === "s") startCountdown();
  if (e.key === "p") togglePause();
  if (e.key === "r") resetTimer();
}

// ===== Event Listeners =====

// Add time buttons
addTimeButtons.forEach((button) => {
  button.addEventListener("click", handleAddTimeClick);
});

// Core controls
startButton.addEventListener("click", startCountdown);
pauseButton.addEventListener("click", togglePause);
resetButton.addEventListener("click", resetTimer);

// Keyboard controls
window.addEventListener("keydown", handleKeyboardShortcut);

// Initial UI setup
updateDisplay();
