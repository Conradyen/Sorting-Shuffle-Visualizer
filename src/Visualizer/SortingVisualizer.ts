import { ISwapAction, ISortTargetPayload } from "../constants/Itypes";

export default class sortingVisualizer {
  arr: Array<ISortTargetPayload>;
  len: number;

  constructor(array: Array<ISortTargetPayload>) {
    this.arr = array;
    this.len = array.length;
  }
  *BubbleSort(): IterableIterator<ISwapAction> {
    // let n = this.arr.length;
    let temparr = [...this.arr];
    for (let i = 0; i < this.len; i++) {
      for (let j = 0; j < this.len - i - 1; j++) {
        yield { type: "comparison", first: j, second: j + 1 };
        if (temparr[j].value > temparr[j + 1].value) {
          yield { type: "swap", first: j, second: j + 1 };
          [temparr[j], temparr[j + 1]] = [temparr[j + 1], temparr[j]];
        }
      }
    }
  }
  *MergeSort(): IterableIterator<ISwapAction> {
    //improved version from https://www.geeksforgeeks.org/in-place-merge-sort/
    let temparr = [...this.arr];
    function* _merge(
      arr: Array<ISortTargetPayload>,
      start: number,
      mid: number,
      end: number
    ): IterableIterator<ISwapAction> {
      let start2 = mid + 1;
      // If the direct merge is already sorted
      if (temparr[mid].value <= temparr[start2].value) {
        return;
      }
      // Two pointers to maintain start
      // of both arrays to merge
      while (start <= mid && start2 <= end) {
        yield {
          type: "comparison",
          first: start,
          second: start2,
        };
        // If element 1 is in right place
        if (temparr[start].value <= temparr[start2].value) {
          start++;
        } else {
          let index = start2;
          // Shift all the elements between element 1
          // element 2, right by 1.
          while (index !== start) {
            yield {
              type: "swap",
              first: index,
              second: index - 1,
            };
            [temparr[index], temparr[index - 1]] = [
              temparr[index - 1],
              temparr[index],
            ];
            index--;
          }
          start++;
          mid++;
          start2++;
        }
      }
    }
    function* _mergeSortHelper(
      arr: Array<ISortTargetPayload>,
      start: number,
      end: number
    ): IterableIterator<ISwapAction> {
      if (start < end) {
        let mid = Math.floor((start + end) / 2);
        yield* _mergeSortHelper(arr, start, mid);
        yield* _mergeSortHelper(arr, mid + 1, end);
        yield* _merge(arr, start, mid, end);
      }
    }
    yield* _mergeSortHelper(temparr, 0, this.len - 1);
  }

  *QuickSort(): IterableIterator<ISwapAction> {
    function* _qsort(
      temparr: Array<ISortTargetPayload>,
      low_idx: number,
      high_idx: number
    ): IterableIterator<ISwapAction> {
      if (high_idx > low_idx) {
        let pivot = temparr[high_idx].value;
        yield { type: "set_pivot", pivot: high_idx };
        let i = low_idx - 1; // index of smaller element
        for (let j = low_idx; j < high_idx; j++) {
          yield { type: "comparison", first: j, second: low_idx };
          // If current element is smaller than the pivot
          if (temparr[j].value < pivot) {
            i++;
            yield { type: "swap", first: j, second: i };
            [temparr[i], temparr[j]] = [temparr[j], temparr[i]];
          }
        }
        // swap arr[i+1] and arr[high] (or pivot)
        yield { type: "swap", first: i + 1, second: high_idx };
        [temparr[i + 1], temparr[high_idx]] = [
          temparr[high_idx],
          temparr[i + 1],
        ];
        pivot = i + 1;
        // yield { type: "clean_pivot", pivot: high_idx };
        yield* _qsort(temparr, low_idx, pivot - 1);
        yield* _qsort(temparr, pivot + 1, high_idx);
      }
    }
    let temparr = [...this.arr];
    yield* _qsort(temparr, 0, this.len - 1);
  }
  *InsertionSort(): IterableIterator<ISwapAction> {
    let temparr = [...this.arr];
    for (let i = 1; i < temparr.length; ++i) {
      let key = temparr[i].value;
      let j = i - 1;
      /* Move elements of arr[0..i-1], that are 
               greater than key, to one position ahead 
               of their current position */
      yield { type: "comparison", first: j, second: i };
      while (j >= 0 && temparr[j].value > key) {
        yield { type: "swap", first: j, second: j + 1 };
        [temparr[j + 1], temparr[j]] = [temparr[j], temparr[j + 1]];
        j--;
        // yield compare if next is a comparison
        if (j > 0) {
          yield { type: "comparison", first: j - 1, second: i };
        }
      }
    }
  }
  *SelectionSort(): IterableIterator<ISwapAction> {
    let temparr = [...this.arr];
    for (let i = 0; i < this.len - 1; i++) {
      // Find the minimum element in unsorted array
      let min_idx = i;
      let j;
      for (j = i + 1; j < this.len; j++) {
        yield { type: "comparison", first: min_idx, second: j };
        if (temparr[j].value < temparr[min_idx].value) min_idx = j;
      }
      // Swap the found minimum element with the first
      yield { type: "swap", first: min_idx, second: i };
      [temparr[min_idx], temparr[i]] = [temparr[i], temparr[min_idx]];
    }
  }
  *HeapSort(): IterableIterator<ISwapAction> {
    let temparr = [...this.arr];
    let n = this.len;
    function* _heapify(
      arr: Array<ISortTargetPayload>,
      size: number,
      node: number
    ): IterableIterator<ISwapAction> {
      let largest = node; // Initialize largest as root
      let l = 2 * node + 1; // left = 2*i + 1
      let r = 2 * node + 2; // right = 2*i + 2
      // If left child is larger than root
      if (l < size && arr[l].value > arr[largest].value) {
        yield { type: "comparison", first: l, second: largest };
        largest = l;
      }
      // If right child is larger than largest so far
      if (r < size && arr[r].value > arr[largest].value) {
        yield { type: "comparison", first: r, second: largest };
        largest = r;
      }
      // If largest is not root
      if (largest !== node) {
        [arr[node], arr[largest]] = [arr[largest], arr[node]];
        yield { type: "swap", first: node, second: largest };
        // Recursively heapify the affected sub-tree
        yield* _heapify(arr, size, largest);
      }
    }
    function* _heapSort(
      arr: Array<ISortTargetPayload>
    ): IterableIterator<ISwapAction> {
      // Build heap (rearrange array)
      let i: number;
      for (i = n / 2 - 1; i >= 0; i--) {
        yield* _heapify(arr, n, i);
      }
      // One by one extract an element from heap
      for (i = n - 1; i > 0; i--) {
        yield { type: "swap", first: 0, second: i };
        [arr[0], arr[i]] = [arr[i], arr[0]];
        // call max heapify on the reduced heap
        yield* _heapify(arr, i, 0);
      }
    }
    yield* _heapSort(temparr);
  }
}
