import { Dispatch } from "@reduxjs/toolkit";
import { actions as api } from "../api";
import { actions as auth } from "../auth";
import { REST } from "../../types/rest.types";
import { emit } from "../../utils/events";

export const loginUser = async (
  data: REST.To.Post["/account/login/"],
  dispatch: Dispatch
) => {
  dispatch(
    api.restCallInit({
      onSuccess: [],
      method: "post",
      data,
      url: `/account/login/`,
      callback: (result) => {
        dispatch(auth.logInAttempted());
        if (result?.access_token) {
          const token = {
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            expire_on: Date.now() + (5 * 60 * 1000 - 3 * 1000),
          };
          sessionStorage.setItem("token", JSON.stringify(token));
          dispatch(auth.loginSuccess());
          emit("PopupNotice", { content: "Login Success", variant: "success" });
        } else {
          emit("PopupNotice", {
            content: "Login Faild, Please Check username and password",
            variant: "warning",
          });
        }
      },
      errorCallback: () => {
        dispatch(auth.loginFailed());
        emit("PopupNotice", {
          content: "Login Faild, Please Check username and password",
          variant: "warning",
        });
      },
    })
  );
};

export function registerUser(
  data: REST.To.Post["/account/register/"],
  dispatch: Dispatch
) {
  dispatch(
    api.restCallInit({
      onSuccess: [],
      method: "post",
      data,
      url: `/account/register/`,
      callback: (result) => {
        if (result?.success) {
          dispatch(auth.created());
          emit("PopupNotice", {
            content: "Account created. Please Login",
            variant: "success",
          });
        } else if (result?.msg) {
          emit("PopupNotice", {
            content: result?.msg,
            variant: "warning",
          });
        }
      },
      errorCallback: () => {},
    })
  );
}

export function logoutUser(dispatch: Dispatch) {
  dispatch(auth.logOut());
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
}
