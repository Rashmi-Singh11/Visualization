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

// Selection Sort Algorithm
async function selectionSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length - 1; i++) {
    if (isStopped) return;

    let minIndex = i;
    bars[i].style.backgroundColor = "yellow"; // Mark the current element

    for (let j = i + 1; j < array.length; j++) {
      if (isStopped) return;
      // Wait if paused
      while (isPaused) await sleep(50);

      bars[j].style.backgroundColor = "red"; // Mark the compared element
      await sleep(delay);

      if (array[j] < array[minIndex]) {
        if (minIndex !== i) {
          bars[minIndex].style.backgroundColor = "blue"; // Reset previous min element
        }
        minIndex = j; // Update min index
        bars[minIndex].style.backgroundColor = "yellow"; // Highlight new minimum element
      } else {
        bars[j].style.backgroundColor = "blue"; // Reset compared element
      }
    }

    // Swap the elements
    if (minIndex !== i) {
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      bars[i].style.height = `${array[i] * 3}px`;
      bars[minIndex].style.height = `${array[minIndex] * 3}px`;
    }

    bars[i].style.backgroundColor = "green"; // Mark the sorted element
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
    sortingPromise = selectionSort(); // Start selection sort
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
