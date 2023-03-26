import { createAction } from "@reduxjs/toolkit";

export const actions = {
  restCallInit: createAction<REST_Args>("api/restCallInit"),
  restCallSucceded: createAction<{}>("api/restCallSucceeded"),
  restCallFailed: createAction<{}>("api/restCallFailed"),
};

export interface REST_Args {
  data?: object;
  headers?: object;
  method?: "get" | "post" | "put" | "patch" | "delete";
  onSuccess?: string[];
  url: string;
  /** Callback to handle side effects. */
  callback?: (result: any) => any | Promise<any>;
  errorCallback?: (result: any) => any | Promise<any>;
}
