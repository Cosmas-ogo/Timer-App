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
