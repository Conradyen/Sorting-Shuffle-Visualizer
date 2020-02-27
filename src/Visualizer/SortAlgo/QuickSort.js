import swap from "./swap";
function QuickSort(array) {
  const animation = [];
  sort(array, 0, array.length - 1, animation);
  return animation;
}

function sort(array, start, end, animation) {
  if (start < end) {
    var pivit = Partition(array, start, end, animation);
    sort(array, start, pivit - 1, animation);
    sort(array, pivit + 1, end, animation);
  }
}

function Partition(array, start, end, animation) {
  var pivot = array[end];
  var i = start - 1; // index of smaller element
  for (let j = start; j < end; j++) {
    // If current element is smaller than the pivot
    if (array[j] < pivot) {
      i++;

      // swap arr[i] and arr[j]
      animation.push([i, j]);
      animation.push([i, j]);
      animation.push([i, array[j]]);
      animation.push([j, array[i]]);
      swap(array, i, j);
    }
  }

  // swap arr[i+1] and arr[high] (or pivot)
  animation.push([i + 1, end]);
  animation.push([i + 1, end]);
  animation.push([i + 1, array[end]]);
  animation.push([end, array[i + 1]]);
  swap(array, i + 1, end);
  return i + 1;
}

export default QuickSort;
