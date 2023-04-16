let localstream: null | void | MediaStream;

export async function createLocalStream() {
  if (localstream === null) {
    return localstream;
  } else {
    localstream = await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        const localStream = new MediaStream(stream);
        const vidTrack = stream.getVideoTracks();
        const audTrack = stream.getAudioTracks();
        vidTrack[0].enabled = false;
        audTrack[0].enabled = false;
        return localStream;
      })
      .catch((error) => {
        console.log(error);
      });
    return localstream;
  }
}

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
