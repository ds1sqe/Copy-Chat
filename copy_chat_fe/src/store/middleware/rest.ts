import axios from "axios";

import { actions, REST_Args } from "../api";

import { Middleware } from "redux";

export const rest: Middleware<{}> = (store) => (next) => async (action) => {
  if (action.type !== actions.restCallInit.type) return next(action);

  const { url, method, data, onSuccess, headers, callback, errorCallback } =
    action.payload as REST_Args;

  next(action);

  await axios
    .request({
      baseURL: process.env.REACT_APP_REST_DOMAIN,
      data,
      method,
      url,
      headers,
    })
    .then((response) => {
      console.log(response);
      const result = response.data;
      console.log(result);

      store.dispatch(actions.restCallSucceded({ url, response: result }));
      if (onSuccess)
        for (const type of onSuccess) store.dispatch({ type, payload: result });
      if (callback) callback(result);
    })
    .catch((err) => {
      const response = (err as any).response;
      store.dispatch(actions.restCallFailed({ url, response }));
      if (errorCallback) errorCallback(response);
    });
};
