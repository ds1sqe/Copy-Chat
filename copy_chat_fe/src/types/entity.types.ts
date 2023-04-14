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
    members: User[];
    subgroups: SubGroup[];
    channels: Channel[];
    memberships: Membership[];
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
    messages: Message[];
  }
  export interface Membership {
    id: number;
    group_id: number;
    name: string;
    is_default: boolean;
    owners: number[];
    permission: number;
  }
  export interface Invitation {
    id: number;
    group_id: number;
    inviter_id: number;
    target_id: number;
    code: string;
  }
  export interface Message {
    id: number;
    group_id: number;
    channel_id: number;
    account_id: number;
    event: any;
    file: any;
    text: string;
    datetime: string;
  }
}

export namespace UserTypes {
  export type StatusType = "ONLINE" | "OFFLINE" | "STEPOUT" | "CALL";
  export interface Self extends Entity.User {
    verified: true;
  }
}
