import swap from "./swap";

function BubbleSort(array) {
  var animation = [];
  var len = array.length;
  var i, j;
  for (i = 0; i < len; i++) {
    for (j = 0; j < len - i; j++) {
      if (array[j] > array[j + 1]) {
        animation.push([j, j + 1]);
        animation.push([j, j + 1]);
        animation.push([j, array[j + 1]]);
        animation.push([j + 1, array[j]]);
        swap(array, j, j + 1);
      }
    }
  }
  //console.log(animation);
  return animation;
}
export default BubbleSort;
