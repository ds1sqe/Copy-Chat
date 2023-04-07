import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../types/store";
import { Entity } from "../types/entity.types";

const slice = createSlice({
  name: "groups",
  initialState: [] as Store.AppState["entities"]["groups"],
  reducers: {
    fetch: (groups, { payload }: PayloadAction<Entity.Group[]>) => {
      groups.push(...payload);
    },
    add: (groups, { payload }: PayloadAction<Entity.Group>) => {
      groups.push(payload);
    },
    remove: (groups, { payload }: PayloadAction<number>) => {
      return groups.filter((old) => old.id !== payload);
    },
    update: (groups, { payload }: PayloadAction<Entity.Group[]>) => {
      groups.push(
        ...payload.filter((new_group) => {
          return !groups.some((old_group) => old_group.id === new_group.id);
        })
      );
    },
    add_subgroup: (groups, { payload }: PayloadAction<Entity.SubGroup>) => {
      const target_group = groups.find(
        (group) => (group.id = payload.group_id)
      );
      target_group?.subgroups.push(payload);
    },
    remove_subgroup: (groups, { payload }: PayloadAction<Entity.SubGroup>) => {
      const target_group = groups.find(
        (group) => (group.id = payload.group_id)
      );
      if (target_group) {
        target_group.subgroups = target_group.subgroups.filter(
          (subg) => subg.id !== payload.id
        );
      }
    },
    add_channel: (groups, { payload }: PayloadAction<Entity.Channel>) => {
      const target_group = groups.find(
        (group) => (group.id = payload.group_id)
      );
      target_group?.channels.push(payload);
    },
    remove_channel: (groups, { payload }: PayloadAction<Entity.SubGroup>) => {
      const target_group = groups.find(
        (group) => (group.id = payload.group_id)
      );
      if (target_group) {
        target_group.channels = target_group.channels.filter(
          (cha) => cha.id !== payload.id
        );
      }
    },
    add_membership: (groups, { payload }: PayloadAction<Entity.Membership>) => {
      const target_group = groups.find(
        (group) => (group.id = payload.group_id)
      );
      target_group?.memberships.push(payload);
    },
    remove_membership: (
      groups,
      { payload }: PayloadAction<Entity.Membership>
    ) => {
      const target_group = groups.find(
        (group) => (group.id = payload.group_id)
      );
      if (target_group) {
        target_group.memberships = target_group.memberships.filter(
          (cha) => cha.id !== payload.id
        );
      }
    },
  },
});

export const group_actions = slice.actions;

export default slice.reducer;
