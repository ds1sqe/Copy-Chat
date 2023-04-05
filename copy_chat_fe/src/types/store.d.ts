import { Entity, UserTypes } from "./entity.types";
import { Ui } from "./ui.types";

declare namespace Store {
  export interface AppState {
    auth: {
      loginAttempted: boolean;
      loginFailed: boolean;
      logined: boolean;
      hasCreated: boolean;
      user?: UserTypes.Self;
    };
    ui: {
      openDropdown?: string;
      openModal?: string;
      saveChangesOpen?: boolean;
      activeUser?: Entity.User;
      activeGroup?: Entity.Group;
      activeSubGroup?: Entity.SubGroup;
      popupNotifications: Ui.PopUpNotification[];
    };
    meta: {
      fetchNeeded?: boolean;
      isFetching?: boolean;
      listenerAttached?: boolean;
      popuplistenerAttached?: boolean;
    };
    entities: {
      groups: Entity.Group[];
      subgroups: Entity.SubGroup[];
      channels: Entity.Channel[];
      memberships: Entity.Membership[];
    };
  }
  export interface Action<P> {
    type: string;
    payload: P;
  }
}
