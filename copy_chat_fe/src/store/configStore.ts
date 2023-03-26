import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { rest } from "./middleware/rest";
import auth from "./auth";

export const store = () =>
  configureStore({
    middleware: [rest],
    reducer: combineReducers({ auth }),
  });
