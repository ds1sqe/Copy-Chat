export declare namespace WS {
  export interface To {
    "message.create": wsParam.message["create"];
    "meta.state.enter": wsParam.meta["enter"];
  }
}

export namespace wsParam {
  export interface message {
    create: {
      gid: number;
      cid: number;
      text: string;
    };
  }
  export interface meta {
    enter: {
      gid: number;
      cid: number;
    };
  }
}
