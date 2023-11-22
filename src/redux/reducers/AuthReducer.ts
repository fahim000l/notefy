import { CTUser } from "@/pages/signup";

export interface authStateType {
  authUser: CTUser | null;
  authLoader: boolean;
}
export interface authActionType {
  type?: "AUTH_LOADING" | "AUTH_LOADED";
  payload: CTUser;
}

const authState: authStateType = {
  authUser: null,
  authLoader: false,
};

const AuthReducer = (state = authState, action: authActionType) => {
  switch (action?.type) {
    case "AUTH_LOADING":
      return { ...state, authLoader: true };
    case "AUTH_LOADED":
      return { ...state, authUser: action?.payload, authLoader: false };
    default:
      return state;
  }
};

export default AuthReducer;
