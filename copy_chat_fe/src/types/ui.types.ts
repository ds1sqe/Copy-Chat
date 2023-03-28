export namespace Ui {
  export interface PopUpNotification {
    content: string | JSX.Element;
    variant: "default" | "info" | "error" | "success" | "warning";
  }
}
