import { configureStore } from "@reduxjs/toolkit";
import { rest } from "./middleware/rest";
import auth from "./auth";
import ui from "./ui";
import meta from "./meta";

import { Store } from "../types/store";

const store = configureStore<Store.AppState>({
  middleware: [rest],
  reducer: { auth, ui, meta },
});
export default store;

export type AppDispatch = typeof store.dispatch;
