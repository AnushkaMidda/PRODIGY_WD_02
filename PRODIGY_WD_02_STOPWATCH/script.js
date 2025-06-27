let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 1;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function timeToString(time) {
  const ms = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
  const secs = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
  const mins = Math.floor((time / 60000) % 60).toString().padStart(2, '0');
  const hrs = Math.floor(time / 3600000).toString().padStart(2, '0');
  return `${hrs}:${mins}:${secs}.${ms}`;
}

function updateDisplay() {
  display.textContent = timeToString(elapsedTime);
  
  // Restart animation every tick
  display.classList.remove("time");
  void display.offsetWidth; // Force reflow
  display.classList.add("time");
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
  startStopBtn.textContent = "Pause";
  isRunning = true;
}

function pause() {
  clearInterval(timerInterval);
  startStopBtn.textContent = "Start";
  isRunning = false;
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = '';
  startStopBtn.textContent = "Start";
  lapCount = 1;
  isRunning = false;
}

function lap() {
  if (!isRunning) return;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapCount++}: ${timeToString(elapsedTime)}`;
  lapsList.appendChild(li);
}

startStopBtn.addEventListener("click", () => {
  isRunning ? pause() : start();
});

resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

const themeToggleBtn = document.getElementById("themeToggle");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Optional: Change icon
  if (document.body.classList.contains("dark")) {
    themeToggleBtn.textContent = "☀️ Light Mode";
  } else {
    themeToggleBtn.textContent = "🌙 Dark Mode";
  }
});

const themeColorInput = document.getElementById("themeColor");

themeColorInput.addEventListener("input", (e) => {
  const color = e.target.value;

  // Apply to all buttons
  document.querySelectorAll(".buttons button").forEach(btn => {
    btn.style.backgroundColor = color;
    btn.style.boxShadow = `0 4px 10px ${color}80`; // with transparency
  });

  // Apply to lap entries
  document.querySelectorAll("#laps li").forEach(lap => {
    lap.style.borderLeft = `4px solid ${color}`;
  });
});

// Loader screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.querySelector(".container").style.display = "block";
  }, 2000); // 2 second loader
});

function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  const hrs = now.getHours().toString().padStart(2, '0');
  const mins = now.getMinutes().toString().padStart(2, '0');
  const secs = now.getSeconds().toString().padStart(2, '0');
  clock.textContent = `${hrs}:${mins}:${secs}`;
}

setInterval(updateClock, 1000);
updateClock(); // Call once immediately
