export namespace REST {
  export namespace To {
    export interface Post {
      "/account/login/": {
        username: string;
        password: string;
      };
      "/account/register/": {
        email: string;
        username: string;
        password: string;
      };
      "/group/create/": {
        groupname: string;
      };
      "/group/delete/": {
        group_id: number;
      };
      "/subgroup/create/": {
        group_id: number;
        subgroup_name: string;
      };
      "/subgroup/delete/": {
        group_id: number;
        subgroup_id: number;
      };
      "/channel/create/": {
        group_id: number;
        subgroup_id: number;
        channel_name: string;
      };
      "/channel/delete/": {
        group_id: number;
        subgroup_id: number;
      };

      "/invitation/create/": {
        group_id: number;
        target_id?: number;
      };
      "/invitation/validation/": {
        code: string;
      };
    }
  }

  export namespace From {
    export interface Get {
      "/invitation/validation/": {
        code: string;
      };
    }
    export interface Post {}
  }
}
