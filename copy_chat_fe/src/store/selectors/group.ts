import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../configStore";

export const findGroup = (id: number) =>
  createSelector(
    (state: RootState) => state.entities.groups,
    (groups) => groups.find((e) => e.id === id)
  );
