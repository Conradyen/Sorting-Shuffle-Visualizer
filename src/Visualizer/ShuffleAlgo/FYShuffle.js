import swap from "../SortAlgo/swap";

function FYShuffle(array) {
  const len = array.length;
  //var i = len - 1;
  var animation = [];
  for (var i = 0; i < len - 2; i++) {
    var min = i;
    var max = len;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    animation.push([i, random]);
    animation.push([i, random]);
    animation.push([i, array[random]]);
    animation.push([random, array[i]]);
    swap(array, i, random);
  }
  //console.log(animation);
  return animation;
}

export default FYShuffle;
