import { ISwapAction, ISortTargetPayload } from "../constants/Itypes";

export default class ShuffleVisualizer {
  arr: Array<ISortTargetPayload>;
  constructor(arr: Array<ISortTargetPayload>) {
    this.arr = arr;
  }
  *FYShuffle(): IterableIterator<ISwapAction> {
    let temparr = [...this.arr];
    for (var i = 0; i < temparr.length - 2; i++) {
      var min = i;
      var max = temparr.length;
      var random = Math.floor(Math.random() * (+max - +min)) + +min;
      yield { type: "swap", first: i, second: random };
      [temparr[i], temparr[random]] = [temparr[random], temparr[i]];
    }
  }
  *SattoloShuffle(): IterableIterator<ISwapAction> {
    let temparr = [...this.arr];
    let i = temparr.length;
    let min = 0;
    while (i > 1) {
      i--;
      var j = Math.floor(Math.random() * (+i - +min)) + +min;
      yield { type: "swap", first: i, second: j };
      [temparr[i], temparr[j]] = [temparr[j], temparr[i]];
    }
  }
  *NaiveShuffle(): IterableIterator<ISwapAction> {
    let temparr = [...this.arr];
    let len = temparr.length;
    let min = 0;
    for (let i = 0; i < len; i++) {
      var j = Math.floor(Math.random() * (+i - +min)) + +min;
      yield { type: "swap", first: i, second: j };
      [temparr[i], temparr[j]] = [temparr[j], temparr[i]];
    }
  }
  *SpotifyShuffle(): IterableIterator<ISwapAction> {}
}
