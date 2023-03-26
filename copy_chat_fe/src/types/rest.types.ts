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
    }
  }

  export namespace From {
    export interface Get {}
    export interface Post {}
  }
}
