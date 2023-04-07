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
    (state: Store.AppState) => state.ui.openModal,
    (name) => name === component.name
  );
}

export const openSaveChanges =
  (isOpen: boolean) => (dispatch: Dispatch, getState: () => Store.AppState) => {
    if (getState().ui.saveChangesOpen === isOpen) return;

    dispatch(ui_actions.toggleSaveChanges(isOpen));
  };

export function closeModal(dispatch: Dispatch) {
  dispatch(ui_actions.closeModal());
  openSaveChanges(false);
  dispatch(ui_actions.focusedUser(null));
}
