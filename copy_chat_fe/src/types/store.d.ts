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
      openedModal?: string;
      openedModalDetail?: any;
      saveChangesOpen?: boolean;
      activeUser?: Entity.User;
      activeGroup?: Entity.Group;
      activeSubGroup?: Entity.SubGroup;
      activeChannel?: Entity.Channel;
      popupNotifications: Ui.PopUpNotification[];
    };
    meta: {
      fetchNeeded?: boolean;
      isFetching?: boolean;
      listenerAttached?: boolean;
      popuplistenerAttached?: boolean;
      wslistenerAttached?: boolean;
    };
    entities: {
      groups: Entity.Group[];
      invitations: Entity.Invitation[];
    };
  }
  export interface Action<P> {
    type: string;
    payload: P;
  }
}
