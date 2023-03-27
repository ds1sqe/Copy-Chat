import { AnyAction, createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import { actions } from "../store/ui";
import { Store } from "../types/store";

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
    if (getState().ui.saveChangesOpen !== isOpen) {
      dispatch(actions.toggleSaveChanges(isOpen));
    }
  };

export const closeModal = (dispatch: Dispatch) => {
  dispatch(actions.closedModal());
  dispatch(openSaveChanges(false));
  dispatch(actions.focusedUser(null));
};
