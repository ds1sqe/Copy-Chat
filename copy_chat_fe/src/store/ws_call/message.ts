import { Dispatch } from "@reduxjs/toolkit";
import { WS } from "../../types/ws.types";
import { ws_actions } from "../api";

export const messageCreate = async (
  data: WS.To["message.create"],
  dispatch: Dispatch
) => {
  dispatch(
    ws_actions.wsCallInit({
      event: "message.create",
      data: data,
    })
  );
};
