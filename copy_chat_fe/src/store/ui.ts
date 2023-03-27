import { createSlice } from "@reduxjs/toolkit";
import { Store } from "../types/store";

const slice = createSlice({
  name: "ui",
  initialState: {
    saveChangesOpen: false,
  } as Store.AppState["ui"],
  reducers: {
    openedModal: (state, { payload }) => {
      state.openModal = payload;
    },
    closedModal: (state) => {
      delete state.openModal;
    },
    toggleDropdown: (state, { payload }) => {
      state.openDropdown = payload?.name;
    },
    toggleSaveChanges: (state, { payload }) => {
      state.saveChangesOpen = payload;
    },
    focusedUser: (state, { payload }) => {
      state.activeUser = payload;
    },
    pageSwitched: (state, { payload }) => {
      state.activeGroup = payload.Group;
      state.activeSubGroup = payload.SubGroup;
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;
