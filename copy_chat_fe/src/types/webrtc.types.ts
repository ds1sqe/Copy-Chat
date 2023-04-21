export namespace Webrtc {
  export interface Localstream {
    meta: {
      isVoiceOn: boolean;
      isVideoOn: boolean;
    };
  }
  export interface RTCPacket {
    description?: RTCSessionDescription;
    candidate?: RTCIceCandidate;
  }

  export interface RTCPacketString {
    id: number;
    description?: string;
    candidate?: string;
  }

  export interface RTCPacketStringIncome {
    sender_id: number;
    sender_sid: string;
    packet: RTCPacketString;
  }

  export interface Peer {
    id: number;
    sid: string;
    state: string;
    meta?: { isVoiceOn: boolean; isVideoOn: boolean };
    packets: RTCPacketString[];
  }

  export interface Candidate {
    id: number;
    candidate: string;
  }

  export interface ConnectionFlags {
    isMakingOffer: boolean;
    privileged: boolean;
    ignoreOffer: boolean;
  }

  export interface ConnectionModel {
    id: number;
    flags: ConnectionFlags;

    datachannel: RTCDataChannel;
    peerconnection: RTCPeerConnection;
    remotestream: MediaStream;
    handler?: Function;
  }
}
