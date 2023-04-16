import { Dispatch } from "@reduxjs/toolkit";
import { WS } from "../../types/ws.types";
import { ws_actions } from "../api";

export const sendJoin = async (data: WS.To["rtc.join"], dispatch: Dispatch) => {
  dispatch(
    ws_actions.wsCallInit({
      event: "rtc.join",
      data: data,
    })
  );
};

export const sendOffer = async (
  data: WS.To["rtc.sdp.offer"],
  dispatch: Dispatch
) => {
  dispatch(
    ws_actions.wsCallInit({
      event: "rtc.sdp.offer",
      data: data,
    })
  );
};

export const sendAnswer = async (
  data: WS.To["rtc.sdp.answer"],
  dispatch: Dispatch
) => {
  dispatch(
    ws_actions.wsCallInit({
      event: "rtc.sdp.answer",
      data: data,
    })
  );
};

export const sendCandidate = async (
  data: WS.To["rtc.ice.candidate"],
  dispatch: Dispatch
) => {
  dispatch(
    ws_actions.wsCallInit({
      event: "rtc.ice.candidate",
      data: data,
    })
  );
};
