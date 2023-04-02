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
      "/group/": {
        groupname: string;
      };
    }
  }

  export namespace From {
    export interface Get {
      "/group/": {};
    }
    export interface Post {}
  }
}
