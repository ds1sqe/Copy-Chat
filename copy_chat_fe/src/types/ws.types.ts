export declare namespace WS {
  export interface To {
    "message.create": wsParam.message["create"];
    "meta.state.enter": wsParam.meta["enter"];
    "rtc.join": wsParam.webrtc["join"];
    "rtc.sdp.offer": wsParam.webrtc["sdp"]["offer"];
    "rtc.sdp.answer": wsParam.webrtc["sdp"]["answer"];
    "rtc.ice.candidate": wsParam.webrtc["ice"]["candidate"];
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
      offer: {
        target_id: number;
        detail: RTCSessionDescription | null;
      };
      answer: {
        target_id: number;
        detail: RTCSessionDescription | null;
      };
    };
    ice: {
      candidate: {
        target_id: number;
        candidate: string;
      };
    };
  }
}
