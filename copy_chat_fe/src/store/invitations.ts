import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../types/store";
import { Entity } from "../types/entity.types";

const slice = createSlice({
  name: "invitaions",
  initialState: [] as Store.AppState["entities"]["invitations"],

  reducers: {
    fetch: (invitations, { payload }: PayloadAction<Entity.Invitation[]>) => {
      invitations.push(...payload);
    },

    add: (invitations, { payload }: PayloadAction<Entity.Invitation>) => {
      invitations.push(payload);
    },
    remove: (invitations, { payload }: PayloadAction<number>) => {
      return invitations.filter((old) => old.id !== payload);
    },
  },
});

export const invitation_actions = slice.actions;

export default slice.reducer;
