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

// Merge Sort Algorithm
async function mergeSort(start = 0, end = array.length - 1) {
  const bars = document.getElementsByClassName("bar");

  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);

  // Split the array into two halves and sort each recursively
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);

  // Merge the two sorted halves
  await merge(start, mid, end);
}

// Merge Function to combine two halves
async function merge(start, mid, end) {
  const bars = document.getElementsByClassName("bar");

  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);
  let leftIndex = 0;
  let rightIndex = 0;
  let mergeIndex = start;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (isStopped) return;
    // Wait if paused
    while (isPaused) await sleep(50);

    bars[mergeIndex].style.backgroundColor = "yellow"; // Highlight current bar
    bars[mid + 1 + rightIndex].style.backgroundColor = "red"; // Highlight right half element

    await sleep(delay);

    if (left[leftIndex] <= right[rightIndex]) {
      array[mergeIndex] = left[leftIndex];
      bars[mergeIndex].style.height = `${array[mergeIndex] * 3}px`;
      leftIndex++;
    } else {
      array[mergeIndex] = right[rightIndex];
      bars[mergeIndex].style.height = `${array[mergeIndex] * 3}px`;
      rightIndex++;
    }

    mergeIndex++;
    bars[mergeIndex - 1].style.backgroundColor = "blue"; // Reset bar color
  }

  // Copy remaining elements
  while (leftIndex < left.length) {
    if (isStopped) return;
    // Wait if paused
    while (isPaused) await sleep(50);

    array[mergeIndex] = left[leftIndex];
    bars[mergeIndex].style.height = `${array[mergeIndex] * 3}px`;
    leftIndex++;
    mergeIndex++;
    await sleep(delay);
  }

  while (rightIndex < right.length) {
    if (isStopped) return;
    // Wait if paused
    while (isPaused) await sleep(50);

    array[mergeIndex] = right[rightIndex];
    bars[mergeIndex].style.height = `${array[mergeIndex] * 3}px`;
    rightIndex++;
    mergeIndex++;
    await sleep(delay);
  }

  // Mark the merged portion as sorted
  for (let i = start; i <= end; i++) {
    bars[i].style.backgroundColor = "green"; // Mark as sorted
  }

  await sleep(delay);
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
    sortingPromise = mergeSort(); // Start merge sort
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
