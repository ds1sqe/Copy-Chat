import { createSlice } from "@reduxjs/toolkit";
import { Store } from "../types/store";

const slice = createSlice({
  name: "meta",
  initialState: {
    listenerAttached: false,
  } as Store.AppState["meta"],
  reducers: {
    AttachListener: (meta) => {
      meta.listenerAttached = true;
    },
    DetachListener: (meta) => {
      meta.listenerAttached = false;
    },
    AttachPopUpListener: (meta) => {
      meta.popuplistenerAttached = true;
    },
    DetachPopUpListener: (meta) => {
      meta.popuplistenerAttached = false;
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
