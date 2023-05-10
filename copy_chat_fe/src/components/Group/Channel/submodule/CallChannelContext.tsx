import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore";
import { webrtc_actions } from "../../../../store/webrtc";
import { sendJoin } from "../../../../store/ws_call/webrtc";
import { Webrtc } from "../../../../types/webrtc.types";
import { createConnectionModel } from "../../../../utils/webrtc";

export default function CallChannelContext() {
  const dispatch = useDispatch();

  const [localstream, setLocalstream] = useState<MediaStream | null>(null);

  const activeChannel = useSelector((s: RootState) => s.ui.active.channel);
  const account = useSelector((s: RootState) => s.auth.user);

  const newpeers = useSelector((s: RootState) =>
    s.webrtc.peers.filter((p) => p.state === "new")
  );
  const negotiating_peers = useSelector((s: RootState) =>
    s.webrtc.peers.filter((p) => p.state === "negotiating")
  );

  const connections = useRef<{ [key: string]: Webrtc.ConnectionModel }>({});

  function mapNewPeer() {
    newpeers.forEach(async (peer) => {
      if (!account || !localstream) return;
      else {
        const new_connection = await createConnectionModel(
          dispatch,
          account.id,
          localstream
        )(peer.id, peer.sid);
        connections.current[peer.id] = new_connection;
        dispatch(
          webrtc_actions.updatePeerState({
            id: new_connection.id,
            state: "negotiating",
          })
        );
      }
    });
  }
  useEffect(() => mapNewPeer(), [newpeers]);

  function negotiate() {
    negotiating_peers.forEach((p) => {
      if (p.packets.length > 0) {
        const t = connections.current[p.id];
        if (t.handler) {
          t.handler(p.packets[0]);
          dispatch(webrtc_actions.shiftRTCPacket(p.id));
        }
      }
    });
  }
  useEffect(() => negotiate(), [negotiating_peers]);

  async function createLocalStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const __localstream = new MediaStream(stream);
      setLocalstream(__localstream);
      const vidTrack = stream.getVideoTracks();
      const audTrack = stream.getAudioTracks();
      vidTrack[0].enabled = true;
      audTrack[0].enabled = true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  const attachLocalStream = async () => {
    if (!localstream) {
      await createLocalStream();
      console.log("attach localstream", localstream);
    }
  };

  const joinReq = async () => {
    if (localstream) {
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
      const vids = localstream.getVideoTracks();
      vids[0].enabled = !vids[0].enabled;
    }
  };
  const audToggle = async () => {
    if (localstream) {
      const auds = localstream.getAudioTracks();
      auds[0].enabled = !auds[0].enabled;
    }
  };

  const SelfVid = () => {
    if (!localstream) {
      return null;
    } else {
      return (
        <Box>
          <video
            style={{ height: "400px", width: "200px" }}
            autoPlay
            ref={(ref) => {
              if (ref) {
                ref.srcObject = localstream;
              }
            }}
          />
          <p>self</p>
        </Box>
      );
    }
  };
  const RemoteVideos = () => {
    const vids = Object.values(connections.current).map((peer) => {
      return (
        <Box key={peer.id}>
          <video
            style={{ height: "600px", width: "300px" }}
            autoPlay
            key={peer.id}
            id={"remote_video." + peer.id}
            ref={(ref) => {
              if (ref) {
                ref.srcObject = peer.remotestream;
              }
            }}
          />
          <p>id:{peer.id}</p>
        </Box>
      );
    });
    return <>{vids}</>;
  };

  return (
    <>
      <Box>
        <Button onClick={attachLocalStream}>attach</Button>
        <Button onClick={joinReq}>join</Button>
        <Button onClick={vidToggle}>vid</Button>
        <Button onClick={audToggle}>aud</Button>
        <Button onClick={() => console.log(connections)}>debug</Button>
        <SelfVid />
      </Box>
      <RemoteVideos />
    </>
  );
}
