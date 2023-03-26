import { Dispatch } from "@reduxjs/toolkit";
import { actions as api } from "../store/api";
import { actions } from "../store/auth";
import { REST } from "../types/rest.types";

export function loginUser(
  data: REST.To.Post["/account/login/"],
  dispatch: Dispatch
) {
  dispatch(
    api.restCallInit({
      onSuccess: [],
      method: "post",
      data,
      url: `/account/login/`,
      callback: (result) => {
        dispatch(actions.logInAttempted());
        if (result?.access_token) {
          const token = {
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            expire_on: Date.now() + (5 * 60 * 1000 - 3 * 1000),
          };
          sessionStorage.setItem("token", JSON.stringify(token));
          console.log("dispatch login with:", result?.user);
          dispatch(actions.login(result?.user));
        }
      },
      errorCallback: () => dispatch(actions.logInAttempted()),
    })
  );
}

export function registerUser(
  data: REST.To.Post["/account/register/"],
  dispatch: Dispatch,
  onSuccess: Function
) {
  dispatch(
    api.restCallInit({
      onSuccess: [],
      method: "post",
      data,
      url: `/account/register/`,
      callback: (result) => {
        console.log(result);
        if (result?.success) {
          dispatch(actions.created());
          onSuccess("login");
        }
      },
      errorCallback: () => {
        console.log("error occured on registerUser");
      },
    })
  );
}

// export function logoutUser() {
//   return (dispatch) => {
//     dispatch(actions.loggedOut());
//     localStorage.removeItem("token");
//   };
// }
//
