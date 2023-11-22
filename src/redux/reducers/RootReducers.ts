import { combineReducers } from "redux";
import MainUiReducer, { MainUiStateType } from "./MainUiReducer";
import AuthReducer, { authStateType } from "./AuthReducer";

export interface RootReducerType {
  MainUi: MainUiStateType;
  authState: authStateType;
}

const RootReducers = combineReducers({
  MainUi: MainUiReducer,
  authState: AuthReducer,
});

export default RootReducers;
