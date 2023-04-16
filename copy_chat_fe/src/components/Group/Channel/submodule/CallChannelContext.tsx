import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore";
import { webrtc_actions } from "../../../../store/webrtc";
import { sendJoin } from "../../../../store/ws_call/webrtc";
import { createLocalStream } from "../../../../utils/webrtc";

export default function CallChannelContext() {
  const dispatch = useDispatch();
  const localstream = useSelector((s: RootState) => s.webrtc.localstream);
  const peers = useSelector((s: RootState) => s.webrtc.peers);

  const activeChannel = useSelector((s: RootState) => s.ui.activeChannel);

  const attachLocalStream = async () => {
    const __loc = await createLocalStream();
    if (__loc) {
      console.log("attach localstream", __loc);
      dispatch(
        webrtc_actions.setLocalStream({
          meta: {
            isVideoOn: false,
            isVoiceOn: false,
          },
          stream: __loc,
        })
      );

      if (activeChannel) {
        sendJoin(
          { gid: activeChannel?.group_id, cid: activeChannel?.id },
          dispatch
        );
      }
    }
  };
  const vidToggle = async () => {
    if (localstream) {
      const vids = localstream.stream.getVideoTracks();
      vids[0].enabled = !vids[0].enabled;
    }
  };
  const audToggle = async () => {
    if (localstream) {
      const auds = localstream.stream.getAudioTracks();
      auds[0].enabled = !auds[0].enabled;
    }
  };

  const SelfVid = () => {
    if (!localstream) {
      return null;
    } else {
      return (
        <div>
          <p>self</p>
          <video
            autoPlay
            ref={(ref) => {
              if (ref) {
                ref.srcObject = localstream.stream;
              }
            }}
          />
        </div>
      );
    }
  };
  const RemoteVideos = () => {
    const vids = peers.map((peer) => {
      const remoteStream = new MediaStream();
      peer.peerConnection.addEventListener(
        "track",
        async (ev: RTCTrackEvent) => {
          console.log("attaching track:", peer.id);
          console.log("detail:", ev.track);
          remoteStream.addTrack(ev.track);
        }
      );
      return (
        <li key={peer.id}>
          <p>{peer.id}</p>
          <video
            autoPlay
            key={peer.id}
            ref={(ref) => {
              if (ref) {
                ref.srcObject = remoteStream;
              }
            }}
          />
        </li>
      );
    });
    return <>{vids}</>;
  };

  return (
    <>
      <Button onClick={attachLocalStream}>attach</Button>
      <Button onClick={vidToggle}>vid</Button>
      <Button onClick={audToggle}>aud</Button>
      <SelfVid />
      <RemoteVideos />
    </>
  );
}
