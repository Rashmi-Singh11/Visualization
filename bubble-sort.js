// DOM Elements
const barsContainer = document.getElementById("bars-container");
const arraySizeSlider = document.getElementById("array-size");
const arraySizeDisplay = document.getElementById("array-size-display");
const speedControlSlider = document.getElementById("speed-control");
const speedDisplay = document.getElementById("speed-display");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resumeButton = document.getElementById("resume-button");
const restartButton = document.getElementById("restart-button");

// State Variables
let array = [];
let delay = parseInt(speedControlSlider.value);
let isPaused = false;
let stopRequested = false;

// Update Array Size Display
arraySizeSlider.addEventListener("input", () => {
  arraySizeDisplay.textContent = arraySizeSlider.value;
  generateBars();
});

// Update Speed Display
speedControlSlider.addEventListener("input", () => {
  delay = parseInt(speedControlSlider.value);
  speedDisplay.textContent = `${delay}ms`;
});

// Generate Random Array
const generateRandomArray = (size, min, max) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

// Create Bars
const createBars = (array) => {
  barsContainer.innerHTML = ""; // Clear existing bars
  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.style.height = `${value}px`;
    bar.style.width = "20px";
    bar.style.backgroundColor = "#38bdf8";
    bar.style.margin = "0 5px";
    bar.classList.add("bar");
    barsContainer.appendChild(bar);
  });
};

// Generate Bars Initially
const generateBars = () => {
  array = generateRandomArray(arraySizeSlider.value, 50, 300);
  createBars(array);
};
generateBars();

// Bubble Sort Algorithm with Pause and Stop
const bubbleSort = async () => {
  const bars = document.querySelectorAll(".bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (stopRequested) return;

      while (isPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;

        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      bars[j].style.backgroundColor = "#38bdf8";
      bars[j + 1].style.backgroundColor = "#38bdf8";
    }
    bars[array.length - i - 1].style.backgroundColor = "green";
  }
};

// Event Listeners for Buttons
startButton.addEventListener("click", () => {
  isPaused = false;
  stopRequested = false;
  bubbleSort();
});

stopButton.addEventListener("click", () => {
  isPaused = true;
});

resumeButton.addEventListener("click", () => {
  isPaused = false;
});

restartButton.addEventListener("click", () => {
  isPaused = false;
  stopRequested = true;
  generateBars();
});
