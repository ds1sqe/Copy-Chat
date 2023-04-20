import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../types/store";
import { Webrtc } from "../types/webrtc.types";

const slice = createSlice({
  name: "webrtc",
  initialState: {} as Store.AppState["webrtc"],
  reducers: {
    newJoiner: (state, { payload }: PayloadAction<Webrtc.Peer>) => {
      if (state.joiners) {
        state.joiners.push(payload);
      } else {
        state.joiners = [payload];
      }
    },
    deleteJoiner: (state, { payload }: PayloadAction<number>) => {
      state.joiners = state.joiners.filter((j) => j.id !== payload);
    },
    newOfferer: (state, { payload }: PayloadAction<Webrtc.Peer>) => {
      if (state.offerers) {
        state.offerers.push(payload);
      } else {
        state.offerers = [payload];
      }
    },
    deleteOfferer: (state, { payload }: PayloadAction<number>) => {
      state.offerers = state.offerers.filter((j) => j.id !== payload);
    },
    newAnswerer: (state, { payload }: PayloadAction<Webrtc.Peer>) => {
      if (state.answers) {
        state.answers.push(payload);
      } else {
        state.answers = [payload];
      }
    },
    deleteAnswerer: (state, { payload }: PayloadAction<number>) => {
      state.answers = state.answers.filter((j) => j.id !== payload);
    },
    newCandidate: (state, { payload }: PayloadAction<Webrtc.Candidate>) => {
      if (state.icecandidates) {
        state.icecandidates.push(payload);
      } else {
        state.icecandidates = [payload];
      }
    },
    shiftCandidate: (state) => {
      state.icecandidates = state.icecandidates.filter((v, i) => i !== 0);
    },
  },
});

export const webrtc_actions = slice.actions;
export default slice.reducer;
