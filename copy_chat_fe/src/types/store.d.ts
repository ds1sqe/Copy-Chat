import { Entity, UserTypes } from "./entity.types";
import { Ui } from "./ui.types";
import { Webrtc } from "./webrtc.types";

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
      saveChangesOpen?: boolean;
      modal: Ui.Modal;
      sidebar: Ui.SideBar;
      active: Ui.Active;
      memberList: {
        open: boolean;
      };
      popupNotifications: Ui.PopUpNotification[];
    };
    meta: {
      fetchNeeded?: boolean;
      isFetching?: boolean;
      listenerAttached?: boolean;
      popuplistenerAttached?: boolean;
      wslistenerAttached?: boolean;
      rtclistenerAttached?: boolean;
    };
    entities: {
      groups: Entity.Group[];
      invitations: Entity.Invitation[];
    };
    webrtc: {
      localstream: Webrtc.Localstream;
      peers: Webrtc.Peer[];
    };
  }
  export interface Action<P> {
    type: string;
    payload: P;
  }
}
