import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../types/store";
import { Entity } from "../types/entity.types";

const slice = createSlice({
  name: "subgroups",
  initialState: [] as Store.AppState["entities"]["subgroups"],
  reducers: {
    fetch: (subgroups, { payload }: PayloadAction<Entity.SubGroup[]>) => {
      subgroups.push(...payload);
    },
    add: (subgroups, { payload }: PayloadAction<Entity.SubGroup>) => {
      subgroups.push(payload);
    },
    update: (subgroups, { payload }: PayloadAction<Entity.SubGroup[]>) => {
      subgroups.push(
        ...payload.filter((new_channel) => {
          return !subgroups.some(
            (old_channel) => old_channel.id === new_channel.id
          );
        })
      );
    },
    remove: (subgroups, { payload }: PayloadAction<number>) => {
      return subgroups.filter((old) => old.id !== payload);
    },
    remove_by_groupid: (subgroups, { payload }: PayloadAction<number>) => {
      return subgroups.filter((old) => old.group_id !== payload);
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
