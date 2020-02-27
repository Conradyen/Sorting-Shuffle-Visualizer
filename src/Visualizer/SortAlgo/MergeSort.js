export default function MergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const temp = array.slice();
  mergeSortHelper(array, 0, array.length - 1, temp, animations);
  return animations;
}

function mergeSortHelper(array, start, end, temp, animations) {
  if (start === end) return;
  const mid = Math.floor((start + end) / 2);
  mergeSortHelper(temp, start, mid, array, animations);
  mergeSortHelper(temp, mid + 1, end, array, animations);
  Merge(array, start, mid, end, temp, animations);
}

function Merge(array, start, mid, end, temp, animations) {
  let k = start;
  let i = start;
  let j = mid + 1;
  while (i <= mid && j <= end) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (temp[i] <= temp[j]) {
      animations.push([k, temp[i]]);
      animations.push([k, temp[i]]);
      array[k++] = temp[i++];
    } else {
      animations.push([k, temp[j]]);
      animations.push([k, temp[j]]);
      array[k++] = temp[j++];
    }
  }
  while (i <= mid) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, temp[i]]);
    animations.push([k, temp[i]]);
    array[k++] = temp[i++];
  }
  while (j <= end) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, temp[j]]);
    animations.push([k, temp[j]]);
    array[k++] = temp[j++];
  }
}
