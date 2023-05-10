import { Entity } from "./entity.types";

export namespace Ui {
  export interface PopUpNotification {
    content: string | JSX.Element;
    variant: "default" | "info" | "error" | "success" | "warning";
  }
  export interface Modal {
    type?: string;
    detail?: any;
  }
  export interface Active {
    user?: Entity.User;
    group?: Entity.Group;
    subgroup?: Entity.SubGroup;
    channel?: Entity.Channel;
  }
  export interface SideBar {
    open: boolean;
  }
}
