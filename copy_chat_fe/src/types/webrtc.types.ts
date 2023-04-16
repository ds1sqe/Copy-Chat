export namespace Webrtc {
  export interface Localstream {
    meta: {
      isVoiceOn: boolean;
      isVideoOn: boolean;
    };
    stream: MediaStream;
  }
  export interface RemoteStream {
    meta: {
      isVoiceOn: boolean;
      isVideoOn: boolean;
    };
    stream: MediaStream;
  }
  export interface Peer {
    id: number;
    remoteStream?: RemoteStream;
    dataChannel?: RTCDataChannel;
    peerConnection: RTCPeerConnection;
  }
}
