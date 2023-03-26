import { createSlice } from "@reduxjs/toolkit";

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
    login: (auth, user) => {
      auth.logined = true;
      auth.user = user;
    },
    created: (auth) => {
      auth.hasCreated = true;
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
