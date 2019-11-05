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
      }

      threshold = newThreshold;
    }
    return sortedArray;
  }

  static quickSort(arrayToSort) {
    if (!arrayToSort || arrayToSort.length === 0 || arrayToSort.length === 1) {
      return arrayToSort;
    }

    return this.doQuickSort(arrayToSort.slice(), 0, arrayToSort.length - 1);
  }

  static doQuickSort(arrayToSort, lowerBound, upperBound) {
    if (lowerBound < upperBound) {
      const middleBound = this.doPartitioning(
        arrayToSort,
        lowerBound,
        upperBound
      );
      this.doQuickSort(arrayToSort, lowerBound, middleBound);
      this.doQuickSort(arrayToSort, middleBound + 1, upperBound);
    }
    return arrayToSort;
  }

  static doPartitioning(arrayToSort, lowerBound, upperBound) {
    const pivot =
      arrayToSort[lowerBound + Math.floor((upperBound - lowerBound) / 2)];
    let leftIndex = lowerBound;
    let rightIndex = upperBound;

    while (1) {
      while (arrayToSort[leftIndex] < pivot) {
        leftIndex += 1;
      }

      while (arrayToSort[rightIndex] > pivot) {
        rightIndex -= 1;
      }

      if (leftIndex >= rightIndex) {
        return rightIndex;
      }

      [arrayToSort[leftIndex], arrayToSort[rightIndex]] = [
        arrayToSort[rightIndex],
        arrayToSort[leftIndex]
      ];
      leftIndex += 1;
      rightIndex -= 1;
    }
  }

  static mergeSort(arrayToSort) {
    if (!arrayToSort || arrayToSort.length === 0 || arrayToSort.length === 1) {
      return arrayToSort;
    }
    const arrayToWork = arrayToSort.slice();

    /* TODO */

    return arrayToSort;
  }

  static splitMerge(arrayToWork, lowerBound, upperBound) {
    if (upperBound - lowerBound === 0) {
      return;
    }
    const middleBound = Math.floor((upperBound + lowerBound) / 2);

    this.splitMerge(arrayToWork, lowerBound, middleBound);
    this.splitMerge(arrayToWork, middleBound + 1, upperBound);

    this.doMerge(arrayToWork, lowerBound, middleBound, upperBound);
  }

  static doMerge(arrayToWork, lowerBound, middleBound, upperBound) {}
}

export default ArrayService;
