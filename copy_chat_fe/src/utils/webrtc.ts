export function addTracks(pc: RTCPeerConnection, st: MediaStream) {
  st.getTracks().forEach((track) => {
    pc.addTrack(track, st);
  });
}

export function createPeerConnection(st: MediaStream) {
  const pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: `${process.env.REACT_APP_TURN_URL}`,
        username: `${process.env.REACT_APP_TURN_USER}`,
        credential: `${process.env.REACT_APP_TURN_PWD}`,
      },
    ],
  });
  addTracks(pc, st);
  return pc;
}

export function createConnections(
  target_id: number,
  local_stream: MediaStream
) {
  const pc = createPeerConnection(local_stream);
  const dtc = pc.createDataChannel("dtc:" + target_id);
  const remoteStream = new MediaStream();
  pc.ontrack = async (ev: RTCTrackEvent) => {
    console.log("attaching track to remoteStream, target id:", target_id);
    console.log("detail:", ev);
    remoteStream.addTrack(ev.track);
  };

  return { peerConnection: pc, dataChannel: dtc, stream: remoteStream };
}
