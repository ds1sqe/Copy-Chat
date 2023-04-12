import { Dispatch } from "@reduxjs/toolkit";

import { api_actions } from "../api";
import { group_actions } from "../groups";

import { REST } from "../../types/rest.types";
import { emit } from "../../utils/events";
import { getHeaders } from "../../utils/token";

export async function createChannel(
  data: REST.To.Post["/channel/create/"],
  dispatch: Dispatch
) {
  dispatch(
    api_actions.restCallInit({
      onSuccess: [],
      method: "post",
      headers: await getHeaders(),
      data,
      url: `/channel/create/`,
      callback: (result) => {
        if (result?.success) {
          console.log(result);
          emit("PopupNotice", {
            content: "Group Creation Success",
            variant: "success",
          });
          dispatch(group_actions.add_channel(result?.channel));
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

export async function deleteChannel(
  data: REST.To.Post["/channel/delete/"],
  dispatch: Dispatch
) {
  dispatch(
    api_actions.restCallInit({
      onSuccess: [],
      method: "delete",
      headers: await getHeaders(),
      data,
      url: `/channel/delete/`,
      callback: (result) => {
        if (result?.success) {
          console.log(result);
          emit("PopupNotice", {
            content: "Group Remove Success",
            variant: "success",
          });
          dispatch(group_actions.remove_channel(result?.channel_id));
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
