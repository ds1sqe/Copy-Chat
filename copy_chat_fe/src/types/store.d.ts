declare namespace Store {
  import { UserTypes } from "./entity.types";
  export interface AppState {
    auth: {
      loginAttempted: boolean;
      logined: boolean;
      hasCreated: boolean;
      user?: UserTypes.Self;
    };
  }
  export interface Action<P> {
    type: string;
    payload: P;
  }
}
