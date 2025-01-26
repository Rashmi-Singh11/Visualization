# Visualization
Overview
The Sorting Visualizer is a web application that visually demonstrates various sorting algorithms, including Bubble Sort, Insertion Sort, Quick Sort, and Merge Sort. Users can generate a random array of integers and watch the algorithms sort the array in real time, with the heights of the bars representing the values in the array.

Technologies Used
HTML: Structure of the web application.
CSS: Styling and layout to create an attractive user interface.
JavaScript: Functionality and logic for the sorting algorithms and interaction handling.
Features
Random Array Generation: Generate a new array of random integers to visualize sorting.
Sorting Algorithms: Choose from four different sorting algorithms:
Bubble Sort
Insertion Sort
Quick Sort
Merge Sort
Real-time Visualization: The heights of the bars change as the sorting algorithms progress, allowing users to see how the sorting works step-by-step.
Stop Button: Users can stop the sorting process at any time, providing control over the visualization.
Number Display: Each bar displays the value it represents for easy understanding of the sorting process.
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/Rashmi-Singh11/Visualization
cd sorting-visualizer
Open the index.html file in your web browser to view the application.

Usage
Click the "Generate Array" button to create a new random array.
Select a sorting algorithm by clicking on the corresponding button (Bubble Sort, Insertion Sort, Quick Sort, or Merge Sort).
Watch the sorting process in real-time as the bars change color and height.
Click the "Stop Sorting" button to halt the sorting process at any time.
Code Explanation
generateRandomArray(size): Generates a random array of integers and updates the visual representation.
updateArrayInDOM(): Updates the DOM to reflect the current state of the array with bars representing values.
highlightBars(indices, color): Highlights specific bars during the sorting process for visual feedback.
Sorting Algorithms: Each algorithm (Bubble Sort, Insertion Sort, Quick Sort, Merge Sort) is implemented as an asynchronous function that updates the visualization step-by-step.
Contribution
Contributions are welcome! If you have suggestions for improvements or features, please feel free to submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Inspired by the need to understand sorting algorithms through visual representation.
Thanks to all contributors and open-source libraries that helped in the development of this project.

#Live

https://rashmi-visualization-27j5.vercel.app/
