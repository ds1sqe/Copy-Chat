import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../types/store";
import { Entity } from "../types/entity.types";

const slice = createSlice({
  name: "channels",
  initialState: [] as Store.AppState["entities"]["channels"],
  reducers: {
    fetch: (channels, { payload }: PayloadAction<Entity.Channel[]>) => {
      channels.push(...payload);
    },
    add: (channels, { payload }: PayloadAction<Entity.Channel>) => {
      channels.push(payload);
    },
    update: (channels, { payload }: PayloadAction<Entity.Channel[]>) => {
      channels.push(
        ...payload.filter((new_channel) => {
          return !channels.some(
            (old_channel) => old_channel.id === new_channel.id
          );
        })
      );
    },
    remove: (channels, { payload }: PayloadAction<number>) => {
      return channels.filter((old) => old.id !== payload);
    },
    remove_by_groupid: (channels, { payload }: PayloadAction<number>) => {
      return channels.filter((old) => old.group_id !== payload);
    },
    remove_by_subgroupid: (channels, { payload }: PayloadAction<number>) => {
      return channels.filter((old) => old.subgroup_id !== payload);
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
