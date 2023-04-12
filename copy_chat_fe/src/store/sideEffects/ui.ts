import { createSelector } from "@reduxjs/toolkit";
import { ui_actions } from "../ui";
import { Store } from "../../types/store";
import { Dispatch } from "@reduxjs/toolkit";

export function dropdownIsOpen(component: React.FunctionComponent) {
  return createSelector(
    (state: Store.AppState) => state.ui.openDropdown,
    (name) => name === component.name
  );
}
export function modalIsOpen(component: React.FunctionComponent) {
  return createSelector(
    (state: Store.AppState) => state.ui.openedModal,
    (name) => name === component.name
  );
}

export function closeModal(dispatch: Dispatch) {
  dispatch(ui_actions.closeModal());
}
