import { Dispatch } from "@reduxjs/toolkit";

import { rest_actions } from "../api";
import { group_actions } from "../groups";

import { REST } from "../../types/rest.types";
import { emit } from "../../utils/events";
import { getHeaders } from "../../utils/token";

export async function createSubgroup(
  data: REST.To.Post["/subgroup/create/"],
  dispatch: Dispatch
) {
  dispatch(
    rest_actions.restCallInit({
      onSuccess: [],
      method: "post",
      headers: await getHeaders(),
      data,
      url: `/subgroup/create/`,
      callback: (result) => {
        if (result?.success) {
          console.log(result);
          emit("PopupNotice", {
            content: "Group Creation Success",
            variant: "success",
          });
          dispatch(group_actions.add_subgroup(result?.subgroup));
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

export async function deleteSubgroup(
  data: REST.To.Post["/subgroup/delete/"],
  dispatch: Dispatch
) {
  dispatch(
    rest_actions.restCallInit({
      onSuccess: [],
      method: "delete",
      headers: await getHeaders(),
      data,
      url: `/subgroup/delete/`,
      callback: (result) => {
        if (result?.success) {
          console.log(result);
          emit("PopupNotice", {
            content: "Group Remove Success",
            variant: "success",
          });
          dispatch(group_actions.remove_subgroup(result?.subgroup_id));
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
