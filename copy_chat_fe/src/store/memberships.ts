import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../types/store";
import { Entity } from "../types/entity.types";

const slice = createSlice({
  name: "memberships",
  initialState: [] as Store.AppState["entities"]["memberships"],
  reducers: {
    fetch: (memberships, { payload }: PayloadAction<Entity.Membership[]>) => {
      memberships.push(...payload);
    },
    add: (memberships, { payload }: PayloadAction<Entity.Membership>) => {
      memberships.push(payload);
    },
    update: (memberships, { payload }: PayloadAction<Entity.Membership[]>) => {
      memberships.push(
        ...payload.filter((new_channel) => {
          return !memberships.some(
            (old_channel) => old_channel.id === new_channel.id
          );
        })
      );
    },
    remove: (memberships, { payload }: PayloadAction<number>) => {
      return memberships.filter((old) => old.id !== payload);
    },
    remove_by_groupid: (memberships, { payload }: PayloadAction<number>) => {
      return memberships.filter((old) => old.group_id !== payload);
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
