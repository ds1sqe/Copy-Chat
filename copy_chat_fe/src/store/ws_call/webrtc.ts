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

export const sendRtcPacket = async (
  data: WS.To["rtc.sdp.packet"],
  dispatch: Dispatch
) => {
  dispatch(
    ws_actions.wsCallInit({
      event: "rtc.sdp.packet",
      data: data,
    })
  );
};
