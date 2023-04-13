import { Dispatch } from "@reduxjs/toolkit";
import { rest_actions } from "../api";
import { auth_actions } from "../auth";
import { meta_actions } from "../meta";
import { REST } from "../../types/rest.types";
import { emit } from "../../utils/events";

export const loginUser = async (
  data: REST.To.Post["/account/login/"],
  dispatch: Dispatch
) => {
  dispatch(
    rest_actions.restCallInit({
      onSuccess: [],
      method: "post",
      data,
      url: `/account/login/`,
      callback: (result) => {
        dispatch(auth_actions.logInAttempted());
        if (result?.access_token) {
          const token = {
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            expire_on: Date.now() + (5 * 60 * 1000 - 3 * 1000),
          };
          sessionStorage.setItem("token", JSON.stringify(token));
          dispatch(auth_actions.loginSuccess());
          dispatch(meta_actions.FetchNeeded());

          emit("PopupNotice", { content: "Login Success", variant: "success" });
        } else {
          emit("PopupNotice", {
            content: "Login Faild, Please Check username and password",
            variant: "warning",
          });
        }
      },
      errorCallback: () => {
        dispatch(auth_actions.loginFailed());
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
    rest_actions.restCallInit({
      onSuccess: [],
      method: "post",
      data,
      url: `/account/register/`,
      callback: (result) => {
        if (result?.success) {
          dispatch(auth_actions.created());
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
  dispatch(auth_actions.logOut());
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
}
