import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity } from "../types/entity.types";
import { Store } from "../types/store";

const slice = createSlice({
  name: "ui",
  initialState: {
    saveChangesOpen: false,
    popupNotifications: [],
    modal: {},
    sidebar: {
      open: true,
    },
    memberList: {
      open: true,
    },
    active: {},
  } as Store.AppState["ui"],
  reducers: {
    openModal: (state, { payload }) => {
      state.modal.type = payload;
    },
    setModalDetail: (state, { payload }) => {
      state.modal.detail = payload;
    },
    unsetModalDetail: (state) => {
      delete state.modal.detail;
    },
    closeModal: (state) => {
      delete state.modal?.type;
      delete state.modal?.detail;
    },

    toggleDropdown: (state, { payload }) => {
      state.openDropdown = payload?.name;
    },
    toggleSaveChanges: (state, { payload }) => {
      state.saveChangesOpen = payload;
    },

    focusUser: (state, { payload }) => {
      state.active.user = payload;
    },
    focusGroup: (state, { payload }: PayloadAction<Entity.Group>) => {
      state.active.group = payload;
    },
    deleteFocusGroup: (state) => {
      delete state.active.group;
    },
    focusSubgroup: (state, { payload }: PayloadAction<Entity.SubGroup>) => {
      state.active.subgroup = payload;
    },
    deleteFocusSubgroup: (state) => {
      delete state.active.subgroup;
    },
    focusChannel: (state, { payload }: PayloadAction<Entity.Channel>) => {
      state.active.channel = payload;
    },
    deleteFocusChannel: (state) => {
      delete state.active.channel;
    },

    openSidebar: (state) => {
      state.sidebar.open = true;
    },
    closeSidebar: (state) => {
      state.sidebar.open = false;
    },
    toggleSidebar: (state) => {
      state.sidebar.open = !state.sidebar.open;
    },

    openMemberList: (state) => {
      state.memberList.open = true;
    },
    closeMemberList: (state) => {
      state.memberList.open = false;
    },
    toggleMemberList: (state) => {
      state.memberList.open = !state.memberList.open;
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
