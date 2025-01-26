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

// Quick Sort Algorithm
async function quickSort(start = 0, end = array.length - 1) {
  if (start < end) {
    if (isStopped) return;

    const pivotIndex = await partition(start, end); // Partition the array
    await quickSort(start, pivotIndex - 1); // Sort the left part
    await quickSort(pivotIndex + 1, end); // Sort the right part
  }
}

// Partition Function
async function partition(start, end) {
  const bars = document.getElementsByClassName("bar");
  const pivotValue = array[end];
  let pivotIndex = start;

  bars[end].style.backgroundColor = "yellow"; // Highlight pivot

  for (let i = start; i < end; i++) {
    if (isStopped) return;
    // Wait if paused
    while (isPaused) await sleep(50);

    bars[i].style.backgroundColor = "red"; // Highlight current comparison
    await sleep(delay);

    if (array[i] < pivotValue) {
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]]; // Swap
      bars[i].style.height = `${array[i] * 3}px`;
      bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;
      pivotIndex++;
    }

    bars[i].style.backgroundColor = "blue"; // Reset bar color
  }

  // Swap pivot to the correct position
  [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
  bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;
  bars[end].style.height = `${array[end] * 3}px`;

  bars[pivotIndex].style.backgroundColor = "green"; // Mark pivot as sorted
  bars[end].style.backgroundColor = "blue"; // Reset bar color

  return pivotIndex;
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
    sortingPromise = quickSort(); // Start quick sort
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
