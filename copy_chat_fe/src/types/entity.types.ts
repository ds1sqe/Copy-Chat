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
    subgroup?: SubGroup[];
    channels?: Channel[];
    memberships?: Membership[];
  }
  export interface SubGroup {
    id: number;
    name: string;
    group_id: number;
    channels?: Channel[];
  }
  export interface Channel {
    id: number;
    group_id: number;
    subgroup_id?: number;
    type: string;
    is_unique: string;
  }
  export interface Membership {
    id: number;
    group_id: number;
    is_default: boolean;
    name: string;
    owner_ids: number[];
    permission: number;
  }
}

export namespace UserTypes {
  export type StatusType = "ONLINE" | "OFFLINE" | "STEPOUT" | "CALL";
  export interface Self extends Entity.User {
    verified: true;
  }
}
