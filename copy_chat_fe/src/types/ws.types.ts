import { Params } from "react-router-dom";

export declare namespace WS {
  export interface To {
    "message.create": wsParam.message["create"];
  }
}

export namespace wsParam {
  export interface message {
    create: {
      groupId: number;
      channelId: number;
      message: string;
    };
  }
}
