const barsContainer = document.getElementById("bars-container");
const arraySizeInput = document.getElementById("array-size");
const speedInput = document.getElementById("speed-control");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resumeButton = document.getElementById("resume-button");
const restartButton = document.getElementById("restart-button");

let array = [];
let delay = 300;
let isPaused = false;
let isStopped = false;
let sortingPromise = null;

// Generate Bars
function generateBars(size) {
  barsContainer.innerHTML = "";
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar", "bg-blue-400");
    bar.style.height = `${value * 3}px`;
    bar.style.width = `${500 / size}px`;
    barsContainer.appendChild(bar);
  });
}

// Sleep Function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Insertion Sort Algorithm
async function insertionSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 1; i < array.length; i++) {
    if (isStopped) return;

    let key = array[i];
    let j = i - 1;

    bars[i].style.backgroundColor = "yellow";

    while (j >= 0 && array[j] > key) {
      if (isStopped) return;
      // Wait if paused
      while (isPaused) await sleep(50);

      bars[j].style.backgroundColor = "red";
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j] * 3}px`;
      j--;

      await sleep(delay);
      bars[j + 1].style.backgroundColor = "blue";
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key * 3}px`;
    bars[i].style.backgroundColor = "green";
    await sleep(delay);
  }

  sortingPromise = null; // Mark sorting as complete
}

// Event Listeners
arraySizeInput.addEventListener("input", () => {
  document.getElementById("array-size-display").textContent = arraySizeInput.value;
  generateBars(arraySizeInput.value);
});

speedInput.addEventListener("input", () => {
  delay = speedInput.value;
  document.getElementById("speed-display").textContent = `${delay}ms`;
});

startButton.addEventListener("click", () => {
  if (!sortingPromise) {
    isPaused = false;
    isStopped = false;
    sortingPromise = insertionSort();
  }
});

stopButton.addEventListener("click", () => {
  isPaused = true; // Pause sorting
});

resumeButton.addEventListener("click", () => {
  if (isPaused) {
    isPaused = false; // Resume sorting
  }
});

restartButton.addEventListener("click", () => {
  isStopped = true; // Stop sorting completely
  isPaused = false;
  sortingPromise = null; // Reset sorting state
  generateBars(arraySizeInput.value);
});

// Initialize Bars
generateBars(arraySizeInput.value);
