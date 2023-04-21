import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../types/store";
import { Webrtc } from "../types/webrtc.types";

const slice = createSlice({
  name: "webrtc",
  initialState: { peers: [] as Webrtc.Peer[] } as Store.AppState["webrtc"],
  reducers: {
    addPeer: (state, { payload }: PayloadAction<Webrtc.Peer>) => {
      state.peers.push(payload);
    },
    removePeer: (state, { payload: target_id }: PayloadAction<Number>) => {
      state.peers = state.peers.filter((p) => p.id !== target_id);
    },
    updatePeerState: (state, { payload }) => {
      state.peers = state.peers.map((p) => {
        if (p.id === payload.id) {
          return {
            ...p,
            state: payload.state,
          };
        } else {
          return p;
        }
      });
    },
    pushRTCPacket: (
      state,
      { payload }: PayloadAction<Webrtc.RTCPacketStringIncome>
    ) => {
      const target_peer = state.peers.find((p) => p.id === payload.sender_id);
      if (target_peer) {
        state.peers
          .find((p) => p.id === payload.sender_id)
          ?.packets.push(payload.packet);
      } else {
        state.peers.push({
          id: payload.sender_id,
          sid: payload.sender_sid,
          state: "new",
          packets: [payload.packet],
        });
      }
    },
    shiftRTCPacket: (state, { payload: target_id }: PayloadAction<Number>) => {
      state.peers.find((p) => p.id === target_id)?.packets.shift();
    },
  },
});

export const webrtc_actions = slice.actions;
export default slice.reducer;
