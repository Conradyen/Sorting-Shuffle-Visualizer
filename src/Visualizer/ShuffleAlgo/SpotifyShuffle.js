import swap from "../SortAlgo/swap";

//https://labs.spotify.com/2014/02/28/how-to-shuffle-songs/
function SpotifyShuffle(array) {
  var animation = [];
  var clusterMap = { c1: [], c2: [], c3: [] };
  //var idx = { c1: 0, c2: 0, c3: 0 };
  cluster(array, clusterMap);
  var len = array.length;
  //   var offset = [0, 1, 2];
  //   FY_Shuffle(offset);
  let j = 0;
  var idx;
  while (j <= len - 1) {
    console.log(j);
    if (clusterMap.c1.length !== 0) {
      idx = clusterMap.c1.pop();
      pushAnimation(array, animation, j, idx);
      swap(array, j, idx);
      j++;
    }
    if (clusterMap.c2.length !== 0) {
      idx = clusterMap.c2.pop();
      pushAnimation(array, animation, j, idx);
      swap(array, j, idx);
      j++;
    }
    if (clusterMap.c3.length !== 0) {
      idx = clusterMap.c3.pop();
      pushAnimation(array, animation, j, idx);
      swap(array, j, idx);
      j++;
    }
  }
  return animation;
}

function pushAnimation(array, animation, i, j) {
  animation.push([i, j]);
  animation.push([i, j]);
  animation.push([i, array[j]]);
  animation.push([j, array[i]]);
}

function cluster(array, map) {
  for (let i = 0; i <= array.length - 1; i++) {
    var num = array[i];
    if (num < 300) {
      map.c1.push(i);
    } else if (num < 500 && num >= 300) {
      map.c2.push(i);
    } else {
      map.c3.push(i);
    }
  }
  FY_Shuffle(map.c1);
  FY_Shuffle(map.c2);
  FY_Shuffle(map.c3);
}

function FY_Shuffle(array) {
  const len = array.length;
  for (var i = 0; i < len - 2; i++) {
    var min = i;
    var max = len;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    swap(array, i, random);
  }
}

export default SpotifyShuffle;
