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
    subgroups: SubGroup[];
    channels: Channel[];
    Memberships: Membership[];
  }
  export interface SubGroup {
    id: number;
    group_id: number;
    name: string;
  }
  export interface Channel {
    id: number;
    group_id: number;
    subgroup_id?: number;
    name: string;
    type: string;
    is_unique: string;
  }
  export interface Membership {
    id: number;
    group_id: number;
    name: string;
    is_default: boolean;
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
