import { createStore, applyMiddleware } from "redux";
import RootReducers from "./reducers/RootReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = createStore(
  RootReducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
