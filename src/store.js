import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import sequenceAction from "redux-sequence-action";
import { composeWithDevTools } from "redux-devtools-extension";
import { customMiddleware } from "./middleware/middleware";
// const initialState = {};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, customMiddleware, sequenceAction))
);

export default store;
