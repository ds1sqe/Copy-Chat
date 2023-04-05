import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { rest } from "./middleware/rest";
import auth from "./auth";
import ui from "./ui";
import meta from "./meta";
import groups from "./groups";
import subgroups from "./subgroups";
import channels from "./channels";
import memberships from "./memberships";

import { Store } from "../types/store";

const store = configureStore<Store.AppState>({
  middleware: [rest],
  reducer: {
    auth,
    ui,
    meta,
    entities: combineReducers({ groups, subgroups, channels, memberships }),
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
