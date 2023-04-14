import { Dispatch } from "@reduxjs/toolkit";
import { WS } from "../../types/ws.types";
import { ws_actions } from "../api";

export const EnterRoom = async (
  data: WS.To["meta.state.enter"],
  dispatch: Dispatch
) => {
  dispatch(
    ws_actions.wsCallInit({
      event: "meta.state.enter",
      data: data,
    })
  );
};
