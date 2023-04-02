import { Dispatch } from "@reduxjs/toolkit";
import { actions as api } from "../api";
import { actions as group } from "../groups";
import { REST } from "../../types/rest.types";
import { emit } from "../../utils/events";
import { getHeaders } from "../../utils/token";

export async function getGroup(dispatch: Dispatch) {
  dispatch(
    api.restCallInit({
      onSuccess: [],
      method: "get",
      headers: await getHeaders(),
      url: `/group/`,
      callback: (result) => {
        dispatch(group.fetch(result));
      },
      errorCallback: (result) => {
        console.log(result.data);
      },
    })
  );
}

export async function createGroup(
  data: REST.To.Post["/group/"],
  dispatch: Dispatch
) {
  dispatch(
    api.restCallInit({
      onSuccess: [],
      method: "post",
      headers: await getHeaders(),
      data,
      url: `/group/`,
      callback: (result) => {
        if (result?.success) {
          console.log(result);
          emit("PopupNotice", {
            content: "Group Creation Success",
            variant: "success",
          });
          dispatch(group.add(result?.group));
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
