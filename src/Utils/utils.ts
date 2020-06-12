import { ISwapAction, ISortTargetPayload } from "../constants/Itypes";
import sortingVisualizer from "../Visualizer/SortingVisualizer";
import ShuffleVisualizer from "../Visualizer/ShuffleVisualizer";
export const getSortingGenerator = (
  visualizer: sortingVisualizer,
  algo: number
): IterableIterator<ISwapAction> | null => {
  // 1. bubble sort
  if (algo === 1) {
    return visualizer.BubbleSort();
  } else if (algo === 2) {
    //2. merge sort
    return visualizer.MergeSort();
  } else if (algo === 3) {
    //3. quick sort
    return visualizer.QuickSort();
  } else if (algo === 4) {
    //4. insertion sort
    return visualizer.InsertionSort();
  } else if (algo === 5) {
    return visualizer.SelectionSort();
  } else if (algo === 6) {
    return visualizer.HeapSort();
  } else {
    //return null if error
    return null;
  }
};

export const getSortTarget = (
  size: number,
  arr: Array<number>
): Array<ISortTargetPayload> => {
  let sortObj: Array<ISortTargetPayload> = [];
  for (let i = 0; i < size; i++) {
    sortObj.push({
      value: arr[i],
      isCompared: false,
      isSwapped: false,
      isDone: false,
      isPivot: false,
    });
  }
  return sortObj;
};

export const getShuffleGenerator = (
  visualizer: ShuffleVisualizer,
  algo: number
): IterableIterator<ISwapAction> | null => {
  if (algo === 1) {
    return visualizer.FYShuffle();
  }
  if (algo === 2) {
    return visualizer.SattoloShuffle();
  }
  if (algo === 3) {
    return visualizer.NaiveShuffle();
  }
  return visualizer.FYShuffle();
};
