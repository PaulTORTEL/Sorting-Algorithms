class ArrayService {
  static generateArray(length, min, max) {
    const generatedArray = [];

    for (let i = 0; i < length; i += 1) {
      generatedArray.push(Math.floor(Math.random() * (max - min + 1) + min));
    }

    return generatedArray;
  }

  static bubbleSort(arrayToSort) {
    if (!arrayToSort || arrayToSort.length === 0 || arrayToSort.length === 1) {
      return arrayToSort;
    }
    const sortedArray = arrayToSort.slice();
    let threshold = sortedArray.length;

    const resultSteps = [];

    while (threshold > 1) {
      let newThreshold = 0;

      for (let i = 1; i < threshold; i += 1) {
        if (sortedArray[i - 1] > sortedArray[i]) {
          [sortedArray[i - 1], sortedArray[i]] = [
            sortedArray[i],
            sortedArray[i - 1]
          ];
          newThreshold = i;
        }

        resultSteps.push({
          item1: {
            index: i - 1,
            isFixed: false
          },
          item2: {
            index: i,
            isFixed: i + 1 === threshold && newThreshold !== threshold
          },
          currArray: sortedArray.slice()
        });
      }

      threshold = newThreshold;
    }
    return resultSteps;
  }

  static quickSort(arrayToSort) {
    if (!arrayToSort || arrayToSort.length === 0 || arrayToSort.length === 1) {
      return { currArray: arrayToSort.slice() };
    }
    const resultSteps = [];
    this.doQuickSort(
      arrayToSort.slice(),
      0,
      arrayToSort.length - 1,
      resultSteps
    );
    return resultSteps;
  }

  static doQuickSort(arrayToSort, lowerBound, upperBound, resultSteps) {
    if (lowerBound < upperBound) {
      const middleBound = this.doPartitioning(
        arrayToSort,
        lowerBound,
        upperBound,
        resultSteps
      );
      this.doQuickSort(arrayToSort, lowerBound, middleBound, resultSteps);
      this.doQuickSort(arrayToSort, middleBound + 1, upperBound, resultSteps);
    }
  }

  static doPartitioning(arrayToSort, lowerBound, upperBound, resultSteps) {
    const pivot =
      arrayToSort[lowerBound + Math.floor((upperBound - lowerBound) / 2)];
    let leftIndex = lowerBound;
    let rightIndex = upperBound;

    while (1) {
      const step = {};
      while (arrayToSort[leftIndex] < pivot) {
        leftIndex += 1;
      }

      while (arrayToSort[rightIndex] > pivot) {
        rightIndex -= 1;
      }

      step.item1 = {
        index: leftIndex,
        isFixed: false
      };
      step.item2 = {
        index: rightIndex,
        isFixed: false
      };

      if (leftIndex >= rightIndex) {
        step.currArray = arrayToSort.slice();
        resultSteps.push(step);
        return rightIndex;
      }

      [arrayToSort[leftIndex], arrayToSort[rightIndex]] = [
        arrayToSort[rightIndex],
        arrayToSort[leftIndex]
      ];
      step.currArray = arrayToSort.slice();
      resultSteps.push(step);
      leftIndex += 1;
      rightIndex -= 1;
    }
  }

  static mergeSort(arrayToSort) {
    if (!arrayToSort || arrayToSort.length === 0 || arrayToSort.length === 1) {
      return arrayToSort;
    }
    const arrayToWork = arrayToSort.slice();

    this.splitMerge(arrayToWork, arrayToSort, 0, arrayToWork.length);

    return arrayToWork;
  }

  static splitMerge(arrayToWork, arrayToSort, lowerBound, upperBound) {
    if (upperBound - lowerBound <= 1) {
      return;
    }
    const middleBound = Math.floor((upperBound + lowerBound) / 2);

    // Modifies and sorts arrayToSort
    this.splitMerge(arrayToSort, arrayToWork, lowerBound, middleBound);
    this.splitMerge(arrayToSort, arrayToWork, middleBound, upperBound);

    // Rewrite arrayToWork
    this.doMerge(arrayToSort, arrayToWork, lowerBound, middleBound, upperBound);
  }

  static doMerge(
    arrayToWork,
    arrayToSort,
    lowerBound,
    middleBound,
    upperBound
  ) {
    let left = lowerBound;
    let right = middleBound;

    for (let i = lowerBound; i < upperBound; i += 1) {
      if (
        left < middleBound &&
        (right >= upperBound || arrayToWork[left] <= arrayToWork[right])
      ) {
        arrayToSort[i] = arrayToWork[left];
        left += 1;
      } else {
        arrayToSort[i] = arrayToWork[right];
        right += 1;
      }
    }
  }
}

export default ArrayService;
