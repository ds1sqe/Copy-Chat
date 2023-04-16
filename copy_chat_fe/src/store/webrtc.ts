import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../types/store";
import { Webrtc } from "../types/webrtc.types";

const slice = createSlice({
  name: "webrtc",
  initialState: { peers: [] } as Store.AppState["webrtc"],
  reducers: {
    setLocalStream: (state, { payload }: PayloadAction<Webrtc.Localstream>) => {
      state.localstream = payload;
    },
    removeLocalStream: (state) => {
      delete state.localstream;
    },
    addRemoteStream: (state, { payload }: PayloadAction<Webrtc.Peer>) => {
      state.peers.push(payload);
    },
    removeRemoteStream: (state, { payload }: PayloadAction<Number>) => {
      state.peers.filter((peer) => peer.id !== payload);
    },
    dropAll: (state) => {
      delete state.localstream;
      state.peers = [];
    },
  },
});

export const webrtc_actions = slice.actions;
export default slice.reducer;
