import { Entity, UserTypes } from "./entity.types";

declare namespace Store {
  export interface AppState {
    auth: {
      loginAttempted: boolean;
      logined: boolean;
      hasCreated: boolean;
      user?: UserTypes.Self;
    };
    ui: {
      openDropdown?: string;
      openModal?: string;
      saveChangesOpen?: boolean;
      activeUser?: Entity.User;
    };
  }
  export interface Action<P> {
    type: string;
    payload: P;
  }
}
