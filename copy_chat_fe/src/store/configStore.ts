import {
  combineReducers,
  configureStore,
  MiddlewareArray,
} from "@reduxjs/toolkit";
import { rest } from "./middleware/rest";
import auth from "./auth";
import ui from "./ui";
import meta from "./meta";
import groups from "./groups";
import invitations from "./invitations";

import { Store } from "../types/store";
import { socketMiddleware } from "./middleware/socket";

const store = configureStore<Store.AppState>({
  reducer: {
    auth,
    ui,
    meta,
    entities: combineReducers({ groups, invitations }),
  },
  // @ts-ignore
  middleware: new MiddlewareArray().prepend(rest, socketMiddleware),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
