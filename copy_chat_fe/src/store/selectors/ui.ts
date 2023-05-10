import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../../types/store";

export function dropdownIsOpen(component: React.FunctionComponent) {
  return createSelector(
    (state: Store.AppState) => state.ui.openDropdown,
    (name) => name === component.name
  );
}
export function modalIsOpen(component: React.FunctionComponent) {
  return createSelector(
    (state: Store.AppState) => state.ui.modal,
    (name) => name === component.name
  );
}
