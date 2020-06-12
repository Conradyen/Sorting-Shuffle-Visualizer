import { ISwapAction, ISortTargetPayload } from "../constants/Itypes";

export default function* checkSorted(
  arr: Array<ISortTargetPayload>
): IterableIterator<ISwapAction> {
  let prev_val = arr[0].value;
  let i;
  for (i = 1; i < arr.length; i++) {
    if (arr[i].value > prev_val) {
      yield { type: "sorted", index: i - 1 };
    } else {
      break;
    }
  }
  yield { type: "sorted", index: i - 1 };
}
