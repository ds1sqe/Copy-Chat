import { Webrtc } from "./webrtc.types";

export declare namespace WS {
  export interface To {
    "message.create": wsParam.message["create"];
    "meta.state.enter": wsParam.meta["enter"];
    "rtc.join": wsParam.webrtc["join"];
    "rtc.sdp.packet": wsParam.webrtc["sdp"]["packet"];
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
  export interface webrtc {
    join: {
      gid: number;
      cid: number;
    };
    sdp: {
      packet: {
        target_id: number;
        target_sid: string;
        packet: Webrtc.RTCPacketString;
      };
    };
  }
}
