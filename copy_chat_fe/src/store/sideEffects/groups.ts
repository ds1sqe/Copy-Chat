import { Dispatch } from "@reduxjs/toolkit";
import { actions as api } from "../api";
import { REST } from "../../types/rest.types";
import { emit } from "../../utils/events";
import { getHeaders } from "../../utils/token";

export async function createGroup(
  data: REST.To.Post["/group/create/"],
  dispatch: Dispatch
) {
  dispatch(
    api.restCallInit({
      onSuccess: [],
      method: "post",
      headers: getHeaders(),
      data,
      url: `/group/create/`,
      callback: (result) => {
        if (result?.success) {
          emit("PopupNotice", {
            content: "Group Creation Success",
            variant: "success",
          });
        } else {
          emit("PopupNotice", {
            content: "Group Creation Faild",
            variant: "warning",
          });
        }
      },
      errorCallback: () => {
        emit("PopupNotice", {
          content: "Group Creation Faild",
          variant: "warning",
        });
      },
    })
  );
}
