import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../configStore";

export const getChannelsByGroupId = (group_id: number) =>
  createSelector(
    (state: RootState) => state.entities.channels,
    (channels) => channels.filter((e) => e.group_id === group_id)
  );
