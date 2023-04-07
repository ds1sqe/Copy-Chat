import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity } from "../types/entity.types";
import { Store } from "../types/store";

const slice = createSlice({
  name: "ui",
  initialState: {
    saveChangesOpen: false,
    popupNotifications: [],
  } as Store.AppState["ui"],
  reducers: {
    openModal: (state, { payload }) => {
      state.openModal = payload;
    },
    closeModal: (state) => {
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
    },
    focusSubgroup: (state, { payload }: PayloadAction<Entity.SubGroup>) => {
      state.activeSubGroup = payload;
    },

    addPopNotice: (state, { payload }) => {
      state.popupNotifications.reverse();
      state.popupNotifications.push(payload);
      state.popupNotifications.reverse();
    },
    removePopNotice: (state) => {
      state.popupNotifications.pop();
    },
  },
});

export const ui_actions = slice.actions;
export default slice.reducer;
