import { createSlice } from "@reduxjs/toolkit";
import { Store } from "../types/store";

const slice = createSlice({
  name: "meta",
  initialState: {
    listenerAttached: false,
    fetchNeeded: false,
    isFetching: false,
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
    AttachWsListener: (meta) => {
      meta.wslistenerAttached = true;
    },
    DetachWsListener: (meta) => {
      meta.wslistenerAttached = false;
    },

    FetchNeeded: (meta) => {
      meta.fetchNeeded = true;
    },
    FetchNotNeeded: (meta) => {
      meta.fetchNeeded = false;
    },
    FetchingStart: (meta) => {
      meta.isFetching = true;
    },
    FetchingEnd: (meta) => {
      meta.isFetching = false;
    },
  },
});

export const meta_actions = slice.actions;

export default slice.reducer;
