import axios from "axios";

import { actions, REST_Args } from "../api";

import { Middleware } from "redux";

export const rest: Middleware<{}> = (store) => (next) => async (action) => {
  if (action.type !== actions.restCallInit.type) return next(action);

  const { url, method, data, onSuccess, headers, callback, errorCallback } =
    action.payload as REST_Args;

  next(action);

  try {
    const { data: payload } = await axios.request({
      baseURL: process.env.REACT_APP_REST_DOMAIN,
      data,
      method,
      url,
      headers,
    });

    store.dispatch(actions.restCallSucceded({ url, response: payload }));
    if (onSuccess)
      for (const type of onSuccess) store.dispatch({ type, payload });

    if (callback) await callback(payload);
  } catch (error) {
    const response = (error as any).response;
    store.dispatch(actions.restCallFailed({ url, response }));

    if (errorCallback) await errorCallback(response);
  }
};
