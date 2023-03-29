import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../types/store";
import { Entity } from "../types/entity.types";

const slice = createSlice({
  name: "groups",
  initialState: {} as Store.AppState["entities"]["groups"],
  reducers: {
    fetch: (groups, { payload }: PayloadAction<Entity.Group[]>) => {
      groups.push(
        ...payload.filter((new_group) => {
          return !groups.some((old_group) => old_group.id === new_group.id);
        })
      );
    },
    update: (groups, { payload }: PayloadAction<Entity.Group[]>) => {
      groups.push(
        ...payload.filter((new_group) => {
          return !groups.some((old_group) => old_group.id === new_group.id);
        })
      );
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
