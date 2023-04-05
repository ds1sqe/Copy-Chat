import { Dispatch } from "@reduxjs/toolkit";

import { actions as api } from "../api";

import { actions as group } from "../groups";
import { actions as subgroup } from "../subgroups";
import { actions as channel } from "../channels";
import { actions as membership } from "../memberships";

import { REST } from "../../types/rest.types";
import { emit } from "../../utils/events";
import { getHeaders } from "../../utils/token";

export async function getGroup(dispatch: Dispatch) {
  dispatch(
    api.restCallInit({
      onSuccess: [],
      method: "get",
      headers: await getHeaders(),
      url: `/fetch/group/`,
      callback: (result) => {
        console.log(result);
        if (result?.group !== null && result?.group !== undefined) {
          dispatch(group.fetch(result?.group));
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
    api.restCallInit({
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
          dispatch(group.add(result?.group));
          dispatch(channel.add(result?.channel));
          dispatch(membership.add(result?.membership));
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
    api.restCallInit({
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
          dispatch(group.remove(result?.group_id));
          dispatch(subgroup.remove_by_groupid(result?.group_id));
          dispatch(channel.remove_by_groupid(result?.group_id));
          dispatch(membership.remove_by_groupid(result?.group_id));
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
