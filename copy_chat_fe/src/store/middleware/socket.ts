import { Middleware } from "@reduxjs/toolkit";
import socket from "../../utils/socket";
import { WsArgs, ws_actions } from "../api";

export const socketMiddleware: Middleware<{}> =
  (store) => (next) => async (action) => {
    console.log(action.type);
    if (action.type !== ws_actions.wsCallInit.type) return next(action);

    const { event, data } = action.payload as WsArgs;

    next(action);

    const unsubscribe = () => {
      socket.off(event);
      socket.off("error");
    };

    const callback = (payload: any) => {
      unsubscribe();
      store.dispatch(ws_actions.wsCallSucceded({ event, payload }));
    };
    const errorCallback = (payload: any) => {
      unsubscribe();
      store.dispatch(ws_actions.wsCallFailed({ event, payload }));
    };

    socket.on(event, callback);
    socket.on("error", errorCallback);

    socket.emit(event, data);
  };
