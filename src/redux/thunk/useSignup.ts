import { RootReducerType } from "../reducers/RootReducers";
import { Action, AnyAction, Dispatch } from "redux";
import { CTUser } from "@/pages/signup";
import useGetAuthUser from "./useGetAuthUser";

const useSignup = (userInfo: CTUser) => {
  return async (dispatch: any) => {
    dispatch({ type: "AUTH_LOADING" });
    fetch("/api/auth/store-user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        const email = data?.result?.email;
        if (email) {
          dispatch(useGetAuthUser(email));
        }
      });
  };
};

export default useSignup;
