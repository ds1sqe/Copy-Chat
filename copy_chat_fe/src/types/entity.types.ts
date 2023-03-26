export namespace Entity {
  export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }
}

export namespace UserTypes {
  export type StatusType = "ONLINE" | "OFFLINE" | "STEPOUT" | "CALL";
  export interface Self extends Entity.User {
    verified: true;
  }
}
