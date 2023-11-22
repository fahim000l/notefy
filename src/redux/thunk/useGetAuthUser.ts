import { AnyAction, Dispatch } from "redux";
import { RootReducerType } from "../reducers/RootReducers";

const useGetAuthUser = (email: string) => {
  return (dispatch: any) => {
    dispatch({ type: "AUTH_LOADING" });
    fetch(`/api/get-auth-user?email=${email}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "AUTH_LOADED", payload: data?.[0] }));
  };
};

export default useGetAuthUser;
