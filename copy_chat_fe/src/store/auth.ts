import { createSlice } from "@reduxjs/toolkit";
import { Store } from "../types/store";

const slice = createSlice({
  name: "auth",
  initialState: {
    loginAttempted: false,
    logined: false,
    hasCreated: false,
  } as Store.AppState["auth"],
  reducers: {
    logInAttempted: (auth) => {
      auth.loginAttempted = true;
    },
    logOut: (auth) => {
      delete auth.user;
      auth.loginAttempted = false;
      auth.logined = false;
    },
    loginSuccess: (auth) => {
      auth.logined = true;
    },
    created: (auth) => {
      auth.hasCreated = true;
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
