import { Dispatch } from "@reduxjs/toolkit";

import { rest_actions } from "../api";

import { REST } from "../../types/rest.types";
import { emit } from "../../utils/events";
import { getHeaders } from "../../utils/token";
import { invitation_actions } from "../invitations";
import { group_actions } from "../groups";
import { ui_actions } from "../ui";

export async function getInvitation(dispatch: Dispatch) {
  dispatch(
    rest_actions.restCallInit({
      onSuccess: [],
      method: "get",
      headers: await getHeaders(),
      url: `/fetch/invitation/`,
      callback: (result) => {
        console.log(result);
        if (result?.invitation !== null && result?.invitation !== undefined) {
          dispatch(invitation_actions.fetch(result?.invitation));
        }
      },
      errorCallback: (result) => {
        console.log(result.data);
      },
    })
  );
}

export async function createInvitation(
  data: REST.To.Post["/invitation/create/"],
  dispatch: Dispatch
) {
  dispatch(
    rest_actions.restCallInit({
      onSuccess: [],
      method: "post",
      headers: await getHeaders(),
      data,
      url: `/invitation/create/`,
      callback: (result) => {
        if (result?.success) {
          console.log(result);
          emit("PopupNotice", {
            content: "Invitation Creation Success",
            variant: "success",
          });
          dispatch(invitation_actions.add(result?.invitation));
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
          content: "Invitation Creation Faild, detail:" + result?.data?.msg,
          variant: "warning",
        });
      },
    })
  );
}

export async function checkInvitation(
  data: REST.To.Post["/invitation/validation/"],
  dispatch: Dispatch
) {
  dispatch(
    rest_actions.restCallInit({
      onSuccess: [],
      method: "post",
      headers: await getHeaders(),
      data,
      url: `/invitation/validation/`,
      callback: (result) => {
        if (result?.success) {
          console.log(result);
          dispatch(ui_actions.setModalDetail(result?.group));
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
          content: "Invitation Validation Faild, detail:" + result?.data?.msg,
          variant: "warning",
        });
      },
    })
  );
}

export async function activateInvitation(
  data: REST.To.Post["/invitation/activation/"],
  dispatch: Dispatch
) {
  dispatch(
    rest_actions.restCallInit({
      onSuccess: [],
      method: "post",
      headers: await getHeaders(),
      data,
      url: `/invitation/activation/`,
      callback: (result) => {
        if (result?.success) {
          console.log(result);
          emit("PopupNotice", {
            content: "Invitation Activation Success",
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
          content: "Invitation Activation Faild, detail:" + result?.data?.msg,
          variant: "warning",
        });
      },
    })
  );
}
