import { Textsms } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  Input,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore";
import { messageCreate } from "../../../store/ws_call/message";

export default function ChannelContext() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const activeChannel = useSelector((s: RootState) => s.ui.activeChannel);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      activeChannel?.group_id === undefined ||
      activeChannel?.subgroup_id === undefined
    )
      return;
    const data = {
      groupId: activeChannel?.group_id,
      channelId: activeChannel?.id,
      message: message,
    };
    messageCreate(data, dispatch);
  };

  return (
    <Box
      sx={{
        height: "100%",
        border: "1px solid gray",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <form onSubmit={(e) => sendMessage(e)}>
        <Input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></Input>
        <Button type="submit">send message</Button>
      </form>
    </Box>
  );
}
