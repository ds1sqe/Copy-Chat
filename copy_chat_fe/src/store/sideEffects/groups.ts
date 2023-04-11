import { Dispatch } from "@reduxjs/toolkit";

import { api_actions } from "../api";

import { group_actions } from "../groups";

import { REST } from "../../types/rest.types";
import { emit } from "../../utils/events";
import { getHeaders } from "../../utils/token";

export async function getGroup(dispatch: Dispatch) {
  dispatch(
    api_actions.restCallInit({
      onSuccess: [],
      method: "get",
      headers: await getHeaders(),
      url: `/fetch/group/`,
      callback: (result) => {
        console.log(result);
        if (result?.groups !== null && result?.groups !== undefined) {
          dispatch(group_actions.fetch(result?.groups));
        }
      },
      errorCallback: (result) => {
        console.log(result.data);
      },
    })
  );
}

export async function createGroup(
  data: REST.To.Post["/group/create/"],
  dispatch: Dispatch
) {
  dispatch(
    api_actions.restCallInit({
      onSuccess: [],
      method: "post",
      headers: await getHeaders(),
      data,
      url: `/group/create/`,
      callback: (result) => {
        if (result?.success) {
          console.log(result);
          emit("PopupNotice", {
            content: "Group Creation Success",
            variant: "success",
          });
          dispatch(group_actions.add(result?.group));
        } else {
          console.log(result);
          emit("PopupNotice", {
            content: result?.msg,
            variant: "warning",
          });
        }
      },
      errorCallback: (result) => {
        console.log(result.data);
        emit("PopupNotice", {
          content: "Group Creation Faild, detail:" + result?.data?.msg,
          variant: "warning",
        });
      },
    })
  );
}

export async function deleteGroup(
  data: REST.To.Post["/group/delete/"],
  dispatch: Dispatch
) {
  dispatch(
    api_actions.restCallInit({
      onSuccess: [],
      method: "delete",
      headers: await getHeaders(),
      data,
      url: `/group/delete/`,
      callback: (result) => {
        if (result?.success) {
          console.log(result);
          emit("PopupNotice", {
            content: "Group Remove Success",
            variant: "success",
          });
          dispatch(group_actions.remove(result?.group_id));
        } else {
          console.log(result);
          emit("PopupNotice", {
            content: result?.msg,
            variant: "warning",
          });
        }
      },
      errorCallback: (result) => {
        console.log(result.data);
        emit("PopupNotice", {
          content: "Group Creation Faild, detail:" + result?.data?.msg,
          variant: "warning",
        });
      },
    })
  );
}

export async function createInvitation() {}
