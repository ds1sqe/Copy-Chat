export namespace Entity {
  export interface User {
    id: number;
    username: string;
    email?: string;
    first_name?: string;
    last_name?: string;
  }
  export interface Group {
    id: number;
    name: string;
    description?: string;
    member_ids: number[];
  }
  export interface SubGroup {
    id: number;
    name: string;
    group: Group;
  }
}

export namespace UserTypes {
  export type StatusType = "ONLINE" | "OFFLINE" | "STEPOUT" | "CALL";
  export interface Self extends Entity.User {
    verified: true;
  }
}
