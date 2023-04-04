import { Dispatch } from "@reduxjs/toolkit";
import { actions as api } from "../api";
import { actions as group } from "../groups";
import { REST } from "../../types/rest.types";
import { emit } from "../../utils/events";
import { getHeaders } from "../../utils/token";
import { Entity } from "../../types/entity.types";

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
          const createdGroup: Entity.Group = {
            ...result?.group,
            channels: [result?.channel],
            memberships: [result?.membership],
          };

          dispatch(group.add(createdGroup));
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
