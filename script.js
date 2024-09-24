let currentArray = [];
let isSorting = false; // Flag to control sorting

// Generate a random array of integers
function generateRandomArray(size) {
    currentArray = [];
    for (let i = 0; i < size; i++) {
        currentArray.push(Math.floor(Math.random() * 300) + 1); // Random height between 1 and 300
    }
    updateArrayInDOM();
}

// Update the visual representation of the array
function updateArrayInDOM() {
    const container = document.getElementById("array-container");
    container.innerHTML = ''; // Clear the previous bars
    currentArray.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = value + 'px'; // Set the height of the bar

        const numberDiv = document.createElement('div');
        numberDiv.className = 'number';
        numberDiv.innerText = value; // Display the number
        bar.appendChild(numberDiv); // Append number to bar

        container.appendChild(bar); // Append bar to container
    });
}

// Highlight bars during sorting
function highlightBars(indices, color) {
    const bars = document.querySelectorAll('.bar');
    indices.forEach(index => {
        bars[index].style.backgroundColor = color;
    });
}

// Bubble Sort Algorithm
async function bubbleSort() {
    isSorting = true;
    for (let i = 0; i < currentArray.length - 1; i++) {
        for (let j = 0; j < currentArray.length - i - 1; j++) {
            if (!isSorting) return; // Check if sorting is stopped
            highlightBars([j, j + 1], 'orange'); // Highlight current bars
            if (currentArray[j] > currentArray[j + 1]) {
                // Swap
                [currentArray[j], currentArray[j + 1]] = [currentArray[j + 1], currentArray[j]];
                updateArrayInDOM();
                await new Promise(resolve => setTimeout(resolve, 200)); // Delay for visualization
            }
            highlightBars([j, j + 1], '#4caf50'); // Reset color
        }
    }
}

// Insertion Sort Algorithm
async function insertionSort() {
    isSorting = true;
    for (let i = 1; i < currentArray.length; i++) {
        if (!isSorting) return; // Check if sorting is stopped
        let key = currentArray[i];
        let j = i - 1;
        highlightBars([i], 'orange'); // Highlight current bar
        while (j >= 0 && currentArray[j] > key) {
            currentArray[j + 1] = currentArray[j];
            j--;
            updateArrayInDOM();
            await new Promise(resolve => setTimeout(resolve, 200)); // Delay for visualization
        }
        currentArray[j + 1] = key;
        updateArrayInDOM();
        highlightBars([j + 1], '#4caf50'); // Reset color
    }
}

// Quick Sort Algorithm
async function quickSort(arr, left, right) {
    if (left < right) {
        let pivotIndex = await partition(arr, left, right);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
    }
}

// Partition function for Quick Sort
async function partition(arr, left, right) {
    let pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (!isSorting) return; // Check if sorting is stopped
        highlightBars([j, right], 'orange'); // Highlight current bar and pivot
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            updateArrayInDOM();
            await new Promise(resolve => setTimeout(resolve, 200)); // Delay for visualization
        }
        highlightBars([j, right], '#4caf50'); // Reset color
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    updateArrayInDOM();
    return i + 1;
}

// Merge Sort Algorithm
async function mergeSort(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }
}

// Merge function for Merge Sort
async function merge(arr, left, mid, right) {
    const leftArray = arr.slice(left, mid + 1);
    const rightArray = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        if (!isSorting) return; // Check if sorting is stopped
        highlightBars([k], 'orange'); // Highlight current index
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        updateArrayInDOM();
        await new Promise(resolve => setTimeout(resolve, 200)); // Delay for visualization
        k++;
    }
    
    while (i < leftArray.length) {
        arr[k] = leftArray[i];
        updateArrayInDOM();
        await new Promise(resolve => setTimeout(resolve, 200)); // Delay for visualization
        i++;
        k++;
    }
    
    while (j < rightArray.length) {
        arr[k] = rightArray[j];
        updateArrayInDOM();
        await new Promise(resolve => setTimeout(resolve, 200)); // Delay for visualization
        j++;
        k++;
    }
}

// Function to stop sorting
function stopSorting() {
    isSorting = false;
}

// Event Listeners for buttons
document.getElementById("generate-array").addEventListener("click", () => generateRandomArray(15));
document.getElementById("bubble-sort").addEventListener("click", bubbleSort);
document.getElementById("insertion-sort").addEventListener("click", insertionSort);
document.getElementById("quick-sort").addEventListener("click", async () => {
    isSorting = true;
    await quickSort(currentArray, 0, currentArray.length - 1);
});
document.getElementById("merge-sort").addEventListener("click", async () => {
    isSorting = true;
    await mergeSort(currentArray, 0, currentArray.length - 1);
});
document.getElementById("stop-sorting").addEventListener("click", stopSorting);
