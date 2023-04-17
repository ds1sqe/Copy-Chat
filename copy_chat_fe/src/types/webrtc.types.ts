export namespace Webrtc {
  export interface Localstream {
    meta: {
      isVoiceOn: boolean;
      isVideoOn: boolean;
    };
  }
  export interface Peer {
    id: number;
    meta?: {
      isVoiceOn: boolean;
      isVideoOn: boolean;
    };
    sdp?: RTCSessionDescription;
  }
  export interface Candidate {
    id: number;
    candidate: string;
  }
}
