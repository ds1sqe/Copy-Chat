import { Dispatch } from "@reduxjs/toolkit";

import { actions as api } from "../api";

import { actions as subgroup } from "../subgroups";

import { REST } from "../../types/rest.types";
import { emit } from "../../utils/events";
import { getHeaders } from "../../utils/token";

export async function createSubgroup(
  data: REST.To.Post["/subgroup/create/"],
  dispatch: Dispatch
) {
  dispatch(
    api.restCallInit({
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
          dispatch(subgroup.add(result?.subgroup));
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
    api.restCallInit({
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
          dispatch(subgroup.remove(result?.subgroup_id));
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
