export function addTracks(pc: RTCPeerConnection, st: MediaStream) {
  st.getTracks().forEach((track) => {
    pc.addTrack(track, st);
  });
}

export function createPeerConnection(st: MediaStream) {
  const pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  });
  addTracks(pc, st);
  return pc;
}

export function createDataChannel(
  target_id: number,
  local_stream: MediaStream
) {
  const pc = createPeerConnection(local_stream);
  const dtc = pc.createDataChannel("dtc:" + target_id);
  return { peerConnection: pc, dataChannel: dtc };
}
