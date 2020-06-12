import getrandomIntArray from "../randomIntArray";
import {
  UPDATEARRAY,
  UPDATESHUFFLEALGO,
  UPDATEARRAYLEN,
  UPDATESORTALGO,
  ISSORTING,
  STARTSORTING,
  ISDARKMODE,
  NEXTACTION,
  STARTSHUFFLEING,
  SETSPEED,
  UPDATEPERFORMSORT,
  UPDATEPERFORMSHUFFLE,
  UPDATEPERFORMCHECK,
  STARTCHECKING,
  UPDATEISREADY,
  ISSHUFFLE,
  ISCHECKING,
} from "../constants/actionTypes";
import sortingVisualizer from "../Visualizer/SortingVisualizer";
import ShuffleVisualizer from "../Visualizer/ShuffleVisualizer";
import {
  getSortingGenerator,
  getShuffleGenerator,
  getSortTarget,
} from "../Utils/utils";
import { ISwapAction, ISortTargetPayload } from "../constants/Itypes";
import checkSorted from "../Visualizer/CheckVisualizer";

interface IState {
  isActionReady: boolean;
  isShuffleReady: boolean;
  isSorting: boolean;
  isShuffle: boolean;
  isCheck: boolean;
  initArray: Array<number>;
  sortTarget: Array<ISortTargetPayload>;
  sortAlgo: number;
  shuffleAlgo: number;
  arrayLength: number;
  actions: IterableIterator<ISwapAction> | null;
  nextactions: ISwapAction | null;
  speed: string;
  isDark: boolean;
  performeSort: boolean;
  performeShuffle: boolean;
  performeCheck: boolean;
}

const initState: IState = {
  isActionReady: false,
  isShuffleReady: false,
  isSorting: false,
  isShuffle: false,
  isCheck: false,
  initArray: getrandomIntArray(),
  sortTarget: getSortTarget(10, getrandomIntArray()),
  sortAlgo: 1,
  shuffleAlgo: 1,
  arrayLength: 10,
  actions: null,
  nextactions: null,
  speed: "100",
  isDark: false,
  performeSort: true,
  performeShuffle: true,
  performeCheck: true,
};

export default function paramReducer(
  state: IState = initState,
  action: any
): IState {
  switch (action.type) {
    case STARTSORTING:
      const isActionReady = action.payload;
      // console.log(isSortReady);
      let { sortTarget } = state;
      let actions = null;
      let nextAction: ISwapAction | null = null;
      if (isActionReady) {
        const { sortAlgo } = state;
        // console.log(sortAlgo);
        const s = new sortingVisualizer(sortTarget);
        actions = getSortingGenerator(s, sortAlgo);
        // console.log(actions);
      }
      return {
        ...state,
        actions,
        isActionReady,
        nextactions: nextAction,
        sortTarget,
      };
    case STARTSHUFFLEING:
      const Ready = action.payload;
      // console.log(isSortReady);
      let target = state.sortTarget;
      let a = null;
      let nA: ISwapAction | null = null;
      if (Ready) {
        const { shuffleAlgo } = state;
        const s = new ShuffleVisualizer(target);
        a = getShuffleGenerator(s, shuffleAlgo);
      }
      return {
        ...state,
        actions: a,
        isActionReady: Ready,
        nextactions: nA,
      };

    case STARTCHECKING:
      const ischeckReady = action.payload;
      // console.log(isSortReady);
      let curtarget = state.sortTarget;
      let newaction = null;
      let nextA: ISwapAction | null = null;
      if (ischeckReady) {
        newaction = checkSorted(curtarget);
      }
      return {
        ...state,
        actions: newaction,
        isActionReady: ischeckReady,
        nextactions: nextA,
      };
    case UPDATEARRAY:
      // console.log("here in update array");
      // const { arr } = ;
      return { ...state, sortTarget: action.payload.sortTarget };
    case UPDATESORTALGO:
      return { ...state, sortAlgo: action.payload };
    case UPDATESHUFFLEALGO:
      return { ...state, shuffleAlgo: action.payload };
    case UPDATEARRAYLEN:
      let newTarget = getSortTarget(action.payload, state.initArray);
      // actions = null;
      // nextAction = null;
      return {
        ...state,
        arrayLength: action.payload,
        sortTarget: newTarget,
      };
    case ISSORTING:
      const { isSorting } = state;
      return { ...state, isSorting: !isSorting };
    case ISSHUFFLE:
      const { isShuffle } = state;
      return { ...state, isShuffle: !isShuffle };
    case ISCHECKING:
      const { isCheck } = state;
      return { ...state, isCheck: !isCheck };
    case ISDARKMODE:
      const { isDark } = action.payload;
      return { ...state, isDark };
    case NEXTACTION:
      //update next action
      const ready = state.isActionReady;
      return {
        ...state,
        nextactions: ready ? action.payload : null,
      };
    case SETSPEED:
      return { ...state, speed: action.payload };
    case UPDATEPERFORMSORT:
      return { ...state, performeSort: action.payload.performeSort };
    case UPDATEPERFORMSHUFFLE:
      return { ...state, performeShuffle: action.payload.performeShuffle };
    case UPDATEPERFORMCHECK:
      return { ...state, performeCheck: action.payload.performeCheck };
    case UPDATEISREADY:
      return { ...state, isActionReady: false };
    default:
      return { ...state };
  }
}
