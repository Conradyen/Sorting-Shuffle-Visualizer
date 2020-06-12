import {
  UPDATEARRAY,
  UPDATESHUFFLEALGO,
  UPDATEARRAYLEN,
  UPDATESORTALGO,
  ISSORTING,
  SETSWAP,
  SETSPEED,
  ISDARKMODE,
  SETACTION,
  STARTSORTING,
  STARTSHUFFLEING,
  NEXTACTION,
  UPDATEPERFORMSORT,
  UPDATEPERFORMSHUFFLE,
  UPDATEPERFORMCHECK,
  STARTCHECKING,
  UPDATEISREADY,
  ISSHUFFLE,
  ISCHECKING,
} from "../constants/actionTypes";

export const setSwap = (payload: object) => ({
  type: SETSWAP,
  payload,
});

export const setSpeed = (payload: object) => ({
  type: SETSPEED,
  payload,
});

export const setSortAlgorithm = (payload: object) => ({
  type: UPDATESORTALGO,
  payload,
});

export const setShuffleAlgorithm = (payload: object) => ({
  type: UPDATESHUFFLEALGO,
  payload,
});

export const updateArray = (payload: object) => ({
  type: UPDATEARRAY,
  payload,
});

export const setArrayLen = (payload: object) => ({
  type: UPDATEARRAYLEN,
  payload,
});

export const setActions = (payload: object) => ({
  type: SETACTION,
  payload,
});

export const isSorting = (payload: object) => ({
  type: ISSORTING,
  payload,
});

export const isShuffle = (payload: object) => ({
  type: ISSHUFFLE,
  payload,
});

export const isCheck = (payload: object) => ({
  type: ISCHECKING,
  payload,
});

export const setTheme = (payload: object) => ({
  type: ISDARKMODE,
  payload,
});

export const updatePerformSort = (payload: object) => ({
  type: UPDATEPERFORMSORT,
  payload,
});

export const updatePerformShuffle = (payload: object) => ({
  type: UPDATEPERFORMSHUFFLE,
  payload,
});

export const updatePerformCheck = (payload: object) => ({
  type: UPDATEPERFORMCHECK,
  payload,
});

export const resetAll = (payload: object) => ({
  type: UPDATEISREADY,
  payload,
});

export const sleep = async (ms: number): Promise<any> =>
  new Promise((r) => setTimeout(r, ms));

export const startSorting = (payload: object) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: ISSORTING, payload: {} });
  dispatch({ type: STARTSORTING, payload });
  const { actions } = getState();
  // console.log(actions);
  if (actions !== null) {
    let { isActionReady, speed } = getState();
    speed = parseInt(speed);
    while (isActionReady) {
      let newAction = actions.next();
      const payload = newAction.value;
      // console.log(payload);
      if (payload === undefined) {
        const cleanAction = {
          type: "clean",
        };
        dispatch({
          type: NEXTACTION,
          payload: cleanAction,
        });
        break;
      }
      if (payload.type === "comparison" || payload.type === "set_pivot") {
        const cleanAction = {
          type: "clean",
        };
        dispatch({
          type: NEXTACTION,
          payload: cleanAction,
        });
        await sleep(speed);
      } else if (payload.type === "swap") {
        const swapColors = {
          type: "swapColors",
          first: payload.first,
          second: payload.second,
        };
        dispatch({
          type: NEXTACTION,
          payload: swapColors,
        });
        await sleep(speed);
      }
      dispatch({
        type: NEXTACTION,
        payload,
      });
      await sleep(speed);
    }
    dispatch({ type: ISSORTING, payload: {} });
  }
};

export const startShuffle = (payload: object) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: ISSHUFFLE, payload: {} });
  dispatch({ type: STARTSHUFFLEING, payload });
  const { actions } = getState();
  // console.log(actions);
  if (actions !== null) {
    let { isActionReady, speed } = getState();
    speed = parseInt(speed);
    while (isActionReady) {
      let newAction = actions.next();
      const payload = newAction.value;
      // console.log(payload);
      const cleanAction = {
        type: "clean",
      };
      if (payload === undefined) {
        dispatch({
          type: NEXTACTION,
          payload: cleanAction,
        });
        break;
      }
      if (payload.type === "swap") {
        const swapColors = {
          type: "swapColors",
          first: payload.first,
          second: payload.second,
        };
        dispatch({
          type: NEXTACTION,
          payload: swapColors,
        });
        await sleep(speed);
      }
      dispatch({
        type: NEXTACTION,
        payload,
      });
      await sleep(speed);
      dispatch({
        type: NEXTACTION,
        payload: cleanAction,
      });
      await sleep(speed);
    }
    dispatch({ type: ISSHUFFLE, payload: {} });
  }
};

export const startCheck = (payload: object) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: ISCHECKING, payload: {} });
  //start check is check is select
  dispatch({ type: STARTCHECKING, payload });
  const { actions } = getState();
  // console.log(actions);
  if (actions !== null) {
    let { isActionReady, speed } = getState();
    speed = parseInt(speed);
    while (isActionReady) {
      let newAction = actions.next();
      const payload = newAction.value;
      // console.log(payload);
      if (payload === undefined) {
        const stopAction = {
          type: "stop",
        };
        dispatch({
          type: NEXTACTION,
          payload: stopAction,
        });
        break;
      }
      dispatch({
        type: NEXTACTION,
        payload,
      });
      await sleep(speed);
    }
    dispatch({ type: ISCHECKING, payload: {} });
  }
};

export const doActions = (payload: object) => (
  dispatch: any,
  getState: any
) => {
  // console.log(payload);
  const { performeSort, performeShuffle, performeCheck } = getState();
  let actions = [];
  if (performeSort) actions.push(startShuffle(payload));
  if (performeShuffle) actions.push(startSorting(payload));
  if (performeCheck) actions.push(startCheck(payload));

  return dispatch(actions);
};
